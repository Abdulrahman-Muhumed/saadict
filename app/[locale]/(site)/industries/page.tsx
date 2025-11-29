import PageContent from "./pageContent";
import { brand } from "@/components/config/brand";

export const metadata = {
  title: `Industries | ${brand.name} `,
  description:
    "Discover how HornBox LLC serves diverse industries with tailored logistics solutions, ensuring efficient supply chain management for sectors such as automotive, retail, healthcare, technology, and more.",};

export default function IndustriesPage() {
  return <PageContent />;
}
