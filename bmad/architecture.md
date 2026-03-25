---
stepsCompleted: [init, context, starter, decisions, patterns, structure, validation, complete]
inputDocuments: [product-brief.md, prd.md, ux-design.md, src/]
workflowType: architecture
project_name: shtek-website-redesign
author: Winston (architect)
date: 2026-03-25
version: 1.0
status: Ready for Epics & Stories
---

# Architecture Decision Document — Shtek Website Redesign

**Author:** Winston — Architect  
**Date:** 2026-03-25  
**Version:** 1.0  
**Status:** Ready for Epics & Stories

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Decisions](#2-technology-decisions)
3. [Component Architecture](#3-component-architecture)
4. [File Structure](#4-file-structure)
5. [Responsive Strategy](#5-responsive-strategy)
6. [Performance Budget](#6-performance-budget)
7. [SEO Strategy](#7-seo-strategy)
8. [Deployment](#8-deployment)
9. [Migration Plan](#9-migration-plan)
10. [Coding Standards](#10-coding-standards)

---

## 1. Architecture Overview

### 1.1 System Context

Shtek Website is a **single-page marketing site** (SPA) whose sole purpose is converting visitors to app.shtek.me signups. It has no backend, no authentication, no dynamic data fetching. It is a static React application built with Vite and deployed as pre-built HTML/CSS/JS assets.

```
┌──────────────────────────────────────────────────────────┐
│                     shtek.me (this project)              │
│                                                          │
│  React 19 SPA → Vite 6 build → Static HTML/CSS/JS       │
│                                                          │
│  Sections: Navbar → Hero → TrustBar → Features →         │
│  HowItWorks → Testimonials → IdealLifePromo → Pricing → │
│  FAQ → About → Privacy → Manifesto → FinalCTA → Footer   │
│                                                          │
│  All CTAs → https://app.shtek.me/?utm_*                  │
└──────────────────────────────────────────────────────────┘
```

### 1.2 Key Architectural Characteristics

| Characteristic | Priority | Rationale |
|---|---|---|
| **Performance** | P0 | Mobile-first audience on variable Balkan networks; Lighthouse ≥ 90 |
| **Maintainability** | P0 | AI agents will implement — must be unambiguous, well-structured |
| **Simplicity** | P0 | Marketing site, not an app — no over-engineering |
| **Accessibility** | P1 | WCAG 2.1 AA — financial trust requires inclusive design |
| **SEO** | P1 | Organic discovery for "finance app Serbia" queries |

### 1.3 Build Pipeline

```
Source (src/) → Vite 6 Build → dist/
                  ├── index.html (single page)
                  ├── assets/
                  │   ├── index-[hash].js    (bundled JS)
                  │   ├── index-[hash].css   (bundled CSS)
                  │   └── *.webp             (optimized images)
                  ├── sitemap.xml            (copied from public/)
                  └── robots.txt             (copied from public/)
```

No SSR. No SSG. No routing library. This is a single-page scroll site — React renders once on mount, and Intersection Observer handles scroll-triggered animations. Vite handles bundling, tree-shaking, CSS extraction, and asset hashing.

---

## 2. Technology Decisions

### ADR-01: Keep React 19 + Vite 6

**Decision:** Retain the current React 19 + Vite 6 stack.

**Rationale:**
- Existing codebase already uses this stack with working animation patterns
- React 19 is current stable — no upgrade needed
- Vite 6 provides fast dev server, optimized production builds, and excellent DX
- Zero-config CSS handling (imports CSS directly, extracts to single file in production)
- No justification for framework migration on a marketing site

**Consequences:**
- No React Router needed (single page)
- No server-side rendering (acceptable — marketing site with minimal SEO needs beyond meta tags)
- Bundle kept small by avoiding unnecessary libraries

---

### ADR-02: Vanilla CSS with Custom Properties (No Tailwind)

**Decision:** Continue with vanilla CSS using CSS custom properties (design tokens). Do not adopt Tailwind CSS.

**Rationale:**

| Factor | Vanilla CSS + Custom Props | Tailwind CSS |
|---|---|---|
| Current state | Already in use, 800+ lines of working styles | Would require full rewrite |
| Design token system | Native `:root` variables, already defined | Requires tailwind.config.js mapping |
| Animation support | Full keyframe control, existing system works | Requires arbitrary values or custom CSS anyway |
| Bundle size | Only ships what's written (~15-20KB gzipped) | PurgeCSS needed, still adds tooling |
| AI agent clarity | Explicit class names = unambiguous | Utility classes can be ambiguous for agents |
| Learning curve | Zero (team already knows it) | Adds config overhead |
| Component co-location | CSS naturally groups by component | Styles scattered across className strings |

**Key argument:** The existing CSS architecture is mature, well-structured with design tokens, and already handles the dark theme, animations, and responsive breakpoints. Tailwind would require rewriting every component for marginal utility-class convenience — a net negative for a project of this scope (14 sections, ~20 components).

**What we DO adopt from Tailwind's philosophy:**
- Consistent spacing scale via `--space-*` custom properties
- Systematic border-radius via `--radius-*` tokens
- Design tokens as the single source of truth (already in place)

**Consequences:**
- Each component gets its own CSS section in `index.css` or a co-located `.css` file
- New design tokens from UX spec are added to `:root`
- No additional build tooling required

---

### ADR-03: Intersection Observer Animation Pattern (No Library)

**Decision:** Keep the existing custom `useIntersectionObserver` hook for scroll-triggered animations. Do not add Framer Motion, GSAP, or other animation libraries.

**Rationale:**
- The existing pattern is 30 lines of code, handles all current animation needs
- Animations are CSS-driven (`@keyframes` + `.visible` class toggle) — the hook just triggers them
- Adding Framer Motion would add ~30KB to the bundle for features we don't need
- GSAP licensing adds complexity for minimal gain on a marketing site
- `prefers-reduced-motion` is already handled globally in CSS
- New animations (accordion, tab transitions) fit the same pattern

**Pattern:**
```jsx
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 })
return <section ref={ref} className={`section ${isVisible ? 'visible' : ''}`}>
```

**Consequences:**
- All scroll animations use the `.visible` CSS class trigger
- New sections follow the same pattern — no animation API to learn
- Complex animations (accordion height, tab transitions) use CSS transitions directly
- `useCountUp` hook remains for numeric animations in TrustBar

---

### ADR-04: Image Optimization Strategy

**Decision:** Minimal image usage. SVG for icons and dashboard mocks. WebP for any photographic content (founder photo). Lazy loading for below-fold content.

**Approach:**

| Asset Type | Format | Strategy |
|---|---|---|
| Dashboard mock | Inline SVG/JSX | Already implemented as React components — zero image load |
| Feature mocks | Inline SVG/JSX | Same approach — pure component rendering |
| Icons (trust bar, features, etc.) | Inline SVG or emoji | No icon font, no sprite sheet — direct SVG in JSX |
| Founder photo (About section) | WebP with JPEG fallback | `<picture>` element, `loading="lazy"`, explicit `width`/`height` |
| Social/OG image | PNG (1200×630) | Static file in `public/og-image.png` for social sharing |

**Rules:**
- No image files for UI elements — everything is CSS + SVG + JSX
- Any future photographic content: WebP primary, JPEG fallback, always lazy-loaded
- All images must have explicit `width` and `height` attributes to prevent CLS
- `font-display: swap` on DM Sans (already implied by Google Fonts loading strategy)

**Consequences:**
- Near-zero image weight in the initial bundle
- LCP is text-based (hero headline), not image-dependent
- Founder photo is the only real image — lazy-loaded, below fold

---

### ADR-05: Font Loading Strategy

**Decision:** Self-host DM Sans and DM Mono font files. Load with `font-display: swap`.

**Current state:** Fonts are loaded via Google Fonts CDN link. This adds a render-blocking external request.

**New approach:**
1. Download DM Sans (400, 500, 600, 700) and DM Mono (400, 500) as WOFF2 files
2. Place in `public/fonts/`
3. Define `@font-face` declarations in `index.css` with `font-display: swap`
4. Remove Google Fonts `<link>` from `index.html`

**Rationale:**
- Eliminates external DNS lookup + connection to fonts.googleapis.com
- WOFF2 is universally supported in our browser targets
- `font-display: swap` prevents invisible text during load
- Total font weight: ~80KB for all weights (vs network waterfall of Google Fonts)

**Consequences:**
- Fonts are part of the build output in `dist/fonts/`
- No external dependency on Google Fonts CDN
- Slightly larger initial download but eliminates connection overhead

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
App
├── Navbar                    (sticky, scroll-aware)
├── <main id="main-content">
│   ├── Hero                  (existing, enhanced)
│   │   └── AnimatedDashboard (existing, keep as-is)
│   ├── TrustBar              (existing, enhanced)
│   ├── Features              (existing, mobile redesign)
│   │   ├── FeatureTab        (extracted)
│   │   └── FeatureMock*      (existing mock components)
│   ├── HowItWorks            (existing, enhanced)
│   ├── Testimonials           (NEW)
│   │   └── TestimonialCard   (NEW)
│   ├── IdealLifePromo         (NEW)
│   ├── Pricing                (NEW)
│   │   └── PricingCard       (NEW)
│   ├── FAQ                    (NEW)
│   │   └── AccordionItem     (NEW)
│   ├── About                  (NEW)
│   ├── Privacy                (NEW)
│   ├── Manifesto              (existing, enhanced)
│   └── FinalCTA              (existing, enhanced)
└── Footer                    (existing, expanded)
```

### 3.2 Shared UI Components

Extract reusable primitives used across multiple sections:

#### `Section` — Wrapper for all page sections
```jsx
// Handles: intersection observer, section ID, aria-label, padding, max-width
<Section id="features" ariaLabel="Features" variant="default|dense|wide">
  {children}
</Section>
```

**Props:**
- `id` — anchor ID for navigation
- `ariaLabel` — accessibility label
- `variant` — controls padding: `default` (100px/60px), `dense` (48px/40px), `wide` (edge-to-edge)
- `maxWidth` — override max-width (`--max-width` default, `--max-width-text` for FAQ/About)
- `className` — additional classes

**Behavior:** Wraps content in `<section>`, applies `useIntersectionObserver`, adds `.visible` class when in viewport.

#### `Button` — All CTAs and interactive buttons
```jsx
<Button variant="primary|ghost|outline" size="default|lg|xl" href="..." shimmer>
  Start Planning — It's Free
</Button>
```

**Props:**
- `variant` — visual style
- `size` — padding scale
- `href` — renders as `<a>` if present, `<button>` otherwise
- `onClick` — click handler (for scroll-to actions)
- `shimmer` — enables shimmer animation overlay
- `fullWidth` — spans 100% on mobile
- `external` — adds `target="_blank" rel="noopener noreferrer"`

#### `Badge` — Status labels (Free, Beta, Coming Soon, New)
```jsx
<Badge variant="free|beta|new|premium">Free Forever</Badge>
```

#### `SectionHeader` — Consistent section title + subtitle
```jsx
<SectionHeader title="Everything you need" subtitle="One app. Every angle." />
```

#### `Card` — Base card component
```jsx
<Card variant="default|feature|pricing|testimonial" featured={false}>
  {children}
</Card>
```

#### `Accordion` — FAQ accordion container
```jsx
<Accordion items={faqItems} singleOpen={true} />
```

Each `AccordionItem` handles expand/collapse, chevron rotation, `aria-expanded`, `aria-controls`, keyboard interaction (Enter/Space).

#### `Container` — Max-width centered wrapper
```jsx
<Container width="default|text|narrow|wide">
  {children}
</Container>
```

Maps to `--max-width`, `--max-width-text`, `--max-width-narrow`, `--max-width-wide`.

### 3.3 Hook Patterns

#### `useIntersectionObserver` (existing, keep)
- Returns `[ref, isVisible]`
- Triggers once (unobserves after first intersection)
- Default threshold: 0.15
- Used by `Section` wrapper component

#### `useCountUp` (existing, keep)
- Animates a number from 0 to target
- Ease-out cubic easing
- Triggered by `shouldStart` flag (connected to intersection observer)

#### `useMediaQuery` (NEW)
```js
const isMobile = useMediaQuery('(max-width: 768px)')
```
- Returns boolean for a CSS media query
- Used sparingly — most responsive behavior is CSS-only
- Use cases: conditional rendering (mobile carousel dots vs desktop grid), hamburger menu state

#### `useScrollPosition` (NEW)
```js
const scrollY = useScrollPosition()
```
- Returns current scroll Y position (throttled to 16ms)
- Used by Navbar for transparent → glass transition
- Currently handled inline in Navbar — extract for reuse and cleanup

### 3.4 Data Patterns

Content is **co-located with components as static data arrays**, not fetched from an API or CMS.

```jsx
// Inside FAQ.jsx or in a data/ directory
const faqItems = [
  { question: 'Is Shtek really free?', answer: 'Yes. The core app...' },
  // ...
]
```

**Rationale:** For a marketing site with <50 content items, static data in JS is simpler and faster than any CMS or JSON fetch. Content changes deploy with code changes.

**Data files for sections with substantial content:**

| Section | Data Location | Format |
|---|---|---|
| Features | `data/features.js` | Array of `{ id, label, tagline, description, bullets, mockComponent }` |
| Testimonials | `data/testimonials.js` | Array of `{ quote, name, role, city, avatar? }` |
| FAQ | `data/faq.js` | Array of `{ question, answer }` |
| Pricing | `data/pricing.js` | Array of `{ tier, price, badge, features, cta, featured }` |
| HowItWorks | `data/steps.js` | Array of `{ number, icon, title, description }` |
| TrustBar | `data/trustItems.js` | Array of `{ icon, value, label }` |
| Navigation | `data/navigation.js` | Array of `{ label, href }` |

Smaller sections (About, Privacy, Manifesto, FinalCTA) keep content inline — they're single-use with no iteration logic.

---

## 4. File Structure

### 4.1 Proposed Directory Layout

```
shtek-website/
├── public/
│   ├── fonts/
│   │   ├── dm-sans-400.woff2
│   │   ├── dm-sans-500.woff2
│   │   ├── dm-sans-600.woff2
│   │   ├── dm-sans-700.woff2
│   │   ├── dm-mono-400.woff2
│   │   └── dm-mono-500.woff2
│   ├── og-image.png              (social sharing image, 1200×630)
│   ├── favicon.svg               (or .ico)
│   ├── sitemap.xml
│   ├── robots.txt
│   └── _headers                  (if deploying to Netlify/Cloudflare)
│
├── src/
│   ├── main.jsx                  (entry point — renders App)
│   ├── App.jsx                   (section composition)
│   ├── index.css                 (global styles: reset, tokens, keyframes, utilities)
│   │
│   ├── components/
│   │   ├── ui/                    ← Shared primitives
│   │   │   ├── Section.jsx
│   │   │   ├── Section.css
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   ├── Badge.jsx
│   │   │   ├── Badge.css
│   │   │   ├── Card.jsx
│   │   │   ├── Card.css
│   │   │   ├── Container.jsx
│   │   │   ├── SectionHeader.jsx
│   │   │   ├── SectionHeader.css
│   │   │   ├── Accordion.jsx
│   │   │   └── Accordion.css
│   │   │
│   │   ├── layout/                ← Layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   │
│   │   ├── sections/              ← Page sections (one per section)
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero.css
│   │   │   ├── TrustBar.jsx
│   │   │   ├── TrustBar.css
│   │   │   ├── Features.jsx
│   │   │   ├── Features.css
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── HowItWorks.css
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Testimonials.css
│   │   │   ├── IdealLifePromo.jsx
│   │   │   ├── IdealLifePromo.css
│   │   │   ├── Pricing.jsx
│   │   │   ├── Pricing.css
│   │   │   ├── FAQ.jsx
│   │   │   ├── FAQ.css
│   │   │   ├── About.jsx
│   │   │   ├── About.css
│   │   │   ├── Privacy.jsx
│   │   │   ├── Privacy.css
│   │   │   ├── Manifesto.jsx
│   │   │   ├── Manifesto.css
│   │   │   ├── FinalCTA.jsx
│   │   │   └── FinalCTA.css
│   │   │
│   │   └── mocks/                 ← Dashboard/feature mock visuals
│   │       ├── AnimatedDashboard.jsx
│   │       ├── AnimatedDashboard.css
│   │       ├── DashboardMock.jsx
│   │       ├── DailyLogMock.jsx
│   │       ├── BudgetMock.jsx
│   │       ├── GoalsMock.jsx
│   │       ├── IdealLifeMock.jsx
│   │       └── mocks.css          (shared mock styles: fmock-*)
│   │
│   ├── hooks/
│   │   ├── useIntersectionObserver.js   (existing)
│   │   ├── useCountUp.js               (existing)
│   │   ├── useMediaQuery.js             (NEW)
│   │   └── useScrollPosition.js         (NEW)
│   │
│   ├── data/
│   │   ├── features.js
│   │   ├── testimonials.js
│   │   ├── faq.js
│   │   ├── pricing.js
│   │   ├── steps.js
│   │   ├── trustItems.js
│   │   └── navigation.js
│   │
│   └── utils/
│       └── seo.js                 (JSON-LD structured data generators)
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

### 4.2 File Organization Rules

1. **Co-located CSS:** Each component has a paired `.css` file in the same directory. Import it at the top of the JSX file: `import './Hero.css'`
2. **Global CSS stays in `index.css`:** Only reset, `:root` tokens, keyframes, and base element styles
3. **No CSS modules:** Vanilla CSS with BEM-like naming conventions (simpler for AI agents to reason about)
4. **Data files are plain JS exports:** `export const faqItems = [...]` — no JSON files, no dynamic imports
5. **Hooks are standalone:** One hook per file, named export

### 4.3 CSS Splitting Strategy

**Current state:** All styles in one `index.css` file (~800 lines, growing to ~1500+ with new sections).

**New approach:** Split CSS by component for maintainability while keeping globals centralized.

| File | Contents |
|---|---|
| `index.css` | Reset, `:root` tokens, keyframes, `prefers-reduced-motion`, base elements, utility classes |
| `components/ui/*.css` | Shared component styles (Button, Card, Badge, Accordion, Section, SectionHeader) |
| `components/layout/*.css` | Navbar and Footer styles |
| `components/sections/*.css` | Per-section styles |
| `components/mocks/mocks.css` | All `fmock-*` styles (shared across feature mocks) |

**Vite handles CSS extraction:** All imported `.css` files are bundled into a single output CSS file in production. No performance penalty for splitting — it's purely a DX improvement.

---

## 5. Responsive Strategy

### 5.1 Breakpoint System

Mobile-first: base styles target phones, `min-width` queries add complexity.

```css
/* Breakpoints — always use min-width (mobile-first) */
/* xs: 320px — base styles, no query needed */
/* sm: 480px — large phones */
@media (min-width: 480px) { }
/* md: 768px — tablets, 2-column layouts */
@media (min-width: 768px) { }
/* lg: 1024px — laptops, 3+ column layouts */
@media (min-width: 1024px) { }
/* xl: 1440px — wide desktop */
@media (min-width: 1440px) { }
```

### 5.2 Migration from Desktop-First to Mobile-First

**This is the most significant CSS change in the redesign.**

**Current problem:** The existing CSS writes desktop styles as the base and uses `max-width: 768px` to override for mobile. This inverts the mobile-first principle and leads to overrides fighting each other.

**Migration approach:**
1. Base styles (no media query) = mobile layout (single column, stacked, full-width)
2. `min-width: 768px` = add grid columns, wider spacing, side-by-side layouts
3. `min-width: 1024px` = add multi-column grids, max-width containers
4. Remove all `max-width` media queries from the codebase

**Example — Hero section migration:**

```css
/* BEFORE (desktop-first, current) */
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* desktop default */
  gap: 60px;
}
@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;  /* override for mobile */
    gap: 40px;
    text-align: center;
  }
}

/* AFTER (mobile-first, new) */
.hero-inner {
  display: grid;
  grid-template-columns: 1fr;     /* mobile default */
  gap: 40px;
  text-align: center;
}
@media (min-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr 1fr;  /* enhance for desktop */
    gap: 60px;
    text-align: left;
  }
}
```

### 5.3 CSS Custom Properties (Design Tokens)

Extend the existing `:root` token system per the UX spec:

```css
:root {
  /* ─── EXISTING (preserved) ─── */
  --bg: #121010;
  --bg-card: #1a1714;
  --bg-input: #1e1a16;
  --border: #2a2520;
  --border-hover: #3a3530;
  --text: #e8e4de;
  --text-muted: #8a8580;
  --text-dim: #5a5550;
  --accent: #8FB996;
  --accent-dim: rgba(143, 185, 150, 0.12);
  --accent-glow: rgba(143, 185, 150, 0.25);
  --secondary: #D4C5A9;
  --secondary-dim: rgba(212, 197, 169, 0.12);
  --error: #D49A9A;
  --error-dim: rgba(212, 154, 154, 0.12);
  --info: #B8C5E3;
  --info-dim: rgba(184, 197, 227, 0.12);
  --radius: 14px;
  --radius-sm: 8px;
  --font: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'DM Mono', 'Fira Code', monospace;
  --transition: 0.25s ease;
  --transition-slow: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  --max-width: 1200px;

  /* ─── NEW TOKENS (from UX spec) ─── */
  
  /* Backgrounds */
  --bg-elevated: #171412;
  --bg-overlay: #201d19;
  
  /* Borders */
  --border-subtle: #1e1a16;
  --border-focus: #8FB996;
  
  /* Text */
  --text-secondary: #b8b4ae;
  
  /* Accent extensions */
  --accent-light: #a8d1af;
  --accent-surface: rgba(143, 185, 150, 0.06);
  
  /* Secondary extensions */
  --secondary-surface: rgba(212, 197, 169, 0.04);
  
  /* Gold (premium/pricing) */
  --gold: #C9A96E;
  --gold-dim: rgba(201, 169, 110, 0.12);
  
  /* Spacing scale (4px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  
  /* Layout widths */
  --max-width-text: 760px;
  --max-width-narrow: 600px;
  --max-width-wide: 1400px;
  
  /* Radius extensions */
  --radius-xs: 4px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-full: 100px;
}
```

### 5.4 Responsive Layout Patterns by Section

| Section | Mobile (<768px) | Tablet (768px+) | Desktop (1024px+) |
|---|---|---|---|
| Hero | 1col stacked, centered text | 1col, wider padding | 2col: text \| dashboard |
| TrustBar | 2×2 grid | Single flex row | Single flex row, wider gaps |
| Features | Horizontal scroll tabs, 1col panel (mock above text) | 2col panel | 2col panel, wider |
| HowItWorks | Vertical step cards with left accent border | Still vertical | Horizontal flex row with connector line |
| Testimonials | Vertical stack (1col) | 2col grid | 3col grid |
| Pricing | Stacked cards (Free first) | Side-by-side 2col | Side-by-side 2col, max-width centered |
| FAQ | 1col, full-width accordion | Same, max-width-text | Same |
| About | 1col, centered text | Same, max-width-text | Same |
| Footer | Stacked sections | 2col | 4col grid |

---

## 6. Performance Budget

### 6.1 Lighthouse Targets

| Metric | Mobile Target | Desktop Target |
|---|---|---|
| Performance | ≥ 90 | ≥ 95 |
| Accessibility | ≥ 90 | ≥ 95 |
| Best Practices | ≥ 90 | ≥ 95 |
| SEO | ≥ 95 | ≥ 95 |

### 6.2 Core Web Vitals

| Metric | Target | Strategy |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s mobile | Hero headline is LCP element — text-based, no image dependency |
| FID (First Input Delay) | < 100ms | Minimal JS, no heavy computation on load |
| CLS (Cumulative Layout Shift) | < 0.1 | Font swap, explicit dimensions on all media, no layout-shifting content |
| INP (Interaction to Next Paint) | < 200ms | Simple event handlers, CSS-driven animations |

### 6.3 Bundle Size Budget

| Asset | Budget | Rationale |
|---|---|---|
| JavaScript (gzipped) | < 50KB | React 19 (~40KB) + app code (~10KB). No heavy libraries. |
| CSS (gzipped) | < 15KB | Full design system + all component styles |
| Fonts (total) | < 100KB | 6 WOFF2 files for DM Sans + DM Mono |
| Images | < 50KB | Only founder photo (WebP, compressed) + OG image |
| **Total initial load** | **< 215KB gzipped** | Competitive with static HTML sites |

### 6.4 Optimization Techniques

1. **Code splitting:** Not needed — single page, small bundle. Vite tree-shakes unused code.
2. **Font subsetting:** Consider subsetting DM Sans to Latin characters only (reduces font files by ~40%)
3. **CSS purging:** Not needed with vanilla CSS — we only write what we use
4. **Image optimization:** Use `vite-plugin-imagemin` or pre-optimize images before committing
5. **Preload critical assets:** `<link rel="preload">` for DM Sans 700 (hero headline font weight)

---

## 7. SEO Strategy

### 7.1 Meta Tags

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shtek — Personal Finance Planning App for Serbia & Balkans</title>
  <meta name="description" content="Budget, track daily spending, and plan the life you want. Dual currency (EUR & RSD). Free. No credit card needed. Made in Serbia.">
  <link rel="canonical" href="https://shtek.me/">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://shtek.me/">
  <meta property="og:title" content="Shtek — Personal Finance Planning for EUR & RSD">
  <meta property="og:description" content="Budget, track spending, plan your ideal life. Free for Serbia & Balkans.">
  <meta property="og:image" content="https://shtek.me/og-image.png">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Shtek — Personal Finance Planning">
  <meta name="twitter:description" content="Budget, track spending, plan your ideal life. Free for Serbia & Balkans.">
  <meta name="twitter:image" content="https://shtek.me/og-image.png">
</head>
```

### 7.2 Structured Data (JSON-LD)

Inject via a `<script type="application/ld+json">` block in `index.html` or dynamically from a `utils/seo.js` helper:

**FAQPage schema** (for FAQ section — enables rich snippets in Google):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Shtek really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The core app is completely free..."
      }
    }
  ]
}
```

**SoftwareApplication schema** (for the app itself):
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Shtek",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  }
}
```

### 7.3 Sitemap & Robots

**`public/sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://shtek.me/</loc>
    <lastmod>2026-03-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**`public/robots.txt`:**
```
User-agent: *
Allow: /
Sitemap: https://shtek.me/sitemap.xml
```

### 7.4 Semantic HTML

- Single `<h1>` — hero headline only
- `<h2>` for each section title
- `<h3>` for card titles, feature taglines
- `<section>` with `aria-label` for each page section
- `<nav>` for navbar
- `<main>` wrapping content sections
- `<footer>` for footer
- Heading hierarchy must be sequential — no skipping levels

---

## 8. Deployment

### 8.1 Build Pipeline

```
npm run build
  → vite build
  → Output: dist/
     ├── index.html
     ├── assets/index-[hash].js
     ├── assets/index-[hash].css
     ├── fonts/*.woff2
     ├── og-image.png
     ├── sitemap.xml
     ├── robots.txt
     └── favicon.svg
```

### 8.2 Hosting Considerations

The `dist/` folder is static — deployable to any static hosting:

| Option | Suitability | Notes |
|---|---|---|
| **Vercel** | ✅ Excellent | Zero-config for Vite, auto-SSL, edge CDN, preview deploys |
| **Netlify** | ✅ Excellent | Same benefits as Vercel, `_headers` file for cache control |
| **Cloudflare Pages** | ✅ Excellent | Fast global CDN, free tier generous |
| **GitHub Pages** | ⚠️ Acceptable | Free, but no `_headers` control, manual deploy |
| **Self-hosted (Nginx)** | ⚠️ Acceptable | Full control but requires maintenance |

**Recommendation:** Deploy to whichever platform currently hosts shtek.me. No infrastructure change needed — the output is the same static bundle.

### 8.3 Cache Strategy

```
# Hashed assets (JS, CSS) — immutable, long cache
assets/*.[hash].js   → Cache-Control: public, max-age=31536000, immutable
assets/*.[hash].css  → Cache-Control: public, max-age=31536000, immutable

# HTML — always revalidate
index.html           → Cache-Control: public, max-age=0, must-revalidate

# Fonts — long cache (they don't change)
fonts/*.woff2        → Cache-Control: public, max-age=31536000, immutable

# Static files — medium cache
sitemap.xml          → Cache-Control: public, max-age=86400
robots.txt           → Cache-Control: public, max-age=86400
og-image.png         → Cache-Control: public, max-age=604800
```

### 8.4 Environment & Analytics

- **Analytics:** Add Plausible or Fathom analytics script in `index.html` (privacy-first, no cookie banner needed)
- **UTM tracking:** All CTAs link to `app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign={section}`
- **No environment variables needed** — this is a fully static site with no secrets

---

## 9. Migration Plan

### 9.1 Strategy: Incremental Refactor in Place

Do **not** rewrite from scratch. The existing code works and has valuable animation/mock logic. Refactor incrementally:

### 9.2 Migration Phases

#### Phase A: Foundation (Do First)

**Goal:** Set up the new file structure and design tokens without changing any visible behavior.

1. **Create directory structure** — `ui/`, `layout/`, `sections/`, `mocks/`, `data/`, `utils/`
2. **Extend `:root` tokens** — Add all new custom properties from UX spec to `index.css`
3. **Self-host fonts** — Download WOFF2 files, add `@font-face` declarations, remove Google Fonts link
4. **Add `public/` static files** — `sitemap.xml`, `robots.txt`, `og-image.png` placeholder
5. **Add SEO meta tags** — Update `index.html` `<head>`

**Verification:** Site looks and behaves identically. No visible changes.

#### Phase B: Extract Shared Components

**Goal:** Create the shared UI component library that all sections will use.

1. **Extract `Section` wrapper** — Takes over intersection observer + layout responsibility
2. **Extract `Button` component** — Consolidate all button patterns
3. **Extract `Badge` component** — Small, used in Hero + Pricing
4. **Extract `SectionHeader` component** — Used by 8+ sections
5. **Extract `Card` component** — Used by Pricing, Testimonials, Features
6. **Extract `Container` component** — Max-width wrapper
7. **Create `Accordion` component** — For FAQ section
8. **Add new hooks** — `useMediaQuery`, `useScrollPosition`

**Verification:** Refactor existing sections to use shared components. No visible changes.

#### Phase C: CSS Mobile-First Migration

**Goal:** Rewrite CSS from desktop-first (`max-width`) to mobile-first (`min-width`).

1. **Split `index.css`** into component-scoped CSS files
2. **Rewrite each section's CSS** — Base = mobile, enhance with `min-width` queries
3. **Remove all `@media (max-width: *)` rules**
4. **Test every section** at 375px, 768px, 1024px, 1440px

**Verification:** All existing sections render correctly at all breakpoints. Mobile layout is the CSS base.

#### Phase D: Move Existing Components

**Goal:** Relocate existing components to the new directory structure.

1. Move `Navbar.jsx` → `components/layout/Navbar.jsx` + `Navbar.css`
2. Move `Footer.jsx` → `components/layout/Footer.jsx` + `Footer.css`
3. Move `Hero.jsx`, `TrustBar.jsx`, etc. → `components/sections/`
4. Move `AnimatedDashboard.jsx` + feature mocks → `components/mocks/`
5. Move hooks → `hooks/`
6. Extract section content data → `data/` files
7. Update all imports in `App.jsx`

**Verification:** All imports resolve. Site works identically.

#### Phase E: Enhance Existing Sections

**Goal:** Apply UX spec improvements to existing sections.

1. **Hero** — Add badge, micro trust row, mobile stacking order
2. **TrustBar** — Add section label, 2×2 mobile grid
3. **Features** — Horizontal scroll tabs on mobile, mock-above-text on mobile
4. **HowItWorks** — Card-based step design on mobile, 4 steps
5. **Manifesto** — Visual elevation, accent text treatment
6. **FinalCTA** — Sign-in link, micro trust bar
7. **Footer** — 4-column expansion, section links
8. **Navbar** — Glass morphism on scroll, active section highlighting

**Verification:** Each section matches UX spec wireframes.

#### Phase F: Build New Sections

**Goal:** Implement the 6 new sections.

Build order (based on conversion impact and dependencies):

1. **Pricing** — High conversion impact, standalone
2. **FAQ** — Objection handling, uses Accordion component
3. **Testimonials** — Social proof, uses Card component
4. **IdealLifePromo** — Mid-page conversion, reuses IdealLifeMock
5. **About** — Founder trust, text-heavy, simple
6. **Privacy** — Security reassurance, icon-driven layout

**Verification:** Each new section renders, animates, and is responsive.

#### Phase G: Integration & Polish

**Goal:** Wire everything together, add structured data, final QA.

1. **Update `App.jsx`** — Add all new sections in correct order
2. **Update Navbar links** — Add anchor links for new sections
3. **Add JSON-LD structured data** — FAQ schema, SoftwareApplication schema
4. **Add skip link** — `<a href="#main-content" class="skip-link">`
5. **Accessibility audit** — Tab order, focus rings, ARIA attributes, contrast
6. **Performance audit** — Lighthouse runs at each breakpoint
7. **Cross-browser testing** — Chrome, Firefox, Safari, iOS Safari, Android Chrome

---

## 10. Coding Standards

### 10.1 Component Patterns

#### Functional Components Only
```jsx
// ✅ Correct
export default function Hero() { ... }

// ❌ Avoid
const Hero = () => { ... }     // Named export preferred over arrow default
class Hero extends Component {} // No class components
```

#### Props Pattern
```jsx
// ✅ Destructure props at function signature
export default function Button({ variant = 'primary', size = 'default', children, ...props }) {

// ❌ Avoid
export default function Button(props) {
  const { variant } = props  // destructure inside
```

#### Component File Structure
```jsx
// 1. Imports
import './Hero.css'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import Button from '../ui/Button'

// 2. Constants / data (if small and component-specific)
const HERO_WORDS = ['Know', 'exactly', 'where', 'your', 'money']

// 3. Component
export default function Hero() {
  // hooks first
  const [ref, isVisible] = useIntersectionObserver()
  
  // derived state
  const className = `hero ${isVisible ? 'visible' : ''}`
  
  // render
  return (...)
}
```

### 10.2 Naming Conventions

#### Files
- Components: `PascalCase.jsx` (e.g., `TrustBar.jsx`, `SectionHeader.jsx`)
- CSS: Match component name (e.g., `TrustBar.css`)
- Hooks: `camelCase.js` prefixed with `use` (e.g., `useCountUp.js`)
- Data: `camelCase.js` (e.g., `features.js`, `testimonials.js`)

#### CSS Classes
BEM-inspired, kebab-case, component-scoped:

```css
/* Block */
.hero { }
.trust-bar { }
.pricing-card { }

/* Element (double hyphen or single hyphen — be consistent per component) */
.hero-headline { }
.hero-sub { }
.hero-ctas { }
.pricing-card-badge { }
.pricing-card-features { }

/* Modifier (double dash) */
.pricing-card--featured { }
.btn--primary { }
.btn--ghost { }
.badge--free { }
.badge--premium { }

/* State (via parent class or data attribute) */
.visible .hero-headline { }    /* scroll-triggered */
.navbar--scrolled { }           /* scroll state */
.features-tab--active { }      /* interactive state */
.accordion-item--open { }      /* toggle state */
```

**Rule:** No generic class names (`.container`, `.title`, `.card`) without component prefix. Always scope: `.hero-title`, `.pricing-card`, `.section-container`.

#### JavaScript
- Variables/functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE` for true constants, `camelCase` for config objects
- Component names: `PascalCase`
- Hook names: `useCamelCase`
- Event handlers: `handleEventName` (e.g., `handleTabClick`, `handleMenuToggle`)
- Boolean props: `isVisible`, `hasShimmer`, `isFeatured`

### 10.3 CSS Methodology

#### Mobile-First Rule (ENFORCED)
```css
/* ✅ Correct: mobile base, enhance up */
.hero-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-10);
}
@media (min-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
  }
}

/* ❌ NEVER: desktop base, override down */
.hero-inner {
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }
}
```

#### Token Usage Rule
```css
/* ✅ Use tokens */
padding: var(--space-16) var(--space-5);
border-radius: var(--radius-sm);
color: var(--text-muted);

/* ❌ Avoid magic numbers */
padding: 64px 20px;
border-radius: 8px;
color: #8a8580;
```

Exception: One-off values that don't fit the spacing scale (e.g., `translateY(-2px)` for hover effects) are acceptable as raw values.

#### Animation Rule
```css
/* ✅ CSS-driven, triggered by .visible class */
.trust-item {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s var(--transition-slow), transform 0.5s var(--transition-slow);
}
.visible .trust-item {
  opacity: 1;
  transform: translateY(0);
}

/* ❌ Avoid JS-driven style manipulation */
element.style.opacity = '1'  // Don't do this
```

### 10.4 Accessibility Standards

1. **Every `<section>`** gets `aria-label` describing its purpose
2. **Every interactive element** must be keyboard-accessible (Tab, Enter, Space)
3. **Focus indicators** via `:focus-visible` — never remove outlines without replacement
4. **ARIA attributes** on dynamic elements: `aria-expanded`, `aria-controls`, `aria-hidden`
5. **One `<h1>` per page** — hero headline only. All section titles are `<h2>`
6. **Decorative elements** (SVG mocks, gradient backgrounds) get `aria-hidden="true"`
7. **Links that open new tabs** get `rel="noopener noreferrer"` and descriptive text

### 10.5 Import Order Convention

```jsx
// 1. React/library imports
import { useState, useEffect } from 'react'

// 2. Component CSS (co-located)
import './Features.css'

// 3. Hooks
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

// 4. UI components
import Section from '../ui/Section'
import Button from '../ui/Button'

// 5. Data
import { features } from '../../data/features'

// 6. Child components
import FeatureTab from './FeatureTab'
```

### 10.6 UTM Link Pattern

All external links to app.shtek.me follow a consistent UTM structure:

```jsx
const APP_URL = 'https://app.shtek.me/'

function ctaUrl(section) {
  return `${APP_URL}?utm_source=landing&utm_medium=cta&utm_campaign=${section}`
}

// Usage
<Button href={ctaUrl('hero')} external>Start Planning</Button>
<Button href={ctaUrl('pricing')} external>Get Started Free</Button>
```

Define `ctaUrl` in `utils/links.js` and import where needed.

---

## Appendix A: Decision Log

| # | Decision | Options Considered | Chosen | Key Rationale |
|---|---|---|---|---|
| ADR-01 | Framework | React+Vite (keep), Astro, Next.js | React 19 + Vite 6 | Existing stack, no SSR needed, minimal migration |
| ADR-02 | CSS approach | Vanilla CSS, Tailwind, CSS Modules | Vanilla CSS + custom properties | Existing system mature, no rewrite needed, better for AI agents |
| ADR-03 | Animations | Custom IO hook, Framer Motion, GSAP | Custom useIntersectionObserver | 30 lines vs 30KB, existing pattern proven |
| ADR-04 | Images | Image-heavy, SVG-first, mixed | SVG/JSX mocks + minimal WebP | Near-zero image weight, fast LCP |
| ADR-05 | Fonts | Google Fonts CDN, self-hosted WOFF2 | Self-hosted WOFF2 | Eliminates external dependency, better performance |
| ADR-06 | CSS architecture | Single file, CSS modules, co-located | Co-located vanilla CSS per component | Maintainable at scale, Vite bundles automatically |
| ADR-07 | Data management | CMS, JSON files, inline JS | Static JS data files | Simplest for <50 content items, deploys with code |
| ADR-08 | Routing | React Router, none | None (single page) | Scroll-based navigation, no page transitions needed |

## Appendix B: Component Inventory (Complete)

| Component | Type | Status | Directory |
|---|---|---|---|
| App | Root | Existing (modify) | `src/` |
| Navbar | Layout | Existing (enhance) | `components/layout/` |
| Footer | Layout | Existing (expand) | `components/layout/` |
| Hero | Section | Existing (enhance) | `components/sections/` |
| TrustBar | Section | Existing (enhance) | `components/sections/` |
| Features | Section | Existing (mobile redesign) | `components/sections/` |
| HowItWorks | Section | Existing (enhance) | `components/sections/` |
| Manifesto | Section | Existing (visual elevation) | `components/sections/` |
| FinalCTA | Section | Existing (enhance) | `components/sections/` |
| Testimonials | Section | **NEW** | `components/sections/` |
| IdealLifePromo | Section | **NEW** | `components/sections/` |
| Pricing | Section | **NEW** | `components/sections/` |
| FAQ | Section | **NEW** | `components/sections/` |
| About | Section | **NEW** | `components/sections/` |
| Privacy | Section | **NEW** | `components/sections/` |
| AnimatedDashboard | Mock | Existing (keep) | `components/mocks/` |
| DashboardMock | Mock | Existing (keep) | `components/mocks/` |
| DailyLogMock | Mock | Existing (keep) | `components/mocks/` |
| BudgetMock | Mock | Existing (keep) | `components/mocks/` |
| GoalsMock | Mock | Existing (keep) | `components/mocks/` |
| IdealLifeMock | Mock | Existing (keep) | `components/mocks/` |
| Section | UI | **NEW** | `components/ui/` |
| Button | UI | **NEW** (extracted) | `components/ui/` |
| Badge | UI | **NEW** | `components/ui/` |
| Card | UI | **NEW** | `components/ui/` |
| Container | UI | **NEW** | `components/ui/` |
| SectionHeader | UI | **NEW** | `components/ui/` |
| Accordion | UI | **NEW** | `components/ui/` |
| AccordionItem | UI | **NEW** (internal) | `components/ui/` |

## Appendix C: Open Questions for Implementation

| # | Question | Decision Owner | Impact |
|---|---|---|---|
| Q1 | Real testimonial content available? | Rajko | Blocks Testimonials section copy |
| Q2 | Current user count for TrustBar? | Rajko | Affects TrustBar stat ("500+ users" or omit) |
| Q3 | Founder photo for About section? | Rajko | Photo vs initials avatar |
| Q4 | Pro tier pricing confirmed at €4.99? | Rajko | Affects Pricing section |
| Q5 | Contact email (hello@shtek.me)? | Rajko | Affects About + Footer |
| Q6 | Current hosting platform? | Rajko | Determines deployment config (`_headers`, `vercel.json`, etc.) |
| Q7 | Analytics tool preference? | Rajko | Plausible (recommended) vs GA4 (needs cookie banner) |

---

*Architecture Decision Document v1.0 — Created by Winston (Architect Agent) as part of BMAD Phase 3 Solutioning.*  
*Next: Epics & Stories → John (product-manager)*
