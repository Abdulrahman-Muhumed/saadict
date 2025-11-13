"use client";

import { Loader2, Trash2, X } from "lucide-react";

type Props = {
  open?: boolean;
  title: string;
  body?: string;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  open = true,
  title,
  body,
  busy,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border/40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/30 px-5 py-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <button
            onClick={onCancel}
            className="rounded-md p-1 hover:bg-slate-100 dark:hover:bg-neutral-800 transition"
          >
            <X className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <div className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">{body}</div>

        <div className="flex items-center justify-end gap-2 border-t border-border/30 px-5 py-3">
          <button
            onClick={onCancel}
            disabled={busy}
            className="rounded-lg border border-border/40 bg-transparent px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
