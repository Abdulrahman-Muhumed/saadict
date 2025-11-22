"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeSwitcher } from "@/components/theme-switcher";
import LoaderOverlay from "@/components/LoaderOverlay";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";

const BRAND = {
    primary: "#241c72",
    accent: "#F99417",
};

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            router.push("/dashboard");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Authentication failed");
        } 
    };

    return (
        <div className="relative flex min-h-screen flex-col md:flex-row bg-white dark:bg-neutral-950 transition-colors">
            {/* Global loader */}
            <LoaderOverlay show={isLoading} />

            {/* LEFT PANEL — Brand showcase */}
            <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#241c72] to-[#15104d] text-white w-1/2 p-14">
                {/* Subtle hero image */}
                <Image
                    src="/login/login_bg.png"
                    alt="Hoggaan Background"
                    fill
                    priority
                    className="object-cover opacity-15"
                />
                <div className="relative z-10 flex justify-between items-center">
                    <Link href="/" className="text-sm font-medium opacity-80 hover:opacity-100">
                        ← Back Home
                    </Link>
                    <ThemeSwitcher />
                </div>

                <div className="relative z-10 mt-auto mb-24 space-y-6">
                    <h1 className="text-5xl font-light leading-tight">
                        Welcome to <span className="font-semibold text-[#F99417]">Hoggaan</span>
                    </h1>
                    <p className="max-w-sm text-base text-white/80">
                        The all-in-one platform for Hajj & Umrah travel management.
                        Log in to access your digital control center.
                    </p>
                </div>

                <div className="relative z-10 border-t border-white/10 pt-4 text-xs text-white/60">
                    © {new Date().getFullYear()} Hoggaan Travels — All rights reserved.
                </div>
            </div>

            {/* RIGHT PANEL — Login form */}
            <div className="flex flex-1 items-center justify-center p-8 md:p-20 relative overflow-hidden">
                <form
                    onSubmit={handleLogin}
                    className={cn(
                        "relative z-10 w-full max-w-md p-10 rounded-3xl",
                        "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl",
                        "border border-neutral-200/30 dark:border-neutral-800/40 shadow-xl space-y-6"
                    )}
                >
                    {/* Logo + title */}
                    <div className="text-center mb-2">
                        <Image
                            src="/brand/hg_icon_light.png"
                            alt="Hoggaan Logo"
                            width={60}
                            height={60}
                            className="mx-auto mb-3 dark:invert"
                            priority
                        />
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
                            Sign In to Continue
                        </h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                            Secure access to your admin dashboard
                        </p>
                    </div>

                    {/* Input fields */}
                    <div className="space-y-5">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded-xl border border-neutral-300/50 dark:border-neutral-700/60 bg-white/70 dark:bg-neutral-800/80 px-4 py-3 focus-visible:border-indigo-400 focus-visible:ring-0"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Password
                                </Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs text-indigo-500 hover:text-indigo-400 transition"
                                >
                                    Forgot?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-xl border border-neutral-300/50 dark:border-neutral-700/60 bg-white/70 dark:bg-neutral-800/80 px-4 py-3 focus-visible:border-indigo-400 focus-visible:ring-0"
                            />
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <p className="rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm text-red-600 dark:text-red-300">
                            {error}
                        </p>
                    )}

                    {/* Submit button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-full py-3 font-semibold text-white tracking-wide transition-transform duration-200 hover:scale-[1.02] border-0"
                        style={{
                            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})`,
                            boxShadow: `0 8px 25px -8px ${BRAND.primary}80`,
                        }}
                    >
                        {isLoading ? "Authenticating..." : "Sign In"}
                    </Button>

                    {/* Extra link */}
                    <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                        Need help?{" "}
                        <Link
                            href="/contact"
                            className="text-indigo-500 hover:text-indigo-400 font-medium"
                        >
                            Contact Support
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
