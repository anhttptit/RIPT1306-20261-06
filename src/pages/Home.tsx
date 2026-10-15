import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { artworkUrl, searchAlbums } from "../api/itunes";
import type { Album } from "../types";

const SUGGESTIONS = [
  "Sơn Tùng M-TP",
  "Đen",
  "Hoàng Thùy Linh",
  "Mỹ Tâm",
  "HIEUTHUHAI",
];

export default function Home() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";

  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!q) return;
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await searchAlbums(q);
        if (!ignore) setAlbums(data);
      } catch (err) {
        if (!ignore) setError((err as Error).message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [q]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    if (text) setParams({ q: text });
  }

  return (
    <>
      <h1>Khám phá album</h1>
      <form className="search" onSubmit={handleSubmit} key={q}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Tên nghệ sĩ, album…"
          autoFocus
        />
        <button className="primary">Tìm</button>
      </form>

      <div className="toolbar">
        {SUGGESTIONS.map((s) => (
          <Link
            key={s}
            to={`/?q=${encodeURIComponent(s)}`}
            className={`chip ${s === q ? "on" : ""}`}
          >
            {s}
          </Link>
        ))}
      </div>

      {!q ? (
        <p className="muted">
          Nhập từ khoá hoặc chọn một nghệ sĩ gợi ý để bắt đầu.
        </p>
      ) : loading ? (
        <p className="muted">Đang tải…</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : albums.length === 0 ? (
        <p className="muted">Không tìm thấy album nào.</p>
      ) : (
        <div className="albums">
          {albums.map((a) => (
            <Link
              key={a.collectionId}
              to={`/album/${a.collectionId}`}
              className="album-card"
            >
              <img
                src={artworkUrl(a.artworkUrl100)}
                alt={`Ảnh bìa ${a.collectionName}`}
                loading="lazy"
              />
              <h3>{a.collectionName}</h3>
              <span className="muted">
                {a.artistName} · {a.releaseDate.slice(0, 4)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
