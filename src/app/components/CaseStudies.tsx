import { useEffect, useRef, useState } from "react";

const cases = [
  { num: "01", sector: "Healthcare Governance", headline: "Redesigning Compliance Architecture for a Regional Health System", desc: "Developed and implemented a governance framework for a multi-facility healthcare network, establishing decision-rights protocols, regulatory compliance workflows, and board-level reporting structures." },
  { num: "02", sector: "Consumer Brand Crisis", headline: "Stabilizing a National Brand Through Reputational Disruption", desc: "Led crisis management and communications strategy for a consumer brand facing public scrutiny — designing rapid-response protocols and stakeholder messaging that restored market confidence." },
  { num: "03", sector: "Nonprofit Transformation", headline: "Operational Rebuild for a National Nonprofit Organization", desc: "Architected a full operational transformation for a nonprofit scaling from regional to national impact — restructuring teams, implementing program governance, and building donor-facing reporting infrastructure." },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function CaseStudies() {
  const { ref, inView } = useInView();
  return (
    <section id="work" className="bg-[#0A0A0A] py-20 sm:py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14 sm:mb-20 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)" }}>
          <p className="text-[#D4AF37] mb-3 uppercase tracking-[0.2em] text-[11px] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>Case Studies</p>
          <div className="flex items-center gap-6">
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400 }}>Where We've Operated</h2>
            <div className="flex-1 h-px bg-[#D4AF37]/30" />
          </div>
        </div>
        <div className="divide-y divide-white/8">
          {cases.map((c, i) => (
            <div key={c.num}
              className="py-10 sm:py-14 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start group"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: `opacity 0.6s ease ${0.15 + i * 0.15}s, transform 0.6s ease ${0.15 + i * 0.15}s` }}>
              <div className="lg:col-span-1">
                <span className="text-[#D4AF37] font-bold" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.875rem" }}>{c.num}</span>
              </div>
              <div className="lg:col-span-2">
                <span className="text-white/35 uppercase tracking-widest" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem" }}>{c.sector}</span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="text-white group-hover:text-[#D4AF37] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 500, lineHeight: 1.4 }}>{c.headline}</h3>
              </div>
              <div className="lg:col-span-5">
                <p className="text-white/45" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", lineHeight: 1.8 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
