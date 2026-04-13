"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

// Map locales
const LOCALE_MAP: Record<
    string,
    { label: string; icon: string; code: string }
> = {
    en: { label: "English", icon: "🇬🇧", code: "EN" },
    so: { label: "Somali", icon: "🇸🇴", code: "SO" },
    ar: { label: "العربية", icon: "🇸🇦", code: "AR" },
};

export default function LanguageSwitcher() {

    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [pos, setPos] = useState<{ top: number; right: number }>({
        top: 0,
        right: 16,
    });

    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close when clicking outside or pressing ESC
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!triggerRef.current?.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        if (isOpen) {
            window.addEventListener("mousedown", handleClick);
            window.addEventListener("keydown", handleEsc);
        }
        return () => {
            window.removeEventListener("mousedown", handleClick);
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    const current =
        LOCALE_MAP[currentLocale] ?? {
            label: currentLocale.toUpperCase(),
            icon: "🌐",
            code: currentLocale.toUpperCase(),
        };

    const openDropdown = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
            setPos({
                top: rect.bottom + 8,
                right: window.innerWidth - rect.right,
            });
        }
        setIsOpen((v) => !v);
    };

    return (
        <>
            {/* Trigger */}
            <button
                ref={triggerRef}
                type="button"
                onClick={openDropdown}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className="
                    group flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold
                    transition-all
                    bg-white text-slate-800 border-slate-200 hover:bg-slate-50
                    dark:bg-neutral-900 dark:text-slate-100 dark:border-neutral-800 dark:hover:bg-neutral-800
                    shadow-sm
                    "
            >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-neutral-800">
                    {current.icon}
                </span>
                <span className="tracking-wider">{current.code}</span>
                <ChevronDown
                    className={`h-3.5 w-3.5 opacity-70 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown (Portal) */}
            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                style={{
                                    position: "fixed",
                                    top: pos.top,
                                    right: pos.right,
                                }}
                                className="
                  z-[9999] min-w-[180px] overflow-hidden rounded-xl border p-1
                  bg-white border-slate-200 shadow-2xl
                  dark:bg-neutral-900 dark:border-neutral-800
                "
                                role="menu"
                            >
                                <div className="px-3 py-2">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-neutral-400">
                                        Language
                                    </span>
                                </div>

                                <div className="max-h-64 overflow-auto">
                                    {routing.locales.map((locale) => {
                                        const meta =
                                            LOCALE_MAP[locale] ??
                                            ({
                                                label: locale,
                                                icon: "🌐",
                                                code: locale.toUpperCase(),
                                            } as any);

                                        const active = currentLocale === locale;

                                        return (
                                            <button
                                                key={locale}
                                                onClick={() => {
                                                    router.push(pathname, { locale });
                                                    setIsOpen(false);
                                                }}
                                                role="menuitem"
                                                className={`
                          flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm
                          transition-colors
                          hover:bg-slate-100 dark:hover:bg-neutral-800
                          ${active ? "bg-slate-100 dark:bg-neutral-800" : ""}
                        `}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base">{meta.icon}</span>
                                                    <span
                                                        className={`${active
                                                            ? "font-semibold text-emerald-600 dark:text-emerald-400"
                                                            : "text-slate-700 dark:text-slate-200"
                                                            }`}
                                                    >
                                                        {meta.label}
                                                    </span>
                                                </div>

                                                {active && (
                                                    <Check className="h-4 w-4 text-emerald-500" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}


        </>
    );
}
