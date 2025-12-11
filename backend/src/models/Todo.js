// src/models/Todo.js
import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: true, // 할 일 내용은 필수
      trim: true,
    },
    done: {
      type: Boolean,
      default: false, // 완료 여부
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

const Todo = model("Todo", todoSchema);

export default Todo;
