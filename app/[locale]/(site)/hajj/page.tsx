import { brand } from "@/components/config/brand";

export const metadata = {
  title: `Hajj | ${brand.name}`,
  description:
    "Plan your sacred journey with Hoggaan Travels — officially Hajj licensed.",
};

import HajjContent from "./HajjContent"; // client component

export default function AboutPage() {
  return <HajjContent />;
}
