import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <h1>Giới thiệu</h1>
      <p>
        RIPT Music là demo tuần 12: tìm album, xem danh sách bài hát và nghe thử
        30 giây.
      </p>
      <p className="muted">
        Chuyển trang bằng <code>&lt;Link&gt;</code> không tải lại cả trang như
        thẻ <code>&lt;a&gt;</code>: mở tab Network để thấy không có request HTML
        mới.
      </p>
      <Link to="/?q=Đen">Thử tìm album của Đen →</Link>
    </>
  );
}
