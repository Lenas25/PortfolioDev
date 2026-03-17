import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { TOOLS_LIST } from "../data/constants";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

const categories = [
  {
    id: "ai",
    icon: "🤖",
    command: "./ai-stack.sh",
    skills: [
      "RAG Systems",
      "Pydantic AI",
      "OpenAI API",
      "Anthropic API",
      "Vector DBs",
      "Prompt Eng.",
    ],
  },
  {
    id: "automation",
    icon: "⚡",
    command: "./automation.sh",
    skills: [
      "N8N",
      "Webhooks",
      "API Integrations",
      "Cron Jobs",
      "Event Pipelines",
    ],
  },
  {
    id: "frontend",
    icon: "🎨",
    command: "./frontend.sh",
    skills: [
      "React",
      "Next.js",
      "Astro",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    icon: "🔧",
    command: "./backend.sh",
    skills: [
      "NestJS",
      "FastAPI",
      "Laravel",
      "Python",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "Prisma",
      "Redis",
    ],
  },
  {
    id: "mobile",
    icon: "📱",
    command: "./mobile.sh",
    skills: ["Flutter", "Dart", "Firebase", "TensorFlow Lite"],
  },
  {
    id: "cloud",
    icon: "☁️",
    command: "./cloud.sh",
    skills: [
      "Docker",
      "GCP",
      "Azure",
      "CI/CD",
      "Netlify",
      "Vercel",
      "Railway",
      "GitHub Actions",
    ],
  },
];

// Typing animation hook
function useTypingEffect(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
}

// Colorful blur blobs background - subtle animated gradient orbs
// Uses CSS classes for dark/light mode support
function ColorfulBlobs({ isActive }: { isActive: boolean }) {
  return (
    <div
      className="skills-blobs-container"
      style={{
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Blob 1 - Pink/Magenta */}
      <motion.div
        className="skills-blob skills-blob--pink"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Blob 2 - Mint/Green */}
      <motion.div
        className="skills-blob skills-blob--mint"
        animate={{
          x: [0, -25, 35, 0],
          y: [0, 40, -25, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      {/* Blob 3 - Yellow/Gold */}
      <motion.div
        className="skills-blob skills-blob--gold"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      {/* Blob 4 - Small accent pink */}
      <motion.div
        className="skills-blob skills-blob--pink-small"
        animate={{
          x: [0, -15, 20, 0],
          y: [0, 25, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      {/* Blob 5 - Small mint */}
      <motion.div
        className="skills-blob skills-blob--mint-small"
        animate={{
          x: [0, 20, -25, 0],
          y: [0, -35, 20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}

// Terminal line component with typing effect
function TerminalLine({
  command,
  delay,
  children,
}: {
  command: string;
  delay: number;
  children?: React.ReactNode;
}) {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    setShowChildren(false);

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < command.length) {
          setDisplayedText(command.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          setShowChildren(true);
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [command, delay]);

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>$</span>
        <span style={{ fontFamily: "var(--font-body)", color: "#f0fff5" }}>
          {displayedText}
        </span>
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ color: "var(--accent)", fontWeight: 700 }}
          >
            █
          </motion.span>
        )}
      </div>
      {showChildren && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default function SkillsTerminal({ lang }: { lang: Lang }) {
  const t = translations[lang].skills;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const featuredTools = TOOLS_LIST.slice(0, 12);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-shell"
      style={{
        borderTop: "3px solid var(--border)",
      }}
    >
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">{t.label}</div>
          <h2 className="section-title">
            {t.title1}{" "}
            <span style={{ color: "var(--accent)" }}>{t.title2}</span>
            <br />
            {t.title3}
          </h2>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          className="skills-terminal-window"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            border: "3px solid var(--border)",
            background: "linear-gradient(180deg, #0a0c14 0%, #12141f 100%)",
            boxShadow:
              "8px 8px 0 var(--border), 0 0 40px rgba(0, 255, 65, 0.1)",
            borderRadius: 4,
            overflow: "hidden",
            marginBottom: 40,
            position: "relative",
          }}
        >
          {/* Terminal Header */}
          <div
            style={{
              background: "linear-gradient(90deg, #1a1d2e, #12141f)",
              borderBottom: "2px solid var(--border)",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ff5f57",
                  border: "1px solid #ff3b30",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ffbd2e",
                  border: "1px solid #e6a700",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#28ca41",
                  border: "1px solid #00cc36",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--text-muted)",
                marginLeft: 12,
                letterSpacing: "0.05em",
              }}
            >
              lena@portfolio ~ ./stack --render
            </span>
          </div>

          {/* Terminal Content */}
          <div
            style={{
              padding: "24px",
              position: "relative",
              minHeight: 200,
            }}
          >
            <ColorfulBlobs isActive={isInView} />

            <div style={{ position: "relative", zIndex: 1 }}>
              {isInView && (
                <>
                  <TerminalLine command="echo $STACK_FAVS" delay={0}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginTop: 8,
                        padding: "12px",
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(0, 255, 65, 0.15)",
                      }}
                    >
                      {featuredTools.map((tool, i) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03 }}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 700,
                            fontSize: 11,
                            padding: "4px 10px",
                            background:
                              i % 3 === 0
                                ? "linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, var(--accent2)))"
                                : "rgba(255, 255, 255, 0.08)",
                            color: i % 3 === 0 ? "#fff" : "#f0fff5",
                            border: "1px solid",
                            borderColor:
                              i % 3 === 0
                                ? "var(--accent)"
                                : "rgba(255, 255, 255, 0.15)",
                          }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </TerminalLine>

                  <div style={{ marginTop: 16 }}>
                    <TerminalLine command="ls -la ./categories/" delay={800}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: 12,
                          marginTop: 12,
                        }}
                      >
                        {categories.map((cat, i) => (
                          <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory === cat.id ? null : cat.id,
                              )
                            }
                            style={{
                              background:
                                selectedCategory === cat.id
                                  ? "linear-gradient(135deg, rgba(0, 255, 65, 0.15), rgba(0, 255, 65, 0.05))"
                                  : "rgba(0, 0, 0, 0.2)",
                              border: "2px solid",
                              borderColor:
                                selectedCategory === cat.id
                                  ? "var(--accent)"
                                  : "rgba(255, 255, 255, 0.12)",
                              padding: 16,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 8,
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "monospace",
                                  fontSize: 10,
                                  color: "var(--accent)",
                                  letterSpacing: "0.1em",
                                }}
                              >
                                {cat.command}
                              </span>
                              <span style={{ fontSize: 18 }}>{cat.icon}</span>
                            </div>
                            <div
                              style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 800,
                                fontSize: 14,
                                marginBottom: 8,
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                                      color: "#f0fff5",
                              }}
                            >
                              {cat.id === "ai" && t.cat1}
                              {cat.id === "automation" && t.cat2}
                              {cat.id === "frontend" && t.cat3}
                              {cat.id === "backend" && t.cat4}
                              {cat.id === "mobile" && t.cat5}
                              {cat.id === "cloud" && t.cat6}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 4,
                              }}
                            >
                              {cat.skills
                                .slice(
                                  0,
                                  selectedCategory === cat.id ? undefined : 3,
                                )
                                .map((skill) => (
                                  <span
                                    key={skill}
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      fontWeight: 600,
                                      fontSize: 10,
                                      padding: "3px 6px",
                                      background: "rgba(0, 0, 0, 0.3)",
                                      border: "1px solid rgba(0, 255, 65, 0.25)",
                                color: "#f0fff5",
                                    }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              {cat.skills.length > 3 &&
                                selectedCategory !== cat.id && (
                                  <span
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      fontSize: 9,
                                      color: "var(--accent)",
                                      padding: "3px 6px",
                                    }}
                                  >
                                    +{cat.skills.length - 3}
                                  </span>
                                )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TerminalLine>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <TerminalLine
                      command="echo 'Ready to build amazing things ✨'"
                      delay={1600}
                    >
                      <span
                        style={{ color: "var(--accent)", fontStyle: "italic" }}
                      >
                        ✓ Stack loaded successfully
                      </span>
                    </TerminalLine>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Scanlines overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.08) 0px, rgba(0, 0, 0, 0.08) 1px, transparent 1px, transparent 2px)",
              pointerEvents: "none",
              opacity: 0.25,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
