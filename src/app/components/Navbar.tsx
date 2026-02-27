import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const logoUrl = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/logo.gif";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/" },
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
      }
    : {
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      };

  const linkColor = isHome ? "rgba(255,255,255,0.6)" : "rgba(10,10,10,0.5)";
  const activeLinkColor = isHome ? "#FFFFFF" : "#0A0A0A";
  const partnerColor = "#D4AF37";

  const isActive = (path: string) => location.pathname === path;

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
              className="font-semibold tracking-wide transition-colors hidden sm:block"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", color: isHome ? "rgba(255,255,255,0.7)" : "#0A0A0A", letterSpacing: "0.06em" }}
            >
              AXIOM ADVISORY
            </span>
          </button>

          {/* Desktop nav links — smaller font, active is larger */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link, i) => {
              const active = isActive(link.path);
              const isPartner = link.label === "For Our Partners";
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className="relative group transition-all duration-200"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: active ? "0.8rem" : "0.68rem",
                    fontWeight: active ? 700 : isPartner ? 600 : 500,
                    color: active ? activeLinkColor : isPartner ? partnerColor : linkColor,
                    letterSpacing: "0.03em",
                    textTransform: "uppercase" as const,
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(-10px)",
                    transition: `opacity 0.5s ease ${0.2 + i * 0.05}s, transform 0.5s ease ${0.2 + i * 0.05}s, font-size 0.25s ease, color 0.2s, font-weight 0.2s`,
                  }}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                    style={{
                      width: active ? "100%" : "0",
                      background: "#D4AF37",
                    }}
                  />
                  {/* Hover underline */}
                  {!active && (
                    <span
                      className="absolute -bottom-1 left-0 w-0 group-hover:w-full transition-all duration-300 h-px"
                      style={{ background: "rgba(212,175,55,0.5)" }}
                    />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => navigate("/contact")}
              className="group relative px-3 py-1.5 font-semibold overflow-hidden transition-all duration-300"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.65rem",
                border: "1px solid rgba(212,175,55,0.5)",
                color: "#D4AF37",
                letterSpacing: "0.05em",
                textTransform: "uppercase" as const,
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

          {/* Mobile: hidden placeholder so flexbox stays balanced */}
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
          fontSize: "1rem",
          fontWeight: 700,
        }}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* ── Mobile menu — compact floating strip ── */}
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
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const isPartner = link.label === "For Our Partners";
            return (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className="transition-all duration-200"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: active ? "0.75rem" : "0.6rem",
                  fontWeight: active ? 700 : isPartner ? 600 : 500,
                  color: active ? "#FFFFFF" : isPartner ? "#D4AF37" : "rgba(255,255,255,0.6)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase" as const,
                  padding: "0.3rem 0.5rem",
                  borderBottom: active ? "1.5px solid #D4AF37" : "1.5px solid transparent",
                  transition: "font-size 0.25s ease, color 0.2s, font-weight 0.2s",
                }}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => navigate("/contact")}
            className="transition-all"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.6rem",
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
