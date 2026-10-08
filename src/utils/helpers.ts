// ===== ES6: arrow function, template literal, regex, destructuring =====

const ARTWORK_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export const getIdFromUrl = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
};

export const getArtworkUrl = (id: number): string =>
  `${ARTWORK_BASE}/${id}.png`;

export const formatId = (id: number): string =>
  `#${String(id).padStart(4, "0")}`;

export const capitalize = (text: string): string =>
  text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export const getTypeColor = (type: string): string =>
  TYPE_COLORS[type] ?? "#888";

export const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Tấn công",
  defense: "Phòng thủ",
  "special-attack": "Tấn công ĐB",
  "special-defense": "Phòng thủ ĐB",
  speed: "Tốc độ",
};
