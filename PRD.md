# PRD — Portfolio Lena

**Product Requirements Document**  
Versión: 1.0 | Fecha: 2026-03-12 | Estado: Activo

---

## 1. Visión General

**Nombre del producto:** portfolio-lena  
**Tipo:** Portfolio web personal — sitio estático de alta performance  
**Stack base:** Astro 4 + React 18 + TypeScript  
**Propietaria:** Lena (AI Engineer & Full Stack Developer, Lima - Perú)  
**Propósito:** Showcase profesional que genere leads de clientes freelance, demuestre capacidad técnica y refleje el estilo visual distintivo de Lena (brutalist-neobrutalist, dark/light mode, bilingüe ES/EN).

---

## 2. Problema y Motivación

El código actual funciona pero presenta las siguientes oportunidades de mejora:

| Área          | Problema actual                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------- |
| Scroll        | Scroll nativo sin suavidad; los saltos de sección son bruscos                                      |
| Animaciones   | Framer Motion ya está instalado pero **no se usa** — las animaciones son CSS puro sin orquestación |
| Rendimiento   | Inline styles en todos los componentes (dificulta cache, mantenimiento y temas)                    |
| Accesibilidad | `cursor: none` aplicado globalmente sin fallback táctil/a11y                                       |
| Testing       | Sin tests — ni unitarios, de integración, ni visuales                                              |
| Reveals       | Implementación manual con IntersectionObserver en CSS; no aprovecha Framer Motion's `useInView`    |
| Marquee       | CSS `animation` manual; no usa library probada                                                     |
| Mobile nav    | Estado de menú con bugs potenciales; hamburger sin animación                                       |
| SEO           | Sin meta OG tags dinámicas por sección                                                             |
| Tipado        | Algunas interfaces duplicadas entre componentes (statusColors, statusLabels)                       |

---

## 3. Usuarios Objetivo

**Primario:** Reclutadores y founders/CTOs de startups buscando AI Engineers freelance  
**Secundario:** Clientes de agencias buscando Full Stack + IA  
**Terciario:** Comunidad dev (referrals, networking)

**Idiomas:** ES (default) / EN — toggle en navbar

---

## 4. Alcance v2.0

### 4.1 In Scope

#### 4.1.1 Scroll Suavizado con Lenis

- Integrar **Lenis** para smooth scroll global
- Configuración: `duration: 1.2`, `easing: expo`, `wheelMultiplier: 0.8`
- Sincronizar Lenis con Framer Motion's scroll tracking (`useScroll`)
- Lenis debe desactivarse en mobile (prefers-reduced-motion)
- El scroll del modal de proyectos debe ser nativo (excluir del Lenis scope)

#### 4.1.2 Animaciones con Framer Motion

Migrar las animaciones CSS manuales a Framer Motion:

**Hero:**

- `motion.div` con `initial/animate` para entrada del título (`y: 40 → 0, opacity: 0 → 1`)
- Stagger de 0.1s entre badge, título, subtitle, desc y CTAs
- Floating cards con `animate={{ y: [0, -8, 0] }}` loop

**Sections (Reveal):**

- Hook `useInView` de Framer Motion reemplaza la clase `.reveal`
- Variantes: `hidden: { opacity: 0, y: 32 }` → `visible: { opacity: 1, y: 0 }`
- `viewport: { once: true, margin: "-80px" }`

**Marquee:**

- Reemplazar CSS animation por Framer Motion `animate={{ x: [0, "-50%"] }}` con `repeat: Infinity, ease: "linear"`

**Nav:**

- Framer Motion `AnimatePresence` para el mobile menu
- Slide down `y: -20 → 0` con `opacity`

**Proyectos:**

- Cards con stagger `delayChildren: 0.05 * index`
- Modal con `AnimatePresence` + `scale: 0.95 → 1` + backdrop fade

**Hover micro-interactions:**

- Convertir los `onMouseEnter/Leave` inline styles a `whileHover` de Framer Motion
- Mantener el estilo neobrutalist: `translate(-3px, -3px)` → `x: -3, y: -3`

#### 4.1.3 Buenas Prácticas de Código

- Extraer constantes duplicadas (`statusColors`, `statusLabels`) a `src/data/constants.ts`
- Crear componentes atómicos: `<Tag>`, `<SectionHeader>`, `<Card>`, `<AnimatedSection>`
- Mover todos los `<style>` inlined a `global.css` o módulos CSS (o Tailwind si se migra)
- Reemplazar `dangerouslySetInnerHTML` en About.tsx con un componente `<HighlightText>`
- Tipado estricto: no usar `as HTMLElement` — usar `e.currentTarget` directamente con tipos correctos

#### 4.1.4 Accesibilidad

- Agregar `prefers-reduced-motion` media query para desactivar animaciones
- Cursor custom solo si no es dispositivo táctil (`pointer: fine` media query)
- ARIA labels en botones icon-only (hamburger, theme toggle)
- `focus-visible` styles en todos los elementos interactivos

#### 4.1.5 SEO

- Meta tags OG en `Layout.astro`: `og:title`, `og:description`, `og:image`, `og:url`
- `<link rel="canonical">`
- Schema.org JSON-LD: `Person` + `WebPage`

#### 4.1.6 Performance

- `loading="lazy"` en imágenes (cuando se agreguen)
- Separar datos de i18n en imports dinámicos
- Verificar que Astro genere 0 JS innecesario (islands architecture)

### 4.2 Out of Scope v2.0

- Backend / CMS / base de datos
- Blog
- Sistema de autenticación
- Analytics avanzado (GA, Mixpanel)
- PWA / Service Workers

---

## 5. Requisitos Funcionales

### RF-01: Smooth Scroll

- **Dado** que el usuario hace scroll en el sitio
- **Cuando** se desplaza con rueda, trackpad o teclado
- **Entonces** el scroll debe ser suavizado por Lenis con easing natural

### RF-02: Navegación anclada suave

- **Dado** que el usuario hace clic en un link de la nav (ej. #about)
- **Cuando** navega desde cualquier sección
- **Entonces** Lenis lleva la vista a la sección con animación fluida

### RF-03: Reveal al hacer scroll

- **Dado** que el usuario scrollea hacia una sección
- **Cuando** el elemento entra al viewport (con margin de -80px)
- **Entonces** anima con `opacity 0→1, y 32→0` una sola vez

### RF-04: Modal de proyecto accesible

- **Dado** que el usuario abre un ProjectModal
- **Cuando** está abierto
- **Entonces**: scroll interno nativo (no Lenis), cierre con Escape, cierre con click en backdrop, foco trapped dentro del modal

### RF-05: Switch de idioma reactivo

- **Dado** que el usuario cambia de ES a EN (o viceversa)
- **Cuando** cambia el lang state en App.tsx
- **Entonces** todos los textos del sitio se actualizan sin recarga de página

### RF-06: Dark/Light theme persistente

- **Dado** que el usuario cambia el tema
- **Cuando** recarga la página
- **Entonces** el tema persiste gracias a `localStorage`

---

## 6. Requisitos No Funcionales

| ID     | Requisito                  | Métrica objetivo         |
| ------ | -------------------------- | ------------------------ |
| RNF-01 | Performance (Lighthouse)   | Score ≥ 90 en mobile     |
| RNF-02 | First Contentful Paint     | < 1.5s                   |
| RNF-03 | Cumulative Layout Shift    | < 0.1                    |
| RNF-04 | Accesibilidad (Lighthouse) | Score ≥ 90               |
| RNF-05 | Bundle JS client           | < 150KB gzipped          |
| RNF-06 | TypeScript strict          | 0 errores `tsc --strict` |

---

## 7. Diseño Visual — Design Tokens

El sistema visual debe mantenerse fiel al estilo actual:

```
Estilo: Neobrutalist dark-first
Colores accent: #FF2D7B (dark) / #C41E5B (light)
Borders: 3px solid — esquinas rectas (0 border-radius en cards)
Shadows: offset 5px/8px estilo "sticker"
Fuentes: Syne (display) + Nunito (body)
Cursor: custom dot + follower (solo desktop)
Noise overlay: opacity 0.022 (mantener)
```

---

## 8. Testing Requirements

Ver SDD sección Testing para detalles de implementación.

| Tipo      | Herramienta              | Cobertura objetivo              |
| --------- | ------------------------ | ------------------------------- |
| Unit      | Vitest                   | Lógica de datos: i18n, projects |
| Component | Vitest + Testing Library | Componentes críticos            |
| E2E       | Playwright               | Flujos principales              |
| Visual    | Playwright screenshots   | Regresión visual                |

---

## 9. Criterios de Aceptación

- [ ] Lenis instalado y smooth scroll activo globalmente
- [ ] Framer Motion reemplaza todas las animaciones CSS del Hero
- [ ] `useInView` de Framer Motion reemplaza la clase `.reveal`
- [ ] Modal de proyectos con `AnimatePresence`
- [ ] `tsc --strict` sin errores
- [ ] Suite de tests pasando (Vitest + Playwright)
- [ ] Lighthouse mobile ≥ 90 en Performance y Accesibilidad
- [ ] `prefers-reduced-motion` desactiva animaciones
- [ ] README actualizado con instrucciones de desarrollo y testing

---

## 10. Prioridades

```
P0 (crítico):   Lenis + Framer Motion Hero + Framer Motion Reveals
P1 (alto):      AnimatePresence modal + Nav mobile animado
P2 (medio):     Refactor constantes + componentes atómicos
P3 (bajo):      SEO meta tags + Schema.org
```
