import type { Album, ItunesResponse, Track } from "../types";

const API_URL = "https://itunes.apple.com";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(
      `Gọi API thất bại (mã ${res.status}). Đợi một phút rồi tải lại.`,
    );
  return res.json();
}

export async function searchAlbums(term: string): Promise<Album[]> {
  const query = new URLSearchParams({
    term,
    entity: "album",
    country: "VN",
    limit: "24",
  });
  const data = await getJson<ItunesResponse<Album>>(
    `${API_URL}/search?${query}`,
  );
  return data.results;
}

export async function getAlbum(
  id: string,
): Promise<{ album: Album | undefined; tracks: Track[] }> {
  const query = new URLSearchParams({ id, entity: "song", country: "VN" });
  const data = await getJson<ItunesResponse<Album | Track>>(
    `${API_URL}/lookup?${query}`,
  );
  const [album, ...tracks] = data.results;
  return { album: album as Album | undefined, tracks: tracks as Track[] };
}

export const artworkUrl = (url: string, size = 300) =>
  url.replace("100x100bb", `${size}x${size}bb`);

export const formatDuration = (ms: number) => {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
