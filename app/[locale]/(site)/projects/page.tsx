import { brand } from "@/components/config/brand";

export const metadata = {
  title: `Projects | ${brand.name} `,
  description:
    "Discover HornBox LLC's diverse projects, showcasing our expertise in delivering exceptional Umrah and Hajj services worldwide.",
};

import ProjectsContent from "./ProjectContent"; // client component

export default function ProjectsPage() {
  return <ProjectsContent />;
}
