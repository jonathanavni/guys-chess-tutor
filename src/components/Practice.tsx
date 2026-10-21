import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Arrow, Opening } from "../data/types";
import {
  allFens,
  moveLabel,
  sanToSquares,
  sideToMove,
  tryMove,
} from "../lib/chess";
import {
  daysUntilReview,
  getProgress,
  recordPractice,
  useOpeningProgress,
} from "../lib/progress";
import { celebrate } from "../lib/celebrate";
import { Board } from "./Board";
import { Tutor, type Mood } from "./Tutor";
import { MoveList } from "./MoveList";
import { useT } from "../lib/i18n";

type Status =
  | {
      kind: "your-turn";
      wrongTries: number;
      hintLevel: number;
      lastWrong?: string;
    }
  | { kind: "correct" }
  | { kind: "opponent"; explanation: string }
  | { kind: "done" };

/**
 * Phase 3: the learner plays their side from memory; the tutor plays the other side,
 * checks every move, and gives escalating hints when the learner strays from the line.
 * In `review` mode (spaced-repetition replay) it celebrates at the end and says when to come back.
 */
export function Practice({
  opening,
  onDone,
  review = false,
}: {
  opening: Opening;
  onDone: (mistakes: number) => void;
  review?: boolean;
}) {
  const t = useT();
  const fens = useMemo(() => allFens(opening), [opening]);
  const total = opening.moves.length;
  const learner = opening.side;

  const [ply, setPly] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState<Status>({
    kind: "your-turn",
    wrongTries: 0,
    hintLevel: 0,
  });
  const [shake, setShake] = useState(false);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(
    null,
  );
  const [lastLearnerMove, setLastLearnerMove] = useState<{
    san: string;
    explanation: string;
  } | null>(null);
  const timer = useRef<number | null>(null);
  const recorded = useRef(false);
  // Plies that needed help this run (wrong move or hint) — they become "tricky moves".
  const slipped = useRef(new Set<number>());
  // Moves that tripped the learner up last time, read once so the warning doesn't vanish mid-run.
  const [trickyBefore] = useState(
    () => new Set(getProgress(opening.id).tricky),
  );
  const progress = useOpeningProgress(opening.id);

  const isLearnerTurn = ply < total && sideToMove(ply) === learner;
  const bookMove = ply < total ? opening.moves[ply] : null;
  const bookSquares = bookMove ? sanToSquares(fens[ply], bookMove.san) : null;

  const restart = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    recorded.current = false;
    slipped.current.clear();
    setPly(0);
    setMistakes(0);
    setStatus({ kind: "your-turn", wrongTries: 0, hintLevel: 0 });
    setLastMove(null);
    setLastLearnerMove(null);
  }, []);

  // Drive the opponent's replies and detect completion.
  useEffect(() => {
    if (ply >= total) {
      setStatus({ kind: "done" });
      if (!recorded.current) {
        recorded.current = true;
        recordPractice(opening.id, mistakes, [...slipped.current]);
        if (review) celebrate();
      }
      return;
    }
    if (isLearnerTurn) return;
    // Opponent's turn: play the book move after a short pause.
    const mv = opening.moves[ply];
    const squares = sanToSquares(fens[ply], mv.san);
    timer.current = window.setTimeout(
      () => {
        setLastMove(squares);
        setPly((p) => p + 1);
        setStatus({ kind: "opponent", explanation: mv.explanation });
      },
      ply === 0 ? 500 : 1600,
    );
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ply, isLearnerTurn, total]);

  const handleMove = (from: string, to: string): boolean => {
    if (!isLearnerTurn || !bookMove) return false;
    const res = tryMove(fens[ply], from, to);
    if (!res) return false; // illegal — board rejects silently
    if (res.san === bookMove.san) {
      setLastMove({ from: res.from, to: res.to });
      setLastLearnerMove({
        san: bookMove.san,
        explanation: bookMove.explanation,
      });
      setPly((p) => p + 1);
      setStatus({ kind: "correct" });
      return true;
    }
    // Legal but not the book move.
    slipped.current.add(ply);
    setMistakes((m) => m + 1);
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
    setStatus((s) => {
      const prev = s.kind === "your-turn" ? s : { wrongTries: 0, hintLevel: 0 };
      const wrongTries = prev.wrongTries + 1;
      return {
        kind: "your-turn",
        wrongTries,
        hintLevel: Math.max(prev.hintLevel, Math.min(2, wrongTries)),
        lastWrong: res.san,
      };
    });
    return false;
  };

  const askHint = () => {
    slipped.current.add(ply);
    setStatus((s) => {
      const prev =
        s.kind === "your-turn"
          ? s
          : { wrongTries: 0, hintLevel: 0, lastWrong: undefined };
      return {
        kind: "your-turn",
        wrongTries: prev.wrongTries,
        hintLevel: Math.min(2, prev.hintLevel + 1),
        lastWrong: prev.lastWrong,
      };
    });
  };

  // What the board should show as hints/arrows right now.
  const hintLevel = status.kind === "your-turn" ? status.hintLevel : 0;
  const hintSquares = hintLevel >= 1 && bookSquares ? [bookSquares.from] : [];
  const arrows: Arrow[] =
    hintLevel >= 2 && bookSquares
      ? [{ from: bookSquares.from, to: bookSquares.to, kind: "idea" }]
      : [];

  // ── Tutor copy ──────────────────────────────────────────────────────────
  let mood: Mood = "neutral";
  let title: ReactNode = "";
  let body: ReactNode = null;

  const opponent = learner === "white" ? "black" : "white";
  const youAre = t.side(learner);
  const opp = t.side(opponent);
  const san = (text: string) => <span className="san">{text}</span>;

  if (status.kind === "done") {
    mood = "star";
    title =
      mistakes === 0
        ? t.perfectRun
        : mistakes <= 2
          ? t.greatJob(mistakes)
          : t.madeIt(mistakes);
    body = review ? (
      <p>{t.nextReview(daysUntilReview(progress) ?? 1)}</p>
    ) : (
      t.knowFirst(Math.ceil(total / 2), opening.name)
    );
  } else if (status.kind === "opponent") {
    mood = "neutral";
    const played = opening.moves[ply - 1];
    title = (
      <span>
        {t.plays(
          <span className={`side-chip ${opponent === "white" ? "w" : "b"}`}>
            {opp}
          </span>,
          san(`${moveLabel(ply - 1)} ${played.san}`),
        )}
      </span>
    );
    body = (
      <>
        <p>{status.explanation}</p>
        {trickyBefore.has(ply) && <p className="tricky-note">{t.trickyNote}</p>}
        <p className="prompt">{t.yourMovePrompt}</p>
      </>
    );
  } else if (status.kind === "correct") {
    mood = "happy";
    title = <span>{t.thatsIt(san(lastLearnerMove?.san ?? ""))}</span>;
    body = <p>{lastLearnerMove?.explanation}</p>;
  } else {
    // your-turn
    const { wrongTries, hintLevel: hl, lastWrong } = status;
    if (!isLearnerTurn) {
      mood = "neutral";
      title = t.oppFirst(opp);
      body = <p>{t.thenYourTurn(youAre)}</p>;
    } else if (wrongTries === 0 && hl === 0) {
      mood = "think";
      title = ply === 0 ? t.firstMove(youAre, opening.name) : t.yourMove;
      body = (
        <>
          {trickyBefore.has(ply) && (
            <p className="tricky-note">{t.trickyNote}</p>
          )}
          <p>{ply === 0 ? t.dragHelp : t.whatDoes(youAre)}</p>
        </>
      );
    } else {
      mood = wrongTries > 0 ? "oops" : "think";
      title =
        wrongTries > 0
          ? t.notTheMove(san(lastWrong ?? ""), opening.name)
          : t.hereHint;
      body = (
        <>
          {hl >= 1 && bookMove?.hint && <p>💡 {bookMove.hint}</p>}
          {hl >= 2 && bookMove && <p>{t.theMoveIs(san(bookMove.san))}</p>}
          {hl < 2 && <p className="muted">{t.lookHighlighted}</p>}
        </>
      );
    }
  }

  return (
    <div className="lesson-grid">
      <div className="board-col">
        <Board
          fen={fens[ply]}
          orientation={learner}
          arrows={arrows}
          lastMove={lastMove}
          interactiveSide={
            isLearnerTurn && status.kind !== "done" ? learner : null
          }
          onMove={handleMove}
          hintSquares={hintSquares}
          shake={shake}
        />
        <div className="board-controls">
          <button className="btn ghost" onClick={restart}>
            {t.restart}
          </button>
          <span className="board-counter">
            {Math.min(ply, total)} / {total} · {t.slips(mistakes)}
          </span>
          {status.kind === "done" ? (
            <button className="btn primary" onClick={() => onDone(mistakes)}>
              {review ? t.doneReview : t.takeQuiz}
            </button>
          ) : (
            <button
              className="btn secondary"
              onClick={askHint}
              disabled={
                !isLearnerTurn ||
                (status.kind === "your-turn" && status.hintLevel >= 2)
              }
            >
              {t.hint}
            </button>
          )}
        </div>
      </div>

      <div className="panel-col">
        <Tutor mood={mood} title={title}>
          {body}
        </Tutor>

        <div className="side-card">
          <div className="side-card-title">{t.movesSoFar}</div>
          <MoveList opening={opening} ply={ply} revealUpTo={ply} />
        </div>

        <details className="side-card collapsible">
          <summary className="side-card-title">{t.keyIdeas}</summary>
          <ul className="ideas">
            {opening.keyIdeas.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
