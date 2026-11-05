import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectCount } from "../store/cartSlice";

export default function CartBadge() {
  const count = useAppSelector(selectCount);
  return (
    <NavLink to="/cart" className="nav-icon" aria-label={`Giỏ hàng, ${count} sản phẩm`}>
      🛒 {count > 0 && <span className="count">{count}</span>}
    </NavLink>
  );
}
