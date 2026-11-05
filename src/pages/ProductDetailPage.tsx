import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { products, formatVND } from "../data/products";
import ProductImage from "../components/ProductImage";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  if (!product) {
    return (
      <p className="empty">
        Không tìm thấy sản phẩm. <Link to="/">Quay lại cửa hàng</Link>
      </p>
    );
  }

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };
  const increaseQty = () => setQty(qty + 1);

  const handleAdd = () => {
    dispatch(addToCart({ product, qty }));
    setAdded(true);
  };

  return (
    <section className="detail">
      <ProductImage product={product} size="lg" />
      <div className="detail-info">
        <Link to="/" className="back">← Cửa hàng</Link>
        <span className="category">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="detail-price">{formatVND(product.price)}</p>
        <p>{product.desc}</p>

        <div className="qty-row">
          <div className="stepper">
            <button onClick={decreaseQty} aria-label="Giảm">−</button>
            <span>{qty}</span>
            <button onClick={increaseQty} aria-label="Tăng">+</button>
          </div>
        </div>

        <div className="detail-actions">
          <button className="btn btn-lg" onClick={handleAdd}>Thêm {qty} vào giỏ</button>
        </div>
        {added && (
          <p className="notice">
            Đã thêm vào giỏ. <Link to="/cart">Xem giỏ hàng</Link>
          </p>
        )}
      </div>
    </section>
  );
}
