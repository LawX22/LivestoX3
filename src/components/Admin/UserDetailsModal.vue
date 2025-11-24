<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] p-6 relative flex flex-col">
      <!-- Close Button -->
      <button @click="close"
        class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold transition-colors z-50">
        &times;
      </button>

      <!-- Loading State with Skeleton -->
      <div v-if="loading" class="flex flex-col h-full">
        <!-- Header Skeleton -->
        <div class="mb-4 pb-2 border-b animate-pulse">
          <div class="h-8 bg-gray-300 rounded w-48"></div>
        </div>

        <div class="flex flex-col gap-6 h-full min-h-0">
          <!-- Profile Section Skeleton -->
          <div class="flex items-start gap-4 mb-4 p-4 bg-gray-100 rounded-lg animate-pulse">
            <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="h-6 bg-gray-300 rounded w-40"></div>
              <div class="h-4 bg-gray-300 rounded w-32"></div>
              <div class="h-3 bg-gray-300 rounded w-48"></div>
            </div>
          </div>

          <!-- Basic Info Skeleton -->
          <div class="flex-1 overflow-hidden">
            <div class="space-y-4">
              <div class="animate-pulse">
                <div class="h-5 bg-gray-300 rounded w-32 mb-3"></div>
                <div class="bg-gray-100 rounded-lg p-4 space-y-3">
                  <div v-for="i in 5" :key="i" class="flex justify-between py-2">
                    <div class="h-4 bg-gray-300 rounded w-20"></div>
                    <div class="h-4 bg-gray-300 rounded w-32"></div>
                  </div>
                </div>
              </div>

              <div class="animate-pulse">
                <div class="h-5 bg-gray-300 rounded w-40 mb-3"></div>
                <div class="bg-gray-100 rounded-lg p-4">
                  <div class="h-32 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Skeleton -->
        <div class="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-3 animate-pulse">
          <div class="h-10 w-20 bg-gray-300 rounded-lg"></div>
          <div class="h-10 w-24 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center justify-center h-full">
        <div class="text-center">
          <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-600">{{ error }}</p>
          <button @click="loadUserData" class="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Try Again
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else class="flex flex-col gap-6 h-full min-h-0">
        <h2 class="text-2xl font-bold text-green-700 border-b pb-2">User Information</h2>

        <!-- Profile Section -->
        <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 shadow-sm">
          <div class="relative flex-shrink-0">
            <!-- Default Avatar with Initials -->
            <div v-if="!computedProfilePicture || computedProfilePicture === defaultAvatar" 
              class="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-white">
              {{ userInitials }}
            </div>
            <!-- User Profile Picture -->
            <img v-else
              :src="computedProfilePicture" 
              alt="Profile"
              class="w-20 h-20 rounded-full object-cover border-3 border-white shadow-md ring-4 ring-green-300" 
              @error="handleImageError"/>
          </div>
          <div class="min-w-0 flex-1 space-y-1">
            <h3 class="font-bold text-lg text-gray-800 truncate">{{ fullName || 'No name provided' }}</h3>
            <div class="flex items-center justify-between pt-1">
              <p class="text-xs text-gray-500">User ID: {{ user.userId }}</p>
              <p class="text-xs text-gray-500">Joined: {{ formattedDate(userDetails?.createdAt) }}</p>
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium text-gray-700 text-sm">Email</span>
                  </div>
                  <span class="text-sm text-gray-600">{{ userDetails?.email || 'Not provided' }}</span>
                </div>

                <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-medium text-gray-700 text-sm">Username</span>
                  </div>
                  <span class="text-sm text-gray-600">{{ userDetails?.username || 'Not provided' }}</span>
                </div>

                <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="font-medium text-gray-700 text-sm">Phone</span>
                  </div>
                  <span class="text-sm text-gray-600">{{ userDetails?.phoneNumber || 'Not provided' }}</span>
                </div>

                <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium text-gray-700 text-sm">Role</span>
                  </div>
                  <span class="text-sm text-gray-600 capitalize">{{ userDetails?.role || 'User' }}</span>
                </div>

                <div v-if="userDetails?.gender" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-medium text-gray-700 text-sm">Gender</span>
                  </div>
                  <span class="text-sm text-gray-600 capitalize">{{ userDetails?.gender }}</span>
                </div>

                <div v-if="userDetails?.bannedUntil" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                    </svg>
                    <span class="font-medium text-red-700 text-sm">Banned Until</span>
                  </div>
                  <span class="text-sm text-red-600 font-medium">{{ formatDate(userDetails?.bannedUntil) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div>
            <h3 class="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Address Information
            </h3>

            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div v-if="addresses.length > 0" class="space-y-4">
                <div v-for="(address, index) in addresses" :key="index" class="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                  <div class="flex items-center gap-2 mb-2">
                    <h4 class="font-medium text-gray-800 text-sm">{{ address.fullName || 'No name' }}</h4>
                    <span v-if="address.isDefault" class="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                      Default
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                    <div class="flex items-start gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{{ address.street || 'No street' }}</span>
                    </div>
                    
                    <div class="flex items-start gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{{ address.phoneNumber || 'No phone' }}</span>
                    </div>
                    
                    <div class="flex items-start gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{{ address.barangay || 'No barangay' }}</span>
                    </div>
                    
                    <div class="flex items-start gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{{ address.city || 'No city' }}, {{ address.province || 'No province' }}</span>
                    </div>
                  </div>
                  
                  <div v-if="address.description" class="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
                    <p class="font-medium text-gray-600 mb-1">Notes:</p>
                    <p>{{ address.description }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="h-40 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300">
                <p class="text-gray-500 text-sm">No addresses provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with Action Buttons -->
      <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <div v-if="userDetails?.bannedUntil" class="text-red-600 text-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>This account is currently banned</span>
        </div>
        <div v-else></div>
        
        <div class="flex gap-3">
          <button @click="close" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Close
          </button>
          <button v-if="isAdmin && !userDetails?.bannedUntil" @click="banUser" :disabled="actionLoading" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
            Ban User
          </button>
          <button v-if="isAdmin && userDetails?.bannedUntil" @click="unbanUser" :disabled="actionLoading" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
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