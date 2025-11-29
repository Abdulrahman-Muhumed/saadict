"use client";

import type { NavLink } from "./types";
import { Link } from "@/lib/i18n/navigation";
import { brand } from "../config/brand";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  brandIndigo: string;
  accent: string;
  pathname: string;
  navLinks: NavLink[];
};

export default function MobileSheet({
  open,
  onClose,
  brandIndigo,
  accent,
  pathname,
  navLinks,
}: Props) {
  return (
    <div
      className={`md:hidden fixed inset-0 z-40 transition ${open ? "visible" : "invisible"
        }`}
      aria-hidden={!open}
    >
      {/* BACKDROP */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      {/* SHEET */}
      <div
        className={`
          absolute right-0 top-0 h-full w-[86%] max-w-sm
          bg-white dark:bg-neutral-900 shadow-2xl border-l border-slate-200 dark:border-neutral-700
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="px-4 pb-3 pt-4">
          {/* HEADER */}
          <div className="mb-2 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={brand.logo.light}
                alt="HornBox llc"
                width={42}
                height={42}
                className="h-10 w-auto"
                priority
              />
              <span className="font-semibold text-[17px] tracking-tight text-black dark:text-white">
                {brand.name}
              </span>
            </Link>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* NAV */}
          <nav className="mt-2">
            <ul className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`
                        block w-full rounded-lg px-3 py-3 text-sm font-medium transition-colors
                        ${isActive
                          ? "bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white"
                          : "text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-white/10"
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}

            </ul>

            <ul className="mt-5">
              <Link
                href="/contact"
                className="
                bg-yellow-400 text-black 
                px-5 py-2.5 
                rounded-lg 
                hover:bg-yellow-300 
                transition-colors
                          "
              >
                Contact US
              </Link>

            </ul>

          </nav>
        </div>
      </div>
    </div>
  );
}
