const heroImg = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/image.jpg";

const stats = [
  { value: "4+", label: "Certifications" },
  { value: "F10", label: "Enterprise Background" },
  { value: "10", label: "Service Lines" },
];

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden flex flex-col">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Axiom Advisory hero"
          className="w-full h-full object-cover object-center opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]/80" />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-between max-w-[1440px] mx-auto w-full px-6 lg:px-16 pt-36 pb-16">

        {/* Top label */}
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-6"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Advisory / Governance / Operations / Brand
          </p>
        </div>

        {/* Center headline — isolated so nothing overlaps */}
        <div className="flex-1 flex flex-col justify-center py-12">
          <h1
            className="text-white leading-[1.08] max-w-3xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 400,
              textShadow: "0 2px 24px rgba(0,0,0,0.5)",
            }}
          >
            Strategic counsel.
            <br />
            <span style={{ color: "#D4AF37" }}>Without</span> compromise.
          </h1>
        </div>

        {/* Bottom bar — separated from headline */}
        <div className="border-t border-white/10 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          <div className="hidden lg:flex flex-col gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <span
                  className="text-[#D4AF37]"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600 }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-white/40 uppercase tracking-widest"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <p
            className="text-white/60 max-w-md leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9375rem", lineHeight: 1.7 }}
          >
            Axiom Advisory Partners delivers strategic advisory and operational architecture for organizations navigating complexity at scale.
          </p>

          <div className="flex flex-wrap gap-4 lg:justify-end">
            <button
              onClick={() => scrollTo("services")}
              className="px-6 py-3 border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.04em" }}
            >
              Explore Services
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-all"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.04em" }}
            >
              Begin Engagement
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
