import { brand } from "@/components/config/brand";

export const metadata = {
  title: `About Us | ${brand.name} `,
  description:
    "Learn about Hoggaan Travels — an officially licensed Umrah and Hajj service provider.",
};

import AboutContent from "./AboutContent"; // client component

export default function AboutPage() {
  return <AboutContent />;
}
