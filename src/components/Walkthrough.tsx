import { useEffect, useMemo, useState } from "react";
import type { Opening } from "../data/types";
import { allFens, moveLabel, sanToSquares } from "../lib/chess";
import { Board } from "./Board";
import { Tutor } from "./Tutor";
import { MoveList } from "./MoveList";
import { useLang, useT } from "../lib/i18n";

/**
 * Phase 2: the tutor walks through the line one move at a time.
 * The learner steps forward/back; every move has an explanation and (often) arrows.
 */
export function Walkthrough({
  opening,
  onDone,
  onSkip,
}: {
  opening: Opening;
  onDone: () => void;
  onSkip: () => void;
}) {
  const t = useT();
  const rtl = useLang() === "he";
  const fens = useMemo(() => allFens(opening), [opening]);
  const [ply, setPly] = useState(0);
  const total = opening.moves.length;
  const atEnd = ply === total;
  const move = ply > 0 ? opening.moves[ply - 1] : null;
  const lastMove = move ? sanToSquares(fens[ply - 1], move.san) : null;
  const learnerSide = opening.side;
  const isLearnerMove = move
    ? (ply - 1) % 2 === (learnerSide === "white" ? 0 : 1)
    : false;

  // keyboard: arrow keys step (mirrored in Hebrew, where "next" points left)
  useEffect(() => {
    const [fwd, back] = rtl
      ? ["ArrowLeft", "ArrowRight"]
      : ["ArrowRight", "ArrowLeft"];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === fwd) setPly((p) => Math.min(total, p + 1));
      if (e.key === back) setPly((p) => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, rtl]);

  return (
    <div className="lesson-grid">
      <div className="board-col">
        <Board
          fen={fens[ply]}
          orientation={learnerSide}
          arrows={move?.arrows ?? []}
          highlights={move?.highlights ?? []}
          lastMove={lastMove}
        />
        <div className="board-controls">
          <button
            className="btn ghost"
            onClick={() => setPly(0)}
            disabled={ply === 0}
            title={t.backToStart}
            aria-label={t.backToStart}
          >
            {t.toStartIcon}
          </button>
          <button
            className="btn ghost"
            onClick={() => setPly((p) => Math.max(0, p - 1))}
            disabled={ply === 0}
          >
            {t.back}
          </button>
          <span className="board-counter">
            {ply} / {total}
          </span>
          <button
            className="btn primary"
            onClick={() => (atEnd ? onDone() : setPly((p) => p + 1))}
          >
            {atEnd ? t.practiceIt : t.next}
          </button>
        </div>
      </div>

      <div className="panel-col">
        {ply === 0 ? (
          <Tutor mood="happy" title={t.walkTitle(opening.name)}>
            {t.walkIntro(t.side(learnerSide))}
          </Tutor>
        ) : (
          <Tutor
            mood={atEnd ? "star" : isLearnerMove ? "happy" : "neutral"}
            title={
              <span>
                <span
                  className={`side-chip ${(ply - 1) % 2 === 0 ? "w" : "b"}`}
                >
                  {t.side((ply - 1) % 2 === 0 ? "white" : "black")}
                </span>{" "}
                <span className="san">
                  {moveLabel(ply - 1)} {move!.san}
                </span>
                {isLearnerMove ? t.yourMoveSuffix : ""}
              </span>
            }
            footer={atEnd ? t.wholeLine(t.side(learnerSide)) : undefined}
          >
            <p>{move!.explanation}</p>
          </Tutor>
        )}

        <div className="side-card">
          <div className="side-card-title">{t.moves}</div>
          <MoveList opening={opening} ply={ply} onJump={setPly} />
        </div>

        <details className="side-card collapsible">
          <summary className="side-card-title">{t.keyIdeas}</summary>
          <ul className="ideas">
            {opening.keyIdeas.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </details>

        <button className="btn link" onClick={onSkip}>
          {t.knowLine}
        </button>
      </div>
    </div>
  );
}
