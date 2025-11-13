"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { brand } from "@/components/config/brand";
import {
  Calendar,
  Users,
  Plane,
  Building2,
  ListChecks,
  NotebookText,
} from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PRIMARY = brand.colors.primary; // e.g. #241c72
const ACCENT = brand.colors.accent;   // e.g. #F99417

type Trip = {
  id: number;
  title: string;
  start_date: string | null;
  end_date: string | null;
  status: "draft" | "active" | "archived";
  season: string | null;
  created_at?: string;
};

type Booking = {
  id: number;
  code?: string | null;
  status?: string | null; // e.g., pending | confirmed | cancelled
  created_at?: string;
  trip_id?: number | null;
  pilgrim_name?: string | null; // if your table stores a display name
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
};

export default function PageContent() {
  const [counts, setCounts] = useState<CountBlock | null>(null);
  const [recentTrips, setRecentTrips] = useState<Trip[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
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
        };

        // --- RECENT TRIPS
        const { data: recentTripsData } = await supabase
          .from("trips")
          .select("*")
          .order("created_at", { ascending: false })
          .range(0, 4);

        // --- RECENT BOOKINGS
        const { data: recentBookingsData } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })
          .range(0, 4);

        if (!alive) return;
        setCounts(nextCounts);
        setRecentTrips(recentTripsData || []);
        setRecentBookings(recentBookingsData || []);
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
        title: "Total Trips",
        value: counts.totalTrips.toString(),
        icon: <Calendar className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
      },
      {
        title: "Active Trips",
        value: counts.activeTrips.toString(),
        icon: <ListChecks className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
      },
      {
        title: "Upcoming Trips",
        value: counts.upcomingTrips.toString(),
        icon: <NotebookText className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
      },
      {
        title: "Total Bookings",
        value: counts.totalBookings.toString(),
        icon: <Calendar className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
      },
      {
        title: "Total Pilgrims",
        value: counts.totalPilgrims.toString(),
        icon: <Users className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
      },
      {
        title: "Pending Umrah Requests",
        value: counts.pendingUmrahReq.toString(),
        icon: <NotebookText className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
      },
      {
        title: "Linked Flights",
        value: counts.linkedFlights.toString(),
        icon: <Plane className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
      },
      {
        title: "Linked Hotels",
        value: counts.linkedHotels.toString(),
        icon: <Building2 className="w-6 h-6" />,
        gradient: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
      },
    ];
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
          Live overview of trips, bookings, pilgrims, and linked logistics.
        </p>
        {err ? (
          <div className="mt-3 rounded-lg border border-red-300/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">
            {err}
          </div>
        ) : null}
      </motion.div>

      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {(loading ? skeletonStats : statCards).map((card, i) => (
          <motion.div
            key={card.title + i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className="relative overflow-hidden rounded-2xl p-5 text-white shadow-xl backdrop-blur-xl border border-white/10"
            style={{
              background: (card as any).gradient || `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
              boxShadow: `0 10px 35px -12px ${ACCENT}66`,
            }}
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-xs opacity-80">{card.title}</p>
                <h3 className="text-3xl font-bold">{card.value}</h3>
              </div>
              <div className="p-3 bg-white/10 rounded-xl">
                {card.icon}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card title="Recent Trips" actionHref="/dashboard/trips" actionText="View all">
          {loading ? (
            <ListSkeleton rows={5} />
          ) : recentTrips.length === 0 ? (
            <EmptyNote text="No trips yet." />
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-slate-600">
                <tr className="border-b border-slate-200">
                  <Th>Title</Th>
                  <Th>Dates</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentTrips.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/trips/${t.id}`} className="text-indigo-700 hover:underline">
                        {t.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {fmtDate(t.start_date)}{t.end_date ? ` → ${fmtDate(t.end_date)}` : ""}
                    </td>
                    <td className="px-4 py-3">
                      <span className={statusChip(t.status)}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card title="Recent Bookings" actionHref="/dashboard/bookings" actionText="View all">
          {loading ? (
            <ListSkeleton rows={5} />
          ) : recentBookings.length === 0 ? (
            <EmptyNote text="No bookings yet." />
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-slate-600">
                <tr className="border-b border-slate-200">
                  <Th>Code / Name</Th>
                  <Th>Status</Th>
                  <Th>Trip</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3">
                      <div className="font-medium">{b.code || b.pilgrim_name || `#${b.id}`}</div>
                      <div className="text-xs text-slate-500">{fmtDateTime(b.created_at)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={smallStatus(b.status)}>{b.status || "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      {b.trip_id ? (
                        <Link href={`/dashboard/trips/${b.trip_id}`} className="text-indigo-700 hover:underline">
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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:bg-neutral-900/60 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200/60 dark:border-white/10">
        <h3 className="text-base font-semibold">{title}</h3>
        {actionHref ? (
          <Link
            href={actionHref}
            className="text-xs rounded-lg border border-slate-200 bg-white dark:bg-neutral-900 px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-neutral-800"
          >
            {actionText || "Open"}
          </Link>
        ) : null}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${className}`}>
      {children}
    </th>
  );
}

function EmptyNote({ text }: { text: string }) {
  return <div className="p-6 text-center text-slate-500">{text}</div>;
}

function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-slate-200">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-3">
          <div className="h-4 w-2/5 rounded bg-slate-200/70 animate-pulse" />
          <div className="h-4 w-1/4 rounded bg-slate-200/70 animate-pulse" />
          <div className="h-4 w-1/6 rounded bg-slate-200/70 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- helpers --------------------------------- */

function statusChip(status?: string | null) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ring-1";
  if (status === "active") return `${base} bg-emerald-50 text-emerald-700 ring-emerald-200`;
  if (status === "archived") return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
  if (status === "draft") return `${base} bg-amber-50 text-amber-800 ring-amber-200`;
  return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
}

function smallStatus(status?: string | null) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ring-1";
  if (status === "confirmed") return `${base} bg-emerald-50 text-emerald-700 ring-emerald-200`;
  if (status === "pending") return `${base} bg-amber-50 text-amber-800 ring-amber-200`;
  if (status === "cancelled") return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
  return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
}

function fmtDate(v?: string | null) {
  if (!v) return "—";
  return (v || "").slice(0, 10);
}
function fmtDateTime(v?: string | null) {
  if (!v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return (v || "").slice(0, 16).replace("T", " ");
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

const skeletonStats = [
  { title: "Loading…", value: "—", icon: <div className="w-6 h-6 bg-white/30 rounded" /> },
  { title: "Loading…", value: "—", icon: <div className="w-6 h-6 bg-white/30 rounded" /> },
  { title: "Loading…", value: "—", icon: <div className="w-6 h-6 bg-white/30 rounded" /> },
  { title: "Loading…", value: "—", icon: <div className="w-6 h-6 bg-white/30 rounded" /> },
];
