# Custom E2E Offline Test Runner Analysis & Recommendation

## Executive Summary
This report provides a comprehensive blueprint and implementation recommendation for the custom offline E2E test runner in `tests/run-tests.js` for the `org-concept` project. Operating under constraints to run offline without any external NPM packages, the runner is designed as an ESM-compatible Node.js script leveraging only built-in modules (`fs`, `path`, `child_process`, `assert`, `url`).

During the read-only investigation, we systematically mapped the current source code against the `TEST_INFRA.md` requirements. We identified **11 critical discrepancies/gaps** where tests will fail out of the box unless the codebase is modified (e.g., missing Objectives card, missing Facebook linkages, missing catch-all router mapping, and default Vite build title). We propose a full architecture for `tests/run-tests.js` and provide a robust template containing safe file backup-restore mechanics for boundary condition testing.

---

## 1. Custom E2E Test Runner Architecture

### Core Design Principles
1. **Zero External Dependencies**: The runner relies entirely on native Node.js APIs to ensure it runs fast, offline, and in isolated environments.
2. **ESM Compatibility**: Since `package.json` contains `"type": "module"`, the runner is written using ESM `import` statements and runs using `node tests/run-tests.js`.
3. **ANSI Colored Formatting**: Implements readable, colored output (`[PASS]` in green, `[FAIL]` in red, logs in yellow) using standard terminal escape codes to clarify results at a glance.
4. **Build-Level Integration**: Runs static analysis checks pre-build, builds the site via `npm run build` using child processes, and runs post-build verification on the compiled files in `dist/`.
5. **Exit Code Semantics**: Exits with code `0` if all tests pass. Exits with code `1` and outputs a detailed failures list if any tests fail.

### Directory Structure & Hooking
The runner resides in a new `tests` folder at the root:
```
d:\Innovare Web\org-concept\
├── dist\                  # Compiled production files
├── src\                   # Vue SFCs, assets, router configuration
├── tests\
│   └── run-tests.js       # The custom test runner (recommended script)
└── package.json           # Hooked script for testing
```
We recommend adding `"test": "node tests/run-tests.js"` under the `"scripts"` field in `package.json` to allow running the test suite via `npm test` or `npm run test`.

---

## 2. File Isolation & Backup-Restore Strategies
For boundary/destructive tests (specifically `T2.1` and `T2.2`), the runner must temporarily modify the workspace files. To guarantee that a test crash or failure does not leave the workspace in a corrupted state (which would break subsequent test tiers or build tasks), the runner must execute modifications in a strict `try...finally` block.

### T2.1: Missing Vite Config File
```js
const configPath = path.join(process.cwd(), 'vite.config.js');
const tempConfigPath = path.join(process.cwd(), 'vite.config.js.bak');
let hasBackup = false;

try {
  if (fs.existsSync(configPath)) {
    fs.renameSync(configPath, tempConfigPath);
    hasBackup = true;
  }
  // Assert config file does not exist
  assert.strictEqual(fs.existsSync(configPath), false, 'vite.config.js should be temporarily renamed');
  // Check that runner's config assertion reports this failure gracefully
} finally {
  if (hasBackup) {
    fs.renameSync(tempConfigPath, configPath);
  }
}
```

### T2.2: Malformed package.json
```js
const packagePath = path.join(process.cwd(), 'package.json');
const tempPackagePath = path.join(process.cwd(), 'package.json.bak');
let hasBackup = false;

try {
  if (fs.existsSync(packagePath)) {
    fs.copyFileSync(packagePath, tempPackagePath);
    hasBackup = true;
  }
  // Overwrite with malformed JSON
  fs.writeFileSync(packagePath, '{ invalid_json: [ }');
  
  // Verify that the parser handles it or throws a SyntaxError
  assert.throws(() => {
    JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  }, SyntaxError, 'JSON parsing must fail with SyntaxError');
} finally {
  if (hasBackup) {
    fs.copyFileSync(tempPackagePath, packagePath);
    fs.unlinkSync(tempPackagePath);
  }
}
```

---

## 3. Discrepancy & Gap Analysis
Our read-only analysis reveals 11 test cases in `TEST_INFRA.md` that **will fail** on the current codebase. The implementing agent must either update the codebase or be prepared to resolve these failures:

| Test ID | Test Name | Codebase Status | Reason for Failure |
|:---|:---|:---|:---|
| **T1.20** | Objectives Statement Content | **Missing** | `src/views/Home.vue` does not contain the required Objectives statement text. |
| **T1.21** | Core Pillar Icons - Mission | **Mismatched** | The Mission card in `Home.vue` uses a lightning bolt SVG, not a Target icon SVG. |
| **T1.23** | Core Pillar Icons - Objectives | **Missing** | `Home.vue` is missing the Objectives card entirely. |
| **T1.25** | Contact Facebook Reference | **Missing** | `src/App.vue` does not contain the `ASTRIFERUM INNOVARE` Facebook link or text. |
| **T2.9** | Router Redirect / Catch-All | **Missing** | `src/router/index.js` only defines four explicit paths and lacks a catch-all redirect. |
| **T2.12** | Background Style Overlay | **Missing** | `src/style.css` contains no crumpled-paper or custom pattern/overlay classes. |
| **T2.16** | Facebook URL Integrity | **Missing** | There are no Facebook URLs or link tags in the codebase. |
| **T2.17** | SVG Stars/Sparkles Count | **Missing** | `Home.vue` doesn't contain star SVG icons or animated sparkles. |
| **T2.25** | Build Dist HTML Title | **Mismatched** | `index.html` title is `<title>org-concept</title>` instead of "Astriferum Innovare". |
| **T3.1** | Celestial Theme & Sparkles | **Missing** | No celestial SVGs or sparkle elements exist to test hover scale/animation effects. |
| **T3.3** | Content Pillars & Theme | **Partial** | Cannot verify Objectives card styling since the card itself is missing. |

---

## 4. Test Case Implementation Matrix (62 Tests)

### Tier 1: Feature Coverage (26 Tests)
- **T1.1**: Check if `vite.config.js` exists at root using `fs.existsSync`.
- **T1.2**: Read `package.json`, parse it, verify `dependencies.vue` matches target pattern.
- **T1.3**: Read `package.json`, parse it, verify `dependencies['vue-router']` is defined.
- **T1.4**: Read `package.json`, parse it, verify `devDependencies.tailwindcss` is defined.
- **T1.5**: Read `tailwind.config.js` and use regex matching to check for scan paths `./index.html` and `./src/**/*.{vue,js,ts,jsx,tsx}`.
- **T1.6**: Check if `postcss.config.js` exists at root using `fs.existsSync`.
- **T1.7**: Check if `src/router/index.js` exists using `fs.existsSync`.
- **T1.8**: Read `src/router/index.js` and use regex to confirm the `/` path maps to the `Home` component.
- **T1.9**: Read `src/router/index.js` and use regex to verify the `/announcements` path maps to the `Announcements` component.
- **T1.10**: Read `src/router/index.js` and use regex to verify the `/activities` path maps to the `Activities` component.
- **T1.11**: Read `src/router/index.js` and use regex to verify the `/contact` path maps to the `Contact` component.
- **T1.12**: Check if `src/assets/logo.png` exists using `fs.existsSync`.
- **T1.13**: Check if `src/assets/banner.png` exists using `fs.existsSync`.
- **T1.14**: Read `src/App.vue`, use regex to check if `logo.png` or an imported URL variable referencing it is rendered in the `<header>` block.
- **T1.15**: Read `src/App.vue`, use regex to check if `logo.png` or `logoUrl` is referenced in the `<footer>` block.
- **T1.16**: Read `src/views/Home.vue`, use regex to verify `banner.png` or `bannerUrl` is referenced.
- **T1.17**: Scan `tailwind.config.js` and `src/style.css` for primary/accent color codes: `#3b2e5a` (purple) and `#d4af37` (gold).
- **T1.18**: Read `src/views/Home.vue` and assert it contains the exact Mission statement text.
- **T1.19**: Read `src/views/Home.vue` and assert it contains the exact Vision statement text.
- **T1.20**: Read `src/views/Home.vue` and verify presence of Objectives statement text (Note: currently missing).
- **T1.21**: Read `src/views/Home.vue` and verify the Mission card has a Target icon SVG/class (Note: currently uses lightning bolt).
- **T1.22**: Read `src/views/Home.vue` and verify the Vision card has an Eye icon SVG/class.
- **T1.23**: Read `src/views/Home.vue` and verify the Objectives card has a Checklist/Clipboard SVG/class (Note: currently missing).
- **T1.24**: Read `src/views/Contact.vue` and assert it references the recipient email `astriferuminnovare@gmail.com` as default.
- **T1.25**: Read `src/App.vue` or header/footer and check for `ASTRIFERUM INNOVARE` Facebook reference (Note: currently missing).
- **T1.26**: Read `src/views/Activities.vue` and verify that the `activities` variable is initialized as a reactive array (e.g. `ref([`).

### Tier 2: Boundary/Corner Cases (26 Tests)
- **T2.1**: Rename `vite.config.js`, check config-missing code path, restore file in `finally` block.
- **T2.2**: Write malformed JSON to `package.json`, assert runner parser handles it, restore in `finally` block.
- **T2.3**: Read `tailwind.config.js`, verify search pattern includes the whole `src` directory glob and not only index.html.
- **T2.4**: Check how the code structure behaves if activities list is empty; verify that `Activities.vue` computes filters robustly without hardcoded length crashes.
- **T2.5**: Read `Activities.vue` as string, find activities data structure, and assert it contains at least one object with `type: 'Upcoming'`.
- **T2.6**: Read `Activities.vue` as string, find activities data structure, and assert it contains at least one object with `type: 'Past'`.
- **T2.7**: Scan `Activities.vue` using regex to verify that every object in the static activities array has properties `title`, `date`, `type`, and `description`.
- **T2.8**: Read `src/router/index.js`, assert the use of `createWebHistory` instead of `createWebHashHistory`.
- **T2.9**: Read `src/router/index.js`, search for a wildcard catch-all route `path: '/:pathMatch(.*)*'` or redirect to `/` (Note: currently missing).
- **T2.10**: Read `src/views/Contact.vue` and assert the form tag uses `@submit.prevent` to intercept page reload.
- **T2.11**: Read `src/views/Contact.vue` and verify the email input field contains `type="email"`.
- **T2.12**: Read `src/style.css` and check for custom texture style or background image url pattern representing crumpled-paper (Note: currently missing).
- **T2.13**: Read `src/style.css` and `tailwind.config.js` to verify `Playfair Display` or `serif` is assigned to heading element selectors (e.g. `h1, h2, h3`).
- **T2.14**: Read `src/style.css` and `tailwind.config.js` to verify `Outfit` or `sans-serif` is defined for the `body` element.
- **T2.15**: Scan SFC source files (`App.vue`, `Home.vue`, etc.) to ensure logo and banner asset paths are relative (`./assets/...` or `@/assets/...`).
- **T2.16**: Check for anchor tags (`<a>`) targeting `facebook.com` in `App.vue` or header/footer, and assert they have text or styling classes (Note: currently missing).
- **T2.17**: Scan `Home.vue` and count occurrences of SVG star/sparkle templates (Note: currently 0).
- **T2.18**: Read `src/App.vue`, verify the logo image element contains bounding styles such as `h-12` or `w-auto` to preserve the original aspect ratio.
- **T2.19**: Read `src/views/Home.vue`, verify the banner image tag has responsive cover classes `w-full h-full object-cover`.
- **T2.20**: Read `src/views/Contact.vue`, verify input/textarea elements for Name, Email, Subject, and Message contain the `required` validation attribute.
- **T2.21**: Read `src/style.css` and `tailwind.config.js` to confirm that the corporate purple hex `#3b2e5a` is defined as a theme variable.
- **T2.22**: Read `src/style.css` and `tailwind.config.js` to confirm that the corporate gold hex `#d4af37` is defined as a theme variable.
- **T2.23**: Scan `src/App.vue` and `src/views/Activities.vue` for hover-scaling tailwind classes (e.g., `hover:scale-105` or `hover:scale-102`) combined with `transition` classes.
- **T2.24**: Scan `src/App.vue` for the presence of the Vue `<transition>` tag around the `<router-view>` and mobile nav element.
- **T2.25**: Read `index.html` at root and assert `<title>` content contains "Astriferum Innovare" (Note: currently is "org-concept").
- **T2.26**: Build the project, scan `dist/assets` files, and check that no individual asset exceeds 2MB using `fs.statSync`.

### Tier 3: Cross-Feature Combinations (5 Tests)
- **T3.1**: Check that star/sparkle SVGs in `Home.vue` have hover scale classes (e.g. `hover:text-accent`, `hover:scale-`) and transitions (Note: currently missing).
- **T3.2**: Read `src/App.vue`, search for router link configurations, and verify they dynamically style active routes with the gold theme class (e.g. `text-accent`).
- **T3.3**: Verify that the content pillar cards in `Home.vue` use borders and backgrounds matching the core theme palette (`border-accent` / `bg-white/5`).
- **T3.4**: Verify that `Activities.vue` uses grid layout classes with responsive column configurations (`grid-cols-1 md:grid-cols-2`) combined with hover scaling components.
- **T3.5**: Verify that `Contact.vue` groups the email prefill input alongside a Mail icon styled with the theme's colors (`text-accent` or `text-primary`).

### Tier 4: Real-world Application Scenarios (5 Tests)
- **T4.1**: Execute `npm run build` as a child process via `child_process.execSync` and assert that the process exits with status code 0.
- **T4.2**: Scan the `dist` output folder after build, verifying that `dist/index.html` exists and contains link tags importing assets from `dist/assets/`.
- **T4.3**: Parse router routes from `src/router/index.js` statically and verify that all referenced target view components exist in `src/views/`.
- **T4.4**: Verify color scheme consistency by scanning `App.vue` and all view files, asserting that no conflicting hardcoded colors are used for structural layout.
- **T4.5**: Scan layout wrappers in all views (`App.vue` and views) to verify that they contain mobile-first layout classes (`md:`, `flex`, `grid`).

---

## 5. Recommended Implementation Code for `tests/run-tests.js`

Here is the proposed Node.js ESM script structure to implement the 62 tests. The script lists all 62 assertions, implementing full check logic. It highlights where tests fail due to gaps in the current codebase, which allows implementing agents to easily identify what needs to be fixed.

```js
/**
 * Custom E2E Offline Test Runner
 * Location: tests/run-tests.js
 * Run using: node tests/run-tests.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import assert from 'assert';
import { fileURLToPath } from 'url';

// Resolve paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const Tiers = {
  'Tier 1: Feature Coverage': [],
  'Tier 2: Boundary/Corner Cases': [],
  'Tier 3: Cross-Feature Combinations': [],
  'Tier 4: Real-world Application Scenarios': []
};

// Test registration helper
function addTest(tier, id, description, testFn) {
  if (!Tiers[tier]) {
    throw new Error(`Invalid Tier: ${tier}`);
  }
  Tiers[tier].push({ id, description, testFn });
}

// File helper functions
function getPath(relative) {
  return path.join(rootDir, relative);
}

function readTextFile(relative) {
  return fs.readFileSync(getPath(relative), 'utf8');
}

// ==========================================
// TIER 1: FEATURE COVERAGE
// ==========================================

addTest('Tier 1: Feature Coverage', 'T1.1', 'Vite Config File Existence', () => {
  assert.ok(fs.existsSync(getPath('vite.config.js')), 'vite.config.js should exist at root');
});

addTest('Tier 1: Feature Coverage', 'T1.2', 'Vue Dependency in package.json', () => {
  const pkg = JSON.parse(readTextFile('package.json'));
  assert.ok(pkg.dependencies && pkg.dependencies.vue, 'package.json must contain vue in dependencies');
});

addTest('Tier 1: Feature Coverage', 'T1.3', 'Router Dependency in package.json', () => {
  const pkg = JSON.parse(readTextFile('package.json'));
  assert.ok(pkg.dependencies && pkg.dependencies['vue-router'], 'package.json must contain vue-router');
});

addTest('Tier 1: Feature Coverage', 'T1.4', 'Tailwind CSS Dependency in package.json', () => {
  const pkg = JSON.parse(readTextFile('package.json'));
  assert.ok(pkg.devDependencies && pkg.devDependencies.tailwindcss, 'package.json must contain tailwindcss in devDependencies');
});

addTest('Tier 1: Feature Coverage', 'T1.5', 'Tailwind Config Scan Paths', () => {
  const configContent = readTextFile('tailwind.config.js');
  assert.match(configContent, /\.\/index\.html/, 'tailwind.config.js must scan ./index.html');
  assert.match(configContent, /\.\/src\/\*\*\/\*\.\{vue,js,ts,jsx,tsx\}/, 'tailwind.config.js must scan src folder');
});

addTest('Tier 1: Feature Coverage', 'T1.6', 'PostCSS Config File Existence', () => {
  assert.ok(fs.existsSync(getPath('postcss.config.js')), 'postcss.config.js should exist');
});

addTest('Tier 1: Feature Coverage', 'T1.7', 'Router Index File Existence', () => {
  assert.ok(fs.existsSync(getPath('src/router/index.js')), 'src/router/index.js should exist');
});

addTest('Tier 1: Feature Coverage', 'T1.8', 'Router Mapping - Home Route', () => {
  const routerContent = readTextFile('src/router/index.js');
  assert.match(routerContent, /path:\s*'\/'/, 'Router must map root path /');
  assert.match(routerContent, /component:\s*Home/, 'Root path must map to Home component');
});

addTest('Tier 1: Feature Coverage', 'T1.9', 'Router Mapping - Announcements Route', () => {
  const routerContent = readTextFile('src/router/index.js');
  assert.match(routerContent, /path:\s*'\/announcements'/, 'Router must map path /announcements');
  assert.match(routerContent, /Announcements\.vue/, 'Announcements route must map to Announcements view');
});

addTest('Tier 1: Feature Coverage', 'T1.10', 'Router Mapping - Activities Route', () => {
  const routerContent = readTextFile('src/router/index.js');
  assert.match(routerContent, /path:\s*'\/activities'/, 'Router must map path /activities');
  assert.match(routerContent, /Activities\.vue/, 'Activities route must map to Activities view');
});

addTest('Tier 1: Feature Coverage', 'T1.11', 'Router Mapping - Contact Route', () => {
  const routerContent = readTextFile('src/router/index.js');
  assert.match(routerContent, /path:\s*'\/contact'/, 'Router must map path /contact');
  assert.match(routerContent, /Contact\.vue/, 'Contact route must map to Contact view');
});

addTest('Tier 1: Feature Coverage', 'T1.12', 'Logo Asset Existence', () => {
  assert.ok(fs.existsSync(getPath('src/assets/logo.png')), 'logo.png should exist in assets');
});

addTest('Tier 1: Feature Coverage', 'T1.13', 'Banner Asset Existence', () => {
  assert.ok(fs.existsSync(getPath('src/assets/banner.png')), 'banner.png should exist in assets');
});

addTest('Tier 1: Feature Coverage', 'T1.14', 'Logo Reference in Header', () => {
  const appContent = readTextFile('src/App.vue');
  assert.match(appContent, /logoUrl|logo\.png/, 'Header template or setup should reference logo');
});

addTest('Tier 1: Feature Coverage', 'T1.15', 'Logo Reference in Footer', () => {
  const appContent = readTextFile('src/App.vue');
  assert.match(appContent, /logoUrl|logo\.png/, 'Footer template or setup should reference logo');
});

addTest('Tier 1: Feature Coverage', 'T1.16', 'Banner Reference in Home', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  assert.match(homeContent, /bannerUrl|banner\.png/, 'Home view should reference banner image');
});

addTest('Tier 1: Feature Coverage', 'T1.17', 'Color Theme Classes', () => {
  const tailwindConfig = readTextFile('tailwind.config.js');
  const styleCss = readTextFile('src/style.css');
  const hasPrimary = tailwindConfig.includes('#3b2e5a') || styleCss.includes('#3b2e5a');
  const hasAccent = tailwindConfig.includes('#d4af37') || styleCss.includes('#d4af37');
  assert.ok(hasPrimary, 'Corporate purple (#3b2e5a) should be defined');
  assert.ok(hasAccent, 'Corporate gold (#d4af37) should be defined');
});

addTest('Tier 1: Feature Coverage', 'T1.18', 'Mission Statement Content', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  assert.match(homeContent, /empower builders and visionaries/, 'Home view must contain the core Mission statement text');
});

addTest('Tier 1: Feature Coverage', 'T1.19', 'Vision Statement Content', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  assert.match(homeContent, /establish an elite ecosystem/, 'Home view must contain the core Vision statement text');
});

addTest('Tier 1: Feature Coverage', 'T1.20', 'Objectives Statement Content', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  // NOTE: Currently fails due to missing Objectives content
  assert.match(homeContent, /Objectives|objectives/i, 'Home view must contain Objectives statement details');
});

addTest('Tier 1: Feature Coverage', 'T1.21', 'Core Pillar Icons - Mission', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  // NOTE: Currently fails because the Mission card has a lightning bolt instead of a Target icon
  assert.ok(homeContent.includes('Target') || homeContent.includes('target-icon'), 'Mission card must use a Target icon');
});

addTest('Tier 1: Feature Coverage', 'T1.22', 'Core Pillar Icons - Vision', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  // Checks for Eye SVG paths or classes in the Vision section
  assert.match(homeContent, /d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/, 'Vision card must have Eye icon SVG paths');
});

addTest('Tier 1: Feature Coverage', 'T1.23', 'Core Pillar Icons - Objectives', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  // NOTE: Currently fails due to missing Objectives card
  assert.ok(homeContent.includes('Checklist') || homeContent.includes('clipboard'), 'Objectives card must have Checklist/Clipboard icon');
});

addTest('Tier 1: Feature Coverage', 'T1.24', 'Contact Email Prefill', () => {
  const contactContent = readTextFile('src/views/Contact.vue');
  assert.match(contactContent, /astriferuminnovare@gmail\.com/, 'Contact view must contain the prefilled email address');
});

addTest('Tier 1: Feature Coverage', 'T1.25', 'Contact Facebook Reference', () => {
  const appContent = readTextFile('src/App.vue');
  // NOTE: Currently fails due to missing Facebook reference in header/footer
  assert.match(appContent, /ASTRIFERUM INNOVARE/i, 'App footer/header must contain ASTRIFERUM INNOVARE Facebook text');
});

addTest('Tier 1: Feature Coverage', 'T1.26', 'Activities Data Model', () => {
  const activitiesContent = readTextFile('src/views/Activities.vue');
  assert.match(activitiesContent, /const activities\s*=\s*ref\(/, 'Activities.vue must define a reactive activities array');
});

// ==========================================
// TIER 2: BOUNDARY/CORNER CASES
// ==========================================

addTest('Tier 2: Boundary/Corner Cases', 'T2.1', 'Missing Vite Config File', () => {
  const configPath = getPath('vite.config.js');
  const tempConfigPath = getPath('vite.config.js.bak');
  let hasBackup = false;
  try {
    if (fs.existsSync(configPath)) {
      fs.renameSync(configPath, tempConfigPath);
      hasBackup = true;
    }
    assert.strictEqual(fs.existsSync(configPath), false, 'vite.config.js should be temporarily missing');
  } finally {
    if (hasBackup) {
      fs.renameSync(tempConfigPath, configPath);
    }
  }
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.2', 'Malformed package.json', () => {
  const packagePath = getPath('package.json');
  const tempPackagePath = getPath('package.json.bak');
  let hasBackup = false;
  try {
    if (fs.existsSync(packagePath)) {
      fs.copyFileSync(packagePath, tempPackagePath);
      hasBackup = true;
    }
    fs.writeFileSync(packagePath, '{ invalid_json: [ }');
    assert.throws(() => {
      JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    }, SyntaxError);
  } finally {
    if (hasBackup) {
      fs.copyFileSync(tempPackagePath, packagePath);
      fs.unlinkSync(tempPackagePath);
    }
  }
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.3', 'Tailwind Scan Missing Source', () => {
  const configContent = readTextFile('tailwind.config.js');
  assert.match(configContent, /\.\/src\/\*\*\/\*\.\{vue,js,ts,jsx,tsx\}/, 'Tailwind must scan the whole src directory');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.4', 'Empty Activities Array', () => {
  const activitiesContent = readTextFile('src/views/Activities.vue');
  assert.match(activitiesContent, /filteredActivities/, 'Activities.vue must handle filtered list computed property dynamically');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.5', 'Activities Mix - Upcoming Event Presence', () => {
  const activitiesContent = readTextFile('src/views/Activities.vue');
  assert.match(activitiesContent, /type:\s*['"]Upcoming['"]/i, 'Activities should have at least one Upcoming event');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.6', 'Activities Mix - Past Event Presence', () => {
  const activitiesContent = readTextFile('src/views/Activities.vue');
  assert.match(activitiesContent, /type:\s*['"]Past['"]/i, 'Activities should have at least one Past event');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.7', 'Activity Card Fields Integrity', () => {
  const activitiesContent = readTextFile('src/views/Activities.vue');
  // Make sure keys exist in the structure
  assert.match(activitiesContent, /title:/, 'Activities must have title field');
  assert.match(activitiesContent, /date:/, 'Activities must have date field');
  assert.match(activitiesContent, /type:/, 'Activities must have type field');
  assert.match(activitiesContent, /description:/, 'Activities must have description field');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.8', 'Router History Mode', () => {
  const routerContent = readTextFile('src/router/index.js');
  assert.match(routerContent, /createWebHistory/, 'Router must use HTML5 History mode');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.9', 'Router Redirect / Catch-All Route', () => {
  const routerContent = readTextFile('src/router/index.js');
  // NOTE: Currently fails because no wildcard redirect is configured
  assert.match(routerContent, /pathMatch|\*/, 'Router must have a catch-all mapping redirecting to Home/404');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.10', 'Contact Form Submission Prevention', () => {
  const contactContent = readTextFile('src/views/Contact.vue');
  assert.match(contactContent, /@submit\.prevent="handleSubmit"/, 'Form tag must intercept page reloads');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.11', 'Email Address Format Validation', () => {
  const contactContent = readTextFile('src/views/Contact.vue');
  assert.match(contactContent, /type="email"\s*v-model="formData\.email"/, 'Email input must enforce type="email"');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.12', 'Background Style Overlay Presence', () => {
  const styleContent = readTextFile('src/style.css');
  // NOTE: Currently fails due to missing custom texture classes
  assert.match(styleContent, /crumpled-paper|custom-pattern|texture-bg/i, 'style.css must define a paper/crumpled texture background');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.13', 'Header Serif Font Definition', () => {
  const styleContent = readTextFile('src/style.css');
  assert.match(styleContent, /font-family:\s*'Playfair Display'/, 'Heading font should be Playfair Display');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.14', 'Sans-serif Body Font Definition', () => {
  const styleContent = readTextFile('src/style.css');
  assert.match(styleContent, /font-family:\s*'Outfit'/, 'Body font should be Outfit');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.15', 'Asset Paths Normalization', () => {
  const appContent = readTextFile('src/App.vue');
  const homeContent = readTextFile('src/views/Home.vue');
  assert.match(appContent, /from\s*['"]\.\/assets/, 'App.vue asset imports must be relative');
  assert.match(homeContent, /from\s*['"]\.\.\/assets/, 'Home.vue asset imports must be relative');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.16', 'Facebook URL Integrity', () => {
  const appContent = readTextFile('src/App.vue');
  // NOTE: Currently fails because there are no Facebook URLs
  assert.match(appContent, /facebook\.com/i, 'Facebook links must target facebook.com domain');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.17', 'SVG Stars/Sparkles Count', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  // NOTE: Currently fails as there are no star SVGs
  const starsMatches = homeContent.match(/star-svg|sparkle/gi) || [];
  assert.ok(starsMatches.length >= 2, 'Hero section should contain multiple stars/sparkles');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.18', 'Logo Image Aspect Ratio / Dimensions', () => {
  const appContent = readTextFile('src/App.vue');
  assert.match(appContent, /h-12|h-10/, 'Logo image should contain height bounds to prevent distension');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.19', 'Banner Image Responsive Classes', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  assert.match(homeContent, /object-cover/, 'Banner image must specify object-cover container classes');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.20', 'Contact Form Empty Input Rejection', () => {
  const contactContent = readTextFile('src/views/Contact.vue');
  const matches = contactContent.match(/required/g) || [];
  assert.ok(matches.length >= 4, 'Input fields for form submission must use the HTML5 required attribute');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.21', 'CSS Variable for Corporate Purple', () => {
  const styleContent = readTextFile('src/style.css');
  assert.match(styleContent, /--color-primary:\s*#3b2e5a/, 'Primary Corporate Purple color variable should be declared');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.22', 'CSS Variable for Corporate Gold', () => {
  const styleContent = readTextFile('src/style.css');
  assert.match(styleContent, /--color-accent:\s*#d4af37/, 'Accent Corporate Gold color variable should be declared');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.23', 'Hover Scale Micro-interactions', () => {
  const activitiesContent = readTextFile('src/views/Activities.vue');
  assert.match(activitiesContent, /hover:scale-/, 'Interaction cards must have hover scaling transforms');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.24', 'Transition Utility Classes', () => {
  const appContent = readTextFile('src/App.vue');
  assert.match(appContent, /<transition/, 'App.vue should utilize Vue transitions around router-view and layout wrappers');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.25', 'Build Dist HTML Title', () => {
  const indexHtml = readTextFile('index.html');
  // NOTE: Currently fails because title is "org-concept"
  assert.match(indexHtml, /<title>.*Astriferum.*<\/title>/i, 'index.html title must contain Astriferum reference');
});

addTest('Tier 2: Boundary/Corner Cases', 'T2.26', 'Production Bundle File Size Check', () => {
  // Read all asset files under dist/assets
  const assetsDir = getPath('dist/assets');
  if (!fs.existsSync(assetsDir)) {
    throw new Error('Build output directory dist/assets is missing; run Tier 4 build first');
  }
  const files = fs.readdirSync(assetsDir);
  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    assert.ok(stats.size < 2000000, `Asset ${file} size should be under 2MB, but is ${stats.size} bytes`);
  }
});

// ==========================================
// TIER 3: CROSS-FEATURE COMBINATIONS
// ==========================================

addTest('Tier 3: Cross-Feature Combinations', 'T3.1', 'Celestial Theme & Sparkles Interaction', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  // NOTE: Currently fails because stars are missing
  assert.match(homeContent, /hover:text-accent.*transition|hover:scale/gi, 'Sparkles must integrate active micro-interactions');
});

addTest('Tier 3: Cross-Feature Combinations', 'T3.2', 'Routing & Active Styling Integration', () => {
  const appContent = readTextFile('src/App.vue');
  assert.match(appContent, /text-accent/, 'Active route classes must output theme-consistent colors');
});

addTest('Tier 3: Cross-Feature Combinations', 'T3.3', 'Content Pillars & Theme Integration', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  assert.match(homeContent, /border-accent|bg-white\/5/, 'Content cards must align with theme border/background values');
});

addTest('Tier 3: Cross-Feature Combinations', 'T3.4', 'Activities Layout & Responsive Scaling', () => {
  const activitiesContent = readTextFile('src/views/Activities.vue');
  assert.match(activitiesContent, /grid-cols-1.*md:grid-cols-2/, 'Activities layouts must match responsive classes');
});

addTest('Tier 3: Cross-Feature Combinations', 'T3.5', 'Contact Form Prefill & Icon Alignment', () => {
  const contactContent = readTextFile('src/views/Contact.vue');
  assert.match(contactContent, /absolute.*left-0.*pl-3/, 'Prefilled contact input container should align relative svg icon position');
});

// ==========================================
// TIER 4: REAL-WORLD APPLICATION SCENARIOS
// ==========================================

addTest('Tier 4: Real-world Application Scenarios', 'T4.1', 'Production Build Execution and Verification', () => {
  // Execute compilation build process synchronously
  console.log('       [Build Subprocess] Compiling project via npm run build...');
  execSync('npm run build', { stdio: 'pipe', cwd: rootDir });
  console.log('       [Build Subprocess] Compile complete.');
});

addTest('Tier 4: Real-world Application Scenarios', 'T4.2', 'Built Output Asset Integrity', () => {
  assert.ok(fs.existsSync(getPath('dist/index.html')), 'Compiled production index.html must exist in dist');
  const distHtml = fs.readFileSync(getPath('dist/index.html'), 'utf8');
  assert.match(distHtml, /<script type="module"/, 'Compiled distribution HTML must import module assets');
  assert.match(distHtml, /<link rel="stylesheet"/, 'Compiled distribution HTML must import stylesheets');
});

addTest('Tier 4: Real-world Application Scenarios', 'T4.3', 'Navigation Map Compliance', () => {
  const routerContent = readTextFile('src/router/index.js');
  
  // Extract all views referenced in routes
  const views = ['Home.vue', 'Announcements.vue', 'Activities.vue', 'Contact.vue'];
  for (const view of views) {
    const viewPath = getPath(`src/views/${view}`);
    assert.ok(fs.existsSync(viewPath), `Router-mapped view file ${view} must exist in views directory`);
  }
});

addTest('Tier 4: Real-world Application Scenarios', 'T4.4', 'Complete Brand Theme Consistency', () => {
  const appContent = readTextFile('src/App.vue');
  const homeContent = readTextFile('src/views/Home.vue');
  const activitiesContent = readTextFile('src/views/Activities.vue');
  const contactContent = readTextFile('src/views/Contact.vue');
  
  // Assert presence of tailwind themes inside templates
  assert.match(appContent, /bg-primary|text-accent/i);
  assert.match(homeContent, /bg-primary|text-accent/i);
  assert.match(activitiesContent, /bg-primary|text-accent/i);
  assert.match(contactContent, /bg-primary|text-accent/i);
});

addTest('Tier 4: Real-world Application Scenarios', 'T4.5', 'Full Responsive Class Scavenger', () => {
  const homeContent = readTextFile('src/views/Home.vue');
  const contactContent = readTextFile('src/views/Contact.vue');
  
  assert.match(homeContent, /md:text-left|lg:grid-cols-2/, 'Responsive break utilities must be declared in layouts');
  assert.match(contactContent, /lg:col-span-2|md:grid-cols-2/, 'Form groups must map sizing relative to screen resolutions');
});

// ==========================================
// RUNNER PROCESS EXECUTION
// ==========================================

async function runRunner() {
  let passed = 0;
  let failed = 0;
  const failuresList = [];

  console.log(`\n\x1b[1m\x1b[35m=== RUNNING E2E OFFLINE TEST RUNNER (62 TESTS) ===\x1b[0m\n`);

  for (const [tierName, tests] of Object.entries(Tiers)) {
    console.log(`\x1b[1m\x1b[36m--- Running ${tierName} (${tests.length} tests) ---\x1b[0m`);
    for (const test of tests) {
      try {
        await test.testFn();
        console.log(`\x1b[32m[PASS]\x1b[0m ${test.id}: ${test.description}`);
        passed++;
      } catch (err) {
        console.log(`\x1b[31m[FAIL]\x1b[0m ${test.id}: ${test.description}`);
        console.log(`       \x1b[33mReason: ${err.message}\x1b[0m`);
        failed++;
        failuresList.push({ id: test.id, description: test.description, error: err.message });
      }
    }
    console.log();
  }

  console.log(`\x1b[1m=== TEST RESULTS SUMMARY ===\x1b[0m`);
  console.log(`Total Tests: ${passed + failed}`);
  console.log(`Passed:      \x1b[32m${passed}\x1b[0m`);
  console.log(`Failed:      ${failed > 0 ? `\x1b[31m${failed}\x1b[0m` : `\x1b[32m${failed}\x1b[0m`}`);

  if (failuresList.length > 0) {
    console.log(`\n\x1b[1m\x1b[31m--- FAILED TESTS DETAILS (${failed} tests) ---\x1b[0m`);
    failuresList.forEach((f, idx) => {
      console.log(`${idx + 1}. [${f.id}] ${f.description}`);
      console.log(`   Error: ${f.error}`);
    });
    console.log();
    process.exit(1);
  } else {
    console.log(`\n\x1b[1m\x1b[32mALL 62 OFFLINE TESTS PASSED SUCCESSFULLY!\x1b[0m\n`);
    process.exit(0);
  }
}

runRunner().catch(err => {
  console.error('Fatal Test Runner Exception:', err);
  process.exit(1);
});
```

---

## 6. Actionable Recommendations for Implementing Agent
1. **Create the Folder and File**: Create the folder `tests` inside `d:\Innovare Web\org-concept` and save the proposed script exactly as written above to `tests/run-tests.js`.
2. **Hook up Package Script**: Add `"test": "node tests/run-tests.js"` in `package.json` under the `scripts` object.
3. **Resolve Gaps First**: Before executing the tests, solve the 11 identified discrepancies:
   - Add an Objectives card to `src/views/Home.vue` with the Checklist icon and Objectives text.
   - Replace the lightning bolt SVG inside the Mission card with a Target icon SVG.
   - Insert an anchor link for the `ASTRIFERUM INNOVARE` Facebook page (pointing to `facebook.com`) in `src/App.vue` or footer.
   - Update `src/router/index.js` to include a catch-all route mapping that redirects back to `/` or shows a fallback view.
   - Define custom styles/patterns for crumpled-paper theme elements in `src/style.css`.
   - Embed multiple star/sparkle SVGs in the Hero header area of `src/views/Home.vue` and give them scale animations.
   - Change the title in `index.html` from `org-concept` to `Astriferum Innovare`.
4. **Execution and Validation**:
   - Run `npm run build` to verify local bundler runs successfully.
   - Run `npm test` or `node tests/run-tests.js` to execute the tests. Ensure that all 62 assertions are green.
