import { useMemo, useState, type ReactNode } from "react";
import type { Arrow } from "../data/types";
import { allFens, moveLabel, sanToSquares, tryMove } from "../lib/chess";
import { fixTricky, trickyMoves, useProgress } from "../lib/progress";
import { navigate } from "../lib/router";
import { celebrate } from "../lib/celebrate";
import { localize, useLang, useT } from "../lib/i18n";
import { Board } from "./Board";
import { Tutor, type Mood } from "./Tutor";

/**
 * "Fix your tricky moves": a short warm-up of the exact positions the learner slipped on,
 * across all openings. One move each, with the same escalating hints as Practice.
 */
export function Tricky() {
  const t = useT();
  const lang = useLang();
  const progress = useProgress();
  // Snapshot once, so fixing a move doesn't reshuffle the list mid-drill.
  const [items] = useState(() => trickyMoves(progress));
  const [idx, setIdx] = useState(0);
  const [wrongTries, setWrongTries] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [lastWrong, setLastWrong] = useState<string>();
  const [solved, setSolved] = useState(false);
  const [fixed, setFixed] = useState(0);
  const [shake, setShake] = useState(false);

  const item = items[idx];
  const done = idx >= items.length;
  const opening = item && localize(item.opening, lang);
  const fens = useMemo(() => (opening ? allFens(opening) : []), [opening]);

  const header = (
    <header className="lesson-header">
      <button
        className="icon-btn back"
        onClick={() => navigate({ page: "home" })}
        aria-label={t.allOpenings}
        title={t.allOpenings}
      >
        {t.backIcon}
      </button>
      <span className="lesson-emoji" aria-hidden>
        🧩
      </span>
      <div className="lesson-title">
        <h1>{t.trickyTitle}</h1>
        <div className="lesson-sub">{t.trickySub}</div>
      </div>
    </header>
  );

  if (done) {
    return (
      <div className="lesson">
        {header}
        <div className="phase tricky-done">
          <Tutor
            mood="star"
            title={
              items.length ? t.trickyDone(fixed, items.length) : t.trickyNone
            }
          >
            <p>{items.length ? t.trickyDoneBody : t.trickyNoneBody}</p>
          </Tutor>
          <button
            className="btn primary"
            onClick={() => navigate({ page: "home" })}
          >
            {t.allOpeningsCta}
          </button>
        </div>
      </div>
    );
  }

  const { ply } = item;
  const book = opening.moves[ply];
  const squares = sanToSquares(fens[ply], book.san);
  const prev = ply > 0 ? opening.moves[ply - 1] : null;
  const prevSquares = prev ? sanToSquares(fens[ply - 1], prev.san) : null;

  const next = () => {
    setWrongTries(0);
    setHintLevel(0);
    setLastWrong(undefined);
    setSolved(false);
    if (idx + 1 >= items.length) celebrate();
    setIdx((i) => i + 1);
  };

  const handleMove = (from: string, to: string): boolean => {
    if (solved) return false;
    const res = tryMove(fens[ply], from, to);
    if (!res) return false;
    if (res.san === book.san) {
      setSolved(true);
      if (wrongTries === 0 && hintLevel === 0) {
        fixTricky(item.opening.id, ply);
        setFixed((n) => n + 1);
      }
      return true;
    }
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
    setWrongTries((n) => n + 1);
    setHintLevel((h) => Math.max(h, Math.min(2, wrongTries + 1)));
    setLastWrong(res.san);
    return false;
  };

  const san = (text: string) => <span className="san">{text}</span>;
  const you = t.side(opening.side);
  const opp = t.side(opening.side === "white" ? "black" : "white");

  let mood: Mood = "think";
  let title: ReactNode;
  let body: ReactNode;
  if (solved) {
    mood = "happy";
    title = <span>{t.thatsIt(san(book.san))}</span>;
    body = <p>{book.explanation}</p>;
  } else if (wrongTries > 0 || hintLevel > 0) {
    mood = wrongTries > 0 ? "oops" : "think";
    title =
      wrongTries > 0
        ? t.notTheMove(san(lastWrong ?? ""), opening.name)
        : t.hereHint;
    body = (
      <>
        {hintLevel >= 1 && book.hint && <p>💡 {book.hint}</p>}
        {hintLevel >= 2 && <p>{t.theMoveIs(san(book.san))}</p>}
        {hintLevel < 2 && <p className="muted">{t.lookHighlighted}</p>}
      </>
    );
  } else {
    title = `${opening.emoji} ${opening.name}`;
    body = (
      <>
        {prev && (
          <p>
            {t.plays(
              <span
                className={`side-chip ${opening.side === "white" ? "b" : "w"}`}
              >
                {opp}
              </span>,
              san(`${moveLabel(ply - 1)} ${prev.san}`),
            )}
          </p>
        )}
        <p className="prompt">
          {ply < 2 ? t.firstMove(you, opening.name) : t.whatDoes(you)}
        </p>
      </>
    );
  }

  const arrows: Arrow[] =
    !solved && hintLevel >= 2 && squares ? [{ ...squares, kind: "idea" }] : [];

  return (
    <div className="lesson">
      {header}
      <div className="phase lesson-grid" key={idx}>
        <div className="board-col">
          <Board
            fen={fens[solved ? ply + 1 : ply]}
            orientation={opening.side}
            arrows={arrows}
            lastMove={solved ? squares : prevSquares}
            interactiveSide={solved ? null : opening.side}
            onMove={handleMove}
            hintSquares={
              !solved && hintLevel >= 1 && squares ? [squares.from] : []
            }
            shake={shake}
          />
          <div className="board-controls">
            <span className="board-counter">
              {idx + 1} / {items.length}
            </span>
            {solved ? (
              <button className="btn primary" onClick={next}>
                {idx + 1 >= items.length ? t.finish : t.next}
              </button>
            ) : (
              <button
                className="btn secondary"
                onClick={() => setHintLevel((h) => Math.min(2, h + 1))}
                disabled={hintLevel >= 2}
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
        </div>
      </div>
    </div>
  );
}
