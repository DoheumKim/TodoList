// src/api/todoApi.js
const BASE_URL = "/api/todos"; // Vite proxy로 backend에 전달

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

// 전체 목록 조회
export async function fetchTodos() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

// 생성
export async function createTodo(text) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return handleResponse(res);
}

// 수정 (text, done 둘 다 혹은 하나만 보낼 수 있도록 payload 사용)
export async function updateTodo(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// 삭제
export async function deleteTodo(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
