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
    <div className="bento-grid">
      {/* ── Hero Card ── */}
      <div className="bento-card hero-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div className="photo-ring" style={{ marginBottom: 20 }}>
          <img
            src="/Vamsi.jpg"
            alt={siteName}
            style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", display: "block" }}
          />
        </div>

        <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--cyan)", margin: "0 0 8px", fontWeight: 600 }}>
          Cloud Data Engineer
        </p>

        <h1 style={{ fontSize: "2.1rem", fontWeight: 800, margin: "0 0 4px", lineHeight: 1.2 }}>
          Hello, I&apos;m{" "}
          <span className="gradient-text">{siteName.split(" ")[0]}</span>
        </h1>

        <p style={{ fontSize: "0.95rem", opacity: 0.6, maxWidth: 320, lineHeight: 1.6, margin: "12px 0 24px" }}>
          I design and build scalable data platforms on the cloud.
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
          <span className="tag" style={{ color: "var(--cyan)", borderColor: "rgba(139,233,253,0.2)" }}>GCP</span>
          <span className="tag" style={{ color: "var(--purple)", borderColor: "rgba(189,147,249,0.2)" }}>BigQuery</span>
          <span className="tag" style={{ color: "var(--magenta)", borderColor: "rgba(255,121,198,0.2)" }}>Dataflow</span>
          <span className="tag" style={{ color: "var(--green)", borderColor: "rgba(80,250,123,0.2)" }}>Airflow</span>
          <span className="tag" style={{ color: "var(--orange)", borderColor: "rgba(255,184,108,0.2)" }}>Spark</span>
          <span className="tag" style={{ color: "var(--cyan)", borderColor: "rgba(139,233,253,0.2)" }}>Terraform</span>
          <span className="tag" style={{ color: "var(--purple)", borderColor: "rgba(189,147,249,0.2)" }}>dbt</span>
          <span className="tag" style={{ color: "var(--magenta)", borderColor: "rgba(255,121,198,0.2)" }}>Python</span>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <a href="https://www.linkedin.com/in/vamsi-thokala/" target="_blank" rel="noopener" className="pill-link">
            <span style={{ color: "var(--cyan)" }}>in</span> LinkedIn
          </a>
          <a href="https://x.com/Vamsi_Thok" target="_blank" rel="noopener" className="pill-link">
            <span style={{ color: "var(--cyan)" }}>𝕏</span> X
          </a>
          <a href="mailto:thevamsithokala@gmail.com" className="pill-link">
            <span style={{ color: "var(--cyan)" }}>@</span> Email
          </a>
        </div>
      </div>

      {/* ── Stats Card ── */}
      <div className="bento-card" style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <div className="stat">
          <div className="stat-number">7+</div>
          <div className="stat-label">Years Exp</div>
        </div>
        <div className="stat">
          <div className="stat-number">20+</div>
          <div className="stat-label">Projects</div>
        </div>
        <div className="stat">
          <div className="stat-number">5+</div>
          <div className="stat-label">Cloud Certs</div>
        </div>
      </div>

      {/* ── About Preview Card ── */}
      <Link href="/about" className="bento-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--purple)", margin: "0 0 8px", fontWeight: 600 }}>
          About Me
        </p>
        <p style={{ fontSize: "0.9rem", opacity: 0.65, margin: 0, lineHeight: 1.6 }}>
          When I&apos;m not working with data, you&apos;ll find me travelling to new places,
          staying active with sports, or spending time with friends. I thrive in
          collaborative environments and believe a great team makes all the difference.
        </p>
        <p style={{ fontSize: "0.8rem", color: "var(--cyan)", marginTop: 12, fontWeight: 500 }}>
          Read more →
        </p>
      </Link>

      {/* ── Experience Preview ── */}
      <Link href="/experience" className="bento-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--magenta)", margin: "0 0 8px", fontWeight: 600 }}>
          Experience
        </p>
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontWeight: 600, fontSize: "0.9rem", margin: "0 0 6px" }}>Data Platform Migration</p>
          <p style={{ fontSize: "0.8rem", opacity: 0.5, margin: 0, lineHeight: 1.5 }}>
            Moving analytical systems from on-prem to cloud — modernizing data pipelines, 
            warehouses, and orchestration at scale.
          </p>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--cyan)", fontWeight: 500, margin: 0 }}>
          View full timeline →
        </p>
      </Link>

      {/* ── Blog Preview ── */}
      <Link href="/blog" className="bento-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--green)", margin: "0 0 8px", fontWeight: 600 }}>
          Latest Writing
        </p>
        <p style={{ fontWeight: 600, fontSize: "0.9rem", margin: "0 0 6px", lineHeight: 1.4 }}>
          Thoughts on engineering, cloud, and developer tooling.
        </p>
        <p style={{ fontSize: "0.8rem", opacity: 0.5, margin: 0 }}>
          Read occasional deep-dives and learnings from production.
        </p>
        <p style={{ fontSize: "0.8rem", color: "var(--cyan)", marginTop: 12, fontWeight: 500 }}>
          Browse posts →
        </p>
      </Link>

      {/* ── References Card ── */}
      <Link href="/references" className="bento-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--orange)", margin: "0 0 8px", fontWeight: 600 }}>
          References
        </p>
        <blockquote style={{ margin: 0, fontSize: "0.9rem", opacity: 0.6, fontStyle: "italic", lineHeight: 1.5, borderLeft: "2px solid var(--orange)", paddingLeft: 14 }}>
          &ldquo;What people I&apos;ve worked with have to say.&rdquo;
        </blockquote>
        <p style={{ fontSize: "0.8rem", color: "var(--cyan)", marginTop: 12, fontWeight: 500 }}>
          See all →
        </p>
      </Link>

      {/* ── Schedule Call CTA ── */}
      <div className="bento-card" style={{
        background: "linear-gradient(135deg, rgba(139,233,253,0.06), rgba(189,147,249,0.06))",
        borderColor: "rgba(139,233,253,0.2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gridColumn: "1 / -1",
      }}>
        <p style={{ fontSize: "1.1rem", fontWeight: 600, margin: "0 0 4px" }}>
          Let&apos;s build something great
        </p>
        <p style={{ fontSize: "0.85rem", opacity: 0.55, margin: "0 0 16px" }}>
          Open to interesting opportunities and collaborations.
        </p>
        <Link
          href="/schedule-call"
          className="pill-link"
          style={{
            background: "var(--cyan)",
            color: "var(--bg)",
            border: "none",
            fontWeight: 600,
            padding: "12px 28px",
            fontSize: "0.9rem",
          }}
        >
          Schedule a Call ↗
        </Link>
      </div>

      {/* ── Server Meta (subtle) ── */}
      <p style={{ fontSize: "0.7rem", opacity: 0.25, textAlign: "center", gridColumn: "1 / -1", margin: 0 }}>
        {now} · {host} · Running on Cloud Run · {siteDomain}
      </p>
    </div>
  );
}
