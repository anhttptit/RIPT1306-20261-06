// Vẽ một cặp kính theo props. Dùng lại cho cả ảnh nhỏ trong danh sách và kính đeo trên mặt.
// Hệ toạ độ: rộng 240, cao 80; tâm hai tròng kính ở (70, 40) và (170, 40).

function Lens({ shape }) {
  switch (shape) {
    case "round":
      return <circle r="36" />;
    case "rect":
      return <rect x="-42" y="-22" width="84" height="44" rx="6" />;
    case "square":
      return <rect x="-38" y="-32" width="76" height="64" rx="10" />;
    case "big":
      return <rect x="-44" y="-38" width="88" height="76" rx="30" />;
    case "cat":
      return <path d="M-38 -6 Q-36 -24 -8 -22 L30 -26 Q46 -28 42 -8 Q36 26 2 28 Q-32 28 -38 -6 Z" />;
    case "aviator":
      return <path d="M-36 -22 Q0 -30 38 -22 Q44 -16 40 0 Q30 34 0 32 Q-30 30 -38 4 Q-42 -14 -36 -22 Z" />;
    default:
      return null;
  }
}

export default function Glasses({ glass, strokeWidth = 5 }) {
  const style = { fill: glass.lens, fillOpacity: 0.55, stroke: glass.frame, strokeWidth };
  return (
    <g>
      {/* Càng kính */}
      <path d="M28 34 L0 30 M212 34 L240 30" stroke={glass.frame} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Cầu kính */}
      <path d="M106 36 Q120 26 134 36" fill="none" stroke={glass.frame} strokeWidth={strokeWidth} />
      {/* Tròng trái lật ngược để hai bên đối xứng */}
      <g transform="translate(70 40) scale(-1 1)" style={style}>
        <Lens shape={glass.shape} />
      </g>
      <g transform="translate(170 40)" style={style}>
        <Lens shape={glass.shape} />
      </g>
    </g>
  );
}
