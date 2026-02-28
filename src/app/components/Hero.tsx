import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const heroImg = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/image.jpeg";

export function Hero() {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const navigate = useNavigate();

  return (
    <section
      className="relative"
      style={{
        minHeight: "100svh",
        background: "#e8e8e8",
        zIndex: 0,
        isolation: "isolate",
      }}
    >
      {/* ── LAYER 1: Subject photo — full width, centered, with subtle zoom settle ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: visible && imgLoaded ? 1 : 0,
          transform: visible && imgLoaded ? "scale(1)" : "scale(1.04)",
          transition: "opacity 1.2s ease 0.2s, transform 1.8s ease 0.2s",
        }}
      >
        <img
          src={heroImg}
          alt="Christopher DeMarkus — Axiom Advisory Partners"
          className="w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
          loading="eager"
          onLoad={() => setImgLoaded(true)}
        />
        {/* Bottom fade to dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.3) 35%, transparent 65%)",
          }}
        />
      </div>

      {/* ── LAYER 2: Full-width background bottom-fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "55%",
          background:
            "linear-gradient(to top, rgba(12,12,12,0.95) 0%, rgba(12,12,12,0.6) 40%, transparent 100%)",
        }}
      />

      {/* ── LAYER 3: All copy — sits over the dark bottom gradient ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          padding: "clamp(1.2rem, 3vw, 2.5rem) clamp(1.2rem, 4vw, 3rem)",
          paddingBottom: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Two-column on desktop, stacked & centered on mobile */}
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-end md:justify-between gap-4 items-center md:items-end text-center md:text-left">
          <div className="mx-auto md:mx-0" style={{ maxWidth: "520px" }}>
            {/* Eyebrow — company name */}
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase" as const,
                marginBottom: "0.4rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
              }}
            >
              Axiom Advisory Partners
            </p>

            {/* Headline — "Strategic counsel." */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                lineHeight: 1.15,
                color: "#ffffff",
                marginBottom: "0.3rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s",
              }}
            >
              Strategic counsel.
            </h1>
            {/* Headline — "Without compromise." */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                lineHeight: 1.15,
                color: "#ffffff",
                marginBottom: "1rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.7s ease 0.8s, transform 0.7s ease 0.8s",
              }}
            >
              <span style={{ color: "#D4AF37" }}>Without</span> compromise.
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.45)",
                maxWidth: "42ch",
                margin: "0 auto",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s ease 0.95s, transform 0.6s ease 0.95s",
              }}
            >
              Axiom Advisory Partners delivers strategic advisory and operational
              architecture for organizations navigating complexity at scale.
            </p>
          </div>

          {/* CTA Buttons — centered on mobile, right-aligned on desktop */}
          <div
            className="flex flex-wrap gap-3 justify-center md:justify-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 1.1s, transform 0.6s ease 1.1s",
            }}
          >
            <button
              onClick={() => navigate("/services")}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.7rem, 1vw, 0.82rem)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "#D4AF37",
                border: "1.5px solid rgba(212,175,55,0.65)",
                padding: "0.7rem 1.4rem",
                background: "transparent",
                cursor: "pointer",
                transition: "background 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#D4AF37";
                el.style.color = "#0a0a0a";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "transparent";
                el.style.color = "#D4AF37";
              }}
            >
              Explore Services
            </button>

            <button
              onClick={() => { window.location.href = "mailto:engage@axiomadvisorypartners.co"; }}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.7rem, 1vw, 0.82rem)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "#0a0a0a",
                background: "#D4AF37",
                border: "1.5px solid #D4AF37",
                padding: "0.7rem 1.4rem",
                cursor: "pointer",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#c9a227";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#D4AF37";
              }}
            >
              Begin Engagement
            </button>
          </div>
        </div>

        {/* Service category pills — below CTAs */}
        <div
          className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease 1.25s, transform 0.5s ease 1.25s",
          }}
        >
          {["Advisory", "Governance", "Operations", "Brand", "Risk"].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(0.5rem, 1vw, 0.62rem)",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.5)",
                padding: "0.2rem 0.6rem",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
