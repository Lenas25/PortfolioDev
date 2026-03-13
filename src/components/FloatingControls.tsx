import { motion } from "framer-motion";
import type { Lang } from "../data/i18n";

interface FloatingControlsProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  theme: "dark" | "light";
  onThemeToggle: () => void;
}

export default function FloatingControls({
  lang,
  onLangChange,
  theme,
  onThemeToggle,
}: FloatingControlsProps) {
  return (
    <div
      className="floating-controls-dock"
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Lang toggle */}
      <motion.button
        type="button"
        onClick={() => onLangChange(lang === "en" ? "es" : "en")}
        whileTap={{ x: -2, y: 2 }}
        title="Toggle language"
        aria-label={`Switch to ${lang === "en" ? "Spanish" : "English"}`}
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 900,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          background: "var(--bg3)",
          color: "var(--text)",
          border: "3px solid var(--border)",
          borderRight: "none",
          borderBottom: "none",
          boxShadow: "-5px 5px 0 var(--accent)",
          padding: "10px 14px",
          cursor: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          lineHeight: 1,
        }}
      >
        <span style={{ fontSize: 18 }}>{lang === "en" ? "🇵🇪" : "🇺🇸"}</span>
        <span style={{ color: "var(--accent)" }}>
          {lang === "en" ? "ES" : "EN"}
        </span>
      </motion.button>

      {/* Divider */}
      <div
        style={{
          height: 3,
          background: "var(--border)",
          marginRight: 0,
        }}
      />

      {/* Theme toggle */}
      <motion.button
        type="button"
        onClick={onThemeToggle}
        whileTap={{ x: -2, y: 2 }}
        title="Toggle theme"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        aria-pressed={theme === "light"}
        style={{
          background: "var(--bg3)",
          border: "3px solid var(--border)",
          borderRight: "none",
          borderTop: "none",
          boxShadow: "-5px 5px 0 var(--accent)",
          padding: "10px 14px",
          cursor: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          lineHeight: 1,
        }}
      >
        <span style={{ fontSize: 18 }}>{theme === "dark" ? "☀️" : "🌙"}</span>
        {/* Mini toggle pill */}
        <div
          style={{
            width: 28,
            height: 14,
            background: "var(--bg)",
            border: "2px solid var(--border)",
            borderRadius: 7,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 2,
              left: theme === "dark" ? 2 : 14,
              width: 6,
              height: 6,
              background: "var(--accent)",
              borderRadius: "50%",
              transition: "left 0.3s",
            }}
          />
        </div>
      </motion.button>
    </div>
  );
}
