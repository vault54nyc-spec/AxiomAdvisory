import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setMobileOpen(false);
  }, [location.pathname]);

  // Always show solid bg on non-home pages; on home only after scroll
  const showBg = !isHome || scrolled;

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Services", action: () => scrollTo("services") },
    { label: "About", action: () => scrollTo("about") },
    { label: "Work", action: () => scrollTo("work") },
    { label: "Brand Tool", action: () => { setMobileOpen(false); navigate("/brand-tool"); } },
    { label: "For Our Partners", action: () => { setMobileOpen(false); navigate("/partners"); } },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: showBg ? "rgba(255,255,255,0.94)" : "transparent",
        backdropFilter: showBg ? "blur(16px)" : "none",
        WebkitBackdropFilter: showBg ? "blur(16px)" : "none",
        borderBottom: showBg ? "1px solid rgba(0,0,0,0.07)" : "none",
        boxShadow: showBg ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <span
            className="font-bold tracking-tight transition-colors duration-300"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              color: showBg ? "#0A0A0A" : "#FFFFFF",
              textShadow: showBg ? "none" : "0 1px 10px rgba(0,0,0,0.5)",
            }}
          >
            Axiom Advisory
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#D4AF37", letterSpacing: "0.15em" }}>
            PARTNERS
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="transition-colors hover:text-[#D4AF37]"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.03em",
                color: link.label === "For Our Partners" ? "#D4AF37" : showBg ? "#0A0A0A" : "rgba(255,255,255,0.88)",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2 text-sm font-semibold transition-all"
            style={{
              fontFamily: "'Barlow', sans-serif",
              background: "transparent",
              border: showBg ? "1px solid rgba(212,175,55,0.6)" : "1px solid rgba(255,255,255,0.45)",
              color: showBg ? "#D4AF37" : "#FFFFFF",
              letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "#D4AF37"; b.style.color = "#0A0A0A"; b.style.borderColor = "#D4AF37";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "transparent";
              b.style.color = showBg ? "#D4AF37" : "#FFFFFF";
              b.style.borderColor = showBg ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.45)";
            }}
          >
            Begin Engagement
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex flex-col gap-[5px] p-2" aria-label="Toggle menu">
          <span className={`block w-6 h-[2px] transition-all ${showBg ? "bg-[#0A0A0A]" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] transition-all ${showBg ? "bg-[#0A0A0A]" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] transition-all ${showBg ? "bg-[#0A0A0A]" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button key={link.label} onClick={link.action}
              className={`text-left hover:text-[#D4AF37] transition-colors ${link.label === "For Our Partners" ? "text-[#D4AF37] font-semibold" : "text-[#0A0A0A]"}`}
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9375rem", fontWeight: 500 }}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")}
            className="mt-2 px-5 py-2.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-colors w-fit text-sm font-semibold"
            style={{ fontFamily: "'Barlow', sans-serif" }}>
            Begin Engagement
          </button>
        </div>
      )}
    </nav>
  );
}
