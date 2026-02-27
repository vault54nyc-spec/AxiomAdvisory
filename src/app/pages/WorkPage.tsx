import { useEffect } from "react";
import { CaseStudies } from "../components/CaseStudies";
import { EngagementBanner } from "../components/EngagementBanner";

export default function WorkPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <CaseStudies />
      <EngagementBanner />
    </>
  );
}
