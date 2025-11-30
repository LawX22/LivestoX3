<!-- LivestockDetailModal.vue - COMPACT ADMIN VIEW VERSION -->
<template>
  <div v-if="visible" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
    @click.self="close">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] relative flex flex-col overflow-hidden">
      <!-- Close Button -->
      <button @click="close"
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-4 h-full min-h-0 p-6">
        <!-- LEFT: Livestock Information -->
        <div class="w-full lg:w-3/5 flex flex-col min-h-0">
          <h2 class="text-2xl font-bold text-emerald-600 mb-4">
            Livestock Details
          </h2>

          <!-- Image Gallery -->
          <div class="mb-4">
            <div class="relative group">
              <img :src="currentImage" 
                class="w-full h-64 object-cover rounded-lg border border-gray-200"
                :alt="listing?.title"
                @error="handleImageError" />
              
              <!-- Status Badge -->
              <div class="absolute top-3 right-3">
                <span :class="statusBadgeClass(listing?.status)" 
                  class="px-3 py-1 rounded-lg font-bold text-xs shadow-lg">
                  {{ listing?.status }}
                </span>
              </div>

              <!-- Price Overlay -->
              <div class="absolute bottom-3 left-3 right-3 bg-emerald-600 rounded-lg p-3 shadow-lg">
                <p class="text-xs text-white/90">Price</p>
                <p class="text-2xl font-bold text-white">₱{{ formatPrice(listing?.price) }}</p>
                <p class="text-xs text-white/75">{{ listing?.priceUnit }}</p>
              </div>
            </div>

            <!-- Thumbnail Gallery -->
            <div v-if="listing?.images && listing.images.length > 1" class="flex gap-2 mt-2">
              <button
                v-for="(image, index) in listing.images.slice(0, 4)"
                :key="index"
                @click="currentImageIndex = index"
                :class="[
                  'w-16 h-16 rounded-md border-2 overflow-hidden transition-all',
                  currentImageIndex === index ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200'
                ]">
                <img :src="image" 
                  class="w-full h-full object-cover"
                  :alt="`Thumbnail ${index + 1}`"
                  @error="handleImageError" />
              </button>
            </div>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            <!-- Basic Information -->
            <div>
              <h3 class="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Basic Information
              </h3>

              <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Title:</span>
                  <span class="font-medium text-gray-900">{{ listing?.title }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Type:</span>
                  <span class="font-medium text-gray-900">{{ listing?.type }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Breed:</span>
                  <span class="font-medium text-gray-900">{{ listing?.breed }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Age:</span>
                  <span class="font-medium text-gray-900">{{ listing?.age }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Weight:</span>
                  <span class="font-medium text-gray-900">{{ listing?.weight }}{{ listing?.weightUnit }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Gender:</span>
                  <span class="font-medium text-gray-900">{{ listing?.gender }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Location:</span>
                  <span class="font-medium text-gray-900">{{ listing?.location }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Quantity:</span>
                  <span class="font-medium text-gray-900">{{ listing?.quantity }} / {{ listing?.originalQuantity }}</span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <h3 class="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Description
              </h3>
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p class="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{{ listing?.description }}</p>
              </div>
            </div>

            <!-- Health Status -->
            <div v-if="listing?.healthStatus && listing.healthStatus.length > 0">
              <h3 class="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Health Status
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(status, index) in listing.healthStatus"
                  :key="index"
                  class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {{ status }}
                </span>
              </div>
            </div>

            <!-- Delivery Options -->
            <div v-if="deliveryInfo.hasPickup || deliveryInfo.hasDelivery">
              <h3 class="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                Delivery Options
              </h3>
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2 text-sm">
                <div v-if="deliveryInfo.hasPickup">
                  <span class="font-semibold text-gray-700">Pickup Available:</span>
                  <div class="mt-1">
                    <span class="text-gray-600">Days: </span>
                    <span class="text-gray-900">{{ deliveryInfo.pickup?.availableDays.join(', ') }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Hours: </span>
                    <span class="text-gray-900">{{ deliveryInfo.pickup?.startTime }} - {{ deliveryInfo.pickup?.endTime }}</span>
                  </div>
                </div>
                <div v-if="deliveryInfo.hasDelivery">
                  <span class="font-semibold text-gray-700">Delivery Available:</span>
                  <span class="text-gray-900"> ₱{{ deliveryInfo.delivery?.fee }}</span>
                </div>
              </div>
            </div>

            <!-- Payment Methods -->
            <div v-if="listing?.paymentMethods && listing.paymentMethods.length > 0">
              <h3 class="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Methods
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(method, index) in listing.paymentMethods"
                  :key="index"
                  class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {{ method }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Farmer Info -->
        <div class="w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-4 pt-4 lg:pt-0 space-y-4">
          <h2 class="text-2xl font-bold text-blue-600 mb-4">
            Farmer Info
          </h2>

          <!-- Farmer Information -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div class="flex items-center gap-3 mb-3">
              <img 
                :src="listing?.farmer.avatar" 
                class="w-12 h-12 rounded-full border-2 border-blue-200"
                :alt="listing?.farmer.name"
                @error="handleAvatarError"
              />
              <div>
                <h3 class="font-bold text-gray-900">{{ listing?.farmer.name }}</h3>
                <p v-if="listing?.farmer.farmName" class="text-sm text-gray-600">{{ listing.farmer.farmName }}</p>
              </div>
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="text-gray-900">{{ listing?.farmer.contact }}</span>
              </div>
              <div v-if="listing?.farmer.email" class="flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-900">{{ listing.farmer.email }}</span>
              </div>
              <div class="flex items-start gap-2">
                <svg class="w-4 h-4 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-gray-900">{{ listing?.farmer.address }}</span>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Timeline
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Posted:</span>
                <span class="text-gray-900 font-medium">{{ formatDate(listing?.datePosted) }}</span>
              </div>
            </div>
          </div>

          <!-- Listing Stats -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-bold text-gray-800 mb-3">Listing Statistics</h3>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500">Total Value</p>
                <p class="text-lg font-bold text-gray-900">₱{{ formatPrice((listing?.price || 0) * (listing?.quantity || 0)) }}</p>
              </div>
              <div class="bg-white rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500">Available</p>
                <p class="text-lg font-bold text-gray-900">{{ listing?.quantity }} / {{ listing?.originalQuantity }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 pb-6 pt-4 border-t border-gray-200 flex justify-end">
        <button @click="close" 
          class="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-all">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { LivestockService } from '../../services/livestockService'
import type { Animal, ParsedDeliveryOptions } from '../../types/managementTypes'

const props = defineProps<{
  visible: boolean
  listing: Animal | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const defaultImage = 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
const currentImageIndex = ref(0)

// Parse delivery options
const deliveryInfo = computed<ParsedDeliveryOptions>(() => {
  if (!props.listing?.deliveryOptions) {
    return {
      hasPickup: false,
      hasDelivery: false
    }
  }
  return LivestockService.parseDeliveryInfo(props.listing.deliveryOptions)
})

// Prevent body scroll when modal is open
watch(() => props.visible, (visible) => {
  if (visible) {
    document.body.style.overflow = 'hidden'
    currentImageIndex.value = 0 // Reset to first image when opening
  } else {
    document.body.style.overflow = ''
  }
})

const currentImage = computed(() => {
  if (props.listing?.images && props.listing.images.length > 0) {
    return props.listing.images[currentImageIndex.value]
  }
  return defaultImage
})

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = defaultImage
}

const handleAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = defaultAvatar
}

const formatDate = (date?: string): string => {
  if (!date) return 'N/A'
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'N/A'
  }
}

const formatPrice = (price?: number): string => {
  if (!price) return '0'
  return price.toLocaleString('en-PH')
}

const statusBadgeClass = (status?: string): string => {
  const base = 'border-2'
  switch (status) {
    case 'Available':
      return `${base} bg-green-500/90 text-white border-green-300`
    case 'Low Stock':
      return `${base} bg-yellow-500/90 text-white border-yellow-300`
    case 'Out of Stock':
      return `${base} bg-red-500/90 text-white border-red-300`
    default:
      return `${base} bg-gray-500/90 text-white border-gray-300`
  }
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
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