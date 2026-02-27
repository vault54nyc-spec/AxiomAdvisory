import React, { useState } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  Rocket, 
  Handshake, 
  Lock, 
  ChevronRight, 
  Instagram, 
  Layout, 
  Smartphone, 
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const CornbreadStrategy = () => {
  const [activeTab, setActiveTab] = useState('diagnostic');
  const [showLockOverlay, setShowLockOverlay] = useState(false);

  const tabs = [
    { id: 'diagnostic', label: 'Diagnostic', icon: BarChart3 },
    { id: 'infrastructure', label: 'Infrastructure', icon: ShieldCheck },
    { id: 'campaign', label: 'Campaign', icon: Rocket },
    { id: 'pitch', label: 'The Pitch', icon: Handshake },
  ];

  const handleLockedClick = () => {
    setShowLockOverlay(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'diagnostic':
        return (
          <div className="animate-in fade-in duration-700 space-y-8">
            <div className="border-l-4 border-[#D4AF37] pl-6 py-2">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Industry Diagnostic</h2>
              <p className="text-gray-600 italic">Prepared following a strategic introduction via Joseph Knight</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Global Soul Food Market', value: '$4.22B', sub: '6.7% CAGR Growth' },
                { label: 'North America Share', value: '55%', sub: 'Dominant Market' },
                { label: 'Ethnic Food Market', value: '$92.7B', sub: 'Massive Opportunity' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#0A0A0A]">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                The fast-casual comfort food sector in New Jersey is undergoing a radical shift. As Cornbread expands from its 4 current locations toward a 2026 franchising model, the gap between operational excellence and marketing infrastructure has become a silent liability.
              </p>
              <div className="bg-[#0A0A0A] text-white p-8 rounded-sm">
                <h3 className="text-[#D4AF37] font-bold mb-4 flex items-center gap-2">
                  <TrendingUp size={20} /> 3 Critical Industry Trends
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="text-[#D4AF37] font-bold">01.</span>
                    <div>
                      <p className="font-bold">The Digital Loyalty Moat</p>
                      <p className="text-gray-400 text-sm">Customers no longer just buy food; they subscribe to brands. Without a centralized data engine, every transaction is a missed opportunity for lifetime value.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#D4AF37] font-bold">02.</span>
                    <div>
                      <p className="font-bold">Hyper-Local Precision at Scale</p>
                      <p className="text-gray-400 text-sm">Scaling to Brooklyn and beyond requires a "Global Brand, Local Voice" strategy that most regional players fail to automate.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#D4AF37] font-bold">03.</span>
                    <div>
                      <p className="font-bold">The Authenticity Premium</p>
                      <p className="text-gray-400 text-sm">In a $92B ethnic food market, the "Farm-to-Soul" narrative is your greatest asset, but it requires Fortune 500 storytelling to command premium margins.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'infrastructure':
        return (
          <div className="animate-in fade-in duration-700 space-y-8">
            <div className="border-l-4 border-[#D4AF37] pl-6 py-2">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Governance & Infrastructure</h2>
              <p className="text-gray-600">The McKinsey 7S Framework for Cornbread's Evolution</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-xl text-[#0A0A0A]">Organizational Alignment</h3>
                <div className="space-y-3">
                  {[
                    { s: 'Strategy', d: 'Transition from regional operator to national franchise powerhouse.' },
                    { s: 'Structure', d: 'Centralized Marketing Hub supporting decentralized local execution.' },
                    { s: 'Systems', d: 'Automated CRM, AI-driven content loops, and real-time KPI tracking.' },
                    { s: 'Shared Values', d: 'Farm-to-Soul integrity maintained through rapid scaling.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="text-[#D4AF37] mt-1" size={18} />
                      <div>
                        <span className="font-bold text-[#0A0A0A]">{item.s}: </span>
                        <span className="text-gray-600">{item.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-100">
                <h3 className="font-bold text-lg mb-4">The Chief of Staff Advantage</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Instead of a traditional CMO, a **Chief of Staff** approach ensures that marketing isn't a silo—it's the connective tissue between operations, finance, and the customer experience.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-gray-400">
                    <span>Traditional Marketing</span>
                    <span>Axiom Advisory Approach</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
                    <div className="h-full bg-gray-400 w-1/3"></div>
                    <div className="h-full bg-[#D4AF37] w-2/3"></div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right">2x Efficiency via Integrated Governance</p>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={handleLockedClick}>
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[6px] z-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 group-hover:bg-white/20 transition-all">
                <Lock className="text-[#D4AF37] mb-2" size={32} />
                <p className="font-bold text-[#0A0A0A]">Exclusive Client Strategy</p>
                <p className="text-xs text-gray-500">Partner with us to unlock this execution blueprint</p>
              </div>
              <div className="p-8 border border-gray-100 opacity-50">
                <h3 className="text-xl font-bold mb-4">Our Proprietary 'Pitch to Pivot' KPI Dashboard</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-20 bg-gray-100 rounded"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'campaign':
        return (
          <div className="animate-in fade-in duration-700 space-y-8">
            <div className="border-l-4 border-[#D4AF37] pl-6 py-2">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>GTM Campaign & Roadmap</h2>
              <p className="text-gray-600">The 2026 Scaling Playbook</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#0A0A0A] flex items-center gap-2">
                  <Instagram className="text-[#D4AF37]" size={24} /> Instagram Profile Refresh
                </h3>
                <div className="bg-[#0A0A0A] p-1 rounded-3xl shadow-2xl max-w-[320px] mx-auto border-[8px] border-[#1A1A1A]">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    {/* Mock Instagram Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <span className="font-bold text-sm">cornbreadsoul</span>
                      <div className="flex gap-3">
                        <div className="w-4 h-4 border-2 border-black rounded-sm"></div>
                        <div className="w-4 h-4 border-2 border-black rounded-full"></div>
                      </div>
                    </div>
                    {/* Profile Info */}
                    <div className="p-4 flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-serif text-2xl font-bold text-[#8B4513] border-2 border-white">C</div>
                      </div>
                      <div className="flex-1 flex justify-around text-center">
                        <div><p className="font-bold text-sm">482</p><p className="text-[10px] text-gray-500">Posts</p></div>
                        <div><p className="font-bold text-sm">127K</p><p className="text-[10px] text-gray-500">Followers</p></div>
                        <div><p className="font-bold text-sm">1,247</p><p className="text-[10px] text-gray-500">Following</p></div>
                      </div>
                    </div>
                    <div className="px-4 pb-2">
                      <p className="font-bold text-xs">Cornbread Soul</p>
                      <p className="text-xs text-gray-500">Farm-to-Soul Restaurant</p>
                      <p className="text-xs mt-1">🌿 Natural ingredients | Farm-to-table</p>
                      <p className="text-xs">⭐ Michelin-recommended taste</p>
                      <p className="text-xs">📍 4 locations | Franchising 2026</p>
                      <p className="text-xs text-blue-900 font-medium">cornbreadsoul.com/franchise</p>
                    </div>
                    <div className="px-4 py-2 flex gap-2">
                      <div className="flex-1 bg-gray-100 py-1.5 rounded text-[10px] font-bold text-center">Follow</div>
                      <div className="flex-1 bg-gray-100 py-1.5 rounded text-[10px] font-bold text-center">Message</div>
                      <div className="w-8 bg-gray-100 py-1.5 rounded flex items-center justify-center"><Users size={12} /></div>
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-3 gap-0.5 mt-2">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="aspect-square bg-gray-200 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          <div className="absolute bottom-1 left-1 text-[8px] text-white flex items-center gap-0.5">
                            <TrendingUp size={8} /> {Math.floor(Math.random() * 50)}K
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center italic">Proposed Instagram Architecture: High-Engagement Visual Storytelling</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#0A0A0A]">The Future of Cornbread</h3>
                <div className="relative rounded-sm overflow-hidden shadow-xl border border-gray-100">
                  <img 
                    src="https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/image.jpg" 
                    alt="The Future of Cornbread" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>This is your future.</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 border-l-4 border-[#D4AF37]">
                  <h4 className="font-bold mb-2">The Loyalty Moat</h4>
                  <p className="text-sm text-gray-600">
                    A three-tier rewards program (Seedling → Rooted → Legacy) designed to increase visit frequency by 35% within the first 6 months of implementation.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={handleLockedClick}>
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[6px] z-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 group-hover:bg-white/20 transition-all">
                <Lock className="text-[#D4AF37] mb-2" size={32} />
                <p className="font-bold text-[#0A0A0A]">Exclusive Client Strategy</p>
                <p className="text-xs text-gray-500">Partner with us to unlock this execution blueprint</p>
              </div>
              <div className="p-8 border border-gray-100 opacity-50">
                <h3 className="text-xl font-bold mb-4">The AI Social Media Engine: Exact Prompt Chains & Content Workflows</h3>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 w-3/4 rounded"></div>
                  <div className="h-4 bg-gray-100 w-1/2 rounded"></div>
                  <div className="h-4 bg-gray-100 w-2/3 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'pitch':
        return (
          <div className="animate-in fade-in duration-700 max-w-3xl mx-auto text-center space-y-12 py-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Silent Cost of Inaction
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                You don't hire a Chief of Staff to grow your brand. You hire one to stop the silent bleeding you haven't measured yet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="p-8 bg-white border border-gray-100 shadow-sm">
                <h3 className="font-bold text-[#D4AF37] mb-4 uppercase tracking-widest text-xs">The Partnership</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-[#D4AF37] shrink-0" size={20} />
                    <span className="text-gray-700">Fractional Chief of Staff Leadership</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-[#D4AF37] shrink-0" size={20} />
                    <span className="text-gray-700">Full Infrastructure Build-out</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-[#D4AF37] shrink-0" size={20} />
                    <span className="text-gray-700">Proprietary KPI Dashboard Access</span>
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-[#0A0A0A] text-white">
                <h3 className="font-bold text-[#D4AF37] mb-4 uppercase tracking-widest text-xs">The Commitment</h3>
                <p className="text-gray-300 mb-6">
                  Our engagements are structured to ensure maximum impact without the overhead of a full-time executive suite. We focus on high-leverage activities that drive measurable ROI.
                </p>
                <p className="text-sm italic text-gray-400">
                  "Axiom doesn't just advise; we architect the future of your brand."
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to unlock the full execution blueprint?
              </p>
              <button 
                onClick={() => window.location.href = 'mailto:contact@axiomadvisorypartners.com'}
                className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-[#0A0A0A] font-pj rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                <span className="relative flex items-center gap-2">
                  Begin Engagement <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Confidential Proposal for Cornbread Soul © 2026
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="cornbread-strategy" className="min-h-screen bg-white pt-24 pb-12 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Strategic Advisory
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#0A0A0A] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cornbread <br />
              <span className="text-[#D4AF37]">Strategic Insights</span>
            </h1>
          </div>
          <div className="flex gap-2 border-b border-gray-100 w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
                  activeTab === tab.id ? 'text-[#0A0A0A]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] animate-in slide-in-from-left duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>

      {/* Lock Overlay Modal */}
      {showLockOverlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0A0A0A]/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white max-w-md w-full p-10 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-[#D4AF37]" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif" }}>Unlock Full Strategy</h3>
            <p className="text-gray-600">
              This execution blueprint is reserved for Axiom Advisory Partners clients. To view the full roadmap and proprietary KPI frameworks, please initiate a formal engagement.
            </p>
            <div className="pt-4 space-y-3">
              <button 
                onClick={() => setActiveTab('pitch')}
                className="w-full py-4 bg-[#0A0A0A] text-white font-bold hover:bg-gray-800 transition-colors"
              >
                View Partnership Terms
              </button>
              <button 
                onClick={() => setShowLockOverlay(false)}
                className="w-full py-4 text-gray-400 text-sm font-bold hover:text-gray-600 transition-colors"
              >
                Return to Insights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CornbreadStrategy;
