// src/components/TodoItem.jsx
import { useState } from "react";

export default function TodoItem({ todo, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(todo.text);

  // 체크박스 변경
  const handleCheck = async (e) => {
    await onEdit(todo._id, { done: e.target.checked });
  };

  // 수정 버튼
  const handleToggleEdit = async () => {
    if (isEditing) {
      if (draftText.trim() && draftText !== todo.text) {
        await onEdit(todo._id, { text: draftText.trim() });
      } else {
        setDraftText(todo.text);
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제할까요?")) {
      onDelete(todo._id);
    }
  };

  return (
    <li className="todo-item">
      <div className="todo-main">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.done}
          onChange={handleCheck}
        />

        {isEditing ? (
          <input
            className="todo-edit-input"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
          />
        ) : (
          <span
            className="todo-text"
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              color: todo.done ? "#999" : "#333",
            }}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        <button className="todo-btn edit" type="button" onClick={handleToggleEdit}>
          {isEditing ? "저장" : "수정"}
        </button>
        <button className="todo-btn delete" type="button" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </li>
  );
}
