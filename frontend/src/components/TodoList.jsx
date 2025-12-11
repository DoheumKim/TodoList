// src/components/TodoList.jsx
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onEdit, onDelete }) {
  if (!todos.length) {
    return <p className="todo-empty">등록된 할 일이 없습니다.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
