import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Lang } from "../data/i18n";
import { translations } from "../data/i18n";

export default function Experience({ lang }: { lang: Lang }) {
  const t = translations[lang].experience;
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 30%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const experiences =
    lang === "en"
      ? [
          {
            period: "2025 — Present",
            role: "Cloud Computing Intern",
            company: "Internet Para Todos",
            mode: "Current",
            logo: "IPT",
            accent: "#ff5c41",
            desc: "Infrastructure administration and support for cloud environments, with monitoring and operational optimization focused on service reliability.",
            wins: [
              "Server infra support across public/private cloud contexts",
              "Capacity planning and SLA-oriented operations",
              "Cross-team optimization for incident response",
            ],
            tags: ["Cloud", "Monitoring", "SLA", "Ops"],
          },
          {
            period: "Apr 2024 — Jun 2024",
            role: "Full Stack Developer",
            company: "Freelance · Life Unity",
            mode: "Freelance",
            logo: "LU",
            accent: "#3b82f6",
            desc: "Built a productivity platform with client-server architecture to help users manage routines and improve nutrition outcomes.",
            wins: [
              "Implemented modular tasks and deliverables with SCRUM",
              "Connected React front end with Django REST backend",
              "Integrated Firebase, PostgreSQL, and JWT auth flows",
            ],
            tags: ["React", "Django", "PostgreSQL", "JWT", "Firebase"],
          },
          {
            period: "Sep 2024 — Dec 2024",
            role: "Full Stack Developer",
            company: "Freelance · Alejandra Academia",
            mode: "Freelance",
            logo: "AA",
            accent: "#22c55e",
            desc: "Developed an academy platform for courses and grades management, improving student follow-through and admin efficiency.",
            wins: [
              "Increased proactive completion by 45%",
              "Delivered React + Next.js + NestJS architecture",
              "Led product UX iterations with business goals",
            ],
            tags: ["Next.js", "NestJS", "TypeScript", "MySQL"],
          },
          {
            period: "Sep 2024",
            role: "AI Team Project",
            company: "Facial Recognition System",
            mode: "Team",
            logo: "AI",
            accent: "#facc15",
            desc: "Built an end-to-end facial recognition application using Python and DeepFace with cloud storage and compute-backed deployment.",
            wins: [
              "Integrated Python recognition pipeline with DeepFace",
              "Connected storage and compute services in GCP",
              "Packaged backend + interface workflow for demos",
            ],
            tags: ["Python", "DeepFace", "GCP", "Flask", "Kivy"],
          },
        ]
      : [
          {
            period: "Enero 2025 — Actual",
            role: "Practicante de Cloud Computing",
            company: "Internet Para Todos",
            mode: "En curso",
            logo: "IPT",
            accent: "#ff5c41",
            desc: "Administración y soporte de infraestructura en entornos cloud, con foco en disponibilidad, monitoreo y eficiencia operativa.",
            wins: [
              "Soporte de servidores en nube pública y privada",
              "Planificación de capacidad y operación por SLA",
              "Optimización colaborativa para tickets e incidentes",
            ],
            tags: ["Cloud", "Monitoreo", "SLA", "Ops"],
          },
          {
            period: "Abril 2024 — Junio 2024",
            role: "Full Stack Developer",
            company: "Freelance · Life Unity",
            mode: "Freelance",
            logo: "LU",
            accent: "#3b82f6",
            desc: "Desarrollé una plataforma de productividad con arquitectura cliente-servidor para organizar actividades y mejorar hábitos de nutrición.",
            wins: [
              "Implementación por tareas y entregables con SCRUM",
              "Integración React + backend Django REST",
              "Uso de Firebase, PostgreSQL y JWT en flujo productivo",
            ],
            tags: ["React", "Django", "PostgreSQL", "JWT", "Firebase"],
          },
          {
            period: "Septiembre 2024 — Diciembre 2024",
            role: "Full Stack Developer",
            company: "Freelance · Alejandra Academia",
            mode: "Freelance",
            logo: "AA",
            accent: "#22c55e",
            desc: "Construí una aplicación para gestión de cursos y notas, elevando la proactividad de los estudiantes y simplificando la operación académica.",
            wins: [
              "Aumento de proactividad del 45%",
              "Arquitectura con React, Next.js y NestJS",
              "Iteraciones de UX alineadas a objetivos de negocio",
            ],
            tags: ["Next.js", "NestJS", "TypeScript", "MySQL"],
          },
          {
            period: "Septiembre 2024",
            role: "Proyecto IA en equipo",
            company: "Sistema de reconocimiento facial",
            mode: "Team",
            logo: "IA",
            accent: "#facc15",
            desc: "Desarrollamos una aplicación de reconocimiento facial con Python y DeepFace, conectando almacenamiento y cómputo en la nube.",
            wins: [
              "Pipeline de reconocimiento con DeepFace",
              "Integración con servicios de storage y compute en GCP",
              "Flujo completo backend + interfaz para demos funcionales",
            ],
            tags: ["Python", "DeepFace", "GCP", "Flask", "Kivy"],
          },
        ];

  const side =
    lang === "en"
      ? {
          badge: "Junior but...",
          title: "What drives me",
          points: [
            "I started from zero, learning with limited resources and a lot of discipline",
            "My goal is bigger than code: build solutions that are useful for real people",
            "I want to create products people can actually use in daily life, not demos",
            "Being junior for me means hunger, purpose, and constant growth",
          ],
          now: "Learning now",
          nowItems: [
            "Advanced AI agents",
            "Cloud architecture (AWS/GCP)",
            "DevOps",
            "Digital Marketing",
            "ERPs and enterprise systems",
          ],
        }
      : {
          badge: "Junior pero...",
          title: "Lo que me mueve",
          points: [
            "Empecé desde cero, aprendiendo con pocos recursos y mucha disciplina",
            "Mi meta es más grande que programar: crear soluciones útiles para personas reales",
            "Quiero construir productos que la gente use todos los días, no solo demos técnicas",
            "Ser junior para mí significa hambre, propósito y mejora constante",
          ],
          now: "Aprendiendo ahora",
          nowItems: [
            "AI Agents avanzados",
            "Cloud (AWS/GCP)",
            "DevOps",
            "Marketing Digital",
            "ERPs y sistemas empresariales",
          ],
        };

  const education =
    lang === "en"
      ? [
          {
            title: "Software Engineering",
            place: "Universidad Tecnologica del Peru",
            period: "Mar 2021 — Present",
            location: "Lima, Peru",
            note: "Top 10 merit",
          },
          {
            title: "Full Stack Development Bootcamp",
            place: "Tecsup Institute",
            period: "Feb 2024 — Jun 2024",
            location: "Lima, Peru",
            note: "Intensive practical program",
          },
        ]
      : [
          {
            title: "Ingenieria de Software",
            place: "Universidad Tecnologica del Peru",
            period: "Marzo 2021 — Actual",
            location: "Lima, Peru",
            note: "Merito: Decimo superior",
          },
          {
            title: "Bootcamp Desarrollo Full Stack",
            place: "Instituto Tecsup",
            period: "Febrero 2024 — Junio 2024",
            location: "Lima, Peru",
            note: "Programa intensivo practico",
          },
        ];

  const certifications =
    lang === "en"
      ? [
          {
            name: "Backend Spring Boot",
            issuer: "Oracle Next Education",
            period: "Dec 2023 — 2024",
            location: "Lima, Peru",
          },
          {
            name: "Scrum Foundation Professional Certification (SFPC)",
            issuer: "CertiProf",
            period: "Dec 2024",
            location: "Lima, Peru",
          },
        ]
      : [
          {
            name: "BackEnd Spring Boot",
            issuer: "Oracle Next Education",
            period: "Diciembre 2023 — 2024",
            location: "Lima, Peru",
          },
          {
            name: "Scrum Foundation Professional Certification (SFPC)",
            issuer: "CertiProf",
            period: "Diciembre 2024",
            location: "Lima, Peru",
          },
        ];

  return (
    <section
      id="experience"
      className="section-shell experience-shell"
      style={{
        borderTop: "3px solid var(--border)",
      }}
    >
      <div className="section-content experience-content">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="experience-head"
        >
          <div className="section-label">{t.label}</div>
          <h2 className="section-title experience-title">
            {t.title1}
            <br />
            <span style={{ color: "var(--accent)" }}>{t.title2}</span>
          </h2>
        </motion.div>

        <div className="experience-layout">
          <div className="experience-main">
            <motion.div
              ref={timelineRef}
              className="experience-timeline"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="experience-line-progress"
                style={{ scaleY: lineScale }}
                aria-hidden="true"
              />
              {experiences.map((exp, i) => (
                <motion.article
                  key={`${exp.role}-${exp.period}`}
                  className="experience-item"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <span
                    className="experience-dot"
                    style={{ background: exp.accent }}
                    aria-hidden="true"
                  />
                  <div
                    className="experience-item-body"
                    style={{
                      borderColor: `color-mix(in srgb, ${exp.accent} 34%, var(--border))`,
                    }}
                  >
                    <motion.span
                      className="experience-step"
                      style={{
                        background: exp.accent,
                        color: "#0d0d0d",
                      }}
                      initial={{ scale: 0.9, opacity: 0.75 }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                        boxShadow: `0 0 0 2px #0d0d0d, 0 0 0 6px color-mix(in srgb, ${exp.accent} 42%, transparent)`,
                      }}
                      viewport={{ once: false, amount: 0.7 }}
                      transition={{ duration: 0.25 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    <div className="experience-item-head">
                      <div>
                        <p className="experience-period">{exp.period}</p>
                        <div className="experience-role-wrap">
                          <span
                            className="experience-logo"
                            style={{
                              borderColor: exp.accent,
                              color: exp.accent,
                            }}
                          >
                            {exp.logo}
                          </span>
                          <h3 className="experience-role">{exp.role}</h3>
                        </div>
                      </div>
                      <span
                        className="experience-mode"
                        style={{ background: exp.accent }}
                      >
                        {exp.mode}
                      </span>
                    </div>
                    <p className="experience-company">{exp.company}</p>
                    <p className="experience-desc">{exp.desc}</p>
                    <ul className="experience-wins">
                      {exp.wins.map((win) => (
                        <li key={win}>{win}</li>
                      ))}
                    </ul>
                    <div className="experience-tags">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="experience-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              className="journey-timeline"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.06 }}
            >
              <h3 className="journey-heading">
                {lang === "en" ? "Education" : "Educacion"}
              </h3>
              {education.map((item, i) => (
                <article key={item.title} className="journey-entry">
                  <span className="journey-dot" aria-hidden="true" />
                  <div className="journey-entry-body">
                    <motion.span
                      className="journey-step"
                      initial={{ scale: 0.9, opacity: 0.75 }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                        boxShadow:
                          "0 0 0 2px #0d0d0d, 0 0 0 6px color-mix(in srgb, var(--accent3) 42%, transparent)",
                      }}
                      viewport={{ once: false, amount: 0.7 }}
                      transition={{ duration: 0.25 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    <div className="journey-item-head">
                      <strong>{item.title}</strong>
                      <span>{item.location}</span>
                    </div>
                    <p>{item.place}</p>
                    <p className="journey-muted">{item.period}</p>
                    <p className="journey-note">{item.note}</p>
                  </div>
                </article>
              ))}

              <h3 className="journey-heading">
                {lang === "en" ? "Certifications" : "Certificaciones"}
              </h3>
              {certifications.map((item, i) => (
                <article key={item.name} className="journey-entry">
                  <span className="journey-dot" aria-hidden="true" />
                  <div className="journey-entry-body">
                    <motion.span
                      className="journey-step"
                      initial={{ scale: 0.9, opacity: 0.75 }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                        boxShadow:
                          "0 0 0 2px #0d0d0d, 0 0 0 6px color-mix(in srgb, var(--accent3) 42%, transparent)",
                      }}
                      viewport={{ once: false, amount: 0.7 }}
                      transition={{ duration: 0.25 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    <div className="journey-item-head">
                      <strong>{item.name}</strong>
                      <span>{item.location}</span>
                    </div>
                    <p>{item.issuer}</p>
                    <p className="journey-muted">{item.period}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="experience-aside">
            <motion.aside
              className="experience-card experience-card-dark"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
            >
              <span className="experience-card-badge">{side.badge}</span>
              <h3>{side.title}</h3>
              <ul>
                {side.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.aside>

            <motion.aside
              className="experience-card experience-card-light"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <h4>{side.now}</h4>
              <ul>
                {side.nowItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
