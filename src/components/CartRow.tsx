import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { increase, decrease, removeFromCart } from "../store/cartSlice";
import { formatVND } from "../data/products";
import ProductImage from "./ProductImage";
import type { CartItem } from "../types";

interface CartRowProps {
  item: CartItem;
}

export default function CartRow({ item }: CartRowProps) {
  const dispatch = useAppDispatch();
  return (
    <li className="cart-item">
      <ProductImage product={item} size="sm" />
      <div className="grow">
        <Link to={`/product/${item.id}`} className="product-name">
          {item.name}
        </Link>
        <span className="muted">{formatVND(item.price)}</span>
      </div>
      <div className="stepper">
        <button onClick={() => dispatch(decrease(item.id))} aria-label="Giảm">
          −
        </button>
        <span>{item.qty}</span>
        <button onClick={() => dispatch(increase(item.id))} aria-label="Tăng">
          +
        </button>
      </div>
      <strong className="line-total">{formatVND(item.price * item.qty)}</strong>
      <button
        className="link-danger"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        Xóa
      </button>
    </li>
  );
}
