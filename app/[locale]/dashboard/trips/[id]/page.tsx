// app/protected/trips/[id]/page.tsx
import TripPageContent from "./TripPageContent";

export const metadata = {
  title: "Trip Details — Hoggaan Dashboard",
  description: "Manage trip details, linked hotels, and flights.",
};

export default function TripDetailPage() {
  return (
    <div>
      <TripPageContent />
    </div>
  );
}
