import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Xin chào từ Express!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
