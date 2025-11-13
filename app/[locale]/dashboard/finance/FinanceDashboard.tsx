"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import {
  Wallet,
  Banknote,
  ReceiptText,
  AlertCircle,
  BarChart3,
  PieChart,
  CalendarDays,
  Users,
  Ticket,
} from "lucide-react";

import { brand } from "@/components/config/brand";
import KpiCard from "./_components/KpiCard";
import DataTable from "./_components/DataTable";
import { BarChart, DonutChart } from "./_components/Charts";

/* ------------------------------------------------------------------ */
/* Supabase Client                                                    */
/* ------------------------------------------------------------------ */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ------------------------------------------------------------------ */
/* Utility Helpers                                                    */
/* ------------------------------------------------------------------ */
const money = (v?: number | string) =>
  Number(v || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const sumBy = <T,>(arr: T[], fn: (v: T) => number) =>
  arr.reduce((s, v) => s + fn(v), 0);

const fmtD = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : "—";

const lastNMonths = (n: number) => {
  const d = new Date();
  d.setDate(1);
  return Array.from({ length: n }, (_, i) => {
    const c = new Date(d);
    c.setMonth(d.getMonth() - i);
    return {
      key: `${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, "0")}`,
      label: c.toLocaleDateString(undefined, { month: "short" }),
    };
  }).reverse();
};

const keyedZeroSum = (months: { key: string }[]): Record<string, number> =>
  months.reduce<Record<string, number>>((acc, m) => {
    acc[m.key] = 0;
    return acc;
  }, {});

const bumpMonth = (sums: Record<string, number>, iso?: string, value?: number) => {
  if (!iso || !value) return;
  const d = new Date(iso);
  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  if (key in sums) sums[key] += value;
};

/* ------------------------------------------------------------------ */
/* Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function FinanceDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "pilgrims" | "tickets">(
    "overview"
  );
  const [months, setMonths] = useState(6);
  const [tickets, setTickets] = useState<any[]>([]);
  const [pilgrims, setPilgrims] = useState<any[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<any[]>([]);

  /* ------------------------------------------------------------------ */
  /* Data Fetching                                                      */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const [{ data: tks }, { data: pgs }, { data: invs }] = await Promise.all([
        supabase
          .from("tickets")
          .select("id, price, cost, paid, created_at")
          .order("created_at", { ascending: false })
          .limit(1000),
        supabase
          .from("pilgrims")
          .select(
            "id, full_name, charged_amount, visa_cost, pkg_cost, payment_status, created_at"
          )
          .order("created_at", { ascending: false })
          .limit(2000),
        supabase
          .from("invoices")
          .select("id, invoice_number, status, currency, created_at")
          .order("created_at", { ascending: false })
          .limit(8),
      ]);
      if (!alive) return;
      setTickets(tks || []);
      setPilgrims(pgs || []);
      setRecentInvoices(invs || []);
      setTimeout(() => setLoading(false), 500);
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /* Computations                                                       */
  /* ------------------------------------------------------------------ */
  const inRange = (iso: string, nMonths: number) => {
    if (!iso) return false;
    const d = new Date(iso);
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    start.setMonth(start.getMonth() - (nMonths - 1));
    return d >= start;
  };

  const ticketsR = useMemo(
    () => tickets.filter((t) => inRange(t.created_at, months)),
    [tickets, months]
  );
  const pilgrimsR = useMemo(
    () => pilgrims.filter((p) => inRange(p.created_at, months)),
    [pilgrims, months]
  );

  const isPaid = (s: string) => (s || "").toLowerCase() === "paid";
  const paidTickets = ticketsR.filter((t) => !!t.paid);
  const unpaidTickets = ticketsR.filter((t) => !t.paid);

  const tRevenue = sumBy(paidTickets, (r) => Number(r.price || 0));
  const tCost = sumBy(paidTickets, (r) => Number(r.cost || 0));
  const tProfit = tRevenue - tCost;
  const tOutstanding = sumBy(unpaidTickets, (r) => Number(r.price || 0));

  const paidPilgrims = pilgrimsR.filter((p) => isPaid(p.payment_status));
  const unpaidPilgrims = pilgrimsR.filter((p) => !isPaid(p.payment_status));
  const pilgrimCost = (p: any) => Number(p.visa_cost || 0) + Number(p.pkg_cost || 0);
  const pilgrimProfit = (p: any) =>
    Number(p.charged_amount || 0) - pilgrimCost(p);

  const vRevenue = sumBy(paidPilgrims, (p) => Number(p.charged_amount || 0));
  const vCost = sumBy(paidPilgrims, pilgrimCost);
  const vProfit = sumBy(paidPilgrims, pilgrimProfit);
  const vOutstanding = sumBy(unpaidPilgrims, (p) => Number(p.charged_amount || 0));

  const revenue = tRevenue + vRevenue;
  const cost = tCost + vCost;
  const profit = revenue - cost;
  const outstanding = tOutstanding + vOutstanding;

  const lastMonths = useMemo(() => lastNMonths(months), [months]);
  const monthly = useMemo(() => {
    const msum = keyedZeroSum(lastMonths);
    paidTickets.forEach((t) => bumpMonth(msum, t.created_at, Number(t.price || 0)));
    paidPilgrims.forEach((p) =>
      bumpMonth(msum, p.created_at, Number(p.charged_amount || 0))
    );
    const values = lastMonths.map((m) => msum[m.key] || 0);
    const growth =
      values.length > 1
        ? ((values.at(-1)! - values.at(-2)!) / Math.max(1, values.at(-2)!)) * 100
        : 0;
    return { labels: lastMonths.map((m) => m.label), values, growth };
  }, [paidTickets, paidPilgrims, lastMonths]);

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "pilgrims", label: "Pilgrims" },
    { id: "tickets", label: "Tickets" },
  ];

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen text-neutral-200">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          className="overflow-hidden rounded-3xl border border-white/10 text-white mb-6"
          style={{
            backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
          }}
        >
          <div className="px-5 py-6 md:px-8 md:py-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Financial Dashboard
            </h1>
            <p className="mt-1 text-sm text-white/80">
              Analyze revenues, costs, profits, and outstanding balances — all
              in one place.
            </p>

            {/* Tabs */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 p-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(tab.id as "overview" | "pilgrims" | "tickets")
                    }
                    className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="active-tab"
                        className="absolute inset-0 bg-white/20 rounded-md"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span>Range:</span>
                {[3, 6, 12].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      months === m
                        ? "bg-white/30 text-white font-medium"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <div className="flex h-96 items-center justify-center text-neutral-400">
                Loading financial data...
              </div>
            ) : (
              <>
                {activeTab === "overview" && (
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
                    <KpiCard
                      title="Total Revenue"
                      value={revenue}
                      icon={Wallet}
                      trend={monthly.growth}
                      sparkline={monthly.values}
                    />
                    <KpiCard
                      title="Total Profit"
                      value={profit}
                      icon={Banknote}
                      color="text-green-400"
                    />
                    <KpiCard
                      title="Total Cost"
                      value={cost}
                      icon={ReceiptText}
                      color="text-amber-400"
                    />
                    <KpiCard
                      title="Outstanding"
                      value={outstanding}
                      icon={AlertCircle}
                      color="text-red-400"
                    />

                    <div className="lg:col-span-2">
                      <div className="rounded-2xl bg-white dark:bg-slate-950  shadow-md p-5">
                        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <BarChart3 className="h-4 w-4" />
                          Revenue Trend
                        </div>
                        <BarChart
                          data={monthly.values}
                          labels={monthly.labels}
                          color="bg-cyan-500/70"
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-slate-950 shadow-md p-5">
                      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <PieChart className="h-4 w-4" />
                        Revenue Mix
                      </div>
                      <div className="flex flex-col items-center justify-center gap-4">
                        <DonutChart
                          values={[tRevenue, vRevenue]}
                          colors={["#22d3ee", "#f59e0b"]}
                        />
                        <div className="flex flex-col gap-1 text-xs text-neutral-300">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#22d3ee]" />
                            Tickets: ${money(tRevenue)}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                            Pilgrims: ${money(vRevenue)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-slate-950 shadow-md p-5">
                      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        Recent Invoices
                      </div>
                      <DataTable
                        rows={recentInvoices}
                        columns={[
                          {
                            key: "invoice_number",
                            title: "Invoice",
                            render: (r) => (
                              <span className="font-mono text-xs text-muted-foreground">
                                #{r.invoice_number}
                              </span>
                            ),
                          },
                          {
                            key: "status",
                            title: "Status",
                            render: (r) => (
                              <span
                                className={`text-xs font-medium ${
                                  isPaid(r.status)
                                    ? "text-green-400"
                                    : "text-amber-400"
                                }`}
                              >
                                {r.status}
                              </span>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
