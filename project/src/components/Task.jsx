import { useState } from "react";

export default function Task({ task, onChangeTask, onDeleteTask }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <li key={task.id}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => onChangeTask({ ...task, done: e.target.checked })}
      />
      {editingId === task.id ? (
        <input
          type="text"
          value={task.text}
          onChange={(e) => onChangeTask({ ...task, text: e.target.value })}
        />
      ) : (
        task.text
      )}
      <button
        className="edit-btn"
        onClick={() => setEditingId(editingId === task.id ? null : task.id)}
      >
        {editingId === task.id ? "Save" : "Edit"}
      </button>
      <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}
