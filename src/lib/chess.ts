import { Chess } from "chess.js";
import type { Opening } from "../data/types";

export const START_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

/** FEN after playing the first `ply` moves of the opening (0 = start position). */
export function fenAtPly(opening: Opening, ply: number): string {
  const game = new Chess();
  for (let i = 0; i < ply && i < opening.moves.length; i++) {
    game.move(opening.moves[i].san);
  }
  return game.fen();
}

/** All FENs from ply 0..n so we can step without re‑simulating each time. */
export function allFens(opening: Opening): string[] {
  const game = new Chess();
  const fens = [game.fen()];
  for (const m of opening.moves) {
    game.move(m.san);
    fens.push(game.fen());
  }
  return fens;
}

/** Whose turn it is at a given ply (0‑based ply count already played). */
export function sideToMove(ply: number): "white" | "black" {
  return ply % 2 === 0 ? "white" : "black";
}

/** Move number label like "3." or "3..." for a given ply index. */
export function moveLabel(plyIndex: number): string {
  const n = Math.floor(plyIndex / 2) + 1;
  return plyIndex % 2 === 0 ? `${n}.` : `${n}…`;
}

/** Try a move on a position; returns the resulting SAN + FEN or null if illegal. */
export function tryMove(
  fen: string,
  from: string,
  to: string,
  promotion: string = "q",
): { san: string; fen: string; from: string; to: string } | null {
  const game = new Chess(fen);
  try {
    const mv = game.move({ from, to, promotion });
    if (!mv) return null;
    return { san: mv.san, fen: game.fen(), from: mv.from, to: mv.to };
  } catch {
    return null;
  }
}

/** Squares a piece on `square` can legally move to. */
export function legalTargets(fen: string, square: string): string[] {
  const game = new Chess(fen);
  try {
    return game
      .moves({ square: square as any, verbose: true })
      .map((m) => m.to);
  } catch {
    return [];
  }
}

/** Resolve a SAN string in a position to from/to squares (used for hint arrows). */
export function sanToSquares(
  fen: string,
  san: string,
): { from: string; to: string } | null {
  const game = new Chess(fen);
  try {
    const mv = game.move(san);
    return mv ? { from: mv.from, to: mv.to } : null;
  } catch {
    return null;
  }
}

/** Human piece name for a SAN move, e.g. "Nf3" -> "knight". */
export function pieceNameFromSan(fen: string, san: string): string {
  const game = new Chess(fen);
  try {
    const mv = game.move(san);
    if (!mv) return "piece";
    const map: Record<string, string> = {
      p: "pawn",
      n: "knight",
      b: "bishop",
      r: "rook",
      q: "queen",
      k: "king",
    };
    return map[mv.piece] ?? "piece";
  } catch {
    return "piece";
  }
}
