"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { brand } from "@/components/config/brand";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PRIMARY = brand.colors.primary;
const ACCENT = brand.colors.accent;

export default function FlightsSection({ trip }: { trip: any }) {
    const [rows, setRows] = useState<any[]>([]);
    const [flightsCatalog, setFlightsCatalog] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [addFlight, setAddFlight] = useState({
        flight_id: "",
        segment: "outbound",
        class: "",
        cost_per_seat: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadFlights();
    }, [trip.id]);

    async function loadFlights() {
        setLoading(true);
        const { data, error } = await supabase
            .from("trip_flights")
            .select(
                `
        id,
        trip_id,
        flight_id,
        segment,
        class,
        cost_per_seat,
        flights (
          airline,
          flight_number,
          departure_airport,
          arrival_airport,
          departure_time,
          arrival_time
        )
      `
            )
            .eq("trip_id", trip.id)
            .order("id", { ascending: true });

        const { data: catalog } = await supabase
            .from("flights")
            .select("id, airline, flight_number, departure_airport, arrival_airport, departure_time, arrival_time")
            .order("airline");

        if (error) setError(error.message);
        setRows(data || []);
        setFlightsCatalog(catalog || []);
        setLoading(false);
    }

    async function handleAdd(e: any) {
        e.preventDefault();
        if (!addFlight.flight_id) return;

        setSaving(true);
        const payload = {
            trip_id: trip.id,
            flight_id: addFlight.flight_id,
            segment: addFlight.segment,
            class: addFlight.class || null,
            cost_per_seat: addFlight.cost_per_seat ? parseFloat(addFlight.cost_per_seat) : null,
        };

        const { error } = await supabase.from("trip_flights").insert([payload]);
        setSaving(false);

        if (error) {
            alert(error.message);
            return;
        }

        setAddFlight({ flight_id: "", segment: "outbound", class: "", cost_per_seat: "" });
        await loadFlights();
    }

    async function handleDelete(r: any) {
        if (!confirm(`Remove flight ${r.flights?.flight_number || ""}?`)) return;
        await supabase.from("trip_flights").delete().eq("id", r.id);
        await loadFlights();
    }

    if (loading)
        return (
            <div className="p-6 flex items-center gap-2 text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading flights...
            </div>
        );

    if (error)
        return (
            <div className="p-6 text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {error}
            </div>
        );

    return (
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md shadow-lg">
            <div
                className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10"
                style={{ background: `linear-gradient(90deg, ${PRIMARY}15, ${ACCENT}25)` }}
            >
                <h3 className="text-lg font-semibold">Linked Flights</h3>
            </div>

            {/* Table */}
            {rows.length === 0 ? (
                <div className="p-6 text-center text-slate-500">No flights linked yet.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100/70 dark:bg-neutral-800/70 border-b border-border/30">
                            <tr>
                                <Th>Flight</Th>
                                <Th>Segment</Th>
                                <Th>Class</Th>
                                <Th>Cost/Seat</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30 dark:divide-border/10">
                            {rows.map((r) => (
                                <tr key={r.id}>
                                    <td className="px-4 py-3">
                                        {r.flights
                                            ? `${r.flights.airline || ""} ${r.flights.flight_number || ""} (${r.flights.departure_airport} → ${r.flights.arrival_airport})`
                                            : `#${r.flight_id}`}
                                    </td>
                                    <td className="px-4 py-3">{r.segment}</td>
                                    <td className="px-4 py-3">{r.class || "—"}</td>
                                    <td className="px-4 py-3 font-mono text-xs">
                                        {r.cost_per_seat ? `$${r.cost_per_seat}` : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => handleDelete(r)}
                                            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="h-4 w-4" /> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Flight Form */}
            <form onSubmit={handleAdd} className="mt-4 border-t border-slate-200/60 p-5 bg-white/70 dark:bg-neutral-900/50">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-5">
                        <Label>Flight</Label>
                        <select
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                            value={addFlight.flight_id}
                            onChange={(e) => setAddFlight({ ...addFlight, flight_id: e.target.value })}
                            required
                        >
                            <option value="">Select…</option>
                            {flightsCatalog.map((f) => (
                                <option key={f.id} value={f.id}>
                                    {f.airline} {f.flight_number} — {f.departure_airport} → {f.arrival_airport}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-3">
                        <Label>Segment</Label>
                        <select
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                            value={addFlight.segment}
                            onChange={(e) => setAddFlight({ ...addFlight, segment: e.target.value })}
                        >
                            <option value="outbound">Outbound</option>
                            <option value="return">Return</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <Label>Class</Label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                            placeholder="e.g., Y / J"
                            value={addFlight.class}
                            onChange={(e) => setAddFlight({ ...addFlight, class: e.target.value })}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Label>Cost/Seat</Label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                            value={addFlight.cost_per_seat}
                            onChange={(e) => setAddFlight({ ...addFlight, cost_per_seat: e.target.value })}
                        />
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                    >
                        {saving && <Loader2 className="h-4 w-4 animate-spin" />} Add Flight
                    </button>
                </div>
            </form>
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
        <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${className}`}>
            {children}
        </th>
    );
}

function Label({ children }: { children: React.ReactNode }) {
    return (
        <label className="block mb-1 text-xs font-medium text-muted-foreground">{children}</label>
    );
}
