import { useState } from "react";

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState("");

  return (
    <div className="add-task-container">
      <input
        type="text"
        placeholder="Add task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          onAddTask(text);
          setText("");
        }}
      >
        Add
      </button>
    </div>
  );
}
