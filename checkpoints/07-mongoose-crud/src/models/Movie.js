import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Thiếu tên phim"],
      trim: true,
    },
    genres: [String],
    duration: {
      type: Number,
      required: [true, "Thiếu thời lượng"],
      min: [30, "Thời lượng tối thiểu 30 phút"],
    },
    ageRating: {
      type: String,
      enum: {
        values: ["P", "K", "T13", "T16", "T18"],
        message: "ageRating không hợp lệ",
      },
      default: "P",
    },
    isShowing: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
