<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg space-y-4 relative overflow-y-auto max-h-[90vh]">
      <h2 class="text-lg font-semibold text-gray-800">
        {{ address ? 'Edit Address' : 'Add New Address' }}
      </h2>

      <!-- Full Name & Phone -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            v-model="fullName"
            class="w-full border rounded p-2 text-sm bg-gray-100"
            readonly
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            v-model="phoneNumber"
            class="w-full border rounded p-2 text-sm bg-gray-100"
            readonly
          />
        </div>
      </div>

      <!-- Address Fields -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Region</label>
          <input v-model="region" class="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Province</label>
          <input v-model="province" class="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">City</label>
          <input v-model="city" class="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Barangay</label>
          <input v-model="barangay" class="w-full border rounded p-2 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Street</label>
          <input v-model="street" class="w-full border rounded p-2 text-sm" />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Additional Notes</label>
        <textarea
          v-model="description"
          rows="3"
          placeholder="e.g. Near the old store, 2nd house on the right..."
          class="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>
      </div>

      <!-- Label and Default -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <select v-model="label" class="w-full border rounded p-2 text-sm">
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>
        </div>
        <div class="flex items-center gap-2 mt-4 sm:mt-0">
          <input
            type="checkbox"
            id="isDefault"
            v-model="isDefault"
            class="w-4 h-4"
          />
          <label for="isDefault" class="text-sm text-gray-700">Set as default address</label>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-2 pt-4">
        <button
          @click="$emit('close')"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded text-sm"
        >
          Cancel
        </button>

        <button
          v-if="address"
          @click="deleteAddress"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
        >
          Delete
        </button>

        <button
          @click="save"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
        >
          {{ address ? 'Update' : 'Save' }} Address
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getCurrentUser } from '../../services/users'

const props = defineProps<{
  visible: boolean
  address?: Record<string, any> | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', address: Record<string, any>): void
  (e: 'delete'): void
}>()

const fullName = ref('')
const phoneNumber = ref('')
const region = ref('')
const province = ref('')
const city = ref('')
const barangay = ref('')
const street = ref('')
const description = ref('')
const label = ref<'Home' | 'Work'>('Home')
const isDefault = ref(false)

function resetForm() {
  region.value = ''
  province.value = ''
  city.value = ''
  barangay.value = ''
  street.value = ''
  description.value = ''
  label.value = 'Home'
  isDefault.value = false
}

onMounted(() => {
  const user = getCurrentUser()
  if (user) {
    fullName.value = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
    phoneNumber.value = user.phoneNumber ?? ''
  }
})

watch(
  () => props.address,
  (addr) => {
    if (addr) {
      region.value = addr.region || ''
      province.value = addr.province || ''
      city.value = addr.city || ''
      barangay.value = addr.barangay || ''
      street.value = addr.street || ''
      description.value = addr.description || ''
      label.value = addr.label || 'Home'
      isDefault.value = addr.isDefault || false
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

watch(() => props.visible, (val) => {
  if (!val) {
    resetForm()
  }
})

function save() {
  const compiledAddress = {
    fullName: fullName.value,
    phoneNumber: phoneNumber.value,
    region: region.value,
    province: province.value,
    city: city.value,
    barangay: barangay.value,
    street: street.value,
    description: description.value,
    label: label.value,
    isDefault: isDefault.value,
    createdAt: new Date().toISOString(),
  }

  emit('save', compiledAddress)
  resetForm()
}

function deleteAddress() {
  emit('delete')
}
</script>
