"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { brand } from "@/components/config/brand";

const BRAND_INDIGO = brand.colors.primary;
const BRAND_DARK = brand.colors.accent;

export default function InvoiceHeader({ step }: { step: number }) {
    const router = useRouter();

    return (
        <header className="space-y-3">
            {/* Top bar */}
            <div className="flex items-center justify-between px-1 md:px-0">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                <div className="hidden md:flex text-xs text-slate-500 dark:text-slate-400">
                    Dashboard / Invoices / <span className="ml-1 text-slate-700 dark:text-white font-medium">New</span>
                </div>
            </div>

            {/* Gradient Hero */}
            <section
                className="relative overflow-hidden rounded-2xl md:rounded-3xl text-white shadow-xl"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${BRAND_INDIGO}, ${BRAND_DARK})`,
                }}
            >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--hg-accent,#F99417)] to-transparent opacity-80" />

                <div className="relative px-6 py-8 md:px-10 md:py-12">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">
                        Billing · Hoggaan E-Portal
                    </p>

                    <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
                        Create Invoice
                    </h1>

                    <p className="mt-1 max-w-xl text-sm text-white/70">
                        Add invoice details, attach a traveler or ticket if needed,
                        then build items — all in one smooth flow.
                    </p>

                    {/* Step Indicator */}
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 border border-white/20 text-[11px] font-medium">
                        <span
                            className={`px-2 py-0.5 rounded-full ${step === 1
                                ? "bg-white text-[var(--hg-indigo,#241c72)]"
                                : "text-white/75"
                                }`}
                        >
                            1
                        </span>
                        <span
                            className={`px-2 py-0.5 rounded-full ${step === 2
                                ? "bg-white text-[var(--hg-indigo,#241c72)]"
                                : "text-white/75"
                                }`}
                        >
                            2
                        </span>
                        <span className="ml-1 text-white/70">Step {step} of 2</span>
                    </div>
                </div>
            </section>
        </header>
    );
}
