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
import { recordPractice } from "../lib/progress";
import { Board } from "./Board";
import { Tutor, type Mood } from "./Tutor";
import { MoveList } from "./MoveList";

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
 */
export function Practice({
  opening,
  onDone,
}: {
  opening: Opening;
  onDone: (mistakes: number) => void;
}) {
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

  const isLearnerTurn = ply < total && sideToMove(ply) === learner;
  const bookMove = ply < total ? opening.moves[ply] : null;
  const bookSquares = bookMove ? sanToSquares(fens[ply], bookMove.san) : null;

  const restart = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    recorded.current = false;
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
        recordPractice(opening.id, mistakes);
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

  const youAre = learner === "white" ? "White" : "Black";
  const opp = learner === "white" ? "Black" : "White";

  if (status.kind === "done") {
    mood = "star";
    title =
      mistakes === 0
        ? "Perfect! You played the whole line without a single slip. 🎉"
        : mistakes <= 2
          ? `Great job — you finished the line with only ${mistakes} slip${mistakes === 1 ? "" : "s"}.`
          : `You made it to the end! ${mistakes} slips this time — one more run and it'll stick.`;
    body = (
      <p>
        You now know the first {Math.ceil(total / 2)} moves of the{" "}
        {opening.name}. Let's check you understand <em>why</em> they're played —
        a quick 3‑question quiz.
      </p>
    );
  } else if (status.kind === "opponent") {
    mood = "neutral";
    const played = opening.moves[ply - 1];
    title = (
      <span>
        <span className={`side-chip ${opp === "White" ? "w" : "b"}`}>
          {opp}
        </span>{" "}
        plays {moveLabel(ply - 1)} <span className="san">{played.san}</span>
      </span>
    );
    body = (
      <>
        <p>{status.explanation}</p>
        <p className="prompt">Your move! What do we play here?</p>
      </>
    );
  } else if (status.kind === "correct") {
    mood = "happy";
    title = (
      <span>
        ✓ <span className="san">{lastLearnerMove?.san}</span> — that's it!
      </span>
    );
    body = <p>{lastLearnerMove?.explanation}</p>;
  } else {
    // your-turn
    const { wrongTries, hintLevel: hl, lastWrong } = status;
    if (!isLearnerTurn) {
      mood = "neutral";
      title = `${opp} moves first — watch the board.`;
      body = <p>Then it's your turn to play {youAre}'s moves from memory.</p>;
    } else if (wrongTries === 0 && hl === 0) {
      mood = "think";
      title =
        ply === 0
          ? `You're ${youAre}. Play the first move of the ${opening.name}.`
          : "Your move!";
      body = (
        <p>
          {ply === 0
            ? "Drag a piece, or tap it and then tap the square. Stuck? Ask for a hint."
            : `What does ${youAre} play here? Take your time.`}
        </p>
      );
    } else {
      mood = wrongTries > 0 ? "oops" : "think";
      title =
        wrongTries > 0
          ? `Hmm, ${lastWrong} isn't the ${opening.name} move.`
          : "Here's a hint.";
      body = (
        <>
          {hl >= 1 && bookMove?.hint && <p>💡 {bookMove.hint}</p>}
          {hl >= 2 && bookMove && (
            <p>
              The move is <span className="san">{bookMove.san}</span> — I've
              drawn it on the board. Play it and we'll keep going.
            </p>
          )}
          {hl < 2 && (
            <p className="muted">
              Look at the highlighted piece. Still stuck? Ask for another hint.
            </p>
          )}
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
            ↺ Restart
          </button>
          <span className="board-counter">
            {Math.min(ply, total)} / {total} · {mistakes} slip
            {mistakes === 1 ? "" : "s"}
          </span>
          {status.kind === "done" ? (
            <button className="btn primary" onClick={() => onDone(mistakes)}>
              Take the quiz →
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
              💡 Hint
            </button>
          )}
        </div>
      </div>

      <div className="panel-col">
        <Tutor mood={mood} title={title}>
          {body}
        </Tutor>

        <div className="side-card">
          <div className="side-card-title">Moves so far</div>
          <MoveList opening={opening} ply={ply} revealUpTo={ply} />
        </div>

        <div className="side-card">
          <div className="side-card-title">Key ideas</div>
          <ul className="ideas">
            {opening.keyIdeas.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
