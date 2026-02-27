const services = [
  { num: "01", name: "Fractional Chief of Staff", desc: "Embedded executive support for CEOs navigating growth, restructuring, or transformation without the overhead of a full-time hire." },
  { num: "02", name: "Strategy to Structure", desc: "Translating high-level strategic vision into organizational design, workflows, and accountability frameworks that drive execution." },
  { num: "03", name: "End-to-End Operations Management", desc: "Full-spectrum operational oversight — from process architecture to vendor management and cross-functional alignment." },
  { num: "04", name: "AI Governance & Compliance Framework", desc: "Designing responsible AI adoption policies, risk controls, and compliance structures aligned with emerging regulatory standards." },
  { num: "05", name: "Organizational Governance & Decision Architecture", desc: "Building governance models and decision-rights frameworks that enable clarity, speed, and institutional accountability." },
  { num: "06", name: "Executive Communications & Narrative Strategy", desc: "Crafting executive-level messaging, board presentations, and stakeholder narratives that move audiences and secure alignment." },
  { num: "07", name: "Crisis Management Infrastructure", desc: "Designing incident response protocols, communications playbooks, and continuity frameworks before disruption strikes." },
  { num: "08", name: "Strategic Risk Assessment", desc: "Identifying, quantifying, and mitigating enterprise risks across operational, reputational, and regulatory dimensions." },
  { num: "09", name: "Brand Strategy & Market Presence", desc: "Positioning organizations for market differentiation through strategic brand architecture, narrative, and competitive analysis." },
  { num: "10", name: "Brand Decision Studio", desc: "Interactive strategic tool that helps founders and executive teams choose positioning, visual direction, GTM path, and service structure." },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="text-[#D4AF37] mb-3"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Capabilities
          </p>
          <div className="flex items-center gap-6">
            <h2
              className="text-[#0A0A0A]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400 }}
            >
              What We Build
            </h2>
            <div className="flex-1 h-px bg-[#D4AF37]/40" />
          </div>
        </div>

        {/* 3×3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.num}
              className="group border border-gray-200 p-8 hover:border-[#D4AF37] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default"
            >
              <span
                className="text-[#D4AF37]"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", fontWeight: 500 }}
              >
                {service.num}
              </span>
              <h3
                className="text-[#0A0A0A] mt-4 mb-3"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.3 }}
              >
                {service.name}
              </h3>
              <p
                className="text-[#0A0A0A]/60"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", lineHeight: 1.7 }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
