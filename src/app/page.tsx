import { headers } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heads = await headers();
  const host = heads.get("host") ?? "unknown";
  const userAgent = heads.get("user-agent") ?? "none";
  const now = new Date().toISOString();

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Vamsi Thokala";
  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "vamsithokala.in";

  return (
    <main style={mainStyle}>
      <img
        src="/Vamsi.jpg"
        alt={siteName}
        style={photoStyle}
      />

      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.2em", marginTop: "0.5em" }}>
        {siteName}
      </h1>

      <p style={{ fontSize: "1.1rem", opacity: 0.65, maxWidth: 480, margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
        Full-stack developer. Building thoughtful software for the web.
      </p>

      <div style={socialRow}>
        <a href="https://linkedin.com/in/vamsithokala" target="_blank" rel="noopener" style={socialLink}>
          LinkedIn
        </a>
        <a href="https://x.com/vamsithokala" target="_blank" rel="noopener" style={socialLink}>
          X
        </a>
        <a href="mailto:thevamsithokala@gmail.com" style={socialLink}>
          Gmail
        </a>
      </div>

      <Link href="/schedule-call" style={ctaStyle}>
        Schedule a Call
      </Link>

      <div style={metaCard}>
        <p style={metaLine}>
          <span style={metaLabel}>Served at</span> {now}
        </p>
        <p style={metaLine}>
          <span style={metaLabel}>Host</span> {host}
        </p>
        <p style={metaLine}>
          <span style={metaLabel}>UA</span> {userAgent}
        </p>
      </div>

      <p style={{ marginTop: "2rem", fontSize: "0.8rem", opacity: 0.4 }}>
        Running on Cloud Run · {siteDomain}
      </p>
    </main>
  );
}

const mainStyle: React.CSSProperties = {
  textAlign: "center",
};

const photoStyle: React.CSSProperties = {
  width: 120,
  height: 120,
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid rgba(255,255,255,0.15)",
};

const socialRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "1.2rem",
  marginBottom: "1.8rem",
};

const socialLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.65)",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  padding: "0.35rem 0.75rem",
  borderRadius: 6,
  border: "1px solid rgba(255,255,255,0.12)",
  transition: "background 0.15s, color 0.15s",
};

const ctaStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "0.7rem 1.8rem",
  borderRadius: 8,
  background: "#8be9fd",
  color: "#0f0f0f",
  fontWeight: 600,
  textDecoration: "none",
  fontSize: "0.95rem",
  marginBottom: "2.5rem",
};

const metaCard: React.CSSProperties = {
  marginTop: "1rem",
  padding: "1rem 1.5rem",
  borderRadius: 12,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  display: "inline-block",
  textAlign: "left",
  fontSize: "0.8rem",
};

const metaLine: React.CSSProperties = {
  margin: "0.4em 0",
};

const metaLabel: React.CSSProperties = {
  fontWeight: 600,
  color: "#8be9fd",
  marginRight: "0.5em",
};
