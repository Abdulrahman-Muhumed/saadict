// app/(dashboard)/dashboard/housing/[id]/page.tsx
"use client";

import { createClient } from "@/lib/supabase/client";
import BookingHousingPage from "./BookingHousingPage";
import { useParams } from "next/navigation";

export default async function Page() {

    const supabase = createClient();

    const params = useParams();
    const bookingId = Number(params.id);

    // Load booking
    const { data: booking, error: bookingErr } = await supabase
        .from("bookings")
        .select("id, code, name, trip_id")
        .eq("id", bookingId)
        .single();

    if (bookingErr || !booking) {
        return <div className="p-6 text-red-500">Booking not found.</div>;
    }

    // Load pilgrims in the booking
    const { data: travelers } = await supabase
        .from("booking_travelers")
        .select(`
      id,
      pilgrim_id,
      pilgrims ( full_name, passport_number, nationality )
    `)
        .eq("booking_id", bookingId);

    // Load trip hotels (Madina, Makkah…)
    const { data: tripHotels } = await supabase
        .from("trip_hotels")
        .select(`
      id,
      city,
      nights,
      hotel:hotels(name, city)
    `)
        .eq("trip_id", booking.trip_id);

    return (
        <BookingHousingPage
            booking={booking}
            travelers={travelers || []}
            tripHotels={tripHotels || []}
        />
    );
}
