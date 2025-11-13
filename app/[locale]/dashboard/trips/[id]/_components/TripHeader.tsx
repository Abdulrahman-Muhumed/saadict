"use client";

import { brand } from "@/components/config/brand";
import { Calendar as CalendarIcon, Pencil, Trash2 } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";

export default function TripHeader({
  trip,
  onEdit,
  onDelete,
}: {
  trip: any;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 text-white shadow-xl"
      style={{
        backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
      }}
    >
      <div className="px-6 py-6 md:px-8 md:py-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 opacity-80" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {trip.title}
              </h1>
            </div>
            <div className="mt-1 text-sm text-white/80">
              <span className="font-mono">
                {trip.start_date || "—"}
                {trip.end_date ? ` → ${trip.end_date}` : ""}
              </span>
              <span className="mx-2">•</span>
              <span className="capitalize">{trip.status}</span>
              {trip.season ? (
                <>
                  <span className="mx-2">•</span>
                  {trip.season}
                </>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/trips"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Back to Trips
            </Link>
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Pencil className="h-4 w-4" /> Edit
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
