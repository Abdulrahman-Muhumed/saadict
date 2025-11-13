"use client";

import { Loader2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Link } from "@/lib/i18n/navigation";

type Props = {
    rows: any[];
    loading: boolean;
};

export default function PilgrimsTable({ rows, loading }: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md shadow-lg transition-colors duration-300">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    {/* Table Header */}
                    <thead className="bg-slate-100/70 dark:bg-neutral-800/70 text-slate-700 dark:text-slate-200 border-b border-border/30">
                        <tr>
                            <Th>Created</Th>
                            <Th>Full Name</Th>
                            <Th>City</Th>
                            <Th>Visa</Th>
                            <Th>Payment</Th>
                            <Th className="text-right">Actions</Th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-border/30 dark:divide-border/10 text-slate-900 dark:text-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="p-6 text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Loading...
                                    </div>
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">
                                    No pilgrims found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((p) => (
                                <tr
                                    key={p.id}
                                    className="hover:bg-slate-50/60 dark:hover:bg-neutral-800/60 transition-colors duration-150"
                                >
                                    <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">
                                        {p.created_at
                                            ? new Date(p.created_at).toLocaleDateString()
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3 font-medium">{p.full_name}</td>
                                    <td className="px-4 py-3">{p.city || "—"}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge
                                            ok={p.visa_issue_status === "issued"}
                                            text={p.visa_issue_status}
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge
                                            ok={p.payment_status === "paid"}
                                            text={p.payment_status}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={`/dashboard/pilgrims/${p.id}`}
                                            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
                                        >
                                            View Profile
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ------------------------------ Header Cell ------------------------------ */
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
