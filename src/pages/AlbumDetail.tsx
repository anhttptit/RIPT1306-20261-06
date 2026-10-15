import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { artworkUrl, formatDuration, getAlbum } from "../api/itunes";
import type { Album, Track } from "../types";
import NotFound from "./NotFound";

export default function AlbumDetail() {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState<Album>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getAlbum(albumId!);
        if (!ignore) {
          setAlbum(data.album);
          setTracks(data.tracks);
        }
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
  }, [albumId]);

  if (loading) return <p className="muted">Đang tải…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!album) return <NotFound />;

  return (
    <>
      <button className="back" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <div className="hero">
        <img
          src={artworkUrl(album.artworkUrl100, 600)}
          alt={`Ảnh bìa ${album.collectionName}`}
          className="cover"
        />
        <div>
          <span className="muted">Album</span>
          <h1>{album.collectionName}</h1>
          <div className="facts">
            <b>{album.artistName}</b>
            <span>{album.releaseDate.slice(0, 4)}</span>
            <span>{album.primaryGenreName}</span>
            <span>{tracks.length} bài</span>
          </div>
        </div>
      </div>

      <ol className="tracks">
        {tracks.map((t, i) => (
          <li key={t.trackId} className="track">
            <span className="num">{i + 1}</span>
            <b>{t.trackName}</b>
            <span className="muted">{formatDuration(t.trackTimeMillis)}</span>
            {t.previewUrl ? (
              <audio src={t.previewUrl} controls preload="none" />
            ) : (
              <span />
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
