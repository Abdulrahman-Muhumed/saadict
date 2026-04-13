"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Construction, Activity, Lock } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ServiceRequestComingSoon() {
    const t = useTranslations("serviceRequest.comingSoon");

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-2xl"
            >
                {/* MODAL-LIKE CONTAINER */}
                <div className="bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/5 rounded-[32px] p-8 md:p-16 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden group">

                    {/* TOP STATUS BAR */}
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <div className="flex items-center gap-2 px-3 py-1 bg-[#F99417]/10 rounded-full border border-[#F99417]/20">
                            <Activity size={12} className="text-[#F99417] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#F99417] uppercase tracking-widest">
                                {t('status')}
                            </span>
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="text-center space-y-8">
                        <div className="relative inline-block">
                            <Construction size={48} strokeWidth={1} className="text-[#241c72] dark:text-white mx-auto mb-4" />
                            <Lock size={16} className="absolute -bottom-1 -right-1 text-[#F99417]" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#241c72] dark:text-white leading-tight uppercase">
                            {t('title')} <br />
                            <span className="font-thin italic opacity-30">{t('titleItalic')}</span>
                        </h1>

                        <p className="text-slate-500 dark:text-white/40 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                            {t('description')}
                        </p>

                        {/* PROGRESS TELEMETRY BAR */}
                        <div className="max-w-xs mx-auto pt-4">
                            <div className="flex justify-between items-end mb-2 text-[10px] font-mono font-bold uppercase tracking-tighter text-slate-400 dark:text-white/20">
                                <span>Deployment Stage</span>
                                <span>85%</span>
                            </div>
                            <div className="h-[2px] w-full bg-slate-200 dark:bg-white/5 overflow-hidden rounded-full">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    className="h-full bg-[#241c72] dark:bg-[#F99417]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BACK ACTION */}
                    <div className="mt-16 flex justify-center">
                        <Link href="/services">
                            <button className="group/btn flex items-center gap-3 px-6 py-3 border border-slate-200 dark:border-white/10 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300">
                                <ArrowLeft size={16} className="text-slate-400 group-hover/btn:-translate-x-1 transition-transform" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-[#241c72] dark:text-white">
                                    {t('backButton')}
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* SYSTEM TAG */}
                    <div className="absolute bottom-4 right-8 opacity-10">
                        <span className="text-[8px] font-mono font-black uppercase tracking-[0.5em]">
                            {t('metadata')}
                        </span>
                    </div>
                </div>

                {/* EXTERNAL DECOR: TERMINAL BORDERS */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#241c72]/20 dark:border-white/10 rounded-tl-xl" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#241c72]/20 dark:border-white/10 rounded-br-xl" />
            </motion.div>
        </main>
    );
}