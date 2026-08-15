import { useEffect, useState } from "react";
import type { Opening } from "../data/types";
import { updateProgress } from "../lib/progress";
import { navigate } from "../lib/router";
import { Intro } from "./Intro";
import { Walkthrough } from "./Walkthrough";
import { Practice } from "./Practice";
import { Quiz } from "./Quiz";
import { Complete } from "./Complete";

type Phase = "intro" | "learn" | "practice" | "quiz" | "done";

const STEPS: { key: Phase; label: string }[] = [
  { key: "intro", label: "Meet it" },
  { key: "learn", label: "Walk through" },
  { key: "practice", label: "Play it" },
  { key: "quiz", label: "Quiz" },
  { key: "done", label: "Done" },
];

/** The lesson shell: header + phase stepper + the current phase. */
export function Lesson({ opening }: { opening: Opening }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [mistakes, setMistakes] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<{ score: number; total: number } | null>(
    null,
  );
  const [practiceKey, setPracticeKey] = useState(0);

  // Reset when switching openings via URL.
  useEffect(() => {
    setPhase("intro");
    setMistakes(null);
    setQuiz(null);
  }, [opening.id]);

  // Each phase starts at the top of the page (matters on phones).
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [phase]);

  const stepIndex = STEPS.findIndex((s) => s.key === phase);

  return (
    <div className="lesson">
      <header className="lesson-header">
        <button
          className="btn ghost back"
          onClick={() => navigate({ page: "home" })}
        >
          ← All openings
        </button>
        <div className="lesson-title">
          <span className="lesson-emoji" aria-hidden>
            {opening.emoji}
          </span>
          <div>
            <h1>{opening.name}</h1>
            <div className="lesson-sub">
              {opening.subtitle} ·{" "}
              <span
                className={`side-chip ${opening.side === "white" ? "w" : "b"}`}
              >
                {opening.side === "white" ? "You play White" : "You play Black"}
              </span>
            </div>
          </div>
        </div>
        <button
          className="btn ghost"
          onClick={() => navigate({ page: "home" })}
        >
          Switch opening
        </button>
      </header>

      <ol className="stepper" aria-label="Lesson progress">
        {STEPS.map((s, i) => (
          <li
            key={s.key}
            className={
              i < stepIndex ? "done" : i === stepIndex ? "current" : ""
            }
            onClick={() => i < stepIndex && s.key !== "done" && setPhase(s.key)}
          >
            <span className="step-dot">{i < stepIndex ? "✓" : i + 1}</span>
            <span className="step-label">{s.label}</span>
          </li>
        ))}
      </ol>

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
          onDone={(m) => {
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
  );
}
