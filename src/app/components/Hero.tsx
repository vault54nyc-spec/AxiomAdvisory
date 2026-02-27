const heroImg = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/image.jpg";
const panelImg1 = "https://images.unsplash.com/photo-1769628027250-d2a7a5a4eb64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZSUyMHN1aXQlMjBkYXJrJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjE2MTE5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const panelImg2 = "https://images.unsplash.com/photo-1709803857154-d20ee16ff763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtZWV0aW5nJTIwdGFibGUlMjBkb2N1bWVudHMlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyMTYxMTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

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
    <section className="relative min-h-screen bg-[#EFECE6] overflow-hidden flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Axiom Advisory hero banner"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EC]/88 via-[#F5F2EC]/62 to-[#F5F2EC]/28" />
      </div>

      <div className="relative flex-1 flex max-w-[1440px] mx-auto w-full px-6 lg:px-12 pt-24">
        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-end pb-16 lg:pb-20">
          {/* Headline */}
          <h1
            className="text-[#0A0A0A] mb-10 max-w-2xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Strategic counsel.
            <br />
            <span style={{ color: "#D4AF37" }}>Without</span> compromise.
          </h1>

          {/* Bottom bar */}
          <div className="border-t border-[#0A0A0A]/20 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <p
              className="text-[#0A0A0A]/70"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Advisory / Governance / Operations / Brand
            </p>

            <p
              className="text-[#0A0A0A]/85 max-w-md"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9375rem", lineHeight: 1.7 }}
            >
              Axiom Advisory Partners delivers strategic advisory and operational architecture for organizations navigating complexity at scale.
            </p>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <button
                onClick={() => scrollTo("services")}
                className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all"
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

        {/* Right panel images — desktop */}
        <div className="hidden xl:flex flex-col gap-3 w-[36%] pl-8 pb-16 pt-8">
          <div className="flex-1 overflow-hidden">
            <img src={panelImg1} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <img src={panelImg2} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Right sidebar stats */}
      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col border-l border-[#0A0A0A]/12">
        {stats.map((stat, i) => (
          <div key={i} className="px-8 py-6 border-b border-[#0A0A0A]/12 last:border-b-0">
            <div
              className="text-[#D4AF37]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600 }}
            >
              {stat.value}
            </div>
            <div
              className="text-[#0A0A0A]/60 mt-1"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
