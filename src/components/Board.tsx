import { useMemo, useState, type CSSProperties } from "react";
import { Chessboard, type ChessboardOptions } from "react-chessboard";
import type { Arrow, Side } from "../data/types";
import { legalTargets } from "../lib/chess";

const ARROW_COLORS: Record<NonNullable<Arrow["kind"]> | "default", string> = {
  default: "rgba(13, 148, 136, 0.9)", // teal
  idea: "rgba(13, 148, 136, 0.9)",
  threat: "rgba(239, 68, 68, 0.85)",
  note: "rgba(79, 70, 229, 0.8)",
};

export interface BoardProps {
  fen: string;
  orientation: Side;
  arrows?: Arrow[];
  highlights?: string[];
  lastMove?: { from: string; to: string } | null;
  /** When set, the learner may move pieces of this color. */
  interactiveSide?: Side | null;
  /** Return true if the move was accepted (board will follow the new fen prop). */
  onMove?: (from: string, to: string) => boolean;
  /** Squares to pulse as a hint (e.g. the piece that should move). */
  hintSquares?: string[];
  /** Briefly shake the board (wrong move feedback). */
  shake?: boolean;
}

export function Board({
  fen,
  orientation,
  arrows = [],
  highlights = [],
  lastMove,
  interactiveSide = null,
  onMove,
  hintSquares = [],
  shake = false,
}: BoardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const targets = useMemo(
    () => (selected ? legalTargets(fen, selected) : []),
    [fen, selected],
  );

  const pieceIsMine = (pieceType?: string | null) => {
    if (!interactiveSide || !pieceType) return false;
    return pieceType[0] === (interactiveSide === "white" ? "w" : "b");
  };

  const squareStyles = useMemo(() => {
    const s: Record<string, CSSProperties> = {};
    if (lastMove) {
      s[lastMove.from] = { backgroundColor: "rgba(255, 200, 70, 0.5)" };
      s[lastMove.to] = { backgroundColor: "rgba(255, 200, 70, 0.65)" };
    }
    for (const h of highlights)
      s[h] = { ...s[h], boxShadow: "inset 0 0 0 4px rgba(79, 70, 229, 0.55)" };
    for (const h of hintSquares)
      s[h] = {
        ...s[h],
        backgroundColor: "rgba(45, 212, 191, 0.6)",
        animation: "pulse 1.1s ease-in-out infinite",
      };
    if (selected)
      s[selected] = {
        ...s[selected],
        backgroundColor: "rgba(45, 212, 191, 0.7)",
      };
    for (const t of targets)
      s[t] = {
        ...s[t],
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.22) 22%, transparent 24%)",
      };
    return s;
  }, [lastMove, highlights, hintSquares, selected, targets]);

  const options: ChessboardOptions = {
    id: "tutor-board",
    position: fen,
    boardOrientation: orientation,
    animationDurationInMs: 250,
    allowDragging: !!interactiveSide,
    allowDrawingArrows: false,
    showNotation: true,
    boardStyle: {
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 20px 50px -12px rgba(15, 30, 60, 0.35)",
    },
    darkSquareStyle: { backgroundColor: "#86a2b6" },
    lightSquareStyle: { backgroundColor: "#e4ebf1" },
    darkSquareNotationStyle: {
      color: "#e4ebf1",
      fontWeight: 600,
      fontSize: "0.7rem",
    },
    lightSquareNotationStyle: {
      color: "#86a2b6",
      fontWeight: 600,
      fontSize: "0.7rem",
    },
    squareStyles,
    arrows: arrows.map((a) => ({
      startSquare: a.from,
      endSquare: a.to,
      color: ARROW_COLORS[a.kind ?? "default"],
    })),
    canDragPiece: ({ piece }) => pieceIsMine(piece?.pieceType),
    onPieceDrop: ({ sourceSquare, targetSquare }) => {
      setSelected(null);
      if (!targetSquare || !onMove) return false;
      return onMove(sourceSquare, targetSquare);
    },
    onSquareClick: ({ square, piece }) => {
      if (!interactiveSide) return;
      if (selected && square !== selected) {
        if (targets.includes(square)) {
          const ok = onMove?.(selected, square) ?? false;
          setSelected(null);
          if (ok) return;
        }
      }
      // (re)select own piece, or clear
      if (pieceIsMine(piece?.pieceType))
        setSelected(square === selected ? null : square);
      else setSelected(null);
    },
  };

  return (
    <div className={`board-wrap${shake ? " shake" : ""}`} dir="ltr">
      <Chessboard options={options} />
    </div>
  );
}
