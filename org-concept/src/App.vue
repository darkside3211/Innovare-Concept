<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import logoUrl from './assets/logo.png'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#fbfbfe] text-slate-900 selection:bg-purple-500 selection:text-white">
    <!-- Header / Navigation -->
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-100/80 shadow-xs transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <!-- Logo Text & Crest -->
        <router-link to="/" class="flex items-center gap-3.5 group" @click="closeMenu">
          <div class="relative flex items-center justify-center">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 via-amber-500 to-cyan-500 rounded-full blur-xs opacity-0 group-hover:opacity-70 transition duration-500"></div>
            <img :src="logoUrl" alt="Innovare Logo" class="relative h-11 w-auto transition-transform duration-300 group-hover:scale-105" />
          </div>
          <span class="font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors duration-200">
            Astriferum Innovare
          </span>
        </router-link>

        <!-- Desktop Nav Links -->
        <nav class="hidden md:flex items-center gap-2 bg-slate-100/60 p-1.5 rounded-full border border-slate-200/50">
          <router-link 
            to="/" 
            class="px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200" 
            :class="$route.path === '/' ? 'bg-white text-purple-600 shadow-sm border border-purple-100' : 'text-slate-600 hover:text-purple-600 hover:bg-white/50'"
          >
            Home
          </router-link>
          <router-link 
            to="/announcements" 
            class="px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200" 
            :class="$route.path.startsWith('/announcements') ? 'bg-white text-purple-600 shadow-sm border border-purple-100' : 'text-slate-600 hover:text-purple-600 hover:bg-white/50'"
          >
            Announcements
          </router-link>
          <router-link 
            to="/activities" 
            class="px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200" 
            :class="$route.path.startsWith('/activities') ? 'bg-white text-purple-600 shadow-sm border border-purple-100' : 'text-slate-600 hover:text-purple-600 hover:bg-white/50'"
          >
            Activities
          </router-link>
          <router-link 
            to="/contact" 
            class="px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200" 
            :class="$route.path.startsWith('/contact') ? 'bg-white text-purple-600 shadow-sm border border-purple-100' : 'text-slate-600 hover:text-purple-600 hover:bg-white/50'"
          >
            Contact
          </router-link>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <button @click="toggleMenu" class="md:hidden p-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none cursor-pointer transition-colors" aria-label="Toggle Menu">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Nav Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-if="isMenuOpen" class="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl px-6 py-6 absolute w-full left-0">
          <nav class="flex flex-col gap-3">
            <router-link to="/" class="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all" :class="$route.path === '/' ? 'bg-purple-50 text-purple-600 font-extrabold' : 'text-slate-700 hover:bg-slate-50'" @click="closeMenu">Home</router-link>
            <router-link to="/announcements" class="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all" :class="$route.path.startsWith('/announcements') ? 'bg-purple-50 text-purple-600 font-extrabold' : 'text-slate-700 hover:bg-slate-50'" @click="closeMenu">Announcements</router-link>
            <router-link to="/activities" class="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all" :class="$route.path.startsWith('/activities') ? 'bg-purple-50 text-purple-600 font-extrabold' : 'text-slate-700 hover:bg-slate-50'" @click="closeMenu">Activities</router-link>
            <router-link to="/contact" class="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all" :class="$route.path.startsWith('/contact') ? 'bg-purple-50 text-purple-600 font-extrabold' : 'text-slate-700 hover:bg-slate-50'" @click="closeMenu">Contact</router-link>
          </nav>
        </div>
      </transition>
    </header>

    <!-- Main Container -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Light modern Footer -->
    <footer class="bg-white text-slate-700 border-t border-slate-200/70 pt-16 pb-10 relative overflow-hidden">
      <!-- Ambient light background glow -->
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20"></div>
      <div class="absolute top-0 left-1/4 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none -mt-20"></div>

      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 relative z-10">
        <!-- Brand & Motto -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <img :src="logoUrl" alt="Innovare Logo" class="h-10 w-auto" />
            <span class="font-extrabold text-2xl text-slate-900 tracking-tight">Astriferum Innovare</span>
          </div>
          <p class="font-bold text-amber-500 tracking-wider text-base uppercase flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-purple-600"></span>
            "Acta, Non Verba"
          </p>
          <p class="text-slate-600 text-sm max-w-sm leading-relaxed font-normal">
            Leading by example and actions. We develop frameworks and spaces that empower individuals and organizations.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="font-bold text-base text-slate-900 tracking-wide">Quick Links</h3>
          <ul class="space-y-3 text-sm text-slate-600 font-medium">
            <li><router-link to="/" class="hover:text-purple-600 transition-colors inline-flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-purple-600 transition-colors"></span>Home</router-link></li>
            <li><router-link to="/announcements" class="hover:text-purple-600 transition-colors inline-flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-purple-600 transition-colors"></span>Announcements</router-link></li>
            <li><router-link to="/activities" class="hover:text-purple-600 transition-colors inline-flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-purple-600 transition-colors"></span>Activities</router-link></li>
            <li><router-link to="/contact" class="hover:text-purple-600 transition-colors inline-flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-purple-600 transition-colors"></span>Contact</router-link></li>
          </ul>
        </div>

        <!-- Contact details -->
        <div class="space-y-4">
          <h3 class="font-bold text-base text-slate-900 tracking-wide">Contact Details</h3>
          <div class="space-y-3 text-sm text-slate-600 leading-relaxed font-normal">
            <p class="flex items-center gap-2">
              <span class="font-semibold text-slate-800">Email:</span>
              <a href="mailto:astriferuminnovare@gmail.com" class="text-purple-600 hover:text-purple-800 font-medium underline underline-offset-4 decoration-purple-200 hover:decoration-purple-600 transition-colors">
                astriferuminnovare@gmail.com
              </a>
            </p>
            <p class="flex items-center gap-2">
              <span class="font-semibold text-slate-800">Facebook:</span>
              <a href="https://facebook.com/ASTRIFERUMINNOVARE" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                ASTRIFERUM INNOVARE
              </a>
            </p>
            <p>
              <span class="font-semibold text-slate-800">Address:</span> 100 Innovation Parkway, Suite 500, CA
            </p>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="max-w-7xl mx-auto px-6 border-t border-slate-200/80 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4 relative z-10">
        <p>&copy; 2026 Astriferum Innovare. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-purple-600 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-purple-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Subtle route transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
