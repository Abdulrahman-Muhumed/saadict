// app/protected/requests/umrah/page.tsx
import PageContent from "./PageContent";

export const metadata = {
  title: "Umrah Requests — Hoggaan Dashboard",
  description: "Review, approve, or reject Umrah requests from the public portal.",
};

export default function UmrahRequestsPage() {
  return (
    <div>
      <PageContent />
    </div>
  );
}
