# Animation Updates Plan

## Overview

This plan details the animation improvements needed in `/src` to match the reference `portfolio.html` animations.

## Analysis Summary

### Current State vs Reference

| Feature               | portfolio.html     | /src Current       | Status         |
| --------------------- | ------------------ | ------------------ | -------------- |
| Name glitch animation | Active on hover    | **Commented out**  | ❌ Needs fix   |
| BG Shape 1 float      | `8s ease-in-out`   | `8s ease-in-out`   | ✅ OK          |
| BG Shape 2 float      | `10s reverse`      | `11s reverse`      | ⚠️ Timing diff |
| BG Shape 3 spin       | `20s linear`       | `24s linear`       | ⚠️ Timing diff |
| Badge pulse           | `2s ease infinite` | `2s ease infinite` | ✅ OK          |
| Card dot pulse        | `2s ease infinite` | `2s ease infinite` | ✅ OK          |
| Scroll bounce         | `2s ease infinite` | `2s ease infinite` | ✅ OK          |
| Card hover effect     | `0.2s transition`  | `0.12s transition` | ⚠️ Timing diff |

---

## Changes Required

### 1. Enable Glitch Animation for Name

**File:** [`src/styles/global.css`](src/styles/global.css:295)

The glitch animation code exists but is **commented out** (lines 295-351). Need to uncomment it.

**Current state:**

```css
/* ===== GLITCH =====
.glitch {
   ...
}
*/
```

**Required action:** Uncomment lines 295-351 to enable:

- `.glitch` class with `::before` and `::after` pseudo-elements
- `@keyframes glitch1` animation
- `@keyframes glitch2` animation

The Hero.tsx already has the class applied:

```tsx
<span className="glitch name-highlight" data-text={t.title2}>
```

---

### 2. Adjust Background Shape Animation Timings

**File:** [`src/components/Hero.tsx`](src/components/Hero.tsx:44)

#### Shape 2 (Rectangle) - Line ~98

| Property           | Current | Should Be |
| ------------------ | ------- | --------- |
| Animation duration | `11s`   | `10s`     |

#### Shape 3 (Triangle) - Line ~146

| Property           | Current | Should Be |
| ------------------ | ------- | --------- |
| Animation duration | `24s`   | `20s`     |

---

### 3. Card Hover Transition Timing

**File:** [`src/styles/global.css`](src/styles/global.css:221)

The hover transition is slightly faster than reference:

| Property            | Current | Should Be |
| ------------------- | ------- | --------- |
| Transition duration | `0.12s` | `0.2s`    |

---

## Implementation Details

### Task 1: Uncomment Glitch Animation

**Location:** `src/styles/global.css` lines 295-351

Remove the `/*` at line 295 and `*/` at line 351 to enable:

```css
/* ===== GLITCH ===== */
<- Remove comment markers .glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.glitch:hover::before {
  animation: glitch1 0.3s steps(2, end);
  color: #ff2d7b;
  left: 3px;
  opacity: 0.7;
}
.glitch:hover::after {
  animation: glitch2 0.3s steps(2, end);
  color: #00bfff;
  left: -3px;
  opacity: 0.7;
}

@keyframes glitch1 {
  0% {
    clip-path: inset(0 0 95% 0);
  }
  33% {
    clip-path: inset(30% 0 50% 0);
  }
  66% {
    clip-path: inset(60% 0 10% 0);
  }
  100% {
    clip-path: inset(100% 0 0 0);
    opacity: 0;
  }
}
@keyframes glitch2 {
  0% {
    clip-path: inset(95% 0 0 0);
  }
  33% {
    clip-path: inset(50% 0 30% 0);
  }
  66% {
    clip-path: inset(10% 0 60% 0);
  }
  100% {
    clip-path: inset(0 0 100% 0);
    opacity: 0;
  }
}
```

### Task 2: Fix BG Shape Animation Timings

**Location:** `src/components/Hero.tsx`

**Shape 2 (around line 98):**

```tsx
// Change from:
animation: "float 11s ease-in-out infinite reverse",
// To:
animation: "float 10s ease-in-out infinite reverse",
```

**Shape 3 (around line 146):**

```tsx
// Change from:
animation: "spin 24s linear infinite",
// To:
animation: "spin 20s linear infinite",
```

### Task 3: Update Card Hover Timing

**Location:** `src/styles/global.css` lines 227-229

```css
/* Change from: */
transition:
  transform 0.12s ease,
  box-shadow 0.12s ease;

/* To: */
transition:
  transform 0.2s ease,
  box-shadow 0.2s ease;
```

---

## Visual Comparison

### Glitch Effect on Name

```
┌─────────────────────────────────────────┐
│  Normal State                           │
│  ┌─────────────────┐                    │
│  │     Lena.       │                    │
│  └─────────────────┘                    │
├─────────────────────────────────────────┤
│  Hover State                            │
│  ┌─────────────────┐                    │
│  │  █lena.   ← pink offset              │
│  │    Lena.   ← original                │
│  │   lena█   ← cyan offset              │
│  └─────────────────┘                    │
│  + clip-path animation creates glitch   │
└─────────────────────────────────────────┘
```

### Background Shapes Animation Flow

```
Shape 1 (Circle)    : float 8s  → up/down motion
Shape 2 (Rectangle) : float 10s → up/down motion (reverse)
Shape 3 (Triangle)  : spin 20s  → rotation
```

---

## Files to Modify

1. **[`src/styles/global.css`](src/styles/global.css)**
   - Uncomment glitch animation (lines 295-351)
   - Update card hover timing (lines 227-229)

2. **[`src/components/Hero.tsx`](src/components/Hero.tsx)**
   - Update Shape 2 animation: `11s` → `10s` (line ~98)
   - Update Shape 3 animation: `24s` → `20s` (line ~146)

---

## Testing Checklist

- [ ] Hover over "Lena" name - glitch effect should appear
- [ ] Background shapes animate smoothly
- [ ] Badge pulse animation visible
- [ ] Card dot pulse animation visible
- [ ] Scroll indicator bounces
- [ ] Cards lift and shadow expands on hover
- [ ] All animations respect `prefers-reduced-motion`
