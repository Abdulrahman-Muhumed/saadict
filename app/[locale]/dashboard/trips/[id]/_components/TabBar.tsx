"use client";

export default function TabBar({
  active,
  onChange,
  tabs,
}: {
  active: string;
  onChange: (key: string) => void;
  tabs: { key: string; label: string }[];
}) {
  return (
    <div className="inline-flex rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md p-1 shadow-sm">
      {tabs.map((t) => {
        const selected = t.key === active;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
              selected
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
