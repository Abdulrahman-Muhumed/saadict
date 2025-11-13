import { brand } from "@/components/config/brand";

export const metadata = {
  title: `Contact Us | ${brand.name} `,
  description:
    "Contact Us and Learn about Hoggaan Travels",
};

import ContactContent from "./ContactContent"; // client component

export default function AboutPage() {
  return <ContactContent />;
}
