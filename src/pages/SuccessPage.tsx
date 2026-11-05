import { Link, Navigate, useLocation } from "react-router-dom";
import { formatVND } from "../data/products";
import type { Order } from "../types";

export default function SuccessPage() {
  const location = useLocation();
  const order = location.state as Order | null;
  if (!order) return <Navigate to="/" replace />;
  return (
    <section className="empty-state">
      <h1>Đặt hàng thành công</h1>
      <p>
        Cảm ơn {order.name}. Đơn {order.count} sản phẩm, tổng {formatVND(order.total)}, sẽ giao tới{" "}
        {order.address}.
      </p>
      <Link to="/" className="btn">Tiếp tục mua sắm</Link>
    </section>
  );
}
