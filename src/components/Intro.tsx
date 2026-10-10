import type { Opening } from "../data/types";
import { START_FEN } from "../lib/chess";
import { Board } from "./Board";
import { Tutor } from "./Tutor";
import { useT } from "../lib/i18n";

/** Phase 1: what this opening is and why you'd play it. */
export function Intro({
  opening,
  onStart,
  onSkip,
}: {
  opening: Opening;
  onStart: () => void;
  onSkip: () => void;
}) {
  const t = useT();
  return (
    <div className="lesson-grid">
      <div className="board-col">
        <Board fen={START_FEN} orientation={opening.side} />
        <div className="board-controls">
          <span className="board-counter">{t.youPlay(opening.side)}</span>
          <button className="btn primary" onClick={onStart}>
            {t.startLesson}
          </button>
        </div>
      </div>
      <div className="panel-col">
        <Tutor mood="happy" title={t.meet(opening.name, opening.emoji)}>
          {opening.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Tutor>
        <div className="side-card">
          <div className="side-card-title">{t.rememberThree}</div>
          <ol className="ideas numbered">
            {opening.keyIdeas.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ol>
        </div>
        {opening.funFact && (
          <div className="side-card fun">
            <div className="side-card-title">{t.funFact}</div>
            <p>{opening.funFact}</p>
          </div>
        )}
        <button className="btn link" onClick={onSkip}>
          {t.knowOpening}
        </button>
      </div>
    </div>
  );
}
