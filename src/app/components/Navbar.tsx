import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const logoUrl = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/logo.gif";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Services", action: () => scrollTo("services") },
    { label: "About", action: () => scrollTo("about") },
    { label: "Work", action: () => scrollTo("case-studies") },
    { label: "Brand Tool", action: () => navigate("/brand-tool") },
    { label: "For Our Partners", action: () => navigate("/partners") },
  ];

  // On homepage: transparent until scrolled → semi-transparent black
  // On other pages: always frosted white
  const bgStyle: React.CSSProperties = isHome
    ? {
        background: scrolled ? "rgba(10,10,10,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease",
      }
    : {
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      };

  const linkColor = isHome && !scrolled ? "rgba(255,255,255,0.85)" : isHome ? "rgba(255,255,255,0.85)" : "#0A0A0A";
  const partnerColor = "#D4AF37";
  const hamburgerColor = isHome ? "#FFFFFF" : "#0A0A0A";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={bgStyle}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
          <img
            src={logoUrl}
            alt="Axiom Advisory Partners"
            className="h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <span
            className="font-semibold tracking-wide hidden sm:block transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", color: linkColor, letterSpacing: "0.06em" }}
          >
            AXIOM ADVISORY
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="relative group text-sm font-medium transition-colors duration-200"
              style={{
                fontFamily: "'Barlow', sans-serif",
                color: link.label === "For Our Partners" ? partnerColor : linkColor,
                fontWeight: link.label === "For Our Partners" ? 600 : 500,
              }}
            >
              {link.label}
              {/* Underline slide-in animation */}
              <span
                className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full transition-all duration-300 h-px"
                style={{ background: link.label === "For Our Partners" ? "#D4AF37" : "rgba(212,175,55,0.7)" }}
              />
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="group relative px-4 py-2 text-sm font-semibold overflow-hidden transition-all duration-300"
            style={{
              fontFamily: "'Barlow', sans-serif",
              border: "1px solid rgba(212,175,55,0.5)",
              color: "#D4AF37",
              letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "#D4AF37";
              b.style.color = "#0A0A0A";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "transparent";
              b.style.color = "#D4AF37";
            }}
          >
            Begin Engagement
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 z-50"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] transition-all duration-300`}
            style={{ background: hamburgerColor, transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span className={`block w-6 h-[2px] transition-all duration-300`}
            style={{ background: hamburgerColor, opacity: mobileOpen ? 0 : 1 }} />
          <span className={`block w-6 h-[2px] transition-all duration-300`}
            style={{ background: hamburgerColor, transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu — full-screen dark overlay */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "100vh" : "0",
          background: "rgba(10,10,10,0.97)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="px-6 py-8 flex flex-col gap-5">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={link.action}
              className="text-left transition-all duration-200 hover:translate-x-1"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "1.0625rem",
                fontWeight: link.label === "For Our Partners" ? 600 : 400,
                color: link.label === "For Our Partners" ? "#D4AF37" : "rgba(255,255,255,0.85)",
                transitionDelay: `${i * 40}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-3 px-5 py-3 w-fit text-sm font-semibold transition-all"
            style={{
              fontFamily: "'Barlow', sans-serif",
              background: "#D4AF37",
              color: "#0A0A0A",
              letterSpacing: "0.04em",
            }}
          >
            Begin Engagement
          </button>
        </div>
      </div>
    </nav>
  );
}
