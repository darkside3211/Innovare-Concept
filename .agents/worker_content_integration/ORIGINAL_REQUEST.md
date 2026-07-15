## 2026-07-13T02:50:08Z
You are the Worker subagent. Your working directory is d:\Innovare Web\.agents\worker_content_integration.

Please update the file d:\Innovare Web\org-concept\src\views\Home.vue with the following content replacement. Replace the existing Vision and Mission cards section on the right side of the hero details section (lines 65 to 91 roughly) with the three style-matched cards for Mission, Vision, and Objectives:

```vue
          <!-- Right side: Mission, Vision & Objectives Cards -->
          <div class="space-y-6">
            <!-- Our Mission Card -->
            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-colors duration-300">
              <h3 class="text-xl font-serif font-bold text-accent mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1.5m0 15V21m-9-9h1.5m15 0H21m-9-9a9 9 0 100 18 9 9 0 000-18z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11.25a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                </svg>
                Our Mission
              </h3>
              <p class="text-gray-300 font-sans leading-relaxed text-sm">
                To equip the youth with relevant skills in technology, sciences, humanities, and arts to excel as individuals and contribute to nation-building.
              </p>
            </div>

            <!-- Our Vision Card -->
            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-colors duration-300">
              <h3 class="text-xl font-serif font-bold text-accent mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Our Vision
              </h3>
              <p class="text-gray-300 font-sans leading-relaxed text-sm">
                To become a prominent youth organization who advocates for skills and career advancement for a brighter tomorrow filled with competent, transparent, and excellent youths grounded in humility and morality.
              </p>
            </div>

            <!-- Our Objectives Card -->
            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-colors duration-300">
              <h3 class="text-xl font-serif font-bold text-accent mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Our Objectives
              </h3>
              <p class="text-gray-300 font-sans leading-relaxed text-sm">
                To shape the youth to become excellent in technology, science, humanities, and arts, and promote youth leadership that aids in fostering a better tomorrow.
              </p>
            </div>
          </div>
```

After modifying the file, run the build command `npm run build` in d:\Innovare Web\org-concept to ensure the project compiles successfully.
Write a report detailing your changes and build results to d:\Innovare Web\.agents\worker_content_integration\changes.md and send a message when done.
