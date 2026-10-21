# PLAN.md — Guy's Chess Tutor

## Current State (2026-10-10)

**v0.2 shipped.** 12 openings ordered as a learning path (Level 1–3), confetti + fanfare on finishing a lesson (mute toggle), full redesign (cool slate/teal, Lexend), English/Hebrew with RTL (Rubik font), mobile audit across 320px–tablet + landscape in both languages. Live on GitHub Pages (commit aad9901, deploy verified).

_v0.1 (2026-08-15):_ Full loop works: choose opening → intro → guided walkthrough → practice (learner plays, tutor checks + hints, plays opponent) → 3‑question quiz → completion with stars. 8 openings (5 White, 3 Black). Progress persists in localStorage. Responsive (tutor above board on phones). Zero console errors. `npm run build` passes (validator + typecheck).

**Not yet done**
- [x] Deployed to GitHub Pages: https://jonathanavni.github.io/guys-chess-tutor/ (auto‑deploys on push to `main` via `.github/workflows/deploy.yml`)
- [ ] Guy plays it for real → collect feedback on tone, pace, difficulty
- [ ] Tap-through on a real iPhone + Android (mobile audit was emulated Chromium with touch)
- [ ] `npm audit` flags `source-map-js` (build-time only, pre-existing) — run `npm audit fix` when convenient

**Next up (candidates — pick with Jonathan)**
- [x] Sound/confetti on completing a lesson (every finish, slips or not; mute toggle)
- [ ] "Explore" mode after a lesson: play on from the final position against… nothing (free board) — or skip until tactics
- [x] More openings: Scandinavian, King's Indian, Vienna, Fried Liver
- [x] Hebrew language support (EN/HE toggle, RTL)
- [ ] Native-speaker read-through of the Hebrew lesson text with Guy
- [ ] Sidelines: "What if Black takes the gambit pawn?" mini‑branches inside a lesson
- [x] Spaced repetition: "Time to review" on Home (review = practice-only replay) + "Fix your tricky moves" drill — shipped 2026-10-20
- [ ] Tactics module (v2): puzzles by theme (fork, pin, back rank), reuse Board + Tutor + progress
- [ ] Optional name personalization ("Hi Guy!" → whoever's playing) — trivial, no auth needed

## Roadmap

- **v0.1** ✅ Openings tutor, static, local
- **v0.2** ✅ Deploy, redesign, 12 openings as a learning path, celebrations, Hebrew, mobile polish
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
- **2026-10-10 — Learning path = array order** in `openings.ts` (simplest → hardest); validator enforces non-decreasing difficulty. Home groups by level and highlights "Up next".
- **2026-10-10 — Celebrate every finished lesson**, not just mastery (user call: a 9-year-old should get the party even with a slip). Fanfare is synthesized with Web Audio — no audio files.
- **2026-10-10 — i18n without a library.** UI strings in `src/data/strings.tsx`, Hebrew lesson text in `src/data/openings.he.ts` keyed by id; validator keeps it in sync and bans RTL-breaking notation ("1.e4", "Qf3+"). Hebrew terms: מהלך (move), חיל (pawn). Moves stay in English letters. Gender-neutral phrasing where natural.
- **2026-10-10 — Fonts bundled via @fontsource** (Lexend, Rubik for Hebrew) — no third-party font requests.
- **2026-10-10 — Mobile: tutor stays above the board in portrait** (feedback visible right after each move), at the cost of a little scrolling on small phones. Landscape phones switch to side-by-side with the board sized to screen height. Quiz on phones: question → answers → Next → board.
- **2026-10-10 — Hover effects only under `@media (hover: hover)`** so taps on touchscreens don't leave cards/answers looking "stuck" selected.
- **2026-10-20 — Spaced repetition, kept tiny.** Per opening: `reviewLevel` → REVIEW_DAYS `[1,3,7,14,30]`, due at local midnight. Every finished practice run counts. Slip (wrong move *or* hint) → down a level; clean run moves up only if it was due (replaying early doesn't skip ahead); first run → tomorrow. Inspired by Chessable's MoveTrainer, but per opening, not per move.
- **2026-10-20 — Tricky moves = learner plies needing help in the last full run.** Replaced on each completed run; the drill (`#/tricky`, max 8) clears a move only when it's played right first try with no hint. Practice warns "this tripped you up last time" on those plies.
