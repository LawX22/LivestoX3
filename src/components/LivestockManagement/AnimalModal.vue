<!-- AnimalModal.vue - FIXED VERSION WITH PROPER PICKUP PARSING -->
<template>
  <!-- Details Modal -->
  <div v-if="animal" class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
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

                  <!-- Delivery Options - FIXED PARSING -->
                  <div class="border-t border-gray-200 pt-4">
                    <label class="block text-xs font-semibold text-gray-700 mb-2">Delivery Options</label>
                    
                    <div v-if="deliveryInfo.hasPickup || deliveryInfo.hasDelivery" class="space-y-3">
                      <!-- Pickup Details -->
                      <div v-if="deliveryInfo.hasPickup && deliveryInfo.pickup" class="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div class="flex items-center gap-2 mb-2">
                          <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span class="text-xs font-bold text-orange-900">📦 Buyer Pickup Available</span>
                        </div>
                        
                        <div class="space-y-2">
                          <div>
                            <span class="text-xs font-semibold text-gray-700">Available Days:</span>
                            <div class="flex flex-wrap gap-1 mt-1">
                              <span v-for="day in deliveryInfo.pickup.availableDays" :key="day"
                                class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-orange-200 text-orange-900">
                                {{ day }}
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <span class="text-xs font-semibold text-gray-700">Pickup Hours:</span>
                            <div class="text-xs text-gray-900 mt-1 font-medium">
                              🕐 {{ formatTime(deliveryInfo.pickup.startTime) }} - {{ formatTime(deliveryInfo.pickup.endTime) }}
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Delivery Details -->
                      <div v-if="deliveryInfo.hasDelivery && deliveryInfo.delivery" class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="flex items-center gap-2 mb-2">
                          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                          </svg>
                          <span class="text-xs font-bold text-blue-900">🚚 Farm Delivery Available</span>
                        </div>
                        
                        <div>
                          <span class="text-xs font-semibold text-gray-700">Delivery Fee:</span>
                          <div class="text-sm font-bold text-blue-900 mt-1">
                            <span v-if="deliveryInfo.delivery.fee === 0">
                              💬 Negotiable / Free Delivery
                            </span>
                            <span v-else>
                              ₱{{ deliveryInfo.delivery.fee.toLocaleString() }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Fallback if no delivery info -->
                    <div v-else class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p class="text-xs text-gray-600 italic">No delivery information available</p>
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
                <button @click="handleEdit"
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

  <!-- Edit Modal Component -->
  <EditAnimalModal 
    :is-open="showEditModal" 
    :animal="animal"
    @close="closeEditModal"
    @updated="handleUpdated" 
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { LivestockService } from '@/services/livestockService'
import EditAnimalModal from './EditAnimalModal.vue'
import type { Animal, ParsedDeliveryOptions, ParsedPickupSchedule, ParsedDeliveryInfo } from '@/types/managementTypes'

const props = defineProps<{
  animal?: Animal | null
}>()

const emit = defineEmits<{
  close: []
  updated: []
  deleted: []
}>()

const selectedImageIndex = ref(0)
const showEditModal = ref(false)
const isDeleting = ref(false)

/**
 * ✅ FIXED ROBUST PARSING FUNCTION - Uses regex to handle time format
 */
const parseDeliveryOptionsRobust = (deliveryOptions: string[] | null | undefined): ParsedDeliveryOptions => {
  console.log('🔍 MODAL ROBUST: Parsing delivery options:', deliveryOptions)
  
  const parsed: ParsedDeliveryOptions = {
    hasPickup: false,
    hasDelivery: false
  }

  if (!deliveryOptions || !Array.isArray(deliveryOptions) || deliveryOptions.length === 0) {
    console.warn('⚠️ MODAL ROBUST: No valid delivery options provided')
    return parsed
  }

  for (const option of deliveryOptions) {
    if (!option || typeof option !== 'string') {
      console.warn('⚠️ MODAL ROBUST: Skipping invalid option:', option)
      continue
    }

    console.log('  📦 MODAL ROBUST: Processing option:', option)
    
    if (option.startsWith('pickup:')) {
      try {
        // ✅ CRITICAL FIX: Use regex to properly parse time format
        const match = option.match(/^pickup:([^:]+):(\d{2}:\d{2}):(\d{2}:\d{2})$/)
        console.log('    🔸 MODAL ROBUST: Pickup regex match:', match)
        
        if (match) {
          const [, daysStr, startTime, endTime] = match
          const days = daysStr.split('|').filter(day => day.trim().length > 0)
          
          if (days.length > 0) {
            parsed.hasPickup = true
            parsed.pickup = {
              availableDays: days,
              startTime,
              endTime
            }
            console.log('    ✅ MODAL ROBUST: Parsed pickup:', parsed.pickup)
          }
        } else {
          console.error('    ❌ MODAL ROBUST: Invalid pickup format:', option)
        }
      } catch (error) {
        console.error('    ❌ MODAL ROBUST: Error parsing pickup option:', error)
      }
    } else if (option.startsWith('delivery:')) {
      try {
        const feeStr = option.substring(9).trim()
        const fee = parseFloat(feeStr)
        console.log('    🔸 MODAL ROBUST: Delivery fee string:', feeStr, '-> parsed:', fee)
        
        if (!isNaN(fee) && fee >= 0) {
          parsed.hasDelivery = true
          parsed.delivery = {
            fee
          }
          console.log('    ✅ MODAL ROBUST: Parsed delivery:', parsed.delivery)
        }
      } catch (error) {
        console.error('    ❌ MODAL ROBUST: Error parsing delivery option:', error)
      }
    }
  }

  console.log('✅ MODAL ROBUST: Final parsed delivery options:', parsed)
  return parsed
}

/**
 * Computed property that parses delivery info with multiple fallback strategies
 */
const deliveryInfo = computed<ParsedDeliveryOptions>(() => {
  if (!props.animal?.deliveryOptions) {
    console.warn('⚠️ MODAL COMPUTED: No animal or delivery options')
    return { hasPickup: false, hasDelivery: false }
  }
  
  console.log('📦 MODAL COMPUTED: Starting delivery info computation')
  console.log('📦 MODAL COMPUTED: Raw delivery options:', props.animal.deliveryOptions)
  
  try {
    // Strategy 1: Try LivestockService.parseDeliveryInfo
    if (typeof LivestockService.parseDeliveryInfo === 'function') {
      console.log('✅ MODAL COMPUTED: Using LivestockService.parseDeliveryInfo')
      const result = LivestockService.parseDeliveryInfo(props.animal.deliveryOptions)
      console.log('✅ MODAL COMPUTED: LivestockService result:', result)
      
      if (result && (result.hasPickup || result.hasDelivery)) {
        return result
      }
      console.warn('⚠️ MODAL COMPUTED: LivestockService returned empty result, trying fallback')
    }
    
    // Strategy 2: Use robust local parser
    console.log('⚠️ MODAL COMPUTED: Using robust local parser')
    const result = parseDeliveryOptionsRobust(props.animal.deliveryOptions)
    console.log('✅ MODAL COMPUTED: Robust parser result:', result)
    return result
    
  } catch (error) {
    console.error('❌ MODAL COMPUTED: Error in all parsing strategies:', error)
    return { hasPickup: false, hasDelivery: false }
  }
})

// Watch for changes
watch(() => props.animal, (newAnimal) => {
  if (newAnimal) {
    console.log('🔄 MODAL WATCH: Animal prop changed:', {
      title: newAnimal.title,
      deliveryOptions: newAnimal.deliveryOptions
    })
  }
}, { immediate: true, deep: true })

// Methods
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatTime = (time: string): string => {
  if (!time) return ''
  try {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${period}`
  } catch (error) {
    console.error('Error formatting time:', error)
    return time
  }
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

const handleEdit = (): void => {
  showEditModal.value = true
}

const closeEditModal = (): void => {
  showEditModal.value = false
}

const handleUpdated = (): void => {
  showEditModal.value = false
  emit('updated')
  emit('close')
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

// Debug on mount
onMounted(() => {
  if (props.animal) {
    console.log('🎬 AnimalModal mounted with animal:', {
      title: props.animal.title,
      deliveryOptions: props.animal.deliveryOptions,
      parsedDelivery: deliveryInfo.value
    })
  }
})
</script>