export const dynamic = "force-dynamic";

const experiences = [
  {
    period: "2025 — Present",
    title: "Senior Data Engineer",
    company: "Rewards Network",
    industry: "Financial Services",
    points: [
      "Leading the Domo platform migration from SQL Server to Redshift using federated data integration.",
      "Building RAG pipelines end to end — document chunking, hybrid search, and context engineering over vector stores.",
      "Handling the evaluation and deployment side too, so models and retrieval quality stay reliable in production.",
    ],
    stack: ["Redshift", "Python", "LangChain", "LlamaIndex", "Pinecone", "Docker", "Kubernetes", "MLOps"],
    color: "var(--cyan)",
  },
  {
    period: "2024 — 2025",
    title: "Senior Data Engineer",
    company: "First Fidelity Bank",
    industry: "Banking",
    points: [
      "Built Spark ETL pipelines handling around 2TB of daily event data and cut downstream query latency by 60%.",
      "Moved 40+ Airflow DAGs from on-prem to AWS managed Airflow, which took a large chunk out of infra spend.",
      "Designed the Snowflake data model that replaced three legacy systems for 200+ internal analysts.",
    ],
    stack: ["Spark", "Databricks", "Airflow", "Snowflake", "Kafka", "dbt", "AWS"],
    color: "var(--purple)",
  },
  {
    period: "2023",
    title: "Software Engineer (Intern)",
    company: "Chesapeake Energy",
    industry: "Energy",
    points: [
      "Worked with the engineering team on internal data and application tooling.",
      "Shipped features end to end alongside full-time engineers during the co-op.",
    ],
    stack: ["Python", "SQL", "Azure"],
    color: "var(--magenta)",
  },
  {
    period: "2022 — 2023",
    title: "Research Assistant — Sys Engineer",
    company: "University of Oklahoma",
    industry: "Higher Education",
    points: [
      "Designed Snowflake warehouse architecture with clustering, micro-partitioning, and cost governance in mind.",
      "Built ELT pipelines with Streams, Tasks, Snowpipe and dbt, plus automated reconciliation and anomaly checks.",
      "Set up CI/CD and database change management so schema changes shipped safely.",
    ],
    stack: ["Snowflake", "dbt", "Snowpark", "Talend", "Terraform", "GitHub Actions"],
    color: "var(--cyan)",
  },
  {
    period: "2018 — 2022",
    title: "Big Data Engineer",
    company: "4 Systems Info Solutions",
    industry: "IT Services",
    points: [
      "Built and maintained ETL/ELT pipelines across Informatica and Talend for enterprise clients.",
      "Worked on master data management, metadata lineage, and data quality governance.",
      "Supported cloud migrations of legacy on-prem warehouses.",
    ],
    stack: ["Informatica", "Talend", "Hadoop", "Hive", "SQL"],
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
              {exp.industry ? ` · ${exp.industry}` : ""}
            </p>

            <ul style={listStyle}>
              {exp.points.map((point, j) => (
                <li key={j} style={{ fontSize: "0.85rem", opacity: 0.6, lineHeight: 1.6, marginBottom: 6 }}>
                  {point}
                </li>
              ))}
            </ul>

            {exp.stack?.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                {exp.stack.map((tech) => (
                  <span key={tech} style={tagStyle(exp.color)}>
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}
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

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: 18,
};

const tagStyle = (color: string): React.CSSProperties => ({
  fontSize: "0.7rem",
  padding: "3px 8px",
  borderRadius: 999,
  border: `1px solid ${color}`,
  color,
  opacity: 0.75,
  whiteSpace: "nowrap",
});