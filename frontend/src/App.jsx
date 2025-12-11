// src/App.jsx
import "./styles/Todo.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, loading, error, addTodo, editTodo, removeTodo } = useTodos();

  return (
    <div className="app-root">
      <div className="todo-container">
        <header className="todo-header">
          <h1>Todo List</h1>
          <p className="todo-title">일정 관리</p>
        </header>

        <TodoForm onAdd={addTodo} />

        {loading && <p className="todo-status">불러오는 중...</p>}
        {error && <p className="todo-error">{error}</p>}

        <TodoList todos={todos} onEdit={editTodo} onDelete={removeTodo} />
      </div>
    </div>
  );
}

export default App;
