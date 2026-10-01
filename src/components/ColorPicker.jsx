export default function ColorPicker({ colors, selectedId, onSelect }) {
  return (
    <div className="swatches">
      {colors.map((c) => (
        <button
          key={c.id}
          className={`swatch ${c.id === selectedId ? "selected" : ""}`}
          onClick={() => onSelect(c.id)}
          aria-pressed={c.id === selectedId}
        >
          <span className="dot" style={{ background: c.hex }} />
          {c.name}
        </button>
      ))}
    </div>
  );
}
