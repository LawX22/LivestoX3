<!-- landingPage.vue - ENHANCED HERO SECTION & LIMITED CARDS -->
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

    <!-- Section 1: SUPER ENHANCED Hero Section -->
    <section 
      class="relative py-16 px-6 text-center overflow-hidden min-h-[75vh] flex items-center"
      @mousemove="updateMousePosition"
      @mouseleave="hideGrid"
    >
      <!-- Animated Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-green-600/30 via-emerald-600/20 to-teal-600/30">
        <!-- Animated Orbs -->
        <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-teal-400/30 to-green-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <!-- Geometric Background Elements with Enhanced Animation -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48 animate-float"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-32 -translate-x-32 animate-float-delayed"></div>
          <div class="absolute top-1/2 left-1/3 w-48 h-48 bg-white transform rotate-45 animate-spin-slow"></div>
          <div class="absolute top-1/4 right-1/4 w-32 h-32 bg-white rounded-full animate-pulse-slow"></div>
          <div class="absolute bottom-1/3 right-1/2 w-40 h-40 bg-white transform -rotate-12 animate-float"></div>
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
              <stop offset="0%" stop-color="#047857" stop-opacity="0.5"/>
              <stop offset="30%" stop-color="#047857" stop-opacity="0.3"/>
              <stop offset="70%" stop-color="#047857" stop-opacity="0.15"/>
              <stop offset="100%" stop-color="#047857" stop-opacity="0"/>
            </radialGradient>
            <mask id="gridMask">
              <circle 
                :cx="mouseX" 
                :cy="mouseY" 
                r="180" 
                fill="url(#gridFade)"
              />
            </mask>
          </defs>
          <g mask="url(#gridMask)">
            <defs>
              <pattern id="hoverGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#047857" stroke-width="2.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hoverGrid)" />
          </g>
        </svg>
      </div>

      <!-- Background Pattern (Static with Animation) -->
      <div class="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="staticGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#047857" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#staticGrid)" />
        </svg>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-6xl mx-auto w-full">
        <div class="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
          <!-- Logo Section - Left Side -->
          <div class="flex-shrink-0 animate-fade-in-down">
            <div class="relative group">
              <!-- Glow effect behind logo -->
              <div class="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <!-- Logo container with dark background to show white logo -->
              <div class="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 shadow-2xl border-4 border-green-500/50 group-hover:border-green-400 transition-all duration-300 group-hover:scale-105 transform">
                <img 
                  src="@/assets/Logo.png" 
                  alt="LivestoX Logo" 
                  class="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                />
              </div>
              <!-- Decorative corners -->
              <div class="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-green-500 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-teal-500 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-green-500 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Text Content - Right Side, Vertically Centered -->
          <div class="flex-1 flex flex-col justify-center">
            <!-- Main Heading with Staggered Animation -->
            <div class="mb-4 animate-fade-in text-center lg:text-left">
              <h1 class="text-5xl md:text-6xl font-black mb-5 tracking-tight leading-tight">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700">
                  Find the Right
                </span>
                <br />
                <span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700">
                  Livestock
                  <svg class="absolute -bottom-2 left-0 lg:left-0 w-full h-3" viewBox="0 0 500 20" preserveAspectRatio="none">
                    <path d="M0,10 Q250,20 500,10" stroke="url(#underlineGradient)" stroke-width="5" fill="none" stroke-linecap="round" class="animate-draw-line"/>
                    <defs>
                      <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#047857"/>
                        <stop offset="50%" stop-color="#059669"/>
                        <stop offset="100%" stop-color="#0d9488"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700">
                  for You
                </span>
              </h1>
              
              <!-- Subheading with Icon -->
              <div class="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <svg class="w-5 h-5 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <p class="text-lg md:text-xl text-gray-800 font-semibold">
                  Trusted • Verified • Community-Driven
                </p>
                <svg class="w-5 h-5 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="animation-delay: 0.2s">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>

              <p class="text-lg md:text-xl text-gray-700 leading-relaxed font-medium text-center lg:text-left">
                Connect with <span class="text-green-700 font-bold">trusted farmers</span> and discover 
                <span class="text-emerald-700 font-bold">quality livestock</span> in your area.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Stats Section - Below logo and text -->
        <div class="text-center mb-6">
          
          <!-- Subheading with Icon -->
          <div class="flex items-center justify-center gap-4 mb-6 lg:hidden">
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <p class="text-lg md:text-xl text-gray-800 font-semibold">
                Trusted • Verified • Community-Driven
              </p>
              <svg class="w-5 h-5 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="animation-delay: 0.2s">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
          </div>

          <p class="text-lg md:text-xl text-gray-700 mb-5 max-w-3xl mx-auto leading-relaxed font-medium lg:hidden">
            Connect with <span class="text-green-700 font-bold">trusted farmers</span> and discover 
            <span class="text-emerald-700 font-bold">quality livestock</span> in your area.
          </p>

          <!-- Stats Section -->
          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-green-200 transform hover:scale-105 transition-all duration-300 group">
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-2xl font-bold text-green-700">5,000+</p>
                  <p class="text-xs text-gray-600">Active Users</p>
                </div>
              </div>
            </div>

            <div class="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-emerald-200 transform hover:scale-105 transition-all duration-300 group">
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-2xl font-bold text-emerald-700">10,000+</p>
                  <p class="text-xs text-gray-600">Listings</p>
                </div>
              </div>
            </div>

            <div class="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-teal-200 transform hover:scale-105 transition-all duration-300 group">
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-2xl font-bold text-teal-700">98%</p>
                  <p class="text-xs text-gray-600">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Search Bar with Icon -->
        <div class="relative max-w-3xl mx-auto mb-8 animate-fade-in-up">
          <div class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/40 p-2 transition-all duration-300 hover:shadow-3xl hover:border-green-300 group">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="relative flex-1">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                  <svg class="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <div class="h-5 w-px bg-gray-300"></div>
                </div>
                <input
                  type="text"
                  placeholder="Search livestock (e.g., bull, cow, goat, chicken)"
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                  class="w-full pl-14 pr-4 py-4 border-0 bg-transparent rounded-2xl focus:outline-none focus:ring-0 text-base placeholder-gray-500 text-gray-800 font-medium"
                />
              </div>
              <button 
                @click="handleSearch"
                class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl whitespace-nowrap cursor-pointer group-btn"
              >
                <span class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2 group-btn-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Search Now
                </span>
              </button>
            </div>
          </div>
          
          <!-- Popular Searches -->
          <div class="mt-3 flex flex-wrap justify-center gap-2">
            <span class="text-sm text-gray-600 font-medium">Popular:</span>
            <button @click="searchQuery = 'cattle'; handleSearch()" class="text-sm px-3 py-1 bg-white/70 hover:bg-white rounded-full text-green-700 hover:text-green-800 border border-green-200 hover:border-green-400 transition-all cursor-pointer">
              🐄 Cattle
            </button>
            <button @click="searchQuery = 'goat'; handleSearch()" class="text-sm px-3 py-1 bg-white/70 hover:bg-white rounded-full text-green-700 hover:text-green-800 border border-green-200 hover:border-green-400 transition-all cursor-pointer">
              🐐 Goat
            </button>
            <button @click="searchQuery = 'pig'; handleSearch()" class="text-sm px-3 py-1 bg-white/70 hover:bg-white rounded-full text-green-700 hover:text-green-800 border border-green-200 hover:border-green-400 transition-all cursor-pointer">
              🐷 Pig
            </button>
            <button @click="searchQuery = 'chicken'; handleSearch()" class="text-sm px-3 py-1 bg-white/70 hover:bg-white rounded-full text-green-700 hover:text-green-800 border border-green-200 hover:border-green-400 transition-all cursor-pointer">
              🐔 Chicken
            </button>
          </div>
        </div>

        <!-- Enhanced Auth Buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto mb-12 animate-fade-in-up" style="animation-delay: 0.2s">
          <button @click="navigateToSignIn" class="group relative cursor-pointer overflow-hidden bg-white/90 backdrop-blur-sm border-3 border-green-400 hover:border-green-600 text-green-800 hover:text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <span class="relative z-10 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              Sign In
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button @click="navigateToSignUp" class="group relative overflow-hidden cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            <span class="relative z-10 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
              Get Started Free
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <!-- Animated Train Section -->
        <div class="relative w-full h-24 overflow-hidden">
          <!-- Train Track -->
          <div class="absolute bottom-8 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-600 opacity-80 shadow-md"></div>
          <div class="absolute bottom-7 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 opacity-90"></div>
          
          <!-- Railway Ties -->
          <div class="absolute bottom-9 left-0 right-0 h-3">
            <div class="flex justify-between items-center h-full" style="gap: 6vw;">
              <div v-for="n in 20" :key="n" class="w-8 h-full bg-amber-800 opacity-60 flex-shrink-0"></div>
            </div>
          </div>
          
          <!-- Train Container -->
          <div class="train-container absolute bottom-4 left-0 right-0">
            <div class="train flex items-end mx-auto" style="width: fit-content;">
              <!-- Engine -->
              <div class="train-engine relative mr-1">
                <div class="engine-body bg-gradient-to-r from-red-600 to-red-700 w-20 h-12 rounded-l-xl relative shadow-lg border-2 border-red-800">
                  <div class="absolute -top-4 left-4 w-4 h-6 bg-gray-800 rounded-t-full border-2 border-gray-900">
                    <div class="smoke-particle absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
                    <div class="smoke-particle absolute -top-3 left-1/2 transform -translate-x-1/2" style="animation-delay: 0.3s"></div>
                    <div class="smoke-particle absolute -top-4 left-1/2 transform -translate-x-1/2" style="animation-delay: 0.6s"></div>
                  </div>
                  <div class="absolute top-2 right-3 w-5 h-4 bg-gradient-to-b from-blue-300 to-blue-400 rounded border-2 border-gray-800 shadow-inner"></div>
                  <div class="absolute top-6 left-2 w-3 h-3 bg-yellow-400 rounded-full border border-yellow-600"></div>
                  <div class="absolute top-6 left-7 w-2 h-6 bg-gray-700 rounded"></div>
                </div>
                <div class="absolute -bottom-3 left-2 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-1 bg-gray-700 rounded-full"></div>
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
                <div class="absolute -bottom-3 left-10 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600 wheel shadow-md">
                  <div class="absolute inset-1 bg-gray-700 rounded-full"></div>
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              
              <!-- Cargo Cars -->
              <div v-for="(car, index) in cargoCars" :key="index" class="train-car relative mr-1">
                <div :class="`car-body bg-gradient-to-r ${car.color} w-16 h-10 rounded-md relative shadow-lg border-2 ${car.borderColor}`">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-white text-lg font-bold">{{ car.emoji }}</div>
                  </div>
                  <div :class="`absolute top-1 left-1 right-1 h-1 ${car.borderColor} rounded-full opacity-50`"></div>
                </div>
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
                  <div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded border border-orange-900"></div>
                  <div class="absolute top-1 left-1 right-1 h-1 bg-orange-800 rounded-full opacity-50"></div>
                  <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-orange-700 rounded-t border-2 border-orange-900"></div>
                </div>
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

    <!-- Section 2: Enhanced Best Selling Animals - LIMITED TO 3 -->
    <section class="relative py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 mb-4 tracking-tight">
            Featured Livestock
          </h2>
          <p class="text-xl text-gray-700 max-w-2xl mx-auto">
            Handpicked quality livestock from our trusted farmers
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoadingListings" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="n in 3"
            :key="`skeleton-${n}`"
            class="bg-white/95 backdrop-blur-sm rounded-3xl border border-white/60 p-4 shadow-lg animate-pulse"
          >
            <div class="w-full h-48 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-t-3xl mb-4 relative overflow-hidden">
              <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>
            <div class="space-y-3">
              <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-3/4 relative overflow-hidden">
                <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </div>
              <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-1/2 relative overflow-hidden">
                <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </div>
              <div class="h-6 bg-gradient-to-r from-green-200 to-green-300 rounded-md w-2/3 relative overflow-hidden">
                <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Cards Grid with Real Data - LIMITED TO 3 -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="item in displayedListings"
            :key="item.id"
            @click="navigateToMarketplace"
            class="group relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/30 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 cursor-pointer"
          >
            <!-- Card Background Gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/30 to-teal-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            <!-- Image Container with Enhanced Effects -->
            <div class="relative overflow-hidden">
              <div class="aspect-w-16 aspect-h-12 bg-gray-200 rounded-t-3xl overflow-hidden">
                <img 
                  :src="item.images[0]" 
                  :alt="item.title" 
                  class="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  @error="handleImageError"
                  loading="lazy"
                />
              </div>
              
              <!-- Overlay with gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <!-- Status Badge -->
              <div class="absolute top-4 right-4 z-20">
                <span
                  :class="`px-3 py-1 text-xs font-bold rounded-full shadow backdrop-blur-md border ${getStatusClass(item.status)}`">
                  {{ item.status }}
                </span>
              </div>

              <!-- Type Badge -->
              <div class="absolute top-4 left-4 z-20">
                <div
                  :class="`px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/40 flex items-center gap-1.5 ${getTypeBadgeClass(item.type)}`">
                  <span class="text-xs font-bold text-white">{{ item.type }}</span>
                </div>
              </div>

              <!-- Floating Badge -->
              <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div class="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  ⭐ Featured
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="relative p-6">
              <div class="mb-4">
                <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors duration-300">
                  {{ item.title }}
                </h3>
                <p class="text-gray-700 text-sm leading-relaxed line-clamp-2">{{ item.description }}</p>
              </div>

              <!-- Compact Info Grid -->
              <div class="grid grid-cols-2 gap-2 mb-4">
                <div class="bg-blue-50 rounded-lg px-3 py-2 border border-blue-200">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <div>
                      <p class="text-xs text-gray-600">Quantity</p>
                      <p class="text-sm font-bold text-blue-800">{{ item.quantity }}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-purple-50 rounded-lg px-3 py-2 border border-purple-200">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                    </svg>
                    <div>
                      <p class="text-xs text-gray-600">Weight</p>
                      <p class="text-sm font-bold text-purple-800">{{ item.weight }} kg</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Price and Action -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-700">
                    ₱{{ item.price.toLocaleString() }}
                  </span>
                </div>
                
                <button class="bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform group-hover:scale-110 shadow-md hover:shadow-lg opacity-0 group-hover:opacity-100 cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- View All Button -->
        <div class="text-center mt-12">
          <router-link 
            to="/marketplace"
            class="group inline-flex items-center bg-white/85 backdrop-blur-sm border-2 border-green-400 hover:border-green-600 text-green-800 hover:text-green-900 px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            View All Livestock
            <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Section 3: Enhanced Forum Preview with Real Data -->
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

        <!-- Loading State -->
        <div v-if="isLoadingQuestions" class="space-y-6 mb-12">
          <div
            v-for="n in 3"
            :key="`question-skeleton-${n}`"
            class="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/60 p-5 shadow-lg animate-pulse"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3 flex-1">
                <div class="w-10 h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-full relative overflow-hidden">
                  <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-32 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-24 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="space-y-2 mb-3">
              <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-full relative overflow-hidden">
                <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </div>
              <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-3/4 relative overflow-hidden">
                <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-gray-200">
              <div class="flex items-center gap-4">
                <div class="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                  <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
                <div class="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                  <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Forum Posts with Real Data -->
        <div v-else class="space-y-6 mb-12">
          <div
            v-for="post in displayedQuestions"
            :key="post.id"
            @click="navigateToForum"
            class="group bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
          >
            <div class="p-6 relative overflow-hidden">
              <!-- Background decoration -->
              <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full -translate-y-12 translate-x-12 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div class="relative z-10">
                <div class="flex items-start justify-between mb-3">
                  <!-- User Info -->
                  <div class="flex items-center gap-3 flex-1">
                    <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                      <span class="text-white text-sm font-bold">{{ getUserInitials(post.userFullName) }}</span>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ post.userFullName || 'Anonymous User' }}</p>
                      <p class="text-xs text-gray-500">{{ formatDate(post.createdAt) }}</p>
                    </div>
                  </div>

                  <!-- Category Badge -->
                  <div v-if="post.category" class="flex-shrink-0">
                    <span class="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-md">
                      {{ post.category }}
                    </span>
                  </div>
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-green-800 transition-colors duration-300 mb-3">
                  {{ post.title }}
                </h3>
                
                <p class="text-gray-700 mb-4 leading-relaxed line-clamp-2">{{ post.description || 'No description available' }}</p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-600 gap-4">
                    <span class="flex items-center hover:text-green-700 transition-colors">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                      {{ (post.upvotes || 0) - (post.downvotes || 0) }}
                    </span>
                    <span class="flex items-center hover:text-green-700 transition-colors">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      {{ post.answers?.length || 0 }}
                    </span>
                    <span class="flex items-center text-gray-500">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      {{ post.views || 0 }}
                    </span>
                  </div>
                  
                  <!-- Urgency Badge -->
                  <div v-if="post.urgency">
                    <span :class="`px-3 py-1 text-xs font-bold rounded-full shadow-md ${getUrgencyClass(post.urgency)}`">
                      {{ post.urgency }}
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
            class="group inline-flex items-center bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl cursor-pointer"
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
    <footer class="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 text-white overflow-hidden">
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <!-- Floating Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-8 right-20 w-12 h-12 bg-emerald-400/10 rounded-full animate-pulse"></div>
        <div class="absolute bottom-12 left-16 w-16 h-16 bg-green-400/10 rounded-full animate-bounce" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 right-1/4 w-8 h-8 bg-teal-400/10 rounded-full animate-ping" style="animation-delay: 2s"></div>
        <div class="absolute top-1/4 left-1/3 w-10 h-10 bg-emerald-400/10 rounded-full animate-pulse" style="animation-delay: 1.5s"></div>
      </div>

      <!-- Main Footer Content -->
      <div class="relative max-w-7xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <!-- Logo & Description Column -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-4 mb-6">
              <!-- Logo -->
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 group-hover:border-emerald-400/50 transition-all">
                  <img 
                    src="@/assets/Logo.png" 
                    alt="LivestoX Logo" 
                    class="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <!-- Brand Name -->
              <div>
                <h3 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300">
                  LivestoX
                </h3>
                <p class="text-emerald-400 text-sm font-semibold">Livestock Marketplace</p>
              </div>
            </div>
            <p class="text-gray-300 leading-relaxed max-w-md mb-6">
              Connecting farmers and buyers across the Philippines. Building stronger agricultural communities through technology and trust.
            </p>
            <!-- Social Media Icons -->
            <div class="flex gap-3">
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20 hover:border-emerald-400 group">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20 hover:border-emerald-400 group">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20 hover:border-emerald-400 group">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20 hover:border-emerald-400 group">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links Column -->
          <div>
            <h4 class="text-lg font-bold text-white mb-4 flex items-center">
              <span class="w-1 h-6 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full mr-2"></span>
              Quick Links
            </h4>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-emerald-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-emerald-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-emerald-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Community Forum
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-emerald-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <!-- Support Column -->
          <div>
            <h4 class="text-lg font-bold text-white mb-4 flex items-center">
              <span class="w-1 h-6 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full mr-2"></span>
              Support
            </h4>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-emerald-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-emerald-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-emerald-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-emerald-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="border-t border-white/10 pt-8 mb-8">
          <div class="max-w-2xl mx-auto text-center">
            <h4 class="text-xl font-bold text-white mb-3">Stay Updated</h4>
            <p class="text-gray-400 mb-4">Subscribe to our newsletter for the latest livestock deals and farming tips</p>
            <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm"
              />
              <button class="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/10 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-400 text-sm text-center md:text-left">
              © 2025 LivestoX. All rights reserved. 
            </p>
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm">Made with</span>
              <svg class="w-5 h-5 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span class="text-emerald-400 font-semibold text-sm">for Filipino Farmers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../../components/NavBar.vue'
import { marketplaceService } from '@/services/marketplaceService'
import { forumService } from '@/services/forumService'
import type { Animal } from '@/types/animalTypes'
import type { ForumQuestion } from '@/services/forumService'

// ===== ROUTER =====
const router = useRouter()

// ===== STATE =====
const searchQuery = ref('')
const mouseX = ref(0)
const mouseY = ref(0)
const showGrid = ref(false)
const isLoadingListings = ref(true)
const isLoadingQuestions = ref(true)
const allListings = ref<Animal[]>([])
const allQuestions = ref<ForumQuestion[]>([])

// Train cargo cars configuration
const cargoCars = [
  { emoji: '🐄', color: 'from-green-600 to-green-700', borderColor: 'border-green-800' },
  { emoji: '🐂', color: 'from-emerald-600 to-emerald-700', borderColor: 'border-emerald-800' },
  { emoji: '🐐', color: 'from-teal-600 to-teal-700', borderColor: 'border-teal-800' }
]

// ===== COMPUTED =====
const displayedListings = computed(() => {
  // CHANGED: Show only top 3 available listings instead of 6
  return allListings.value
    .filter(item => item.status === 'Available')
    .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
    .slice(0, 3)  // Limited to 3 posts
})

const displayedQuestions = computed(() => {
  // Show top 3 newest questions
  return allQuestions.value
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
})

// ===== METHODS =====
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
  img.src = 'https://placehold.co/400x200/10B981/047857?text=Livestock'
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-green-100/90 text-green-800 border-green-300'
    case 'Low Stock':
      return 'bg-yellow-100/90 text-yellow-800 border-yellow-300'
    case 'Out of Stock':
      return 'bg-red-100/90 text-red-800 border-red-300'
    default:
      return 'bg-gray-100/90 text-gray-800 border-gray-300'
  }
}

const getTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'Cattle':
      return 'bg-green-500/90 text-white'
    case 'Pig':
      return 'bg-pink-500/90 text-white'
    case 'Goat':
      return 'bg-amber-500/90 text-white'
    case 'Chicken':
      return 'bg-red-500/90 text-white'
    case 'Buffalo':
      return 'bg-blue-500/90 text-white'
    case 'Duck':
      return 'bg-indigo-500/90 text-white'
    case 'Sheep':
      return 'bg-gray-500/90 text-white'
    default:
      return 'bg-gray-500/90 text-white'
  }
}

const getUrgencyClass = (urgency: string) => {
  switch (urgency) {
    case 'Low':
      return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
    case 'Normal':
      return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
    case 'High':
      return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
    case 'Critical':
      return 'bg-gradient-to-r from-red-500 to-red-600 text-white'
    default:
      return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
  }
}

const getUserInitials = (name?: string): string => {
  if (!name) return 'U'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000
  const diffInMinutes = diffInSeconds / 60
  const diffInHours = diffInMinutes / 60
  const diffInDays = diffInHours / 24

  if (diffInMinutes < 1) {
    return 'Just now'
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}m ago`
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays)}d ago`
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}

const navigateToSignIn = () => {
  router.push('/login')
}

const navigateToSignUp = () => {
  router.push('/signUp')
}

const navigateToMarketplace = () => {
  router.push('/marketplace')
}

const navigateToForum = () => {
  router.push('/forum')
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/marketplace',
      query: { search: searchQuery.value.trim() }
    })
  } else {
    router.push('/marketplace')
  }
}

// ===== DATA FETCHING =====
const fetchListings = async () => {
  try {
    isLoadingListings.value = true
    console.log('📦 Fetching livestock listings for landing page...')
    
    const result = await marketplaceService.getAllListings()
    
    if (result.success && result.data) {
      allListings.value = result.data
      console.log(`✅ Loaded ${result.data.length} listings for landing page`)
    } else {
      console.error('❌ Failed to fetch listings:', result.error)
      allListings.value = []
    }
  } catch (error) {
    console.error('💥 Error fetching listings:', error)
    allListings.value = []
  } finally {
    isLoadingListings.value = false
  }
}

const fetchQuestions = async () => {
  try {
    isLoadingQuestions.value = true
    console.log('💬 Fetching forum questions for landing page...')
    
    const questions = await forumService.getQuestions()
    allQuestions.value = questions
    console.log(`✅ Loaded ${questions.length} questions for landing page`)
  } catch (error) {
    console.error('💥 Error fetching questions:', error)
    allQuestions.value = []
  } finally {
    isLoadingQuestions.value = false
  }
}

// ===== LIFECYCLE =====
onMounted(async () => {
  console.log('🚀 Landing page mounted, fetching data...')
  
  // Fetch data in parallel
  await Promise.all([
    fetchListings(),
    fetchQuestions()
  ])
  
  console.log('✅ Landing page data loaded')
})
</script>

<style scoped>
/* Enhanced Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-25px);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes draw-line {
  0% {
    stroke-dasharray: 0 1000;
  }
  100% {
    stroke-dasharray: 1000 0;
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply new animations */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

.animate-draw-line {
  animation: draw-line 2s ease-out forwards;
}

.animate-fade-in-down {
  animation: fade-in-down 1s ease-out;
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 1.4s ease-out;
}

/* Train Animation */
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

@keyframes shimmer {
  100% {
    transform: translateX(100%);
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