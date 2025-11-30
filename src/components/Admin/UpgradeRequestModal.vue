<!-- UpgradeRequestModal.vue ADMIN -->
<template>
  <div v-if="visible" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-white/30"
    @click.self="close">
    <div class="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-7xl h-full max-h-[95vh] relative flex flex-col overflow-hidden border border-gray-100">
      <!-- Close Button -->
      <button @click="close"
        class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 z-50 group">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-6 h-full min-h-0 p-8">
        <!-- LEFT: User Information -->
        <div class="w-full lg:w-2/5 flex flex-col min-h-0">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
            Applicant Information
          </h2>

          <!-- Profile Section -->
          <div class="flex items-start gap-4 mb-6 p-5 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl border border-emerald-100 shadow-sm">
            <div class="relative flex-shrink-0">
              <img :src="userProfileImage" alt="Profile"
                class="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg ring-2 ring-emerald-200" 
                @error="handleImageError"/>
              <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div class="min-w-0 flex-1 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-bold text-xl text-gray-900 truncate">{{ fullName }}</h3>
                <span v-if="request.status" :class="{
                  'bg-emerald-500 text-white': request.status === 'approved',
                  'bg-amber-400 text-white': request.status === 'pending',
                  'bg-rose-500 text-white': request.status === 'rejected'
                }" class="rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-semibold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path v-if="request.status === 'approved'" fill-rule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd" />  
                    <circle v-else cx="10" cy="10" r="4" fill="currentColor" />
                  </svg>
                  <span class="capitalize">{{ request.status }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between pt-1">
                <p class="text-xs text-gray-500 font-medium">ID: {{ request.userId }}</p>
                <p class="text-xs text-gray-500">{{ formattedDate }}</p>
              </div>
            </div>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
            <!-- Basic Information -->
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Basic Information
              </h3>

              <div class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                <div class="space-y-3">
                  <div class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span class="font-semibold text-gray-700 text-sm">Farm Name</span>
                    </div>
                    <span class="text-sm text-gray-900 font-medium">{{ farmName }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="font-semibold text-gray-700 text-sm">Farm Size</span>
                    </div>
                    <span class="text-sm text-gray-900 font-medium">{{ farmSize }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="font-semibold text-gray-700 text-sm">Livestock Type</span>
                    </div>
                    <span class="text-sm text-gray-900 font-medium capitalize">{{ livestockTypes }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span class="font-semibold text-gray-700 text-sm">Email</span>
                    </div>
                    <span class="text-sm text-gray-900 font-medium">{{ request.email || 'Not provided' }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span class="font-semibold text-gray-700 text-sm">Phone</span>
                    </div>
                    <span class="text-sm text-gray-900 font-medium">{{ phoneNumber }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Farm Address -->
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Farm Address
              </h3>

              <div class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                <div class="space-y-4">
                  <div class="flex items-start gap-3 py-2">
                    <div class="flex-shrink-0 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-700 text-sm mb-1">Full Address</h4>
                      <p class="text-sm text-gray-900">{{ formattedAddress }}</p>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4 pt-2">
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700 text-sm">Barangay</h4>
                        <p class="text-sm text-gray-900">{{ barangay }}</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700 text-sm">City</h4>
                        <p class="text-sm text-gray-900">{{ city }}</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700 text-sm">Province</h4>
                        <p class="text-sm text-gray-900">{{ province }}</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700 text-sm">Region</h4>
                        <p class="text-sm text-gray-900">{{ region }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Information -->
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Additional Information
              </h3>

              <div class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                <h4 class="font-semibold text-gray-700 mb-2">Farm Description</h4>
                <p class="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{{ farmDescription }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Documents Review -->
        <div class="w-full lg:w-3/5 text-gray-800 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6 flex flex-col min-h-0">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Documents Review
          </h2>

          <div class="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
            <div class="space-y-6">
              <!-- Business Permit -->
              <div class="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl border border-gray-200 shadow-sm">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Business Permit
                </h3>
                
                <div v-if="businessPermitUrl" class="relative group">
                  <img :src="businessPermitUrl" @click="openDocument(businessPermitUrl)"
                    class="w-full max-h-80 object-contain rounded-xl border-2 border-gray-200 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    alt="Business Permit"
                    @error="handleImageError" />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-end justify-center pb-6">
                    <button @click="openDocument(businessPermitUrl)"
                      class="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-indigo-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      View Full Image
                    </button>
                  </div>
                </div>
                <div v-else class="h-48 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="text-gray-400 text-sm font-medium">No business permit provided</p>
                </div>
              </div>

              <!-- Farm Photos -->
              <div class="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl border border-gray-200 shadow-sm">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Farm Photos
                </h3>
                
                <div v-if="farmPhotoUrls && farmPhotoUrls.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-for="(photo, index) in farmPhotoUrls" :key="index" class="relative group">
                    <img :src="photo" @click="openDocument(photo)"
                      class="w-full h-48 object-cover rounded-xl border-2 border-gray-200 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                      :alt="`Farm photo ${index + 1}`"
                      @error="handleImageError" />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-end justify-center pb-4">
                      <button @click="openDocument(photo)"
                        class="bg-white text-teal-600 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5 hover:bg-teal-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        View Full
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="h-48 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-gray-400 text-sm font-medium">No farm photos provided</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with Action Buttons -->
      <div class="mt-6 px-8 pb-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
        <button v-if="request.status === 'pending'" @click="handleRejection" 
          class="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Reject Request
        </button>
        <button v-if="request.status === 'pending'" @click="handleApprove" 
          class="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Approve Request
        </button>
        <button v-else-if="request.status === 'rejected'" @click="handleApprove" 
          class="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200">
          Approve Anyway
        </button>
        <button v-else-if="request.status === 'approved'" 
          class="px-6 py-2.5 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Already Approved
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

// Types
interface FarmAddress {
  street?: string
  barangay?: string
  city?: string
  province?: string
  region?: string
}

interface FarmDetails {
  farmName?: string
  farmSize?: number
  farmSizeUnit?: string
  livestockTypes?: string[]
  description?: string
}

interface Documents {
  businessPermitUrl?: string
  farmPhotoUrls?: string[]
}

interface UpgradeRequest {
  id: string
  userId: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  phoneNumber?: string
  profilePicture?: string
  farmDetails?: FarmDetails
  farmAddress?: FarmAddress
  documents?: Documents
  status: 'pending' | 'approved' | 'rejected'
  createdAt?: string
}

const props = defineProps<{
  visible: boolean
  request: UpgradeRequest
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'approved', updatedRequest: UpgradeRequest): void
  (e: 'rejected', updatedRequest: UpgradeRequest): void
}>()

// Prevent body scroll when modal is open
watch(() => props.visible, (visible) => {
  if (visible) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const defaultAvatar = '/default-avatar.png'

const fullName = computed(() => {
  if (props.request.fullName && props.request.fullName !== 'No name provided') {
    return props.request.fullName
  }
  const first = props.request.firstName || ''
  const last = props.request.lastName || ''
  const combined = `${first} ${last}`.trim()
  return combined || 'No name provided'
})

const userProfileImage = computed(() => {
  return props.request.profilePicture || defaultAvatar
})

const phoneNumber = computed(() => {
  return props.request.phoneNumber || 'Not provided'
})

const farmName = computed(() => {
  return props.request.farmDetails?.farmName || 'Not provided'
})

const farmSize = computed(() => {
  if (!props.request.farmDetails?.farmSize) return 'Not provided'
  const size = props.request.farmDetails.farmSize
  const unit = props.request.farmDetails.farmSizeUnit || 'hectares'
  return `${size} ${unit}`
})

const livestockTypes = computed(() => {
  if (!props.request.farmDetails?.livestockTypes || props.request.farmDetails.livestockTypes.length === 0) {
    return 'Not specified'
  }
  return props.request.farmDetails.livestockTypes.join(', ')
})

const farmDescription = computed(() => {
  return props.request.farmDetails?.description || 'No description provided'
})

const barangay = computed(() => {
  return props.request.farmAddress?.barangay || 'Not provided'
})

const city = computed(() => {
  return props.request.farmAddress?.city || 'Not provided'
})

const province = computed(() => {
  return props.request.farmAddress?.province || 'Not provided'
})

const region = computed(() => {
  return props.request.farmAddress?.region || 'Not provided'
})

const formattedAddress = computed(() => {
  const addr = props.request.farmAddress
  if (!addr) return 'No address provided'

  const parts = [
    addr.street,
    addr.barangay,
    addr.city,
    addr.province,
    addr.region
  ].filter(Boolean)

  return parts.length > 0 ? parts.join(', ') : 'No address provided'
})

const businessPermitUrl = computed(() => {
  return props.request.documents?.businessPermitUrl || ''
})

const farmPhotoUrls = computed(() => {
  return props.request.documents?.farmPhotoUrls || []
})

const formattedDate = computed(() => {
  if (!props.request.createdAt) return ''
  const date = new Date(props.request.createdAt)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = defaultAvatar
}

const openDocument = (url: string) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const close = () => {
  emit('close')
}

const handleApprove = () => {
  emit('approved', props.request)
}

const handleRejection = () => {
  emit('rejected', props.request)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>