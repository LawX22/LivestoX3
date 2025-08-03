<!-- FarmInfo.vue -->
<template>
  <div class="p-8 space-y-4 relative">
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div class="absolute top-8 right-12 w-8 h-8 bg-green-300 rounded-full animate-pulse"></div>
      <div class="absolute bottom-12 left-8 w-6 h-6 bg-emerald-300 rounded-full animate-bounce"></div>
      <div class="absolute top-1/3 right-1/4 w-4 h-4 bg-teal-300 rounded-full animate-ping"></div>
    </div>

    <!-- Header Section -->
    <section class="relative z-10">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Farm Information</h3>
          <p class="text-gray-600">Manage your farm details and agricultural operations</p>
        </div>
        <button
          v-if="editing"
          @click="saveProfile"
          class="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Save Changes
        </button>
      </div>

      <!-- Main Content -->
      <div v-if="user && user.role === 'Farmer'" class="space-y-8">
        <!-- Farm Details Card -->
        <div class="bg-gradient-to-br from-white via-gray-50 to-green-50 border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
          <h4 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Farm Details
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Farm Name -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Farm Name
              </label>
              <div class="relative">
                <input
                  v-if="editing"
                  v-model="editableUser.farmName"
                  class="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-green-300"
                  placeholder="Enter your farm name"
                />
                <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
                  {{ user.farmName || 'Not provided' }}
                </div>
              </div>
            </div>

            <!-- Farm Size -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Farm Size
              </label>
              <div class="relative">
                <div v-if="editing" class="flex gap-2">
                  <input
                    v-model="editableUser.farmSize"
                    type="number"
                    class="w-3/4 bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-green-300"
                    placeholder="Enter farm size"
                  />
                  <select
                    v-model="editableUser.farmSizeUnit"
                    class="w-1/4 bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-green-300 appearance-none"
                  >
                    <option value="hectares">hectares</option>
                    <option value="acres">acres</option>
                    <option value="sqm">sqm</option>
                  </select>
                </div>
                <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
                  {{ user.farmSize ? `${user.farmSize} ${user.farmSizeUnit || 'hectares'}` : 'Not provided' }}
                </div>
              </div>
            </div>

            <!-- Livestock Types -->
            <div class="group md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Livestock Types
              </label>
              <div class="relative">
                <input
                  v-if="editing"
                  v-model="editableUser.livestockTypes"
                  class="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-green-300"
                  placeholder="Enter livestock types (comma separated)"
                />
                <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
                  {{ formatLivestockTypes(user.livestockTypes) }}
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="group md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <svg class="w-4 h-4 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Farm Description
              </label>
              <div class="relative">
                <textarea
                  v-if="editing"
                  v-model="editableUser.description"
                  class="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md hover:border-green-300"
                  rows="4"
                  placeholder="Tell us about your farm..."
                ></textarea>
                <div v-else class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12">
                  <p class="whitespace-pre-line">{{ user.description || 'No description provided' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Farm Address Card -->
        <div class="bg-gradient-to-br from-white via-gray-50 to-green-50 border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
          <h4 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Farm Location
          </h4>
          
          <div v-if="user.farmAddress" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Region -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Region</label>
              <div class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
                {{ user.farmAddress.region || '—' }}
              </div>
            </div>

            <!-- Province -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Province</label>
              <div class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
                {{ user.farmAddress.province || '—' }}
              </div>
            </div>

            <!-- City -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-3">City/Municipality</label>
              <div class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
                {{ user.farmAddress.city || '—' }}
              </div>
            </div>

            <!-- Barangay -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Barangay</label>
              <div class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
                {{ user.farmAddress.barangay || '—' }}
              </div>
            </div>

            <!-- Street Address -->
            <div class="group md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Street Address</label>
              <div class="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm hover:shadow-md transition-all duration-300 min-h-12 flex items-center">
                {{ user.farmAddress.street || '—' }}
              </div>
            </div>
          </div>
          <div v-else class="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-8 text-center text-gray-500">
            No farm address provided
          </div>
        </div>
      </div>
      
      <!-- Upgrade Prompt -->
      <div v-else class="bg-gradient-to-br from-white via-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8 text-center">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h4 class="text-xl font-bold text-gray-900 mb-2">Upgrade to Farmer Account</h4>
        <p class="text-gray-700 mb-6 max-w-md mx-auto">
          You need to be verified first in order to upgrade your account and access farmer features.
        </p>
        <button 
          @click="goToUpgradeForm" 
          :disabled="verificationStatus !== 'verified' || upgradePending" 
          :class="[
            'px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl',
            verificationStatus === 'verified' && !upgradePending
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white cursor-pointer'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          ]" 
          :title="verificationStatus !== 'verified'
            ? 'You must verify your account first'
            : upgradePending
              ? 'Upgrade request pending'
              : 'Upgrade to Farmer'"
        >
          <span v-if="upgradePending">Upgrade Pending</span>
          <span v-else>Upgrade to Farmer</span>
        </button>
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
          <span class="text-green-800 font-medium">Farm information updated successfully!</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

type User = {
  userId?: string;
  role?: string;
  farmName?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  livestockTypes?: string | string[];
  description?: string;
  farmAddress?: {
    region?: string;
    province?: string;
    city?: string;
    barangay?: string;
    street?: string;
  };
};

type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'unverified';

export default defineComponent({
  name: 'FarmInfoTab',
  props: {
    user: {
      type: Object as PropType<User>,
      default: null,
    },
    editableUser: {
      type: Object as PropType<User>,
      required: true,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String as PropType<VerificationStatus>,
      default: 'unverified',
    },
    upgradePending: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['save-profile', 'upgrade'],
  setup(props, { emit }) {
    const showSuccessMessage = ref(false);

    const formatLivestockTypes = (types: string | string[] | undefined): string => {
      if (!types) return 'Not specified';
      if (Array.isArray(types)) return types.join(', ');
      return types;
    };

    const saveProfile = () => {
      emit('save-profile');
      showSuccessMessage.value = true;
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    };

    const goToUpgradeForm = () => {
      if (props.verificationStatus !== 'verified' || props.upgradePending) return;
      emit('upgrade');
    };

    return {
      showSuccessMessage,
      formatLivestockTypes,
      saveProfile,
      goToUpgradeForm,
    };
  },
});
</script>