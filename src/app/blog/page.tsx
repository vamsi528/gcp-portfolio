export const dynamic = "force-dynamic";

const posts = [
  { title: "Building a zero-cost portfolio on GCP", date: "Aug 2026", tags: ["Cloud", "DevOps", "GCP"], color: "var(--cyan)" },
  { title: "Why I switched to infrastructure as code", date: "Jul 2026", tags: ["Terraform", "IaC", "CI/CD"], color: "var(--purple)" },
  { title: "Lessons from scaling a Next.js app", date: "Jun 2026", tags: ["Next.js", "Performance", "React"], color: "var(--magenta)" },
  { title: "The art of clean API design", date: "May 2026", tags: ["API", "Design", "Backend"], color: "var(--green)" },
];

export default function Blog() {
  return (
    <main style={pageStyle}>
      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--green)", fontWeight: 600 }}>
        Blog
      </span>
      <h1 style={headingStyle}>
        <span className="gradient-text">Writing</span> & thoughts
      </h1>

      <div style={{ display: "grid", gap: 16 }}>
        {posts.map((post, i) => (
          <article key={i} className="bento-card" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ minWidth: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${post.color}22, ${post.color}08)`, border: `1px solid ${post.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
              {i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, margin: "0 0 4px", lineHeight: 1.4 }}>
                {post.title}
              </h3>
              <p style={{ fontSize: "0.75rem", opacity: 0.45, margin: "0 0 8px" }}>
                {post.date}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {post.tags.map((tag) => (
                  <span key={tag} className="tag" style={{ fontSize: "0.65rem" }}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
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
