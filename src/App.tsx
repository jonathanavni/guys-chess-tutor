import type React from "react";
import { getOpening } from "./data/openings";
import { useRoute, navigate } from "./lib/router";
import { toggleMuted, useMuted } from "./lib/celebrate";
import { localize, setLang, useLang, useT, type Lang } from "./lib/i18n";
import { Home } from "./components/Home";
import { Lesson } from "./components/Lesson";
import { Tricky } from "./components/Tricky";

// Tiny inline flags (flag emoji don't render on Windows).
const US_FLAG = (
  <svg viewBox="0 0 19 10" aria-hidden>
    <rect width="19" height="10" fill="#b22234" />
    {[1, 3, 5, 7, 9].map((y) => (
      <rect key={y} y={(y * 10) / 13} width="19" height={10 / 13} fill="#fff" />
    ))}
    <rect width="7.6" height={(7 * 10) / 13} fill="#3c3b6e" />
  </svg>
);
const IL_FLAG = (
  <svg viewBox="0 0 22 16" aria-hidden>
    <rect width="22" height="16" fill="#fff" />
    <rect y="1.5" width="22" height="2.4" fill="#0038b8" />
    <rect y="12.1" width="22" height="2.4" fill="#0038b8" />
    <path
      d="M11 4.6 13.9 9.6H8.1ZM11 11.4 8.1 6.4H13.9Z"
      fill="none"
      stroke="#0038b8"
      strokeWidth="0.8"
    />
  </svg>
);

const LANGS: {
  lang: Lang;
  label: string;
  name: string;
  flag: React.ReactNode;
}[] = [
  { lang: "en", label: "EN", name: "English", flag: US_FLAG },
  { lang: "he", label: "עב", name: "עברית", flag: IL_FLAG },
];

export default function App() {
  const route = useRoute();
  const muted = useMuted();
  const lang = useLang();
  const t = useT();
  const found = "id" in route ? getOpening(route.id) : undefined;
  const opening = found && localize(found, lang);

  return (
    <>
      <nav className="topbar">
        <button
          type="button"
          className="brand"
          onClick={() => navigate({ page: "home" })}
        >
          <img src="./knight.svg" alt="" width={28} height={28} />
          <span className="brand-name">{t.brand}</span>
        </button>
        <div className="topbar-actions">
          <div className="segmented small" role="group" aria-label={t.language}>
            {LANGS.map((l) => (
              <button
                key={l.lang}
                type="button"
                lang={l.lang}
                className={lang === l.lang ? "on" : ""}
                aria-pressed={lang === l.lang}
                aria-label={l.name}
                title={l.name}
                onClick={() => setLang(l.lang)}
              >
                <span className="flag">{l.flag}</span>
                <span className="lang-label">{l.label}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleMuted}
            aria-label={muted ? t.soundOn : t.soundOff}
            title={muted ? t.soundOn : t.soundOff}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </nav>
      <main
        className="page"
        key={opening ? `${route.page}:${opening.id}` : route.page}
      >
        {opening ? (
          <Lesson opening={opening} review={route.page === "review"} />
        ) : route.page === "tricky" ? (
          <Tricky />
        ) : (
          <Home />
        )}
      </main>
    </>
  );
}
