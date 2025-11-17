"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { brand } from "@/components/config/brand";
import Link from "next/link";

export default function AuthCTA({ t }: { t: any }) {

    const BRAND_INDIGO = brand.colors.primary;
    const ACCENT = brand.colors.accent;


    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getUser();
            if (!mounted) return;
            setUser(data?.user ?? null);
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const label = user ? t("dashboard") : t("login");
    const href = user ? "/dashboard" : "/auth/login";

    return (
        <Link
            href={href}
            onClick={() => setLoading(true)}
            className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition flex items-center gap-2"
            style={{
                background: `linear-gradient(90deg, ${BRAND_INDIGO}, ${ACCENT})`,
                boxShadow: "0 10px 30px -10px rgba(36,28,114,.5)",
            }}
        >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : label}
        </Link>
    );
}
