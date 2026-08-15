import { useEffect, useMemo, useState } from "react";
import type { Opening } from "../data/types";
import { allFens, moveLabel, sanToSquares } from "../lib/chess";
import { Board } from "./Board";
import { Tutor } from "./Tutor";
import { MoveList } from "./MoveList";

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

  // keyboard: ← → to step
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setPly((p) => Math.min(total, p + 1));
      if (e.key === "ArrowLeft") setPly((p) => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

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
            title="Back to start"
          >
            ⏮
          </button>
          <button
            className="btn ghost"
            onClick={() => setPly((p) => Math.max(0, p - 1))}
            disabled={ply === 0}
          >
            ← Back
          </button>
          <span className="board-counter">
            {ply} / {total}
          </span>
          <button
            className="btn primary"
            onClick={() => (atEnd ? onDone() : setPly((p) => p + 1))}
          >
            {atEnd ? "Practice it →" : "Next →"}
          </button>
        </div>
      </div>

      <div className="panel-col">
        {ply === 0 ? (
          <Tutor
            mood="happy"
            title={`Let's walk through the ${opening.name} together.`}
          >
            <p>
              I'll play each move on the board and tell you <em>why</em> it's
              played. You're{" "}
              <strong>{learnerSide === "white" ? "White" : "Black"}</strong> in
              this opening, so the board is set up from your side.
            </p>
            <p>
              Press <strong>Next</strong> (or the → key) when you're ready for
              the first move.
            </p>
          </Tutor>
        ) : (
          <Tutor
            mood={atEnd ? "star" : isLearnerMove ? "happy" : "neutral"}
            title={
              <span>
                <span
                  className={`side-chip ${(ply - 1) % 2 === 0 ? "w" : "b"}`}
                >
                  {(ply - 1) % 2 === 0 ? "White" : "Black"}
                </span>{" "}
                {moveLabel(ply - 1)} <span className="san">{move!.san}</span>
                {isLearnerMove ? " — your move" : ""}
              </span>
            }
            footer={
              atEnd ? (
                <p>
                  That's the whole line! Next, <strong>you</strong> play{" "}
                  {learnerSide === "white" ? "White" : "Black"}
                  's moves and I'll play the other side. Ready?
                </p>
              ) : undefined
            }
          >
            <p>{move!.explanation}</p>
          </Tutor>
        )}

        <div className="side-card">
          <div className="side-card-title">Moves</div>
          <MoveList opening={opening} ply={ply} onJump={setPly} />
        </div>

        <div className="side-card">
          <div className="side-card-title">Key ideas</div>
          <ul className="ideas">
            {opening.keyIdeas.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>

        <button className="btn link" onClick={onSkip}>
          I already know this line — skip to practice
        </button>
      </div>
    </div>
  );
}
