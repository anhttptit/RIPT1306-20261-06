import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1>Không tìm thấy trang</h1>
      <p className="muted">Đường dẫn hoặc album này không tồn tại.</p>
      <Link to="/">Về trang khám phá</Link>
    </>
  );
}
