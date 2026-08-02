import type { Metadata } from "next";
import Nav from "./components/Nav";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Vamsi Thokala";

export const metadata: Metadata = {
  title: `${siteName} — Portfolio`,
  description:
    "Full-stack developer portfolio. Building thoughtful software for the web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={bodyStyle}>
        <Nav />
        <div style={contentStyle}>{children}</div>
      </body>
    </html>
  );
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  fontFamily:
    'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  background: "#0f0f0f",
  color: "#f0f0f0",
  minHeight: "100vh",
};

const contentStyle: React.CSSProperties = {
  maxWidth: 800,
  margin: "0 auto",
  padding: "2rem 1rem",
};
