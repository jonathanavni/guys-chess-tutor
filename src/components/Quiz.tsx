import { useMemo, useState } from "react";
import type { Opening } from "../data/types";
import { allFens } from "../lib/chess";
import { recordQuiz } from "../lib/progress";
import { Board } from "./Board";
import { Tutor } from "./Tutor";

/** Phase 4: check understanding — multiple choice about the *why* behind the moves. */
export function Quiz({
  opening,
  onDone,
}: {
  opening: Opening;
  onDone: (score: number, total: number) => void;
}) {
  const fens = useMemo(() => allFens(opening), [opening]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = opening.quiz.length;
  const q = opening.quiz[Math.min(index, total - 1)];
  const ply = q.ply ?? opening.moves.length;
  const correct = picked !== null && picked === q.answer;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= total) {
      const finalScore = score; // already includes this question
      recordQuiz(opening.id, finalScore, total);
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  };

  return (
    <div className="lesson-grid">
      <div className="board-col">
        <Board fen={fens[ply]} orientation={opening.side} />
        <div className="board-controls">
          <span className="board-counter">
            Question {Math.min(index + 1, total)} of {total}
          </span>
          {finished ? (
            <button
              className="btn primary"
              onClick={() => onDone(score, total)}
            >
              See my results →
            </button>
          ) : (
            <button
              className="btn primary"
              onClick={next}
              disabled={picked === null}
            >
              {index + 1 >= total ? "Finish →" : "Next question →"}
            </button>
          )}
        </div>
      </div>

      <div className="panel-col">
        {finished ? (
          <Tutor mood="star" title={`Quiz done: ${score} out of ${total}!`}>
            <p>
              {score === total
                ? "You understand the ideas, not just the moves. That is what makes an opening really yours."
                : "Nice work. Re‑read the ideas you missed — understanding the why is what makes the moves stick."}
            </p>
          </Tutor>
        ) : (
          <Tutor
            mood={picked === null ? "think" : correct ? "happy" : "oops"}
            title={
              picked === null
                ? q.question
                : correct
                  ? "Correct! 🎯"
                  : "Not quite."
            }
          >
            {picked === null ? (
              <p className="muted">
                Look at the board if it helps, then pick an answer.
              </p>
            ) : (
              <p>{q.explanation}</p>
            )}
          </Tutor>
        )}

        {!finished && (
          <div className="quiz-options">
            {q.options.map((opt, i) => {
              let cls = "quiz-option";
              if (picked !== null) {
                if (i === q.answer) cls += " right";
                else if (i === picked) cls += " wrong";
                else cls += " dim";
              }
              return (
                <button
                  key={opt}
                  type="button"
                  className={cls}
                  onClick={() => pick(i)}
                  disabled={picked !== null}
                >
                  <span className="quiz-letter">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
