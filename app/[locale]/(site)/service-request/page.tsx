// /app/service-request/page.tsx
import ServiceRequestHero from "./components/ServiceRequestHero";
//import ServiceRequestForm from "./components/ServiceRequestForm";
import ComingSoon from "./components/ComingSoon";
export default function ServiceRequestPage() {
  return (
    <>
      <ServiceRequestHero />
      <ComingSoon />
      {/* <ServiceRequestForm /> */}
    </>
  );
}