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
    <section className="relative overflow-hidden flex flex-col" style={{ minHeight: '100svh' }}>
      {/* Background image — centered on all screen sizes */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Axiom Advisory Partners"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 10%" }}
          loading="eager"
        />
        {/* Gradient only at bottom third — keeps subject fully visible */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.50) 30%, rgba(10,10,10,0.05) 65%, transparent 100%)" }} />
      </div>

      {/* Content — stacked at bottom on mobile, bottom-left on desktop */}
      <div className="relative flex-1 flex flex-col justify-end max-w-[1440px] mx-auto w-full px-5 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-28">

        {/* Label */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
          <p className="text-[#D4AF37] mb-4 uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-bold"
            style={{ fontFamily: "'DM Mono', monospace" }}>
            Advisory · Governance · Operations · Brand
          </p>
        </div>

        {/* Headline — "Strategic counsel." on its own line, tagline below */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(26px)", transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s" }}>
          <h1 className="text-white mb-2 leading-[1.06]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 5vw, 4.5rem)",
              fontWeight: 400,
              textShadow: "0 2px 40px rgba(0,0,0,0.7)",
            }}>
            Axiom Advisory Partners
          </h1>
          <p className="text-white/70 mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1rem, 2.2vw, 1.6rem)",
              fontStyle: "italic",
              fontWeight: 300,
              textShadow: "0 2px 20px rgba(0,0,0,0.6)",
            }}>
            Strategic counsel.{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Without</em> compromise.
          </p>
        </div>

        {/* Stats + description + buttons */}
        <div
          className="border-t border-white/15 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-end"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s" }}
        >
          {/* Stats — hidden on mobile to avoid clutter */}
          <div className="hidden lg:flex gap-8">
            {[
              { value: "4+", label: "Certifications" },
              { value: "F10", label: "Enterprise Background" },
              { value: "10", label: "Service Lines" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600 }}>{s.value}</p>
                <p className="text-white/40 uppercase tracking-widest mt-0.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/60 text-sm sm:text-base" style={{ fontFamily: "'Barlow', sans-serif", lineHeight: 1.7 }}>
            Axiom Advisory Partners delivers strategic advisory and operational architecture for organizations navigating complexity at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <button
              onClick={() => scrollTo("services")}
              className="group relative px-5 py-3 border border-[#D4AF37]/60 text-[#D4AF37] text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative group-hover:text-[#0A0A0A] transition-colors duration-300">Explore Services</span>
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="group relative px-5 py-3 bg-[#D4AF37] text-[#0A0A0A] text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Begin Engagement</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ opacity: visible ? 0.4 : 0, transition: "opacity 0.7s ease 1.1s" }}
      >
        <div className="w-px h-10 bg-white/40 animate-pulse" />
        <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]" style={{ fontFamily: "'DM Mono', monospace" }}>Scroll</p>
      </div>
    </section>
  );
}
