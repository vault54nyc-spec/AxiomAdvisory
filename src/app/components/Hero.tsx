import { useEffect, useState } from "react";

const heroImg = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/image.jpg";

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Axiom Advisory Partners"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        {/* Light gradient only at bottom for text legibility — subject stays visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/10 to-transparent" />
      </div>

      {/* Content pinned to bottom */}
      <div className="relative flex-1 flex flex-col justify-end max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 pt-28">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
          <p className="text-[#D4AF37] mb-5 uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>
            Advisory · Governance · Operations · Brand
          </p>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(26px)", transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s" }}>
          <h1 className="text-white mb-8 max-w-2xl leading-[1.06]"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5.5vw, 5rem)", fontWeight: 400, textShadow: "0 2px 40px rgba(0,0,0,0.55)" }}>
            Strategic counsel.<br />
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Without</em> compromise.
          </h1>
        </div>

        <div className="border-t border-white/15 pt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s" }}>
          <div className="hidden lg:flex gap-8">
            {[{ value: "4+", label: "Certifications" }, { value: "F10", label: "Enterprise Background" }, { value: "10", label: "Service Lines" }].map((s) => (
              <div key={s.label}>
                <p className="text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600 }}>{s.value}</p>
                <p className="text-white/40 uppercase tracking-widest mt-0.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm sm:text-base" style={{ fontFamily: "'Barlow', sans-serif", lineHeight: 1.7 }}>
            Axiom Advisory Partners delivers strategic advisory and operational architecture for organizations navigating complexity at scale.
          </p>
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <button onClick={() => scrollTo("services")}
              className="px-5 py-3 border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all text-sm font-semibold tracking-wide"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Explore Services
            </button>
            <button onClick={() => scrollTo("contact")}
              className="px-5 py-3 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-all text-sm font-semibold tracking-wide"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Begin Engagement
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ opacity: visible ? 0.4 : 0, transition: "opacity 0.7s ease 1.1s" }}>
        <div className="w-px h-10 bg-white/40 animate-pulse" />
        <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]" style={{ fontFamily: "'DM Mono', monospace" }}>Scroll</p>
      </div>
    </section>
  );
}
