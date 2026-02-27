const navLinks = ["Services", "About", "Work", "Contact"];

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0A0A0A] border border-[#D4AF37]/40 flex items-center justify-center">
              <span style={{ fontFamily: "'Playfair Display', serif", color: "#D4AF37", fontSize: "1rem", fontWeight: 700 }}>
                A
              </span>
            </div>
            <span
              className="text-white/60"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em" }}
            >
              AXIOM ADVISORY PARTNERS
            </span>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-white/40 hover:text-[#D4AF37] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.06em" }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="text-right">
            <p
              className="text-white/30"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em" }}
            >
              Axiom Advisory Partners, LLC
            </p>
            <p
              className="text-white/20 mt-1"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5625rem", letterSpacing: "0.08em" }}
            >
              Dallas–Fort Worth, TX · © 2026
            </p>
          </div>
        </div>
      </div>
      {/* Bottom gold rule */}
      <div className="h-px bg-[#D4AF37]/40" />
    </footer>
  );
}
