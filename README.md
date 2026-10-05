# Shtek Website

The marketing landing page for [Shtek](https://github.com/lakygosh/shtek), a free personal finance planner. The page explains what the app does and sends visitors to sign up. It is a single-page React site that works well on phones first, with an accessible design and SEO setup.

**Live site:** [shtek-website.vercel.app](https://shtek-website.vercel.app)

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<!-- TODO: add screenshot -->

## Overview

Shtek's first landing page had gaps: it was not built for mobile, some content was missing, and it had too much empty space. This repo is the redesign. It is a 13-section page that walks a visitor from the value proposition through features, comparison, pricing, FAQ, privacy and the story behind the app, and then to the sign-up call to action. It uses the same dark, warm color theme as the app. All visuals are inline SVG/JSX, so the page loads no raster images.

Planning followed a spec-first process. Product brief, PRD, UX design, architecture, epics and sprint plan documents are in [`bmad/`](./bmad).

## Key Features

- **13 content sections** in a fixed order: Hero, Trust Bar, Features, How It Works, Ideal Life promo, Testimonials, Comparison, Pricing, FAQ, About, Privacy, Manifesto, Final CTA.
- **Feature tour with tabs** for the app's five areas: Dashboard, Daily Log, Budget, Goals, Ideal Life.
- **Sticky navbar** that changes style once you scroll, highlights the section you are reading, scrolls smoothly to sections, and opens a mobile menu that locks page scrolling.
- **FAQ accordion** and a comparison against spreadsheets and other apps.
- **Animations triggered on scroll**: reveals, staggered children and count-up numbers. All of them respect `prefers-reduced-motion`.
- **Campaign-tagged CTAs**: every link to the app carries UTM parameters (`hero`, `pricing`, `final`, and so on), so you can see which section converts best.

## Tech Stack

| Area | Tools |
| --- | --- |
| UI | React 19 (function components and hooks) |
| Build | Vite 6 |
| Styling | Vanilla CSS with custom properties: one CSS file per component, plus a global token file |
| Fonts | DM Sans, DM Mono (Google Fonts) |
| Hosting | Vercel |

No UI framework, CSS library or animation library is used. The only runtime dependencies are React and ReactDOM.

## Technical Highlights

- **Design tokens.** `src/index.css` defines the theme as CSS custom properties: background layers, borders, text levels, accent and semantic colors, and a fluid type scale built with `clamp()`. Components use only these tokens, so the theme can be changed in one place.
- **Small component system.** Layout primitives (`Container`, `Section`, `Stack`) and UI primitives (`Button`, `Card`, `Badge`, `Accordion`, `SectionHeader`) are composed into the section components. Each component keeps its CSS next to it.
- **Accessibility.**
  - A skip-to-content link and semantic landmarks.
  - The feature tabs follow the WAI-ARIA tabs pattern (`role="tablist"/"tab"/"tabpanel"`, arrow-key navigation).
  - The accordion and mobile menu use `aria-expanded` / `aria-controls`.
  - Focus moves into the mobile menu when it opens.
  - Animations are reduced when the user prefers reduced motion.
- **Reusable hooks.** `useIntersectionObserver` handles one-time or repeating visibility triggers. `useCountUp` animates numbers with `requestAnimationFrame` and an ease-out cubic curve.
- **SEO setup.**
  - Title and meta description, canonical URL, Open Graph and Twitter Card tags.
  - JSON-LD structured data (`SoftwareApplication` and `FAQPage`).
  - `robots.txt` and `sitemap.xml`.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install and run

```bash
git clone https://github.com/lakygosh/shtek-website.git
cd shtek-website
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

No environment variables are required.

## Project Structure

```
bmad/                     # Planning docs: brief, PRD, UX, architecture, epics, sprint status
public/                   # favicon.svg, robots.txt, sitemap.xml
src/
  App.jsx                 # Section composition and page order
  index.css               # Design tokens, global styles, animation utilities
  components/
    layout/               # Navbar, Footer, Container, Section, Stack
    sections/             # Hero, Features, Pricing, FAQ, ... (one .jsx + .css pair per section)
    ui/                   # Button, Card, Badge, Accordion, SectionHeader
  hooks/                  # useIntersectionObserver, useCountUp, useMediaQuery
```

## Related

- [shtek](https://github.com/lakygosh/shtek): the finance planner app this site promotes (React + Supabase).

## Author

Lazar Gošić, GitHub [@lakygosh](https://github.com/lakygosh)
