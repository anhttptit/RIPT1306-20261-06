import Showtime from "../models/Showtime.js";

export async function list(req, res) {
  const filter = {};
  if (req.query.movieId) filter.movie = req.query.movieId;

  const showtimes = await Showtime.find(filter)
    .populate("movie", "title duration ageRating")
    .sort("startAt");

  res.json(showtimes);
}

export async function create(req, res) {
  const showtime = await Showtime.create(req.body);
  res.status(201).json(showtime);
}
