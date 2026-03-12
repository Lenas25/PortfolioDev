import { motion } from "framer-motion";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

export default function Skills({ lang }: { lang: Lang }) {
  const t = translations[lang].skills;

  const categories = [
    {
      icon: "🤖",
      title: t.cat1,
      tags: [
        "RAG Systems",
        "Pydantic AI",
        "OpenAI API",
        "Anthropic API",
        "Vector DBs",
        "Prompt Eng.",
        "Embeddings",
      ],
    },
    {
      icon: "⚡",
      title: t.cat2,
      tags: [
        "N8N",
        "Webhooks",
        "API Integrations",
        "Cron Jobs",
        "Event Pipelines",
        "Auto-triggers",
      ],
    },
    {
      icon: "🎨",
      title: t.cat3,
      tags: [
        "React",
        "Next.js",
        "Astro",
        "Angular",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Figma",
      ],
    },
    {
      icon: "🔧",
      title: t.cat4,
      tags: [
        "NestJS",
        "FastAPI",
        "Laravel",
        "Python",
        "Node.js",
        "REST APIs",
        "GraphQL",
        "PostgreSQL",
        "Prisma",
        "Redis",
      ],
    },
    {
      icon: "📱",
      title: t.cat5,
      tags: ["Flutter", "Dart", "Firebase", "iOS · Android", "TensorFlow Lite"],
    },
    {
      icon: "☁️",
      title: t.cat6,
      tags: [
        "Docker",
        "GCP",
        "Azure",
        "CI/CD",
        "Netlify",
        "Vercel",
        "Railway",
        "GitHub Actions",
      ],
    },
  ];

  return (
    <section
      id="skills"
      style={{
        borderTop: "3px solid var(--border)",
        background: "var(--bg2)",
        padding: "100px 40px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">{t.label}</div>
        <h2 className="section-title">
          {t.title1} <span style={{ color: "var(--accent)" }}>{t.title2}</span>
          <br />
          {t.title3}
        </h2>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(275px,1fr))",
          gap: 20,
        }}
      >
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className="skill-category"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.05, duration: 0.7 }}
            style={{
              background: "var(--card-bg)",
              border: "3px solid var(--border)",
              boxShadow:
                i % 2 === 0
                  ? "5px 5px 0 var(--accent)"
                  : "5px 5px 0 var(--border)",
              padding: 28,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{cat.icon}</div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 18,
                marginBottom: 16,
              }}
            >
              {cat.title}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="skill-tag"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "5px 11px",
                    border: "2px solid var(--border)",
                    background: "transparent",
                    color: "var(--text)",
                    transition:
                      "background 0.1s, color 0.1s, border-color 0.1s",
                    cursor: "default",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
