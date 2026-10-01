import Glasses from "./Glasses";

// Khuôn mặt vẽ bằng SVG. Có kính thì đặt kính lên đúng vị trí hai mắt.
export default function Model({ glass }) {
  return (
    <svg viewBox="0 0 400 440" className="model" role="img" aria-label={glass ? `Đang đeo kính ${glass.name}` : "Chưa đeo kính"}>
      {/* Áo và cổ */}
      <path d="M60 440 Q70 370 200 360 Q330 370 340 440 Z" fill="#3d5a80" />
      <rect x="172" y="320" width="56" height="50" rx="18" fill="#e3b391" />
      {/* Tai */}
      <ellipse cx="82" cy="215" rx="16" ry="26" fill="#eab896" />
      <ellipse cx="318" cy="215" rx="16" ry="26" fill="#eab896" />
      {/* Mặt */}
      <ellipse cx="200" cy="210" rx="118" ry="140" fill="#f1c7a6" />
      {/* Tóc */}
      <path d="M82 190 Q78 70 200 64 Q322 70 318 190 Q300 120 240 112 Q200 140 150 118 Q100 130 82 190 Z" fill="#2b2118" />
      {/* Lông mày, mắt */}
      <path d="M126 176 Q150 164 172 174 M228 174 Q250 164 274 176" stroke="#2b2118" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="150" cy="205" rx="9" ry="7" fill="#2b2118" />
      <ellipse cx="250" cy="205" rx="9" ry="7" fill="#2b2118" />
      {/* Mũi, miệng */}
      <path d="M200 215 Q192 250 204 256" stroke="#c9936f" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M168 288 Q200 308 232 288" stroke="#a8543f" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* Kính: chỉ vẽ khi đã chọn. key đổi → kính cũ bị gỡ, kính mới gắn vào và chạy lại hiệu ứng */}
      {glass && (
        <g key={glass.id} transform="translate(80 165)" className="on-face">
          <Glasses glass={glass} strokeWidth={6} />
        </g>
      )}
    </svg>
  );
}
