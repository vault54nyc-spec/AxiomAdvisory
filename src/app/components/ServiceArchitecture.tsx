type ServiceArchitectureItem = {
  num: string;
  title: string;
  strapline: string;
  description: string;
  deliverables: string[];
  engagementTypes: string;
};

const serviceArchitecture: ServiceArchitectureItem[] = [
  {
    num: "01",
    title: "Fractional Chief of Staff",
    strapline: "The Principal's Operating System",
    description:
      "Executive-level operational leadership embedded within your organization to protect principal focus and drive cross-functional execution.",
    deliverables: [
      "Executive calendar architecture and time recovery",
      "Meeting governance design and decision-rights standards",
      "Priority triage and cross-functional alignment management",
      "Board prep, principal briefings, and read packet development",
    ],
    engagementTypes: "Retained fractional, project-based, interim/transitional",
  },
  {
    num: "02",
    title: "Brand Infrastructure & Market Presence",
    strapline: "Built to Be Found, Designed to Be Remembered",
    description:
      "Applies governance-level rigor to market positioning, digital presence, and go-to-market execution.",
    deliverables: [
      "Brand positioning and messaging architecture",
      "Go-to-market strategy using the 4 Ps framework",
      "Audience segmentation and competitive landscape analysis",
      "Website and digital presence information architecture",
    ],
    engagementTypes: "Brand strategy sprint, GTM advisory retainer, digital presence project",
  },
  {
    num: "03",
    title: "Brand Decision Studio",
    strapline: "Decide Before You Build",
    description:
      "Structured decision framework for founders and executives to lock positioning, creative direction, and launch strategy.",
    deliverables: [
      "Positioning pathway evaluation",
      "Brand identity and narrative direction mapping",
      "Audience-fit and offer clarity assessment",
      "Decision-ready GTM recommendation",
    ],
    engagementTypes: "Decision sprint, founder workshop, pre-launch strategy build",
  },
  {
    num: "04",
    title: "Strategy to Structure",
    strapline: "From Vision to Operating Model",
    description:
      "Translates strategic intent into operating models, accountability systems, and planning cadences that hold across teams.",
    deliverables: [
      "Strategic planning facilitation and multi-horizon roadmapping",
      "Operating model design and decision-rights frameworks",
      "OKR/KPI governance architecture",
      "Quarterly and annual planning cycle design",
    ],
    engagementTypes: "Strategic advisory retainer, quarterly facilitation, planning cycle support",
  },
  {
    num: "05",
    title: "End-to-End Operations Management",
    strapline: "The Infrastructure Behind the Vision",
    description:
      "Builds and manages governance infrastructure, process systems, and execution accountability across high-stakes initiatives.",
    deliverables: [
      "Enterprise portfolio and program governance",
      "Executive committee structures and escalation frameworks",
      "PMO design and implementation",
      "Operational health dashboards and reporting cadences",
    ],
    engagementTypes: "Embedded operator, project-based governance, PMO buildout",
  },
  {
    num: "06",
    title: "AI Governance & Compliance Framework",
    strapline: "Structure for What's Coming",
    description:
      "Designs practical policy, risk, and compliance infrastructure for organizations adopting AI at speed.",
    deliverables: [
      "AI readiness assessments",
      "AI use policy development and vendor-risk standards",
      "AI risk tiering and mitigation protocols",
      "Internal governance committee and charter development",
    ],
    engagementTypes: "Assessment + framework build, ongoing compliance advisory, policy refresh retainer",
  },
  {
    num: "07",
    title: "Organizational Governance & Decision Architecture",
    strapline: "Clarity at Every Level",
    description:
      "Eliminates ownership ambiguity and restores operating momentum through explicit governance and decision systems.",
    deliverables: [
      "Decision-rights frameworks (RACI, DACI, RAPID)",
      "Committee and council structure design",
      "Policy/procedure architecture and controls",
      "Board and executive governance optimization",
    ],
    engagementTypes: "Governance audit + design, ongoing advisory, board support",
  },
  {
    num: "08",
    title: "Executive Communications & Narrative Strategy",
    strapline: "What Gets Said, and How",
    description:
      "Develops high-stakes communication architecture that aligns stakeholders and supports executive credibility.",
    deliverables: [
      "Board and investor presentation development",
      "Transformation narratives and strategic memos",
      "Town hall/all-hands communication architecture",
      "Crisis messaging frameworks and thought leadership positioning",
    ],
    engagementTypes: "Project-based, retained communications partner, crisis surge",
  },
  {
    num: "09",
    title: "Crisis Management Infrastructure",
    strapline: "Ready Before You Need It",
    description:
      "Builds crisis readiness systems and response protocols, then supports leadership during live disruption.",
    deliverables: [
      "Crisis readiness assessments and gap analysis",
      "Incident command structure design",
      "Communication cascade protocols",
      "Tabletop exercise facilitation and post-crisis hardening",
    ],
    engagementTypes: "Plan development, tabletop facilitation, readiness retainer, embedded crisis lead",
  },
  {
    num: "10",
    title: "Strategic Risk Assessment",
    strapline: "See It Before It Sees You",
    description:
      "Identifies and prioritizes operational, reputational, and compliance exposure before risk becomes incident.",
    deliverables: [
      "Organizational risk inventory and heat mapping",
      "Operational and reputational risk assessments",
      "Third-party/vendor due diligence frameworks",
      "ERM committee structures and reporting cadence design",
    ],
    engagementTypes: "Point-in-time assessment, ongoing risk advisory, ERM buildout",
  },
];

const engagementModels = [
  {
    model: "Embedded Retainer",
    description: "Monthly recurring engagement with defined hours and deliverables.",
    bestFor: "Fractional CoS, ongoing governance, communications",
  },
  {
    model: "Strategic Advisory",
    description: "Ongoing strategic counsel without execution deliverables.",
    bestFor: "Board-level support, CEO strategy, long-range planning",
  },
  {
    model: "Project-Based",
    description: "Scoped engagement with defined outcomes and timeline.",
    bestFor: "Crisis plans, governance builds, AI frameworks",
  },
  {
    model: "Surge/Interim",
    description: "Full-time equivalent embedded for a defined period.",
    bestFor: "Leadership gaps, transformations, M&A integration",
  },
  {
    model: "Assessment Sprint",
    description: "2-4 week diagnostic with an executive-ready deliverable.",
    bestFor: "Risk assessments, governance audits, readiness reviews",
  },
];

const proofPoints = [
  "Executive governance and portfolio management support at Fortune 10 scale",
  "Meeting governance redesign with 11-15 hours/week recovered for principal time",
  "C-suite presentation architecture for high-visibility strategic initiatives",
  "Enterprise disaster relief operations and real-time decision governance",
  "Third-party risk and major process auditing at enterprise scale",
];

export function ServiceArchitecture() {
  return (
    <section id="architecture" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p
            className="text-[#D4AF37] mb-3"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            Service Architecture
          </p>
          <div className="flex items-center gap-6">
            <h2
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400 }}
            >
              Built for Executive-Grade Execution
            </h2>
            <div className="flex-1 h-px bg-[#D4AF37]/40" />
          </div>
        </div>

        <div className="border border-[#D4AF37]/25 bg-[#111111] px-6 py-8 lg:px-10 mb-12">
          <p className="text-white/80 max-w-4xl" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.9 }}>
            Axiom Advisory Partners delivers operational intelligence, governance infrastructure, and strategic leadership without the overhead of
            permanent executive hires. We operate at the intersection of structure and execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceArchitecture.map((service) => (
            <article key={service.num} className="border border-white/10 bg-[#111111] p-6 lg:p-7 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[#D4AF37]" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                  {service.num}
                </span>
                <span className="text-white/30" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {service.strapline}
                </span>
              </div>
              <h3 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", lineHeight: 1.4 }}>
                {service.title}
              </h3>
              <p className="text-white/65 mb-4" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", lineHeight: 1.75 }}>
                {service.description}
              </p>
              <ul className="space-y-2 mb-4">
                {service.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="text-white/55 pl-4 relative"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7 }}
                  >
                    <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
                    {deliverable}
                  </li>
                ))}
              </ul>
              <p className="text-white/50 border-t border-white/10 pt-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.7 }}>
                {service.engagementTypes}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 border border-white/10 bg-[#111111] p-6 lg:p-8">
            <h3 className="text-white mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 500 }}>
              Engagement Models
            </h3>
            <div className="space-y-4">
              {engagementModels.map((item) => (
                <div key={item.model} className="border border-white/10 p-4 lg:p-5">
                  <p className="text-[#D4AF37]" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {item.model}
                  </p>
                  <p className="text-white/80 mt-2" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                  <p className="text-white/55 mt-1.5" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7 }}>
                    Best for: {item.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-2 border border-white/10 bg-[#111111] p-6 lg:p-8">
            <h3 className="text-white mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 500 }}>
              Proof Points
            </h3>
            <ul className="space-y-2.5">
              {proofPoints.map((point) => (
                <li
                  key={point}
                  className="text-white/65 pl-4 relative"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7 }}
                >
                  <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
