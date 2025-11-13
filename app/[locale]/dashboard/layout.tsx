"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./_components/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import LoaderOverlay from "@/components/LoaderOverlay";
import { brand } from "@/components/config/brand";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ACCENT = brand?.colors?.accent ?? "#F99417";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const pathname = usePathname();
    const supabase = createClient();

    // Simulate small route change loader
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [pathname]);

    // Logout function (your exact logic)
    const handleSignOut = async () => {
        try {
            setLoading(true);
            await supabase.auth.signOut();
            window.location.assign("/auth/login"); // cleaner redirect
        } catch (err) {
            console.error(err);
            setLoading(false);
            alert("Sign-out failed");
        }
    };

    // Confirmation modal
    const ConfirmModal = () => (
        <AnimatePresence>
            {showConfirm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-[90%] max-w-sm rounded-2xl border border-white/10 bg-white p-6 text-center shadow-xl dark:bg-neutral-900"
                    >
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                            Confirm Sign Out
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Are you sure you want to sign out of your account?
                        </p>

                        <div className="mt-5 flex justify-center gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="rounded-md border border-neutral-300 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="rounded-md bg-red-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition"
                            >
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="relative min-h-screen">
            {/* Loader Overlay (global) */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[9999]"
                    >
                        <LoaderOverlay />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ${collapsed ? "w-16" : "w-[18rem]"
                    }`}
            >
                <Sidebar locale="en" collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>

            {/* Main Area */}
            <div
                className={`flex flex-col min-h-screen transition-all duration-300 ${collapsed ? "ml-16" : "ml-[18rem]"
                    }`}
            >
                {/* Header */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-white/80 px-6 backdrop-blur dark:bg-neutral-900/80">
                    <h1
                        key={collapsed ? "collapsed" : "expanded"}
                        className="font-semibold tracking-tight text-slate-800 dark:text-slate-100"
                    >
                        Dashboard
                    </h1>

                    <div className="flex items-center gap-3">
                        <ThemeSwitcher />
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="rounded-md border border-neutral-300 bg-white/70 px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-200 dark:hover:bg-neutral-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="min-h-[80vh]"
                        >
                            {children}
                        </motion.div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-white/10 bg-white/70 px-6 py-4 text-center text-xs text-slate-600 dark:bg-neutral-900/70 dark:text-slate-400 backdrop-blur">
                    <p>
                        © {new Date().getFullYear()} Hoggaan Travels. All rights reserved. —{" "}
                        <span className="font-semibold" style={{ color: ACCENT }}>
                            Admin Dashboard
                        </span>
                    </p>
                </footer>
            </div>

            {/* Confirmation modal + loader */}
            <ConfirmModal />
        </div>
    );
}
