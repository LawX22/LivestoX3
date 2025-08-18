<!-- userManagement.vue -->
<template>
  <div class="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Sidebar Component -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-auto">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">User Management</h1>
          <p class="text-gray-500 mt-1">Manage all registered users and their permissions</p>
        </div>
        <div class="mt-4 md:mt-0">
          <button
            @click="exportToCSV"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <svg
              class="-ml-1 mr-2 h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export to CSV
          </button>
        </div>
      </div>

      <!-- Filters and Actions -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search users..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <!-- Status Filter -->
          <div>
            <select
              v-model="statusFilter"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg"
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="banned">Banned</option>
            </select>
          </div>

          <!-- Role Filter -->
          <div>
            <select
              v-model="roleFilter"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Farmer">Farmer</option>
              <option value="Buyer">Buyer</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Users</p>
              <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ filteredUsers.length }}</h3>
            </div>
            <div class="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Verified</p>
              <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ verifiedCount }}</h3>
            </div>
            <div class="p-2 bg-green-100 rounded-lg text-green-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Pending</p>
              <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ pendingCount }}</h3>
            </div>
            <div class="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Banned</p>
              <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ bannedCount }}</h3>
            </div>
            <div class="p-2 bg-red-100 rounded-lg text-red-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Active
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="user in paginatedUsers"
                :key="user.userId"
                class="hover:bg-gray-50 group transition-all duration-150 hover:-translate-y-0.5"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 relative">
                      <img
                        :src="getProfileImage(user)"
                        class="h-10 w-10 rounded-full object-cover"
                        :alt="`${user.firstName} ${user.lastName}`"
                        onerror="this.src='/default-avatar.png'"
                      />
                      <span
                        v-if="user.isOnline"
                        class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"
                      ></span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 flex items-center">
                        {{ user.firstName }} {{ user.lastName }}
                        <span v-if="user.isVerified" class="ml-1.5">
                          <svg
                            class="w-4 h-4 text-emerald-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </span>
                      </div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="roleBadgeClass(user.role)">{{ user.role || 'User' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span :class="statusBadgeClass(user)">{{ getStatusLabel(user) }}</span>
                    <span v-if="user.bannedUntil" class="ml-2 text-xs text-gray-500">
                      {{ formatRelativeTime(user.bannedUntil) }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatLastActive(user.lastActive) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div
                    class="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <button
                      @click="viewUserDetails(user)"
                      class="text-emerald-600 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-50"
                      title="View Details"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      v-if="user.isBanned"
                      @click="unbanUser(user)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                      title="Unban User"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </button>
                    <button
                      v-else
                      @click="banUser(user)"
                      class="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                      title="Ban User"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </button>
                    <button
                      @click="editUser(user)"
                      class="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-50"
                      title="Edit User"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedUsers.length === 0">
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                  <div class="flex flex-col items-center justify-center py-8">
                    <svg
                      class="w-16 h-16 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-700">No users found</h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        >
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              :class="[
                'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50',
              ]"
            >
              Previous
            </button>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              :class="[
                'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50',
              ]"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to
                <span class="font-medium">{{
                  Math.min(currentPage * itemsPerPage, filteredUsers.length)
                }}</span>
                of <span class="font-medium">{{ filteredUsers.length }}</span> users
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                  :class="[
                    'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium',
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50',
                  ]"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <template v-for="page in visiblePages" :key="page">
                  <button
                    @click="currentPage = page"
                    :class="[
                      page === currentPage
                        ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    ]"
                  >
                    {{ page }}
                  </button>
                </template>
                <button
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  :class="[
                    'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium',
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50',
                  ]"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- User Details Modal -->
    <UserDetailsModal
      v-if="selectedUser"
      :visible="showModal"
      :user="{
    userId: selectedUser.userId,
    email: selectedUser.email,
    role: selectedUser.role
  }"
      :is-admin="true"
      @close="closeModal"
      @approve="handleVerificationApproval"
      @reject="handleVerificationRejection"
      @update-user="(u) => handleUserUpdate (u as User)"
      @ban="handleBanUser"
      @unban="handleUnbanUser"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSideBar.vue'
import UserDetailsModal from '../../components/Admin/UserDetailsModal.vue'

// Define the User interface
interface User {
  userId: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  profilePicture?: string
  role: string
  phoneNumber?: string
  createdAt: string | number | Date
  bannedUntil?: string | number | Date | null
  verification?: any
  isVerified?: boolean
  verificationStatus?: string
  submittedId?: boolean
  isBanned?: boolean
  username?: string
  lastActive?: string | number | Date
  isOnline?: boolean
}

// Reactive variables
const registeredUsers = ref<User[]>([])
const selectedUser = ref<User | null>(null)
const showModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref<'all' | 'verified' | 'unverified' | 'banned' | 'pending' | 'rejected'>('all')
const roleFilter = ref<'all' | 'Admin' | 'Farmer' | 'Buyer'>('all')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const defaultAvatar = '/default-avatar.png'

// Computed properties
const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return registeredUsers.value.filter((u) => {
    const matchesSearch =
      !query ||
      u.email.toLowerCase().includes(query) ||
      (u.username && u.username.toLowerCase().includes(query)) ||
      `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase().includes(query)

    const matchesStatus =
      statusFilter.value === 'all' ||
      (statusFilter.value === 'verified' && u.isVerified && !u.isBanned) ||
      (statusFilter.value === 'unverified' && u.verificationStatus === 'unverified') ||
      (statusFilter.value === 'banned' && u.isBanned) ||
      (statusFilter.value === 'pending' && u.verificationStatus === 'pending') ||
      (statusFilter.value === 'rejected' && u.verificationStatus === 'rejected')

    const matchesRole = roleFilter.value === 'all' || u.role === roleFilter.value

    return matchesSearch && matchesStatus && matchesRole
  })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredUsers.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))

const visiblePages = computed(() => {
  const max = 5
  let start = Math.max(1, currentPage.value - Math.floor(max / 2))
  const end = Math.min(totalPages.value, start + max - 1)
  if (end - start + 1 < max) start = Math.max(1, end - max + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const verifiedCount = computed(
  () => filteredUsers.value.filter((u) => u.isVerified && !u.isBanned).length,
)

const pendingCount = computed(
  () => filteredUsers.value.filter((u) => u.verificationStatus === 'pending').length,
)

const bannedCount = computed(() => filteredUsers.value.filter((u) => u.isBanned).length)

// Methods
const getProfileImage = (user: User): string => {
  try {
    const storedProfileImage = localStorage.getItem(`profileImage_${user.userId}`)
    if (storedProfileImage) return storedProfileImage

    if (user.profilePicture) {
      if (user.profilePicture.startsWith('http')) {
        return user.profilePicture
      }
      return `/api/uploads/${user.profilePicture}`
    }

    return defaultAvatar
  } catch (error) {
    console.error('Error getting profile image:', error)
    return defaultAvatar
  }
}

const loadUsers = (): void => {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith('user_'))
    registeredUsers.value = keys
      .map((k) => {
        const raw = localStorage.getItem(k)
        if (!raw) return null

        try {
          const u = JSON.parse(raw)

          // Determine verification status
          let status = 'unverified'
          if (u.verification?.status === 'approved') {
            status = 'approved'
          } else if (u.verification?.status === 'rejected') {
            status = 'rejected'
          } else if (u.verification?.status === 'pending' || u.submittedId) {
            status = 'pending'
          }

          // Simulate online status (20% chance)
          const isOnline = Math.random() < 0.2

          // Generate random last active time (for demo)
          const lastActive = new Date(
            Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
          )

          return {
            ...u,
            userId: k.replace('user_', ''),
            isVerified: status === 'approved' || u.isVerified === true,
            isBanned: u.isBanned ?? false,
            verificationStatus: status,
            submittedId: !!u.verification || u.submittedId,
            profilePicture: u.profilePicture || null,
            isOnline,
            lastActive,
          } as User
        } catch (error) {
          console.error('Error parsing user data:', error)
          return null
        }
      })
      .filter((user): user is User => user !== null)
  } catch (error) {
    console.error('Error loading users:', error)
    registeredUsers.value = []
  }
}

const formatDate = (d?: string | number | Date): string => {
  if (!d) return ''
  try {
    return new Date(d).toLocaleDateString()
  } catch {
    return ''
  }
}

const formatRelativeTime = (dateString: string | number | Date): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays > 0) {
    return `for ${diffInDays} day${diffInDays !== 1 ? 's' : ''}`
  } else if (diffInDays === 0) {
    return 'today'
  } else {
    return 'permanently'
  }
}

const formatLastActive = (date?: string | number | Date): string => {
  if (!date) return 'Never'
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`
  return formatDate(date)
}

const roleBadgeClass = (r?: string): string => {
  const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
  switch (r) {
    case 'Admin':
      return `${base} bg-purple-100 text-purple-800`
    case 'Farmer':
      return `${base} bg-green-100 text-green-800`
    case 'Buyer':
      return `${base} bg-blue-100 text-blue-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const statusBadgeClass = (u: User): string => {
  const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
  if (u.isBanned) {
    return `${base} bg-red-100 text-red-800`
  } else if (u.verificationStatus === 'pending') {
    return `${base} bg-yellow-100 text-yellow-800`
  } else if (u.verificationStatus === 'rejected') {
    return `${base} bg-red-100 text-red-800`
  } else if (u.isVerified) {
    return `${base} bg-green-100 text-green-800`
  } else {
    return `${base} bg-gray-100 text-gray-800`
  }
}

const getStatusLabel = (u: User): string => {
  if (u.isBanned) return 'Banned'
  if (u.verificationStatus === 'pending') return 'Pending'
  if (u.verificationStatus === 'rejected') return 'Rejected'
  if (u.isVerified) return 'Verified'
  return 'Unverified'
}


const viewUserDetails = (u: User): void => {
  selectedUser.value = u
  showModal.value = true
}


const editUser = (u: User): void => {
  selectedUser.value = u
  showModal.value = true
}

const closeModal = (): void => {
  showModal.value = false
  selectedUser.value = null
}

const banUser = (u: User): void => {
  const days = prompt('Enter number of days to ban (0 for permanent):', '7')
  if (days === null) return

  const d = parseInt(days)
  if (isNaN(d) || d < 0) {
    alert('Please enter a valid number of days')
    return
  }

  const bannedUntil = d === 0 ? null : new Date(Date.now() + d * 86400000).toISOString()
  updateUser({
    ...u,
    isBanned: true,
    bannedUntil,
  })
}

const unbanUser = (u: User): void => {
  if (confirm('Are you sure you want to unban this user?')) {
    updateUser({
      ...u,
      isBanned: false,
      bannedUntil: null,
    })
  }
}

const handleVerificationApproval = (userId: string): void => {
  const user = registeredUsers.value.find((u) => u.userId === userId)
  if (user) {
    updateUser({
      ...user,
      isVerified: true,
      verificationStatus: 'approved',
      verification: {
        ...user.verification,
        status: 'approved',
        approvedAt: new Date().toISOString(),
      },
    })
  }
}

const handleVerificationRejection = ({ userId, reason }: { userId: string; reason: string }): void => {
  const user = registeredUsers.value.find((u) => u.userId === userId)
  if (user) {
    updateUser({
      ...user,
      isVerified: false,
      verificationStatus: 'rejected',
      verification: {
        ...user.verification,
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        reason,
      },
    })
  }
}

const handleUserUpdate = (updatedUser: User): void => {
  updateUser(updatedUser)
}

const handleBanUser = (userId: string): void => {
  const user = registeredUsers.value.find((u) => u.userId === userId)
  if (user) {
    banUser(user)
  }
}

const handleUnbanUser = (userId: string): void => {
  const user = registeredUsers.value.find((u) => u.userId === userId)
  if (user) {
    unbanUser(user)
  }
}

const updateUser = (u: Partial<User> & { userId: string }): void => {
  try {
    const existingData = localStorage.getItem(`user_${u.userId}`)
    const existingUser = existingData ? JSON.parse(existingData) : {}

    const updatedUser: User = {
      ...existingUser,
      ...u,
      isVerified: u.isVerified !== undefined ? u.isVerified : existingUser.isVerified,
      verificationStatus: u.verificationStatus || existingUser.verificationStatus || 'unverified',
      verification: u.verification || existingUser.verification,
      submittedId: u.submittedId !== undefined ? u.submittedId : existingUser.submittedId,
      isBanned: u.isBanned !== undefined ? u.isBanned : existingUser.isBanned,
      bannedUntil: u.bannedUntil !== undefined ? u.bannedUntil : existingUser.bannedUntil,
      profilePicture: u.profilePicture !== undefined ? u.profilePicture : existingUser.profilePicture,
    }

    localStorage.setItem(`user_${u.userId}`, JSON.stringify(updatedUser))

    const index = registeredUsers.value.findIndex((user) => user.userId === u.userId)
    if (index !== -1) {
      registeredUsers.value[index] = updatedUser
    }

    if (selectedUser.value?.userId === u.userId) {
      selectedUser.value = updatedUser
    }
  } catch (error) {
    console.error('Error updating user:', error)
    alert('Error updating user. Please try again.')
  }
}

const exportToCSV = (): void => {
  const headers = ['Name', 'Email', 'Role', 'Status', 'Joined', 'Last Active']
  const data = filteredUsers.value.map((user) => [
    `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'No name',
    user.email || 'No email',
    user.role || 'User',
    getStatusLabel(user),
    formatDate(user.createdAt),
    formatLastActive(user.lastActive),
  ])

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    headers.join(',') +
    '\n' +
    data.map((row) => row.map(cell => `"${cell}"`).join(',')).join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `users_export_${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  loadUsers()
})
</script>