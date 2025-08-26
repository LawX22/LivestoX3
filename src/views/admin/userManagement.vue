<!-- userManagement.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
      <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-300 rounded-full opacity-40 animate-pulse"></div>
      <div class="absolute bottom-24 left-24 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
      <div class="absolute top-1/2 right-8 w-10 h-10 bg-green-400 rounded-full opacity-35 animate-bounce"
        style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/3 right-1/3 w-8 h-8 bg-emerald-400 rounded-full opacity-20 animate-pulse"
        style="animation-delay: 0.5s"></div>
    </div>

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#059669" stroke-width="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div class="flex min-h-screen relative z-10">
      <!-- Sticky Sidebar Component -->
      <div class="sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      <!-- Main Content -->
      <main class="flex-1 p-8 overflow-auto">
        <!-- Enhanced Header Section -->
        <div class="mb-6">
          <div
            class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-6 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-xl backdrop-blur-sm">
            <!-- Left side - Logo and Title -->
            <div class="flex items-center min-w-0">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div class="min-w-0">
                <h1 class="text-2xl font-bold text-white truncate">User Management</h1>
                <p class="text-green-100 text-sm opacity-90 truncate">Manage all registered users and their permissions</p>
              </div>
            </div>

            <!-- Right side - Stats -->
            <div class="flex items-center space-x-4">
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Total: {{ filteredUsers.length }}</span>
              </div>
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Verified: {{ verifiedCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters Card -->
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80"
              />
            </div>

            <!-- Status Filter -->
            <div>
              <select
                v-model="statusFilter"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
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
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Farmer">Farmer</option>
                <option value="Buyer">Buyer</option>
              </select>
            </div>

            <!-- Sort Options -->
            <div>
              <select
                v-model="sortBy"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
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

          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
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

          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
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

          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
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
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden transition-all hover:shadow-2xl">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200/50">
              <thead class="bg-white/80 sticky top-0 z-10">
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
              <tbody class="bg-white/80 divide-y divide-gray-200/50">
                <tr
                  v-for="user in paginatedUsers"
                  :key="user.userId"
                  class="hover:bg-gray-50/80 transition-colors duration-150"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 relative">
                        <img
                          :src="getProfileImage(user)"
                          class="h-10 w-10 rounded-full object-cover"
                          :alt="`${user.firstName} ${user.lastName}`"
                          @error="handleImageError"
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
                    <div class="flex justify-end space-x-2">
                      <button
                        @click="viewUserDetails(user)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                      >
                        View Details
                      </button>
                      <button
                        v-if="user.isBanned"
                        @click="unbanUser(user)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                      >
                        Unban
                      </button>
                      <button
                        v-else
                        @click="banUser(user)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                      >
                        Ban
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
                      <h3 class="mt-2 text-sm font-medium text-gray-700">
                        No users found
                      </h3>
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
            class="bg-white/80 px-4 py-3 flex items-center justify-between border-t border-gray-200/50 sm:px-6"
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
    </div>

    <!-- User Details Modal  -->
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
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const defaultAvatar = '/default-avatar.png'

// Computed properties
const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return registeredUsers.value
    .filter((u) => {
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
    .sort((a, b) => {
      // Sort based on selected option
      switch (sortBy.value) {
        case 'oldest':
          return (a.createdAt?.toString() || '').localeCompare(b.createdAt?.toString() || '')
        case 'name':
          return `${a.firstName || ''} ${a.lastName || ''}`.localeCompare(`${b.firstName || ''} ${b.lastName || ''}`)
        default: // newest first
          return (b.createdAt?.toString() || '').localeCompare(a.createdAt?.toString() || '')
      }
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

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = defaultAvatar
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

onMounted(() => {
  loadUsers()
})
</script>