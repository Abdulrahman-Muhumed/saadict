// app/(dashboard)/bookings/[id]/page-content.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { brand } from "@/components/config/brand";
import TravelersTable from "./_components/TravelersTable";

import {
    ArrowLeft,
    Loader2,
    AlertTriangle,
} from "lucide-react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PageContent() {
    const params = useParams();
    const bookingId = Number(params.id);

    /* ────────────────────────────────────────────────
       State
    ──────────────────────────────────────────────── */
    const [booking, setBooking] = useState<any>(null);
    const [totals, setTotals] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /* ────────────────────────────────────────────────
       Fetch booking + related data
    ──────────────────────────────────────────────── */
    useEffect(() => {
        let active = true;
        (async () => {
            setLoading(true);
            setError(null);

            try {
                const { data: b, error: be } = await supabase
                    .from("bookings")
                    .select("id, name, status, trip_id, trips(title)")
                    .eq("id", bookingId)
                    .single();

                if (be) throw be;
                if (!active) return;
                setBooking(b);

                const { data: totals } = await supabase
                    .from("v_booking_financials")
                    .select("*")
                    .eq("booking_id", bookingId)
                    .maybeSingle();
                if (!active) return;
                setTotals(totals || null);

            } catch (err: any) {
                setError(err.message || "Failed to load booking");
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, [bookingId]);

    /* ────────────────────────────────────────────────
       UI
    ──────────────────────────────────────────────── */
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-500 mb-2" />
                <span className="text-sm opacity-70">Loading booking details...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 space-y-4">
                <Link
                    href="/en/dashboard/bookings"
                    className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to bookings
                </Link>

                <div className="rounded-lg border border-amber-300/30 bg-amber-100/30 px-4 py-3 text-sm text-amber-800 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {error}
                </div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="p-6">
                <Link
                    href="/en/dashboard/bookings"
                    className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
                >
                    <ArrowLeft className="h-4 w-4" /> Back
                </Link>
                <div className="mt-4 text-slate-600 dark:text-slate-400">
                    Booking not found.
                </div>
            </div>
        );
    }

    /* ────────────────────────────────────────────────
       Layout Shell (content placeholder)
    ──────────────────────────────────────────────── */
    return (
        <div className="">
            {/* Header */}
            <div
                className="overflow-hidden rounded-3xl border border-white/10 text-white shadow-xl mb-6"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
                }}
            >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-6 py-5 md:px-8 md:py-6">
                    {/* Left side */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/en/dashboard/bookings"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/15"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back
                        </Link>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">
                                Booking Details
                            </h1>
                            <p className="text-sm text-white/80">
                                Manage travelers, payments, and IDs.
                            </p>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="text-right text-sm">
                        <div className="font-medium">
                            Trip:{" "}
                            <span className="font-semibold text-white">
                                {booking.trips?.title || "—"}
                            </span>
                        </div>

                        <span
                            className={`inline-block mt-2 rounded-full px-3 py-1 text-[11px] font-semibold capitalize shadow-sm
                                ${booking.status === "approved"
                                    ? "bg-emerald-200/20 text-emerald-50 ring-1 ring-emerald-300/30"
                                    : booking.status === "confirmed"
                                        ? "bg-indigo-200/20 text-indigo-50 ring-1 ring-indigo-300/30"
                                        : booking.status === "cancelled"
                                            ? "bg-red-200/20 text-red-50 ring-1 ring-red-300/30"
                                            : "bg-amber-200/20 text-amber-50 ring-1 ring-amber-300/30"
                                }`}
                        >
                            {booking.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Totals (placeholder for BookingStats) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {/* Headcount */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0f1a] p-4">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Headcount</div>
                    <div className="text-lg font-mono font-semibold text-slate-900 dark:text-white">
                        {totals?.headcount ?? 0}
                    </div>
                </div>

                {/* Trip Title */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0f1a] p-4">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Trip</div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {booking.trips?.title || "—"}
                    </div>
                </div>

                {/* Booking Name */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0f1a] p-4">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Booking Name</div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {booking.name || `Booking #${booking.id}`}
                    </div>
                </div>

                {/* Created Date */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0f1a] p-4">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Created</div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {booking.created_at
                            ? new Date(booking.created_at).toLocaleDateString()
                            : "—"}
                    </div>
                </div>
            </div>

            {/* TravelersTable placeholder */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0f1a] p-6">
                <div className="text-sm text-slate-600 dark:text-slate-300">
                    <TravelersTable bookingId={booking.id} />
                </div>
            </div>

        </div>
    );
}

/* ────────────────────────────────────────────────
   Helper
──────────────────────────────────────────────── */
function money(v: any) {
    const n = Number(v || 0);
    return n.toFixed(2);
}
