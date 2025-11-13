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

export default function HotelsSection({ trip }: { trip: any }) {
  const [rows, setRows] = useState<any[]>([]);
  const [hotelsCatalog, setHotelsCatalog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addHotel, setAddHotel] = useState({
    hotel_id: "",
    city: "",
    room_type: "",
    nights: "",
    cost_per_bed: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadHotels();
  }, [trip.id]);

  async function loadHotels() {
    setLoading(true);
    const { data, error } = await supabase
      .from("trip_hotels")
      .select(
        `
        id,
        trip_id,
        hotel_id,
        city,
        room_type,
        nights,
        cost_per_bed,
        hotels (name, city)
      `
      )
      .eq("trip_id", trip.id)
      .order("id", { ascending: true });

    const { data: catalog } = await supabase
      .from("hotels")
      .select("id, name, city")
      .order("name");

    if (error) setError(error.message);
    setRows(data || []);
    setHotelsCatalog(catalog || []);
    setLoading(false);
  }

  async function handleAdd(e: any) {
    e.preventDefault();
    if (!addHotel.hotel_id) return;

    setSaving(true);
    const payload = {
      trip_id: trip.id,
      hotel_id: addHotel.hotel_id,
      city: addHotel.city || null,
      room_type: addHotel.room_type || null,
      nights: addHotel.nights ? parseInt(addHotel.nights) : null,
      cost_per_bed: addHotel.cost_per_bed ? parseFloat(addHotel.cost_per_bed) : null,
    };

    const { error } = await supabase.from("trip_hotels").insert([payload]);
    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    setAddHotel({ hotel_id: "", city: "", room_type: "", nights: "", cost_per_bed: "" });
    await loadHotels();
  }

  async function handleDelete(r: any) {
    if (!confirm(`Remove hotel ${r.hotels?.name || ""}?`)) return;
    await supabase.from("trip_hotels").delete().eq("id", r.id);
    await loadHotels();
  }

  if (loading)
    return (
      <div className="p-6 flex items-center gap-2 text-slate-500">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading hotels...
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
        <h3 className="text-lg font-semibold">Linked Hotels</h3>
      </div>

      {/* Table */}
      {rows.length === 0 ? (
        <div className="p-6 text-center text-slate-500">No hotels linked yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100/70 dark:bg-neutral-800/70 border-b border-border/30">
              <tr>
                <Th>Hotel</Th>
                <Th>City</Th>
                <Th>Room Type</Th>
                <Th>Nights</Th>
                <Th>Cost/Bed</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 dark:divide-border/10">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3">{r.hotels?.name || `#${r.hotel_id}`}</td>
                  <td className="px-4 py-3">{r.city || r.hotels?.city || "—"}</td>
                  <td className="px-4 py-3">{r.room_type || "—"}</td>
                  <td className="px-4 py-3">{r.nights ?? "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {r.cost_per_bed ? `$${r.cost_per_bed}` : "—"}
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

      {/* Add Hotel Form */}
      <form onSubmit={handleAdd} className="mt-4 p-5 bg-white/70 dark:bg-neutral-900/50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4">
            <Label>Hotel</Label>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={addHotel.hotel_id}
              onChange={(e) => setAddHotel({ ...addHotel, hotel_id: e.target.value })}
              required
            >
              <option value="">Select…</option>
              {hotelsCatalog.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.city})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <Label>Room Type</Label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="e.g., Quad / Triple"
              value={addHotel.room_type}
              onChange={(e) => setAddHotel({ ...addHotel, room_type: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Nights</Label>
            <input
              type="number"
              min="0"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={addHotel.nights}
              onChange={(e) => setAddHotel({ ...addHotel, nights: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Cost/Bed</Label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={addHotel.cost_per_bed}
              onChange={(e) => setAddHotel({ ...addHotel, cost_per_bed: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} Add Hotel
          </button>
        </div>
      </form>
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

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block mb-1 text-xs font-medium text-muted-foreground">{children}</label>;
}
