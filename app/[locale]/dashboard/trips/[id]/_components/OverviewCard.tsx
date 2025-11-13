"use client";

export default function OverviewCard({ trip }: { trip: any }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md shadow-lg">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Trip Overview</h2>

        <dl className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-200">Title</dt>
            <dd className="text-slate-600 dark:text-slate-400">{trip.title || "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-200">Season</dt>
            <dd className="text-slate-600 dark:text-slate-400">{trip.season || "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-200">Status</dt>
            <dd className="capitalize text-slate-600 dark:text-slate-400">{trip.status}</dd>
          </div>

          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-200">Start Date</dt>
            <dd className="text-slate-600 dark:text-slate-400">{trip.start_date || "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-200">End Date</dt>
            <dd className="text-slate-600 dark:text-slate-400">{trip.end_date || "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-200">Created</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              {trip.created_at
                ? new Date(trip.created_at).toLocaleDateString()
                : "—"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
