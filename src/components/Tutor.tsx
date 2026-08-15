import type { ReactNode } from "react";

export type Mood = "neutral" | "happy" | "think" | "oops" | "star";

const FACE: Record<Mood, string> = {
  neutral: "🧙",
  happy: "😄",
  think: "🤔",
  oops: "😅",
  star: "🤩",
};

/** The tutor's speech bubble. `title` is bold lead text, children is the body. */
export function Tutor({
  mood = "neutral",
  title,
  children,
  footer,
}: {
  mood?: Mood;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="tutor">
      <div className={`tutor-avatar mood-${mood}`} aria-hidden>
        {FACE[mood]}
      </div>
      <div
        className="tutor-bubble"
        key={typeof title === "string" ? title : undefined}
      >
        {title && <div className="tutor-title">{title}</div>}
        {children && <div className="tutor-body">{children}</div>}
        {footer && <div className="tutor-footer">{footer}</div>}
      </div>
    </div>
  );
}
