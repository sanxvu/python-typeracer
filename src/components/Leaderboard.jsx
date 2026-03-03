import { useEffect, useState, useRef } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz1LFR_2393R7vJVH1BZWebVg-QzsBw7ilMDHp4fKUTzevKsFIquusoyGWDij0ZSwR1/exec";

export default function Leaderboard({ score, onRestart }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasSubmitted = useRef(false);

  // submite once
  useEffect(() => {
    if (!score || hasSubmitted.current) return;

    hasSubmitted.current = true;

    const submitScore = async () => {
      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(score),
        });
      } catch (err) {
        console.error(err);
      }
    };

    submitScore();
  }, [score]);

  // poll leaderboard every 2s
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(SCRIPT_URL);
        const data = await res.json();
        console.log("RAW DATA:", data);

        const formatted = data.slice(1).map((row) => ({
          name: row[0],
          snippet: row[1],
          wpm: Number(row[2]),
          accuracy: Number(row[3]),
          time: Number(row[4]),
        }));

        // sort by fastest time
        formatted.sort((a, b) => a.time - b.time);
        console.log("FORMATTED:", formatted);

        setScores(formatted);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    // initial fetch
    fetchLeaderboard();

    // poll every 2s
    const interval = setInterval(fetchLeaderboard, 2000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Updating leaderboard...</p>;

  return (
    <div>
      <h2>Leaderboard</h2>

      <table style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
            <th>WPM</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.time}s</td>
              <td>{s.wpm}</td>
              <td>{s.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onRestart} style={{ marginTop: 20 }}>
        Race Again
      </button>
    </div>
  );
}
