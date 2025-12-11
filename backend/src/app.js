// src/app.js
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import logger from "./middleware/logger.js";
import todoRoutes from "./routes/todoRoutes.js";

config(); // .env 로드

const app = express();

// 포트 설정
const PORT = process.env.PORT || 4000;

// DB 연결
connectDB();

// 공통 미들웨어
app.use(cors());          // CORS 허용 (프론트와 통신)
app.use(express.json());  // JSON 바디 파싱
app.use(logger);          // 요청 로깅

// 라우트
app.use("/api/todos", todoRoutes);

// 간단 헬스체크용
app.get("/", (req, res) => {
  res.send("TodoList API 서버 동작 중");
});

// 404 처리 (등록되지 않은 라우트)
app.use((req, res) => {
  res.status(404).json({ message: "요청한 리소스를 찾을 수 없습니다." });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
