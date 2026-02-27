import { useNavigate } from "react-router";
import { Lock, ArrowRight } from "lucide-react";

const partners = [
  { number: "01", name: "Walmart", descriptor: "Enterprise Retail", detail: "Strategic partnership & value proposition development", path: "/partners/walmart", logoText: "Walmart", logoColor: "#0071CE", logoBg: "#F0F7FF" },
  { number: "02", name: "R.O.R.I. Project", descriptor: "Nonprofit", detail: "Organizational infrastructure & governance", path: "/partners/rori-project", logoText: "R.O.R.I.", logoColor: "#8B2FC9", logoBg: "#F7F0FF" },
  { number: "03", name: "NPHC of Hudson County", descriptor: "Nonprofit / Civic", detail: "Operations & communications advisory", path: "/partners/nphc-hudson", logoText: "NPHC", logoColor: "#1A3A6B", logoBg: "#F0F4FF" },
  { number: "04", name: "Cornbread Soul", descriptor: "Fast-Casual / Hospitality", detail: "Brand & operational strategy", path: "/partners/cornbread", logoText: "CB", logoColor: "#8B4513", logoBg: "#FFF5EB", active: true },
];

export default function PartnersPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6 lg:px-16">
      <div className="max-w-[1200px] mx-auto space-y-16">
        <div className="space-y-4 max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>Axiom Advisory Partners LLC</p>
          <h1 className="text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>For Our Partners</h1>
          <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>Each engagement is confidential. Access is granted exclusively to the relevant partner.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {partners.map((p) => (
            <div key={p.path} onClick={() => navigate(p.path)}
              className="group relative border border-white/8 bg-white/[0.03] p-8 cursor-pointer hover:border-[#D4AF37]/40 hover:bg-white/[0.06] transition-all">
              {p.active && (
                <div className="absolute top-5 right-5 px-2.5 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  <span className="text-[#D4AF37] text-[9px] font-bold uppercase tracking-[0.15em]">Active</span>
                </div>
              )}
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 flex items-center justify-center font-bold text-sm"
                  style={{ background: p.logoBg, color: p.logoColor, fontFamily: "'Barlow', sans-serif", letterSpacing: "0.05em" }}>
                  {p.logoText}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>{p.number}</span>
                  <Lock size={13} className="text-white/20 group-hover:text-[#D4AF37] transition-colors" />
                </div>
              </div>
              <div className="space-y-1 mb-8">
                <h2 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>{p.name}</h2>
                <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]/70 font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>{p.descriptor}</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-white/30" style={{ fontFamily: "'Barlow', sans-serif" }}>{p.detail}</p>
                <ArrowRight size={15} className="text-white/20 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all shrink-0 ml-4" />
              </div>
            </div>
          ))}
        </div>
        <div className="border border-white/8 p-5 flex items-start gap-4">
          <div className="w-0.5 self-stretch bg-[#D4AF37]/30 shrink-0" />
          <p className="text-white/25 text-xs leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Partner logo assets are placeholders. Send the official logo files and they will be swapped in immediately.
          </p>
        </div>
        <p className="text-[10px] text-white/15 uppercase tracking-widest text-center" style={{ fontFamily: "'DM Mono', monospace" }}>
          All engagements are protected by confidentiality agreements — Axiom Advisory Partners LLC © 2026 · Founded by Christopher DeMarkus
        </p>
      </div>
    </div>
  );
}
