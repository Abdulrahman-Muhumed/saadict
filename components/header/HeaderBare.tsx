"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { brand } from "@/components/config/brand";
import MobileSheet from "./MobileSheet";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useTheme } from "next-themes";

export default function HeaderBare() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { scrolled } = useScrollProgress();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  // Navigation (memoized)
  const navLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/industries", label: "Industries" },
      { href: "/global-network", label: "Global Network" },
      { href: "/projects", label: "Projects" },
    ],
    []
  );

  // Active highlight (optimized)
  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    const exact = navLinks.find((l) => l.href === pathname);
    if (exact) return exact.href;

    const deep = navLinks.find(
      (l) => l.href !== "/" && pathname.startsWith(l.href)
    );
    return deep?.href ?? "/";
  }, [pathname, navLinks]);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-[60]">
      <div className="mx-auto max-w-7xl px-4">
        {/* HEADER */}
        <div
          className={`
            flex items-center justify-between px-5 py-3 mt-3
            rounded-xl border transition-all duration-300
            ${scrolled
              ? "bg-white/90 dark:bg-black/90 border-black/10 dark:border-white/10 shadow-sm backdrop-blur-xl"
              : "bg-white/50 dark:bg-black/40 border-black/10 dark:border-white/10 backdrop-blur-lg"
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
              className="h-10 w-auto select-none"
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
                    relative px-4 py-2 text-sm font-medium transition-colors
                    ${active
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
            <Link
              href="/contact"
              className="
                hidden md:inline-block mr-3
                bg-yellow-400 text-black 
                px-5 py-2.5 
                rounded-lg 
                hover:bg-yellow-300 
                transition-colors
              "
            >
              Contact US
            </Link>

          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle Menu"
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
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
        pathname={pathname}
        navLinks={navLinks}
      />
    </header>
  );
}
