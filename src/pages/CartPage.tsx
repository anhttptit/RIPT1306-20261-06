import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearCart, selectItems, selectTotal } from "../store/cartSlice";
import { formatVND } from "../data/products";
import CartRow from "../components/CartRow";

export default function CartPage() {
  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectTotal);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <h1>Giỏ hàng đang trống</h1>
        <p>Chọn vài món ở cửa hàng rồi quay lại đây.</p>
        <Link to="/" className="btn">
          Đến cửa hàng
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-head">
        <h1>Giỏ hàng</h1>
      </div>
      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((i) => (
            <CartRow key={i.id} item={i} />
          ))}
        </ul>
        <aside className="summary">
          <div className="summary-row">
            <span>Tạm tính</span>
            <span>{formatVND(total)}</span>
          </div>
          <div className="summary-row">
            <span>Vận chuyển</span>
            <span>Miễn phí</span>
          </div>
          <div className="summary-row summary-total">
            <span>Tổng</span>
            <span>{formatVND(total)}</span>
          </div>
          <Link to="/checkout" className="btn btn-lg btn-block">
            Thanh toán
          </Link>
          <button
            className="btn btn-ghost btn-block"
            onClick={() => dispatch(clearCart())}
          >
            Xóa hết giỏ
          </button>
        </aside>
      </div>
    </section>
  );
}
