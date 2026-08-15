import type { Opening } from "../data/types";
import { allFens } from "../lib/chess";
import { starsFor, useOpeningProgress, useProgress } from "../lib/progress";
import { OPENINGS } from "../data/openings";
import { navigate } from "../lib/router";
import { Board } from "./Board";
import { Tutor } from "./Tutor";

/** Phase 5: celebrate, summarize, and point to what's next. */
export function Complete({
  opening,
  mistakes,
  quiz,
  onPracticeAgain,
  onRetakeQuiz,
}: {
  opening: Opening;
  mistakes: number | null;
  quiz: { score: number; total: number } | null;
  onPracticeAgain: () => void;
  onRetakeQuiz: () => void;
}) {
  const progress = useOpeningProgress(opening.id);
  const all = useProgress();
  const stars = starsFor(progress);
  const fens = allFens(opening);
  // Suggest openings not yet learned first, same side first.
  const suggestions = OPENINGS.filter((o) => o.id !== opening.id)
    .sort((a, b) => {
      const la = all[a.id]?.learned ? 1 : 0;
      const lb = all[b.id]?.learned ? 1 : 0;
      if (la !== lb) return la - lb;
      return (
        (a.side === opening.side ? 0 : 1) - (b.side === opening.side ? 0 : 1)
      );
    })
    .slice(0, 3);

  return (
    <div className="lesson-grid">
      <div className="board-col">
        <Board fen={fens[fens.length - 1]} orientation={opening.side} />
        <div className="board-controls">
          <button className="btn ghost" onClick={onPracticeAgain}>
            ↺ Practice again
          </button>
          <button className="btn ghost" onClick={onRetakeQuiz}>
            Retake quiz
          </button>
          <button
            className="btn primary"
            onClick={() => navigate({ page: "home" })}
          >
            Learn another opening →
          </button>
        </div>
      </div>
      <div className="panel-col">
        <Tutor
          mood="star"
          title={`You've learned the ${opening.name}! ${opening.emoji}`}
        >
          <div className="stars big" aria-label={`${stars} of 3 stars`}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={i < stars ? "on" : ""}>
                ★
              </span>
            ))}
          </div>
          <ul className="summary">
            <li>
              <strong>Walkthrough:</strong> done ✓
            </li>
            <li>
              <strong>Practice:</strong>{" "}
              {mistakes === null
                ? "—"
                : mistakes === 0
                  ? "perfect run! ✓"
                  : `${mistakes} slip${mistakes === 1 ? "" : "s"}`}
              {progress.bestMistakes !== undefined &&
                ` (best: ${progress.bestMistakes})`}
            </li>
            <li>
              <strong>Quiz:</strong>{" "}
              {quiz ? `${quiz.score} / ${quiz.total}` : "—"}
            </li>
          </ul>
          <p className="muted">
            Stars: ★ learned it · ★★ practiced with ≤2 slips · ★★★ perfect
            practice + perfect quiz. Come back and play it again in a few days —
            that's how it sticks.
          </p>
        </Tutor>
        <div className="side-card">
          <div className="side-card-title">Try next</div>
          <div className="next-list">
            {suggestions.map((o) => (
              <button
                key={o.id}
                type="button"
                className="next-item"
                onClick={() => navigate({ page: "learn", id: o.id })}
              >
                <span className="next-emoji">{o.emoji}</span>
                <span>
                  <strong>{o.name}</strong>
                  <br />
                  <span className="muted small">
                    {o.side === "white" ? "as White" : "as Black"} · {o.tagline}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
