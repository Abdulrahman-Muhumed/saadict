"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { brand } from "@/components/config/brand";
import {
  Users,
  Plane,
  Building2,
  ListChecks,
  NotebookText,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PRIMARY = brand.colors.primary; // e.g. #241c72
const ACCENT = brand.colors.accent;   // e.g. #F99417

type Booking = {
  id: number;
  code?: string | null;
  status?: string | null; // e.g., pending | confirmed | cancelled
  created_at?: string;
  trip_id?: number | null;
  pilgrim_name?: string | null; // if your table stores a display name
};

type Invoice = {
  id: number;
  invoice_number?: string | null;
  status?: string | null; // paid | issued
  created_at?: string | null;
};

type CountBlock = {
  totalTrips: number;
  activeTrips: number;
  upcomingTrips: number;
  totalPilgrims: number;
  activePilgrims: number;
  totalBookings: number;
  confirmedBookings: number;
  pendingUmrahReq: number;
  linkedFlights: number;
  linkedHotels: number;
  totalInvoices: number;
  invoicesPaid: number;
  invoicesIssued: number;
};

export default function PageContent() {
  const [counts, setCounts] = useState<CountBlock | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setErr(null);

      const todayISO = new Date().toISOString().slice(0, 10);

      try {
        // --- COUNTS (use head:true for fast count-only queries)
        const [
          tripsAll,
          tripsActive,
          tripsUpcoming,
          pilgrimsAll,
          pilgrimsActive,
          bookingsAll,
          bookingsConfirmed,
          umrahPending,
          flightsLinked,
          hotelsLinked,
          invoicesAll,
          invoicesPaid,
          invoicesIssued,
        ] = await Promise.all([
          supabase.from("trips").select("*", { count: "exact", head: true }),
          supabase
            .from("trips")
            .select("*", { count: "exact", head: true })
            .eq("status", "active"),
          supabase
            .from("trips")
            .select("*", { count: "exact", head: true })
            .gte("start_date", todayISO),
          supabase.from("pilgrims").select("*", { count: "exact", head: true }),
          supabase
            .from("pilgrims")
            .select("*", { count: "exact", head: true })
            .eq("status", "active"),
          supabase.from("bookings").select("*", { count: "exact", head: true }),
          supabase
            .from("bookings")
            .select("*", { count: "exact", head: true })
            .eq("status", "confirmed"),
          supabase
            .from("umrah_req")
            .select("*", { count: "exact", head: true })
            .eq("status", "pending"),
          supabase
            .from("trip_flights")
            .select("*", { count: "exact", head: true }),
          supabase
            .from("trip_hotels")
            .select("*", { count: "exact", head: true }),
          supabase
            .from("invoices")
            .select("*", { count: "exact", head: true }),
          supabase
            .from("invoices")
            .select("*", { count: "exact", head: true })
            .eq("status", "paid"),
          supabase
            .from("invoices")
            .select("*", { count: "exact", head: true })
            .eq("status", "issued"),
        ]);

        const nextCounts: CountBlock = {
          totalTrips: tripsAll.count ?? 0,
          activeTrips: tripsActive.count ?? 0,
          upcomingTrips: tripsUpcoming.count ?? 0,
          totalPilgrims: pilgrimsAll.count ?? 0,
          activePilgrims: pilgrimsActive.count ?? 0,
          totalBookings: bookingsAll.count ?? 0,
          confirmedBookings: bookingsConfirmed.count ?? 0,
          pendingUmrahReq: umrahPending.count ?? 0,
          linkedFlights: flightsLinked.count ?? 0,
          linkedHotels: hotelsLinked.count ?? 0,
          totalInvoices: invoicesAll.count ?? 0,
          invoicesPaid: invoicesPaid.count ?? 0,
          invoicesIssued: invoicesIssued.count ?? 0,
        };

        // --- RECENT BOOKINGS
        const { data: recentBookingsData } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })
          .range(0, 4);

        // --- RECENT INVOICES
        const { data: recentInvoicesData } = await supabase
          .from("invoices")
          .select("id, invoice_number, status, created_at")
          .order("created_at", { ascending: false })
          .range(0, 4);

        if (!alive) return;
        setCounts(nextCounts);
        setRecentBookings(recentBookingsData || []);
        setRecentInvoices(recentInvoicesData || []);
        setLoading(false);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message || "Failed to load dashboard.");
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const statCards = useMemo(() => {
    if (!counts) return [];
    return [
      {
        title: "Total Pilgrims",
        value: counts.totalPilgrims.toString(),
        icon: <Users className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
      },
      {
        title: "Total Bookings",
        value: counts.totalBookings.toString(),
        icon: <BarChart3 className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
      },
      {
        title: "Pending Umrah Requests",
        value: counts.pendingUmrahReq.toString(),
        icon: <NotebookText className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
      },
      {
        title: "Total Invoices",
        value: counts.totalInvoices.toString(),
        icon: <ListChecks className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
        meta: `Paid: ${counts.invoicesPaid} • Issued: ${counts.invoicesIssued}`,
      },
    ] as {
      title: string;
      value: string;
      icon: React.ReactNode;
      gradient: string;
      meta?: string;
    }[];
  }, [counts]);

  return (
    <section className="min-h-screen">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Hoggaan Dashboard
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Live overview of pilgrims, bookings, Umrah requests, invoices, and logistics.
        </p>
        {err ? (
          <div className="mt-3 rounded-lg border border-red-300/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">
            {err}
          </div>
        ) : null}
      </motion.div>

      {/* STATS GRID (4 cards only) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {(loading ? skeletonStats : statCards).map((card, i) => (
          <motion.div
            key={card.title + i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className="relative overflow-hidden rounded-2xl p-5 text-white shadow-xl backdrop-blur-xl border border-white/10"
            style={{
              background:
                (card as any).gradient ||
                `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
              boxShadow: `0 10px 35px -12px ${ACCENT}66`,
            }}
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-xs opacity-80">{card.title}</p>
                <h3 className="text-3xl font-bold">{card.value}</h3>
                {"meta" in card && card.meta ? (
                  <p className="text-[11px] opacity-90 mt-1">{card.meta}</p>
                ) : null}
              </div>
              <div className="p-3 bg-white/10 rounded-xl">
                {card.icon}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* ANALYTICS / SUMMARY ("graph-like" ratios) */}
      {counts && (
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card title="Bookings vs Pilgrims (Total)">
            <AnalyticsBlock>
              <MetricRow
                label="Total Bookings"
                value={counts.totalBookings}
                max={Math.max(counts.totalBookings, counts.totalPilgrims, 1)}
              />
              <MetricRow
                label="Total Pilgrims"
                value={counts.totalPilgrims}
                max={Math.max(counts.totalBookings, counts.totalPilgrims, 1)}
              />
            </AnalyticsBlock>
          </Card>

          <Card title="Invoices Status">
            <AnalyticsBlock>
              <MetricRow
                label="Paid"
                value={counts.invoicesPaid}
                max={Math.max(
                  counts.invoicesPaid,
                  counts.invoicesIssued,
                  1
                )}
              />
              <MetricRow
                label="Issued (Unpaid)"
                value={counts.invoicesIssued}
                max={Math.max(
                  counts.invoicesPaid,
                  counts.invoicesIssued,
                  1
                )}
              />
              <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                Overall: {counts.totalInvoices} invoices
              </div>
            </AnalyticsBlock>
          </Card>

          <Card title="Trips & Logistics Snapshot">
            <AnalyticsBlock>
              <MetricRow
                label="Active Trips"
                value={counts.activeTrips}
                max={Math.max(
                  counts.activeTrips,
                  counts.upcomingTrips,
                  counts.linkedFlights,
                  counts.linkedHotels,
                  1
                )}
              />
              <MetricRow
                label="Upcoming Trips"
                value={counts.upcomingTrips}
                max={Math.max(
                  counts.activeTrips,
                  counts.upcomingTrips,
                  counts.linkedFlights,
                  counts.linkedHotels,
                  1
                )}
              />
              <MetricRow
                label="Linked Flights"
                value={counts.linkedFlights}
                max={Math.max(
                  counts.activeTrips,
                  counts.upcomingTrips,
                  counts.linkedFlights,
                  counts.linkedHotels,
                  1
                )}
              />
              <MetricRow
                label="Linked Hotels"
                value={counts.linkedHotels}
                max={Math.max(
                  counts.activeTrips,
                  counts.upcomingTrips,
                  counts.linkedFlights,
                  counts.linkedHotels,
                  1
                )}
              />
            </AnalyticsBlock>
          </Card>
        </div>
      )}

      {/* RECENT ACTIVITY */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <Card
          title="Recent Bookings"
          actionHref="/dashboard/bookings"
          actionText="View all"
        >
          {loading ? (
            <ListSkeleton rows={5} />
          ) : recentBookings.length === 0 ? (
            <EmptyNote text="No bookings yet." />
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-slate-600 dark:text-slate-300">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <Th>Code / Name</Th>
                  <Th>Status</Th>
                  <Th>Trip</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                    <td className="px-4 py-3">
                      <div className="font-medium">
                        {b.code || b.pilgrim_name || `#${b.id}`}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {fmtDateTime(b.created_at)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={smallStatus(b.status)}>
                        {b.status || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {b.trip_id ? (
                        <Link
                          href={`/dashboard/trips/${b.trip_id}`}
                          className="text-indigo-700 dark:text-indigo-300 hover:underline"
                        >
                          Trip #{b.trip_id}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        {/* Recent Invoices */}
        <Card
          title="Recent Invoices"
          actionHref="/dashboard/invoices"
          actionText="View all"
        >
          {loading ? (
            <ListSkeleton rows={5} />
          ) : recentInvoices.length === 0 ? (
            <EmptyNote text="No invoices yet." />
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-slate-600 dark:text-slate-300">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <Th>Invoice</Th>
                  <Th>Status</Th>
                  <Th>Created</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium">
                        {inv.invoice_number || `INV-${inv.id}`}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        ID: {inv.id}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={invoiceStatusChip(inv.status)}>
                        {inv.status || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">
                      {fmtDateTime(inv.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </section>
  );
}

/* -------------------------------- UI bits -------------------------------- */

function Card({
  title,
  actionHref,
  actionText,
  children,
}: {
  title: string;
  actionHref?: string;
  actionText?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-900/60 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200/60 dark:border-white/10">
        <h3 className="text-base font-semibold">{title}</h3>
        {actionHref ? (
          <Link
            href={actionHref}
            className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-neutral-800"
          >
            {actionText || "Open"}
          </Link>
        ) : null}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {children}
    </th>
  );
}

function EmptyNote({ text }: { text: string }) {
  return <div className="p-6 text-center text-slate-500">{text}</div>;
}

function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-800">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 py-3"
        >
          <div className="h-4 w-2/5 rounded bg-slate-200/70 dark:bg-slate-700/70 animate-pulse" />
          <div className="h-4 w-1/4 rounded bg-slate-200/70 dark:bg-slate-700/70 animate-pulse" />
          <div className="h-4 w-1/6 rounded bg-slate-200/70 dark:bg-slate-700/70 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- analytics -------------------------------- */

function AnalyticsBlock({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3 text-sm">{children}</div>;
}

function MetricRow({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className="font-mono text-[11px] text-slate-700 dark:text-slate-200">
          {value}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------- helpers --------------------------------- */

function statusChip(status?: string | null) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ring-1";
  if (status === "active")
    return `${base} bg-emerald-50 text-emerald-700 ring-emerald-200`;
  if (status === "archived")
    return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
  if (status === "draft")
    return `${base} bg-amber-50 text-amber-800 ring-amber-200`;
  return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
}

function smallStatus(status?: string | null) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ring-1";
  if (status === "confirmed")
    return `${base} bg-emerald-50 text-emerald-700 ring-emerald-200`;
  if (status === "pending")
    return `${base} bg-amber-50 text-amber-800 ring-amber-200`;
  if (status === "cancelled")
    return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
  return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
}

function invoiceStatusChip(status?: string | null) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ring-1";
  if (status === "paid")
    return `${base} bg-emerald-50 text-emerald-700 ring-emerald-200`;
  if (status === "issued")
    return `${base} bg-amber-50 text-amber-800 ring-amber-200`;
  return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
}

function fmtDate(v?: string | null) {
  if (!v) return "—";
  return (v || "").slice(0, 10);
}
function fmtDateTime(v?: string | null) {
  if (!v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime()))
    return (v || "").slice(0, 16).replace("T", " ");
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

const skeletonStats = [
  {
    title: "Loading…",
    value: "—",
    icon: <div className="w-6 h-6 bg-white/30 rounded" />,
  },
  {
    title: "Loading…",
    value: "—",
    icon: <div className="w-6 h-6 bg-white/30 rounded" />,
  },
  {
    title: "Loading…",
    value: "—",
    icon: <div className="w-6 h-6 bg-white/30 rounded" />,
  },
  {
    title: "Loading…",
    value: "—",
    icon: <div className="w-6 h-6 bg-white/30 rounded" />,
  },
];
