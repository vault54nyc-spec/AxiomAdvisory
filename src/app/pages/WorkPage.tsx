import { useEffect } from "react";
import { CaseStudies } from "../components/CaseStudies";
import { EngagementBanner } from "../components/EngagementBanner";

export default function WorkPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <div className="pt-14 md:pt-14" /> {/* spacer for fixed navbar */}
      <CaseStudies />
      <EngagementBanner />
    </>
  );
}
