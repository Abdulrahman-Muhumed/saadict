"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import TripHeader from "./_components/TripHeader";
import { Loader2 } from "lucide-react";

// Components (we’ll add these next)
import HotelsSection from "./_components/HotelsSection";
import FlightsSection from "./_components/FlightsSection";
import EditTripDrawer from "./_components/EditTripDrawer";
import ConfirmModal from "./_components/ConfirmModal";
import TabBar from "./_components/TabBar";
import OverviewCard from "./_components/OverviewCard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TripPageContent() {
  const { id } = useParams();
  const router = useRouter();
  const tripId = Number(id);

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState("overview"); // overview | hotels | flights
  const [openEdit, setOpenEdit] = useState(false);
  const [confirm, setConfirm] = useState<any>({ open: false });

  // Load trip
  useEffect(() => {
    if (!tripId) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("id", tripId)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setTrip(data);
      setLoading(false);
    })();
  }, [tripId]);

  // Delete trip
  async function handleDeleteTrip() {
    if (!trip) return;
    const { error } = await supabase.from("trips").delete().eq("id", trip.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/protected/trips");
  }

  if (loading)
    return (
      <div className="flex items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading trip details...
      </div>
    );

  if (!trip)
    return (
      <div className="rounded-xl border border-slate-200 bg-white/70 p-6 text-center text-slate-600 dark:bg-neutral-900/60 dark:text-slate-300">
        Trip not found.
      </div>
    );

  return (
    <>
      <TripHeader
        trip={trip}
        onEdit={() => setOpenEdit(true)}
        onDelete={() =>
          setConfirm({
            open: true,
            title: `Delete trip "${trip.title}"?`,
            desc: "This action cannot be undone.",
            onConfirm: handleDeleteTrip,
          })
        }
      />

      {/* Tabs */}
      <div className="mt-6">
        <TabBar
          active={tab}
          onChange={setTab}
          tabs={[
            { key: "overview", label: "Overview" },
            { key: "hotels", label: "Hotels" },
            { key: "flights", label: "Flights" },
          ]}
        />
      </div>

      {/* Tab content */}
      <div className="mt-5">
        {tab === "overview" && <OverviewCard trip={trip} />}
        {tab === "hotels" && <HotelsSection trip={trip} />}
        {tab === "flights" && <FlightsSection trip={trip} />}
      </div>

      {/* Modals */}
      {openEdit && (
        <EditTripDrawer trip={trip} onClose={() => setOpenEdit(false)} />
      )}
      {confirm.open && (
        <ConfirmModal
          open={confirm.open}
          title={confirm.title}
          body={confirm.desc}
          onCancel={() => setConfirm({ open: false })}
          onConfirm={confirm.onConfirm}
        />
      )}
    </>
  );
}
