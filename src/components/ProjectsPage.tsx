import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";
import { projects } from "../data/projects";
import { useLenis } from "../hooks/useLenis";
import ProjectGrid from "./ProjectGrid";
import Nav from "./Nav";
import FloatingControls from "./FloatingControls";
import { Footer } from "./Sections";

export default function ProjectsPage() {
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useLenis();

  useEffect(() => {
    const stored =
      (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <>
      <Nav lang={lang} onLangChange={setLang} useHomeAnchors={false} />
      <FloatingControls
        lang={lang}
        onLangChange={setLang}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <main style={{ minHeight: "100vh" }}>
        <section
          className="projects-page-section section-shell"
          style={{
            borderTop: "3px solid var(--border)",
          }}
        >
          <div
            className="projects-page-container section-content"
            style={{
              paddingTop: 120,
              paddingBottom: 100,
            }}
          >
            {/* Header */}
            <motion.div
              className="projects-page-header"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                marginBottom: 80,
              }}
            >
              <div className="section-label">
                {translations[lang].projects.label}
              </div>
              <h1 className="section-title" style={{ marginBottom: 24 }}>
                {translations[lang].projects.title1}
                <br />
                <span style={{ color: "var(--accent)" }}>
                  {translations[lang].projects.title2}
                </span>
              </h1>
              <p
                className="projects-page-intro"
                style={{
                  fontSize: 18,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  maxWidth: "700px",
                }}
              >
                {lang === "es"
                  ? "Explora todos nuestros proyectos completados, desde aplicaciones móviles hasta plataformas SaaS, sistemas de gestión y landing pages de alto rendimiento."
                  : "Explore all our completed projects, from mobile applications to SaaS platforms, management systems and high-performance landing pages."}
              </p>
            </motion.div>

            {/* Back button */}
            <div
              className="projects-page-back-wrap"
              style={{ marginBottom: 60 }}
            >
              <a
                className="projects-page-back"
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  textDecoration: "none",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span>←</span>{" "}
                {lang === "es" ? "Volver al inicio" : "Back to home"}
              </a>
            </div>

            {/* Grid with all projects */}
            <ProjectGrid projects={projects} lang={lang} />
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
