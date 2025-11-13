// app/protected/invoices/[id]/page.tsx
import InvoiceViewClient from "./InvoiceViewClient";

export const metadata = {
  title: "Invoice Details — Hoggaan Dashboard",
};

export default async function InvoiceViewPage({ params }: { params: { id: number } }) {
  return (
    <div >
      <InvoiceViewClient  />
    </div>
  );
}
