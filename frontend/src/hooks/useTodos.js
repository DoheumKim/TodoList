// src/hooks/useTodos.js
import { useEffect, useState } from "react";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todoApi";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 초기 로딩
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (e) {
        console.error(e);
        setError("초기 할 일 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 생성
  const addTodo = async (text) => {
    if (!text.trim()) return;
    setError("");
    try {
      const newTodo = await createTodo(text.trim());
      setTodos((prev) => [...prev, newTodo]);
    } catch (e) {
      console.error(e);
      setError("할 일을 추가하는 중 오류가 발생했습니다.");
    }
  };

  // 수정
  const editTodo = async (id, payload) => {
    setError("");
    try {
      const updated = await updateTodo(id, payload);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? updated : t))
      );
    } catch (e) {
      console.error(e);
      setError("할 일을 수정하는 중 오류가 발생했습니다.");
    }
  };

  // 삭제
  const removeTodo = async (id) => {
    setError("");
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      console.error(e);
      setError("할 일을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    editTodo,
    removeTodo,
  };
}
