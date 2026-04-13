"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote, Star, ArrowUpRight } from "lucide-react";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";
import { testimonials } from "@/lib/testimonials";

export default function AboutClientPerspective() {
  const t = useTranslations("about.aboutClientPerspective");
  const t2 = useTranslations("home.testimonials");
  
  const TestCount = testimonials.length;
  const TestFeatured = testimonials.filter(t => t.featured).length;

  return (
    <SectionShell className="bg-slate-50/70 dark:bg-white/[0.015]">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400">
          {t("heading.eyebrow")}
        </div>

        <h2 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.03]">
          {t("heading.title")}
          <span className="block font-light opacity-80">{t("heading.subtitle")}</span>
        </h2>

        <p className="mt-5 max-w-3xl mx-auto text-sm md:text-base leading-8 text-slate-600 dark:text-slate-400 font-light">
          {t("heading.desc")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <InfoPill value={TestCount} label={t("pills.testimonials")} />
          <InfoPill value={TestFeatured} label={t("pills.featured")} />
          <InfoPill value={TestCount} label={t("pills.feedback")} />
        </div>
      </div>

      <div className="mt-14 relative">
        {/* Edge masks for a focused horizontal feel */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50/70 to-transparent dark:from-[#050505] z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50/70 to-transparent dark:from-[#050505] z-10" />

        <div className="grid lg:grid-cols-[1fr_1.3fr_1fr] gap-5 items-stretch">
          {testimonials.map((item, index) => {
            const active = index === 1 || testimonials.length === 1;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className={`relative overflow-hidden rounded-[30px] border ${active
                  ? "border-slate-300 dark:border-white/15"
                  : "border-slate-200 dark:border-white/10"
                  } ${active
                    ? "bg-slate-950 text-white shadow-[0_30px_80px_-28px_rgba(15,23,42,0.45)]"
                    : "bg-white/90 dark:bg-white/[0.03] text-slate-900 dark:text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)]"
                  } p-7 md:p-8`}
              >
                {active ? (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(76,143,196,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(36,54,92,0.48),transparent_42%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:38px_38px] opacity-20" />
                  </>
                ) : (
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${brand.colors.accent}, transparent)`,
                    }}
                  />
                )}

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${active
                        ? "bg-white/10 border border-white/10"
                        : "border border-slate-200 dark:border-white/10"
                        }`}
                      style={
                        active
                          ? undefined
                          : {
                            background: `linear-gradient(135deg, ${brand.colors.primary}12, ${brand.colors.accent}18)`,
                          }
                      }
                    >
                      <Quote
                        size={24}
                        style={{ color: active ? "#DDEFFD" : brand.colors.primary }}
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={brand.colors.accent}
                          color={brand.colors.accent}
                        />
                      ))}
                    </div>
                  </div>

                  <p
                    className={`mt-6 text-sm italic leading-8 flex-1 ${active ? "text-slate-200" : "text-slate-700 dark:text-slate-300"
                      }`}
                  >
                    {`"`}{t2(item.quoteKey)}{`"`}
                  </p>

                  <div
                    className={`mt-8 pt-5 flex items-start justify-between gap-4 ${active ? "border-t border-white/10" : "border-t border-slate-200 dark:border-white/10"
                      }`}
                  >
                    <div>
                      <div className="text-sm font-semibold">
                        {t2(item.nameKey)}
                      </div>

                      <div
                        className={`text-xs mt-1 ${active ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
                          }`}
                      >
                        {t2(item.roleKey)}
                        {item.company ? ` · ${item.company}` : ""}
                      </div>

                      {(item.projectKey || item.location) && (
                        <div
                          className={`text-[11px] mt-2 ${active ? "text-slate-500" : "text-slate-400 dark:text-slate-500"
                            }`}
                        >
                          {t2(item.projectKey)}
                        </div>
                      )}
                    </div>

                    <ArrowUpRight
                      size={16}
                      className={active ? "text-slate-300" : "text-slate-400"}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

function InfoPill({ value, label }: { value: number; label: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] px-4 py-2 backdrop-blur-sm shadow-sm">
      <span
        className="text-sm font-bold font-mono"
        style={{ color: brand.colors.accent }}
      >
        {value}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </div>
  );
}

