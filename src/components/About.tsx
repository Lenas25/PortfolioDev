import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";
import { useCountUp, formatCountUp } from "../hooks/useCountUp";

// Iconos SVG minimalistas para cada stat
const StatIcons = {
  rocket: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  briefcase: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  sparkles: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
};

// Componente de stat minimalista con count-up
function MinimalStat({
  icon,
  value,
  suffix,
  label,
  accent,
  delay,
  inView,
}: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  accent: string;
  delay: number;
  inView: boolean;
}) {
  const { count } = useCountUp({
    end: value,
    duration: 2000,
    delay: delay,
    enabled: inView,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: `color-mix(in srgb, ${accent} 20%, transparent)`,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(32px, 5vw, 42px)",
          lineHeight: 1,
          color: accent,
        }}
      >
        {formatCountUp(count, suffix, 0)}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// Componente de progress bar animada
function AnimatedProgress({
  value,
  color,
  delay,
  inView,
}: {
  value: number;
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      style={{
        height: 4,
        background: "color-mix(in srgb, var(--border) 20%, transparent)",
        borderRadius: 2,
        overflow: "hidden",
        marginTop: 8,
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
        style={{
          height: "100%",
          background: color,
          borderRadius: 2,
        }}
      />
    </motion.div>
  );
}

export default function About({ lang }: { lang: Lang }) {
  const t = translations[lang].about;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Stats con valores numéricos para count-up
  const stats = [
    {
      icon: StatIcons.rocket,
      value: 10,
      suffix: "+",
      label: t.stat1Label,
      sub: t.stat1Sub,
      accent: "var(--accent3)",
      progress: 85,
    },
    {
      icon: StatIcons.briefcase,
      value: 5,
      suffix: "+",
      label: t.stat2Label,
      sub: t.stat2Sub,
      accent: "var(--accent2)",
      progress: 70,
    },
    {
      icon: StatIcons.sparkles,
      value: 100,
      suffix: "%",
      label: lang === "en" ? "AI Focused" : "Enfoque IA",
      sub: t.stat3Sub,
      accent: "var(--accent)",
      progress: 100,
    },
  ];

  // Values reducidos a 4 principales
  const values = [
    { icon: "🧠", text: t.val1, accent: "var(--accent)" },
    { icon: "🚀", text: t.val4, accent: "var(--accent2)" },
    { icon: "📐", text: t.val5, accent: "var(--accent3)" },
    { icon: "🤝", text: t.val6, accent: "var(--accent)" },
  ];

  return (
    <section
      id="about"
      className="section-shell"
      ref={sectionRef}
      style={{
        borderTop: "3px solid var(--border)",
      }}
    >
      <div
        className="section-content"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "start",
        }}
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">{t.label}</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            {t.title1}
            <br />
            {t.title2}
            <br />
            <span style={{ color: "var(--accent)" }}>{t.title3}</span>
          </h2>
          <div
            style={{
              border: "3px solid var(--border)",
              boxShadow: "6px 6px 0 var(--accent3)",
              background: "var(--about-panel-bg)",
              padding: "26px 28px 22px",
              marginBottom: 26,
            }}
          >
            {[t.p1, t.p2, t.p3].map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "var(--about-body-text)",
                  marginBottom: i === 2 ? 0 : 18,
                }}
                dangerouslySetInnerHTML={{
                  __html: p
                    .replace(
                      /AI/g,
                      '<strong style="color:var(--accent2)">AI</strong>',
                    )
                    .replace(
                      /LangChain/g,
                      '<strong style="color:var(--accent3)">LangChain</strong>',
                    )
                    .replace(
                      /SaaS/g,
                      '<strong style="color:var(--accent)">SaaS</strong>',
                    ),
                }}
              />
            ))}
          </div>
          <div
            style={{
              border: "3px solid var(--border)",
              boxShadow: "5px 5px 0 var(--accent)",
              background: "var(--about-quote-bg)",
              padding: "24px 28px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -24,
                left: 16,
                fontFamily: "var(--font-display)",
                fontSize: 72,
                color: "var(--accent)",
                lineHeight: 1,
                opacity: 0.8,
              }}
            >
              "
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 17,
                lineHeight: 1.55,
                paddingTop: 24,
              }}
            >
              {t.quote.replace(/"/g, "")}
            </p>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          {/* Stats minimalistas en fila horizontal */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              padding: "24px 0",
              borderBottom: "2px solid var(--border)",
            }}
          >
            {stats.map((stat, i) => (
              <MinimalStat
                key={i}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                accent={stat.accent}
                delay={i * 150}
                inView={isInView}
              />
            ))}
          </div>

          {/* Progress bars con descripción */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {stat.sub}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: stat.accent,
                    }}
                  >
                    {stat.progress}%
                  </span>
                </div>
                <AnimatedProgress
                  value={stat.progress}
                  color={stat.accent}
                  delay={i * 100 + 300}
                  inView={isInView}
                />
              </motion.div>
            ))}
          </div>

          {/* Values reducidos a chips horizontales */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 8,
            }}
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  background: `color-mix(in srgb, ${v.accent} 12%, transparent)`,
                  border: `2px solid color-mix(in srgb, ${v.accent} 30%, var(--border))`,
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text)",
                  cursor: "default",
                }}
              >
                <span style={{ fontSize: 16 }}>{v.icon}</span>
                {v.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
