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
  <div class="min-h-screen flex flex-col bg-[#fcfbfa] paper-texture">
    <!-- Header / Navigation -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group" @click="closeMenu">
          <img :src="logoUrl" alt="Innovare Logo" class="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
          <span class="font-serif text-2xl font-bold text-primary tracking-tight">Astriferum Innovare</span>
        </router-link>

        <!-- Desktop Nav Links -->
        <nav class="hidden md:flex items-center gap-8">
          <router-link to="/" class="text-sm font-semibold tracking-wide uppercase transition-colors duration-200" :class="$route.path === '/' ? 'text-accent border-b-2 border-accent pb-1' : 'text-primary/80 hover:text-accent'">Home</router-link>
          <router-link to="/announcements" class="text-sm font-semibold tracking-wide uppercase transition-colors duration-200" :class="$route.path.startsWith('/announcements') ? 'text-accent border-b-2 border-accent pb-1' : 'text-primary/80 hover:text-accent'">Announcements</router-link>
          <router-link to="/activities" class="text-sm font-semibold tracking-wide uppercase transition-colors duration-200" :class="$route.path.startsWith('/activities') ? 'text-accent border-b-2 border-accent pb-1' : 'text-primary/80 hover:text-accent'">Activities</router-link>
          <router-link to="/contact" class="text-sm font-semibold tracking-wide uppercase transition-colors duration-200" :class="$route.path.startsWith('/contact') ? 'text-accent border-b-2 border-accent pb-1' : 'text-primary/80 hover:text-accent'">Contact</router-link>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <button @click="toggleMenu" class="md:hidden p-2 text-primary focus:outline-none cursor-pointer" aria-label="Toggle Menu">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Nav Menu with slide down transition -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-if="isMenuOpen" class="md:hidden bg-white border-b border-gray-100 shadow-lg px-6 py-4 absolute w-full left-0">
          <nav class="flex flex-col gap-4">
            <router-link to="/" class="text-base font-semibold uppercase transition-colors duration-200 py-1" :class="$route.path === '/' ? 'text-accent' : 'text-primary/80 hover:text-accent'" @click="closeMenu">Home</router-link>
            <router-link to="/announcements" class="text-base font-semibold uppercase transition-colors duration-200 py-1" :class="$route.path.startsWith('/announcements') ? 'text-accent' : 'text-primary/80 hover:text-accent'" @click="closeMenu">Announcements</router-link>
            <router-link to="/activities" class="text-base font-semibold uppercase transition-colors duration-200 py-1" :class="$route.path.startsWith('/activities') ? 'text-accent' : 'text-primary/80 hover:text-accent'" @click="closeMenu">Activities</router-link>
            <router-link to="/contact" class="text-base font-semibold uppercase transition-colors duration-200 py-1" :class="$route.path.startsWith('/contact') ? 'text-accent' : 'text-primary/80 hover:text-accent'" @click="closeMenu">Contact</router-link>
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

    <!-- Footer -->
    <footer class="bg-primary text-white border-t border-primary/20 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Brand & Motto -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <img :src="logoUrl" alt="Innovare Logo" class="h-10 w-auto" />
            <span class="font-serif text-2xl font-bold tracking-tight">Astriferum Innovare</span>
          </div>
          <p class="font-serif italic text-accent text-lg">"Acta, Non Verba"</p>
          <p class="text-gray-300 text-sm max-w-sm font-sans leading-relaxed">
            Leading by example and actions. We develop frameworks and spaces that empower individuals and organizations.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="font-serif text-lg font-semibold text-accent">Quick Links</h3>
          <ul class="space-y-2 text-sm text-gray-300 font-sans">
            <li><router-link to="/" class="hover:text-white transition-colors">Home</router-link></li>
            <li><router-link to="/announcements" class="hover:text-white transition-colors">Announcements</router-link></li>
            <li><router-link to="/activities" class="hover:text-white transition-colors">Activities</router-link></li>
            <li><router-link to="/contact" class="hover:text-white transition-colors">Contact</router-link></li>
          </ul>
        </div>

        <!-- Contact details -->
        <div class="space-y-4">
          <h3 class="font-serif text-lg font-semibold text-accent">Contact Details</h3>
          <p class="text-sm text-gray-300 font-sans leading-relaxed">
            Email: <a href="mailto:astriferuminnovare@gmail.com" class="hover:text-accent transition-colors">astriferuminnovare@gmail.com</a><br />
            Facebook: <a href="#" class="hover:text-accent transition-colors font-medium">ASTRIFERUM INNOVARE</a><br />
            Address: 100 Innovation Parkway, Suite 500, CA
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <div class="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-sans gap-4">
        <p>&copy; 2026 Astriferum Innovare. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
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
