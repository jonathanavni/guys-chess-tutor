import { useSyncExternalStore } from "react";

const KEY = "guys-chess-tutor:progress:v1";

export interface OpeningProgress {
  /** Learner has stepped through the whole walkthrough */
  learned: boolean;
  /** Fewest mistakes in a completed practice run (undefined = never completed) */
  bestMistakes?: number;
  /** Best quiz score */
  quizBest?: number;
  quizTotal?: number;
  /** Times the practice was completed */
  practiceRuns: number;
  /** ISO date of last activity */
  lastPlayed?: string;
}

export type ProgressMap = Record<string, OpeningProgress>;

const EMPTY: OpeningProgress = { learned: false, practiceRuns: 0 };
const listeners = new Set<() => void>();
let cache: ProgressMap | null = null;

function read(): ProgressMap {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    cache = {};
  }
  return cache;
}

function write(next: ProgressMap) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode etc. — progress just won't persist */
  }
  listeners.forEach((l) => l());
}

export function getProgress(id: string): OpeningProgress {
  return read()[id] ?? EMPTY;
}

export function updateProgress(id: string, patch: Partial<OpeningProgress>) {
  const all = read();
  write({
    ...all,
    [id]: {
      ...getProgress(id),
      ...patch,
      lastPlayed: new Date().toISOString(),
    },
  });
}

export function recordPractice(id: string, mistakes: number) {
  const cur = getProgress(id);
  updateProgress(id, {
    practiceRuns: cur.practiceRuns + 1,
    bestMistakes:
      cur.bestMistakes === undefined
        ? mistakes
        : Math.min(cur.bestMistakes, mistakes),
  });
}

export function recordQuiz(id: string, score: number, total: number) {
  const cur = getProgress(id);
  updateProgress(id, {
    quizBest:
      cur.quizBest === undefined ? score : Math.max(cur.quizBest, score),
    quizTotal: total,
  });
}

export function resetAllProgress() {
  write({});
}

/** 0–3 stars: learned it · practiced it well · mastered it (perfect practice + perfect quiz). */
export function starsFor(p: OpeningProgress): number {
  let stars = 0;
  if (p.learned) stars++;
  if (p.bestMistakes !== undefined && p.bestMistakes <= 2) stars++;
  if (p.quizTotal && p.quizBest === p.quizTotal && p.bestMistakes === 0)
    stars++;
  return stars;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** React hook: live view of all progress. */
export function useProgress(): ProgressMap {
  return useSyncExternalStore(subscribe, read, read);
}

export function useOpeningProgress(id: string): OpeningProgress {
  return useProgress()[id] ?? EMPTY;
}
