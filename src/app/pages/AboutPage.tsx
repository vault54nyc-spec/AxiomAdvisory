import { useEffect } from "react";
import { About } from "../components/About";
import { EngagementBanner } from "../components/EngagementBanner";

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <div className="pt-14 md:pt-14" /> {/* spacer for fixed navbar */}
      <About />
      <EngagementBanner />
    </>
  );
}
