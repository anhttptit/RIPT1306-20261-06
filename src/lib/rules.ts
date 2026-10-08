import type { Choice, ChoiceId, Result } from "../service/types";

export const CHOICES: readonly Choice[] = [
  { id: "rock", label: "Búa", emoji: "✊" },
  { id: "paper", label: "Bao", emoji: "✋" },
  { id: "scissors", label: "Kéo", emoji: "✌️" },
];

const BEATS: Record<ChoiceId, ChoiceId> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export const byId = (id: ChoiceId): Choice => CHOICES.find((c) => c.id === id)!;

export function judge(player: ChoiceId, computer: ChoiceId): Result {
  if (player === computer) return "draw";
  return BEATS[player] === computer ? "win" : "lose";
}

export function randomChoice(): ChoiceId {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)].id;
}
