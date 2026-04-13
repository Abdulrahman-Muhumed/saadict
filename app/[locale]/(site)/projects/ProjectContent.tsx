import ProjectsHero from "./components/ProjectsHero";
//import FeaturedProjects from "./components/FeaturedProjects";
import ConfidentialProjects from "./components/ConfidentialProjects";
import ProjectsCTA from "./components/ProjectsCTA";
import ProjectsList from "./components/ProjectsList";
export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsList />
      {/* <FeaturedProjects /> */}
      <ConfidentialProjects />
      <ProjectsCTA />
    </>
  );
}