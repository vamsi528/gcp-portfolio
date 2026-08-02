import Link from "next/link";

export default function Nav() {
  return (
    <nav style={navStyle}>
      <Link href="/" style={logoStyle}>
        <span style={logoDot}>◆</span> VT
      </Link>
      <div style={linksStyle}>
        <Link href="/about" style={linkStyle}>
          About
        </Link>
        <Link href="/experience" style={linkStyle}>
          Experience
        </Link>
        <Link href="/blog" style={linkStyle}>
          Blog
        </Link>
        <Link href="/references" style={linkStyle}>
          References
        </Link>
        <Link href="/schedule-call" style={ctaNavStyle}>
          Let&apos;s Talk
        </Link>
      </div>
    </nav>
  );
}

const navStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
  margin: "16px auto 0",
  maxWidth: 920,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  position: "sticky",
  top: 12,
  zIndex: 100,
};

const logoStyle: React.CSSProperties = {
  fontWeight: 800,
  fontSize: "1.1rem",
  color: "var(--text)",
  textDecoration: "none",
  letterSpacing: "0.03em",
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const logoDot: React.CSSProperties = {
  color: "var(--cyan)",
  fontSize: "0.65rem",
};

const linksStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.25rem",
  alignItems: "center",
};

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.6)",
  textDecoration: "none",
  fontSize: "0.85rem",
  fontWeight: 500,
  padding: "6px 12px",
  borderRadius: 8,
  transition: "background 0.2s, color 0.2s",
};

const ctaNavStyle: React.CSSProperties = {
  color: "var(--bg)",
  background: "var(--cyan)",
  textDecoration: "none",
  fontSize: "0.85rem",
  fontWeight: 600,
  padding: "6px 16px",
  borderRadius: 8,
  marginLeft: 8,
};
