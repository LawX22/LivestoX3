<!-- upgradeForm.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-3">
    <div class="max-w-7xl mx-auto">
      <!-- Main Form Card -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <!-- Progress Bar -->
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 h-1"></div>

        <!-- Header Inside Card -->
        <div class="text-center py-4 border-b border-gray-100">
          <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3">
              </path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Upgrade to Farmer</h1>
          <p class="text-gray-600 text-sm">Provide your farming details to request an upgrade to a Farmer account</p>
        </div>

        <!-- Loading State -->
        <div v-if="loadingData" class="flex items-center justify-center py-20">
          <div class="text-center">
            <svg class="animate-spin w-10 h-10 text-green-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            <p class="text-gray-600 text-sm">Loading your information...</p>
          </div>
        </div>

        <!-- Already Has Pending Request Message -->
        <div v-else-if="hasPendingRequest" class="p-12">
          <div class="max-w-md mx-auto text-center">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Request Already Pending</h2>
            <p class="text-gray-600 mb-6">
              You already have a pending upgrade request. Please wait for our admin team to review and approve your application.
            </p>
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p class="text-sm text-yellow-800">
                <strong>What happens next?</strong><br>
                Our team typically reviews upgrade requests within 1-3 business days. You'll receive a notification once your request is reviewed.
              </p>
            </div>
            <button 
              @click="router.back()" 
              class="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Profile
            </button>
          </div>
        </div>

        <form v-else @submit.prevent="handleUpgradeRequest" class="flex flex-col">
          <!-- Main Content Area -->
          <div class="flex h-[calc(100vh-280px)]">
            <!-- Left Side - Personal Info, Farm Details, Address (Scrollable) -->
            <div class="w-1/2 flex flex-col">
              <div class="flex-1 overflow-y-auto p-6 space-y-6">
                <!-- Personal Information Section -->
                <div class="space-y-3">
                  <h3 class="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Personal Information
                  </h3>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                      <input v-model="form.fullName" type="text" readonly
                        class="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md focus:outline-none text-gray-600 text-sm" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                      <input v-model="form.phone" type="tel" readonly
                        class="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md focus:outline-none text-gray-600 text-sm" />
                    </div>
                  </div>
                </div>

                <!-- Farm Information Section -->
                <div class="space-y-3">
                  <h3 class="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                      </path>
                    </svg>
                    Farm Details
                  </h3>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Farm Name *</label>
                    <input v-model="form.farmName" type="text" required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                      placeholder="Enter your farm name" />
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Farm Size *</label>
                      <input v-model="form.farmSize" type="number" required min="0.1" step="0.1"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        placeholder="0.0" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Unit *</label>
                      <select v-model="form.farmSizeUnit" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm">
                        <option value="" disabled>Select unit</option>
                        <option v-for="unit in farmSizeUnits" :key="unit" :value="unit">{{ unit }}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Type of Livestock *</label>
                    <div class="relative">
                      <select v-model="selectedLivestock" @change="addLivestockType"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm appearance-none">
                        <option value="">Select livestock type</option>
                        <option v-for="type in livestockTypes" :key="type" :value="type" :disabled="form.livestockTypes.includes(type)">
                          {{ type }}
                        </option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    
                    <div v-if="form.livestockTypes.length > 0" class="mt-2 flex flex-wrap gap-2">
                      <div v-for="(type, index) in form.livestockTypes" :key="index" 
                           class="inline-flex items-center bg-green-50 text-green-800 text-xs px-2 py-1 rounded-full">
                        {{ type }}
                        <button type="button" @click="removeLivestockType(index)" class="ml-1 text-green-600 hover:text-green-800">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Short Description or Purpose *</label>
                    <textarea v-model="form.description" rows="3" required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors resize-none text-sm"
                      placeholder="Tell us about your farm..."></textarea>
                  </div>
                </div>

                <!-- Address Section -->
                <div class="space-y-3">
                  <h3 class="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Farm Address
                  </h3>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Select Saved Address</label>
                    <select v-model="selectedAddressIndex" @change="applySelectedAddress"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm mb-2">
                      <option value="-1">— Select Saved Address —</option>
                      <option v-for="(addr, idx) in userAddresses" :key="addr.id || idx" :value="idx">
                        {{ addr.label || 'Address' }} - {{ addr.street }}, {{ addr.barangay }}, {{ addr.city }}
                      </option>
                    </select>
                  </div>

                  <div v-if="selectedAddressIndex >= 0 && userAddresses[selectedAddressIndex]" class="bg-green-50 border border-green-200 rounded-md p-3 text-xs">
                    <div class="grid grid-cols-2 gap-2">
                      <div><span class="font-medium">Region:</span> {{ userAddresses[selectedAddressIndex].region }}</div>
                      <div><span class="font-medium">Province:</span> {{ userAddresses[selectedAddressIndex].province }}</div>
                      <div><span class="font-medium">City:</span> {{ userAddresses[selectedAddressIndex].city }}</div>
                      <div><span class="font-medium">Barangay:</span> {{ userAddresses[selectedAddressIndex].barangay }}</div>
                      <div class="col-span-2"><span class="font-medium">Street:</span> {{ userAddresses[selectedAddressIndex].street }}</div>
                    </div>
                  </div>

                  <div v-else class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Region *</label>
                      <input v-model="form.region" required type="text" placeholder="Enter region"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Province *</label>
                      <input v-model="form.province" required type="text" placeholder="Enter province"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">City *</label>
                      <input v-model="form.city" required type="text" placeholder="Enter city"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Barangay *</label>
                      <input v-model="form.barangay" required type="text" placeholder="Enter barangay"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm" />
                    </div>
                    <div class="col-span-2">
                      <label class="block text-xs font-medium text-gray-700 mb-1">Street Address *</label>
                      <input v-model="form.street" required type="text" placeholder="Enter street address"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Side - Documents -->
            <div class="w-1/2 border-l border-gray-200 flex flex-col">
              <div class="p-6 border-b border-gray-100">
                <h3 class="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                  </svg>
                  Required Documents
                </h3>
              </div>

              <div class="flex-1 overflow-y-auto p-6 space-y-6">
                <!-- Business Permit -->
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-2">Business Permit / Registration *</label>
                  <div
                    class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-green-500 transition-colors">
                    <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                      </path>
                    </svg>
                    <input type="file" accept="image/*,.pdf" @change="(e) => handleFileUpload(e, 'businessPermit')"
                      class="hidden" id="businessPermit" />
                    <label for="businessPermit" class="cursor-pointer">
                      <span class="text-sm text-gray-600 block">Upload business permit</span>
                      <p class="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                    </label>
                  </div>
                  <!-- Business Permit Preview -->
                  <div v-if="fileData.businessPermit" class="mt-3">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-gray-700">Uploaded:</span>
                      <button type="button" @click="fileData.businessPermit = ''"
                        class="text-red-500 hover:text-red-700 text-sm">
                        Remove
                      </button>
                    </div>
                    <div class="border border-gray-200 rounded-md p-3">
                      <img
                        v-if="typeof fileData.businessPermit === 'string' && fileData.businessPermit.startsWith('data:image')"
                        :src="fileData.businessPermit" alt="Business Permit Preview" class="max-h-32 mx-auto" />
                      <div v-else class="flex items-center justify-center p-4 bg-gray-100 rounded text-sm">
                        <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                          </path>
                        </svg>
                        <span class="text-gray-600">PDF Document</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Farm Photos -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Farm Photos *</label>
                  <div
                    class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-green-500 transition-colors">
                    <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                      </path>
                    </svg>
                    <input type="file" multiple accept="image/*" @change="handleMultipleFileUpload" class="hidden"
                      id="farmPhotos" />
                    <label for="farmPhotos" class="cursor-pointer">
                      <span class="text-sm text-gray-600 block">Upload farm photos</span>
                      <p class="text-xs text-gray-500 mt-1">Multiple images allowed</p>
                    </label>
                  </div>
                  <!-- Farm Photos Preview -->
                  <div v-if="fileData.farmPhotos.length > 0" class="mt-3">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-gray-700">Photos ({{ fileData.farmPhotos.length }}):</span>
                      <button type="button" @click="fileData.farmPhotos = []"
                        class="text-red-500 hover:text-red-700 text-sm">
                        Remove All
                      </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <div v-for="(photo, index) in fileData.farmPhotos" :key="index" class="relative group">
                        <img :src="photo" alt="Farm Photo"
                          class="h-24 w-full object-cover rounded border border-gray-200" />
                        <button type="button" @click="removeFarmPhoto(index)"
                          class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Messages - Centered above buttons -->
          <div class="px-6">
            <div v-if="submitted" class="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <div class="flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                  </path>
                </svg>
                <span class="text-green-800 font-medium text-sm">Request submitted successfully!</span>
              </div>
              <p class="text-green-700 text-xs mt-1 text-center">We'll review your application and get back to you soon.</p>
            </div>

            <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div class="flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-red-800 font-medium text-sm">{{ error }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons (Centered across both sides) -->
          <div class="flex justify-center gap-4 p-6 border-t border-gray-100">
            <button type="button" @click="router.back()"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18">
                </path>
              </svg>
              Back
            </button>
            <button type="submit" :disabled="isSubmitting"
              class="px-8 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-md hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
              <svg v-if="isSubmitting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isSubmitting ? 'Submitting...' : 'Submit Upgrade Request' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ProfileService } from '@/services/profileService'
import { UpgradeService } from '@/services/upgradeService'
import type { Address } from '@/types/user'
import { livestockTypes, farmSizeUnits } from '@/services/UpgradeFormDetails'

const router = useRouter()
const authStore = useAuthStore()

const loadingData = ref(true)
const hasPendingRequest = ref(false)
const submitted = ref(false)
const error = ref('')
const isSubmitting = ref(false)

const form = ref({
  fullName: '',
  phone: '',
  farmName: '',
  region: '',
  province: '',
  city: '',
  barangay: '',
  street: '',
  farmSize: '',
  farmSizeUnit: 'hectares',
  livestockTypes: [] as string[],
  description: ''
})

const fileData = ref({
  businessPermit: '',
  farmPhotos: [] as string[]
})

const userAddresses = ref<Address[]>([])
const selectedAddressIndex = ref(-1)
const selectedLivestock = ref('')

onMounted(async () => {
  await loadUserData()
})

const loadUserData = async () => {
  try {
    loadingData.value = true
    error.value = ''

    if (!authStore.initialized) {
      await authStore.initialize()
    }

    const userId = authStore.userId

    if (!userId) {
      error.value = 'You must be logged in to submit an upgrade request'
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    console.log('📋 Loading user data for:', userId)

    // Check for existing pending request FIRST
    const pendingRequest = await UpgradeService.getUserPendingRequest(userId)
    if (pendingRequest) {
      console.log('⚠️  Found existing pending request:', pendingRequest.id)
      hasPendingRequest.value = true
      loadingData.value = false
      return
    }

    const userProfile = await ProfileService.getProfile(userId)

    if (userProfile) {
      form.value.fullName = `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || authStore.userFullName
      form.value.phone = userProfile.phoneNumber || ''

      if (userProfile.addresses && userProfile.addresses.length > 0) {
        userAddresses.value = userProfile.addresses
        console.log('✅ Loaded', userAddresses.value.length, 'addresses')
      }
    } else {
      form.value.fullName = authStore.userFullName
      console.warn('⚠️  Profile not found, using auth store data')
    }

    console.log('✅ User data loaded successfully')
  } catch (err) {
    console.error('❌ Error loading user data:', err)
    error.value = 'Failed to load user data. Please try again.'
  } finally {
    loadingData.value = false
  }
}

const addLivestockType = () => {
  if (selectedLivestock.value && !form.value.livestockTypes.includes(selectedLivestock.value)) {
    form.value.livestockTypes.push(selectedLivestock.value)
    selectedLivestock.value = ''
  }
}

const removeLivestockType = (index: number) => {
  form.value.livestockTypes.splice(index, 1)
}

const applySelectedAddress = () => {
  const index = selectedAddressIndex.value
  if (index >= 0 && userAddresses.value[index]) {
    const selected = userAddresses.value[index]
    form.value.region = selected.region || ''
    form.value.province = selected.province || ''
    form.value.city = selected.city || ''
    form.value.barangay = selected.barangay || ''
    form.value.street = selected.street || ''
  } else {
    form.value.region = ''
    form.value.province = ''
    form.value.city = ''
    form.value.barangay = ''
    form.value.street = ''
  }
}

const handleFileUpload = (event: Event, field: 'businessPermit') => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target?.result) {
        fileData.value[field] = e.target.result as string
      }
    }

    reader.readAsDataURL(file)
  }
}

const handleMultipleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    Array.from(input.files).forEach(file => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          fileData.value.farmPhotos.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    })
  }
}

const removeFarmPhoto = (index: number) => {
  fileData.value.farmPhotos.splice(index, 1)
}

const handleUpgradeRequest = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  error.value = ''

  try {
    const userId = authStore.userId

    if (!userId) {
      throw new Error('User ID not found. Please log in again.')
    }

    // Double-check for pending request before submitting
    const existingRequest = await UpgradeService.getUserPendingRequest(userId)
    if (existingRequest) {
      hasPendingRequest.value = true
      error.value = 'You already have a pending upgrade request.'
      return
    }

    // Validate required fields
    if (
      !form.value.farmName || !form.value.region || !form.value.province || !form.value.city ||
      !form.value.barangay || !form.value.street || !form.value.farmSize ||
      form.value.livestockTypes.length === 0 || !form.value.description
    ) {
      throw new Error('Please fill in all required fields.')
    }

    if (!fileData.value.businessPermit) throw new Error('Business permit document is required.')
    if (fileData.value.farmPhotos.length === 0) throw new Error('At least one farm photo is required.')

    console.log('📤 Submitting upgrade request to Supabase...')

    // Create upgrade request using UpgradeService
    const result = await UpgradeService.createUpgradeRequest(
      userId,
      {
        farmName: form.value.farmName,
        farmSize: parseFloat(form.value.farmSize),
        farmSizeUnit: form.value.farmSizeUnit,
        livestockTypes: form.value.livestockTypes,
        description: form.value.description,
        region: form.value.region,
        province: form.value.province,
        city: form.value.city,
        barangay: form.value.barangay,
        street: form.value.street
      },
      fileData.value.businessPermit,
      fileData.value.farmPhotos
    )

    if (!result.success) {
      throw new Error(result.error || 'Failed to submit upgrade request')
    }

    // Save new address if not selected from existing ones
    if (selectedAddressIndex.value === -1) {
      const newAddress: Partial<Address> = {
        label: `${form.value.farmName} Farm`,
        region: form.value.region,
        province: form.value.province,
        city: form.value.city,
        barangay: form.value.barangay,
        street: form.value.street,
        isDefault: false
      }

      const addressExists = userAddresses.value.some((addr: Address) =>
        addr.region === newAddress.region &&
        addr.province === newAddress.province &&
        addr.city === newAddress.city &&
        addr.barangay === newAddress.barangay &&
        addr.street === newAddress.street
      )

      if (!addressExists) {
        const addressResult = await ProfileService.addAddress(userId, newAddress as Address)
        if (addressResult.success) {
          console.log('✅ New address saved')
        }
      }
    }

    console.log('✅ Upgrade request submitted successfully!')
    submitted.value = true
    
    setTimeout(() => {
      router.back()
    }, 2000)

  } catch (err) {
    console.error('❌ Error submitting upgrade request:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>