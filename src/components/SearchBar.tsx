import { forwardRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange }, ref) => (
    <label className="search">
      <span className="visually-hidden">Tìm Pokémon trong trang này</span>
      <input
        ref={ref}
        type="search"
        placeholder="Tìm theo tên hoặc số…  (nhấn / để tìm)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  ),
);

SearchBar.displayName = "SearchBar";
export default SearchBar;
