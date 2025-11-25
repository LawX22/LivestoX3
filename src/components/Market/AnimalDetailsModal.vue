<!-- AnimalDetailsModal.vue - COMPACT VERSION -->
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
      
      <!-- Compact Sticky Header -->
      <div class="sticky top-0 z-50 px-3 md:px-4 pt-3 pb-2 bg-gradient-to-br from-emerald-50/95 via-teal-50/95 to-green-100/95 backdrop-blur-md border-b border-white/40">
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-3 rounded-xl flex flex-row justify-between items-center gap-3 border border-green-200 shadow-lg backdrop-blur-sm">
          <!-- Left side - Back Arrow and Title -->
          <div class="flex items-center min-w-0">
            <!-- Back Arrow Button -->
            <button 
              @click="$emit('close')" 
              class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center mr-2 backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
              title="Go back"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-2 backdrop-blur-sm shadow-lg">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#fff" />
                <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
                <path d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" fill="#4ade80" />
                <path d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="#fff" />
              </svg>
            </div>
            <div class="min-w-0">
              <h1 class="text-lg font-bold text-white truncate cursor-default">{{ animal.title || getModalTitle(animal) }}</h1>
              <p class="text-green-100 text-xs opacity-90 truncate cursor-default">
                {{ animal.farmer.farmName || animal.farmer.name }} • {{ formatLocation(animal) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Compact Results Summary -->
        <div class="mt-2 bg-white/90 backdrop-blur-sm border border-white/40 rounded-lg px-3 py-2">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="text-xs font-bold text-gray-800 cursor-default">
                  Viewing Details
                </h3>
              </div>
            </div>

            <!-- Status and Date -->
            <div class="flex items-center gap-2 flex-wrap">
              <span :class="`px-2 py-1 text-xs font-bold rounded-full shadow backdrop-blur-md border cursor-default ${getStatusClass(animal.status)}`">
                {{ animal.status }}
              </span>
              <div class="text-xs font-semibold text-gray-700 flex items-center gap-1 cursor-default">
                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(animal.datePosted) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Scrollable Content Area -->
      <div class="flex-1 overflow-y-auto">
        <div class="px-3 md:px-4 py-3">
          <!-- Two Column Layout - Adjusted grid ratios for compact display -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
            
            <!-- Left Column - Image Gallery and Animal Details (Wider) -->
            <div class="lg:col-span-2 space-y-3">
              
              <!-- Main Image Display in Card Style -->
              <div class="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl border border-white/60 hover:border-green-300/60 transition-all duration-300 bg-white/95 backdrop-blur-sm group">
                <!-- Compact responsive height -->
                <div class="relative h-48 sm:h-60 lg:h-72">
                  <img 
                    :src="animal.images[currentImageIndex]" 
                    :alt="`${animal.type} - Image ${currentImageIndex + 1}`"
                    class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 cursor-default"
                    loading="lazy"
                  />
                  
                  <div class="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10 z-10 pointer-events-none"></div>

                  <!-- Navigation Arrows -->
                  <div v-if="animal.images.length > 1" class="absolute inset-0 flex items-center justify-between px-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      @click="previousImage"
                      class="w-10 h-10 bg-white/95 backdrop-blur-md hover:bg-white text-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 border border-white/40 cursor-pointer"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      @click="nextImage"
                      class="w-10 h-10 bg-white/95 backdrop-blur-md hover:bg-white text-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 border border-white/40 cursor-pointer"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <!-- Image Counter -->
                  <div v-if="animal.images.length > 1" class="absolute top-3 right-3 z-20">
                    <div class="bg-white/95 backdrop-blur-md px-2 py-1 rounded-full shadow-lg border border-white/40 cursor-default">
                      <span class="text-xs font-bold text-gray-700">{{ currentImageIndex + 1 }} / {{ animal.images.length }}</span>
                    </div>
                  </div>

                  <!-- Price Badge -->
                  <div class="absolute top-3 left-3 z-20">
                    <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1.5 rounded-full shadow-lg border border-green-500/20 cursor-default">
                      <span class="text-sm font-bold">₱{{ animal.price.toLocaleString() }}</span>
                      <span class="text-xs ml-1">{{ animal.priceUnit || 'per head' }}</span>
                    </div>
                  </div>

                  <!-- Type Badge -->
                  <div class="absolute bottom-3 left-3 z-20">
                    <div :class="`px-2 py-1 rounded-full shadow-lg border font-bold text-xs cursor-default ${getTypeBadgeClassForImage(animal.type)}`">
                      {{ animal.type }}
                    </div>
                  </div>
                </div>

                <!-- Thumbnail Gallery -->
                <div v-if="animal.images.length > 1" class="p-3 bg-white/90 backdrop-blur-sm border-t border-white/60">
                  <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    <button
                      v-for="(image, index) in animal.images"
                      :key="index"
                      @click="currentImageIndex = index"
                      :class="`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        currentImageIndex === index 
                          ? 'border-emerald-500 ring-1 ring-emerald-200/50 shadow-md transform scale-105' 
                          : 'border-white/50 hover:border-emerald-300 hover:shadow-sm opacity-70 hover:opacity-100'
                      }`"
                    >
                      <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Combined Animal Information Card -->
              <div class="bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2 cursor-default">
                  <div class="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Animal Information
                </h3>
                
                <!-- Enhanced Animal Type and Breed Display -->
                <div class="space-y-3">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <!-- Type -->
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200/60 h-16 flex flex-col justify-center cursor-default">
                      <div class="flex items-center justify-center gap-1 mb-1">
                        <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span class="text-xs font-bold text-green-700 uppercase tracking-wide">Type:</span>
                      </div>
                      <span class="text-sm font-bold text-green-800 text-center">{{ animal.type }}</span>
                    </div>

                    <!-- Breed -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200/60 h-16 flex flex-col justify-center cursor-default">
                      <div class="flex items-center justify-center gap-1 mb-1">
                        <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-xs font-bold text-blue-700 uppercase tracking-wide">Breed:</span>
                      </div>
                      <span class="text-sm font-bold text-blue-800 text-center">{{ animal.breed }}</span>
                    </div>
                  </div>

                  <!-- Physical Details Grid with Equal Heights -->
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <!-- Weight -->
                    <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-3 border border-purple-200/60 h-16 flex flex-col justify-center cursor-default">
                      <div class="flex items-center justify-center gap-1 mb-1">
                        <svg class="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                        </svg>
                        <span class="text-xs font-bold text-purple-700 uppercase tracking-wide">Weight:</span>
                      </div>
                      <span class="text-sm font-bold text-purple-800 text-center">{{ animal.weight }} {{ animal.weightUnit || 'kg' }}</span>
                    </div>

                    <!-- Age -->
                    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200/60 h-16 flex flex-col justify-center cursor-default">
                      <div class="flex items-center justify-center gap-1 mb-1">
                        <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-xs font-bold text-emerald-700 uppercase tracking-wide">Age:</span>
                      </div>
                      <span class="text-sm font-bold text-emerald-800 text-center">{{ animal.age }}</span>
                    </div>

                    <!-- Gender -->
                    <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-3 border border-pink-200/60 h-16 flex flex-col justify-center cursor-default">
                      <div class="flex items-center justify-center gap-1 mb-1">
                        <svg class="w-3.5 h-3.5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span class="text-xs font-bold text-pink-700 uppercase tracking-wide">Gender:</span>
                      </div>
                      <span class="text-sm font-bold text-pink-800 text-center">{{ animal.gender }}</span>
                    </div>

                    <!-- Quantity -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200/60 h-16 flex flex-col justify-center cursor-default">
                      <div class="flex items-center justify-center gap-1 mb-1">
                        <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span class="text-xs font-bold text-blue-700 uppercase tracking-wide">Available:</span>
                      </div>
                      <span class="text-sm font-bold text-blue-800 text-center">{{ animal.quantity }}</span>
                    </div>
                  </div>

                  <!-- Health Status Section -->
                  <div v-if="animal.healthStatus && animal.healthStatus.length > 0" class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200/60">
                    <h4 class="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2 cursor-default">
                      <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Health Status
                    </h4>
                    <div class="flex flex-wrap gap-1">
                      <span 
                        v-for="(status, index) in animal.healthStatus" 
                        :key="index"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200/60 cursor-default"
                      >
                        <svg class="w-2.5 h-2.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {{ status }}
                      </span>
                    </div>
                  </div>

                  <!-- Description -->
                  <div class="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-3 border border-gray-200/60">
                    <div class="flex items-center gap-2 mb-1 cursor-default">
                      <svg class="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Description:</span>
                    </div>
                    <p class="text-gray-700 leading-relaxed text-xs cursor-text select-text">{{ animal.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Delivery Options Card -->
              <div class="bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2 cursor-default">
                  <div class="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  Delivery Options
                </h3>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="option in animal.deliveryOptions" 
                    :key="option"
                    class="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-md font-medium border border-orange-200/60 hover:bg-orange-200 transition-colors cursor-default"
                  >
                    {{ formatDeliveryOption(option) }}
                  </span>
                </div>
              </div>

              <!-- Payment Methods Card - ALWAYS DISPLAY -->
              <div class="bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2 cursor-default">
                  <div class="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  Accepted Payment Methods
                </h3>
                <div v-if="animal.paymentMethods && animal.paymentMethods.length > 0" class="flex flex-wrap gap-1">
                  <span 
                    v-for="method in animal.paymentMethods" 
                    :key="method"
                    class="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md font-medium border border-purple-200/60 hover:bg-purple-200 transition-colors cursor-default"
                  >
                    <svg class="w-2.5 h-2.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    {{ formatPaymentMethod(method) }}
                  </span>
                </div>
                <div v-else class="bg-gray-50 rounded-lg p-3 border border-gray-200/60">
                  <p class="text-xs text-gray-600 text-center cursor-default">No payment methods specified. Please contact the farmer for payment details.</p>
                </div>
              </div>
            </div>

            <!-- Right Column - Purchase Options and Farmer Information (Narrower) -->
            <div class="lg:col-span-2 space-y-3">
              
              <!-- Purchase Options Card -->
              <div class="bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2 cursor-default">
                  <div class="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                  </div>
                  Purchase Options
                </h3>

                <!-- Quantity Selector -->
                <div class="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-3 border border-gray-200/60 mb-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold text-gray-700 cursor-default">Quantity</span>
                    <span class="text-xs text-gray-500 cursor-default">Available: {{ animal.quantity }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button 
                      @click="decreaseQuantity"
                      :disabled="selectedQuantity <= 1"
                      class="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                    >
                      <svg class="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <div class="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-center">
                      <input 
                        v-model.number="selectedQuantity"
                        type="number" 
                        :min="1" 
                        :max="animal.quantity"
                        class="w-full text-center font-bold text-gray-800 bg-transparent outline-none text-sm cursor-text"
                        @blur="validateQuantity"
                      />
                    </div>
                    <button 
                      @click="increaseQuantity"
                      :disabled="selectedQuantity >= animal.quantity"
                      class="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                    >
                      <svg class="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Total Price Display -->
                <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200/60 mb-3">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-semibold text-emerald-700 cursor-default">Unit Price</span>
                    <span class="text-sm font-bold text-emerald-800 cursor-default">₱{{ animal.price.toLocaleString() }} {{ animal.priceUnit || 'per head' }}</span>
                  </div>
                  <div class="border-t border-emerald-200 pt-1 mt-1">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-semibold text-emerald-700 cursor-default">Total Price</span>
                      <span class="text-lg font-bold text-emerald-800 cursor-default">₱{{ (animal.price * selectedQuantity).toLocaleString() }}</span>
                    </div>
                    <div class="text-xs text-emerald-600 mt-0.5 text-right cursor-default">
                      {{ selectedQuantity }} {{ selectedQuantity > 1 ? 'units' : 'unit' }}
                    </div>
                  </div>
                </div>

                <!-- Add to Cart Button -->
                <button 
                  @click="addToCart"
                  :disabled="animal.status === 'Out of Stock' || isAddingToCart || !currentUser"
                  class="w-full px-3 py-2.5 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow hover:shadow-lg transform hover:-translate-y-0.5 border border-emerald-500/20 disabled:cursor-not-allowed disabled:transform-none mb-2 cursor-pointer"
                >
                  <svg v-if="!isAddingToCart" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ !currentUser ? 'Sign in to purchase' : isAddingToCart ? 'Adding...' : 'Add to Cart' }}
                </button>

                <!-- Stock Status Warning -->
                <div v-if="animal.status === 'Low Stock'" class="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-2 border border-yellow-200/60">
                  <div class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span class="text-xs font-semibold text-yellow-800 cursor-default">Limited stock available</span>
                  </div>
                </div>

                <div v-if="animal.status === 'Out of Stock'" class="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-2 border border-red-200/60">
                  <div class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-xs font-semibold text-red-800 cursor-default">Currently out of stock</span>
                  </div>
                </div>
              </div>

              <!-- Farmer Information Card -->
              <div class="bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2 cursor-default">
                  <div class="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Farmer Information
                </h3>
                
                <!-- Clickable Farmer Profile -->
                <button 
                  @click="goToUserProfile(animal.farmer.id)"
                  class="w-full text-left group mb-3 p-2 rounded-lg hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-300 border border-transparent hover:border-amber-200/60 cursor-pointer"
                >
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-lg overflow-hidden border-2 border-emerald-200 shadow-md flex-shrink-0 group-hover:border-amber-300 transition-all duration-300">
                      <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-bold text-gray-800 mb-0.5 truncate group-hover:text-amber-700 transition-colors duration-300">{{ animal.farmer.farmName || animal.farmer.name }}</h4>
                      <p v-if="animal.farmer.farmName" class="text-gray-600 mb-0.5 text-xs truncate">{{ animal.farmer.name }}</p>
                      <div class="flex items-center gap-1 text-gray-600 group-hover:text-amber-600 transition-colors duration-300">
                        <svg class="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span class="text-xs truncate">Click to view profile</span>
                      </div>
                    </div>
                    <div class="flex-shrink-0">
                      <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-500 transition-all duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>

                <!-- Contact Information Section -->
                <div class="mb-3 space-y-2">
                  <h4 class="text-sm font-bold text-gray-800 flex items-center gap-2 cursor-default">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Information
                  </h4>
                  
                  <!-- Phone Number -->
                  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200/60">
                    <div class="flex items-center gap-2">
                      <div class="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="font-bold text-blue-800 text-xs cursor-text select-text">{{ animal.farmer.contact }}</p>
                        <p class="text-blue-600 text-xs cursor-default">Mobile Number</p>
                      </div>
                      <button 
                        @click="callFarmer"
                        class="p-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200 cursor-pointer"
                        title="Call farmer"
                      >
                        <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Email (if available) -->
                  <div v-if="animal.farmer.email" class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 border border-green-200/60">
                    <div class="flex items-center gap-2">
                      <div class="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="font-bold text-green-800 text-xs truncate cursor-text select-text">{{ animal.farmer.email }}</p>
                        <p class="text-green-600 text-xs cursor-default">Email Address</p>
                      </div>
                      <button 
                        @click="emailFarmer"
                        class="p-1.5 bg-green-100 hover:bg-green-200 rounded-lg transition-colors duration-200 cursor-pointer"
                        title="Send email"
                      >
                        <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Contact Farmer Button -->
                <button 
                  @click="openContactModal"
                  :disabled="!currentUser"
                  class="w-full px-3 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow hover:shadow-lg transform hover:-translate-y-0.5 border border-blue-500/20 mb-3 cursor-pointer disabled:cursor-not-allowed disabled:transform-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {{ !currentUser ? 'Sign in to contact' : 'Contact Farmer' }}
                </button>

                <!-- Location Information -->
                <div class="space-y-2">
                  <h4 class="text-sm font-bold text-gray-800 flex items-center gap-2 cursor-default">
                    <svg class="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </h4>
                  
                  <!-- Full Address Card -->
                  <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-2 border border-orange-200/60">
                    <div class="flex items-start gap-2">
                      <div class="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="font-bold text-orange-800 text-xs leading-relaxed cursor-text select-text">{{ formatLocation(animal) }}</p>
                        <p class="text-orange-600 text-xs mt-0.5 cursor-default">Farm Address</p>
                      </div>
                    </div>
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
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-2 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-2 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5 cursor-default">{{ toastType === 'success' ? 'Success!' : 'Added to Cart!' }}</h4>
            <div class="text-xs text-gray-700 font-medium cursor-default">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded-md cursor-pointer">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ContactFarmerModal from './ContactFarmerModal.vue';
import type { CurrentUser } from '../../types/animalTypes';

interface Animal {
  id: string;
  title: string;
  type: string;
  breed: string;
  weight: number;
  weightUnit?: string;
  quantity: number;
  age: string;
  gender: string;
  status: string;
  healthStatus: string[];
  price: number;
  priceUnit?: string;
  deliveryOptions: string[];
  paymentMethods?: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: {
    id: string;
    name: string;
    farmName: string;
    contact: string;
    email: string;
    address: string;
    avatar: string;
  };
  location: string;
  isAuction: boolean;
}

interface MessageData {
  message: string;
  contactMethod: string;
}

// Props - FIXED: Added currentUser prop
const props = defineProps<{
  animal: Animal;
  currentUser: CurrentUser | null;
}>();

// Emits
const emit = defineEmits<{
  close: [];
  contact: [contactInfo: string];
}>();

// State
const currentImageIndex = ref(0);
const isContactModalOpen = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref<'success' | 'cart'>('success');
const selectedQuantity = ref(1);
const isAddingToCart = ref(false);

// Methods
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.animal.images.length;
};

const previousImage = () => {
  currentImageIndex.value =
    currentImageIndex.value === 0
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatDeliveryOption = (option: string): string => {
  const optionsMap: Record<string, string> = {
    'pickup': 'Buyer Pickup',
    'delivery': 'Farm Delivery',
    'meetup': 'Meetup Point'
  };
  return optionsMap[option] || option;
};

const formatPaymentMethod = (method: string): string => {
  const methodsMap: Record<string, string> = {
    'cash': 'Cash on Hand',
    'bank_transfer': 'Bank Transfer',
    'gcash': 'GCash',
    'paymaya': 'PayMaya'
  };
  return methodsMap[method] || method;
};

const openContactModal = () => {
  if (!props.currentUser) {
    showToastNotification('Please sign in to contact farmers', 'success');
    return;
  }
  isContactModalOpen.value = true;
};

const closeContactModal = () => {
  isContactModalOpen.value = false;
};

const sendMessage = (messageData: MessageData) => {
  showToastNotification(
    `Message sent to ${props.animal.farmer.farmName || props.animal.farmer.name} via ${messageData.contactMethod}`,
    'success'
  );
  closeContactModal();
};

const showToastNotification = (message: string, type: 'success' | 'cart' = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 4000);
};

const goToUserProfile = (farmerId: string) => {
  console.log('Navigate to farmer profile:', farmerId);
  showToastNotification('Profile view would open here', 'success');
};

// Quantity management
const increaseQuantity = () => {
  if (selectedQuantity.value < props.animal.quantity) {
    selectedQuantity.value++;
  }
};

const decreaseQuantity = () => {
  if (selectedQuantity.value > 1) {
    selectedQuantity.value--;
  }
};

const validateQuantity = () => {
  if (selectedQuantity.value < 1) {
    selectedQuantity.value = 1;
  } else if (selectedQuantity.value > props.animal.quantity) {
    selectedQuantity.value = props.animal.quantity;
  }
};

// Add to cart functionality
const addToCart = async () => {
  if (props.animal.status === 'Out of Stock' || !props.currentUser) {
    showToastNotification('Please sign in to add items to cart', 'success');
    return;
  }

  isAddingToCart.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    showToastNotification(
      `${selectedQuantity.value} ${props.animal.type}(s) added to cart!`,
      'cart'
    );

    selectedQuantity.value = 1;
  } catch (error) {
    console.error('Error adding to cart:', error);
    showToastNotification('Failed to add item to cart. Please try again.', 'success');
  } finally {
    isAddingToCart.value = false;
  }
};

// Contact methods
const callFarmer = () => {
  if (props.animal.farmer.contact) {
    const phoneNumber = props.animal.farmer.contact;
    emit('contact', phoneNumber);
    window.open(`tel:${phoneNumber}`, '_self');
  }
};

const emailFarmer = () => {
  if (props.animal.farmer.email) {
    const subject = encodeURIComponent(
      `Inquiry about ${props.animal.type} - ${props.animal.breed}`
    );
    const body = encodeURIComponent(
      `Hello ${props.animal.farmer.farmName || props.animal.farmer.name},\n\nI'm interested in your ${props.animal.type} (${props.animal.breed}) listed for ₱${props.animal.price.toLocaleString()}.\n\nPlease let me know more details.\n\nThank you!`
    );
    
    const emailAddress = props.animal.farmer.email;
    emit('contact', emailAddress);
    window.open(
      `mailto:${emailAddress}?subject=${subject}&body=${body}`,
      '_self'
    );
  }
};

// Generate modal title
const getModalTitle = (animal: Animal): string => {
  if (animal.title) {
    return animal.title;
  }
  
  const { type, breed, gender, age } = animal;
  return `${breed} ${type} - ${gender} ${age}`;
};

// Badge class for type
const getTypeBadgeClassForImage = (type: string) => {
  switch (type) {
    case 'Cattle':
      return 'bg-green-500/90 text-white border-green-400/50';
    case 'Swine':
    case 'Pig':
      return 'bg-pink-500/90 text-white border-pink-400/50';
    case 'Goat':
      return 'bg-amber-500/90 text-white border-amber-400/50';
    case 'Poultry':
    case 'Chicken':
    case 'Duck':
      return 'bg-red-500/90 text-white border-red-400/50';
    case 'Carabao':
      return 'bg-indigo-500/90 text-white border-indigo-400/50';
    case 'Sheep':
      return 'bg-purple-500/90 text-white border-purple-400/50';
    case 'Horse':
      return 'bg-yellow-500/90 text-white border-yellow-400/50';
    default:
      return 'bg-gray-500/90 text-white border-gray-400/50';
  }
};

// Format location
const formatLocation = (animal: Animal): string => {
  const farmerAddress = animal.farmer.address;
  const animalLocation = animal.location;

  if (farmerAddress.toLowerCase().includes(animalLocation.toLowerCase())) {
    return farmerAddress;
  }

  return `${farmerAddress}, ${animalLocation}`;
};
</script>
