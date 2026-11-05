import { useState } from "react";
import { products } from "../data/products";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import type { CategoryFilter } from "../types";

export default function ProductsPage() {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<CategoryFilter>("Tất cả");

  const visible = products.filter((p) => {
    const matchCategory = category === "Tất cả" || p.category === category;
    const matchQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <section>
      <div className="page-head">
        <h1>Phụ kiện bàn làm việc</h1>
      </div>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
      />
      {visible.length === 0 ? (
        <p className="empty">Không có sản phẩm nào khớp “{query}”. Thử từ khóa khác hoặc chọn “Tất cả”.</p>
      ) : (
        <div className="product-grid">
          {visible.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
