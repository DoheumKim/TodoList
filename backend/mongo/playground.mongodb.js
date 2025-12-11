// mongo/playground.mongodb.js

// TodoList DB 선택
use("TodoListDB");

// 초기 데이터 몇 개 넣어보기
db.todos.insertMany([
  { text: "리액트와 서버 연동하기", done: false },
  { text: "MongoDB 컬렉션 데이터 확인하기", done: false },
]);

// 현재 todos 컬렉션 조회
db.todos.find().pretty();
