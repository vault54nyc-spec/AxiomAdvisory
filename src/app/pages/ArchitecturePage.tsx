import { useEffect } from "react";
import { ServiceArchitecture } from "../components/ServiceArchitecture";
import { EngagementBanner } from "../components/EngagementBanner";

export default function ArchitecturePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <div className="pt-14 md:pt-14" /> {/* spacer for fixed navbar */}
      <ServiceArchitecture />
      <EngagementBanner />
    </>
  );
}
