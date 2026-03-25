---
stepsCompleted: [validate-prerequisites, design-epics, create-stories, final-validation]
inputDocuments: [product-brief.md, prd.md, ux-design.md]
date: 2026-03-25
author: John (product-manager)
project: shtek-website-redesign
---

# Shtek Website Redesign — Epic & Story Breakdown

**Author:** John (Product Manager)  
**Date:** 2026-03-25  
**Version:** 1.0  
**Status:** Ready for Architecture / Sprint Planning

---

## Overview

This document decomposes the Shtek Website Redesign PRD and UX Design Specification into implementable Epics and Stories. The redesign transforms shtek.me from a desktop-first, content-light landing page into a mobile-first, conversion-optimized marketing surface that builds trust and drives signups to app.shtek.me.

**Stack:** React 19 + Vite, vanilla CSS (no framework migration)  
**Design DNA:** Dark warm earth tones preserved; design system evolved  
**North Star Metric:** CTA click-through to app.shtek.me +50% in 30 days post-launch

---

## Requirements Inventory

### Functional Requirements (from PRD)

| ID | Requirement Summary |
|----|---------------------|
| FR-01 | Navbar — sticky, mobile hamburger, scroll behavior, active section highlighting |
| FR-02 | Hero — mobile-first layout, word-reveal animation, primary + secondary CTAs, AnimatedDashboard |
| FR-03 | TrustBar — count-up stats, 2×2 mobile grid, 4 trust items |
| FR-04 | Features — tabbed explorer, horizontal scroll on mobile, feature mocks, CTA below |
| FR-05 | HowItWorks — 3-step flow, vertical mobile stack, CTA below |
| FR-06 | Comparison — NEW, feature matrix vs spreadsheet/other apps, mobile card layout |
| FR-07 | Testimonials — NEW, 3-6 quote cards, 2-3 col desktop, scroll carousel mobile |
| FR-08 | Ideal Life Promo — NEW, mid-page conversion block with existing IdealLifeMock |
| FR-09 | Pricing — NEW, Free tier + Coming Soon Pro, clear feature lists |
| FR-10 | FAQ — NEW, accordion, 8+ items, Schema.org JSON-LD, touch-friendly |
| FR-11 | About — NEW, founder story, personal tone, contact link |
| FR-12 | Privacy/Security — NEW, icon-driven reassurance, 3-4 trust points, link to policy |
| FR-13 | Manifesto — keep copy, elevate visual treatment, CTA |
| FR-14 | FinalCTA — full-width, strong headline, primary CTA, micro trust bar |
| FR-15 | Footer — expanded 4-column layout, all section links |

### Non-Functional Requirements (from PRD)

| ID | Requirement Summary |
|----|---------------------|
| NFR-01 | Mobile-first design at 375px, scaled to 768px / 1024px / 1200px+ |
| NFR-02 | Lighthouse Mobile ≥ 90 (Performance + Accessibility), Desktop ≥ 95 |
| NFR-03 | WCAG 2.1 AA — contrast, keyboard nav, ARIA, focus indicators, reduced motion |
| NFR-04 | SEO — title, meta description, OpenGraph, FAQPage schema, heading hierarchy |
| NFR-05 | Browser support — Chrome/Edge 100+, Firefox 100+, Safari 15+, iOS Safari 15+ |

### Additional Requirements (from UX Design Spec)

- CSS custom properties (design tokens) for all color, spacing, typography, radius values
- Intersection Observer scroll animation system (existing pattern, extended)
- Smooth transitions/micro-interactions per component spec
- `prefers-reduced-motion` compliance
- Semantic HTML with `<header>`, `<main>`, `<footer>`, `<section>` landmarks
- Skip navigation link for keyboard users

### FR Coverage Map

| Epic | FRs Covered | NFRs Covered |
|------|-------------|--------------|
| Epic 1: Foundation & Design System | — (enabler) | NFR-01, NFR-03 (base) |
| Epic 2: Core Section Redesign | FR-01, FR-02, FR-03, FR-04, FR-05, FR-13, FR-14, FR-15 | NFR-01, NFR-03 |
| Epic 3: New Sections | FR-06, FR-07, FR-08, FR-09, FR-10, FR-11, FR-12 | NFR-01, NFR-03 |
| Epic 4: Performance & Polish | — (cross-cutting) | NFR-02, NFR-03, NFR-04, NFR-05 |

---

## Epic List

| # | Epic | Goal | Priority |
|---|------|------|----------|
| Epic 1 | Foundation & Design System | Establish tokens, shared components, grid, and animation utilities that all other epics build on | P0 |
| Epic 2 | Core Section Redesign | Redesign all 8 existing sections to be mobile-first and conversion-optimized | P0 |
| Epic 3 | New Sections | Build 6 entirely new sections that fill trust/conversion gaps | P0 |
| Epic 4 | Performance & Polish | Optimize assets, SEO, Lighthouse score, cross-browser parity, and accessibility audit | P1 |

---

## Epic 1: Foundation & Design System

**Goal:** Build the shared design infrastructure — CSS tokens, reusable components, responsive grid, and animation utilities — that every other epic depends on. This is a technical enabler; shipping Epic 1 unblocks all parallel work on Epics 2 and 3.

**Completion Definition:** Design system is documented in CSS, all shared components exist as React components, the grid/layout system is in place, and the animation utility hook works correctly.

---

### Story 1.1: Set up CSS custom properties (design tokens)

As a **developer building the redesigned website**,  
I want a comprehensive CSS custom properties system covering colors, typography, spacing, and radius tokens,  
So that all components use consistent design values and changes can be made in one place.

**Priority:** P0  
**Complexity:** S  
**Dependencies:** None (first story, no blockers)

**Description:**  
Implement the full CSS token system as defined in the UX Design Spec (Section 2 and Section 10.1). This extends the existing `:root` variables in `src/index.css` with new semantic tokens for elevation, border variants, text scale, accent variants, gold tokens, and the complete spacing scale. All existing color variables must be preserved; new tokens are additive.

**Acceptance Criteria:**

**Given** the CSS file is loaded in the browser  
**When** a developer inspects `:root` computed styles  
**Then** all color tokens are present: `--bg-base`, `--bg-elevated`, `--bg-card`, `--bg-input`, `--bg-overlay`, `--border-subtle`, `--border-default`, `--border-hover`, `--border-focus`, `--text-primary`, `--text-secondary`, `--text-muted`, `--text-dim`, `--text-disabled`, `--accent`, `--accent-light`, `--accent-dim`, `--accent-glow`, `--accent-surface`, `--secondary`, `--secondary-dim`, `--secondary-surface`, `--info`, `--info-dim`, `--error`, `--error-dim`, `--gold`, `--gold-dim`  
**And** all spacing tokens are present: `--space-1` through `--space-24` (4px increments as per spec)  
**And** all border radius tokens are present: `--radius-xs`, `--radius-sm`, `--radius`, `--radius-lg`, `--radius-xl`, `--radius-full`  
**And** typography tokens are present: `--max-width`, `--max-width-text`, `--max-width-narrow`  
**And** existing color variables (`--bg`, `--accent`, `--secondary`, etc.) remain intact and resolve to the same values (backward compatibility)

**Given** a component uses `var(--accent)` for a color  
**When** the token value is changed in `:root`  
**Then** all components using that token update automatically

**Given** a developer checks font loading  
**When** the page loads  
**Then** DM Sans (weights 400, 500, 600, 700) and DM Mono (weight 500) are loaded with `font-display: swap`

---

### Story 1.2: Create shared components (Button, Card, Section, Badge, Accordion)

As a **developer building page sections**,  
I want a set of reusable React UI primitives that implement the design spec,  
So that all sections use consistent styling with minimal code duplication.

**Priority:** P0  
**Complexity:** M  
**Dependencies:** Story 1.1 (design tokens must exist)

**Description:**  
Build the core shared component library as React components with CSS modules or scoped styles. Components must match the UX Design Spec (Section 5: Component Library). These are primitive building blocks — not full sections.

Components to create:
- **Button** — variants: primary, secondary/ghost, outline-accent, icon; sizes: default, lg, xl; full-width prop
- **Card** — variants: standard, feature, pricing (featured/default), testimonial, stat; hover behavior
- **SectionWrapper** — consistent section padding, max-width, optional dense variant
- **Badge** — variants: free, beta, new, premium/coming-soon; with `--radius-full`
- **Accordion** — single-item and group variants; keyboard accessible; smooth height animation

**Acceptance Criteria:**

**Given** a developer imports `<Button variant="primary" size="xl">` and renders it  
**When** the button is viewed on a 375px mobile screen  
**Then** it renders full-width (via `fullWidth` prop), has minimum 44px height touch target, shows the shimmer animation, and applies correct `--accent` background

**Given** the Button is hovered on desktop  
**When** the hover state activates  
**Then** it applies `translateY(-2px)` and the accent-glow shadow

**Given** a `<Card variant="pricing" featured>` is rendered  
**When** viewed in the browser  
**Then** it has a 1px `--accent` border, `--accent-surface` background, and the accent glow box-shadow as per spec

**Given** a `<Badge variant="free">` is rendered  
**When** viewed in the browser  
**Then** it uses `--accent-dim` background, `--accent` text color, 0.72rem font size, 600 weight, uppercase with +0.3px letter-spacing

**Given** an `<Accordion>` component with items  
**When** a user clicks a question  
**Then** the answer expands with smooth height animation (CSS grid trick or measured JS), the chevron rotates 180°, and other open items collapse  
**And** it is keyboard operable (Enter/Space to toggle)  
**And** `aria-expanded` is correctly set on the trigger button

**Given** a `<SectionWrapper>` is used around section content  
**When** viewed at 375px  
**Then** it applies `padding: 64px 20px`; at 768px+, `padding: 80px 24px`; at 1024px+, `padding: 100px 40px`  
**And** content is max-width `--max-width` (1200px) centered

---

### Story 1.3: Implement mobile-first responsive grid/layout system

As a **developer laying out page sections**,  
I want a consistent responsive grid/layout system using CSS Grid and Flexbox with the project's breakpoints,  
So that sections can be built mobile-first and scale correctly to tablet and desktop widths.

**Priority:** P0  
**Complexity:** S  
**Dependencies:** Story 1.1 (spacing and breakpoint tokens)

**Description:**  
Define the responsive layout utilities as CSS classes or custom properties. Codify the breakpoint values (320px, 480px, 768px, 1024px, 1440px) as CSS custom properties or SCSS variables. Create layout helper classes for the column patterns used across the site: 1-col → 2-col → 3-col, hero split (1fr 1fr), features split (1fr 1.2fr), 4-col footer. Does not include component-specific styles — those live in component CSS.

**Acceptance Criteria:**

**Given** a layout container uses the 2-column grid pattern  
**When** viewed at 375px  
**Then** it renders as a single column with 20px horizontal padding, no horizontal overflow

**When** viewed at 768px+  
**Then** it transitions to a 2-column layout with 24px gap

**Given** the hero split layout is applied  
**When** viewed at 375px  
**Then** content stacks vertically (text above, visual below)

**When** viewed at 1024px+  
**Then** it renders side-by-side: text column (1fr) and dashboard column (1fr)

**Given** any layout at any breakpoint (320px–1440px+)  
**When** viewed in the browser  
**Then** there is no horizontal scrollbar and no content overflow outside the viewport

**Given** all section containers  
**When** viewed at 1440px  
**Then** content is constrained to `--max-width` (1200px) and centered, with the section background spanning full-width if needed

---

### Story 1.4: Set up animation utilities (intersection observer, transitions)

As a **developer adding scroll-triggered animations to sections**,  
I want a reusable Intersection Observer hook and CSS animation keyframe library,  
So that scroll-triggered reveal animations are consistent and accessible across all sections.

**Priority:** P0  
**Complexity:** S  
**Dependencies:** Story 1.1 (design tokens for animation values)

**Description:**  
The existing `useIntersectionObserver` hook and CSS keyframes are the foundation — this story formalizes, extends, and documents them. Add new keyframes required by the UX spec: `accordionOpen`, `counterUp`, `cardHover`. Ensure the `prefers-reduced-motion` media query disables or simplifies all animations. Document the stagger delay pattern (100ms increments) for list items.

**Acceptance Criteria:**

**Given** the `useIntersectionObserver` hook is used on a section  
**When** the section scrolls into the viewport (15% threshold)  
**Then** the `.visible` class is added to the section root element, triggering CSS animations on children

**Given** a section has staggered children  
**When** the `.visible` class is applied  
**Then** children animate with 100–150ms stagger delays via CSS `animation-delay`

**Given** a user has `prefers-reduced-motion: reduce` set in their OS  
**When** any animated element enters the viewport  
**Then** no transform or opacity animations play; transitions are instant or ≤ 100ms

**Given** the CSS keyframe file  
**When** a developer checks available keyframes  
**Then** all existing keyframes are present (`fadeInUp`, `fadeIn`, `scaleIn`, `shimmer`, `gradientMove`, `barGrow`, `drawLine`, `ringDraw`, `float`, `pulseGlow`, `slideEntry`) plus new additions (`accordionOpen`, `counterUp`, `cardHover`)

**Given** the `counterUp` utility is applied to a stat number  
**When** the stat element enters the viewport  
**Then** the number animates from 0 to its target value over 0.8s with ease-out timing

---

## Epic 2: Core Section Redesign

**Goal:** Redesign all 8 existing sections (Navbar, Hero, TrustBar, Features, HowItWorks, Manifesto, FinalCTA, Footer) to be mobile-first, visually elevated, and conversion-optimized, while preserving the existing AnimatedDashboard and animation behaviors that are working well.

**Completion Definition:** All existing sections pass mobile-first layout requirements, have correct touch targets, use the new design token system, and have at least one CTA per section where the PRD specifies one.

---

### Story 2.1: Redesign Navbar (sticky, mobile hamburger, scroll behavior)

As a **visitor on any device**,  
I want a sticky navigation bar that works on mobile with a hamburger menu, highlights my current section, and always shows a "Start Free" CTA,  
So that I can navigate the page easily and always have a clear path to sign up.

**Priority:** P0  
**Complexity:** M  
**Dependencies:** Stories 1.1, 1.2, 1.3

**Description:**  
Implement the Navbar as specified in UX Section 6.1. Mobile: 56px tall, logo + hamburger, slide-down full-width menu. Desktop: logo + nav links + CTA button. Scroll behavior: transparent → glass (backdrop-blur + border-bottom) after 80px. Active section: Intersection Observer highlights current section's nav link. Hamburger: 3-line → X animation. Focus trap in mobile menu.

**Acceptance Criteria:**

**Given** a user opens the site on a 375px mobile screen  
**When** the page loads  
**Then** the navbar is 56px tall, shows the `✦ shtek` logo and a hamburger icon, no nav links visible

**When** the user taps the hamburger  
**Then** a full-width menu slides down with links: Features, How it Works, Pricing, FAQ — each 52px tall touch targets — and a full-width primary CTA button at the bottom  
**And** the hamburger icon animates to an X

**When** the user taps outside the menu or taps a link  
**Then** the menu closes

**Given** a user scrolls down past 80px  
**When** the navbar is in its scrolled state  
**Then** it has a `backdrop-filter: blur` background and a bottom border of `--border-default`  
**And** the transition is smooth (0.35s)

**Given** a user scrolls through the page  
**When** a section enters the viewport  
**Then** the corresponding nav link turns `--accent` color

**Given** a keyboard user tabs through the open mobile menu  
**When** focus reaches the last item  
**Then** focus is trapped within the menu (does not escape to background content)  
**And** pressing Escape closes the menu and returns focus to the hamburger button

**Given** the "Start Free →" CTA in the navbar  
**When** clicked  
**Then** it navigates to `https://app.shtek.me/?utm_source=landing&utm_medium=nav&utm_campaign=navbar`

---

### Story 2.2: Redesign Hero (mobile-first layout, CTAs, animated dashboard)

As a **first-time visitor landing on shtek.me**,  
I want to see a compelling headline, clear CTAs, and the animated dashboard — all above the fold on my phone,  
So that I immediately understand what Shtek is and have a clear invitation to try it.

**Priority:** P0  
**Complexity:** L  
**Dependencies:** Stories 1.1, 1.2, 1.3, 1.4

**Description:**  
Implement the Hero as specified in UX Section 6.2. Mobile layout: badge → headline → subtitle → CTAs (stacked, full-width) → AnimatedDashboard (below, max-width 360px) → micro trust row. Desktop layout: 2-column split (text left, dashboard right). Preserve the existing word-by-word headline animation and AnimatedDashboard component. Ambient background gradients. New: small badge above headline, micro trust row below CTAs.

**Acceptance Criteria:**

**Given** a user lands on shtek.me on a 375px iPhone  
**When** the page loads (no scrolling)  
**Then** they can see: the badge, the headline, the subtitle, and both CTA buttons — all above the fold  
**And** the headline text is at least 2.6rem (clamp to 4.2rem)  
**And** the primary CTA button is full-width with minimum 44px height

**Given** the hero loads  
**When** the page finishes rendering  
**Then** the headline animates word-by-word with 0.1s stagger (fadeInUp), subtitle fades in at 0.6s, CTAs at 0.75s, dashboard scales in at 0.4s

**Given** the hero section on desktop (1024px+)  
**When** viewed in the browser  
**Then** the text column and animated dashboard are side-by-side in a 1fr 1fr grid  
**And** the dashboard has the accent glow box-shadow  
**And** the layout has `min-height: 100vh`

**Given** the primary CTA "Start Planning — It's Free →"  
**When** clicked  
**Then** it navigates to `https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=hero`

**Given** the secondary CTA "See How It Works"  
**When** clicked  
**Then** the page smooth-scrolls to `#how-it-works`

**Given** the AnimatedDashboard component  
**When** rendered on a 375px screen  
**Then** it is max-width 360px, centered, and renders without clipping or horizontal overflow

---

### Story 2.3: Redesign TrustBar

As a **visitor who just saw the Hero**,  
I want to see concise social proof numbers immediately below the fold,  
So that my initial skepticism is addressed with facts before I read further.

**Priority:** P0  
**Complexity:** S  
**Dependencies:** Stories 1.1, 1.2, 1.4

**Description:**  
Implement TrustBar as specified in UX Section 6.3. 4 stat items: beta users, zero tracking, EUR+RSD, Free. Mobile: 2×2 grid. Desktop: single flex row. Each item: icon box (44×44, bg-card, border-default) + monospace stat value + label. Count-up animation on scroll entry. Background: bg-elevated strip with top/bottom borders.

**Acceptance Criteria:**

**Given** a user scrolls to the TrustBar section  
**When** the section enters the viewport (15% threshold)  
**Then** stat values animate up from 0 to their target (e.g., "500+" counts up) over 0.8s  
**And** items stagger with 0.15s delay between them

**Given** a user on a 375px screen  
**When** the TrustBar is visible  
**Then** it renders as a 2×2 grid with equal-width columns, no horizontal overflow

**Given** a user on a 768px+ screen  
**When** the TrustBar is visible  
**Then** all 4 items are in a single centered flex row

**Given** each stat item  
**When** rendered  
**Then** the icon container is exactly 44×44px, the value text uses DM Mono, and the label is 0.8rem text-muted  
**And** all content is legible (meets contrast ratio ≥ 4.5:1)

---

### Story 2.4: Redesign Features section (mobile tab scroll, new mocks)

As a **visitor exploring what Shtek can do**,  
I want to tap through feature tabs that work smoothly on my phone, with each tab showing a relevant visual,  
So that I understand the product's capabilities without leaving the page.

**Priority:** P0  
**Complexity:** L  
**Dependencies:** Stories 1.1, 1.2, 1.3, 1.4

**Description:**  
Implement Features section as specified in UX Section 6.4. Mobile: horizontal scrollable pill tab bar (overflow-x: auto, scroll-snap, no scrollbar), visual mock appears FIRST above text. Desktop: 2-column (text left, mock right). Preserve 5 existing tabs: Dashboard, Daily Log, Budget, Goals, Ideal Life. Keep existing mock components (ensure mobile render at 375px). Add "Try It Free →" CTA below feature panel. Tab fade-in/out panel transition (0.3s). Auto-scroll active tab into view.

**Acceptance Criteria:**

**Given** a user on a 375px mobile screen opens the Features section  
**When** they view the tab bar  
**Then** tabs are displayed as horizontal pills in a scrollable row with no wrapping and no visible scrollbar  
**And** overflow is indicated by a right-edge fade gradient  
**And** each tab is minimum 44px tall

**When** a user taps a feature tab  
**Then** the active tab shows `--accent-dim` background, `--accent` border, `--accent` text  
**And** the active tab is scrolled into horizontal center view  
**And** the mock visual appears above the feature text on mobile  
**And** the panel content fades in over 0.3s

**Given** the Feature mock components  
**When** rendered at 375px width  
**Then** they display correctly within their container without horizontal overflow or broken layout

**Given** the "Try It Free →" CTA below the feature panel  
**When** clicked  
**Then** it navigates to `https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=features`

**Given** a keyboard user navigating tabs  
**When** they use Tab/Enter/Arrow keys  
**Then** they can navigate between tabs and activate them (follows ARIA tabs pattern)

---

### Story 2.5: Redesign HowItWorks

As a **visitor who is convinced of the value but unsure about effort**,  
I want to see a clear, simple step-by-step flow that reassures me it's easy to start,  
So that I remove the last friction before clicking "Sign Up."

**Priority:** P0  
**Complexity:** S  
**Dependencies:** Stories 1.1, 1.2, 1.3, 1.4

**Description:**  
Implement HowItWorks as specified in UX Section 6.5. Mobile: vertical card stack, each card has left accent border (3px), step number ring (accent ring, 56×56, DM Mono), title H3, description Body S. Cards stagger-animate from bottom on scroll entry. Desktop: horizontal flex row with animated connecting SVG line (drawLine keyframe). Add "Sign Up in 30 Seconds →" CTA below steps.

**Acceptance Criteria:**

**Given** a user on mobile views the HowItWorks section  
**When** the section enters the viewport  
**Then** step cards stack vertically and animate in with staggered 0.15s delays (fadeInUp from bottom)  
**And** each card has a 3px left border in `--accent` color  
**And** step number rings are 56×56px circles with `--accent` border and DM Mono text

**Given** a user on desktop (1024px+) views the section  
**When** the section becomes visible  
**Then** steps are in a horizontal flex row and an SVG connector line animates from left to right (drawLine, 1.5s)

**Given** the "Sign Up in 30 Seconds →" CTA  
**When** clicked  
**Then** it navigates to `https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=howitworks`

---

### Story 2.6: Redesign Manifesto

As a **visitor mid-scroll who is emotionally considering signing up**,  
I want to encounter a bold, well-designed brand statement that validates my financial frustration and positions Shtek as the solution,  
So that I feel an emotional connection to the product before the final CTA.

**Priority:** P1  
**Complexity:** S  
**Dependencies:** Stories 1.1, 1.2, 1.3, 1.4

**Description:**  
Implement Manifesto as specified in UX Section 6.10. Full-bleed section with ambient gradient background (same system as Hero). Centered text, max-width 700px. Preserve existing copy verbatim. Font: clamp(1.5rem, 3.5vw, 2.2rem), weight 600. Key word highlighted in `--accent`. Single block fadeInUp animation on scroll entry. CTA "Start Planning →" directly below.

**Acceptance Criteria:**

**Given** a user scrolls to the Manifesto section  
**When** the section enters the viewport  
**Then** the entire text block fades in as one unit (not staggered) with fadeInUp  
**And** the ambient gradient background is subtly visible  
**And** the key design/directional word is colored `--accent`

**Given** the Manifesto on mobile  
**When** rendered at 375px  
**Then** text is centered, at minimum 1.5rem, line breaks create short punchy lines  
**And** CTA button is full-width

**Given** the existing Manifesto copy  
**When** rendered  
**Then** it is preserved verbatim: "Most apps track where your money went. Shtek helps you decide where it should go."

---

### Story 2.7: Redesign FinalCTA

As a **visitor who has read the full page**,  
I want to see a strong, high-contrast final call to action that removes all remaining hesitation,  
So that I click through to app.shtek.me and sign up.

**Priority:** P0  
**Complexity:** S  
**Dependencies:** Stories 1.1, 1.2, 1.3, 1.4

**Description:**  
Implement FinalCTA as specified in UX Section 6.11. Centered layout, max-width 600px. New headline: "Your finances. Under control. Starting today." Secondary copy: "Free. No card. No excuses." Primary CTA XL button (full-width on mobile). Ghost link "Already have an account? Sign in →". Micro trust row: "No credit card · Private · Made for EUR & RSD". Ambient gradient (different position from Hero/Manifesto). scaleIn animation on scroll entry.

**Acceptance Criteria:**

**Given** a user reaches the FinalCTA section  
**When** the section enters the viewport  
**Then** it animates in with scaleIn (slight bounce)  
**And** the primary CTA button is full-width on mobile (< 480px)

**Given** the FinalCTA section  
**When** rendered  
**Then** it has headline "Your finances. Under control. Starting today.", sub-copy "Free. No card. No excuses.", primary CTA, sign-in ghost link, and micro trust row  
**And** the micro trust row shows 3 items separated by `·` characters

**Given** the primary CTA  
**When** clicked  
**Then** it navigates to `https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=final-cta`

**Given** the "Already have an account? Sign in →" link  
**When** clicked  
**Then** it navigates to `https://app.shtek.me/` (sign-in page)

---

### Story 2.8: Redesign Footer (4-column layout)

As a **visitor who has finished reading the page**,  
I want a well-organized footer with links to all sections, company info, and legal pages,  
So that I can navigate to any part of the site or find contact information.

**Priority:** P1  
**Complexity:** S  
**Dependencies:** Stories 1.1, 1.2, 1.3

**Description:**  
Implement Footer as specified in UX Section 6.12. Mobile: stacked columns. Desktop: 4-column grid — Brand (logo + tagline), Product (Features, How It Works, Pricing, Download), Company (About, Privacy Policy, Terms of Service), Support (FAQ, Contact, Feedback). Bottom bar: "🇷🇸 Made in Serbia · Free · © 2026 Shtek". Link styling: 0.85rem, text-muted, hover → accent. Section heading: micro uppercase, text-dim.

**Acceptance Criteria:**

**Given** a user on mobile views the footer  
**When** rendered  
**Then** columns stack vertically, full-width, with the brand column first  
**And** all column links are legible and tappable (≥ 40px height)

**Given** a user on desktop (1024px+) views the footer  
**When** rendered  
**Then** it renders as a 4-column grid with 40px column gaps  
**And** columns are: Brand, Product, Company, Support

**Given** the footer links  
**When** clicked  
**Then** internal page links (Features, Pricing, etc.) smooth-scroll to the correct section anchors  
**And** "Privacy Policy" and "Terms of Service" link to the appropriate pages

**Given** the bottom bar  
**When** rendered  
**Then** it shows "🇷🇸 Made in Serbia · Free · © 2026 Shtek" and has a top border of `--border-subtle`

---

## Epic 3: New Sections

**Goal:** Build 6 entirely new sections that address the trust and conversion gaps identified in the PRD: Testimonials, Pricing, FAQ, About, Privacy/Security, and Comparison. These sections are the primary reason users currently leave the site unconverted.

**Completion Definition:** All 6 new sections are built, mobile-first, integrated into App.jsx in the correct page order, connected to the design system, and pass basic accessibility checks.

---

### Story 3.1: Build Testimonials / Social Proof section

As a **skeptical visitor considering signing up**,  
I want to read real quotes from people who have used Shtek,  
So that I trust the product is genuinely useful before committing.

**Priority:** P0  
**Complexity:** M  
**Dependencies:** Stories 1.1, 1.2, 1.3, 1.4; real or approved placeholder testimonial copy (Q1 from PRD)

**Description:**  
Build the Testimonials section as specified in UX Section 6.6. 3-4 testimonial cards minimum. Mobile: vertical stack. Desktop: 3-column grid. Each card: quote text, user name + city, optional avatar circle (40px), optional ⭐⭐⭐⭐⭐ rating. Large decorative quote mark (2rem, accent, 0.3 opacity). Section header: "What early users are saying" with subtitle "Real feedback from beta users." Cards stagger-animate on scroll entry. Content should not be fabricated — use real beta quotes or clearly labeled "Beta User, Belgrade" attribution.

**Acceptance Criteria:**

**Given** the Testimonials section renders  
**When** viewed at 375px  
**Then** testimonial cards stack in a single column  
**And** each card shows: decorative quote mark, quote text, user name + location  
**And** the section heading and subtitle are centered above the cards

**Given** the section on desktop (1024px+)  
**When** rendered  
**Then** testimonials display in a 3-column grid with equal-height cards

**Given** the section enters the viewport  
**When** the Intersection Observer fires  
**Then** cards animate in with stagger (0.12s between each)

**Given** the testimonial content  
**When** copy is reviewed  
**Then** testimonials reference Shtek-specific value: dual currency relief, Ideal Life feature, goal tracking — not generic finance app praise  
**And** attributions are honest (not fabricated full names without consent)

**Given** the testimonial cards  
**When** hovered on desktop  
**Then** cards lift with `translateY(-4px)` and border transitions to `--border-hover`

---

### Story 3.2: Build Pricing section (Free + Coming Soon Pro)

As a **visitor who wonders if there's a hidden cost**,  
I want to see a clear pricing section that explicitly states Shtek is free with no credit card required,  
So that I can sign up without anxiety about future charges.

**Priority:** P0  
**Complexity:** M  
**Dependencies:** Stories 1.1, 1.2, 1.3; confirmation from owner on Pro tier scope (Q4 from PRD)

**Description:**  
Build the Pricing section as specified in UX Section 6.7. Two cards: "Free Forever" (featured, accent border + glow, accent-surface background) and "Pro Plan — Coming Soon" (dimmed, reduced prominence, ghost CTA). Free card lists all included features explicitly. Free card: full-width CTA button → app.shtek.me. Coming Soon card: ghost "Join Waitlist →" button. Section headline: "Simple, honest pricing." Mobile: stacked single column, Free card first.

**Acceptance Criteria:**

**Given** a user views the Pricing section  
**When** rendered  
**Then** the section headline is "Simple, honest pricing" and subtitle "Start free. No card required."  
**And** "No credit card needed" message appears at least twice (badge + card subtitle)

**Given** the Free tier card  
**When** rendered  
**Then** it has a 1px `--accent` border, the accent glow box-shadow, and `--accent-surface` background  
**And** it lists all features: Dashboard & budgeting, Daily expense log, Goals (5 active), Ideal Life planner, EUR + RSD support, Google sign-in  
**And** the primary CTA "Start for Free →" is present and navigates to app.shtek.me with UTM

**Given** the Pro tier card  
**When** rendered  
**Then** it has a "Coming Soon" badge in `--info-dim`/`--info` colors  
**And** it shows planned features (Unlimited goals, Export to CSV, Multi-profile, Advanced analytics)  
**And** it is visually less prominent than the Free card (reduced opacity or standard card styling)  
**And** the "Join Waitlist →" is a ghost button

**Given** a user on mobile  
**When** viewing the Pricing section  
**Then** cards are stacked single column, Free card appears first  
**And** the Free card CTA button is full-width

---

### Story 3.3: Build FAQ accordion section

As a **visitor who still has unanswered objections**,  
I want to quickly find answers to common questions via an accordion FAQ,  
So that my specific doubts are resolved and I have no reason left not to sign up.

**Priority:** P0  
**Complexity:** M  
**Dependencies:** Stories 1.1, 1.2 (Accordion component), 1.4; FAQ copy must be approved

**Description:**  
Build the FAQ section as specified in UX Section 6.8 using the shared Accordion component from Story 1.2. Single column, max-width-text (760px), centered. 8 FAQ items minimum (per PRD FR-10.2). Implement Schema.org FAQPage structured data as JSON-LD `<script>` tag in the component. One question open at a time. Section heading: "Frequently asked questions."

**FAQ items (from PRD/UX spec):**
1. Is it really free? Are there hidden costs?
2. Is my financial data secure?
3. Do I need to connect my bank account?
4. What currencies does Shtek support?
5. Can I use Shtek on my phone?
6. How does the Ideal Life calculator work?
7. Can I export my data?
8. Who built Shtek and why?

**Acceptance Criteria:**

**Given** the FAQ section renders  
**When** a user clicks a question  
**Then** the answer expands with smooth height animation  
**And** the chevron rotates 180°  
**And** any previously open item collapses

**Given** the FAQ accordion items  
**When** a keyboard user navigates with Tab and presses Enter or Space  
**Then** the item toggles correctly  
**And** `aria-expanded` on the trigger button reflects the current state  
**And** the answer region has the correct `role` and `aria-labelledby`

**Given** a user on a 375px screen  
**When** they tap a FAQ item  
**Then** the clickable area is at minimum 48px tall  
**And** the answer text is legible at body size (1rem, text-muted)

**Given** the page HTML source  
**When** inspected for structured data  
**Then** a `<script type="application/ld+json">` tag containing valid `FAQPage` Schema.org markup is present  
**And** it includes all 8 FAQ questions and answers

---

### Story 3.4: Build About / Story section

As a **skeptical visitor wondering "who is behind this?"**,  
I want to read an honest, personal founder story,  
So that I feel confident that a real, motivated person built and maintains Shtek.

**Priority:** P1  
**Complexity:** S  
**Dependencies:** Stories 1.1, 1.2, 1.3; founder copy approved by Rajko; optional founder photo

**Description:**  
Build the About section as specified in UX Section 6.9. Text-focused layout, max-width-text (760px), centered. Subtle warm gradient wash background (secondary-surface). Founder paragraph(s): honest, first-person, referencing the EUR/RSD frustration origin story. Optional founder photo (80px circle avatar). Footer row: 🇷🇸 Made in Serbia, 💚 Open to feedback, 📧 contact link. Single fadeInUp animation on scroll entry.

**Acceptance Criteria:**

**Given** the About section renders  
**When** viewed at 375px  
**Then** content is centered, single column, with the founder story text legible at body size  
**And** the section has a subtle warm gradient background (not identical to Hero)

**Given** the founder attribution  
**When** rendered  
**Then** it shows founder name + "Founder" + "Belgrade, Serbia"  
**And** if a photo is provided: it renders as an 80px circle with a 2px border

**Given** the contact link  
**When** clicked  
**Then** it opens `mailto:hello@shtek.me` (or approved contact channel)

**Given** the section copy  
**When** reviewed  
**Then** it is in honest, personal first-person tone (not corporate)  
**And** it references the EUR/RSD personal finance problem specifically  
**And** it is 2-3 paragraphs maximum (no walls of text)

---

### Story 3.5: Build Privacy / Security section

As a **privacy-conscious visitor considering signing up with Google OAuth**,  
I want to see a clear, visual summary of how my data is handled,  
So that I trust Shtek won't misuse my financial information.

**Priority:** P0  
**Complexity:** S  
**Dependencies:** Stories 1.1, 1.2, 1.3; Privacy Policy page URL or link target

**Description:**  
Build the Privacy/Security section as specified in PRD FR-12. Short icon-driven layout with 3-4 trust points. Not a full privacy policy — a reassurance block. Key points: Google OAuth (no password stored), no data selling, secure storage, user data ownership/deletion. Link to full Privacy Policy. Plain language only. Section is NOT content-heavy — it should feel like a stamp of confidence.

**Trust Points (from PRD + UX spec):**
1. 🔒 Google Sign-In — No password stored by Shtek, ever
2. 🚫 We don't sell your data — Your financial habits are yours
3. 🗑️ Delete anytime — Export or delete everything with one click
4. 🛡️ Secure storage — Data stored on Supabase with RLS policies

**Acceptance Criteria:**

**Given** the Privacy section renders  
**When** viewed on mobile  
**Then** trust points stack as a 2×2 grid or vertical list with icon + heading + description per item  
**And** icons are meaningful (not decorative), with `aria-label` or visible text alternatives

**Given** the trust point copy  
**When** reviewed  
**Then** it uses plain language (no legal jargon)  
**And** each point is ≤ 2 short sentences  
**And** the word "bank account" is explicitly NOT mentioned (Shtek doesn't connect to banks)

**Given** the "Privacy Policy" link  
**When** clicked  
**Then** it navigates to the full Privacy Policy page (external link opens in new tab with `rel="noopener noreferrer"`)

**Given** the section  
**When** rendered  
**Then** the background is visually distinct from adjacent sections (use `--bg-elevated` or subtle border treatment)

---

### Story 3.6: Build Comparison section (vs spreadsheets)

As a **visitor who currently uses Google Sheets or a competitor**,  
I want to see a factual comparison of Shtek vs alternatives,  
So that I understand the specific advantages without Shtek trashing competitors.

**Priority:** P1  
**Complexity:** M  
**Dependencies:** Stories 1.1, 1.2, 1.3, 1.4; comparison feature matrix content approved

**Description:**  
Build the Comparison section as specified in PRD FR-06. Feature matrix: Shtek vs Spreadsheet vs Generic Budget App. Desktop: 3-column table/grid. Mobile: card-per-alternative layout (stacked) or a simplified visual format (not a horizontal table). Shtek column: all ✓ (accent checkmarks). Features compared: Dual currency (EUR/RSD), Goal templates, Ideal Life calculator, Mobile-friendly, Free, Data ownership, Manual entry (no bank link required). CTA: "Switch from Spreadsheets →" → app.shtek.me. Tone: factual, not smug.

**Acceptance Criteria:**

**Given** the Comparison section on desktop (1024px+)  
**When** rendered  
**Then** it shows a 3-column layout: rows of features, columns: Feature | Shtek | Spreadsheet | Other Apps  
**And** Shtek checkmarks are colored `--accent`  
**And** missing features in competitor columns show a muted ✗ or dash

**Given** the Comparison section on mobile (< 768px)  
**When** rendered  
**Then** it does NOT render as a horizontal table (would cause horizontal scroll)  
**And** instead renders as stacked cards or a simplified mobile-friendly format that conveys the same information  
**And** there is no horizontal overflow

**Given** the comparison data  
**When** reviewed  
**Then** it includes: Dual currency (EUR/RSD), Goal templates, Ideal Life calculator, Mobile-friendly design, Free, Data ownership, No bank connection required  
**And** Shtek has ✓ for all rows  
**And** the tone is factual, without mocking or disparaging competitors by name

**Given** the "Switch from Spreadsheets →" CTA  
**When** clicked  
**Then** it navigates to `https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=comparison`

---

## Epic 4: Performance & Polish

**Goal:** Ensure the redesigned site meets Lighthouse score targets (≥ 90 mobile, ≥ 95 desktop), is properly indexed by search engines, works across all target browsers, and passes a formal WCAG 2.1 AA accessibility audit.

**Completion Definition:** Lighthouse CI reports pass, SEO tags are complete, cross-browser testing is documented with no critical failures, and accessibility audit issues are resolved.

---

### Story 4.1: Image optimization (WebP, lazy loading)

As a **mobile user on a limited data connection**,  
I want images to load quickly and only when I need them,  
So that the page is fast and doesn't waste my data on content I haven't scrolled to.

**Priority:** P0  
**Complexity:** S  
**Dependencies:** All Epic 2 and Epic 3 stories (images are added during section implementation)

**Description:**  
Audit all images added during the redesign (founder photo in About, any mock screenshots, icons). Convert to WebP format with JPEG fallback using `<picture>` elements. Add `loading="lazy"` to all non-critical images (anything below the fold). Add explicit `width` and `height` attributes to prevent CLS. The AnimatedDashboard (SVG-based) has no image to optimize — focus on raster assets.

**Acceptance Criteria:**

**Given** any image added to the site  
**When** the HTML is inspected  
**Then** non-hero images have `loading="lazy"` attribute  
**And** all images have explicit `width` and `height` attributes  
**And** raster images serve WebP format with a JPEG fallback via `<picture>` / `<source>` element

**Given** the page loads with network throttling (Fast 3G)  
**When** the hero area is visible  
**Then** images below the fold are not yet loaded (lazy loading confirmed in Network panel)

**Given** the page renders  
**When** images load  
**Then** there is no Cumulative Layout Shift from images (CLS < 0.1 contribution from images)  
**And** all images have meaningful `alt` text (or `alt=""` if purely decorative)

---

### Story 4.2: SEO (meta tags, structured data, sitemap)

As a **person searching for a finance app for Serbia**,  
I want shtek.me to appear in search results with a compelling title and description,  
So that Shtek can grow organically without relying only on paid channels.

**Priority:** P0  
**Complexity:** S  
**Dependencies:** Story 3.3 (FAQPage schema is part of FAQ story — this story handles page-level SEO)

**Description:**  
Implement page-level SEO as specified in PRD NFR-04. Update `index.html` (or React Helmet/Head) with correct title, meta description, OpenGraph tags, canonical URL. Verify heading hierarchy across all sections (one H1 in Hero, H2 for section titles, H3 for sub-items). Generate sitemap.xml. Ensure robots.txt is present and correct. Note: FAQ structured data (FAQPage JSON-LD) is implemented in Story 3.3 — this story ensures it's validated and present.

**Acceptance Criteria:**

**Given** the page HTML source  
**When** inspected  
**Then** `<title>` is "Shtek — Personal Finance Planning App for Serbia & Balkans"  
**And** `<meta name="description">` is a compelling 140-155 character description mentioning Serbia, EUR/RSD, and free  
**And** `<meta property="og:title">`, `<meta property="og:description">`, and `<meta property="og:image">` are all present  
**And** `<link rel="canonical" href="https://shtek.me/">` is present

**Given** the page heading structure  
**When** audited with an accessibility/SEO tool  
**Then** there is exactly one `<h1>` (in the Hero section)  
**And** each major section uses `<h2>` for section titles  
**And** sub-items within sections use `<h3>`  
**And** no heading levels are skipped

**Given** `https://shtek.me/sitemap.xml`  
**When** fetched  
**Then** it returns a valid XML sitemap containing the shtek.me URL  
**And** `https://shtek.me/robots.txt` exists and does not disallow search engine crawlers

**Given** the FAQPage structured data (from Story 3.3)  
**When** validated with Google's Rich Results Test  
**Then** it passes without errors

---

### Story 4.3: Lighthouse optimization (target ≥ 90 mobile)

As a **product owner measuring site quality**,  
I want the site to score ≥ 90 on Lighthouse Mobile Performance and ≥ 95 on Desktop,  
So that users get a fast, high-quality experience and the site ranks well in search.

**Priority:** P0  
**Complexity:** M  
**Dependencies:** Stories 4.1, 4.2, and all section implementation stories (Epic 2 and 3 complete)

**Description:**  
Run Lighthouse CI (or PageSpeed Insights) against the deployed/preview site. Identify and fix any Performance, Accessibility, Best Practices, or SEO issues that are blocking the target scores. Common fixes: eliminate render-blocking resources, ensure `font-display: swap`, optimize LCP image/element, fix CLS issues, ensure no console errors. Document baseline scores before any optimization work (per PRD: capture baseline if not already done).

**Acceptance Criteria:**

**Given** the deployed shtek.me site  
**When** Lighthouse Mobile audit runs (simulated throttling, 4G)  
**Then** Performance score ≥ 90  
**And** Accessibility score ≥ 90  
**And** Best Practices score ≥ 90  
**And** SEO score ≥ 90

**When** Lighthouse Desktop audit runs  
**Then** Performance score ≥ 95

**Given** the Core Web Vitals  
**When** measured via Lighthouse  
**Then** LCP < 2.5s on mobile  
**And** CLS < 0.1  
**And** FID/INP in "Good" range

**Given** the DM Sans font loading  
**When** audited  
**Then** `font-display: swap` is confirmed in the font face declaration  
**And** there are no render-blocking font requests

**Given** the animation system  
**When** audited  
**Then** there are no JavaScript-forced layout recalculations (avoid changing width/height in rAF)  
**And** CSS animations use `transform` and `opacity` only (GPU-composited)

---

### Story 4.4: Cross-browser testing

As a **visitor using Safari on iPhone, Chrome on Android, or Firefox on desktop**,  
I want shtek.me to render and function correctly in my browser,  
So that I get the same quality experience regardless of which browser I use.

**Priority:** P1  
**Complexity:** M  
**Dependencies:** All Epic 2 and Epic 3 stories complete; staging environment available

**Description:**  
Execute a structured cross-browser test pass as specified in PRD NFR-05. Target browsers: Chrome 100+, Edge 100+, Firefox 100+, Safari 15+, iOS Safari 15+ (iPhone), Android Chrome 100+. Test matrix covers: all section layouts, hamburger menu, FAQ accordion, feature tab scroll, animations, CTA links. Document results in a test matrix. Fix critical failures (broken layouts, non-functional interactions). Note: pixel-perfect parity is not required — functional equivalence is.

**Acceptance Criteria:**

**Given** shtek.me is loaded in Chrome 100+ on desktop  
**When** all sections are viewed  
**Then** layouts, animations, interactions, and CTAs all function correctly

**Given** shtek.me is loaded in Firefox 100+ on desktop  
**When** the hamburger menu, FAQ accordion, and feature tabs are tested  
**Then** all interactions work correctly  
**And** `backdrop-filter: blur` degrades gracefully if unsupported (fallback background opacity)

**Given** shtek.me is loaded in Safari 15+ on macOS  
**When** all sections are viewed and interacted with  
**Then** no critical layout breaks  
**And** sticky navbar works correctly  
**And** smooth scroll anchors work

**Given** shtek.me is loaded in iOS Safari 15+ on iPhone  
**When** tested  
**Then** the hamburger menu opens and closes correctly  
**And** touch targets for all interactive elements are at minimum 44×44px  
**And** email input does not cause iOS zoom (font-size ≥ 16px)  
**And** horizontal scroll components (feature tabs) work with touch scrolling

**Given** shtek.me is loaded in Android Chrome 100+  
**When** tested  
**Then** behavior is equivalent to iOS Safari test expectations

**Given** the cross-browser test run  
**When** complete  
**Then** a test matrix is documented listing tested browsers, tested interactions, and results (pass/fail/note)

---

### Story 4.5: Accessibility audit (WCAG 2.1 AA)

As a **user who relies on a screen reader or keyboard navigation**,  
I want shtek.me to be fully navigable without a mouse,  
So that I can use the site and sign up for Shtek regardless of my abilities.

**Priority:** P1  
**Complexity:** M  
**Dependencies:** All Epic 2 and Epic 3 stories complete; Story 4.3 (Lighthouse a11y score baseline)

**Description:**  
Execute a formal WCAG 2.1 AA accessibility audit using automated tools (axe DevTools, Lighthouse) plus manual keyboard navigation testing. Audit covers: color contrast, keyboard navigation order, focus visibility, ARIA labels, semantic HTML, screen reader output for key interactions (hamburger menu, FAQ accordion, feature tabs). Fix all critical (A-level) and major (AA-level) issues. Document any known failures with rationale if deferred.

**Acceptance Criteria:**

**Given** the axe DevTools extension runs on shtek.me  
**When** the full audit completes  
**Then** there are zero critical violations  
**And** there are zero serious violations  
**And** any moderate violations are documented and assessed (not ignored)

**Given** a user navigates the site using only the keyboard (Tab, Shift+Tab, Enter, Space, Escape, Arrow keys)  
**When** they navigate through all interactive elements  
**Then** all interactive elements are reachable via Tab in logical order  
**And** focus indicators are clearly visible on every focused element (`:focus-visible` ring using `--border-focus`)  
**And** the hamburger menu opens with Enter/Space and closes with Escape  
**And** the FAQ accordion opens/closes with Enter/Space  
**And** the mobile hamburger menu traps focus when open  
**And** a skip navigation link is available and functional (visually hidden until focused)

**Given** a screen reader user (VoiceOver on iOS or NVDA on Windows)  
**When** navigating through the page  
**Then** section landmarks are announced correctly (header, nav, main, footer)  
**And** the AnimatedDashboard SVG is announced as decorative (`aria-hidden="true"`)  
**And** CTA button text is meaningful ("Start Planning — It's Free" not "Click Here")  
**And** the FAQ accordion's expanded/collapsed state is announced

**Given** all text and UI elements  
**When** contrast ratios are measured  
**Then** body text (`--text-primary` on `--bg-base`) meets ≥ 4.5:1  
**And** muted text (`--text-muted` on `--bg-base`) meets ≥ 4.5:1  
**And** `--text-dim` is confirmed to only appear on non-informative/decorative content

**Given** all animated elements  
**When** `prefers-reduced-motion: reduce` is set in the OS  
**Then** all CSS animations and transitions are disabled or reduced to ≤ 100ms  
**And** the page is fully functional and readable without animations

---

## Story Map Summary

| Story | Epic | Priority | Complexity | Dependencies |
|-------|------|----------|------------|--------------|
| 1.1 CSS Design Tokens | Foundation | P0 | S | None |
| 1.2 Shared Components | Foundation | P0 | M | 1.1 |
| 1.3 Responsive Grid | Foundation | P0 | S | 1.1 |
| 1.4 Animation Utilities | Foundation | P0 | S | 1.1 |
| 2.1 Navbar | Core Redesign | P0 | M | 1.1, 1.2, 1.3 |
| 2.2 Hero | Core Redesign | P0 | L | 1.1, 1.2, 1.3, 1.4 |
| 2.3 TrustBar | Core Redesign | P0 | S | 1.1, 1.2, 1.4 |
| 2.4 Features | Core Redesign | P0 | L | 1.1, 1.2, 1.3, 1.4 |
| 2.5 HowItWorks | Core Redesign | P0 | S | 1.1, 1.2, 1.3, 1.4 |
| 2.6 Manifesto | Core Redesign | P1 | S | 1.1, 1.2, 1.3, 1.4 |
| 2.7 FinalCTA | Core Redesign | P0 | S | 1.1, 1.2, 1.3, 1.4 |
| 2.8 Footer | Core Redesign | P1 | S | 1.1, 1.2, 1.3 |
| 3.1 Testimonials | New Sections | P0 | M | 1.1, 1.2, 1.3, 1.4 + copy |
| 3.2 Pricing | New Sections | P0 | M | 1.1, 1.2, 1.3 + Pro scope |
| 3.3 FAQ | New Sections | P0 | M | 1.1, 1.2 (Accordion), 1.3 + copy |
| 3.4 About | New Sections | P1 | S | 1.1, 1.2, 1.3 + copy/photo |
| 3.5 Privacy/Security | New Sections | P0 | S | 1.1, 1.2, 1.3 + policy URL |
| 3.6 Comparison | New Sections | P1 | M | 1.1, 1.2, 1.3, 1.4 |
| 4.1 Image Optimization | Polish | P0 | S | Epics 2+3 done |
| 4.2 SEO | Polish | P0 | S | Story 3.3 (FAQ schema) |
| 4.3 Lighthouse Optimization | Polish | P0 | M | Stories 4.1, 4.2 + Epics 2+3 |
| 4.4 Cross-browser Testing | Polish | P1 | M | Epics 2+3 done |
| 4.5 Accessibility Audit | Polish | P1 | M | Epics 2+3 done |

---

## Open Questions (Blocking / Near-term)

| # | Question | Blocks | Owner | Priority |
|---|----------|--------|-------|----------|
| Q1 | Real testimonial quotes available from beta users? | Story 3.1 | Rajko | P0 |
| Q4 | Is Pro tier planned? Confirm feature list for Pricing "Coming Soon" card | Story 3.2 | Rajko | P1 |
| Q5 | Is analytics instrumented? Capture baseline metrics before launch | Pre-launch | Rajko | P0 |
| Q6 | Privacy Policy page URL — where does the link in FR-12 point? | Story 3.5 | Rajko | P1 |
| Q8 | Founder photo available for About section? | Story 3.4 | Rajko | P3 |

---

*Epics Version 1.0 — Created by John (Product Manager Agent) as part of the BMAD Phase 3 Solutioning.*  
*Next: Architecture (Winston) → Sprint Planning (Bob)*
