import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

interface NavProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
}

export default function Nav({ lang, onLangChange }: NavProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const stored =
      (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const navLinks = [
    { href: "#about", label: t.about },
    { href: "#skills", label: t.skills },
    { href: "#projects", label: t.projects },
    { href: "#experience", label: t.experience },
    { href: "#contact", label: t.contact },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "14px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "3px solid var(--border)",
        background: "var(--bg)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.4s, backdrop-filter 0.4s",
      }}
    >
      {/* Logo */}
      <a
        href="#"
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
          <li key={link.href}>
            <a
              href={link.href}
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
                ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
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
        {/* Lang toggle */}
        <button
          onClick={() => onLangChange(lang === "en" ? "es" : "en")}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "var(--bg3)",
            color: "var(--text)",
            border: "2px solid var(--border)",
            padding: "6px 12px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          title="Toggle language"
        >
          {lang === "en" ? "🇵🇪 ES" : "🇺🇸 EN"}
        </button>

        {/* Theme toggle */}
        <div
          onClick={toggleTheme}
          role="button"
          title="Toggle theme"
          style={{
            width: 48,
            height: 28,
            background: "var(--bg3)",
            border: "3px solid var(--border)",
            borderRadius: 14,
            cursor: "pointer",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 3,
              left: theme === "dark" ? 3 : 23,
              width: 18,
              height: 18,
              background: "var(--accent)",
              borderRadius: "50%",
              transition: "left 0.3s",
            }}
          />
        </div>

        {/* CV Download */}
        <a
          href="/cv-lena.pdf"
          download="CV-Lena-AI-Engineer.pdf"
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
            cursor: "pointer",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-2px,-2px)";
            e.currentTarget.style.boxShadow = "6px 6px 0 var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0,0)";
            e.currentTarget.style.boxShadow = "4px 4px 0 var(--accent)";
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
          href="#contact"
          className="btn-primary nav-cta-hire"
          style={{ fontSize: 12, padding: "8px 16px" }}
        >
          {t.hire}
        </a>
      </div>

      {/* Hamburger - OUTSIDE nav-extra-controls so it's always visible on mobile */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          flexDirection: "column",
          gap: 5,
          background: "none",
          border: "none",
          cursor: "pointer",
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
                key={link.href}
                href={link.href}
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
