export type Side = "white" | "black";

export interface Arrow {
  from: string;
  to: string;
  /** 'idea' = green (plan), 'threat' = red, 'note' = blue */
  kind?: "idea" | "threat" | "note";
}

export interface OpeningMove {
  /** Standard Algebraic Notation, e.g. "Nf3" */
  san: string;
  /** What the tutor says when this move is played (kid‑friendly, 1–3 sentences). */
  explanation: string;
  /** Optional arrows to draw after the move is played. */
  arrows?: Arrow[];
  /** Optional squares to highlight after the move is played. */
  highlights?: string[];
  /** Hint shown in practice mode when the learner plays a different move. */
  hint?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  /** Index into options */
  answer: number;
  explanation: string;
  /** Optional: show the position after this many plies from the start (0 = start). */
  ply?: number;
}

export interface Opening {
  id: string;
  name: string;
  subtitle: string;
  /** Which side the learner plays in this opening */
  side: Side;
  difficulty: 1 | 2 | 3;
  emoji: string;
  tagline: string;
  /** Short intro paragraphs (kid‑friendly) */
  intro: string[];
  /** The 2‑4 key ideas to remember */
  keyIdeas: string[];
  moves: OpeningMove[];
  quiz: QuizQuestion[];
  funFact?: string;
}
