import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllPosts } from "../../../lib/blog";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <main style={pageStyle}>
      <Link href="/blog" style={backLink}>
        ← Back to blog
      </Link>

      <span style={sectionLabel}>Blog Post</span>
      <h1 style={headingStyle}>{post.title}</h1>

      <div style={metaRow}>
        <span style={{ opacity: 0.45, fontSize: "0.85rem" }}>{post.date}</span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <span key={tag} className="tag" style={{ fontSize: "0.65rem" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bento-card" style={{ padding: "28px 32px" }}>
        <div className="prose">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "32px 16px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 800,
  margin: "8px 0 16px",
  lineHeight: 1.2,
};

const sectionLabel: React.CSSProperties = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "var(--green)",
  fontWeight: 600,
  display: "block",
  marginTop: 12,
};

const metaRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 12,
  marginBottom: 20,
};

const backLink: React.CSSProperties = {
  color: "var(--cyan)",
  textDecoration: "none",
  fontSize: "0.85rem",
  fontWeight: 500,
};
