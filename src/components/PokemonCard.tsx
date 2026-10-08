import { memo } from "react";
import type { PokemonSummary } from "../types/pokemon";
import { capitalize, formatId } from "../utils/helpers";

interface PokemonCardProps {
  pokemon: PokemonSummary;
  onSelect: (id: number) => void;
}

function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  const { id, name, image } = pokemon;

  return (
    <button type="button" className="card" onClick={() => onSelect(id)}>
      <span className="card__id">{formatId(id)}</span>
      <img
        className="card__img"
        src={image}
        alt={name}
        loading="lazy"
        width={160}
        height={160}
      />
      <span className="card__name">{capitalize(name)}</span>
    </button>
  );
}

export default memo(PokemonCard);
