# Handoff Report: Visual Design Refresh Strategy (M3 / R2)

## 1. Observation
Below are the direct observations recorded from the codebase in `d:\Innovare Web\org-concept` and the E2E test suite in `tests/run-tests.js`.

*   **`index.html`**:
    *   **Line 7**: Contains `<title>org-concept</title>`.
*   **`src/router/index.js`**:
    *   **Lines 4-25**: The `routes` array contains only the paths `/`, `/announcements`, `/activities`, and `/contact`. There is no fallback or catch-all route defined.
*   **`src/style.css`**:
    *   **Line 1**: Imports standard Outfit and Playfair Display fonts:
        ```css
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        ```
    *   No rules contain classes representing crumpled-paper background textures (`.paper`, `.texture`, `background-image`, etc.) or custom sparkle animation keyframes.
*   **`src/App.vue`**:
    *   **Line 106**: Contains `Email: info@innovareconcept.org<br />`.
    *   No anchor element points to `facebook.com` or contains the text `ASTRIFERUM INNOVARE`.
*   **`src/views/Home.vue`**:
    *   **Lines 3-30**: The Hero Section contains only the banner image, gradient overlay, and motto text overlay. It does not contain any SVG element representing stars or sparkles.
*   **`src/views/Contact.vue`**:
    *   **Lines 144-157**: The direct channels list only has Email (`astriferuminnovare@gmail.com`) and Phone. It does not feature a Facebook channel anchor link.
*   **`src/views/Announcements.vue`**:
    *   **Line 45**: Utilizes a legacy blue styling badge:
        ```html
        <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Community</span>
        ```
*   **`tests/run-tests.js` Requirements**:
    *   **`T1.25` / `T2.16` (Facebook)**: Checks if `App.vue` contains `ASTRIFERUM INNOVARE` and a link starting with `https://facebook.com` or `https://www.facebook.com`.
    *   **`T2.9` (Catch-all)**: Assures the presence of `pathMatch(.*)*`, `catchAll(.*)` or similar wildcard redirect in `src/router/index.js`.
    *   **`T2.12` (Crumpled-paper)**: Assures that `style.css` contains a `.paper` or `.texture` class using `background-image` and `texture` strings.
    *   **`T2.17` / `T3.1` (SVG Sparkles)**: Assures that the hero section in `Home.vue` contains at least 3 SVG tags/sparkles/stars and that there are hover-scaling or animated keyframes classes in `style.css`/`Home.vue`.
    *   **`T2.25` (HTML Title)**: Assures that `index.html` has `<title>Astriferum Innovare</title>`.

---

## 2. Logic Chain
1. **Title Fix**: Since E2E test `T2.25` asserts that the title must match `"Astriferum Innovare"` exactly, and the current `index.html` title is `"org-concept"`, it is necessary to replace the `<title>` element with `<title>Astriferum Innovare</title>`.
2. **Wildcard Catch-all Route**: Since E2E test `T2.9` asserts that `src/router/index.js` must define a catch-all route for invalid link redirects, and none exists, we must append a route mapping matching `/:pathMatch(.*)*` to redirect back to `/`.
3. **Crumpled-paper CSS Overlay**: Since E2E test `T2.12` asserts that `style.css` must define a custom class or style rule containing `.paper`, `.texture`, or `background-image` containing `texture` for a physical crumpled-paper look, we must add a `.paper-texture` class containing an inline SVG filter of diffuse lighting to simulate crease shadows while maintaining readability.
4. **Email and Facebook footer updates**: Since E2E test `T1.25` and `T2.16` assert that `App.vue` must contain the Facebook page name `"ASTRIFERUM INNOVARE"` and a link to `facebook.com`, and the email must be `"astriferuminnovare@gmail.com"`, we must update the footer of `App.vue` by correcting the email and adding the Facebook anchor link pointing to the corporate page.
5. **Interactive SVG Sparkle Stars**: Since E2E test `T2.17` and `T3.1` assert that the hero section (before `<!-- Vision & Mission`) must contain at least 3 SVG sparkle star elements with dynamic float keyframes and hover-scaling classes, we must place 3 absolute-positioned custom SVG stars inside the hero banner in `Home.vue` and declare a `@keyframes sparkle-float` animation in `style.css`.
6. **Unified Brand Cleanliness**: To prevent discrepancies and preserve consistency, we should add the Facebook channel to `Contact.vue`'s list of direct channels, and clean up the legacy blue badge class in `Announcements.vue` (changing `bg-blue-100 text-blue-800` to a theme-compliant palette like `bg-primary/10 text-accent`).

---

## 3. Caveats
*   **External Assets**: The proposed crumpled-paper overlay utilizes a data-URI SVG diffuse lighting noise generator rather than an external CDN image. This is a deliberate choice because the system is operating in a sandboxed network environment, preventing external HTTP image downloads at runtime.
*   **Build Size**: The inline CSS SVG diffuse light generator is extremely lightweight (~250 bytes) and will not bloat the production bundle file size checked in `T2.26`.

---

## 4. Conclusion
To satisfy all E2E tests (`T2.9`, `T2.12`, `T2.16`, `T2.17`, `T2.25`, `T3.1`, etc.) and fulfill the project specifications, the visual design refresh strategy must consist of the following concrete changes:
*   Update `index.html`'s `<title>` tag.
*   Add a fallback redirect route to `src/router/index.js`.
*   Import the elegant Roman serif font `Cinzel` alongside `Playfair Display`.
*   Add a high-fidelity crumpled-paper SVG noise filter class (`.paper-texture`) to `style.css` and apply it to the main wrapper in `App.vue`.
*   Place 3 interactive, responsive, animated SVG sparkle stars in the Hero section of `Home.vue`.
*   Correct the contact email address in the footer of `App.vue` and integrate the official Facebook anchor link `ASTRIFERUM INNOVARE` (pointing to `facebook.com`) in the footer of `App.vue` and Direct Channels list of `Contact.vue`.

All changes are fully prepared in the unified patch file:
`d:\Innovare Web\.agents\teamwork_preview_explorer_visual_refresh_3\proposed_refresh.patch`.

---

## 5. Verification Method
The changes can be verified independently by running the following sequence of commands in the workspace:

1.  **Check lint and layout**: Confirm all target source files match their expected paths.
2.  **Apply proposed patch**:
    ```powershell
    git apply .agents/teamwork_preview_explorer_visual_refresh_3/proposed_refresh.patch
    ```
3.  **Run Build**:
    ```powershell
    npm run build
    ```
4.  **Execute E2E validation script**:
    ```powershell
    node tests/run-tests.js
    ```
    *Validation Condition*: The suite must log `Total Tests Run: 62`, `Failed Tests: 0` and terminate with exit code `0`.
