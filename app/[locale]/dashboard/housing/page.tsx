// app/(dashboard)/dashboard/housing/page.tsx
import HousingContent from "./HousingContent";
import { getHousingBookings } from "./_actions/getHousingBookings";

export default async function Page() {
  const rows = await getHousingBookings(); 

  return <HousingContent rows={rows} />;
}
