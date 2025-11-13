"use client";

import { forwardRef, useTransition } from "react";
import type { LanguageOption } from "./types";

type Props = {
  locale: string;
  languages: LanguageOption[];
  changeLang: (nextLocale: string) => void;
};

/**
 * <details> dropdown for languages.
 * We forward the DOM ref so the parent can close it on outside click / Esc.
 */
const LangChooser = forwardRef<HTMLDetailsElement, Props>(function LangChooser(
  { locale, languages, changeLang },
  ref
) {
  const [isPending, startTransition] = useTransition();
  const current = languages.find((l) => l.code === locale) ?? languages[0];

  return (
    <details ref={ref} className="relative">
      <summary
        className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-black/10 bg-white/60 px-2.5 py-1.5 backdrop-blur [&::-webkit-details-marker]:hidden"
        title={current.label}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full text-base">
          <span className={current.flag} />
        </span>
        <svg className="h-4 w-4 text-slate-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
        </svg>
      </summary>

      {/* z-80 so it sits above the legal context bar */}
      <ul
        className="absolute right-0 z-[80] max-h-72 w-auto overflow-auto rounded-xl border border-black/10 bg-white p-1 text-sm shadow-xl"
        role="menu"
      >
        {languages.map((l) => {
          const active = locale === l.code;
          return (
            <li key={l.code}>
              <button
                type="button"
                disabled={isPending}
                onClick={() => startTransition(() => changeLang(l.code))}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition ${active ? "bg-orange-50 ring-1 ring-orange-300" : "hover:bg-black/5"} disabled:cursor-not-allowed disabled:opacity-60`}
                role="menuitem"
                aria-pressed={active}
                title={l.label}
              >
                <span className="grid h-5 w-5 place-items-center text-base">
                  <span className={l.flag} />
                </span>
                <span className="min-w-24 text-black">{l.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </details>
  );
});

export default LangChooser;
