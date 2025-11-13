"use client";

import { createClient } from "@supabase/supabase-js";

/* -------------------------------------------------------------------------- */
/* 🧩 Supabase Client                                                         */
/* -------------------------------------------------------------------------- */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* -------------------------------------------------------------------------- */
/* ⚙️ Constants                                                               */
/* -------------------------------------------------------------------------- */
export const PAGE_SIZE = 12;

export const CURRENCIES = ["USD", "SAR", "AED", "EUR"];

export const PAID_FILTERS = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "unpaid", label: "Unpaid" },
];

/* -------------------------------------------------------------------------- */
/* 🎨 Brand Colors                                                            */
/* -------------------------------------------------------------------------- */
export const headerA = "#241c72";
export const headerB = "#0b1020";

/* -------------------------------------------------------------------------- */
/* 💵 Utilities                                                               */
/* -------------------------------------------------------------------------- */

/** Format number to currency style (e.g. 1,234.00) */
export function money(value?: number | string): string {
  const n = Number(value || 0);
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Short, clean date format */
export function fmtDate(date?: string | Date): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Helper to toggle sort direction */
export function nextSort(current: { col: string; dir: "asc" | "desc" }, col: string) {
  return current.col === col
    ? { col, dir: current.dir === "asc" ? "desc" : "asc" }
    : { col, dir: "desc" };
}

/** IATA format validator */
export function isIataCode(v: string): boolean {
  return /^[A-Z]{3}$/.test(v.trim().toUpperCase());
}

/* -------------------------------------------------------------------------- */
/* 🧾 Types (optional but helpful for consistency)                            */
/* -------------------------------------------------------------------------- */
export type Ticket = {
  id: string;
  full_name: string;
  passport_number: string;
  from_airport: string;
  to_airport: string;
  cost: number;
  price: number;
  currency: string;
  paid: boolean;
  reference?: string | null;
  notes?: string | null;
  pilgrim_id?: string | null;
  created_at?: string;
  pilgrim?: {
    id: string;
    full_name: string;
    passport_number?: string;
    city?: string;
  } | null;
};

export type SortState = {
  col: string;
  dir: "asc" | "desc";
};
