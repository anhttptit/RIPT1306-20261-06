import { useEffect, useMemo, useRef } from "react";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import {
  STAT_LABELS,
  capitalize,
  formatId,
  getArtworkUrl,
  getTypeColor,
} from "../utils/helpers";
import StatBar from "./StatBar";

interface PokemonModalProps {
  pokemonId: number | null;
  onClose: () => void;
}

export default function PokemonModal({
  pokemonId,
  onClose,
}: PokemonModalProps) {
  const { detail, status, error } = usePokemonDetail(pokemonId);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pokemonId === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [pokemonId, onClose]);

  const mainColor = useMemo(
    () => (detail ? getTypeColor(detail.types[0].type.name) : "#cfd6e4"),
    [detail],
  );

  const totalStats = useMemo(
    () => detail?.stats.reduce((sum, { base_stat }) => sum + base_stat, 0) ?? 0,
    [detail],
  );

  if (pokemonId === null) return null;

  const image =
    detail?.sprites.other?.["official-artwork"]?.front_default ??
    getArtworkUrl(pokemonId);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ "--accent": mainColor } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Đóng"
        >
          ✕
        </button>

        <div className="modal__hero">
          <img src={image} alt={detail?.name ?? ""} />
        </div>

        <div className="modal__body">
          {status === "loading" && <p className="muted">Đang tải thông tin…</p>}
          {status === "error" && <p className="error">{error}</p>}

          {status === "success" && detail && (
            <>
              <p className="modal__id">{formatId(detail.id)}</p>
              <h2 id="modal-title">{capitalize(detail.name)}</h2>

              <div className="types">
                {detail.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className="type"
                    style={{ background: getTypeColor(type.name) }}
                  >
                    {capitalize(type.name)}
                  </span>
                ))}
              </div>

              <dl className="facts">
                <div>
                  <dt>Chiều cao</dt>
                  <dd>{(detail.height / 10).toFixed(1)} m</dd>
                </div>
                <div>
                  <dt>Cân nặng</dt>
                  <dd>{(detail.weight / 10).toFixed(1)} kg</dd>
                </div>
                <div>
                  <dt>Kinh nghiệm</dt>
                  <dd>{detail.base_experience ?? "—"}</dd>
                </div>
              </dl>

              <h3>Kỹ năng</h3>
              <p className="abilities">
                {detail.abilities
                  .map(
                    ({ ability, is_hidden }) =>
                      `${capitalize(ability.name)}${is_hidden ? " (ẩn)" : ""}`,
                  )
                  .join(", ")}
              </p>

              <h3>
                Chỉ số cơ bản <span className="muted">· tổng {totalStats}</span>
              </h3>
              {detail.stats.map(({ stat, base_stat }) => (
                <StatBar
                  key={stat.name}
                  label={STAT_LABELS[stat.name] ?? stat.name}
                  value={base_stat}
                  color={mainColor}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
