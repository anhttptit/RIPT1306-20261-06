import Movie from "../models/Movie.js";

export async function list(req, res) {
  const filter = {};
  if (req.query.genre) filter.genres = req.query.genre;
  const movies = await Movie.find(filter);
  res.json(movies);
}

export async function getOne(req, res) {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: "Không tìm thấy phim" });
  res.json(movie);
}

export async function create(req, res) {
  const movie = await Movie.create(req.body);
  res.status(201).json(movie);
}

export async function update(req, res) {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!movie) return res.status(404).json({ message: "Không tìm thấy phim" });
  res.json(movie);
}

export async function remove(req, res) {
  const deleted = await Movie.findByIdAndDelete(req.params.id);
  res.sendStatus(deleted ? 204 : 404);
}
