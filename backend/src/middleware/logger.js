// src/middleware/logger.js

// 모든 요청을 콘솔에 로깅하는 미들웨어
function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(` [${now}] ${req.method} ${req.originalUrl}`);

  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    console.log("   Body:", req.body);
  }

  next();
}

export default logger;
