import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, ArrowRight, Layers, ChevronRight } from "lucide-react";

const VALID_CODES = ["AXIOM2026", "BRAND001", "PARTNER"];

const steps = [
  { icon: "01", label: "Receive Your Code", desc: "After your initial consultation, you'll receive a unique access code tied to your engagement." },
  { icon: "02", label: "Enter & Explore", desc: "Log in to find a curated set of brand options — identity, positioning, voice, visual direction — built specifically around your vision." },
  { icon: "03", label: "Make Your Selections", desc: "Move through each decision at your own pace. Choose what resonates. Skip what doesn't." },
  { icon: "04", label: "Submit Your Brief", desc: "Once complete, your selections compile into a brand brief delivered directly to us. We build from there." },
];

export default function BrandToolPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (VALID_CODES.includes(code.trim().toUpperCase())) {
      // Future: navigate to the multi-step tool
      alert("Access granted. The interactive tool is coming soon.");
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero block */}
      <div className="pt-36 pb-20 px-6 lg:px-16 max-w-[1200px] mx-auto">
        <div className="max-w-2xl space-y-6">
          <p
            className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Axiom Advisory Partners — Exclusive Tool
          </p>
          <h1
            className="text-white leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 400,
            }}
          >
            The Brand<br />
            <span style={{ color: "#D4AF37" }}>Decision Tool</span>
          </h1>
          <p
            className="text-white/50 leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", maxWidth: "520px" }}
          >
            After we align on your vision, this tool gives you the final say.
            We present the options we have built around your goals — you move through them,
            make your selections, and we execute. No ambiguity. No back-and-forth.
            Just a clear brief and a clear path forward.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="px-6 lg:px-16 pb-20 max-w-[1200px] mx-auto">
        <div className="border-t border-white/8 pt-14 mb-14">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-bold mb-10"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            How It Works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.icon} className="space-y-4">
                <span
                  className="text-[#D4AF37] font-bold"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}
                >
                  {s.icon}
                </span>
                <h3
                  className="text-white"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 500 }}
                >
                  {s.label}
                </h3>
                <p
                  className="text-white/35 text-sm leading-relaxed"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Access gate */}
        <div className="border border-white/8 bg-white/[0.02] p-10 max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={15} className="text-[#D4AF37]" />
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Partner Access
            </p>
          </div>
          <p
            className="text-white/50 text-sm leading-relaxed mb-8"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            This tool is available exclusively to active Axiom Advisory engagements.
            Enter the access code provided during your consultation to continue.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div
              className={`transition-all ${shake ? "animate-[shake_0.4s_ease]" : ""}`}
              style={{
                animation: shake ? "shake 0.4s ease" : "none",
              }}
            >
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(false); }}
                placeholder="Enter access code"
                className="w-full bg-transparent border px-4 py-3 text-white placeholder-white/20 outline-none transition-colors"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.12)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.12)")}
              />
              {error && (
                <p className="text-red-400/70 text-xs mt-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                  Invalid code. Please check with your advisor.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all group"
              style={{
                fontFamily: "'Barlow', sans-serif",
                background: "transparent",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#D4AF37",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "#D4AF37";
                b.style.color = "#0A0A0A";
                b.style.borderColor = "#D4AF37";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "transparent";
                b.style.color = "#D4AF37";
                b.style.borderColor = "rgba(212,175,55,0.4)";
              }}
            >
              Access Tool
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Not a partner CTA */}
        <div className="mt-10 flex items-center gap-4">
          <p className="text-white/25 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Not yet an Axiom partner?
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Begin an engagement <ChevronRight size={13} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
