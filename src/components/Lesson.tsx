import { useEffect, useState } from "react";
import type { Opening } from "../data/types";
import { updateProgress } from "../lib/progress";
import { navigate } from "../lib/router";
import { useT } from "../lib/i18n";
import { Intro } from "./Intro";
import { Walkthrough } from "./Walkthrough";
import { Practice } from "./Practice";
import { Quiz } from "./Quiz";
import { Complete } from "./Complete";

type Phase = "intro" | "learn" | "practice" | "quiz" | "done";

const STEPS: Phase[] = ["intro", "learn", "practice", "quiz", "done"];

/**
 * The lesson shell: header + phase stepper + the current phase.
 * `review` = a quick spaced-repetition replay: practice only, then back home.
 */
export function Lesson({
  opening,
  review = false,
}: {
  opening: Opening;
  review?: boolean;
}) {
  const t = useT();
  const [phase, setPhase] = useState<Phase>(review ? "practice" : "intro");
  const [mistakes, setMistakes] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<{ score: number; total: number } | null>(
    null,
  );
  const [practiceKey, setPracticeKey] = useState(0);

  // Reset when switching openings via URL.
  useEffect(() => {
    setPhase(review ? "practice" : "intro");
    setMistakes(null);
    setQuiz(null);
  }, [opening.id, review]);

  // Each phase starts at the top of the page (matters on phones).
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [phase]);

  const stepIndex = STEPS.indexOf(phase);

  return (
    <div className="lesson">
      <header className="lesson-header">
        <button
          className="icon-btn back"
          onClick={() => navigate({ page: "home" })}
          aria-label={t.allOpenings}
          title={t.allOpenings}
        >
          {t.backIcon}
        </button>
        <span className="lesson-emoji" aria-hidden>
          {opening.emoji}
        </span>
        <div className="lesson-title">
          <h1>{opening.name}</h1>
          <div className="lesson-sub">
            {opening.subtitle}
            {review && <span className="tag review">{t.reviewTag}</span>}
            <span
              className={`side-chip ${opening.side === "white" ? "w" : "b"}`}
            >
              {t.youPlay(opening.side)}
            </span>
          </div>
        </div>
      </header>

      {!review && (
        <ol className="stepper" aria-label={t.lessonProgress}>
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={
                i < stepIndex ? "done" : i === stepIndex ? "current" : ""
              }
              aria-current={i === stepIndex ? "step" : undefined}
              onClick={() => i < stepIndex && s !== "done" && setPhase(s)}
            >
              <span className="step-dot">{i < stepIndex ? "✓" : i + 1}</span>
              <span className="step-label">{t.steps[s]}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="phase" key={phase}>
        {phase === "intro" && (
          <Intro
            opening={opening}
            onStart={() => setPhase("learn")}
            onSkip={() => setPhase("practice")}
          />
        )}
        {phase === "learn" && (
          <Walkthrough
            opening={opening}
            onDone={() => {
              updateProgress(opening.id, { learned: true });
              setPhase("practice");
            }}
            onSkip={() => setPhase("practice")}
          />
        )}
        {phase === "practice" && (
          <Practice
            key={practiceKey}
            opening={opening}
            review={review}
            onDone={(m) => {
              if (review) return navigate({ page: "home" });
              setMistakes(m);
              updateProgress(opening.id, { learned: true });
              setPhase("quiz");
            }}
          />
        )}
        {phase === "quiz" && (
          <Quiz
            opening={opening}
            onDone={(score, total) => {
              setQuiz({ score, total });
              setPhase("done");
            }}
          />
        )}
        {phase === "done" && (
          <Complete
            opening={opening}
            mistakes={mistakes}
            quiz={quiz}
            onPracticeAgain={() => {
              setPracticeKey((k) => k + 1);
              setPhase("practice");
            }}
            onRetakeQuiz={() => setPhase("quiz")}
          />
        )}
      </div>
    </div>
  );
}
