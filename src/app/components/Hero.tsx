import { useEffect, useState } from "react";

const heroImg = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/image.jpg";

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "100svh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #2a2a2a 70%, #111 100%)",
      }}
    >
      {/* ── LAYER 1: Massive "AXIOM" display text — purely decorative, behind everything ── */}
      <div
        className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease 0.2s",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(5rem, 22vw, 20rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.12)",
            paddingLeft: "2vw",
            userSelect: "none",
          }}
        >
          AXIOM
        </div>
        <div
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(1rem, 4vw, 3.5rem)",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.07)",
            paddingLeft: "2.5vw",
            marginTop: "0.5rem",
            userSelect: "none",
          }}
        >
          ADVISORY PARTNERS
        </div>
      </div>

      {/* ── LAYER 2: Subject photo — right side, full height, no overlay on face ── */}
      <div
        className="absolute inset-y-0 right-0 pointer-events-none"
        style={{
          width: "clamp(280px, 52%, 700px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.4s",
        }}
      >
        <img
          src={heroImg}
          alt="Christopher DeMarkus — Axiom Advisory Partners"
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
          }}
          loading="eager"
        />
        {/* Gradient only on the LEFT edge of the photo to blend into the dark background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.6) 20%, rgba(10,10,10,0.1) 50%, transparent 100%)",
          }}
        />
        {/* Very subtle bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 30%)",
          }}
        />
      </div>

      {/* ── LAYER 3: All copy — left side, never touches the subject ── */}
      <div
        className="relative flex flex-col justify-between"
        style={{ minHeight: "100svh", maxWidth: "52%", padding: "clamp(1.5rem, 4vw, 3rem)" }}
      >
        {/* Top: Logo / wordmark */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
            }}
          >
            Axiom Advisory Partners
          </p>
        </div>

        {/* Bottom: Service pills + headline + description + CTAs */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
          }}
        >
          {/* Service category pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["Advisory", "Governance", "Operations", "Brand", "Risk"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "clamp(0.55rem, 0.9vw, 0.65rem)",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#D4AF37",
                  border: "1px solid rgba(212,175,55,0.35)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)",
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "0.4rem",
              textShadow: "0 2px 30px rgba(0,0,0,0.8)",
            }}
          >
            Strategic counsel.
          </h1>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)",
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "1.5rem",
              textShadow: "0 2px 30px rgba(0,0,0,0.8)",
            }}
          >
            <span style={{ color: "#D4AF37", fontStyle: "italic" }}>Without</span> compromise.
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.5)",
              marginBottom: "2rem",
              maxWidth: "38ch",
            }}
          >
            Axiom Advisory Partners delivers strategic advisory and operational
            architecture for organizations navigating complexity at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("services")}
              className="group relative overflow-hidden"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#D4AF37",
                border: "1.5px solid rgba(212,175,55,0.6)",
                padding: "0.75rem 1.5rem",
                background: "transparent",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
            >
              <span
                className="absolute inset-0"
                style={{
                  background: "#D4AF37",
                  transform: "translateY(100%)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget.parentElement as HTMLElement).style.color = "#0A0A0A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(100%)";
                  (e.currentTarget.parentElement as HTMLElement).style.color = "#D4AF37";
                }}
              />
              <span className="relative">Explore Services</span>
            </button>

            <button
              onClick={() => scrollTo("contact")}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                background: "#D4AF37",
                border: "1.5px solid #D4AF37",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                transition: "background 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#c9a227";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#D4AF37";
              }}
            >
              Begin Engagement
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile layout override: stack vertically ── */}
      <style>{`
        @media (max-width: 640px) {
          /* On mobile, show photo full-width at top, copy below */
          .hero-copy-col {
            max-width: 100% !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
