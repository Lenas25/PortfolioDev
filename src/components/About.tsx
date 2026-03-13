import { motion } from "framer-motion";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

export default function About({ lang }: { lang: Lang }) {
  const t = translations[lang].about;

  const stats = [
    { num: t.stat1Num, label: t.stat1Label, sub: t.stat1Sub },
    { num: t.stat2Num, label: t.stat2Label, sub: t.stat2Sub },
    { num: t.stat3Num, label: t.stat3Label, sub: t.stat3Sub },
  ];

  const values = [
    { icon: "🧠", text: t.val1 },
    { icon: "🏗️", text: t.val2 },
    { icon: "🔍", text: t.val3 },
    { icon: "🚀", text: t.val4 },
    { icon: "📐", text: t.val5 },
    { icon: "🤝", text: t.val6 },
  ];

  const statThemes = [
    {
      bg: "color-mix(in srgb, var(--accent3) var(--about-stat-tint), var(--card-bg))",
      num: "var(--accent3)",
      shadow: "var(--accent3)",
    },
    {
      bg: "color-mix(in srgb, var(--accent2) var(--about-stat-tint), var(--card-bg))",
      num: "var(--accent2)",
      shadow: "var(--accent2)",
    },
    {
      bg: "color-mix(in srgb, var(--accent) var(--about-stat-tint), var(--card-bg))",
      num: "var(--accent)",
      shadow: "var(--accent)",
    },
  ];

  const valueAccents = [
    "var(--accent)",
    "var(--accent3)",
    "var(--accent2)",
    "var(--accent)",
    "var(--accent2)",
    "var(--accent3)",
  ];

  return (
    <section
      id="about"
      className="section-shell"
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
          transition={{
            duration: 0.7,
            hover: { duration: 0.12 },
            tap: { duration: 0.08 },
          }}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="about-stat"
              whileHover={{
                x: -3,
                y: -3,
                boxShadow: `9px 9px 0 ${statThemes[i].shadow}`,
              }}
              whileTap={{
                x: 2,
                y: 2,
                boxShadow: `2px 2px 0 ${statThemes[i].shadow}`,
              }}
              transition={{ duration: 0.12 }}
              style={{
                background: statThemes[i].bg,
                border: "3px solid var(--border)",
                boxShadow: `5px 5px 0 ${statThemes[i].shadow}`,
                padding: "22px 26px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: "var(--border)",
                  opacity: 0.5,
                }}
              >
                0{i + 1}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 48,
                  lineHeight: 1,
                  color: statThemes[i].num,
                  flexShrink: 0,
                }}
              >
                {s.num}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
                  {s.sub}
                </div>
              </div>
            </motion.div>
          ))}

          <div
            className="about-values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginTop: 4,
            }}
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ x: -2, y: -2 }}
                transition={{ duration: 0.12 }}
                style={{
                  border: "3px solid var(--border)",
                  boxShadow: `4px 4px 0 ${valueAccents[i]}`,
                  background: `color-mix(in srgb, ${valueAccents[i]} var(--about-value-tint), var(--card-bg))`,
                  padding: "14px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: valueAccents[i],
                    color:
                      valueAccents[i] === "var(--accent3)"
                        ? "#08100f"
                        : "var(--white)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {v.icon}
                </div>
                {v.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
