import { useState } from "react";
import { OPENINGS } from "../data/openings";
import type { Opening, Side } from "../data/types";
import { fenAtPly } from "../lib/chess";
import { localize, useLang, useOpenings, useT } from "../lib/i18n";
import {
  dueReviews,
  isDue,
  resetAllProgress,
  starsFor,
  trickyMoves,
  upNext,
  useProgress,
} from "../lib/progress";
import { navigate } from "../lib/router";
import { Board } from "./Board";
import { Stars } from "./Stars";

type Filter = "all" | Side;

const LEVELS: Opening["difficulty"][] = [1, 2, 3];
const HERO_FEN = fenAtPly(OPENINGS[0], 5);

export function Home() {
  const t = useT();
  const lang = useLang();
  const openings = useOpenings();
  const progress = useProgress();
  const [filter, setFilter] = useState<Filter>("all");
  const nextRaw = upNext(progress);
  const next = nextRaw && localize(nextRaw, lang);

  const learnedCount = OPENINGS.filter((o) => progress[o.id]?.learned).length;
  const totalStars = OPENINGS.reduce(
    (n, o) =>
      n + starsFor(progress[o.id] ?? { learned: false, practiceRuns: 0 }),
    0,
  );
  const maxStars = OPENINGS.length * 3;
  const due = dueReviews(progress).map((o) => localize(o, lang));
  const tricky = trickyMoves(progress).length;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>
            {t.heroTitle} <span className="accent">{t.heroAccent}</span>
          </h1>
          <p className="lede">{t.heroLede}</p>
          {next ? (
            <button
              className="btn primary big"
              onClick={() => navigate({ page: "learn", id: next.id })}
            >
              {learnedCount === 0
                ? t.startWith(next.name)
                : t.upNextCta(next.name)}{" "}
              {next.emoji} {t.fwd}
            </button>
          ) : (
            <p className="all-done">{t.allMastered}</p>
          )}
          <div className="progress-strip">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={totalStars}
              aria-valuemax={maxStars}
              aria-label={t.starsEarned}
            >
              <span style={{ width: `${(totalStars / maxStars) * 100}%` }} />
            </div>
            <div className="progress-text">
              {t.progress(learnedCount, OPENINGS.length, totalStars, maxStars)}
            </div>
          </div>
        </div>
        <div className="hero-art" aria-hidden>
          <Board
            fen={HERO_FEN}
            orientation="white"
            arrows={[{ from: "c4", to: "f7", kind: "threat" }]}
          />
        </div>
      </section>

      {(due.length > 0 || tricky > 0) && (
        <section className="review">
          <div className="review-head">
            <h2>{t.reviewTitle}</h2>
            <span className="level-blurb">{t.reviewBlurb}</span>
          </div>
          <div className="next-list review-list">
            {due.map((o) => (
              <button
                key={o.id}
                type="button"
                className="next-item"
                onClick={() => navigate({ page: "review", id: o.id })}
              >
                <span className="next-emoji">{o.emoji}</span>
                <span>
                  <strong>{o.name}</strong>
                  <span className="muted small next-sub">
                    {t.reviewItem(o.side)}
                  </span>
                </span>
                <span className="next-arrow" aria-hidden>
                  {t.fwd}
                </span>
              </button>
            ))}
            {tricky > 0 && (
              <button
                type="button"
                className="next-item tricky"
                onClick={() => navigate({ page: "tricky" })}
              >
                <span className="next-emoji">🧩</span>
                <span>
                  <strong>{t.trickyTitle}</strong>
                  <span className="muted small next-sub">
                    {t.trickyCount(tricky)}
                  </span>
                </span>
                <span className="next-arrow" aria-hidden>
                  {t.fwd}
                </span>
              </button>
            )}
          </div>
        </section>
      )}

      <section className="catalog">
        <div className="catalog-head">
          <h2>{t.learningPath}</h2>
          <div className="segmented" role="tablist">
            {(["all", "white", "black"] as Filter[]).map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={filter === f ? "on" : ""}
                onClick={() => setFilter(f)}
              >
                {t.filters[f]}
              </button>
            ))}
          </div>
        </div>

        {LEVELS.map((level) => {
          const list = openings.filter(
            (o) =>
              o.difficulty === level && (filter === "all" || o.side === filter),
          );
          if (!list.length) return null;
          return (
            <div className="level" key={level}>
              <div className="level-head">
                <span className="level-tag">{t.level(level)}</span>
                <h3>{t.levels[level].title}</h3>
                <span className="level-blurb">{t.levels[level].blurb}</span>
              </div>
              <div className="cards">
                {list.map((o) => (
                  <OpeningCard
                    key={o.id}
                    opening={o}
                    step={openings.indexOf(o) + 1}
                    stars={starsFor(
                      progress[o.id] ?? { learned: false, practiceRuns: 0 },
                    )}
                    isNext={o.id === next?.id}
                    due={!!progress[o.id] && isDue(progress[o.id])}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <footer className="foot">
        <span>{t.footer}</span>
        <button
          className="btn link small"
          onClick={() => {
            if (window.confirm(t.resetConfirm)) resetAllProgress();
          }}
        >
          {t.resetProgress}
        </button>
      </footer>
    </div>
  );
}

function OpeningCard({
  opening: o,
  step,
  stars,
  isNext,
  due,
}: {
  opening: Opening;
  step: number;
  stars: number;
  isNext: boolean;
  due: boolean;
}) {
  const t = useT();
  const mastered = stars === 3;
  return (
    <button
      type="button"
      className={`card${isNext ? " up-next" : ""}${mastered ? " mastered" : ""}`}
      onClick={() => navigate({ page: "learn", id: o.id })}
    >
      <div className="card-top">
        <span className="card-emoji" aria-hidden>
          {o.emoji}
        </span>
        {isNext && <span className="tag next">{t.upNext}</span>}
        {due ? (
          <span className="tag review">{t.reviewTag}</span>
        ) : (
          mastered && <span className="tag done">{t.mastered}</span>
        )}
        <span className="card-step" aria-label={t.step(step)}>
          {step}
        </span>
      </div>
      <h4>{o.name}</h4>
      <p className="card-tag">{o.tagline}</p>
      <div className="card-foot">
        <span className={`side-chip ${o.side === "white" ? "w" : "b"}`}>
          {t.side(o.side)}
        </span>
        <Stars count={stars} />
      </div>
    </button>
  );
}
