import { useState, useEffect } from "react";
import type { Lang } from "../data/i18n";
import { useLenis } from "../hooks/useLenis";
import { RetroModeProvider } from "../contexts/RetroModeContext";
import Nav from "./Nav";
import FloatingControls from "./FloatingControls";
import Hero from "./Hero";
import Marquee from "./Marquee";
import About from "./About";
import SkillsTerminal from "./SkillsTerminal";
import Projects from "./Projects";
import Experience from "./Experience";
import { Contact, Footer } from "./Sections";
import { KONAMI_CODE_DISPLAY } from "../hooks/useKonamiCode";

export default function App() {
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
    <RetroModeProvider>
      <Nav lang={lang} onLangChange={setLang} />
      <FloatingControls
        lang={lang}
        onLangChange={setLang}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <main>
        <Hero lang={lang} />
        <Marquee />
        <About lang={lang} />
        <SkillsTerminal lang={lang} />
        <Projects lang={lang} />
        <Experience lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      {/* Pista secreta del Konami code */}
      <span
        className="secret-hint"
        title="Do you know the code?"
        style={{
          position: "fixed",
          bottom: 8,
          right: 8,
          fontFamily: "monospace",
          fontSize: 8,
          opacity: 0.06,
          transition: "opacity 0.5s",
          cursor: "default",
          userSelect: "none",
          zIndex: 9999,
        }}
      >
        {KONAMI_CODE_DISPLAY}
      </span>
    </RetroModeProvider>
  );
}
