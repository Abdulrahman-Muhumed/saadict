// app/protected/invoices/page.tsx
import TicketPage from "./TicketPage";

export const metadata = {
  title: "Tickets — Hoggaan Dashboard",
};

export default function page() {
  return (
    <div>
      <TicketPage />
    </div>
  );
}
