import { useSyncExternalStore } from "react";
import { OPENINGS } from "../data/openings";
import { OPENINGS_HE } from "../data/openings.he";
import { STRINGS, type Strings } from "../data/strings";
import type { Opening } from "../data/types";

/** English / Hebrew. Choice is remembered per device; Hebrew browsers default to Hebrew. */
export type Lang = "en" | "he";

const KEY = "guys-chess-tutor:lang";
const listeners = new Set<() => void>();

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "he") return saved;
  } catch {
    /* private mode */
  }
  return navigator.languages?.some((l) => l.startsWith("he")) ? "he" : "en";
}

let current: Lang = initialLang();
applyToDocument(current);

function applyToDocument(lang: Lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "he" ? "rtl" : "ltr";
  document.title = STRINGS[lang].brand;
}

export function setLang(lang: Lang) {
  if (lang === current) return;
  current = lang;
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* private mode — still switches for this visit */
  }
  applyToDocument(lang);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    document.body.animate([{ opacity: 0.3 }, { opacity: 1 }], 280);
  listeners.forEach((l) => l());
}

export function useLang(): Lang {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => current,
  );
}

export function useT(): Strings {
  return STRINGS[useLang()];
}

const cache = new Map<string, Opening>();

/** The opening with its text in `lang` (moves, arrows, answers etc. are shared). */
export function localize(o: Opening, lang: Lang): Opening {
  const t = lang === "he" ? OPENINGS_HE[o.id] : undefined;
  if (!t) return o;
  const key = `${lang}:${o.id}`;
  let out = cache.get(key);
  if (!out) {
    out = {
      ...o,
      name: t.name,
      subtitle: t.subtitle,
      tagline: t.tagline,
      intro: t.intro,
      keyIdeas: t.keyIdeas,
      funFact: t.funFact,
      moves: o.moves.map((m, i) => ({ ...m, ...t.moves[i] })),
      quiz: o.quiz.map((q, i) => ({ ...q, ...t.quiz[i] })),
    };
    cache.set(key, out);
  }
  return out;
}

/** All openings (learning-path order) in the current language. */
export function useOpenings(): Opening[] {
  const lang = useLang();
  return OPENINGS.map((o) => localize(o, lang));
}
