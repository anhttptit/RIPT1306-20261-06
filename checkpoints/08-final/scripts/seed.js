import "dotenv/config";
import mongoose from "mongoose";
import Movie from "../src/models/Movie.js";
import Showtime from "../src/models/Showtime.js";

await mongoose.connect(process.env.MONGODB_URI);

await Showtime.deleteMany({});
await Movie.deleteMany({});

const movies = await Movie.insertMany([
  { title: "Đèn đỏ ngã tư", genres: ["Hành động", "Tâm lý"], duration: 124, ageRating: "T16" },
  { title: "Bún chả cho người lạ", genres: ["Hài"], duration: 98, ageRating: "P" },
  { title: "Phi hành gia cuối cùng", genres: ["Viễn tưởng"], duration: 141, ageRating: "T13" },
  { title: "Mèo con đi lạc", genres: ["Hoạt hình", "Hài"], duration: 85, ageRating: "P" },
  { title: "Đêm trắng Hà Nội", genres: ["Tâm lý"], duration: 112, ageRating: "T18" },
  { title: "Tiếng còi đèn đỏ", genres: ["Hành động"], duration: 105, ageRating: "T16" },
  { title: "Bếp nhà ngoại", genres: ["Gia đình", "Hài"], duration: 96, ageRating: "K" },
]);

await Showtime.insertMany([
  { movie: movies[0]._id, startAt: new Date("2026-12-01T19:00:00+07:00"), room: "Phòng 1" },
  { movie: movies[0]._id, startAt: new Date("2026-12-01T21:30:00+07:00"), room: "Phòng 3" },
  { movie: movies[1]._id, startAt: new Date("2026-12-01T18:00:00+07:00"), room: "Phòng 2", bookedSeats: ["A1", "A2"] },
]);

console.log(`Đã nạp ${movies.length} phim và 3 suất chiếu`);
await mongoose.disconnect();
