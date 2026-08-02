export const dynamic = "force-dynamic";

export default function ScheduleCall() {
  return (
    <main style={pageStyle}>
      <h1 style={headingStyle}>Schedule a Call</h1>

      <div style={cardStyle}>
        <p style={{ margin: "0 0 1em", opacity: 0.75 }}>
          Pick a time that works for you.
        </p>

        <div style={calWrapper}>
          <a
            href="https://cal.com/vamsithokala/30min"
            target="_blank"
            rel="noopener"
            style={calLink}
          >
            📅 30 Minute Call
          </a>
          <a
            href="https://cal.com/vamsithokala/15min"
            target="_blank"
            rel="noopener"
            style={calLink}
          >
            ⚡ 15 Minute Call
          </a>
        </div>

        <p style={fallbackStyle}>
          If the links above don&apos;t work, email me at{" "}
          <a href="mailto:thevamsithokala@gmail.com" style={emailLink}>
            thevamsithokala@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: 640,
  padding: "2rem",
  width: "100%",
};

const headingStyle: React.CSSProperties = {
  fontSize: "2.2rem",
  marginBottom: "0.5em",
  color: "#8be9fd",
};

const cardStyle: React.CSSProperties = {
  padding: "1.5rem",
  borderRadius: 12,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const calWrapper: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  marginBottom: "1.5rem",
};

const calLink: React.CSSProperties = {
  display: "block",
  padding: "0.75rem 1.2rem",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#f0f0f0",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "1rem",
  transition: "background 0.15s",
};

const fallbackStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  opacity: 0.55,
  margin: 0,
};

const emailLink: React.CSSProperties = {
  color: "#8be9fd",
  textDecoration: "none",
};
