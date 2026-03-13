import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../data/projects";
import { projects } from "../data/projects";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";
import ProjectGrid from "./ProjectGrid";

export default function Projects({ lang }: { lang: Lang }) {
  const t = translations[lang].projects;

  return (
    <section
      id="projects"
      className="section-shell"
      style={{ borderTop: "3px solid var(--border)" }}
    >
      <div className="section-content">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 60,
            flexWrap: "wrap",
            gap: 20,
          }}
          className="reveal"
        >
          <div>
            <div className="section-label">{t.label}</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              {t.title1}
              <br />
              <span style={{ color: "var(--accent)" }}>{t.title2}</span>
            </h2>
          </div>
          <a href="/proyectos" className="btn-secondary">
            {t.allProjects}
          </a>
        </div>

        {/* Grid - only first 4 projects */}
        <ProjectGrid projects={projects.slice(0, 4)} lang={lang} />
      </div>
    </section>
  );
}
