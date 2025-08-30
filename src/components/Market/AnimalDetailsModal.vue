<!-- Enhanced AnimalDetailsModal.vue -->
<template>
  <!-- Full Screen Modal Overlay with Marketplace styling -->
  <div class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm">
    <!-- Full Screen Modal Container with Marketplace background -->
    <div class="w-full h-full bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 overflow-hidden relative flex flex-col">
      
      <!-- Background Elements matching Marketplace -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
        <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
        <div class="absolute top-1/3 left-1/4 w-8 h-8 bg-emerald-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 2s"></div>
        <div class="absolute bottom-1/3 left-16 w-10 h-10 bg-teal-400/15 rounded-full blur-sm animate-pulse" style="animation-delay: 1.5s"></div>
      </div>
      
      <!-- Sticky Header matching Marketplace combined header style -->
      <div class="sticky top-0 z-50 px-4 md:px-6 pt-4 pb-2 bg-gradient-to-br from-emerald-50/95 via-teal-50/95 to-green-100/95 backdrop-blur-md border-b border-white/40">
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
          <!-- Left side - Logo and Title -->
          <div class="flex items-center min-w-0">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#fff" />
                <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
                <path d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" fill="#4ade80" />
                <path d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="#fff" />
              </svg>
            </div>
            <div class="min-w-0">
              <h1 class="text-xl font-bold text-white truncate">Animal Details</h1>
              <p class="text-green-100 text-sm opacity-90 truncate">
                {{ animal.type }} - {{ animal.breed }} | {{ animal.farmer.farmName || animal.farmer.name }}
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

        <!-- Results Summary style header -->
        <div class="mt-3 bg-white/90 backdrop-blur-sm border border-white/40 rounded-lg px-4 py-3">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-800">
                  Viewing Details
                </h3>
              </div>
            </div>

            <!-- Status and Actions -->
            <div class="flex items-center gap-2">
              <span :class="`px-2 py-1 text-xs font-bold rounded-full shadow backdrop-blur-md border ${getStatusClass(animal.status)}`">
                {{ animal.status }}
              </span>
              <div class="text-xs font-semibold text-gray-700 flex items-center gap-1">
                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ getDaysListed(animal.datePosted) }} days ago
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Scrollable Content Area -->
      <div class="flex-1 overflow-y-auto">
        <div class="px-4 md:px-6 py-4">
          <!-- Three Column Layout for Large Screens, Stacked for Mobile -->
          <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            <!-- Left Column - Image Gallery (Large on desktop) -->
            <div class="xl:col-span-5 space-y-4">
              
              <!-- Main Image Display in Card Style -->
              <div class="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-white/60 hover:border-green-300/60 transition-all duration-300 bg-white/95 backdrop-blur-sm group">
                <!-- Responsive height based on screen size -->
                <div class="relative h-64 sm:h-80 lg:h-96 xl:h-[28rem]">
                  <img 
                    :src="animal.images[currentImageIndex]" 
                    :alt="`${animal.type} - Image ${currentImageIndex + 1}`"
                    class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <div class="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10 z-10"></div>

                  <!-- Navigation Arrows -->
                  <div v-if="animal.images.length > 1" class="absolute inset-0 flex items-center justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      @click="previousImage"
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

                  <!-- Price Badge -->
                  <div class="absolute top-4 left-4 z-20">
                    <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg border border-green-500/20">
                      <span class="text-lg font-bold">₱{{ animal.price.toLocaleString() }}</span>
                    </div>
                  </div>
                </div>

                <!-- Thumbnail Gallery -->
                <div v-if="animal.images.length > 1" class="p-4 bg-white/90 backdrop-blur-sm border-t border-white/60">
                  <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                      v-for="(image, index) in animal.images"
                      :key="index"
                      @click="currentImageIndex = index"
                      :class="`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === index 
                          ? 'border-emerald-500 ring-2 ring-emerald-200/50 shadow-lg transform scale-105' 
                          : 'border-white/50 hover:border-emerald-300 hover:shadow-md opacity-70 hover:opacity-100'
                      }`"
                    >
                      <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Quick Stats Grid - Enhanced for mobile -->
              <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-3">
                <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300 hover:border-blue-300/60">
                  <div class="flex flex-col items-center text-center">
                    <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <p class="text-lg font-bold text-blue-800 mb-1">{{ animal.quantity }}</p>
                    <p class="text-xs text-blue-600 font-medium">Available</p>
                  </div>
                </div>
                
                <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300 hover:border-purple-300/60">
                  <div class="flex flex-col items-center text-center">
                    <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                      <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                      </svg>
                    </div>
                    <p class="text-lg font-bold text-purple-800 mb-1">{{ animal.weight }}kg</p>
                    <p class="text-xs text-purple-600 font-medium">Weight</p>
                  </div>
                </div>

                <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300 hover:border-pink-300/60">
                  <div class="flex flex-col items-center text-center">
                    <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-2">
                      <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p class="text-lg font-bold text-pink-800 mb-1">{{ animal.gender }}</p>
                    <p class="text-xs text-pink-600 font-medium">Gender</p>
                  </div>
                </div>
                
                <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300 hover:border-teal-300/60">
                  <div class="flex flex-col items-center text-center">
                    <div class="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-2">
                      <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p class="text-lg font-bold text-teal-800 mb-1">{{ animal.age }}</p>
                    <p class="text-xs text-teal-600 font-medium">Age</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Middle Column - Animal Details -->
            <div class="xl:col-span-4 space-y-4">
              
              <!-- Basic Info Card -->
              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Basic Information
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-sm text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 rounded-lg shadow-sm">{{ animal.type }}</span>
                    <span class="text-sm text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 rounded-lg shadow-sm">{{ animal.breed }}</span>
                  </div>
                  <p class="text-gray-700 leading-relaxed">{{ animal.description }}</p>
                </div>
              </div>

              <!-- Health Status Card -->
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  Health Status
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3 bg-white/60 rounded-lg p-3 border border-green-200/60">
                    <div class="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span class="text-green-800 font-semibold">Healthy & Vaccinated</span>
                  </div>
                  <div class="flex items-center gap-3 bg-white/60 rounded-lg p-3 border border-blue-200/60">
                    <div class="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span class="text-blue-800 font-semibold">Vet Certified</span>
                  </div>
                  <div class="flex items-center gap-3 bg-white/60 rounded-lg p-3 border border-purple-200/60">
                    <div class="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span class="text-purple-800 font-semibold">Dewormed</span>
                  </div>
                </div>
              </div>

              <!-- Location Info -->
              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3 text-gray-600">
                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-800">{{ animal.location }}</p>
                      <p class="text-sm text-gray-500">Location</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delivery Options Card -->
              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
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
                    class="px-3 py-2 bg-green-100 text-green-800 text-sm rounded-lg capitalize font-medium border border-green-200/60 hover:bg-green-200 transition-colors"
                  >
                    {{ option }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Right Column - Farmer Information -->
            <div class="xl:col-span-3 space-y-4">
              
              <!-- Farmer Information Card -->
              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300 sticky top-4">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Farmer Information
                </h3>
                
                <!-- Farmer Profile -->
                <div class="flex items-center gap-4 mb-5">
                  <div class="w-16 h-16 rounded-xl overflow-hidden border-2 border-emerald-200 shadow-md flex-shrink-0">
                    <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-lg font-bold text-gray-800 mb-1 truncate">{{ animal.farmer.farmName || animal.farmer.name }}</h4>
                    <p v-if="animal.farmer.farmName" class="text-gray-600 mb-2 text-sm truncate">{{ animal.farmer.name }}</p>
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span class="text-sm truncate">{{ animal.farmer.address }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Contact Information -->
                <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                  <div class="flex items-center justify-between mb-3">
                    <span class="font-semibold text-emerald-800">Contact Information</span>
                  </div>
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-bold text-emerald-800 text-lg">{{ animal.farmer.contact }}</p>
                      <p class="text-emerald-600 text-sm">Phone Number</p>
                    </div>
                  </div>
                  
                  <!-- Contact Action Buttons matching Marketplace style -->
                  <div class="space-y-3">
                    <button 
                      @click="openContactModal"
                      class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow hover:shadow-lg transform hover:-translate-y-0.5 border border-blue-500/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Farmer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Farmer Modal -->
    <ContactFarmerModal 
      v-if="isContactModalOpen" 
      :animal="animal"
      :currentUser="currentUser"
      @close="closeContactModal"
      @send="sendMessage"
    />

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
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">Success!</h4>
            <div class="text-xs text-gray-700 font-medium">{{ toastMessage }}</div>
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
import { ref } from 'vue';
import ContactFarmerModal from './ContactFarmerModal.vue';
import { getCurrentUser } from '../../services/user';

interface ServiceUser {
  email?: string;
  name?: string;
  displayName?: string;
  role?: string;
  isVerified?: boolean;
  [key: string]: any;
}

interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  contact: string;
  address: string;
  avatar: string;
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
}

// Props
const props = defineProps<{
  animal: Animal;
}>();

// Emits
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'contact', contactInfo: string): void;
}>();

// User state
const rawUser = getCurrentUser() as ServiceUser | null;
const currentUser = rawUser
  ? {
      ...rawUser,
      name: rawUser.name || rawUser.displayName || rawUser.email || 'User',
      email: rawUser.email || ''
    }
  : null;

// State
const currentImageIndex = ref(0);
const isContactModalOpen = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

// Methods
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.animal.images.length;
};

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? props.animal.images.length - 1 
    : currentImageIndex.value - 1;
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-green-100/90 text-green-800 border-green-300';
    case 'Low Stock':
      return 'bg-yellow-100/90 text-yellow-800 border-yellow-300';
    case 'Out of Stock':
      return 'bg-red-100/90 text-red-800 border-red-300';
    default:
      return 'bg-gray-100/90 text-gray-800 border-gray-300';
  }
};

const getDaysListed = (dateString: string) => {
  const now = new Date();
  const posted = new Date(dateString);
  const diffTime = Math.abs(now.getTime() - posted.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const openContactModal = () => {
  isContactModalOpen.value = true;
};

const closeContactModal = () => {
  isContactModalOpen.value = false;
};

const sendMessage = (messageData: { message: string; contactMethod: string }) => {
  // Show success notification
  showToastNotification(`Message sent to ${props.animal.farmer.farmName || props.animal.farmer.name} via ${messageData.contactMethod}`);
  closeContactModal();
};

const showToastNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 4000);
};
</script>