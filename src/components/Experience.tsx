import { motion } from "framer-motion";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

export default function Experience({ lang }: { lang: Lang }) {
  const t = translations[lang].experience;

  const experiences =
    lang === "en"
      ? [
          {
            period: "2024 — Present",
            role: "AI Engineer & Consultant",
            company: "Freelance · Remote",
            desc: "Designing and building AI-powered web and mobile applications. Specializing in LLM integration, automation workflows, and full-stack delivery. Acting as AI architect, prompt engineer, and QA consultant for multiple clients.",
            tags: [
              "LangChain",
              "N8N",
              "Next.js",
              "FastAPI",
              "Flutter",
              "Docker",
            ],
          },
          {
            period: "2023 — 2024",
            role: "Full Stack Developer",
            company: "Mining & Engineering Sector",
            desc: "Led refactoring and major improvements of an internal mine-flow web application. Optimized performance, redesigned UI/UX, and integrated new reporting features to support operational decision-making.",
            tags: ["Angular", "NestJS", "Docker", "Azure", "TypeScript"],
          },
          {
            period: "Ongoing",
            role: "AI QA & Prompt Analyst",
            company: "AI Consulting · Multiple clients",
            desc: "Evaluating LLM outputs, validating prompt engineering strategies, and consulting on AI integration workflows. Analyzing model behavior and proposing iterative improvements for production AI systems.",
            tags: ["Prompt Eng.", "QA", "GPT-4", "Claude", "Gemini", "Llama"],
          },
          {
            period: "2022 — 2023",
            role: "Junior Developer",
            company: "Web Agency · Peru",
            desc: "Developed landing pages, e-commerce sites, and custom web applications. Collaborated with design and marketing teams to deliver client projects. First exposure to cloud deployments and CI/CD pipelines.",
            tags: ["React", "Node.js", "MySQL", "Figma", "CSS"],
          },
        ]
      : [
          {
            period: "2024 — Presente",
            role: "AI Engineer & Consultora",
            company: "Freelance · Remoto",
            desc: "Diseño y construcción de aplicaciones web y móviles potenciadas por IA. Especialización en integración de LLMs, flujos de automatización y entrega full-stack. Función como arquitecta de IA, ingeniería de prompts y consultora QA.",
            tags: [
              "LangChain",
              "N8N",
              "Next.js",
              "FastAPI",
              "Flutter",
              "Docker",
            ],
          },
          {
            period: "2023 — 2024",
            role: "Desarrolladora Full Stack",
            company: "Sector Minería e Ingeniería",
            desc: "Lideré la refactorización y mejoras mayores de una aplicación web interna de flujo de minas. Optimicé rendimiento, rediseñé UI/UX e integré nuevas funcionalidades de reportes para soporte en toma de decisiones operacionales.",
            tags: ["Angular", "NestJS", "Docker", "Azure", "TypeScript"],
          },
          {
            period: "En curso",
            role: "QA IA & Analista de Prompts",
            company: "Consultoría IA · Múltiples clientes",
            desc: "Evaluación de outputs de LLMs, validación de estrategias de ingeniería de prompts y consultoría sobre flujos de integración de IA. Análisis del comportamiento de modelos y propuesta de mejoras iterativas para sistemas IA en producción.",
            tags: ["Prompt Eng.", "QA", "GPT-4", "Claude", "Gemini", "Llama"],
          },
          {
            period: "2022 — 2023",
            role: "Desarrolladora Junior",
            company: "Agencia Web · Perú",
            desc: "Desarrollo de landing pages, e-commerce y aplicaciones web personalizadas. Colaboración con equipos de diseño y marketing. Primera exposición a despliegues en la nube y pipelines CI/CD.",
            tags: ["React", "Node.js", "MySQL", "Figma", "CSS"],
          },
        ];

  return (
    <section
      id="experience"
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
          {t.title1}
          <br />
          <span style={{ color: "var(--accent)" }}>{t.title2}</span>
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            className="exp-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.06, duration: 0.7 }}
            style={{
              background: "var(--card-bg)",
              border: "3px solid var(--border)",
              boxShadow: "5px 5px 0 var(--border)",
              padding: "28px 30px",
              position: "relative",
            }}
          >
            {/* Corner accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                borderLeft: "28px solid transparent",
                borderTop: `28px solid var(--accent)`,
              }}
            />
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 8,
              }}
            >
              {exp.period}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 20,
                marginBottom: 6,
                lineHeight: 1.2,
              }}
            >
              {exp.role}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {exp.company}
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              {exp.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    border: "2px solid var(--border)",
                    color: "var(--text-muted)",
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
