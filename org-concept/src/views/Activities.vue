<template>
  <div class="py-12 px-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-12 border-b border-gray-100 pb-8 text-center md:text-left">
      <span class="text-accent font-semibold tracking-widest uppercase text-xs md:text-sm bg-primary/10 px-3 py-1 rounded">Engagement & Participation</span>
      <h1 class="text-4xl md:text-5xl font-serif font-bold text-primary mt-4">Activities</h1>
      <p class="text-gray-600 mt-4 font-sans max-w-2xl leading-relaxed">
        Discover and register for upcoming events, workshops, networking sessions, and collaborative initiatives. Review our past milestones below.
      </p>
    </div>

    <!-- Interactive Filter Buttons -->
    <div class="flex justify-center md:justify-start gap-4 mb-8">
      <button 
        v-for="filter in ['All', 'Upcoming', 'Past']" 
        :key="filter"
        @click="currentFilter = filter"
        class="px-5 py-2 rounded-full font-semibold transition-all duration-300 border text-sm cursor-pointer"
        :class="currentFilter === filter 
          ? 'bg-primary text-white border-primary shadow-md' 
          : 'bg-white text-primary/80 border-gray-200 hover:border-accent hover:text-accent'"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Grid of Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div 
        v-for="activity in filteredActivities" 
        :key="activity.id"
        class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      >
        <div class="p-8">
          <div class="flex justify-between items-start mb-4">
            <span 
              class="font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider font-sans border"
              :class="activity.type === 'Upcoming' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50' 
                : 'bg-gray-100 text-gray-500 border-gray-200'"
            >
              {{ activity.type }}
            </span>
            <span class="text-sm text-gray-500 font-sans font-medium">{{ activity.date }}</span>
          </div>

          <h2 class="text-2xl font-serif font-bold text-primary mb-3">{{ activity.title }}</h2>
          <p class="text-gray-600 font-sans mb-6 leading-relaxed text-sm md:text-base">
            {{ activity.description }}
          </p>

          <!-- Location details -->
          <div class="flex items-center gap-2 text-sm text-gray-500 font-sans font-medium border-t border-gray-50 pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ activity.location }}</span>
          </div>
        </div>

        <div class="px-8 pb-8 pt-0">
          <button 
            @click="handleRegister(activity)"
            :disabled="activity.type === 'Past'"
            class="w-full text-center py-2.5 rounded-xl font-semibold transition-all duration-300 font-sans text-sm cursor-pointer shadow-sm"
            :class="activity.type === 'Upcoming' 
              ? 'bg-primary hover:bg-primary/95 text-white hover:shadow' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
          >
            {{ activity.type === 'Upcoming' ? 'Register Now' : 'Event Completed' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentFilter = ref('All')

const activities = ref([
  {
    id: 1,
    title: 'AI & Future of Web Collaboration',
    date: 'July 25, 2026',
    type: 'Upcoming',
    description: 'Join industry leaders in a panel discussion covering AI integrations in collaborative software design, highlighting trends for the next five years.',
    location: 'Silicon Valley Headquarters / Virtual'
  },
  {
    id: 2,
    title: 'Modern CSS Architecture & Tailwind',
    date: 'August 12, 2026',
    type: 'Upcoming',
    description: 'A hands-on technical workshop focused on building maintainable layouts, custom typography systems, and components utilizing Tailwind CSS.',
    location: 'Innovation Lab / Zoom'
  },
  {
    id: 3,
    title: 'Q2 Hackathon: Decentralized Tools',
    date: 'May 14, 2026',
    type: 'Past',
    description: 'A 48-hour design and coding marathon where members built prototype decentralized communication modules. Winners were awarded the Innovation Grant.',
    location: 'Downtown Tech Hub'
  },
  {
    id: 4,
    title: 'Founding General Assembly',
    date: 'April 02, 2026',
    type: 'Past',
    description: 'The inaugural meet-up where the charter of Astriferum Innovare was signed, the core board was elected, and the roadmap for 2026 was ratified.',
    location: 'Grand Hall, Suite 500'
  }
])

const filteredActivities = computed(() => {
  if (currentFilter.value === 'All') return activities.value
  return activities.value.filter(activity => activity.type === currentFilter.value)
})

const handleRegister = (activity) => {
  alert(`Thank you for registering for "${activity.title}". A calendar invite and session instructions have been sent to your email.`)
}
</script>
