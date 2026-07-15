# Plan - Astriferum Innovare Web Concept

This plan coordinates the execution of the project milestones through specialized subagents.

## Milestones and Steps

### Milestone 1: Scaffold & Assets
1. **Initialize Project**: Scaffold the Vue 3 + Vite project at `d:\Innovare Web\org-concept`.
2. **Install Dependencies**: Install `vue-router@4`, `tailwindcss`, `postcss`, and `autoprefixer`.
3. **Configure Tailwind**: Run `npx tailwindcss init -p` and configure `tailwind.config.js` to scan `index.html` and everything in `./src/**/*.{vue,js,ts,jsx,tsx}`.
4. **Setup Assets**: Copy `logo.png` and `banner.png` from `d:\Innovare Web` to the project's assets directory (`d:\Innovare Web\org-concept\src\assets\`).
5. **Verify Initialization**: Verify that the project structure compiles cleanly.

### Milestone 2: App Layout & Core Configuration
1. **Router Configuration**: Set up `src/router/index.js` with routes for Home (`/`), Announcements (`/announcements`), Activities (`/activities`), and Contact (`/contact`).
2. **Global Styling**: Configure `src/style.css` to load Tailwind and customize fonts/theme variables (deep purple/violet primary `#3b2e5a` and gold/yellow accents `#d4af37`).
3. **Main Layout**: Implement `src/App.vue` with a persistent, responsive Navigation Bar (mobile hamburger menu included) and Footer, showcasing the `logo.png`.
4. **App Initialization**: Update `src/main.js` to use the router.

### Milestone 3: Views Development
1. **Home View**: Create `src/views/Home.vue` with corporate banner (`banner.png`), motto ("Acta, Non Verba"), and Vision/Mission statements (exploration, innovation, craftsmanship).
2. **Announcements View**: Create `src/views/Announcements.vue` with a premium vertical timeline showing dummy updates/announcements.
3. **Activities View**: Create `src/views/Activities.vue` with a grid layout displaying upcoming and past events from a reactive dummy data array.
4. **Contact View**: Create `src/views/Contact.vue` with a contact form pre-filled with the email `astriferuminnovare@gmail.com`.

### Milestone 4: Verification and Final Build
1. **Lint & Build**: Run `npm run build` in `org-concept` directory to confirm zero compilation errors.
2. **Visual & Routing Check**: Verify routing works flawlessly across all four paths.
3. **Aesthetic Audit**: Check responsiveness and micro-animations (e.g. hover states).
