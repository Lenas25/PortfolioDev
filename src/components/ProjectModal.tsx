import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";
import { STATUS_COLORS, STATUS_LABELS } from "../data/constants";

interface Props {
  project: Project | null;
  lang: Lang;
  onClose: () => void;
}

export default function ProjectModal({ project, lang, onClose }: Props) {
  const useIsoLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  const t = translations[lang].projects;
  const accentCycle = [
    "var(--accent)",
    "var(--accent2)",
    "var(--accent3)",
    project?.color ?? "var(--accent)",
  ];
  const [isMobileSheet, setIsMobileSheet] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 900px)").matches,
  );
  const isExternalUrl = (value?: string) =>
    Boolean(value && /^(https?:)\/\//i.test(value));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobileSheet(e.matches);

    setIsMobileSheet(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  // Apply scroll lock before paint to avoid one-frame flash when opening modal.
  useIsoLayoutEffect(() => {
    if (!project) return;
    const root = document.documentElement;
    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);

    const prevRootOverflow = root.style.overflow;
    const prevRootPadding = root.style.paddingRight;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;

    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const lockPadding = `${scrollbarWidth}px`;
      root.style.paddingRight = lockPadding;
      document.body.style.paddingRight = lockPadding;
    }

    return () => {
      root.style.overflow = prevRootOverflow;
      root.style.paddingRight = prevRootPadding;
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [project]);

  // Keyboard listener — isolated so onClose instability never retriggers scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: `
          radial-gradient(circle at 18% 14%, color-mix(in srgb, ${project.color} 34%, transparent), transparent 48%),
          radial-gradient(circle at 88% 22%, color-mix(in srgb, var(--accent2) 24%, transparent), transparent 45%),
          radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--accent3) 18%, transparent), transparent 55%),
          rgba(8,11,20,0.84)
        `,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        willChange: "opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
    >
      <motion.div
        className="project-modal-panel"
        initial={
          isMobileSheet
            ? { y: "100%", opacity: 1, scale: 1 }
            : { opacity: 0, y: 12, scale: 0.985 }
        }
        animate={
          isMobileSheet
            ? { y: 0, opacity: 1, scale: 1 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        exit={
          isMobileSheet
            ? { y: "100%", opacity: 1, scale: 1 }
            : { opacity: 0, y: 8, scale: 0.99 }
        }
        transition={
          isMobileSheet
            ? { type: "spring", stiffness: 300, damping: 32, mass: 0.9 }
            : { duration: 0.18, ease: "easeOut" }
        }
        style={{
          background: `linear-gradient(145deg,
            color-mix(in srgb, var(--bg) 86%, ${project.color}),
            color-mix(in srgb, var(--bg2) 92%, var(--accent2))
          )`,
          border: "3px solid var(--border)",
          boxShadow: `
            8px 8px 0 color-mix(in srgb, ${project.color} 78%, var(--border)),
            0 24px 60px rgba(0, 0, 0, 0.35)
          `,
          width: "100%",
          maxWidth: 800,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          contain: "paint",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="project-modal-grabber" aria-hidden="true" />
        {/* Header */}
        <div
          className="project-modal-header"
          style={{
            background: `linear-gradient(90deg,
              color-mix(in srgb, ${project.color} 24%, var(--bg3)),
              color-mix(in srgb, var(--accent2) 14%, var(--bg3))
            )`,
            borderBottom: "3px solid var(--border)",
            padding: "28px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              className="project-modal-meta"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: STATUS_COLORS[project.status],
                  border: `2px solid ${STATUS_COLORS[project.status]}`,
                  padding: "3px 10px",
                }}
              >
                {STATUS_LABELS[project.status][lang]}
              </span>
              {project.category.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    border: "2px solid var(--border)",
                    padding: "3px 10px",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px,4vw,32px)",
                lineHeight: 1.15,
                overflowWrap: "anywhere",
              }}
            >
              {project.title[lang]}
            </h2>
          </div>
          <motion.button
            className="project-modal-close retro-press retro-press-border"
            onClick={onClose}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background:
                "linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent2) 35%, var(--accent)))",
              color: "var(--white)",
              border: "3px solid var(--border)",
              boxShadow: "5px 5px 0 var(--border)",
              padding: "8px 16px",
              flexShrink: 0,
            }}
          >
            ✕ {t.close}
          </motion.button>
        </div>

        {/* Content */}
        <div className="project-modal-content" style={{ padding: "32px" }}>
          {/* Description */}
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--text-muted)",
              marginBottom: 32,
            }}
          >
            {project.fullDesc[lang]}
          </p>

          {/* Highlights */}
          <div style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 18,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 3,
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              {t.highlights}
            </h3>
            <div
              id="modal-highlights"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {project.highlights[lang].map((h, i) => (
                <div
                  key={i}
                  data-accent={i % accentCycle.length}
                  style={{
                    border: "2px solid var(--border)",
                    borderLeft: `6px solid ${accentCycle[i % accentCycle.length]}`,
                    background: `linear-gradient(120deg,
                      color-mix(in srgb, ${accentCycle[i % accentCycle.length]} 10%, var(--bg2)),
                      var(--bg2)
                    )`,
                    padding: "12px 16px",
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.5,
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </span>
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 18,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 3,
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              {t.techStack}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    backgroundColor: `color-mix(in srgb, ${accentCycle[Math.abs(tech.length) % accentCycle.length]} 20%, var(--bg2))`,
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "7px 16px",
                    color: "var(--text)",
                    border: "2px solid var(--border)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.links.demo || project.links.github) && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 18,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 3,
                    background: "var(--accent)",
                    display: "inline-block",
                  }}
                />
                {t.links}
              </h3>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {project.links.demo && isExternalUrl(project.links.demo) && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener"
                    className="btn-primary project-modal-link-btn"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    {t.liveDemo}
                  </a>
                )}
                {project.links.demo && !isExternalUrl(project.links.demo) && (
                  <span
                    className="btn-primary project-modal-link-btn"
                    style={{ opacity: 0.7, cursor: "default" }}
                  >
                    {project.links.demo}
                  </span>
                )}
                {project.links.github &&
                  isExternalUrl(project.links.github) && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener"
                      className="btn-secondary project-modal-link-btn"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      {t.sourceCode}
                    </a>
                  )}
                {project.links.github &&
                  !isExternalUrl(project.links.github) && (
                    <span
                      className="btn-secondary project-modal-link-btn"
                      style={{ opacity: 0.7, cursor: "default" }}
                    >
                      {project.links.github}
                    </span>
                  )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
