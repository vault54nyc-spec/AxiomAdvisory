import React, { useState } from "react";
import { Lock, ArrowRight, Instagram, TrendingUp, Eye, EyeOff, Calendar, Target, AlertTriangle, BarChart3, ChevronRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, LineChart, Line,
} from "recharts";

const PASSCODE = "cornbread123";
const cornbreadImg = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031559393/pOwIRqJYLzkEgWtK.jpg";

/* ── Chart color palette ── */
const GOLD = "#D4AF37";
const DARK = "#0A0A0A";
const GRAY = "#9CA3AF";
const RED = "#EF4444";
const GREEN = "#22C55E";
const GOLD_LIGHT = "rgba(212,175,55,0.15)";

/* ── Chart data ── */
const marketGrowthData = [
  { year: "2021", value: 3.2 }, { year: "2022", value: 3.5 }, { year: "2023", value: 3.8 },
  { year: "2024", value: 4.0 }, { year: "2025", value: 4.22 }, { year: "2026", value: 4.5 },
  { year: "2027", value: 4.8 }, { year: "2028", value: 5.2 }, { year: "2029", value: 5.6 },
  { year: "2030", value: 6.1 }, { year: "2031", value: 6.6 }, { year: "2032", value: 7.1 },
  { year: "2033", value: 7.63 },
];

const competitorData = [
  { name: "Cornbread", brand: 72, digital: 35, operations: 58, experience: 65, reach: 40 },
  { name: "Sweetgreen", brand: 92, digital: 95, operations: 88, experience: 90, reach: 85 },
  { name: "Cava", brand: 85, digital: 88, operations: 82, experience: 85, reach: 78 },
];

const radarData = [
  { metric: "Brand Identity", cornbread: 72, benchmark: 88 },
  { metric: "Digital Presence", cornbread: 35, benchmark: 85 },
  { metric: "Content Strategy", cornbread: 20, benchmark: 80 },
  { metric: "Customer Exp.", cornbread: 65, benchmark: 88 },
  { metric: "Operations", cornbread: 58, benchmark: 82 },
  { metric: "Marketing Infra.", cornbread: 15, benchmark: 78 },
];

const sentimentData = [
  { category: "Food Quality", positive: 89, negative: 11 },
  { category: "Service", positive: 62, negative: 38 },
  { category: "Ambiance", positive: 71, negative: 29 },
  { category: "Wait Times", positive: 45, negative: 55 },
  { category: "Value", positive: 78, negative: 22 },
  { category: "Consistency", positive: 52, negative: 48 },
];

const channelScoreData = [
  { name: "Website", score: 45 }, { name: "Instagram", score: 55 }, { name: "Google Bus.", score: 62 },
  { name: "Yelp", score: 58 }, { name: "Email", score: 10 }, { name: "Paid Social", score: 5 },
  { name: "SEO", score: 20 }, { name: "Content", score: 15 },
];

const revenueOpportunityData = [
  { name: "Promo Calendar", value: 35 }, { name: "Catering Pipeline", value: 25 },
  { name: "Digital Marketing", value: 20 }, { name: "Franchise Prep", value: 20 },
];
const PIE_COLORS = [GOLD, "#8B6914", "#C9A227", "#E8D48B"];

const locationData = [
  { location: "Maplewood", consistency: 78, satisfaction: 82, ops: 75 },
  { location: "Newark", consistency: 55, satisfaction: 68, ops: 60 },
  { location: "Brooklyn", consistency: 62, satisfaction: 74, ops: 58 },
  { location: "Prospect Hts", consistency: 60, satisfaction: 70, ops: 55 },
];

export default function CornbreadPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [activeTab, setActiveTab] = useState("diagnostic");
  const [showLockModal, setShowLockModal] = useState(false);

  const handleUnlock = () => {
    if (input === PASSCODE) { setUnlocked(true); setError(false); }
    else { setError(true); }
  };

  const tabs = [
    { id: "diagnostic", label: "The Landscape" },
    { id: "infrastructure", label: "The Architecture" },
    { id: "campaign", label: "The Vision" },
    { id: "pitch", label: "The Engagement" },
  ];

  /* ── Lock screen ── */
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-3">
            <div className="w-14 h-14 border border-[#D4AF37]/40 flex items-center justify-center mx-auto">
              <Lock className="text-[#D4AF37]" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cornbread Strategic Insights
            </h2>
            <p className="text-gray-500 text-sm tracking-wide">Prepared exclusively by Axiom Advisory Partners LLC</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                placeholder="Enter access code"
                className={`w-full bg-white/5 border ${error ? "border-red-500/60" : "border-white/10"} text-white px-5 py-4 text-sm tracking-widest placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
              />
              <button onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-400/80 text-xs tracking-wide">Access code not recognized.</p>}
            <button onClick={handleUnlock}
              className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] font-bold text-sm tracking-widest hover:bg-[#c9a22f] transition-colors">
              ACCESS INSIGHTS
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Reusable locked teaser ── */
  const LockedFade = ({ title, subtitle, pages }: { title: string; subtitle: string; pages?: string }) => (
    <div className="relative cursor-pointer group mt-8" onClick={() => setShowLockModal(true)}>
      {/* Gradient fade from content into locked */}
      <div className="absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white z-[5] pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-[10px] bg-white/50 z-10 flex flex-col items-center justify-center gap-3 border border-dashed border-gray-200/60 group-hover:bg-white/40 transition-all py-12">
        <Lock className="text-[#D4AF37]" size={28} />
        <div className="text-center max-w-md px-4">
          <p className="text-sm font-bold text-[#0A0A0A] tracking-widest uppercase">{title}</p>
          <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">{subtitle}</p>
          {pages && <p className="text-[10px] text-[#D4AF37] font-bold mt-2 tracking-widest uppercase">{pages}</p>}
        </div>
        <div className="px-8 py-3 bg-[#0A0A0A] text-white text-xs font-bold tracking-widest mt-3 hover:bg-gray-800 transition-colors flex items-center gap-2">
          UNLOCK FULL ANALYSIS <ChevronRight size={12} />
        </div>
      </div>
      <div className="p-8 border border-gray-100 select-none opacity-20 space-y-4">
        <div className="space-y-3">
          {[100, 85, 70, 90, 60, 80, 55].map((w, i) => <div key={i} className="h-3 bg-gray-200 rounded" style={{ width: `${w}%` }} />)}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-100 rounded" />)}
        </div>
        <div className="space-y-3 mt-4">
          {[90, 75, 60, 85].map((w, i) => <div key={i} className="h-3 bg-gray-200 rounded" style={{ width: `${w}%` }} />)}
        </div>
      </div>
    </div>
  );

  /* ── Stat card ── */
  const StatCard = ({ label, value, note, accent }: { label: string; value: string; note: string; accent?: boolean }) => (
    <div className={`p-6 border transition-shadow hover:shadow-md ${accent ? "border-[#D4AF37]/30 bg-[#D4AF37]/5" : "border-gray-100"}`}>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{label}</p>
      <p className={`text-3xl sm:text-4xl font-bold ${accent ? "text-[#D4AF37]" : "text-[#0A0A0A]"}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{note}</p>
    </div>
  );

  /* ── Section header ── */
  const SectionHeader = ({ eyebrow, title, icon }: { eyebrow: string; title: string; icon?: React.ReactNode }) => (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold flex items-center gap-2">
        {icon} {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {

      /* ═══════════════════════════════════════════════════════════════
         TAB 1: THE LANDSCAPE
         ═══════════════════════════════════════════════════════════════ */
      case "diagnostic":
        return (
          <div className="space-y-14">
            <div>
              <SectionHeader eyebrow="Market Context & Strategic Intelligence" title="The Landscape" icon={<BarChart3 size={12} />} />
              <p className="text-gray-500 text-sm mt-2">Cornbread Soul Food — February 2026 · 65-Page Strategic Brand Advisory</p>
              <p className="text-gray-400 text-sm italic mt-1">Prepared following a strategic introduction through a mutual connection within the organization.</p>
            </div>

            {/* Market stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <StatCard label="Global Soul Food Market" value="$4.22B" note="Current valuation" accent />
              <StatCard label="Projected by 2033" value="$7.63B" note="6.7% CAGR growth" />
              <StatCard label="North America Share" value="55%" note="Dominant market position" />
              <StatCard label="Ethnic Food Market" value="$92.7B" note="Massive white space" />
            </div>

            {/* Market Growth Chart */}
            <div className="border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Market Trajectory</p>
                  <p className="text-gray-400 text-xs mt-0.5">Global Soul Food Restaurant Market ($B)</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" /> Actual</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#D4AF37]/40" /> Projected</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={marketGrowthData}>
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GOLD} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: GRAY }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: GRAY }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}B`} />
                  <Tooltip contentStyle={{ background: DARK, border: "none", borderRadius: 4, color: "#fff", fontSize: 12 }} formatter={(v: number) => [`$${v}B`, "Market Size"]} />
                  <Area type="monotone" dataKey="value" stroke={GOLD} strokeWidth={2.5} fill="url(#goldGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* ── The Core Problem ── */}
            <div className="bg-[#0A0A0A] p-8 sm:p-10 space-y-8">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-400" size={18} />
                <p className="text-[11px] uppercase tracking-[0.2em] text-red-400 font-bold">The Core Problem</p>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Cornbread doesn't have a marketing problem.<br />
                <span className="text-[#D4AF37]">It has a marketing infrastructure problem.</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
                The brand has the product. The audience is ready. The market is wide open. But there is no system — no promotional calendar, no content pipeline, no thematic strategy, no seasonal playbook, no campaign architecture. Every marketing effort is reactive, ad hoc, and disconnected from the moments that drive revenue.
              </p>
              <div className="grid md:grid-cols-3 gap-6 pt-4">
                {[
                  { n: "01", title: "No Promotional Calendar", body: "No documented calendar governing promotions, LTOs, or seasonal pushes. Campaigns launch reactively. Revenue windows are missed. Customer expectations are inconsistent across all four locations." },
                  { n: "02", title: "No Thematic Strategy", body: "Soul food is cultural food — yet there's no calendar mapping content to Valentine's Day, back-to-school, summer BBQ, HBCU tailgates, Thanksgiving pre-orders, or holiday catering. High-margin windows left on the table." },
                  { n: "03", title: "No Big Rocks Roadmap", body: "No quarterly framework prioritizing the 3–5 highest-leverage initiatives. The team chases small wins while structural opportunities — franchise playbooks, catering pipelines, location campaigns — go unaddressed." },
                ].map((item) => (
                  <div key={item.n} className="space-y-2">
                    <p className="text-[#D4AF37] font-bold text-sm">{item.n}</p>
                    <p className="text-white font-bold">{item.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Brand Health Radar ── */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-100 p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1">Brand Health Score</p>
                <p className="text-gray-400 text-xs mb-4">Cornbread vs. Fast-Casual Benchmark</p>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(0,0,0,0.06)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: GRAY }} />
                    <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                    <Radar name="Cornbread" dataKey="cornbread" stroke={GOLD} fill={GOLD} fillOpacity={0.25} strokeWidth={2} />
                    <Radar name="Benchmark" dataKey="benchmark" stroke="rgba(0,0,0,0.2)" fill="rgba(0,0,0,0.05)" strokeWidth={1.5} strokeDasharray="4 4" />
                    <Tooltip contentStyle={{ background: DARK, border: "none", borderRadius: 4, color: "#fff", fontSize: 11 }} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 text-[10px] text-gray-400 mt-2">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" /> Cornbread</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> Fast-Casual Avg.</span>
                </div>
              </div>

              <div className="border border-gray-100 p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1">Digital Channel Scores</p>
                <p className="text-gray-400 text-xs mb-4">Current performance by channel (0–100)</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={channelScoreData} layout="vertical" barSize={14}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 9, fill: GRAY }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: GRAY }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip contentStyle={{ background: DARK, border: "none", borderRadius: 4, color: "#fff", fontSize: 11 }} />
                    <Bar dataKey="score" fill={GOLD} radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ── Customer Sentiment ── */}
            <div className="border border-gray-100 p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1">Customer Sentiment Analysis</p>
              <p className="text-gray-400 text-xs mb-6">Aggregated review data across all locations</p>
              <div className="space-y-3">
                {sentimentData.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <p className="text-xs text-gray-500 w-24 shrink-0 text-right">{item.category}</p>
                    <div className="flex-1 flex h-5 rounded-sm overflow-hidden">
                      <div className="bg-green-400/80 flex items-center justify-center transition-all" style={{ width: `${item.positive}%` }}>
                        <span className="text-[9px] font-bold text-white">{item.positive}%</span>
                      </div>
                      <div className="bg-red-400/70 flex items-center justify-center transition-all" style={{ width: `${item.negative}%` }}>
                        <span className="text-[9px] font-bold text-white">{item.negative}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 text-[10px] text-gray-400 mt-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-400/80" /> Positive</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-400/70" /> Negative</span>
              </div>
            </div>

            {/* ── Thematic Calendar Preview ── */}
            <div className="border-2 border-[#D4AF37]/20 p-8 sm:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <Calendar className="text-[#D4AF37]" size={18} />
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">The Missing Thematic Calendar</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Soul food is cultural food. Every major cultural moment is a revenue opportunity — and right now, Cornbread is missing all of them.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { month: "Jan–Feb", theme: "New Year Soul Reset", hook: "Health-forward soul food positioning, New Year's catering packages." },
                  { month: "February", theme: "Valentine's Day", hook: "Couples platters, date night specials, Instagram-ready plating for UGC." },
                  { month: "May–June", theme: "Summer Move-Out", hook: "College move-out comfort meals, graduation catering, family reunion packages." },
                  { month: "June–Aug", theme: "Summer BBQ & Catering", hook: "BBQ catering bundles, outdoor event partnerships, food truck activations." },
                  { month: "Aug–Sept", theme: "Back to School", hook: "Family meal deals, teacher appreciation promos, school event catering." },
                  { month: "Sept–Nov", theme: "HBCU Football Tailgate", hook: "Tailgate catering, watch party specials, HBCU alumni partnerships." },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-4 space-y-1.5 border border-gray-100 hover:shadow-sm transition-shadow">
                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">{item.month}</p>
                    <p className="font-bold text-[#0A0A0A] text-sm">{item.theme}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.hook}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs italic text-center">6 of 12 thematic windows shown. Full calendar available upon engagement.</p>
            </div>

            {/* ── Brand Identity: What's Working vs. Critical Gaps ── */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-gray-100 p-6 sm:p-8 space-y-4">
                <p className="font-bold text-[#0A0A0A] text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400" /> What's Working</p>
                <div className="space-y-2.5">
                  {[
                    "Strong cultural authenticity — the product is real",
                    "\"Farm-to-soul\" positioning is unique and defensible",
                    "Mobile app with ordering capability",
                    "Four operating locations prove the model",
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-green-400 mt-2 shrink-0" />
                      <p className="text-sm text-gray-600">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-red-100 p-6 sm:p-8 space-y-4 bg-red-50/30">
                <p className="font-bold text-[#0A0A0A] text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400" /> Critical Gaps</p>
                <div className="space-y-2.5">
                  {[
                    "No marketing infrastructure — no calendar, no pipeline",
                    "No promotional cadence — campaigns are reactive",
                    "Inconsistent experience across all four locations",
                    "No email marketing, CRM, or owned audience",
                    "No franchise marketing playbook",
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-red-400 mt-2 shrink-0" />
                      <p className="text-sm text-gray-600">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Locked teaser */}
            <LockedFade
              title="Full Report — 62 Pages Remaining"
              subtitle="Complete competitive analysis, customer sentiment deep-dive, location-by-location audit, full execution roadmap, and KPI framework"
              pages="Pages 4–65 · Available Upon Engagement"
            />
          </div>
        );

      /* ═══════════════════════════════════════════════════════════════
         TAB 2: THE ARCHITECTURE
         ═══════════════════════════════════════════════════════════════ */
      case "infrastructure":
        return (
          <div className="space-y-14">
            <SectionHeader eyebrow="Organizational Design" title="The Architecture" />

            {/* Location Performance Comparison */}
            <div className="border border-gray-100 p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1">Location Performance Comparison</p>
              <p className="text-gray-400 text-xs mb-6">Consistency, customer satisfaction, and operational scores by location</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={locationData} barGap={2} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                  <XAxis dataKey="location" tick={{ fontSize: 10, fill: GRAY }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: GRAY }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: DARK, border: "none", borderRadius: 4, color: "#fff", fontSize: 11 }} />
                  <Bar dataKey="consistency" name="Consistency" fill={GOLD} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="satisfaction" name="Satisfaction" fill="#8B6914" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="ops" name="Operations" fill="#E8D48B" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 text-[10px] text-gray-400 mt-3">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: GOLD }} /> Consistency</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#8B6914" }} /> Satisfaction</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#E8D48B" }} /> Operations</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">Scaling a multi-location brand requires more than marketing. It requires a unified command structure — one that aligns operations, vendor relationships, brand standards, and customer experience under a single strategic lens.</p>
                <div className="border-l-4 border-[#D4AF37] pl-6 space-y-5">
                  {[
                    { label: "Marketing Infrastructure", desc: "Building the systems, not just the campaigns. Promotional calendar, content pipeline, thematic strategy, and measurement framework." },
                    { label: "Operational Alignment", desc: "Consistent standards across every location. Service protocols, plating standards, and customer experience benchmarks." },
                    { label: "Third-Party Risk Management", desc: "Vendors, partners, and suppliers — governed. Delivery platform strategy, food supplier diversification, and contract management." },
                    { label: "Crisis Readiness", desc: "Protocols in place before they're needed. PR response frameworks, food safety escalation paths, and reputation management." },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="font-bold text-[#0A0A0A] text-sm">{item.label}</p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Opportunity Pie */}
              <div className="border border-gray-100 p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1">Revenue Opportunity Distribution</p>
                <p className="text-gray-400 text-xs mb-4">Estimated impact by strategic initiative</p>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={revenueOpportunityData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                      {revenueOpportunityData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: DARK, border: "none", borderRadius: 4, color: "#fff", fontSize: 11 }} formatter={(v: number) => [`${v}%`, "Share"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-gray-400 mt-2">
                  {revenueOpportunityData.map((d, i) => (
                    <span key={i} className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: PIE_COLORS[i] }} /> {d.name}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Big Rocks Preview */}
            <div className="bg-[#F9F7F3] p-8 sm:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <Target className="text-[#D4AF37]" size={18} />
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Big Rocks Roadmap — Q1 2026 Preview</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { rock: "Build the Promotional Calendar", desc: "12-month calendar with seasonal campaigns, LTO windows, and catering pushes mapped to cultural moments." },
                  { rock: "Establish Brand Governance", desc: "Visual identity system, tone of voice, photography standards, plating consistency across all locations." },
                  { rock: "Launch Content Infrastructure", desc: "Content calendar, UGC campaign, Instagram Reels strategy, email marketing with segmented lists." },
                  { rock: "Franchise Marketing Playbook", desc: "Local launch playbook, grand opening framework, ongoing marketing toolkit for franchise operators." },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-5 border border-gray-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-[#0A0A0A] text-[#D4AF37] text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                      <p className="font-bold text-[#0A0A0A] text-sm">{item.rock}</p>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <LockedFade
              title="Proprietary KPI Dashboard & Execution Roadmap"
              subtitle="Full operational playbook, vendor governance framework, location-specific action plans, and quarterly milestone tracker"
              pages="Exclusive to Engaged Clients"
            />
          </div>
        );

      /* ═══════════════════════════════════════════════════════════════
         TAB 3: THE VISION
         ═══════════════════════════════════════════════════════════════ */
      case "campaign":
        return (
          <div className="space-y-14">
            <SectionHeader eyebrow="Brand Vision" title="The Vision" />

            <div className="grid md:grid-cols-2 gap-10">
              {/* Instagram mockup */}
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold flex items-center gap-2">
                  <Instagram size={13} /> Instagram Profile Refresh
                </p>
                <div className="bg-[#0A0A0A] p-1.5 rounded-[2rem] shadow-2xl max-w-[280px] mx-auto border-[6px] border-[#1A1A1A]">
                  <div className="bg-white rounded-[1.6rem] overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                      <span className="font-bold text-xs">cornbreadsoul</span>
                      <div className="flex gap-2 opacity-40">
                        <div className="w-3.5 h-3.5 border border-black rounded-sm" />
                        <div className="w-3.5 h-3.5 border border-black rounded-full" />
                      </div>
                    </div>
                    <div className="p-3 flex gap-3 items-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-800 p-0.5 shrink-0">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-serif text-xl font-bold text-[#8B4513]">C</div>
                      </div>
                      <div className="flex flex-1 justify-around text-center">
                        <div><p className="font-bold text-xs">482</p><p className="text-[9px] text-gray-400">Posts</p></div>
                        <div><p className="font-bold text-xs">127K</p><p className="text-[9px] text-gray-400">Followers</p></div>
                        <div><p className="font-bold text-xs">1,247</p><p className="text-[9px] text-gray-400">Following</p></div>
                      </div>
                    </div>
                    <div className="px-3 pb-2 space-y-0.5">
                      <p className="font-bold text-[11px]">Cornbread Soul</p>
                      <p className="text-[10px] text-gray-500">Farm-to-Soul Restaurant</p>
                      <p className="text-[10px]">Natural ingredients | Farm-to-table</p>
                      <p className="text-[10px]">4 locations | Franchising 2026</p>
                      <p className="text-[10px] text-blue-800 font-medium">cornbreadsoul.com/franchise</p>
                    </div>
                    <div className="px-3 py-2 flex gap-1.5">
                      <div className="flex-1 bg-gray-100 py-1 rounded text-[9px] font-bold text-center">Follow</div>
                      <div className="flex-1 bg-gray-100 py-1 rounded text-[9px] font-bold text-center">Message</div>
                    </div>
                    <div className="grid grid-cols-3 gap-px mt-1">
                      {["bg-amber-100","bg-amber-200","bg-yellow-100","bg-orange-100","bg-amber-300","bg-yellow-200"].map((bg, i) => (
                        <div key={i} className={`aspect-square ${bg} relative`}>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          <div className="absolute bottom-1 left-1 text-[7px] text-white flex items-center gap-0.5">
                            <TrendingUp size={6} /> {[24.5,18.2,12.8,31.1,22.6,45.3][i]}K
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 text-center italic">Proposed digital presence architecture</p>
              </div>

              {/* The Future image */}
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">The Future</p>
                <div className="relative overflow-hidden shadow-lg">
                  <img src={cornbreadImg} alt="The Future of Cornbread" className="w-full aspect-[4/3] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>This is your future.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Growth Projection */}
            <div className="border border-gray-100 p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1">Projected Social Growth</p>
              <p className="text-gray-400 text-xs mb-6">Instagram follower trajectory with strategic content infrastructure</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={[
                  { month: "Mar", current: 12.4, projected: 12.4 },
                  { month: "Apr", current: 12.6, projected: 14.2 },
                  { month: "May", current: 12.8, projected: 17.5 },
                  { month: "Jun", current: 13.0, projected: 22.0 },
                  { month: "Jul", current: 13.1, projected: 28.5 },
                  { month: "Aug", current: 13.2, projected: 36.0 },
                  { month: "Sep", current: 13.3, projected: 45.0 },
                  { month: "Oct", current: 13.4, projected: 55.0 },
                  { month: "Nov", current: 13.5, projected: 68.0 },
                  { month: "Dec", current: 13.6, projected: 82.0 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: GRAY }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: GRAY }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}K`} />
                  <Tooltip contentStyle={{ background: DARK, border: "none", borderRadius: 4, color: "#fff", fontSize: 11 }} formatter={(v: number) => [`${v}K`, ""]} />
                  <Line type="monotone" dataKey="current" name="Without Strategy" stroke="rgba(0,0,0,0.15)" strokeWidth={2} strokeDasharray="6 4" dot={false} />
                  <Line type="monotone" dataKey="projected" name="With Axiom" stroke={GOLD} strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 text-[10px] text-gray-400 mt-3">
                <span className="flex items-center gap-1.5"><span className="w-6 h-0.5 bg-gray-300" /> Current Trajectory</span>
                <span className="flex items-center gap-1.5"><span className="w-6 h-0.5 bg-[#D4AF37]" /> With Axiom Strategy</span>
              </div>
            </div>

            <LockedFade
              title="AI Social Media Engine & Content Workflows"
              subtitle="Prompt chains, content automation pipelines, UGC campaign architecture, and Reels production framework"
              pages="Full Creative Strategy · Available Upon Engagement"
            />
          </div>
        );

      /* ═══════════════════════════════════════════════════════════════
         TAB 4: THE ENGAGEMENT
         ═══════════════════════════════════════════════════════════════ */
      case "pitch":
        return (
          <div className="max-w-3xl mx-auto space-y-14 py-8">
            <div className="space-y-4 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">The Engagement</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                The infrastructure already exists.<br />
                <span className="text-[#D4AF37]">It just needs to be activated.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed text-base max-w-2xl mx-auto">
                Cornbread has built something real. The brand, the product, the community — it's all there. What this partnership brings is the strategic layer that turns a great restaurant group into a scalable enterprise.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {["Marketing Infrastructure Build-out","Promotional & Thematic Calendar Development","Operational Alignment Across Locations","Brand Governance & Standards","Big Rocks Quarterly Roadmap","Third-Party & Vendor Risk Oversight","Crisis Management Protocols","Executive-Level Strategic Advisory"].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-gray-100 hover:border-[#D4AF37]/30 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#F9F7F3] p-8 space-y-2 text-center">
              <p className="text-lg font-bold text-[#0A0A0A] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "You don't hire a Chief of Staff to grow your brand.<br />
                You hire one to stop the silent bleeding you haven't measured yet."
              </p>
            </div>

            {/* ── NEXT STEPS ── */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Next Steps</p>
                <h3 className="text-3xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>How We Move Forward</h3>
                <p className="text-gray-400 text-sm">A structured, transparent process designed to respect your time and protect your interests.</p>
              </div>

              <div className="space-y-0">
                {[
                  {
                    step: "01",
                    title: "Introductory Strategy Session",
                    timeline: "Within the next 7 days",
                    body: "We schedule a focused meeting to walk through the findings in this report, discuss your immediate priorities, and align on where the highest-leverage opportunities are. This is a conversation — not a pitch. The goal is mutual clarity.",
                  },
                  {
                    step: "02",
                    title: "Customized Brand Decision Tool",
                    timeline: "Following our initial meeting",
                    body: "Based on what we discuss and the intelligence gathered in our analysis, we provide a tailored Brand Decision Tool — a diagnostic framework customized specifically for Cornbread. This helps both sides quantify priorities, identify blind spots, and establish a shared language for what needs to happen first.",
                  },
                  {
                    step: "03",
                    title: "Services & Scope Assessment",
                    timeline: "Collaborative",
                    body: "Together, we assess the full scope of services needed — from marketing infrastructure and brand governance to operational alignment and franchise readiness. Nothing is assumed. Everything is discussed. We build the engagement around what you actually need, not a templated package.",
                  },
                  {
                    step: "04",
                    title: "Partnership Arrangement",
                    timeline: "Flexible & confidential",
                    body: "We discuss a partnership structure that works for both sides — one that reflects the scope of work, the value being delivered, and the realities of your business. We believe the right arrangement should feel like an investment in your future, not a line item. This conversation is always handled with care and discretion.",
                  },
                  {
                    step: "05",
                    title: "Master Service Agreement & Statement of Work",
                    timeline: "Final step before activation",
                    body: "Once all requirements are gathered and the scope is mutually agreed upon, we formalize everything in a Master Service Agreement (MSA) and Statement of Work (SOW) — clearly outlining all deliverables, timelines, milestones, and responsibilities. Nothing moves forward without full alignment in writing.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 bg-[#0A0A0A] text-[#D4AF37] text-xs font-bold flex items-center justify-center">
                        {item.step}
                      </div>
                      {i < 4 && <div className="w-px flex-1 bg-gray-200 min-h-[2rem]" />}
                    </div>
                    <div className="pb-8 space-y-1.5">
                      <p className="font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</p>
                      <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">{item.timeline}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-4 pt-4">
              <button onClick={() => window.location.href = "mailto:contact@axiomadvisorypartners.com"}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-[#0A0A0A] text-white font-bold text-sm tracking-widest hover:bg-[#1a1a1a] transition-colors">
                BEGIN ENGAGEMENT
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-gray-300 uppercase tracking-widest">Confidential — Axiom Advisory Partners LLC © 2026 · Founded by Christopher DeMarkus</p>
            </div>
          </div>
        );

      default: return null;
    }
  };

  /* ═══════════════════════════════════════════════════════════════
     MAIN LAYOUT
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10 space-y-4">
          <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
            Axiom Advisory Partners LLC — Strategic Advisory
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Cornbread <span className="text-[#D4AF37]">Strategic Insights</span>
          </h1>
        </div>

        <div className="flex gap-0 border-b border-gray-100 mb-10 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-4 text-sm font-bold whitespace-nowrap transition-all relative flex-shrink-0 ${activeTab === tab.id ? "text-[#0A0A0A]" : "text-gray-400 hover:text-gray-600"}`}>
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>

      {showLockModal && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A]/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white max-w-sm w-full p-10 text-center space-y-6">
            <Lock className="text-[#D4AF37] mx-auto" size={32} />
            <h3 className="text-xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>Exclusive Client Strategy</h3>
            <p className="text-gray-500 text-sm leading-relaxed">This execution blueprint is reserved for Axiom Advisory Partners clients. Initiate a formal engagement to access the full roadmap.</p>
            <div className="space-y-3 pt-2">
              <button onClick={() => { setShowLockModal(false); setActiveTab("pitch"); }}
                className="w-full py-3.5 bg-[#0A0A0A] text-white font-bold text-sm tracking-widest hover:bg-gray-800 transition-colors">
                VIEW ENGAGEMENT TERMS
              </button>
              <button onClick={() => setShowLockModal(false)}
                className="w-full py-3 text-gray-400 text-xs font-bold hover:text-gray-600 transition-colors">
                Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
