"use client";

import { Loader2, XCircle } from "lucide-react";

type Props = {
  open: boolean;
  name: string;
  reason: string;
  submitting?: boolean;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function ReasonModal({
  open,
  name,
  reason,
  submitting,
  onChange,
  onCancel,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border/40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-2xl">
        <div className="border-b border-border/30 px-5 py-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Reject Request
          </h3>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            Requester: <span className="font-medium">{name}</span>
          </p>
        </div>

        <div className="px-5 py-4">
          <label className="block">
            <div className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">
              Reason (optional)
            </div>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Add a brief reason (optional)"
              className="w-full rounded-lg border border-border/40 bg-white/60 dark:bg-neutral-800/70 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border/30 px-5 py-3">
          <button
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg border border-border/40 bg-transparent px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            disabled={submitting}
            onClick={onSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60 transition"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing…
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" /> Reject
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
