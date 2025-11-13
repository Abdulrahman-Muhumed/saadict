"use client";

import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image as PdfImage,
} from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { createClient } from "@supabase/supabase-js";




/* ──────────────────────────────────────────────────────────────
   Supabase (client-side anon — same as list page)
────────────────────────────────────────────────────────────── */
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ──────────────────────────────────────────────────────────────
   Brand
────────────────────────────────────────────────────────────── */
const BRAND = {
    primary: "#241c72", // Hoggaan deep indigo
    accent: "#F99417", // Hoggaan warm neon orange
    secondary: "#0b1020", // deep night
    text: "#334155",
    lightText: "#64748B",
    bg: "#FFFFFF",
    border: "#E2E8F0",
};

/* ──────────────────────────────────────────────────────────────
   Helpers
────────────────────────────────────────────────────────────── */
const fmtDT = (v?: string | Date | null) =>
    v ? format(new Date(v), "dd MMM yyyy HH:mm") : "-";
const fmtD = (v?: string | Date | null) =>
    v ? format(new Date(v), "dd MMM yyyy") : "-";
const fmtTime = (v?: string | Date | null) =>
    v ? format(new Date(v), "HH:mm") : "-";

/* ──────────────────────────────────────────────────────────────
   Styles
────────────────────────────────────────────────────────────── */
const S = StyleSheet.create({
    page: {
        padding: 45,
        fontSize: 10,
        fontFamily: "Helvetica",
        color: BRAND.text,
        backgroundColor: BRAND.bg,
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
        marginTop: 10,
        color: BRAND.secondary,
        textTransform: "uppercase",
    },

    sectionTitle: {
        fontSize: 14,
        marginTop: 25,
        marginBottom: 8,
        fontWeight: 900,
        color: BRAND.accent,
        borderBottomWidth: 2,
        borderBottomColor: BRAND.border,
        paddingBottom: 4,
    },

    small: { fontSize: 9, color: BRAND.lightText },

    table: { marginTop: 10, borderTopWidth: 1, borderColor: BRAND.border },
    tr: { flexDirection: "row" },
    th: {
        flex: 1,
        padding: 8,
        backgroundColor: BRAND.bg,
        fontWeight: "bold",
        fontSize: 9,
        borderBottomWidth: 1,
        borderBottomColor: BRAND.border,
    },
    td: {
        flex: 1,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: BRAND.border,
        color: BRAND.text,
    },

    ticketBox: {
        borderWidth: 1,
        borderColor: BRAND.secondary,
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        overflow: "hidden",
    },
    ticketInfo: { flex: 2.5, paddingRight: 10, gap: 2 },
    ticketHighlight: {
        flex: 1,
        backgroundColor: BRAND.secondary,
        borderRadius: 8,
        padding: 10,
        marginLeft: 10,
        color: BRAND.bg,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    ticketSmallText: { fontSize: 8, color: BRAND.lightText },

    hotelBox: {
        borderLeftWidth: 4,
        borderColor: BRAND.accent,
        padding: 15,
        borderRadius: 4,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 15,
    },

    headerContact: { textAlign: "right", gap: 3 },
    headerLogo: { width: 140, height: 50 },

    routeContainer: { marginTop: 10, paddingLeft: 10 },
    routeStep: {
        paddingLeft: 15,
        paddingBottom: 15,
        borderLeftWidth: 1,
        borderLeftColor: BRAND.border,
        position: "relative",
        minHeight: 40,
    },
    routeStepLast: { borderLeftWidth: 0, paddingBottom: 0 },
    routePoint: {
        position: "absolute",
        left: -3,
        top: 0,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: BRAND.accent,
    },

    travelerName: { fontSize: 11, fontWeight: "bold", color: BRAND.secondary },
});

/* ──────────────────────────────────────────────────────────────
   Types
────────────────────────────────────────────────────────────── */
type Booking = {
    id: number;
    trip_id: number;
    name: string | null;
    code: string | null;
    status: string | null;
    notes: string | null;
    created_at: string;
};

type Trip = {
    id: number;
    title: string;
    season: string | null;
    start_date: string | null;
    end_date: string | null;
};

type Pilgrim = {
    id: number;
    full_name: string;
    passport_number: string | null;
    nationality: string | null;
    gender: string | null;
    phone: string | null;
    city: string | null;
    date_of_birth: string | null;
};

type Flight = {
    id: number;
    airline: string | null;
    flight_number: string | null;
    flight_number2: string | null;
    departure_airport: string | null;
    arrival_airport: string | null;
    departure_time: string | null;
    arrival_time: string | null;
    class?: string | null;
};

type Hotel = {
    id: number;
    name: string | null;
    city: string | null;
    address: string | null;
    capacity?: number | null;
    stars?: number | null;
    room_type?: string | null;
    nights?: number | null;
    // enriched
    mapQr?: string | null;
};

type BookingPdfProps = {
    booking: Booking;
    trip: Trip;
    pilgrims: Pilgrim[];
    flights: Flight[];
    hotels: Hotel[];
};

/* ──────────────────────────────────────────────────────────────
   BookingPdf component
────────────────────────────────────────────────────────────── */
export function BookingPdf({
    booking,
    trip,
    pilgrims,
    flights,
    hotels,
}: BookingPdfProps) {

    const headerLogoUri = "/brand/hg_icon.png";
    const watermarkUri = "/brand/hg_icon_light.png";

    const firstFlightArrival = flights?.[0]?.arrival_time
        ? new Date(flights[0].arrival_time!)
        : null;
    const lastFlightDeparture =
        flights && flights.length > 0
            ? flights[flights.length - 1]?.departure_time
                ? new Date(flights[flights.length - 1].departure_time!)
                : null
            : null;

    const transit1Start = firstFlightArrival
        ? new Date(firstFlightArrival.getTime() + 1 * 60 * 60 * 1000)
        : null;
    const transit1End = firstFlightArrival
        ? new Date(firstFlightArrival.getTime() + 2 * 60 * 60 * 1000)
        : null;

    const madinahNights =
        hotels.find((h) => (h.city || "").toLowerCase() === "madinah")?.nights ?? 3;

    const addDays = (date: Date | null, days: number) =>
        date ? new Date(date.getTime() + days * 24 * 60 * 60 * 1000) : null;

    const madinahStayEnd = addDays(transit1Start, madinahNights);

    const transit2Start = madinahStayEnd;

    const transit3Start = lastFlightDeparture
        ? new Date(lastFlightDeparture.getTime() - 7 * 60 * 60 * 1000)
        : null;
    const transit3End = lastFlightDeparture
        ? new Date(lastFlightDeparture.getTime() - 6 * 60 * 60 * 1000)
        : null;

    const transitLog = [
        {
            route: "Jeddah Airport (JED) → Madinah Hotel",
            type: "Arrival Transfer",
            time: `${fmtDT(transit1Start)} → ${fmtTime(transit1End)}`,
            note:
                "Estimated 1–2 hours after flight arrival. Look for attendant at Exit 5.",
        },
        {
            route: "Madinah Hotel → Makkah Hotel",
            type: "Inter-City Transfer",
            time: `${fmtDT(transit2Start)} (Start of Journey)`,
            note:
                "Transfer will commence shortly after Madinah hotel check-out. Travel time approx. 4–5 hours.",
        },
        {
            route: "Makkah Hotel → Jeddah Airport (JED)",
            type: "Departure Transfer",
            time: `${fmtDT(transit3Start)} → ${fmtTime(transit3End)}`,
            note: `Scheduled 6–7 hours prior to final flight departure (Flight ${flights?.[flights.length - 1]?.flight_number || "N/A"
                }).`,
        },
    ];

    const CompanyHeader = (
        <View
            style={{
                marginBottom: 40,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <PdfImage src={headerLogoUri} style={S.headerLogo} />
            <View style={S.headerContact}>
                <Text
                    style={{
                        fontSize: 11,
                        color: BRAND.secondary,
                        fontWeight: "bold",
                        letterSpacing: 0.5,
                    }}
                >
                    HOGGAAN TRAVEL AGENCY
                </Text>
                <Text style={S.small}>HODON, TALEX, TCC, A43</Text>
                <Text style={S.small}>MOGADISHU, SOMALIA</Text>
                <Text style={S.small}>SALES@HOGGAANTRAVEL.COM</Text>
            </View>
        </View>
    );

    return (
        <Document>
            {/* Page 1 — Official Group Travel Manifest */}
            <Page size="LETTER" style={S.page}>
                <PdfImage
                    src={watermarkUri}
                    style={{
                        position: "absolute",
                        top: "27%",
                        left: "15%",
                        width: "70%",
                        opacity: 0.05,
                    }}
                />
                {CompanyHeader}

                <View style={{ marginBottom: 20 }}>
                    <Text
                        style={[
                            S.title,
                            { marginBottom: 4, color: BRAND.secondary, letterSpacing: 1.5 },
                        ]}
                    >
                        OFFICIAL GROUP TRAVEL MANIFEST
                    </Text>
                    <Text style={{ fontSize: 10, color: BRAND.lightText }}>
                        Document Reference:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                            HGT-{booking.code || booking.id}
                        </Text>{" "}
                        | Generated: {fmtDT(new Date())}
                    </Text>
                    <View
                        style={{ height: 3, width: "100%", backgroundColor: BRAND.accent, marginTop: 5 }}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 25,
                    }}
                >
                    <View style={{ width: "40%" }}>
                        <Text
                            style={{
                                fontSize: 9,
                                color: BRAND.lightText,
                                textTransform: "uppercase",
                                marginBottom: 2,
                            }}
                        >
                            Trip Destination & Title
                        </Text>
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: "bold",
                                color: BRAND.secondary,
                                marginBottom: 8,
                            }}
                        >
                            {trip?.title || "Group Booking"}
                        </Text>

                        <Text
                            style={{
                                fontSize: 9,
                                color: BRAND.lightText,
                                textTransform: "uppercase",
                                marginBottom: 2,
                            }}
                        >
                            Travel Dates
                        </Text>
                        <Text style={{ fontSize: 11, color: BRAND.text }}>
                            {fmtD(trip.start_date)} to {fmtD(trip.end_date)}
                        </Text>
                    </View>

                    <View style={{ width: 1, backgroundColor: BRAND.border, marginHorizontal: 15 }} />

                    <View style={{ width: "35%" }}>
                        <Text
                            style={{
                                fontSize: 9,
                                color: BRAND.lightText,
                                textTransform: "uppercase",
                                marginBottom: 2,
                            }}
                        >
                            Booking Status
                        </Text>
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: "bold",
                                color: BRAND.accent,
                                marginBottom: 8,
                            }}
                        >
                            {booking.status || "—"}
                        </Text>

                        <Text
                            style={{
                                fontSize: 9,
                                color: BRAND.lightText,
                                textTransform: "uppercase",
                                marginBottom: 2,
                            }}
                        >
                            Total Passengers
                        </Text>
                        <Text style={{ fontSize: 11, color: BRAND.text }}>
                            {pilgrims?.length || 0} individuals
                        </Text>
                    </View>
                </View>

                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: 900,
                        color: BRAND.text,
                        marginBottom: 5,
                    }}
                >
                    Confirmed Traveler Manifest
                </Text>

                <View style={S.table}>
                    <View style={S.tr}>
                        <Text style={[S.th, { flexBasis: 35, flexGrow: 0, textAlign: "left" }]}>No.</Text>
                        <Text style={[S.th, { flex: 2.5 }]}>Traveler Name</Text>
                        <Text style={[S.th, { flex: 1.5 }]}>Passport ID</Text>
                        <Text style={[S.th, { flex: 1.2 }]}>Gender</Text>
                        <Text style={[S.th, { flex: 1.5 }]}>Phone</Text>
                    </View>

                    {pilgrims?.map((p, i) => (
                        <View key={p.id} style={S.tr}>
                            <Text
                                style={[
                                    S.td,
                                    { flexBasis: 35, flexGrow: 0, fontWeight: "bold", textAlign: "left" },
                                ]}
                            >
                                {i + 1}
                            </Text>
                            <Text style={[S.td, { flex: 2.5, ...S.travelerName }]}>{p.full_name}</Text>
                            <Text style={[S.td, { flex: 1.5 }]}>{p.passport_number || "—"}</Text>
                            <Text style={[S.td, { flex: 1.2 }]}>{p.gender || "—"}</Text>
                            <Text style={[S.td, { flex: 1.5 }]}>{p.phone || "—"}</Text>
                        </View>
                    ))}
                </View>
            </Page>

            {/* Page 2 — Flights */}
            <Page size="LETTER" style={S.page}>
                <PdfImage
                    src={watermarkUri}
                    style={{
                        position: "absolute",
                        top: "27%",
                        left: "15%",
                        width: "70%",
                        opacity: 0.05,
                    }}
                />

                <Text style={S.title}>Booking Manifest</Text>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, fontWeight: "bold", color: BRAND.primary }}>
                        Booking ID:{" "}
                        <Text style={{ fontWeight: "normal", color: BRAND.text }}>
                            {booking.code || booking.id}
                        </Text>
                    </Text>
                </View>

                <View style={{ flexDirection: "row", gap: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={S.sectionTitle}>Booking Details</Text>
                        <View style={{ gap: 4 }}>
                            <Text>
                                Name: <Text style={{ fontWeight: 700 }}>{booking.name || `Booking #${booking.id}`}</Text>
                            </Text>
                            <Text>
                                Status: <Text style={{ color: BRAND.accent }}>{booking.status || "—"}</Text>
                            </Text>
                            <Text style={{ marginBottom: 4 }}>Created: {fmtDT(booking.created_at)}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={S.sectionTitle}>Trip Itinerary</Text>
                        <View style={{ gap: 4 }}>
                            <Text>
                                Title: <Text style={{ fontWeight: 700 }}>{trip.title}</Text>
                            </Text>
                            <Text>
                                Dates: {fmtD(trip.start_date)} → {fmtD(trip.end_date)}
                            </Text>
                            {trip.season ? <Text style={{ marginBottom: 4 }}>Season: {trip.season}</Text> : null}
                        </View>
                    </View>
                </View>
                {booking.notes ? (
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 10,
                            borderTopWidth: 1,
                            borderTopColor: BRAND.border,
                            paddingTop: 8,
                        }}
                    >
                        Notes: {booking.notes}
                    </Text>
                ) : null}

                <Text style={S.sectionTitle}>Flight E-Tickets</Text>
                {flights.map((f) => (
                    <View key={f.id} style={S.ticketBox}>
                        <View style={S.ticketInfo}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: 900,
                                    color: BRAND.primary,
                                    marginBottom: 4,
                                }}
                            >
                                {f.airline || "Airline"}
                                <Text style={{ color: BRAND.text, fontSize: 11 }}>
                                    {" "}
                                    | Flight: {f.flight_number || "—"}
                                </Text>
                            </Text>
                            <Text style={{ fontSize: 9, marginBottom: 8 }}>
                                {f.flight_number2 ? `Connecting Flight: ${f.flight_number2}` : "Direct Flight"}
                            </Text>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                                <View>
                                    <Text style={S.ticketSmallText}>DEPARTURE</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                                        {f.departure_airport || "—"}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>{fmtDT(f.departure_time)}</Text>
                                </View>
                                <View style={{ width: 40, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ color: BRAND.lightText }}>→</Text>
                                </View>
                                <View style={{ textAlign: "right" }}>
                                    <Text style={S.ticketSmallText}>ARRIVAL</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                                        {f.arrival_airport || "—"}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>{fmtDT(f.arrival_time)}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={S.ticketHighlight}>
                            <Text style={{ fontSize: 9, fontWeight: "medium" }}>CLASS</Text>
                            <Text
                                style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8, color: BRAND.accent }}
                            >
                                {f.class || "—"}
                            </Text>
                        </View>
                    </View>
                ))}
            </Page>

            {/* Page 3 — Hotels + Route plan */}
            <Page size="LETTER" style={S.page}>
                <PdfImage
                    src={watermarkUri}
                    style={{
                        position: "absolute",
                        top: "27%",
                        left: "15%",
                        width: "70%",
                        opacity: 0.05,
                    }}
                />

                <Text style={S.sectionTitle}>Hotels & Accommodations</Text>
                {hotels.map((h) => (
                    <View key={h.id} style={S.hotelBox}>
                        <View style={{ flex: 3, gap: 4 }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: 800,
                                    color: BRAND.secondary,
                                    marginBottom: 4,
                                }}
                            >
                                {h.name || "Hotel"}
                            </Text>
                            <Text style={{ marginBottom: 2 }}>
                                City: <Text style={{ fontWeight: "bold" }}>{h.city || "—"}</Text>
                            </Text>
                            <Text style={{ marginBottom: 2 }}>
                                Room Type: {h.room_type || "—"} / Nights: {h.nights ?? "—"}
                            </Text>
                            <Text style={S.small}>
                                Address:{" "}
                                {h.address && h.address.startsWith("http")
                                    ? "Scan QR for map"
                                    : h.address || "N/A"}
                            </Text>
                        </View>

                        {h.mapQr ? (
                            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                                <Text style={S.small}>MAP ACCESS (QR)</Text>
                                <PdfImage
                                    src={h.mapQr}
                                    style={{ width: 70, height: 70, marginTop: 6, borderRadius: 4 }}
                                />
                            </View>
                        ) : null}
                    </View>
                ))}

                <Text style={S.sectionTitle}>Inter-City Transportation</Text>
                <View style={S.routeContainer}>
                    {transitLog.map((t, idx) => {
                        return (
                            <View key={idx} style={{ marginBottom: 10 }} >
                                <View style={{ marginBottom: 4 }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 900,
                                            color: BRAND.secondary,
                                            marginBottom: 2,
                                        }}
                                    >
                                        {t.route}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: BRAND.accent, marginBottom: 2 }}>
                                        {t.type} <Text style={{ color: BRAND.text }}>| {t.time}</Text>
                                    </Text>
                                    <Text style={{ fontSize: 12, color: BRAND.lightText }}>Note: {t.note}</Text>
                                </View>

                                <Text
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                        top: 0,
                                        fontSize: 10,
                                        color: BRAND.lightText,
                                    }}
                                >
                                    LOG ID: <Text style={{ fontWeight: "bold", color: BRAND.accent }}>TX-{idx + 1}</Text>
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </Page>
        </Document>
    );
}

/* ──────────────────────────────────────────────────────────────
   Data fetch + open
   - Pre-generates QR data URLs for hotel map links
────────────────────────────────────────────────────────────── */
export async function generateBookingPdfAndOpen(bookingId: number) {
    // 1) Booking
    const { data: booking, error: bookingErr } = await supabase
        .from("bookings")
        .select("id, trip_id, name, code, status, notes, created_at")
        .eq("id", bookingId)
        .single<Booking>();
    if (bookingErr || !booking) throw new Error("Booking not found");

    // 2) Trip
    const { data: trip, error: tripErr } = await supabase
        .from("trips")
        .select("id, title, season, start_date, end_date")
        .eq("id", booking.trip_id)
        .single<Trip>();
    if (tripErr) throw new Error(tripErr.message || "Trip not found");

    // 3) Booking travelers
    const { data: btRows, error: btErr } = await supabase
        .from("booking_travelers")
        .select("id, pilgrim_id, status, snapshot_currency, snapshot_total, docs_complete")
        .eq("booking_id", bookingId);
    if (btErr) throw new Error(btErr.message);

    // 4) Pilgrims
    let pilgrims: Pilgrim[] = [];
    const pilgrimIds = (btRows || []).map((r: any) => r.pilgrim_id).filter(Boolean);
    if (pilgrimIds.length) {
        const { data: pilgs, error: pErr } = await supabase
            .from("pilgrims")
            .select(
                "id, full_name, passport_number, nationality, gender, phone, city, date_of_birth"
            )
            .in("id", pilgrimIds);
        if (pErr) throw new Error(pErr.message);
        pilgrims = (pilgs || []) as Pilgrim[];
    }

    // 5) Flights
    const { data: tripFlights, error: tfErr } = await supabase
        .from("trip_flights")
        .select("id, segment, class, cost_per_seat, flight_id")
        .eq("trip_id", trip.id);
    if (tfErr) throw new Error(tfErr.message);

    let flights: Flight[] = [];
    if (tripFlights?.length) {
        const flightIds = tripFlights.map((f: any) => f.flight_id);
        const { data: frows, error: fErr } = await supabase
            .from("flights")
            .select(
                "id, airline, flight_number, flight_number2, departure_airport, arrival_airport, departure_time, arrival_time"
            )
            .in("id", flightIds);
        if (fErr) throw new Error(fErr.message);
        const byId = Object.fromEntries((frows || []).map((x: any) => [x.id, x]));
        flights = tripFlights.map((tf: any) => ({
            ...byId[tf.flight_id],
            class: tf.class,
        })) as Flight[];
    }

    // 6) Hotels
    const { data: tripHotels, error: thErr } = await supabase
        .from("trip_hotels")
        .select("id, city, room_type, nights, cost_per_bed, hotel_id")
        .eq("trip_id", trip.id);
    if (thErr) throw new Error(thErr.message);

    let hotels: Hotel[] = [];
    if (tripHotels?.length) {
        const hotelIds = tripHotels.map((h: any) => h.hotel_id);
        const { data: hrows, error: hErr } = await supabase
            .from("hotels")
            .select("id, name, city, address, capacity, stars, created_at")
            .in("id", hotelIds);
        if (hErr) throw new Error(hErr.message);
        const byId = Object.fromEntries((hrows || []).map((x: any) => [x.id, x]));
        hotels = tripHotels.map((th: any) => ({ ...byId[th.hotel_id], ...th })) as Hotel[];
    }

    // 7) Pre-generate QR data URLs for map links (so the PDF component stays pure)
    const hotelsEnriched: Hotel[] = await Promise.all(
        hotels.map(async (h) => {
            if (h.address && h.address.startsWith("http")) {
                try {
                    const dataUrl = "";
                    return { ...h, mapQr: dataUrl };
                } catch {
                    return { ...h, mapQr: null };
                }
            }
            return { ...h, mapQr: null };
        })
    );

    // 8) Build PDF + open
    const doc = (
        <BookingPdf
            booking={booking}
            trip={trip}
            pilgrims={pilgrims}
            flights={flights}
            hotels={hotelsEnriched}
        />
    );
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    //window.open(url, "_blank", "noopener,noreferrer");

    const a = document.createElement("a");
    a.href = url;
    a.download = `Booking_${booking.code || booking.id}.pdf`;
    a.click();

    URL.revokeObjectURL(url);

}
