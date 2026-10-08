import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Pagination from "./components/Pagination";
import PokemonList from "./components/PokemonList";
import PokemonModal from "./components/PokemonModal";
import SearchBar from "./components/SearchBar";
import { useDebounce } from "./hooks/useDebounce";
import { usePokemonList } from "./hooks/usePokemonList";

const PAGE_SIZE = 24;

export default function App() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { pokemons, total, status, error, retry } = usePokemonList(
    page,
    PAGE_SIZE,
  );
  const debouncedKeyword = useDebounce(keyword, 250);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "/" && tag !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filtered = useMemo(() => {
    const q = debouncedKeyword.trim().toLowerCase();
    if (!q) return pokemons;
    return pokemons.filter(
      ({ id, name }) => name.includes(q) || String(id) === q.replace("#", ""),
    );
  }, [pokemons, debouncedKeyword]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / PAGE_SIZE)),
    [total],
  );

  const handleSelect = useCallback((id: number) => setSelectedId(id), []);
  const handleClose = useCallback(() => setSelectedId(null), []);

  const handlePageChange = useCallback((next: number) => {
    setPage(next);
    setKeyword("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Pokemon</h1>
        <p className="muted">
          {total
            ? `${total.toLocaleString("vi-VN")} Pokémon`
            : "Đang kết nối PokeAPI"}
        </p>
        <SearchBar ref={searchRef} value={keyword} onChange={setKeyword} />
      </header>

      <main>
        {status === "loading" && (
          <ul className="grid" aria-busy="true">
            {Array.from({ length: PAGE_SIZE }, (_, i) => (
              <li key={i} className="skeleton" />
            ))}
          </ul>
        )}

        {status === "error" && (
          <div className="error-box">
            <p>{error}. Kiểm tra kết nối mạng rồi thử lại.</p>
            <button type="button" onClick={retry}>
              Tải lại
            </button>
          </div>
        )}

        {status === "success" && (
          <PokemonList pokemons={filtered} onSelect={handleSelect} />
        )}
      </main>

      {status === "success" && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      )}

      <PokemonModal pokemonId={selectedId} onClose={handleClose} />
    </div>
  );
}
