import { useState } from "react";
import { snippets } from "./data/snippets";
import Lobby from "./components/Lobby";
import RaceGame from "./components/RaceGame";
import Leaderboard from "./components/Leaderboard";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz1LFR_2393R7vJVH1BZWebVg-QzsBw7ilMDHp4fKUTzevKsFIquusoyGWDij0ZSwR1/exec";

export default function App() {
  const [screen, setScreen] = useState("lobby");
  const [playerName, setPlayerName] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [latestScore, setLatestScore] = useState(null);

  const startGame = (name, snippetId) => {
    setPlayerName(name);
    setSelectedSnippet(snippets.find((s) => s.id === snippetId));
    setScreen("race");
  };

  const finishGame = async (score) => {
    setLatestScore(score);
    setScreen("leaderboard");
  };

  return (
    <div>
      {screen === "lobby" && <Lobby onStart={startGame} />}
      {screen === "race" && (
        <RaceGame
          snippet={selectedSnippet}
          name={playerName}
          onFinish={finishGame}
        />
      )}
      {screen === "leaderboard" && (
        <Leaderboard score={latestScore} onRestart={() => setScreen("lobby")} />
      )}
    </div>
  );
}
