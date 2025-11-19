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
          class="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
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

        <!-- Email - ALWAYS NON-EDITABLE -->
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Address
            <span class="text-red-500 ml-1">*</span>
          </label>
          
          <!-- Email field is ALWAYS disabled and readonly - NO EDITING ALLOWED -->
          <div class="relative">
            <input
              :value="userEmail"
              type="email"
              disabled
              readonly
              class="w-full bg-gray-100 border-2 border-gray-300 rounded-xl px-4 py-3 pl-11 text-gray-600 cursor-not-allowed shadow-sm transition-all duration-300 min-h-12"
            />
            
            <!-- Lock icon indicating field is secured and cannot be changed -->
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <!-- Helper text explaining why email cannot be changed -->
          <p class="text-xs text-gray-500 mt-2 flex items-center">
            <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Email address cannot be changed for security reasons
          </p>
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
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- User Role -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">User Role</label>
            <div class="bg-white border-2 border-blue-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <span class="text-gray-800 font-semibold">{{ user?.role }}</span>
                    <p class="text-xs text-gray-600">Current role</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span v-if="upgradePending" class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Pending Upgrade
                  </span>
                </div>
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

defineProps<{
  user: User | null
  editing: boolean
  upgradePending: boolean
  userEmail: string
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
</script>