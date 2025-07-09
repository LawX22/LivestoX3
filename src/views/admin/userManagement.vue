<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <h1 class="text-2xl font-bold text-green-600 mb-6">User Management</h1>

      <!-- Section 1: All Registered Users -->
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">All Registered Users</h2>

        <div v-if="registeredUsers.length === 0" class="text-gray-600">
          No registered users found.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(user, index) in registeredUsers"
            :key="'reg-' + index"
            class="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <div>
              <p
                :class="[
                  'font-medium',
                  user.role === 'Banned' ? 'text-red-600 line-through' : 'text-gray-800'
                ]"
              >
                {{ user.email }}
              </p>
              <p class="text-sm" :class="user.role === 'Banned' ? 'text-red-600' : 'text-gray-500'">
                Role: {{ user.role }}
                <template v-if="user.role === 'Banned' && user.bannedUntil">
                  <br />
                  Banned Until: {{ formatDate(user.bannedUntil) }}
                </template>
              </p>
            </div>

            <div class="space-x-2">
              <button
                v-if="user.role === 'Banned'"
                @click="unbanUser(user)"
                class="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
              >
                Unban
              </button>
              <button
                v-else-if="user.role !== 'Admin'"
                @click="banUser(user)"
                class="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 text-sm"
              >
                Ban
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Upgrade Requests -->
      <section>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Upgrade Requests</h2>

        <div v-if="upgradeRequests.length === 0" class="text-gray-600">
          No pending upgrade requests.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(user, index) in upgradeRequests"
            :key="'req-' + index"
            class="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <div>
              <p class="font-medium text-gray-800">{{ user.email }}</p>
              <p class="text-sm text-gray-500">
                Requested Role: <span class="italic">Farmer</span>
              </p>
            </div>
            <button
              @click="approveUpgrade(user)"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
            >
              Approve
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminSidebar from '../../components/adminSideBar.vue'

const USERS_KEY = 'registeredUsers'
const UPGRADE_KEY = 'upgradeRequests'

interface User {
  email: string
  password: string
  role: string
  bannedUntil?: string
}

const registeredUsers = ref<User[]>([])
const upgradeRequests = ref<User[]>([])

onMounted(() => {
  const users = localStorage.getItem(USERS_KEY)
  registeredUsers.value = users ? JSON.parse(users) : []

  const requests = localStorage.getItem(UPGRADE_KEY)
  upgradeRequests.value = requests ? JSON.parse(requests) : []
})

function approveUpgrade(userToUpgrade: User) {
  const users = [...registeredUsers.value]
  const updatedUsers = users.map((u) =>
    u.email === userToUpgrade.email ? { ...u, role: 'Farmer' } : u
  )

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
  registeredUsers.value = updatedUsers

  upgradeRequests.value = upgradeRequests.value.filter((u) => u.email !== userToUpgrade.email)
  localStorage.setItem(UPGRADE_KEY, JSON.stringify(upgradeRequests.value))
}

function banUser(userToBan: User) {
  const days = prompt('Enter number of days to ban the user:', '7')
  const banDays = parseInt(days || '0')

  if (isNaN(banDays) || banDays <= 0) return

  const bannedUntil = new Date()
  bannedUntil.setDate(bannedUntil.getDate() + banDays)

  const updatedUsers = registeredUsers.value.map((u) =>
    u.email === userToBan.email
      ? { ...u, role: 'Banned', bannedUntil: bannedUntil.toISOString() }
      : u
  )

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
  registeredUsers.value = updatedUsers
}

function unbanUser(userToUnban: User) {
  const updatedUsers = registeredUsers.value.map((u) =>
    u.email === userToUnban.email
      ? { ...u, role: 'Buyer', bannedUntil: undefined }
      : u
  )

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
  registeredUsers.value = updatedUsers
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
