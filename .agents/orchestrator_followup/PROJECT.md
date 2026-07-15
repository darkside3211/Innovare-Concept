# Project: Astriferum Innovare Web Concept Follow-up

## Architecture
- Vue 3 + Vite + Tailwind CSS front-end web application (mockup/concept).
- Vue Router 4 for client-side routing.
- Asset files: logo.png, banner.png, hero.png.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Testing Track | Design and implement the opaque-box test runner and 60 test cases | None | IN_PROGRESS (88525245-b008-4ac4-a216-999ae7e27d56) |
| 2 | Content Integration (R1) | Integrate Mission, Vision, and Objectives with representative icons | None | DONE |
| 3 | Visual Design Refresh (R2) | Celestial theme, serif headings, background texture, SVG stars, links/socials | M2 | IN_PROGRESS (9cee0dc2-a946-4a2a-8b28-8648b4ee6c44) |
| 4 | Premium Interactions (R3) | Hover effects, micro-animations, smooth transitions | M3 | PLANNED |
| 5 | E2E Test Suite Validation | Run E2E tests and fix any failing test cases | M1, M4 | PLANNED |
| 6 | Adversarial Coverage Hardening | Run challenger to find visual/logic gaps and implement fixes | M5 | PLANNED |

## Interface Contracts
### Components ↔ Router
- Home view maps to `/`
- Announcements view maps to `/announcements`
- Activities view maps to `/activities`
- Contact view maps to `/contact`

### Shared Visuals
- Persistent header and footer containing logo, email (`astriferuminnovare@gmail.com`), and Facebook (`ASTRIFERUM INNOVARE`).
- Consistent deep purple primary color, gold accents, crumpled-paper overlay style, and SVG sparkle animations.

## Code Layout
- `src/App.vue`: Application shell, navigation, header, footer, global styles, transitions.
- `src/views/Home.vue`: Home page view with Mission, Vision, Objectives, and hero.
- `src/views/Announcements.vue`: Announcements list view.
- `src/views/Activities.vue`: Activities list view.
- `src/views/Contact.vue`: Contact form view.
- `src/router/index.js`: Route definitions.
- `src/style.css`: Tailwind directives, custom font imports, crumple-paper CSS texture, global classes.
- `tests/run-tests.js`: Custom Node.js E2E test runner checking file assets and compiled outputs.
