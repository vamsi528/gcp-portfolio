export const dynamic = "force-dynamic";

const experiences = [
  {
    period: "2024 — Present",
    title: "Senior Software Engineer",
    company: "Current Company",
    description: "Leading cloud-native platform initiatives, building internal developer tools, and architecting scalable infrastructure on GCP.",
    color: "var(--cyan)",
  },
  {
    period: "2022 — 2024",
    title: "Software Engineer",
    company: "Previous Company",
    description: "Built microservices backend handling millions of requests, implemented CI/CD pipelines, and mentored junior engineers.",
    color: "var(--purple)",
  },
  {
    period: "2021 — 2022",
    title: "Junior Developer",
    company: "Earlier Company",
    description: "Full-stack development with React and Node.js, contributed to open-source projects, and shipped features end-to-end.",
    color: "var(--magenta)",
  },
];

export default function Experience() {
  return (
    <main style={pageStyle}>
      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--magenta)", fontWeight: 600 }}>
        Experience
      </span>
      <h1 style={headingStyle}>
        Where I&apos;ve{" "}
        <span className="gradient-text">shipped</span>
      </h1>

      <div style={{ position: "relative", paddingLeft: 32 }}>
        <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "linear-gradient(180deg, var(--cyan), var(--purple), var(--magenta))", borderRadius: 1 }} />

        {experiences.map((exp, i) => (
          <div key={i} className="bento-card" style={{ marginBottom: 16, position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: -38, top: 28, width: 12, height: 12, borderRadius: "50%", background: exp.color, border: "3px solid var(--bg)" }} />
            <p style={{ fontSize: "0.75rem", color: exp.color, fontWeight: 600, margin: "0 0 4px", letterSpacing: "0.05em" }}>
              {exp.period}
            </p>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 2px" }}>
              {exp.title}
            </h3>
            <p style={{ fontSize: "0.8rem", opacity: 0.45, margin: "0 0 10px" }}>
              {exp.company}
            </p>
            <p style={{ fontSize: "0.85rem", opacity: 0.6, lineHeight: 1.6, margin: 0 }}>
              {exp.description}
            </p>
          </div>
        ))}
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
  margin: "8px 0 28px",
  lineHeight: 1.2,
};
