import { useState } from "react";
import { snippets } from "../data/snippets";

export default function Lobby({ onStart }) {
  const [name, setName] = useState("");
  const [snippetId, setSnippetId] = useState(0);

  return (
    <div>
      <h1>Python Type Racer</h1>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 10, marginBottom: 20 }}
      />

      <br />

      <select
        value={snippetId}
        onChange={(e) => setSnippetId(Number(e.target.value))}
        style={{ padding: 10 }}
      >
        {snippets.map((snippet) => (
          <option key={snippet.id} value={snippet.id}>
            {snippet.title}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button
        onClick={() => onStart(name, snippetId)}
        disabled={!name}
        style={{ padding: 12, cursor: "pointer" }}
      >
        Start Race
      </button>
    </div>
  );
}
