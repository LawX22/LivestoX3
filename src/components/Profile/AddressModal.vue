<!-- AddressModal.vue with NCR Support - FIXED -->
<template>
  <transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-300"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop with blur effect -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click.self="$emit('close')"></div>

      <!-- Modal Container -->
      <div class="relative w-full max-w-5xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 transform transition-all duration-300 ease-out flex flex-col">
        
        <!-- Floating background elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-4 right-4 w-8 h-8 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
          <div class="absolute top-12 right-16 w-6 h-6 bg-emerald-300 rounded-full opacity-15 animate-bounce" style="animation-delay: 1s"></div>
          <div class="absolute bottom-8 left-8 w-7 h-7 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
        </div>

        <!-- Header -->
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-4 text-white relative overflow-hidden flex-shrink-0">
          <div class="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -translate-y-8 translate-x-8 animate-pulse"></div>
          <div class="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-10 rounded-full translate-y-6 -translate-x-6 animate-pulse"></div>
          
          <div class="relative z-10 flex items-center">
            <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                {{ address ? 'Edit Address' : 'Add New Address' }}
              </h3>
              <p class="text-green-100 text-xs opacity-90">Complete your address information</p>
            </div>
          </div>
        </div>

        <!-- Content Area - Scrollable -->
        <div class="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-gray-50/50 to-white relative">
          <!-- Progress indicator -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Address Information</span>
              <span class="text-xs text-gray-500">Complete Form</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1">
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 h-1 rounded-full w-full transition-all duration-500"></div>
            </div>
          </div>

          <!-- Loading Indicator -->
          <div v-if="isLoadingLocations" class="text-center py-4">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p class="text-xs text-gray-500 mt-2">Loading location data...</p>
          </div>

          <!-- Compact 3 Column Layout -->
          <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <!-- Column 1 - Personal Info -->
            <div class="space-y-3">
              <div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
                <h4 class="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  Personal Details
                </h4>
                
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                    <div class="relative">
                      <input
                        v-model="fullName"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 pl-7"
                        readonly
                      />
                      <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                    <div class="relative">
                      <input
                        v-model="phoneNumber"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 pl-7"
                        readonly
                      />
                      <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Default Address Toggle -->
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200/50">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    v-model="isDefault"
                    class="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all duration-200"
                  />
                  <label for="isDefault" class="ml-2 flex-1 cursor-pointer">
                    <div class="text-xs font-semibold text-gray-800">Set as Default</div>
                    <div class="text-xs text-gray-600">Primary delivery address</div>
                  </label>
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Column 2 - Location Info (CASCADING DROPDOWNS with NCR Support) -->
            <div class="space-y-3">
              <div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
                <h4 class="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  Location Details
                </h4>
                
                <div class="space-y-2">
                  <!-- Region Dropdown -->
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Region *</label>
                    <div class="relative">
                      <select
                        v-model="selectedRegion"
                        @change="onRegionChange"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 appearance-none cursor-pointer"
                      >
                        <option value="">Select Region</option>
                        <option v-for="reg in regions" :key="reg.code" :value="reg.code">
                          {{ reg.regionName }}
                        </option>
                      </select>
                      <div class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Province Dropdown - Hidden for NCR -->
                  <div v-if="!isNCR">
                    <label class="block text-xs font-medium text-gray-600 mb-1">Province *</label>
                    <div class="relative">
                      <select
                        v-model="selectedProvince"
                        @change="onProvinceChange"
                        :disabled="!selectedRegion || provinces.length === 0"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">{{ selectedRegion ? 'Select Province' : 'Select Region First' }}</option>
                        <option v-for="prov in provinces" :key="prov.code" :value="prov.code">
                          {{ prov.name }}
                        </option>
                      </select>
                      <div class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- NCR Info Badge -->
                  <div v-if="isNCR" class="bg-blue-50 border border-blue-200 rounded-lg p-2 flex items-center">
                    <svg class="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-xs text-blue-700 font-medium">Metro Manila (No Province)</span>
                  </div>

                  <!-- City Dropdown -->
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">City/Municipality *</label>
                    <div class="relative">
                      <select
                        v-model="selectedCity"
                        @change="onCityChange"
                        :disabled="isNCR ? !selectedRegion : (!selectedProvince || cities.length === 0)"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">
                          {{ isNCR 
                            ? (selectedRegion ? 'Select City' : 'Select Region First')
                            : (selectedProvince ? 'Select City/Municipality' : 'Select Province First') 
                          }}
                        </option>
                        <option v-for="c in cities" :key="c.code" :value="c.code">
                          {{ c.name }}
                        </option>
                      </select>
                      <div class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Barangay Dropdown -->
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Barangay</label>
                    <div class="relative">
                      <select
                        v-model="selectedBarangay"
                        :disabled="!selectedCity || barangays.length === 0"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">{{ selectedCity ? 'Select Barangay (Optional)' : 'Select City First' }}</option>
                        <option v-for="brgy in barangays" :key="brgy.code" :value="brgy.name">
                          {{ brgy.name }}
                        </option>
                      </select>
                      <div class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Column 3 - Additional Info -->
            <div class="space-y-3">
              <div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
                <h4 class="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <div class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                  Additional Info
                </h4>
                
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Street</label>
                    <input
                      v-model="street"
                      placeholder="Enter street address"
                      class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Zip Code (Optional)</label>
                    <input
                      v-model="zipCode"
                      placeholder="Enter zip code"
                      class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Label</label>
                    <div class="relative">
                      <select
                        v-model="label"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 appearance-none cursor-pointer"
                      >
                        <option value="Home">🏠 Home</option>
                        <option value="Work">🏢 Work</option>
                        <option value="Other">📍 Other</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="text-xs font-medium text-gray-600 mb-1 flex items-center">
                      <svg class="w-3 h-3 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                      </svg>
                      Additional Notes
                    </label>
                    <textarea
                      v-model="description"
                      rows="3"
                      placeholder="Landmarks, delivery instructions..."
                      class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 flex justify-between items-center border-t border-gray-200/50 flex-shrink-0 backdrop-blur-sm">
          <div class="flex items-center text-xs text-gray-500">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            Secure & encrypted
          </div>
          
          <div class="flex items-center space-x-3">
            <button
              @click="$emit('close')"
              class="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm cursor-pointer"
            >
              Cancel
            </button>
            
            <button
              v-if="address"
              @click="deleteAddress"
              class="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg class="w-3 h-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-2 0v1H5a2 2 0 00-2 2v1a1 1 0 001 1h12a1 1 0 001-1V5a2 2 0 00-2-2h-2V2a1 1 0 10-2 0v1H9V2zM4 9a1 1 0 011-1h10a1 1 0 011 1v7a2 2 0 01-2 2H6a2 2 0 01-2-2V9z" clip-rule="evenodd" />
              </svg>
              Delete
            </button>
            
            <button
              @click="saveAddress"
              :disabled="isLoadingLocations"
              class="px-6 py-2 text-xs font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-3 h-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ address ? 'Update Address' : 'Save Address' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { ProfileService } from '@/services/profileService'
import { LocationService, type Region, type Province, type CityMunicipality, type Barangay } from '@/services/locationService'

interface Address {
  id?: string
  fullName?: string
  phoneNumber?: string
  region?: string
  province?: string
  city?: string
  barangay?: string
  street?: string
  zipCode?: string
  description?: string
  label?: string
  isDefault?: boolean
  created_at?: string
}

const props = defineProps<{
  visible: boolean
  address: Address | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: Address): void
  (e: 'delete'): void
}>()

const authStore = useAuthStore()

// Form fields
const fullName = ref('')
const phoneNumber = ref('')
const street = ref('')
const zipCode = ref('')
const description = ref('')
const label = ref('Home')
const isDefault = ref(false)

// Cascading dropdown data
const regions = ref<Region[]>([])
const provinces = ref<Province[]>([])
const cities = ref<CityMunicipality[]>([])
const barangays = ref<Barangay[]>([])

// Selected values
const selectedRegion = ref('')
const selectedProvince = ref('')
const selectedCity = ref('')
const selectedBarangay = ref('')

// Loading states
const isLoadingLocations = ref(false)
const originalOverflow = ref('')

// Check if selected region is NCR
const isNCR = computed(() => {
  if (!selectedRegion.value) return false
  const region = regions.value.find(r => r.code === selectedRegion.value)
  return region?.regionName?.includes('NCR') || 
         region?.name?.includes('NCR') || 
         region?.regionName?.includes('Metro Manila') ||
         LocationService.isNCRRegion(selectedRegion.value)
})

// Load regions on mount
onMounted(async () => {
  try {
    isLoadingLocations.value = true
    regions.value = await LocationService.getRegions()
  } catch (error) {
    console.error('Error loading regions:', error)
  } finally {
    isLoadingLocations.value = false
  }

  if (props.visible) {
    await loadUserInfo()
  }
})

// Load user info
const loadUserInfo = async () => {
  try {
    const userId = authStore.userId
    if (!userId) return

    const profile = await ProfileService.getProfile(userId)
    if (profile) {
      fullName.value = `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
      phoneNumber.value = profile.phoneNumber || ''
    }
  } catch (error) {
    console.error('Error loading user info:', error)
  }
}

// Cascading dropdown handlers
const onRegionChange = async () => {
  // Reset dependent fields
  selectedProvince.value = ''
  selectedCity.value = ''
  selectedBarangay.value = ''
  provinces.value = []
  cities.value = []
  barangays.value = []

  if (!selectedRegion.value) return

  try {
    // Check if NCR - load cities directly
    if (LocationService.isNCRRegion(selectedRegion.value)) {
      cities.value = await LocationService.getCities(selectedRegion.value)
    } else {
      // Regular region - load provinces
      provinces.value = await LocationService.getProvinces(selectedRegion.value)
    }
  } catch (error) {
    console.error('Error loading location data:', error)
  }
}

const onProvinceChange = async () => {
  // Reset dependent fields
  selectedCity.value = ''
  selectedBarangay.value = ''
  cities.value = []
  barangays.value = []

  if (!selectedProvince.value) return

  try {
    cities.value = await LocationService.getCities(selectedProvince.value)
  } catch (error) {
    console.error('Error loading cities:', error)
  }
}

const onCityChange = async () => {
  // Reset dependent field
  selectedBarangay.value = ''
  barangays.value = []

  if (!selectedCity.value) return

  try {
    barangays.value = await LocationService.getBarangays(selectedCity.value)
  } catch (error) {
    console.error('Error loading barangays:', error)
  }
}

const lockBodyScroll = () => {
  originalOverflow.value = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = originalOverflow.value
}

const resetForm = () => {
  selectedRegion.value = ''
  selectedProvince.value = ''
  selectedCity.value = ''
  selectedBarangay.value = ''
  provinces.value = []
  cities.value = []
  barangays.value = []
  street.value = ''
  zipCode.value = ''
  description.value = ''
  label.value = 'Home'
  isDefault.value = false
}

watch(
  () => props.visible,
  async (visible) => {
    if (visible) {
      lockBodyScroll()
      await loadUserInfo()
    } else {
      unlockBodyScroll()
      resetForm()
    }
  }
)

watch(
  () => props.address,
  async (addr) => {
    if (addr) {
      fullName.value = addr.fullName || ''
      phoneNumber.value = addr.phoneNumber || ''
      street.value = addr.street || ''
      zipCode.value = addr.zipCode || ''
      description.value = addr.description || ''
      label.value = addr.label || 'Home'
      isDefault.value = addr.isDefault || false

      // For editing: try to match stored values to codes
      if (addr.region) {
        const region = regions.value.find(r => 
          r.regionName === addr.region || 
          r.name === addr.region ||
          (r.regionName && addr.region && r.regionName.includes(addr.region)) ||
          (r.regionName && addr.region && addr.region.includes(r.regionName))
        )
        
        if (region) {
          selectedRegion.value = region.code
          await onRegionChange()
          
          // Check if NCR - skip province loading
          if (!isNCR.value && addr.province) {
            const province = provinces.value.find(p => p.name === addr.province)
            if (province) {
              selectedProvince.value = province.code
              await onProvinceChange()
            }
          }
          
          // Load city
          if (addr.city) {
            // Give time for cities to load
            await new Promise(resolve => setTimeout(resolve, 100))
            const city = cities.value.find(c => c.name === addr.city)
            if (city) {
              selectedCity.value = city.code
              await onCityChange()
              
              if (addr.barangay) {
                selectedBarangay.value = addr.barangay
              }
            }
          }
        }
      }
    } else {
      resetForm()
      await loadUserInfo()
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  unlockBodyScroll()
})

const saveAddress = () => {
  // Validation
  if (!fullName.value.trim()) {
    alert('Full name is required. Please update your profile first.')
    return
  }

  if (!phoneNumber.value.trim()) {
    alert('Phone number is required. Please update your profile first.')
    return
  }

  if (!selectedRegion.value) {
    alert('Region is required')
    return
  }

  // Get region info
  const region = regions.value.find(r => r.code === selectedRegion.value)
  const isNCRRegion = region?.regionName?.includes('NCR') || 
                      region?.name?.includes('NCR') || 
                      LocationService.isNCRRegion(selectedRegion.value)

  // Province validation - skip for NCR
  if (!isNCRRegion && !selectedProvince.value) {
    alert('Province is required')
    return
  }

  if (!selectedCity.value) {
    alert('City is required')
    return
  }

  // Get the actual names from the selected codes
  const regionName = region?.regionName || ''
  const provinceName = isNCRRegion 
    ? 'Metro Manila' 
    : (provinces.value.find(p => p.code === selectedProvince.value)?.name || '')
  const cityName = cities.value.find(c => c.code === selectedCity.value)?.name || ''

  const compiledAddress: Address = {
    id: props.address?.id,
    fullName: fullName.value.trim(),
    phoneNumber: phoneNumber.value.trim(),
    region: regionName,
    province: provinceName,
    city: cityName,
    barangay: selectedBarangay.value.trim(),
    street: street.value.trim(),
    zipCode: zipCode.value.trim(),
    description: description.value.trim(),
    label: label.value,
    isDefault: isDefault.value,
    created_at: props.address?.created_at || new Date().toISOString()
  }

  emit('save', compiledAddress)
}

const deleteAddress = () => {
  if (confirm('Are you sure you want to delete this address? This action cannot be undone.')) {
    emit('delete')
  }
}
</script>

<style scoped>
select {
  cursor: pointer;
}

* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>