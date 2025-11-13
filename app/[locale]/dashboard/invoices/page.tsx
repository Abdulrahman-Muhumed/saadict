// app/protected/invoices/page.tsx
import InvoicesClient from "./InvoicesClient";
import { brand } from "@/components/config/brand";

export const metadata = {
  title: "Invoices — Hoggaan Dashboard",
};

export default function InvoicesPage() {
  return (
    <div>
      {/* (Optional) server-only wrappers or guards could live here */}
      <InvoicesClient brandPrimary={brand.colors.primary} brandAccent={brand.colors.accent} />
    </div>
  );
}
