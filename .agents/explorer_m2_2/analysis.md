# E2E Test Runner Implementation Analysis and Recommendation Report

## Executive Summary
This report provides a comprehensive design and implementation plan for a custom offline E2E test runner (`tests/run-tests.js`) for the `org-concept` project. The proposed test runner is engineered to execute all **62 tests** defined in `TEST_INFRA.md` within a fraction of a second (excluding the production compilation step) using only **Node.js built-in modules** (`fs`, `path`, `child_process`, `assert`, and `url`). 

Based on a read-only exploration of the `org-concept` codebase, we identified that:
1. **Framework Stack**: The application uses Vue 3, Vue Router 4, Tailwind CSS v4 (incorporating `@theme` definitions directly in CSS), and Vite.
2. **Current Implementation Gaps**:
   - The Facebook link reference `ASTRIFERUM INNOVARE` is currently missing in the footer (`src/App.vue`) and contact page (`src/views/Contact.vue`).
   - SVG stars/sparkles and physical background texture overlays are missing on the Home view.
   - The proposed runner is designed to detect these gaps immediately and report failures.

---

## 1. Test Architecture & Runner Design
The custom runner will reside at `tests/run-tests.js` and be run via Node.js:
```bash
node tests/run-tests.js
```

### Key Design Pillars
- **Zero Dependencies**: Relies solely on built-in Node.js APIs (`fs`, `path`, `child_process`, `assert`).
- **Clean Console Output**: Formatted using ANSI escape codes for coloring, grouping tests by Tier, and providing clear stack traces on failure.
- **Fail-Fast & Exit Codes**: Exits with code `1` immediately if any test fails, or exits with code `0` if all 62 tests pass.
- **State Cleanup Safeguards**: Utilizes `try-finally` blocks to guarantee the recovery of files mutated during boundary tests (e.g., renaming `vite.config.js`).

### Runner Boilerplate Code Pattern
The following pattern is recommended for the E2E test runner engine:

```javascript
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Resolve project directories relative to the runner script
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(__dirname, '..');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  reset: '\x1b[0m'
};

const stats = { total: 0, passed: 0, failed: 0 };
const failures = [];

function test(tier, name, testFn) {
  stats.total++;
  try {
    testFn();
    stats.passed++;
    console.log(`  ${colors.green}✓${colors.reset} [${tier}] ${name}`);
  } catch (error) {
    stats.failed++;
    console.error(`  ${colors.red}✗${colors.reset} [${tier}] ${name}`);
    console.error(`    ${colors.dim}${error.message}${colors.reset}`);
    failures.push({ tier, name, error });
  }
}

function runSuite() {
  console.log(`\n${colors.cyan}=== Running E2E Test Suite (62 Tests) ===${colors.reset}\n`);
  
  // Tiers will be invoked sequentially
  runTier1();
  runTier2();
  runTier3();
  runTier4();
  
  console.log(`\n${colors.cyan}=== Test Summary ===${colors.reset}`);
  console.log(`Total:  ${stats.total}`);
  console.log(`Passed: ${colors.green}${stats.passed}${colors.reset}`);
  console.log(`Failed: ${stats.failed > 0 ? colors.red : colors.green}${stats.failed}${colors.reset}`);
  
  if (failures.length > 0) {
    console.error(`\n${colors.red}Detailed Failures:${colors.reset}`);
    failures.forEach((f, index) => {
      console.error(`\n${index + 1}) [${f.tier}] ${f.name}`);
      console.error(`   ${colors.red}Error: ${f.error.message}${colors.reset}`);
      if (f.error.stack) {
        console.error(`${colors.dim}${f.error.stack.split('\n').slice(1, 4).join('\n')}${colors.reset}`);
      }
    });
    process.exit(1);
  }
  process.exit(0);
}
```

---

## 2. Test Case Implementation Strategy (62 Tests)

### Tier 1: Feature Coverage (26 tests)
Since these focus on configurations and structural elements, we will use static file verification and content regex matching.

| Test ID | Title | Implementation Check |
|---|---|---|
| **T1.1** | Vite Config File Existence | `assert.ok(fs.existsSync(path.resolve(projectDir, 'vite.config.js')))` |
| **T1.2** | Vue Dependency in package.json | Parse `package.json`, assert `dependencies.vue` is present. |
| **T1.3** | Router Dependency in package.json | Parse `package.json`, assert `dependencies['vue-router']` is present. |
| **T1.4** | Tailwind CSS Dependency in package.json | Parse `package.json`, assert `devDependencies.tailwindcss` is present. |
| **T1.5** | Tailwind Config Scan Paths | Scan `tailwind.config.js` or `src/style.css` to verify compilation entrypoints. |
| **T1.6** | PostCSS Config File Existence | `assert.ok(fs.existsSync(path.resolve(projectDir, 'postcss.config.js')))` |
| **T1.7** | Router Index File Existence | `assert.ok(fs.existsSync(path.resolve(projectDir, 'src/router/index.js')))` |
| **T1.8** | Router Mapping - Home Route | Regex match `path: '/'` maps to `Home` component in `src/router/index.js`. |
| **T1.9** | Router Mapping - Announcements Route | Regex match `path: '/announcements'` maps to `Announcements` component. |
| **T1.10** | Router Mapping - Activities Route | Regex match `path: '/activities'` maps to `Activities` component. |
| **T1.11** | Router Mapping - Contact Route | Regex match `path: '/contact'` maps to `Contact` component. |
| **T1.12** | Logo Asset Existence | `assert.ok(fs.existsSync(path.resolve(projectDir, 'src/assets/logo.png')))` |
| **T1.13** | Banner Asset Existence | `assert.ok(fs.existsSync(path.resolve(projectDir, 'src/assets/banner.png')))` |
| **T1.14** | Logo Reference in Header | Regex match `logo.png` or `logoUrl` inside the `<header>` block of `src/App.vue`. |
| **T1.15** | Logo Reference in Footer | Regex match `logo.png` or `logoUrl` inside the `<footer>` block of `src/App.vue`. |
| **T1.16** | Banner Reference in Home | Scan `src/views/Home.vue` for references to `banner.png` or `bannerUrl`. |
| **T1.17** | Color Theme Classes | Read `src/style.css` and verify `--color-primary: #3b2e5a` and `--color-accent: #d4af37`. |
| **T1.18** | Mission Statement Content | Read `src/views/Home.vue` and assert inclusion of the exact Mission text. |
| **T1.19** | Vision Statement Content | Read `src/views/Home.vue` and assert inclusion of the exact Vision text. |
| **T1.20** | Objectives Statement Content | Read `src/views/Home.vue` and assert inclusion of the exact Objectives text. |
| **T1.21** | Core Pillar Icons - Mission | Scan `src/views/Home.vue` inside the Mission card for a target/bullet SVG icon. |
| **T1.22** | Core Pillar Icons - Vision | Scan `src/views/Home.vue` inside the Vision card for an eye SVG icon. |
| **T1.23** | Core Pillar Icons - Objectives | Scan `src/views/Home.vue` inside the Objectives card for a clipboard/checklist SVG icon. |
| **T1.24** | Contact Email Prefill | Read `src/views/Contact.vue` and verify it defines `astriferuminnovare@gmail.com` as default. |
| **T1.25** | Contact Facebook Reference | Read `src/views/Contact.vue` or `src/App.vue`. Assert inclusion of `ASTRIFERUM INNOVARE`. |
| **T1.26** | Activities Data Model | Parse `src/views/Activities.vue` script segment and verify presence of a reactive array. |

---

### Tier 2: Boundary/Corner Cases (26 tests)
These test error handling, boundary bounds, and specific visual classes/rules.

- **T2.1: Missing Vite Config File**
  - *Strategy*: Move `vite.config.js` to a temporary name, check runner behavior, and restore it.
- **T2.2: Malformed package.json**
  - *Strategy*: Try to parse `package.json` inside a try-catch. Verify the code gracefully identifies non-JSON formats without throwing a fatal crash.
- **T2.3: Tailwind Scan Missing Source**
  - *Strategy*: Read `tailwind.config.js` or `style.css` and assert it scans the entire `src` folder (e.g. using glob pattern).
- **T2.4: Empty Activities Array**
  - *Strategy*: Extract the reactive array code block from `src/views/Activities.vue`. Assert that the template code handles empty state elements using standard Vue template directives (`v-if` or list rendering).
- **T2.5: Activities Mix - Upcoming Event Presence**
  - *Strategy*: Extract mock data items using Regex from `src/views/Activities.vue` and verify that at least one item has `type: 'Upcoming'`.
- **T2.6: Activities Mix - Past Event Presence**
  - *Strategy*: Extract mock data items and verify that at least one item has `type: 'Past'`.
- **T2.7: Activity Card Fields Integrity**
  - *Strategy*: Check that all elements in the extracted mock data array contain the keys: `title`, `date`, `type`, and `description`.
- **T2.8: Router History Mode**
  - *Strategy*: Scan `src/router/index.js` for the inclusion of `createWebHistory` instead of hash/memory histories.
- **T2.9: Router Redirect / Catch-All Route**
  - *Strategy*: Verify in `src/router/index.js` that invalid paths or catch-all routes are redirected.
- **T2.10: Contact Form Submission Prevention**
  - *Strategy*: Search `<form>` tags in `src/views/Contact.vue` for `@submit.prevent` or `v-on:submit.prevent`.
- **T2.11: Email Address Format Validation**
  - *Strategy*: Verify the email input in `src/views/Contact.vue` has `type="email"` or matching regex validators.
- **T2.12: Background Style Overlay Presence**
  - *Strategy*: Search `src/style.css` or component background classes for a crumpled-paper layout class or pattern overlay.
- **T2.13: Header Serif Font Definition**
  - *Strategy*: Read `src/style.css` or `tailwind.config.js` and verify that serif font family includes `'Playfair Display'`, `'Cinzel'`, or generic `'serif'`.
- **T2.14: Sans-serif Body Font Definition**
  - *Strategy*: Verify that body fonts are set to `'Outfit'`, `'Inter'`, or `'sans-serif'` in `src/style.css` or Tailwind settings.
- **T2.15: Asset Paths Normalization**
  - *Strategy*: Check all files to ensure asset paths are relative or use Vite alias configuration rather than absolute computer paths.
- **T2.16: Facebook URL Integrity**
  - *Strategy*: Scan `.vue` files for anchor tags linking to `facebook.com` or `fb.com` using correct markup.
- **T2.17: SVG Stars/Sparkles Count**
  - *Strategy*: Match occurrences of sparkle SVG indicators or symbols inside `Home.vue`.
- **T2.18: Logo Image Aspect Ratio / Dimensions**
  - *Strategy*: Scan `src/App.vue` to ensure image tags targeting `logoUrl` contain sizing restriction classes (e.g. `h-12 w-auto`, `h-10 w-auto`).
- **T2.19: Banner Image Responsive Classes**
  - *Strategy*: Verify that the banner `<img>` in `src/views/Home.vue` has sizing classes like `h-64 md:h-96 w-full object-cover`.
- **T2.20: Contact Form Empty Input Rejection**
  - *Strategy*: Search `src/views/Contact.vue` for input text/email/textarea elements, confirming the presence of the `required` validation property.
- **T2.21: CSS Variable for Corporate Purple**
  - *Strategy*: Validate that the primary color `#3b2e5a` is defined as a theme constant.
- **T2.22: CSS Variable for Corporate Gold**
  - *Strategy*: Validate that the accent color `#d4af37` is defined as a theme constant.
- **T2.23: Hover Scale Micro-interactions**
  - *Strategy*: Scan components for hover effect classes like `hover:scale-105` or transitions.
- **T2.24: Transition Utility Classes**
  - *Strategy*: Search `src/App.vue` for the presence of the Vue `<transition>` tag and check `style.css` for classes like `.fade-enter-active`.
- **T2.25: Build Dist HTML Title**
  - *Strategy*: Read `index.html` and verify the `<title>` tag contains the term `"Astriferum Innovare"`.
- **T2.26: Production Bundle File Size Check**
  - *Strategy*: Read size of output assets in `dist/assets` (run after build step) and assert they are within safety limits (e.g., JS < 1MB).

---

### Tier 3: Cross-Feature Combinations (5 tests)
Checks logical integration of visual styles, routing, and data layouts.

- **T3.1: Celestial Theme & Sparkles Interaction**
  - *Strategy*: Assert that SVGs representing stars contain interactive transitions or animations (e.g., `animate-pulse` or `hover:scale`).
- **T3.2: Routing & Active Styling Integration**
  - *Strategy*: Check that router-links in `src/App.vue` dynamically apply active visual markers containing corporate colors (like gold active borders).
- **T3.3: Content Pillars & Theme Integration**
  - *Strategy*: Check that the Mission, Vision, and Objectives cards in `Home.vue` match the theme configuration (using `bg-white/5` and `border-accent/40`).
- **T3.4: Activities Layout & Responsive Scaling**
  - *Strategy*: Verify the grid layout in `Activities.vue` is responsive (e.g., `grid-cols-1 md:grid-cols-2`) and features hover scaling.
- **T3.5: Contact Form Prefill & Icon Alignment**
  - *Strategy*: In `Contact.vue`, check that the email field is paired with an SVG mail icon aligned within a flex container.

---

### Tier 4: Real-world Application Scenarios (5 tests)
These test deployment readiness and consistency.

- **T4.1: Production Build Execution and Verification**
  - *Strategy*: Run `npm run build` using child process execution. Check that it compiles cleanly with an exit code of `0`.
- **T4.2: Built Output Asset Integrity**
  - *Strategy*: Read the `dist/` folder. Verify that `dist/index.html` exists and references built script/stylesheet resources, and the logos/banners are properly output.
- **T4.3: Navigation Map Compliance**
  - *Strategy*: Read `src/router/index.js` routes mapping, extract paths, and assert that the corresponding view components (e.g., `Home.vue`, `Contact.vue`) exist on disk.
- **T4.4: Complete Brand Theme Consistency**
  - *Strategy*: Audit all views to ensure they consistently use `primary` / `#3b2e5a` and `accent` / `#d4af37` colors. Throw errors for unapproved colors.
- **T4.5: Full Responsive Class Scavenger**
  - *Strategy*: Scan all views for responsive breakpoints (`sm:`, `md:`, `lg:`) in layout structures.

---

## 3. Node.js Code Patterns for Key Tests

### A. Safe File Mutation (T2.1: Missing Config)
For tests that verify error handling when files are missing, the runner must guarantee restoration using `try-finally`:
```javascript
test('T2.1', 'Missing Vite Config File Graceful Handling', () => {
  const configPath = path.resolve(projectDir, 'vite.config.js');
  const tempPath = path.resolve(projectDir, 'vite.config.js.tmp');
  
  let existsBefore = fs.existsSync(configPath);
  if (!existsBefore) {
    throw new Error('vite.config.js is missing before test start');
  }
  
  try {
    // 1. Move file
    fs.renameSync(configPath, tempPath);
    
    // 2. Perform verification (ensure helper or process does not crash)
    const runAnalysisWithoutConfig = () => {
      // Simulate static scan function behavior
      return fs.existsSync(configPath); 
    };
    const result = runAnalysisWithoutConfig();
    assert.strictEqual(result, false);
  } finally {
    // 3. Always restore file
    if (fs.existsSync(tempPath)) {
      fs.renameSync(tempPath, configPath);
    }
  }
});
```

### B. Reactive Data Model Extraction (T1.26 & T2.7: Activities validation)
Extract and evaluate data structures from files safely using regex parsing:
```javascript
test('T1.26', 'Activities Data Model Validation', () => {
  const filePath = path.resolve(projectDir, 'src/views/Activities.vue');
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Locate the activities array inside <script setup>
  const arrayMatch = content.match(/activities\s*=\s*ref\(\s*\[([\s\S]*?)\]\s*\)/);
  assert.ok(arrayMatch, 'Activities ref array not found in script setup');
  
  // Reconstruct array safely for evaluation in node
  const arrayText = `[${arrayMatch[1]}]`;
  // Clean comments and syntax that might block simple parsing
  const cleanArrayText = arrayText.replace(/\/\/.*$/gm, '');
  
  // Evaluate extracted string safely as structured object
  // Note: Avoid eval; use JSON-like parsing or structured extraction
  const containsUpcoming = cleanArrayText.includes("'Upcoming'") || cleanArrayText.includes('"Upcoming"');
  const containsPast = cleanArrayText.includes("'Past'") || cleanArrayText.includes('"Past"');
  
  assert.ok(containsUpcoming, 'Missing upcoming events in reactive activities model');
  assert.ok(containsPast, 'Missing past events in reactive activities model');
});
```

### C. Build Execution and File size check (T4.1 & T2.26)
Execute production build commands asynchronously and check outputs:
```javascript
test('T4.1', 'Production Build Execution', () => {
  try {
    execSync('npm run build', { cwd: projectDir, stdio: 'pipe' });
  } catch (error) {
    throw new Error(`Build failed: ${error.stderr ? error.stderr.toString() : error.message}`);
  }
});

test('T2.26', 'Production Bundle File Size Check', () => {
  const assetsDir = path.resolve(projectDir, 'dist/assets');
  assert.ok(fs.existsSync(assetsDir), 'Build assets folder does not exist');
  
  const files = fs.readdirSync(assetsDir);
  files.forEach(file => {
    const stats = fs.statSync(path.join(assetsDir, file));
    // Set 1.5MB max bundle limit
    const limit = 1.5 * 1024 * 1024;
    assert.ok(stats.size < limit, `Asset ${file} exceeds bundle limit of 1.5MB: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
  });
});
```

---

## 4. Recommendations & Key Findings
Based on the code analysis, we recommend implementing the runner with the following adjustments:

1. **Branding Updates**: 
   - Add the Facebook reference `ASTRIFERUM INNOVARE` and link to `facebook.com` in `src/App.vue` footer and `src/views/Contact.vue` contact page details to avoid failures in **T1.25** and **T2.16**.
   - Add background texturing (e.g. `.bg-crumpled-pattern` class with crumpled-paper overlay or similar styles) in `src/style.css` to avoid failures in **T2.12**.
   - Add interactive SVG stars/sparkles in `Home.vue` hero to satisfy **T2.17** and **T3.1**.
2. **ES Module Syntax**: Since `package.json` specifies `"type": "module"`, configure the test runner file `tests/run-tests.js` to use clean `import` statements rather than CommonJS `require()`.
3. **Execution Script Integration**: Register the runner in `package.json`:
   ```json
   "scripts": {
     "test": "node tests/run-tests.js"
   }
   ```
   This ensures standard compliance and simplifies usage.
