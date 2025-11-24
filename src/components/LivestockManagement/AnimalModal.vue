<!-- AnimalModal.vue -->
<template>
  <!-- Details Modal -->
  <div v-if="animal && !showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 border-b border-green-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Animal Details</h2>
              <p class="text-green-100 text-xs">Complete information about this livestock</p>
            </div>
          </div>
          <button @click="$emit('close')"
            class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Content - Two Section Layout -->
      <div class="overflow-y-auto max-h-[calc(95vh-80px)]">
        <div class="flex">
          
          <!-- Left Section - Images & Farmer Info -->
          <div class="w-2/5 bg-gradient-to-br from-cyan-50 to-blue-50 p-4 border-r border-gray-200">
            <div class="sticky top-0 space-y-4">
              <!-- Images Section -->
              <div class="text-center">
                <h3 class="text-base font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                  </svg>
                  Livestock Images
                </h3>
              </div>

              <!-- Main Image Preview -->
              <div class="relative">
                <div class="w-full h-64 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
                  <img :src="animal.images[selectedImageIndex]" :alt="animal.title" class="w-full h-full object-cover rounded-lg" />
                </div>

                <!-- Navigation arrows for main preview -->
                <div v-if="animal.images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
                  <button @click="previousImage" type="button"
                    class="ml-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div v-if="animal.images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
                  <button @click="nextImage" type="button"
                    class="mr-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Thumbnail Gallery -->
              <div v-if="animal.images.length > 0" class="grid grid-cols-5 gap-2">
                <div v-for="(image, index) in animal.images" :key="index"
                  class="relative group cursor-pointer" @click="selectedImageIndex = index">
                  <img :src="image" :alt="`Thumbnail ${index + 1}`"
                    :class="`w-full h-14 object-cover rounded-lg border-2 transition-all ${selectedImageIndex === index ? 'border-cyan-500 ring-2 ring-cyan-200' : 'border-gray-200 hover:border-gray-400'}`" />
                </div>
              </div>

              <!-- Image Counter -->
              <div class="text-center">
                <p class="text-xs text-cyan-600 font-medium">{{ selectedImageIndex + 1 }}/{{ animal.images.length }} images</p>
              </div>

              <!-- Farmer Information Card -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm mt-4">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Farmer Information
                </h3>

                <div class="flex items-center gap-3 mb-3">
                  <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-12 h-12 rounded-full object-cover border-2 border-amber-200">
                  <div>
                    <h4 class="text-sm font-bold text-gray-900">{{ animal.farmer.name }}</h4>
                    <p v-if="animal.farmer.farmName" class="text-xs text-gray-600">{{ animal.farmer.farmName }}</p>
                  </div>
                </div>
                
                <div class="space-y-2 text-xs">
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="text-gray-700">{{ animal.farmer.contact }}</span>
                  </div>
                  
                  <div v-if="animal.farmer.email" class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="text-gray-700">{{ animal.farmer.email }}</span>
                  </div>
                  
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-gray-700">{{ animal.farmer.address }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section - Information -->
          <div class="w-3/5 p-4 bg-gray-50 flex flex-col" style="max-height: calc(95vh - 80px);">
            <div class="overflow-y-auto space-y-4">
              <!-- Title Section with ID -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Listing Details
                </h3>
                <h2 class="text-xl font-bold text-gray-900 mb-2">{{ animal.title }}</h2>
                <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span class="font-semibold">ID:</span>
                  <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ animal.id }}</span>
                </div>
                <p class="text-gray-600 text-sm">{{ animal.description }}</p>
              </div>

              <!-- Basic Information -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h3>

                <div class="space-y-4">
                  <!-- Animal Details Grid -->
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Animal Type</label>
                      <div class="text-sm font-medium text-gray-900">{{ animal.type }}</div>
                    </div>
                    
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Breed</label>
                      <div class="text-sm font-medium text-gray-900">{{ animal.breed }}</div>
                    </div>
                    
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Gender</label>
                      <div class="text-sm font-medium text-gray-900">{{ animal.gender }}</div>
                    </div>
                    
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Age</label>
                      <div class="text-sm font-medium text-gray-900">{{ animal.age }}</div>
                    </div>
                    
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Weight</label>
                      <div class="text-sm font-medium text-gray-900">{{ animal.weight }} {{ animal.weightUnit || 'kg' }}</div>
                    </div>
                    
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Quantity</label>
                      <div class="text-sm font-medium text-gray-900">{{ animal.quantity }}</div>
                    </div>
                  </div>

                  <!-- Health Status -->
                  <div v-if="animal.healthStatus && animal.healthStatus.length > 0" class="border-t border-gray-200 pt-4">
                    <label class="block text-xs font-semibold text-gray-700 mb-2">Health Status</label>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="(status, index) in animal.healthStatus" :key="index"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {{ status }}
                      </span>
                    </div>
                  </div>

                  <!-- Delivery Options -->
                  <div class="border-t border-gray-200 pt-4">
                    <label class="block text-xs font-semibold text-gray-700 mb-2">Delivery Options</label>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="(option, index) in animal.deliveryOptions" :key="index"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {{ formatDeliveryOption(option) }}
                      </span>
                    </div>
                  </div>

                  <!-- Payment Methods -->
                  <div v-if="animal.paymentMethods && animal.paymentMethods.length > 0" class="border-t border-gray-200 pt-4">
                    <label class="block text-xs font-semibold text-gray-700 mb-2">Accepted Payment Methods</label>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="(method, index) in animal.paymentMethods" :key="index"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        {{ formatPaymentMethod(method) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pricing & Status -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Pricing & Status
                </h3>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Price</label>
                    <div class="text-lg font-bold text-green-600">₱{{ animal.price.toLocaleString() }} {{ animal.priceUnit || 'per head' }}</div>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                    <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      animal.status === 'Available' ? 'bg-green-100 text-green-800' :
                      animal.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`">
                      {{ animal.status }}
                    </span>
                  </div>
                  
                  <div v-if="animal.priceUnit === 'per head'">
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Total Value</label>
                    <div class="text-md font-bold text-purple-600">₱{{ (animal.price * animal.quantity).toLocaleString() }}</div>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Date Posted</label>
                    <div class="text-sm font-medium text-gray-900">{{ formatDate(animal.datePosted) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons - Sticky at the bottom -->
            <div class="sticky bottom-0 pt-4 bg-gray-50 mt-auto">
              <div class="flex gap-3 justify-center">
                <button @click="openEditModal"
                  class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2 cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button @click="handleDelete"
                  class="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2 cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="animal && showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 border-b border-blue-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Edit Animal Listing</h2>
              <p class="text-blue-100 text-xs">Update livestock information and details</p>
            </div>
          </div>
          <button @click="closeEditModal" :disabled="isSaving"
            class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Error Alert -->
      <div v-if="saveError" class="bg-red-50 border-l-4 border-red-500 p-4 m-4">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 class="text-sm font-semibold text-red-800">Error Updating Listing</h3>
            <p class="text-sm text-red-700 mt-1">{{ saveError }}</p>
          </div>
          <button @click="saveError = ''" class="ml-auto text-red-500 hover:text-red-700 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Validation Error Alert -->
      <div v-if="validationError" class="bg-yellow-50 border-l-4 border-yellow-500 p-4 m-4 animate-shake">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 class="text-sm font-semibold text-yellow-800">Missing Required Fields</h3>
            <p class="text-sm text-yellow-700 mt-1">{{ validationError }}</p>
          </div>
          <button @click="validationError = ''" class="ml-auto text-yellow-500 hover:text-yellow-700 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="overflow-y-auto max-h-[calc(95vh-80px)]" ref="editFormScrollContainer">
        <form @submit.prevent="handleSave" class="flex">
          
          <!-- Left Section - Image Management -->
          <div class="w-2/5 bg-gradient-to-br from-slate-50 to-gray-100 p-4 border-r border-gray-200">
            <div class="sticky top-0 space-y-4">
              <div class="text-center">
                <h3 class="text-base font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                  </svg>
                  Manage Images
                </h3>
                <p class="text-xs text-gray-500">Upload and organize livestock photos</p>
              </div>

              <!-- Image Upload Area -->
              <div ref="imagesField" 
                :class="`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
                  fieldErrors.images 
                    ? 'border-red-400 bg-red-50 animate-shake' 
                    : 'border-gray-300 hover:border-blue-400'
                }`">
                <label class="cursor-pointer block">
                  <input type="file" multiple accept="image/*" @change="handleImageUpload" class="hidden" ref="fileInput">
                  <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p class="text-sm text-gray-600 mb-2">Click to upload images</p>
                  <p class="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                  <p v-if="fieldErrors.images" class="text-xs text-red-600 mt-2 font-semibold">
                    {{ fieldErrors.images }}
                  </p>
                </label>
              </div>

              <!-- Main Image Preview -->
              <div class="relative">
                <div class="w-full h-64 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
                  <div v-if="editForm.images.length === 0" class="text-center text-gray-400">
                    <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm">No images uploaded</p>
                  </div>
                  <img v-else :src="editForm.images[editSelectedImageIndex]" alt="Preview" 
                    class="w-full h-full object-cover rounded-lg" />
                </div>

                <!-- Navigation arrows -->
                <div v-if="editForm.images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
                  <button @click="previousEditImage" type="button"
                    class="ml-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div v-if="editForm.images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
                  <button @click="nextEditImage" type="button"
                    class="mr-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Thumbnail Gallery -->
              <div v-if="editForm.images.length > 0" class="grid grid-cols-5 gap-2">
                <div v-for="(image, index) in editForm.images" :key="index"
                  class="relative group cursor-pointer" @click="editSelectedImageIndex = index">
                  <img :src="image" :alt="`Thumbnail ${index + 1}`"
                    :class="`w-full h-14 object-cover rounded-lg border-2 transition-all ${editSelectedImageIndex === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-400'}`" />
                  <!-- Remove button -->
                  <button @click.stop="removeImage(index)" type="button"
                    class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Image Counter -->
              <div class="text-center" v-if="editForm.images.length > 0">
                <p class="text-xs text-slate-600 font-medium">{{ editSelectedImageIndex + 1 }}/{{ editForm.images.length }} images</p>
              </div>
            </div>
          </div>

          <!-- Right Section - Form Fields -->
          <div class="w-3/5 p-4 bg-gray-50 flex flex-col">
            <div class="overflow-y-auto space-y-4">
              
              <!-- Basic Information -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h3>

                <div class="space-y-4">
                  <!-- Title and Description -->
                  <div class="grid grid-cols-1 gap-4">
                    <div ref="titleField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Title <span class="text-red-500">*</span>
                      </label>
                      <input v-model="editForm.title" type="text" 
                        :class="`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                          fieldErrors.title 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        @input="clearFieldError('title')">
                      <p v-if="fieldErrors.title" class="text-xs text-red-600 mt-1">{{ fieldErrors.title }}</p>
                    </div>
                    
                    <div ref="descriptionField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Description <span class="text-red-500">*</span>
                      </label>
                      <textarea v-model="editForm.description" rows="3"
                        :class="`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                          fieldErrors.description 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        @input="clearFieldError('description')"></textarea>
                      <p v-if="fieldErrors.description" class="text-xs text-red-600 mt-1">{{ fieldErrors.description }}</p>
                    </div>
                  </div>

                  <!-- Animal Details Grid -->
                  <div class="grid grid-cols-2 gap-4">
                    <div ref="typeField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Animal Type <span class="text-red-500">*</span>
                        <span class="text-gray-500 font-normal">(Type or select)</span>
                      </label>
                      <input 
                        v-model="editForm.type" 
                        list="edit-animal-types" 
                        type="text"
                        @input="updateEditAvailableBreeds(); clearFieldError('type')"
                        :class="`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
                          fieldErrors.type 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        placeholder="Type or select animal type" />
                      <datalist id="edit-animal-types">
                        <option value="Cattle">Cattle</option>
                        <option value="Goat">Goat</option>
                        <option value="Pig">Pig</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Duck">Duck</option>
                        <option value="Carabao">Carabao</option>
                        <option value="Sheep">Sheep</option>
                        <option value="Horse">Horse</option>
                      </datalist>
                      <p v-if="fieldErrors.type" class="text-xs text-red-600 mt-1">{{ fieldErrors.type }}</p>
                    </div>
                    
                    <div ref="breedField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Breed <span class="text-red-500">*</span>
                        <span class="text-gray-500 font-normal">(Type or select)</span>
                      </label>
                      <input 
                        v-model="editForm.breed" 
                        :list="editForm.type ? 'edit-breed-options' : ''"
                        type="text"
                        @input="clearFieldError('breed')"
                        :class="`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
                          fieldErrors.breed 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        :placeholder="editForm.type ? 'Type or select breed' : 'Select animal type first'" />
                      <datalist v-if="editAvailableBreeds.length > 0" id="edit-breed-options">
                        <option v-for="breed in editAvailableBreeds" :key="breed" :value="breed">{{ breed }}</option>
                      </datalist>
                      <p v-if="fieldErrors.breed" class="text-xs text-red-600 mt-1">{{ fieldErrors.breed }}</p>
                    </div>
                    
                    <div ref="genderField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Gender <span class="text-red-500">*</span>
                      </label>
                      <select v-model="editForm.gender" 
                        @change="clearFieldError('gender')"
                        :class="`w-full px-3 py-2 border rounded-lg text-sm cursor-pointer transition-all duration-300 ${
                          fieldErrors.gender 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`">
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                      <p v-if="fieldErrors.gender" class="text-xs text-red-600 mt-1">{{ fieldErrors.gender }}</p>
                    </div>
                    
                    <div ref="ageField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Age <span class="text-red-500">*</span>
                        <span class="text-gray-500 font-normal">(Type or select)</span>
                      </label>
                      <input 
                        v-model="editForm.age" 
                        list="edit-age-options" 
                        type="text"
                        @input="clearFieldError('age')"
                        :class="`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
                          fieldErrors.age 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        placeholder="Type or select age" />
                      <datalist id="edit-age-options">
                        <option value="0-3 months">0-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2-4 years">2-4 years</option>
                        <option value="4-6 years">4-6 years</option>
                        <option value="6+ years">6+ years</option>
                        <option value="Mixed ages">Mixed ages</option>
                      </datalist>
                      <p v-if="fieldErrors.age" class="text-xs text-red-600 mt-1">{{ fieldErrors.age }}</p>
                    </div>
                    
                    <div ref="weightField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Weight <span class="text-red-500">*</span>
                      </label>
                      <div class="flex gap-2">
                        <input v-model.number="editForm.weight" type="number" min="0" step="0.1"
                          @input="clearFieldError('weight')"
                          :class="`flex-1 px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                            fieldErrors.weight 
                              ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          }`">
                        <select v-model="editForm.weightUnit"
                          class="w-20 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
                          <option value="kg">kg</option>
                          <option value="lbs">lbs</option>
                          <option value="g">g</option>
                        </select>
                      </div>
                      <p v-if="fieldErrors.weight" class="text-xs text-red-600 mt-1">{{ fieldErrors.weight }}</p>
                    </div>
                    
                    <div ref="quantityField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Quantity <span class="text-red-500">*</span>
                      </label>
                      <input v-model.number="editForm.quantity" type="number" min="1"
                        @input="clearFieldError('quantity')"
                        :class="`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                          fieldErrors.quantity 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`">
                      <p v-if="fieldErrors.quantity" class="text-xs text-red-600 mt-1">{{ fieldErrors.quantity }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Health and Status -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Health & Status
                </h3>

                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-2">Status</label>
                      <select v-model="editForm.status" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer">
                        <option value="Available">Available</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                    
                    <div ref="priceField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Price (₱) <span class="text-red-500">*</span>
                      </label>
                      <div class="flex gap-2">
                        <input v-model.number="editForm.price" type="number" min="0" step="0.01"
                          @input="clearFieldError('price')"
                          :class="`flex-1 px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                            fieldErrors.price 
                              ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          }`">
                        <select v-model="editForm.priceUnit"
                          class="px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
                          <option value="per head">per head</option>
                          <option value="per kg">per kg</option>
                          <option value="per lbs">per lbs</option>
                          <option value="total">total</option>
                        </select>
                      </div>
                      <p v-if="fieldErrors.price" class="text-xs text-red-600 mt-1">{{ fieldErrors.price }}</p>
                    </div>
                  </div>

                  <!-- Health Status -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-2">Health Status</label>
                    <div class="space-y-2">
                      <div v-for="status in healthStatusOptions" :key="status" class="flex items-center">
                        <input :id="`edit-${status}`" v-model="editForm.healthStatus" :value="status" type="checkbox" 
                          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer">
                        <label :for="`edit-${status}`" class="ml-2 text-sm text-gray-700 cursor-pointer">{{ status }}</label>
                      </div>
                    </div>
                  </div>

                  <!-- Delivery Options -->
                  <div ref="deliveryOptionsField">
                    <label class="block text-xs font-semibold text-gray-700 mb-2">
                      Delivery Options <span class="text-red-500">*</span>
                    </label>
                    <div :class="`space-y-2 p-3 rounded-lg transition-all duration-300 ${
                      fieldErrors.deliveryOptions 
                        ? 'bg-red-50 border border-red-300 animate-shake' 
                        : ''
                    }`">
                      <div v-for="option in deliveryOptionsMap" :key="option.value" class="flex items-center">
                        <input :id="`edit-delivery-${option.value}`" v-model="editForm.deliveryOptions" :value="option.value" type="checkbox" 
                          @change="clearFieldError('deliveryOptions')"
                          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer">
                        <label :for="`edit-delivery-${option.value}`" class="ml-2 text-sm text-gray-700 cursor-pointer">{{ option.label }}</label>
                      </div>
                    </div>
                    <p v-if="fieldErrors.deliveryOptions" class="text-xs text-red-600 mt-1">{{ fieldErrors.deliveryOptions }}</p>
                  </div>

                  <!-- Payment Methods -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-2">Payment Methods</label>
                    <div class="space-y-2">
                      <div v-for="method in paymentMethodsMap" :key="method.value" 
                        :class="`flex items-start p-2 rounded-lg ${method.available ? 'hover:bg-gray-50 cursor-pointer' : 'bg-gray-50 opacity-60'}`">
                        <input 
                          :id="`edit-payment-${method.value}`" 
                          v-model="editForm.paymentMethods" 
                          :value="method.value" 
                          type="checkbox"
                          :disabled="!method.available"
                          class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5 cursor-pointer disabled:cursor-not-allowed" />
                        <label :for="`edit-payment-${method.value}`" :class="`ml-2 flex-1 ${method.available ? 'cursor-pointer' : ''}`">
                          <span :class="`text-sm font-medium ${method.available ? 'text-gray-700' : 'text-gray-500'}`">
                            {{ method.label }}
                          </span>
                          <span v-if="!method.available" class="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                            Coming Soon
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Location -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </h3>

                <div ref="locationField">
                  <label class="block text-xs font-semibold text-gray-700 mb-2">
                    Farm Location <span class="text-red-500">*</span>
                  </label>
                  <input v-model="editForm.location" type="text" 
                    @input="clearFieldError('location')"
                    :class="`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                      fieldErrors.location 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`">
                  <p v-if="fieldErrors.location" class="text-xs text-red-600 mt-1">{{ fieldErrors.location }}</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons - Sticky at the bottom -->
            <div class="sticky bottom-0 pt-4 bg-gray-50 mt-auto">
              <div class="flex gap-3 justify-center">
                <button type="button" @click="closeEditModal" :disabled="isSaving"
                  class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
                <button type="submit" :disabled="isSaving"
                  class="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed cursor-pointer">
                  <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l-3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ isSaving ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { supabase } from '@/supabase'
import { LivestockService } from '@/services/livestockService'
import type { Animal } from '@/types/managementTypes'

const props = defineProps<{
  animal?: Animal | null
}>()

const emit = defineEmits<{
  close: []
  updated: []
  deleted: []
}>()

const selectedImageIndex = ref(0)
const editSelectedImageIndex = ref(0)
const showEditModal = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const saveError = ref('')
const uploadingImages = ref(false)
const editAvailableBreeds = ref<string[]>([])
const validationError = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

// Field-specific error tracking
const fieldErrors = reactive<Record<string, string>>({
  title: '',
  description: '',
  type: '',
  breed: '',
  gender: '',
  age: '',
  weight: '',
  quantity: '',
  price: '',
  deliveryOptions: '',
  location: '',
  images: ''
})

// Refs for scrolling to fields
const editFormScrollContainer = ref<HTMLElement | null>(null)
const titleField = ref<HTMLElement | null>(null)
const descriptionField = ref<HTMLElement | null>(null)
const typeField = ref<HTMLElement | null>(null)
const breedField = ref<HTMLElement | null>(null)
const genderField = ref<HTMLElement | null>(null)
const ageField = ref<HTMLElement | null>(null)
const weightField = ref<HTMLElement | null>(null)
const quantityField = ref<HTMLElement | null>(null)
const priceField = ref<HTMLElement | null>(null)
const deliveryOptionsField = ref<HTMLElement | null>(null)
const locationField = ref<HTMLElement | null>(null)
const imagesField = ref<HTMLElement | null>(null)

const newImageFiles = ref<File[]>([])
const originalImages = ref<string[]>([])

// Initial form state for resetting
const getInitialFormState = () => ({
  title: '',
  description: '',
  type: '',
  breed: '',
  gender: '',
  age: '',
  weight: 0,
  weightUnit: 'kg',
  quantity: 1,
  status: 'Available',
  healthStatus: [] as string[],
  price: 0,
  priceUnit: 'per head',
  deliveryOptions: [] as string[],
  paymentMethods: [] as string[],
  images: [] as string[],
  location: '',
})

// Edit form data with proper typing
const editForm = reactive<{
  title: string
  description: string
  type: string
  breed: string
  gender: string
  age: string
  weight: number
  weightUnit: string
  quantity: number
  status: string
  healthStatus: string[]
  price: number
  priceUnit: string
  deliveryOptions: string[]
  paymentMethods: string[]
  images: string[]
  location: string
}>(getInitialFormState())

// Watch for modal close to reset state
watch(showEditModal, (newVal) => {
  if (!newVal) {
    // Reset form completely when modal is closed
    resetFormCompletely()
  }
})

// Options for dropdowns
const healthStatusOptions: readonly string[] = [
  'Vaccinated',
  'Dewormed', 
  'Health Certificate',
  'Pregnant',
  'Lactating',
  'Disease Free',
  'Quarantined'
] as const

const deliveryOptionsMap: readonly { value: string; label: string }[] = [
  { value: 'pickup', label: 'Buyer Pickup' },
  { value: 'delivery', label: 'Farm Delivery' },
  { value: 'meetup', label: 'Meetup Point' }
] as const

const paymentMethodsMap: readonly { value: string; label: string; available: boolean }[] = [
  { value: 'cash', label: 'Cash on Hand', available: true },
  { value: 'bank_transfer', label: 'Bank Transfer', available: false },
  { value: 'gcash', label: 'GCash', available: false },
  { value: 'paymaya', label: 'PayMaya', available: false }
] as const

// Breed mapping
const breedsByAnimalType: Record<string, readonly string[]> = {
  'Cattle': [
    'Angus', 'Holstein', 'Brahman', 'Charolais', 'Simmental', 'Hereford',
    'Limousin', 'Wagyu', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,
  'Goat': [
    'Boer', 'Nubian', 'Saanen', 'Alpine', 'LaMancha', 'Toggenburg',
    'Nigerian Dwarf', 'Kiko', 'Spanish', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,
  'Pig': [
    'Yorkshire', 'Landrace', 'Duroc', 'Hampshire', 'Berkshire', 'Chester White',
    'Poland China', 'Pietrain', 'Large White', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,
  'Chicken': [
    'Rhode Island Red', 'Leghorn', 'Plymouth Rock', 'Brahma', 'Orpington', 'Wyandotte',
    'Sussex', 'Marans', 'Australorp', 'Native/Local Breed', 'Broiler', 'Layer',
    'Dual Purpose', 'Other'
  ] as const,
  'Duck': [
    'Pekin', 'Mallard', 'Rouen', 'Khaki Campbell', 'Runner', 'Muscovy',
    'Call Duck', 'Cayuga', 'Swedish Blue', 'Native/Local Breed', 'Other'
  ] as const,
  'Carabao': [
    'Murrah', 'Nili-Ravi', 'Surti', 'Jaffarabadi',
    'Native Carabao', 'Crossbred', 'Other'
  ] as const,
  'Sheep': [
    'Dorper', 'Merino', 'Suffolk', 'Hampshire', 'Romney', 'Border Leicester',
    'Corriedale', 'Rambouillet', 'Katahdin', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,
  'Horse': [
    'Arabian', 'Thoroughbred', 'Quarter Horse', 'Paint', 'Appaloosa', 'Mustang',
    'Clydesdale', 'Percheron', 'Friesian', 'Native/Local Breed', 'Other'
  ] as const
}

const updateEditAvailableBreeds = (): void => {
  if (editForm.type && breedsByAnimalType[editForm.type]) {
    editAvailableBreeds.value = [...breedsByAnimalType[editForm.type]]
  } else {
    editAvailableBreeds.value = []
  }
}

// Clear field error when user starts typing
const clearFieldError = (fieldName: string): void => {
  fieldErrors[fieldName] = ''
  if (validationError.value) {
    validationError.value = ''
  }
}

// Clear all field errors
const clearAllFieldErrors = (): void => {
  Object.keys(fieldErrors).forEach(key => {
    fieldErrors[key] = ''
  })
  validationError.value = ''
}

// Reset form completely to initial state
const resetFormCompletely = (): void => {
  console.log('🔄 Resetting form completely')
  
  // Reset form data
  Object.assign(editForm, getInitialFormState())
  
  // Clear errors
  clearAllFieldErrors()
  saveError.value = ''
  
  // Clear image state
  newImageFiles.value = []
  originalImages.value = []
  editSelectedImageIndex.value = 0
  editAvailableBreeds.value = []
  
  // Reset file input if it exists
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  
  // Reset flags
  isSaving.value = false
  uploadingImages.value = false
  
  console.log('✅ Form reset complete')
}

// Validate form and return first error field
const validateForm = (): { isValid: boolean; firstErrorField: string | null } => {
  clearAllFieldErrors()
  
  const errors: { field: string; message: string; ref: string }[] = []

  // Validate required fields
  if (!editForm.title.trim()) {
    errors.push({ field: 'title', message: 'Title is required', ref: 'titleField' })
  }
  
  if (!editForm.description.trim()) {
    errors.push({ field: 'description', message: 'Description is required', ref: 'descriptionField' })
  }
  
  if (!editForm.type.trim()) {
    errors.push({ field: 'type', message: 'Animal type is required', ref: 'typeField' })
  }
  
  if (!editForm.breed.trim()) {
    errors.push({ field: 'breed', message: 'Breed is required', ref: 'breedField' })
  }
  
  if (!editForm.gender) {
    errors.push({ field: 'gender', message: 'Gender is required', ref: 'genderField' })
  }
  
  if (!editForm.age.trim()) {
    errors.push({ field: 'age', message: 'Age is required', ref: 'ageField' })
  }
  
  if (!editForm.weight || editForm.weight <= 0) {
    errors.push({ field: 'weight', message: 'Valid weight is required', ref: 'weightField' })
  }
  
  if (!editForm.quantity || editForm.quantity < 1) {
    errors.push({ field: 'quantity', message: 'Quantity must be at least 1', ref: 'quantityField' })
  }
  
  if (!editForm.price || editForm.price <= 0) {
    errors.push({ field: 'price', message: 'Valid price is required', ref: 'priceField' })
  }
  
  if (editForm.deliveryOptions.length === 0) {
    errors.push({ field: 'deliveryOptions', message: 'Select at least one delivery option', ref: 'deliveryOptionsField' })
  }
  
  if (!editForm.location.trim()) {
    errors.push({ field: 'location', message: 'Location is required', ref: 'locationField' })
  }
  
  if (editForm.images.length === 0) {
    errors.push({ field: 'images', message: 'At least one image is required', ref: 'imagesField' })
  }

  if (errors.length > 0) {
    // Set all field errors
    errors.forEach(error => {
      fieldErrors[error.field] = error.message
    })
    
    // Set validation error message
    validationError.value = `Please fill in all required fields (${errors.length} field${errors.length > 1 ? 's' : ''} missing)`
    
    // Return the first error field for scrolling
    return { isValid: false, firstErrorField: errors[0].ref }
  }

  return { isValid: true, firstErrorField: null }
}

// Scroll to field with error
const scrollToField = (fieldRefName: string): void => {
  const refs: Record<string, any> = {
    titleField: titleField.value,
    descriptionField: descriptionField.value,
    typeField: typeField.value,
    breedField: breedField.value,
    genderField: genderField.value,
    ageField: ageField.value,
    weightField: weightField.value,
    quantityField: quantityField.value,
    priceField: priceField.value,
    deliveryOptionsField: deliveryOptionsField.value,
    locationField: locationField.value,
    imagesField: imagesField.value
  }

  const fieldElement = refs[fieldRefName]
  const container = editFormScrollContainer.value

  if (fieldElement && container) {
    // Get the position of the field relative to the container
    const fieldRect = fieldElement.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    
    // Calculate scroll position (with some offset for better visibility)
    const scrollTop = container.scrollTop + (fieldRect.top - containerRect.top) - 100

    // Smooth scroll to the field
    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    })

    // Focus the input field after scrolling
    setTimeout(() => {
      const inputElement = fieldElement.querySelector('input, select, textarea')
      if (inputElement) {
        inputElement.focus()
      }
    }, 500)
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatDeliveryOption = (option: string): string => {
  const optionsMap: Record<string, string> = {
    'pickup': 'Buyer Pickup',
    'delivery': 'Farm Delivery',
    'meetup': 'Meetup Point'
  }
  return optionsMap[option] || option
}

const formatPaymentMethod = (method: string): string => {
  const methodsMap: Record<string, string> = {
    'cash': 'Cash on Hand',
    'bank_transfer': 'Bank Transfer',
    'gcash': 'GCash',
    'paymaya': 'PayMaya'
  }
  return methodsMap[method] || method
}

const nextImage = (): void => {
  if (props.animal && props.animal.images) {
    selectedImageIndex.value = selectedImageIndex.value < props.animal.images.length - 1
      ? selectedImageIndex.value + 1
      : 0
  }
}

const previousImage = (): void => {
  if (props.animal && props.animal.images) {
    selectedImageIndex.value = selectedImageIndex.value > 0
      ? selectedImageIndex.value - 1
      : props.animal.images.length - 1
  }
}

const nextEditImage = (): void => {
  editSelectedImageIndex.value = editSelectedImageIndex.value < editForm.images.length - 1
    ? editSelectedImageIndex.value + 1
    : 0
}

const previousEditImage = (): void => {
  editSelectedImageIndex.value = editSelectedImageIndex.value > 0
    ? editSelectedImageIndex.value - 1
    : editForm.images.length - 1
}

const removeImage = (index: number): void => {
  editForm.images.splice(index, 1)
  
  if (index >= originalImages.value.length) {
    const newFileIndex = index - originalImages.value.length
    if (newFileIndex >= 0 && newFileIndex < newImageFiles.value.length) {
      newImageFiles.value.splice(newFileIndex, 1)
    }
  }
  
  if (editSelectedImageIndex.value >= editForm.images.length) {
    editSelectedImageIndex.value = Math.max(0, editForm.images.length - 1)
  }
  
  // Clear image error if user added/has images
  if (editForm.images.length > 0) {
    clearFieldError('images')
  }
}

const handleImageUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files) return

  Array.from(files).forEach(file => {
    if (editForm.images.length >= 5) {
      alert('Maximum 5 images allowed')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select only image files')
      return
    }

    newImageFiles.value.push(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        editForm.images.push(e.target.result as string)
        // Clear image error when user uploads
        clearFieldError('images')
      }
    }
    reader.readAsDataURL(file)
  })

  target.value = ''
}

const openEditModal = (): void => {
  if (props.animal) {
    // First reset everything
    resetFormCompletely()
    
    // Then populate with animal data
    Object.assign(editForm, {
      title: props.animal.title,
      description: props.animal.description,
      type: props.animal.type,
      breed: props.animal.breed,
      gender: props.animal.gender,
      age: props.animal.age,
      weight: props.animal.weight,
      weightUnit: props.animal.weightUnit || 'kg',
      quantity: props.animal.quantity,
      status: props.animal.status,
      healthStatus: props.animal.healthStatus ? [...props.animal.healthStatus] : [],
      price: props.animal.price,
      priceUnit: props.animal.priceUnit || 'per head',
      deliveryOptions: [...props.animal.deliveryOptions],
      paymentMethods: props.animal.paymentMethods ? [...props.animal.paymentMethods] : [],
      images: [...props.animal.images],
      location: props.animal.location,
    })
    
    updateEditAvailableBreeds()
    originalImages.value = [...props.animal.images]
    newImageFiles.value = []
    
    editSelectedImageIndex.value = 0
    showEditModal.value = true
  }
}

const closeEditModal = (): void => {
  if (!isSaving.value) {
    showEditModal.value = false
    // Reset will happen via the watcher
  }
}

const handleSave = async (): Promise<void> => {
  if (!props.animal) return

  // Validate form first
  const validation = validateForm()
  if (!validation.isValid && validation.firstErrorField) {
    scrollToField(validation.firstErrorField)
    return
  }

  saveError.value = ''
  isSaving.value = true

  try {
    console.log('💾 Updating listing...')

    // Handle new images upload
    if (newImageFiles.value.length > 0) {
      uploadingImages.value = true
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      console.log('📤 Uploading new images to storage...')
      const uploadResult = await LivestockService.uploadImages(newImageFiles.value, user.id)
      
      if (!uploadResult.success || !uploadResult.urls) {
        throw new Error(uploadResult.error || 'Failed to upload images')
      }

      const oldImageCount = originalImages.value.length
      editForm.images = [
        ...editForm.images.slice(0, oldImageCount),
        ...uploadResult.urls
      ]
      
      uploadingImages.value = false
      console.log('✅ New images uploaded successfully')
    }

    // Update the listing
    const result = await LivestockService.updateListing(
      props.animal.uuid,
      editForm,
      originalImages.value
    )

    if (result.success) {
      console.log('✅ Listing updated successfully:', result.data)
      
      // Reset completely
      resetFormCompletely()
      
      // Close modal and emit events
      showEditModal.value = false
      emit('updated')
      emit('close')
    } else {
      console.error('❌ Failed to update listing:', result.error)
      saveError.value = result.error || 'Failed to update listing. Please try again.'
      
      // Clean up newly uploaded images if update failed
      if (newImageFiles.value.length > 0 && editForm.images.length > originalImages.value.length) {
        const newlyUploadedUrls = editForm.images.slice(originalImages.value.length)
        console.log('🧹 Cleaning up newly uploaded images due to update failure...')
        await LivestockService.deleteImages(newlyUploadedUrls)
      }
    }
  } catch (error: any) {
    console.error('❌ Error updating listing:', error)
    saveError.value = error.message || 'An unexpected error occurred. Please try again.'
    
    // Clean up newly uploaded images if error occurred
    if (newImageFiles.value.length > 0 && editForm.images.length > originalImages.value.length) {
      const newlyUploadedUrls = editForm.images.slice(originalImages.value.length)
      console.log('🧹 Cleaning up newly uploaded images due to error...')
      await LivestockService.deleteImages(newlyUploadedUrls)
    }
  } finally {
    isSaving.value = false
    uploadingImages.value = false
  }
}

const handleDelete = async (): Promise<void> => {
  if (!props.animal) return

  if (!confirm(`Are you sure you want to delete "${props.animal.title}"? This action cannot be undone and all images will be permanently deleted.`)) {
    return
  }

  isDeleting.value = true

  try {
    console.log('🗑️ Deleting listing...', props.animal.uuid)

    const result = await LivestockService.deleteListing(props.animal.uuid)

    if (result.success) {
      console.log('✅ Listing and images deleted successfully')
      emit('deleted')
      emit('close')
    } else {
      console.error('❌ Failed to delete listing:', result.error)
      alert(`Failed to delete listing: ${result.error}`)
    }
  } catch (error: any) {
    console.error('❌ Error deleting listing:', error)
    alert(`Error deleting listing: ${error.message || 'Please try again.'}`)
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>