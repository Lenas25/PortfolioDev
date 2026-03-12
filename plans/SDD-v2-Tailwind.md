# SDD — Portfolio Lena v2.0 con Tailwind CSS

**Software Design Document**  
Versión: 2.0 | Fecha: 2026-03-12 | Basado en: PRD v1.0

---

## 1. Arquitectura Objetivo (v2.0 con Tailwind CSS)

```
./
├── astro.config.mjs          # Astro + React + Tailwind
├── package.json              # Dependencias completas
├── tsconfig.json
├── tailwind.config.mjs      # Configuración de Tailwind con themes
├── vitest.config.ts          # Configuración de tests
├── playwright.config.ts      # Configuración E2E
├── public/
│   └── cv-lena.pdf
└── src/
    ├── pages/
    │   └── index.astro       # Shell: carga Layout + App (isla React)
    ├── layouts/
    │   └── Layout.astro      # HTML shell, SEO tags, Schema.org
    ├── components/
    │   ├── App.tsx          # Root: lang state + Lenis + composición
    │   ├── Nav.tsx          # Navbar + AnimatePresence mobile
    │   ├── Hero.tsx         # Framer Motion variants + stagger
    │   ├── Marquee.tsx      # Framer Motion marquee
    │   ├── About.tsx        # Sections con useReveal
    │   ├── Skills.tsx
    │   ├── Projects.tsx     # + AnimatePresence modal trigger
    │   ├── ProjectModal.tsx # AnimatePresence + scale animation
    │   ├── Experience.tsx
    │   ├── Sections.tsx     # Toolbox + Contact + Footer
    │   └── atoms/
    │       ├── AnimatedSection.tsx
    │       ├── Tag.tsx
    │       ├── SectionHeader.tsx
    │       └── Card.tsx
    ├── data/
    │   ├── i18n.ts
    │   ├── projects.ts
    │   └── constants.ts     # STATUS_COLORS, STATUS_LABELS, TOOLS_LIST
    ├── hooks/
    │   ├── useLenis.ts      # Smooth scroll con RAF loop
    │   └── useReveal.ts     # useInView wrapper
    ├── styles/
    │   └── global.css       # Solo noise overlay + cursor + utilities
    └── tests/
        ├── setup.ts         # Mocks de matchMedia, localStorage, Lenis
        ├── unit/
        ├── components/
        └── e2e/
```

**Patrón de hidratación:** `client:only="react"` → 100% client-side React (SPA)

---

## 2. Tailwind CSS v4 con Astro

### 2.1 Instalación

```bash
npm install tailwindcss @tailwindcss/vite
```

### 2.2 Configuración astro.config.mjs

```javascript
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### 2.3 Configuración de Themes (Neobrutalist)

```javascript
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Toggle manual con .dark class
  theme: {
    extend: {
      colors: {
        // Dark theme (default)
        bg: 'var(--bg)',
        'bg-2': 'var(--bg2)',
        'bg-3': 'var(--bg3)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
        'card-bg': 'var(--card-bg)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent2)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'neo': '5px 5px 0 var(--border)',
        'neo-accent': '5px 5px 0 var(--accent)',
        'neo-hover': '8px 8px 0 var(--accent)',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'marquee': 'marquee 18s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'pulse': 'pulse 2s ease infinite',
        'bounce-slow': 'bounce 2s ease infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-24px)' },
        },
      },
    },
  },
  plugins: [],
}
```

### 2.4 CSS Base con Tailwind

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Noise overlay */
.noise {
  @apply fixed inset-0 z-[9000] pointer-events-none opacity-[0.022];
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Custom cursor */
.cursor {
  @apply w-3.5 h-3.5 bg-accent rounded-full fixed pointer-events-none z-[9999] mix-blend-difference;
  transform: translate(-50%, -50%);
}
.cursor-follower {
  @apply w-9 h-9 border-2 border-accent rounded-full fixed pointer-events-none z-[9998];
  transform: translate(-50%, -50%);
}

/* Focus visible */
*:focus-visible {
  @apply outline-3 outline-accent outline-offset-3;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Pointer coarse - no cursor custom */
@media (pointer: coarse) {
  .cursor, .cursor-follower { display: none !important; }
  body { cursor: auto !important; }
}
```

---

## 3. Constantes Compartidas: `src/data/constants.ts`

```typescript
import type { Lang } from "./i18n";

export const STATUS_COLORS: Record<string, string> = {
  live: "#22C55E",
  freelance: "var(--accent)",
  personal: "#60A5FA",
};

export const STATUS_LABELS: Record<string, Record<Lang, string>> = {
  live: { en: "Live", es: "En vivo" },
  freelance: { en: "Freelance", es: "Freelance" },
  personal: { en: "Personal", es: "Personal" },
};

export const TOOLS_LIST = [
  "🤖 Claude API",
  "⚡ LangGraph",
  "🔗 LangChain",
  "📄 LlamaIndex",
  "🐍 Pydantic AI",
  "🔄 N8N",
  "⚛️ React",
  "🔺 Next.js",
  "🚀 Astro",
  "🐦 Flutter",
  "🐍 FastAPI",
  "🏠 NestJS",
  "🐳 Docker",
  "☁️ GCP",
  "💙 Azure",
  "🗄️ PostgreSQL",
  "🔥 Firebase",
  "🎨 Figma",
  "🌲 Pinecone",
  "🤗 HuggingFace",
  "📦 Prisma",
  "🔑 Redis",
  "🔐 JWT",
  "📊 Chart.js",
] as const;

export const WHATSAPP_NUMBER = "51999999999";
export const PROJECT_GRID_COLS = [7, 5, 5, 7, 6, 6] as const;
```

---

## 4. Hooks

### 4.1 `src/hooks/useLenis.ts`

```typescript
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
```

### 4.2 `src/hooks/useReveal.ts`

```typescript
import { useInView } from "framer-motion";
import { useRef } from "react";

interface UseRevealOptions {
  direction?: "up" | "left" | "right";
  delay?: number;
  margin?: string;
}

export function useReveal({
  direction = "up",
  delay = 0,
  margin = "-80px",
}: UseRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 32 : 0,
    x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
  };

  const animate = isInView ? { opacity: 1, y: 0, x: 0 } : initial;

  const transition = {
    duration: 0.7,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94],
  };

  return { ref, animate, initial, transition };
}
```

---

## 5. Componentes Atómicos

### 5.1 `src/components/atoms/AnimatedSection.tsx`

```typescript
import { motion } from "framer-motion";
import { useReveal } from "../../hooks/useReveal";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: Props) {
  const { ref, animate, initial, transition } = useReveal({ direction, delay });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### 5.2 `src/components/atoms/Tag.tsx`

```typescript
interface Props {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Tag({ children, variant = "default", className = "" }: Props) {
  const base = "px-2.5 py-1 text-xs font-bold tracking-wider uppercase";
  const variants = {
    default: "bg-accent text-white border-2 border-border",
    outline: "border-2 border-border text-text-muted",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
```

---

## 6. Framer Motion - Animaciones

### 6.1 Hero con Variants + Stagger

```typescript
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// En el componente:
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>{/* badge */}</motion.div>
  <motion.h1 variants={itemVariants}>{/* título */}</motion.h1>
  {/* ... */}
</motion.div>
```

### 6.2 Marquee con Framer Motion

```typescript
<motion.div
  animate={{ x: ["0%", "-50%"] }}
  transition={{
    duration: 18,
    ease: "linear",
    repeat: Infinity,
  }}
  className="inline-flex"
>
  {/* contenido duplicado */}
</motion.div>
```

### 6.3 ProjectModal con AnimatePresence

```typescript
import { AnimatePresence, motion } from "framer-motion";

// En Projects.tsx:
<AnimatePresence>
  {activeProject && (
    <ProjectModal
      project={activeProject}
      lang={lang}
      onClose={() => setActiveProject(null)}
    />
  )}
</AnimatePresence>

// En ProjectModal.tsx:
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
  className="fixed inset-0 z-[1000] bg-night/88 backdrop-blur-sm flex items-center justify-center p-5"
>
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="bg-bg border-3 border-border shadow-[8px_8px_0_var(--accent)] w-full max-w-[800px] max-h-[90vh] overflow-y-auto"
  >
    {/* contenido del modal */}
  </motion.div>
</motion.div>
```

### 6.4 Nav Mobile con AnimatePresence

```typescript
import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence>
  {menuOpen && (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed top-[60px] left-0 right-0 bg-bg border-b-3 border-border p-6 flex flex-col gap-5 z-99"
    >
      {/* links */}
    </motion.div>
  )}
</AnimatePresence>
```

### 6.5 WhileHover en Cards

```typescript
// Reemplaza onMouseEnter/Leave con:
<motion.div
  whileHover={{ x: -3, y: -3 }}
  className="border-3 border-border bg-card-bg shadow-neo-accent"
>
```

---

## 7. SEO - Layout.astro

```astro
---
const title = "Lena — AI Engineer & Full Stack Developer";
const description = "Portfolio de Lena, AI Engineer y Full Stack Developer en Lima, Perú. Especialista en LangChain, Next.js, FastAPI y automatización con IA.";
const url = "https://lenasdev.com";
const ogImage = `${url}/og-image.png`;
---

<html lang="es" data-theme="dark" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="generator" content={Astro.generator} />
  
  <!-- SEO -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />
  
  <!-- OG -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  
  <!-- Schema.org -->
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lena",
    "jobTitle": "AI Engineer & Full Stack Developer",
    "url": url,
    "sameAs": ["https://github.com/", "https://linkedin.com/"]
  })} />
</head>
```

---

## 8. Testing

### 8.1 vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.ts",
    include: [
      "src/tests/unit/**/*.test.ts",
      "src/tests/components/**/*.test.tsx",
    ],
  },
});
```

### 8.2 playwright.config.ts

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
  },
});
```

### 8.3 src/tests/setup.ts

```typescript
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock Lenis
vi.mock("lenis", () => ({
  default: vi.fn().mockImplementation(() => ({
    raf: vi.fn(),
    destroy: vi.fn(),
  })),
}));
```

---

## 9. Scripts de package.json

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "typecheck": "tsc --noEmit --strict"
  }
}
```

---

## 10. Orden de Implementación

```
1. [DONE] Consultar Context7 para Tailwind v4
2. [PENDIENTE] Migrar archivos de guide/ a raíz
3. [PENDIENTE] Instalar dependencias: lenis, vitest, testing-library, playwright, tailwind
4. [PENDIENTE] Configurar Tailwind con Astro y dark mode
5. [PENDIENTE] Crear src/data/constants.ts
6. [PENDIENTE] Implementar useLenis.ts
7. [PENDIENTE] Integrar useLenis en App.tsx
8. [PENDIENTE] Implementar useReveal.ts
9. [PENDIENTE] Crear AnimatedSection.tsx
10. [PENDIENTE] Migrar Hero.tsx a Framer Motion
11. [PENDIENTE] Migrar Marquee.tsx a Framer Motion
12. [PENDIENTE] Implementar AnimatePresence en ProjectModal
13. [PENDIENTE] Implementar AnimatePresence en Nav mobile
14. [PENDIENTE] Migrar whileHover en cards
15. [PENDIENTE] Actualizar global.css: focus-visible + reduced-motion + pointer
16. [PENDIENTE] Actualizar Layout.astro: SEO tags
17. [PENDIENTE] Configurar tests (vitest, playwright)
18. [PENDIENTE] Escribir tests
19. [PENDIENTE] Verificar tsc --strict
20. [PENDIENTE] Build y verificación final
```
