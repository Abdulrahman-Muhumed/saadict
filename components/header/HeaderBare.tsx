"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { brand } from "@/components/config/brand";
import "flag-icons/css/flag-icons.min.css";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import AuthCTA from "@/components/AuthCTA "
import LangChooser from "./LangChooser";
import MobileSheet from "./MobileSheet";
import { useScrollProgress } from "./hooks/useScrollProgress";
import type { LanguageOption } from "./types";



export default function HeaderBare() {
  const BRAND_INDIGO = brand.colors.primary;
  const ACCENT = brand.colors.accent;

  const t = useTranslations("nav");

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { scrolled } = useScrollProgress();
  const [isPending, startTransition] = useTransition();

  const LANGUAGES: LanguageOption[] = [
    { code: "en", label: "English", flag: "fi fi-gb" },
    { code: "so", label: "Somali", flag: "fi fi-so" },
    { code: "ar", label: "العربية", flag: "fi fi-sa" },
  ];

  // 🧭 E-Portal navigation (translated)
  const navLinks = useMemo(
    () => [
      { href: "/", label: t("home") },
      { href: "/about", label: t("about") },
      { href: "/services", label: t("services") },
      { href: "/contact", label: t("contact") },
    ],
    [t]
  );

  const activeHref = useMemo(() => {
    const exact = navLinks.find((l) => l.href === pathname);
    if (exact) return exact.href;
    const deep = navLinks.find((l) => l.href !== "/" && pathname?.startsWith(l.href));
    return deep?.href ?? "/";
  }, [pathname, navLinks]);

  const changeLang = (nextLocale: string) => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  useEffect(() => setOpen(false), [pathname]);

  // close language dropdown on outside click
  const langRef = useRef<HTMLDetailsElement | null>(null);
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const LR = langRef.current;
      const target = e.target as Node | null;
      if (LR && (LR as any).open && target && !LR.contains(target)) (LR as any).open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      const LR = langRef.current;
      if (e.key === "Escape" && LR && (LR as any).open) (LR as any).open = false;
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-3 z-[50]">
      <div className="mx-auto max-w-7xl px-4 transition-all">
        <div
          className={`relative flex items-center justify-between rounded-2xl border backdrop-blur-xl px-4 py-3 transition-all ${scrolled
            ? "border-slate-200/70 bg-white/60 shadow-2xl dark:bg-neutral-950/80"
            : "border-slate-200/40 bg-white/20 shadow-xl dark:bg-white/20"
            }`}
          style={{
            boxShadow: scrolled
              ? "0 12px 45px -20px rgba(22,28,45,0.25), inset 0 0 0 1px rgba(255,255,255,0.35)"
              : "0 18px 70px -28px rgba(22,28,45,0.20), inset 0 0 0 1px rgba(255,255,255,0.45)",
          }}
        >
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src={brand.logo.light}
              alt={t("logoAlt")}
              width={36}
              height={36}
              className="h-9 w-auto"
              priority
            />
            <span className="font-semibold tracking-tight text-slate-900 dark:text-neutral-100 group-hover:opacity-90">
              {t("brandName")}
            </span>
          </Link>

          {/* NAV (Desktop) */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-neutral-200"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute inset-x-2 -bottom-[2px] h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT}, ${BRAND_INDIGO})`,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT CLUSTER */}
          <div className="hidden md:flex items-center gap-3">
            <AuthCTA t={t} />
            <LangChooser
              ref={langRef}
              locale={locale}
              languages={LANGUAGES}
              changeLang={changeLang}
            />
          </div>



          {/* MOBILE TOGGLE */}
          <button
            aria-label="Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100/60 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <MobileSheet
        open={open}
        onClose={() => setOpen(false)}
        brandIndigo={BRAND_INDIGO}
        accent={ACCENT}
        t={(k) => t(k as any)}
        pathname={pathname}
        navLinks={navLinks}
        locale={locale}
        languages={LANGUAGES}
        changeLang={changeLang}
        isMyId={false}
      />
    </header>
  );
}
