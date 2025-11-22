# Front Page Plan – Paulis Rødder

Status: In progress – Last updated: 2024-03-17

Implementation To-Do: See `docs/frontpage-todo.md` for day-to-day execution notes, verification, and rollback guidance.

Process Note (Plan): This document captures the stable product scope, decisions, section architecture, and acceptance criteria for the landing page.

---

## Summary of Decisions

- **Primary CTAs**
  - `Klubsange` → `/klubsange`
  - `Spillersange` → `/spillersange`
- **Navigation**
  - Header links (desktop + drawer): `Hjem`, `Klubsange`, `Spillersange`, `Støt`, `Frem i byen`, `Billeder`.
- **Typography**
  - Fonts are self-hosted WOFF2
  - H1 uses `Chinese Rocks`
  - H2–H3 use `Alfa Slab One`
  - Body copy uses `Fira Sans` (400/500/700)
- **Imagery**
  - Hero background: `/assets/images/hero/hero-bg.{webp,jpg}`
  - Intro portrait: `/assets/images/intro/rodderne.jpg`
  - Gallery set stored under `/assets/images/gallery/`
- **Share previews**
  - Default Open Graph/Twitter image should point to `/assets/images/hero/hero-bg.webp` (ship a JPEG fallback if a platform blocks WebP).
- **Copy Sections**
  - Hero tagline and CTAs
  - Intro narrative (three paragraphs)
  - Support explainer + bank details card
  - Gallery of four supporter photos + CTA “Se flere billeder” linking to `/Billeder/`
- **Social**
  - Footer shows Facebook and Instagram icon links only

---

## Objectives

- Deliver a scannable, mobile-first landing page that:
  - Introduces Paulis Rødder clearly
  - Channels visitors toward klubsange/spillersange and voluntary support
  - Expresses identity through bold typography, imagery, and the red palette
- Keep everything inside the existing Jekyll layout for easy maintenance.

---

## Section Architecture (Homepage)

1. **Hero**
   - Full-width hero image with overlay, H1, supporting line, and two buttons stacked horizontally.
   - Assets: `/assets/images/hero/hero-bg.webp` with JPEG fallback.
2. **Intro – Hvem er Paulis Rødder?**
   - Centered section heading, left-aligned copy (three paragraphs) and right-hand image.
   - Image uses the same rounded-card treatment as gallery tiles.
3. **Støt Rødderne**
   - Two-column grid: copy block on the left, donation card on the right with reg/konto values and MobilePay note.
   - Grid collapses to single column below 850 px.
4. **Billeder**
   - Responsive grid of four images (lazy-loaded, `picture` with WebP + JPEG).
   - Each tile has rounded corners and drop shadow.
   - CTA “Se flere billeder” sender brugerne til undersiden for endnu flere billeder.
5. **Footer**
   - Centered brand block with tagline and two social icons (Facebook, Instagram).

---

## High-Level File Responsibilities

- **`index.html`**
  - Declares sections in order: `#hero`, `#intro`, `#stoet`, `#Billeder`, plus the hero graphic callout.
  - Uses semantic headings and ARIA labels for each block.
- **`_layouts/default.html`**
  - Base HTML document shell, shared header/footer includes, stylesheet and font references.
- **`_includes/header.html`**
  - Fixed navigation with desktop links + mobile drawer (Hjem, Klubsange, Spillersange, Støt, Frem i byen, Billeder).
- **`_includes/footer.html`**
  - Footer brand copy plus icon links to Facebook and Instagram.
- **`assets/css/style.css`**
  - Global variables, typography rules, button styles, layout grids, and section styling (hero overlay, intro grid, support card, gallery grid, footer).
- **`assets/js/main.js`** (unused presently)
  - Placeholder for future enhancements (smooth scrolling, navigation tweaks, etc.).
- **`Billeder.md`**
  - Huser et større billedBilleder under `layout: page` og bruger samme `.gallery__grid` som forsiden.
- **`klubsange.md`, `spillersange.md`, `stoet.md`**
  - Song/support detail pages that reuse the `page` layout; ensure they mount the shared header/menu (blue background) and apply a top offset so content clears the fixed navigation on load.
- **`frem-i-byen.md`**
  - Lister værtshuse og spisesteder; bruger markdown-overskrifter og fælles spacing tokens.

---

## Interior Page Requirements (Klubsange / Spillersange / Støt / Billeder / Frem i byen)

- **Shared header treatment**
  - `_includes/header.html` must stay fixed at the top with the solid Paulis blue background (same token used for the scrolled desktop state) so navigation items remain legible on every interior page.
  - Keep the nav toggle + drawer pairing intact; the menu cannot collapse into a transparent variant on these templates.
  - Preserve the scroll-shadow controlled by `assets/js/main.js` to give the menu depth once visitors start reading content-heavy sections.
- **Spacing + content offset**
  - Add a reusable `--header-offset` (≈5–6.5 rem) to `layout: page` so the first heading and paragraph appear below the fixed navigation without manual `<br>` spacers.
  - Apply the offset via `.page-content` or `main` rather than padding each markdown file individually to simplify future changes.
- **Per-page notes**
  - `klubsange.md`: keep the `site.klubsange` loop, but wrap it in a `.page-content` container with consistent padding and heading hierarchy.
  - `spillersange.md`: maintain the “Nuværende” and “Tidligere” song groupings under semantic `h2` elements; both groups should inherit the same header offset and spacing utilities.
  - `stoet.md`: mirror the tone from “Støt Rødderne” on the homepage but split copy into paragraphs or highlight cards that respect the shared padding tokens.
  - `Billeder.md`: intro tekst + udvidet `.gallery__grid` der viser flere billeder og inviterer fans til at indsende deres egne.
  - `frem-i-byen.md`: behold listeformatet for værtshuse/spisesteder og sørg for tydelige bydelsoverskrifter.
- **Acceptance criteria**
  - Header/menu is instantly visible (blue background + logo + nav links) across desktop, tablet, and mobile breakpoints.
  - Scrolling never reveals content underneath the menu; verify 320 px, 768 px, 1024 px, and 1440 px widths.
  - Navigating between the subpages keeps the header height identical so there is no jump when switching routes.

---

## Fonts & Assets Strategy

- **Fonts**
  - Self-host `Chinese Rocks`, `Alfa Slab One`, and `Fira Sans` as WOFF2.
  - Disable font synthesis to keep headings stylistically consistent.
  - Use CSS custom properties for responsive typography (already configured).
- **Images**
  - Provide WebP with JPEG fallback via `<picture>` for hero and gallery.
  - Maintain descriptive alt text centered on the action in each photo.
- **Performance**
  - Keep hero image optimized; continue lazy-loading gallery images.
  - Reuse shared shadows/radius tokens for consistent painting.

---

## Footer & Social Requirements

- Show Facebook and Instagram icons in the footer; links open in new tab with `rel="noopener"`.
- Include short brand eyebrow `Paulis Rødder` and tagline `Vi har ingen kaptajn`.
- Additional navigation links can live in header; footer stays lightweight.

---

## Assets Organization & Guidelines

- Folders already set:
  - `assets/images/hero/hero-bg.{webp,jpg}`
  - `assets/images/intro/rodderne.jpg`
  - `assets/images/gallery/*.{webp,jpg}`
- Recommended sizes:
  - Hero: ≥1920×1080 desktop, optional smaller crops for mid-tier screens.
  - Gallery + intro tiles: 800×600 for consistency.
- Keep filenames stable to avoid cache issues and relinking work.

---

## QA, Accessibility, and Performance Targets

- **Lighthouse (lab)**
  - Performance ≥ 85
  - Accessibility ≥ 95
  - Best Practices ≥ 95
  - SEO ≥ 90
- **Core Web Vitals (lab)**
  - LCP ≤ 2.5 s on desktop
  - CLS ≤ 0.1 (use consistent aspect ratios for all major images)
- **Accessibility**
  - Maintain semantic landmarks (`section`, `header`, `h1–h3`).
  - Ensure focus states remain visible on buttons and links.
  - Color contrast should respect WCAG AA against the red background.

---

## Notes & Constraints

- Keep hero/support copy short and conversational; long-form storytelling stays in intro.
- If future interactions (e.g., gallery lightbox or header nav) are added, prefer progressive enhancement and no blocking JS.
- Continue validating after each content or style change; document execution details in `docs/frontpage-todo.md`.
- Encoding reminder: always save planning docs as UTF-8 (no BOM) so Danish characters and en dashes survive copy/paste.


