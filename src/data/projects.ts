export interface Project {
  id: string;
  num: string;
  status: "live" | "freelance" | "personal";
  title: { en: string; es: string };
  shortDesc: { en: string; es: string };
  fullDesc: { en: string; es: string };
  highlights: { en: string[]; es: string[] };
  stack: string[];
  category: string[];
  links: {
    demo?: string;
    github?: string;
  };
  svgShape: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "inverzy",
    num: "01",
    status: "freelance",
    title: { en: "Inverzy — Financial SaaS", es: "Inverzy — SaaS Financiero" },
    shortDesc: {
      en: "Complete financial management SaaS with AI-powered executive briefs, WACC calculation, business canvas automation, and multi-format reports (CSV, PDF).",
      es: "SaaS completo de gestión financiera con briefs ejecutivos potenciados por IA, cálculo de WACC, automatización de canvas de negocio y reportes multi-formato (CSV, PDF).",
    },
    fullDesc: {
      en: "Inverzy is a monorepo full-featured financial SaaS platform built from scratch for a fintech client. The platform includes multi-tenant architecture, real-time dashboards, investment portfolio tracking, expense categorization with ML, and automated reporting. Key features include AI-generated executive briefs using Deepseek API (strategic analysis & business insights), automatic Business Canvas generation, WACC calculation engine for investment valuation, and multi-format report generation (CSV, PDF) with custom branding. Built as a monorepo architecture and deployed on GCP with CI/CD pipelines and Docker containerization.",
      es: "Inverzy es una plataforma SaaS financiera completa en monorepo construida desde cero para un cliente fintech. Incluye arquitectura multi-tenant, dashboards en tiempo real, seguimiento de portfolios, categorización de gastos con ML y reportes automatizados. Features clave: briefs ejecutivos generados por IA con Deepseek API (análisis estratégico e insights de negocio), generación automática de Canvas de Negocio, motor de cálculo WACC para valoración de inversiones, y generación de reportes multi-formato (CSV, PDF) con branding personalizado. Desplegado en GCP con pipelines CI/CD y containerización Docker.",
    },
    highlights: {
      en: [
        "AI executive briefs via Deepseek API with strategic analysis",
        "Automatic Business Canvas generation from financial data",
        "WACC calculation engine for investment valuation",
        "Multi-format reporting: CSV, PDF with custom branding",
        "Monorepo architecture with full CI/CD pipeline",
        "Multi-tenant SaaS with role-based access control",
        "Real-time investment portfolio tracking & dashboards",
        "Deployed on GCP with Docker containerization",
      ],
      es: [
        "Briefs ejecutivos con IA via Deepseek API con análisis estratégico",
        "Generación automática de Canvas de Negocio desde datos financieros",
        "Motor de cálculo WACC para valoración de inversiones",
        "Reportes multi-formato: CSV, PDF con branding personalizado",
        "Arquitectura monorepo con pipeline CI/CD completo",
        "SaaS multi-tenant con control de acceso basado en roles",
        "Seguimiento de portfolio e dashboards en tiempo real",
        "Desplegado en GCP con containerización Docker",
      ],
    },
    stack: [
      "Next.js",
      "NestJS",
      "Deepseek API",
      "PostgreSQL",
      "GCP",
      "Docker",
      "Prisma",
      "Redis",
      "TypeScript",
    ],
    category: ["SaaS", "AI", "Fintech"],
    links: { demo: "Proximamente", github: "Privado" },
    svgShape: `<circle cx="60" cy="60" r="50" stroke="currentColor" stroke-width="2" opacity="0.3"/>
      <path d="M30 60 L90 60 M60 30 L60 90" stroke="currentColor" stroke-width="2" opacity="0.5"/>
      <circle cx="60" cy="60" r="20" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <circle cx="60" cy="60" r="5" fill="currentColor"/>`,
    color: "#C41E5B",
  },
  {
    id: "kintsumind",
    num: "02",
    status: "freelance",
    title: {
      en: "KintsuMind — Therapy Practice Manager",
      es: "KintsuMind — Gestor de Consulta Terapéutica",
    },
    shortDesc: {
      en: "Full practice management platform for therapists built with brand identity co-creation. Appointment scheduling, session notes, email & WhatsApp reminders, client dashboard, income tracking, and SEO-optimized landing page + intranet.",
      es: "Plataforma completa de gestión de consulta para terapeutas con co-creación de identidad de marca. Agenda de citas, notas de sesión, recordatorios por email y WhatsApp, dashboard de cliente, seguimiento de ingresos, landing page optimizada y intranet.",
    },
    fullDesc: {
      en: "KintsuMind is a comprehensive web application built for a therapy practice. The project included collaborative brand identity design iterating with Claude AI (logo, color palette, messaging). Features include patient onboarding workflow, dual appointment management (first visit intake + follow-up sessions), appointment calendar with real-time sync, encrypted session notes, automated reminders via email and WhatsApp, client-facing dashboard with session history and progress, therapist intranet with income tracking and analytics, public landing page with SEO optimization, and all built with React + Astro for optimal performance and Tailwind CSS for design.",
      es: "KintsuMind es una aplicación web completa para una consulta terapéutica. El proyecto incluyó diseño colaborativo de identidad de marca iterando con Claude AI (logo, paleta de colores, mensajería). Incluye flujo de onboarding de pacientes, gestión dual de citas (evaluación de primera cita + sesiones de seguimiento), calendario con sincronización en tiempo real, notas de sesión cifradas, recordatorios automatizados por email y WhatsApp, dashboard para clientes con historial de sesiones y progreso, intranet para terapeutas con seguimiento de ingresos y analítica, landing page pública optimizada para SEO, todo construido con React + Astro y diseño con Tailwind CSS.",
    },
    highlights: {
      en: [
        "Collaborative brand identity design with Claude AI iteration",
        "Dual appointment management: intake + follow-up scheduling",
        "Automated reminders via email & WhatsApp",
        "Encrypted patient session notes with privacy controls",
        "Client-facing dashboard: session history & progress tracking",
        "Therapist intranet: income analytics & practice metrics",
        "SEO-optimized public landing page with Astro",
        "Responsive design with Tailwind CSS + React components",
      ],
      es: [
        "Identidad de marca colaborativa iterando con Claude AI",
        "Gestión dual de citas: evaluación inicial + sesiones de seguimiento",
        "Recordatorios automáticos por email y WhatsApp",
        "Notas de sesión cifradas con controles de privacidad",
        "Dashboard para clientes: historial de sesiones y seguimiento de progreso",
        "Intranet para terapeutas: analítica de ingresos y métricas",
        "Landing page optimizada para SEO con Astro",
        "Diseño responsive con Tailwind CSS + componentes React",
      ],
    },
    stack: [
      "React",
      "Astro",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
      "Twilio API",
    ],
    category: ["Healthcare", "Freelance", "Web App"],
    links: { github: "https://github.com/Nakea-Labs/Kintsu-Mind-Web-Page" },
    svgShape: `<rect x="10" y="10" width="80" height="80" stroke="currentColor" stroke-width="2" opacity="0.3"/>
      <rect x="30" y="30" width="40" height="40" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5"/>`,
    color: "#8B003B",
  },
  {
    id: "qhali",
    num: "03",
    status: "live",
    title: {
      en: "Qhali — Holistic Health App",
      es: "Qhali — App de Salud Integral",
    },
    shortDesc: {
      en: "Offline-first Flutter app for comprehensive personal health management. Daily tracking, medicine management, health events, document analysis, emergency contacts, and upcoming widget integration.",
      es: "App Flutter offline-first para gestión integral de salud personal. Seguimiento diario, gestión de medicinas, eventos de salud, análisis de documentos, contactos de emergencia e integración de widgets próximamente.",
    },
    fullDesc: {
      en: "Qhali is a comprehensive offline-first health management Flutter application. Built entirely offline-first architecture with Firebase sync, the app enables daily health tracking (in development), medicine management with reminders, health event logging, personalized health recommendations, document storage and analysis (extract insights, ask questions via AI chat or avatar), emergency contact management, and unified health dashboard. Coming soon: native widget integration and external device connectivity for wearables and health devices. Designed for users needing complete control of their health data with privacy-first approach.",
      es: "Qhali es una aplicación completa de gestión de salud offline-first con Flutter. Construida con arquitectura completamente offline-first con sincronización Firebase, permite seguimiento diario de salud (en desarrollo), gestión de medicinas con recordatorios, registro de eventos de salud, recomendaciones personalizadas, almacenamiento y análisis de documentos (extraer insights, hacer preguntas vía chat o avatar con IA), gestión de contactos de emergencia y dashboard unificado de salud. Próximamente: integración de widgets nativos y conectividad con dispositivos externos para wearables y dispositivos de salud.",
    },
    highlights: {
      en: [
        "Offline-first architecture with Firebase sync for data persistence",
        "Daily health tracking (in development) with visual history",
        "Medicine management with automated reminders",
        "Health event logging and personalized recommendations",
        "Document storage & AI analysis: extract insights or ask questions",
        "AI chat companion and avatar for health guidance",
        "Emergency contact management and alerts",
        "Coming soon: native widgets and external device integration",
      ],
      es: [
        "Arquitectura offline-first con sincronización Firebase",
        "Seguimiento diario de salud con historial visual (en desarrollo)",
        "Gestión de medicinas con recordatorios automatizados",
        "Registro de eventos y recomendaciones personalizadas",
        "Almacenamiento de documentos y análisis con IA: extraer insights preguntar",
        "Compañero chat IA y avatar para orientación de salud",
        "Gestión de contactos de emergencia y alertas",
        "Próximamente: widgets nativos e integración de dispositivos externos",
      ],
    },
    stack: ["Flutter", "Dart", "Firebase", "PostgreSQL"],
    category: ["Mobile", "Healthcare"],
    links: { github: "https://github.com/Lenas25/Qhali", demo: "Proximamente" },
    svgShape: `<polygon points="50,5 95,95 5,95" stroke="currentColor" stroke-width="2" opacity="0.3"/>
      <polygon points="50,30 80,85 20,85" stroke="currentColor" stroke-width="2" opacity="0.4"/>`,
    color: "#FF2D7B",
  },
  {
    id: "agrolens",
    num: "04",
    status: "live",
    title: {
      en: "AgroLens — Disease Prediction App",
      es: "AgroLens — App de Predicción de Enfermedades",
    },
    shortDesc: {
      en: "Flutter mobile app using computer vision to detect diseases in mango crops, built for small farmers in Casma, Peru. Offline-first with ML on-device.",
      es: "App móvil Flutter con visión computacional para detectar enfermedades en cultivos de mango, para agricultores de Casma, Perú. Offline-first con ML en dispositivo.",
    },
    fullDesc: {
      en: "MangoAI is a Flutter mobile application built for small and medium mango farmers in Casma, Peru. Users can photograph mango leaves or fruits and the app detects diseases in real-time using a TensorFlow Lite model running entirely on-device — no internet required. The app also provides treatment recommendations, disease history, crop management tips, and connects farmers to agronomy resources. Designed for low-end Android devices with minimal data usage.",
      es: "MangoAI es una aplicación Flutter para agricultores medianos de mango en Casma, Perú. Los usuarios fotografían hojas o frutos y la app detecta enfermedades en tiempo real con un modelo TensorFlow Lite que corre completamente en dispositivo — sin internet. También provee recomendaciones de tratamiento, historial de enfermedades, consejos de gestión del cultivo y conecta a los agricultores con recursos de agronomía. Diseñada para dispositivos Android de gama baja.",
    },
    highlights: {
      en: [
        "On-device disease detection with TensorFlow Lite (no internet needed)",
        "Camera integration with real-time inference overlay",
        "92%+ accuracy on trained disease classes",
        "Offline-first architecture for rural connectivity",
        "Treatment recommendations database",
        "Designed for low-end Android devices",
      ],
      es: [
        "Detección de enfermedades en dispositivo con TensorFlow Lite (sin internet)",
        "Integración de cámara con inferencia en tiempo real",
        "+92% de precisión en las clases de enfermedades entrenadas",
        "Arquitectura offline-first para conectividad rural",
        "Base de datos de recomendaciones de tratamiento",
        "Diseñada para dispositivos Android de gama baja",
      ],
    },
    stack: [
      "Flutter",
      "Dart",
      "TensorFlow Lite",
      "FastAPI",
      "Python",
      "Firebase",
    ],
    category: ["Mobile", "AI/ML", "Agriculture"],
    links: {
      github: "https://github.com/Lenas25/AgroLens",
      demo: "Proximamente",
    },
    svgShape: `<circle cx="65" cy="65" r="55" stroke="currentColor" stroke-width="2" opacity="0.2"/>
      <path d="M20 65 Q65 10 110 65 Q65 120 20 65" stroke="currentColor" stroke-width="2" fill="none" opacity="0.4"/>
      <circle cx="65" cy="65" r="10" fill="currentColor" opacity="0.3"/>`,
    color: "#C41E5B",
  },
  {
    id: "alejandra-academia",
    num: "05",
    status: "freelance",
    title: {
      en: "Alejandra Academia — Spa Management",
      es: "Alejandra Academia — Gestión de Spa",
    },
    shortDesc: {
      en: "Complete academic management system for a spa academy. Course management, student dashboard, admin panel with landing page generator, grades, sessions, and CSV/PDF reporting.",
      es: "Sistema completo de gestión académica para academia de spa. Gestión de cursos, panel de estudiantes, panel de administrador con generador de landing page, calificaciones, sesiones y reportes CSV/PDF.",
    },
    fullDesc: {
      en: "Alejandra Academia is a comprehensive management system for a spa academy built with Next.js and NestJS. Features include course management with landing pages generated from the admin panel to showcase services, student dashboard for tracking progress, admin panel for managing all operations, automatic grade calculation and student rankings, session tracking and scheduling, and comprehensive data export (CSV and PDF) of student records. The system also includes an analytics dashboard with visual charts and metrics. Built on a similar architecture to an undergraduate/postgraduate academy system with automatic computation of grades, rankings, session management, and import/export capabilities. Deployed on Vercel and Railway.",
      es: "Alejandra Academia es un sistema de gestión completo para una academia de spa construido con Next.js y NestJS. Incluye gestión de cursos con landing pages generadas desde el panel del administrador para mostrar servicios, panel de estudiantes para seguimiento de progreso, panel de administrador para gestionar todas las operaciones, cálculo automático de calificaciones y rankings de estudiantes, gestión y programación de sesiones, y exportación completa de datos (CSV y PDF) de registros de estudiantes. También incluye dashboard de analítica con gráficos y métricas visuales. Construido con arquitectura similar a un sistema de academia de pregrado/postgrado con cálculo automático de notas, rankings, gestión de sesiones e importación/exportación. Desplegado en Vercel y Railway.",
    },
    highlights: {
      en: [
        "Course management with dynamic landing page generation",
        "Admin panel to showcase services and manage courses",
        "Student dashboard with progress tracking",
        "Automatic grade calculation and student ranking system",
        "Session management and scheduling",
        "CSV and PDF export of complete student records",
        "Analytics dashboard with visual charts and metrics",
        "Deployed on Vercel (frontend) and Railway (backend)",
      ],
      es: [
        "Gestión de cursos con generación dinámica de landing pages",
        "Panel de administrador para mostrar servicios y gestionar cursos",
        "Dashboard de estudiantes con seguimiento de progreso",
        "Cálculo automático de calificaciones y sistema de rankings",
        "Gestión y programación de sesiones",
        "Exportación en CSV y PDF de registros completos de estudiantes",
        "Dashboard de analítica con gráficos y métricas visuales",
        "Desplegado en Vercel (frontend) y Railway (backend)",
      ],
    },
    stack: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Vercel",
      "Railway",
      "Tailwind CSS",
      "TypeScript",
    ],
    category: ["Education", "SaaS", "Web App"],
    links: { demo: "https://alejandracademia.com/", github: "Privado" },
    svgShape: `<line x1="10" y1="90" x2="30" y2="40" stroke="currentColor" stroke-width="3" opacity="0.4"/>
      <line x1="30" y1="40" x2="50" y2="65" stroke="currentColor" stroke-width="3" opacity="0.4"/>
      <line x1="50" y1="65" x2="70" y2="25" stroke="currentColor" stroke-width="3" opacity="0.4"/>
      <line x1="70" y1="25" x2="90" y2="50" stroke="currentColor" stroke-width="3" opacity="0.4"/>`,
    color: "#8B003B",
  },
  {
    id: "grown-home",
    num: "06",
    status: "freelance",
    title: {
      en: "Grown Home — Entrepreneurship Marketplace",
      es: "Grown Home — Marketplace de Emprendimiento",
    },
    shortDesc: {
      en: "Full-featured marketplace platform for buying/selling or exchanging entrepreneurship products in the US. Real-time chat, listings management, and custom UI.",
      es: "Plataforma marketplace completa para comprar, vender o intercambiar productos de emprendimiento en EE.UU. Chat en tiempo real, gestión de listings y UI personalizada.",
    },
    fullDesc: {
      en: "Grown Home is a comprehensive marketplace platform built for entrepreneurs in the United States. The app enables users to list, manage, buy, and sell (or exchange) entrepreneurship-related products. Core features include Google authentication for seamless onboarding, custom-designed user interface optimized for product discovery, real-time chat messaging powered by WebSockets for instant buyer-seller communication, complete listings management (create, edit, publish, manage inventory), client/vendor dashboard with analytics, and a smooth transaction flow. Built with Next.js and Firebase for scalability and reliability.",
      es: "Grown Home es una plataforma marketplace completa para emprendedores en Estados Unidos. La app permite a los usuarios crear, gestionar, comprar y vender (o intercambiar) productos relacionados con emprendimiento. Features principales incluyen autenticación Google para onboarding fluido, interfaz personalizada optimizada para descubrimiento de productos, chat en tiempo real con WebSockets para comunicación instantánea entre compradores y vendedores, gestión completa de listings (crear, editar, publicar, gestionar inventario), dashboard para clientes y vendedores con analítica, y flujo de transacción suave. Construido con Next.js y Firebase.",
    },
    highlights: {
      en: [
        "Google authentication for seamless user onboarding",
        "Real-time chat with WebSockets for instant messaging",
        "Complete listings management: create, edit, publish, inventory",
        "Custom UI/UX optimized for product discovery",
        "Buyer & seller dashboards with metrics",
        "Support for sales and peer-to-peer exchanges",
        "Firebase backend for scalability and real-time sync",
        "Designed for US entrepreneurship market",
      ],
      es: [
        "Autenticación Google para onboarding fluido",
        "Chat en tiempo real con WebSockets para mensajería instantánea",
        "Gestión completa de listings: crear, editar, publicar, inventario",
        "UI/UX personalizada optimizada para descubrimiento de productos",
        "Dashboards para compradores y vendedores con métricas",
        "Soporte para ventas e intercambios peer-to-peer",
        "Backend Firebase para escalabilidad y sincronización en tiempo real",
        "Diseñado para el mercado de emprendimiento de EE.UU.",
      ],
    },
    stack: ["Next.js", "Firebase", "WebSockets", "Google Auth", "TypeScript"],
    category: ["Marketplace", "SaaS", "Web App"],
    links: { demo: "Proximamente", github: "Privado" },
    svgShape: `<rect x="15" y="15" width="30" height="30" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <rect x="55" y="15" width="30" height="30" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <rect x="15" y="55" width="30" height="30" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <rect x="55" y="55" width="30" height="30" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.3"/>`,
    color: "#FF2D7B",
  },
  {
    id: "decor-master-clean",
    num: "07",
    status: "freelance",
    title: {
      en: "Decor Master Clean — Landing Page",
      es: "Decor Master Clean — Landing Page",
    },
    shortDesc: {
      en: "Custom landing page for cleaning services with conversion optimization. 65% sales increase achieved. Google Analytics, social media integration, and lead capture via email/WhatsApp.",
      es: "Landing page personalizada para servicios de limpieza con optimización de conversión. 65% de aumento en ventas. Google Analytics, integración de redes sociales y captura de leads por email/WhatsApp.",
    },
    fullDesc: {
      en: "Decor Clean Home is a fully custom landing page designed in Figma and built with Framer for a cleaning services business. The project achieved a 65% increase in sales compared to their previous non-digital presence. Features include fully personalized design optimized for conversion, Google Analytics integration for tracking visitor behavior and conversion metrics, social media link assignments, email and WhatsApp lead capture forms, call-to-action optimization, and seamless integration for customer acquisition. The page focuses on service showcase, testimonials, and streamlined contact options.",
      es: "Decor Clean Home es una landing page totalmente personalizada diseñada en Figma y construida con Framer para un negocio de servicios de limpieza. El proyecto logró un aumento del 65% en ventas comparado con su ausencia digital anterior. Incluye diseño completamente personalizado optimizado para conversión, integración de Google Analytics para rastrear comportamiento de visitantes y métricas de conversión, asignación de enlaces de redes sociales, formularios de captura de leads por email y WhatsApp, optimización de llamadas a la acción, e integración fluida para adquisición de clientes. La página se enfoca en mostrar servicios, testimonios y opciones de contacto simplificadas.",
    },
    highlights: {
      en: [
        "Fully custom design created in Figma",
        "Built with Framer for smooth interactions",
        "65% sales increase from digital launch",
        "Google Analytics integration for conversion tracking",
        "Social media link assignments and CTAs",
        "Email and WhatsApp lead capture forms",
        "Optimized for mobile and desktop",
        "Service showcase with testimonials and reviews",
      ],
      es: [
        "Diseño completamente personalizado en Figma",
        "Construido con Framer para interacciones suaves",
        "+65% de aumento en ventas desde lanzamiento digital",
        "Integración de Google Analytics para seguimiento de conversiones",
        "Asignación de enlaces de redes sociales y CTAs",
        "Formularios de captura de leads por email y WhatsApp",
        "Optimizado para móvil y escritorio",
        "Muestra de servicios con testimonios y reseñas",
      ],
    },
    stack: ["Framer", "Figma", "Google Analytics", "HTML/CSS"],
    category: ["Landing Page", "Web Design", "Conversions"],
    links: { demo: "https://www.decormasterclean.com/", github: "Privado" },
    svgShape: `<rect x="15" y="15" width="70" height="70" stroke="currentColor" stroke-width="2" opacity="0.3"/>
      <path d="M35 50 Q50 35 65 50" stroke="currentColor" stroke-width="2" fill="none" opacity="0.4"/>
      <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="70" cy="30" r="3" fill="currentColor" opacity="0.5"/>`,
    color: "#C41E5B",
  },
];
