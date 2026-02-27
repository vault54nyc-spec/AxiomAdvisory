import { useState } from "react";

const serviceOptions = [
  "Fractional Chief of Staff",
  "Strategy to Structure",
  "Operations Management",
  "AI Governance & Compliance",
  "Organizational Governance",
  "Executive Communications",
  "Crisis Management",
  "Strategic Risk Assessment",
  "Brand Strategy & Market Presence",
];

// ACTION REQUIRED: Replace with your Formspree form ID
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form pointed at: engage@axiomadvisorypartners.co
// 3. Replace "YOUR_FORMSPREE_ID" below with your form ID (e.g. "xpzgkqrb")
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ID";

export function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", company: "", email: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.9375rem",
  };

  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <p
              className="text-[#D4AF37] mb-3"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Contact
            </p>
            <h2
              className="text-[#0A0A0A] mb-8"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400 }}
            >
              Start the Conversation
            </h2>
            <div className="space-y-6">
              <div>
                <p
                  className="text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Email
                </p>
                <p className="text-[#0A0A0A]" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem" }}>
                  engage@axiomadvisorypartners.co
                </p>
              </div>
              <div>
                <p
                  className="text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Office
                </p>
                <p className="text-[#0A0A0A]" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem" }}>
                  Dallas–Fort Worth, TX
                </p>
              </div>
              <div>
                <p
                  className="text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Availability
                </p>
                <p className="text-[#0A0A0A]" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem" }}>
                  Now accepting new engagements
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === "success" ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}>✓</span>
                  </div>
                  <p className="text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}>
                    Thank you. We'll be in touch.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A]"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A]"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block mb-2 text-[#0A0A0A]/40"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A]"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-[#0A0A0A]/40"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Service Interest
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A] appearance-none cursor-pointer"
                    style={inputStyle}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block mb-2 text-[#0A0A0A]/40"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A] resize-none"
                    style={inputStyle}
                  />
                </div>

                {status === "error" && (
                  <p
                    className="text-red-500 text-sm"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Something went wrong. Please email us directly at engage@axiomadvisorypartners.co
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-8 py-3.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-colors mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.04em" }}
                >
                  {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
