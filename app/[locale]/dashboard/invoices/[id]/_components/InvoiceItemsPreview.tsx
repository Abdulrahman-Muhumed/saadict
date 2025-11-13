"use client";

export default function InvoiceItemsPreview({ lines }: { lines: any[] }) {
  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2 });

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
      <h3 className="text-sm font-semibold mb-2">Items</h3>
      {lines.length === 0 ? (
        <div className="text-center text-xs text-slate-400 py-6">No items</div>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-slate-600 dark:text-neutral-400 text-xs border-b border-slate-200 dark:border-neutral-800">
              <th className="py-2 text-left">Item</th>
              <th className="py-2 text-right">Qty</th>
              <th className="py-2 text-right">Unit Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.id} className="border-b border-slate-100 dark:border-neutral-800">
                <td className="py-2">{l.item_name}</td>
                <td className="py-2 text-right">{l.qty}</td>
                <td className="py-2 text-right">${fmt(l.unit_price)}</td>
                <td className="py-2 text-right font-medium">
                  ${fmt((l.qty || 0) * (l.unit_price || 0))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
