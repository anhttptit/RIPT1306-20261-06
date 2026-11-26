const movies = [
  { id: 1, title: "Đèn đỏ ngã tư", genre: "Hành động", duration: 124 },
  { id: 2, title: "Bún chả cho người lạ", genre: "Hài", duration: 98 },
];
let nextId = 3;
const findIndex = (id) => movies.findIndex((m) => m.id === Number(id));

export function list(req, res) {
  const { genre } = req.query;
  res.json(genre ? movies.filter((m) => m.genre === genre) : movies);
}

export function getOne(req, res) {
  const i = findIndex(req.params.id);
  if (i === -1) return res.status(404).json({ message: "Không tìm thấy phim" });
  res.json(movies[i]);
}

export function create(req, res) {
  const { title, genre, duration } = req.body;
  if (!title || !genre) {
    return res.status(400).json({ message: "Thiếu title hoặc genre" });
  }
  const movie = { id: nextId++, title, genre, duration };
  movies.push(movie);
  res.status(201).json(movie);
}

export function update(req, res) {
  const i = findIndex(req.params.id);
  if (i === -1) return res.sendStatus(404);
  movies[i] = { ...movies[i], ...req.body, id: movies[i].id };
  res.json(movies[i]);
}

export function remove(req, res) {
  const i = findIndex(req.params.id);
  if (i === -1) return res.sendStatus(404);
  movies.splice(i, 1);
  res.sendStatus(204);
}
