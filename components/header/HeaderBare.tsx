"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { brand } from "@/components/config/brand";
import { useScrollProgress } from "./hooks/useScrollProgress";
import MobileSheet from "./MobileSheet";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import LanguageSwitcher from "./LangChooser";
import { useTranslations } from "next-intl";

export default function HeaderEngineered() {
  const pathname = usePathname();
  const { scrolled } = useScrollProgress();
  const { theme } = useTheme();

  const t = useTranslations("nav");

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  const navLinks = useMemo(
    () => [
     { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    ],
    [t]
  );

  const resourceLinks = [
    { href: "/faq", label: t("faq") },
    { href: "/service-request", label: t("serviceRequest") },
  ];

  return (
    <header className="fixed top-0 z-[60] w-full px-4 pt-4 transition-all duration-500">
      <nav
        className={`
          mx-auto max-w-7xl transition-all duration-500 ease-in-out
          rounded-2xl border border-white/10 flex items-center justify-between px-6 py-3
          ${scrolled
            ? "bg-white/80 dark:bg-[#0A0A0B]/80 backdrop-blur-xl shadow-2xl py-2"
            : "bg-white/40 dark:bg-transparent backdrop-blur-sm py-4"}
        `}
      >
        {/* ── SYSTEM IDENTITY ── */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-3 hover:opacity-80">
            {mounted && (
              <div className="relative h-9 w-9 overflow-hidden">
                <Image
                  src={theme === "dark" ? brand.logo.dark : brand.logo.light}
                  alt={brand.name}
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            )}
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1F2933] dark:text-white">
              {brand.name}
            </span>
          </Link>
        </div>

        {/* ── DESKTOP NAV ── */}
        <div className="hidden lg:flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative px-5 py-2 text-[11px] font-bold uppercase tracking-widest
                  ${active ? "text-white dark:text-black" : "text-slate-500 hover:text-[#1F2933] dark:hover:text-white"}
                `}
              >
                <span className="relative z-10">{link.label}</span>
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#1F2933] dark:bg-white rounded-full"
                  />
                )}
              </Link>
            );
          })}

          {/* ── RESOURCES DROPDOWN ── */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#1F2933] dark:hover:text-white"
            >
              {t("resources")}
              <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute top-full mt-2 w-48 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0A0B] shadow-xl overflow-hidden"
                >
                  {resourceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── ACTIONS ── */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-3 bg-[#24365C] px-5 py-2.5 rounded-xl hover:bg-[#24365C]/90"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              {t("contact")}
            </span>
            <ArrowRight size={14} className="text-white" />
          </Link>

          <LanguageSwitcher />

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5"
          >
            {open ? <X size={20} className="text-[#F36A0A]" /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE SHEET ── */}
      <AnimatePresence mode="wait">
        {open && (
          <MobileSheet
            open={open}
            onClose={() => setOpen(false)}
            brandIndigo={brand.colors.primary}
            accent={brand.colors.accent}
            pathname={pathname}
            navLinks={navLinks}
            resourceLinks={resourceLinks}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
