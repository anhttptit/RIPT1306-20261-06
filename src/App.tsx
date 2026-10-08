import { useEffect, useState } from "react";
import { byId, judge, randomChoice } from "./lib/rules";
import type { ChoiceId, Phase, Result, Score } from "./service/types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Hand from "./components/Hand";
import Scoreboard from "./components/Scoreboard";
import ChoiceButtons from "./components/ChoiceButtons";

const RESULT_TEXT: Record<Result, string> = {
  win: "Bạn thắng!",
  lose: "Máy thắng!",
  draw: "Hòa!",
};
const EMPTY_SCORE: Score = { win: 0, lose: 0, draw: 0 };

export default function App() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(3);
  const [player, setPlayer] = useState<ChoiceId | null>(null);
  const [computer, setComputer] = useState<ChoiceId | null>(null);

  const [score, setScore] = useLocalStorage<Score>("ott-score", EMPTY_SCORE);

  function pick(id: ChoiceId) {
    if (phase === "countdown") return;
    setPlayer(id);
    setComputer(randomChoice());
    setCount(3);
    setPhase("countdown");
  }

  useEffect(() => {
    if (phase !== "countdown" || player === null || computer === null) return;

    const id = setTimeout(() => {
      if (count > 1) {
        setCount(count - 1);
        return;
      }
      const result = judge(player, computer);
      setPhase("result");
      setScore((s) => ({ ...s, [result]: s[result] + 1 }));
    }, 600);

    return () => clearTimeout(id);
  }, [phase, count, player, computer, setScore]);

  const showResult = phase === "result" && player !== null && computer !== null;
  const result = showResult ? judge(player, computer) : null;
  const shaking = phase === "countdown";
  const playerEmoji = showResult ? byId(player).emoji : "✊";
  const computerEmoji = showResult ? byId(computer).emoji : "✊";

  return (
    <main className="app">
      <h1 className="title">Oẳn tù tì</h1>
      <p className="subtitle">
        Đấu với máy. Tỉ số được lưu lại, tải lại trang vẫn còn.
      </p>

      <Scoreboard score={score} />

      <section className="arena" aria-live="polite">
        <div>
          <Hand emoji={playerEmoji} side="player" shaking={shaking} />
          <div className="side-name">Bạn</div>
        </div>

        <div className="center">
          {phase === "idle" && <div className="vs">Chọn Búa, Bao hoặc Kéo</div>}
          {phase === "countdown" && <div className="count">{count}</div>}
          {showResult && result && (
            <>
              <div className={`result ${result}`}>{RESULT_TEXT[result]}</div>
              <div className="muted">Máy ra {byId(computer).label}</div>
            </>
          )}
        </div>

        <div>
          <Hand emoji={computerEmoji} side="computer" shaking={shaking} />
          <div className="side-name">Máy</div>
        </div>
      </section>

      <ChoiceButtons disabled={phase === "countdown"} onPick={pick} />

      <div className="row">
        <button className="ghost" onClick={() => setScore(EMPTY_SCORE)}>
          Xóa tỉ số
        </button>
      </div>
    </main>
  );
}
