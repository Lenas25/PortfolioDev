import { useState } from "react";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";
import { projects } from "../data/projects";
import { useLenis } from "../hooks/useLenis";
import ProjectGrid from "./ProjectGrid";
import Nav from "./Nav";
import { Footer } from "./Sections";

export default function ProjectsPage() {
  const [lang, setLang] = useState<Lang>("es");
  useLenis();

  return (
    <>
      <Nav lang={lang} onLangChange={setLang} />
      <main style={{ minHeight: "100vh" }}>
        <section
          className="projects-page-section"
          style={{
            borderTop: "3px solid var(--border)",
            padding: "120px 40px 100px",
          }}
        >
          <div
            className="projects-page-container"
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            {/* Header */}
            <div
              className="reveal projects-page-header"
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
            </div>

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
