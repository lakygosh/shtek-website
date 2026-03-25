---
stepsCompleted: [discovery, design-system, component-strategy, page-layouts, interactions, accessibility]
inputDocuments: [product-brief.md, shtek-website/src/index.css, shtek-app/src/index.css, all website components]
date: 2026-03-25
author: Sally (ux-designer)
project: shtek-website-redesign
---

# UX Design Specification: Shtek Website Redesign

**Author:** Sally — UX Designer
**Date:** 2026-03-25
**Version:** 1.0
**Status:** Ready for Architecture

---

## Overview

This document defines the complete UX and visual design specification for the Shtek landing website redesign. The site is the primary conversion surface for Shtek — a personal finance planning app for young professionals in Serbia/Balkans. The design must feel premium-dark, warm, and trustworthy while converting mobile-first visitors to app.shtek.me.

The existing site has strong DNA (dark theme, warm earth tones, animated dashboard) but suffers from dead space, non-mobile-first layouts, and missing conversion sections. This spec evolves the existing system rather than replacing it.

---

## 1. Design Principles

### Core Tenets

**1. Mobile-First, Always**
Phone layouts are designed first. Desktop is the enhancement layer. Every component starts as a single-column stacked layout. We add columns and complexity only when screen real estate justifies it. The breakpoint story is: `320px → 768px → 1024px → 1440px`.

**2. Warm Premium Dark**
The dark background (#121010) is our signature — it's not cold tech, it's a warm evening. Earth tones (sage green, warm sand, muted rose) create emotional warmth on top of the darkness. Premium comes from restraint: generous but tight spacing, subtle glass effects, refined typography, intentional glows.

**3. Every Pixel Earns Its Place**
Dead space is a conversion killer. We use purposeful negative space (breathing room around key messages, visual hierarchy) but ruthlessly cut padding bloat. Sections stack tighter on mobile; whitespace expands naturally on desktop.

**4. Clarity Over Cleverness**
Users are 25-35 year-olds managing finances — they appreciate intelligence but need immediate clarity. Value propositions land in 3 seconds. CTAs are unmissable. Features are demonstrated, not just listed.

**5. Trust Through Warmth**
Financial apps need trust. We build it through: warm colors (not clinical blue-white), honest copy, social proof, and transparent pricing. The design should feel like a smart friend who handles money well — not a bank.

**6. Delight in the Details**
Micro-interactions, number animations, smooth transitions — these signal craftsmanship. Users don't consciously notice them, but they feel the quality. The animated dashboard mock is our hero; every section should have a moment of delight.

---

## 2. Color System

### 2.1 Evolution of the Palette

The existing palette is strong. We evolve it with better semantic naming, additional elevation levels, and surface variants for the new sections.

```
Base Palette (preserved DNA):
  bg-base:        #121010  — primary background (deepest)
  bg-elevated:    #171412  — slight elevation (hero, manifesto bg layers)
  bg-card:        #1a1714  — card surfaces
  bg-input:       #1e1a16  — form inputs, deeper cards
  bg-overlay:     #201d19  — hover states, overlays

Border System:
  border-subtle:  #1e1a16  — hairline separators
  border-default: #2a2520  — card borders, dividers
  border-hover:   #3a3530  — interactive hover state
  border-focus:   #8FB996  — focus rings (accessibility)

Text Scale:
  text-primary:   #e8e4de  — headings, important content
  text-secondary: #b8b4ae  — body text (slightly warmer than current muted)
  text-muted:     #8a8580  — labels, supporting text
  text-dim:       #5a5550  — timestamps, placeholders
  text-disabled:  #3a3530  — disabled states

Accent — Sage Green (primary brand):
  accent:         #8FB996  — primary accent (unchanged)
  accent-light:   #a8d1af  — hover/lighter variant
  accent-dim:     rgba(143, 185, 150, 0.12) — subtle tints
  accent-glow:    rgba(143, 185, 150, 0.25) — glow effects
  accent-surface: rgba(143, 185, 150, 0.06) — background washes

Secondary — Warm Sand:
  secondary:      #D4C5A9  — secondary accent (unchanged)
  secondary-dim:  rgba(212, 197, 169, 0.12)
  secondary-surface: rgba(212, 197, 169, 0.04)

Info — Periwinkle Blue:
  info:           #B8C5E3  — informational, "calm" states
  info-dim:       rgba(184, 197, 227, 0.12)

Error/Warning — Muted Rose:
  error:          #D49A9A  — errors, warnings (soft, not alarming)
  error-dim:      rgba(212, 154, 154, 0.12)

NEW — Success (explicit):
  success:        #8FB996  — same as accent (intentional — success = brand)
  
NEW — Gold/Premium highlight:
  gold:           #C9A96E  — premium badge, pricing highlight
  gold-dim:       rgba(201, 169, 110, 0.12)
```

### 2.2 Semantic Color Usage

| Context | Color Token |
|---|---|
| Primary CTA button | `accent` bg, `#0e0e0c` text |
| Secondary CTA | `accent-dim` bg, `accent` text |
| Ghost button | `border-default` border, `text-muted` text |
| Card background | `bg-card` |
| Section background alt | `bg-elevated` or subtle gradient wash |
| Badge: Free | `accent-dim` bg, `accent` text |
| Badge: Premium | `gold-dim` bg, `gold` text |
| Badge: New | `info-dim` bg, `info` text |
| Error state | `error-dim` bg, `error` text |
| Trust item value | `text-primary` |
| Pricing free tier highlight | `accent` border |

### 2.3 Gradient & Glow System

The hero and manifesto sections use ambient gradients for depth. These should be subtle — barely perceptible, but felt.

```
Ambient Background Gradient (hero/manifesto):
  radial-gradient(ellipse 600px 500px at 20% 40%, rgba(143, 185, 150, 0.08) 0%, transparent 70%),
  radial-gradient(ellipse 500px 400px at 80% 60%, rgba(212, 197, 169, 0.06) 0%, transparent 70%),
  radial-gradient(ellipse 400px 300px at 60% 20%, rgba(184, 197, 227, 0.04) 0%, transparent 70%)
  → animates slowly via gradientMove keyframe (20-25s cycle)

Card Glow (dashboard mock):
  box-shadow: 0 0 20px rgba(143, 185, 150, 0.08), 
              0 0 60px rgba(143, 185, 150, 0.04)

Accent Border Glow (pricing featured plan):
  box-shadow: 0 0 0 1px var(--accent), 
              0 0 20px rgba(143, 185, 150, 0.15),
              inset 0 0 20px rgba(143, 185, 150, 0.03)
```

---

## 3. Typography

### 3.1 Type Stack

```
Primary:    'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif
            → Humanist sans with optical warmth. Excellent at small sizes.
            → Weight range: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

Monospace:  'DM Mono', 'Fira Code', monospace
            → Used exclusively for numbers (stats, prices, data values)
            → Creates a "data precision" feel without cold tech-bro energy
```

### 3.2 Type Scale (Mobile-First)

```
Display XL:  clamp(2.6rem, 6vw, 4.2rem)   → Hero headline
Display L:   clamp(2rem, 4vw, 3rem)        → Manifesto, FinalCTA headline
Heading 1:   clamp(1.6rem, 3vw, 2.2rem)   → Section titles
Heading 2:   clamp(1.3rem, 2.5vw, 1.7rem) → Feature taglines, card titles
Heading 3:   1.1rem / 1.15rem             → Sub-headings, card headers
Body L:      1.05rem                       → Introductory paragraphs
Body:        1rem (16px base)              → Default body text
Body S:      0.9rem                        → Supporting text, bullets
Caption:     0.8rem                        → Labels, badges, metadata
Micro:       0.7rem                        → Helper text, timestamps
Mono Body:   1rem (DM Mono)               → Stats, prices, data
Mono S:      0.85rem (DM Mono)            → Inline data values
```

### 3.3 Typography Rules

**Line Height:**
- Headlines: 1.1–1.15 (tight, impactful)
- Body text: 1.6–1.7 (comfortable reading)
- Captions/labels: 1.4

**Letter Spacing:**
- Display/H1 with tight: -1.5px to -2px (modern, premium feel)
- H2-H3: -0.3px to -0.5px
- Body: default (0)
- All-caps labels: +0.5px to +1px

**Font Weight Hierarchy:**
- Headlines: 700 (bold)
- Taglines/subheads: 600 (semibold)
- Body: 400 (regular), 500 for emphasis
- Monospace numbers: 500 (medium — more legible than regular)
- Navigation: 500–600

**Color Application:**
- Primary content: `text-primary`
- Supporting/descriptive: `text-muted`
- De-emphasized/metadata: `text-dim`
- Accent highlights within text: `accent` or `secondary`
- Never pure `#ffffff` — always warm-tinted

---

## 4. Spacing & Layout System

### 4.1 Spacing Scale

```
Base unit: 4px

--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
--space-32:  128px
```

### 4.2 Section Vertical Rhythm

Mobile-first section padding:
```
Section (mobile):    padding: 64px 20px
Section (tablet):    padding: 80px 24px
Section (desktop):   padding: 100px 40px

Section dense (trust bar, between tightly related sections):
  Mobile:  padding: 40px 20px
  Desktop: padding: 48px 40px

Hero section:
  Mobile:  padding-top: 88px (below fixed navbar), padding-bottom: 60px
  Desktop: padding-top: 120px, padding-bottom: 80px, min-height: 100vh
```

### 4.3 Content Max-Widths

```
--max-width:        1200px   → Page container max
--max-width-text:   760px    → Text-heavy sections (manifesto, about, faq)
--max-width-narrow: 600px    → CTA sections, hero text column
--max-width-wide:   1400px   → Edge-to-edge sections if needed
```

### 4.4 Grid System

**Mobile (< 768px):** Single column, full width, 20px gutters
**Tablet (768px–1023px):** 2 columns max, 24px gaps
**Desktop (1024px+):** Up to 3–4 columns, 40px gaps

Column patterns used in this design:
```
Hero:          mobile 1col → desktop 1fr 1fr (text | dashboard)
Features:      mobile 1col → desktop 1fr 1.2fr (text | mock)
Pricing:       mobile 1col → tablet 1fr 1fr → desktop 1fr 1fr 1fr (if 3 tiers)
Testimonials:  mobile 1col → tablet 1fr 1fr → desktop 1fr 1fr 1fr
HowItWorks:    mobile column stack → desktop flex row
FAQ:           always 1col (max-width-text)
TrustBar:      mobile flex wrap → desktop flex row centered
Footer:        mobile column stack → desktop 4-col grid
```

### 4.5 Breakpoints

```
xs:  320px   → Minimum supported (small phones)
sm:  480px   → Large phones, landscape
md:  768px   → Tablets, breakpoint for most 2-col layouts
lg:  1024px  → Small laptops, 3-col grids kick in
xl:  1440px  → Wide desktop, max-width containers center
```

### 4.6 Border Radius System

```
--radius-xs:  4px   → Badges, small chips
--radius-sm:  8px   → Buttons, small cards
--radius:     14px  → Standard cards, panels
--radius-lg:  18px  → Dashboard mock, large cards
--radius-xl:  24px  → Hero visual container, modal-scale cards
--radius-full: 100px → Pills (tab buttons, badges)
```

---

## 5. Component Library

### 5.1 Buttons

**Primary Button** — Main CTA, high emphasis
```
Background:    accent (#8FB996)
Text:          #0e0e0c (near-black for contrast)
Padding:       12px 28px (default), 14px 32px (lg), 18px 40px (xl)
Border-radius: radius-sm (8px) default, radius (14px) for xl
Font:          600, 0.95rem
Hover:         background lighten to #a0caa7, translateY(-2px), accent-glow shadow
Active:        translateY(0), slightly darker bg
Shimmer:       animating gradient overlay on hover (3s cycle) — kept from v1
Min-width touch target: 44px height minimum
```

**Secondary/Ghost Button** — Low emphasis
```
Background:    transparent
Border:        1px solid border-default
Text:          text-muted
Padding:       same as primary
Hover:         border-color → border-hover, text → text-primary, bg → rgba(255,255,255,0.03)
```

**Outline Accent Button** — Medium emphasis (new section for pricing CTAs)
```
Background:    accent-dim
Border:        1px solid accent (with 0.4 opacity)
Text:          accent
Hover:         background → accent, text → #0e0e0c
```

**Icon Button** — Navigation, close, expand
```
Size:          44px × 44px minimum (touch target)
Background:    transparent / bg-card on hover
Border-radius: radius-sm
```

### 5.2 Cards

**Standard Card**
```
Background:    bg-card (#1a1714)
Border:        1px solid border-default
Border-radius: radius (14px)
Padding:       20px (mobile), 24px (desktop)
Hover:         border-color → border-hover, subtle translateY(-2px)
Transition:    0.25s ease
```

**Feature Card** (testimonials, pricing features list)
```
Same as standard card but with:
Padding:       24px (mobile), 28px (desktop)
Optional left accent border: 3px solid [color var]
```

**Pricing Card**
```
Base:          Standard card
Featured:      border: 1px solid accent, box-shadow: 0 0 30px accent-dim
               + "Most Popular" badge top-right
               + slightly elevated with accent-surface background wash
Non-featured:  Standard card with reduced prominence
```

**Testimonial Card**
```
Background:    bg-card
Border:        1px solid border-subtle
Border-radius: radius
Padding:       24px
Quote mark:    Large accent-colored " (decorative, 2rem, opacity 0.3)
Avatar:        40px circle, border: 2px solid border-default
```

**Stat Card** (TrustBar)
```
Icon container: 44px × 44px, radius-sm, bg rgba(255,255,255,0.03), border-default
Value:          Monospace, 1.2rem, text-primary
Label:          0.8rem, text-muted
Gap:            14px between icon and text
```

### 5.3 Badges & Chips

**Status Badge**
```
Padding:       4px 12px
Border-radius: radius-full (100px)
Font:          0.72rem, weight 600, letter-spacing +0.3px, uppercase
Variants:
  free:    accent-dim bg,    accent text
  beta:    info-dim bg,      info text
  new:     secondary-dim bg, secondary text
  premium: gold-dim bg,      gold text
```

**Feature Tab Chip** (Features section)
```
Padding:       10px 22px
Border-radius: radius-full
Font:          0.9rem, weight 500
Default:       transparent bg, border-default, text-muted
Active:        accent-dim bg, border accent, text accent
Hover:         border-hover, text-secondary
Min-height:    44px (touch target)
```

**Step Number Ring**
```
Size:          56px × 56px
Shape:         Circle
Border:        2px solid accent
Background:    bg (punched out look)
Text:          DM Mono, 1rem, accent
Shadow:        0 0 20px accent-dim
```

### 5.4 Navigation

**Navbar** (detailed in section 6.1)

**Mobile Bottom Nav** (app pattern, referenced for consistency — not used on website)

**FAQ Accordion**
```
Item:           padding 20px 0, border-bottom: 1px solid border-subtle
Question:       Heading 3 weight, text-primary, cursor pointer
Answer:         body text, text-muted, max-height 0 → auto (transition)
Toggle icon:    Chevron, rotates 180° when open (transition: 0.25s ease)
Expanded bg:    No background change — keep clean
```

**Section Navigation Anchors** (smooth scroll)
- Navbar links scroll to section IDs
- Mobile: links in hamburger menu
- Active section highlighting: navbar link gets `color: accent` when section in viewport

### 5.5 Form Elements

**Input Field**
```
Background:    bg-input
Border:        1px solid border-default
Border-radius: radius-sm
Padding:       12px 16px
Font:          inherit, body size
Color:         text-primary
Placeholder:   text-dim
Focus:         border-color → accent, box-shadow: 0 0 0 3px accent-dim
```

**Email Input + CTA Inline** (used in FinalCTA / newsletter)
```
Layout:       [____email input____] [CTA Button]  ← desktop inline
Mobile:       Stacked vertically, button full-width
```

---

## 6. Page Layout — Section-by-Section

### 6.1 Navbar

**Purpose:** Primary navigation, persistent brand, conversion CTA
**Sticky:** Yes — always visible, backdrop-blur on scroll

#### Mobile Layout (< 768px)
```
┌─────────────────────────────────┐
│  [✦ shtek]          [☰ menu]   │  ← 56px tall
└─────────────────────────────────┘

On hamburger open (slides down):
┌─────────────────────────────────┐
│  Features                       │
│  How It Works                   │
│  Pricing                        │
│  FAQ                            │
│  ─────────────────────────────  │
│  [Start Planning — It's Free →] │ ← full-width primary btn
└─────────────────────────────────┘
```

- Logo: `✦ shtek` — accent colored, font-weight 700
- Hamburger: 3-line → X animation (rotate transform)
- Mobile menu: full-width overlay below navbar, bg rgba(18,16,16,0.95) + blur
- Menu links: 52px tall touch targets, left-aligned with padding
- CTA in mobile menu: full-width primary button at bottom
- Close on outside click or link selection

#### Desktop Layout (≥ 768px)
```
┌──────────────────────────────────────────────────────────────────┐
│  [✦ shtek]    Features  How It Works  Pricing  FAQ  About      [Start Free →]  │
└──────────────────────────────────────────────────────────────────┘
```

- Nav links: 0.9rem, text-muted, pill hover bg
- CTA: accent-dim bg, accent text (navbar-cta style)
- Scroll behavior: transparent → glass (backdrop-blur + border-bottom) after 80px scroll
- Active section: nav link turns `accent` colored (intersection observer)
- Max-width: 1200px centered

---

### 6.2 Hero

**Purpose:** Primary value prop, first impression, main CTA
**Key emotion:** "I can finally understand my money"

#### Mobile Layout (< 768px)
```
┌─────────────────────────────────┐
│                                 │ ← 88px top (navbar clearance)
│  [Beta] Free. No card needed.   │ ← badge line
│                                 │
│  Know exactly where             │
│  your money goes.               │ ← Display XL, tight leading
│                                 │
│  Budget, track spending, and    │
│  plan the life you actually     │
│  want. Made for EUR & RSD.      │ ← subtitle, text-muted
│                                 │
│  [Start Planning — It's Free →] │ ← primary btn, full-width
│  [See How It Works]             │ ← ghost btn, full-width
│                                 │
│  ┌─────────────────────────┐    │
│  │   Animated Dashboard    │    │ ← max-width 360px, centered
│  │       (mock UI)         │    │
│  └─────────────────────────┘    │
│                                 │
│  ✦ 500+ users  ✦ No tracking   │ ← micro trust line
└─────────────────────────────────┘
```

#### Desktop Layout (≥ 1024px)
```
┌──────────────────────────────────────────────────┐
│                                                  │
│  [Beta] Free. No card needed.                    │
│                                                  │
│  Know exactly          ┌─────────────────────┐  │
│  where your money      │  Animated Dashboard  │  │
│  goes.                 │  (mock UI, glowing)  │  │
│                        │                      │  │
│  Budget, track, and    └─────────────────────┘  │
│  plan the life you                              │
│  want.                                          │
│                                                  │
│  [Start Free →]  [See How It Works]             │
│                                                  │
│  ✦ 500+ users  ✦ No card  ✦ Private & secure   │
└──────────────────────────────────────────────────┘
```

**Design Details:**
- Animated ambient background gradients (existing, keep)
- Hero headline: word-by-word `fadeInUp` stagger animation (0.1s delay per word) — keep
- "know exactly where your money goes" — accent color on "goes."
- New: Small badge above headline: `[✦ Beta — Free to use]` in secondary-dim
- New: Micro trust row below CTAs: icon + text pairs (500+ users | No tracking | EUR & RSD)
- Dashboard mock: existing AnimatedDashboard component, preserved + enhanced glow
- Mobile: dashboard below CTAs, centered, max-width 360px
- Desktop: side-by-side grid, dashboard on right, 56px gap

---

### 6.3 TrustBar

**Purpose:** Social proof / credibility immediately below hero fold
**Key emotion:** "Others trust this, I can too"

#### Mobile Layout
```
┌─────────────────────────────────┐
│  ──────── Why people trust ──── │ ← optional label, text-dim, uppercase micro
│                                 │
│  [icon]  500+        [icon]  0  │
│          Users               Tracking                    
│  [icon]  EUR+RSD    [icon]  Free │
│          Currencies          Forever
└─────────────────────────────────┘
```

- 2×2 grid on mobile
- Single flex row on tablet+
- Items: icon box (44×44, radius-sm, bg-card, border-default) + stat value (mono) + label
- Stagger fade-in on scroll enter
- Background: subtle bg-elevated strip, border top + bottom
- Padding: 40px 20px mobile, 48px 40px desktop

**Trust Items:**
1. `👥` / people icon — "500+" / "Beta Users"
2. `🔒` / lock icon — "Zero" / "Data Tracking"
3. `💱` / exchange icon — "EUR + RSD" / "Dual Currency"
4. `✨` / sparkle icon — "Free" / "No Card Needed"

---

### 6.4 Features

**Purpose:** Demonstrate actual product capability with live visual mocks
**Key emotion:** "This app clearly does what I need"

#### Mobile Layout — REDESIGNED for touch
The current desktop tab-bar becomes a **horizontally scrollable pill bar** on mobile:

```
┌─────────────────────────────────┐
│  Everything you need to         │
│  take control                   │ ← H1 centered
│  One app. Every angle.          │ ← subtitle, text-muted
│                                 │
│  ← [Dashboard] [Daily Log] [Bu→ │ ← horizontal scroll, pill tabs
│     dget] [Goals] [Ideal Life]  │   overflow-x: auto, no scrollbar
│                                 │
│  ┌─────────────────────────┐    │
│  │   Feature Mock Visual   │    │ ← full-width card, 260px min-height
│  └─────────────────────────┘    │
│                                 │
│  Your finances at a glance      │ ← H3 tagline
│  See your income, expenses...   │ ← body, text-muted
│  ✓ Income vs expenses           │
│  ✓ Savings rate tracking        │ ← bullet list
│  ✓ Goal progress cards          │
└─────────────────────────────────┘
```

**Mobile Tab Behavior:**
- Pills in a scrollable horizontal row (no wrapping)
- Active pill: accent-dim bg, accent border, accent text
- Auto-scroll selected tab into view center
- Visual mock appears FIRST on mobile (above text) — visual priority
- Text below mock keeps scroll momentum

#### Desktop Layout (restored 2-col)
```
[Text column] ← 1fr    |    [Visual mock] ← 1.2fr
- Tab selector above
- Tagline + description + bullets on left
- Animated feature mock on right
- 48px gap
```

**Interaction:**
- Tab click: fade-out/fade-in panel (0.3s)
- Optional: auto-cycle every 5s (with pause on hover/focus)
- Mock animations trigger on tab switch (chart redraws, counters)

---

### 6.5 HowItWorks

**Purpose:** Reduce friction — show the app is simple to start
**Key emotion:** "I could set this up in 5 minutes"

#### Mobile Layout — REDESIGNED as vertical steps
```
┌─────────────────────────────────┐
│  Start in minutes               │ ← H1 centered
│  No setup hell. No spreadsheet  │
│  imports. Just start.           │
│                                 │
│  ┌─────────────────────────┐    │
│  │  ①                      │    │
│  │  Sign in with Google    │    │
│  │  One tap, no password   │    │
│  │  needed.                │    │
│  └─────────────────────────┘    │
│           │ (connector line)    │
│  ┌─────────────────────────┐    │
│  │  ②                      │    │
│  │  Set your budget        │    │
│  │  Monthly or by category │    │
│  └─────────────────────────┘    │
│           │                     │
│  ┌─────────────────────────┐    │
│  │  ③                      │    │
│  │  Log daily spending     │    │
│  │  Takes under 10 seconds │    │
│  └─────────────────────────┘    │
│           │                     │
│  ┌─────────────────────────┐    │
│  │  ④                      │    │
│  │  Track your goals       │    │
│  │  Watch progress build   │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

**Mobile Step Card Design:**
- Card with left accent border (3px, accent color)
- Step number in ring (accent ring) top-left inside card
- Title: Heading 3
- Description: Body S, text-muted
- Each card stagger-animates in from bottom as it scrolls into view

#### Desktop Layout (horizontal flow — existing)
- 4 steps in flex row with connecting SVG line
- Step rings connected by animated line (drawLine keyframe)
- Connecting line draws in from left as section enters viewport

---

### 6.6 Testimonials / Social Proof *(NEW)*

**Purpose:** Third-party validation from real users
**Key emotion:** "People like me are using this and it works"

#### Mobile Layout
```
┌─────────────────────────────────┐
│  What early users are saying    │ ← H1 centered
│  Real feedback from beta users  │
│                                 │
│  ┌─────────────────────────┐    │
│  │  "                      │    │ ← large accent quote mark
│  │  Finally a budgeting    │    │
│  │  app that works for     │    │
│  │  RSD and EUR together.  │    │ ← quote text, body
│  │                         │    │
│  │  [👤] Ana P.            │    │ ← avatar circle + name
│  │       Belgrade, Serbia  │    │ ← text-dim
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  "Ideal Life feature    │    │
│  │  made me realize I was  │    │
│  │  underearning by 40%."  │    │
│  │  [👤] Marko V. — Novi   │    │
│  └─────────────────────────┘    │
│                                 │
│  ● ○ ○  ← carousel dots (mobile) │
└─────────────────────────────────┘
```

#### Desktop Layout
- 3-column grid of testimonial cards
- All visible (no carousel needed)
- Subtle stagger animation on scroll entry
- Cards have light bg-card surface, no heavy shadows

**Content Notes for Copy:**
- 3–4 testimonials minimum
- Include user first name + city
- Focus on: dual currency relief, goal clarity, "finally works for me"
- Include one with a specific number ("saved 15% more last month")
- Add optional rating (⭐⭐⭐⭐⭐) if authentic

---

### 6.7 Pricing *(NEW)*

**Purpose:** Eliminate pricing confusion — state it's free clearly
**Key emotion:** "I can start for free, no tricks"

#### Mobile Layout
```
┌─────────────────────────────────┐
│  Simple, honest pricing         │ ← H1 centered
│  Start free. No card required.  │
│                                 │
│  ┌─────────────────────────┐    │
│  │  [★ Free Forever]       │    │ ← accent badge top
│  │                         │    │
│  │  Free                   │    │ ← display price
│  │  No credit card needed  │    │ ← text-muted
│  │                         │    │
│  │  ✓ Dashboard & budgeting│    │
│  │  ✓ Daily expense log    │    │
│  │  ✓ Goals (5 active)     │    │
│  │  ✓ Ideal Life planner   │    │
│  │  ✓ EUR + RSD support    │    │
│  │  ✓ Google sign-in       │    │
│  │                         │    │
│  │  [Start for Free →]     │    │ ← primary btn, full-width
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  [Coming Soon]          │    │ ← secondary badge
│  │                         │    │
│  │  Pro Plan               │    │ ← dimmed, future state
│  │  €4.99/month            │    │
│  │                         │    │
│  │  Everything in Free +   │    │
│  │  ✓ Unlimited goals      │    │
│  │  ✓ Export to CSV        │    │
│  │  ✓ Multi-profile        │    │
│  │  ✓ Advanced analytics   │    │
│  │                         │    │
│  │  [Join Waitlist →]      │    │ ← ghost btn
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

#### Desktop Layout
- Side-by-side 2-column: [Free card] [Pro card (dimmed/coming-soon)]
- Free card: accent border, slight accent-surface background, more prominent
- Pro card: border-default, slight opacity reduction, "Coming Soon" badge
- Both cards: equal height, centered content

**Pricing Design Rules:**
- Free tier card MUST visually dominate — it's the conversion point
- "No credit card" message must appear prominently (2× — badge + subtitle)
- Coming Soon pricing: include to signal sustainability / that it won't always be free
- No dark patterns: no crossed-out inflated prices, no countdown timers

---

### 6.8 FAQ *(NEW)*

**Purpose:** Kill objections before they become exit events
**Key emotion:** "My question was answered — I trust this"

#### Layout (Mobile + Desktop — single column, max-width-text)
```
┌─────────────────────────────────┐
│  Frequently asked questions     │ ← H1 centered
│  Still have doubts? We've got   │
│  answers.                       │
│                                 │
│  ─────────────────────────────  │
│  Is it really free?          ↓  │ ← closed state
│  ─────────────────────────────  │
│  Yes. The core app is free...   │ ← expanded, smooth height anim
│                                 │
│  ─────────────────────────────  │
│  Is my data private?         ↓  │
│  ─────────────────────────────  │
│  Do you store my bank info?  ↓  │
│  ─────────────────────────────  │
│  What currencies do you support?↓│
│  ─────────────────────────────  │
│  Can I use it on mobile?     ↓  │
│  ─────────────────────────────  │
│  Who made this?              ↓  │
└─────────────────────────────────┘
```

**Accordion Behavior:**
- One open at a time (collapse others on open) — simpler
- Chevron rotates 180° on open (transition: 0.25s)
- Height animates smoothly (max-height: 0 → auto using measured approach or CSS grid trick)
- Question text: Heading 3 weight, text-primary
- Answer text: Body, text-muted, line-height 1.7

**Suggested FAQ Content:**
1. Is it really free? → Yes, the full app is free in beta. A Pro plan is coming but the core will always have a free tier.
2. Is my data private? → We don't sell or share your data. You can delete everything anytime.
3. Do I need to connect my bank account? → No. You enter expenses manually — we never touch your bank.
4. What currencies are supported? → EUR and RSD. More currencies are planned.
5. Can I use it on my phone? → Yes — the app is designed mobile-first. A native app is planned.
6. Who made this? → Shtek was made by a developer in Serbia who got tired of spreadsheets.

---

### 6.9 About / Story *(NEW)*

**Purpose:** Humanize the product, build emotional connection
**Key emotion:** "A real person made this for people like me"

#### Layout (text-focused, max-width-text, centered)
```
┌─────────────────────────────────┐
│  Made in Serbia. Built from     │
│  frustration.                   │ ← Display L, warm
│                                 │
│  I built Shtek because I spent  │
│  3 years in a spreadsheet maze  │
│  trying to understand whether   │
│  I could actually afford the    │
│  life I wanted.                 │ ← Body L, text-muted
│                                 │
│  Then I realized the tools I    │
│  needed didn't exist for the    │
│  EUR/RSD reality of living in   │
│  Serbia.                        │
│                                 │
│  So I built them.               │ ← accent colored
│                                 │
│  [founder photo or illustration]│ ← optional, 80px circle avatar
│  Rajko — Founder                │
│  Belgrade, Serbia               │
│                                 │
│  ─────────────────────────────  │
│  🇷🇸 Made in Serbia             │
│  💚 Open to feedback            │
│  📧 hello@shtek.me              │
└─────────────────────────────────┘
```

**Design Notes:**
- Background: subtle warm gradient wash (secondary-surface)
- Quote/founder paragraph: large quotation mark accent, offset left
- Founder attribution: small avatar (80px), name + role, text-dim
- Keep it short — 2-3 paragraphs max
- Optional: inline metric "Built over [X] months" or "Used by [X] people in Serbia"

---

### 6.10 Manifesto

**Purpose:** Brand statement / emotional crescendo before final CTA
**Key emotion:** "This resonates with how I actually think about money"

#### Layout (centered, max-width 700px)
```
┌─────────────────────────────────────────┐
│         (ambient gradient bg)           │
│                                         │
│   Most apps track where your            │
│   money went.                           │
│                                         │
│   Shtek helps you design                │
│   where it's going.                     │ ← Display L, accent on "design"
│                                         │
│   Money isn't the goal.                 │
│   It's the tool.                        │
│                                         │
│   [Start Planning — It's Free →]       │ ← primary btn XL, centered
└─────────────────────────────────────────┘
```

**Design Notes:**
- No card/box — text floats on ambient gradient
- Font size generous: clamp(1.5rem, 3.5vw, 2.2rem), weight 600
- Line breaks are intentional — short punchy lines
- Accent on key phrase: `design` / `going`
- CTA re-inforcement directly below
- Fade in as one block on scroll enter

---

### 6.11 FinalCTA

**Purpose:** Last chance conversion before footer
**Key emotion:** "Okay, I'll try it"

#### Layout (centered, max-width 600px)
```
┌─────────────────────────────────┐
│                                 │
│  Your finances. Under control.  │ ← Display L
│  Starting today.                │
│                                 │
│  Free. No card. No excuses.     │ ← text-muted, italic energy
│                                 │
│  [Start Planning — It's Free →] │ ← primary btn XL, full-width mobile
│                                 │
│  Already have an account?       │
│  [Sign in →]                    │ ← ghost link, smaller
│                                 │
│  No credit card · Private · Made│
│  for EUR & RSD                  │ ← micro trust bar
└─────────────────────────────────┘
```

**Design Notes:**
- Subtle ambient gradient (same as manifesto style, different position)
- 3-item trust row with `·` separators
- "Already have an account" sign-in link prevents friction for returning users

---

### 6.12 Footer *(EXPANDED)*

**Purpose:** Navigation utility, legal, brand affirmation
**Current:** Minimal 1-row. New: 4-column expanded.

#### Mobile Layout (stacked)
```
┌─────────────────────────────────┐
│  ✦ shtek                        │ ← logo
│  Budget. Track. Plan.           │ ← tagline, text-muted
│                                 │
│  Product                        │ ← section heading
│  Features                       │
│  How It Works                   │
│  Pricing                        │
│  Download (coming soon)         │
│                                 │
│  Company                        │
│  About                          │
│  Privacy Policy                 │
│  Terms of Service               │
│                                 │
│  Support                        │
│  FAQ                            │
│  Contact (hello@shtek.me)       │
│  Feedback                       │
│                                 │
│  ─────────────────────────────  │
│  🇷🇸 Made in Serbia · Free      │
│  © 2025 Shtek                   │
└─────────────────────────────────┘
```

#### Desktop Layout (4-column grid)
```
[Brand col]     [Product]     [Company]     [Support]
✦ shtek         Features      About         FAQ
Budget. Track.  How It Works  Privacy       Contact
Plan.           Pricing       Terms         Feedback

                    ─────────────────────────
                    🇷🇸 Made in Serbia · Free · © 2025 Shtek
```

**Footer Design Notes:**
- Top border: 1px solid border-default
- Background: bg-base (no elevation change)
- Section headers: Micro uppercase, letter-spacing, text-dim
- Links: 0.85rem, text-muted, hover → accent
- Column gaps: 40px desktop, 0 mobile (full-width stacked)
- Bottom bar: border-top: 1px solid border-subtle, flex row, copyright + badge

---

## 7. Animation & Interaction

### 7.1 Core Animation System

**Philosophy:** Animate to communicate, not to impress. Every animation should make the UI easier to understand or signal state change.

```css
/* Existing keyframes — KEEP ALL */
fadeInUp:      opacity 0→1, translateY(24px→0), 0.6s cubic-bezier(0.16, 1, 0.3, 1)
fadeIn:        opacity 0→1
scaleIn:       opacity 0→1, scale(0.92→1)
shimmer:       background gradient sweep (buttons)
gradientMove:  ambient bg position cycle (20-25s, infinite)
barGrow:       scaleY(0→1) for chart bars
drawLine:      SVG stroke-dashoffset for connecting lines
ringDraw:      SVG donut ring animation
float:         translateY oscillation (dashboard mock)
pulseGlow:     box-shadow breathing (dashboard mock)
slideEntry:    opacity + translateX for list items

/* NEW keyframes */
accordionOpen:  max-height + opacity transition (FAQ)
cardHover:      translateY(-4px) + shadow enhance (testimonial cards)
tabSlide:       translateX for mobile tab content swipe
counterUp:      numeric count-up for stat values (TrustBar)
```

### 7.2 Scroll-Triggered Animations

All sections use Intersection Observer (existing hook). Entry threshold: 15% visible.

**Pattern per section:**
- Section enters viewport → trigger class `.visible` on section root
- Children animate with staggered delays (every 100ms for list items)
- Animation plays once (no replay on scroll out)

**Per-section animation:**
| Section | Animation |
|---|---|
| Navbar | Always visible, no scroll animation |
| Hero | Headline word stagger (0.1s each), subtitle (0.6s), CTAs (0.75s), dashboard (0.4s scaleIn) |
| TrustBar | Items stagger fadeInUp, 0.15s each |
| Features | Header fadeInUp, tabs 0.1s delayed, panel content on tab switch |
| HowItWorks | Step cards stagger 0.15s each, connector line drawLine 1.5s |
| Testimonials | Cards stagger fadeInUp 0.12s each |
| Pricing | Cards scaleIn with slight delay between |
| FAQ | No scroll animation — always visible, interaction-only |
| About | Single block fadeInUp |
| Manifesto | Full block fadeInUp as one |
| FinalCTA | scaleIn, slight bounce |

### 7.3 Micro-interactions

**Buttons:**
- Hover: translateY(-2px) + shadow (primary only)
- Click: translateY(0), scale(0.98) brief
- Shimmer: subtle on primary, always running

**Cards:**
- Testimonial cards: hover translateY(-4px), border → border-hover
- Pricing cards: hover shadow intensifies, featured card accent glow pulses

**Navigation:**
- Hamburger: 3-line → X cross transform (smooth, 0.3s)
- Mobile menu: max-height slide down (0.3s ease)
- Navbar scroll: transparent → glass morphism (0.35s)

**Stats / Numbers:**
- TrustBar values: count-up animation when section enters viewport (0.8s, ease-out)
- Feature mock charts: re-animate on tab switch

**FAQ:**
- Accordion expand: smooth max-height transition (CSS grid row trick or measured JS)
- Chevron: rotate(0deg) → rotate(180deg) on open

**Dashboard Mock:**
- Bar chart: scaleY(0→1) from bottom, 0.6s stagger per bar
- Donut chart: stroke-dasharray draw-in animation
- Progress ring: CSS transition on dasharray
- All: re-trigger when Hero enters viewport (already implemented, keep)

### 7.4 Page Load Sequence

```
0.0s → Page background renders (bg-base immediately)
0.0s → Navbar fades in (no delay)
0.1s → Hero headline word 1 starts
0.8s → All headline words visible
0.6s → Subtitle fades in
0.75s → CTAs fade in
0.4s → Dashboard mock scales in
1.2s → Full hero painted
```

### 7.5 Reduced Motion

Existing `prefers-reduced-motion` rule handles this — KEEP as-is. All animations disable, transitions become near-instant.

---

## 8. Mobile Patterns

### 8.1 Touch Targets

**Rule:** All interactive elements minimum 44×44px touch target (WCAG 2.5.5, Level AA)

| Element | Minimum Size |
|---|---|
| Navbar links | 44px height |
| Hamburger button | 44×44px |
| Mobile menu items | 52px height (taller than min — more touch-friendly) |
| Buttons (all) | 44px height minimum (current btn-lg/xl already compliant) |
| FAQ accordion toggles | Full row clickable, 56px min height |
| Feature tab pills | 44px height (add min-height if not present) |
| Footer links | 40px minimum (can reduce slightly — less critical) |
| Pricing CTA buttons | 52px+ (high conversion importance) |

### 8.2 Horizontal Scrolling Components

**Feature Tabs (mobile):**
- `overflow-x: auto` on tab container
- `scroll-snap-type: x mandatory` on container
- `scroll-snap-align: start` on each tab
- `-webkit-overflow-scrolling: touch`
- No visible scrollbar (`::-webkit-scrollbar: none`)
- Fade gradient on right edge to signal more content

**Testimonials (mobile option):**
- Horizontal scroll carousel OR vertical stack
- Recommendation: vertical stack on mobile (simpler, no horizontal scroll fatigue)
- Desktop: 3-col grid

### 8.3 Mobile Navigation Patterns

**Top Navbar (website):** Sticky, compact (56px mobile height)
**No bottom nav on website** — this is a landing page, not an app. Bottom nav is app-only pattern (shtek-app).

### 8.4 Mobile-Specific Layout Rules

1. **Single column default** — no multi-column layouts under 768px except:
   - TrustBar: 2×2 grid (compact stats)
   - Pricing: stacked (1col) with free card first
   - Goals grid in feature mock: 2col (small, internal to mock)

2. **Full-width CTAs** — primary buttons span full width on mobile (< 480px)

3. **Text alignment** — center-align section headers + subtitles; left-align body text within cards

4. **Dashboard mock** — max-width 360px, centered; appears BELOW CTAs on mobile (not above)

5. **Hero layout order on mobile:**
   1. Badge
   2. Headline
   3. Subtitle
   4. CTAs
   5. Dashboard visual (order: 5 — visual reinforcement after the ask)
   6. Micro trust row

6. **Sticky element clearance** — all sections have padding-top that accounts for 56px navbar on mobile, 64px on desktop

### 8.5 Form Input Patterns (Email capture)

- Font-size minimum 16px on inputs (prevents iOS zoom on focus)
- Autocomplete attributes: `autocomplete="email"` on email fields
- `inputmode="email"` for correct keyboard on iOS/Android
- Submit button immediately follows input (no scrolling required)

### 8.6 Image & Asset Optimization

- Hero visual: SVG-based AnimatedDashboard (no image load)
- Icons: inline SVG or emoji (no icon font weight)
- Founder photo (About section): `loading="lazy"`, WebP with JPEG fallback
- All non-critical images: `loading="lazy"`

---

## 9. Accessibility — WCAG 2.1 AA Compliance

### 9.1 Color Contrast

WCAG AA requires ≥ 4.5:1 for normal text, ≥ 3:1 for large text and UI components.

| Element | Foreground | Background | Ratio | Status |
|---|---|---|---|---|
| Body text | #e8e4de | #121010 | ~14:1 | ✅ AAA |
| Text muted | #8a8580 | #121010 | ~4.7:1 | ✅ AA |
| Accent on bg | #8FB996 | #121010 | ~6.2:1 | ✅ AA |
| Primary btn text | #0e0e0c | #8FB996 | ~8.1:1 | ✅ AAA |
| Secondary text | #D4C5A9 | #121010 | ~9.8:1 | ✅ AAA |
| Info text | #B8C5E3 | #121010 | ~8.1:1 | ✅ AAA |
| Text dim | #5a5550 | #121010 | ~2.8:1 | ⚠️ AA fail — use sparingly, never for content |
| Text on card | #e8e4de | #1a1714 | ~13:1 | ✅ AAA |

**Action:** Audit `text-dim` usage — only use for non-essential decorative text (timestamps, dividers). Never for informative content. If content requires `text-dim`, bump to `text-muted` minimum.

**Gold (#C9A96E) on bg:** ~5.4:1 ✅ — acceptable for badge use.

### 9.2 Keyboard Navigation

- All interactive elements reachable via `Tab`
- Focus order: logical, top-to-bottom, left-to-right
- Focus visible: `:focus-visible` ring using `border-focus` (#8FB996), 3px offset
- Skip link: `<a href="#main-content" class="skip-link">Skip to main content</a>` — visually hidden until focused
- Hamburger menu: `aria-expanded` + `aria-controls` on button
- Mobile menu: `role="navigation"`, `aria-label="Mobile navigation"`
- FAQ accordion: `aria-expanded` on trigger, `aria-controls` on button, `role="region"` on panel

### 9.3 Semantic HTML Structure

```html
<header role="banner">
  <nav aria-label="Main navigation">

<main id="main-content">
  <section aria-label="Hero" id="hero">
  <section aria-label="Social proof" id="trust-bar">
  <section aria-label="Features" id="features">
  <section aria-label="How it works" id="how-it-works">
  <section aria-label="Testimonials" id="testimonials">
  <section aria-label="Pricing" id="pricing">
  <section aria-label="FAQ" id="faq">
  <section aria-label="About" id="about">
  <section aria-label="Manifesto">
  <section aria-label="Get started">

<footer role="contentinfo">
```

- Heading hierarchy: H1 (hero only) → H2 (section titles) → H3 (card titles, feature taglines)
- Only ONE H1 per page (hero headline)
- All images: meaningful `alt` text or `alt=""` if decorative
- AnimatedDashboard SVG: `aria-hidden="true"` (decorative)
- Interactive SVG icons: `aria-label` or `<title>` element

### 9.4 Motion & Animation

- `prefers-reduced-motion: reduce` media query: already implemented ✅
- Do not use animation as the sole indicator of state (e.g., loading spinner needs text too)
- Auto-playing feature tab rotation (if added): pause on hover, stop on `prefers-reduced-motion`

### 9.5 Forms

- Email inputs: `<label>` associated via `htmlFor`/`id` or `aria-label`
- Error states: `aria-describedby` pointing to error message
- Required fields: `required` attribute + visible indicator
- Success states: `role="status"` on success message (screen reader friendly)

### 9.6 Link & Button Clarity

- CTAs: descriptive text ("Start Planning — It's Free", not "Click Here")
- Icon-only buttons: `aria-label` required
- External links: `rel="noopener noreferrer"` (already on app link) + optional `aria-label` noting external

### 9.7 Performance & Cognitive Accessibility

- No auto-playing video/audio
- Flashing content: none (animations are smooth, no flashing)
- Reading level: target grade 8–10 (plain language, short sentences)
- Error prevention: form validation before submit, clear error messages

---

## 10. CSS Architecture Notes

### 10.1 Token Additions (to be added to :root)

```css
:root {
  /* NEW tokens for redesign */
  --bg-elevated:    #171412;
  --bg-overlay:     #201d19;
  --border-subtle:  #1e1a16;
  --border-focus:   #8FB996;
  
  --text-secondary: #b8b4ae;
  
  --accent-light:   #a8d1af;
  --accent-surface: rgba(143, 185, 150, 0.06);
  
  --secondary-surface: rgba(212, 197, 169, 0.04);
  
  --gold:           #C9A96E;
  --gold-dim:       rgba(201, 169, 110, 0.12);
  
  /* Spacing scale */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  
  /* Layout */
  --max-width-text:   760px;
  --max-width-narrow: 600px;
  
  /* Radius additions */
  --radius-xs: 4px;
  --radius-lg: 18px;
  --radius-xl: 24px;
}
```

### 10.2 Section Ordering in App.jsx

```jsx
<Navbar />
<main id="main-content">
  <Hero />          {/* existing */}
  <TrustBar />      {/* existing */}
  <Features />      {/* existing, mobile redesign */}
  <HowItWorks />    {/* existing */}
  <Testimonials />  {/* NEW */}
  <Pricing />       {/* NEW */}
  <FAQ />           {/* NEW */}
  <About />         {/* NEW */}
  <Manifesto />     {/* existing */}
  <FinalCTA />      {/* existing */}
</main>
<Footer />          {/* existing, expanded */}
```

### 10.3 New Component Files

```
src/components/
  Testimonials.jsx     ← NEW
  Pricing.jsx          ← NEW
  FAQ.jsx              ← NEW
  About.jsx            ← NEW
```

---

## 11. Open Questions & Decisions for Architecture

1. **Tailwind vs vanilla CSS?** Brief says "no framework required" — recommend staying vanilla CSS with CSS custom properties as the existing system is mature. Tailwind adds bundle weight for limited gain here.

2. **Testimonial content:** Real users or designed placeholder quotes? Recommend real-ish quotes from beta testing, or honest placeholder copy ("Early beta user, Belgrade") that gets replaced.

3. **Founder photo in About section:** Include real photo for trust, or use initials avatar? Photo is stronger trust signal.

4. **Feature tab auto-cycle:** Nice-to-have but adds complexity. Suggest building without, adding as enhancement if testing shows engagement issues.

5. **Pricing Pro tier:** Include "coming soon" card or just free tier? Including coming-soon card signals the product has a future and isn't abandoned. Recommend including.

6. **Email capture:** Add email capture to FinalCTA for pre-launch of Pro tier? Could be `<input type="email">` + "Notify me when Pro launches" that links to a simple form.

7. **Analytics:** Add cookie consent banner? Depends on analytics approach — if using privacy-first tool (Plausible, Fathom) probably not needed. If GA4, yes.

---

## Appendix A: Component Checklist

| Component | Exists | Mobile-First | Responsive | Accessible |
|---|---|---|---|---|
| Navbar | ✅ | ⚠️ needs audit | ✅ hamburger exists | ⚠️ add aria |
| Hero | ✅ | ⚠️ desktop-first CSS | ✅ 1col mobile | ⚠️ H1 ✅ |
| TrustBar | ✅ | ⚠️ | ✅ | ⚠️ |
| Features | ✅ | ⚠️ tab scroll needed | ⚠️ mobile panel | ⚠️ |
| HowItWorks | ✅ | ⚠️ | ✅ stacked mobile | ⚠️ |
| Testimonials | ❌ NEW | ✅ design first | ✅ | ✅ design first |
| Pricing | ❌ NEW | ✅ | ✅ | ✅ |
| FAQ | ❌ NEW | ✅ | N/A (1col) | ✅ aria-expanded |
| About | ❌ NEW | ✅ | ✅ | ✅ |
| Manifesto | ✅ | ⚠️ | ✅ | ⚠️ |
| FinalCTA | ✅ | ⚠️ | ✅ | ⚠️ |
| Footer | ✅ | ⚠️ minimal | ⚠️ needs expand | ⚠️ |

---

## Appendix B: Design Inspiration References

**Aesthetic direction:** 
- Dark premium: Linear.app, Vercel, Resend.com
- Warm earth tones: NOT cold tech — warm, personal, like a quality notebook
- Data-forward: Numbers presented with monospace, clean charts
- Indie/authentic: Not corporate — shows a real human made this

**What to avoid:**
- Gradients that look like gradient generators (neon rainbow nonsense)
- Light mode conventions ported to dark (pure white text, clinical spacing)
- Oversized hero padding with nothing in it (our biggest current sin)
- Feature sections that list features without showing them

---

*Sally — UX Designer · Shtek Website Redesign · 2026-03-25*
