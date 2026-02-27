import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { CaseStudies } from "./components/CaseStudies";
import { EngagementBanner } from "./components/EngagementBanner";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <CaseStudies />
      <EngagementBanner />
      <Contact />
      <Footer />
    </div>
  );
}
