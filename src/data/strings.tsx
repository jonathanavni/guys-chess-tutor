import type { ReactNode } from "react";
import type { Side } from "./types";

/**
 * Every piece of UI text, in English and Hebrew. Lesson content lives in openings.ts / openings.he.ts.
 * Hebrew prefers gender-neutral phrasing ("we", impersonal forms) since anyone may be playing.
 */
const en = {
  fwd: "→",
  backIcon: "←",
  brand: "Guy's Chess Tutor",
  soundOn: "Turn sound on",
  soundOff: "Turn sound off",
  language: "Language",
  side: (s: Side): string => (s === "white" ? "White" : "Black"),
  youPlay: (s: Side): string =>
    s === "white" ? "You play White" : "You play Black",

  // Home
  heroTitle: "Learn chess openings,",
  heroAccent: "one move at a time.",
  heroLede: (
    <>
      I'll show you every move and explain <em>why</em> it's played. Then you
      play it yourself, and a quick quiz makes it stick.
    </>
  ),
  startWith: (name: string) => `Start with the ${name}`,
  upNextCta: (name: string) => `Up next: ${name}`,
  allMastered: "🏆 You've mastered every opening. Amazing!",
  progress: (learned: number, total: number, stars: number, max: number) => (
    <>
      <strong>{learned}</strong> of {total} learned · <strong>{stars}</strong>
      <span className="star-inline">★</span> of {max}
    </>
  ),
  starsEarned: "Stars earned",
  learningPath: "Your learning path",
  filters: { all: "All", white: "♔ White", black: "♚ Black" },
  levels: {
    1: {
      title: "First openings",
      blurb: "Simple ideas and safe moves. Start here.",
    },
    2: {
      title: "Building up",
      blurb: "Sharper plans, gambits, and your first sacrifice.",
    },
    3: {
      title: "Advanced",
      blurb: "Fighting defenses that grandmasters play.",
    },
  },
  level: (n: number) => `Level ${n}`,
  upNext: "Up next",
  mastered: "✓ Mastered",
  step: (n: number) => `Step ${n}`,
  footer: "Made with ♥ for Guy. Progress is saved on this device.",
  resetProgress: "Reset progress",
  resetConfirm: "Reset all progress on this device?",
  stars: (n: number) => `${n} of 3 stars`,

  // Lesson shell
  allOpenings: "All openings",
  lessonProgress: "Lesson progress",
  steps: {
    intro: "Meet it",
    learn: "Walk through",
    practice: "Play it",
    quiz: "Quiz",
    done: "Done",
  },

  // Intro
  startLesson: "Start the lesson →",
  meet: (name: string, emoji: string) => `Meet the ${name} ${emoji}`,
  rememberThree: "Remember these three things",
  funFact: "Fun fact",
  knowOpening: "I already know this opening — test me",

  // Walkthrough
  backToStart: "Back to start",
  toStartIcon: "⏮",
  back: "← Back",
  next: "Next →",
  practiceIt: "Practice it →",
  walkTitle: (name: string) => `Let's walk through the ${name} together.`,
  walkIntro: (side: string) => (
    <>
      <p>
        I'll play each move on the board and tell you <em>why</em> it's played.
        You're <strong>{side}</strong> in this opening, so the board is set up
        from your side.
      </p>
      <p>
        Press <strong>Next</strong> (or the → key) when you're ready for the
        first move.
      </p>
    </>
  ),
  yourMoveSuffix: " — your move",
  wholeLine: (side: string) => (
    <p>
      That's the whole line! Next, <strong>you</strong> play {side}'s moves and
      I'll play the other side. Ready?
    </p>
  ),
  moves: "Moves",
  movesSoFar: "Moves so far",
  keyIdeas: "Key ideas",
  knowLine: "I already know this line — skip to practice",
  start: "Start",

  // Practice
  restart: "↺ Restart",
  hint: "💡 Hint",
  takeQuiz: "Take the quiz →",
  slips: (n: number) => `${n} slip${n === 1 ? "" : "s"}`,
  perfectRun: "Perfect! You played the whole line without a single slip. 🎉",
  greatJob: (n: number) =>
    `Great job — you finished the line with only ${n} slip${n === 1 ? "" : "s"}.`,
  madeIt: (n: number) =>
    `You made it to the end! ${n} slips this time — one more run and it'll stick.`,
  knowFirst: (moves: number, name: string) => (
    <p>
      You now know the first {moves} moves of the {name}. Let's check you
      understand <em>why</em> they're played — a quick 3‑question quiz.
    </p>
  ),
  plays: (who: ReactNode, move: ReactNode) => (
    <>
      {who} plays {move}
    </>
  ),
  yourMovePrompt: "Your move! What do we play here?",
  thatsIt: (move: ReactNode) => <>✓ {move} — that's it!</>,
  oppFirst: (opp: string) => `${opp} moves first — watch the board.`,
  thenYourTurn: (you: string) =>
    `Then it's your turn to play ${you}'s moves from memory.`,
  firstMove: (you: string, name: string) =>
    `You're ${you}. Play the first move of the ${name}.`,
  yourMove: "Your move!",
  dragHelp:
    "Drag a piece, or tap it and then tap the square. Stuck? Ask for a hint.",
  whatDoes: (you: string) => `What does ${you} play here? Take your time.`,
  notTheMove: (move: ReactNode, name: string) => (
    <>
      Hmm, {move} isn't the {name} move.
    </>
  ),
  hereHint: "Here's a hint.",
  theMoveIs: (move: ReactNode) => (
    <>
      The move is {move} — I've drawn it on the board. Play it and we'll keep
      going.
    </>
  ),
  lookHighlighted:
    "Look at the highlighted piece. Still stuck? Ask for another hint.",

  // Quiz
  questionOf: (i: number, n: number) => `Question ${i} of ${n}`,
  seeResults: "See my results →",
  finish: "Finish →",
  nextQuestion: "Next question →",
  quizDone: (s: number, n: number) => `Quiz done: ${s} out of ${n}!`,
  quizPerfect:
    "You understand the ideas, not just the moves. That is what makes an opening really yours.",
  quizGood:
    "Nice work. Re‑read the ideas you missed — understanding the why is what makes the moves stick.",
  correct: "Correct! 🎯",
  notQuite: "Not quite.",
  lookAtBoard: "Look at the board if it helps, then pick an answer.",

  // Complete
  practiceAgain: "↺ Practice again",
  retakeQuiz: "Retake quiz",
  allOpeningsCta: "All openings →",
  masteredTitle: (name: string) => `You mastered the ${name}! 🏆`,
  learnedTitle: (name: string, emoji: string) =>
    `You've learned the ${name}! ${emoji}`,
  summaryWalk: "Walkthrough:",
  summaryWalkDone: "done ✓",
  summaryPractice: "Practice:",
  summaryPerfect: "perfect run! ✓",
  summaryBest: (n: number) => ` (best: ${n})`,
  summaryQuiz: "Quiz:",
  starsLegend:
    "Stars: ★ learned it · ★★ practiced with ≤2 slips · ★★★ perfect practice + perfect quiz. Come back and play it again in a few days — that's how it sticks.",
  nextOnPath: "Next on your path",
  levelAs: (level: number, side: Side) =>
    `Level ${level} · as ${side === "white" ? "White" : "Black"}`,

  // Review (spaced repetition) + tricky moves
  reviewTitle: "Time to review 🔁",
  reviewBlurb: "A quick replay from memory keeps your openings fresh.",
  reviewItem: (side: Side) =>
    `Play it from memory · as ${side === "white" ? "White" : "Black"}`,
  reviewTag: "🔁 Review",
  doneReview: "Done ✓",
  nextReview: (days: number) =>
    days <= 1
      ? "Let's play it again tomorrow, so it really sticks."
      : `Next review in ${days} days. Each clean run makes the gap longer — that's how it sticks for good.`,
  trickyNote: "⚠️ This move tripped you up last time. Take your time!",
  trickyTitle: "Fix your tricky moves",
  trickySub: "The moves that tripped you up, one at a time.",
  trickyCount: (n: number) =>
    n === 1 ? "1 move to practice again" : `${n} moves to practice again`,
  trickyDone: (fixed: number, total: number) =>
    fixed === total ? "All fixed! 🎉" : `${fixed} of ${total} fixed!`,
  trickyDoneBody:
    "Any move you needed a hint for stays on the list, so we can try it again another day.",
  trickyNone: "No tricky moves right now 🎉",
  trickyNoneBody: "When a move trips you up in practice, it'll show up here.",
};

export type Strings = typeof en;

const he: Strings = {
  fwd: "←",
  backIcon: "→",
  brand: "המורה לשחמט של גיא",
  soundOn: "הפעלת צליל",
  soundOff: "השתקת צליל",
  language: "שפה",
  side: (s) => (s === "white" ? "לבן" : "שחור"),
  youPlay: (s) => (s === "white" ? "הצד שלך: לבן" : "הצד שלך: שחור"),

  heroTitle: "לומדים פתיחות בשחמט,",
  heroAccent: "מהלך אחרי מהלך.",
  heroLede: (
    <>
      אני אראה לך כל מהלך ואסביר <em>למה</em> משחקים אותו. אחר כך תורך לשחק אותו
      בעצמך, וחידון קצר ישאיר את זה בראש.
    </>
  ),
  startWith: (name) => `נתחיל עם ${name}`,
  upNextCta: (name) => `הבא בתור: ${name}`,
  allMastered: "🏆 שלטת בכל הפתיחות. מדהים!",
  progress: (learned, total, stars, max) => (
    <>
      <strong>{learned}</strong> מתוך {total} נלמדו · <strong>{stars}</strong>
      <span className="star-inline">★</span> מתוך {max}
    </>
  ),
  starsEarned: "כוכבים שנאספו",
  learningPath: "מסלול הלמידה שלך",
  filters: { all: "הכול", white: "♔ לבן", black: "♚ שחור" },
  levels: {
    1: {
      title: "פתיחות ראשונות",
      blurb: "רעיונות פשוטים ומהלכים בטוחים. מתחילים כאן.",
    },
    2: {
      title: "בונים כוח",
      blurb: "תוכניות חדות יותר, גמביטים וההקרבה הראשונה שלך.",
    },
    3: { title: "למתקדמים", blurb: "הגנות לוחמניות שרבי־אמנים משחקים." },
  },
  level: (n) => `שלב ${n}`,
  upNext: "הבא בתור",
  mastered: "✓ מאסטר",
  step: (n) => `מספר ${n}`,
  footer: "נעשה באהבה ♥ בשביל גיא. ההתקדמות נשמרת במכשיר הזה.",
  resetProgress: "איפוס התקדמות",
  resetConfirm: "לאפס את כל ההתקדמות במכשיר הזה?",
  stars: (n) => `${n} מתוך 3 כוכבים`,

  allOpenings: "כל הפתיחות",
  lessonProgress: "התקדמות בשיעור",
  steps: {
    intro: "הכרות",
    learn: "מעבר על המהלכים",
    practice: "משחקים",
    quiz: "חידון",
    done: "סיום",
  },

  startLesson: "מתחילים את השיעור ←",
  meet: (name, emoji) => `נכיר את ${name} ${emoji}`,
  rememberThree: "שלושה דברים לזכור",
  funFact: "עובדה מגניבה",
  knowOpening: "כבר למדתי את הפתיחה הזו — ישר למבחן",

  backToStart: "חזרה להתחלה",
  toStartIcon: "⏭",
  back: "→ אחורה",
  next: "הבא ←",
  practiceIt: "לתרגול ←",
  walkTitle: (name) => `נעבור יחד על ${name}.`,
  walkIntro: (side) => (
    <>
      <p>
        אני אשחק כל מהלך על הלוח ואסביר <em>למה</em> משחקים אותו. בפתיחה הזו הצד
        שלך הוא <strong>{side}</strong>, אז הלוח מסודר מהצד שלך.
      </p>
      <p>
        כשמוכנים למהלך הראשון, לוחצים על <strong>הבא</strong> (או על מקש החץ).
      </p>
    </>
  ),
  yourMoveSuffix: " — המהלך שלך",
  wholeLine: (side) => (
    <p>
      זו כל השורה! עכשיו <strong>תורך</strong> לשחק את המהלכים של {side}, ואני
      אשחק את הצד השני. מוכנים?
    </p>
  ),
  moves: "מהלכים",
  movesSoFar: "המהלכים עד עכשיו",
  keyIdeas: "רעיונות מרכזיים",
  knowLine: "כבר למדתי את השורה הזו — ישר לתרגול",
  start: "התחלה",

  restart: "↺ מההתחלה",
  hint: "💡 רמז",
  takeQuiz: "לחידון ←",
  slips: (n) => (n === 1 ? "פספוס אחד" : `${n} פספוסים`),
  perfectRun: "מושלם! שיחקת את כל השורה בלי אף פספוס. 🎉",
  greatJob: (n) =>
    `כל הכבוד — סיימת את השורה עם ${n === 1 ? "פספוס אחד" : `${n} פספוסים`} בלבד.`,
  madeIt: (n) => `הגעת עד הסוף! ${n} פספוסים הפעם — עוד סיבוב אחד וזה יישב.`,
  knowFirst: (moves, name) => (
    <p>
      {moves} המהלכים הראשונים של {name} כבר אצלך. עכשיו נבדוק שהבנת{" "}
      <em>למה</em> משחקים אותם — חידון קצר של 3 שאלות.
    </p>
  ),
  plays: (who, move) => (
    <>
      {who} משחק {move}
    </>
  ),
  yourMovePrompt: "תורך! מה נשחק כאן?",
  thatsIt: (move) => <>✓ {move} — נכון!</>,
  oppFirst: (opp) => `${opp} מתחיל — עוקבים אחרי הלוח.`,
  thenYourTurn: (you) => `אחר כך תורך לשחק את המהלכים של ${you} מהזיכרון.`,
  firstMove: (you, name) => `הצד שלך: ${you}. מה המהלך הראשון של ${name}?`,
  yourMove: "תורך!",
  dragHelp: "גוררים כלי, או לוחצים עליו ואז על המשבצת. נתקעת? אפשר לבקש רמז.",
  whatDoes: (you) => `מה ${you} משחק כאן? אין לחץ.`,
  notTheMove: (move, name) => (
    <>
      הממ, {move} זה לא המהלך של {name}.
    </>
  ),
  hereHint: "הנה רמז.",
  theMoveIs: (move) => (
    <>המהלך הוא {move} — ציירתי אותו על הלוח. נשחק אותו ונמשיך.</>
  ),
  lookHighlighted: "הכלי המסומן הוא הרמז. צריך עוד עזרה? אפשר לבקש רמז נוסף.",

  questionOf: (i, n) => `שאלה ${i} מתוך ${n}`,
  seeResults: "לתוצאות ←",
  finish: "סיום ←",
  nextQuestion: "לשאלה הבאה ←",
  quizDone: (s, n) => `החידון נגמר: ${s} מתוך ${n}!`,
  quizPerfect:
    "הבנת את הרעיונות, לא רק את המהלכים. ככה פתיחה באמת הופכת להיות שלך.",
  quizGood:
    "עבודה יפה. כדאי לקרוא שוב את הרעיונות שפספסת — להבין את ה״למה״ זה מה שגורם למהלכים להישאר בראש.",
  correct: "נכון! 🎯",
  notQuite: "לא בדיוק.",
  lookAtBoard: "אפשר להיעזר בלוח, ואז לבחור תשובה.",

  practiceAgain: "↺ עוד תרגול",
  retakeQuiz: "חידון שוב",
  allOpeningsCta: "לכל הפתיחות ←",
  masteredTitle: (name) => `מאסטר! ${name} אצלך בכיס 🏆`,
  learnedTitle: (name, emoji) => `למדת את ${name}! ${emoji}`,
  summaryWalk: "מעבר על המהלכים:",
  summaryWalkDone: "בוצע ✓",
  summaryPractice: "תרגול:",
  summaryPerfect: "בלי פספוסים! ✓",
  summaryBest: (n) => ` (שיא: ${n})`,
  summaryQuiz: "חידון:",
  starsLegend:
    "כוכבים: ★ למדת · ★★ תרגול עם עד 2 פספוסים · ★★★ תרגול מושלם + חידון מושלם. כדאי לחזור ולשחק שוב בעוד כמה ימים — ככה זה נשאר בראש.",
  nextOnPath: "הבא במסלול שלך",
  levelAs: (level, side) =>
    `שלב ${level} · בצד ה${side === "white" ? "לבן" : "שחור"}`,

  reviewTitle: "זמן לחזרה 🔁",
  reviewBlurb: "סיבוב קצר מהזיכרון שומר על הפתיחות טריות.",
  reviewItem: (side) =>
    `משחקים מהזיכרון · בצד ה${side === "white" ? "לבן" : "שחור"}`,
  reviewTag: "🔁 חזרה",
  doneReview: "סיימתי ✓",
  nextReview: (days) =>
    days <= 1
      ? "נשחק את זה שוב מחר, כדי שזה באמת יישב."
      : `החזרה הבאה בעוד ${days} ימים. כל סיבוב בלי טעויות מאריך את ההפסקה — ככה זה נשאר בראש לתמיד.`,
  trickyNote: "⚠️ המהלך הזה הכשיל אותך בפעם הקודמת. אין לחץ!",
  trickyTitle: "מתקנים מהלכים מבלבלים",
  trickySub: "המהלכים שהכשילו אותך, אחד אחד.",
  trickyCount: (n) =>
    n === 1 ? "מהלך אחד לתרגל שוב" : `${n} מהלכים לתרגל שוב`,
  trickyDone: (fixed, total) =>
    fixed === total ? "הכול תוקן! 🎉" : `${fixed} מתוך ${total} תוקנו!`,
  trickyDoneBody:
    "מהלך שהיה צריך בשבילו רמז נשאר ברשימה, כדי שננסה אותו שוב ביום אחר.",
  trickyNone: "אין כרגע מהלכים מבלבלים 🎉",
  trickyNoneBody: "כשמהלך יכשיל אותך בתרגול, הוא יופיע כאן.",
};

export const STRINGS = { en, he };
