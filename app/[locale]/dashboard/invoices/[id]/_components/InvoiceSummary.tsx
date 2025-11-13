"use client";

export default function InvoiceSummary({ invoice, lines, grand }: any) {
  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2 });

  const sub = lines.reduce(
    (a: number, l: any) => a + Number(l.qty || 0) * Number(l.unit_price || 0),
    0
  );
  const tax = Number(invoice.tax || 0);
  const discount = Number(invoice.discount || 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-xl border bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
        <div className="text-xs uppercase text-slate-500">Sub total</div>
        <div className="font-semibold mt-1 text-slate-800 dark:text-neutral-100">${fmt(sub)}</div>
      </div>
      <div className="rounded-xl border bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
        <div className="text-xs uppercase text-slate-500">Tax</div>
        <div className="font-semibold mt-1 text-slate-800 dark:text-neutral-100">${fmt(tax)}</div>
      </div>
      <div className="rounded-xl border bg-indigo-50 p-4 shadow-sm dark:bg-indigo-950/40">
        <div className="text-xs uppercase text-indigo-800 dark:text-indigo-300">Grand Total</div>
        <div className="font-bold mt-1 text-indigo-900 dark:text-indigo-200">${fmt(grand)}</div>
      </div>
    </div>
  );
}
