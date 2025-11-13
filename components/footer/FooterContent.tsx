"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { brand } from "@/components/config/brand";
import {
  Mail,
  ShieldCheck,
  Lock,
  Cpu,
  ArrowUpRight,
  Building2,
  Globe,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function FooterContent() {
  const t = useTranslations("portalFooter");
  const PRIMARY = useMemo(() => brand.colors.primary ?? "#241c72", []);
  const ACCENT = useMemo(() => brand.colors.accent ?? "#F99417", []);
  const YEAR = new Date().getFullYear();

  /* --- track if footer is visible --- */
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ───────── FLOATING STRIP ───────── */}
      <AnimatePresence>
        {!footerVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-3 left-3 md:left-20 lg:left-24 z-50 w-[95%] max-w-7xl -translate-x-1/2 px-4"
          >
            <div
              className="flex h-12 items-center justify-between rounded-2xl border border-white/20 
              bg-[#F99417]/50 text-xs font-semibold 
              shadow-lg backdrop-blur-md dark:bg-neutral-950/80 dark:text-neutral-300 px-5"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <span
                  className="h-5 w-5 rounded-md bg-center bg-cover"
                  style={{ backgroundImage: `url(${brand.logo.nav_logo})` }}
                />
                <span className="text-sm">
                  © {YEAR} {brand.name}
                </span>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className="hidden sm:inline text-slate-700 dark:text-neutral-400 hover:text-[var(--accent)] transition-colors"
                >
                  {t("support.title")}
                </Link>
                <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-700" />
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── MAIN FOOTER ───────── */}
      <footer
        className="w-full text-white border-t border-white/10 relative z-40 dark:bg-neutral-900 bg-[#241c72]"
      >
        {/* MAIN CONTENT */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
          {/* ── BRAND SIDE ── */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={brand.logo.light}
                alt={t("brand")}
                width={44}
                height={44}
                className="h-11 w-auto"
                priority
              />
              <span className="text-lg font-semibold tracking-tight">
                {t("brand")}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/85 max-w-xs">
              {t("description")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge icon={<ShieldCheck size={13} />} text={t("badges.verified")} />
              <Badge icon={<Lock size={13} />} text={t("badges.secure")} />
            </div>
          </div>

          {/* ── NAV LINKS ── */}
          <div className="grid sm:grid-cols-2 gap-10">
            <NavGroup title={t("groups.platform")}>
              <NavItem href="/about" accent={ACCENT}>
                {t("links.about")}
              </NavItem>
              <NavItem href="/services" accent={ACCENT}>
                {t("links.services")}
              </NavItem>
              <NavItem href="/contact" accent={ACCENT}>
                {t("links.support")}
              </NavItem>
              <NavItem href="/auth/login" accent={ACCENT}>
                {t("links.login")}
              </NavItem>
            </NavGroup>

            <NavGroup title={t("groups.resources")}>
              <NavItem href="https://hoggaantravels.com" accent={ACCENT}>
                {t("links.main")}
              </NavItem>
            </NavGroup>
          </div>

          {/* ── CONTACT BOX ── */}
          <div>
            <div
              className="rounded-2xl p-6 backdrop-blur-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.06))",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.14)",
              }}
            >
              <h4 className="text-sm font-semibold tracking-tight mb-3">
                {t("support.title")}
              </h4>
              <ul className="space-y-3 text-sm text-white/90">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/70" />
                  <a
                    href="mailto:support@hoggaantravels.com"
                    className="group relative inline-flex items-center gap-1"
                  >
                    <span className="relative">
                      support@hoggaantravels.com
                      <span
                        className="pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
                        }}
                      />
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 translate-y-1 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-100" />
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-white/70" />
                  <span>{t("support.address")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-white/70" />
                  <span>{t("support.languages")}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── BOTTOM ───────── */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-white/80">
            <p>{t("legal.rights", { year: YEAR })}</p>
            <p className="mt-2 md:mt-0">
              {t("legal.builtWith")}{" "}
              <a
                href="https://aimmj.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:text-white transition"
              >
                Aimmj
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---------- SUBCOMPONENTS ---------- */
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
      style={{
        background: "rgba(255,255,255,.10)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.15)",
      }}
    >
      {icon}
      {text}
    </span>
  );
}

function NavGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h5 className="text-sm font-semibold tracking-tight text-white/95">
        {title}
      </h5>
      <ul className="mt-3 space-y-2 text-sm text-white/85">{children}</ul>
    </div>
  );
}

function NavItem({
  href,
  children,
  accent,
}: {
  href: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group relative inline-flex items-center gap-1 font-semibold"
      >
        <span className="relative">
          {children}
          <span
            className="pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 transition-transform duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            }}
          />
        </span>
        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 translate-y-1 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-100" />
      </Link>
    </li>
  );
}
