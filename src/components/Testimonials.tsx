import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: { en: string; es: string };
  project: { en: string; es: string };
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Alejandra Suárez",
    role: "Fundadora",
    company: "Alejandra Academia",
    avatar: "AS",
    quote: {
      en: "Lena transformed our manual processes into an automated system that saves us hours every week. The landing page generator alone increased our student inquiries by 40%. Exceptional work and communication throughout.",
      es: "Lena transformó nuestros procesos manuales en un sistema automatizado que nos ahorra horas cada semana. El generador de landing pages aumentó nuestras consultas de estudiantes en un 40%. Trabajo excepcional y comunicación durante todo el proyecto.",
    },
    project: {
      en: "Alejandra Academia Platform",
      es: "Plataforma Alejandra Academia",
    },
    rating: 5,
  },
  {
    id: "t2",
    name: "Carlos Mendoza",
    role: "CEO",
    company: "Decor Master Clean",
    avatar: "CM",
    quote: {
      en: "The landing page Lena created for us delivered a 65% increase in sales within the first month. Her understanding of conversion optimization and user experience is remarkable. Highly recommend!",
      es: "La landing page que Lena creó para nosotros entregó un aumento del 65% en ventas en el primer mes. Su comprensión de la optimización de conversiones y experiencia de usuario es remarkable. ¡Altamente recomendada!",
    },
    project: {
      en: "Decor Master Clean Landing",
      es: "Landing Decor Master Clean",
    },
    rating: 5,
  },
  {
    id: "t3",
    name: "Roberto Vásquez",
    role: "Director de Tecnología",
    company: "Inverzy",
    avatar: "RV",
    quote: {
      en: "The AI-powered features Lena implemented exceeded our expectations. The WACC calculator and business canvas automation have become core differentiators for our platform. Technical excellence meets business understanding.",
      es: "Las funcionalidades potenciadas por IA que Lena implementó superaron nuestras expectativas. El calculador WACC y la automatización del canvas de negocio se han convertido en diferenciadores clave de nuestra plataforma. Excelencia técnica combinada con entendimiento de negocio.",
    },
    project: {
      en: "Inverzy SaaS Platform",
      es: "Plataforma SaaS Inverzy",
    },
    rating: 5,
  },
  {
    id: "t4",
    name: "María Fernández",
    role: "Gerente de Operaciones",
    company: "LubeControl",
    avatar: "MF",
    quote: {
      en: "The refactor and visual upgrade transformed our old interface into something our team actually enjoys using. Cycle tracking accuracy improved and failure reporting is now instant. Game changer for our operations.",
      es: "La refactorización y mejora visual transformó nuestra vieja interfaz en algo que nuestro equipo realmente disfruta usar. La precisión del seguimiento de ciclos mejoró y el reporte de fallas ahora es instantáneo. Un cambio radical para nuestras operaciones.",
    },
    project: {
      en: "LubeControl Refactor",
      es: "Refactorización LubeControl",
    },
    rating: 5,
  },
  {
    id: "t5",
    name: "Dr. Ana Martínez",
    role: "Psicóloga",
    company: "KintsuMind",
    avatar: "AM",
    quote: {
      en: "Finally a system that understands how therapy practices actually work! The appointment scheduling, encrypted notes, and WhatsApp reminders have streamlined everything. My patients love the dashboard.",
      es: "¡Por fin un sistema que entiende cómo funcionan las consultas terapéuticas! La agenda de citas, notas cifradas y recordatorios por WhatsApp han simplificado todo. A mis pacientes les encanta el dashboard.",
    },
    project: {
      en: "KintsuMind Platform",
      es: "Plataforma KintsuMind",
    },
    rating: 5,
  },
];

const accentColors = [
  "var(--accent)",
  "var(--accent2)",
  "var(--accent3)",
  "#2D7BFF",
  "#8B003B",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: 14,
            color: i < rating ? "var(--accent3)" : "var(--border)",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  lang,
  index,
}: {
  testimonial: Testimonial;
  lang: Lang;
  index: number;
}) {
  const accentColor = accentColors[index % accentColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -6,
        boxShadow: `8px 8px 0 ${accentColor}`,
        transition: { duration: 0.15 },
      }}
      style={{
        background: "var(--card-bg)",
        border: `3px solid var(--border)`,
        boxShadow: `6px 6px 0 var(--border)`,
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 20,
          fontSize: 80,
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          color: accentColor,
          opacity: 0.15,
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        "
      </div>

      {/* Project tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--bg)",
            background: accentColor,
            padding: "4px 10px",
            border: `2px solid var(--border)`,
          }}
        >
          {testimonial.project[lang]}
        </span>
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: "var(--text)",
          flex: 1,
          fontStyle: "italic",
        }}
      >
        "{testimonial.quote[lang]}"
      </p>

      {/* Author */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingTop: 16,
          borderTop: `2px solid var(--border)`,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 0,
            background: accentColor,
            border: `2px solid var(--border)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 16,
            color: "var(--bg)",
            flexShrink: 0,
          }}
        >
          {testimonial.avatar}
        </div>

        {/* Name & role */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 15,
              color: "var(--text)",
            }}
          >
            {testimonial.name}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              fontWeight: 600,
            }}
          >
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials({ lang }: { lang: Lang }) {
  const t = translations[lang].testimonials;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="testimonials"
      className="section-shell"
      style={{ borderTop: "3px solid var(--border)" }}
    >
      <div className="section-content">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 60,
            flexWrap: "wrap",
            gap: 20,
          }}
          className="reveal"
        >
          <div>
            <div className="section-label">{t.label}</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              {t.title1}
              <br />
              <span style={{ color: "var(--accent)" }}>{t.title2}</span>
            </h2>
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              lang={lang}
              index={i}
            />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div
          style={{
            display: "none",
            position: "relative",
          }}
          className="testimonials-carousel"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard
                testimonial={testimonials[activeIndex]}
                lang={lang}
                index={activeIndex}
              />
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 28,
            }}
          >
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1,
                )
              }
              style={{
                width: 44,
                height: 44,
                background: "var(--accent)",
                border: `2px solid var(--border)`,
                boxShadow: "4px 4px 0 var(--border)",
                color: "#fff",
                fontSize: 20,
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Previous"
            >
              ‹
            </button>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    width: 12,
                    height: 12,
                    border: `2px solid var(--border)`,
                    background:
                      i === activeIndex ? "var(--accent)" : "var(--card-bg)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "background 0.2s",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === testimonials.length - 1 ? 0 : prev + 1,
                )
              }
              style={{
                width: 44,
                height: 44,
                background: "var(--accent2)",
                border: `2px solid var(--border)`,
                boxShadow: "4px 4px 0 var(--border)",
                color: "var(--bg)",
                fontSize: 20,
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: 60,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
          }}
        >
          {[
            { num: "5+", label: t.stat1 },
            { num: "100%", label: t.stat2 },
            { num: "5★", label: t.stat3 },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg3)",
                border: `3px solid var(--border)`,
                boxShadow: `5px 5px 0 var(--border)`,
                padding: "24px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4vw, 40px)",
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid {
            display: none !important;
          }
          .testimonials-carousel {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
