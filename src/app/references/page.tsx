import QuoteToggle from "../components/QuoteToggle";

export const dynamic = "force-dynamic";

interface Reference {
  name: string;
  role: string;
  profileUrl: string;
  relationship: string;
  quoteShort: string;
  quoteFull?: string;
  color: string;
}

const refs: Reference[] = [
  {
    name: "Alex Chen",
    role: "Engineering Manager",
    profileUrl: "https://www.linkedin.com/in/",
    relationship: "Managed Vamsi directly · Feb 2024",
    quoteShort: "One of the most resourceful engineers I've worked with. Ships fast and thinks long-term.",
    quoteFull:
      "One of the most resourceful engineers I've worked with. Ships fast and thinks long-term. Vamsi consistently delivered ahead of schedule while maintaining exceptional code quality. They have a rare ability to balance velocity with sustainability — never cutting corners, always leaving the codebase better than they found it.",
    color: "var(--cyan)",
  },
  {
    name: "Priya Sharma",
    role: "Staff Engineer",
    profileUrl: "https://www.linkedin.com/in/",
    relationship: "Worked together on platform team · 2023–2024",
    quoteShort: "Exceptional at systems thinking. Understands the entire stack and how each piece connects.",
    quoteFull:
      "Exceptional at systems thinking. Understands the entire stack and how each piece connects. Vamsi was the go-to person for architecture decisions on our team. They have a knack for identifying the right abstraction at the right time, and they communicate technical tradeoffs with clarity that made the whole team better.",
    color: "var(--purple)",
  },
  {
    name: "Marcus Johnson",
    role: "VP Engineering",
    profileUrl: "https://www.linkedin.com/in/",
    relationship: "Reported to Marcus · 2022–2023",
    quoteShort: "A rare combination of deep technical skill and genuine care for product quality.",
    color: "var(--magenta)",
  },
];

export default function References() {
  return (
    <main style={pageStyle}>
      <span style={sectionLabel}>References</span>
      <h1 style={headingStyle}>
        What others{" "}
        <span className="gradient-text">say</span>
      </h1>

      <div style={{ display: "grid", gap: 16 }}>
        {refs.map((ref, i) => (
          <div key={i} className="bento-card" style={{ borderLeft: `3px solid ${ref.color}` }}>
            <QuoteToggle
              short={ref.quoteShort}
              full={ref.quoteFull ?? ref.quoteShort}
              color={ref.color}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={avatarStyle(ref.color)}>
                {ref.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <a
                  href={ref.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ref-link"
                  aria-label={`View ${ref.name}'s LinkedIn profile (opens in new tab)`}
                  style={{ fontWeight: 600, fontSize: "0.85rem" }}
                >
                  {ref.name}
                </a>
                <p style={roleStyle}>{ref.role}</p>
                <p style={relationshipStyle}>{ref.relationship}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <a
          href="https://www.linkedin.com/in/vamsi-thokala/details/recommendations/?detailScreenTabIndex=0"
          target="_blank"
          rel="noopener noreferrer"
          className="ref-footer-link"
          style={{ fontSize: "0.85rem", opacity: 0.55, fontWeight: 500 }}
        >
          Verify all recommendations on LinkedIn
          <span aria-hidden="true" className="ref-ext-glyph">↗</span>
        </a>
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

const sectionLabel: React.CSSProperties = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "var(--orange)",
  fontWeight: 600,
};

const roleStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  opacity: 0.45,
  margin: "0 0 2px",
};

const relationshipStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  opacity: 0.3,
  margin: 0,
  fontStyle: "italic",
};

const avatarStyle = (color: string): React.CSSProperties => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${color}44, ${color}11)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: "0.8rem",
  color,
  flexShrink: 0,
});
