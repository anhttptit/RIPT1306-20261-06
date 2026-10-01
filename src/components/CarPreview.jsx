// Xe vẽ bằng SVG: đổi thuộc tính fill là đổi màu xe
export default function CarPreview({ color }) {
  return (
    <svg viewBox="0 0 600 260" className="car" role="img" aria-label={`Xe màu ${color.name}`}>
      <ellipse cx="300" cy="228" rx="250" ry="14" fill="rgba(0,0,0,0.12)" />
      {/* Thân xe */}
      <path
        d="M40 195 L40 160 Q40 140 62 136 L150 122 Q192 80 252 74 L372 74 Q424 76 462 116 L540 130 Q566 136 566 162 L566 195 Q566 202 558 202 L42 202 Q40 202 40 195 Z"
        fill={color.hex}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="2"
        style={{ transition: "fill 0.4s" }}
      />
      {/* Bóng đổ phần dưới thân xe cho có khối */}
      <path d="M40 172 L566 172 L566 195 Q566 202 558 202 L42 202 Q40 202 40 195 Z" fill="rgba(0,0,0,0.14)" />
      {/* Cửa kính */}
      <path d="M176 124 Q206 92 252 88 L302 88 L302 124 Z" fill="#cfe3f0" />
      <path d="M316 88 L368 88 Q408 90 438 124 L316 124 Z" fill="#cfe3f0" />
      {/* Đường cửa, tay nắm */}
      <path d="M308 90 L308 196" stroke="rgba(0,0,0,0.25)" strokeWidth="2" />
      <rect x="262" y="138" width="26" height="6" rx="3" fill="rgba(0,0,0,0.35)" />
      <rect x="370" y="138" width="26" height="6" rx="3" fill="rgba(0,0,0,0.35)" />
      {/* Đèn */}
      <ellipse cx="552" cy="150" rx="10" ry="7" fill="#fff4c2" />
      <rect x="40" y="146" width="10" height="16" rx="3" fill="#e0322f" />
      {/* Bánh xe */}
      {[150, 460].map((x) => (
        <g key={x}>
          <circle cx={x} cy="200" r="36" fill="#222" />
          <circle cx={x} cy="200" r="18" fill="#9aa0a8" />
          <circle cx={x} cy="200" r="6" fill="#444" />
        </g>
      ))}
    </svg>
  );
}
