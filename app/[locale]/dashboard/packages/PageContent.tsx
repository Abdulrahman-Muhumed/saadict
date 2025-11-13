"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import { Loader2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { brand } from "@/components/config/brand";


import PackagesTable from "./_components/PackagesTable";
import GroupsTable from "./_components/GroupsTable";
import PackageFormDrawer from "./_components/PackageFormDrawer";
import GroupFormDrawer from "./_components/GroupFormDrawer";
import ConfirmModal from "./_components/ConfirmModal";
import TabPill from "./_components/TabPill";

type Status = "draft" | "published" | "archived";

interface PackageRow {
    id: string;
    created_at: string | null;
    title: string;
    description: string | null;
    base_price: number | null;
    currency: string | null;
    days: number | null;
    is_active: boolean | null;
    status: Status;
}

interface GroupPackageRow {
    id: string;
    created_at: string | null;
    start_date: string | null;
    end_date: string | null;
    city_from: string | null;
    price_override: number | null;
    status: Status;
}

const PAGE_SIZE = 10;

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default function PageContent() {
    const [tab, setTab] = useState<"packages" | "groups">("packages");

    // ─────────────────────────────────────────────────────────────────────────────
    // State — Packages
    // ─────────────────────────────────────────────────────────────────────────────
    const [pkgRows, setPkgRows] = useState<PackageRow[]>([]);
    const [pkgCount, setPkgCount] = useState(0);
    const [pkgPage, setPkgPage] = useState(1);
    const [pkgSort, setPkgSort] = useState({ col: "created_at", dir: "desc" as "asc" | "desc" });
    const [pkgQ, setPkgQ] = useState("");
    const [pkgLoading, setPkgLoading] = useState(true);
    const [pkgErr, setPkgErr] = useState<string | null>(null);
    const [pkgDrawer, setPkgDrawer] = useState<{ open: boolean; row?: PackageRow }>({ open: false });

    // ─────────────────────────────────────────────────────────────────────────────
    // State — Groups
    // ─────────────────────────────────────────────────────────────────────────────
    const [grpRows, setGrpRows] = useState<GroupPackageRow[]>([]);
    const [grpCount, setGrpCount] = useState(0);
    const [grpPage, setGrpPage] = useState(1);
    const [grpSort, setGrpSort] = useState({ col: "created_at", dir: "desc" as "asc" | "desc" });
    const [grpQ, setGrpQ] = useState("");
    const [grpLoading, setGrpLoading] = useState(true);
    const [grpErr, setGrpErr] = useState<string | null>(null);
    const [grpDrawer, setGrpDrawer] = useState<{ open: boolean; row?: GroupPackageRow }>({ open: false });

    // ─────────────────────────────────────────────────────────────────────────────
    // Confirm Modal
    // ─────────────────────────────────────────────────────────────────────────────
    const [confirm, setConfirm] = useState<{
        open: boolean;
        title?: string;
        body?: string;
        busy?: boolean;
        onConfirm?: () => Promise<void> | void;
    }>({ open: false });

    // ─────────────────────────────────────────────────────────────────────────────
    // Fetch Packages
    // ─────────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        let active = true;
        (async () => {
            setPkgLoading(true);
            setPkgErr(null);
            const from = (pkgPage - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("packages")
                .select("*", { count: "exact" })
                .order(pkgSort.col, { ascending: pkgSort.dir === "asc" })
                .range(from, to);

            if (pkgQ.trim()) {
                query = query.or(`title.ilike.%${pkgQ}%,description.ilike.%${pkgQ}%`);
            }

            const { data, error, count } = await query;
            if (!active) return;

            if (error) setPkgErr(error.message);
            setPkgRows(data || []);
            setPkgCount(count || 0);
            setPkgLoading(false);
        })();
        return () => {
            active = false;
        };
    }, [pkgPage, pkgSort, pkgQ]);

    // ─────────────────────────────────────────────────────────────────────────────
    // Fetch Groups
    // ─────────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        let active = true;
        (async () => {
            setGrpLoading(true);
            setGrpErr(null);
            const from = (grpPage - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("group_packages")
                .select("*", { count: "exact" })
                .order(grpSort.col, { ascending: grpSort.dir === "asc" })
                .range(from, to);

            if (grpQ.trim()) {
                query = query.or(`city_from.ilike.%${grpQ}%`);
            }

            const { data, error, count } = await query;
            if (!active) return;

            if (error) setGrpErr(error.message);
            setGrpRows(data || []);
            setGrpCount(count || 0);
            setGrpLoading(false);
        })();
        return () => {
            active = false;
        };
    }, [grpPage, grpSort, grpQ]);

    // ─────────────────────────────────────────────────────────────────────────────
    // Pagination
    // ─────────────────────────────────────────────────────────────────────────────
    const pkgTotalPages = useMemo(() => Math.max(1, Math.ceil(pkgCount / PAGE_SIZE)), [pkgCount]);
    const grpTotalPages = useMemo(() => Math.max(1, Math.ceil(grpCount / PAGE_SIZE)), [grpCount]);

    // ─────────────────────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────────────────────
    return (
        <div >
            {/* Header Controls */}
            <div
                className="overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 text-white shadow-xl"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
                }}
            >
                <div className="p-5 md:p-7 lg:p-8">
                    {/* Header Title + Action */}
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Packages</h1>
                            <p className="mt-1 text-sm text-white/80">
                                Manage Umrah & Hajj packages, pricing, and upcoming groups.
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                tab === "packages"
                                    ? setPkgDrawer({ open: true })
                                    : setGrpDrawer({ open: true })
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white/90"
                        >
                            <Plus className="h-4 w-4" />
                            {tab === "packages" ? "Add Package" : "Add Group"}
                        </button>
                    </div>

                    {/* Search + Tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <input
                                placeholder={
                                    tab === "packages"
                                        ? "Search title, description…"
                                        : "Search city, status…"
                                }
                                className="w-72 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/70 outline-none focus:bg-white/15"
                                value={tab === "packages" ? pkgQ : grpQ}
                                onChange={(e) =>
                                    tab === "packages"
                                        ? (setPkgQ(e.target.value), setPkgPage(1))
                                        : (setGrpQ(e.target.value), setGrpPage(1))
                                }
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <TabPill active={tab === "packages"} onClick={() => setTab("packages")}>
                                Packages
                            </TabPill>
                            <TabPill active={tab === "groups"} onClick={() => setTab("groups")}>
                                Upcoming Groups
                            </TabPill>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {(pkgErr && tab === "packages") || (grpErr && tab === "groups") ? (
                        <div className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-100">
                            {tab === "packages" ? pkgErr : grpErr}
                        </div>
                    ) : null}
                </div>
            </div>
            {/* Data Table */}
            <div className="overflow-hidden mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm dark:bg-neutral-900 dark:border-white/10">
                {tab === "packages" ? (
                    <PackagesTable
                        rows={pkgRows}
                        loading={pkgLoading}
                        requestEdit={(r) => setPkgDrawer({ open: true, row: r })}
                        requestDelete={(r) =>
                            setConfirm({
                                open: true,
                                title: "Delete Package?",
                                body: `This will permanently remove “${r.title}”.`,
                                onConfirm: async () => {
                                    setConfirm((c) => ({ ...c, busy: true }));
                                    await supabase.from("packages").delete().eq("id", r.id);
                                    setPkgRows((rows) => rows.filter((x) => x.id !== r.id));
                                    setConfirm({ open: false });
                                },
                            })
                        }
                    />
                ) : (
                    <GroupsTable
                        rows={grpRows}
                        loading={grpLoading}
                        requestEdit={(r) => setGrpDrawer({ open: true, row: r })}
                        requestDelete={(r) =>
                            setConfirm({
                                open: true,
                                title: "Delete Group?",
                                body: `This will permanently delete the group from ${r.city_from || "—"}.`,
                                onConfirm: async () => {
                                    setConfirm((c) => ({ ...c, busy: true }));
                                    await supabase.from("group_packages").delete().eq("id", r.id);
                                    setGrpRows((rows) => rows.filter((x) => x.id !== r.id));
                                    setConfirm({ open: false });
                                },
                            })
                        }
                    />
                )}

                {/* Pagination */}
                {(tab === "packages" ? pkgTotalPages : grpTotalPages) > 1 && (
                    <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:bg-neutral-800 dark:border-white/10">
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                            {tab === "packages"
                                ? `Showing ${(pkgPage - 1) * PAGE_SIZE + 1}–${Math.min(pkgPage * PAGE_SIZE, pkgCount)} of ${pkgCount}`
                                : `Showing ${(grpPage - 1) * PAGE_SIZE + 1}–${Math.min(grpPage * PAGE_SIZE, grpCount)} of ${grpCount}`}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    tab === "packages"
                                        ? setPkgPage((p) => Math.max(1, p - 1))
                                        : setGrpPage((p) => Math.max(1, p - 1))
                                }
                                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50 dark:bg-neutral-900 dark:border-white/10"
                            >
                                <ChevronLeft className="h-4 w-4" /> Prev
                            </button>
                            <span className="text-sm">
                                Page {tab === "packages" ? pkgPage : grpPage} /{" "}
                                {tab === "packages" ? pkgTotalPages : grpTotalPages}
                            </span>
                            <button
                                onClick={() =>
                                    tab === "packages"
                                        ? setPkgPage((p) => Math.min(pkgTotalPages, p + 1))
                                        : setGrpPage((p) => Math.min(grpTotalPages, p + 1))
                                }
                                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50 dark:bg-neutral-900 dark:border-white/10"
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Drawers */}
            {pkgDrawer.open && (
                <PackageFormDrawer onClose={() => setPkgDrawer({ open: false })} row={pkgDrawer.row} />
            )}
            {grpDrawer.open && (
                <GroupFormDrawer onClose={() => setGrpDrawer({ open: false })} row={grpDrawer.row} />
            )}

            {/* Confirm Modal */}
            {confirm.open && (
                <ConfirmModal
                    title={confirm.title || ""}
                    body={confirm.body || ""}
                    busy={confirm.busy}
                    onCancel={() => setConfirm({ open: false })}
                    onConfirm={confirm.onConfirm!}
                />
            )}
        </div>
    );
}
