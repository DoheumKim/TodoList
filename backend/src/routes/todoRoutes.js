// src/routes/todoRoutes.js
import { Router } from "express";
const router = Router();
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";

// /api/todos
router.get("/", getTodos);       // 전체 조회
router.post("/", createTodo);    // 생성
router.put("/:id", updateTodo);  // 수정
router.delete("/:id", deleteTodo); // 삭제

export default router;
