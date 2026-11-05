import type { Product } from "../types";

interface ProductImageProps {
  product: Product;
  size?: "sm" | "md" | "lg";
}

export default function ProductImage({ product, size = "md" }: ProductImageProps) {
  return (
    <div className={"product-img product-img-" + size} style={{ background: product.color }}>
      <span aria-hidden="true">{product.emoji}</span>
    </div>
  );
}
