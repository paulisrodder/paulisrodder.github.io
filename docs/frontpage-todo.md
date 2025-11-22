# Front Page Plan - To-Do

Status: In progress — Hero/Intro/Support/Gallery/Footer live. Gallery subpage + nav updates landed. Outstanding items: UX polish + QA + deploy. Last updated: 2025-11-22.

---

## Usage Notes
1. Treat this checklist as the implementation source of truth. Update the status line and any affected step immediately after changes land.
2. Keep snippets in sync with the repo (ignore `_site/` build artifacts).
3. Record copy/asset deviations here so the PRD (`docs/frontpage-plan.md`) stays stable.
4. Workflow reminder: make a focused change → verify locally → update this doc → commit.

---

## Current Snapshot
- `index.html` ships Hero, Intro, Support (Støt Rødderne), Gallery, and the single-graphic block. The gallery section ends with a “Se flere billeder” button that links to `/Billeder/`.
- `_includes/header.html` renders fixed navigation with links to Hjem, Klubsange, Spillersange, Støt, Frem i byen, and Billeder. Mobile drawer/toggle implemented.
- `_includes/footer.html` renders a centered brand block with tagline and Facebook/Instagram icons only.
- `assets/css/style.css` defines fonts, layout grids, hero overlay, intro/support/gallery styles, footer presentation, and refined `:focus-visible` states for buttons, navigation links, and social icons. Responsive breakpoint at 850 px collapses grids.
- `assets/js/main.js` only handles the header scroll shadow; no menu/smooth-scroll logic beyond that.
- `layout: page` wraps markdown content in `.page-main`/`.page-content`, applies the global header offset, and automatically injects the shared footer.
- `Billeder.md` hosts the extended gallery grid (same card styling) with descriptive alt text; `frem-i-byen.md` is linked from the nav.

---

## Execution Steps

### 1) Asset & Font Setup — **Completed**
- Folders `assets/images/{hero,intro,gallery,icons}` exist with current imagery and WebP/JPG pairs.
- Fonts (`Chinese Rocks`, `Alfa Slab One`, `Fira Sans`) are self-hosted via WOFF2 in `assets/css/style.css`.

### 2) Header (Desktop) — **Completed**
- `_includes/header.html` renders fixed navigation; `assets/css/style.css` applies the scrolled-state styling; `assets/js/main.js` toggles `.scrolled`.
- Remaining work back then was the mobile toggle (handled in Step 8).

### 3) Hero Section — **Completed**
- Full-bleed hero with overlay, H1, subhead, and dual CTAs linking to `/klubsange` and `/spillersange`.
- Assets stored under `assets/images/hero/`.

### 4) Intro Section — **Completed**
- Heading introduced via `.intro__header`, three-paragraph narrative, and right-side image styled like the gallery cards.
- Grid collapses to single column under 850 px.

### 5) Support (Støt Rødderne) — **Completed**
- Two-column grid: story text + donation card (reg/konto + MobilePay note). Grid centers content on desktop and stacks on mobile.

### 6) Gallery — **Completed**
- `<ul class="gallery__grid">` with four `<li>` entries, each using `<picture>` for WebP/JPG plus lazy-loading attributes.
- Styles reuse the same radius/shadow tokens as intro/support cards; CTA button now links to the dedicated gallery page.

### 7) Footer — **Completed**
- `_includes/footer.html` shows social icons and tagline; CSS handles spacing and background treatment.
- No nav links are required according to the current PRD.

### 8) Mobile-Optimized Menu — **Completed**
- `_includes/header.html` now includes the accessible `.nav-toggle` wired to `#primary-nav` plus a matching close button that replaces it when open.
- `assets/css/style.css` adds the sliding drawer, toggle animation, close button styling (mirror toggle placement), scroll lock, and ≤850 px breakpoint logic.
- `assets/js/main.js` drives `aria-expanded`, `.nav-open`, Escape/resize/link/close button behaviors.
- Verified locally for keyboard + screen-reader flow; desktop navigation unchanged.

### 9) Interior Page Header & Layout — **Completed**
- `_layouts/page.html` wraps markdown content with `.page-main`/`.page-content` and includes the shared footer so the blue menu stays fixed without manual spacers.
- `assets/css/style.css` introduces `--header-offset`, page layout helpers, and song/support utility classes; the STØT nav label now renders correctly.
- `klubsange.md`, `spillersange.md`, and `stoet.md` render H1 headings plus structured song/support groupings so copy clears the header on load.

### 10) UX Enhancements — **In progress**
- Optional smooth anchor scrolling respecting prefers-reduced-motion (still open).
- Focus-visible styling for buttons/links/social icons landed (2025-11-22).
- Commit template when finishing scroll work:  
  `git add assets/js/main.js assets/css/style.css docs/frontpage-todo.md && git commit -m "feat(ux): smooth scrolling + focus tweaks"`

### 11) QA / Lighthouse / Accessibility Pass — **Pending**
- Run Lighthouse (lab) aiming for Perf ≥ 85, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 90.
- Validate tab order and contrast; ensure gallery/support images keep descriptive alt texts.
- Optimize hero/Billeder images or CSS if LCP/CLS regress.
- Record findings in Developer Notes.
- Commit:  
  `git add <files> docs/frontpage-todo.md && git commit -m "chore(qc): lighthouse + accessibility fixes"`

### 12) Final Review & Deploy — **Pending**
- Re-test responsive states, nav behavior, and anchors post-QA.
- Merge feature branch into main (if using) and deploy to GitHub Pages.
- Example commands:
  ```
  git checkout main
  git merge --no-ff frontpage-build -m "merge: frontpage build"
  ```
- Smoke-test production once published.

### 13) Social Share Preview — **Pending**
- Add global Open Graph/Twitter meta tags in `_layouts/default.html` (or `_includes/head.html`) so every page shares the same preview image unless overridden.
- Use `/assets/images/hero/hero-bg.webp` as the default image; add a `.jpg` fallback if any platform rejects WebP.
- Verify cards with Facebook Sharing Debugger + Twitter Card Validator once deployed.
- Commit template:  
  `git add _layouts/default.html docs/frontpage-plan.md docs/frontpage-todo.md && git commit -m "feat(meta): add OG share preview"`

---

## Developer Notes
- Keep this to-do synchronized with actual repo state; delete or add steps as scope shifts.
- When adding gallery images, include both `.webp` and `.jpg` variants and update `index.html`.
- Encoding reminder: always save these docs as UTF-8 (no BOM) so Danish characters and dash styles survive copy/paste.
- Next focus is Step 10 (finish smooth scrolling) before kicking off QA.

