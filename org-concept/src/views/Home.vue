<template>
  <div class="pb-16 bg-[#fcfbfa] paper-texture">
    <!-- Hero Section with Banner Image -->
    <div class="max-w-7xl mx-auto px-6 pt-8">
      <div class="relative overflow-hidden rounded-3xl border border-accent/35 shadow-xl bg-primary">
        <!-- Banner Image Container -->
        <div class="relative h-64 md:h-96 w-full overflow-hidden">
          <img 
            :src="bannerUrl" 
            alt="Innovare Banner" 
            class="w-full h-full object-cover object-center opacity-85 hover:scale-102 transition-transform duration-700 ease-in-out"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
          
          <!-- Subtle Floating Sparkle Stars (Astriferum theme) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-8 right-12 w-8 h-8 text-accent sparkle-star pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-20 right-36 w-4 h-4 text-accent/70 sparkle-star pointer-events-none" fill="currentColor" viewBox="0 0 24 24" style="animation-delay: 1.5s;">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-24 right-20 w-6 h-6 text-accent/85 sparkle-star pointer-events-none" fill="currentColor" viewBox="0 0 24 24" style="animation-delay: 0.8s;">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-12 left-16 w-5 h-5 text-accent/60 sparkle-star pointer-events-none" fill="currentColor" viewBox="0 0 24 24" style="animation-delay: 2.2s;">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          </svg>

          <!-- Motto Overlay on Image (bottom) -->
          <div class="absolute bottom-0 left-0 right-0 p-8 text-center md:text-left md:pl-12">
            <span class="text-accent font-semibold tracking-widest uppercase text-xs md:text-sm bg-primary/80 px-3 py-1 rounded border border-accent/20">
              Our Core Philosophy
            </span>
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-white mt-3 italic tracking-wide drop-shadow-md">
              Acta, Non Verba
            </h1>
            <p class="text-accent text-lg md:text-xl font-sans mt-2 tracking-wide font-medium drop-shadow-sm">
              Actions, Not Words
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Vision, Mission & Objectives Section -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="bg-gradient-to-br from-primary via-primary to-[#2a2042] text-white rounded-3xl p-8 md:p-12 shadow-2xl border-l-8 border-accent relative overflow-hidden">
        <!-- Accent Gold Circle Decoration -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-2xl -ml-16 -mb-16"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left side: Introduction -->
          <div>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-accent mb-6 flex items-center gap-3">
              <span class="w-8 h-1 bg-accent inline-block"></span>
              The Innovare Standard
            </h2>
            <p class="text-gray-200 text-lg leading-relaxed mb-6 font-sans">
              Astriferum Innovare represents a commitment to purposeful creation. We reject passive speculation in favor of active craftsmanship and genuine innovation.
            </p>
            <div class="grid grid-cols-3 gap-4 text-center mt-8 border-t border-white/10 pt-8">
              <div>
                <p class="text-accent font-serif text-3xl font-bold">100%</p>
                <p class="text-gray-400 text-xs uppercase tracking-wider mt-1">Action-Driven</p>
              </div>
              <div class="border-x border-white/10">
                <p class="text-accent font-serif text-3xl font-bold">10x</p>
                <p class="text-gray-400 text-xs uppercase tracking-wider mt-1">Craftsmanship</p>
              </div>
              <div>
                <p class="text-accent font-serif text-3xl font-bold">Core</p>
                <p class="text-gray-400 text-xs uppercase tracking-wider mt-1">Innovation</p>
              </div>
            </div>
          </div>

          <!-- Right side: Mission, Vision & Objectives Cards -->
          <div class="space-y-6">
            <!-- Our Mission Card -->
            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-colors duration-300 relative group">
              <div class="absolute top-4 right-4 text-accent/30 group-hover:text-accent/70 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sparkle-star" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </div>
              <h3 class="text-xl font-serif font-bold text-accent mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1.5m0 15V21m-9-9h1.5m15 0H21m-9-9a9 9 0 100 18 9 9 0 000-18z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11.25a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                </svg>
                Our Mission
              </h3>
              <p class="text-gray-200 font-sans leading-relaxed text-sm">
                To equip the youth with relevant skills in technology, sciences, humanities, and arts to excel as individuals and contribute to nation-building.
              </p>
            </div>

            <!-- Our Vision Card -->
            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-colors duration-300 relative group">
              <div class="absolute top-4 right-4 text-accent/30 group-hover:text-accent/70 transition-colors duration-300" style="animation-delay: 0.5s;">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sparkle-star" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </div>
              <h3 class="text-xl font-serif font-bold text-accent mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Our Vision
              </h3>
              <p class="text-gray-200 font-sans leading-relaxed text-sm">
                To become a prominent youth organization who advocates for skills and career advancement for a brighter tomorrow filled with competent, transparent, and excellent youths grounded in humility and morality.
              </p>
            </div>

            <!-- Our Objectives Card -->
            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-colors duration-300 relative group">
              <div class="absolute top-4 right-4 text-accent/30 group-hover:text-accent/70 transition-colors duration-300" style="animation-delay: 1s;">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sparkle-star" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </div>
              <h3 class="text-xl font-serif font-bold text-accent mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Our Objectives
              </h3>
              <p class="text-gray-200 font-sans leading-relaxed text-sm">
                To shape the youth to become excellent in technology, science, humanities, and arts, and promote youth leadership that aids in fostering a better tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Navigation / Features -->
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-serif font-bold text-primary">Explore the Platform</h2>
        <div class="w-12 h-1 bg-accent mx-auto mt-3"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Announcements Card -->
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-accent/35 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold text-primary mb-3">Latest Announcements</h3>
            <p class="text-gray-600 mb-6 font-sans leading-relaxed text-sm">
              Stay up to date with the latest press releases, organizational updates, and structural milestones.
            </p>
          </div>
          <router-link to="/announcements" class="text-accent hover:text-primary font-semibold transition-colors duration-200 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            Read Announcements &rarr;
          </router-link>
        </div>

        <!-- Activities Card -->
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-accent/35 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold text-primary mb-3">Upcoming Activities</h3>
            <p class="text-gray-600 mb-6 font-sans leading-relaxed text-sm">
              Participate in workshops, seminars, networking sessions, and projects designed for growth.
            </p>
          </div>
          <router-link to="/activities" class="text-accent hover:text-primary font-semibold transition-colors duration-200 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            Explore Activities &rarr;
          </router-link>
        </div>

        <!-- Contact Card -->
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-accent/35 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold text-primary mb-3">Connect With Us</h3>
            <p class="text-gray-600 mb-6 font-sans leading-relaxed text-sm">
              Get in touch with our team for questions, collaborative ventures, or membership opportunities.
            </p>
          </div>
          <router-link to="/contact" class="text-accent hover:text-primary font-semibold transition-colors duration-200 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            Contact Us &rarr;
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import bannerUrl from '../assets/banner.png'
</script>
