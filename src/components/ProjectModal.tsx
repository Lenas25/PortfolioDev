import { useEffect, useLayoutEffect, useMemo, useState } from "react";
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

interface GallerySlide {
  src: string;
  alt: string;
  caption: string;
}

function makeBrutalSlideDataUri(
  project: Project,
  lang: Lang,
  label: string,
  accent: string,
): string {
  const title = project.title[lang];
  const safeTitle = title.replace(/&/g, "&").replace(/</g, "<");
  const safeLabel = label.replace(/&/g, "&").replace(/</g, "<");
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#11131a"/>
      <stop offset="100%" stop-color="#1f2433"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="700" fill="url(#bg)"/>
  <rect x="70" y="70" width="1060" height="560" fill="none" stroke="${accent}" stroke-width="14"/>
  <rect x="120" y="120" width="620" height="170" fill="${accent}"/>
  <rect x="780" y="130" width="280" height="120" fill="none" stroke="${accent}" stroke-width="8"/>
  <rect x="160" y="350" width="860" height="28" fill="#f4f4f4" opacity="0.95"/>
  <rect x="160" y="400" width="540" height="28" fill="#f4f4f4" opacity="0.7"/>
  <rect x="160" y="450" width="760" height="28" fill="#f4f4f4" opacity="0.82"/>
  <text x="145" y="232" font-family="Space Grotesk, sans-serif" font-size="74" font-weight="800" fill="#0a0a0a">${safeLabel}</text>
  <text x="160" y="560" font-family="Space Grotesk, sans-serif" font-size="44" font-weight="700" fill="#ffffff">${safeTitle}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function buildFallbackSlides(project: Project, lang: Lang): GallerySlide[] {
  const labels =
    lang === "es"
      ? ["Vista general", "Impacto", "Arquitectura"]
      : ["Overview", "Impact", "Architecture"];

  return labels.map((label, index) => ({
    src: makeBrutalSlideDataUri(
      project,
      lang,
      label,
      index % 2 === 0 ? project.color : "var(--accent2)",
    ),
    alt: `${project.title[lang]} - ${label}`,
    caption: label,
  }));
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const isExternalUrl = (value?: string) =>
    Boolean(value && /^(https?:)\/\//i.test(value));

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  const ui =
    lang === "es"
      ? {
          projectView: "Vista del proyecto",
          previous: "Anterior",
          next: "Siguiente",
          details: "Mas contexto",
          showMore: "Ver todos",
          showLess: "Ver menos",
        }
      : {
          projectView: "Project view",
          previous: "Previous",
          next: "Next",
          details: "More context",
          showMore: "Show all",
          showLess: "Show less",
        };

  // Declarar blobs solo si project existe
  const blobs = project
    ? [
        {
          style: {
            position: "absolute" as const,
            top: "12%",
            left: "8%",
            width: "220px",
            height: "220px",
            opacity: 0.18,
            zIndex: 0,
            pointerEvents: "none" as const,
          },
          color: project.color,
        },
        {
          style: {
            position: "absolute" as const,
            top: "60%",
            left: "70%",
            width: "180px",
            height: "180px",
            opacity: 0.14,
            zIndex: 0,
            pointerEvents: "none" as const,
          },
          color: "var(--accent2)",
        },
        {
          style: {
            position: "absolute" as const,
            top: "80%",
            left: "20%",
            width: "140px",
            height: "140px",
            opacity: 0.12,
            zIndex: 0,
            pointerEvents: "none" as const,
          },
          color: "var(--accent3)",
        },
      ]
    : [];

  const gallerySlides: GallerySlide[] = useMemo(() => {
    if (!project) return [];
    if (project.gallery?.length) {
      return project.gallery.map((slide) => ({
        src: slide.src,
        alt: slide.alt[lang],
        caption: slide.caption?.[lang] ?? ui.projectView,
      }));
    }
    return buildFallbackSlides(project, lang);
  }, [project, lang, ui.projectView]);

  // Preload images to detect failures early
  useEffect(() => {
    if (!project || !project.gallery?.length) return;

    project.gallery.forEach((slide) => {
      const img = new Image();
      img.onerror = () => {
        setFailedImages((prev) => new Set(prev).add(slide.src));
      };
      img.src = slide.src;
    });
  }, [project]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobileSheet(e.matches);

    setIsMobileSheet(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    setActiveSlide(0);
    setShowAllHighlights(false);
    setFailedImages(new Set());
  }, [project?.id]);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  const previewHighlights = project.highlights[lang].slice(
    0,
    showAllHighlights ? undefined : 4,
  );

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
      {/* Fondo blur y blobs decorativos */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {blobs.map((blob, i) => (
          <svg
            key={i}
            style={blob.style}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40.5,-56.7C53.7,-48.7,65.2,-39.2,70.2,-26.7C75.2,-14.2,73.7,1.3,67.2,14.7C60.7,28.1,49.2,39.4,36.2,47.7C23.2,56,8.7,61.3,-5.7,63.2C-20.1,65.1,-34.3,63.6,-44.7,55.2C-55.1,46.8,-61.7,31.5,-63.2,16.2C-64.7,0.9,-61.1,-14.4,-53.2,-27.2C-45.3,-40,-33.1,-50.2,-19.1,-57.1C-5.1,-64,10.7,-67.7,25.2,-65.2C39.7,-62.7,53.7,-54.7,40.5,-56.7Z"
              fill={blob.color}
            />
          </svg>
        ))}
      </div>

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
          zIndex: 10,
          contain: "paint",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="project-modal-grabber" aria-hidden="true" />

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

        <div className="project-modal-content" style={{ padding: "32px" }}>
          {/* Gallery Carousel - Only show if real gallery images exist */}
          {project.gallery?.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  border: "3px solid var(--border)",
                  background: "#12141d",
                  boxShadow: `7px 7px 0 color-mix(in srgb, ${project.color} 74%, var(--border))`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Slides Container - Using CSS transform instead of framer-motion for reliability */}
                <div
                  style={{
                    display: "flex",
                    transform: `translateX(-${activeSlide * 100}%)`,
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {gallerySlides.map((slide, index) => (
                    <figure
                      key={`${project.id}-slide-${index}`}
                      style={{
                        minWidth: "100%",
                        margin: 0,
                        position: "relative",
                        aspectRatio: "16 / 9",
                        background: "#12141d",
                      }}
                    >
                      {failedImages.has(slide.src) ? (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `linear-gradient(135deg,
                              color-mix(in srgb, ${project.color} 20%, #12141d),
                              color-mix(in srgb, var(--accent2) 15%, #12141d)
                            )`,
                            flexDirection: "column",
                            gap: 12,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 800,
                              fontSize: "clamp(24px, 4vw, 42px)",
                              color: "var(--accent)",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              border: "3px solid var(--border)",
                              padding: "12px 24px",
                              background:
                                "color-mix(in srgb, var(--card-bg) 80%, transparent)",
                              boxShadow: "6px 6px 0 var(--border)",
                            }}
                          >
                            {project.title[lang].split("—")[0].trim()}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-body)",
                              fontWeight: 700,
                              fontSize: 12,
                              color: "var(--text-muted)",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            {slide.caption}
                          </div>
                        </div>
                      ) : (
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          loading="eager"
                          onError={() => handleImageError(slide.src)}
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                            objectFit: "cover",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                      <figcaption
                        style={{
                          position: "absolute",
                          left: 12,
                          bottom: 12,
                          fontFamily: "var(--font-body)",
                          fontWeight: 800,
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#080a12",
                          background: "var(--accent3)",
                          border: "2px solid var(--border)",
                          boxShadow: "4px 4px 0 var(--border)",
                          padding: "4px 10px",
                        }}
                      >
                        {slide.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                {/* Previous Button */}
                {gallerySlides.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) =>
                        prev === 0 ? gallerySlides.length - 1 : prev - 1,
                      )
                    }
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 12,
                      transform: "translateY(-50%)",
                      background: "var(--bg)",
                      border: "2px solid var(--border)",
                      color: "var(--text)",
                      fontSize: 20,
                      fontWeight: 800,
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "3px 3px 0 var(--border)",
                      zIndex: 5,
                      borderRadius: 4,
                    }}
                    aria-label={ui.previous}
                  >
                    ‹
                  </button>
                )}

                {/* Next Button */}
                {gallerySlides.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide(
                        (prev) => (prev + 1) % gallerySlides.length,
                      )
                    }
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: 12,
                      transform: "translateY(-50%)",
                      background: "var(--accent)",
                      border: "2px solid var(--border)",
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: 800,
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "3px 3px 0 var(--border)",
                      zIndex: 5,
                      borderRadius: 4,
                    }}
                    aria-label={ui.next}
                  >
                    ›
                  </button>
                )}
              </div>

              {/* Controls: Dots + Slide counter */}
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                {/* Slide counter */}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 11,
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {activeSlide + 1} / {gallerySlides.length}
                </span>

                {/* Dots */}
                <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                  {gallerySlides.map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={activeSlide === index}
                      style={{
                        width: 10,
                        height: 10,
                        border: "2px solid var(--border)",
                        background:
                          activeSlide === index
                            ? accentCycle[index % accentCycle.length]
                            : "var(--card-bg)",
                        padding: 0,
                        cursor: "pointer",
                        transition: "transform 0.15s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              border: "2px solid var(--border)",
              background:
                "color-mix(in srgb, var(--bg2) 90%, var(--accent) 10%)",
              padding: "16px 18px",
              marginBottom: 28,
            }}
          >
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--text-muted)",
                marginBottom: 0,
              }}
            >
              {project.shortDesc[lang]}
            </p>
            {project.fullDesc[lang] !== project.shortDesc[lang] && (
              <details style={{ marginTop: 10 }}>
                <summary
                  style={{
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  {ui.details}
                </summary>
                <p
                  style={{
                    marginTop: 10,
                    marginBottom: 0,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--text-muted)",
                  }}
                >
                  {project.fullDesc[lang]}
                </p>
              </details>
            )}
          </div>

          <div style={{ marginBottom: 26 }}>
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
              {previewHighlights.map((h, i) => (
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
            {project.highlights[lang].length > 4 && (
              <button
                type="button"
                onClick={() => setShowAllHighlights((prev) => !prev)}
                style={{
                  marginTop: 12,
                  border: "2px solid var(--border)",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "6px 12px",
                  boxShadow: "3px 3px 0 var(--border)",
                }}
              >
                {showAllHighlights ? ui.showLess : ui.showMore}
              </button>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
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
                {t.techStack}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.stack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    style={{
                      backgroundColor: `color-mix(in srgb, ${accentCycle[Math.abs(tech.length) % accentCycle.length]} 20%, var(--bg2))`,
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: 12,
                      padding: "6px 12px",
                      color: "var(--text)",
                      border: "2px solid var(--border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 6 && (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 800,
                      fontSize: 12,
                      padding: "6px 12px",
                      color: "var(--text-muted)",
                      border: "2px dashed var(--border)",
                    }}
                  >
                    +{project.stack.length - 6}
                  </span>
                )}
              </div>
            </div>

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
        </div>
      </motion.div>
    </motion.div>
  );
}
