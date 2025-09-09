<!-- landingPage.vue -->
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

    <!-- Section 1: Enhanced Hero Section with Hover Grid Effect -->
    <section 
      class="relative py-20 px-6 text-center overflow-hidden"
      @mousemove="updateMousePosition"
      @mouseleave="hideGrid"
    >
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

      <!-- Interactive Grid Overlay -->
      <div 
        class="absolute inset-0 pointer-events-none transition-opacity duration-300"
        :class="showGrid ? 'opacity-100' : 'opacity-0'"
      >
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gridFade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#047857" stop-opacity="0.4"/>
              <stop offset="30%" stop-color="#047857" stop-opacity="0.2"/>
              <stop offset="70%" stop-color="#047857" stop-opacity="0.1"/>
              <stop offset="100%" stop-color="#047857" stop-opacity="0"/>
            </radialGradient>
            <mask id="gridMask">
              <circle 
                :cx="mouseX" 
                :cy="mouseY" 
                r="150" 
                fill="url(#gridFade)"
              />
            </mask>
          </defs>
          <g mask="url(#gridMask)">
            <defs>
              <pattern id="hoverGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#047857" stroke-width="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hoverGrid)" />
          </g>
        </svg>
      </div>

      <!-- Background Pattern (Static) -->
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
        <div class="mb-8">
          <h1 class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-6 tracking-tight">
            Find the Right Livestock for You
          </h1>
          <p class="text-xl text-gray-800 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with trusted farmers and discover quality livestock in your area. 
            Join our thriving agricultural community today.
          </p>
        </div>

        <!-- Enhanced Search Bar -->
        <div class="relative max-w-2xl mx-auto mb-10">
          <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-2 transition-all duration-300 hover:shadow-3xl">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="relative flex-1">
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search livestock (e.g., bull, cow, goat)"
                  v-model="searchQuery"
                  class="w-full pl-12 pr-4 py-4 border-0 bg-transparent rounded-xl focus:outline-none focus:ring-0 text-lg placeholder-gray-600 text-gray-800"
                />
              </div>
              <button class="bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Search
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Auth Buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto mb-16">
          <button class="group relative overflow-hidden bg-white/85 backdrop-blur-sm border-2 border-green-400 hover:border-green-600 text-green-800 hover:text-green-900 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            <span class="relative z-10 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              Sign In
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button class="group relative overflow-hidden bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span class="relative z-10 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
              Sign Up
            </span>
          </button>
        </div>

        <!-- Animated Train Section - Fixed to span full width -->
        <div class="relative w-full h-24 overflow-hidden">
          <!-- Train Track - Fixed to span full width -->
          <div class="absolute bottom-8 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-600 opacity-80 shadow-md"></div>
          <div class="absolute bottom-7 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 opacity-90"></div>
          
          <!-- Railway Ties - Fixed to span full width -->
          <div class="absolute bottom-9 left-0 right-0 h-3">
            <div class="flex justify-between items-center h-full" style="gap: 6vw;">
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
              <div class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
            </div>
          </div>
          
          <!-- Train Container - Fixed to span full width -->
          <div class="train-container absolute bottom-4 left-0 right-0">
            <div class="train flex items-end mx-auto" style="width: fit-content;">
              <!-- Engine -->
              <div class="train-engine relative mr-1">
                <div class="engine-body bg-gradient-to-r from-red-600 to-red-700 w-20 h-12 rounded-l-xl relative shadow-lg border-2 border-red-800">
                  <!-- Engine chimney -->
                  <div class="absolute -top-4 left-4 w-4 h-6 bg-gray-800 rounded-t-full border-2 border-gray-900">
                    <!-- Smoke particles -->
                    <div class="smoke-particle absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
                    <div class="smoke-particle absolute -top-3 left-1/2 transform -translate-x-1/2" style="animation-delay: 0.3s"></div>
                    <div class="smoke-particle absolute -top-4 left-1/2 transform -translate-x-1/2" style="animation-delay: 0.6s"></div>
                  </div>
                  <!-- Engine window -->
                  <div class="absolute top-2 right-3 w-5 h-4 bg-gradient-to-b from-blue-300 to-blue-400 rounded border-2 border-gray-800 shadow-inner"></div>
                  <!-- Engine details -->
                  <div class="absolute top-6 left-2 w-3 h-3 bg-yellow-400 rounded-full border border-yellow-600"></div>
                  <div class="absolute top-6 left-7 w-2 h-6 bg-gray-700 rounded"></div>
                </div>
                <!-- Engine wheels -->
                <div class="absolute -bottom-3 left-2 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-1 bg-gray-700 rounded-full"></div>
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
                <div class="absolute -bottom-3 left-10 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-1 bg-gray-700 rounded-full"></div>
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              
              <!-- Cargo Car 1 -->
              <div class="train-car relative mr-1">
                <div class="car-body bg-gradient-to-r from-green-600 to-green-700 w-16 h-10 rounded-md relative shadow-lg border-2 border-green-800">
                  <!-- Livestock silhouettes -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-white text-lg font-bold">🐄</div>
                  </div>
                  <!-- Car details -->
                  <div class="absolute top-1 left-1 right-1 h-1 bg-green-800 rounded-full opacity-50"></div>
                </div>
                <!-- Car wheels -->
                <div class="absolute -bottom-3 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-0.5 bg-gray-700 rounded-full"></div>
                </div>
                <div class="absolute -bottom-3 right-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-0.5 bg-gray-700 rounded-full"></div>
                </div>
              </div>
              
              <!-- Cargo Car 2 -->
              <div class="train-car relative mr-1">
                <div class="car-body bg-gradient-to-r from-emerald-600 to-emerald-700 w-16 h-10 rounded-md relative shadow-lg border-2 border-emerald-800">
                  <!-- Livestock silhouettes -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-white text-lg font-bold">🐂</div>
                  </div>
                  <!-- Car details -->
                  <div class="absolute top-1 left-1 right-1 h-1 bg-emerald-800 rounded-full opacity-50"></div>
                </div>
                <!-- Car wheels -->
                <div class="absolute -bottom-3 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-0.5 bg-gray-700 rounded-full"></div>
                </div>
                <div class="absolute -bottom-3 right-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-0.5 bg-gray-700 rounded-full"></div>
                </div>
              </div>
              
              <!-- Cargo Car 3 -->
              <div class="train-car relative mr-1">
                <div class="car-body bg-gradient-to-r from-teal-600 to-teal-700 w-16 h-10 rounded-md relative shadow-lg border-2 border-teal-800">
                  <!-- Livestock silhouettes -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-white text-lg font-bold">🐐</div>
                  </div>
                  <!-- Car details -->
                  <div class="absolute top-1 left-1 right-1 h-1 bg-teal-800 rounded-full opacity-50"></div>
                </div>
                <!-- Car wheels -->
                <div class="absolute -bottom-3 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-0.5 bg-gray-700 rounded-full"></div>
                </div>
                <div class="absolute -bottom-3 right-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-0.5 bg-gray-700 rounded-full"></div>
                </div>
              </div>

              <!-- Caboose -->
              <div class="train-car relative">
                <div class="car-body bg-gradient-to-r from-orange-600 to-red-600 w-14 h-10 rounded-r-md relative shadow-lg border-2 border-orange-800">
                  <!-- Caboose window -->
                  <div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded border border-orange-900"></div>
                  <!-- Caboose details -->
                  <div class="absolute top-1 left-1 right-1 h-1 bg-orange-800 rounded-full opacity-50"></div>
                  <!-- Caboose cupola -->
                  <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-orange-700 rounded-t border-2 border-orange-900"></div>
                </div>
                <!-- Caboose wheels -->
                <div class="absolute -bottom-3 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-0.5 bg-gray-700 rounded-full"></div>
                </div>
                <div class="absolute -bottom-3 right-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-0.5 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Enhanced Best Selling Animals -->
    <section class="relative py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-4 tracking-tight">
            Best Selling Livestock
          </h2>
          <p class="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover our most popular and trusted livestock from verified farmers
          </p>
        </div>

        <!-- Enhanced Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="item in bestSellers"
            :key="item.id"
            class="group relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/30 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
          >
            <!-- Card Background Gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/30 to-teal-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            <!-- Image Container with Enhanced Effects -->
            <div class="relative overflow-hidden">
              <div class="aspect-w-16 aspect-h-12 bg-gray-200 rounded-t-3xl overflow-hidden">
                <img 
                  :src="item.image" 
                  :alt="item.name" 
                  class="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  @error="handleImageError"
                />
              </div>
              
              <!-- Overlay with gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <!-- Floating Badge -->
              <div class="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                ⭐ Popular
              </div>
            </div>

            <!-- Card Content -->
            <div class="relative p-6">
              <div class="mb-4">
                <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors duration-300">
                  {{ item.name }}
                </h3>
                <p class="text-gray-700 text-sm leading-relaxed">{{ item.description }}</p>
              </div>

              <!-- Price and Action -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-700">
                    ₱{{ item.price.toLocaleString() }}
                  </span>
                </div>
                
                <button class="bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform group-hover:scale-110 shadow-md hover:shadow-lg opacity-0 group-hover:opacity-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- View All Button with Router Link -->
        <div class="text-center mt-12">
          <router-link 
            to="/marketplace"
            class="group inline-flex items-center bg-white/85 backdrop-blur-sm border-2 border-green-400 hover:border-green-600 text-green-800 hover:text-green-900 px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View All Livestock
            <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Section 3: Enhanced Forum Preview -->
    <section class="relative py-20 px-6">
      <!-- Section Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-200/80 via-emerald-100/60 to-teal-200/80"></div>
      
      <div class="relative max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-4 tracking-tight">
            Community Forum
          </h2>
          <p class="text-xl text-gray-700 max-w-2xl mx-auto">
            Join the conversation with fellow farmers and livestock enthusiasts
          </p>
        </div>

        <!-- Enhanced Forum Posts -->
        <div class="space-y-6 mb-12">
          <div
            v-for="post in forumPosts"
            :key="post.id"
            class="group bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
          >
            <div class="p-6 relative overflow-hidden">
              <!-- Background decoration -->
              <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full -translate-y-12 translate-x-12 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div class="relative z-10">
                <div class="flex items-start justify-between mb-3">
                  <h3 class="text-xl font-bold text-gray-900 group-hover:text-green-800 transition-colors duration-300 flex-1 pr-4">
                    {{ post.title }}
                  </h3>
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center group-hover:bg-green-300 transition-colors duration-300">
                      <svg class="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <p class="text-gray-700 mb-4 leading-relaxed">{{ post.snippet }}</p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-600">
                    <div class="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-2">
                      <span class="text-white text-xs font-bold">{{ post.author.charAt(0) }}</span>
                    </div>
                    <span class="font-medium">{{ post.author }}</span>
                    <span class="mx-2">•</span>
                    <span>2 hours ago</span>
                  </div>
                  
                  <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <span class="flex items-center hover:text-green-700 transition-colors">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                      {{ post.likes }}
                    </span>
                    <span class="flex items-center hover:text-green-700 transition-colors">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      {{ post.replies }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Visit Forum Button -->
        <div class="text-center">
          <router-link
            to="/forum"
            class="group inline-flex items-center bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
            </svg>
            Join the Community Forum
            <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
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

const searchQuery = ref('')
const mouseX = ref(0)
const mouseY = ref(0)
const showGrid = ref(false)

const updateMousePosition = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top
  showGrid.value = true
}

const hideGrid = () => {
  showGrid.value = false
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/400x200/10B981/047857?text=Livestock'
}

const bestSellers = [
  {
    id: 1,
    name: 'Bull (Local Breed)',
    description: 'Strong and healthy, suitable for farm work or breeding.',
    price: 28000,
    image: '/src/assets/Bull.jpg',
  },
  {
    id: 2,
    name: 'Cow (Dairy Type)',
    description: 'High milk production, ideal for small to mid-scale farms.',
    price: 25000,
    image: '/src/assets/cow.jpg',
  },
  {
    id: 3,
    name: 'Boer Goat',
    description: 'Great for meat production and easy to maintain.',
    price: 4500,
    image: 'https://via.placeholder.com/400x200/10B981/047857?text=Goat',
  },
]

const forumPosts = [
  {
    id: 1,
    title: 'Best practices in feeding bulls?',
    snippet: 'Any affordable feeding tips that boost growth? Looking for sustainable and cost-effective methods.',
    author: 'FarmerNico',
    likes: Math.floor(Math.random() * 20) + 5,
    replies: Math.floor(Math.random() * 15) + 3,
  },
  {
    id: 2,
    title: 'Cow not producing enough milk',
    snippet: 'Looking for supplements that help dairy cows increase production naturally without harmful chemicals.',
    author: 'DairyMama',
    likes: Math.floor(Math.random() * 20) + 5,
    replies: Math.floor(Math.random() * 15) + 3,
  },
  {
    id: 3,
    title: 'How to sell livestock online?',
    snippet: 'What platforms do you use for selling animals? Need advice on digital marketing for farms.',
    author: 'TechAgriPH',
    likes: Math.floor(Math.random() * 20) + 5,
    replies: Math.floor(Math.random() * 15) + 3,
  },
]
</script>

<style scoped>
/* Train Animation - Fixed to span full width */
@keyframes trainMove {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(calc(-100% - 100vw));
  }
}

@keyframes wheelRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes smokeRise {
  0% {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(0.3);
    background-color: #d1d5db;
  }
  50% {
    opacity: 0.7;
    transform: translateY(-10px) translateX(-2px) scale(0.6);
    background-color: #9ca3af;
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) translateX(-4px) scale(1);
    background-color: #6b7280;
  }
}

/* Apply animations */
.train-container {
  animation: trainMove 15s linear infinite;
}

.wheel {
  animation: wheelRotate 0.3s linear infinite;
}

.smoke-particle {
  width: 4px;
  height: 4px;
  background-color: #d1d5db;
  border-radius: 50%;
  animation: smokeRise 1.5s ease-out infinite;
}

/* Custom shadow utilities */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>