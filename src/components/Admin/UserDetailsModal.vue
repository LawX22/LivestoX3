<!-- userDetailsModal.vue -->
<template>
  <div v-if="visible" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-white/30"
    @click.self="close">
    <div class="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-5xl max-h-[95vh] relative flex flex-col overflow-hidden border border-gray-100">
      <!-- Close Button -->
      <button @click="close"
        class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 z-50 group">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Loading State with Skeleton -->
      <div v-if="loading" class="flex flex-col h-full p-8">
        <!-- Header Skeleton -->
        <div class="mb-6 animate-pulse">
          <div class="h-9 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-56"></div>
        </div>

        <div class="flex flex-col gap-6 h-full min-h-0">
          <!-- Profile Section Skeleton -->
          <div class="flex items-start gap-4 p-5 bg-gray-100 rounded-2xl animate-pulse">
            <div class="w-24 h-24 bg-gray-300 rounded-2xl"></div>
            <div class="flex-1 space-y-3">
              <div class="h-7 bg-gray-300 rounded w-48"></div>
              <div class="h-4 bg-gray-300 rounded w-36"></div>
              <div class="h-3 bg-gray-300 rounded w-52"></div>
            </div>
          </div>

          <!-- Basic Info Skeleton -->
          <div class="flex-1 overflow-hidden">
            <div class="space-y-5">
              <div class="animate-pulse">
                <div class="h-6 bg-gray-300 rounded-lg w-40 mb-3"></div>
                <div class="bg-gray-100 rounded-xl p-4 space-y-3">
                  <div v-for="i in 5" :key="i" class="flex justify-between py-2.5">
                    <div class="h-4 bg-gray-300 rounded w-24"></div>
                    <div class="h-4 bg-gray-300 rounded w-36"></div>
                  </div>
                </div>
              </div>

              <div class="animate-pulse">
                <div class="h-6 bg-gray-300 rounded-lg w-48 mb-3"></div>
                <div class="bg-gray-100 rounded-xl p-4">
                  <div class="h-32 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Skeleton -->
        <div class="mt-6 pt-6 border-t border-gray-200 flex justify-end gap-3 animate-pulse">
          <div class="h-11 w-24 bg-gray-300 rounded-xl"></div>
          <div class="h-11 w-28 bg-gray-300 rounded-xl"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center justify-center h-full p-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-gray-600 font-medium mb-4">{{ error }}</p>
          <button @click="loadUserData" 
            class="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200">
            Try Again
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else class="flex flex-col gap-6 h-full min-h-0 p-8">
        <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          User Information
        </h2>

        <!-- Profile Section -->
        <div class="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-100 shadow-sm">
          <div class="relative flex-shrink-0">
            <!-- Default Avatar with Initials -->
            <div v-if="!computedProfilePicture || computedProfilePicture === defaultAvatar" 
              class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg ring-4 ring-white">
              {{ userInitials }}
            </div>
            <!-- User Profile Picture -->
            <img v-else
              :src="computedProfilePicture" 
              alt="Profile"
              class="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg ring-2 ring-blue-200" 
              @error="handleImageError"/>
            <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div class="min-w-0 flex-1 space-y-2">
            <h3 class="font-bold text-xl text-gray-900 truncate">{{ fullName || 'No name provided' }}</h3>
            <div class="flex items-center justify-between pt-1">
              <p class="text-xs text-gray-500 font-medium">User ID: {{ user.userId }}</p>
              <p class="text-xs text-gray-500">Joined: {{ formattedDate(userDetails?.createdAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
          <!-- Basic Information -->
          <div>
            <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Basic Information
            </h3>

            <div class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
              <div class="space-y-3">
                <div class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="font-semibold text-gray-700 text-sm">Email</span>
                  </div>
                  <span class="text-sm text-gray-900 font-medium">{{ userDetails?.email || 'Not provided' }}</span>
                </div>

                <div class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-semibold text-gray-700 text-sm">Username</span>
                  </div>
                  <span class="text-sm text-gray-900 font-medium">{{ userDetails?.username || 'Not provided' }}</span>
                </div>

                <div class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="font-semibold text-gray-700 text-sm">Phone</span>
                  </div>
                  <span class="text-sm text-gray-900 font-medium">{{ userDetails?.phoneNumber || 'Not provided' }}</span>
                </div>

                <div class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="font-semibold text-gray-700 text-sm">Role</span>
                  </div>
                  <span class="text-sm text-gray-900 font-medium capitalize">{{ userDetails?.role || 'User' }}</span>
                </div>

                <div v-if="userDetails?.gender" class="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-semibold text-gray-700 text-sm">Gender</span>
                  </div>
                  <span class="text-sm text-gray-900 font-medium capitalize">{{ userDetails?.gender }}</span>
                </div>

                <div v-if="userDetails?.bannedUntil" class="flex items-center justify-between py-2.5 bg-red-50 -mx-4 px-4 rounded-lg">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                    </svg>
                    <span class="font-semibold text-red-700 text-sm">Banned Until</span>
                  </div>
                  <span class="text-sm text-red-600 font-bold">{{ formatDate(userDetails?.bannedUntil) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div>
            <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              Address Information
            </h3>

            <div class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
              <div v-if="addresses.length > 0" class="space-y-4">
                <div v-for="(address, index) in addresses" :key="index" 
                  class="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <div class="flex items-center gap-2 mb-3">
                    <h4 class="font-bold text-gray-900 text-sm">{{ address.fullName || 'No name' }}</h4>
                    <span v-if="address.isDefault" 
                      class="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold">
                      Default
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p class="font-medium text-gray-500 text-xs mb-0.5">Street</p>
                        <p class="text-gray-900">{{ address.street || 'No street' }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p class="font-medium text-gray-500 text-xs mb-0.5">Phone</p>
                        <p class="text-gray-900">{{ address.phoneNumber || 'No phone' }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <p class="font-medium text-gray-500 text-xs mb-0.5">Barangay</p>
                        <p class="text-gray-900">{{ address.barangay || 'No barangay' }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <p class="font-medium text-gray-500 text-xs mb-0.5">City/Province</p>
                        <p class="text-gray-900">{{ address.city || 'No city' }}, {{ address.province || 'No province' }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div v-if="address.description" 
                    class="mt-3 text-xs text-gray-600 bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <p class="font-semibold text-purple-700 mb-1">Notes:</p>
                    <p>{{ address.description }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="h-48 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-gray-400 text-sm font-medium">No addresses provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with Action Buttons -->
      <div class="px-8 pb-8 pt-6 border-t border-gray-200 flex justify-between items-center">
        <div v-if="userDetails?.bannedUntil" class="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span class="text-red-700 font-semibold text-sm">This account is currently banned</span>
        </div>
        <div v-else></div>
        
        <div class="flex gap-3">
          <button v-if="isAdmin && !userDetails?.bannedUntil" @click="banUser" :disabled="actionLoading" 
            class="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            Ban User
          </button>
          <button v-if="isAdmin && userDetails?.bannedUntil" @click="unbanUser" :disabled="actionLoading" 
            class="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            Unban User
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { AdminService } from '@/services/adminManagement'
import { ProfileService } from '@/services/profileService'

interface User {
  userId: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  profilePicture?: string
  role: string
  phoneNumber?: string
  createdAt?: string | Date
  bannedUntil?: string
  username?: string
  gender?: string
}

interface Address {
  fullName?: string
  isDefault: boolean
  street?: string
  phoneNumber?: string
  barangay?: string
  city?: string
  province?: string
  description?: string
}

const props = defineProps<{
  visible: boolean
  user: User
  isAdmin?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update-user', updatedUser: User): void
  (e: 'ban', userId: string): void
  (e: 'unban', userId: string): void
}>()

const defaultAvatar = '/default-avatar.png'
const loading = ref(false)
const actionLoading = ref(false)
const error = ref<string | null>(null)
const userDetails = ref<any>(null)
const addresses = ref<Address[]>([])

const loadUserData = async () => {
  try {
    loading.value = true
    error.value = null

    console.log('📋 Loading user details for:', props.user.userId)

    // Get full user details from AdminService
    const fullUser = await AdminService.getUserById(props.user.userId)
    if (!fullUser) {
      throw new Error('User not found')
    }

    userDetails.value = fullUser
    console.log('✅ User details loaded:', fullUser)

    // Get profile data from ProfileService
    const profile = await ProfileService.getProfile(props.user.userId)
    if (profile) {
      console.log('✅ Profile loaded:', profile)
    }

    // Load addresses
    await loadAddresses()

  } catch (err) {
    console.error('💥 Error loading user data:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load user data'
  } finally {
    loading.value = false
  }
}

const loadAddresses = async () => {
  try {
    console.log('📍 Loading addresses for user:', props.user.userId)
    const userAddresses = await ProfileService.getAddresses(props.user.userId)
    addresses.value = (userAddresses || []).map((a: any) => ({
      ...a,
      isDefault: !!a.isDefault
    }))
    console.log('✅ Loaded addresses:', addresses.value.length)
  } catch (error) {
    console.error('❌ Error loading addresses:', error)
    addresses.value = []
  }
}

// Watch for visibility changes to reload data
watch(() => props.visible, (newVal) => {
  if (newVal) {
    loadUserData()
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  if (props.visible) {
    loadUserData()
  }
})

const fullName = computed(() => {
  if (userDetails.value?.fullName) return userDetails.value.fullName
  const first = userDetails.value?.firstName || ''
  const last = userDetails.value?.lastName || ''
  return `${first} ${last}`.trim() || 'No name provided'
})

const userInitials = computed(() => {
  if (userDetails.value?.firstName && userDetails.value?.lastName) {
    return `${userDetails.value.firstName.charAt(0)}${userDetails.value.lastName.charAt(0)}`.toUpperCase()
  }
  if (userDetails.value?.email) {
    return userDetails.value.email.charAt(0).toUpperCase()
  }
  return '?'
})

const computedProfilePicture = computed(() => {
  return userDetails.value?.profilePicture || props.user.profilePicture || defaultAvatar
})

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = defaultAvatar
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formattedDate = (date?: string | Date): string => {
  if (!date) return ''
  try {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch (error) {
    console.log('Failed to format date:', error)
    return String(date)
  }
}

const banUser = () => {
  emit('ban', props.user.userId)
  close()
}

const unbanUser = () => {
  emit('unban', props.user.userId)
  close()
}

const close = () => {
  emit('close')
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