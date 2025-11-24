"use client";

import { useEffect, useMemo, useState } from "react";
import { Ticket as TicketIcon, Wallet, Banknote, ReceiptText, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { brand } from "@/components/config/brand";

type TicketRow = {
  id: number;
  price: number | null;
  cost: number | null;
  paid: boolean | null;
  created_at: string | null;
};

type Props = {
  months: number;
};

const PRIMARY = brand.colors.primary;
const ACCENT = brand.colors.accent;

const money = (v: unknown) =>
  Number(v || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const fmtD = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString() : "—";

const inRange = (iso: string | null, nMonths: number) => {
  if (!iso) return false;
  const d = new Date(iso);
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  start.setMonth(start.getMonth() - (nMonths - 1));
  return d >= start;
};

export function FinanceTicketsTab({ months }: Props) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<TicketRow[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("tickets")
        .select("id, price, cost, paid, created_at")
        .order("created_at", { ascending: false })
        .limit(2000);

      if (!alive) return;
      setRows(data || []);
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, [supabase]);

  const ticketsR = useMemo(
    () => rows.filter((t) => inRange(t.created_at, months)),
    [rows, months]
  );

  const paidTickets = useMemo(
    () => ticketsR.filter((t) => !!t.paid),
    [ticketsR]
  );
  const unpaidTickets = useMemo(
    () => ticketsR.filter((t) => !t.paid),
    [ticketsR]
  );

  const tRevenue = useMemo(
    () => paidTickets.reduce((sum, t) => sum + Number(t.price || 0), 0),
    [paidTickets]
  );
  const tCost = useMemo(
    () => paidTickets.reduce((sum, t) => sum + Number(t.cost || 0), 0),
    [paidTickets]
  );
  const tProfit = tRevenue - tCost;
  const tOutstanding = useMemo(
    () => unpaidTickets.reduce((sum, t) => sum + Number(t.price || 0), 0),
    [unpaidTickets]
  );

  return (
    <div className="space-y-5">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard
          title="Ticket Revenue"
          value={money(tRevenue)}
          icon={<Wallet className="w-6 h-6" />}
          tone="cyan"
        />
        <KpiCard
          title="Ticket Profit"
          value={money(tProfit)}
          icon={<Banknote className="w-6 h-6" />}
          tone="green"
        />
        <KpiCard
          title="Ticket Cost"
          value={money(tCost)}
          icon={<ReceiptText className="w-6 h-6" />}
          tone="amber"
        />
        <KpiCard
          title="Outstanding"
          value={money(tOutstanding)}
          icon={<AlertCircle className="w-6 h-6" />}
          tone="red"
        />
      </div>

      {/* Recent tickets table */}
      <Card className="border border-slate-200/70 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-sm">
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <TicketIcon className="h-4 w-4" />
            <span>Recent Tickets (in range)</span>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Showing {Math.min(10, ticketsR.length)} of {ticketsR.length}
          </span>
        </div>
        <div className="px-4 pb-4">
          {loading ? (
            <div className="text-xs text-slate-500 dark:text-slate-400 py-6 text-center">
              Loading ticket financials…
            </div>
          ) : ticketsR.length === 0 ? (
            <div className="text-xs text-slate-500 dark:text-slate-400 py-6 text-center">
              No tickets in this range.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-neutral-800 text-left text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    <th className="py-2 pr-3">Date</th>
                    <th className="py-2 pr-3">Price</th>
                    <th className="py-2 pr-3">Cost</th>
                    <th className="py-2 pr-3">Profit</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketsR.slice(0, 10).map((t) => {
                    const profit =
                      Number(t.price || 0) - Number(t.cost || 0);
                    return (
                      <tr
                        key={t.id}
                        className="border-b border-slate-100 dark:border-neutral-800/80 last:border-b-0"
                      >
                        <td className="py-2 pr-3 font-mono text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {fmtD(t.created_at)}
                        </td>
                        <td className="py-2 pr-3 font-mono text-[11px]">
                          ${money(t.price)}
                        </td>
                        <td className="py-2 pr-3 font-mono text-[11px]">
                          ${money(t.cost)}
                        </td>
                        <td
                          className={`py-2 pr-3 font-mono text-[11px] ${
                            profit >= 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          ${money(profit)}
                        </td>
                        <td className="py-2">
                          <StatusBadge tone={t.paid ? "emerald" : "amber"}>
                            {t.paid ? "Paid" : "Unpaid"}
                          </StatusBadge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function KpiCard({
  title,
  value,
  icon,
  tone,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  tone?: "cyan" | "green" | "amber" | "red";
}) {
  const toneMap: Record<string, string> = {
    cyan: "from-cyan-500/90 to-cyan-600/90",
    green: "from-emerald-500/90 to-emerald-600/90",
    amber: "from-amber-500/90 to-amber-600/90",
    red: "from-red-500/90 to-red-600/90",
  };

  const toneClass = tone ? toneMap[tone] : "";

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-4 text-white shadow-lg border border-white/10"
      style={{
        background: toneClass
          ? undefined
          : `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
      }}
    >
      {toneClass && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${toneClass}`}
        />
      )}
      <div className="relative flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-wide opacity-80">
            {title}
          </p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className="p-2 rounded-xl bg-black/15 backdrop-blur-sm">
          {icon}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    </div>
  );
}

function StatusBadge({
  tone,
  children,
}: {
  tone: "emerald" | "amber";
  children: React.ReactNode;
}) {
  const map: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
}
