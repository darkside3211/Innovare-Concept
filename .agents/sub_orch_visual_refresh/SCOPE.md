# Scope: Visual Design Refresh (R2)

## Architecture
- Vue 3 Front-end application in `d:\Innovare Web\org-concept`.
- Custom CSS in `src/style.css` defining Tailwind base, custom fonts, textures.
- Components / pages updated:
  - `src/App.vue` (Global shell, Header, Footer)
  - `src/views/Home.vue` (Hero section, SVG animations)
  - `src/views/Contact.vue` (Contact links)
  - `src/style.css` (Google Fonts, paper texture, custom variables)

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration | Analyze existing styling, class names, font imports, and link locations | None | DONE |
| 2 | Implementation | Implement color scheme, Google Fonts, paper background texture, SVG stars, and contact links | 1 | IN_PROGRESS (567a5d54-beff-4b3b-a06f-fe241db61c39) |
| 3 | Review | Verify visual appearance, responsive design, and link behavior | 2 | PLANNED |
| 4 | Challenge | Test interactive hover animations and edge-case responsiveness | 3 | PLANNED |
| 5 | Forensic Audit | Verify integrity of changes and ensure compilation (`npm run build`) | 4 | PLANNED |

## Interface Contracts
- **Primary Color**: Rich deep purple (e.g. `#3b2e5a`), replacing any current primary color.
- **Accent Color**: Elegant gold (e.g. `#d4af37`), used for highlights, borders, hover states, or hero details.
- **Typography**: Serif titles (e.g., Cinzel or Playfair Display) and Sans-serif body.
- **Background Texture**: Global or key section crumpled-paper CSS styling without sacrificing readability.
- **Contact Details**: 
  - Email: `astriferuminnovare@gmail.com`
  - Facebook: `ASTRIFERUM INNOVARE` (anchor text and href must be correct)
