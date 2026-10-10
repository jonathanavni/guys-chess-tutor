import type { Opening } from "../data/types";
import { useT } from "../lib/i18n";

/** Compact move list. `ply` = number of plies played so far; clicking jumps (if onJump given). */
export function MoveList({
  opening,
  ply,
  onJump,
  revealUpTo,
}: {
  opening: Opening;
  ply: number;
  onJump?: (ply: number) => void;
  /** In practice mode we only reveal moves already played. */
  revealUpTo?: number;
}) {
  const t = useT();
  const pairs: { n: number; w?: number; b?: number }[] = [];
  opening.moves.forEach((_, i) => {
    const n = Math.floor(i / 2);
    pairs[n] ??= { n: n + 1 };
    if (i % 2 === 0) pairs[n].w = i;
    else pairs[n].b = i;
  });
  const limit = revealUpTo ?? opening.moves.length;

  const cell = (i?: number) => {
    if (i === undefined) return <span className="mv empty" />;
    if (i >= limit) return <span className="mv hidden">?</span>;
    const active = i === ply - 1;
    return (
      <button
        type="button"
        className={`mv${active ? " active" : ""}${onJump ? "" : " static"}`}
        onClick={onJump ? () => onJump(i + 1) : undefined}
        disabled={!onJump}
      >
        {opening.moves[i].san}
      </button>
    );
  };

  return (
    <div className="movelist" aria-label={t.moves} dir="ltr">
      {onJump && (
        <button
          type="button"
          className={`mv start${ply === 0 ? " active" : ""}`}
          onClick={() => onJump(0)}
        >
          {t.start}
        </button>
      )}
      {pairs.map((p) => (
        <div className="mv-row" key={p.n}>
          <span className="mv-num">{p.n}.</span>
          {cell(p.w)}
          {cell(p.b)}
        </div>
      ))}
    </div>
  );
}
