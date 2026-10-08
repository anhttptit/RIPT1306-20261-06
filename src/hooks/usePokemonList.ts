// ===== Custom hook: useState + useEffect + useRef (AbortController) =====
import { useEffect, useRef, useState } from "react";
import { fetchPokemonList } from "../api/pokemonApi";
import type { PokemonSummary, Status } from "../types/pokemon";
import { getArtworkUrl, getIdFromUrl } from "../utils/helpers";

export function usePokemonList(page: number, pageSize: number) {
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const load = async () => {
      setStatus("loading");
      setError(null);
      try {
        const { count, results } = await fetchPokemonList(
          pageSize,
          (page - 1) * pageSize,
          controller.signal,
        );
        const list: PokemonSummary[] = results.map(({ name, url }) => {
          const id = getIdFromUrl(url);
          return { id, name, image: getArtworkUrl(id) };
        });
        setPokemons(list);
        setTotal(count);
        setStatus("success");
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError((err as Error).message);
        setStatus("error");
      }
    };

    load();

    return () => controller.abort();
  }, [page, pageSize, reloadKey]);

  const retry = () => setReloadKey((k) => k + 1);

  return { pokemons, total, status, error, retry };
}
