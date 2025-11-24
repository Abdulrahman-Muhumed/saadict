"use client";

import { useEffect, useMemo, useState } from "react";
import { Users, Wallet, Banknote, ReceiptText, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { brand } from "@/components/config/brand";

type PilgrimRow = {
  id: number;
  full_name: string | null;
  charged_amount: number | null;
  visa_cost: number | null;
  pkg_cost: number | null;
  payment_status: string | null;
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

const isPaid = (s: string | null | undefined) =>
  (s || "").toLowerCase() === "paid";

const pilgrimCost = (p: PilgrimRow) =>
  Number(p.visa_cost || 0) + Number(p.pkg_cost || 0);

const pilgrimProfit = (p: PilgrimRow) =>
  Number(p.charged_amount || 0) - pilgrimCost(p);

export function FinancePilgrimsTab({ months }: Props) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<PilgrimRow[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("pilgrims")
        .select(
          "id, full_name, charged_amount, visa_cost, pkg_cost, payment_status, created_at"
        )
        .order("created_at", { ascending: false })
        .limit(5000);

      if (!alive) return;
      setRows(data || []);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [supabase]);

  const pilgrimsR = useMemo(
    () => rows.filter((p) => inRange(p.created_at, months)),
    [rows, months]
  );

  const paidPilgrims = useMemo(
    () => pilgrimsR.filter((p) => isPaid(p.payment_status)),
    [pilgrimsR]
  );
  const unpaidPilgrims = useMemo(
    () => pilgrimsR.filter((p) => !isPaid(p.payment_status)),
    [pilgrimsR]
  );

  const vRevenue = useMemo(
    () =>
      paidPilgrims.reduce(
        (sum, p) => sum + Number(p.charged_amount || 0),
        0
      ),
    [paidPilgrims]
  );
  const vCost = useMemo(
    () => paidPilgrims.reduce((sum, p) => sum + pilgrimCost(p), 0),
    [paidPilgrims]
  );
  const vProfit = useMemo(
    () => paidPilgrims.reduce((sum, p) => sum + pilgrimProfit(p), 0),
    [paidPilgrims]
  );
  const vOutstanding = useMemo(
    () =>
      unpaidPilgrims.reduce(
        (sum, p) => sum + Number(p.charged_amount || 0),
        0
      ),
    [unpaidPilgrims]
  );

  return (
    <div className="space-y-5">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard
          title="Pilgrim Revenue"
          value={money(vRevenue)}
          icon={<Wallet className="w-6 h-6" />}
        />
        <KpiCard
          title="Pilgrim Profit"
          value={money(vProfit)}
          icon={<Banknote className="w-6 h-6" />}
          tone="green"
        />
        <KpiCard
          title="Pilgrim Cost"
          value={money(vCost)}
          icon={<ReceiptText className="w-6 h-6" />}
          tone="amber"
        />
        <KpiCard
          title="Outstanding"
          value={money(vOutstanding)}
          icon={<AlertCircle className="w-6 h-6" />}
          tone="red"
        />
      </div>

      {/* Recent pilgrims table */}
      <Card className="border border-slate-200/70 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-sm">
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Users className="h-4 w-4" />
            <span>Recent Pilgrims (in range)</span>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Showing {Math.min(10, pilgrimsR.length)} of {pilgrimsR.length}
          </span>
        </div>
        <div className="px-4 pb-4">
          {loading ? (
            <div className="text-xs text-slate-500 dark:text-slate-400 py-6 text-center">
              Loading pilgrim financials…
            </div>
          ) : pilgrimsR.length === 0 ? (
            <div className="text-xs text-slate-500 dark:text-slate-400 py-6 text-center">
              No pilgrims in this range.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-neutral-800 text-left text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    <th className="py-2 pr-3">Name</th>
                    <th className="py-2 pr-3">Charged</th>
                    <th className="py-2 pr-3">Cost</th>
                    <th className="py-2 pr-3">Profit</th>
                    <th className="py-2 pr-3">Status</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pilgrimsR.slice(0, 10).map((p) => {
                    const profit = pilgrimProfit(p);
                    return (
                      <tr
                        key={p.id}
                        className="border-b border-slate-100 dark:border-neutral-800/80 last:border-b-0"
                      >
                        <td className="py-2 pr-3 whitespace-nowrap">
                          <div className="font-medium text-slate-800 dark:text-slate-100">
                            {p.full_name || "—"}
                          </div>
                        </td>
                        <td className="py-2 pr-3 font-mono text-[11px]">
                          ${money(p.charged_amount)}
                        </td>
                        <td className="py-2 pr-3 font-mono text-[11px]">
                          ${money(pilgrimCost(p))}
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
                        <td className="py-2 pr-3">
                          <StatusBadge
                            tone={
                              isPaid(p.payment_status)
                                ? "emerald"
                                : p.payment_status?.toLowerCase() ===
                                  "partial"
                                ? "blue"
                                : "amber"
                            }
                          >
                            {p.payment_status || "—"}
                          </StatusBadge>
                        </td>
                        <td className="py-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                          {fmtD(p.created_at)}
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

/* Small KPI + Status helpers */

function KpiCard({
  title,
  value,
  icon,
  tone,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  tone?: "green" | "red" | "amber";
}) {
  const toneClass =
    tone === "green"
      ? "from-emerald-500/90 to-emerald-600/90"
      : tone === "red"
      ? "from-red-500/90 to-red-600/90"
      : tone === "amber"
      ? "from-amber-500/90 to-amber-600/90"
      : "";

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
  tone: "emerald" | "amber" | "blue";
  children: React.ReactNode;
}) {
  const map: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    blue: "bg-sky-500/10 text-sky-400 border-sky-500/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
}
