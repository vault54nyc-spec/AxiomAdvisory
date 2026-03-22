import { Hero } from "../components/Hero";
import { ClientTestimonies } from "../components/ClientTestimonies";
import { HomeIntelligence } from "../components/HomeIntelligence";
import { CaseStudies } from "../components/CaseStudies";
import { EngagementBanner } from "../components/EngagementBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientTestimonies />
      <HomeIntelligence />
      <CaseStudies />
      <EngagementBanner />
    </>
  );
}
