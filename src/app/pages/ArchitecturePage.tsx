import { useEffect } from "react";
import { ServiceArchitecture } from "../components/ServiceArchitecture";
import { EngagementBanner } from "../components/EngagementBanner";

export default function ArchitecturePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <ServiceArchitecture />
      <EngagementBanner />
    </>
  );
}
