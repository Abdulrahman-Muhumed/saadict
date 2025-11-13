"use client";

export default function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {label}
      </span>
      {children}
    </label>
  );
}
