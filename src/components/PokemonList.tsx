import type { PokemonSummary } from "../types/pokemon";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: PokemonSummary[];
  onSelect: (id: number) => void;
}

export default function PokemonList({ pokemons, onSelect }: PokemonListProps) {
  if (pokemons.length === 0) {
    return (
      <p className="empty">
        Không có Pokémon nào khớp. Thử từ khoá khác hoặc sang trang khác.
      </p>
    );
  }

  return (
    <ul className="grid">
      {pokemons.map((p) => (
        <li key={p.id}>
          <PokemonCard pokemon={p} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
