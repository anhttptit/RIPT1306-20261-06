import { categories } from "../data/products";
import type { CategoryFilter } from "../types";

interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
}

export default function FilterBar({ query, onQueryChange, category, onCategoryChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <input
        type="search"
        placeholder="Tìm sản phẩm…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Tìm sản phẩm"
      />
      <div className="chips" role="group" aria-label="Lọc theo loại">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? "chip active" : "chip"}
            onClick={() => onCategoryChange(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
