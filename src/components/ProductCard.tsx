import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { formatVND } from "../data/products";
import ProductImage from "./ProductImage";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`}>
        <ProductImage product={product} />
      </Link>
      <div className="product-card-body">
        <span className="category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-card-foot">
          <strong>{formatVND(product.price)}</strong>
        </div>
        <button className="btn" onClick={() => dispatch(addToCart({ product }))}>
          Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}
