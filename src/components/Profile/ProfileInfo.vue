<!-- ProfileInfo.vue -->
<template>
  <div class="p-8 pt-0 space-y-8">
    <section>
      <div class="flex justify-between items-center mb-3 border-b pb-3">
        <h3 class="text-lg font-bold text-green-700">Account Information</h3>
        <div class="flex gap-2">
          <button v-if="!editing" @click="toggleEdit"
            class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded shadow">
            Edit Profile
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700">
        <div>
          <p class="font-semibold">Username</p>
          <input v-if="editing" v-model="editableUser.username" class="w-full border rounded px-3 py-1" />
          <p v-else class="border px-3 py-1 rounded">{{ user.username }}</p>
        </div>
        <div>
          <p class="font-semibold">Email</p>
          <input v-if="editing" v-model="editableUser.email" type="email" class="w-full border rounded px-3 py-1" />
          <p v-else class="border px-3 py-1 rounded">{{ user.email }}</p>
        </div>
        <div>
          <p class="font-semibold">User Role</p>
          <p class="flex items-center border px-3 py-1 rounded">
            {{ user.role }}
            <span v-if="upgradePending" class="ml-2 text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded text-xs font-medium">Pending Upgrade</span>
          </p>
        </div>
        <div>
          <p class="font-semibold">Verification Status</p>
          <p class="flex items-center border px-3 py-1 rounded">
            <span v-if="verificationStatus === 'verified'" class="flex items-center text-green-700">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Verified
            </span>
            <span v-else-if="verificationStatus === 'pending'" class="flex items-center text-blue-700">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              Pending
            </span>
            <span v-else-if="verificationStatus === 'rejected'" class="flex items-center text-red-700">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              Rejected
            </span>
            <span v-else class="flex items-center text-yellow-700">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              Unverified
            </span>
          </p>
        </div>
        <div>
          <p class="font-semibold">Date Created</p>
          <p class="border px-3 py-1 rounded">{{ formatDate(user.createdAt) }}</p>
        </div>
      </div>
    </section>

    <section>
      <h3 class="text-lg font-bold text-green-700 mb-3 border-b pb-1">Personal Information</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700">
        <div>
          <p class="font-semibold">Full Name</p>
          <div v-if="editing" class="flex gap-2">
            <input v-model="editableUser.firstName" class="w-1/2 border rounded px-3 py-1" placeholder="First name" />
            <input v-model="editableUser.lastName" class="w-1/2 border rounded px-3 py-1" placeholder="Last name" />
          </div>
          <p v-else class="border px-3 py-1 rounded">{{ user.firstName }} {{ user.lastName }}</p>
        </div>
        <div>
          <p class="font-semibold">Phone Number</p>
          <input v-if="editing" v-model="editableUser.phoneNumber" type="tel" class="w-full border rounded px-3 py-1" />
          <p v-else class="border px-3 py-1 rounded">{{ user.phoneNumber || 'Not provided' }}</p>
        </div>
        <div>
          <p class="font-semibold">Gender</p>
          <select v-if="editing" v-model="editableUser.gender" class="w-full border rounded px-3 py-1">
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          <p v-else class="border px-3 py-1 rounded">{{ user.gender || 'Not specified' }}</p>
        </div>
      </div>
    </section>

    <div v-if="editing" class="flex justify-end pt-4 gap-2">
      <button @click="toggleEdit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded shadow text-sm">Cancel</button>
      <button @click="saveProfile" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow text-sm">Save Changes</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface User {
  userId: string
  username: string
  email: string
  role: string
  createdAt?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  gender?: string
}

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true
  },
  verificationStatus: {
    type: String as () => 'unverified' | 'pending' | 'verified' | 'rejected',
    required: true
  },
  upgradePending: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:user', 'delete-account', 'save-profile'])

const editing = ref(false)
const editableUser = ref<User>({ ...props.user })

const toggleEdit = () => {
  if (editing.value) {
    editableUser.value = { ...props.user }
  }
  editing.value = !editing.value
}

const saveProfile = () => {
  emit('save-profile', editableUser.value)
  editing.value = false
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString()
}
</script>