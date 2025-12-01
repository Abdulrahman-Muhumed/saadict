"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { brand } from "@/components/config/brand";
import { useScrollProgress } from "./hooks/useScrollProgress";
import MobileSheet from "./MobileSheet";
import { useTheme } from "next-themes";

export default function HeaderBare() {
  const pathname = usePathname();
  const { scrolled } = useScrollProgress();
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/industries", label: "Industries" },
      { href: "/global-network", label: "Network" },
      { href: "/projects", label: "Projects" },
    ],
    []
  );

  const activeHref = useMemo(() => {
    if (pathname === "/contact") return "/contact"; // ⭐ FIX

    if (!pathname) return "/";
    const exact = navLinks.find((l) => l.href === pathname);
    if (exact) return exact.href;

    const deep = navLinks.find(
      (l) => l.href !== "/" && pathname.startsWith(l.href)
    );
    return deep?.href ?? "/";
  }, [pathname, navLinks]);


  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`
        sticky lg:top-2 top-0 z-[60] w-full
        transition-all 
      `}
    >
      <div className="lg:max-w-7xl mx-auto ">
        {/* GRID: Logo | Center Nav | CTA */}
        <div
          className={`
    py-4 px-5 lg:rounded-2xl
    ${scrolled
              ? "bg-white/80 dark:bg-black/70 shadow-lg shadow-black/5 dark:shadow-white/5"
              : "bg-white/20"
            }
    flex items-center justify-between md:grid md:grid-cols-12
  `}
        >
          {/* LEFT — LOGO */}
          <div className="col-span-4 flex items-center">
            <Link href="/" className="flex items-center gap-3">
              {mounted && (
                <Image
                  src={theme === "dark" ? brand.logo.dark : brand.logo.light}
                  alt="HornBox"
                  width={42}
                  height={42}
                  className="h-10 w-auto select-none"
                  priority
                />
              )}

              <span className="font-semibold text-[17px] tracking-tight text-black dark:text-white">
                {brand.name}
              </span>
            </Link>
          </div>

          {/* CENTER — NAVIGATION */}
          <div className="col-span-4 hidden md:flex justify-center">
            <nav className="flex items-center gap-2">
              {navLinks.map((link, i) => {
                const active = activeHref === link.href;
                return (
                  <Link
                    key={i}
                    href={link.href}
                    className={`
                      relative px-4 py-2 text-sm font-medium
                      transition-all tracking-wide
                      ${active
                        ? "text-black dark:text-white"
                        : "text-foreground hover:text-black dark:text-neutral-300 dark:hover:text-white"
                      }
                    `}
                  >
                    {link.label}

                    {/* Underline indicator */}
                    {active && (
                      <span
                        className="
                          absolute left-3 right-3 bottom-[3px] h-[2px] rounded-full
                          bg-gradient-to-r from-yellow-400 to-yellow-500
                          transition-all
                        "
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT — CTA */}
          <div className="col-span-4 flex justify-end items-center gap-3">

            {/* CONTACT BUTTON WITH ACTIVE STATE */}
            <Link
              href="/contact"
              className={`
                hidden md:inline-block px-5 py-2.5 rounded-lg font-semibold tracking-wide transition
                ${pathname === "/contact"
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-yellow-400/30 border border-yellow-400"
                  : "bg-yellow-400 text-black hover:bg-yellow-300 dark:bg-yellow-300 dark:hover:bg-yellow-200"
                }
            `}
            >
              Contact Us
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle Menu"
              className="
      md:hidden h-10 w-10 flex items-center justify-center 
      rounded-lg 
      hover:bg-black/10 dark:hover:bg-white/10 
      transition-colors
    "
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
