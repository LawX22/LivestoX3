<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative overflow-y-auto max-h-[90vh]"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
      >
        &times;
      </button>

      <!-- Title -->
      <h2 class="text-2xl font-bold text-green-700 mb-5 text-center">
        User Details
      </h2>

      <!-- Profile Image -->
      <div class="flex justify-center mb-5">
        <img
          :src="computedProfilePicture"
          alt="Profile"
          class="w-28 h-28 rounded-full object-cover border-2 border-green-500"
        />
      </div>

      <!-- User Information -->
      <div class="space-y-3 text-gray-800 text-sm">
        <div class="flex justify-between">
          <span class="font-semibold">Full Name:</span>
          <span>{{ fullName }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Email:</span>
          <span>{{ user.email }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Role:</span>
          <span class="capitalize">{{ user.role }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Phone:</span>
          <span>{{ user.phoneNumber || 'N/A' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Gender:</span>
          <span>{{ user.gender || 'N/A' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Date Joined:</span>
          <span>{{ formatDate(user.createdAt) }}</span>
        </div>
        <div class="flex justify-between" v-if="user.bannedUntil">
          <span class="font-semibold text-red-600">Banned Until:</span>
          <span class="text-red-600">{{ formatDate(user.bannedUntil) }}</span>
        </div>

        <!-- Address -->
        <div class="pt-3">
          <h3 class="font-semibold text-gray-700">Address</h3>
          <p class="text-sm text-gray-600 leading-snug">
            {{ formattedAddress }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  user: {
    fullName?: string
    firstName?: string
    lastName?: string
    email: string
    role?: string
    phoneNumber?: string
    gender?: string
    createdAt?: string
    bannedUntil?: string
    profilePicture?: string
  }
}>()

const emit = defineEmits(['close'])

const defaultAvatar = '/default-avatar.png'
const localProfilePicture = ref<string | null>(null)
const localAddress = ref<Record<string, any> | null>(null)

watch(
  () => props.visible,
  (isOpen) => {
    if (isOpen && props.user.email) {
      // Get stored profile image for this user
      const pic = localStorage.getItem(`profileImage_${props.user.email}`)
      localProfilePicture.value = pic || props.user.profilePicture || defaultAvatar

      // Get address list and find the default
      const addrRaw = localStorage.getItem(`addresses_${props.user.email}`)
      try {
        const addressList = addrRaw ? JSON.parse(addrRaw) : []
        const defaultAddr = addressList.find((a: any) => a.isDefault)
        localAddress.value = defaultAddr || addressList[0] || null
      } catch {
        localAddress.value = null
      }
    }
  },
  { immediate: true }
)

// Full name logic
const fullName = computed(() => {
  return (
    props.user.fullName ||
    `${props.user.firstName || ''} ${props.user.lastName || ''}`.trim() ||
    'N/A'
  )
})

// Profile picture fallback
const computedProfilePicture = computed(() => {
  return localProfilePicture.value || defaultAvatar
})

// Format address
const formattedAddress = computed(() => {
  const addr = localAddress.value
  if (!addr) return 'No address provided'
  const parts = [
    addr.street,
    addr.barangay,
    addr.city,
    addr.province,
    addr.region
  ].filter(Boolean)
  return parts.length ? parts.join(', ') : 'No address provided'
})

// Format date
function formatDate(dateStr?: string): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
