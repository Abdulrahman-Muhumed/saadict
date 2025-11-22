"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Lock, ArrowRight } from "lucide-react";
import { brand } from "@/components/config/brand";
import Image from "next/image";
export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------------------------------------
      1) CHECK SESSION — only allow if recovery link
     --------------------------------------------- */
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace("/auth/login");
        return;
      }

      // If token type is recovery, allow page
      const tokenType = data.session?.user?.app_metadata?.provider_token;
      setAllowed(true);
      setLoading(false);
    }

    //checkSession();
  }, []);

  /* ---------------------------------------------
      2) Submit new password
     --------------------------------------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }



  const BRAND_INDIGO = brand.colors.primary;
  const BRAND_ACCENT = brand.colors.accent;

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4 
        bg-gradient-to-br from-[#0b1020] via-[#131b3c] to-[#0b1020]
        dark:from-[#0b0b0e] dark:to-[#0b0b0e]
        text-white
      "
    >
      <div
        className="
          w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg
          bg-[#131b3c] dark:bg-black/20 border border-white/10
        "
      >

        <Image
          src="/brand/hg_icon_light.png"
          alt="Hoggaan Logo"
          width={60}
          height={60}
          className="mx-auto mb-3 dark:invert"
          priority
        />

        <div className=" items-center justify-center my-8  relative overflow-hidden">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-white/70 dark:text-slate-400">
            Enter your new password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Password Field */}
          <div>
            <label className="text-sm font-medium text-white/90 dark:text-white">
              New Password
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                type="password"
                className="
                  w-full rounded-lg bg-white/10 border border-white/20
                  pl-10 pr-3 py-2 text-sm
                  placeholder-white/40 text-white
                  focus:ring-2 focus:ring-indigo-500/60 focus:outline-none
                  dark:bg-black/30 dark:border-white/10
                "
                placeholder="Enter new password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="
              w-full inline-flex items-center justify-center gap-2 
              rounded-lg px-4 py-2.5 text-sm font-semibold 
              bg-[var(--hg-indigo,#241c72)] hover:bg-indigo-800 
              disabled:opacity-60 transition
            "
            style={{ ["--hg-indigo" as any]: BRAND_INDIGO }}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                Save New Password
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-white/50">
            Hoggaan E-Portal · Secure password update
          </p>
        </div>
      </div>
    </div>
  );
}
