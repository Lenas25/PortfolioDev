import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../data/projects";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";
import {
  STATUS_COLORS,
  STATUS_LABELS,
  PROJECT_GRID_COLS,
} from "../data/constants";
import ProjectModal from "./ProjectModal";

interface ProjectGridProps {
  projects: Project[];
  lang: Lang;
}

export default function ProjectGrid({ projects, lang }: ProjectGridProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const handleClose = useCallback(() => setActiveProject(null), []);
  const t = translations[lang].projects;

  return (
    <>
      <div
        className="project-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 20,
        }}
      >
        {projects.map((proj, i) => (
          <motion.div
            key={proj.id}
            className="project-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              x: -3,
              y: -3,
              boxShadow: "8px 8px 0 var(--accent)",
              transition: { duration: 0.12 },
            }}
            whileTap={{
              x: 2,
              y: 2,
              boxShadow: "2px 2px 0 var(--accent)",
              transition: { duration: 0.08 },
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              opacity: { duration: 0.7, delay: i * 0.05 },
              y: { duration: 0.7, delay: i * 0.05 },
              x: { duration: 0.12 },
              boxShadow: { duration: 0.12 },
            }}
            onClick={() => setActiveProject(proj)}
            style={{
              gridColumn: `span ${PROJECT_GRID_COLS[i % PROJECT_GRID_COLS.length]}`,
              border: "3px solid var(--border)",
              background: "var(--card-bg)",
              boxShadow: "5px 5px 0 var(--accent)",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {/* Top area */}
            <div
              style={{
                background: "var(--bg3)",
                padding: "28px 28px 20px",
                borderBottom: "3px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                minHeight: 160,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ zIndex: 1 }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: STATUS_COLORS[proj.status],
                    border: `2px solid ${STATUS_COLORS[proj.status]}`,
                    padding: "3px 10px",
                    display: "inline-block",
                  }}
                >
                  {STATUS_LABELS[proj.status][lang]}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 60,
                  color: "var(--accent)",
                  opacity: 0.25,
                  lineHeight: 1,
                }}
              >
                {proj.num}
              </div>
              {/* SVG shape */}
              <svg
                style={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.12,
                  width: 110,
                  height: 110,
                  pointerEvents: "none",
                }}
                viewBox="0 0 120 120"
                fill="none"
              >
                <g dangerouslySetInnerHTML={{ __html: proj.svgShape }} />
              </svg>
            </div>

            {/* Body */}
            <div style={{ padding: "22px 26px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 20,
                  marginBottom: 10,
                  lineHeight: 1.2,
                }}
              >
                {proj.title[lang]}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                {proj.shortDesc[lang]}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 18,
                }}
              >
                {proj.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: 11,
                      padding: "3px 10px",
                      background: "var(--accent)",
                      color: "#fff",
                      borderRadius: 2,
                    }}
                  >
                    {s}
                  </span>
                ))}
                {proj.stack.length > 4 && (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: 11,
                      padding: "3px 10px",
                      border: "2px solid var(--border)",
                      color: "var(--text-muted)",
                      borderRadius: 2,
                    }}
                  >
                    +{proj.stack.length - 4}
                  </span>
                )}
              </div>
              <div className="project-link">
                {t.viewCase} <span>→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            key={activeProject.id}
            project={activeProject}
            lang={lang}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
