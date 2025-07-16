<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-xl">
      <h2 class="text-3xl font-bold text-center text-green-600 mb-4">Upgrade to Farmer</h2>
      <p class="text-sm text-gray-600 text-center mb-6">
        Provide your farming details to request an upgrade to a Farmer account.
      </p>

      <form @submit.prevent="handleUpgradeRequest" class="space-y-4">
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input v-model="form.fullName" type="text" readonly class="w-full px-4 py-2 border bg-gray-100 rounded" />
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input v-model="form.phone" type="tel" readonly class="w-full px-4 py-2 border bg-gray-100 rounded" />
        </div>

        <!-- Farm Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
          <input v-model="form.farmName" type="text" required class="w-full px-4 py-2 border rounded" />
        </div>

        <!-- Address -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Farm Address</label>
          <div v-if="addresses.length">
            <select v-model="selectedAddressIndex" @change="applySelectedAddress" class="w-full px-4 py-2 border rounded mb-2">
              <option value="">— Select Saved Address —</option>
              <option v-for="(addr, idx) in addresses" :key="idx" :value="idx">
                {{ addr.label }} - {{ addr.street }}, {{ addr.barangay }}, {{ addr.city }}
              </option>
            </select>
            <div v-if="selectedAddressIndex !== ''" class="text-sm border px-4 py-2 bg-gray-50 rounded">
              <p><strong>Region:</strong> {{ form.region }}</p>
              <p><strong>Province:</strong> {{ form.province }}</p>
              <p><strong>City:</strong> {{ form.city }}</p>
              <p><strong>Barangay:</strong> {{ form.barangay }}</p>
              <p><strong>Street:</strong> {{ form.street }}</p>
            </div>
          </div>
          <div v-else class="space-y-4">
            <input v-model="form.region" required type="text" placeholder="Region" class="w-full px-4 py-2 border rounded" />
            <input v-model="form.province" required type="text" placeholder="Province" class="w-full px-4 py-2 border rounded" />
            <input v-model="form.city" required type="text" placeholder="City" class="w-full px-4 py-2 border rounded" />
            <input v-model="form.barangay" required type="text" placeholder="Barangay" class="w-full px-4 py-2 border rounded" />
            <input v-model="form.street" required type="text" placeholder="Street" class="w-full px-4 py-2 border rounded" />
          </div>
        </div>

        <!-- Farm Size -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Farm Size (hectares)</label>
          <input v-model="form.farmSize" type="number" required min="0.1" step="0.1" class="w-full px-4 py-2 border rounded" />
        </div>

        <!-- Livestock Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type of Livestock</label>
          <select v-model="form.livestockType" required class="w-full px-4 py-2 border rounded">
            <option value="" disabled>Select livestock type</option>
            <option v-for="type in livestockTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <!-- Experience -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
          <input v-model="form.experience" type="number" required min="0" class="w-full px-4 py-2 border rounded" />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Short Description or Purpose</label>
          <textarea v-model="form.description" rows="3" required class="w-full px-4 py-2 border rounded"></textarea>
        </div>

        <!-- Document Uploads -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Upload Required Documents</label>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Valid Government-issued ID</label>
            <input type="file" accept="image/*,.pdf" @change="handleFileUpload($event, 'idDocument')" />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Proof of Land Ownership / Lease</label>
            <input type="file" accept="image/*,.pdf" @change="handleFileUpload($event, 'landProof')" />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Farm Photos</label>
            <input type="file" multiple accept="image/*" @change="handleMultipleFileUpload" />
          </div>
        </div>

        <p v-if="submitted" class="text-green-600 text-sm text-center">Request submitted successfully!</p>

        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Submit Request
        </button>

        <p class="mt-4 text-center text-sm text-gray-500">
          <button @click="router.back()" class="text-green-600 hover:underline">← Back to Previous Page</button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { livestockTypes } from '../../services/UpgradeFormDetails'

const router = useRouter()
const submitted = ref(false)

const form = ref({
  fullName: '',
  phone: '',
  farmName: '',
  region: '',
  province: '',
  city: '',
  barangay: '',
  street: '',
  farmSize: '',
  livestockType: '',
  experience: '',
  description: ''
})

const fileData = ref({
  idDocument: '',
  landProof: '',
  farmPhotos: [] as string[]
})

const addresses = ref<Record<string, any>[]>([])
const selectedAddressIndex = ref('')

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  form.value.fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim()
  form.value.phone = user.phoneNumber || ''
  
  // Use userId instead of email for address storage
  if (user.userId) {
    const stored = localStorage.getItem(`addresses_${user.userId}`)
    if (stored) addresses.value = JSON.parse(stored)
  }
})

function applySelectedAddress() {
  const index = Number(selectedAddressIndex.value)
  const selected = addresses.value[index]
  if (selected) {
    form.value.region = selected.region || ''
    form.value.province = selected.province || ''
    form.value.city = selected.city || ''
    form.value.barangay = selected.barangay || ''
    form.value.street = selected.street || ''
  }
}

function handleFileUpload(event: Event, type: 'idDocument' | 'landProof') {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      fileData.value[type] = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

function handleMultipleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (files) {
    fileData.value.farmPhotos = []
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        fileData.value.farmPhotos.push(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }
}

function handleUpgradeRequest() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.userId) {
    console.error('User ID not found')
    return
  }

  // Get existing requests or initialize empty array
  const upgradeRequests = JSON.parse(localStorage.getItem('upgradeRequests') || '{}')
  
  // Create user-specific requests array if it doesn't exist
  if (!upgradeRequests[user.userId]) {
    upgradeRequests[user.userId] = []
  }

  // Add new request
  upgradeRequests[user.userId].push({
    ...form.value,
    userId: user.userId,
    date: new Date().toISOString(),
    status: 'pending', // Add status field
    documents: {
      idDocument: fileData.value.idDocument,
      landProof: fileData.value.landProof,
      farmPhotos: fileData.value.farmPhotos
    }
  })

  // Save back to localStorage
  localStorage.setItem('upgradeRequests', JSON.stringify(upgradeRequests))
  submitted.value = true

  setTimeout(() => {
    router.back()
  }, 1500)
}
</script>