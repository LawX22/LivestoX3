<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="close"
      tabindex="-1"
      @keydown.esc.prevent="close"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-6xl w-full p-8 relative max-h-[calc(100vh-4rem)] overflow-visible focus:outline-none flex flex-col"
        tabindex="0"
      >
        <!-- Header -->
        <header class="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
          <h3 class="text-2xl font-semibold text-gray-900 tracking-tight">Upgrade Request Details</h3>
          <button
            @click="close"
            aria-label="Close modal"
            class="text-gray-400 hover:text-gray-700 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <!-- Content -->
        <section class="flex gap-12 text-gray-800 min-h-[60vh] flex-1 overflow-auto">
          <!-- User Info -->
          <div class="flex-1 min-w-[320px]">
            <div class="grid grid-cols-2 gap-x-8 gap-y-6">
              <div><p class="font-medium text-gray-700 mb-1">Email</p><p class="text-gray-900 truncate">{{ request.email ?? '-' }}</p></div>
              <div><p class="font-medium text-gray-700 mb-1">Full Name</p><p class="text-gray-900">{{ request.fullName ?? '-' }}</p></div>
              <div><p class="font-medium text-gray-700 mb-1">Phone</p><p class="text-gray-900">{{ request.phone ?? '-' }}</p></div>
              <div><p class="font-medium text-gray-700 mb-1">Farm Name</p><p class="text-gray-900">{{ request.farmName ?? '-' }}</p></div>
              <div class="col-span-2"><p class="font-medium text-gray-700 mb-1">Address</p><p class="text-gray-900">{{ formattedAddress }}</p></div>
              <div><p class="font-medium text-gray-700 mb-1">Farm Size</p><p class="text-gray-900">{{ request.farmSize ?? '-' }}</p></div>
              <div><p class="font-medium text-gray-700 mb-1">Livestock Type</p><p class="text-gray-900">{{ request.livestockType ?? '-' }}</p></div>
              <div class="col-span-2"><p class="font-medium text-gray-700 mb-1">Experience</p><p class="whitespace-pre-line text-gray-900">{{ request.experience ?? '-' }}</p></div>
              <div class="col-span-2"><p class="font-medium text-gray-700 mb-1">Description</p><p class="whitespace-pre-line text-gray-900">{{ request.description ?? '-' }}</p></div>
            </div>
          </div>

          <!-- Documents -->
          <div class="flex-1 min-w-[320px] overflow-auto max-h-[calc(100vh-14rem)]">
            <p class="font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Documents</p>
            <div v-if="request.documents?.idDocument" class="mb-6">
              <p class="font-medium mb-2 text-gray-700">ID Document</p>
              <img :src="request.documents.idDocument" class="rounded-lg border border-gray-300 max-w-full max-h-64 object-contain shadow-sm" @error="onImageError" />
            </div>
            <div v-if="request.documents?.landProof" class="mb-6">
              <p class="font-medium mb-2 text-gray-700">Land Proof</p>
              <img :src="request.documents.landProof" class="rounded-lg border border-gray-300 max-w-full max-h-64 object-contain shadow-sm" @error="onImageError" />
            </div>
            <div v-if="request.documents?.farmPhotos?.length">
              <p class="font-medium mb-4 text-gray-700">Farm Photos</p>
              <div class="grid grid-cols-1 gap-4 max-h-[24rem] overflow-auto">
                <img
                  v-for="(photo, idx) in request.documents.farmPhotos"
                  :key="idx"
                  :src="photo"
                  :alt="`Farm Photo ${idx + 1}`"
                  class="rounded-lg border border-gray-300 max-w-full max-h-48 object-contain shadow-sm"
                  @error="onImageError"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="mt-6 flex justify-end border-t border-gray-200 pt-4">
          <button
            @click="handleApprove"
            class="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow transition"
          >
            Approve
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'

interface Documents {
  idDocument?: string
  landProof?: string
  farmPhotos?: string[]
}

interface UserRequest {
  email?: string
  fullName?: string
  phone?: string
  farmName?: string
  region?: string
  province?: string
  city?: string
  barangay?: string
  street?: string
  farmSize?: string
  livestockType?: string
  experience?: string
  description?: string
  documents?: Documents
}

const props = defineProps<{
  visible: boolean
  request: UserRequest
}>()

const emit = defineEmits(['close', 'approved'])

function close() {
  emit('close')
}

function onImageError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = '/fallback-image.png'
}

const formattedAddress = computed(() => {
  const parts = [
    props.request.street,
    props.request.barangay,
    props.request.city,
    props.request.province,
    props.request.region
  ].filter(Boolean)
  return parts.length ? parts.join(', ') : '-'
})

function handleApprove() {
  const email = props.request.email
  if (!email) return

  // Save farmer data separately
  const farmerInfo = {
    farmName: props.request.farmName,
    farmSize: props.request.farmSize,
    livestockType: props.request.livestockType,
    experience: props.request.experience,
    description: props.request.description,
    farmAddress: {
      street: props.request.street,
      barangay: props.request.barangay,
      city: props.request.city,
      province: props.request.province,
      region: props.request.region
    },
    documents: props.request.documents || {}
  }

  localStorage.setItem(`farmerData_${email}`, JSON.stringify(farmerInfo))

  // Also update registeredUsers role
  const rawUsers = localStorage.getItem('registeredUsers')
  const users = rawUsers ? JSON.parse(rawUsers) : []
  const updatedUsers = users.map((u: any) => {
    if (u.email === email) {
      return { ...u, role: 'Farmer' }
    }
    return u
  })

  localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))

  emit('approved', props.request)
  close()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
