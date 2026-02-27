import { useNavigate } from "react-router";
import { Lock, ArrowRight } from "lucide-react";

const partners = [
  {
    number: "01",
    name: "Walmart",
    descriptor: "Enterprise Retail",
    detail: "Strategic advisory engagement",
    path: "/partners/walmart",
  },
  {
    number: "02",
    name: "R.O.R.I. Project",
    descriptor: "Nonprofit",
    detail: "Organizational infrastructure & governance",
    path: "/partners/rori-project",
  },
  {
    number: "03",
    name: "NPHC of Hudson County",
    descriptor: "Nonprofit / Civic",
    detail: "Operations & communications advisory",
    path: "/partners/nphc-hudson",
  },
  {
    number: "04",
    name: "Cornbread Soul",
    descriptor: "Fast-Casual / Hospitality",
    detail: "Brand & operational strategy",
    path: "/partners/cornbread",
  },
];

export default function PartnersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 lg:px-16">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
            Axiom Advisory Partners
          </p>
          <h1
            className="text-5xl font-bold text-[#0A0A0A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            For Our Partners
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Each engagement is confidential. Access is granted exclusively to the relevant partner.
          </p>
        </div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((p) => (
            <div
              key={p.path}
              onClick={() => navigate(p.path)}
              className="group border border-gray-100 p-8 cursor-pointer hover:border-[#D4AF37]/40 hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-start mb-8">
                <span
                  className="text-[11px] uppercase tracking-[0.2em] text-gray-300 font-bold"
                >
                  {p.number}
                </span>
                <Lock size={14} className="text-gray-300 group-hover:text-[#D4AF37] transition-colors" />
              </div>

              <div className="space-y-1 mb-8">
                <h2
                  className="text-2xl font-bold text-[#0A0A0A]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {p.name}
                </h2>
                <p className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold">
                  {p.descriptor}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <p className="text-sm text-gray-400">{p.detail}</p>
                <ArrowRight
                  size={16}
                  className="text-gray-300 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-gray-300 uppercase tracking-widest text-center">
          All engagements are protected by confidentiality agreements — Axiom Advisory Partners © 2026
        </p>
      </div>
    </div>
  );
}
