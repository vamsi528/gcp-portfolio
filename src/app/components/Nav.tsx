import Link from "next/link";

export default function Nav() {
  return (
    <nav style={navStyle}>
      <Link href="/" style={logoStyle}>
        VT
      </Link>
      <div style={linksStyle}>
        <Link href="/about" style={linkStyle}>
          About
        </Link>
        <Link href="/blog" style={linkStyle}>
          Blog
        </Link>
        <Link href="/experience" style={linkStyle}>
          Experience
        </Link>
        <Link href="/references" style={linkStyle}>
          References
        </Link>
      </div>
    </nav>
  );
}

const navStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  maxWidth: 800,
  margin: "0 auto",
  width: "100%",
  boxSizing: "border-box",
};

const logoStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "1.2rem",
  color: "#8be9fd",
  textDecoration: "none",
  letterSpacing: "0.05em",
};

const linksStyle: React.CSSProperties = {
  display: "flex",
  gap: "1.5rem",
};

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.7)",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  transition: "color 0.15s",
};
