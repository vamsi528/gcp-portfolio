export const dynamic = "force-dynamic";

export default function Blog() {
  return (
    <main style={pageStyle}>
      <h1 style={headingStyle}>Blog</h1>
      <div style={cardStyle}>
        <p style={placeholderStyle}>Blog posts coming soon.</p>
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

const placeholderStyle: React.CSSProperties = {
  opacity: 0.6,
  fontStyle: "italic",
};
