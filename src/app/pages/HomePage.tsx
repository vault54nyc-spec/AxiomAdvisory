import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { ServiceArchitecture } from "../components/ServiceArchitecture";
import { About } from "../components/About";
import { CaseStudies } from "../components/CaseStudies";
import { EngagementBanner } from "../components/EngagementBanner";
import { Contact } from "../components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ServiceArchitecture />
      <About />
      <CaseStudies />
      <EngagementBanner />
      <Contact />
    </>
  );
}
