import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const movies = [
  { id: 1, title: "Đèn đỏ ngã tư", genre: "Hành động", duration: 124 },
  { id: 2, title: "Bún chả cho người lạ", genre: "Hài", duration: 98 },
];
let nextId = 3;
const findIndex = (id) => movies.findIndex((m) => m.id === Number(id));

app.use(express.json());
app.use((req, res, next) => {
  console.log(new Date().toLocaleTimeString(), req.method, req.url);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

app.get("/api/movies", (req, res) => {
  const { genre } = req.query;
  const result = genre ? movies.filter((m) => m.genre === genre) : movies;
  res.json(result);
});

app.get("/api/movies/:id", (req, res) => {
  const i = findIndex(req.params.id);
  if (i === -1) return res.status(404).json({ message: "Không tìm thấy phim" });
  res.json(movies[i]);
});

app.post("/api/movies", (req, res) => {
  const { title, genre, duration } = req.body;
  if (!title || !genre) {
    return res.status(400).json({ message: "Thiếu title hoặc genre" });
  }
  const movie = { id: nextId++, title, genre, duration };
  movies.push(movie);
  res.status(201).json(movie);
});

app.put("/api/movies/:id", (req, res) => {
  const i = findIndex(req.params.id);
  if (i === -1) return res.sendStatus(404);
  movies[i] = { ...movies[i], ...req.body, id: movies[i].id };
  res.json(movies[i]);
});

app.delete("/api/movies/:id", (req, res) => {
  const i = findIndex(req.params.id);
  if (i === -1) return res.sendStatus(404);
  movies.splice(i, 1);
  res.sendStatus(204);
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
