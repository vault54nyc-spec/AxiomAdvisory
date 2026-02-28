import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type FeedSource = {
  name: string;
  topic: string;
  url: string;
};

type FeedItem = {
  title: string;
  link: string;
  date: string;
  source: string;
  topic: string;
};

const rssSources: FeedSource[] = [
  { name: "OpenAI", topic: "AI", url: "https://openai.com/news/rss.xml" },
  { name: "MIT Sloan", topic: "Strategy", url: "https://mitsloan.mit.edu/feed" },
  { name: "HubSpot", topic: "Branding", url: "https://blog.hubspot.com/marketing/rss.xml" },
];

const fallbackItems: FeedItem[] = [
  {
    title: "AI strategy now requires operating models, not just tooling decisions",
    link: "https://openai.com/news/",
    date: "2026-01-15",
    source: "OpenAI",
    topic: "AI",
  },
  {
    title: "Why brand governance is becoming a board-level conversation",
    link: "https://blog.hubspot.com/marketing",
    date: "2026-01-07",
    source: "HubSpot",
    topic: "Branding",
  },
  {
    title: "Execution architecture: what separates strategic plans from strategic outcomes",
    link: "https://mitsloan.mit.edu/ideas-made-to-matter",
    date: "2025-12-22",
    source: "MIT Sloan",
    topic: "Strategy",
  },
];

const facts = [
  "Brands with clear positioning frameworks are more likely to maintain pricing power during market volatility.",
  "Teams with documented decision rights can cut rework by reducing approval bottlenecks and duplicate effort.",
  "High-growth organizations often fail from operational lag, not idea scarcity.",
  "AI adoption without governance usually increases risk faster than it increases value.",
  "Most brand confusion starts internally before it appears in the market.",
];

const formatDate = (input: string) => {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return "Recent";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const parseFeed = (xmlText: string, source: FeedSource): FeedItem[] => {
  const xml = new DOMParser().parseFromString(xmlText, "text/xml");
  if (xml.querySelector("parsererror")) return [];

  const rssItems = Array.from(xml.querySelectorAll("item")).map((node) => {
    const title = node.querySelector("title")?.textContent?.trim() || "Untitled";
    const link = node.querySelector("link")?.textContent?.trim() || "";
    const date = node.querySelector("pubDate")?.textContent?.trim() || "";
    return { title, link, date, source: source.name, topic: source.topic };
  });

  if (rssItems.length > 0) return rssItems;

  const atomItems = Array.from(xml.querySelectorAll("entry")).map((node) => {
    const title = node.querySelector("title")?.textContent?.trim() || "Untitled";
    const link = node.querySelector("link")?.getAttribute("href") || node.querySelector("id")?.textContent?.trim() || "";
    const date = node.querySelector("published")?.textContent?.trim() || node.querySelector("updated")?.textContent?.trim() || "";
    return { title, link, date, source: source.name, topic: source.topic };
  });

  return atomItems;
};

export function HomeIntelligence() {
  const navigate = useNavigate();
  const [feedItems, setFeedItems] = useState<FeedItem[]>(fallbackItems);
  const [loading, setLoading] = useState(true);
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * facts.length));
  const [factVisible, setFactVisible] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchFeeds = async () => {
      const settled = await Promise.allSettled(
        rssSources.map(async (source) => {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(source.url)}`;
          const res = await fetch(proxyUrl);
          if (!res.ok) throw new Error(`Failed to load ${source.name}`);
          const xmlText = await res.text();
          return parseFeed(xmlText, source).slice(0, 4);
        }),
      );

      const merged = settled
        .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
        .filter((item) => item.link);

      if (!active) return;

      if (merged.length > 0) {
        const sorted = merged
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 6);
        setFeedItems(sorted);
      }

      setLoading(false);
    };

    fetchFeeds().catch(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let swapTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setFactVisible(false);
      swapTimeout = setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % facts.length);
        setFactVisible(true);
      }, 260);
    }, 9000);

    return () => {
      clearInterval(interval);
      if (swapTimeout) clearTimeout(swapTimeout);
    };
  }, []);

  return (
    <section className="bg-[#E8E8E8] py-20 sm:py-24 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-7">
          <p
            className="text-[#0A0A0A]/50 uppercase tracking-[0.16em]"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.66rem" }}
          >
            Field Intelligence
          </p>
          <h2
            className="text-[#0A0A0A]"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.35rem, 2.5vw, 2.15rem)", lineHeight: 1.25 }}
          >
            Popular Insights Across Branding, AI, and Strategic Operations
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 border border-black/10 bg-white">
            <div className="px-5 py-4 border-b border-black/10 flex items-center justify-between">
              <p
                className="text-[#0A0A0A]"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.86rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" as const }}
              >
                Popular RSS Feed
              </p>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "rgba(10,10,10,0.55)" }}>
                {loading ? "Updating..." : "Live"}
              </span>
            </div>
            <div className="divide-y divide-black/8">
              {feedItems.map((item) => (
                <a
                  key={`${item.source}-${item.link}`}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-5 py-4 hover:bg-[#F6F6F6] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="px-2 py-0.5 border border-[#D4AF37]/50 text-[#7A6218]"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.05em", textTransform: "uppercase" as const }}
                    >
                      {item.topic}
                    </span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "rgba(10,10,10,0.45)" }}>
                      {item.source} · {formatDate(item.date)}
                    </span>
                  </div>
                  <p
                    className="text-[#0A0A0A]"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.45 }}
                  >
                    {item.title}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="border border-black/10 bg-[#0F0F10] text-white p-5">
              <p
                className="text-[#D4AF37] mb-3"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem", letterSpacing: "0.1em", textTransform: "uppercase" as const }}
              >
                Did You Know?
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.12rem",
                  lineHeight: 1.45,
                  opacity: factVisible ? 1 : 0,
                  transform: factVisible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.26s ease, transform 0.26s ease",
                }}
              >
                {facts[factIndex]}
              </p>
              <button
                onClick={() => setFactIndex((prev) => (prev + 1) % facts.length)}
                className="mt-4 px-3 py-2 border border-[#D4AF37]/40 text-[#D4AF37]"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" as const }}
              >
                Show Another
              </button>
            </div>

            <div className="border border-black/10 bg-white p-5 space-y-3">
              <p
                className="text-[#0A0A0A]/55"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase" as const }}
              >
                Next Actions
              </p>
              <button
                onClick={() => navigate("/services")}
                className="w-full text-left px-3 py-2.5 border border-[#0A0A0A]/15 hover:border-[#D4AF37]/70 hover:bg-[#FAFAFA] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}
              >
                Explore Services
              </button>
              <button
                onClick={() => navigate("/brand-tool")}
                className="w-full text-left px-3 py-2.5 border border-[#0A0A0A]/15 hover:border-[#D4AF37]/70 hover:bg-[#FAFAFA] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}
              >
                Launch Brand Decision Tool
              </button>
              <button
                onClick={() => { window.location.href = "mailto:engage@axiomadvisorypartners.co"; }}
                className="w-full text-left px-3 py-2.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c5a12f] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", fontWeight: 700 }}
              >
                Begin Engagement
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
