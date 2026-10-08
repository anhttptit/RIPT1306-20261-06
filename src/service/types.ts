export type ChoiceId = "rock" | "paper" | "scissors";
export type Result = "win" | "lose" | "draw";
export type Score = Record<Result, number>;
export type Phase = "idle" | "countdown" | "result";

export interface Choice {
  id: ChoiceId;
  label: string;
  emoji: string;
}
