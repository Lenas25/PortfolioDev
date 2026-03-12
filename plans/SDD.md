# SDD — Portfolio Lena

**Software Design Document**  
Versión: 1.0 | Fecha: 2026-03-12 | Basado en: PRD v1.0

---

## 1. Arquitectura Actual

```
./
├── astro.config.mjs          # Astro config con integración React
├── package.json              # Astro 4 + React 18 + Framer Motion 11
├── tsconfig.json
├── public/
│   └── cv-lena.pdf
└── src/
    ├── pages/
    │   └── index.astro       # Shell: carga Layout + App (isla React)
    ├── layouts/
    │   └── Layout.astro      # HTML shell, fuentes, CSS global
    ├── components/           # Todos los componentes React
    │   ├── App.tsx           # Root: lang state + composición de secciones
    │   ├── Nav.tsx           # Navbar fija + theme + lang toggle
    │   ├── Hero.tsx          # Hero section
    │   ├── Marquee.tsx       # Ticker de skills
    │   ├── About.tsx         # About + stats
    │   ├── Skills.tsx        # Grid de categorías de skills
    │   ├── Projects.tsx      # Grid de proyectos + modal trigger
    │   ├── ProjectModal.tsx  # Modal overlay con detalles
    │   ├── Experience.tsx    # Timeline de experiencia
    │   └── Sections.tsx      # Toolbox + Contact + Footer
    ├── data/
    │   ├── i18n.ts           # Todas las traducciones ES/EN
    │   └── projects.ts       # Datos de proyectos tipados
    └── styles/
        └── global.css        # CSS variables, reset, utilidades, keyframes
```

**Patrón de hidratación:** `client:only="react"` en index.astro → 100% client-side React (SPA dentro de Astro shell)

---

## 2. Arquitectura Objetivo (v2.0)

```
src/
├── components/
│   ├── atoms/                # NUEVO: componentes atómicos reutilizables
│   │   ├── Tag.tsx           # Badge/tag de tecnología
│   │   ├── SectionHeader.tsx # Label + título de sección
│   │   ├── Card.tsx          # Card neobrutalist base
│   │   └── AnimatedSection.tsx # Wrapper con useInView de FM
│   ├── [componentes existentes refactorizados]
│   └── ...
├── data/
│   ├── i18n.ts
│   ├── projects.ts
│   └── constants.ts          # NUEVO: statusColors, statusLabels, tools list
├── hooks/                    # NUEVO
│   ├── useLenis.ts           # Instancia y configuración de Lenis
│   └── useReveal.ts          # Hook wrapper de useInView
├── styles/
│   └── global.css            # Extendido con focus-visible, reduced-motion
└── tests/                    # NUEVO
    ├── unit/
    │   ├── i18n.test.ts
    │   └── projects.test.ts
    ├── components/
    │   ├── Nav.test.tsx
    │   ├── Hero.test.tsx
    │   └── ProjectModal.test.tsx
    └── e2e/
        ├── navigation.spec.ts
        ├── theme-switch.spec.ts
        ├── lang-switch.spec.ts
        └── project-modal.spec.ts
```

---

## 3. Instalación de Dependencias

### 3.1 Nuevas dependencias (producción)

```bash
# Context7: Buscar docs de lenis con ID /darkroomco/lenis
npm install lenis

# Framer Motion ya está instalado (v11) — verificar que useInView esté disponible
# Context7: Buscar docs de framer-motion con ID /framer/motion
```

### 3.2 Dependencias de desarrollo / testing

```bash
# Context7: Buscar docs de vitest con ID /vitest-dev/vitest
npm install -D vitest @vitest/ui jsdom

# Context7: Buscar docs de testing-library con ID /testing-library/react-testing-library
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Context7: Buscar docs de playwright con ID /microsoft/playwright
npm install -D @playwright/test
npx playwright install chromium
```

### 3.3 Scripts en package.json

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

## 4. Implementación: Lenis Smooth Scroll

### 4.1 Hook: `src/hooks/useLenis.ts`

```typescript
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // No inicializar si el usuario prefiere movimiento reducido
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

### 4.2 Integración en App.tsx

```typescript
import { useLenis } from '../hooks/useLenis';

export default function App() {
  const [lang, setLang] = useState<Lang>('es');
  useLenis(); // Inicializa Lenis globalmente

  return (/* ... igual que antes ... */);
}
```

### 4.3 Exclusión del modal

El `ProjectModal` usa `document.body.style.overflow = 'hidden'` cuando está abierto.  
Lenis respeta esto automáticamente. Para el scroll interno del modal, asegurarse de que el contenedor del modal tenga `overflow-y: auto` y NO estar dentro del scope de Lenis.

### 4.4 Smooth scroll para anchor links

Lenis intercepta los clicks en `<a href="#section">` automáticamente.  
Configuración adicional en nav links: no es necesaria ninguna modificación — Lenis maneja el scroll suave a anchors.

---

## 5. Implementación: Framer Motion

### 5.1 Hook: `src/hooks/useReveal.ts`

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

### 5.2 Componente: `src/components/atoms/AnimatedSection.tsx`

```typescript
import { motion } from 'framer-motion';
import { useReveal } from '../../hooks/useReveal';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedSection({
  children, direction = 'up', delay = 0, className, style
}: Props) {
  const { ref, animate, initial, transition } = useReveal({ direction, delay });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
```

### 5.3 Variantes para Hero.tsx

```typescript
// Variantes de animación del Hero
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

// En Hero.tsx, reemplazar los divs con animation CSS por:
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={itemVariants}>
    {/* badge disponible */}
  </motion.div>
  <motion.h1 variants={itemVariants} className="glitch" data-text="Lena.">
    {/* título */}
  </motion.h1>
  {/* ... resto de items */}
</motion.div>
```

### 5.4 Marquee con Framer Motion

```typescript
// Reemplazar el div con animation CSS en Marquee.tsx
<motion.div
  animate={{ x: ['0%', '-50%'] }}
  transition={{
    duration: 18,
    ease: 'linear',
    repeat: Infinity,
  }}
  style={{ display: 'inline-flex' }}
>
  {doubled.map(/* ... */)}
</motion.div>
```

### 5.5 ProjectModal con AnimatePresence

```typescript
import { AnimatePresence, motion } from 'framer-motion';

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

// En ProjectModal.tsx — el div raíz se convierte en:
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
  // backdrop
>
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    // modal content
  >
```

### 5.6 Nav Mobile con AnimatePresence

```typescript
<AnimatePresence>
  {menuOpen && (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      // estilos del mobile menu
    >
```

### 5.7 Hover con whileHover

```typescript
// Reemplazar onMouseEnter/Leave en cards por:
<motion.div
  whileHover={{ x: -3, y: -3 }}
  // Para shadow cambio, usar variants o CSS custom property trick:
  style={{ boxShadow: '5px 5px 0 var(--accent)' }}
  // La shadow neobrutalist se puede animar con CSS transition normal
>
```

---

## 6. Constantes Compartidas: `src/data/constants.ts`

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

## 7. Configuración de Testing

### 7.1 `vitest.config.ts`

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

### 7.2 `src/tests/setup.ts`

```typescript
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock de matchMedia para tests
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

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock de Lenis para tests unitarios
vi.mock("lenis", () => ({
  default: vi.fn().mockImplementation(() => ({
    raf: vi.fn(),
    destroy: vi.fn(),
  })),
}));
```

### 7.3 Tests Unitarios

**`src/tests/unit/i18n.test.ts`**

```typescript
import { describe, it, expect } from "vitest";
import { translations } from "../../data/i18n";

describe("i18n translations", () => {
  it("should have both ES and EN translations", () => {
    expect(translations.es).toBeDefined();
    expect(translations.en).toBeDefined();
  });

  it("should have all required sections in both languages", () => {
    const sections = [
      "nav",
      "hero",
      "about",
      "skills",
      "projects",
      "experience",
      "toolbox",
      "contact",
      "footer",
    ];
    sections.forEach((section) => {
      expect(
        translations.es[section as keyof typeof translations.es],
      ).toBeDefined();
      expect(
        translations.en[section as keyof typeof translations.en],
      ).toBeDefined();
    });
  });

  it("should have same keys in ES and EN for hero section", () => {
    const esKeys = Object.keys(translations.es.hero).sort();
    const enKeys = Object.keys(translations.en.hero).sort();
    expect(esKeys).toEqual(enKeys);
  });
});
```

**`src/tests/unit/projects.test.ts`**

```typescript
import { describe, it, expect } from "vitest";
import { projects } from "../../data/projects";

describe("projects data", () => {
  it("should have at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project should have required fields", () => {
    projects.forEach((project) => {
      expect(project.id).toBeDefined();
      expect(project.title.en).toBeDefined();
      expect(project.title.es).toBeDefined();
      expect(project.stack).toBeInstanceOf(Array);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(["live", "freelance", "personal"]).toContain(project.status);
    });
  });

  it("project highlights should be arrays with at least 2 items", () => {
    projects.forEach((project) => {
      expect(project.highlights.en.length).toBeGreaterThanOrEqual(2);
      expect(project.highlights.es.length).toBeGreaterThanOrEqual(2);
    });
  });
});
```

### 7.4 Tests de Componentes

**`src/tests/components/Nav.test.tsx`**

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../../components/Nav';

describe('Nav component', () => {
  const defaultProps = {
    lang: 'es' as const,
    onLangChange: vi.fn(),
  };

  it('renders the logo', () => {
    render(<Nav {...defaultProps} />);
    expect(screen.getByText(/lena/i)).toBeInTheDocument();
  });

  it('renders lang toggle button', () => {
    render(<Nav {...defaultProps} />);
    expect(screen.getByTitle('Toggle language')).toBeInTheDocument();
  });

  it('calls onLangChange when lang toggle is clicked', () => {
    render(<Nav {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Toggle language'));
    expect(defaultProps.onLangChange).toHaveBeenCalledWith('en');
  });

  it('shows EN flag when lang is es', () => {
    render(<Nav {...defaultProps} />);
    expect(screen.getByTitle('Toggle language').textContent).toContain('EN');
  });
});
```

**`src/tests/components/ProjectModal.test.tsx`**

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectModal from '../../components/ProjectModal';
import { projects } from '../../data/projects';

describe('ProjectModal', () => {
  const onClose = vi.fn();

  it('renders null when project is null', () => {
    const { container } = render(
      <ProjectModal project={null} lang="es" onClose={onClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders project title when project is provided', () => {
    render(
      <ProjectModal project={projects[0]} lang="es" onClose={onClose} />
    );
    expect(screen.getByText(projects[0].title.es)).toBeInTheDocument();
  });

  it('calls onClose when Escape key is pressed', () => {
    render(
      <ProjectModal project={projects[0]} lang="es" onClose={onClose} />
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('shows tech stack tags', () => {
    render(
      <ProjectModal project={projects[0]} lang="es" onClose={onClose} />
    );
    projects[0].stack.forEach(tech => {
      expect(screen.getAllByText(tech).length).toBeGreaterThan(0);
    });
  });
});
```

### 7.5 Tests E2E con Playwright

**`playwright.config.ts`**

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
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
  },
});
```

**`src/tests/e2e/navigation.spec.ts`**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load homepage", async ({ page }) => {
    await expect(page).toHaveTitle(/Lena/i);
  });

  test("should navigate to about section on nav click", async ({ page }) => {
    await page.click('a[href="#about"]');
    await expect(page.locator("#about")).toBeVisible();
  });

  test("should navigate to projects section", async ({ page }) => {
    await page.click('a[href="#projects"]');
    await expect(page.locator("#projects")).toBeVisible();
  });

  test("scroll to top button in footer works", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.click('footer a[href="#hero"]');
    await expect(page.locator("#hero")).toBeVisible();
  });
});
```

**`src/tests/e2e/project-modal.spec.ts`**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Project Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#projects").scrollIntoViewIfNeeded();
  });

  test("opens modal when clicking a project card", async ({ page }) => {
    await page.locator('#projects [style*="cursor"]').first().click();
    await expect(
      page.locator('[role="dialog"], .modal, [data-modal]'),
    ).toBeVisible();
  });

  test("closes modal with Escape key", async ({ page }) => {
    await page.locator('#projects [style*="cursor"]').first().click();
    await page.keyboard.press("Escape");
    // Modal should be gone
    await expect(
      page.locator('[data-testid="modal-overlay"]'),
    ).not.toBeVisible();
  });
});
```

**`src/tests/e2e/theme-switch.spec.ts`**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Theme Switch", () => {
  test("toggles between dark and light theme", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");

    // Default is dark
    await expect(html).toHaveAttribute("data-theme", "dark");

    // Click theme toggle
    await page.click('[title="Toggle theme"]');
    await expect(html).toHaveAttribute("data-theme", "light");

    // Click again to go back to dark
    await page.click('[title="Toggle theme"]');
    await expect(html).toHaveAttribute("data-theme", "dark");
  });
});
```

**`src/tests/e2e/lang-switch.spec.ts`**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Language Switch", () => {
  test("switches from ES to EN", async ({ page }) => {
    await page.goto("/");

    // Default is ES — look for Spanish text
    await expect(page.locator("body")).toContainText(
      /Proyectos|Sobre mí|Habilidades/i,
    );

    // Switch to EN
    await page.click('[title="Toggle language"]');
    await expect(page.locator("body")).toContainText(/Projects|About|Skills/i);
  });
});
```

---

## 8. CSS: Accesibilidad y Reduced Motion

Agregar al final de `global.css`:

```css
/* ===== FOCUS VISIBLE ===== */
*:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .cursor,
  .cursor-follower {
    display: none !important;
  }
}

/* ===== POINTER: CURSOR CUSTOM SOLO EN POINTER FINE ===== */
@media (pointer: coarse) {
  body {
    cursor: auto !important;
  }
  .cursor,
  .cursor-follower {
    display: none !important;
  }
  * {
    cursor: auto !important;
  }
}
```

---

## 9. Layout.astro — Mejoras SEO

```astro
---
const title = "Lena — AI Engineer & Full Stack Developer";
const description = "Portfolio de Lena, AI Engineer y Full Stack Developer en Lima, Perú. Especialista en LangChain, Next.js, FastAPI y automatización con IA.";
const url = "https://lenasdev.com";
const ogImage = `${url}/og-image.png`;
---
<head>
  <!-- ... fuentes, CSS ... -->

  <!-- SEO -->
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
    "sameAs": [
      "https://github.com/",
      "https://linkedin.com/"
    ]
  })} />
</head>
```

---

## 10. Orden de Implementación Recomendado

```
1. Instalar dependencias: lenis, vitest, @testing-library/react, playwright
2. Configurar vitest.config.ts y playwright.config.ts
3. Crear src/tests/setup.ts
4. Crear src/data/constants.ts — extraer constantes duplicadas
5. Crear src/hooks/useLenis.ts — implementar hook
6. Integrar useLenis en App.tsx
7. Crear src/hooks/useReveal.ts
8. Crear AnimatedSection.tsx atom
9. Migrar Hero.tsx a Framer Motion (variantes + stagger)
10. Migrar Marquee.tsx a Framer Motion
11. Migrar reveals de todas las secciones (About, Skills, Projects, Experience, Sections)
12. Implementar AnimatePresence en ProjectModal
13. Implementar AnimatePresence en Nav mobile menu
14. Migrar whileHover en cards (About, Skills, Experience, Toolbox)
15. Actualizar global.css: focus-visible + reduced-motion + pointer
16. Actualizar Layout.astro: meta tags OG + Schema.org
17. Escribir tests unitarios (i18n, projects)
18. Escribir tests de componentes (Nav, ProjectModal, Hero)
19. Escribir tests E2E (navigation, modal, theme, lang)
20. Verificar tsc --strict sin errores
21. Audit Lighthouse
```
