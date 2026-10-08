import type { PokemonDetail, PokemonListResponse } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

const detailCache = new Map<number, PokemonDetail>();

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Không tải được dữ liệu (mã lỗi ${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const fetchPokemonList = (
  limit = 20,
  offset = 0,
  signal?: AbortSignal,
) =>
  request<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    signal,
  );

export const fetchPokemonDetail = async (
  id: number,
  signal?: AbortSignal,
): Promise<PokemonDetail> => {
  const cached = detailCache.get(id);
  if (cached) return cached;

  const data = await request<PokemonDetail>(
    `${BASE_URL}/pokemon/${id}`,
    signal,
  );
  detailCache.set(id, data);
  return data;
};
