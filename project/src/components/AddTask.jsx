import { useState } from "react";

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState("");

  const handleaAddTask = () => {
    if (text.trim() === "") return;
    onAddTask({ text, done: false });
    setText("");
  };

  return (
    <div className="add-task-container">
      <input
        type="text"
        placeholder="Add task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleaAddTask}>Add</button>
    </div>
  );
}
