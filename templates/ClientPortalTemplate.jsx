// ============================================================
// AXIOM EXECUTIVE ADVISORY — CLIENT PORTAL TEMPLATE
// Reusable scaffold for new client engagements
//
// WHAT THIS IS:
//   A starting point for any new Axiom client portal page.
//   Swap out the placeholder data arrays, update the color
//   accent if needed, and the structure + spacing holds.
//
// PATTERNS INCLUDED:
//   1. Design token system
//   2. Welcome modal + guided tour (localStorage-gated)
//   3. Engagement header section
//   4. Stats row
//   5. Findings / audit accordion
//   6. Architecture sitemap grid
//   7. Interactive scope calculator with live total
//   8. Phase timeline
//   9. Milestone tracker
//  10. Footer card
//
// STACK: React + Tailwind CSS (Vite)
// FONTS: Playfair Display (serif), DM Sans (sans)
// ============================================================

import { useState, useEffect } from "react";

// ── COLOR SYSTEM ─────────────────────────────────────────────
// Swap these to match each client's brand accent.
// The navy + cream foundation stays consistent across all portals.
//
// AXIOM NEUTRAL FOUNDATION (never change):
//   Navy:    #0D1B2A  — dark sections, card backgrounds
//   Cream:   #FAF7F2  — page background, light text
//   Parchment: #F0E8D5 — mid-tone sections
//   Warm dark: #2A2A2A — body text on light backgrounds
//
// CLIENT ACCENT (swap per engagement):
//   Primary:   #C9973A  — borders, buttons, progress bars
//   Secondary: #E4B96A  — labels, meta text, icons on dark bg
//   Deep red:  #7C3026  — CRITICAL severity, alert sections

export default function ClientPortalTemplate() {

  // ── 1. DESIGN TOKENS ─────────────────────────────────────
  // Single source of truth for all typography and spacing.
  // Use t.h1, t.base, t.smallMeta, etc. throughout.
  const t = {
    smallMeta: "text-[10px] tracking-[0.22em] uppercase font-medium",
    base:      "text-[14px] leading-6",
    h3:        "text-[18px] leading-[1.25] font-semibold",
    h2:        "text-[18px] md:text-[24px] leading-[1.2] font-semibold",
    h1:        "text-[22px] md:text-[40px] leading-[1.15] font-semibold",
    serif:     { fontFamily: '"Playfair Display", serif' },
    sans:      { fontFamily: '"DM Sans", system-ui' },
    border:    "border border-[#C9973A33]",
    // Section padding: always p-6 md:p-8 (standard) or p-8 md:p-10 (hero)
    // Section radius: always rounded-2xl
    // Section spacing: space-y-10 on the main container
  };

  // ── 2. WELCOME MODAL + GUIDED TOUR ───────────────────────
  // localStorage key prevents repeat on return visits.
  // Change "CLIENT_ID_portal_welcomed" per client (e.g. "cornbread_portal_welcomed").
  const STORAGE_KEY = "CLIENT_ID_portal_welcomed";

  const [showWelcome, setShowWelcome] = useState(false);
  const [tourStep, setTourStep]       = useState(null);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setShowWelcome(true);
  }, []);

  const dismissWelcome = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setShowWelcome(false);
  };

  // Tour steps — each `id` must match an id="" on a section below.
  // 4–6 steps is the sweet spot. Keep body copy to 2 sentences max.
  const tourSteps = [
    {
      id:    "tour-header",
      label: "Your Engagement Overview",
      body:  "This is your home base — project status, scope value, and timeline at a glance.",
    },
    {
      id:    "tour-findings",
      label: "Our Findings",
      body:  "We documented the specific gaps or opportunities. Tap any row to see the proposed recommendation.",
    },
    {
      id:    "tour-architecture",
      label: "What We'd Build",
      body:  "Every deliverable mapped out before a single line of code is written.",
    },
    {
      id:    "tour-budget",
      label: "Your Budget & Scope",
      body:  "Toggle services on or off — your total updates in real time. We'll build this number together.",
    },
    {
      id:    "tour-timeline",
      label: "Implementation Timeline",
      body:  "Your phase-by-phase roadmap. Dates shift based on when agreements are executed.",
    },
  ];

  useEffect(() => {
    if (tourStep === null) return;
    const el = document.getElementById(tourSteps[tourStep].id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [tourStep]);

  // Highlight style applied to the active tour section
  const tourRing = (id) =>
    tourStep !== null && tourSteps[tourStep].id === id
      ? { boxShadow: "0 0 0 3px #C9973A, 0 0 0 8px #C9973A33" }
      : {};


  // ── 3. ACCORDION STATE ───────────────────────────────────
  // Shared across all accordion sections — only one open at a time.
  const [expandedItem, setExpandedItem] = useState(null);
  const toggleItem = (id) => setExpandedItem(prev => prev === id ? null : id);


  // ── 4. CALCULATOR STATE ──────────────────────────────────
  const ALL_IDS = ["service-a", "service-b", "service-c"];
  const [selectedIds, setSelectedIds] = useState(() => new Set(ALL_IDS));
  const [expandedService, setExpandedService] = useState(null);

  const toggleService  = (id) => setSelectedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleExpand   = (id) => setExpandedService(prev => prev === id ? null : id);
  const fmt            = (n)  => "$" + n.toLocaleString();


  // ── PLACEHOLDER DATA ─────────────────────────────────────
  // Replace each array with real client data.

  const stats = [
    { label: "Full Scope Value", value: "$0,000" },
    { label: "Timeline",         value: "XX Weeks" },
    { label: "Est. Go-Live",     value: "TBD" },
    { label: "Phases",           value: "X Phases" },
  ];

  // Findings / audit items
  // severity: "CRITICAL" | "HIGH" | "MEDIUM"
  const findings = [
    { n: "01", severity: "CRITICAL", issue: "Finding one",   fix: "Proposed recommendation for finding one." },
    { n: "02", severity: "HIGH",     issue: "Finding two",   fix: "Proposed recommendation for finding two." },
    { n: "03", severity: "MEDIUM",   issue: "Finding three", fix: "Proposed recommendation for finding three." },
  ];

  // Sitemap / deliverables
  const deliverables = [
    { route: "/",         label: "Home" },
    { route: "/about",    label: "About" },
    { route: "/services", label: "Services" },
    { route: "/contact",  label: "Contact" },
  ];

  // Services for budget calculator
  // locked: true = always included, cannot be toggled off
  const services = [
    {
      id: "service-a", name: "Service A", cost: 1500,
      locked: true,  tag: "REQUIRED", tagStyle: "bg-[#0D1B2A] text-[#E4B96A]",
      summary: "Foundation layer — everything else depends on this.",
      details: ["Deliverable 1", "Deliverable 2", "Deliverable 3"],
    },
    {
      id: "service-b", name: "Service B", cost: 2000,
      locked: false, tag: "OPTIONAL", tagStyle: "bg-[#EEE] text-[#666]",
      summary: "Optional enhancement.",
      details: ["Deliverable A", "Deliverable B"],
    },
    {
      id: "service-c", name: "Service C", cost: 3000,
      locked: false, tag: "OPTIONAL", tagStyle: "bg-[#EEE] text-[#666]",
      summary: "Optional enhancement.",
      details: ["Deliverable X", "Deliverable Y"],
    },
  ];

  const lockedSvcs   = services.filter(s => s.locked);
  const optionalSvcs = services.filter(s => !s.locked);
  const lockedTotal  = lockedSvcs.reduce((sum, s) => sum + s.cost, 0);
  const selectedOptTotal = optionalSvcs
    .filter(s => selectedIds.has(s.id))
    .reduce((sum, s) => sum + s.cost, 0);
  const grandTotal = lockedTotal + selectedOptTotal;

  // Phases
  const phases = [
    { n: "1", name: "Phase One",   dates: "TBD — pending agreement", duration: "X Weeks", note: "What happens in this phase.", bg: "bg-[#0D1B2A] text-[#FAF7F2]", label: "text-[#E4B96A]" },
    { n: "2", name: "Phase Two",   dates: "TBD — pending agreement", duration: "X Weeks", note: "What happens in this phase.", bg: "bg-[#F0E8D5] text-[#0D1B2A]", label: "text-[#C9973A]" },
    { n: "3", name: "Phase Three", dates: "TBD — pending agreement", duration: "X Weeks", note: "What happens in this phase.", bg: "bg-white text-[#0D1B2A]",     label: "text-[#C9973A]" },
  ];

  // Milestones
  const milestones = [
    { id: "M1", name: "Kickoff",         trigger: "Agreement fully executed",     status: "pending" },
    { id: "M2", name: "Delivery",        trigger: "Phase deliverables approved",  status: "pending" },
    { id: "M3", name: "Final Launch",    trigger: "Production go-live",           status: "pending" },
  ];

  const milestoneStatusColor = {
    complete: "bg-[#C9973A] text-white",
    active:   "bg-[#0D1B2A] text-[#E4B96A]",
    pending:  "bg-[#EEE] text-[#888]",
  };


  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2A2A]" style={t.sans}>

      {/* ══════════════════════════════════════════════════════
          WELCOME MODAL
          — Simplified entry point, offers tour or skip
      ══════════════════════════════════════════════════════ */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1B2A]/80 backdrop-blur-sm">
          <div className="w-full max-w-[480px] bg-[#FAF7F2] rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-1 w-full bg-[#C9973A]" />
            <div className="p-7 md:p-9">
              <div className={`${t.smallMeta} text-[#C9973A] mb-3`}>
                Axiom Executive Advisory LLC · Client Name Here
              </div>
              <h2 className="text-[26px] md:text-[32px] leading-[1.15] font-semibold text-[#0D1B2A] mb-3" style={t.serif}>
                Welcome to your client portal.
              </h2>
              <p className="text-[14px] leading-6 text-[#555] mb-6">
                Everything Axiom has prepared for you is here. Take a quick tour so you know exactly where to find everything.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { dismissWelcome(); setTourStep(0); }}
                  className="w-full py-3 rounded-xl bg-[#0D1B2A] text-[#FAF7F2] text-[13px] tracking-widest uppercase font-semibold hover:bg-[#1a2d42] transition-colors"
                >
                  Take the tour →
                </button>
                <button
                  onClick={dismissWelcome}
                  className="w-full py-2 text-[12px] text-[#888] hover:text-[#444] transition-colors"
                >
                  Skip — I'll explore on my own
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          GUIDED TOUR CARD
          — Fixed bottom card, progress bar, back/next nav
          — Scrolls to + gold-rings the active section
      ══════════════════════════════════════════════════════ */}
      {tourStep !== null && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[500px]">
          <div className="bg-[#0D1B2A] text-[#FAF7F2] rounded-2xl shadow-2xl border border-[#C9973A44] overflow-hidden">
            <div
              className="h-[3px] bg-[#C9973A]"
              style={{ width: `${((tourStep + 1) / tourSteps.length) * 100}%`, transition: "width 0.4s ease" }}
            />
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={`${t.smallMeta} text-[#E4B96A]`}>
                  Step {tourStep + 1} of {tourSteps.length}
                </span>
                <button
                  onClick={() => setTourStep(null)}
                  className="text-[11px] text-[#666] hover:text-[#AAA] transition-colors uppercase tracking-widest"
                >
                  Exit tour
                </button>
              </div>
              <div className="text-[16px] font-semibold mb-1" style={t.serif}>
                {tourSteps[tourStep].label}
              </div>
              <p className="text-[13px] text-[#D6C9A8] leading-relaxed mb-4">
                {tourSteps[tourStep].body}
              </p>
              <div className="flex gap-2">
                {tourStep > 0 && (
                  <button
                    onClick={() => setTourStep(p => p - 1)}
                    className="flex-1 py-2 rounded-lg border border-white/20 text-[12px] text-[#D6C9A8] hover:bg-white/5 transition-colors"
                  >
                    ← Back
                  </button>
                )}
                {tourStep < tourSteps.length - 1 ? (
                  <button
                    onClick={() => setTourStep(p => p + 1)}
                    className="flex-1 py-2 rounded-lg bg-[#C9973A] text-white text-[12px] font-semibold hover:bg-[#b8882f] transition-colors"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={() => setTourStep(null)}
                    className="flex-1 py-2 rounded-lg bg-[#C9973A] text-white text-[12px] font-semibold hover:bg-[#b8882f] transition-colors"
                  >
                    Finish tour ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


      <main className="max-w-[1180px] mx-auto px-6 py-8 space-y-10">

        {/* ══════════════════════════════════════════════════════
            SECTION — ENGAGEMENT HEADER (hero)
            bg: navy | text: cream | padding: p-8 md:p-10
        ══════════════════════════════════════════════════════ */}
        <section
          id="tour-header"
          className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-8 md:p-10 transition-shadow duration-300`}
          style={tourRing("tour-header")}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            <div className="max-w-[780px]">
              <div className={`${t.smallMeta} text-[#E4B96A] mb-4`}>
                Axiom Executive Advisory LLC · [Agreement Status]
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-[#E4B96A1A] border border-[#E4B96A33] text-[#E4B96A]">
                  Client Name
                </span>
                <span className="text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-white/8 border border-white/10 text-[#D6C9A8]">
                  Industry / Location
                </span>
              </div>
              <h1 className={`${t.h1} mb-4`} style={t.serif}>
                Portal headline that speaks to the transformation.{" "}
                <span className="text-[#E4B96A] italic">Key phrase.</span>
              </h1>
              <p className={`${t.base} text-[#D6C9A8] max-w-[600px]`}>
                One or two sentences describing what Axiom is doing for this client and why it matters. Keep it focused on outcome, not process.
              </p>
            </div>

            {/* Status badge — top right */}
            <div className="flex-shrink-0">
              <div className="rounded-xl bg-white/6 border border-white/10 p-4 min-w-[180px]">
                <div className={`${t.smallMeta} text-[#888] mb-2`}>Engagement Status</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#888]" />
                  <span className={`${t.base} font-medium`}>Pending Agreement</span>
                </div>
              </div>
            </div>

          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className={`${t.smallMeta} text-[#888] mb-1`}>{s.label}</div>
                <div className="text-[22px] font-semibold" style={t.serif}>{s.value}</div>
              </div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            SECTION — FINDINGS / AUDIT ACCORDION
            bg: navy | Severity: CRITICAL / HIGH / MEDIUM
            Shared expandedItem state — one open at a time
        ══════════════════════════════════════════════════════ */}
        <section
          id="tour-findings"
          className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-6 md:p-8 transition-shadow duration-300`}
          style={tourRing("tour-findings")}
        >
          <div className={`${t.smallMeta} text-[#E4B96A] mb-2`}>Site Audit · [date]</div>
          <h2 className={`${t.h2} mb-2`} style={t.serif}>What we found.</h2>
          <p className={`${t.base} text-[#D6C9A8] mb-6 max-w-[640px]`}>
            Brief description of what was reviewed and why. These are proposals — no work has been performed yet.
          </p>

          <div className="divide-y divide-white/8 border border-white/10 rounded-xl overflow-hidden">
            {findings.map((r) => {
              const severityColor =
                r.severity === "CRITICAL" ? "bg-[#7C3026] text-[#FAF7F2]" :
                r.severity === "HIGH"     ? "bg-[#C9973A22] text-[#E4B96A] border border-[#C9973A55]" :
                                            "bg-white/8 text-[#AAA]";
              return (
                <div key={r.n}>
                  <button
                    onClick={() => toggleItem(r.n)}
                    className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`${t.smallMeta} text-[#E4B96A] flex-shrink-0 w-6`}>{r.n}</span>
                      <span className={`text-[9px] tracking-widest uppercase font-semibold px-2 py-[2px] rounded flex-shrink-0 ${severityColor}`}>
                        {r.severity}
                      </span>
                      <span className={`${t.base} font-medium text-[#FAF7F2] truncate`}>{r.issue}</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className={`flex-shrink-0 text-[#E4B96A] transition-transform duration-200 ${expandedItem === r.n ? "rotate-180" : ""}`}
                    >
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {expandedItem === r.n && (
                    <div className="px-4 pb-4 pt-2 bg-white/5 border-t border-white/8">
                      <div className={`${t.smallMeta} text-[#E4B96A] mb-2`}>Proposed Resolution</div>
                      <p className={`${t.base} text-[#D6C9A8] leading-relaxed`}>{r.fix}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E4B96A]" />
            <span className={`${t.smallMeta} text-[#E4B96A]`}>
              {findings.length} FINDINGS · {findings.length} PROPOSED RESOLUTIONS — SCOPE PENDING YOUR SELECTION
            </span>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            SECTION — PLATFORM ARCHITECTURE / SITEMAP
            bg: parchment | Grid of deliverable groups
        ══════════════════════════════════════════════════════ */}
        <section
          id="tour-architecture"
          className={`rounded-2xl ${t.border} bg-[#F0E8D5] p-6 md:p-8 transition-shadow duration-300`}
          style={tourRing("tour-architecture")}
        >
          <div className={`${t.smallMeta} text-[#7C3026] mb-2`}>Deliverable Architecture</div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-6`} style={t.serif}>What we'd build</h2>

          {/* Add multiple columns for more complex architectures */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl bg-[#0D1B2A] text-[#FAF7F2] p-5">
              <div className={`${t.smallMeta} text-[#E4B96A] mb-3`}>Public Website</div>
              <ul className="space-y-2">
                {deliverables.map(([route, label]) => (
                  <li key={route} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#888] flex-shrink-0 w-20">{route}</span>
                    <span className={`${t.base} text-[#D6C9A8]`}>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Add more columns here for portals, admin, etc. */}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            SECTION — IMPLEMENTATION TIMELINE
            bg: transparent | Phase cards, alternating colors
        ══════════════════════════════════════════════════════ */}
        <section
          id="tour-timeline"
          className="transition-shadow duration-300 rounded-2xl"
          style={tourRing("tour-timeline")}
        >
          <div className={`${t.smallMeta} text-[#C9973A] mb-2`}>Implementation Timeline</div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-6`} style={t.serif}>Project phases</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {phases.map((p) => (
              <div key={p.n} className={`rounded-xl p-5 ${p.bg}`}>
                <div className={`${t.smallMeta} ${p.label} mb-1`}>Phase {p.n}</div>
                <div className={`${t.h3} mb-1`} style={t.serif}>{p.name}</div>
                <div className="text-[11px] opacity-60 mb-3">{p.duration}</div>
                <div className={`${t.smallMeta} ${p.label} mb-1`}>Dates</div>
                <div className="text-[12px] font-medium mb-3">{p.dates}</div>
                <p className="text-[12px] opacity-70 leading-5">{p.note}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            SECTION — INTERACTIVE BUDGET CALCULATOR
            bg: white | Toggle services, live total
            Locked services always included in total
        ══════════════════════════════════════════════════════ */}
        <section
          id="tour-budget"
          className={`rounded-2xl ${t.border} bg-white p-6 md:p-8 transition-shadow duration-300`}
          style={tourRing("tour-budget")}
        >
          <div className={`${t.smallMeta} text-[#C9973A] mb-2`}>Scope & Investment</div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-2`} style={t.serif}>Build your scope</h2>
          <p className={`${t.base} text-[#666] mb-6 max-w-[560px]`}>
            Toggle services to match your needs. Required services are always included. Your total updates in real time.
          </p>

          <div className="space-y-3 mb-8">
            {services.map((s) => {
              const isSelected = s.locked || selectedIds.has(s.id);
              const isExpanded = expandedService === s.id;
              return (
                <div key={s.id} className={`rounded-xl border transition-all ${isSelected ? "border-[#C9973A44] bg-[#FDF9F3]" : "border-[#E5E5E5] bg-[#FAFAFA]"}`}>
                  <div className="flex items-center gap-4 p-4">
                    {/* Toggle checkbox */}
                    <button
                      onClick={() => !s.locked && toggleService(s.id)}
                      className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                        s.locked ? "bg-[#0D1B2A] border-[#0D1B2A] cursor-default" :
                        isSelected ? "bg-[#C9973A] border-[#C9973A]" : "bg-white border-[#CCC]"
                      }`}
                    >
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`${t.base} font-semibold text-[#0D1B2A]`}>{s.name}</span>
                        <span className={`text-[9px] tracking-widest uppercase px-2 py-[2px] rounded font-semibold ${s.tagStyle}`}>
                          {s.tag}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#888] mt-[2px]">{s.summary}</p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-[16px] font-semibold ${isSelected ? "text-[#0D1B2A]" : "text-[#BBB]"}`} style={t.serif}>
                        {fmt(s.cost)}
                      </span>
                      <button onClick={() => toggleExpand(s.id)} className="text-[#CCC] hover:text-[#888] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none"
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        >
                          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-[#F0E8D5]">
                      <ul className="mt-3 space-y-1">
                        {s.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-[#555]">
                            <span className="text-[#C9973A] flex-shrink-0 mt-[2px]">·</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Live total */}
          <div className="rounded-xl bg-[#0D1B2A] text-[#FAF7F2] p-5 flex items-center justify-between">
            <div>
              <div className={`${t.smallMeta} text-[#E4B96A] mb-1`}>Your Selected Total</div>
              <div className="text-[11px] text-[#888]">Pending MSA & SOW execution</div>
            </div>
            <div className="text-[36px] font-semibold text-[#E4B96A]" style={t.serif}>
              {fmt(grandTotal)}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            SECTION — MILESTONES
            bg: parchment | Grid of milestone cards
        ══════════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-[#F0E8D5] p-6 md:p-8`}>
          <div className={`${t.smallMeta} text-[#7C3026] mb-2`}>Engagement Milestones</div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-6`} style={t.serif}>Project checkpoints</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {milestones.map((m) => (
              <div key={m.id} className="rounded-lg bg-[#0D1B2A] border border-white/10 p-4">
                <div className={`${t.smallMeta} text-[#E4B96A] mb-1`}>{m.id}</div>
                <div className={`${t.base} font-medium text-[#FAF7F2]`}>{m.name}</div>
                <div className="text-[11px] text-[#AAA] mt-1 mb-3 leading-4">{m.trigger}</div>
                <span className={`text-[9px] tracking-widest uppercase px-2 py-[2px] rounded-full ${milestoneStatusColor[m.status]}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            SECTION — FOOTER / CONTACT CARD
            bg: navy | Always last section
        ══════════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-6 md:p-8`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className={`${t.smallMeta} text-[#E4B96A] mb-1`}>Project Lead</div>
              <div className="text-[18px] font-semibold" style={t.serif}>Axiom Executive Advisory LLC</div>
              <div className={`${t.base} text-[#888] mt-1`}>hello@axiomexecutiveadvisory.com</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["MSA Pending", "SOW Pending", "Kickoff TBD"].map((tag) => (
                <span key={tag} className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-[#C9973A22] border border-[#C9973A44] text-[#E4B96A]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHECKLIST: Starting a new client portal
// ─────────────────────────────────────────────────────────────
// 1. Copy this file to src/app/pages/[ClientName]Page.jsx
// 2. Update STORAGE_KEY to "clientname_portal_welcomed"
// 3. Replace all placeholder data arrays (stats, findings, phases, etc.)
// 4. Update the client accent color if their brand differs from gold
// 5. Add route in App.tsx:
//      <Route path="/partners/[clientname]/portal" element={<[ClientName]Page />} />
// 6. Add a LockedClientPage route with their passcode:
//      <Route path="/partners/[clientname]" element={<LockedClientPage name="..." code="..." redirect="..." />} />
// 7. Add the client to AxiomAdminPage.tsx engagements array
// ─────────────────────────────────────────────────────────────
