import { useState, useEffect } from "react";
import { calculateWPM, calculateAccuracy } from "../utils/stats";

export default function RaceGame({ snippet, name, onFinish }) {
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(0);
  const [finished, setFinished] = useState(false);

  // timer
  useEffect(() => {
    if (!startTime || finished) return;

    const interval = setInterval(() => {
      setTime((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, finished]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (!startTime) setStartTime(Date.now());

    setTyped(value);

    // only finish once
    if (!finished && value === snippet.code) {
      setFinished(true);

      const totalTime = (Date.now() - startTime) / 1000;
      const wpm = calculateWPM(value.length, totalTime);
      const accuracy = calculateAccuracy(value, snippet.code);

      onFinish({
        name,
        snippet: snippet.title,
        wpm,
        accuracy,
        time: totalTime.toFixed(2),
      });
    }
  };

  return (
    <div>
      <h2>{snippet.title}</h2>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#1e293b",
          padding: 20,
          borderRadius: 8,
        }}
      >
        {snippet.code
          .split("")
          .map((char, index) => {
            let color = "gray";
            if (index < typed.length) {
              color = typed[index] === char ? "#22c55e" : "#ef4444";
            }
            return (
              <span key={index} style={{ color }}>
                {char}
              </span>
            );
          })}
      </pre>

      <textarea
        value={typed}
        onChange={handleChange}
        onPaste={(e) => e.preventDefault}
        spellCheck={false}
        rows={8}
        style={{
          width: "100%",
          marginTop: 20,
          padding: 10,
          fontFamily: "monospace",
        }}
      />

      <p>Time: {time.toFixed(1)}</p>
    </div>
  );
}
