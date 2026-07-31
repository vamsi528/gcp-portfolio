import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vamsi Thokala — Portfolio",
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
      <body style={bodyStyle}>{children}</body>
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
