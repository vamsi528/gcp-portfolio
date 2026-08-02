import type { Metadata } from "next";
import Nav from "./components/Nav";
import Background from "./components/Background";
import "./globals.css";

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
      <body>
        <Background />
        <Nav />
        {children}
      </body>
    </html>
  );
}
