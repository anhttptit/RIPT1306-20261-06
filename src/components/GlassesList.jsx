import Glasses from "./Glasses";

export default function GlassesList({ glasses, selectedId, onSelect }) {
  return (
    <div className="glasses-grid">
      {glasses.map((g) => (
        <button
          key={g.id}
          className={`glass-item ${g.id === selectedId ? "selected" : ""}`}
          onClick={() => onSelect(g.id)}
          aria-pressed={g.id === selectedId}
        >
          <svg viewBox="-6 -10 252 100" className="thumb" aria-hidden="true">
            <Glasses glass={g} />
          </svg>
          <span>{g.name}</span>
        </button>
      ))}
    </div>
  );
}
