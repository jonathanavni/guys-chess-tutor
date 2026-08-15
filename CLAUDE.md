# CLAUDE.md — Guy's Chess Tutor

## Project

An interactive web app that teaches chess openings to Guy (age 9) like a patient tutor: it walks through each opening move by move with kid‑friendly explanations, then has the learner **play** the line while it checks moves and gives escalating hints, and finishes with a short **quiz on the ideas**. Later: tactics.

Audience beyond Guy: family and friends he shares it with. So it must feel polished and be zero‑setup to use.

## Core principles

- **Minimal architecture, on purpose** — static site, no backend, no database, no auth. Progress lives in `localStorage`. Don't add server pieces unless a feature genuinely can't work without them; say so first.
- **Tutor voice, not textbook** — every move gets a *why* in one to three short sentences a 9‑year‑old can follow. Name the idea (pin, base of the chain, fianchetto) and immediately say what it means. No unexplained jargon.
- **Verify understanding, don't just show** — every lesson has an interactive practice phase (learner plays their side; wrong moves get hints) and a quiz about ideas, not just moves.
- **Simplicity first** — prefer the boring obvious solution. Can this be fewer lines? Is this abstraction earning its keep?
- **Push back when warranted** — if an approach has clear problems, say so, propose an alternative, accept override.
- **Verification is the #1 lever** — `npm run build` runs the opening validator + typecheck. Click through a real lesson in the browser before calling anything done.

## Tech stack

| Component | Choice |
|-----------|--------|
| Framework | React 19 + TypeScript, Vite |
| Chess rules | `chess.js` (move legality, SAN, FEN) |
| Board UI | `react-chessboard` v5 (`<Chessboard options={...} />` API — options object, not props) |
| Styling | Plain CSS in `src/styles.css`, design tokens as CSS variables. No CSS framework |
| Routing | Tiny hash router in `src/lib/router.ts` (`#/learn/<id>`) so lessons are shareable links and static hosting needs no rewrites |
| State/persistence | React state + `localStorage` via `src/lib/progress.ts` (`useSyncExternalStore`) |
| Hosting | Vercel (or GitHub Pages) — static `dist/` |
| Lint / format | `oxlint`, Prettier |

## Layout

```
src/
  data/types.ts        Opening / OpeningMove / QuizQuestion types
  data/openings.ts     ALL lesson content (moves, explanations, hints, quizzes)
  lib/chess.ts         chess.js helpers (fenAtPly, tryMove, sanToSquares…)
  lib/progress.ts      localStorage progress + stars + hooks
  lib/router.ts        hash router
  components/
    Home.tsx           catalog + hero + progress
    Lesson.tsx         phase shell: intro → learn → practice → quiz → done
    Intro / Walkthrough / Practice / Quiz / Complete   one file per phase
    Board.tsx          react-chessboard wrapper: arrows, highlights, click‑ or drag‑to‑move
    Tutor.tsx          the speech bubble + avatar mood
    MoveList.tsx
scripts/validate-openings.ts   legality + content checks (runs in `npm run build`)
```

## Adding an opening

1. Add an entry to `OPENINGS` in `src/data/openings.ts`. Keep lines to ~10–14 plies. Every **learner‑side** move needs a `hint`; every move needs an `explanation`. Add arrows (`idea` green, `threat` red, `note` blue) where they make the idea visible. 3 quiz questions about *why*.
2. `npm run validate` — must pass (legal SAN, valid squares, hints present, quiz answers in range).
3. Play the lesson in the browser as a kid would.

## Commands

- `npm run dev` — local dev server
- `npm run validate` — check opening data
- `npm run build` — validate + typecheck + production build
- `npm run preview` — serve the production build
- `/start`, `/wrapup`, `/review` — session workflow (see `.claude/commands/`)

## Safety

- Nothing here handles secrets or personal data. Keep it that way — no analytics, no accounts, no third‑party scripts.
- Deploying/publishing is user‑approved; local testing is always fine.

## Project state

- **`PLAN.md`** — current state, roadmap, decisions log. Read at session start, update at session end.
