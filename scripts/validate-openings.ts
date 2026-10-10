/**
 * Validates that every opening line is legal chess, arrows/highlights reference real squares,
 * and quiz answers are in range. Run: npm run validate
 */
import { Chess } from "chess.js";
import { OPENINGS } from "../src/data/openings";
import { OPENINGS_HE } from "../src/data/openings.he";

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
// Hebrew text must mirror the English structure, and avoid notation that breaks in RTL text.
const RTL_TRAPS = /\d\.\s*[KQRBNa-hO]|[a-h][1-8][+#]|O-O[+#]/;
for (const o of OPENINGS) {
  const he = OPENINGS_HE[o.id];
  if (!he) {
    fail(`${o.id}: missing Hebrew translation`);
    continue;
  }
  if (he.moves.length !== o.moves.length)
    fail(
      `${o.id} (he): ${he.moves.length} moves, English has ${o.moves.length}`,
    );
  o.moves.forEach((m, i) => {
    if (!he.moves[i]?.explanation?.trim())
      fail(`${o.id} (he): move ${i + 1} has no explanation`);
    if (!!m.hint !== !!he.moves[i]?.hint)
      fail(`${o.id} (he): move ${i + 1} hint mismatch`);
  });
  if (he.quiz.length !== o.quiz.length) fail(`${o.id} (he): quiz length`);
  o.quiz.forEach((q, i) => {
    if (he.quiz[i]?.options.length !== q.options.length)
      fail(`${o.id} (he): quiz ${i + 1} option count`);
  });
  const texts = [
    he.name,
    he.subtitle,
    he.tagline,
    he.funFact ?? "",
    ...he.intro,
    ...he.keyIdeas,
    ...he.moves.flatMap((m) => [m.explanation, m.hint ?? ""]),
    ...he.quiz.flatMap((q) => [q.question, q.explanation, ...q.options]),
  ];
  for (const t of texts)
    if (RTL_TRAPS.test(t))
      fail(`${o.id} (he): RTL-unsafe notation in "${t.slice(0, 60)}…"`);
}
for (const id of Object.keys(OPENINGS_HE))
  if (!OPENINGS.some((o) => o.id === id)) fail(`Hebrew has unknown id ${id}`);

// OPENINGS order is the learning path shown on Home, so difficulty must never go down.
OPENINGS.forEach((o, i) => {
  if (i > 0 && o.difficulty < OPENINGS[i - 1].difficulty)
    fail(`${o.id}: difficulty ${o.difficulty} comes after a harder opening`);
});
if (errors) {
  console.error(`\n${errors} problem(s)`);
  process.exit(1);
}
console.log("\nAll openings valid.");
