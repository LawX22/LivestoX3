<template>
  <div class="p-8 pt-0 space-y-6">
    <h3 class="text-lg font-bold text-green-700 border-b pb-2">Farm Information</h3>
    <div v-if="user && user.role === 'Farmer'" class="space-y-6">
      <!-- Date Joined -->
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="text-xs font-semibold text-gray-500">Date Joined</p>
        <p class="text-sm text-gray-700">{{ formatDate(user.createdAt) }}</p>
      </div>

      <!-- Farm Details -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
        <div>
          <p class="font-semibold text-xs text-gray-500">Farm Name</p>
          <input v-if="editing" v-model="editableUser.farmName" class="w-full border rounded px-3 py-2 text-sm" />
          <p v-else class="border px-3 py-2 rounded text-sm bg-gray-50">{{ user.farmName || 'Not provided' }}</p>
        </div>
        <div>
          <p class="font-semibold text-xs text-gray-500">Farm Size</p>
          <input v-if="editing" v-model="editableUser.farmSize" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          <p v-else class="border px-3 py-2 rounded text-sm bg-gray-50">
            {{ user.farmSize ? `${user.farmSize} ${user.farmSizeUnit || 'hectares'}` : 'Not provided' }}
          </p>
        </div>
        <div class="sm:col-span-2">
          <p class="font-semibold text-xs text-gray-500">Livestock Type</p>
          <input v-if="editing" v-model="editableUser.livestockTypes" class="w-full border rounded px-3 py-2 text-sm" />
          <p v-else class="border px-3 py-2 rounded text-sm bg-gray-50">
            {{ user.livestockTypes ? user.livestockTypes.join(', ') : 'Not specified' }}
          </p>
        </div>
        <div class="sm:col-span-2">
          <p class="font-semibold text-xs text-gray-500">Description</p>
          <textarea v-if="editing" v-model="editableUser.description" class="w-full border rounded px-3 py-2 text-sm" rows="3"></textarea>
          <p v-else class="whitespace-pre-line border px-3 py-2 rounded text-sm bg-gray-50">
            {{ user.description || 'No description provided' }}
          </p>
        </div>
      </div>

      <!-- Farm Address -->
      <div class="border-t pt-4">
        <h4 class="text-sm font-semibold text-green-700 mb-3 flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Farm Address
        </h4>
        <div v-if="user.farmAddress" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
          <div>
            <p class="text-xs font-semibold text-gray-500">Region</p>
            <p>{{ user.farmAddress.region || '—' }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500">Province</p>
            <p>{{ user.farmAddress.province || '—' }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500">City</p>
            <p>{{ user.farmAddress.city || '—' }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500">Barangay</p>
            <p>{{ user.farmAddress.barangay || '—' }}</p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-xs font-semibold text-gray-500">Street Address</p>
            <p>{{ user.farmAddress.street || '—' }}</p>
          </div>
        </div>
        <div v-else class="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
          No farm address provided
        </div>
      </div>
    </div>
    <div v-else class="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
      You need to be verified first in order to upgrade your account.
      <button @click="goToUpgradeForm" :disabled="verificationStatus !== 'verified' || upgradePending" :class="[
        'ml-2 text-xs font-medium px-4 py-1.5 rounded shadow transition',
        verificationStatus === 'verified' && !upgradePending
          ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
      ]" :title="verificationStatus !== 'verified'
          ? 'You must verify your account first'
          : upgradePending
            ? 'Upgrade request pending'
            : 'Upgrade to Farmer'">
        <span v-if="upgradePending">Upgrade Pending</span>
        <span v-else>Upgrade to Farmer</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';

interface FarmAddress {
  region?: string;
  province?: string;
  city?: string;
  barangay?: string;
  street?: string;
}

interface User {
  role: string;
  createdAt?: string;
  farmName?: string;
  farmSize?: number;
  farmSizeUnit?: string;
  livestockTypes?: string[];
  description?: string;
  farmAddress?: FarmAddress;
}

export default defineComponent({
  name: 'FarmInfo',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
    editableUser: {
      type: Object as PropType<User>,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    },
    verificationStatus: {
      type: String as PropType<'unverified' | 'verified' | 'pending'>,
      default: 'unverified'
    },
    upgradePending: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter();

    const formatDate = (dateString?: string): string => {
      if (!dateString) return '—';
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const goToUpgradeForm = (): void => {
      if (props.verificationStatus !== 'verified' || props.upgradePending) return;
      router.push('/upgradeForm');
    };

    return {
      formatDate,
      goToUpgradeForm
    };
  }
});
</script>