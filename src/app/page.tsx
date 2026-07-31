import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heads = await headers();
  const host = heads.get("host") ?? "unknown";
  const userAgent = heads.get("user-agent") ?? "none";
  const now = new Date().toISOString();

  return (
    <main style={mainStyle}>
      <h1 style={{ fontSize: "3rem", marginBottom: "0.2em" }}>
        Hello, World 👋
      </h1>
      <p style={{ fontSize: "1.3rem", opacity: 0.75 }}>
        I&apos;m <strong>Vamsi Thokala</strong>. Welcome to my corner of the
        internet.
      </p>

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

      <p style={{ marginTop: "2.5rem", fontSize: "0.85rem", opacity: 0.5 }}>
        Running on Cloud Run · vamsithokala.in
      </p>
    </main>
  );
}

const mainStyle: React.CSSProperties = {
  textAlign: "center",
  maxWidth: 640,
  padding: "2rem",
};

const metaCard: React.CSSProperties = {
  marginTop: "2rem",
  padding: "1.2rem 1.8rem",
  borderRadius: 12,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  display: "inline-block",
  textAlign: "left",
  fontSize: "0.85rem",
};

const metaLine: React.CSSProperties = {
  margin: "0.4em 0",
};

const metaLabel: React.CSSProperties = {
  fontWeight: 600,
  color: "#8be9fd",
  marginRight: "0.5em",
};
