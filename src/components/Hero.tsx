import { motion } from "framer-motion";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

interface HeroProps {
  lang: Lang;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero;
  const favoriteColors = ["#00e8a2", "#ff2d7b", "#ffd93d"];
  const hobbiesByLang: Record<Lang, string[]> = {
    es: ["Videojuegos", "Musica", "Series"],
    en: ["Gaming", "Music", "Series"],
  };
  const profileData = {
    name: "Lena",
    country: "Peru",
    role: t.subtitle,
    superpower: "AI-powered dev flow",
    hobbies: hobbiesByLang[lang],
    frontend: ["React", "Next.js"],
    backend: ["NestJS", "FastAPI"],
    tools: ["Stitch", "Copilot", "Cursor", "n8n", "Supabase"],
    favorite_colors: favoriteColors,
    status: true,
  };
  const profileJson = JSON.stringify(profileData, null, 2);
  const heroSignals = [t.badge2, t.badge3];

  return (
    <section id="hero" className="hero-section">
      {/* BG Shapes */}
      <svg
        className="hero-bg-shape s1"
        style={{ animation: "float 8s ease-in-out infinite" }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r="50"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <line
          x1="20"
          y1="100"
          x2="180"
          y2="100"
          stroke="currentColor"
          strokeWidth="3"
        />
        <line
          x1="100"
          y1="20"
          x2="100"
          y2="180"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle cx="100" cy="100" r="8" fill="currentColor" />
      </svg>
      <svg
        className="hero-bg-shape s2"
        style={{ animation: "float 10s ease-in-out infinite reverse" }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <rect
          x="20"
          y="20"
          width="160"
          height="160"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <rect
          x="60"
          y="60"
          width="80"
          height="80"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <line
          x1="20"
          y1="20"
          x2="180"
          y2="180"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="180"
          y1="20"
          x2="20"
          y2="180"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="hero-bg-shape s3"
        style={{ animation: "spin 20s linear infinite" }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <polygon
          points="100,10 190,190 10,190"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <polygon
          points="100,50 160,170 40,170"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Inner grid — centered at 1200px */}
      <div className="hero-inner">
        {/* LEFT */}
        <div className="hero-left">
          {/* Badge */}
          <div className="hero-tag slide-in" style={{ animationDelay: "0.1s" }}>
            <span className="hero-tag-dot" />
            {t.available}
          </div>

          {/* Title */}
          <h1 className="hero-name slide-in" style={{ animationDelay: "0.2s" }}>
            <span className="glitch" data-text={t.title1}>
              {t.title1}
            </span>
            <br />
            <span className="name-highlight">{t.title2}</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-title slide-in" style={{ animationDelay: "0.3s" }}>
            <strong>{t.subtitle}</strong>
            {" · "}
            <em>{t.subtitleSub}</em>
          </p>

          {/* Description */}
          <p className="hero-desc slide-in" style={{ animationDelay: "0.4s" }}>
            {t.desc}
          </p>

          <ul
            className="hero-signals slide-in"
            style={{ animationDelay: "0.45s" }}
          >
            {heroSignals.map((signal) => (
              <li key={signal} className="hero-signal-item">
                {signal}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div
            className="hero-actions slide-in"
            style={{ animationDelay: "0.5s" }}
          >
            <a href="#projects" className="btn-primary">
              {t.cta1}
            </a>
            <a href="#contact" className="btn-secondary">
              {t.cta2}
            </a>
          </div>
        </div>

        {/* RIGHT — composición X: foto + JSON */}
        <div className="hero-right">
          <div
            className="hero-x-stack slide-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="hero-x-card hero-json-card" aria-hidden="true">
              <div className="hero-json-window">
                <div className="hero-json-topbar">
                  <span className="hero-dot red" />
                  <span className="hero-dot yellow" />
                  <span className="hero-dot green" />
                  <span className="hero-json-file">profile.json</span>
                </div>
                <pre className="hero-json-code">{profileJson}</pre>
                <div className="hero-json-palette" aria-label="Favorite colors">
                  {favoriteColors.map((color) => (
                    <span key={color} className="hero-json-palette-item">
                      <span
                        className="hero-color-swatch"
                        style={{ background: color }}
                      />
                      {color}
                    </span>
                  ))}
                </div>
                <span className="hero-json-sticker hero-json-sticker-top">
                  {t.badge1}
                </span>
                <span className="hero-json-sticker hero-json-sticker-bottom">
                  Full-Stack
                </span>
              </div>
            </div>

            <div className="hero-x-card hero-photo-card">
              <div className="hero-photo-wrap">
                <div className="hero-profile-frame" />
                <div className="hero-profile-img">
                  <img
                    src="/images/lena-profile.png"
                    alt="Lena - AI Engineer"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML = `
                        <div style="aspect-ratio:1/1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg2);color:var(--text-muted);font-size:12px;text-align:center;padding:16px;">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:0.5;margin-bottom:8px;"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
                          <span>foto</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="hero-profile-tag">LENA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-scroll slide-in"
          style={{ animationDelay: "0.8s" }}
        >
          <motion.svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
          {t.scroll}
        </div>
      </div>
    </section>
  );
}
