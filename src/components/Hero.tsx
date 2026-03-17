import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";
import { useMousePosition } from "../hooks/useMousePosition";

interface HeroProps {
  lang: Lang;
}

// Componente de botón magnético
function MagneticButton({
  children,
  href,
  className,
  strength = 0.4,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition(isHovered);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (!ref.current || !isHovered) {
      x.set(0);
      y.set(0);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = mousePosition.x - centerX;
    const distanceY = mousePosition.y - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  }, [mousePosition, isHovered, strength, x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.a>
  );
}

// Componente de forma SVG con parallax
function ParallaxShape({
  children,
  className,
  parallaxStrength = 20,
  viewBox,
}: {
  children: React.ReactNode;
  className: string;
  parallaxStrength?: number;
  viewBox?: string;
}) {
  const mousePosition = useMousePosition(true);

  const x = useTransform(() => mousePosition.normalizedX * parallaxStrength);
  const y = useTransform(() => mousePosition.normalizedY * parallaxStrength);

  const springConfig = { damping: 30, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.svg
      className={className}
      style={{ x: springX, y: springY }}
      fill="none"
      viewBox={viewBox}
    >
      {children}
    </motion.svg>
  );
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
      {/* BG Shapes con Parallax */}
      <ParallaxShape
        className="hero-bg-shape s1"
        parallaxStrength={25}
        viewBox="0 0 200 200"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="50"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
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
        <motion.circle
          cx="100"
          cy="100"
          r="8"
          fill="currentColor"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </ParallaxShape>

      <ParallaxShape
        className="hero-bg-shape s2"
        parallaxStrength={35}
        viewBox="0 0 200 200"
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
      </ParallaxShape>

      <ParallaxShape
        className="hero-bg-shape s3"
        parallaxStrength={15}
        viewBox="0 0 200 200"
      >
        <motion.polygon
          points="100,10 190,190 10,190"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <polygon
          points="100,50 160,170 40,170"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </ParallaxShape>

      {/* Inner grid — centered at 1200px */}
      <div className="hero-inner">
        {/* LEFT */}
        <div className="hero-left">
          {/* Badge */}
          <motion.div
            className="hero-tag slide-in"
            style={{ animationDelay: "0.1s" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="hero-tag-dot"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {t.available}
          </motion.div>

          {/* Title */}
          <h1 className="hero-name slide-in" style={{ animationDelay: "0.2s" }}>
            <motion.span
              className="glitch"
              data-text={t.title1}
              whileHover={{
                textShadow: [
                  "2px 0 #ff2d7b, -2px 0 #00e8a2",
                  "-2px 0 #ff2d7b, 2px 0 #00e8a2",
                  "2px 0 #ff2d7b, -2px 0 #00e8a2",
                ],
              }}
              transition={{ duration: 0.3 }}
            >
              {t.title1}
            </motion.span>
            <br />
            <motion.span
              className="name-highlight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t.title2}
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="hero-title slide-in"
            style={{ animationDelay: "0.3s" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>{t.subtitle}</strong>
            {" · "}
            <em>{t.subtitleSub}</em>
          </motion.p>

          {/* Description */}
          <motion.p
            className="hero-desc slide-in"
            style={{ animationDelay: "0.4s" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t.desc}
          </motion.p>

          <motion.ul
            className="hero-signals slide-in"
            style={{ animationDelay: "0.45s" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {heroSignals.map((signal, i) => (
              <motion.li
                key={signal}
                className="hero-signal-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
              >
                {signal}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs con efecto magnético */}
          <motion.div
            className="hero-actions slide-in"
            style={{ animationDelay: "0.5s" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <MagneticButton href="#projects" className="btn-primary">
              {t.cta1}
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-secondary">
              {t.cta2}
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT — composición X: foto + JSON */}
        <div className="hero-right">
          <motion.div
            className="hero-x-stack slide-in"
            style={{ animationDelay: "0.3s" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="hero-x-card hero-json-card"
              aria-hidden="true"
            >
              <div className="hero-json-window">
                <div className="hero-json-topbar">
                  <span className="hero-dot red" />
                  <span className="hero-dot yellow" />
                  <span className="hero-dot green" />
                  <span className="hero-json-file">profile.json</span>
                </div>
                <pre className="hero-json-code">{profileJson}</pre>
                <div className="hero-json-palette" aria-label="Favorite colors">
                  {favoriteColors.map((color, i) => (
                    <motion.span
                      key={color}
                      className="hero-json-palette-item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <motion.span
                        className="hero-color-swatch"
                        style={{ background: color }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.15 }}
                      />
                      {color}
                    </motion.span>
                  ))}
                </div>
                <span className="hero-json-sticker hero-json-sticker-top">
                  {t.badge1}
                </span>
                <span className="hero-json-sticker hero-json-sticker-bottom">
                  Full-Stack
                </span>
              </div>
            </motion.div>

            <motion.div className="hero-x-card hero-photo-card">
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
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll slide-in"
          style={{ animationDelay: "0.8s" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
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
        </motion.div>
      </div>
    </section>
  );
}
