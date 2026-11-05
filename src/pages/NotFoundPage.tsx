import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <p className="empty">
      Không có trang này. <Link to="/">Về cửa hàng</Link>
    </p>
  );
}
