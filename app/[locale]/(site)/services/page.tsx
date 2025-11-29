import PageContent from "./pageContent";
import { brand } from "@/components/config/brand";

export const metadata = {
  title: `Services | ${brand.name} `,
  description:
    "Explore HornBox LLC's comprehensive logistics services, including ocean freight, air freight, road transport, customs clearance, warehousing, and project cargo solutions tailored to your supply chain needs.",
};

export default function ServicesPage() {
  return <PageContent />;
}
