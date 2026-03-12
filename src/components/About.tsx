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

  return (
    <section
      id="about"
      style={{
        borderTop: "3px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "start",
        padding: "100px 40px",
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
        {[t.p1, t.p2, t.p3].map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--text-muted)",
              marginBottom: 18,
            }}
            dangerouslySetInnerHTML={{
              __html: p
                .replace(/AI/g, '<strong style="color:var(--text)">AI</strong>')
                .replace(
                  /LangChain/g,
                  '<strong style="color:var(--text)">LangChain</strong>',
                )
                .replace(
                  /SaaS/g,
                  '<strong style="color:var(--text)">SaaS</strong>',
                ),
            }}
          />
        ))}
        <div
          style={{
            border: "3px solid var(--border)",
            boxShadow: "5px 5px 0 var(--accent)",
            padding: "24px 28px",
            marginTop: 32,
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
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="about-stat"
            style={{
              background: "var(--card-bg)",
              border: "3px solid var(--border)",
              boxShadow: "5px 5px 0 var(--border)",
              padding: "22px 26px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 48,
                lineHeight: 1,
                color: "var(--accent)",
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
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginTop: 4,
          }}
        >
          {values.map((v, i) => (
            <div
              key={i}
              style={{
                border: "3px solid var(--border)",
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
                  background: "var(--accent)",
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
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
