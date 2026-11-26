import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Đã kết nối MongoDB:", mongoose.connection.name);
}
