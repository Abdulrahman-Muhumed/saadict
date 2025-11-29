"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { brand } from "@/components/config/brand";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function FooterContent() {
  const YEAR = new Date().getFullYear();

  const PRIMARY = brand.colors.primary ?? "#1A1A1A"; // black
  const ACCENT = brand.colors.accent ?? "#FFC233"; // yellow

  /* Track footer visibility */
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
            className="fixed bottom-1 left-0 z-50  max-w-7xl -translate-x-1/2 px-4"
          >
            <div
              className="flex h-12 items-center justify-between rounded-2xl px-5
              dark:bg-black/80 bg-white/80 backdrop-blur-xl border border-white/10
              text-xs text-white shadow-lg"
            >
              <div className="flex mr-5">
                <Image
                  src={brand.logo.light}
                  alt="HornBox Logo"
                  width={24}
                  height={24}
                  className="opacity-90"
                />
              </div>

              <div className="flex items-center gap-4">
               
                <div className="w-px h-4 bg-white/30" />
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── MAIN FOOTER ───────── */}
      <footer
        className="w-full text-white relative z-40"
        style={{ background: PRIMARY }}
      >
        <section className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
          {/* ── BRAND COLUMN ── */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={brand.logo.light}
                alt="HornBox Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
                priority
              />
              <span className="text-lg font-semibold tracking-tight">
                {brand.name}
              </span>
            </div>

            <p className="mt-4 text-sm text-white/85 leading-relaxed max-w-xs text-justify">
              Global freight forwarding & logistics partner delivering integrated
              ocean, air, road, warehousing, and customs solutions across 195+ destinations.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge icon={<ShieldCheck size={13} />} text="Verified Partner" />
            </div>
          </div>

          {/* ── NAVIGATION GROUPS ── */}
          <div className="grid sm:grid-cols-2 gap-10">
            <NavGroup title="Company">
              <NavItem href="/about" accent={ACCENT}>About Us</NavItem>
              <NavItem href="/services" accent={ACCENT}>Services</NavItem>
              <NavItem href="/industries" accent={ACCENT}>Industries</NavItem>
              <NavItem href="/network" accent={ACCENT}>Global Network</NavItem>
              <NavItem href="/projects" accent={ACCENT}>Projects</NavItem>
            </NavGroup>

            <NavGroup title="Quick Links">
              <NavItem href="/contact" accent={ACCENT}>Contact</NavItem>
            </NavGroup>
          </div>

          {/* ── CONTACT BOX ── */}
          <div>
            <div
              className="rounded-2xl p-6 backdrop-blur-lg border border-white/10"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",
              }}
            >
              <h4 className="text-sm font-semibold tracking-tight mb-4">
                Contact Us
              </h4>

              <ul className="space-y-3 text-sm text-white/90">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/70" />
                  <a
                    href="mailto:info@hornboxllc.com"
                    className="group relative inline-flex items-center gap-1"
                  >
                    <span className="relative">
                      {brand.social.email}
                      <span
                        className="pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0
                        transition-transform duration-300"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
                        }}
                      />
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 translate-y-1 scale-75
                    transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1
                    group-hover:-translate-y-1 group-hover:scale-100" />
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-white/70" />
                  <span>{brand.social.phoneNumber}</span>
                </li>

                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-white/70" />
                  <span>
                    HornBox Headquarters — <br />
                    {brand.social.location}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-white/70" />
                  <span>English</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── BOTTOM BAR ───────── */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-white/70">
            <p>© {YEAR} {brand.name} — All Rights Reserved.</p>

            <p className="mt-2 md:mt-0">
              Built by{" "}
              <a
                href="https://aimmj.vercel.app"
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

/* ---------- SUB COMPONENTS ---------- */

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
      style={{
        background: "rgba(255,255,255,.12)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.2)",
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
      <h5 className="text-sm font-semibold tracking-tight text-white">
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
            className="pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0
            transition-transform duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            }}
          />
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 translate-y-1 scale-75
        transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1
        group-hover:-translate-y-1 group-hover:scale-100" />
      </Link>
    </li>
  );
}
