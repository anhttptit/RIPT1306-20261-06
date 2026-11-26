import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const movies = [
  { id: 1, title: "Đèn đỏ ngã tư", genre: "Hành động", duration: 124 },
  { id: 2, title: "Bún chả cho người lạ", genre: "Hài", duration: 98 },
];

app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date().toLocaleTimeString(), req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Xin chào từ Express!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

app.get("/api/boom", (req, res) => {
  throw new Error("Có gì đó hỏng rồi!");
});

app.get("/api/movies", (req, res) => {
  const { genre } = req.query;
  const result = genre ? movies.filter((m) => m.genre === genre) : movies;
  res.json(result);
});

app.get("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);
  if (!movie) {
    return res.status(404).json({ message: "Không tìm thấy phim" });
  }
  res.json(movie);
});

app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy đường dẫn" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
