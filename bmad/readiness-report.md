# Implementation Readiness Report — Shtek Website Redesign

**Author:** Rita (Readiness Check Agent)  
**Date:** 2026-03-25  
**Version:** 1.0  
**Verdict:** 🟡 CONDITIONAL GO

---

## Executive Summary

The Shtek Website Redesign planning artifacts are **substantially well-aligned** — the PRD, UX Design Spec, Architecture, and Epics form a coherent design for a mobile-first, conversion-optimized marketing site. The planning team has done serious work. However, **five issues prevent an unconditional GO**, including one critical missing story (FR-08 has no implementation path), two sections designed by Architecture that have no UX specification, a page-order conflict across all four documents, and an architecture migration plan that Epic 1 largely ignores.

Implementation can begin on Epic 1 and most of Epic 2 **immediately**. Four conditions must be met before Epic 3 begins.

---

## Document Inventory

| Document | Author | Status | Quality |
|---|---|---|---|
| Product Brief | Rajko + Diana | ✅ Complete | Strong — good problem framing |
| PRD | John (PM) | ✅ Complete | Strong — clear FRs, NFRs, open Qs |
| UX Design Spec | Sally (UX) | ✅ Complete | Strong — but missing 3 sections |
| Architecture | Winston (Architect) | ✅ Complete | Excellent — very detailed |
| Epics & Stories | John (PM) | ✅ Complete | Good — but written pre-Architecture |

**Critical observation:** The Epics document was authored using `[product-brief.md, prd.md, ux-design.md]` as input — **Architecture was not consulted**. This explains several gaps below.

---

## 1. PRD ↔ UX Alignment

### Coverage Matrix

| FR | Section Name | UX Section | Status |
|---|---|---|---|
| FR-01 | Navbar | 6.1 | ✅ Covered |
| FR-02 | Hero | 6.2 | ✅ Covered |
| FR-03 | TrustBar | 6.3 | ✅ Covered |
| FR-04 | Features | 6.4 | ✅ Covered |
| FR-05 | HowItWorks | 6.5 | ✅ Covered |
| FR-06 | **Comparison** | **MISSING** | 🔴 **No UX spec exists** |
| FR-07 | Testimonials | 6.6 | ✅ Covered |
| FR-08 | **Ideal Life Promo** | **MISSING** | 🔴 **No UX spec exists** |
| FR-09 | Pricing | 6.7 | ✅ Covered |
| FR-10 | FAQ | 6.8 | ✅ Covered |
| FR-11 | About | 6.9 | ✅ Covered |
| FR-12 | **Privacy/Security** | **MISSING** | 🟠 **Not in UX App.jsx order** |
| FR-13 | Manifesto | 6.10 | ✅ Covered |
| FR-14 | FinalCTA | 6.11 | ✅ Covered |
| FR-15 | Footer | 6.12 | ✅ Covered |

### Gaps Found

**🔴 BLOCKER: Comparison section (FR-06) has zero UX specification.**  
The PRD defines FR-06 with full requirements (feature matrix, mobile card layout, CTAs). The Architecture lists it in Appendix B. Epic 3 has Story 3.6 for it. But the UX spec has **no section for Comparison at all** — no layout, no wireframes, no component design. The developer building Story 3.6 will have only a PRD table and an Architecture appendix entry to work from, with no visual direction.

**🔴 BLOCKER: Ideal Life Promo section (FR-08) has zero UX specification.**  
The PRD defines FR-08 as a "mid-page conversion section highlighting the Ideal Life feature" with its own CTA. Architecture includes `IdealLifePromo` as a named component in the hierarchy. But the UX spec has **no section for it** and does not include `<IdealLifePromo />` in the App.jsx ordering in Section 10.2. The section is invisible to the UX designer's output.

**🟠 MAJOR: Privacy/Security section (FR-12) has partial UX coverage.**  
The Architecture includes `Privacy.jsx` as a component and puts it in the page flow. But the UX spec's App.jsx ordering (Section 10.2) **omits `<Privacy />`** entirely. The section has no layout spec in the UX document. Story 3.5 will build it based only on PRD FR-12 bullet points.

**🟡 MINOR: Copyright year inconsistency.**  
UX spec footer shows "© 2025 Shtek." PRD, Architecture, and Story 2.8 all say "© 2026 Shtek." Small but needs resolving before launch.

---

## 2. PRD ↔ Architecture Alignment

Architecture is the strongest document in this set. It aligns well with the PRD with the following issues:

### Gaps Found

**🟠 MAJOR: Page section order is inconsistent across documents.**

This is a four-way conflict:

| Document | Section Order After HowItWorks |
|---|---|
| **PRD (Section 5)** | Comparison → Testimonials → IdealLifePromo → Pricing → FAQ → About → Privacy → Manifesto → FinalCTA |
| **Architecture (Section 1.1)** | Testimonials → IdealLifePromo → Pricing → FAQ → About → Privacy → Manifesto → FinalCTA *(Comparison missing)* |
| **UX App.jsx (Section 10.2)** | Testimonials → Pricing → FAQ → About → Manifesto → FinalCTA *(Comparison + IdealLifePromo + Privacy missing)* |
| **Epics (Story summary)** | Stories exist for all but IdealLifePromo; no explicit ordering enforced |

There are **three different page compositions** across the planning documents. Developers need a single authoritative order before they write App.jsx.

**🟠 MAJOR: Comparison section missing from Architecture component hierarchy.**  
Architecture Section 3.1 (the primary component hierarchy) does NOT include `Comparison`. It only appears in Appendix B (the component inventory table) as "NEW." The section 3.1 hierarchy — which developers will use to understand the component tree — has a hole where Comparison should be.

**🟡 MINOR: Font self-hosting migration (ADR-05) has no story.**  
Architecture ADR-05 is a deliberate, justified decision: remove Google Fonts CDN link from index.html, download 6 WOFF2 files, add @font-face declarations with font-display: swap. This is real implementation work affecting LCP and performance scores. **No epic or story covers it.** Story 1.1 mentions `font-display: swap` as an acceptance criterion but doesn't capture the download/migration work.

**🟡 MINOR: Analytics baseline instrumentation has no story.**  
PRD Q5 (P0) and Architecture Section 8.4 both say to instrument Plausible or Fathom before launch. No story covers this work. The Lighthouse targets in Story 4.3 assume analytics exists, but nobody owns making it happen.

**🟡 MINOR: OG image (1200×630) has no story.**  
Architecture Section 4.1 requires `public/og-image.png`. SEO Story 4.2 tests that og:image tags are present and point to a real URL. But no story covers *creating* the OG image itself.

---

## 3. PRD ↔ Epics Alignment (Traceability Matrix)

| FR | Story | Status |
|---|---|---|
| FR-01 | Story 2.1 | ✅ |
| FR-02 | Story 2.2 | ✅ |
| FR-03 | Story 2.3 | ✅ |
| FR-04 | Story 2.4 | ✅ |
| FR-05 | Story 2.5 | ✅ |
| FR-06 Comparison | Story 3.6 | ✅ (P1, no UX spec — see section 1) |
| FR-07 Testimonials | Story 3.1 | ✅ |
| **FR-08 Ideal Life Promo** | **NO STORY** | 🔴 **ORPHANED REQUIREMENT** |
| FR-09 Pricing | Story 3.2 | ✅ |
| FR-10 FAQ | Story 3.3 | ✅ |
| FR-11 About | Story 3.4 | ✅ |
| FR-12 Privacy | Story 3.5 | ✅ |
| FR-13 Manifesto | Story 2.6 | ✅ |
| FR-14 FinalCTA | Story 2.7 | ✅ |
| FR-15 Footer | Story 2.8 | ✅ |
| NFR-01 Mobile-first | Stories 1.3 + all section stories | ✅ |
| NFR-02 Lighthouse ≥90 | Story 4.3 | ✅ |
| NFR-03 WCAG 2.1 AA | Story 4.5 | ✅ |
| NFR-04 SEO | Story 4.2 | ✅ |
| NFR-05 Browser support | Story 4.4 | ✅ |

### Critical Gap

**🔴 BLOCKER: FR-08 (Ideal Life Promo) is an orphaned PRD requirement.**  
The requirements inventory table in the Epics document lists FR-08 and assigns it to Epic 3. Epic 3's coverage map claims it covers FR-06 through FR-12. But when you look at the actual stories in Epic 3, there are only 6 stories (3.1–3.6) covering FR-07, FR-09, FR-10, FR-11, FR-12, and FR-06 respectively. **FR-08 has no story.**

The Ideal Life Promo section is a P0 conversion moment in the PRD ("highest-emotion section — design it with maximum visual impact"), exists as a named component in Architecture, but will not be built because no developer will be assigned a story for it. This gap would only be discovered during sprint planning or review.

### Architecture-Epics Disconnect

The Epics were written before the Architecture was finalized. As a result, the Architecture's Migration Plan (Section 9, Phases A–G) — which is detailed and prescriptive — is **not reflected in Epic 1**. Specifically:

| Architecture Migration Task | Covered by Story? |
|---|---|
| Create new directory structure (ui/, layout/, sections/, mocks/, data/, utils/) | ❌ No story |
| Add public/ static files (sitemap.xml, robots.txt, og-image.png) | Partially — Story 4.2 tests sitemap exists; no story creates it |
| Download and self-host WOFF2 font files | ❌ No story |
| Create data/ content files (features.js, testimonials.js, faq.js, etc.) | ❌ No explicit story (implied by section stories) |
| Implement `utils/links.js` CTAUrl pattern | ❌ No story |
| Implement `useMediaQuery` hook | ❌ No explicit story (mentioned in Architecture 3.3) |
| Implement `useScrollPosition` hook | ❌ No explicit story |

Epic 1 covers tokens, shared components, responsive grid, and animation utilities well — but the foundational project restructuring work from the Architecture migration plan is largely unaddressed.

---

## 4. UX ↔ Architecture Alignment

### Component Library Comparison

| UX Component | Architecture Component | Match? |
|---|---|---|
| Buttons (primary/ghost/outline) | `Button` component | ✅ Aligned |
| Cards (standard/feature/pricing/testimonial/stat) | `Card` component | ✅ Aligned |
| Badges (free/beta/new/premium) | `Badge` component | ✅ Aligned |
| FAQ Accordion | `Accordion` component | ✅ Aligned |
| SectionWrapper | `Section` component | ✅ Aligned (name differs but same concept) |
| Container (max-width variants) | `Container` component | ✅ Aligned |
| SectionHeader | `SectionHeader` component | ✅ Aligned |
| Feature Tab Chip | Not extracted as shared component | 🟡 Minor — probably belongs in Features section CSS only |

### Design Token Alignment

The UX CSS token additions (Section 10.1) and Architecture CSS token additions (Section 5.3) are identical. This is correct — Winston correctly copied Sally's token list. ✅

### Component Ordering Conflict (Already noted above)

| UX App.jsx (Section 10.2) | Architecture hierarchy (Section 3.1) |
|---|---|
| Missing IdealLifePromo | Includes IdealLifePromo |
| Missing Privacy | Includes Privacy |
| Missing Comparison | Missing Comparison (also) |

The Architecture is the more complete specification here, but the UX is silent on 3 components that need building.

### Naming Inconsistency: `SectionWrapper` vs `Section`

UX spec calls it `<SectionWrapper>` (Appendix A). Architecture calls it `<Section>` (Section 3.2). Stories use both names. Not a blocker but will cause confusion during code review.

---

## 5. Epics Completeness Audit

### Story Quality Assessment

**Epic 1: Foundation** — All 4 stories are well-structured with testable ACs. Given/When/Then format is consistent. No dependency issues.

One issue: **Story 1.1 DM Mono weight discrepancy.**  
- UX Spec Section 3.1: DM Mono weights 400 AND 500  
- Story 1.1 AC: "DM Mono (weight 500) are loaded with font-display: swap"  
- Missing weight 400 in the story's AC.

**Epic 2: Core Section Redesign** — Generally strong. Stories are sized appropriately (L for Hero/Features, M for Navbar, S for simpler sections). Dependencies are correctly declared.

One issue: **Story 2.8 Footer links to non-existent pages.**  
AC: '"Privacy Policy" and "Terms of Service" link to the appropriate pages.' But PRD Section 10 explicitly says "Writing the full legal Privacy Policy document" is OUT OF SCOPE, and Terms of Service is not mentioned anywhere in the project. The footer story creates links to pages that don't exist and aren't planned. This will result in broken links at launch unless addressed.

**Epic 3: New Sections** — FR-08 missing story is the critical issue. Individual stories are well-written.

One issue: **Story 3.1 Testimonials is gated on external content (Q1).**  
The story has "real or approved placeholder testimonial copy (Q1 from PRD)" as a dependency. This is an external dependency on Rajko that is still open. If testimonials aren't provided, Story 3.1 has no content to implement. The story has a fallback ("Beta User, Belgrade") mentioned in the description but the AC says "Testimonials reference Shtek-specific value" — this AC will fail if real quotes aren't available.

One issue: **Story 3.5 Privacy/Security links to a Privacy Policy URL (Q6).**  
AC: "it navigates to the full Privacy Policy page." Q6 in PRD asks whether a Privacy Policy exists. This is unresolved. The story cannot be completed without this URL.

**Epic 4: Performance & Polish** — Solid stories, but:

**Story 4.3 Lighthouse Optimization** has no baseline.  
PRD Section 3 says "capture baseline before launch so post-launch deltas are trackable." Story 4.3 assumes Lighthouse will be run against a deployed/preview site, but there's no story that captures the current baseline before work begins. Without a before/after, the success metrics (bounce rate -20%, time on page +40%, CTA CTR +50%) cannot be measured.

### Missing Stories (Summary)

| Gap | Severity | Fix |
|---|---|---|
| FR-08 Ideal Life Promo has no story | 🔴 Critical | Create Story 3.x |
| Font self-hosting migration (ADR-05) has no story | 🟠 Major | Add to Story 1.1 or create Story 1.5 |
| Analytics baseline capture has no story | 🟠 Major | Create Story 0.x (pre-implementation) |
| OG image creation has no story | 🟡 Minor | Add to Story 4.2 |
| New React hooks (useMediaQuery, useScrollPosition) have no story | 🟡 Minor | Add to Story 1.4 |
| utils/links.js CTAUrl utility has no story | 🟡 Minor | Add to Story 1.1 or Story 2.1 |
| Directory structure setup has no story | 🟡 Minor | Add to Story 1.1 description |
| Analytics instrumentation has no story | 🟠 Major | Create Story 4.x |

---

## 6. Open Questions — Consolidated & Prioritized

| # | Question | Source | Must Resolve Before | Priority |
|---|---|---|---|---|
| Q1 | Real testimonial quotes available from beta users? If not, what is the approved fallback? | PRD/Epics | Story 3.1 begins | 🔴 P0 Blocker |
| Q5 | Analytics instrumented? (Plausible/Fathom/GA4?) Need to decide AND capture baseline BEFORE implementation begins | PRD/Architecture | Pre-implementation | 🔴 P0 Blocker |
| Q6 | Privacy Policy: does one exist? Where does the link in Story 3.5 point? | PRD/Architecture | Story 3.5 begins | 🔴 P0 Blocker |
| Q-host | What is the current hosting platform? (Vercel/Netlify/Cloudflare?) Determines deployment config | Architecture | Story 4.3 begins | 🟠 P1 |
| Q4 | Pro tier: planned at €4.99? Confirm feature list for "Coming Soon" card | PRD/Architecture | Story 3.2 begins | 🟠 P1 |
| Q2 | Current user count for TrustBar? ("500+" or omit the stat?) | PRD/Architecture | Story 2.3 begins | 🟠 P1 |
| Q-order | Canonical page section order: which document wins? Must be decided before App.jsx is written | All docs | Epic 2 begins | 🟠 P1 |
| Q-email | Contact email confirmed as hello@shtek.me? | Architecture | Story 3.4 begins | 🟡 P2 |
| Q3 | Founder photo available for About section? | PRD/Architecture | Story 3.4 begins | 🟡 P2 |

**Questions RESOLVED by Architecture (no action needed):**
- Q7 (CSS framework): Resolved — ADR-02 says vanilla CSS ✅
- UX Q4 (feature tab auto-cycle): Resolved — decided against ✅
- UX Q1 (Tailwind): Same as Q7 ✅

---

## 7. Risk Assessment

### Technical Risks

**🔴 HIGH: Mobile-first CSS migration risk.**  
Architecture Section 5.2 identifies this as "the most significant CSS change in the redesign" — rewriting all existing CSS from desktop-first (`max-width`) to mobile-first (`min-width`). This touches every existing component simultaneously. There is no story with a defined regression test matrix for existing components before/after. A botched migration could silently break desktop layouts while fixing mobile ones. Recommend adding an explicit regression checklist to the CSS migration work.

**🟠 MEDIUM: AnimatedDashboard mobile performance is untested.**  
The AnimatedDashboard is SVG-based (so no image weight), but it runs multiple CSS animations simultaneously (`float`, `pulseGlow`, `barGrow`, `ringDraw`). On a mobile device with limited GPU resources, this could fail the LCP < 2.5s target or cause battery drain. Story 2.2's ACs test layout and CTAs, but not animation performance on actual mobile hardware. No story explicitly performance-tests the existing dashboard mock component.

**🟡 LOW: Accordion component dual-ownership.**  
Story 1.2 builds the Accordion component. Story 3.3 (FAQ) also has detailed Accordion behavior in its ACs. If two developers work on these in parallel, there's a risk of the Accordion being built to only satisfy one context. The dependency is declared (3.3 depends on 1.2), but should be monitored.

**🟡 LOW: CSS splitting vs bundle size claim.**  
Architecture says CSS will be split into ~20 component-scoped files. Architecture also claims < 15KB gzipped CSS. These claims haven't been verified. The existing CSS is ~800 lines; the redesign will add ~700+ more lines. This is worth validating early with an actual build measurement.

### Scope Risks

**🔴 HIGH: FR-08 (IdealLifePromo) will be discovered missing mid-sprint.**  
With no story assigned, this P0 PRD requirement will either be noticed during sprint planning (causing re-planning) or missed entirely until QA or review. It's a meaningful conversion-critical section. Discovery late = high disruption.

**🟠 MEDIUM: Testimonial content is a launch dependency with no mitigation.**  
Story 3.1 requires real or approved testimonial content. If Rajko can't provide real beta quotes, and the team doesn't agree on acceptable placeholder framing, the section either ships with fabricated content (a brand risk) or is delayed. The "Beta User, Belgrade" fallback in the story description needs to be explicitly approved as acceptable.

**🟡 LOW: Terms of Service link in footer has no page to link to.**  
Story 2.8 creates a "Terms of Service" footer link. No ToS document exists or is planned in any artifact. This will be a broken/missing link at launch unless addressed now.

### Dependency Risks

**🟠 MEDIUM: External content dependencies (Rajko) may block Sprint 2.**  
Three stories have direct external dependencies on Rajko:
- Testimonials copy (Story 3.1 — P0, can't start without it)
- Founder photo + approved copy for About (Story 3.4)
- Pro tier confirmation (Story 3.2)

If Rajko isn't engaged early in the sprint, multiple stories will be blocked simultaneously.

**🟡 LOW: Pro tier pricing at €4.99 is unconfirmed.**  
The UX spec shows "€4.99/month" as the Pro price. Architecture Q4 asks if this is confirmed. The Pricing card in Story 3.2 will build around whatever number is used, and changing it later requires a UI update. Not blocking but should be confirmed before Story 3.2 begins.

---

## 8. Go/No-Go Recommendation

### Decision: 🟡 CONDITIONAL GO

**Implementation can begin now on Epic 1 (all stories) and Epic 2 (all stories).**  
These stories have complete specifications, testable acceptance criteria, no unresolved external content dependencies, and correct dependency ordering. An experienced team can start immediately.

**Epic 3 and Epic 4 must NOT begin until the following conditions are met:**

---

### ⛔ Conditions — Must Resolve Before Epic 3

**Condition 1: Create Story for FR-08 (Ideal Life Promo)**  
FR-08 is a P0 PRD requirement with no story. Create a story in Epic 3 covering: the IdealLifePromo section layout, the IdealLifeMock component reuse, copy direction, CTA to app.shtek.me, mobile/desktop responsive behavior. Sally (UX) should also provide a UX spec section for this component since no design guidance exists.

**Condition 2: Decide canonical page section order**  
Produce a single authoritative App.jsx section list that all documents agree on. The PRD order should be considered authoritative unless there's a UX/architecture reason to override. Specifically decide: where does Comparison appear? Does IdealLifePromo appear? Does Privacy appear (before or after About)? Update Architecture section 3.1 and UX Section 10.2 to match.

**Condition 3: Resolve testimonials content (Q1)**  
Get real beta user quotes OR explicitly approve a placeholder approach (e.g., "Beta User, Belgrade" with honest framing). Unblock Story 3.1 before Epic 3 sprint starts.

**Condition 4: Provide Privacy Policy URL (Q6)**  
Story 3.5's Privacy section links to the full Privacy Policy. This URL must be decided (placeholder page, external Google Doc, or "coming soon" state) before Story 3.5 begins. Legal cannot be skipped for a fintech product.

---

### ⚠️ Recommended Actions Before or During Epic 1

These aren't hard blockers but will cause friction if left unresolved:

1. **Create Story 1.5: Font self-hosting migration** (or expand Story 1.1 to include it). Cover downloading WOFF2 files, @font-face declarations, removing Google Fonts CDN link, verifying font-display: swap.

2. **Create Story 0.1: Analytics baseline** (pre-launch). Instrument Plausible/Fathom AND capture current Lighthouse scores + baseline traffic metrics before any code changes. Without this, PRD success metrics are unmeasurable.

3. **Add Comparison UX spec** (Sally). Story 3.6 will be built purely from PRD FR-06. One short UX section covering the mobile layout (cards vs table) and desktop comparison grid visual design would prevent guesswork.

4. **Add Privacy/Security UX spec** (Sally). Story 3.5 similarly has only PRD bullet points. The icon-driven layout needs visual direction.

5. **Remove or clarify "Terms of Service" footer link** (Story 2.8). Either create a ToS document (out of scope per PRD) or change the footer link to something that exists.

6. **Confirm hosting platform** (Rajko → Winston). Determine whether to create `vercel.json`, `netlify.toml`, or `_headers` file. Architecture has cache strategy defined but no deployment config file exists.

7. **Resolve copyright year** — UX spec says 2025, all other docs say 2026. Standardize.

---

## Appendix A: Document Cross-Reference Summary

| Requirement | PRD | UX | Arch | Epics |
|---|---|---|---|---|
| Comparison section | ✅ FR-06 | ❌ Missing | ⚠️ Appendix B only | ✅ Story 3.6 |
| Ideal Life Promo | ✅ FR-08 | ❌ Missing | ✅ in hierarchy | ❌ No story |
| Privacy section | ✅ FR-12 | ❌ Not in App.jsx | ✅ in hierarchy | ✅ Story 3.5 |
| Font self-hosting | ❌ Not in PRD | ✅ implied | ✅ ADR-05 | ❌ No story |
| Analytics baseline | ✅ Q5 (P0) | ⚠️ mentions | ✅ Section 8.4 | ❌ No story |
| OG image | ❌ Not in PRD | ❌ Not mentioned | ✅ Section 4.1 | ❌ No story |
| Page section order | ✅ Defined | ⚠️ Partial (omits 3) | ⚠️ Partial (omits 1) | ❌ Not enforced |
| Directory structure | ❌ Not in PRD | ❌ Not mentioned | ✅ Section 4.1 | ❌ No story |

## Appendix B: Story Risk Matrix

| Story | Risk Level | Risk Description |
|---|---|---|
| 1.1 CSS Tokens | 🟢 Low | Clear spec, no dependencies |
| 1.2 Shared Components | 🟡 Medium | Large scope (5 components); Accordion needs careful implementation |
| 2.2 Hero | 🟡 Medium | L complexity; AnimatedDashboard mobile perf needs monitoring |
| 2.4 Features | 🟡 Medium | L complexity; mobile tab scroll has UX edge cases |
| 3.1 Testimonials | 🔴 High | Blocked on external content (Rajko); AC will fail without real quotes |
| 3.2 Pricing | 🟡 Medium | Pro tier price unconfirmed |
| 3.5 Privacy | 🟡 Medium | Privacy Policy URL unresolved |
| 3.6 Comparison | 🟠 High | No UX spec; developer improvises design |
| FR-08 | 🔴 Critical | No story exists at all |
| 4.3 Lighthouse | 🟡 Medium | No baseline captured; targets may be harder than expected |

---

*Report generated by Rita (Readiness Check Agent) — BMAD Phase 3 Gate Review*  
*Recommend re-review after Conditions 1–4 are met.*
