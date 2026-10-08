interface HandProps {
  emoji: string;
  side: "player" | "computer";
  shaking: boolean;
}

export default function Hand({ emoji, side, shaking }: HandProps) {
  return <span className={`hand ${side} ${shaking ? "shake" : ""}`}>{emoji}</span>;
}
