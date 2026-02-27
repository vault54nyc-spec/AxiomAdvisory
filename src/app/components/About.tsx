import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const pillars = [
  { label: "Precision", desc: "Every recommendation is grounded in evidence, not assumption." },
  { label: "Discretion", desc: "We operate with the confidentiality your organization demands." },
  { label: "Accountability", desc: "We are measured by outcomes, not deliverables." },
];

export function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" className="bg-[#F9F7F3] py-20 sm:py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <div>
              <p className="text-[#D4AF37] mb-3 uppercase tracking-[0.2em] text-[11px] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>About the Firm</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400, color: "#0A0A0A" }}>
                Built for the Complexity<br /><em style={{ color: "#D4AF37" }}>Others Avoid</em>
              </h2>
            </div>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(10,10,10,0.65)" }}>
              Axiom Advisory Partners is a boutique strategic advisory firm delivering institutional-grade counsel with the agility of a trusted partner. We embed where it matters — at the intersection of strategy, operations, and organizational leadership.
            </p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(10,10,10,0.65)" }}>
              As a minority-owned firm based in Dallas–Fort Worth, we are committed to delivering the kind of advisory that moves organizations — not just advises them.
            </p>
          </div>
          <div className="space-y-0 divide-y divide-[#0A0A0A]/8"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(30px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
            {pillars.map((p, i) => (
              <div key={p.label} className="py-7 flex gap-6 items-start"
                style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `opacity 0.5s ease ${0.3 + i * 0.12}s, transform 0.5s ease ${0.3 + i * 0.12}s` }}>
                <div className="w-1 h-8 bg-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "#0A0A0A" }}>{p.label}</p>
                  <p className="mt-1" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(10,10,10,0.55)" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
