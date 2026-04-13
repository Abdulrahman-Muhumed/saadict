"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Plus, Hash, Terminal } from "lucide-react";
import { faqGroups } from "@/lib/faqs";
import { brand } from "@/components/config/brand";
// Brand Constants
const ACCENT_ORANGE = brand.colors.primary;

export default function FAQGroups() {
  const t = useTranslations("faq.faqGroups");
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (groupId: string, index: number) => {
    const id = `${groupId}-${index}`;
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative bg-white dark:bg-[#050505] py-32 overflow-hidden">
      {/* 2050 INDUSTRIAL GRID ACCENT */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="space-y-32">
          {faqGroups.map((group) => (
            <div key={group.id} className="grid lg:grid-cols-12 gap-12 lg:gap-20">

              {/* LEFT: SECTION METADATA */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ backgroundColor: ACCENT_ORANGE }} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-slate-400">
                    {t(`${group.id}.eyebrow`)}
                  </span>
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-[#241c72] dark:text-white mb-6 uppercase">
                  {t(`${group.id}.title`)}
                </h2>

                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                  {t(`${group.id}.description`)}
                </p>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 hidden lg:block">
                  <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-slate-400 uppercase">
                    <Terminal size={14} className="opacity-40" />
                    {group.id.toUpperCase()}_LOG
                  </div>
                </div>
              </div>

              {/* RIGHT: ACCORDION LEDGER */}
              <div className="lg:col-span-8 border-l border-slate-100 dark:border-white/5 lg:pl-12">
                <div className="divide-y divide-slate-100 dark:divide-white/5">
                  {group.items.map((_, index) => {
                    const itemId = `${group.id}-${index}`;
                    const isOpen = openId === itemId;

                    return (
                      <div key={itemId} className="relative group">
                        <button
                          onClick={() => toggle(group.id, index)}
                          className="w-full flex items-center justify-between py-8 text-left transition-all"
                        >
                          <div className="flex items-start gap-6">
                            <span
                              className={`text-[10px] font-mono font-bold mt-1.5 transition-colors ${isOpen ? "text-[#F99417]" : "text-slate-300 dark:text-white/10"
                                }`}
                            >
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <span className={`text-base md:text-lg font-bold tracking-tight transition-colors ${isOpen ? "text-[#241c72] dark:text-white" : "text-slate-600 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white"
                              }`}>
                              {t(`${group.id}.items.${index}.question`)}
                            </span>
                          </div>

                          <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all ${isOpen
                              ? "bg-[#241c72] border-[#241c72] text-white rotate-90"
                              : "border-slate-200 dark:border-white/10 text-slate-400"
                            }`}>
                            {isOpen ? <Hash size={14} /> : <Plus size={16} />}
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pl-12 pb-10">
                                <div className="max-w-2xl text-sm md:text-[15px] leading-8 text-slate-500 dark:text-slate-400 font-medium border-l-2 border-orange-500/20 pl-6">
                                  {t(`${group.id}.items.${index}.answer`)}
                                </div>

                                <div className="mt-6 flex items-center gap-2">
                                  <div className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT_ORANGE }} />
                                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                                    Status: Resolved_Verified
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}