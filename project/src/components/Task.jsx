import { useState } from "react";

export default function Task({ task, onChangeTask, onDeleteTask }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => onChangeTask({ ...task, done: e.target.checked })}
      />
      {editingId === task._id ? (
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
        onClick={() => setEditingId(editingId === task._id ? null : task._id)}
      >
        {editingId === task._id ? "Save" : "Edit"}
      </button>
      <button className="delete-btn" onClick={() => onDeleteTask(task._id)}>
        Delete
      </button>
    </li>
  );
}
