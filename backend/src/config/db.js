// src/config/db.js
import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI 환경 변수가 설정되어 있지 않습니다.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log("MongoDB URI:", uri);
    console.log("MongoDB 연결 성공, DB 이름:", conn.connection.name);
    console.log("호스트:", conn.connection.host, "포트:", conn.connection.port);
  } catch (err) {
    console.error("MongoDB 연결 실패:", err.message);
    process.exit(1);
  }
}

export default connectDB;
