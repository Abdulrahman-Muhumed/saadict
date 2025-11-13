"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PRIMARY = "#241c72";
const ACCENT = "#F99417";

export default function UnifiedPackage({ onOpen }: { onOpen: () => void }) {
    const t = useTranslations("hajj.package");
    const included = t.raw("included") || [];

    return (
        <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-10 md:grid-cols-3">
                {/* Left: Package details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="md:col-span-2 rounded-2xl border bg-white/80 dark:bg-neutral-900/80 shadow-2xl backdrop-blur-xl"
                    style={{ borderColor: `${PRIMARY}20` }}
                >
                    <div className="p-6 md:p-8">
                        <span
                            className="inline-block rounded-full px-3 py-1 text-xs font-medium mb-3"
                            style={{ backgroundColor: `${ACCENT}1a`, color: PRIMARY }}
                        >
                            {t("badge")}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                            {t("title")}
                        </h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                            {t("desc")}
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {included.map((item: string) => (
                                <div key={item} className="flex items-start gap-3">
                                    <span
                                        className="mt-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
                                        style={{ backgroundColor: ACCENT }}
                                    >
                                        ✓
                                    </span>
                                    <span className="text-slate-800 dark:text-slate-200">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <button
                                
                                className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
                                style={{
                                    background: `linear-gradient(90deg, ${ACCENT}, ${PRIMARY})`,
                                    boxShadow: `0 10px 24px -10px ${ACCENT}88`,
                                }}
                            >
                                
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Promo Card */}
                <motion.aside
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                    className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                    <Image
                        src="/ihrahm_img.jpg"
                        alt="Hajj 2026 — Package preview"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="relative z-10 m-4 rounded-2xl p-5 backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 shadow-lg">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                HAJJ 2026
                            </h3>
                            <span
                                className="rounded-full px-3 py-1 text-xs"
                                style={{
                                    color: PRIMARY,
                                    background: `${PRIMARY}10`,
                                    border: `1px solid ${PRIMARY}26`,
                                }}
                            >
                                {t("limitedSpots")}
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mt-3 flex items-end gap-2 bg-[#F99417]/10 dark:bg-[#F99417]/20 p-3 rounded-xl">
                            <span
                                className="text-4xl font-extrabold bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
                                }}
                            >
                                {(4543.5).toLocaleString("en-US")}
                            </span>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                                USD • {t("perPerson")}
                            </span>
                        </div>

                        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                            {t("priceNote")}
                        </p>
                    </div>
                </motion.aside>
            </div>
        </section>
    );
}
