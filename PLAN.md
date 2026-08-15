# PLAN.md — Guy's Chess Tutor

## Current State (2026-08-15)

**v0.1 shipped locally.** Full loop works: choose opening → intro → guided walkthrough → practice (learner plays, tutor checks + hints, plays opponent) → 3‑question quiz → completion with stars. 8 openings (5 White, 3 Black). Progress persists in localStorage. Responsive (tutor above board on phones). Zero console errors. `npm run build` passes (validator + typecheck).

**Not yet done**
- [x] Deployed to GitHub Pages: https://jonathanavni.github.io/guys-chess-tutor/ (auto‑deploys on push to `main` via `.github/workflows/deploy.yml`)
- [ ] Guy plays it for real → collect feedback on tone, pace, difficulty

**Next up (candidates — pick with Jonathan)**
- [ ] Sound/confetti on completing a lesson (kids love it; keep it tasteful, add a mute)
- [ ] "Explore" mode after a lesson: play on from the final position against… nothing (free board) — or skip until tactics
- [ ] More openings: Scandinavian, King's Indian, Vienna, Two Knights (Fried Liver!)
- [ ] Sidelines: "What if Black takes the gambit pawn?" mini‑branches inside a lesson
- [ ] Spaced repetition nudge on Home ("Italian Game — practiced 4 days ago, play it again?")
- [ ] Tactics module (v2): puzzles by theme (fork, pin, back rank), reuse Board + Tutor + progress
- [ ] Optional name personalization ("Hi Guy!" → whoever's playing) — trivial, no auth needed

## Roadmap

- **v0.1** ✅ Openings tutor, static, local
- **v0.2** Deploy + polish from Guy's feedback; a few more openings
- **v1** Tactics module; maybe simple engine play vs. a weak bot (stockfish.wasm) if desired

## Decisions Log

- **2026-08-15 — Static SPA, no backend.** Progress in localStorage. Sharing = a URL. Revisit only if we need cross‑device progress (then: tiny sync via a hosted KV, still no auth — a share code).
- **2026-08-15 — Vite + React + TS**, `chess.js` for rules, `react-chessboard` v5 for the board. Rationale: mature, tiny surface, no server. v5 API is an `options` object (differs from v4 props — check `node_modules/react-chessboard/dist/ChessboardProvider.d.ts`).
- **2026-08-15 — Hash routing** (`#/learn/<id>`) instead of history routing so any static host works with no rewrite rules.
- **2026-08-15 — Content lives in one TS file** (`src/data/openings.ts`) validated by a script that runs in `build`. A CMS/JSON loader is not worth it at 8–20 openings.
- **2026-08-15 — Practice = strict main line.** Any legal non‑book move counts as a "slip" and triggers escalating hints (text → highlight piece → draw arrow). Sidelines are a later feature.
- **2026-08-15 — Stars**: ★ learned (walkthrough done) · ★★ practiced with ≤2 slips · ★★★ perfect practice + perfect quiz.
- **2026-08-15 — Hosting: GitHub Pages** (repo `jonathanavni/guys-chess-tutor`, public). Chosen over Vercel because `gh` was already authenticated; Vercel CLI wasn't. Vite `base` comes from `VITE_BASE` env in CI so local/Vercel keep `/`.
- **2026-08-15 — Borrowed from tinyharness/skillhub**: CLAUDE.md principle style, `/start` `/wrapup` `/review` commands, PLAN.md as the single source of truth.
