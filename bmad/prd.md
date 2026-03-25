---
stepsCompleted: [init, discovery, success, journeys, domain, innovation, scoping, functional, non-functional, polish, complete]
inputDocuments: [product-brief.md, src/]
workflowType: prd
date: 2026-03-25
author: John (product-manager)
project: shtek-website-redesign
---

# Product Requirements Document — Shtek Website Redesign

**Author:** John (Product Manager)
**Date:** 2026-03-25
**Version:** 1.0
**Status:** Draft — Ready for UX Design

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [User Personas](#4-user-personas)
5. [Information Architecture & Navigation](#5-information-architecture--navigation)
6. [Conversion Funnel](#6-conversion-funnel)
7. [Functional Requirements](#7-functional-requirements)
8. [Content Requirements](#8-content-requirements)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Constraints](#10-constraints)
11. [Out of Scope](#11-out-of-scope)
12. [Open Questions](#12-open-questions)

---

## 1. Product Overview

### What is Shtek?

Shtek (shtek.me) is a personal finance planning web app built for young professionals in Serbia and the Balkans. It handles dual-currency budgeting (EUR + RSD), daily expense tracking, goal setting with 10+ goal templates, and an "Ideal Life" calculator that shows users the income gap between their current life and the one they want.

The app lives at **app.shtek.me**. The **shtek.me** landing website is its marketing front-door — its sole purpose is to convert curious visitors into signed-up users.

### What is this project?

A **comprehensive redesign** of the shtek.me marketing website. The current site has the right content scaffolding (Hero, Features, HowItWorks, Manifesto) but suffers from mobile-first failures, dead whitespace, missing trust-building sections, and a visual style that undersells the product's actual quality.

This redesign is **Phase 1** of the BMAD product plan. App improvements are Phase 2.

### Redesign Goals

| Priority | Goal |
|----------|------|
| P0 | Mobile-first: design for 375px screens, scale up — not the reverse |
| P0 | Fill content gaps: add Pricing, FAQ, Testimonials, About, Privacy, Comparison sections |
| P0 | Eliminate dead space: tight, purposeful layouts throughout |
| P1 | Modernize visual style: elevate dark theme to premium feel |
| P1 | Improve conversion: sharper value prop, CTAs at every decision point |
| P2 | Improve accessibility: WCAG 2.1 AA compliance |

---

## 2. Problem Statement

### Why does this need to change?

The current shtek.me fails its users at multiple levels:

**Problem 1 — Not mobile-first**
The primary audience (young Balkan professionals) is mobile-heavy. The current site was built desktop-first and shows it: layouts break, touch targets are too small, and the hero split layout doesn't translate to small screens. A visitor landing on mobile gets a broken first impression of a product that should feel polished.

**Problem 2 — Missing trust infrastructure**
A finance app asks for personal data and financial habits. Trust is everything. The current site has no testimonials, no FAQ, no pricing clarity ("is this actually free?"), no privacy reassurance, and no founder story. All of these are table-stakes for a fintech product.

**Problem 3 — Dead space kills momentum**
Sections have excessive padding and empty zones between them. This creates an impression of thinness — a product with not much to say — which is the opposite of the truth.

**Problem 4 — Visual style undersells the product**
The app's dark earth-tone palette is excellent. The website's implementation is inconsistent, with gradients and spacing that feel unintentional rather than designed.

**Problem 5 — Conversion friction**
There are only 2 CTAs in the entire current site (Hero button + Manifesto button). The user journey from landing to signup is not deliberately designed. There's no guiding thread pulling a skeptical visitor toward app.shtek.me.

---

## 3. Goals & Success Metrics

### Primary Metrics (measured 30 days post-launch)

| Metric | Baseline (current) | Target | Method |
|--------|-------------------|--------|--------|
| Bounce rate | TBD (establish baseline) | Decrease by 20% | Analytics |
| Average time on page | TBD | Increase by 40% | Analytics |
| CTA click-through to app.shtek.me | TBD | Increase by 50% | Analytics (UTM) |
| Mobile Lighthouse score | TBD | ≥ 90 (Performance + Accessibility) | Lighthouse CI |
| Desktop Lighthouse score | TBD | ≥ 95 | Lighthouse CI |

### Secondary Metrics

- Mobile:Desktop traffic ratio improvement (mobile sessions should be bounce-lower)
- Scroll depth: ≥ 60% of visitors reach the Pricing section
- FAQ engagement: users interacting with FAQ accordion

### Baseline Action
Analytics events and Lighthouse baseline measurement should be captured **before** launch so post-launch deltas are trackable. If Plausible/Vercel Analytics is not already active, instrument it as part of this project.

---

## 4. User Personas

### Persona A — "The Planner" (Primary)

**Name:** Marko, 28, Belgrade  
**Job:** Junior software developer  
**Income:** €1,200–1,800/month  
**Device:** iPhone, scrolls on the couch  
**Situation:** Earns decent money for Serbia but doesn't know where it goes. Has a vague goal of buying an apartment someday. Has tried Google Sheets, gave up within two months.  
**Motivation:** Wants a simple, beautiful tool that makes him feel in control — not guilty.  
**Fears:** "Is this free? Will I have to pay later? Will it steal my data?"  
**How he finds Shtek:** Instagram ad, friend recommendation, or Google search for "finance app EUR RSD"  
**What converts him:** Seeing the Ideal Life calculator. It's unlike anything he's seen. That + "100% free, no credit card" = signup.

### Persona B — "The Skeptic" (Secondary)

**Name:** Ana, 31, Novi Sad  
**Job:** Marketing manager  
**Income:** €1,500/month + freelance  
**Device:** Android, desktop at work  
**Situation:** Has used Mint, YNAB, and a custom spreadsheet. Nothing stuck. Suspicious of new apps.  
**Motivation:** Wants proof the app is different before committing.  
**Fears:** "Another half-baked startup that'll shut down in 6 months."  
**How she finds Shtek:** Word of mouth, sees a friend using it  
**What converts her:** Testimonials + About section (who built it, are they legit?) + Comparison vs spreadsheets section. She wants to understand before she trusts.

### Persona C — "The Goal-Setter" (Secondary)

**Name:** Stefan, 26, Beograd  
**Job:** Recently promoted, first real salary  
**Device:** Mix of mobile and desktop  
**Situation:** Just hit a salary milestone. Wants to save for a car and maybe an apartment down payment. Never seriously budgeted before.  
**Motivation:** Goal-oriented. Wants a tool that helps him track *progress toward something*, not just track spending.  
**What converts him:** The Goals section — seeing mortgage calculators, emergency fund templates, the "10+ goal templates" claim.

---

## 5. Information Architecture & Navigation

### Section Order (scroll narrative)

The page tells a story. Each section answers the next question a visitor has:

```
1. NAVBAR         → "Who are you?" (sticky, minimal)
2. HERO           → "What does this do?" (hook + primary CTA)
3. TRUST BAR      → "Can I trust this?" (social proof numbers)
4. FEATURES       → "What exactly are the features?" (tabbed detail)
5. HOW IT WORKS   → "How do I start?" (3 steps)
6. COMPARISON     → "Why not just use a spreadsheet?" (vs alternatives)
7. TESTIMONIALS   → "Do real people use this?" (social proof quotes)
8. IDEAL LIFE CTA → "This could be me" (mid-page conversion moment)
9. PRICING        → "What's the catch?" (free tier clarity)
10. FAQ           → "I still have questions" (objection handling)
11. ABOUT         → "Who made this and why?" (founder trust)
12. PRIVACY       → "Is my data safe?" (security reassurance)
13. FINAL CTA     → "Ready to start" (bottom funnel conversion)
14. FOOTER        → Links, legal, social
```

### Navbar Contents

- **Logo:** "shtek" wordmark (left)
- **Links:** Features | How it Works | Pricing | FAQ (anchor links to sections)
- **CTA:** "Start Free →" button (right, always visible)
- **Mobile:** Hamburger → slide-in drawer

### Anchor IDs

```
#features, #how-it-works, #comparison, #testimonials, #pricing, #faq, #about, #privacy
```

---

## 6. Conversion Funnel

### User Journey Map

```
ENTRY (social/search/referral)
        ↓
HERO — Primary CTA: "Start Planning — It's Free" → app.shtek.me
        ↓ (user scrolls, not yet converted)
FEATURES — Secondary CTA: "Try It Free" (below feature tabs)
        ↓
HOW IT WORKS — CTA: "Sign Up in 30 Seconds" 
        ↓
COMPARISON — CTA: "Switch from Spreadsheets →"
        ↓
TESTIMONIALS — (no CTA — trust building only)
        ↓
IDEAL LIFE PROMO — CTA: "Calculate My Ideal Life →" (mid-page conversion spike)
        ↓
PRICING — CTA: "Get Started Free"
        ↓
FAQ — (objection resolution, no CTA)
        ↓
ABOUT — (founder trust, no CTA)
        ↓
PRIVACY — (reassurance, no CTA)
        ↓
FINAL CTA — Full-width: "Your finances. Your plan. Start now." → app.shtek.me
```

### CTA Rules

- Every CTA links to `https://app.shtek.me/` with appropriate UTM tags (e.g., `?utm_source=landing&utm_medium=cta&utm_campaign=hero`)
- Primary CTA style: filled button with shimmer animation (existing design)
- Secondary CTAs: ghost button or text link
- Never more than one primary CTA visible at once
- Sticky navbar "Start Free" button is always the safety net

---

## 7. Functional Requirements

### FR-01: Navbar

| ID | Requirement |
|----|-------------|
| FR-01.1 | Sticky header that stays visible while scrolling |
| FR-01.2 | Logo links to `#hero` (page top) |
| FR-01.3 | Navigation links scroll to anchor sections |
| FR-01.4 | Active section highlighted in nav as user scrolls (Intersection Observer) |
| FR-01.5 | "Start Free →" CTA button links to app.shtek.me with UTM |
| FR-01.6 | Mobile: hamburger icon toggles a full-height side drawer |
| FR-01.7 | Nav background becomes opaque after scrolling 80px (transparent at top) |

### FR-02: Hero Section

| ID | Requirement |
|----|-------------|
| FR-02.1 | Headline: large, animated word-by-word reveal (existing behavior, keep) |
| FR-02.2 | Sub-headline: concise value prop (existing copy acceptable) |
| FR-02.3 | Primary CTA: "Start Planning — It's Free" → app.shtek.me |
| FR-02.4 | Secondary CTA: "See How It Works" → scroll to #how-it-works |
| FR-02.5 | Visual: AnimatedDashboard component (existing, keep) |
| FR-02.6 | Mobile layout: stacked (text first, dashboard below) — NOT side-by-side |
| FR-02.7 | Above-the-fold on 375px screen: headline + CTA must be fully visible without scrolling |

### FR-03: Trust Bar

| ID | Requirement |
|----|-------------|
| FR-03.1 | 3-4 trust stats with count-up animations (existing behavior, keep) |
| FR-03.2 | Stats: "10+ Goal Templates", "2 Currencies (EUR & RSD)", "100% Free · No Credit Card" |
| FR-03.3 | Add 4th stat if user count data is available (e.g., "500+ Users") |
| FR-03.4 | Mobile: wraps to 2×2 grid |

### FR-04: Features Section

| ID | Requirement |
|----|-------------|
| FR-04.1 | Tabbed feature explorer (existing behavior, keep) |
| FR-04.2 | 5 tabs: Dashboard, Daily Log, Budget, Goals, Ideal Life |
| FR-04.3 | Tab click shows feature description + bullet points + mock UI |
| FR-04.4 | Mobile: tabs become horizontal scroll carousel (no wrapping) |
| FR-04.5 | Active tab state clearly visible |
| FR-04.6 | Add CTA "Try It Free →" below the feature panel |
| FR-04.7 | Mock UI components must render correctly on 375px (may need simplification on mobile) |

### FR-05: How It Works

| ID | Requirement |
|----|-------------|
| FR-05.1 | 3-step numbered flow (existing behavior, keep) |
| FR-05.2 | Steps: "Sign up free", "Set your goals & budget", "Track, adjust, achieve" |
| FR-05.3 | Connecting dashed line between steps (existing, keep on desktop) |
| FR-05.4 | Mobile: vertical stack, no horizontal connector line |
| FR-05.5 | Add CTA "Sign Up in 30 Seconds →" below steps |

### FR-06: Comparison Section (NEW)

| ID | Requirement |
|----|-------------|
| FR-06.1 | Visual comparison: Shtek vs Spreadsheet vs Generic Budget App |
| FR-06.2 | Comparison format: feature matrix table or card-based layout |
| FR-06.3 | Columns: Feature | Shtek | Spreadsheet | Other Apps |
| FR-06.4 | Feature rows: Dual currency (EUR/RSD) | Goal templates | Ideal Life calculator | Mobile-friendly | Free | Data ownership |
| FR-06.5 | Shtek column all ✓ (green checkmarks) |
| FR-06.6 | CTA: "Switch from Spreadsheets →" → app.shtek.me |
| FR-06.7 | Mobile: card-per-alternative layout (not horizontal table) |

### FR-07: Testimonials Section (NEW)

| ID | Requirement |
|----|-------------|
| FR-07.1 | Display 3-6 user testimonials/quotes |
| FR-07.2 | Each testimonial: quote text, user name, role/city, optional avatar |
| FR-07.3 | If real testimonials unavailable at launch: use beta user quotes, mark as "Beta User" |
| FR-07.4 | Layout: horizontal card scroll on mobile, 2-3 column grid on desktop |
| FR-07.5 | Visual: styled quote cards matching dark theme |
| FR-07.6 | Section header: "What early users are saying" (honest framing if small user base) |

### FR-08: Ideal Life Promotional Block (NEW)

| ID | Requirement |
|----|-------------|
| FR-08.1 | Mid-page conversion section highlighting the Ideal Life feature specifically |
| FR-08.2 | Visual: animated preview of the Ideal Life calculator mock (existing IdealLifeMock component) |
| FR-08.3 | Copy: emphasizes uniqueness — "Design the life you want. Calculate what it costs." |
| FR-08.4 | CTA: "Try the Ideal Life Calculator →" → app.shtek.me |
| FR-08.5 | This is the highest-emotion section — design it with maximum visual impact |

### FR-09: Pricing Section (NEW)

| ID | Requirement |
|----|-------------|
| FR-09.1 | Single pricing tier: Free |
| FR-09.2 | Clearly list what "Free" includes (all features, no trial, no paywall) |
| FR-09.3 | Optionally show a future "Pro" tier as "Coming Soon" (placeholder only) |
| FR-09.4 | Reinforce: "No credit card required" |
| FR-09.5 | CTA: "Get Started Free →" → app.shtek.me |
| FR-09.6 | Mobile: full-width card |

### FR-10: FAQ Section (NEW)

| ID | Requirement |
|----|-------------|
| FR-10.1 | Accordion-style FAQ (one question open at a time) |
| FR-10.2 | Minimum 8 FAQ items covering: pricing, data privacy, supported currencies, how goals work, mobile access, difference from other apps, signup process, data export |
| FR-10.3 | Expand/collapse with smooth animation |
| FR-10.4 | Schema.org FAQ markup for SEO (FAQPage structured data) |
| FR-10.5 | Mobile: full-width, touch-friendly tap targets (min 48px height) |

#### Suggested FAQ Questions

1. Is Shtek really free? Are there hidden costs?
2. What currencies does Shtek support?
3. Is my financial data secure?
4. Can I use Shtek on my phone?
5. How is Shtek different from a spreadsheet?
6. How does the Ideal Life calculator work?
7. Can I export my data?
8. Who built Shtek and why?

### FR-11: About Section (NEW)

| ID | Requirement |
|----|-------------|
| FR-11.1 | Brief founder story: who built it, why, what problem they were solving personally |
| FR-11.2 | Tone: honest, human, not corporate — "I built this because I was Marko" |
| FR-11.3 | Optional: founder photo/avatar |
| FR-11.4 | Optional: mission statement (1-2 sentences) |
| FR-11.5 | Link to contact/feedback channel if available |

### FR-12: Privacy / Security Reassurance Section (NEW)

| ID | Requirement |
|----|-------------|
| FR-12.1 | Short, visual reassurance block — NOT a full privacy policy |
| FR-12.2 | Key trust points: Google OAuth (no password stored), no selling of data, data stored securely |
| FR-12.3 | Link to full Privacy Policy page (separate route or external doc) |
| FR-12.4 | Icon-driven layout (3-4 reassurance points with icons) |
| FR-12.5 | Copy: plain language, no legal jargon |

### FR-13: Manifesto Section (KEEP, MODIFY)

| ID | Requirement |
|----|-------------|
| FR-13.1 | Keep the "Most apps track where your money went / Shtek helps you decide where it should go" copy — it's excellent |
| FR-13.2 | Elevate visual treatment: make it a full-bleed emotional moment |
| FR-13.3 | CTA: "Start Planning →" (existing, keep) |

### FR-14: Final CTA Section

| ID | Requirement |
|----|-------------|
| FR-14.1 | Full-width high-contrast closing section |
| FR-14.2 | Headline: strong, action-oriented ("Your finances. Your rules. Start free today.") |
| FR-14.3 | Sub-copy: reinforce free, no credit card |
| FR-14.4 | CTA: large primary button → app.shtek.me |
| FR-14.5 | Mobile: single column, centered |

### FR-15: Footer

| ID | Requirement |
|----|-------------|
| FR-15.1 | Logo + tagline |
| FR-15.2 | Links: Features, How it Works, Pricing, FAQ, About, Privacy Policy |
| FR-15.3 | Copyright: "© 2026 Shtek. All rights reserved." |
| FR-15.4 | Optional: social links if present |
| FR-15.5 | Link to app.shtek.me |

---

## 8. Content Requirements

### Tone of Voice

- **Direct and honest** — no hype, no buzzwords
- **Warm but confident** — like a smart friend who's good with money
- **Specific over vague** — "10+ goal templates" not "powerful goal tracking"
- **Serbian/Balkan context** — EUR and RSD are first-class citizens; don't pretend this is for London

### Copy Direction by Section

| Section | Copy Direction |
|---------|----------------|
| Hero | Existing copy is good. May refine headline for mobile line-breaks. Keep "Know exactly where your money goes." |
| Trust Bar | Add user count if available ("500+ users tracking finances"). Otherwise keep existing stats. |
| Features | Existing copy is strong — clear, specific, with concrete bullets. Keep as-is. |
| How It Works | Existing copy works. Consider tightening step descriptions for mobile. |
| Comparison | Simple, factual. Let the checkmarks speak. Don't trash competitors. |
| Testimonials | Real quotes preferred. Honest framing ("early user", "beta") if small sample. Don't fabricate. |
| Ideal Life Block | Emotional, aspirational. "What does your ideal month look like? Build it. See what it costs." |
| Pricing | Clear and direct. "Everything. Free. No tricks." List features explicitly. |
| FAQ | Plain language. Answer the real question behind the question. |
| About | Personal, honest. "I was tired of spreadsheets that fell apart after week two." |
| Privacy | Calm and reassuring. "Your data is yours. We don't sell it. We don't want it." |
| Manifesto | Keep existing copy verbatim — it's the strongest sentence on the page. |
| Final CTA | Short, punchy. Action-oriented. Reinforce zero cost. |

---

## 9. Non-Functional Requirements

### NFR-01: Mobile-First Design

| ID | Requirement |
|----|-------------|
| NFR-01.1 | All layouts designed at 375px first, then enhanced at 768px, 1024px, 1200px+ |
| NFR-01.2 | Touch targets minimum 48×48px (WCAG 2.5.5) |
| NFR-01.3 | No horizontal scroll at any breakpoint |
| NFR-01.4 | Hero CTA above the fold on 375px viewport (no scroll required) |
| NFR-01.5 | Feature tabs become horizontal scroll on mobile (no wrapping) |
| NFR-01.6 | Navbar hamburger menu functional and accessible on mobile |

### NFR-02: Performance

| ID | Requirement |
|----|-------------|
| NFR-02.1 | Lighthouse Mobile Performance score ≥ 90 |
| NFR-02.2 | Lighthouse Desktop Performance score ≥ 95 |
| NFR-02.3 | Lighthouse Accessibility score ≥ 90 |
| NFR-02.4 | Largest Contentful Paint (LCP) < 2.5s on mobile |
| NFR-02.5 | Cumulative Layout Shift (CLS) < 0.1 |
| NFR-02.6 | No render-blocking resources |
| NFR-02.7 | Images (if any) must use modern formats (WebP/AVIF) with width/height specified |
| NFR-02.8 | DM Sans font loaded via `font-display: swap` |

### NFR-03: Accessibility (WCAG 2.1 AA)

| ID | Requirement |
|----|-------------|
| NFR-03.1 | Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text |
| NFR-03.2 | All interactive elements keyboard-navigable |
| NFR-03.3 | Focus indicators visible on all interactive elements |
| NFR-03.4 | FAQ accordion keyboard-accessible (Enter/Space to toggle) |
| NFR-03.5 | Hamburger menu keyboard-accessible with focus trap when open |
| NFR-03.6 | All images have descriptive alt text |
| NFR-03.7 | Semantic HTML throughout (sections, headings hierarchy, landmarks) |
| NFR-03.8 | Animated elements respect `prefers-reduced-motion` media query |
| NFR-03.9 | Screen reader-friendly: ARIA labels where visual-only elements carry meaning |

### NFR-04: SEO

| ID | Requirement |
|----|-------------|
| NFR-04.1 | `<title>` tag: "Shtek — Personal Finance Planning App for Serbia & Balkans" |
| NFR-04.2 | Meta description: compelling 155-char description |
| NFR-04.3 | OpenGraph tags for social sharing |
| NFR-04.4 | FAQ section: FAQPage structured data (JSON-LD) |
| NFR-04.5 | Correct heading hierarchy: one H1, H2 per section, H3 for sub-items |
| NFR-04.6 | Canonical URL set |

### NFR-05: Browser Support

| ID | Requirement |
|----|-------------|
| NFR-05.1 | Chrome/Edge 100+, Firefox 100+, Safari 15+ |
| NFR-05.2 | iOS Safari 15+ (iPhone X and newer) |
| NFR-05.3 | Android Chrome 100+ |

---

## 10. Constraints

| Constraint | Detail |
|------------|--------|
| **Stack** | Must remain React 19 + Vite. No framework migration. |
| **CSS** | Vanilla CSS preferred. Tailwind may be added if team decides, but is not required. |
| **Color DNA** | Core palette must be preserved: `--bg: #121010`, `--accent: #8FB996`, `--secondary: #D4C5A9`. Evolution of secondary colors (--info, --error) is acceptable. |
| **Deployment** | Must deploy to same infrastructure as current site |
| **Animation** | Intersection Observer animation pattern (existing) is the approved approach — continue using it |
| **No New Runtime Dependencies** | Keep bundle lean. No large UI libraries unless justified. |
| **Privacy Policy** | A full Privacy Policy page/document must be linked but may be a separate page or external link — it is not in scope for this redesign to write legal copy |

---

## 11. Out of Scope

The following are explicitly NOT part of this PRD:

- App improvements (app.shtek.me) — this is Phase 2
- A/B testing infrastructure
- Blog or content marketing section
- Multi-language support (Serbian Latin/Cyrillic)
- PWA / app store listing
- Email capture / newsletter
- Cookie consent banner (unless legally required for deployment region)
- Writing the full legal Privacy Policy document
- User authentication or any app functionality on the marketing site

---

## 12. Open Questions

| # | Question | Owner | Priority |
|---|----------|-------|----------|
| Q1 | Do we have real user testimonials available? If not, are beta users willing to provide quotes? | Rajko | P0 — blocks Testimonials section |
| Q2 | What is the current user count? Can we display it in Trust Bar? | Rajko | P1 — adds credibility |
| Q3 | Is there a contact/feedback channel to link from the About section? (email, Discord, etc.) | Rajko | P2 |
| Q4 | Is a "Pro" tier planned? Should Pricing section show a "Coming Soon" paid tier? | Rajko | P1 — shapes Pricing section |
| Q5 | Is analytics currently instrumented? (Plausible, Vercel Analytics, GA4?) | Rajko | P0 — needed for baseline metrics |
| Q6 | Is there a written Privacy Policy or do we need to draft one for the link? | Rajko | P1 — legal requirement |
| Q7 | Should Tailwind be added to this project, or continue vanilla CSS? | Tech lead | P2 — architecture decision |
| Q8 | Is there a founder photo/avatar to include in the About section? | Rajko | P3 |

---

## Appendix A: Existing Color Palette (Design Tokens)

```css
--bg: #121010;           /* Deep dark brown-black */
--bg-card: #1a1714;      /* Card backgrounds */
--bg-input: #1e1a16;     /* Input backgrounds */
--border: #2a2520;       /* Borders */
--text: #e8e4de;         /* Primary text */
--text-muted: #8a8580;   /* Muted text */
--accent: #8FB996;       /* Green accent (primary brand) */
--secondary: #D4C5A9;    /* Warm sand secondary */
--error: #D49A9A;        /* Warm red */
--info: #B8C5E3;         /* Blue info */
```

---

## Appendix B: Existing Component Inventory

| Component | Status | Action |
|-----------|--------|--------|
| Navbar | Keep | Make mobile-friendly (hamburger) |
| Hero | Keep | Fix mobile layout, ensure above-fold CTA |
| TrustBar | Keep | Minor: add user count if available |
| Features | Keep | Fix mobile tabs (horizontal scroll) |
| HowItWorks | Keep | Fix mobile (vertical stack), add CTA |
| Manifesto | Keep | Visual elevation |
| FinalCTA | Keep | Strengthen copy |
| Footer | Keep | Add new section links |
| AnimatedDashboard | Keep | Test mobile performance |
| Comparison | **NEW** | Build from scratch |
| Testimonials | **NEW** | Build from scratch |
| IdealLifePromo | **NEW** | Build from scratch (uses existing IdealLifeMock) |
| Pricing | **NEW** | Build from scratch |
| FAQ | **NEW** | Build from scratch |
| About | **NEW** | Build from scratch |
| Privacy | **NEW** | Build from scratch |

---

*PRD Version 1.0 — Created by John (Product Manager Agent) as part of the BMAD Phase 2 Planning.*  
*Next: UX Design Spec → Sally (ux-designer)*
