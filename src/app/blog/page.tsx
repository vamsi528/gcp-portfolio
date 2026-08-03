import Link from "next/link";
import { getAllPosts } from "../../lib/blog";

export const dynamic = "force-dynamic";

const tagColors: Record<string, string> = {
  Cloud: "var(--cyan)",
  DevOps: "var(--purple)",
  GCP: "var(--cyan)",
  Terraform: "var(--purple)",
  IaC: "var(--purple)",
  "Data Engineering": "var(--magenta)",
  Migration: "var(--orange)",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main style={pageStyle}>
      <span style={sectionLabel}>Blog</span>
      <h1 style={headingStyle}>
        <span className="gradient-text">Writing</span> & thoughts
      </h1>

      <div style={{ display: "grid", gap: 16 }}>
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article className="bento-card" style={{ display: "flex", gap: 20, alignItems: "flex-start", cursor: "pointer" }}>
              <div style={indexStyle(i)}>
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
                    <span key={tag} className="tag" style={{ fontSize: "0.65rem", color: tagColors[tag], borderColor: tagColors[tag] ? `${tagColors[tag]}33` : undefined }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
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

const sectionLabel: React.CSSProperties = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "var(--green)",
  fontWeight: 600,
};

const indexStyle = (i: number): React.CSSProperties => ({
  minWidth: 48,
  height: 48,
  borderRadius: 12,
  background: `linear-gradient(135deg, rgba(139,233,253,0.1), rgba(189,147,249,0.05))`,
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "var(--text-dim)",
});
