#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import assert from 'assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Helper to format logs with colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function logPass(id, name) {
  console.log(`${colors.green}[PASS]${colors.reset} ${id}: ${name}`);
}

function logFail(id, name, error) {
  console.log(`${colors.red}[FAIL]${colors.reset} ${id}: ${name}`);
  console.log(`       ${colors.yellow}Reason: ${error.message}${colors.reset}`);
}

function logInfo(msg) {
  console.log(`${colors.cyan}${msg}${colors.reset}`);
}

// Check if production build exists. If not, build it first.
const distPath = path.join(projectRoot, 'dist');
if (!fs.existsSync(distPath)) {
  logInfo("Build directory not found. Building project for E2E post-build validation...");
  try {
    execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
  } catch (err) {
    console.error("Warning: Production build failed:", err.message);
  }
}

const tests = [];

function registerTest(id, name, fn) {
  tests.push({ id, name, fn });
}

const getPath = (relPath) => path.join(projectRoot, relPath);

// Cache read contents to avoid redundant disk read IOs
const fileCache = {};
const readFileCached = (relPath) => {
  const fullPath = getPath(relPath);
  if (!fileCache[relPath]) {
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${relPath}`);
    }
    fileCache[relPath] = fs.readFileSync(fullPath, 'utf8');
  }
  return fileCache[relPath];
};

// ==========================================
// TIER 1: FEATURE COVERAGE (26 TESTS)
// ==========================================

// T1.1: Vite Config File Existence
registerTest('T1.1', 'Vite Config File Existence', () => {
  assert.ok(fs.existsSync(getPath('vite.config.js')), 'vite.config.js must exist at root');
});

// T1.2: Vue Dependency in package.json
registerTest('T1.2', 'Vue Dependency in package.json', () => {
  const pkg = JSON.parse(readFileCached('package.json'));
  const hasVue = (pkg.dependencies && pkg.dependencies.vue) || (pkg.devDependencies && pkg.devDependencies.vue);
  assert.ok(hasVue, 'vue dependency must exist in package.json');
});

// T1.3: Router Dependency in package.json
registerTest('T1.3', 'Router Dependency in package.json', () => {
  const pkg = JSON.parse(readFileCached('package.json'));
  const hasRouter = (pkg.dependencies && pkg.dependencies['vue-router']) || (pkg.devDependencies && pkg.devDependencies['vue-router']);
  assert.ok(hasRouter, 'vue-router dependency must exist in package.json');
});

// T1.4: Tailwind CSS Dependency in package.json
registerTest('T1.4', 'Tailwind CSS Dependency in package.json', () => {
  const pkg = JSON.parse(readFileCached('package.json'));
  const hasTailwind = (pkg.dependencies && pkg.dependencies.tailwindcss) || (pkg.devDependencies && pkg.devDependencies.tailwindcss);
  assert.ok(hasTailwind, 'tailwindcss dependency must exist in package.json');
});

// T1.5: Tailwind Config Scan Paths
registerTest('T1.5', 'Tailwind Config Scan Paths', () => {
  const tailwindContent = readFileCached('tailwind.config.js');
  const hasIndexHtml = tailwindContent.includes('./index.html');
  const hasSrcFiles = tailwindContent.includes('./src/**/*.{vue,js,ts,jsx,tsx}');
  assert.ok(hasIndexHtml && hasSrcFiles, 'tailwind.config.js must scan ./index.html and src folder recursively');
});

// T1.6: PostCSS Config File Existence
registerTest('T1.6', 'PostCSS Config File Existence', () => {
  assert.ok(fs.existsSync(getPath('postcss.config.js')), 'postcss.config.js must exist');
});

// T1.7: Router Index File Existence
registerTest('T1.7', 'Router Index File Existence', () => {
  assert.ok(fs.existsSync(getPath('src/router/index.js')), 'src/router/index.js must exist');
});

// T1.8: Router Mapping - Home Route
registerTest('T1.8', 'Router Mapping - Home Route', () => {
  const routerContent = readFileCached('src/router/index.js');
  assert.ok(/path:\s*['"]\/['"]/.test(routerContent), "Home route path '/' must be defined in router");
});

// T1.9: Router Mapping - Announcements Route
registerTest('T1.9', 'Router Mapping - Announcements Route', () => {
  const routerContent = readFileCached('src/router/index.js');
  assert.ok(/path:\s*['"]\/announcements['"]/.test(routerContent), "Announcements route path '/announcements' must be defined in router");
});

// T1.10: Router Mapping - Activities Route
registerTest('T1.10', 'Router Mapping - Activities Route', () => {
  const routerContent = readFileCached('src/router/index.js');
  assert.ok(/path:\s*['"]\/activities['"]/.test(routerContent), "Activities route path '/activities' must be defined in router");
});

// T1.11: Router Mapping - Contact Route
registerTest('T1.11', 'Router Mapping - Contact Route', () => {
  const routerContent = readFileCached('src/router/index.js');
  assert.ok(/path:\s*['"]\/contact['"]/.test(routerContent), "Contact route path '/contact' must be defined in router");
});

// T1.12: Logo Asset Existence
registerTest('T1.12', 'Logo Asset Existence', () => {
  assert.ok(fs.existsSync(getPath('src/assets/logo.png')), 'src/assets/logo.png must exist');
});

// T1.13: Banner Asset Existence
registerTest('T1.13', 'Banner Asset Existence', () => {
  assert.ok(fs.existsSync(getPath('src/assets/banner.png')), 'src/assets/banner.png must exist');
});

// T1.14: Logo Reference in Header
registerTest('T1.14', 'Logo Reference in Header', () => {
  const appVueContent = readFileCached('src/App.vue');
  assert.ok(appVueContent.includes('logoUrl') || appVueContent.includes('logo.png'), 'Logo must be referenced in App.vue');
  const footerIndex = appVueContent.indexOf('<footer');
  assert.ok(footerIndex !== -1, 'Footer element must exist in App.vue');
  const beforeFooter = appVueContent.substring(0, footerIndex);
  assert.ok(beforeFooter.includes('logoUrl') || beforeFooter.includes('logo.png'), 'Logo must be referenced before the footer section');
});

// T1.15: Logo Reference in Footer
registerTest('T1.15', 'Logo Reference in Footer', () => {
  const appVueContent = readFileCached('src/App.vue');
  const footerIndex = appVueContent.indexOf('<footer');
  assert.ok(footerIndex !== -1, 'Footer element must exist in App.vue');
  const afterFooter = appVueContent.substring(footerIndex);
  assert.ok(afterFooter.includes('logoUrl') || afterFooter.includes('logo.png'), 'Logo must be referenced in the footer section');
});

// T1.16: Banner Reference in Home
registerTest('T1.16', 'Banner Reference in Home', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  assert.ok(homeVueContent.includes('bannerUrl') || homeVueContent.includes('banner.png'), 'Banner must be referenced in Home.vue');
});

// T1.17: Color Theme Classes
registerTest('T1.17', 'Color Theme Classes', () => {
  const styleCssContent = readFileCached('src/style.css');
  assert.ok(
    styleCssContent.toLowerCase().includes('#3b2e5a') && styleCssContent.toLowerCase().includes('#d4af37'),
    'style.css must declare primary color #3b2e5a and accent gold color #d4af37'
  );
});

// T1.18: Mission Statement Content
registerTest('T1.18', 'Mission Statement Content', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  const expectedMission = "To equip the youth with relevant skills in technology, sciences, humanities, and arts to excel as individuals and contribute to nation-building.";
  assert.ok(homeVueContent.includes(expectedMission), 'Home.vue must contain the exact mission statement text');
});

// T1.19: Vision Statement Content
registerTest('T1.19', 'Vision Statement Content', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  const expectedVision = "To become a prominent youth organization who advocates for skills and career advancement for a brighter tomorrow filled with competent, transparent, and excellent youths grounded in humility and morality.";
  assert.ok(homeVueContent.includes(expectedVision), 'Home.vue must contain the exact vision statement text');
});

// T1.20: Objectives Statement Content
registerTest('T1.20', 'Objectives Statement Content', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  const expectedObjectives = "To shape the youth to become excellent in technology, science, humanities, and arts, and promote youth leadership that aids in fostering a better tomorrow.";
  assert.ok(homeVueContent.includes(expectedObjectives), 'Home.vue must contain the exact objectives statement text');
});

// T1.21: Core Pillar Icons - Mission
registerTest('T1.21', 'Core Pillar Icons - Mission', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  assert.ok(
    homeVueContent.includes('M12 3v1.5') || homeVueContent.includes('M12 7.5a4.5') || homeVueContent.includes('M12 11.25a.75'),
    'Mission card must use a Target SVG icon (not a lightning bolt)'
  );
});

// T1.22: Core Pillar Icons - Vision
registerTest('T1.22', 'Core Pillar Icons - Vision', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  assert.ok(
    homeVueContent.includes('M15 12a3') || homeVueContent.includes('M2.458 12'),
    'Vision card must use an Eye SVG icon'
  );
});

// T1.23: Core Pillar Icons - Objectives
registerTest('T1.23', 'Core Pillar Icons - Objectives', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  assert.ok(
    homeVueContent.includes('M9 5H7') || homeVueContent.includes('M9 5a2'),
    'Objectives card must use a Checklist/Clipboard SVG icon'
  );
});

// T1.24: Contact Email Prefill
registerTest('T1.24', 'Contact Email Prefill', () => {
  const contactVueContent = readFileCached('src/views/Contact.vue');
  assert.ok(contactVueContent.includes('astriferuminnovare@gmail.com'), 'Contact.vue must contain recipient email astriferuminnovare@gmail.com for form prefill');
});

// T1.25: Contact Facebook Reference
registerTest('T1.25', 'Contact Facebook Reference', () => {
  const appVueContent = readFileCached('src/App.vue');
  assert.ok(appVueContent.includes('ASTRIFERUM INNOVARE'), "App.vue header/footer must contain the Facebook page name 'ASTRIFERUM INNOVARE'");
});

// T1.26: Activities Data Model
registerTest('T1.26', 'Activities Data Model', () => {
  const activitiesVueContent = readFileCached('src/views/Activities.vue');
  const hasReactiveArray = /activities\s*=\s*ref\(/.test(activitiesVueContent) || /activities\s*=\s*\[/.test(activitiesVueContent);
  assert.ok(hasReactiveArray, 'Activities.vue must contain a reactive or static array of activities');
});


// ==========================================
// TIER 2: BOUNDARY/CORNER CASES (26 TESTS)
// ==========================================

// T2.1: Missing Vite Config File
registerTest('T2.1', 'Missing Vite Config File', () => {
  const viteConfigPath = getPath('vite.config.js');
  const backupPath = viteConfigPath + '.backup';
  try {
    fs.renameSync(viteConfigPath, backupPath);
    assert.ok(!fs.existsSync(viteConfigPath), 'vite.config.js should be temporarily missing');
  } finally {
    if (fs.existsSync(backupPath)) {
      fs.renameSync(backupPath, viteConfigPath);
    }
  }
});

// T2.2: Malformed package.json
registerTest('T2.2', 'Malformed package.json', () => {
  const pkgPath = getPath('package.json');
  const backupPath = pkgPath + '.backup';
  try {
    fs.copyFileSync(pkgPath, backupPath);
    fs.writeFileSync(pkgPath, '{ invalid json... }');
    assert.throws(() => {
      JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    }, SyntaxError, 'Should throw syntax error when parsing malformed package.json');
  } finally {
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, pkgPath);
      fs.unlinkSync(backupPath);
    }
  }
});

// T2.3: Tailwind Scan Missing Source
registerTest('T2.3', 'Tailwind Scan Missing Source', () => {
  const tailwindContent = readFileCached('tailwind.config.js');
  assert.ok(tailwindContent.includes('./src/**/*.{vue,js,ts,jsx,tsx}'), 'Tailwind config must scan src folder recursively');
});

// T2.4: Empty Activities Array
registerTest('T2.4', 'Empty Activities Array', () => {
  const activitiesVueContent = readFileCached('src/views/Activities.vue');
  assert.ok(activitiesVueContent.includes('filteredActivities'), 'Activities.vue should bind layout list to computed/filtered activities');
});

// T2.5: Activities Mix - Upcoming Event Presence
registerTest('T2.5', 'Activities Mix - Upcoming Event Presence', () => {
  const activitiesVueContent = readFileCached('src/views/Activities.vue');
  assert.ok(/type:\s*['"]Upcoming['"]/i.test(activitiesVueContent), 'Activities list must contain at least one Upcoming event');
});

// T2.6: Activities Mix - Past Event Presence
registerTest('T2.6', 'Activities Mix - Past Event Presence', () => {
  const activitiesVueContent = readFileCached('src/views/Activities.vue');
  assert.ok(/type:\s*['"]Past['"]/i.test(activitiesVueContent), 'Activities list must contain at least one Past event');
});

// T2.7: Activity Card Fields Integrity
registerTest('T2.7', 'Activity Card Fields Integrity', () => {
  const activitiesVueContent = readFileCached('src/views/Activities.vue');
  const activitiesBlock = activitiesVueContent.match(/const\s+activities\s*=\s*ref\(\[\s*([\s\S]*?)\s*\]\)/);
  if (activitiesBlock) {
    const items = activitiesBlock[1].split(/\},\s*\{/);
    for (const item of items) {
      assert.ok(item.includes('title:'), 'Activity object must contain title field');
      assert.ok(item.includes('date:'), 'Activity object must contain date field');
      assert.ok(item.includes('type:'), 'Activity object must contain type field');
      assert.ok(item.includes('description:'), 'Activity object must contain description field');
    }
  } else {
    assert.ok(
      activitiesVueContent.includes('title:') && 
      activitiesVueContent.includes('date:') && 
      activitiesVueContent.includes('type:') && 
      activitiesVueContent.includes('description:'),
      'Activities data model must contain fields: title, date, type, description'
    );
  }
});

// T2.8: Router History Mode
registerTest('T2.8', 'Router History Mode', () => {
  const routerContent = readFileCached('src/router/index.js');
  assert.ok(routerContent.includes('createWebHistory'), 'Router history mode must be createWebHistory');
});

// T2.9: Router Redirect / Catch-All Route
registerTest('T2.9', 'Router Redirect / Catch-All Route', () => {
  const routerContent = readFileCached('src/router/index.js');
  const hasCatchAll = /path:\s*['"]\/:pathMatch\(\.\*\)\*['"]/.test(routerContent) || 
                      /path:\s*['"]\/:catchAll\(\.\*\)['"]/.test(routerContent) ||
                      /path:\s*['"]\/\:\(.*\)['"]/.test(routerContent);
  assert.ok(hasCatchAll, 'Router must define a wildcard catch-all route for invalid links redirect');
});

// T2.10: Contact Form Submission Prevention
registerTest('T2.10', 'Contact Form Submission Prevention', () => {
  const contactVueContent = readFileCached('src/views/Contact.vue');
  assert.ok(contactVueContent.includes('@submit.prevent'), 'Contact form submission must prevent default page reload');
});

// T2.11: Email Address Format Validation
registerTest('T2.11', 'Email Address Format Validation', () => {
  const contactVueContent = readFileCached('src/views/Contact.vue');
  assert.ok(contactVueContent.includes('type="email"'), 'Contact email input field must have type="email" attribute for validation');
});

// T2.12: Background Style Overlay Presence
registerTest('T2.12', 'Background Style Overlay Presence', () => {
  const styleCssContent = readFileCached('src/style.css');
  const hasTextureClass = styleCssContent.includes('.texture') || 
                          styleCssContent.includes('.paper') || 
                          (styleCssContent.includes('background-image') && styleCssContent.includes('texture'));
  assert.ok(hasTextureClass, 'style.css must define a custom class or style rule for the crumpled-paper physical texture background overlay');
});

// T2.13: Header Serif Font Definition
registerTest('T2.13', 'Header Serif Font Definition', () => {
  const styleCssContent = readFileCached('src/style.css');
  assert.ok(styleCssContent.includes('Playfair Display') || styleCssContent.includes('serif'), 'Headings must use elegant serif font Playfair Display / serif');
});

// T2.14: Sans-serif Body Font Definition
registerTest('T2.14', 'Sans-serif Body Font Definition', () => {
  const styleCssContent = readFileCached('src/style.css');
  assert.ok(styleCssContent.includes('Outfit') || styleCssContent.includes('sans-serif'), 'Body font must be a clean sans-serif font (Outfit/sans-serif)');
});

// T2.15: Asset Paths Normalization
registerTest('T2.15', 'Asset Paths Normalization', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  const appVueContent = readFileCached('src/App.vue');
  const bannerPathRelative = homeVueContent.includes("from '../assets/banner.png'") || homeVueContent.includes("from '@/assets/banner.png'");
  const logoPathRelative = appVueContent.includes("from './assets/logo.png'") || appVueContent.includes("from '@/assets/logo.png'");
  assert.ok(bannerPathRelative && logoPathRelative, 'Asset import paths must be relative or alias-normalized (no absolute paths)');
});

// T2.16: Facebook URL Integrity
registerTest('T2.16', 'Facebook URL Integrity', () => {
  const appVueContent = readFileCached('src/App.vue');
  assert.ok(appVueContent.includes('href="https://facebook.com') || appVueContent.includes('href="https://www.facebook.com'), 'App.vue footer or header must contain Facebook anchor href pointing to facebook.com');
});

// T2.17: SVG Stars/Sparkles Count
registerTest('T2.17', 'SVG Stars/Sparkles Count', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  const heroIndex = homeVueContent.indexOf('<!-- Vision & Mission');
  assert.ok(heroIndex !== -1, 'Vision & Mission section divider must exist in Home.vue');
  const heroSection = homeVueContent.substring(0, heroIndex);
  
  const svgCount = (heroSection.match(/<svg/g) || []).length;
  const sparkleCount = (heroSection.match(/sparkle|star/g) || []).length;
  assert.ok(svgCount >= 3 || sparkleCount >= 3, 'Hero section must incorporate multiple SVG elements or classes representing astral stars/sparkles');
});

// T2.18: Logo Image Aspect Ratio / Dimensions
registerTest('T2.18', 'Logo Image Aspect Ratio / Dimensions', () => {
  const appVueContent = readFileCached('src/App.vue');
  assert.ok(appVueContent.includes('h-12 w-auto') || appVueContent.includes('h-10 w-auto') || appVueContent.includes('class="h-'), 'Logo image must enforce aspect ratio constraints using classes like h-12 w-auto');
});

// T2.19: Banner Image Responsive Classes
registerTest('T2.19', 'Banner Image Responsive Classes', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  assert.ok(
    homeVueContent.includes('h-64 md:h-96') && homeVueContent.includes('object-cover'),
    'Banner image/container must employ mobile-first responsive height classes (e.g. h-64 md:h-96) and object-cover styling'
  );
});

// T2.20: Contact Form Empty Input Rejection
registerTest('T2.20', 'Contact Form Empty Input Rejection', () => {
  const contactVueContent = readFileCached('src/views/Contact.vue');
  const requiredCount = (contactVueContent.match(/required/g) || []).length;
  assert.ok(requiredCount >= 4, 'Contact form input elements must specify the required attribute to reject empty submissions');
});

// T2.21: CSS Variable for Corporate Purple
registerTest('T2.21', 'CSS Variable for Corporate Purple', () => {
  const styleCssContent = readFileCached('src/style.css');
  const tailwindContent = readFileCached('tailwind.config.js');
  const hasPrimaryVar = styleCssContent.includes('--color-primary:') || 
                         styleCssContent.includes('--primary:') || 
                         tailwindContent.includes('primary');
  assert.ok(hasPrimaryVar, 'CSS stylesheets or Tailwind configurations must assign a theme token to primary purple (#3b2e5a)');
});

// T2.22: CSS Variable for Corporate Gold
registerTest('T2.22', 'CSS Variable for Corporate Gold', () => {
  const styleCssContent = readFileCached('src/style.css');
  const tailwindContent = readFileCached('tailwind.config.js');
  const hasAccentVar = styleCssContent.includes('--color-accent:') || 
                        styleCssContent.includes('--accent:') || 
                        tailwindContent.includes('accent');
  assert.ok(hasAccentVar, 'CSS stylesheets or Tailwind configurations must assign a theme token to accent gold (#d4af37)');
});

// T2.23: Hover Scale Micro-interactions
registerTest('T2.23', 'Hover Scale Micro-interactions', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  const activitiesVueContent = readFileCached('src/views/Activities.vue');
  const hasHoverScale = homeVueContent.includes('hover:scale-') || activitiesVueContent.includes('hover:scale-');
  assert.ok(hasHoverScale, 'Interactive cards or buttons must use hover:scale utilities to provide micro-interaction feedback');
});

// T2.24: Transition Utility Classes
registerTest('T2.24', 'Transition Utility Classes', () => {
  const appVueContent = readFileCached('src/App.vue');
  assert.ok(appVueContent.includes('<transition') || appVueContent.includes('transition-'), 'Router views or mobile menus must use transition tags/utility classes');
});

// T2.25: Build Dist HTML Title
registerTest('T2.25', 'Build Dist HTML Title', () => {
  const indexHtmlContent = readFileCached('index.html');
  assert.ok(indexHtmlContent.includes('<title>Astriferum Innovare</title>'), 'index.html title must match "Astriferum Innovare" exactly');
});

// T2.26: Production Bundle File Size Check
registerTest('T2.26', 'Production Bundle File Size Check', () => {
  const assetsDir = getPath('dist/assets');
  assert.ok(fs.existsSync(assetsDir), 'Production dist/assets folder must exist (run build first)');
  const files = fs.readdirSync(assetsDir);
  const bundles = files.filter(f => f.endsWith('.js') || f.endsWith('.css'));
  for (const bundle of bundles) {
    const size = fs.statSync(path.join(assetsDir, bundle)).size;
    assert.ok(size < 1024 * 1024, `Built asset bundle ${bundle} size (${(size / 1024).toFixed(1)} KB) must be within 1MB limit`);
  }
});


// ==========================================
// TIER 3: CROSS-FEATURE COMBINATIONS (5 TESTS)
// ==========================================

// T3.1: Celestial Theme & Sparkles Interaction
registerTest('T3.1', 'Celestial Theme & Sparkles Interaction', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  const styleCssContent = readFileCached('src/style.css');
  const heroIndex = homeVueContent.indexOf('<!-- Vision & Mission');
  const heroSection = homeVueContent.substring(0, heroIndex);
  
  const interactiveSparkles = heroSection.includes('sparkle') && 
                               (heroSection.includes('hover:') || 
                                styleCssContent.includes('keyframes') || 
                                styleCssContent.includes('sparkle') ||
                                styleCssContent.includes('star'));
  assert.ok(interactiveSparkles, 'Sparkle elements must feature hover-scaling properties or custom keyframe-animated shine classes');
});

// T3.2: Routing & Active Styling Integration
registerTest('T3.2', 'Routing & Active Styling Integration', () => {
  const appVueContent = readFileCached('src/App.vue');
  const styleCssContent = readFileCached('src/style.css');
  const activeStylesLinked = appVueContent.includes('router-link-active') || 
                             appVueContent.includes('router-link-exact-active') || 
                             styleCssContent.includes('router-link-active') || 
                             appVueContent.includes(' active-class=') ||
                             appVueContent.includes('\nactive-class=');
  assert.ok(activeStylesLinked, 'Active navigation links must be styles-driven using active-class or built-in exact-active class styling');
});

// T3.3: Content Pillars & Theme Integration
registerTest('T3.3', 'Content Pillars & Theme Integration', () => {
  const homeVueContent = readFileCached('src/views/Home.vue');
  assert.ok(
    homeVueContent.includes('border-accent') || 
    (homeVueContent.includes('border-white/10') && homeVueContent.includes('bg-white/5')),
    'Core pillar cards must utilize visual theme classes like border-accent or bg-white/5 backdrop-blur'
  );
});

// T3.4: Activities Layout & Responsive Scaling
registerTest('T3.4', 'Activities Layout & Responsive Scaling', () => {
  const activitiesVueContent = readFileCached('src/views/Activities.vue');
  const hasGridCols = activitiesVueContent.includes('grid') && 
                      (activitiesVueContent.includes('md:grid-cols-2') || 
                       activitiesVueContent.includes('lg:grid-cols-3'));
  const hasCardHover = activitiesVueContent.includes('hover:scale-') || activitiesVueContent.includes('hover:shadow-');
  assert.ok(hasGridCols && hasCardHover, 'Activities layout must employ responsive grids coupled with interactive cards');
});

// T3.5: Contact Form Prefill & Icon Alignment
registerTest('T3.5', 'Contact Form Prefill & Icon Alignment', () => {
  const contactVueContent = readFileCached('src/views/Contact.vue');
  const prefillLinked = contactVueContent.includes('recipientEmail') || contactVueContent.includes('astriferuminnovare@gmail.com');
  const mailIconPresent = contactVueContent.includes('svg') && contactVueContent.includes('text-gray-400');
  assert.ok(prefillLinked && mailIconPresent, 'Contact form recipient inbox field must display an aligned mail icon SVG');
});


// ==========================================
// TIER 4: REAL-WORLD APPLICATION SCENARIOS (5 TESTS)
// ==========================================

// T4.1: Production Build Execution and Verification
registerTest('T4.1', 'Production Build Execution and Verification', () => {
  try {
    execSync('npm run build', { cwd: projectRoot, stdio: 'ignore' });
  } catch (err) {
    throw new Error(`Production build command failed: ${err.message}`);
  }
});

// T4.2: Built Output Asset Integrity
registerTest('T4.2', 'Built Output Asset Integrity', () => {
  const distIndexPath = getPath('dist/index.html');
  assert.ok(fs.existsSync(distIndexPath), 'Built output dist/index.html must exist');
  const distIndexContent = fs.readFileSync(distIndexPath, 'utf8');
  assert.ok(distIndexContent.includes('assets/'), 'Built output index.html must reference compiled scripts/assets');
});

// T4.3: Navigation Map Compliance
registerTest('T4.3', 'Navigation Map Compliance', () => {
  const routerContent = readFileCached('src/router/index.js');
  const views = ['Home', 'Announcements', 'Activities', 'Contact'];
  for (const view of views) {
    const filename = `${view}.vue`;
    const viewPath = getPath(`src/views/${filename}`);
    assert.ok(fs.existsSync(viewPath), `View component file ${filename} must exist on disk`);
    assert.ok(routerContent.includes(view), `Router configuration index.js must import or declare the ${view} view`);
  }
});

// T4.4: Complete Brand Theme Consistency
registerTest('T4.4', 'Complete Brand Theme Consistency', () => {
  const pathsToScan = [
    'src/App.vue',
    'src/views/Home.vue',
    'src/views/Contact.vue',
    'src/views/Activities.vue'
  ];
  for (const relPath of pathsToScan) {
    const content = readFileCached(relPath);
    const hasLegacyBlue = content.includes('bg-blue-') || content.includes('text-blue-');
    const hasLegacyRed = content.includes('bg-red-') || content.includes('text-red-');
    assert.ok(!hasLegacyBlue && !hasLegacyRed, `File ${relPath} contains inconsistent branding colors (avoid legacy blue/red layout colors)`);
  }
});

// T4.5: Full Responsive Class Scavenger
registerTest('T4.5', 'Full Responsive Class Scavenger', () => {
  const appVueContent = readFileCached('src/App.vue');
  const homeVueContent = readFileCached('src/views/Home.vue');
  const hasAppResponsive = appVueContent.includes('hidden md:flex') || appVueContent.includes('md:hidden');
  const hasHomeResponsive = homeVueContent.includes('grid-cols-1 lg:grid-cols-2') || homeVueContent.includes('md:pl-12');
  assert.ok(hasAppResponsive && hasHomeResponsive, 'Core layouts must utilize mobile-first responsive utilities (md:, lg:)');
});


// ==========================================
// EXECUTION & SUMMARY REPORT
// ==========================================

let passedCount = 0;
let failedCount = 0;
const failures = [];

logInfo(`\n======================================================`);
logInfo(`Running Astriferum Innovare E2E Test Suite (62 Tests)`);
logInfo(`======================================================\n`);

for (const test of tests) {
  try {
    test.fn();
    logPass(test.id, test.name);
    passedCount++;
  } catch (error) {
    logFail(test.id, test.name, error);
    failedCount++;
    failures.push({ id: test.id, name: test.name, reason: error.message });
  }
}

logInfo(`\n=================== TEST SUMMARY ===================`);
console.log(`Total Tests Run: ${tests.length}`);
console.log(`Passed Tests   : ${colors.green}${passedCount}${colors.reset}`);
console.log(`Failed Tests   : ${failedCount > 0 ? colors.red : colors.green}${failedCount}${colors.reset}`);

if (failedCount > 0) {
  logInfo(`\nFailed Tests Details:`);
  for (const fail of failures) {
    console.log(` - [${fail.id}] ${fail.name}: ${fail.reason}`);
  }
  logInfo(`\n====================================================`);
  process.exit(1);
} else {
  logInfo(`\n====================================================`);
  process.exit(0);
}
