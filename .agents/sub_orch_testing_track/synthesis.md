# Synthesis of E2E Test Runner Design

## Consensus
- **Zero-Dependency CLI Script**: The E2E test runner will be a self-contained Node.js script located at `tests/run-tests.js` executing offline using only Node.js built-ins (`fs`, `path`, `child_process`, `assert`, `url`).
- **ESM Compatibility**: The runner will be written as an ES module (`import` syntax) and hook into `package.json` under scripts: `"test": "node tests/run-tests.js"`.
- **ANSI Terminal Formatting**: Colorful logging (`[PASS]` in green, `[FAIL]` in red, details in yellow) with clean test summaries and exit code semantics (exit `0` on success, `1` on failure).
- **Core Tiers Setup**: All 62 test cases must be registered and organized across the 4 Tiers outlined in `TEST_INFRA.md`.
- **Hybrid Testing Approach**: Combining pre-build static code checks (validating files, contents, paths, styles, attributes via regex/substring match) with post-build validation (compiling the project with `npm run build` and checking file assets/dimensions in `dist/`).
- **File System Sandbox Toggling**: Destructive checks (e.g. testing missing config, malformed package.json) will use `try...finally` block structures to temporarily mock conditions and restore files safely.

## Resolved Conflicts
- **Build Execution (spawnSync vs execSync)**: Explorer 1 recommended using `execSync` for running the production build, while Explorer 3 recommended `spawnSync` with configuration options. We will recommend using `execSync` inside a `try/catch` block for maximum simplicity and direct logging integration, or standard `execSync` with stdout/stderr pipe.

## Dissenting Views
- None. Both analysis reports are highly aligned on architecture, test structure, and specific test case assertions.

## Gaps
- **Current Codebase Discrepancies**: Both Explorers identified **11 critical discrepancies** in the current codebase that will cause the E2E tests to fail initially. These must be addressed:
  1. Objectives statement content text is missing in `src/views/Home.vue`.
  2. The Mission card in `Home.vue` uses a lightning bolt SVG, not the required Target icon.
  3. The Objectives card is missing entirely from `Home.vue`.
  4. The Facebook reference `ASTRIFERUM INNOVARE` is missing in `App.vue` (header/footer).
  5. The Facebook link pointing to `facebook.com` is missing in `App.vue` or header/footer.
  6. The catch-all wildcard router redirect is missing in `src/router/index.js`.
  7. The crumpled-paper background style/texture overlay class is missing in `src/style.css`.
  8. SVG stars/sparkles are missing in `src/views/Home.vue` (Hero section).
  9. The website title in `index.html` is "org-concept" instead of "Astriferum Innovare".
  10. Celestial svg sparkle hover animations and active route styling linkages are partially missing.
  11. Test runner code must be implemented under a newly created `tests` folder.
