export function EngagementBanner() {
  const scrollTo = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-[#D4AF37]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
        <h2
          className="text-[#0A0A0A]"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 500 }}
        >
          Ready to Build?
        </h2>
        <button
          onClick={scrollTo}
          className="px-8 py-3.5 bg-[#0A0A0A] text-white hover:bg-[#1a1a1a] transition-colors"
          style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.04em" }}
        >
          Begin Engagement →
        </button>
      </div>
    </section>
  );
}
