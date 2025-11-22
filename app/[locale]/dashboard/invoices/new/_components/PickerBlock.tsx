"use client";

import { Search, Loader2 } from "lucide-react";

export default function PickerBlock({
    label,
    helper,
    query,
    setQuery,
    loading,
    results,
    renderItem,
    onSelect,
}: {
    label: string;
    helper?: string;
    query: string;
    setQuery: (term: string) => void;
    loading: boolean;
    results: any[];
    renderItem: (row: any) => React.ReactNode;
    onSelect: (row: any) => void;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-slate-700">{label}</div>
                {helper && <div className="text-[11px] text-slate-500">{helper}</div>}
            </div>

            <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                    className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm"
                    placeholder="Type to search…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {loading && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Loader2 className="h-3 w-3 animate-spin" /> Searching…
                </div>
            )}

            {results.length > 0 && (
                <ul className="max-h-56 overflow-y-auto divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
                    {results.map((r: any) => (
                        <li
                            key={r.id}
                            className="flex items-center justify-between px-3 py-2 hover:bg-slate-50"
                        >
                            <div className="min-w-0 pr-2">{renderItem(r)}</div>

                            <button
                                type="button"
                                onClick={() => onSelect(r)}
                                className="rounded-lg bg-[var(--hg-indigo,#241c72)] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-indigo-800"
                            >
                                Select
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
