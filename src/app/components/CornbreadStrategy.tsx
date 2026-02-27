import React, { useState } from 'react';
import { Lock, ArrowRight, Instagram, TrendingUp, Eye, EyeOff } from 'lucide-react';

const PASSCODE = 'cornbread123';

const CornbreadStrategy = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [activeTab, setActiveTab] = useState('diagnostic');
  const [showLockModal, setShowLockModal] = useState(false);

  const handleUnlock = () => {
    if (input === PASSCODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const tabs = [
    { id: 'diagnostic', label: 'The Landscape' },
    { id: 'infrastructure', label: 'The Architecture' },
    { id: 'campaign', label: 'The Vision' },
    { id: 'pitch', label: 'The Engagement' },
  ];

  if (!unlocked) {
    return (
      <div id="cornbread-strategy" className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-3">
            <div className="w-14 h-14 border border-[#D4AF37]/40 flex items-center justify-center mx-auto">
              <Lock className="text-[#D4AF37]" size={24} />
            </div>
            <h2
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Cornbread Strategic Insights
            </h2>
            <p className="text-gray-500 text-sm tracking-wide">
              Prepared exclusively by Axiom Advisory Partners LLC LLC LLC
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="Enter access code"
                className={`w-full bg-white/5 border ${error ? 'border-red-500/60' : 'border-white/10'} text-white px-5 py-4 text-sm tracking-widest placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p className="text-red-400/80 text-xs tracking-wide">
                Access code not recognized.
              </p>
            )}
            <button
              onClick={handleUnlock}
              className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] font-bold text-sm tracking-widest hover:bg-[#c9a22f] transition-colors"
            >
              ACCESS INSIGHTS
            </button>
          </div>
        </div>
      </div>
    );
  }

  const LockedSection = ({ title }: { title: string }) => (
    <div
      className="relative cursor-pointer group"
      onClick={() => setShowLockModal(true)}
    >
      <div className="absolute inset-0 backdrop-blur-[8px] bg-white/30 z-10 flex flex-col items-center justify-center gap-2 border border-dashed border-gray-200 group-hover:bg-white/20 transition-all">
        <Lock className="text-[#D4AF37]" size={22} />
        <p className="text-xs font-bold text-[#0A0A0A] tracking-widest uppercase">Exclusive Client Strategy</p>
        <p className="text-[11px] text-gray-500">Partner with us to unlock this blueprint</p>
      </div>
      <div className="p-8 border border-gray-100 select-none opacity-40">
        <h3 className="text-lg font-bold mb-4 text-[#0A0A0A]">{title}</h3>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 w-full rounded" />
          <div className="h-3 bg-gray-200 w-4/5 rounded" />
          <div className="h-3 bg-gray-200 w-3/5 rounded" />
          <div className="h-3 bg-gray-200 w-4/5 rounded" />
          <div className="h-3 bg-gray-200 w-2/3 rounded" />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'diagnostic':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Market Context</p>
              <h2 className="text-4xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Landscape
              </h2>
              <p className="text-gray-500 text-sm italic">
                Prepared following a strategic introduction via a mutual connection within the organization.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Global Soul Food Market', value: '$4.22B', note: '6.7% CAGR' },
                { label: 'Projected by 2033', value: '$7.63B', note: 'North America leads at 55%' },
                { label: 'Ethnic Food Market', value: '$92.7B', note: 'Significant white space' },
              ].map((s, i) => (
                <div key={i} className="border border-gray-100 p-6 hover:shadow-sm transition-shadow">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{s.label}</p>
                  <p className="text-3xl font-bold text-[#0A0A0A]">{s.value}</p>
                  <p className="text-xs text-[#D4AF37] mt-1">{s.note}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0A0A0A] p-8 space-y-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">What We See</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    n: '01',
                    title: 'The Infrastructure Gap',
                    body: 'The brand has the product. The audience is ready. What\'s missing is the operational backbone to scale without fracturing.',
                  },
                  {
                    n: '02',
                    title: 'The Consistency Problem',
                    body: 'Four locations. Four different customer experiences. Closing that gap is the single highest-leverage move available right now.',
                  },
                  {
                    n: '03',
                    title: 'The Narrative Opportunity',
                    body: 'The "Farm-to-Soul" story is powerful and largely untold. The market is waiting for a brand to own this space at scale.',
                  },
                ].map((item) => (
                  <div key={item.n} className="space-y-2">
                    <p className="text-[#D4AF37] font-bold text-sm">{item.n}</p>
                    <p className="text-white font-bold">{item.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'infrastructure':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Organizational Design</p>
              <h2 className="text-4xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Architecture
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Scaling a multi-location brand requires more than marketing. It requires a unified command structure — one that aligns operations, vendor relationships, brand standards, and customer experience under a single strategic lens.
                </p>
                <div className="border-l-4 border-[#D4AF37] pl-6 space-y-4">
                  {[
                    { label: 'Marketing Infrastructure', desc: 'Building the systems, not just the campaigns.' },
                    { label: 'Operational Alignment', desc: 'Consistent standards across every location.' },
                    { label: 'Third-Party Risk Management', desc: 'Vendors, partners, and suppliers — governed.' },
                    { label: 'Crisis Readiness', desc: 'Protocols in place before they\'re needed.' },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="font-bold text-[#0A0A0A] text-sm">{item.label}</p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 p-8 space-y-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">The Chief of Staff Advantage</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  This isn't a traditional marketing engagement. It's an embedded strategic partnership — one that operates at the intersection of brand, operations, and executive decision-making.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The result is a brand that doesn't just look ready to scale. It actually is.
                </p>
              </div>
            </div>

            <LockedSection title="Our Proprietary 'Pitch to Pivot' KPI Dashboard" />
          </div>
        );

      case 'campaign':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Brand Vision</p>
              <h2 className="text-4xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Vision
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Instagram Mockup */}
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
                      <p className="text-[10px]">🌿 Natural ingredients | Farm-to-table</p>
                      <p className="text-[10px]">📍 4 locations | Franchising 2026</p>
                      <p className="text-[10px] text-blue-800 font-medium">cornbreadsoul.com/franchise</p>
                    </div>
                    <div className="px-3 py-2 flex gap-1.5">
                      <div className="flex-1 bg-gray-100 py-1 rounded text-[9px] font-bold text-center">Follow</div>
                      <div className="flex-1 bg-gray-100 py-1 rounded text-[9px] font-bold text-center">Message</div>
                    </div>
                    <div className="grid grid-cols-3 gap-px mt-1">
                      {[
                        'bg-amber-100','bg-amber-200','bg-yellow-100',
                        'bg-orange-100','bg-amber-300','bg-yellow-200',
                      ].map((bg, i) => (
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

              {/* Future Image */}
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">The Future</p>
                <div className="relative overflow-hidden shadow-lg">
                  <img
                    src="https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/image.jpg"
                    alt="The Future of Cornbread"
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      This is your future.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <LockedSection title="The AI Social Media Engine: Exact Prompt Chains & Content Workflows" />
          </div>
        );

      case 'pitch':
        return (
          <div className="max-w-2xl mx-auto space-y-12 py-8 animate-in fade-in duration-500 text-center">
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">The Engagement</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                The infrastructure already exists.<br />
                <span className="text-[#D4AF37]">It just needs to be activated.</span>
              </h2>
            </div>

            <p className="text-gray-500 leading-relaxed text-base">
              Cornbread has built something real. The brand, the product, the community — it's all there. What this partnership brings is the strategic layer that turns a great restaurant group into a scalable enterprise.
            </p>

            <div className="grid grid-cols-2 gap-4 text-left">
              {[
                'Marketing Infrastructure Build-out',
                'Operational Alignment Across Locations',
                'Brand Governance & Standards',
                'Third-Party & Vendor Risk Oversight',
                'Crisis Management Protocols',
                'Executive-Level Strategic Advisory',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-gray-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                "You don't hire a Chief of Staff to grow your brand.<br />
                You hire one to stop the silent bleeding you haven't measured yet."
              </p>
            </div>

            <button
              onClick={() => window.location.href = 'mailto:contact@axiomadvisorypartners.com'}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#0A0A0A] text-white font-bold text-sm tracking-widest hover:bg-[#1a1a1a] transition-colors"
            >
              BEGIN ENGAGEMENT
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] text-gray-300 uppercase tracking-widest">
              Confidential — Axiom Advisory Partners LLC © 2026 · Founded by Christopher DeMarkus
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="cornbread-strategy" className="min-h-screen bg-white pt-24 pb-20 px-6 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-6">
          <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
            Axiom Advisory Partners LLC — Strategic Advisory
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Cornbread <span className="text-[#D4AF37]">Strategic Insights</span>
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-100 mb-12 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-all relative ${
                activeTab === tab.id ? 'text-[#0A0A0A]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Lock Modal */}
      {showLockModal && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A]/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white max-w-sm w-full p-10 text-center space-y-6">
            <Lock className="text-[#D4AF37] mx-auto" size={32} />
            <h3 className="text-xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Exclusive Client Strategy
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              This execution blueprint is reserved for Axiom Advisory Partners clients. Initiate a formal engagement to access the full roadmap.
            </p>
            <div className="space-y-3 pt-2">
              <button
                onClick={() => { setShowLockModal(false); setActiveTab('pitch'); }}
                className="w-full py-3.5 bg-[#0A0A0A] text-white font-bold text-sm tracking-widest hover:bg-gray-800 transition-colors"
              >
                VIEW ENGAGEMENT TERMS
              </button>
              <button
                onClick={() => setShowLockModal(false)}
                className="w-full py-3 text-gray-400 text-xs font-bold hover:text-gray-600 transition-colors"
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CornbreadStrategy;
