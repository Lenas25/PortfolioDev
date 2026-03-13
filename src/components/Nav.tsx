import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

interface NavProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  useHomeAnchors?: boolean;
}

export default function Nav({
  lang,
  onLangChange,
  useHomeAnchors = true,
}: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "about", label: t.about },
    { id: "skills", label: t.skills },
    { id: "projects", label: t.projects },
    { id: "experience", label: t.experience },
    { id: "contact", label: t.contact },
  ];

  const sectionHref = (id: string) => (useHomeAnchors ? `#${id}` : `/#${id}`);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "14px 0",
        borderBottom: "3px solid var(--border)",
        background: "var(--bg)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.4s, backdrop-filter 0.4s",
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
          gap: 16,
        }}
      >
        {/* Logo */}
        <a
          href={useHomeAnchors ? "#hero" : "/"}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 20,
            color: "var(--text)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          lena
          <span
            style={{
              background: "var(--accent)",
              color: "#fff",
              padding: "2px 8px",
              border: "3px solid var(--border)",
              boxShadow: "3px 3px 0 var(--shadow-color)",
            }}
          >
            .dev
          </span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: menuOpen ? "none" : "flex",
            alignItems: "center",
            gap: 28,
            listStyle: "none",
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={sectionHref(link.id)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "var(--text)",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
          className="nav-extra-controls"
        >
          {/* CV Download */}
          <a
            href="/cv-lena.pdf"
            download="CV-Lena-AI-Engineer.pdf"
            className="retro-press retro-press-accent retro-press-tight"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              padding: "8px 16px",
              background: "transparent",
              color: "var(--text)",
              border: "3px solid var(--border)",
              boxShadow: "4px 4px 0 var(--accent)",
              cursor: "none",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {t.downloadCV}
          </a>

          {/* Hire me CTA */}
          <a
            href={sectionHref("contact")}
            className="btn-primary nav-cta-hire"
            style={{ fontSize: 12, padding: "8px 16px" }}
          >
            {t.hire}
          </a>
        </div>

        {/* Hamburger - OUTSIDE nav-extra-controls so it's always visible on mobile */}
        <button
          className="hamburger retro-press"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "var(--bg3)",
            border: "3px solid var(--border)",
            boxShadow: "4px 4px 0 var(--border)",
            cursor: "none",
            padding: 8,
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 24,
                height: 3,
                background: "var(--text)",
                display: "block",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: 60,
              left: 0,
              right: 0,
              background: "var(--bg)",
              borderBottom: "3px solid var(--border)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              zIndex: 99,
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={sectionHref(link.id)}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "var(--text)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
