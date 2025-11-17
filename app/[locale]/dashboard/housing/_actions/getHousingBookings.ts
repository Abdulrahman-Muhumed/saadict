"use server";

import { createClient } from "@/lib/supabase/client";

export type HousingBookingRow = {
  id: string;
  code: string;
  name: string;
  status: string | null;
  trip_id: string | number | null;
  pilgrims_count: number;
};

export async function getHousingBookings(): Promise<HousingBookingRow[]> {
  const supabase = createClient();

  // 🔹 Adjust relationship/table names only if your schema is different
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      code,
      name,
      status,
      trip_id,
      booking_travelers(count)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getHousingBookings] Supabase error:", error.message);
    return [];
  }

  if (!data) return [];

  // Map nested relation -> pilgrims_count
  const mapped: HousingBookingRow[] = data.map((row: any) => ({
    id: row.id,
    code: row.code,
    name: row.name,
    status: row.status ?? null,
    trip_id: row.trip_id ?? null,
    pilgrims_count: row.booking_travelers?.[0]?.count ?? 0,
  }));

  return mapped;
}
