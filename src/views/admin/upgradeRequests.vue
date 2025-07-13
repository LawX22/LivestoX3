<template>
  <div class="flex min-h-screen bg-gray-100">
    <AdminSidebar />

    <main class="flex-1 p-8 max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-green-700 mb-8">Upgrade Requests</h1>

      <table class="w-full bg-white shadow-md rounded-lg overflow-hidden text-left">
        <thead class="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th class="p-4">Full Name</th>
            <th class="p-4">Farm Name</th>
            <th class="p-4">Email</th>
            <th class="p-4">Requested On</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in upgradeRequests"
            :key="'req-' + index"
            class="border-t text-sm"
          >
            <td class="p-4">{{ user.fullName || user.firstName + ' ' + user.lastName || 'N/A' }}</td>
            <td class="p-4">{{ user.farmName || 'N/A' }}</td>
            <td class="p-4">{{ user.email }}</td>
            <td class="p-4">{{ formatDate(user.date) }}</td>
            <td class="p-4 space-x-2">
              <button
                @click="viewDetails(user)"
                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                View
              </button>
              <!-- Approve button removed from here -->
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal with @approved handler -->
      <UpgradeRequestModal
        :visible="showModal"
        :request="selectedRequest"
        @close="showModal = false"
        @approved="handleApproval"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminSidebar from '../../components/adminSideBar.vue'
import UpgradeRequestModal from '../../components/Admin/UpgradeRequestModal.vue'

interface User {
  email: string
  role?: string
  firstName?: string
  lastName?: string
  fullName?: string
  farmName?: string
  date?: string
}

const USERS_KEY = 'registeredUsers'
const UPGRADE_KEY = 'upgradeRequests'

const upgradeRequests = ref<User[]>([])
const registeredUsers = ref<User[]>([])
const selectedRequest = ref<User>({ email: '' })
const showModal = ref(false)

onMounted(() => {
  const requests = localStorage.getItem(UPGRADE_KEY)
  upgradeRequests.value = requests ? JSON.parse(requests) : []

  const users = localStorage.getItem(USERS_KEY)
  registeredUsers.value = users ? JSON.parse(users) : []
})

function viewDetails(user: User) {
  selectedRequest.value = user
  showModal.value = true
}

function handleApproval(userToUpgrade: User) {
  // Update role
  const updatedUsers = registeredUsers.value.map(u =>
    u.email === userToUpgrade.email ? { ...u, role: 'Farmer' } : u
  )
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
  registeredUsers.value = updatedUsers

  // Remove from upgradeRequests
  upgradeRequests.value = upgradeRequests.value.filter(u => u.email !== userToUpgrade.email)
  localStorage.setItem(UPGRADE_KEY, JSON.stringify(upgradeRequests.value))

  // Close modal
  showModal.value = false
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString()
}
</script>
