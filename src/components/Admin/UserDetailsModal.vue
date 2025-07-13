<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-5xl p-6 relative overflow-y-auto max-h-[90vh] flex flex-col md:flex-row gap-6"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
      >
        &times;
      </button>

      <!-- LEFT: User Details -->
      <div
        :class="[
          'space-y-3 text-gray-800 text-sm',
          isFarmer ? 'w-full md:w-1/2' : 'w-full'
        ]"
      >
        <h2 class="text-2xl font-bold text-green-700 text-center">User Details</h2>

        <!-- Profile Image -->
        <div class="flex justify-center mt-4">
          <img
            :src="computedProfilePicture"
            alt="Profile"
            class="w-28 h-28 rounded-full object-cover border-2 border-green-500"
          />
        </div>

        <!-- Basic Info -->
        <div class="pt-4 space-y-2">
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Full Name:</span>
            <span>{{ fullName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Email:</span>
            <span>{{ user.email }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Role:</span>
            <span class="capitalize">{{ user.role }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Phone:</span>
            <span>{{ user.phoneNumber || 'N/A' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Gender:</span>
            <span>{{ user.gender || 'N/A' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Date Joined:</span>
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

      <!-- RIGHT: Farmer Details -->
      <div
        v-if="isFarmer"
        class="w-full md:w-1/2 text-sm text-gray-800 border-t md:border-t-0 md:border-l md:pl-6 border-gray-300"
      >
        <h2 class="text-2xl font-bold text-green-700 text-center">Farmer Details</h2>

        <div class="pt-4 space-y-2">
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Farm Name:</span>
            <span>{{ farmerData?.farmName || 'N/A' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Location:</span>
            <span>{{ farmerData?.farmLocation || 'N/A' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Farm Size:</span>
            <span>{{ farmerData?.farmSize || 'N/A' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Livestock Type:</span>
            <span>{{ farmerData?.livestockType || 'N/A' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Experience:</span>
            <span>{{ farmerData?.experience || 'N/A' }}</span>
          </div>
          <div>
            <span class="font-semibold block text-gray-700">Description:</span>
            <p class="text-gray-600 mt-1 leading-snug">
              {{ farmerData?.description || 'No description provided.' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue'

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
const farmerData = ref<Record<string, any> | null>(null)

const isFarmer = computed(() => props.user.role === 'Farmer' && farmerData.value !== null)

watch(
  () => props.visible,
  (isOpen) => {
    if (isOpen && props.user.email) {
      const email = props.user.email

      const pic = localStorage.getItem(`profileImage_${email}`)
      localProfilePicture.value = pic || props.user.profilePicture || defaultAvatar

      const addrRaw = localStorage.getItem(`addresses_${email}`)
      try {
        const addressList = addrRaw ? JSON.parse(addrRaw) : []
        const defaultAddr = addressList.find((a: any) => a.isDefault)
        localAddress.value = defaultAddr || addressList[0] || null
      } catch {
        localAddress.value = null
      }

      const farmerRaw = localStorage.getItem(`farmerData_${email}`)
      if (farmerRaw) {
        try {
          const f = JSON.parse(farmerRaw)
          farmerData.value = {
            farmName: f.farmName,
            farmLocation: formatFarmAddress(f.farmAddress),
            farmSize: f.farmSize,
            livestockType: f.livestockType,
            experience: f.experience,
            description: f.description
          }
        } catch {
          farmerData.value = null
        }
      } else {
        const stored = localStorage.getItem('registeredUsers')
        try {
          const users = stored ? JSON.parse(stored) : []
          const foundUser = users.find((u: any) => u.email === email)
          if (foundUser?.role === 'Farmer') {
            farmerData.value = {
              farmName: foundUser.farmName,
              farmLocation: formatFarmAddress(foundUser.farmAddress),
              farmSize: foundUser.farmSize,
              livestockType: foundUser.livestockType,
              experience: foundUser.experience,
              description: foundUser.description
            }
          } else {
            farmerData.value = null
          }
        } catch {
          farmerData.value = null
        }
      }
    }
  },
  { immediate: true }
)

const fullName = computed(() => {
  return (
    props.user.fullName ||
    `${props.user.firstName || ''} ${props.user.lastName || ''}`.trim() ||
    'N/A'
  )
})

const computedProfilePicture = computed(() => {
  return localProfilePicture.value || defaultAvatar
})

const formattedAddress = computed(() => {
  const addr = localAddress.value
  if (!addr) return 'No address provided'
  const parts = [addr.street, addr.barangay, addr.city, addr.province, addr.region].filter(Boolean)
  return parts.length ? parts.join(', ') : 'No address provided'
})

function formatFarmAddress(addr?: Record<string, string>) {
  if (!addr) return 'No location'
  const parts = [addr.street, addr.barangay, addr.city, addr.province, addr.region].filter(Boolean)
  return parts.length ? parts.join(', ') : 'No location'
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
