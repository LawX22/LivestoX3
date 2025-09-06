<template>
  <!-- Full Screen Modal Overlay with Marketplace styling -->
  <div v-if="isOpen" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm">
    <!-- Full Screen Modal Container with Marketplace background -->
    <div class="w-full h-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 overflow-hidden relative flex flex-col">
      
      <!-- Background Elements matching Marketplace but with amber theme -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-12 h-12 bg-amber-300/30 rounded-full blur-sm animate-pulse"></div>
        <div class="absolute bottom-24 right-24 w-16 h-16 bg-orange-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 right-8 w-6 h-6 bg-amber-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
        <div class="absolute top-1/3 left-1/4 w-8 h-8 bg-yellow-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 2s"></div>
        <div class="absolute bottom-1/3 left-16 w-10 h-10 bg-orange-400/15 rounded-full blur-sm animate-pulse" style="animation-delay: 1.5s"></div>
      </div>
      
      <!-- Sticky Header matching Marketplace combined header style -->
      <div class="sticky top-0 z-50 px-4 md:px-6 pt-4 pb-2 bg-gradient-to-br from-amber-50/95 via-orange-50/95 to-yellow-100/95 backdrop-blur-md border-b border-white/40">
        <div class="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-amber-200 shadow-lg backdrop-blur-sm">
          <!-- Left side - Logo and Title -->
          <div class="flex items-center min-w-0">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M16.5 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M16.5 14.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M16.5 22.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M20 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M20 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M4 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M4 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M7.5 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M7.5 14.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M7.5 22.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </svg>
            </div>
            <div class="min-w-0">
              <h1 class="text-xl font-bold text-white truncate">{{ animal.breed }} {{ animal.type }} - Live Auction</h1>
              <p class="text-amber-100 text-sm opacity-90 truncate">
                {{ animal.farmer.farmName || animal.farmer.name }} • {{ animal.location }}
              </p>
            </div>
          </div>

          <!-- Right side - Close Button -->
          <div class="flex items-center">
            <button 
              @click="$emit('close')" 
              class="whitespace-nowrap bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Close
            </button>
          </div>
        </div>

        <!-- Results Summary style header with Tabs -->
        <div class="mt-3 bg-white/90 backdrop-blur-sm border border-white/40 rounded-lg overflow-hidden">
            <div class="flex items-center justify-between p-4">
                
                <!-- Left: Icon + Title -->
                <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clip-rule="evenodd" />
                    </svg>
                </div>
                <h3 class="text-sm font-bold text-gray-800">
                    Live Auction - Time Remaining
                </h3>
                </div>

                <!-- Center: Tabs (wider & centered) -->
                <div class="flex justify-center space-x-2 flex-1 px-6">
                <button @click="activeTab = 'details'"
                    :class="[
                    'flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-md transition-all duration-300',
                    activeTab === 'details'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    ]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Animal Details
                </button>

                <button @click="activeTab = 'bids'"
                    :class="[
                    'flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-md transition-all duration-300',
                    activeTab === 'bids'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    ]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Bidding History
                    <span v-if="bids.length > 0"
                    class="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">{{ bids.length }}</span>
                </button>
                </div>

                <!-- Right: Status and Actions -->
                <div class="flex items-center gap-2">
                <span
                    class="px-2 py-1 text-xs font-bold rounded-full shadow backdrop-blur-md border bg-amber-100/90 text-amber-800 border-amber-300">
                    {{ getTimeRemaining() }}
                </span>
                <div class="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {{ bids.length }} bids
                </div>
                </div>
            </div>
        </div>
      </div>

      <!-- Main Scrollable Content Area -->
      <div class="flex-1 overflow-y-auto">
        <div class="px-4 md:px-6 py-4">
          
          <!-- Animal Details Tab -->
          <div v-if="activeTab === 'details'" class="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            <!-- Left Column - Image Gallery and Animal Details (Wider) -->
            <div class="lg:col-span-3 space-y-4">
              
              <!-- Main Image Display in Card Style -->
              <div class="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-white/60 hover:border-amber-300/60 transition-all duration-300 bg-white/95 backdrop-blur-sm group">
                <!-- Responsive height based on screen size -->
                <div class="relative h-64 sm:h-80 lg:h-96 xl:h-[28rem]">
                  <img 
                    :src="animal.images[currentImageIndex]" 
                    :alt="`${animal.type} - Image ${currentImageIndex + 1}`"
                    class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <div class="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-orange-600/10 z-10"></div>

                  <!-- Navigation Arrows -->
                  <div v-if="animal.images.length > 1" class="absolute inset-0 flex items-center justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      @click="prevImage"
                      class="w-12 h-12 bg-white/95 backdrop-blur-md hover:bg-white text-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 border border-white/40"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      @click="nextImage"
                      class="w-12 h-12 bg-white/95 backdrop-blur-md hover:bg-white text-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 border border-white/40"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <!-- Image Counter -->
                  <div v-if="animal.images.length > 1" class="absolute top-4 right-4 z-20">
                    <div class="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/40">
                      <span class="text-sm font-bold text-gray-700">{{ currentImageIndex + 1 }} / {{ animal.images.length }}</span>
                    </div>
                  </div>

                  <!-- Auction Badge -->
                  <div class="absolute top-4 left-4 z-20">
                    <div class="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full shadow-lg border border-amber-500/20">
                      <span class="text-lg font-bold flex items-center gap-1">
                        <svg class="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                        </svg>
                        LIVE AUCTION
                      </span>
                    </div>
                  </div>

                  <!-- Current Bid Badge -->
                  <div class="absolute bottom-4 left-4 z-20">
                    <div class="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-lg border border-green-500/20 font-bold text-sm">
                      Current: ₱{{ (animal.currentBid || animal.startingBid || 0).toLocaleString() }}
                    </div>
                  </div>
                </div>

                <!-- Thumbnail Gallery -->
                <div v-if="animal.images.length > 1" class="p-4 bg-white/90 backdrop-blur-sm border-t border-white/60">
                  <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                      v-for="(image, index) in animal.images"
                      :key="index"
                      @click="setCurrentImage(index)"
                      :class="`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === index 
                          ? 'border-amber-500 ring-2 ring-amber-200/50 shadow-lg transform scale-105' 
                          : 'border-white/50 hover:border-amber-300 hover:shadow-md opacity-70 hover:opacity-100'
                      }`"
                    >
                      <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Combined Animal Information Card -->
              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Animal Information
                </h3>
                
                <!-- Enhanced Animal Type and Breed Display -->
                <div class="space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Type -->
                    <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200/60 h-20 flex flex-col justify-center">
                      <div class="flex items-center justify-center gap-2 mb-1">
                        <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span class="text-xs font-bold text-amber-700 uppercase tracking-wide">Type:</span>
                      </div>
                      <span class="text-sm font-bold text-amber-800 text-center">{{ animal.type }}</span>
                    </div>

                    <!-- Breed -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200/60 h-20 flex flex-col justify-center">
                      <div class="flex items-center justify-center gap-2 mb-1">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-xs font-bold text-blue-700 uppercase tracking-wide">Breed:</span>
                      </div>
                      <span class="text-sm font-bold text-blue-800 text-center">{{ animal.breed }}</span>
                    </div>
                  </div>

                  <!-- Physical Details Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <!-- Weight -->
                    <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200/60 h-20 flex flex-col justify-center">
                      <div class="flex items-center justify-center gap-2 mb-1">
                        <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                        </svg>
                        <span class="text-xs font-bold text-purple-700 uppercase tracking-wide">Weight:</span>
                      </div>
                      <span class="text-sm font-bold text-purple-800 text-center">{{ animal.weight }} kg</span>
                    </div>

                    <!-- Age -->
                    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200/60 h-20 flex flex-col justify-center">
                      <div class="flex items-center justify-center gap-2 mb-1">
                        <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-xs font-bold text-emerald-700 uppercase tracking-wide">Age:</span>
                      </div>
                      <span class="text-sm font-bold text-emerald-800 text-center">{{ animal.age }}</span>
                    </div>

                    <!-- Gender -->
                    <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-200/60 h-20 flex flex-col justify-center">
                      <div class="flex items-center justify-center gap-2 mb-1">
                        <svg class="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span class="text-xs font-bold text-pink-700 uppercase tracking-wide">Gender:</span>
                      </div>
                      <span class="text-sm font-bold text-pink-800 text-center">{{ animal.gender }}</span>
                    </div>

                    <!-- Quantity -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200/60 h-20 flex flex-col justify-center">
                      <div class="flex items-center justify-center gap-2 mb-1">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span class="text-xs font-bold text-blue-700 uppercase tracking-wide">Available:</span>
                      </div>
                      <span class="text-sm font-bold text-blue-800 text-center">{{ animal.quantity }}</span>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-4">
                    <!-- Starting Bid -->
                    <div class="flex-1 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200/60 flex flex-col items-center">
                        <div class="flex items-center justify-center gap-2 mb-1">
                        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Starting Bid:</span>
                        </div>
                        <span class="text-lg font-bold text-gray-800">₱{{ (animal.startingBid || 0).toLocaleString() }}</span>
                    </div>

                    <!-- Current Bid -->
                    <div class="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200/60 flex flex-col items-center">
                        <div class="flex items-center justify-center gap-2 mb-1">
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span class="text-xs font-bold text-green-700 uppercase tracking-wide">Current Bid:</span>
                        </div>
                        <span class="text-lg font-bold text-green-800">₱{{ (animal.currentBid || animal.startingBid || 0).toLocaleString() }}</span>
                    </div>
                </div>

                  <!-- Description -->
                  <div class="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200/60">
                    <div class="flex items-center gap-2 mb-2">
                      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Description:</span>
                    </div>
                    <p class="text-gray-700 leading-relaxed text-sm">{{ animal.description }}</p>
                  </div>
                </div>

                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 mt-6">
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  Delivery Options
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="option in animal.deliveryOptions" 
                    :key="option"
                    class="px-3 py-2 bg-amber-100 text-amber-800 text-sm rounded-lg capitalize font-medium border border-amber-200/60 hover:bg-amber-200 transition-colors"
                  >
                    {{ option === 'pickup' ? 'Farm Pickup' : 'Delivery Available' }}
                  </span>
                </div>
              </div>

              <!-- Farmer Information Card -->
              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-green-100 shadow-sm">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Farmer Information
                </h3>
                
                <div class="flex items-start gap-4">
                  <div class="w-16 h-16 rounded-xl overflow-hidden border-2 border-green-200 shadow-sm">
                    <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-800">{{ animal.farmer.farmName || animal.farmer.name }}</h4>
                    <p class="text-sm text-gray-600 mb-2">{{ animal.farmer.name }}</p>
                    <div class="flex flex-wrap gap-2">
                      <div class="bg-green-100 px-3 py-1 rounded-full">
                        <span class="text-xs font-medium text-green-700">Verified Farmer</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Contact Information Section -->
                <div class="mt-4 space-y-3">
                  <h4 class="text-md font-bold text-gray-800 flex items-center gap-2">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Information
                  </h4>
                  
                  <!-- Phone Number -->
                  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200/60">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="font-bold text-blue-800 text-sm">{{ animal.farmer.contact }}</p>
                        <p class="text-blue-600 text-xs">Mobile Number</p>
                      </div>
                    </div>
                  </div>

                  <!-- Location Information -->
                  <div class="space-y-3">
                    <h4 class="text-md font-bold text-gray-800 flex items-center gap-2">
                      <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Location
                    </h4>
                    
                    <!-- Full Address Card -->
                    <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200/60">
                      <div class="flex items-start gap-3">
                        <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div class="flex-1">
                          <p class="font-bold text-orange-800 text-sm leading-relaxed">{{ animal.location }}</p>
                          <p class="text-orange-600 text-xs mt-1">Farm Address</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - NEW Bidding Panel -->
            <div class="lg:col-span-2 space-y-6">
              
              <!-- NEW Bidding Information -->
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 shadow-lg">
                <h3 class="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                  Auction Status
                </h3>

                <!-- Current Bid Display -->
                <div class="bg-white/80 rounded-lg p-4 mb-4 border border-amber-300/50">
                  <div class="text-center">
                    <div class="text-sm text-amber-600 font-medium">Current Highest Bid</div>
                    <div class="text-3xl font-black text-amber-800">₱{{ (animal.currentBid || animal.startingBid || 0).toLocaleString() }}</div>
                    <div class="text-xs text-amber-600 mt-1">{{ animal.bidCount || 0 }} bid{{ (animal.bidCount || 0) !== 1 ? 's' : '' }} placed</div>
                  </div>
                </div>

                <!-- Starting Bid Info -->
                <div class="bg-amber-100/50 rounded-lg p-3 mb-4 border border-amber-200">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-amber-700">Starting Bid:</span>
                    <span class="font-bold text-amber-800">₱{{ (animal.startingBid || 0).toLocaleString() }}</span>
                  </div>
                </div>

                <!-- Minimum Bid Increment -->
                <div class="bg-amber-100/50 rounded-lg p-3 mb-4 border border-amber-200">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-amber-700">Minimum Increment:</span>
                    <span class="font-bold text-amber-800">₱{{ minimumIncrement.toLocaleString() }}</span>
                  </div>
                </div>

                <!-- Bidding Form -->
                <div v-if="!isAuctionEnded" class="space-y-4">
                  <div v-if="!currentUser?.email" class="text-center">
                    <p class="text-sm text-amber-700 mb-3">Sign in to place bids</p>
                    <button @click="$emit('redirectToLogin')" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                      Sign In to Bid
                    </button>
                  </div>
                  
                  <div v-else>
                    <!-- Quick Bid Buttons -->
                    <div class="grid grid-cols-2 gap-2 mb-4">
                      <button 
                        v-for="increment in quickBidIncrements" 
                        :key="increment"
                        @click="setBidAmount(increment)"
                        class="bg-amber-200/60 hover:bg-amber-300/80 text-amber-800 px-3 py-2 rounded-lg text-sm font-semibold transition-all border border-amber-300/50 hover:border-amber-400"
                      >
                        +₱{{ increment.toLocaleString() }}
                      </button>
                    </div>

                    <!-- Bid Input -->
                    <div>
                      <label class="block text-sm font-medium text-amber-700 mb-2">Your Bid Amount</label>
                      <div class="relative">
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 font-medium">₱</span>
                        <input 
                          v-model="bidAmount" 
                          type="number" 
                          :min="minimumBidAmount"
                          :step="minimumIncrement"
                          class="w-full pl-8 pr-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 bg-white/80 font-semibold text-amber-800"
                          placeholder="Enter your bid"
                        />
                      </div>
                      <p class="text-xs text-amber-600 mt-1">
                        Minimum bid: ₱{{ minimumBidAmount.toLocaleString() }}
                      </p>
                    </div>

                    <!-- Bid Validation -->
                    <div v-if="bidError" class="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm">
                      {{ bidError }}
                    </div>

                    <!-- Place Bid Button -->
                    <button 
                      @click="placeBid"
                      :disabled="!bidAmount || bidAmount < minimumBidAmount || !!bidError"
                      :class="`w-full px-4 py-3 rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                        !bidAmount || bidAmount < minimumBidAmount || !!bidError
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:shadow-xl transform hover:scale-105'
                      }`"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Place Bid - ₱{{ bidAmount ? Number(bidAmount).toLocaleString() : '0' }}
                    </button>
                  </div>
                </div>

                <!-- Auction Ended State -->
                <div v-else class="text-center">
                  <div class="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    <div class="font-bold">Auction Ended</div>
                    <div class="text-sm mt-1">Final bid: ₱{{ (animal.currentBid || animal.startingBid || 0).toLocaleString() }}</div>
                  </div>
                </div>
              </div>

              <!-- Recent Bids -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Recent Bids
                </h3>
                
                <div class="space-y-2 max-h-48 overflow-y-auto">
                  <div v-for="(bid, index) in recentBids" :key="index" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {{ bid.bidder.charAt(0) }}
                      </div>
                      <div>
                        <div class="text-sm font-semibold text-gray-800">{{ bid.bidder }}</div>
                        <div class="text-xs text-gray-500">{{ bid.timeAgo }}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-sm font-bold text-green-600">₱{{ bid.amount.toLocaleString() }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delivery Options -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Delivery Options
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="option in animal.deliveryOptions" :key="option" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                    {{ option === 'pickup' ? 'Farm Pickup' : 'Delivery Available' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bidding History Tab -->
          <div v-else-if="activeTab === 'bids'" class="space-y-4">
            
            <!-- Bidding Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-gray-800">{{ bids.length }}</p>
                    <p class="text-sm text-gray-600">Total Bids</p>
                  </div>
                </div>
              </div>

              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-gray-800">₱{{ highestBid.toLocaleString() }}</p>
                    <p class="text-sm text-gray-600">Highest Bid</p>
                  </div>
                </div>
              </div>

              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-gray-800">{{ uniqueBidders }}</p>
                    <p class="text-sm text-gray-600">Unique Bidders</p>
                  </div>
                </div>
              </div>

              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-gray-800">₱{{ averageBid.toLocaleString() }}</p>
                    <p class="text-sm text-gray-600">Average Bid</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Filter and Search Section -->
            <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md mb-6">
              <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
                
                <!-- Search Bar -->
                <div class="flex-1">
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input 
                      v-model="searchQuery" 
                      type="text" 
                      placeholder="Search bidders by name or email..."
                      class="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2 bg-white/80 backdrop-blur-sm border text-sm"
                    />
                  </div>
                </div>

                <!-- Sort Options -->
                <div class="flex gap-2">
                  <select 
                    v-model="sortBy" 
                    class="rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2 bg-white/80 backdrop-blur-sm border text-sm"
                  >
                    <option value="amount-desc">Highest Amount</option>
                    <option value="amount-asc">Lowest Amount</option>
                    <option value="time-desc">Latest First</option>
                    <option value="time-asc">Oldest First</option>
                    <option value="bidder">Bidder Name</option>
                  </select>

                  <!-- Amount Range Filter -->
                  <select 
                    v-model="amountFilter" 
                    class="rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2 bg-white/80 backdrop-blur-sm border text-sm"
                  >
                    <option value="all">All Amounts</option>
                    <option value="low">Below ₱50,000</option>
                    <option value="medium">₱50,000 - ₱100,000</option>
                    <option value="high">Above ₱100,000</option>
                  </select>
                </div>

                <!-- Clear Filters -->
                <button 
                  v-if="searchQuery || amountFilter !== 'all' || sortBy !== 'amount-desc'"
                  @click="clearFilters"
                  class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm transition-colors duration-200 flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              </div>
            </div>

            <!-- Bidding History List with Scrollable Table -->
            <div class="bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 shadow-md overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200/60">
                <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  Bidding History
                  <span class="text-sm font-normal text-gray-500">({{ filteredBids.length }} of {{ bids.length }})</span>
                </h3>
              </div>

              <!-- Scrollable Table Container -->
              <div class="overflow-y-auto max-h-96">
                <!-- No Results Message -->
                <div v-if="filteredBids.length === 0" class="p-8 text-center">
                  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-800 mb-2">No bids found</h4>
                  <p class="text-gray-600">
                    {{ bids.length === 0 ? 'No bids have been placed on this auction yet.' : 'Try adjusting your filters to see more results.' }}
                  </p>
                </div>

                <!-- Bid List -->
                <div v-else class="divide-y divide-gray-200/60">
                  <div 
                    v-for="(bid, index) in filteredBids" 
                    :key="bid.id"
                    class="p-4 hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/50 transition-all duration-300 group"
                  >
                    <div class="flex items-center justify-between">
                      <!-- Bidder Info -->
                      <div class="flex items-center gap-3 flex-1">
                        <!-- Rank Badge -->
                        <div :class="[
                          'flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold',
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg' :
                          index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-md' :
                          index === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-md' :
                          'bg-gradient-to-br from-blue-100 to-indigo-200 text-blue-800'
                        ]">
                          {{ index + 1 }}
                        </div>

                        <!-- Avatar -->
                        <div class="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-sm group-hover:border-amber-300 transition-all duration-300">
                          <img :src="bid.user.avatar" :alt="bid.user.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>

                        <!-- User Details -->
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2">
                            <h4 class="font-bold text-gray-800 text-sm truncate group-hover:text-amber-700 transition-colors duration-300">
                              {{ bid.user.name }}
                            </h4>
                            <!-- Winner Badge -->
                            <span v-if="index === 0" class="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-sm">
                              Leading
                            </span>
                            <!-- Recent Bid Badge -->
                            <span v-if="isRecentBid(bid.timestamp)" class="px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-sm">
                              New
                            </span>
                          </div>
                          <p class="text-gray-600 text-xs truncate">{{ bid.user.email }}</p>
                          <p class="text-gray-500 text-xs">{{ formatTimeAgo(bid.timestamp) }}</p>
                        </div>
                      </div>

                      <!-- Bid Amount and Actions -->
                      <div class="text-right">
                        <div class="flex items-center gap-3">
                          <!-- Bid Amount -->
                          <div>
                            <p class="text-lg font-bold text-gray-800">₱{{ bid.amount.toLocaleString() }}</p>
                            <p v-if="bid.previousBid" class="text-xs text-gray-500">
                              +₱{{ (bid.amount - bid.previousBid).toLocaleString() }}
                            </p>
                          </div>

                          <!-- Actions -->
                          <div class="flex flex-col gap-1">
                            <button 
                              @click="viewBidderProfile(bid.user.id)"
                              class="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200 group"
                              title="View profile"
                            >
                              <svg class="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </button>
                            <button 
                              @click="contactBidder(bid.user)"
                              class="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors duration-200 group"
                              title="Contact bidder"
                            >
                              <svg class="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Load More Button (if there are more bids) -->
              <div v-if="filteredBids.length < bids.length && filteredBids.length >= 10" class="p-4 border-t border-gray-200/60 text-center">
                <button 
                  @click="loadMoreBids"
                  class="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Load More Bids
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-[110]">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">Bid Placed!</h4>
            <div class="text-xs text-gray-700 font-medium">Your bid of ₱{{ bidAmount?.toLocaleString() }} has been placed successfully.</div>
          </div>
          <button @click="showToast = false" class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded-md">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  contact: string;
  address: string;
  avatar: string;
  email?: string;
}

interface Animal {
  id: number;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  status: string;
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
  location: string;
  isAuction?: boolean;
  startingBid?: number;
  currentBid?: number;
  bidCount?: number;
  endTime?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface Bid {
  id: number;
  amount: number;
  timestamp: string;
  user: User;
  previousBid?: number;
}

interface ServiceUser {
  email?: string;
  name?: string;
  displayName?: string;
  role?: string;
  isVerified?: boolean;
  [key: string]: any;
}

const props = defineProps<{
  animal: Animal;
  isOpen: boolean;
  currentUser: ServiceUser | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'placeBid', bidData: { animalId: number; amount: number }): void;
  (e: 'redirectToLogin'): void;
}>();

const router = useRouter();

// Reactive state from both components
const currentImageIndex = ref(0);
const bidAmount = ref<number | null>(null);
const showToast = ref(false);
const activeTab = ref<'details' | 'bids'>('details');
const searchQuery = ref('');
const sortBy = ref('amount-desc');
const amountFilter = ref('all');

// Mock bids (replace with API data later)
const bids = ref<Bid[]>([
  {
    id: 1,
    amount: 120000,
    timestamp: '2024-01-15T10:30:00Z',
    user: {
      id: 1,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=150&h=150&fit=crop&crop=face'
    },
    previousBid: 110000
  },
  {
    id: 2,
    amount: 110000,
    timestamp: '2024-01-15T09:15:00Z',
    user: {
      id: 2,
      name: 'Juan Dela Cruz',
      email: 'juan.delacruz@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    previousBid: 95000
  },
  {
    id: 3,
    amount: 95000,
    timestamp: '2024-01-15T08:45:00Z',
    user: {
      id: 3,
      name: 'Ana Reyes',
      email: 'ana.reyes@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    previousBid: 85000
  },
  {
    id: 4,
    amount: 85000,
    timestamp: '2024-01-14T16:20:00Z',
    user: {
      id: 4,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    previousBid: 75000
  },
  {
    id: 5,
    amount: 75000,
    timestamp: '2024-01-14T14:10:00Z',
    user: {
      id: 1,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=150&h=150&fit=crop&crop=face'
    },
    previousBid: 65000
  }
]);

// Computed properties from new component
const minimumIncrement = computed(() => {
  const currentBid = props.animal.currentBid || props.animal.startingBid || 0;
  if (currentBid < 10000) return 500;
  if (currentBid < 50000) return 1000;
  if (currentBid < 100000) return 2500;
  return 5000;
});

const minimumBidAmount = computed(() => {
  const currentBid = props.animal.currentBid || props.animal.startingBid || 0;
  return currentBid + minimumIncrement.value;
});

const quickBidIncrements = computed(() => [
  minimumIncrement.value,
  minimumIncrement.value * 2,
  minimumIncrement.value * 5,
  minimumIncrement.value * 10
]);

const isAuctionEnded = computed(() => {
  if (!props.animal.endTime) return false;
  return new Date(props.animal.endTime).getTime() <= Date.now();
});

const bidError = computed(() => {
  if (!bidAmount.value) return null;
  if (bidAmount.value < minimumBidAmount.value) {
    return `Minimum bid is ₱${minimumBidAmount.value.toLocaleString()}`;
  }
  if (bidAmount.value % minimumIncrement.value !== 0) {
    return `Bid must be in increments of ₱${minimumIncrement.value.toLocaleString()}`;
  }
  return null;
});

// Mock recent bids data from new component
const recentBids = computed(() => [
  { bidder: 'Juan D.', amount: props.animal.currentBid || props.animal.startingBid || 0, timeAgo: '2 min ago' },
  { bidder: 'Maria S.', amount: (props.animal.currentBid || props.animal.startingBid || 0) - minimumIncrement.value, timeAgo: '5 min ago' },
  { bidder: 'Pedro R.', amount: (props.animal.currentBid || props.animal.startingBid || 0) - (minimumIncrement.value * 2), timeAgo: '8 min ago' },
  { bidder: 'Ana C.', amount: (props.animal.currentBid || props.animal.startingBid || 0) - (minimumIncrement.value * 3), timeAgo: '12 min ago' }
].filter(bid => bid.amount >= (props.animal.startingBid || 0)));

// Computed properties from old component
const highestBid = computed(() =>
  bids.value.length > 0 ? Math.max(...bids.value.map(bid => bid.amount)) : props.animal.startingBid || 0
);

const uniqueBidders = computed(() => {
  const uniqueUserIds = new Set(bids.value.map(bid => bid.user.id));
  return uniqueUserIds.size;
});

const averageBid = computed(() => {
  if (bids.value.length === 0) return props.animal.startingBid || 0;
  const total = bids.value.reduce((sum, bid) => sum + bid.amount, 0);
  return Math.round(total / bids.value.length);
});

const filteredBids = computed(() => {
  let filtered = [...bids.value];

  // Search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(bid =>
      bid.user.name.toLowerCase().includes(query) ||
      bid.user.email.toLowerCase().includes(query)
    );
  }

  // Amount filter
  if (amountFilter.value !== 'all') {
    filtered = filtered.filter(bid => {
      switch (amountFilter.value) {
        case 'low':
          return bid.amount < 50000;
        case 'medium':
          return bid.amount >= 50000 && bid.amount <= 100000;
        case 'high':
          return bid.amount > 100000;
        default:
          return true;
      }
    });
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'amount-desc': return b.amount - a.amount;
      case 'amount-asc': return a.amount - b.amount;
      case 'time-desc': return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'time-asc': return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case 'bidder': return a.user.name.localeCompare(b.user.name);
      default: return 0;
    }
  });

  return filtered;
});

// Methods from both components
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.animal.images.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + props.animal.images.length) % props.animal.images.length;
};

const setCurrentImage = (index: number) => {
  currentImageIndex.value = index;
};

const getTimeRemaining = (): string => {
  if (!props.animal.endTime) return 'No end time';
  
  const now = new Date().getTime();
  const end = new Date(props.animal.endTime).getTime();
  const timeLeft = end - now;
  
  if (timeLeft <= 0) return 'Auction Ended';
  
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s left`;
  } else {
    return `${seconds}s left`;
  }
};

const setBidAmount = (increment: number) => {
  bidAmount.value = minimumBidAmount.value + increment - minimumIncrement.value;
};

const placeBid = () => {
  if (!bidAmount.value || bidAmount.value < minimumBidAmount.value || bidError.value) {
    return;
  }
  
  emit('placeBid', {
    animalId: props.animal.id,
    amount: bidAmount.value
  });
  
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 4000);
  
  // Reset bid amount after placing bid
  bidAmount.value = null;
};

const clearFilters = () => {
  searchQuery.value = '';
  amountFilter.value = 'all';
  sortBy.value = 'amount-desc';
};

const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const bidTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - bidTime.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

const isRecentBid = (timestamp: string): boolean => {
  const now = new Date();
  const bidTime = new Date(timestamp);
  const diffInMinutes = (now.getTime() - bidTime.getTime()) / (1000 * 60);
  return diffInMinutes < 30;
};

const viewBidderProfile = (userId: number) => {
  router.push({ name: 'UserProfile', params: { id: userId } });
};

const contactBidder = (user: User) => {
  if (user.email) {
    const subject = encodeURIComponent(`Regarding ${props.animal.type} Auction - ${props.animal.breed}`);
    const body = encodeURIComponent(
      `Hello ${user.name},\n\nI saw your bid on the ${props.animal.type} (${props.animal.breed}) auction. I wanted to reach out regarding this.\n\nBest regards`
    );
    window.open(`mailto:${user.email}?subject=${subject}&body=${body}`, '_self');
  }
};

const loadMoreBids = () => {
  console.log("Load more bids"); // Hook for API pagination
};

// Watchers
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    currentImageIndex.value = 0;
    bidAmount.value = null;
    activeTab.value = 'details';
  }
});

// Init
onMounted(() => {
  bidAmount.value = null;
});
</script>