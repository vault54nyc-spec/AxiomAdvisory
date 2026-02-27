const credentials = [
  { abbr: "CCOS", full: "Certified Chief of Staff" },
  { abbr: "PMP", full: "Project Management Professional" },
  { abbr: "CFE", full: "Certified Fraud Examiner" },
  { abbr: "EMBA", full: "Executive MBA" },
  { abbr: "Fortune 10", full: "Enterprise Experience" },
  { abbr: "F10", full: "Strategic Operations" },
];

export function About() {
  return (
    <section id="about" className="bg-[#FAFAFA] py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="text-[#D4AF37] mb-3"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            About
          </p>
          <div className="flex items-center gap-6">
            <h2
              className="text-[#0A0A0A]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400 }}
            >
              The Advisor
            </h2>
            <div className="flex-1 h-px bg-[#D4AF37]/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left — sticky credentials */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="mb-10">
                <span
                  className="text-[#D4AF37] block"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "4rem", fontWeight: 600, lineHeight: 1 }}
                >
                  16+
                </span>
                <span
                  className="text-[#0A0A0A]/50 mt-1 block"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Years of Experience
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {credentials.map((c) => (
                  <div
                    key={c.abbr}
                    className="border border-gray-200 px-4 py-3 group hover:border-[#D4AF37] transition-colors"
                  >
                    <span
                      className="text-[#0A0A0A] block"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      {c.abbr}
                    </span>
                    <span
                      className="text-[#0A0A0A]/40 block mt-0.5"
                      style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.625rem", letterSpacing: "0.04em" }}
                    >
                      {c.full}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — copy */}
          <div className="lg:col-span-8">
            <div className="max-w-2xl space-y-6">
              <p
                className="text-[#0A0A0A]/80"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1.0625rem", lineHeight: 1.85 }}
              >
                Axiom Advisory Partners was founded on a singular premise: that strategic counsel should be as rigorous as it is actionable. With over sixteen years of experience spanning Fortune 10 enterprises, federal agencies, and high-growth ventures, our founder brings a rare depth of operational fluency to every engagement.
              </p>
              <p
                className="text-[#0A0A0A]/80"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1.0625rem", lineHeight: 1.85 }}
              >
                Her career has been defined by building governance frameworks from the ground up — designing organizational structures that scale, compliance architectures that withstand regulatory scrutiny, and crisis management protocols that perform under pressure. From third-party risk management programs to enterprise-wide operational transformations, she has consistently served as the strategic center of gravity for complex, cross-functional initiatives.
              </p>
              <p
                className="text-[#0A0A0A]/80"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1.0625rem", lineHeight: 1.85 }}
              >
                Beyond the boardroom, she has deployed operational expertise in disaster relief contexts — coordinating multi-agency responses and standing up infrastructure in high-stakes, resource-constrained environments. This versatility is the signature of the Axiom approach: precision in strategy, resilience in execution.
              </p>
              <p
                className="text-[#0A0A0A]/80"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1.0625rem", lineHeight: 1.85 }}
              >
                As a minority-owned firm based in Dallas–Fort Worth, Axiom Advisory Partners is committed to delivering institutional-grade advisory services with the agility and attentiveness that only a boutique practice can offer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
