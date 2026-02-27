import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Services", action: () => scrollTo("services") },
    { label: "About", action: () => scrollTo("about") },
    { label: "Work", action: () => scrollTo("work") },
    { label: "Brand Tool", action: () => navigate("/brand-tool") },
    { label: "For Our Partners", action: () => navigate("/partners") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  const isDark = !isHome || !scrolled;
  const textColor = scrolled && isHome ? "text-[#0A0A0A]" : "text-[#0A0A0A]";
  const bgClass = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-[#0A0A0A] flex items-center justify-center">
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#D4AF37",
                fontSize: "1.25rem",
                fontWeight: 700,
              }}
            >
              A
            </span>
          </div>
          <span
            className={`hidden sm:block transition-colors duration-300 tracking-wide ${textColor}`}
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            AXIOM ADVISORY PARTNERS
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className={`transition-colors duration-200 hover:text-[#D4AF37] ${textColor} ${
                link.label === "For Our Partners"
                  ? "text-[#D4AF37] font-semibold"
                  : ""
              }`}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: link.label === "For Our Partners" ? 600 : 500,
                letterSpacing: "0.06em",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:block px-5 py-2.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-colors"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Begin Engagement
          </button>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className="flex flex-col gap-1.5">
              <span className={`block w-6 h-[2px] transition-all bg-[#0A0A0A] ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block w-6 h-[2px] transition-all bg-[#0A0A0A] ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-[2px] transition-all bg-[#0A0A0A] ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className={`text-left hover:text-[#D4AF37] transition-colors ${
                link.label === "For Our Partners"
                  ? "text-[#D4AF37] font-semibold"
                  : "text-[#0A0A0A]"
              }`}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.9375rem",
                fontWeight: 500,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-2 px-5 py-2.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-colors w-fit"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Begin Engagement
          </button>
        </div>
      )}
    </nav>
  );
}
