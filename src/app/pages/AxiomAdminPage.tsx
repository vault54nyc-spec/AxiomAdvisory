import { useState } from "react";
import { useNavigate } from "react-router";
import { ExternalLink, Clock, AlertCircle, Lock, Unlock, Send, FileText, ChevronDown, ChevronUp, CheckCircle, Edit3 } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
interface Portal {
  label: string;
  type: "partner" | "product";
  url: string;           // internal path or external URL
  external?: boolean;
  note: string;
  released: boolean;
}

interface Engagement {
  id: string;
  client: string;
  descriptor: string;
  type: string;
  status: "proposal" | "pending" | "active" | "complete";
  statusLabel: string;
  statusStyle: string;
  dotStyle: string;
  initiated: string;
  lastActivity: string;
  passCode: string;
  metrics: { label: string; value: string }[];
  flags: string[];
  color: string;
  accent: string;
  portals: Portal[];
  agreementsSent: boolean;
  agreementsUrl: string | null;
  clientLegalName: string;
  clientLegalNameConfirmed: boolean;
  sowApplicable: boolean;
  sowScope: string[];
  msaNote?: string;
}

/* ─── Data ───────────────────────────────────────────────── */
const INITIAL_ENGAGEMENTS: Engagement[] = [
  {
    id: "AXM-CBS-2026-001",
    client: "Cornbread Soul Food",
    descriptor: "Fast-Casual / Hospitality",
    type: "Brand & Operational Strategy",
    status: "proposal",
    statusLabel: "Proposal Delivered",
    statusStyle: "bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]",
    dotStyle: "bg-[#D4AF37]",
    initiated: "February 2026",
    lastActivity: "Strategic advisory delivered — 65-page diagnostic report",
    passCode: "cornbread123",
    metrics: [
      { label: "Report Pages", value: "65" },
      { label: "Audit Areas", value: "6" },
      { label: "Locations",   value: "4"  },
      { label: "Market Size", value: "$4.22B" },
    ],
    flags: [
      "No MSA executed",
      "No fees collected",
      "Awaiting client decision",
    ],
    color: "border-[#D4AF37]/20",
    accent: "#D4AF37",
    portals: [
      {
        label: "Partner Portal",
        type: "partner",
        url: "/partners/cornbread",
        note: "Axiom-hosted engagement page · brand diagnostic + strategic report",
        released: false,
      },
    ],
    agreementsSent: false,
    agreementsUrl: null,
    clientLegalName: "",
    clientLegalNameConfirmed: false,
    sowApplicable: false,
    sowScope: [],
    msaNote: "No SOW applicable for this engagement. Cornbread Soul Food received a strategic brand advisory and diagnostic report — no product or platform is being built under this engagement. A SOW will be generated if the client moves forward with a service build.",
  },
  {
    id: "AXM-K2K-2026-001",
    client: "K2K College Prep Services",
    descriptor: "HBCU Education Consulting",
    type: "Full-Scale Portal Build · Brand Identity · Digital Infrastructure",
    status: "pending",
    statusLabel: "Pending MSA Execution",
    statusStyle: "bg-white/5 border border-white/15 text-[#AAA]",
    dotStyle: "bg-[#AAA]",
    initiated: "March 22, 2026",
    lastActivity: "2.5-hour intake completed · Scope + budget calculator delivered",
    passCode: "k2k",
    metrics: [
      { label: "Full Scope Value",  value: "$20,750" },
      { label: "Audit Findings",   value: "15"      },
      { label: "Timeline",         value: "16 Wks"  },
      { label: "Initiation Dep.",  value: "$750"    },
    ],
    flags: [
      "No MSA executed",
      "No fees collected",
      "All dates TBD",
    ],
    color: "border-[#C9973A]/20",
    accent: "#C9973A",
    portals: [
      {
        label: "Partner Portal",
        type: "partner",
        url: "/partners/k2k/portal",
        note: "Axiom-hosted engagement page · scope, audit findings & budget calculator",
        released: false,
      },
      {
        label: "Student Portal",
        type: "product",
        url: "https://www.figma.com/make/UMAjL97ud2fduZ7yQYrbmg/K2K-COLLEGE-PREP-SERVICES?p=f&t=bu6LnwuANAret5Yq-0",
        external: true,
        note: "Product Axiom is building for K2K · currently in early development on Figma",
        released: false,
      },
    ],
    agreementsSent: false,
    agreementsUrl: null,
    clientLegalName: "",
    clientLegalNameConfirmed: false,
    sowApplicable: true,
    sowScope: [
      "Brand Identity System",
      "Public Website — 7 Pages",
      "Authenticated Client Portal — 8 Modules",
      "Advisor Admin Dashboard",
      "Technical Infrastructure (Domain, Hosting, Database, Auth)",
      "QA, Testing & Production Launch",
      "Post-Launch Support — 30 Days",
      "Project Management",
    ],
  },
];

/* ─── Helpers ────────────────────────────────────────────── */
const MONO = { fontFamily: "'DM Mono', monospace" };
const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS = { fontFamily: "'Barlow', sans-serif" };

/* ─── Component ──────────────────────────────────────────── */
export default function AxiomAdminPage() {
  const navigate = useNavigate();
  const [engagements, setEngagements] = useState<Engagement[]>(INITIAL_ENGAGEMENTS);
  const [expanded, setExpanded] = useState<string[]>(INITIAL_ENGAGEMENTS.map(e => e.id));

  const toggleExpanded = (id: string) =>
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const togglePortal = (engId: string, portalLabel: string) => {
    setEngagements(prev => prev.map(eng => {
      if (eng.id !== engId) return eng;
      return {
        ...eng,
        portals: eng.portals.map(p =>
          p.label === portalLabel ? { ...p, released: !p.released } : p
        ),
      };
    }));
  };

  const updateClientLegalName = (engId: string, name: string) => {
    setEngagements(prev => prev.map(eng =>
      eng.id === engId ? { ...eng, clientLegalName: name, clientLegalNameConfirmed: false } : eng
    ));
  };

  const confirmClientLegalName = (engId: string) => {
    setEngagements(prev => prev.map(eng =>
      eng.id === engId && eng.clientLegalName.trim() ? { ...eng, clientLegalNameConfirmed: true } : eng
    ));
  };

  const sendAgreements = (engId: string) => {
    // Placeholder — will trigger Supabase status update + Resend email when backend is live
    setEngagements(prev => prev.map(eng =>
      eng.id === engId ? { ...eng, agreementsSent: true } : eng
    ));
  };

  const pendingCount = engagements.filter(e => e.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-24 px-6 lg:px-16">
      <div className="max-w-[1200px] mx-auto space-y-12">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="space-y-3 border-b border-white/8 pb-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold" style={MONO}>
            Internal Use Only — Axiom Advisory Partners LLC
          </p>
          <h1 className="text-4xl font-bold text-white" style={SERIF}>
            Client Account Manager
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl" style={SANS}>
            Manage client portals, release access, and push agreements from one place. Do not share this URL.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 border border-white/10 text-white/30" style={MONO}>
              {engagements.length} Engagements
            </span>
            {pendingCount > 0 && (
              <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 border border-[#D4AF37]/20 text-[#D4AF37]/60" style={MONO}>
                {pendingCount} Pending MSA
              </span>
            )}
            <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 border border-white/10 text-white/30" style={MONO}>
              0 Fees Collected
            </span>
            <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 border border-white/10 text-white/20" style={MONO}>
              MSA/SOW · In Draft
            </span>
          </div>
        </div>

        {/* ── Engagement Cards ──────────────────────────────── */}
        <div className="space-y-6">
          {engagements.map((eng) => {
            const isExpanded = expanded.includes(eng.id);
            const allPortalsReleased = eng.portals.every(p => p.released);

            return (
              <div key={eng.id} className={`border ${eng.color} bg-white/[0.02]`}>

                {/* Card Header — always visible */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`text-[10px] tracking-widest uppercase px-3 py-1 flex items-center gap-2 ${eng.statusStyle}`}
                          style={MONO}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${eng.dotStyle}`} />
                          {eng.statusLabel}
                        </span>
                        <span className="text-[10px] tracking-widest uppercase text-white/20" style={MONO}>
                          {eng.id}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white" style={SERIF}>{eng.client}</h2>
                      <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: eng.accent, ...MONO }}>
                        {eng.descriptor}
                      </p>
                      <p className="text-white/40 text-sm" style={SANS}>{eng.type}</p>
                    </div>

                    <button
                      onClick={() => toggleExpanded(eng.id)}
                      className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white/40 text-[11px] tracking-widest uppercase hover:border-white/20 hover:text-white/60 transition-all self-start"
                      style={MONO}
                    >
                      {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                      {isExpanded ? "Collapse" : "Manage"}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-white/6 divide-y divide-white/6">

                    {/* ── Metrics ── */}
                    <div className="p-6 md:px-8">
                      <p className="text-[9px] uppercase tracking-widest text-white/25 mb-3" style={MONO}>
                        Engagement Metrics
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {eng.metrics.map((m, i) => (
                          <div key={i} className="bg-white/[0.03] border border-white/6 p-4">
                            <p className="text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1.5" style={MONO}>
                              {m.label}
                            </p>
                            <p className="text-xl font-bold text-white" style={SERIF}>{m.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── Portal Access Controls ── */}
                    <div className="p-6 md:px-8">
                      <p className="text-[9px] uppercase tracking-widest text-white/25 mb-3" style={MONO}>
                        Portal Access
                      </p>
                      <div className="space-y-3">
                        {eng.portals.map((portal) => (
                          <div
                            key={portal.label}
                            className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 border transition-all ${
                              portal.released
                                ? "border-[#D4AF37]/20 bg-[#D4AF37]/[0.03]"
                                : "border-white/8 bg-white/[0.02]"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/60" style={MONO}>
                                  {portal.label}
                                </span>
                                <span className={`text-[9px] uppercase tracking-widest px-2 py-[2px] ${
                                  portal.type === "product"
                                    ? "bg-[#C9973A]/10 text-[#C9973A]/70 border border-[#C9973A]/20"
                                    : "bg-white/5 text-white/30 border border-white/10"
                                }`} style={MONO}>
                                  {portal.type === "product" ? "Product Build" : "Engagement Page"}
                                </span>
                                <span className={`text-[9px] uppercase tracking-widest px-2 py-[2px] flex items-center gap-1 ${
                                  portal.released
                                    ? "text-[#D4AF37]/70 border border-[#D4AF37]/20"
                                    : "text-white/25 border border-white/8"
                                }`} style={MONO}>
                                  {portal.released ? <Unlock size={8} /> : <Lock size={8} />}
                                  {portal.released ? "Released" : "Locked"}
                                </span>
                              </div>
                              <p className="text-[11px] text-white/30 leading-4" style={SANS}>
                                {portal.note}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              {/* Preview link */}
                              <button
                                onClick={() => portal.external ? window.open(portal.url, "_blank") : navigate(portal.url)}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 text-white/40 text-[10px] tracking-widest uppercase hover:border-white/20 hover:text-white/60 transition-all"
                                style={MONO}
                              >
                                <ExternalLink size={9} />
                                Preview
                              </button>

                              {/* Release / Lock toggle */}
                              <button
                                onClick={() => togglePortal(eng.id, portal.label)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-widest uppercase transition-all ${
                                  portal.released
                                    ? "border border-[#D4AF37]/30 text-[#D4AF37]/70 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                                    : "border border-white/10 text-white/40 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]/60"
                                }`}
                                style={MONO}
                              >
                                {portal.released ? <Unlock size={9} /> : <Lock size={9} />}
                                {portal.released ? "Lock" : "Release"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Release note */}
                      {!allPortalsReleased && (
                        <p className="text-[10px] text-white/20 mt-3 leading-relaxed" style={SANS}>
                          Releasing a portal does not automatically notify the client. Use Send Agreements below to notify via email.
                        </p>
                      )}
                    </div>

                    {/* ── Agreements ── */}
                    <div className="p-6 md:px-8 space-y-4">
                      <p className="text-[9px] uppercase tracking-widest text-white/25" style={MONO}>
                        MSA + SOW
                      </p>

                      {/* Documents on file */}
                      <div className={`grid gap-3 ${eng.sowApplicable ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                        {/* MSA */}
                        <div className="flex items-start gap-3 bg-white/[0.02] border border-white/6 p-4">
                          <FileText size={12} className="text-white/25 mt-[2px] flex-shrink-0" />
                          <div>
                            <p className="text-[10px] font-medium text-white/50 mb-0.5" style={SANS}>Master Services Agreement</p>
                            <p className="text-[9px] uppercase tracking-widest text-white/20" style={MONO}>Draft on file</p>
                          </div>
                        </div>

                        {/* SOW — only if applicable */}
                        {eng.sowApplicable ? (
                          <div className="flex items-start gap-3 bg-white/[0.02] border border-white/6 p-4">
                            <FileText size={12} className="text-white/25 mt-[2px] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-[10px] font-medium text-white/50 mb-0.5" style={SANS}>Statement of Work — {eng.id}</p>
                              <p className="text-[9px] uppercase tracking-widest text-white/20 mb-2" style={MONO}>Draft on file</p>
                              <div className="space-y-[3px]">
                                {eng.sowScope.map((item, i) => (
                                  <div key={i} className="flex items-start gap-1.5">
                                    <span className="text-white/20 text-[9px] flex-shrink-0 mt-[1px]">·</span>
                                    <span className="text-[10px] text-white/30 leading-[1.4]" style={SANS}>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white/[0.02] border border-dashed border-white/8 p-4">
                            <p className="text-[9px] uppercase tracking-widest text-white/15 mb-2" style={MONO}>Statement of Work — N/A</p>
                            <p className="text-[11px] text-white/25 leading-relaxed" style={SANS}>{eng.msaNote}</p>
                          </div>
                        )}
                      </div>

                      {/* Client Legal Name — only needed when SOW is applicable */}
                      {eng.sowApplicable && <div className="bg-white/[0.02] border border-white/8 p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <Edit3 size={10} className={eng.clientLegalNameConfirmed ? "text-[#D4AF37]/60" : "text-white/25"} />
                          <p className="text-[9px] uppercase tracking-widest text-white/25" style={MONO}>
                            Client Legal Entity Name
                            {eng.clientLegalNameConfirmed && (
                              <span className="ml-2 text-[#D4AF37]/60">· Confirmed</span>
                            )}
                          </p>
                        </div>

                        {eng.clientLegalNameConfirmed ? (
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-white/70 text-sm font-medium" style={SANS}>{eng.clientLegalName}</p>
                            <button
                              onClick={() => setEngagements(prev => prev.map(e =>
                                e.id === eng.id ? { ...e, clientLegalNameConfirmed: false } : e
                              ))}
                              className="text-[9px] uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors"
                              style={MONO}
                            >
                              Edit
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={eng.clientLegalName}
                              onChange={(e) => updateClientLegalName(eng.id, e.target.value)}
                              placeholder="e.g. K2K College Prep Services LLC"
                              className="flex-1 bg-white/5 border border-white/10 text-white/70 text-sm px-3 py-2 placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/30 transition-colors"
                              style={SANS}
                            />
                            <button
                              onClick={() => confirmClientLegalName(eng.id)}
                              disabled={!eng.clientLegalName.trim()}
                              className={`flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-widest uppercase transition-all flex-shrink-0 ${
                                eng.clientLegalName.trim()
                                  ? "border border-[#D4AF37]/30 text-[#D4AF37]/70 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                                  : "border border-white/8 text-white/20 cursor-not-allowed"
                              }`}
                              style={MONO}
                            >
                              <CheckCircle size={9} />
                              Confirm
                            </button>
                          </div>
                        )}
                        <p className="text-[10px] text-white/15 leading-relaxed" style={SANS}>
                          Must match client's registered legal entity name exactly as it will appear in the MSA and SOW.
                        </p>
                      </div>}

                      {/* Send button row — only if SOW is applicable */}
                      {eng.sowApplicable && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            {eng.agreementsSent ? (
                              <div className="flex items-center gap-2">
                                <CheckCircle size={12} className="text-[#D4AF37]/60" />
                                <p className="text-[#D4AF37]/70 text-sm" style={SANS}>
                                  Agreements sent — awaiting client acknowledgment
                                </p>
                              </div>
                            ) : (
                              <p className="text-[10px] text-white/15 leading-relaxed max-w-sm" style={SANS}>
                                Send Agreements emails the client and triggers a notification banner in their portal. Requires confirmed client legal name.
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => eng.clientLegalNameConfirmed && !eng.agreementsSent && sendAgreements(eng.id)}
                            disabled={!eng.clientLegalNameConfirmed || eng.agreementsSent}
                            className={`flex items-center gap-2 px-5 py-3 text-[11px] tracking-widest uppercase transition-all flex-shrink-0 ${
                              eng.agreementsSent
                                ? "border border-[#D4AF37]/20 text-[#D4AF37]/40 cursor-default"
                                : eng.clientLegalNameConfirmed
                                  ? "border border-[#D4AF37]/40 text-[#D4AF37]/80 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] cursor-pointer"
                                  : "border border-white/8 text-white/20 cursor-not-allowed opacity-40"
                            }`}
                            style={MONO}
                          >
                            <Send size={10} />
                            {eng.agreementsSent ? "Agreements Sent" : "Send Agreements"}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* ── Activity + Flags ── */}
                    <div className="p-6 md:px-8">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 flex items-start gap-3 bg-white/[0.02] border border-white/6 p-4">
                          <Clock size={13} className="text-white/30 mt-[2px] flex-shrink-0" />
                          <div>
                            <p className="text-[9px] uppercase tracking-widest text-white/25 mb-1" style={MONO}>
                              Last Activity · {eng.initiated}
                            </p>
                            <p className="text-white/50 text-sm" style={SANS}>{eng.lastActivity}</p>
                          </div>
                        </div>

                        <div className="md:w-[240px] flex-shrink-0 bg-white/[0.02] border border-white/6 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertCircle size={11} className="text-[#D4AF37]/50" />
                            <p className="text-[9px] uppercase tracking-widest text-[#D4AF37]/50" style={MONO}>
                              Status Flags
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            {eng.flags.map((flag, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                                <span className="text-[11px] text-white/35" style={SANS}>{flag}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Access Code ── */}
                    <div className="px-6 md:px-8 py-4 flex items-center gap-3">
                      <Lock size={10} className="text-white/15" />
                      <span className="text-[9px] uppercase tracking-widest text-white/15" style={MONO}>
                        Partner portal access code:
                      </span>
                      <code className="text-[10px] text-[#D4AF37]/40 bg-white/5 px-2 py-0.5" style={MONO}>
                        {eng.passCode}
                      </code>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Footer ───────────────────────────────────────── */}
        <p className="text-[9px] text-white/10 uppercase tracking-widest text-center" style={MONO}>
          Axiom Advisory Partners LLC — Internal Dashboard · Confidential © 2026 · Founded by Christopher DeMarkus
        </p>

      </div>
    </div>
  );
}
