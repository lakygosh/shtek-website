---
stepsCompleted: [analysis]
inputDocuments: [shtek-website source code, shtek-app source code]
date: 2026-03-25
author: Rajko (main) + Diana (business-analyst)
project: shtek-website-redesign
---

# Product Brief: Shtek Website Redesign

## 1. Executive Summary

Shtek (shtek.me) is a personal finance planning app built with React + Supabase. The landing website needs a comprehensive redesign to improve visual appeal, mobile-first responsiveness, and conversion. The app itself (app.shtek.me) is a separate repo and will be improved in a subsequent phase.

## 2. Current State Analysis

### Website (shtek-website)
- **Stack:** React 19 + Vite 6, vanilla CSS
- **Sections:** Navbar, Hero, TrustBar, Features (5 tabs), HowItWorks, Manifesto, FinalCTA, Footer
- **Strengths:** Animated dashboard mock, feature tab system, intersection observer animations
- **Weaknesses identified by owner:**
  - Visual style needs improvement
  - Missing sections (incomplete content)
  - Too much empty/dead space
  - NOT mobile-first responsive
  
### App (shtek-app) — for context
- React 19 + Vite 8 + Supabase
- Features: Dashboard, Daily Log, Budget, Goals (10+ templates), Ideal Life calculator, Settings, Feedback, Admin
- Dual currency (EUR/RSD), Google auth
- Dark theme with warm earth tones (#121010 bg, #8FB996 accent, #D4C5A9 secondary)

## 3. Goals

### Primary (Website Redesign)
1. **Mobile-first design** — design for phones first, scale up
2. **Fill content gaps** — add missing sections (Pricing/FAQ, Testimonials/Social proof, About, Privacy)
3. **Eliminate dead space** — tighter layouts, purposeful whitespace
4. **Modernize visual style** — keep dark theme DNA but elevate to premium feel
5. **Improve conversion** — clearer value prop, better CTA placement, reduce friction to app.shtek.me

### Secondary (App Improvements — Phase 2)
- TBD after Diana's product brief

## 4. Target Audience
- Young professionals (25-35) in Serbia/Balkans region
- Dual currency users (EUR + RSD)
- People wanting to plan finances, not just track
- Mobile-heavy users

## 5. Missing Sections Identified
- **Pricing/Plan** section (even if free, state it clearly as a section)
- **FAQ** section
- **Testimonials / Social Proof** (even early-stage: quotes, user count, beta badge)
- **About / Story** section (who made it, why)
- **Privacy / Security** reassurance section
- **Comparison** section (vs spreadsheets, vs other apps)
- **Mobile app preview** section (if applicable)

## 6. Technical Constraints
- Keep React + Vite stack
- No CSS framework required (can add Tailwind if team decides)
- Must deploy to same infrastructure
- Keep existing color palette DNA but allow evolution

## 7. Success Metrics
- Bounce rate decrease
- Time on page increase
- Click-through to app.shtek.me increase
- Mobile usability score (Lighthouse) > 90

## 8. BMAD Phase Plan

### Phase 1: Analysis ✅ (this document)
- [x] Product Brief

### Phase 2: Planning (NEXT)
- [ ] PRD — John (product-manager)
- [ ] UX Design Spec — Sally (ux-designer)

### Phase 3: Solutioning
- [ ] Architecture — Winston (architect)
- [ ] Epics & Stories — John
- [ ] Readiness Check — Rita

### Phase 4: Implementation
- [ ] Sprint Planning — Bob (scrum-master)
- [ ] Development — Amelia/Barry
- [ ] Code Review — Victor
- [ ] QA — Quinn/Tessa
