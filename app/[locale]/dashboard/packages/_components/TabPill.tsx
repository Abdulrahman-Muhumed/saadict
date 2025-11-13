"use client";

type Props = {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function TabPill({ active, onClick, children }: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
        active
          ? "bg-white/20 text-white shadow-sm ring-1 ring-white/40"
          : "bg-white/10 text-white/80 hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}
