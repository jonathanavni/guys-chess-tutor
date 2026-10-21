import { useSyncExternalStore } from "react";
import { OPENINGS } from "../data/openings";
import type { Opening } from "../data/types";

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
  /** Spaced repetition: index into REVIEW_DAYS, and when the next review is due (ISO) */
  reviewLevel?: number;
  reviewDue?: string;
  /** Learner plies slipped on (wrong move or hint) in the last full run — "tricky moves" */
  tricky?: number[];
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

/** Days until the next review at each level: a clean run moves up a level, a slip moves down one. */
export const REVIEW_DAYS = [1, 3, 7, 14, 30];

export function isDue(p: OpeningProgress): boolean {
  return !!p.reviewDue && Date.now() >= Date.parse(p.reviewDue);
}

/** Local midnight `days` from today, so "due tomorrow" means any time tomorrow. */
function daysFromToday(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/** A finished practice run (lesson or review). `slipped` = learner plies that needed help. */
export function recordPractice(
  id: string,
  mistakes: number,
  slipped: number[],
) {
  const cur = getProgress(id);
  const first = cur.reviewLevel === undefined;
  const level = cur.reviewLevel ?? 0;
  // Only a review that was actually due moves you up; replaying early doesn't skip ahead.
  const nextLevel = slipped.length
    ? Math.max(0, level - 1)
    : first
      ? 0
      : isDue(cur)
        ? Math.min(REVIEW_DAYS.length - 1, level + 1)
        : level;
  const reschedule = first || slipped.length > 0 || nextLevel !== level;
  updateProgress(id, {
    practiceRuns: cur.practiceRuns + 1,
    bestMistakes:
      cur.bestMistakes === undefined
        ? mistakes
        : Math.min(cur.bestMistakes, mistakes),
    tricky: slipped,
    reviewLevel: nextLevel,
    reviewDue: reschedule
      ? daysFromToday(REVIEW_DAYS[nextLevel])
      : cur.reviewDue,
  });
}

/** A tricky move played right on the first try (no hint) in the drill is no longer tricky. */
export function fixTricky(id: string, ply: number) {
  const cur = getProgress(id);
  updateProgress(id, { tricky: (cur.tricky ?? []).filter((p) => p !== ply) });
}

/** Whole days until the next review (0 = today). */
export function daysUntilReview(p: OpeningProgress): number | undefined {
  if (!p.reviewDue) return undefined;
  return Math.max(
    0,
    Math.round(
      (Date.parse(p.reviewDue) - Date.parse(daysFromToday(0))) / 864e5,
    ),
  );
}

/** Openings due for review, in learning-path order. */
export function dueReviews(progress: ProgressMap): Opening[] {
  return OPENINGS.filter((o) => progress[o.id] && isDue(progress[o.id]));
}

/** Tricky moves for one warm-up (at most 8 — a couple of minutes), in learning-path order. */
export function trickyMoves(
  progress: ProgressMap,
): { opening: Opening; ply: number }[] {
  return OPENINGS.flatMap((o) =>
    (progress[o.id]?.tricky ?? []).map((ply) => ({ opening: o, ply })),
  ).slice(0, 8);
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

/**
 * Where the learning path continues: the first opening not yet learned, else the first not
 * yet mastered (OPENINGS is ordered simplest → hardest). Undefined when everything is mastered.
 */
export function upNext(
  progress: ProgressMap,
  skipId?: string,
): Opening | undefined {
  const list = OPENINGS.filter((o) => o.id !== skipId);
  const p = (o: Opening) => progress[o.id] ?? EMPTY;
  return (
    list.find((o) => !p(o).learned) ?? list.find((o) => starsFor(p(o)) < 3)
  );
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
