"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { brand } from "@/components/config/brand";
import { faqGroups } from "@/lib/faqs"; // Ensure this matches your data structure
import {
  HelpCircle,
  Layers3,
  Activity,
  Terminal,
  MessageSquareQuote,
  ChevronRight,
} from "lucide-react";

// Technical Color Palette
const ACCENT_ORANGE = brand.colors.primary;

export default function FAQHero() {
  const t = useTranslations("faq.faqHero");

  // Calculate dynamic metrics if available
  const totalSections = faqGroups?.length || 0;
  const totalQuestions = faqGroups?.reduce(
    (sum, group) => sum + group.items.length,
    0
  ) || 0;

  const metrics = [
    {
      label: t("metrics.sections"),
      value: totalSections ? String(totalSections).padStart(2, "0") : "00",
      icon: Layers3,
    },
    {
      label: t("metrics.questions"),
      value: totalQuestions ? String(totalQuestions).padStart(2, "0") : "00",
      icon: HelpCircle,
    },
    {
      label: t("metrics.clarity"),
      value: "96%",
      icon: Activity,
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#050505] pt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-20 lg:pt-24 lg:pb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div
                className="h-[1px] w-12"
                style={{ backgroundColor: ACCENT_ORANGE }}
              />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-slate-500">
                {t("badge")}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#241c72] dark:text-white leading-[1.1] uppercase">
              {t("title")} <br />
              <span className="font-thin italic opacity-30 lowercase">{t("titleItalic")}</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              {t("description")}
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {metrics.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur px-4 py-6 transition-all hover:bg-white/100 dark:hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200">
                        <Icon size={16} />
                      </span>
                    </div>

                    <div className="text-3xl font-bold tracking-tight text-[#241c72] dark:text-white">
                      {item.value}
                    </div>
                    <div className="mt-1 text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-slate-400">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* FAQ Preview Card (The "Chamber") */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="dark:bg-[#0a0a0a] bg-[#141e33] border border-white/5 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-3xl">
              {/* Terminal Header */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <Terminal size={14} style={{ color: ACCENT_ORANGE }} />
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {t("terminal.label")}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: ACCENT_ORANGE }}
                  />
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3 uppercase">
                    <MessageSquareQuote size={18} className="opacity-40" />
                    {t("terminal.title")}
                  </h2>

                  <p className="mt-4 text-sm text-slate-400 leading-relaxed font-light">
                    {t("terminal.description")}
                  </p>
                </div>

                {/* Scope List */}
                <div className="space-y-2">
                  {t.raw("terminal.items").map((item: any) => (
                    <div
                      key={item.tag}
                      className="group flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 hover:border-[#17f5f9]/50 transition-all cursor-default"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] font-mono font-bold text-white bg-white/10 px-2 py-0.5">
                          {item.tag}
                        </span>
                        <span className="text-[13px] font-medium text-slate-400 group-hover:text-white transition-colors">
                          {item.text}
                        </span>
                      </div>
                      <ChevronRight
                        size={14}
                        className="text-white/10 group-hover:text-[#17f9b9] transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accent Corner Detail */}
            <div
              className="absolute -bottom-4 -right-4 w-20 h-20 border-r-2 border-b-2 opacity-30 pointer-events-none"
              style={{ borderColor: ACCENT_ORANGE }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}