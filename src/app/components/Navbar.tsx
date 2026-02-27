import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const logoUrl = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/logo.gif";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isHome = location.pathname === "/";

  // First-load animation trigger
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

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
        background: scrolled ? "rgba(10,10,10,0.82)" : "rgba(0,0,0,0.45)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease",
      }
    : {
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      };

  const linkColor = isHome ? "rgba(255,255,255,0.85)" : "#0A0A0A";
  const partnerColor = "#D4AF37";
  const hamburgerColor = isHome ? "#FFFFFF" : "#0A0A0A";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0"
        style={{
          ...bgStyle,
          zIndex: 9999,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-18px)",
          transition: `opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s, background 0.35s ease, backdrop-filter 0.35s ease`,
        }}
      >
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
            {navLinks.map((link, i) => (
              <button
                key={link.label}
                onClick={link.action}
                className="relative group text-sm font-medium transition-colors duration-200"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  color: link.label === "For Our Partners" ? partnerColor : linkColor,
                  fontWeight: link.label === "For Our Partners" ? 600 : 500,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(-10px)",
                  transition: `opacity 0.5s ease ${0.2 + i * 0.06}s, transform 0.5s ease ${0.2 + i * 0.06}s, color 0.2s`,
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
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-10px)",
                transition: `opacity 0.5s ease 0.55s, transform 0.5s ease 0.55s, background 0.25s, color 0.25s`,
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

          {/* Mobile hamburger — hidden, we use the floating button instead */}
          <div className="md:hidden" />
        </div>
      </nav>

      {/* ── Floating mobile menu button (bottom-right) ── */}
      <button
        className="md:hidden fixed z-[10000] flex items-center justify-center transition-all duration-300"
        style={{
          bottom: "1.25rem",
          right: "1.25rem",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          background: mobileOpen ? "#D4AF37" : "rgba(10,10,10,0.85)",
          color: mobileOpen ? "#0A0A0A" : "#FFFFFF",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          border: mobileOpen ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.12)",
          fontFamily: "'Barlow', sans-serif",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
        }}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* ── Mobile menu — compact horizontal floating strip ── */}
      <div
        className="md:hidden fixed left-3 right-3 z-[9998] transition-all duration-300"
        style={{
          bottom: mobileOpen ? "4.5rem" : "-100%",
          opacity: mobileOpen ? 1 : 0,
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "0.75rem 0.5rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={link.action}
              className="transition-all duration-200"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.65rem",
                fontWeight: link.label === "For Our Partners" ? 600 : 500,
                color: link.label === "For Our Partners" ? "#D4AF37" : "rgba(255,255,255,0.8)",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                padding: "0.3rem 0.5rem",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="transition-all"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              background: "#D4AF37",
              color: "#0A0A0A",
              letterSpacing: "0.04em",
              textTransform: "uppercase" as const,
              padding: "0.35rem 0.7rem",
              borderRadius: "2px",
            }}
          >
            Engage
          </button>
        </div>
      </div>
    </>
  );
}
