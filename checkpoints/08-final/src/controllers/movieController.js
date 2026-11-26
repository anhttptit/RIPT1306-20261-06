import Movie from "../models/Movie.js";

export async function list(req, res) {
  const { q, genre } = req.query;
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 6, 50);

  const filter = {};
  if (genre) filter.genres = genre;
  if (q) filter.title = { $regex: q, $options: "i" };

  const [items, total] = await Promise.all([
    Movie.find(filter)
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit),
    Movie.countDocuments(filter),
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) });
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
