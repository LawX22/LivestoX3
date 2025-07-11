<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
      <h2 class="text-xl font-bold text-green-700 mb-4">Edit Profile</h2>

      <!-- Form -->
      <form @submit.prevent="submitEdit" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input v-model="form.firstName" type="text" class="input" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="form.lastName" type="text" class="input" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input v-model="form.username" type="text" class="input" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="form.email" type="email" class="input" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input v-model="form.phoneNumber" type="text" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Gender</label>
            <select v-model="form.gender" class="input">
              <option disabled value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </form>

      <!-- Action Buttons -->
      <div class="flex justify-end mt-6 gap-3">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">Cancel</button>
        <button @click="submitEdit" class="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm">Save Changes</button>
      </div>

      <!-- Close Icon -->
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, reactive } from 'vue'

const props = defineProps<{
  visible: boolean
  user: Record<string, any> | null
}>()

const emit = defineEmits(['close', 'update'])

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  gender: ''
})

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      Object.assign(form, newUser)
    }
  },
  { immediate: true }
)

function submitEdit() {
  emit('update', { ...form })
}
</script>


