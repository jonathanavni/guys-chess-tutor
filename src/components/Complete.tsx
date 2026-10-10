import { useEffect, useRef } from "react";
import type { Opening } from "../data/types";
import { allFens } from "../lib/chess";
import { starsFor, useOpeningProgress, useProgress } from "../lib/progress";
import { OPENINGS } from "../data/openings";
import { navigate } from "../lib/router";
import { celebrate } from "../lib/celebrate";
import { Board } from "./Board";
import { Tutor } from "./Tutor";
import { Stars } from "./Stars";
import { localize, useLang, useT } from "../lib/i18n";

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
  const t = useT();
  const lang = useLang();
  const stars = starsFor(progress);
  const fens = allFens(opening);
  // A perfect practice run + perfect quiz in this sitting = mastered (changes the title).
  const masteredNow =
    mistakes === 0 && quiz !== null && quiz.score === quiz.total;
  // Reaching "Done" always earns a party, slips or not. The ref stops StrictMode double-firing.
  const celebrated = useRef(false);
  useEffect(() => {
    if (!celebrated.current) {
      celebrated.current = true;
      celebrate();
    }
  }, []);

  // Keep walking the learning path: the next not-yet-mastered openings after this one.
  const idx = OPENINGS.findIndex((o) => o.id === opening.id);
  const suggestions = [...OPENINGS.slice(idx + 1), ...OPENINGS.slice(0, idx)]
    .filter(
      (o) => starsFor(all[o.id] ?? { learned: false, practiceRuns: 0 }) < 3,
    )
    .slice(0, 3)
    .map((o) => localize(o, lang));

  return (
    <div className="lesson-grid">
      <div className="board-col">
        <Board fen={fens[fens.length - 1]} orientation={opening.side} />
        <div className="board-controls stack">
          <button className="btn ghost" onClick={onPracticeAgain}>
            {t.practiceAgain}
          </button>
          <button className="btn ghost" onClick={onRetakeQuiz}>
            {t.retakeQuiz}
          </button>
          <button
            className="btn primary"
            onClick={() => navigate({ page: "home" })}
          >
            {t.allOpeningsCta}
          </button>
        </div>
      </div>
      <div className="panel-col">
        <Tutor
          mood="star"
          title={
            masteredNow
              ? t.masteredTitle(opening.name)
              : t.learnedTitle(opening.name, opening.emoji)
          }
        >
          <Stars count={stars} big />
          <ul className="summary">
            <li>
              <strong>{t.summaryWalk}</strong> {t.summaryWalkDone}
            </li>
            <li>
              <strong>{t.summaryPractice}</strong>{" "}
              {mistakes === null
                ? "—"
                : mistakes === 0
                  ? t.summaryPerfect
                  : t.slips(mistakes)}
              {progress.bestMistakes !== undefined &&
                t.summaryBest(progress.bestMistakes)}
            </li>
            <li>
              <strong>{t.summaryQuiz}</strong>{" "}
              {quiz ? `${quiz.score} / ${quiz.total}` : "—"}
            </li>
          </ul>
          <p className="muted">{t.starsLegend}</p>
        </Tutor>
        {suggestions.length > 0 && (
          <div className="side-card">
            <div className="side-card-title">{t.nextOnPath}</div>
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
                    <span className="muted small next-sub">
                      {t.levelAs(o.difficulty, o.side)}
                    </span>
                  </span>
                  <span className="next-arrow" aria-hidden>
                    {t.fwd}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
