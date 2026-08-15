# ♞ Guy's Chess Tutor

**Play it:** https://jonathanavni.github.io/guys-chess-tutor/

An interactive chess opening tutor built for a 9‑year‑old (and his friends). Pick an opening and the tutor:

1. **Introduces it** — what it is, why you'd play it, three ideas to remember.
2. **Walks you through it** move by move, explaining the *why* with arrows on the board.
3. **Lets you play it** — you make your side's moves from memory; the tutor plays the other side, checks each move and gives hints when you slip.
4. **Quizzes you** on the ideas, not just the moves.

Progress (stars per opening) is saved in your browser. No accounts, no server.

**Openings included:** Italian Game, Ruy Lopez, Scotch Game, Queen's Gambit, London System (as White) · Sicilian Dragon, French Defense, Caro‑Kann (as Black).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run validate   # check every opening line is legal chess + content is complete
npm run build      # validate + typecheck + production build to dist/
npm run preview    # serve dist/
```

## Deploy

It's a static site. On **Vercel**: import the repo, framework "Vite", done. On **GitHub Pages**: build and publish `dist/` (set `base` in `vite.config.ts` if it's served from a subpath).

## Add an opening

Edit `src/data/openings.ts` — see `CLAUDE.md` for the checklist. Then `npm run validate`.

## Stack

React + TypeScript + Vite · [chess.js](https://github.com/jhlywa/chess.js) · [react-chessboard](https://github.com/Clariity/react-chessboard) · plain CSS.
