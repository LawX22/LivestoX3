<!-- ProfileInfo.vue -->
<template>
  <div class="p-8 space-y-4 relative">
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div class="absolute top-8 right-12 w-8 h-8 bg-blue-300 rounded-full animate-pulse"></div>
      <div class="absolute bottom-12 left-8 w-6 h-6 bg-emerald-300 rounded-full animate-bounce"></div>
      <div class="absolute top-1/3 right-1/4 w-4 h-4 bg-green-300 rounded-full animate-ping"></div>
    </div>

    <!-- Header Section -->
    <section class="relative z-10">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Profile Information</h3>
          <p class="text-gray-600">Manage your personal details and account settings</p>
        </div>
        <button
          v-if="editing"
          @click="$emit('save-profile')"
          class="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Save Changes
        </button>
      </div>

      <!-- Form Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Username -->
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Username
          </label>
          <div class="relative">
            <input
              v-if="editing"
              v-model="editableUser.username"
              class="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-300"
              placeholder="Enter your username"
            />
            <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
              {{ user?.username || 'Not provided' }}
            </div>
          </div>
        </div>

        <!-- Email -->
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Address
          </label>
          <div class="relative">
            <input
              v-if="editing"
              v-model="editableUser.email"
              type="email"
              class="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-300"
              placeholder="Enter your email address"
            />
            <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center justify-between">
              <span>{{ user?.email || 'Not provided' }}</span>
              <svg class="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- First Name -->
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            First Name
          </label>
          <div class="relative">
            <input
              v-if="editing"
              v-model="editableUser.firstName"
              class="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-300"
              placeholder="Enter your first name"
            />
            <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
              {{ user?.firstName || 'Not provided' }}
            </div>
          </div>
        </div>

        <!-- Last Name -->
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last Name
          </label>
          <div class="relative">
            <input
              v-if="editing"
              v-model="editableUser.lastName"
              class="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-300"
              placeholder="Enter your last name"
            />
            <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
              {{ user?.lastName || 'Not provided' }}
            </div>
          </div>
        </div>

        <!-- Phone Number -->
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Phone Number
          </label>
          <div class="relative">
            <input
              v-if="editing"
              v-model="editableUser.phoneNumber"
              type="tel"
              class="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-300"
              placeholder="Enter your phone number"
            />
            <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
              {{ user?.phoneNumber || 'Not provided' }}
            </div>
          </div>
        </div>

        <!-- Gender -->
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Gender
          </label>
          <div class="relative">
            <select
              v-if="editing"
              v-model="editableUser.gender"
              class="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-300 appearance-none cursor-pointer"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
              {{ user?.gender || 'Not specified' }}
            </div>
            <!-- Dropdown Arrow for Select -->
            <svg v-if="editing" class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Account Status Section -->
    <section class="relative z-10">
      <div class="bg-gradient-to-br from-white via-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
        <h4 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Account Status
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- User Role -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">User Role</label>
            <div class="bg-white border-2 border-blue-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300">
              <div class="flex items-center justify-between">
                <span class="text-gray-800 font-medium">{{ user?.role }}</span>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span v-if="upgradePending" class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Pending Upgrade
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Verification Status -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">Verification Status</label>
            <div class="bg-white border-2 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300"
                 :class="{
                   'border-green-200 hover:border-green-300': verificationStatus === 'verified',
                   'border-blue-200 hover:border-blue-300': verificationStatus === 'pending',
                   'border-red-200 hover:border-red-300': verificationStatus === 'rejected',
                   'border-yellow-200 hover:border-yellow-300': verificationStatus === 'unverified'
                 }">
              <div class="flex items-center">
                <!-- Verified -->
                <template v-if="verificationStatus === 'verified'">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span class="text-green-700 font-semibold">Verified</span>
                    <p class="text-xs text-green-600">Account verified</p>
                  </div>
                </template>

                <!-- Pending -->
                <template v-else-if="verificationStatus === 'pending'">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-blue-600 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span class="text-blue-700 font-semibold">Pending</span>
                    <p class="text-xs text-blue-600">Under review</p>
                  </div>
                </template>

                <!-- Rejected -->
                <template v-else-if="verificationStatus === 'rejected'">
                  <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span class="text-red-700 font-semibold">Rejected</span>
                    <p class="text-xs text-red-600">Verification failed</p>
                  </div>
                </template>

                <!-- Unverified -->
                <template v-else>
                  <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span class="text-yellow-700 font-semibold">Unverified</span>
                    <p class="text-xs text-yellow-600">Verification needed</p>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Date Created -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">Member Since</label>
            <div class="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span class="text-gray-800 font-medium">{{ formatDate(user?.createdAt) }}</span>
                  <p class="text-xs text-gray-600">Account created</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Message -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform translate-y-2"
    >
      <div v-if="showSuccessMessage" 
           class="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 rounded-lg p-4 shadow-lg z-50">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-green-800 font-medium">Profile updated successfully!</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type User = {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  role?: string
  gender?: string
  createdAt?: string | Date
}

type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'unverified'

defineProps<{
  user: User | null
  editing: boolean
  verificationStatus: VerificationStatus
  upgradePending: boolean
}>()

const editableUser = defineModel<User>('editableUser', { required: true })

defineEmits<{
  (e: 'save-profile'): void
}>()

const showSuccessMessage = ref(false)

const formatDate = (dateString?: string | Date): string => {
  if (!dateString) return '—'
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// const handleSaveProfile = () => {
//   emit('save-profile')
//   showSuccessMessage.value = true
//   setTimeout(() => {
//     showSuccessMessage.value = false
//   }, 3000)
// }
</script>