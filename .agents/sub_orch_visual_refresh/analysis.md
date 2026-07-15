# Visual Design Refresh (R2) Synthesis Analysis

## Consensus
All explorers agree on the following observations and requirements:
1. **Email correction**: `App.vue` footer lists `info@innovareconcept.org` and needs to be updated to `astriferuminnovare@gmail.com` wrapped in a mailto anchor. `Contact.vue` is already correct.
2. **Facebook link addition**: Both `App.vue` (footer/header) and `Contact.vue` are missing the Facebook anchor element. It must point to a URL containing `facebook.com` and use the display text `ASTRIFERUM INNOVARE`.
3. **Crumpled-Paper Texture**: A new `.paper-texture` class must be defined in `src/style.css` using an inline, base64-encoded SVG noise generator (to bypass network restrictions) and linear creases, and applied to the root container in `App.vue`.
4. **SVG Sparkles**: Three interactive SVG star/sparkle elements must be added inside the hero banner container of `src/views/Home.vue` with absolute positioning, `@keyframes` animation, and hover scaling effects.
5. **Color & Typography**: Google Fonts import in `src/style.css` should be updated to include `Cinzel` alongside `Playfair Display`. The colors are already correctly defined as Tailwind theme variables in `src/style.css` (--color-primary: #3b2e5a and --color-accent: #d4af37).

## Additional Discovered Requirements (Explorer 3)
1. **HTML Title**: Test `T2.25` expects the title in `index.html` to be `<title>Astriferum Innovare</title>` instead of `<title>org-concept</title>`.
2. **Catch-all Route**: Test `T2.9` expects a catch-all route matching `/:pathMatch(.*)*` pointing to `/` or redirecting in `src/router/index.js` to handle invalid routes.
3. **Badge styles cleanup**: Changing any legacy colors (like blue badges in `Announcements.vue`) to keep unified branding is recommended.

## Gaps
None. The proposed patch `proposed_refresh.patch` covers all required file changes.

## Execution Plan
We will dispatch a Worker to apply the changes. The worker can apply the patch `d:\Innovare Web\.agents\teamwork_preview_explorer_visual_refresh_3\proposed_refresh.patch` directly using git apply, check the files, and run the build and tests.
If git apply fails or needs manual edits, the worker will modify the files sequentially:
1. `index.html`: Update title.
2. `src/router/index.js`: Add wildcard catch-all route.
3. `src/style.css`: Add `Cinzel` font import, define `.paper-texture` background, and sparkle keyframes/classes.
4. `src/App.vue`: Apply `.paper-texture` to root, update footer with correct email and Facebook link.
5. `src/views/Home.vue`: Add 3 SVG sparkle stars to hero section.
6. `src/views/Contact.vue`: Add Facebook direct channel link.
7. Run `npm run build` and `node tests/run-tests.js` to verify.
