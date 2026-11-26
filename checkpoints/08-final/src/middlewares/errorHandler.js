export function notFound(req, res) {
  res.status(404).json({ message: "Không tìm thấy đường dẫn" });
}

export function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Id không hợp lệ" });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: "Dữ liệu đã tồn tại" });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Body không phải JSON hợp lệ" });
  }
  console.error(err);
  res.status(500).json({ message: "Lỗi server" });
}
