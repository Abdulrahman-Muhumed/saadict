"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const LOCALE_MAP: Record<string, { label: string; icon: string; code: string }> = {
    en: { label: "English", icon: "🇬🇧", code: "EN" },
    so: { label: "Somali", icon: "🇸🇴", code: "SO" },
    ar: { label: "العربية", icon: "🇸🇦", code: "AR" },
};

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [pos, setPos] = useState({ top: 0, right: 16 });

    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const close = () => setIsOpen(false);
        if (isOpen) {
            window.addEventListener("mousedown", close);
            return () => window.removeEventListener("mousedown", close);
        }
    }, [isOpen]);

    const current = LOCALE_MAP[currentLocale] ?? { label: currentLocale, icon: "🌐", code: currentLocale.toUpperCase() };

    const toggleDropdown = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
            setPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                ref={triggerRef}
                onClick={toggleDropdown}
                className="
          group flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all
          bg-[#24365C]/5 text-[#24365C] hover:bg-[#24365C]/10
          dark:bg-white/5 dark:text-white dark:hover:bg-white/10
        "
            >
                <span className="text-base">{current.icon}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            style={{ position: "fixed", top: pos.top, right: pos.right }}
                            className="
                z-[9999] min-w-[140px] p-1.5 rounded-2xl border backdrop-blur-xl
                bg-white/80 border-[#24365C]/10 shadow-xl shadow-[#24365C]/5
                dark:bg-[#0a0f1a]/80 dark:border-white/10 dark:shadow-black/40
              "
                        >
                            {routing.locales.map((locale) => {
                                const active = currentLocale === locale;
                                const meta = LOCALE_MAP[locale];

                                return (
                                    <button
                                        key={locale}
                                        onClick={() => {
                                            router.push(pathname, { locale });
                                            setIsOpen(false);
                                        }}
                                        className={`
                      flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all
                      ${active
                                                ? "bg-[#24365C] text-white dark:bg-white dark:text-[#24365C]"
                                                : "text-[#24365C]/70 hover:bg-[#24365C]/5 dark:text-white/70 dark:hover:bg-white/5"
                                            }
                    `}
                                    >
                                        <span>{meta.icon}</span>
                                        <span className="font-medium">{meta.label}</span>
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}