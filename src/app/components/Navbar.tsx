import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const logoUrl = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/logo.gif";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Services", path: "/services" },
    { label: "Architecture", path: "/architecture" },
    { label: "About", path: "/about" },
    { label: "Work", path: "/work" },
    { label: "Brand Tool", path: "/brand-tool" },
    { label: "For Our Partners", path: "/partners" },
    { label: "Contact", path: "/contact" },
  ];

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

  const isActive = (path: string) => location.pathname === path;

  return (
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
      {/* ── Top row: Logo + Begin Engagement (desktop) ── */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 h-14 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="flex items-center gap-2 group shrink-0">
          <img
            src={logoUrl}
            alt="Axiom Advisory Partners"
            className="h-7 sm:h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <span
            className="font-semibold tracking-wide hidden sm:block transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", color: linkColor, letterSpacing: "0.06em" }}
          >
            AXIOM ADVISORY
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="relative group text-sm font-medium transition-colors duration-200"
              style={{
                fontFamily: "'Barlow', sans-serif",
                color: isActive(link.path)
                  ? "#D4AF37"
                  : link.label === "For Our Partners"
                  ? partnerColor
                  : linkColor,
                fontWeight: link.label === "For Our Partners" || isActive(link.path) ? 600 : 500,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-10px)",
                transition: `opacity 0.5s ease ${0.2 + i * 0.06}s, transform 0.5s ease ${0.2 + i * 0.06}s, color 0.2s`,
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 transition-all duration-300 h-px"
                style={{
                  width: isActive(link.path) ? "100%" : "0",
                  background: "#D4AF37",
                }}
              />
              <span
                className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full transition-all duration-300 h-px"
                style={{ background: "rgba(212,175,55,0.7)" }}
              />
            </button>
          ))}
          <button
            onClick={() => navigate("/contact")}
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
      </div>

      {/* ── Mobile horizontal nav row ── */}
      <div
        className="md:hidden overflow-x-auto scrollbar-hide"
        style={{
          borderTop: isHome ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
        }}
      >
        <div className="flex items-center gap-1 px-3 py-2 min-w-max">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="shrink-0 transition-colors duration-200"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.6rem",
                fontWeight: isActive(link.path) ? 700 : link.label === "For Our Partners" ? 600 : 500,
                color: isActive(link.path)
                  ? "#D4AF37"
                  : link.label === "For Our Partners"
                  ? partnerColor
                  : linkColor,
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                padding: "0.25rem 0.45rem",
                borderBottom: isActive(link.path) ? "1.5px solid #D4AF37" : "1.5px solid transparent",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate("/contact")}
            className="shrink-0"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 600,
              background: "#D4AF37",
              color: "#0A0A0A",
              letterSpacing: "0.04em",
              textTransform: "uppercase" as const,
              padding: "0.3rem 0.6rem",
              borderRadius: "2px",
            }}
          >
            Engage
          </button>
        </div>
      </div>

      {/* Hide scrollbar on mobile nav */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </nav>
  );
}
