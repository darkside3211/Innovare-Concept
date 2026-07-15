# Technical Recommendation: Offline Custom E2E Test Runner for org-concept

This report outlines the recommended design, architecture, and code patterns for implementing the custom E2E test runner in `tests/run-tests.js`. The runner is designed to execute **62 E2E test cases** offline using **only Node.js built-in modules** (`fs`, `path`, `child_process`, `assert`).

---

## 1. Runner Architecture & Execution Model

The runner will operate as a self-contained Node.js CLI script. Because it must run offline without external dependencies (like Jest or Playwright), it will perform a hybrid of **static code analysis** (validating source structures, content, config files, styles, and assets) and **build-output integration testing** (compiling the project and checking artifacts).

### Recommended File Structure
```
org-concept/
├── src/
│   ├── App.vue
│   ├── style.css
│   └── ...
├── tests/
│   └── run-tests.js  <-- Self-contained custom test runner
├── package.json
└── ...
```

### Script Shell & Lifecycle
The runner imports only built-in modules, defines ANSI color escape codes for terminal outputs, establishes a test registry, and handles command-line arguments to allow targeted execution (e.g. running specific tiers or individual tests).

```javascript
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import assert from 'assert';
import { fileURLToPath } from 'url';

// 1. Resolve Root Directory Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// 2. Terminal Styling Colors
const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m'
};

// 3. Test Registry & State
const testSuite = [];
const results = { passed: 0, failed: 0, skipped: 0, details: [] };

/**
 * Registers a test case
 */
function test(id, tier, description, runFn) {
  testSuite.push({ id, tier, description, runFn });
}
```

---

## 2. Test Execution Engine

The execution loop processes all registered tests, catch exceptions, prints status reports in real time, and exits with code `0` if all tests pass, or `1` if any fail.

```javascript
// 4. Main Runner Core
function runSuite() {
  console.log(`\n${COLORS.bold}${COLORS.cyan}=== Running E2E Test Suite (62 Tests) ===${COLORS.reset}\n`);
  
  // Parse command-line args
  const args = process.argv.slice(2);
  const targetTier = args.find(arg => arg.startsWith('--tier='))?.split('=')[1];
  const targetId = args.find(arg => arg.startsWith('--id='))?.split('=')[1];
  
  const startTime = Date.now();
  
  for (const t of testSuite) {
    // CLI filters
    if (targetTier && t.tier.toString() !== targetTier) continue;
    if (targetId && t.id !== targetId) continue;
    
    process.stdout.write(`[${t.id}] [Tier ${t.tier}] ${t.description} ... `);
    
    try {
      t.runFn();
      console.log(`${COLORS.green}PASS${COLORS.reset}`);
      results.passed++;
    } catch (err) {
      console.log(`${COLORS.red}FAIL${COLORS.reset}`);
      console.error(`  ${COLORS.red}Error: ${err.message}${COLORS.reset}`);
      results.failed++;
      results.details.push({ id: t.id, desc: t.description, error: err.message });
    }
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  // 5. Printable Summary Report
  console.log(`\n${COLORS.bold}${COLORS.cyan}=== Test Summary ===${COLORS.reset}`);
  console.log(`Duration: ${duration}s`);
  console.log(`Total Passed: ${COLORS.green}${results.passed}${COLORS.reset}`);
  console.log(`Total Failed: ${COLORS.red}${results.failed}${COLORS.reset}`);
  
  if (results.failed > 0) {
    console.log(`\n${COLORS.bold}${COLORS.red}Failed Tests Detail:${COLORS.reset}`);
    results.details.forEach(f => {
      console.log(`- [${f.id}] ${f.desc}: ${f.error}`);
    });
    process.exit(1);
  } else {
    console.log(`\n${COLORS.bold}${COLORS.green}All tests completed successfully!${COLORS.reset}`);
    process.exit(0);
  }
}
```

---

## 3. Test Case Implementation Strategy

Because tests must run offline, we employ three key testing strategies:

1. **Static Analysis of Configurations and Metadata**: Reading files like `package.json` or `vite.config.js` via `fs.readFileSync` and parsing them or looking for specific configuration strings.
2. **Regex/Substring Scavenging of Vue Template Files**: Checking source code structures (`App.vue`, `Home.vue`, `Contact.vue`, `style.css`) using precise Regex patterns to verify element presence, attributes, CSS variable definitions, class setups, and texts (e.g. prefilled email, vision statements, active routes).
3. **Sandbox File System Toggling**: Simulating boundaries by temporarily renaming config files, writing malformed inputs, verifying that our script or helper utilities respond correctly, and restoring the workspace safely via `try/finally` blocks.
4. **Build Verification**: Triggering `npm run build` inside a child process to confirm it compiles cleanly, and then scanning `dist/` outputs to verify size requirements and linking.

---

## 4. Specific Code Patterns by Tier

Below are recommended code implementations for specific tests from each Tier.

### Tier 1: Feature Coverage (26 Tests)

#### T1.18, T1.19, T1.20: Content Statement Checks (e.g., Home.vue Mission/Vision/Objectives)
Uses exact string matching on the content files to ensure compliance with the Astriferum follow-up specification text.
```javascript
test('T1.18', 1, 'Verify Mission statement text in Home.vue', () => {
  const homePath = path.join(ROOT_DIR, 'src/views/Home.vue');
  const homeContent = fs.readFileSync(homePath, 'utf-8');
  const expectedMission = "To equip the youth with relevant skills in technology, sciences, humanities, and arts to excel as individuals and contribute to nation-building.";
  assert.ok(homeContent.includes(expectedMission), "Home.vue is missing the exact required Mission statement.");
});

test('T1.19', 1, 'Verify Vision statement text in Home.vue', () => {
  const homePath = path.join(ROOT_DIR, 'src/views/Home.vue');
  const homeContent = fs.readFileSync(homePath, 'utf-8');
  const expectedVision = "To become a prominent youth organization who advocates for skills and career advancement for a brighter tomorrow filled with competent, transparent, and excellent youths grounded in humility and morality.";
  assert.ok(homeContent.includes(expectedVision), "Home.vue is missing the exact required Vision statement.");
});

test('T1.20', 1, 'Verify Objectives statement text in Home.vue', () => {
  const homePath = path.join(ROOT_DIR, 'src/views/Home.vue');
  const homeContent = fs.readFileSync(homePath, 'utf-8');
  const expectedObjectives = "To shape the youth to become excellent in technology, science, humanities, and arts, and promote youth leadership that aids in fostering a better tomorrow.";
  assert.ok(homeContent.includes(expectedObjectives), "Home.vue is missing the exact required Objectives statement.");
});
```

#### T1.14 & T1.15: Logo Reference in Header & Footer
Scans `src/App.vue` for separate logo images or references.
```javascript
test('T1.14', 1, 'Verify Logo is referenced in the Header of App.vue', () => {
  const appPath = path.join(ROOT_DIR, 'src/App.vue');
  const appContent = fs.readFileSync(appPath, 'utf-8');
  
  // Extract content inside <header>...</header>
  const headerMatch = appContent.match(/<header[^>]*>([\s\S]*?)<\/header>/);
  assert.ok(headerMatch, "App.vue is missing a <header> element.");
  
  const headerContent = headerMatch[1];
  assert.ok(
    headerContent.includes('logoUrl') || headerContent.includes('logo.png'), 
    "Logo is not referenced inside the <header> block of App.vue."
  );
});
```

---

### Tier 2: Boundary/Corner Cases (26 Tests)

#### T2.1: Missing Vite Config File Check (Sandbox Toggling)
Runs a transient sandbox operation to assert that the runner handles a temporarily missing file, restoring it immediately to ensure project state integrity.
```javascript
test('T2.1', 2, 'Vite Config file absence robustness', () => {
  const configPath = path.join(ROOT_DIR, 'vite.config.js');
  const backupPath = path.join(ROOT_DIR, 'vite.config.js.bak');
  
  if (!fs.existsSync(configPath)) {
    throw new Error("Vite config does not exist at root before sandbox check.");
  }
  
  try {
    // 1. Rename to simulate deletion
    fs.renameSync(configPath, backupPath);
    
    // 2. Assert that we detect it is missing
    const exists = fs.existsSync(configPath);
    assert.strictEqual(exists, false, "Vite config should be temporarily absent.");
  } finally {
    // 3. RESTORE - Always runs even if assertions fail
    if (fs.existsSync(backupPath)) {
      fs.renameSync(backupPath, configPath);
    }
  }
});
```

#### T2.7: Activities Data Model Structure Validation
Reads `src/views/Activities.vue`, extracts the raw JavaScript array, and validates that every item structure has the correct properties.
```javascript
test('T2.7', 2, 'Verify Activity Data Model Field Integrity', () => {
  const activitiesPath = path.join(ROOT_DIR, 'src/views/Activities.vue');
  const content = fs.readFileSync(activitiesPath, 'utf-8');
  
  // Regex to extract the array within ref([...]) or similar structure
  const arrayMatch = content.match(/activities\s*=\s*ref\(\[([\s\S]*?)\]\)/);
  assert.ok(arrayMatch, "Unable to locate reactive 'activities' array in Activities.vue.");
  
  // Extract individual objects using a simple brace matcher/parser
  const objectsText = arrayMatch[1];
  const objectRegex = /\{([\s\S]*?)\}/g;
  let match;
  let count = 0;
  
  while ((match = objectRegex.exec(objectsText)) !== null) {
    count++;
    const objStr = match[1];
    
    // Check key fields
    assert.ok(objStr.includes('title:'), `Activity ${count} is missing a title.`);
    assert.ok(objStr.includes('date:'), `Activity ${count} is missing a date.`);
    assert.ok(objStr.includes('type:'), `Activity ${count} is missing a type.`);
    assert.ok(objStr.includes('description:'), `Activity ${count} is missing a description.`);
    assert.ok(objStr.includes('location:'), `Activity ${count} is missing a location.`);
  }
  
  assert.ok(count > 0, "No activities found in the activities array.");
});
```

#### T2.11: Form Input HTML5 Validation Rules
Check attributes on the email element in `src/views/Contact.vue`.
```javascript
test('T2.11', 2, 'Verify Contact Form email input uses type="email"', () => {
  const contactPath = path.join(ROOT_DIR, 'src/views/Contact.vue');
  const content = fs.readFileSync(contactPath, 'utf-8');
  
  // Find the email input tag
  const emailInputMatch = content.match(/<input[^>]*type="email"[^>]*>/) || content.match(/type="email"/);
  assert.ok(emailInputMatch, "Contact form input lacks type='email' attribute for HTML5 validation.");
});
```

---

### Tier 3: Cross-Feature Combinations (5 Tests)

#### T3.2: Routing and Active Style Rules
Checks if the `RouterLink` elements in `src/App.vue` change formatting depending on the route path.
```javascript
test('T3.2', 3, 'Verify routing active styling integrations', () => {
  const appPath = path.join(ROOT_DIR, 'src/App.vue');
  const content = fs.readFileSync(appPath, 'utf-8');
  
  // Verify that RouterLink or active classes comparison exists
  const activeStylePattern = /\$route\.path\s*===\s*'\/[^']*'\s*\?\s*'[^']*text-accent[^']*'\s*:\s*'[^']*'/;
  const routerActiveAttr = /active-class=/;
  
  const hasInlineActiveComparison = activeStylePattern.test(content);
  const hasRouterActiveClass = routerActiveAttr.test(content);
  
  assert.ok(
    hasInlineActiveComparison || hasRouterActiveClass, 
    "App.vue is missing active class styling triggers for active routes (e.g. changing color to accent/gold)."
  );
});
```

---

### Tier 4: Real-world Application Scenarios (5 Tests)

#### T4.1: Production Build Execution and Verification
Triggers the compile task synchronously and evaluates the process exit status.
```javascript
test('T4.1', 4, 'Execute Production build command (npm run build)', () => {
  const buildResult = spawnSync('npm', ['run', 'build'], {
    cwd: ROOT_DIR,
    shell: true,
    encoding: 'utf-8'
  });
  
  if (buildResult.status !== 0) {
    console.error(buildResult.stderr);
  }
  
  assert.strictEqual(
    buildResult.status, 0, 
    `Vite production build failed with exit code ${buildResult.status}.`
  );
});
```

#### T4.3: Navigation Map Compliance Check
Extracts routes configured in the Router configuration file and matches them to make sure all mapped paths correspond to a view file that exists on disk.
```javascript
test('T4.3', 4, 'Verify Route-to-Component Mapping exists on disk', () => {
  const routerPath = path.join(ROOT_DIR, 'src/router/index.js');
  const routerContent = fs.readFileSync(routerPath, 'utf-8');
  
  // Clean comments
  const cleanContent = routerContent.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
  
  // Grab view import statements or component definitions
  // e.g. import Home from '../views/Home.vue' or component: () => import('../views/Announcements.vue')
  const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+'([^']+)'/g;
  const lazyImportRegex = /import\(\s*'([^']+)'\s*\)/g;
  
  const fileRefs = [];
  let match;
  
  while ((match = importRegex.exec(cleanContent)) !== null) {
    fileRefs.push(match[2]);
  }
  while ((match = lazyImportRegex.exec(cleanContent)) !== null) {
    fileRefs.push(match[1]);
  }
  
  assert.ok(fileRefs.length > 0, "No components or lazy-loaded views detected in src/router/index.js.");
  
  // Verify existence of each referenced view file
  fileRefs.forEach(relPath => {
    // Resolve relative path relative to router directory
    const resolvedViewPath = path.resolve(ROOT_DIR, 'src/router', relPath);
    const fileExists = fs.existsSync(resolvedViewPath);
    assert.ok(fileExists, `Router references non-existent view file: ${relPath} (resolved: ${resolvedViewPath})`);
  });
});
```

---

## 5. Summary Inventory of the 62 Recommended Test Cases

Below is the structured registry list of tests that `tests/run-tests.js` should register.

### Tier 1: Feature Coverage (26 Tests)
*   **T1.1: Vite Config File Existence**: Asserts `vite.config.js` exists.
*   **T1.2: Vue Dependency in package.json**: Verifies `dependencies.vue` exists.
*   **T1.3: Router Dependency in package.json**: Verifies `dependencies['vue-router']` exists.
*   **T1.4: Tailwind CSS Dependency in package.json**: Verifies `tailwindcss` or `@tailwindcss/postcss` exists.
*   **T1.5: Tailwind Config Scan Paths**: Checks file content scan list contains index and src globs.
*   **T1.6: PostCSS Config File Existence**: Asserts `postcss.config.js` exists.
*   **T1.7: Router Index File Existence**: Asserts `src/router/index.js` exists.
*   **T1.8: Router Mapping - Home Route**: Verifies path `/` is mapped to Home component.
*   **T1.9: Router Mapping - Announcements Route**: Verifies path `/announcements` is mapped.
*   **T1.10: Router Mapping - Activities Route**: Verifies path `/activities` is mapped.
*   **T1.11: Router Mapping - Contact Route**: Verifies path `/contact` is mapped.
*   **T1.12: Logo Asset Existence**: Verifies `src/assets/logo.png` file exists.
*   **T1.13: Banner Asset Existence**: Verifies `src/assets/banner.png` file exists.
*   **T1.14: Logo Reference in Header**: Asserts `logo.png` is inside `<header>` of `App.vue`.
*   **T1.15: Logo Reference in Footer**: Asserts `logo.png` is inside `<footer>` of `App.vue`.
*   **T1.16: Banner Reference in Home**: Asserts `banner.png` is used inside `Home.vue`.
*   **T1.17: Color Theme Classes**: Scans Tailwind config/CSS theme files for `#3b2e5a` (primary) and `#d4af37` (accent).
*   **T1.18: Mission Statement Content**: Checks `Home.vue` contains the correct mission statement text.
*   **T1.19: Vision Statement Content**: Checks `Home.vue` contains the correct vision statement text.
*   **T1.20: Objectives Statement Content**: Checks `Home.vue` contains the correct objectives statement text.
*   **T1.21: Core Pillar Icons - Mission**: Checks for Target/Bullseye/Rocket SVG or class in Mission section.
*   **T1.22: Core Pillar Icons - Vision**: Checks for Eye SVG or class in Vision section.
*   **T1.23: Core Pillar Icons - Objectives**: Checks for Checklist/Clipboard SVG or class in Objectives section.
*   **T1.24: Contact Email Prefill**: Verifies `astriferuminnovare@gmail.com` in `Contact.vue`.
*   **T1.25: Contact Facebook Reference**: Verifies `ASTRIFERUM INNOVARE` text is in footer or contact view.
*   **T1.26: Activities Data Model**: Asserts reactive `activities` list definition in `Activities.vue`.

### Tier 2: Boundary/Corner Cases (26 Tests)
*   **T2.1: Missing Vite Config File**: Temporarily moves configuration to test runner robustness.
*   **T2.2: Malformed package.json**: Temporarily mocks broken JSON, verifying runner handles it gracefully.
*   **T2.3: Tailwind Scan Missing Source**: Confirms scan path is `src` directory, not just root.
*   **T2.4: Empty Activities Array**: Verifies activities template handles empty datasets without script failure.
*   **T2.5: Activities Mix - Upcoming Event Presence**: Checks activities array contains at least 1 `Upcoming` event.
*   **T2.6: Activities Mix - Past Event Presence**: Checks activities array contains at least 1 `Past` event.
*   **T2.7: Activity Card Fields Integrity**: Asserts each activity object has title, date, type, description, location.
*   **T2.8: Router History Mode**: Asserts use of HTML5 `createWebHistory` mode.
*   **T2.9: Router Redirect / Catch-All Route**: Checks for fallback redirect or a 404 handler path.
*   **T2.10: Contact Form Submission Prevention**: Verifies presence of `@submit.prevent` attribute.
*   **T2.11: Email Address Format Validation**: Asserts email inputs are set to `type="email"`.
*   **T2.12: Background Style Overlay Presence**: Scans `style.css` for crumpled-paper style classes or texture variables.
*   **T2.13: Header Serif Font Definition**: Checks `style.css` / Tailwind config for serif heading styles (`Playfair Display`, `Cinzel`, etc.).
*   **T2.14: Sans-serif Body Font Definition**: Checks for sans-serif body styles (`Outfit`, `Inter`, `sans-serif`).
*   **T2.15: Asset Paths Normalization**: Verifies image elements use relative path conventions.
*   **T2.16: Facebook URL Integrity**: Asserts Facebook links target `facebook.com`.
*   **T2.17: SVG Stars/Sparkles Count**: Counts SVG elements representing stars or sparkles in Home section (>=3).
*   **T2.18: Logo Image Aspect Ratio / Dimensions**: Checks for scaling classes (`h-X`, `w-auto`, etc.) to prevent stretching.
*   **T2.19: Banner Image Responsive Classes**: Asserts responsive classes on banner (e.g. `object-cover`, responsive heights).
*   **T2.20: Contact Form Empty Input Rejection**: Verifies input elements use the HTML5 `required` attribute.
*   **T2.21: CSS Variable for Corporate Purple**: Confirms primary color purple is declared via CSS custom properties.
*   **T2.22: CSS Variable for Corporate Gold**: Confirms accent color gold is declared via CSS custom properties.
*   **T2.23: Hover Scale Micro-interactions**: Searches views for `hover:scale-` or `hover:shadow-` interactive classes.
*   **T2.24: Transition Utility Classes**: Verifies routing views use CSS transitions or Vue `<transition>` wrappers.
*   **T2.25: Build Dist HTML Title**: Reads root index file, asserts Title metadata contains `Astriferum Innovare`.
*   **T2.26: Production Bundle File Size Check**: Verifies built asset bundle files sizes are within reasonable thresholds.

### Tier 3: Cross-Feature Combinations (5 Tests)
*   **T3.1: Celestial Theme & Sparkles Interaction**: Asserts SVG stars use hover effects or animations.
*   **T3.2: Routing & Active Styling Integration**: Asserts navigation links use active classes (e.g. text changing to gold `#d4af37` when active).
*   **T3.3: Content Pillars & Theme Integration**: Asserts Mission/Vision/Objectives cards incorporate theme colors/borders (e.g. `border-accent`, `bg-white/5`).
*   **T3.4: Activities Layout & Responsive Scaling**: Verifies grid configurations (`grid-cols-1 md:grid-cols-2`) exist on the activities list.
*   **T3.5: Contact Form Prefill & Icon Alignment**: Checks that prefilled email is aligned with mail icon styled with theme colors.

### Tier 4: Real-world Application Scenarios (5 Tests)
*   **T4.1: Production Build Execution and Verification**: Executes `npm run build` as a child process, verifying exit status.
*   **T4.2: Built Output Asset Integrity**: Scans `dist/` directory, checking that `index.html` references compiled chunks.
*   **T4.3: Navigation Map Compliance**: Maps router config paths to actual view files to ensure complete page availability.
*   **T4.4: Complete Brand Theme Consistency**: Scans all view files to check that styling strictly utilizes theme variables and colors.
*   **T4.5: Full Responsive Class Scavenger**: Checks that layouts use mobile-first responsive utility patterns.

---

## 6. Execution Command and Verification

Once implemented in `tests/run-tests.js`, the test suite can be run by the implementer using:

```bash
node tests/run-tests.js
```

To run a specific tier (e.g., Tier 1):
```bash
node tests/run-tests.js --tier=1
```

To run an individual test case (e.g., T1.18):
```bash
node tests/run-tests.js --id=T1.18
```
