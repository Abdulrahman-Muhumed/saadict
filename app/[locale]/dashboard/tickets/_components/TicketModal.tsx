"use client";

export default function TicketModal({
  row,
  onClose,
}: {
  row: any;
  onClose: () => void;
}) {
  if (!row) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose} // closes when clicking the backdrop only
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent backdrop close when clicking content
        className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 
        bg-white dark:bg-neutral-950 shadow-2xl transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Ticket Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 dark:border-slate-700 
            bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 
            hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 text-slate-700 dark:text-slate-300">
          <div className="mb-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Passenger</p>
            <p className="text-lg font-medium">{row.full_name}</p>
          </div>

          <div className="mb-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Route</p>
            <p className="font-mono text-sm">
              {row.from_airport} → {row.to_airport}
            </p>
          </div>

          <div className="mb-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Price</p>
            <p className="font-medium">
              {row.currency || "USD"} {Number(row.price || 0).toLocaleString()}
            </p>
          </div>

          <div className="mb-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Payment</p>
            <p
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${
                row.paid
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800"
                  : "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-800"
              }`}
            >
              {row.paid ? "Paid" : "Unpaid"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 dark:border-slate-800 px-6 py-3 bg-slate-50 dark:bg-neutral-900/80">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
