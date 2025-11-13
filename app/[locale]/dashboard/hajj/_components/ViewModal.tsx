"use client";

import { useEffect, useState } from "react";
import { X, Download, Eye } from "lucide-react";

export default function ViewModal({
  row,
  bucket,
  supabase,
  onClose,
}: {
  row: any;
  bucket: string;
  supabase: any;
  onClose: () => void;
}) {
  const [passportUrl, setPassportUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!row?.passport_file_key) return;
    (async () => {
      const { data } = await supabase.storage
        .from(bucket)
        .getPublicUrl(row.passport_file_key);
      if (data?.publicUrl) setPassportUrl(data.publicUrl);
    })();
  }, [row, bucket, supabase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-950 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-5 py-3">
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            Pilgrim Info
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 dark:border-slate-700 p-1.5 hover:bg-slate-50 dark:hover:bg-neutral-900 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-sm text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">
              Full Name
            </h4>
            <p className="font-medium">{row.full_name}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">
                Passport No.
              </h4>
              <p className="font-mono text-sm">{row.passport_number || "—"}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">
                Phone
              </h4>
              <p>{row.phone_number || "—"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">
                Status
              </h4>
              <p className="capitalize font-medium">{row.status}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">
                Paid / Total
              </h4>
              <p>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  ${Number(row.paid || 0).toLocaleString()}
                </span>{" "}
                / ${Number(row.total || 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Passport */}
          {passportUrl && (
            <div className="mt-4">
              <h4 className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold mb-2">
                Passport Scan
              </h4>
              <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-neutral-900">
                <img
                  src={passportUrl}
                  alt="Passport"
                  className="w-full object-contain max-h-80"
                />
                <div className="absolute right-2 top-2 flex gap-2">
                  <a
                    href={passportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/80 dark:bg-neutral-950/80 p-1.5 hover:bg-white dark:hover:bg-neutral-900"
                    title="View Full"
                  >
                    <Eye className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                  </a>
                  <a
                    href={passportUrl}
                    download
                    className="rounded-full bg-white/80 dark:bg-neutral-950/80 p-1.5 hover:bg-white dark:hover:bg-neutral-900"
                    title="Download"
                  >
                    <Download className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
