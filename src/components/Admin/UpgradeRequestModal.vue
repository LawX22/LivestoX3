<!-- UpgradeRequestModal.vue -->
<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-full max-h-[95vh] p-6 relative flex flex-col">
      <!-- Close Button -->
      <button @click="close"
        class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold transition-colors z-50">
        &times;
      </button>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-6 h-full min-h-0">
        <!-- LEFT: User Information -->
        <div class="w-full lg:w-2/5 flex flex-col min-h-0">
          <h2 class="text-2xl font-bold text-green-700 border-b pb-2 mb-4">Applicant Information</h2>

          <!-- Profile Section -->
          <div class="flex items-start gap-4 mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 shadow-sm">
            <div class="relative flex-shrink-0">
              <img :src="userProfileImage" alt="Profile"
                class="w-20 h-20 rounded-full object-cover border-3 border-white shadow-md ring-2 ring-green-300" 
                @error="handleImageError"/>
            </div>
            <div class="min-w-0 flex-1 space-y-1">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-lg text-gray-800 truncate">{{ fullName || 'No name provided' }}</h3>
                <span v-if="request.status" :class="{
                  'bg-green-500 text-white': request.status === 'approved',
                  'bg-yellow-400 text-white': request.status === 'pending',
                  'bg-red-500 text-white': request.status === 'rejected'
                }" class="rounded-full px-2 py-1 flex items-center gap-1 text-xs font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path v-if="request.status === 'approved'" fill-rule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd" />  
                    <circle v-else cx="10" cy="10" r="4" fill="currentColor" />
                  </svg>
                  <span>{{ request.status }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between pt-1">
                <p class="text-xs text-gray-500">User ID: {{ request.userId }}</p>
                <p class="text-xs text-gray-500">Requested: {{ formattedDate }}</p>
              </div>
            </div>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto space-y-4 pr-2">
            <!-- Basic Information -->
            <div>
              <h3 class="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Basic Information
              </h3>

              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div class="space-y-3">
                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span class="font-medium text-gray-700 text-sm">Farm Name</span>
                    </div>
                    <span class="text-sm text-gray-600">{{ request.farmDetails?.farmName || 'Not provided' }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="font-medium text-gray-700 text-sm">Farm Size</span>
                    </div>
                    <span class="text-sm text-gray-600">
                      {{ request.farmDetails?.farmSize ? `${request.farmDetails.farmSize} ${request.farmDetails.farmSizeUnit || 'hectares'}` : 'Not provided' }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="font-medium text-gray-700 text-sm">Livestock Type</span>
                    </div>
                    <span class="text-sm text-gray-600 capitalize">
                      {{ request.farmDetails?.livestockTypes?.join(', ') || 'Not specified' }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span class="font-medium text-gray-700 text-sm">Email</span>
                    </div>
                    <span class="text-sm text-gray-600">{{ userEmail || 'Not provided' }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span class="font-medium text-gray-700 text-sm">Phone</span>
                    </div>
                    <span class="text-sm text-gray-600">{{ userPhone || 'Not provided' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Farm Address -->
            <div>
              <h3 class="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Farm Address
              </h3>

              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div class="space-y-3">
                  <div class="flex items-start gap-3 py-2">
                    <div class="flex-shrink-0 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700 text-sm">Full Address</h4>
                      <p class="text-sm text-gray-600">
                        {{ formattedAddress }}
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4 pt-2">
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-700 text-sm">Barangay</h4>
                        <p class="text-sm text-gray-600">{{ request.farmAddress?.barangay || 'Not provided' }}</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-700 text-sm">City</h4>
                        <p class="text-sm text-gray-600">{{ request.farmAddress?.city || 'Not provided' }}</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-700 text-sm">Province</h4>
                        <p class="text-sm text-gray-600">{{ request.farmAddress?.province || 'Not provided' }}</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-700 text-sm">Region</h4>
                        <p class="text-sm text-gray-600">{{ request.farmAddress?.region || 'Not provided' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Information -->
            <div>
              <h3 class="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Additional Information
              </h3>

              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h4 class="font-medium text-gray-700 mb-2">Farm Description</h4>
                <p class="text-gray-600 text-sm whitespace-pre-line">{{ request.farmDetails?.description || 'No description provided' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Documents Review -->
        <div class="w-full lg:w-3/5 text-gray-800 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6 flex flex-col min-h-0">
          <h2 class="text-2xl font-bold text-green-700 border-b pb-2 mb-4">Documents Review</h2>

          <div class="flex-1 min-h-0 overflow-y-auto">
            <div class="space-y-6">
              <!-- Business Permit -->
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Business Permit
                </h3>
                
                <div v-if="request.documents?.businessPermit" class="relative group">
                  <img :src="request.documents.businessPermit" @click="openDocument(request.documents.businessPermit)"
                    class="w-full max-h-80 object-contain rounded-lg border border-gray-300 cursor-pointer hover:shadow-md transition-all"
                    alt="Business Permit"
                    @error="handleImageError" />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button @click="openDocument(request.documents.businessPermit)"
                      class="bg-white bg-opacity-90 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium shadow-md flex items-center gap-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      View Full
                    </button>
                  </div>
                </div>
                <div v-else class="h-40 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300">
                  <p class="text-gray-500 text-sm">No business permit provided</p>
                </div>
              </div>

              <!-- Farm Photos -->
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Farm Photos
                </h3>
                
                <div v-if="request.documents?.farmPhotos?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div v-for="(photo, index) in request.documents.farmPhotos" :key="index" class="relative group">
                    <img :src="photo" @click="openDocument(photo)"
                      class="w-full h-40 object-cover rounded-lg border border-gray-300 cursor-pointer hover:shadow-md transition-all"
                      :alt="`Farm photo ${index + 1}`"
                      @error="handleImageError" />
                    <div
                      class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button @click="openDocument(photo)"
                        class="bg-white bg-opacity-90 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium shadow-md flex items-center gap-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        View Full
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="h-40 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300">
                  <p class="text-gray-500 text-sm">No farm photos provided</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with Action Buttons -->
      <div class="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-3">
        <button @click="close" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button v-if="request.status === 'pending'" @click="handleReject" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Reject Request
        </button>
        <button v-if="request.status === 'pending'" @click="handleApprove" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Approve Request
        </button>
        <button v-else-if="request.status === 'rejected'" @click="handleApprove" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1">
          Approve Anyway
        </button>
        <button v-else-if="request.status === 'approved'" class="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed flex items-center gap-1">
          Already Approved
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted } from 'vue';

interface FarmDetails {
  farmName?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  livestockTypes?: string[];
  experience?: string;
  description?: string;
}

interface FarmAddress {
  region?: string;
  province?: string;
  city?: string;
  barangay?: string;
  street?: string;
}

interface Documents {
  businessPermit?: string;
  farmPhotos?: string[];
}

interface UpgradeRequest {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  farmDetails?: FarmDetails;
  farmAddress?: FarmAddress;
  documents?: Documents;
  date?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

interface UserData {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  profilePicture?: string;
  role?: string;
}

export default defineComponent({
  name: 'UpgradeRequestModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    request: {
      type: Object as PropType<UpgradeRequest>,
      required: true
    }
  },
  emits: ['close', 'approved', 'rejected'],
  setup(props, { emit }) {
    const userData = ref<UserData | null>(null);
    const defaultAvatar = '/src/assets/default.png';

    // Load user data from localStorage
    const loadUserData = () => {
      try {
        const userKey = `user_${props.request.userId}`;
        const storedUser = localStorage.getItem(userKey);
        if (storedUser) {
          userData.value = JSON.parse(storedUser);
        }
        
        // Also check for profile image separately
        const profileImage = localStorage.getItem(`profileImage_${props.request.userId}`);
        if (profileImage) {
          if (!userData.value) {
            userData.value = { userId: props.request.userId } as UserData;
          }
          userData.value.profilePicture = profileImage;
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    onMounted(() => {
      loadUserData();
    });

    const fullName = computed(() => {
      if (props.request.fullName) return props.request.fullName;
      if (userData.value?.fullName) return userData.value.fullName;
      const first = props.request.firstName || userData.value?.firstName || '';
      const last = props.request.lastName || userData.value?.lastName || '';
      return `${first} ${last}`.trim() || 'No name provided';
    });

    const userEmail = computed(() => {
      return props.request.email || userData.value?.email || 'No email provided';
    });

    const userPhone = computed(() => {
      // First try to get from userData
      if (userData.value?.phone) return userData.value.phone;
      
      // Then try to get from localStorage directly
      const phone = localStorage.getItem(`phone_${props.request.userId}`);
      if (phone) return phone;
      
      return 'No phone provided';
    });

    const userProfileImage = computed(() => {
      // First try to get from userData
      if (userData.value?.profilePicture) return userData.value.profilePicture;
      
      // Then try to get from localStorage directly
      const profileImage = localStorage.getItem(`profileImage_${props.request.userId}`);
      if (profileImage) return profileImage;
      
      // Fallback to default avatar
      return defaultAvatar;
    });

    const formattedAddress = computed(() => {
      const addr = props.request.farmAddress;
      if (!addr) return 'No address provided';
      
      const parts = [
        addr.street,
        addr.barangay,
        addr.city,
        addr.province,
        addr.region
      ].filter(Boolean);
      
      return parts.join(', ') || 'No address provided';
    });

    const formattedDate = computed(() => {
      if (!props.request.date) return '';
      const date = new Date(props.request.date);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    });

    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement;
      img.src = defaultAvatar;
    };

    const openDocument = (url: string) => {
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    };

    const close = () => {
      emit('close');
    };

    const handleApprove = () => {
      try {
        const userKey = `user_${props.request.userId}`;
        const storedUser = localStorage.getItem(userKey);

        if (storedUser) {
          const user = JSON.parse(storedUser);
          user.role = 'Farmer';
          localStorage.setItem(userKey, JSON.stringify(user));
        }

        const updatedRequest: UpgradeRequest = {
          ...props.request,
          status: 'approved'
        };

        updateRequestInStorage(updatedRequest);

        emit('approved', updatedRequest);
        close();
      } catch (error) {
        console.error('Error approving upgrade request:', error);
      }
    };

    const handleReject = () => {
      try {
        const updatedRequest: UpgradeRequest = {
          ...props.request,
          status: 'rejected'
        };

        updateRequestInStorage(updatedRequest);

        emit('rejected', updatedRequest);
        close();
      } catch (error) {
        console.error('Error rejecting upgrade request:', error);
      }
    };

    const updateRequestInStorage = (updatedRequest: UpgradeRequest) => {
      try {
        const existingRequestsRaw = localStorage.getItem('upgradeRequests');
        const requests: UpgradeRequest[] = existingRequestsRaw ? JSON.parse(existingRequestsRaw) : [];

        const updatedRequests = requests.map((req: UpgradeRequest) =>
          req.userId === updatedRequest.userId ? updatedRequest : req
        );

        localStorage.setItem('upgradeRequests', JSON.stringify(updatedRequests));
      } catch (error) {
        console.error('Error updating request in storage:', error);
      }
    };

    return {
      userData,
      fullName,
      userEmail,
      userPhone,
      userProfileImage,
      formattedAddress,
      formattedDate,
      handleImageError,
      openDocument,
      close,
      handleApprove,
      handleReject
    };
  }
});
</script>