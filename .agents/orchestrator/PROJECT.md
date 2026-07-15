# Project: Astriferum Innovare Concept

## Architecture
- Vite + Vue 3 Single Page Application (SPA).
- Tailwind CSS for premium responsive layout and styling.
- Vue Router 4 for navigation.
- Root workspace: `d:\Innovare Web`
- Project root: `d:\Innovare Web\org-concept`
- Assets: logo.png, banner.png (copied to `src/assets/`)

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Scaffold & Assets | Initialize Vite, Vue 3, Tailwind CSS, Router 4. Copy logo/banner. | None | DONE |
| 2 | Premium Layout | App.vue layout, Navbar, Footer, typography, gradients. | M1 | DONE |
| 3 | Page Views | Implement Home, Announcements, Activities (with dummy data), Contact. | M2 | DONE |
| 4 | Build & Verification | Compile via npm run build, verify responsive design and route changes. | M3 | DONE |

## Interface Contracts
- Standard SPA structure with `<router-view>` inside the main content container.
- Main color tokens: Primary purple (`#3b2e5a`), Accent gold (`#d4af37`).
- Assets paths: `src/assets/logo.png`, `src/assets/banner.png`.

## Code Layout
- `d:/Innovare Web/org-concept/`
  - `src/`
    - `assets/` (logo.png, banner.png)
    - `components/` (reusable components if any)
    - `views/` (Home.vue, Announcements.vue, Activities.vue, Contact.vue)
    - `router/` (index.js)
    - `App.vue`
    - `main.js`
    - `style.css`
  - `index.html`
  - `package.json`
  - `tailwind.config.js`
  - `postcss.config.js`
  - `vite.config.js`
