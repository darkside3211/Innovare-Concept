# E2E Test Infra: Astriferum Innovare Web Concept

## Test Philosophy
- **Opaque-box & Requirement-driven**: The test suite validates user-facing requirements, styling, content, assets, and functionality. It does not dictate implementation specifics, but expects compliance with the design theme and file structures.
- **Offline & Built-in Modules**: To ensure isolation and speed, the test runner runs offline using only Node.js built-in modules (`fs`, `path`, `child_process`, `assert`).
- **Methodology**: Combines Category-Partition (scaffolding, routing, theme, content), Boundary Value Analysis (empty state behavior, bounds, required attributes), Pairwise Combinatorial (cross-feature interactions), and Real-World Workloads (production builds, asset linking).

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross-Feature) | Tier 4 (Real-World) |
|---|---------|----------------------|:-----------------:|:-----------------:|:----------------------:|:-------------------:|
| 1 | Scaffolding & Config | ORIGINAL_REQUEST §R1 | 6 tests | 2 tests | - | 1 test |
| 2 | Routing & Views | ORIGINAL_REQUEST §R3 | 5 tests | 2 tests | 1 test | 1 test |
| 3 | Visual Theme | ORIGINAL_REQUEST §R2, §R4, §R2 (Follow-up) | 2 tests | 7 tests | 1 test | 1 test |
| 4 | Content & Branding | ORIGINAL_REQUEST §R2, §R1 (Follow-up) | 8 tests | 5 tests | 1 test | 1 test |
| 5 | Pages & Interactions | ORIGINAL_REQUEST §R5, §R3 (Follow-up) | 5 tests | 10 tests | 2 tests | 1 test |

## Test Architecture
- **Runner**: The test runner is written in Node.js, located at `tests/run-tests.js`. It runs with `node tests/run-tests.js` and outputs clear test results.
- **Pass/Fail Semantics**: The process exits with code `0` if all tests pass. If any test fails, it prints details of the failures and exits with code `1`.
- **Test Structure**:
  - Pre-build validation checks project structure, configurations, and source code features.
  - Post-build validation triggers `npm run build` and verifies the build artifacts.

## Detailed Test Cases

### Tier 1: Feature Coverage (26 tests)
- **T1.1: Vite Config File Existence** - Checks `vite.config.js` exists at the root.
- **T1.2: Vue Dependency in package.json** - Verifies `package.json` contains `vue` in dependencies.
- **T1.3: Router Dependency in package.json** - Verifies `package.json` contains `vue-router` in dependencies.
- **T1.4: Tailwind CSS Dependency in package.json** - Verifies `package.json` contains `tailwindcss` in devDependencies.
- **T1.5: Tailwind Config Scan Paths** - Checks `tailwind.config.js` scans `./index.html` and `./src/**/*.{vue,js,ts,jsx,tsx}`.
- **T1.6: PostCSS Config File Existence** - Verifies `postcss.config.js` exists.
- **T1.7: Router Index File Existence** - Verifies `src/router/index.js` exists.
- **T1.8: Router Mapping - Home Route** - Checks that path `/` maps to `Home` component/view.
- **T1.9: Router Mapping - Announcements Route** - Checks that path `/announcements` maps to `Announcements`.
- **T1.10: Router Mapping - Activities Route** - Checks that path `/activities` maps to `Activities`.
- **T1.11: Router Mapping - Contact Route** - Checks that path `/contact` maps to `Contact`.
- **T1.12: Logo Asset Existence** - Checks `src/assets/logo.png` exists.
- **T1.13: Banner Asset Existence** - Checks `src/assets/banner.png` exists.
- **T1.14: Logo Reference in Header** - Verifies that the logo file name `logo.png` is referenced in the header section of `src/App.vue`.
- **T1.15: Logo Reference in Footer** - Verifies that `logo.png` is referenced in the footer section of `src/App.vue`.
- **T1.16: Banner Reference in Home** - Verifies `banner.png` is referenced in `src/views/Home.vue`.
- **T1.17: Color Theme Classes** - Checks for primary purple/violet and accent gold colors in tailwind config or style.css.
- **T1.18: Mission Statement Content** - Verifies the exact required Mission statement text exists in `src/views/Home.vue`.
- **T1.19: Vision Statement Content** - Verifies the exact required Vision statement text exists in `src/views/Home.vue`.
- **T1.20: Objectives Statement Content** - Verifies the exact required Objectives statement text exists in `src/views/Home.vue`.
- **T1.21: Core Pillar Icons - Mission** - Checks for Target icon SVG or class in the Mission card in `src/views/Home.vue`.
- **T1.22: Core Pillar Icons - Vision** - Checks for Eye icon SVG or class in the Vision card in `src/views/Home.vue`.
- **T1.23: Core Pillar Icons - Objectives** - Checks for Checklist/Clipboard icon SVG or class in the Objectives card in `src/views/Home.vue`.
- **T1.24: Contact Email Prefill** - Checks for `astriferuminnovare@gmail.com` in `src/views/Contact.vue` contact form.
- **T1.25: Contact Facebook Reference** - Checks for `ASTRIFERUM INNOVARE` Facebook reference in `src/App.vue` or header/footer.
- **T1.26: Activities Data Model** - Checks that `src/views/Activities.vue` contains a reactive array or data structure for activities.

### Tier 2: Boundary/Corner Cases (26 tests)
- **T2.1: Missing Vite Config File** - Verifies behavior if `vite.config.js` is temporarily moved/renamed (runner handles gracefully).
- **T2.2: Malformed package.json** - Verifies runner handles non-JSON package.json without crashing.
- **T2.3: Tailwind Scan Missing Source** - Verifies that Tailwind config scans the `src` directory rather than just files.
- **T2.4: Empty Activities Array** - Verifies how the page code or runner behaves if activities data array is empty or lacks items.
- **T2.5: Activities Mix - Upcoming Event Presence** - Checks that at least one event has status/type `Upcoming` (case-insensitive).
- **T2.6: Activities Mix - Past Event Presence** - Checks that at least one event has status/type `Past` (case-insensitive).
- **T2.7: Activity Card Fields Integrity** - Verifies that every activity object in the code contains title, date, type, and description.
- **T2.8: Router History Mode** - Checks if router uses `createWebHistory` or similar HTML5 history mode.
- **T2.9: Router Redirect / Catch-All Route** - Checks that any undefined routes handle gracefully (e.g. redirecting to Home or showing a 404 block).
- **T2.10: Contact Form Submission Prevention** - Checks that form submit has `.prevent` modifier to prevent reload.
- **T2.11: Email Address Format Validation** - Checks that email input in the contact form uses `type="email"` or validation pattern.
- **T2.12: Background Style Overlay Presence** - Checks for crumpled-paper texture styling class (e.g., custom pattern) in `src/style.css`.
- **T2.13: Header Serif Font Definition** - Checks for a serif font family (Playfair Display, Cinzel, serif, etc.) assigned to headings in `src/style.css` or Tailwind config.
- **T2.14: Sans-serif Body Font Definition** - Checks for sans-serif body font class or style in `src/style.css` or Tailwind config.
- **T2.15: Asset Paths Normalization** - Checks that asset import paths are relative (e.g. `../assets/...` or `@/assets/...`).
- **T2.16: Facebook URL Integrity** - Checks Facebook link points to `facebook.com` or has appropriate anchor styling.
- **T2.17: SVG Stars/Sparkles Count** - Checks for presence of multiple SVG star elements or animated sparkles in `src/views/Home.vue` or Hero component.
- **T2.18: Logo Image Aspect Ratio / Dimensions** - Checks if the logo has styling to prevent distension (e.g., height/width constraints).
- **T2.19: Banner Image Responsive Classes** - Checks if `banner.png` container has responsive utility classes (e.g., `h-64 md:h-96 w-full object-cover`).
- **T2.20: Contact Form Empty Input Rejection** - Checks for `required` attribute on input fields in `src/views/Contact.vue`.
- **T2.21: CSS Variable for Corporate Purple** - Checks for css variables or tailwind color extensions for primary color.
- **T2.22: CSS Variable for Corporate Gold** - Checks for css variables or tailwind color extensions for accent gold.
- **T2.23: Hover Scale Micro-interactions** - Checks for CSS classes like `hover:scale-` or transitions in key buttons and cards.
- **T2.24: Transition Utility Classes** - Checks for presence of Vue `transition` wrapper or Vite transition classes in routes.
- **T2.25: Build Dist HTML Title** - Checks `index.html` has a title referencing "Astriferum Innovare".
- **T2.26: Production Bundle File Size Check** - Verifies output bundle sizes in `dist/assets` are within reasonable limits.

### Tier 3: Cross-Feature Combinations (5 tests)
- **T3.1: Celestial Theme & Sparkles Interaction** - Checks that star/sparkle SVG elements have hover scale or animation effects (e.g. `hover:text-accent`, keyframes).
- **T3.2: Routing & Active Styling Integration** - Checks that router links use `router-link-active` or custom active classes (e.g., text color changes to gold `#d4af37` when active).
- **T3.3: Content Pillars & Theme Integration** - Verifies that the Mission, Vision, and Objectives cards use the background styles and border colors consistent with the theme (e.g., `border-accent`, `bg-white/5`).
- **T3.4: Activities Layout & Responsive Scaling** - Checks that the activities grid has responsive column classes (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) combined with card hover transitions.
- **T3.5: Contact Form Prefill & Icon Alignment** - Checks that the prefilled email address in the contact page is aligned with a mail icon styling consistent with the theme colors.

### Tier 4: Real-world Application Scenarios (5 tests)
- **T4.1: Production Build Execution and Verification** - Runs `npm run build` as a child process and verifies it compiles with exit code 0.
- **T4.2: Built Output Asset Integrity** - Scans the `dist` directory after build, verifies `index.html` exists and references compiled JS/CSS and assets.
- **T4.3: Navigation Map Compliance** - Parses Router configuration and maps it against all view files to guarantee complete file coverage.
- **T4.4: Complete Brand Theme Consistency** - Scans `src/App.vue` and all views to check if the primary purple/violet and accent gold colors are consistent.
- **T4.5: Full Responsive Class Scavenger** - Scans files to verify layout utilities contain mobile-first grid and flex configurations.

## Coverage Thresholds
- Tier 1: ≥26 per feature
- Tier 2: ≥26 per feature (where boundaries exist)
- Tier 3: 5 tests covering feature interactions
- Tier 4: 5 realistic application-level scenarios
- Total: 62 test cases (Minimum required: 60)
