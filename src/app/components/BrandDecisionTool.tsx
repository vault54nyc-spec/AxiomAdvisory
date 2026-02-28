import { useMemo, useState } from "react";

type DecisionCategoryId = "voice" | "palette" | "logo" | "tagline" | "layout" | "tier" | "gtm" | "content";

type DecisionOption = {
  value: 1 | 2 | 3;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

type DecisionCategory = {
  id: DecisionCategoryId;
  label: string;
  helper: string;
  options: DecisionOption[];
};

export type BrandSelections = Record<DecisionCategoryId, 1 | 2 | 3 | null>;

export type BrandBriefPayload = {
  generatedAt: string;
  selections: BrandSelections;
  summary: Record<DecisionCategoryId, string>;
};

type BrandDecisionToolProps = {
  submitLabel?: string;
  onSubmitBrief?: (brief: BrandBriefPayload) => Promise<void>;
};

const categories: DecisionCategory[] = [
  {
    id: "voice",
    label: "Brand Direction",
    helper: "Choose your positioning voice.",
    options: [
      {
        value: 1,
        title: "The Quiet Architect",
        subtitle: "Refined Authority",
        description:
          "Power communicated through precision and restraint for board-facing clients who want measured strategic counsel.",
        tags: ["Fortune 500 Adjacent", "Premium Pricing", "C-Suite"],
      },
      {
        value: 2,
        title: "The Strategic Operator",
        subtitle: "Operational Intelligence",
        description:
          "Execution-forward, embedded advisory built for growth-stage teams that need strategy translated into action.",
        tags: ["Growth Companies", "Retainer Model", "Fractional CoS"],
      },
      {
        value: 3,
        title: "The Governing Standard",
        subtitle: "Compliance Intelligence",
        description:
          "Governance and compliance leadership for organizations facing AI, regulatory, and crisis-readiness pressure.",
        tags: ["AI Governance", "Institutional", "Crisis Ready"],
      },
    ],
  },
  {
    id: "palette",
    label: "Color Palette",
    helper: "Select the visual color direction.",
    options: [
      {
        value: 1,
        title: "Oxford & Gold",
        subtitle: "Institutional Gravitas",
        description: "Deep navy, warm gold, ivory, and steel for restrained enterprise presence.",
        tags: ["Direction 01", "Formal", "Boardroom"],
      },
      {
        value: 2,
        title: "Onyx & Gilt",
        subtitle: "Luxury Contrast",
        description: "Near-black, bright gold, and off-white for sharp, modern consulting aesthetics.",
        tags: ["Direction 02", "Bold", "Premium"],
      },
      {
        value: 3,
        title: "Forest & Brass",
        subtitle: "Trust and Stability",
        description: "Deep green, brass, and warm cream to signal governance confidence and durability.",
        tags: ["Direction 03", "Trusted", "Distinctive"],
      },
    ],
  },
  {
    id: "logo",
    label: "Logo Concept",
    helper: "Pick your primary logo system.",
    options: [
      {
        value: 1,
        title: "Concept A",
        subtitle: "Monogram Wordmark",
        description: "A clean typographic identity where the name itself carries authority.",
        tags: ["Timeless", "Minimal", "Editorial"],
      },
      {
        value: 2,
        title: "Concept B",
        subtitle: "Icon + Lockup",
        description: "Geometric mark plus lockup that scales well to social avatars and watermarks.",
        tags: ["Digital", "Flexible", "Brand Asset"],
      },
      {
        value: 3,
        title: "Concept C",
        subtitle: "Editorial Drop Cap",
        description: "Oversized stylized A with stacked caps for a strong signature presence.",
        tags: ["Distinctive", "Confident", "Premium"],
      },
    ],
  },
  {
    id: "tagline",
    label: "Tagline",
    helper: "Select your core message line.",
    options: [
      {
        value: 1,
        title: "Where Strategy Becomes Structure.",
        subtitle: "Operational",
        description: "Communicates execution and clarity for advisory + implementation work.",
        tags: ["Versatile", "Clear", "Practical"],
      },
      {
        value: 2,
        title: "Governance Without Apology.",
        subtitle: "Compliance-Forward",
        description: "Bold position that differentiates in governance and AI-risk advisory.",
        tags: ["Strong", "Differentiated", "Direct"],
      },
      {
        value: 3,
        title: "The Architecture of Excellence.",
        subtitle: "Premium",
        description: "Aspirational and scalable language that works across client segments.",
        tags: ["Scalable", "Elegant", "Universal"],
      },
    ],
  },
  {
    id: "layout",
    label: "Website Layout",
    helper: "Define your site architecture.",
    options: [
      {
        value: 1,
        title: "The Authority Site",
        subtitle: "5 Pages",
        description: "Comprehensive long-scroll positioning with services, credentials, proof, and contact pathways.",
        tags: ["Home/Services/About/Work/Contact", "Credibility"],
      },
      {
        value: 2,
        title: "The Minimalist Consultancy",
        subtitle: "3 Pages",
        description: "Split-screen premium approach with focused copy and fewer navigational choices.",
        tags: ["Home/Work/Contact", "Lean"],
      },
      {
        value: 3,
        title: "The Platform Site",
        subtitle: "7+ Pages",
        description: "Pipeline-oriented layout with resources, lead magnets, and thought leadership engine.",
        tags: ["Resources + Blog", "Pipeline"],
      },
    ],
  },
  {
    id: "tier",
    label: "Service Structure",
    helper: "Choose your commercial model.",
    options: [
      {
        value: 1,
        title: "Project-Based Engagements",
        subtitle: "Defined Scope",
        description: "Best for one-off governance, crisis, planning, and framework projects.",
        tags: ["Fixed Deliverables", "Short Cycle", "Clear Outcome"],
      },
      {
        value: 2,
        title: "Retainer / Embedded Model",
        subtitle: "Monthly Advisory Access",
        description: "Ideal for ongoing support, fractional chief-of-staff work, and executive continuity.",
        tags: ["Recurring Revenue", "Partnership", "Continuity"],
      },
      {
        value: 3,
        title: "The Axiom System (Hybrid)",
        subtitle: "Diagnostic to Retainer",
        description: "Productized entry offer that naturally flows into higher-value retained engagements.",
        tags: ["Funnel", "Scalable", "Progressive"],
      },
    ],
  },
  {
    id: "gtm",
    label: "Go-to-Market Strategy",
    helper: "Select launch motion.",
    options: [
      {
        value: 1,
        title: "Warm Network Launch",
        subtitle: "Fast Validation",
        description: "Activate existing relationships to secure early clients and references quickly.",
        tags: ["0-90 Day Speed", "Direct Outreach", "Referrals"],
      },
      {
        value: 2,
        title: "Thought Leadership Play",
        subtitle: "Category Authority",
        description: "Own narrative through consistent articles, newsletter, and public speaking.",
        tags: ["Content Engine", "Inbound", "Long-Term"],
      },
      {
        value: 3,
        title: "Channel Partner Strategy",
        subtitle: "Distribution Leverage",
        description: "Build referral partnerships with firms already trusted by your target clients.",
        tags: ["B2B Partnerships", "Shared Pipeline", "Compounding"],
      },
    ],
  },
  {
    id: "content",
    label: "Content Pillar",
    helper: "Pick your communication model.",
    options: [
      {
        value: 1,
        title: "Authority Positioning",
        subtitle: "Pronouncement Model",
        description: "Publish decisive, standards-setting viewpoints backed by your credentials.",
        tags: ["High Trust", "Executive Audience", "Strategic Tone"],
      },
      {
        value: 2,
        title: "Problem-Led Storytelling",
        subtitle: "Narrative Model",
        description: "Lead with anonymized client patterns and lessons to convert through recognition.",
        tags: ["High Conversion", "Empathy", "Practical"],
      },
      {
        value: 3,
        title: "The Governance Brief",
        subtitle: "Intelligence Feed",
        description: "Regular governance and AI-policy updates that position Axiom as required reading.",
        tags: ["Newsletter Ready", "Scalable", "Always-On"],
      },
    ],
  },
];

const voiceInsights: Record<1 | 2 | 3, { fit: string; copy: string; keywords: string[] }> = {
  1: {
    fit: "Best for enterprise-adjacent clients seeking precise strategic counsel with high trust requirements.",
    keywords: ["Precision", "Restraint", "Gravitas", "Institutional"],
    copy: "Axiom Advisory Partners provides senior-level strategic counsel to leadership teams navigating complexity.",
  },
  2: {
    fit: "Ideal for growth-stage operators who need embedded execution support, not advisory memos.",
    keywords: ["Execution", "Embedded", "Outcomes", "Pragmatic"],
    copy: "Axiom Advisory Partners embeds with leadership teams to bridge strategy and execution until the work is done.",
  },
  3: {
    fit: "Strong for governance-led mandates where compliance, risk architecture, and crisis readiness are core buying triggers.",
    keywords: ["Governance", "Compliance", "Standards", "Crisis-Ready"],
    copy: "Axiom Advisory Partners builds governance and compliance infrastructure organizations can no longer operate without.",
  },
};

const immediateNextSteps = {
  thisWeek: [
    "File LLC and complete EIN setup",
    "Register domain and reserve social handles",
    "Open business checking account",
    "Finalize logo/tagline and lock brand kit",
  ],
  first30Days: [
    "Launch website MVP and intake flow",
    "Draft MSA and service-specific SOW templates",
    "Build a first outreach list with named targets",
    "Publish initial authority content sequence",
  ],
};

const progressOrder: DecisionCategoryId[] = ["voice", "palette", "logo", "layout", "gtm"];

const categoryLookup: Record<DecisionCategoryId, DecisionCategory> = categories.reduce(
  (acc, category) => ({ ...acc, [category.id]: category }),
  {} as Record<DecisionCategoryId, DecisionCategory>,
);

export function BrandDecisionTool({ submitLabel, onSubmitBrief }: BrandDecisionToolProps) {
  const [selections, setSelections] = useState<BrandSelections>({
    voice: null,
    palette: null,
    logo: null,
    tagline: null,
    layout: null,
    tier: null,
    gtm: null,
    content: null,
  });
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const progressComplete = useMemo(
    () => progressOrder.filter((id) => selections[id] !== null).length,
    [selections],
  );

  const selectOption = (category: DecisionCategoryId, value: 1 | 2 | 3) => {
    setSelections((prev) => ({ ...prev, [category]: value }));
  };

  const getSummaryValue = (category: DecisionCategoryId) => {
    const value = selections[category];
    if (!value) {
      return "Not selected";
    }
    return categoryLookup[category].options.find((option) => option.value === value)?.title ?? "Not selected";
  };

  const summaryMap = useMemo(
    () =>
      categories.reduce(
        (acc, category) => ({ ...acc, [category.id]: getSummaryValue(category.id) }),
        {} as Record<DecisionCategoryId, string>,
      ),
    [selections],
  );

  const buildBriefPayload = (): BrandBriefPayload => ({
    generatedAt: new Date().toISOString(),
    selections,
    summary: summaryMap,
  });

  const buildTextSummary = () => [
      "AXIOM ADVISORY PARTNERS - BRAND BRIEF",
      "=".repeat(45),
      "",
      `Brand Direction: ${summaryMap.voice}`,
      `Color Palette: ${summaryMap.palette}`,
      `Logo Concept: ${summaryMap.logo}`,
      `Tagline: ${summaryMap.tagline}`,
      `Website Layout: ${summaryMap.layout}`,
      `Service Structure: ${summaryMap.tier}`,
      `GTM Strategy: ${summaryMap.gtm}`,
      `Content Pillar: ${summaryMap.content}`,
      "",
      "Generated by Axiom Brand Decision Tool",
      new Date().toLocaleDateString(),
    ];

  const exportSummary = () => {
    const lines = buildTextSummary();

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Axiom_Brand_Brief.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    if (!onSubmitBrief) return;

    const requiredComplete = categories.every((category) => selections[category.id] !== null);
    if (!requiredComplete) {
      setSubmitState("error");
      setSubmitMessage("Complete all decision categories before submitting.");
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      await onSubmitBrief(buildBriefPayload());
      setSubmitState("success");
      setSubmitMessage("Submission received. The Axiom team has been notified.");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Unable to submit your brief.");
    }
  };

  return (
    <section id="tool" className="bg-[#0D0D0F] py-24 lg:py-32 border-t border-[#D4AF37]/30 border-b border-[#D4AF37]/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p
            className="text-[#D4AF37] mb-3"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            Interactive Service
          </p>
          <div className="flex items-center gap-6 mb-5">
            <h2
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400 }}
            >
              Brand Decision Tool
            </h2>
            <div className="flex-1 h-px bg-[#D4AF37]/40" />
          </div>
          <p className="text-white/70 max-w-3xl" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.8 }}>
            Compare strategic directions, select your preferred architecture, and export a concise brief for your design and launch team.
          </p>
        </div>

        <div className="mb-8 border border-white/10 bg-[#141416] p-5 lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-white/70" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Progress: {progressComplete} / {progressOrder.length} key selections complete
            </p>
            <div className="flex items-center gap-2.5">
              {progressOrder.map((id) => (
                <span
                  key={id}
                  className={`w-2.5 h-2.5 rounded-full ${selections[id] ? "bg-[#D4AF37]" : "bg-white/20"}`}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-9">
          {categories.map((category) => (
            <div key={category.id} className="border border-white/10 bg-[#121214] p-5 lg:p-6">
              <div className="mb-5">
                <h3 className="text-white mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.375rem", fontWeight: 500 }}>
                  {category.label}
                </h3>
                <p className="text-white/55" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {category.helper}
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {category.options.map((option) => {
                  const isSelected = selections[category.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => selectOption(category.id, option.value)}
                      className={`text-left border p-4 lg:p-5 transition-colors ${
                        isSelected
                          ? "border-[#D4AF37] bg-[#D4AF37]/10"
                          : "border-white/10 bg-[#17171A] hover:border-[#D4AF37]/40"
                      }`}
                    >
                      <p className="text-[#D4AF37] mb-2" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Option {option.value.toString().padStart(2, "0")}
                      </p>
                      <h4 className="text-white mb-1.5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", lineHeight: 1.35 }}>
                        {option.title}
                      </h4>
                      <p className="text-white/55 mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {option.subtitle}
                      </p>
                      <p className="text-white/65 mb-3" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7 }}>
                        {option.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {option.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 border border-white/15 text-white/55"
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5625rem", letterSpacing: "0.06em", textTransform: "uppercase" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {selections.voice && (
          <div className="mt-10 border border-[#D4AF37]/30 bg-[#141416] p-6 lg:p-8">
            <h3 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 500 }}>
              Voice Insight: {getSummaryValue("voice")}
            </h3>
            <p className="text-white/70 mb-3" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9375rem", lineHeight: 1.8 }}>
              {voiceInsights[selections.voice].fit}
            </p>
            <p className="text-white/65 mb-4" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", lineHeight: 1.8 }}>
              Sample copy: "{voiceInsights[selections.voice].copy}"
            </p>
            <div className="flex flex-wrap gap-2">
              {voiceInsights[selections.voice].keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-2.5 py-1.5 border border-[#D4AF37]/30 text-[#D4AF37]"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 border border-white/10 bg-[#141416] p-6 lg:p-8">
            <h3 className="text-white mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 500 }}>
              Your Brand Blueprint
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="border border-white/10 p-4">
                  <p className="text-white/40 mb-1" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {category.label}
                  </p>
                  <p className="text-white/85" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.65 }}>
                    {getSummaryValue(category.id)}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={exportSummary}
              className="mt-5 px-6 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.05em" }}
            >
              Export Brand Brief
            </button>
            {onSubmitBrief && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitState === "submitting"}
                className="mt-5 ml-3 px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c7a22f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.05em" }}
              >
                {submitState === "submitting" ? "Submitting..." : (submitLabel || "Submit to Axiom")}
              </button>
            )}
            {submitMessage && (
              <p
                className={`mt-3 text-sm ${submitState === "error" ? "text-red-400" : "text-[#D4AF37]"}`}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {submitMessage}
              </p>
            )}
          </div>

          <div className="border border-white/10 bg-[#141416] p-6 lg:p-8">
            <h3 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 500 }}>
              Immediate Next Steps
            </h3>
            <p className="text-[#D4AF37] mb-2" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              This Week
            </p>
            <ul className="space-y-2.5 mb-5">
              {immediateNextSteps.thisWeek.map((step) => (
                <li key={step} className="text-white/70 pl-4 relative" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7 }}>
                  <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
                  {step}
                </li>
              ))}
            </ul>
            <p className="text-[#D4AF37] mb-2" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              First 30 Days
            </p>
            <ul className="space-y-2.5">
              {immediateNextSteps.first30Days.map((step) => (
                <li key={step} className="text-white/70 pl-4 relative" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7 }}>
                  <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
