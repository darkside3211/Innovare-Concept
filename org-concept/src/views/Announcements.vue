<template>
  <div class="py-12 px-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="mb-16 text-center border-b border-gray-100 pb-8">
      <span class="text-accent font-semibold tracking-widest uppercase text-xs md:text-sm bg-primary/10 px-3 py-1 rounded">Updates & news</span>
      <h1 class="text-4xl md:text-5xl font-serif font-bold text-primary mt-4">Announcements</h1>
      <p class="text-gray-600 mt-4 font-sans max-w-2xl mx-auto leading-relaxed">
        Follow our timeline of milestones, launches, and official standard releases as we build the concept ecosystem.
      </p>
    </div>

    <!-- Timeline Wrapper -->
    <div class="relative border-l-2 border-primary/20 ml-4 md:ml-32">
      <!-- Announcement 1 -->
      <div class="mb-12 relative pl-8 md:pl-12">
        <!-- Date column on larger screens -->
        <div class="hidden md:block absolute -left-36 top-1.5 w-28 text-right font-semibold text-sm text-gray-500 font-sans">
          July 13, 2026
        </div>
        <!-- Dot on timeline -->
        <span class="absolute -left-[11px] top-1.5 bg-primary border-4 border-[#fcfbfa] w-5 h-5 rounded-full shadow-sm"></span>
        
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="md:hidden text-xs font-semibold text-gray-500 font-sans">July 13, 2026</span>
            <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Launch</span>
          </div>
          <h2 class="text-2xl font-serif font-bold text-primary mb-3">Astriferum Innovare Concept Launched</h2>
          <p class="text-gray-600 font-sans leading-relaxed text-sm md:text-base">
            We have officially deployed the initial release of the Astriferum Innovare digital platform. This represents our first public-facing environment, containing initial specifications, organizational visions, and reactive activity systems designed for our community.
          </p>
        </div>
      </div>

      <!-- Announcement 2 -->
      <div class="mb-12 relative pl-8 md:pl-12">
        <div class="hidden md:block absolute -left-36 top-1.5 w-28 text-right font-semibold text-sm text-gray-500 font-sans">
          July 28, 2026
        </div>
        <span class="absolute -left-[11px] top-1.5 bg-accent border-4 border-[#fcfbfa] w-5 h-5 rounded-full shadow-sm"></span>
        
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="md:hidden text-xs font-semibold text-gray-500 font-sans">July 28, 2026</span>
            <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Community</span>
          </div>
          <h2 class="text-2xl font-serif font-bold text-primary mb-3">Upcoming Community Summit</h2>
          <p class="text-gray-600 font-sans leading-relaxed text-sm md:text-base">
            Mark your calendars for our upcoming virtual community summit on August 25, 2026. This interactive event will feature live panels, roadmap discussions, and break-out rooms where members can directly influence our Q4 project goals.
          </p>
        </div>
      </div>

      <!-- Announcement 3 -->
      <div class="mb-12 relative pl-8 md:pl-12">
        <div class="hidden md:block absolute -left-36 top-1.5 w-28 text-right font-semibold text-sm text-gray-500 font-sans">
          August 10, 2026
        </div>
        <span class="absolute -left-[11px] top-1.5 bg-primary border-4 border-[#fcfbfa] w-5 h-5 rounded-full shadow-sm"></span>
        
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="md:hidden text-xs font-semibold text-gray-500 font-sans">August 10, 2026</span>
            <span class="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Standards</span>
          </div>
          <h2 class="text-2xl font-serif font-bold text-primary mb-3">Craftsmanship Standards Draft Released</h2>
          <p class="text-gray-600 font-sans leading-relaxed text-sm md:text-base">
            The initial draft of the Astriferum Craftsmanship Standards has been released for public review. This document outlines concrete principles, guidelines, and quality frameworks that all affiliated initiatives must adhere to. Feedback is welcome.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Announcements timeline setup
</script>
