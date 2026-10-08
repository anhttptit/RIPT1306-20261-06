interface StatBarProps {
  label: string;
  value: number;
  color: string;
  max?: number;
}

export default function StatBar({
  label,
  value,
  color,
  max = 255,
}: StatBarProps) {
  const percent = Math.min(100, (value / max) * 100);

  return (
    <div className="stat">
      <span className="stat__label">{label}</span>
      <span className="stat__value">{value}</span>
      <div className="stat__track">
        <div
          className="stat__fill"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
    </div>
  );
}
