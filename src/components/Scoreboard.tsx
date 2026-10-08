import type { Score } from "../service/types";

interface ScoreboardProps {
  score: Score;
}

export default function Scoreboard({ score }: ScoreboardProps) {
  return (
    <div className="scoreboard">
      <div className="score win"><b>{score.win}</b><span>Thắng</span></div>
      <div className="score lose"><b>{score.lose}</b><span>Thua</span></div>
      <div className="score draw"><b>{score.draw}</b><span>Hòa</span></div>
    </div>
  );
}
