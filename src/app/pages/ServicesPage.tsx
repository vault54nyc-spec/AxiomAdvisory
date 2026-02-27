import { useEffect } from "react";
import { Services } from "../components/Services";
import { EngagementBanner } from "../components/EngagementBanner";

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Services />
      <EngagementBanner />
    </>
  );
}
