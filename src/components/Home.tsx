import { useState } from "react";
import { OPENINGS } from "../data/openings";
import type { Side } from "../data/types";
import { resetAllProgress, starsFor, useProgress } from "../lib/progress";
import { navigate } from "../lib/router";

type Filter = "all" | Side;

export function Home() {
  const progress = useProgress();
  const [filter, setFilter] = useState<Filter>("all");
  const list = OPENINGS.filter((o) => filter === "all" || o.side === filter);

  const learnedCount = OPENINGS.filter((o) => progress[o.id]?.learned).length;
  const totalStars = OPENINGS.reduce(
    (n, o) =>
      n + starsFor(progress[o.id] ?? { learned: false, practiceRuns: 0 }),
    0,
  );
  const lastPlayed = OPENINGS.map((o) => ({ o, t: progress[o.id]?.lastPlayed }))
    .filter((x) => x.t)
    .sort((a, b) => (a.t! < b.t! ? 1 : -1))[0]?.o;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <div className="eyebrow">♞ Guy's Chess Tutor</div>
          <h1>
            Learn chess openings <span className="accent">like a pro.</span>
          </h1>
          <p className="lede">
            Pick an opening. I'll walk you through every move and explain{" "}
            <em>why</em> it's played. Then you play it yourself while I check
            your moves — and we finish with a quick quiz to make sure it sticks.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">{learnedCount}</div>
              <div className="stat-label">of {OPENINGS.length} learned</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                {totalStars}
                <span className="stat-star">★</span>
              </div>
              <div className="stat-label">of {OPENINGS.length * 3} stars</div>
            </div>
            {lastPlayed && (
              <button
                className="btn primary"
                onClick={() => navigate({ page: "learn", id: lastPlayed.id })}
              >
                Continue {lastPlayed.name} →
              </button>
            )}
          </div>
        </div>
        <div className="hero-art" aria-hidden>
          <div className="mini-board">
            {Array.from({ length: 64 }, (_, i) => {
              const r = Math.floor(i / 8);
              const c = i % 8;
              return <span key={i} className={(r + c) % 2 ? "d" : "l"} />;
            })}
            {[
              { p: "♞", x: 4, y: 3 },
              { p: "♝", x: 2, y: 4 },
              { p: "♙", x: 4, y: 4 },
              { p: "♟", x: 3, y: 3 },
            ].map((pc) => (
              <span
                key={pc.p}
                className="mini-piece"
                style={{ left: `${pc.x * 12.5}%`, top: `${pc.y * 12.5}%` }}
              >
                {pc.p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="catalog-head">
          <h2>Choose an opening</h2>
          <div className="segmented" role="tablist">
            {(["all", "white", "black"] as Filter[]).map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={filter === f ? "on" : ""}
                onClick={() => setFilter(f)}
              >
                {f === "all"
                  ? "All"
                  : f === "white"
                    ? "♔ Play as White"
                    : "♚ Play as Black"}
              </button>
            ))}
          </div>
        </div>

        <div className="cards">
          {list.map((o) => {
            const p = progress[o.id] ?? { learned: false, practiceRuns: 0 };
            const stars = starsFor(p);
            const status =
              stars === 3 ? "Mastered" : p.learned ? "In progress" : "New";
            return (
              <button
                key={o.id}
                type="button"
                className={`card side-${o.side}`}
                onClick={() => navigate({ page: "learn", id: o.id })}
              >
                <div className="card-top">
                  <span className="card-emoji" aria-hidden>
                    {o.emoji}
                  </span>
                  <span
                    className={`badge ${status.toLowerCase().replace(" ", "-")}`}
                  >
                    {status}
                  </span>
                </div>
                <h3>{o.name}</h3>
                <div className="card-sub">{o.subtitle}</div>
                <p className="card-tag">{o.tagline}</p>
                <div className="card-foot">
                  <span
                    className={`side-chip ${o.side === "white" ? "w" : "b"}`}
                  >
                    {o.side === "white" ? "White" : "Black"}
                  </span>
                  <span
                    className="difficulty"
                    title={`Difficulty ${o.difficulty} of 3`}
                  >
                    {[1, 2, 3].map((d) => (
                      <i key={d} className={d <= o.difficulty ? "on" : ""} />
                    ))}
                  </span>
                  <span className="stars" aria-label={`${stars} of 3 stars`}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={i < stars ? "on" : ""}>
                        ★
                      </span>
                    ))}
                  </span>
                  <span className="card-cta">
                    {p.learned ? "Practice →" : "Learn →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <footer className="foot">
        <span>Made with ♥ for Guy. Progress is saved on this device.</span>
        <button
          className="btn link small"
          onClick={() => {
            if (window.confirm("Reset all progress on this device?"))
              resetAllProgress();
          }}
        >
          Reset progress
        </button>
      </footer>
    </div>
  );
}
