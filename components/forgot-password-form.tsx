"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoaderOverlay from "@/components/LoaderOverlay";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Mail } from "lucide-react";

const BRAND = {
  primary: "#241c72",
  accent: "#F99417",
};

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col md:flex-row bg-white dark:bg-neutral-950 transition-colors">
      {/* Loader */}
      <LoaderOverlay show={isLoading} />

      {/* LEFT PANEL (same as login) */}
      <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#241c72] to-[#15104d] text-white w-1/2 p-14">

        <Image
          src="/login/login_bg.png"
          alt="Background"
          fill
          priority
          className="object-cover opacity-15"
        />

        {/* TOP NAV */}
        <div className="relative z-10 flex justify-between items-center">
          <Link href="/" className="text-sm font-medium opacity-80 hover:opacity-100">
            ← Back Home
          </Link>
          <ThemeSwitcher />
        </div>

        {/* HERO TEXT */}
        <div className="relative z-10 mt-auto mb-24 space-y-6">
          <h1 className="text-5xl font-light leading-tight">
            Reset Your <span className="font-semibold text-[#F99417]">Password</span>
          </h1>
          <p className="max-w-sm text-base text-white/80">
            Enter your email to receive password reset instructions.
          </p>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 border-t border-white/10 pt-4 text-xs text-white/60">
          © {new Date().getFullYear()} Hoggaan Travels — All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center p-8 md:p-20 relative overflow-hidden">
        <form
          onSubmit={handleForgot}
          className={cn(
            "relative z-10 w-full max-w-md p-10 rounded-3xl",
            "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl",
            "border border-neutral-200/30 dark:border-neutral-800/40 shadow-xl space-y-6"
          )}
        >
          {/* Icon + Title */}
          <div className="text-center mb-2">
            <div
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})`,
                boxShadow: `0 10px 25px -10px ${BRAND.primary}80`,
              }}
            >
              <Mail className="text-white h-5 w-5" />
            </div>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
              Forgot Password?
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              We'll send you a reset link to this email
            </p>
          </div>

          {/* Success State */}
          {success ? (
            <p className="text-center text-sm text-green-600 dark:text-green-400">
              Email sent! Please check your inbox.
            </p>
          ) : (
            <div className="space-y-5">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email Address
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

              {/* Error */}
              {error && (
                <p className="rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm text-red-600 dark:text-red-300">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full py-3 font-semibold text-white tracking-wide transition-transform duration-200 hover:scale-[1.02] border-0"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})`,
                  boxShadow: `0 8px 25px -8px ${BRAND.primary}80`,
                }}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          )}

          {/* Extra Link */}
          <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 mt-4">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-indigo-500 hover:text-indigo-400 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
