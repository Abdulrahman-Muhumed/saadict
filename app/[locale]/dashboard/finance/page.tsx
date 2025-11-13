import FinanceDashboard from "./FinanceDashboard";

export const metadata = {
  title: "Financial Dashboard",
};

export default function FinancePage() {
  return (
    <div className="min-h-screen">
      <FinanceDashboard />
    </div>
  );
}
