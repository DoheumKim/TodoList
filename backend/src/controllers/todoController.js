// src/controllers/todoController.js
import Todo from "../models/Todo.js";

// 전체 조회 GET /api/todos
export async function getTodos(req, res) {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 });
    return res.json(todos);
  } catch (err) {
    console.error("getTodos 에러:", err);
    return res
      .status(500)
      .json({ message: "할 일 목록 조회 중 오류가 발생했습니다." });
  }
}

// 생성 POST /api/todos
export async function createTodo(req, res) {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "text는 필수입니다." });
    }

    const todo = await Todo.create({ text: text.trim() });
    return res.status(201).json(todo);
  } catch (err) {
    console.error("createTodo 에러:", err);
    return res
      .status(500)
      .json({ message: "할 일 생성 중 오류가 발생했습니다." });
  }
}

// 수정 PUT /api/todos/:id
export async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { text, done } = req.body;

    const update = {};
    if (typeof text === "string" && text.trim()) {
      update.text = text.trim();
    }
    if (typeof done === "boolean") {
      update.done = done;
    }

    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ message: "수정할 데이터가 없습니다." });
    }

    const updated = await Todo.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "해당 ID의 할 일을 찾을 수 없습니다." });
    }

    return res.json(updated);
  } catch (err) {
    console.error("updateTodo 에러:", err);
    return res
      .status(500)
      .json({ message: "할 일 수정 중 오류가 발생했습니다." });
  }
}

// 삭제 DELETE /api/todos/:id
export async function deleteTodo(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "해당 ID의 할 일을 찾을 수 없습니다." });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("deleteTodo 에러:", err);
    return res
      .status(500)
      .json({ message: "할 일 삭제 중 오류가 발생했습니다." });
  }
}
