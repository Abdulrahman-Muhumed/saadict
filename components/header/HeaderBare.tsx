"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { brand } from "@/components/config/brand";
import LangChooser from "./LangChooser";
import MobileSheet from "./MobileSheet";
import { useScrollProgress } from "./hooks/useScrollProgress";
import type { LanguageOption } from "./types";
import { useTheme } from "next-themes";

export default function HeaderBare() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { scrolled } = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { theme } = useTheme();

  const LANGUAGES: LanguageOption[] = [
    { code: "en", label: "English", flag: "fi fi-gb" },
  ];

  // REAL HORNBOX NAVIGATION
  const navLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/industries", label: "Industries" },
      { href: "/global-network", label: "Global Network" },
      { href: "/projects", label: "Projects" },
      { href: "/contact", label: "Contact" },
    ],
    []
  );

  const activeHref = useMemo(() => {
    const exact = navLinks.find((l) => l.href === pathname);
    if (exact) return exact.href;
    const deep = navLinks.find(
      (l) => l.href !== "/" && pathname?.startsWith(l.href)
    );
    return deep?.href ?? "/";
  }, [pathname, navLinks]);

  const changeLang = (nextLocale: string) => {
    if (nextLocale === locale) return;
    startTransition(() => router.replace(pathname, { locale: nextLocale }));
  };

  useEffect(() => setOpen(false), [pathname]);

  // Close dropdown on outside click
  const langRef = useRef<HTMLDetailsElement | null>(null);
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        langRef.current &&
        (langRef.current as any).open &&
        !langRef.current.contains(e.target as Node)
      ) {
        (langRef.current as any).open = false;
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-[60]">
      <div className="mx-auto max-w-7xl px-4">
        {/* HEADER */}
        <div
          className={`
            flex items-center justify-between px-5 py-3 mt-3
            rounded-xl border transition-all 
            ${
              scrolled
                ? "bg-white/90 dark:bg-black/90 border-black/10 dark:border-white/10 shadow-md backdrop-blur-xl"
                : "bg-white/50 dark:bg-black/40 border-black/10 dark:border-white/10 backdrop-blur-xl"
            }
          `}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={theme === "dark" ? brand.logo.dark : brand.logo.light}
              alt="HornBox"
              width={42}
              height={42}
              className="h-10 w-auto"
              priority
            />
            <span className="font-semibold text-[17px] tracking-tight text-black dark:text-white">
              {brand.name}
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-4 py-2 text-sm font-medium transition
                    ${
                      active
                        ? "text-black dark:text-white"
                        : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
                    }
                  `}
                >
                  {link.label}

                  {active && (
                    <span
                      className="absolute left-3 right-3 bottom-[2px] h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${brand.colors.accent}, ${brand.colors.primary})`,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <LangChooser
              ref={langRef}
              locale={locale}
              languages={LANGUAGES}
              changeLang={changeLang}
            />
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
          >
            {open ? (
              <svg className="h-6 w-6" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" stroke="currentColor" strokeWidth="2" fill="none">
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
        brandIndigo={brand.colors.primary}
        accent={brand.colors.accent}
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
