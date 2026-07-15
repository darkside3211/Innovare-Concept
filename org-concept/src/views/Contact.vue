<template>
  <div class="py-12 px-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-12 border-b border-gray-100 pb-8 text-center md:text-left">
      <span class="text-accent font-semibold tracking-widest uppercase text-xs md:text-sm bg-primary/10 px-3 py-1 rounded">Get in Touch</span>
      <h1 class="text-4xl md:text-5xl font-serif font-bold text-primary mt-4">Contact Us</h1>
      <p class="text-gray-600 mt-4 font-sans max-w-2xl leading-relaxed">
        Have questions, feedback, or collaborative ideas? Fill out the form below or reach out directly via our official channels.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Contact Form -->
      <div class="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
        <!-- Success Alert Overlay -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="submitted" class="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8">
            <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-2xl font-serif font-bold text-primary mb-3">Message Sent Successfully!</h3>
            <p class="text-gray-600 font-sans max-w-md mb-8 leading-relaxed">
              Thank you, <span class="font-semibold text-primary">{{ formData.name }}</span>. Your inquiry regarding <span class="italic">"{{ formData.subject }}"</span> has been routed to our team. We will get back to you shortly.
            </p>
            <button 
              @click="resetForm" 
              class="bg-primary hover:bg-primary/95 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow hover:shadow-md cursor-pointer text-sm"
            >
              Send Another Message
            </button>
          </div>
        </transition>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Recipient Field (Pre-filled, disabled/readonly) -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2 font-sans">To (Recipient Email)</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input 
                type="email" 
                :value="recipientEmail" 
                disabled 
                readonly 
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-sans text-sm focus:outline-none cursor-not-allowed select-none"
              />
            </div>
            <p class="text-xs text-gray-400 mt-1 font-sans">Official organization inbox</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2 font-sans">Your Name</label>
              <input 
                type="text" 
                v-model="formData.name" 
                required 
                placeholder="John Doe" 
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-sm transition-all"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2 font-sans">Your Email Address</label>
              <input 
                type="email" 
                v-model="formData.email" 
                required 
                placeholder="you@example.com" 
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2 font-sans">Subject</label>
            <input 
              type="text" 
              v-model="formData.subject" 
              required 
              placeholder="How can we help?" 
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-sm transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2 font-sans">Message</label>
            <textarea 
              v-model="formData.message" 
              required 
              rows="6" 
              placeholder="Write your message here..." 
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-sm transition-all resize-y"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="w-full md:w-auto bg-primary hover:bg-primary/95 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow hover:shadow-md cursor-pointer text-sm font-sans"
          >
            Send Message
          </button>
        </form>
      </div>

      <!-- Info Details -->
      <div class="space-y-6">
        <!-- Address Card -->
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-accent/25 transition-colors duration-300">
          <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="text-xl font-serif font-bold text-primary mb-3">Official Headquarters</h3>
          <p class="text-gray-600 font-sans leading-relaxed text-sm">
            Astriferum Innovare Headquarters<br />
            100 Innovation Parkway<br />
            Suite 500<br />
            Silicon Valley, CA 94025
          </p>
        </div>

        <!-- Direct Contact Card -->
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-accent/25 transition-colors duration-300">
          <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 class="text-xl font-serif font-bold text-primary mb-3">Direct Channels</h3>
          <div class="text-gray-600 font-sans space-y-2 text-sm leading-relaxed">
            <p>
              <span class="font-semibold block text-primary/80">Email:</span>
              <a href="mailto:astriferuminnovare@gmail.com" class="hover:text-accent transition-colors font-medium">
                astriferuminnovare@gmail.com
              </a>
            </p>
            <p>
              <span class="font-semibold block text-primary/80">Facebook:</span>
              <a href="#" class="hover:text-accent transition-colors font-medium">
                ASTRIFERUM INNOVARE
              </a>
            </p>
            <p>
              <span class="font-semibold block text-primary/80">Phone:</span>
              <a href="tel:+15550192834" class="hover:text-accent transition-colors font-medium">
                +1 (555) 019-2834
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recipientEmail = 'astriferuminnovare@gmail.com'
const submitted = ref(false)

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  // Simulate successful submission
  submitted.value = true
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  submitted.value = false
}
</script>
