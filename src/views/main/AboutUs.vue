<!-- AboutUs.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-emerald-100 via-teal-100 to-green-200">
    <!-- Sticky Navbar -->
    <div class="sticky top-0 z-50 shadow bg-white/90 backdrop-blur-xl border-b border-white/30">
      <NavBar />
    </div>

    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-16 h-16 bg-green-400 rounded-full opacity-25 animate-bounce"></div>
      <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
      <div class="absolute bottom-24 left-24 w-20 h-20 bg-teal-400 rounded-full opacity-20 animate-ping"></div>
      <div class="absolute top-1/2 right-8 w-10 h-10 bg-green-500 rounded-full opacity-25 animate-bounce"
        style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/3 right-1/3 w-8 h-8 bg-emerald-500 rounded-full opacity-15 animate-pulse"
        style="animation-delay: 0.5s"></div>
      <div class="absolute top-1/4 left-1/4 w-14 h-14 bg-teal-400 rounded-full opacity-25 animate-bounce"
        style="animation-delay: 2s"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative py-20 px-6 text-center overflow-hidden">
      <!-- Hero Background with Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-green-600/25 via-emerald-600/15 to-teal-600/25">
        <!-- Geometric Background Elements -->
        <div class="absolute inset-0 opacity-15">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
          <div class="absolute top-1/2 left-1/3 w-32 h-32 bg-white transform rotate-45"></div>
          <div class="absolute top-1/4 right-1/4 w-24 h-24 bg-white rounded-full"></div>
        </div>
      </div>

      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-4">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="staticGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#047857" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#staticGrid)" />
        </svg>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-6 tracking-tight">
          About LivestoX
        </h1>
        <p class="text-xl text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed">
          Empowering Filipino farmers through technology and building stronger agricultural communities across the Philippines.
        </p>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="relative py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <!-- Story Content -->
          <div class="order-2 lg:order-1">
            <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-6 tracking-tight">
              Our Story
            </h2>
            <div class="space-y-6 text-gray-700 leading-relaxed">
              <p class="text-lg">
                LivestoX was born from a simple observation: Filipino farmers needed a better way to connect with buyers and fellow farmers in the digital age. Founded in 2024, we recognized the challenges faced by our agricultural communities in marketing their livestock and accessing valuable farming knowledge.
              </p>
              <p class="text-lg">
                What started as a small initiative to help local farmers in Cebu has grown into a comprehensive platform that serves agricultural communities across the Philippines. We believe that technology should serve to strengthen traditional farming practices, not replace them.
              </p>
              <p class="text-lg">
                Today, LivestoX is proud to be the bridge between tradition and innovation, helping farmers thrive in an increasingly connected world while preserving the values and practices that have sustained Filipino agriculture for generations.
              </p>
            </div>
          </div>

          <!-- Story Image -->
          <div class="order-1 lg:order-2">
            <div class="relative group">
              <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30 transition-all duration-500 hover:shadow-3xl hover:scale-105">
                <div class="aspect-w-16 aspect-h-12 bg-gradient-to-br from-green-200 to-emerald-200">
                  <div class="w-full h-64 flex items-center justify-center">
                    <div class="text-center">
                      <div class="text-6xl mb-4">🌾</div>
                      <p class="text-lg font-semibold text-green-800">Filipino Agriculture</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Floating decoration -->
              <div class="absolute -top-6 -right-6 w-12 h-12 bg-green-400 rounded-full opacity-25 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
              <div class="absolute -bottom-4 -left-4 w-8 h-8 bg-emerald-400 rounded-full opacity-30 group-hover:opacity-60 transition-all duration-500 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="relative py-20 px-6">
      <!-- Section Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-200/80 via-emerald-100/60 to-teal-200/80"></div>
      
      <div class="relative max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-4 tracking-tight">
            Mission & Vision
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Mission Card -->
          <div class="group bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/30 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
            <div class="p-8 relative">
              <!-- Background decoration -->
              <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full -translate-y-12 translate-x-12 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div class="relative z-10">
                <div class="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-800 transition-colors duration-300">
                  Our Mission
                </h3>
                
                <p class="text-gray-700 leading-relaxed">
                  To empower Filipino farmers by providing a digital platform that connects them with buyers, facilitates knowledge sharing, and promotes sustainable agricultural practices. We strive to make livestock trading more accessible, transparent, and profitable for farming communities across the Philippines.
                </p>
              </div>
            </div>
          </div>

          <!-- Vision Card -->
          <div class="group bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/30 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
            <div class="p-8 relative">
              <!-- Background decoration -->
              <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-300/30 to-emerald-300/30 rounded-full -translate-y-12 translate-x-12 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div class="relative z-10">
                <div class="w-16 h-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-800 transition-colors duration-300">
                  Our Vision
                </h3>
                
                <p class="text-gray-700 leading-relaxed">
                  To become the leading digital agricultural marketplace in the Philippines, fostering innovation while preserving traditional farming values. We envision a future where every Filipino farmer has access to modern tools and opportunities to grow their business and contribute to food security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values Section -->
    <section class="relative py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-4 tracking-tight">
            Our Core Values
          </h2>
          <p class="text-xl text-gray-700 max-w-2xl mx-auto">
            The principles that guide everything we do at LivestoX
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="value in coreValues"
            :key="value.id"
            class="group bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/30 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
          >
            <div class="p-8 text-center relative">
              <!-- Background decoration -->
              <div class="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/30 to-teal-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div class="relative z-10">
                <div class="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">{{ value.icon }}</span>
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-800 transition-colors duration-300">
                  {{ value.title }}
                </h3>
                
                <p class="text-gray-700 leading-relaxed">
                  {{ value.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="relative py-20 px-6">
      <!-- Section Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-200/80 via-emerald-100/60 to-teal-200/80"></div>
      
      <div class="relative max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-4 tracking-tight">
            Meet Our Team
          </h2>
          <p class="text-xl text-gray-700 max-w-2xl mx-auto">
            The passionate individuals behind LivestoX
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="member in teamMembers"
            :key="member.id"
            class="group bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/30 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
          >
            <div class="p-8 text-center relative">
              <!-- Background decoration -->
              <div class="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/30 to-teal-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div class="relative z-10">
                <!-- Avatar -->
                <div class="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span class="text-3xl font-bold text-white">{{ member.name.charAt(0) }}</span>
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors duration-300">
                  {{ member.name }}
                </h3>
                
                <p class="text-green-700 font-semibold mb-4">{{ member.position }}</p>
                
                <p class="text-gray-700 text-sm leading-relaxed">
                  {{ member.bio }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="relative py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-12">
          <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-6 tracking-tight">
            Join Our Community
          </h2>
          <p class="text-xl text-gray-700 mb-8 leading-relaxed">
            Ready to be part of the future of Philippine agriculture? 
            Connect with fellow farmers and discover new opportunities today.
          </p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <router-link
              to="/marketplace"
              class="group inline-flex items-center bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              Browse Marketplace
            </router-link>
            
            <router-link
              to="/forum"
              class="group inline-flex items-center bg-white/85 backdrop-blur-sm border-2 border-green-400 hover:border-green-600 text-green-800 hover:text-green-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
              </svg>
              Join Forum
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Footer -->
    <footer class="relative bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 text-white py-12 overflow-hidden">
      <!-- Footer Background Pattern -->
      <div class="absolute inset-0 opacity-8">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <!-- Floating Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-4 right-20 w-8 h-8 bg-white/8 rounded-full animate-pulse"></div>
        <div class="absolute bottom-8 left-16 w-12 h-12 bg-emerald-400/15 rounded-full animate-bounce" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 right-1/4 w-6 h-6 bg-teal-400/15 rounded-full animate-ping" style="animation-delay: 2s"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 text-center">
        <div class="mb-8">
          <h3 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 mb-4">
            LivestoX
          </h3>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Connecting farmers and buyers in the digital age. 
            Building stronger agricultural communities across the Philippines.
          </p>
        </div>

        <div class="border-t border-white/15 pt-8">
          <p class="text-gray-500">
            © 2025 LivestoX. All rights reserved. 
            <span class="text-emerald-400">Made with 💚 for Filipino farmers</span>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '../../components/NavBar.vue'

interface CoreValue {
  id: number
  title: string
  description: string
  icon: string
}

interface TeamMember {
  id: number
  name: string
  position: string
  bio: string
}

const coreValues = ref<CoreValue[]>([
  {
    id: 1,
    title: 'Trust & Transparency',
    description: 'Building confidence through honest transactions and clear communication between farmers and buyers.',
    icon: '🤝'
  },
  {
    id: 2,
    title: 'Community First',
    description: 'Putting the needs of Filipino farming communities at the center of everything we do.',
    icon: '🏘️'
  },
  {
    id: 3,
    title: 'Innovation with Tradition',
    description: 'Embracing technology while respecting and preserving traditional farming practices and values.',
    icon: '🌱'
  },
  {
    id: 4,
    title: 'Sustainability',
    description: 'Promoting environmentally responsible farming practices for future generations.',
    icon: '♻️'
  },
  {
    id: 5,
    title: 'Excellence',
    description: 'Striving for the highest quality in our platform, services, and support to our users.',
    icon: '⭐'
  },
  {
    id: 6,
    title: 'Accessibility',
    description: 'Making modern agricultural tools and opportunities available to farmers of all scales.',
    icon: '🚀'
  }
])

const teamMembers = ref<TeamMember[]>([
  {
    id: 1,
    name: 'Maria Santos',
    position: 'Founder & CEO',
    bio: 'Former agricultural engineer with 15 years of experience working with Filipino farmers. Passionate about bridging technology and traditional farming.'
  },
  {
    id: 2,
    name: 'Juan Dela Cruz',
    position: 'Head of Operations',
    bio: 'Third-generation farmer turned tech advocate. Ensures our platform meets the real needs of farming communities across the Philippines.'
  },
  {
    id: 3,
    name: 'Dr. Rosa Garcia',
    position: 'Agricultural Advisor',
    bio: 'Veterinarian and livestock expert with deep knowledge of animal health and breeding practices in tropical climates.'
  },
  {
    id: 4,
    name: 'Miguel Reyes',
    position: 'Technology Lead',
    bio: 'Full-stack developer with expertise in building scalable agricultural platforms. Focuses on user-friendly design and reliable functionality.'
  },
  {
    id: 5,
    name: 'Ana Mendoza',
    position: 'Community Manager',
    bio: 'Dedicated to fostering meaningful connections within our farming community and ensuring every voice is heard.'
  },
  {
    id: 6,
    name: 'Carlos Villanueva',
    position: 'Business Development',
    bio: 'Experienced in agricultural markets and partnerships. Works to expand LivestoX\'s reach to underserved farming regions.'
  }
])
</script>

<style scoped>
/* Custom shadow utilities */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, shadow, background-color, border-color, color, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>