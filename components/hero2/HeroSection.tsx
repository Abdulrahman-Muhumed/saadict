"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { brand } from "@/components/config/brand";
import GradientButton from "@/components/ui/GradientButton";
import { ShieldCheck, LogIn, Search } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const primary = brand.colors.primary;
  const accent = brand.colors.accent;

  const chips = [
    { icon: <ShieldCheck className="mx-auto h-5 w-5 mb-1 text-[--accent]" />, title: t("chips.secure") },
    { icon: <LogIn className="mx-auto h-5 w-5 mb-1 text-[--accent]" />, title: t("chips.accessible") },
    { icon: <Search className="mx-auto h-5 w-5 mb-1 text-[--accent]" />, title: t("chips.verified") },
  ];

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center dark:bg-neutral-900">
      <div className="relative z-10 mx-auto max-w-7xl px-8 py-20 grid md:grid-cols-2 items-center gap-12">
        {/* ───────── LEFT SIDE ───────── */}
        <div className="relative z-20">
          {/* small tag */}
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-800 dark:bg-neutral-900/80 dark:text-white backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            {t("badge")}
          </motion.div>

          {/* title */}
          <motion.h1
            {...fadeUp(0.05)}
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-white"
          >
            <span className="block">{t("titleTop")}</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${primary}, ${accent})`,
              }}
            >
              {t("titleHighlight")}
            </span>
          </motion.h1>

          {/* description */}
          <motion.p
            {...fadeUp(0.12)}
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {t("desc")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.2)} className="mt-8 flex flex-wrap gap-4" id="hero-cta">
            <GradientButton href="/auth/login" label={t("cta")} iconRight={<LogIn size={18} />} />
          </motion.div>

          {/* chips */}
          <motion.div {...fadeUp(0.28)} className="mt-10 grid grid-cols-3 gap-3 text-center text-sm">
            {chips.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-white/20 bg-white/50 dark:bg-neutral-900/60 px-3 py-5 shadow-sm backdrop-blur-md"
              >
                {c.icon}
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ───────── RIGHT SIDE ───────── */}
        <motion.div {...fadeUp(0.15)} className="relative aspect-[4/3] w-full max-w-lg mx-auto md:ml-auto">
          <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm">
            <Image
              src="/home/home_bg1.jpg"
              alt={t("imageAlt")}
              fill
              className="object-cover object-center opacity-95 dark:opacity-90"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
