import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: [true, "Thiếu phim"],
  },
  startAt: { type: Date, required: [true, "Thiếu giờ chiếu"] },
  room: String,
  bookedSeats: [String],
});

export default mongoose.model("Showtime", showtimeSchema);
