"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";


const ACCENT = "#F99417";
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay, ease },
  },
  viewport: { once: true, amount: 0.45 },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay, ease },
  },
  viewport: { once: true, amount: 0.45 },
});

const Pill = ({ text }: { text: string }) => (
  <div
    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold"
    style={{
      background: `rgba(249,148,23,0.1)`,
      color: ACCENT,
      border: `1px solid rgba(249,148,23,0.25)`,
    }}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
    {text}
  </div>
);

function Section({
  badge,
  title,
  body,
  bullets,
  image,
  reverse,
}: {
  badge?: string;
  title: string;
  body: string;
  bullets?: string[];
  image: string;
  reverse?: boolean;
}) {
  return (
    <section
      className={`max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center ${reverse ? "md:[&>div:first-child]:order-2" : ""
        }`}
    >
      <motion.div
        initial={reverse ? fadeRight(0.05).initial : fadeLeft(0.05).initial}
        whileInView={reverse ? fadeRight(0.05).whileInView : fadeLeft(0.05).whileInView}
        viewport={reverse ? fadeRight(0.05).viewport : fadeLeft(0.05).viewport}
      >
        {badge && <Pill text={badge} />}
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">{body}</p>
        {bullets && (
          <ul className="mt-6 space-y-3 text-slate-700 dark:text-slate-300">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="mt-1 h-2 w-2 rounded-full"
                  style={{ background: ACCENT }}
                />
                {b}
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div
        initial={reverse ? fadeLeft(0.1).initial : fadeRight(0.1).initial}
        whileInView={reverse ? fadeLeft(0.1).whileInView : fadeRight(0.1).whileInView}
        viewport={reverse ? fadeLeft(0.1).viewport : fadeRight(0.1).viewport}
        className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg"
        style={{ aspectRatio: "16 / 10" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 45rem, 100vw"
          className="object-contain rounded-2xl"
        />
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");

  const sections = useMemo(
    () => [
      {
        badge: t("about.badge"),
        title: t("about.title"),
        body: t("about.body"),
        image: "/brand/hg_icon_light.png",
      },
      {
        badge: t("access.badge"),
        title: t("access.title"),
        body: t("access.body"),
        bullets: t.raw("access.bullets") as string[],
        image: "/brand/hg_icon_light.png",
        reverse: true,
      },
      {
        badge: t("core.badge"),
        title: t("core.title"),
        body: t("core.body"),
        bullets: t.raw("core.bullets") as string[],
        image: "/brand/hg_icon_light.png",
      },
      {
        badge: t("security.badge"),
        title: t("security.title"),
        body: t("security.body"),
        bullets: t.raw("security.bullets") as string[],
        image: "/brand/hg_icon_light.png",
        reverse: true,
      },
    ],
    [t]
  );

  return (
    <main className="relative  text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {sections.map((s, i) => (
        <React.Fragment key={i}>
          <Section {...s} />
          {i < sections.length - 1 && (
            <div className="mx-auto w-full max-w-7xl px-8 py-4">
              <div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(36,28,114,0), rgba(36,28,114,.15), rgba(36,28,114,0))",
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </main>
  );
}
