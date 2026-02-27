import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { ServiceArchitecture } from "./components/ServiceArchitecture";
import { BrandDecisionTool } from "./components/BrandDecisionTool";
import { About } from "./components/About";
import { CaseStudies } from "./components/CaseStudies";
import { EngagementBanner } from "./components/EngagementBanner";
import { Contact } from "./components/Contact";
import CornbreadStrategy from "./components/CornbreadStrategy";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <Navbar />
      <Hero />
      <Services />
      <ServiceArchitecture />
      <BrandDecisionTool />
      <About />
      <CaseStudies />
      <EngagementBanner />
      <Contact />
      <CornbreadStrategy />
      <Footer />
    </div>
  );
}
