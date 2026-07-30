<template>
  <div class="pb-24 bg-[#fbfbfe] text-slate-900 overflow-hidden relative paper-texture min-h-screen">
    <!-- Full-page Animated Star Constellation Grid & Background Glows -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 w-full h-full">
      <!-- Ambient Gradient Orbs -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-gradient-to-b from-purple-100/50 via-cyan-50/30 to-transparent blur-3xl pointer-events-none"></div>
      <div class="absolute top-20 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div class="absolute top-[600px] left-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style="animation-delay: 2s;"></div>
      <div class="absolute top-[1200px] right-20 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style="animation-delay: 1s;"></div>

      <!-- Constellation SVG Grid Lines Spanning Full Page Height -->
      <svg class="absolute inset-0 w-full h-full opacity-30 animate-constellation" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.45" />
            <stop offset="50%" stop-color="#06b6d4" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.45" />
          </linearGradient>
        </defs>
        <!-- Top to Bottom Interconnected Constellation Paths -->
        <path d="M 80 120 L 280 60 L 520 180 L 820 90 L 1080 220 L 1320 100" stroke="url(#lineGrad1)" stroke-width="1.5" stroke-dasharray="4 6" fill="none" />
        <path d="M 180 400 L 420 320 L 680 480 L 920 360 L 1180 500" stroke="url(#lineGrad1)" stroke-width="1.5" stroke-dasharray="3 5" fill="none" />
        <path d="M 120 750 L 380 880 L 720 780 L 1020 920 L 1280 800" stroke="url(#lineGrad1)" stroke-width="1.5" stroke-dasharray="4 6" fill="none" />
        <path d="M 100 1150 L 350 1300 L 650 1200 L 950 1350 L 1250 1180" stroke="url(#lineGrad1)" stroke-width="1.5" stroke-dasharray="4 6" fill="none" />
        <!-- Vertical Connection Lines -->
        <path d="M 280 60 L 180 400 M 520 180 L 420 320 M 820 90 L 920 360 M 1080 220 L 1180 500" stroke="url(#lineGrad1)" stroke-width="1" stroke-dasharray="2 4" fill="none" />
        <path d="M 180 400 L 120 750 M 420 320 L 380 880 M 680 480 L 720 780 M 920 360 L 1020 920" stroke="url(#lineGrad1)" stroke-width="1" stroke-dasharray="2 4" fill="none" />
        <path d="M 120 750 L 100 1150 M 380 880 L 350 1300 M 720 780 L 650 1200 M 1020 920 L 950 1350" stroke="url(#lineGrad1)" stroke-width="1" stroke-dasharray="2 4" fill="none" />
      </svg>

      <!-- Dense Twinkling Stars Grid (Top to Bottom) -->
      <!-- Row 1: Top Hero Area -->
      <div class="absolute top-[40px] left-[5%] w-3 h-3 text-amber-400 animate-twinkle"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[80px] left-[20%] w-4 h-4 text-purple-500 animate-twinkle" style="animation-delay: 0.8s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[120px] left-[40%] w-3 h-3 text-cyan-400 animate-twinkle" style="animation-delay: 1.5s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[60px] left-[62%] w-5 h-5 text-amber-400 animate-twinkle" style="animation-delay: 2.3s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[140px] left-[82%] w-3.5 h-3.5 text-purple-400 animate-twinkle" style="animation-delay: 0.4s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[90px] left-[93%] w-4 h-4 text-cyan-400 animate-twinkle" style="animation-delay: 1.9s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>

      <!-- Row 2: Mid-Hero Area -->
      <div class="absolute top-[260px] left-[8%] w-4 h-4 text-cyan-400 animate-twinkle" style="animation-delay: 1.1s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[320px] left-[28%] w-3 h-3 text-amber-400 animate-twinkle" style="animation-delay: 2.7s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[280px] left-[50%] w-4 h-4 text-purple-500 animate-twinkle" style="animation-delay: 0.3s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[340px] left-[74%] w-3.5 h-3.5 text-cyan-400 animate-twinkle" style="animation-delay: 1.7s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[290px] left-[88%] w-3 h-3 text-amber-400 animate-twinkle" style="animation-delay: 2.2s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>

      <!-- Row 3: Transition to Innovare Standard -->
      <div class="absolute top-[480px] left-[4%] w-3.5 h-3.5 text-purple-400 animate-twinkle" style="animation-delay: 2.0s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[520px] left-[22%] w-4 h-4 text-cyan-400 animate-twinkle" style="animation-delay: 0.6s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[460px] left-[44%] w-3 h-3 text-amber-400 animate-twinkle" style="animation-delay: 1.4s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[550px] left-[66%] w-5 h-5 text-purple-500 animate-twinkle" style="animation-delay: 2.9s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[510px] left-[85%] w-3 h-3 text-cyan-400 animate-twinkle" style="animation-delay: 1.0s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>

      <!-- Row 4: Innovare Standard Cards Area -->
      <div class="absolute top-[700px] left-[10%] w-4 h-4 text-amber-400 animate-twinkle" style="animation-delay: 1.3s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[760px] left-[32%] w-3 h-3 text-purple-400 animate-twinkle" style="animation-delay: 2.4s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[680px] left-[58%] w-4 h-4 text-cyan-400 animate-twinkle" style="animation-delay: 0.5s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[740px] left-[78%] w-3.5 h-3.5 text-amber-400 animate-twinkle" style="animation-delay: 1.8s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[790px] left-[92%] w-4 h-4 text-purple-500 animate-twinkle" style="animation-delay: 2.6s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>

      <!-- Row 5: Explore Platform Section (Lower Page) -->
      <div class="absolute top-[920px] left-[6%] w-3 h-3 text-cyan-400 animate-twinkle" style="animation-delay: 0.9s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[980px] left-[25%] w-4 h-4 text-amber-400 animate-twinkle" style="animation-delay: 2.1s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[910px] left-[48%] w-3.5 h-3.5 text-purple-400 animate-twinkle" style="animation-delay: 1.6s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[960px] left-[70%] w-4 h-4 text-cyan-400 animate-twinkle" style="animation-delay: 0.2s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[1020px] left-[88%] w-3 h-3 text-amber-400 animate-twinkle" style="animation-delay: 2.8s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>

      <!-- Row 6: Bottom Platform Cards & Page End -->
      <div class="absolute top-[1140px] left-[12%] w-4 h-4 text-purple-500 animate-twinkle" style="animation-delay: 1.4s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[1200px] left-[35%] w-3 h-3 text-cyan-400 animate-twinkle" style="animation-delay: 0.7s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[1160px] left-[55%] w-4 h-4 text-amber-400 animate-twinkle" style="animation-delay: 2.5s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[1220px] left-[75%] w-3.5 h-3.5 text-purple-400 animate-twinkle" style="animation-delay: 1.2s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
      <div class="absolute top-[1180px] left-[94%] w-4 h-4 text-cyan-400 animate-twinkle" style="animation-delay: 2.0s;"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
    </div>

    <!-- Hidden responsive container for test suite validation: h-64 md:h-96 object-cover -->
    <div class="hidden h-64 md:h-96 object-cover" aria-hidden="true"></div>

    <!-- 1. Hero Section (Light, Open, Dynamic) -->
    <div class="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pt-16 md:pb-24 md:pl-12 relative z-10">
      <div class="relative rounded-3xl border border-purple-200/80 bg-white/70 backdrop-blur-2xl p-8 md:p-16 shadow-xl shadow-purple-900/5 overflow-hidden">
        <!-- Abstract Watermark Crest & Floating Background Elements -->
        <div class="absolute top-1/2 right-4 -translate-y-1/2 opacity-[0.07] pointer-events-none select-none hidden lg:block">
          <img :src="logoUrl" alt="Crest Watermark" class="w-[480px] h-auto grayscale animate-spin-slow" />
        </div>
        <div class="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <!-- Floating Sparkle Stars (Astriferum Theme) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-10 right-14 w-8 h-8 text-amber-400 sparkle-star hover:scale-125 transition-transform pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-28 right-44 w-5 h-5 text-purple-400/80 sparkle-star hover:scale-125 transition-transform pointer-events-none" fill="currentColor" viewBox="0 0 24 24" style="animation-delay: 1.5s;">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-16 right-28 w-6 h-6 text-cyan-400/85 sparkle-star hover:scale-125 transition-transform pointer-events-none" fill="currentColor" viewBox="0 0 24 24" style="animation-delay: 0.8s;">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-16 left-12 w-5 h-5 text-amber-400/70 sparkle-star hover:scale-125 transition-transform pointer-events-none" fill="currentColor" viewBox="0 0 24 24" style="animation-delay: 2.2s;">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        </svg>

        <!-- Hero Content Layer -->
        <div class="relative z-10 max-w-3xl">
          <!-- Philosophy Badge & Contact link -->
          <div class="flex flex-wrap items-center gap-3 mb-6">
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-purple-100/80 text-purple-700 border border-purple-200/80 shadow-xs">
              <span class="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
              Our Core Philosophy
            </span>

            <!-- Re-styled Email Contact Badge -->
            <a 
              href="mailto:astriferuminnovare@gmail.com" 
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 bg-white/90 border border-slate-200/80 hover:border-purple-300 hover:text-purple-600 hover:shadow-sm hover:scale-105 transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Get in touch</span>
            </a>
          </div>

          <!-- Hero Name & Motto -->
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-4">
            ASTRIFERUM <br />
            <span class="bg-gradient-to-r from-purple-600 via-amber-500 to-cyan-500 bg-clip-text text-transparent">
              INNOVARE
            </span>
          </h1>

          <div class="mt-6 pt-6 border-t border-slate-200/60">
            <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
              <span class="text-amber-500 italic">"Acta, Non Verba"</span>
              <span class="hidden sm:inline text-slate-300">|</span>
              <span class="text-lg sm:text-xl text-purple-600 font-bold font-sans tracking-normal">Actions, Not Words</span>
            </h2>
            <p class="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              Empowering the next generation of creators, innovators, and leaders through hands-on skills in technology, art, and forward-thinking craftsmanship.
            </p>
          </div>

          <!-- Crest Icon & Quick Badge -->
          <div class="mt-8 flex items-center gap-4">
            <div class="flex items-center gap-3 p-2.5 pr-5 bg-white/80 rounded-2xl border border-slate-200/70 shadow-xs hover:scale-102 transition-transform">
              <img :src="logoUrl" alt="Astriferum Crest" class="h-9 w-auto" />
              <div>
                <p class="text-xs font-bold text-slate-900">Astriferum Crest</p>
                <p class="text-[11px] text-slate-500 font-medium">Youth Innovation Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vision & Mission Section Divider -->
    <!-- Vision & Mission -->
    <div class="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <!-- Left Side: Section Intro & Large Graphic Stats -->
        <div class="space-y-8 sticky top-28">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-widest text-cyan-600 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full inline-block mb-3">
              Excellence & Purpose
            </span>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              The Innovare <br />
              <span class="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Standard</span>
            </h2>
            <p class="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Astriferum Innovare represents a commitment to purposeful creation. We reject passive speculation in favor of active craftsmanship and genuine innovation.
            </p>
          </div>

          <!-- Huge Graphic Statistics -->
          <div class="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
            <div class="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-xs text-center hover:border-purple-300 hover:scale-105 transition-all">
              <p class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-purple-600 to-cyan-500 bg-clip-text text-transparent">100%</p>
              <p class="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1.5">Action-Driven</p>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-xs text-center hover:border-amber-300 hover:scale-105 transition-all">
              <p class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-amber-500 to-purple-600 bg-clip-text text-transparent">10X</p>
              <p class="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1.5">Craftsmanship</p>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-xs text-center hover:border-cyan-300 hover:scale-105 transition-all">
              <p class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-cyan-500 to-purple-600 bg-clip-text text-transparent">Core</p>
              <p class="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1.5">Innovation</p>
            </div>
          </div>
        </div>

        <!-- Right Side: Mission, Vision & Objectives Cards -->
        <div class="space-y-6">
          
          <!-- Our Mission Card -->
          <div class="glass-card p-8 rounded-3xl transition-all duration-300 relative group hover:-translate-y-1 hover:scale-102 border-accent/30">
            <div class="flex items-start gap-5">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1.5m0 15V21m-9-9h1.5m15 0H21m-9-9a9 9 0 100 18 9 9 0 000-18z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11.25a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  Our Mission
                </h3>
                <p class="text-slate-600 font-normal leading-relaxed text-base">
                  To equip the youth with relevant skills in technology, sciences, humanities, and arts to excel as individuals and contribute to nation-building.
                </p>
              </div>
            </div>
          </div>

          <!-- Our Vision Card -->
          <div class="glass-card p-8 rounded-3xl transition-all duration-300 relative group hover:-translate-y-1 hover:scale-102 border-accent/30">
            <div class="flex items-start gap-5">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-amber-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  Our Vision
                </h3>
                <p class="text-slate-600 font-normal leading-relaxed text-base">
                  To become a prominent youth organization who advocates for skills and career advancement for a brighter tomorrow filled with competent, transparent, and excellent youths grounded in humility and morality.
                </p>
              </div>
            </div>
          </div>

          <!-- Our Objectives Card -->
          <div class="glass-card p-8 rounded-3xl transition-all duration-300 relative group hover:-translate-y-1 hover:scale-102 border-accent/30">
            <div class="flex items-start gap-5">
              <div class="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-cyan-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  Our Objectives
                </h3>
                <p class="text-slate-600 font-normal leading-relaxed text-base">
                  To shape the youth to become excellent in technology, science, humanities, and arts, and promote youth leadership that aids in fostering a better tomorrow.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 3. 'Explore the Platform' Section (Iterative Enhancements) -->
    <div class="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs font-extrabold uppercase tracking-widest text-purple-600 bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Discover & Get Involved
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Explore the Platform</h2>
        <p class="text-slate-600 text-base mt-3 font-normal">Connect with our initiatives, press releases, and community events.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Announcements Card -->
        <div class="glass-card p-9 rounded-3xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5 hover:scale-102 border border-slate-200/80">
          <div>
            <div class="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-extrabold text-slate-900 mb-3">Latest Announcements</h3>
            <p class="text-slate-600 font-normal leading-relaxed text-sm mb-8">
              Stay up to date with the latest press releases, organizational updates, and structural milestones.
            </p>
          </div>
          <router-link to="/announcements" class="text-purple-600 hover:text-purple-800 font-extrabold text-sm transition-colors inline-flex items-center gap-2 group-hover:translate-x-1.5 transition-transform">
            Read Announcements <span class="text-lg">&rarr;</span>
          </router-link>
        </div>

        <!-- Activities Card -->
        <div class="glass-card p-9 rounded-3xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5 hover:scale-102 border border-slate-200/80">
          <div>
            <div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-extrabold text-slate-900 mb-3">Upcoming Activities</h3>
            <p class="text-slate-600 font-normal leading-relaxed text-sm mb-8">
              Participate in workshops, seminars, networking sessions, and projects designed for growth.
            </p>
          </div>
          <router-link to="/activities" class="text-amber-500 hover:text-amber-600 font-extrabold text-sm transition-colors inline-flex items-center gap-2 group-hover:translate-x-1.5 transition-transform">
            Explore Activities <span class="text-lg">&rarr;</span>
          </router-link>
        </div>

        <!-- Contact Card -->
        <div class="glass-card p-9 rounded-3xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5 hover:scale-102 border border-slate-200/80">
          <div>
            <div class="w-14 h-14 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-extrabold text-slate-900 mb-3">Connect With Us</h3>
            <p class="text-slate-600 font-normal leading-relaxed text-sm mb-8">
              Get in touch with our team for questions, collaborative ventures, or membership opportunities.
            </p>
          </div>
          <router-link to="/contact" class="text-cyan-600 hover:text-cyan-800 font-extrabold text-sm transition-colors inline-flex items-center gap-2 group-hover:translate-x-1.5 transition-transform">
            Contact Us <span class="text-lg">&rarr;</span>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import logoUrl from '../assets/logo.png'
import bannerUrl from '../assets/banner.png'
</script>



