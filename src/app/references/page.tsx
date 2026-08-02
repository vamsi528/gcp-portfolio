export const dynamic = "force-dynamic";

const refs = [
  {
    name: "Alex Chen",
    role: "Engineering Manager, Current Co",
    text: "One of the most resourceful engineers I've worked with. Ships fast, thinks long-term, and makes everyone around them better.",
    color: "var(--cyan)",
  },
  {
    name: "Priya Sharma",
    role: "Staff Engineer, Previous Co",
    text: "Exceptional at systems thinking. They don't just write code — they understand the entire stack and how each piece connects.",
    color: "var(--purple)",
  },
  {
    name: "Marcus Johnson",
    role: "VP Engineering, Earlier Co",
    text: "A rare combination of deep technical skill and genuine care for product quality. Always delivered beyond expectations.",
    color: "var(--magenta)",
  },
];

export default function References() {
  return (
    <main style={pageStyle}>
      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--orange)", fontWeight: 600 }}>
        References
      </span>
      <h1 style={headingStyle}>
        What others{" "}
        <span className="gradient-text">say</span>
      </h1>

      <div style={{ display: "grid", gap: 16 }}>
        {refs.map((ref, i) => (
          <div key={i} className="bento-card" style={{ borderLeft: `3px solid ${ref.color}` }}>
            <blockquote style={{ margin: "0 0 16px", fontSize: "0.95rem", opacity: 0.7, lineHeight: 1.7, fontStyle: "italic", quotes: "none" }}>
              &ldquo;{ref.text}&rdquo;
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${ref.color}44, ${ref.color}11)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", color: ref.color }}>
                {ref.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.85rem", margin: "0 0 2px" }}>{ref.name}</p>
                <p style={{ fontSize: "0.75rem", opacity: 0.45, margin: 0 }}>{ref.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "32px 16px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 800,
  margin: "8px 0 24px",
  lineHeight: 1.2,
};
