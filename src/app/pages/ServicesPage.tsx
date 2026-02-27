import { useEffect } from "react";
import { Services } from "../components/Services";
import { EngagementBanner } from "../components/EngagementBanner";

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <div className="pt-14 md:pt-14" /> {/* spacer for fixed navbar */}
      <Services />
      <EngagementBanner />
    </>
  );
}
