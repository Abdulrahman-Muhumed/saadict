"use client";

import { useTransition } from "react";
import type { LanguageOption, NavLink } from "./types";
import { Link } from "@/lib/i18n/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  brandIndigo: string;
  accent: string;
  t: (key: string) => string; // next-intl proxy access
  pathname: string;
  navLinks: NavLink[];
  locale: string;
  languages: LanguageOption[];
  changeLang: (nextLocale: string) => void;
  isMyId: boolean;
};

export default function MobileSheet({
  open,
  onClose,
  brandIndigo,
  accent,
  t,
  pathname,
  navLinks,
  locale,
  languages,
  changeLang,
  isMyId,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className={`md:hidden fixed inset-0 z-40 transition ${open ? "visible" : "invisible"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-2xl border-l border-slate-200 transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="px-4 pb-3 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${brandIndigo}, ${accent})` }}
              >
                H
              </span>
              <span className="font-semibold tracking-tight text-slate-900">Hoggaan Travels</span>
            </div>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mt-2">
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block w-full rounded-lg px-3 py-3 text-sm font-medium transition ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Hoggaan ID */}
            <div className="mt-3 grid gap-2">
              <Link
                href="/auth/login"
                className="block w-full rounded-full px-4 py-3 text-center text-sm font-semibold text-white"
                style={{
                  background: isMyId
                    ? `linear-gradient(90deg, ${brandIndigo}, ${accent})`
                    : `linear-gradient(90deg, ${accent}, ${brandIndigo})`,
                  outline: isMyId ? `2px solid ${accent}55` : "none",
                }}
              >
                {t("login")}
              </Link>
            </div>

            {/* Mobile language flags */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-slate-500">Language:</span>
              <div className="flex items-center gap-2">
                {languages.map((l) => {
                  const active = locale === l.code;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      disabled={isPending}
                      onClick={() => startTransition(() => changeLang(l.code))}
                      aria-label={l.label}
                      aria-pressed={active}
                      className={`grid h-9 w-9 place-items-center rounded-full text-base transition ${active ? "ring-2 ring-orange-400" : "bg-slate-50 hover:bg-slate-100"} disabled:cursor-not-allowed disabled:opacity-60`}
                      title={l.label}
                    >
                      <span className={l.flag} />
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
