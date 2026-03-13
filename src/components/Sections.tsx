import { motion } from "framer-motion";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";
import { WHATSAPP_NUMBER } from "../data/constants";

// ===== CONTACT =====
export function Contact({ lang }: { lang: Lang }) {
  const t = translations[lang].contact;
  const whatsappMsg = encodeURIComponent(
    lang === "en"
      ? "Hi Lena! I saw your portfolio and I'd love to talk about a project!"
      : "Hola Lena! Vi tu portfolio y me gustaria hablar sobre un proyecto!",
  );

  return (
    <section
      id="contact"
      className="section-shell"
      style={{
        borderTop: "3px solid var(--border)",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* BG text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "min(240px,28vw)",
          color: "var(--accent)",
          opacity: 0.03,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 0,
          userSelect: "none",
        }}
      >
        BUILD
      </div>

      <div
        className="section-content"
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="section-label"
          style={{ justifyContent: "center" }}
        >
          {t.label}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(44px,8vw,110px)",
            lineHeight: 0.9,
            marginBottom: 24,
          }}
        >
          {t.title1}
          <br />
          <span style={{ color: "var(--accent)" }}>{t.title2}</span>
          <br />
          {t.title3}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: 18,
            color: "var(--text-muted)",
            maxWidth: 500,
            margin: "0 auto 48px",
            lineHeight: 1.65,
          }}
        >
          {t.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <a href="mailto:lenaspdev@gmail.com" className="btn-primary">
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {t.email}
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener"
            className="retro-press retro-press-border"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "14px 28px",
              background: "#25D366",
              color: "#fff",
              border: "3px solid var(--border)",
              boxShadow: "5px 5px 0 var(--border)",
              cursor: "none",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.whatsapp}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {[
            {
              href: "https://github.com/Lenas25",
              label: t.github,
              icon: (
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              ),
            },
            {
              href: "https://www.linkedin.com/in/elena-suarez-paredes/",
              label: t.linkedin,
              icon: (
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              ),
            },
            {
              href: "https://tiktok.com/@lenasdv",
              label: "TikTok",
              icon: (
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              ),
            },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener"
              className="retro-press retro-press-border retro-press-tight"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text)",
                textDecoration: "none",
                border: "2px solid var(--border)",
                background: "var(--card-bg)",
                boxShadow: "4px 4px 0 var(--border)",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "none",
              }}
            >
              {s.icon} {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
export function Footer({ lang }: { lang: Lang }) {
  const t = translations[lang].footer;
  return (
    <footer
      style={{
        borderTop: "3px solid var(--border)",
        padding: "22px 0",
        fontSize: 13,
        fontWeight: 600,
        color: "var(--text-muted)",
      }}
    >
      <div
        style={{
          width:
            "min(var(--content-max), calc(100% - (var(--page-gutter) * 2)))",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>{t.copy}</div>
        <div>{t.stack}</div>
        <div style={{ display: "flex", gap: 16 }}>
          <a
            href="#"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Privacy
          </a>
          <a
            href="#hero"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            {t.back}
          </a>
        </div>
      </div>
    </footer>
  );
}
