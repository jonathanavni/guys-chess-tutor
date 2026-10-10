import { useT } from "../lib/i18n";

/** 0–3 star rating. */
export function Stars({
  count,
  big = false,
}: {
  count: number;
  big?: boolean;
}) {
  const t = useT();
  return (
    <span className={`stars${big ? " big" : ""}`} aria-label={t.stars(count)}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i < count ? "on" : ""}>
          ★
        </span>
      ))}
    </span>
  );
}
