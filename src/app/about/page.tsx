export const dynamic = "force-dynamic";

export default function About() {
  return (
    <main style={pageStyle}>
      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--purple)", fontWeight: 600 }}>
        About
      </span>
      <h1 style={headingStyle}>
        The person behind{" "}
        <span className="gradient-text">the code</span>
      </h1>

      <div className="bento-card" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: "0.95rem", opacity: 0.65, lineHeight: 1.8, margin: 0 }}>
          I&apos;m a full-stack engineer with a deep appreciation for clean architecture,
          infrastructure as code, and developer experience. I believe great software
          comes from thoughtful defaults, not clever tricks.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="bento-card">
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--cyan)", margin: "0 0 12px", fontWeight: 600 }}>
            What I do
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Cloud Architecture", "Backend Systems", "Developer Tooling", "Infrastructure as Code", "API Design", "Platform Engineering"].map((t) => (
              <span key={t} className="tag" style={{ fontSize: "0.7rem" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="bento-card">
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--green)", margin: "0 0 12px", fontWeight: 600 }}>
            Tools I love
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Next.js", "TypeScript", "Go", "Terraform", "Docker", "GCP", "PostgreSQL", "Kubernetes"].map((t) => (
              <span key={t} className="tag" style={{ fontSize: "0.7rem" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: 920,
  margin: "0 auto",
  padding: "32px 16px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 800,
  margin: "8px 0 24px",
  lineHeight: 1.2,
};
