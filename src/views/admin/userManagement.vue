<template>
  <div class="flex min-h-screen bg-gray-100">
    <AdminSidebar />

    <main class="flex-1 p-8 max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-green-700 mb-8">Registered Users</h1>

      <table class="w-full bg-white shadow-md rounded-lg overflow-hidden text-left">
        <thead class="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th class="p-4">Full Name</th>
            <th class="p-4">Email</th>
            <th class="p-4">User Type</th>
            <th class="p-4">Date Joined</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in registeredUsers"
            :key="'reg-' + index"
            class="border-t text-sm"
          >
            <td class="p-4 font-medium">
              <span :class="user.role === 'Banned' ? 'text-red-600 line-through' : 'text-gray-900'">
                {{ user.fullName || `${user.firstName || ''} ${user.lastName || ''}` || 'N/A' }}
              </span>
            </td>
            <td class="p-4 text-gray-700">{{ user.email }}</td>
            <td class="p-4">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold',
                  user.role === 'Banned'
                    ? 'bg-red-100 text-red-700'
                    : user.role === 'Admin'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                ]"
              >
                {{ user.role }}
              </span>
              <div v-if="user.role === 'Banned' && user.bannedUntil" class="text-xs text-red-500 mt-1">
                Banned Until: {{ formatDate(user.bannedUntil) }}
              </div>
            </td>
            <td class="p-4">{{ formatDate(user.createdAt) }}</td>
            <td class="p-4 space-x-2">
              <button
               class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                @click="viewUser(user)"
              >
                View
              </button>
              <button
                v-if="user.role === 'Banned'"
                @click="unbanUser(user)"
                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Unban
              </button>
              <button
                v-else-if="user.role !== 'Admin'"
                @click="banUser(user)"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Ban
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <UserDetailsModal
        v-if="selectedUser"
        :visible="showModal"
        :user="selectedUser"
        @close="showModal = false"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminSidebar from '../../components/adminSideBar.vue'
import UserDetailsModal from '../../components/Admin/UserDetailsModal.vue'

interface User {
  email: string
  password?: string
  role?: string
  firstName?: string
  lastName?: string
  fullName?: string
  phoneNumber?: string
  gender?: string
  createdAt?: string
  bannedUntil?: string
}

const USERS_KEY = 'registeredUsers'
const registeredUsers = ref<User[]>([])
const selectedUser = ref<User | null>(null)
const showModal = ref(false)

onMounted(() => {
  const users = localStorage.getItem(USERS_KEY)
  registeredUsers.value = users ? JSON.parse(users) : []
})

function banUser(userToBan: User) {
  const days = prompt('Enter number of days to ban the user:', '7')
  const banDays = parseInt(days || '0')
  if (isNaN(banDays) || banDays <= 0) return

  const bannedUntil = new Date()
  bannedUntil.setDate(bannedUntil.getDate() + banDays)

  registeredUsers.value = registeredUsers.value.map(u =>
    u.email === userToBan.email
      ? { ...u, role: 'Banned', bannedUntil: bannedUntil.toISOString() }
      : u
  )
  localStorage.setItem(USERS_KEY, JSON.stringify(registeredUsers.value))
}

function unbanUser(userToUnban: User) {
  registeredUsers.value = registeredUsers.value.map(u =>
    u.email === userToUnban.email ? { ...u, role: 'Buyer', bannedUntil: undefined } : u
  )
  localStorage.setItem(USERS_KEY, JSON.stringify(registeredUsers.value))
}

function viewUser(user: User) {
  selectedUser.value = user
  showModal.value = true
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
