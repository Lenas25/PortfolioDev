import { motion } from "framer-motion";
import { TOOLS_LIST } from "../data/constants";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

export default function Skills({ lang }: { lang: Lang }) {
  const t = translations[lang].skills;
  const featuredTools = TOOLS_LIST.slice(0, 12);

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

  const trackPalette = [
    "var(--accent)",
    "var(--accent2)",
    "var(--accent3)",
    "var(--accent)",
    "var(--accent2)",
    "var(--accent3)",
  ] as const;

  return (
    <section
      id="skills"
      className="section-shell"
      style={{
        borderTop: "3px solid var(--border)",
      }}
    >
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">{t.label}</div>
          <h2 className="section-title">
            {t.title1}{" "}
            <span style={{ color: "var(--accent)" }}>{t.title2}</span>
            <br />
            {t.title3}
          </h2>
        </motion.div>

        <motion.div
          className="skills-featured-stage"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <span className="skills-sticker skills-sticker-left">STACK</span>
          <span className="skills-sticker skills-sticker-right">FAVS</span>

          <div className="skills-featured-rack">
            {featuredTools.map((tool, i) => {
              const isSpotlight = i % 4 === 0;

              return (
                <motion.span
                  key={tool}
                  className={`skills-fav-pill ${isSpotlight ? "skills-fav-pill-spotlight" : ""}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ x: -3, y: -3, rotate: 0 }}
                  whileTap={{ x: 2, y: 2 }}
                  transition={{ duration: 0.12, delay: i * 0.03 }}
                  style={{ transform: `rotate(${((i % 5) - 2) * 0.9}deg)` }}
                >
                  {tool}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(275px,1fr))",
            gap: 20,
          }}
        >
          {categories.map((cat, i) => {
            const trackAccent = trackPalette[i];
            const titleVariant = i % 3;
            const isLongTitle = cat.title.replace(/\s|\//g, "").length > 10;

            return (
              <motion.div
                key={i}
                className={`skill-category skills-track-${i + 1}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  x: -3,
                  y: -3,
                  boxShadow: `8px 8px 0 ${trackAccent}`,
                  transition: { duration: 0.12 },
                }}
                whileTap={{
                  x: 2,
                  y: 2,
                  boxShadow: `2px 2px 0 ${trackAccent}`,
                  transition: { duration: 0.08 },
                }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  opacity: { duration: 0.7, delay: i * 0.05 },
                  y: { duration: 0.7, delay: i * 0.05 },
                  x: { duration: 0.12 },
                  boxShadow: { duration: 0.12 },
                }}
                style={{
                  background: `color-mix(in srgb, ${trackAccent} var(--skills-card-tint), var(--card-bg))`,
                  border: "3px solid var(--border)",
                  boxShadow: `5px 5px 0 ${trackAccent}`,
                  padding: 28,
                }}
              >
                <div className="skills-category-head">
                  <span
                    className="skills-track-chip"
                    style={{
                      background: trackAccent,
                      color:
                        trackAccent === "var(--accent2)" ||
                        trackAccent === "var(--accent3)"
                          ? "#08100f"
                          : "var(--white)",
                    }}
                  >
                    TRACK 0{i + 1}
                  </span>
                  <div style={{ fontSize: 28 }}>{cat.icon}</div>
                </div>
                <div
                  className={`skills-category-title skills-category-title-${titleVariant} ${isLongTitle ? "skills-category-title-long" : ""}`}
                >
                  {cat.title}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={`${tag}-${tagIndex}`}
                      className="skill-tag"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.28,
                        delay:
                          i * 0.04 +
                          Math.floor(tagIndex / 3) * 0.06 +
                          (tagIndex % 3) * 0.02,
                      }}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        fontSize: 12,
                        padding: "5px 11px",
                        border: "2px solid var(--border)",
                        background: `color-mix(in srgb, ${trackAccent} var(--skills-tag-tint), transparent)`,
                        color: "var(--text)",
                        transition:
                          "background 0.1s, color 0.1s, border-color 0.1s",
                        cursor: "default",
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
