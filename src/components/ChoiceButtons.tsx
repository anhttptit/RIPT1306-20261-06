import { CHOICES } from "../lib/rules";
import type { ChoiceId } from "../service/types";

interface ChoiceButtonsProps {
  disabled: boolean;
  onPick: (id: ChoiceId) => void;
}

export default function ChoiceButtons({ disabled, onPick }: ChoiceButtonsProps) {
  return (
    <div className="choices">
      {CHOICES.map((c) => (
        <button key={c.id} className="choice" disabled={disabled} onClick={() => onPick(c.id)}>
          <span className="emoji">{c.emoji}</span>
          <span className="name">{c.label}</span>
        </button>
      ))}
    </div>
  );
}
