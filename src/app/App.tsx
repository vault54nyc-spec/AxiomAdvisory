import { Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import BrandToolPage from "./pages/BrandToolPage";
import PartnersPage from "./pages/PartnersPage";
import CornbreadPage from "./pages/CornbreadPage";
import LockedClientPage from "./pages/LockedClientPage";

export default function App() {
  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brand-tool" element={<BrandToolPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/partners/cornbread" element={<CornbreadPage />} />
        <Route path="/partners/walmart" element={<LockedClientPage name="Walmart" code="walmart" />} />
        <Route path="/partners/rori-project" element={<LockedClientPage name="R.O.R.I. Project" code="rori" />} />
        <Route path="/partners/nphc-hudson" element={<LockedClientPage name="NPHC of Hudson County" code="nphc" />} />
      </Routes>
      <Footer />
    </div>
  );
}
