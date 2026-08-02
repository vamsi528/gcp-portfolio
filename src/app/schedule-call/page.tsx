export const dynamic = "force-dynamic";

export default function ScheduleCall() {
  return (
    <main style={pageStyle}>
      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--cyan)", fontWeight: 600 }}>
        Let&apos;s Connect
      </span>
      <h1 style={headingStyle}>
        Schedule a{" "}
        <span className="gradient-text">Call</span>
      </h1>

      <div style={{ display: "grid", gap: 16 }}>
        <div className="bento-card" style={{ borderColor: "rgba(139,233,253,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(139,233,253,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
              📅
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 2px" }}>30 Minute Call</h3>
              <p style={{ fontSize: "0.8rem", opacity: 0.5, margin: 0 }}>Deep dive into your project or idea</p>
            </div>
          </div>
          <a href="https://cal.com/vamsithokala/30min" target="_blank" rel="noopener" className="pill-link" style={{ background: "var(--cyan)", color: "var(--bg)", border: "none", fontWeight: 600 }}>
            Book 30 Min ↗
          </a>
        </div>

        <div className="bento-card" style={{ borderColor: "rgba(189,147,249,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(189,147,249,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
              ⚡
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 2px" }}>15 Minute Call</h3>
              <p style={{ fontSize: "0.8rem", opacity: 0.5, margin: 0 }}>Quick chat to see if we&apos;re a fit</p>
            </div>
          </div>
          <a href="https://cal.com/vamsithokala/15min" target="_blank" rel="noopener" className="pill-link" style={{ background: "var(--purple)", color: "var(--bg)", border: "none", fontWeight: 600 }}>
            Book 15 Min ↗
          </a>
        </div>

        <div className="bento-card" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
              ✉️
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "0.85rem", opacity: 0.5, margin: "0 0 4px" }}>Prefer email?</p>
              <a href="mailto:thevamsithokala@gmail.com" style={{ color: "var(--cyan)", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}>
                thevamsithokala@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: 560,
  margin: "0 auto",
  padding: "32px 16px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 800,
  margin: "8px 0 24px",
  lineHeight: 1.2,
};
