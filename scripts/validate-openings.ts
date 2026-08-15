/**
 * Validates that every opening line is legal chess, arrows/highlights reference real squares,
 * and quiz answers are in range. Run: npm run validate
 */
import { Chess } from "chess.js";
import { OPENINGS } from "../src/data/openings";

const SQUARE = /^[a-h][1-8]$/;
let errors = 0;
const fail = (msg: string) => {
  console.error("✗", msg);
  errors++;
};

for (const o of OPENINGS) {
  const game = new Chess();
  o.moves.forEach((m, i) => {
    try {
      const mv = game.move(m.san);
      if (!mv) fail(`${o.id}: move ${i + 1} "${m.san}" is illegal`);
    } catch (e) {
      fail(`${o.id}: move ${i + 1} "${m.san}" threw: ${(e as Error).message}`);
    }
    for (const a of m.arrows ?? []) {
      if (!SQUARE.test(a.from) || !SQUARE.test(a.to))
        fail(`${o.id}: bad arrow ${a.from}->${a.to} at move ${i + 1}`);
    }
    for (const h of m.highlights ?? [])
      if (!SQUARE.test(h)) fail(`${o.id}: bad highlight ${h} at move ${i + 1}`);
    if (!m.explanation?.trim())
      fail(`${o.id}: move ${i + 1} has no explanation`);
  });
  // learner side moves must have hints
  const learnerParity = o.side === "white" ? 0 : 1;
  o.moves.forEach((m, i) => {
    if (i % 2 === learnerParity && !m.hint)
      fail(`${o.id}: learner move ${i + 1} "${m.san}" has no hint`);
  });
  o.quiz.forEach((q, i) => {
    if (q.answer < 0 || q.answer >= q.options.length)
      fail(`${o.id}: quiz ${i + 1} answer out of range`);
    if (q.ply !== undefined && (q.ply < 0 || q.ply > o.moves.length))
      fail(`${o.id}: quiz ${i + 1} ply out of range`);
  });
  const ids = OPENINGS.filter((x) => x.id === o.id).length;
  if (ids > 1) fail(`duplicate id ${o.id}`);
  console.log(`✓ ${o.name} (${o.moves.length} plies, ${o.quiz.length} quiz)`);
}
if (errors) {
  console.error(`\n${errors} problem(s)`);
  process.exit(1);
}
console.log("\nAll openings valid.");
