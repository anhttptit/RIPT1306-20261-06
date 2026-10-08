import { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../api/pokemonApi";
import type { PokemonDetail, Status } from "../types/pokemon";

export function usePokemonDetail(id: number | null) {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) {
      setDetail(null);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    fetchPokemonDetail(id, controller.signal)
      .then((data) => {
        setDetail(data);
        setStatus("success");
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setStatus("error");
      });

    return () => controller.abort();
  }, [id]);

  return { detail, status, error };
}
