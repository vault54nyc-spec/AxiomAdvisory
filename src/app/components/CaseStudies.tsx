const cases = [
  {
    num: "01",
    sector: "Healthcare Governance",
    headline: "Redesigning Compliance Architecture for a Regional Health System",
    desc: "Developed and implemented a governance framework for a multi-facility healthcare network, establishing decision-rights protocols, regulatory compliance workflows, and board-level reporting structures that reduced audit findings by 40%.",
  },
  {
    num: "02",
    sector: "Consumer Brand Crisis",
    headline: "Stabilizing a National Brand Through Reputational Disruption",
    desc: "Led crisis management and communications strategy for a consumer brand facing public scrutiny, designing rapid-response protocols, stakeholder messaging frameworks, and internal alignment structures that restored market confidence within 90 days.",
  },
  {
    num: "03",
    sector: "Nonprofit Transformation",
    headline: "Operational Rebuild for a National Nonprofit Organization",
    desc: "Architected a full operational transformation for a nonprofit scaling from regional to national impact — restructuring teams, implementing program governance, and building donor-facing reporting infrastructure that increased funding by 2.5×.",
  },
];

export function CaseStudies() {
  return (
    <section id="work" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="text-[#D4AF37] mb-3"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Case Studies
          </p>
          <div className="flex items-center gap-6">
            <h2
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400 }}
            >
              Where We've Operated
            </h2>
            <div className="flex-1 h-px bg-[#D4AF37]/40" />
          </div>
        </div>

        {/* Cases */}
        <div className="divide-y divide-white/10">
          {cases.map((c) => (
            <div key={c.num} className="py-12 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              <div className="lg:col-span-1">
                <span
                  className="text-[#D4AF37]"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.875rem", fontWeight: 500 }}
                >
                  {c.num}
                </span>
              </div>
              <div className="lg:col-span-2">
                <span
                  className="text-white/40"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {c.sector}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h3
                  className="text-white"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.4 }}
                >
                  {c.headline}
                </h3>
              </div>
              <div className="lg:col-span-5">
                <p
                  className="text-white/50"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", lineHeight: 1.75 }}
                >
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
