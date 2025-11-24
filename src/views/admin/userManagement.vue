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
        <!-- Loading State with Skeleton -->
        <div v-if="loading">
          <!-- Header Skeleton -->
          <div class="mb-6">
            <div class="bg-white/80 rounded-xl p-6 animate-pulse">
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1">
                  <div class="w-12 h-12 bg-gray-300 rounded-xl mr-3"></div>
                  <div class="flex-1">
                    <div class="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                    <div class="h-4 bg-gray-300 rounded w-64"></div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="h-10 w-24 bg-gray-300 rounded-lg"></div>
                  <div class="h-10 w-10 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Filters Skeleton -->
          <div class="bg-white/80 rounded-2xl p-6 mb-6 animate-pulse">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="h-10 bg-gray-300 rounded-lg"></div>
              <div class="h-10 bg-gray-300 rounded-lg"></div>
              <div class="h-10 bg-gray-300 rounded-lg"></div>
            </div>
          </div>

          <!-- Stats Skeleton -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div v-for="i in 3" :key="i" class="bg-white/80 rounded-2xl p-6 animate-pulse">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                  <div class="h-8 bg-gray-300 rounded w-16"></div>
                </div>
                <div class="w-12 h-12 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>

          <!-- Table Skeleton -->
          <div class="bg-white/80 rounded-2xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-white/80">
                  <tr>
                    <th class="px-6 py-3 text-left">
                      <div class="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                    </th>
                    <th class="px-6 py-3 text-left">
                      <div class="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
                    </th>
                    <th class="px-6 py-3 text-left">
                      <div class="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                    </th>
                    <th class="px-6 py-3 text-left">
                      <div class="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                    </th>
                    <th class="px-6 py-3 text-right">
                      <div class="h-4 bg-gray-300 rounded w-16 ml-auto animate-pulse"></div>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white/80 divide-y divide-gray-200">
                  <tr v-for="i in 10" :key="i" class="animate-pulse">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div class="ml-4 flex-1">
                          <div class="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                          <div class="h-3 bg-gray-300 rounded w-40"></div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="h-6 bg-gray-300 rounded-full w-16"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="h-6 bg-gray-300 rounded-full w-20"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex justify-end space-x-2">
                        <div class="h-8 w-24 bg-gray-300 rounded-md"></div>
                        <div class="h-8 w-16 bg-gray-300 rounded-md"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex">
            <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error loading users</h3>
              <p class="mt-1 text-sm text-red-700">{{ error }}</p>
              <button
                @click="loadUsers"
                class="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content (shown when loaded) -->
        <template v-else>
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
                <button
                  @click="loadUsers"
                  class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30 hover:bg-white/30 transition-all"
                  title="Refresh users"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Filters Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 mb-6">
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
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80"
                />
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
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                  <p class="text-sm font-medium text-gray-500">Active Users</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ activeCount }}</h3>
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
                          <!-- Default Avatar with Initials -->
                          <div v-if="!user.profilePicture" class="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white">
                            {{ getInitials(user) }}
                          </div>
                          <!-- User Profile Picture -->
                          <img
                            v-else
                            :src="user.profilePicture"
                            class="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-md"
                            :alt="`${user.firstName} ${user.lastName}`"
                            @error="handleImageError"
                          />
                          <span
                            v-if="user.isOnline"
                            class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"
                          ></span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {{ user.firstName }} {{ user.lastName }}
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
                          :disabled="actionLoading"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
                        >
                          Unban
                        </button>
                        <button
                          v-else
                          @click="banUser(user)"
                          :disabled="actionLoading"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
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
        </template>
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
      @update-user="handleUserUpdate"
      @ban="handleBanUser"
      @unban="handleUnbanUser"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSideBar.vue'
import UserDetailsModal from '../../components/Admin/UserDetailsModal.vue'
import { AdminService, type AdminUser } from '../../services/adminManagement'

// Reactive variables
const registeredUsers = ref<AdminUser[]>([])
const selectedUser = ref<AdminUser | null>(null)
const showModal = ref(false)
const searchQuery = ref('')
const roleFilter = ref<'all' | 'Admin' | 'Farmer' | 'Buyer'>('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const loading = ref(false)
const actionLoading = ref(false)
const error = ref<string | null>(null)

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

      const matchesRole = roleFilter.value === 'all' || u.role === roleFilter.value

      return matchesSearch && matchesRole
    })
    .sort((a, b) => {
      switch (sortBy.value) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'name':
          return `${a.firstName || ''} ${a.lastName || ''}`.localeCompare(`${b.firstName || ''} ${b.lastName || ''}`)
        default: // newest first
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

const activeCount = computed(
  () => filteredUsers.value.filter((u) => !u.isBanned).length,
)

const bannedCount = computed(() => filteredUsers.value.filter((u) => u.isBanned).length)

// Methods
const getInitials = (user: AdminUser): string => {
  const first = user.firstName?.charAt(0)?.toUpperCase() || ''
  const last = user.lastName?.charAt(0)?.toUpperCase() || ''
  return first + last || user.email?.charAt(0)?.toUpperCase() || '?'
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const user = registeredUsers.value.find(u => u.profilePicture === img.src)
  if (user) {
    user.profilePicture = undefined
  }
}

const loadUsers = async (): Promise<void> => {
  try {
    loading.value = true
    error.value = null
    
    const users = await AdminService.getAllUsers()
    registeredUsers.value = users
    
    console.log('✅ Loaded', users.length, 'users')
  } catch (err) {
    console.error('Error loading users:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load users'
  } finally {
    loading.value = false
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

const statusBadgeClass = (u: AdminUser): string => {
  const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
  if (u.isBanned) {
    return `${base} bg-red-100 text-red-800`
  } else {
    return `${base} bg-green-100 text-green-800`
  }
}

const getStatusLabel = (u: AdminUser): string => {
  if (u.isBanned) return 'Banned'
  return 'Active'
}

const viewUserDetails = (u: AdminUser): void => {
  selectedUser.value = u
  showModal.value = true
}

const closeModal = (): void => {
  showModal.value = false
  selectedUser.value = null
}

const banUser = async (u: AdminUser): Promise<void> => {
  const days = prompt('Enter number of days to ban (0 for permanent):', '7')
  if (days === null) return

  const d = parseInt(days)
  if (isNaN(d) || d < 0) {
    alert('Please enter a valid number of days')
    return
  }

  try {
    actionLoading.value = true
    const bannedUntil = d === 0 ? null : new Date(Date.now() + d * 86400000).toISOString()
    
    const result = await AdminService.banUser({
      userId: u.userId,
      bannedUntil,
      banReason: 'Banned by admin'
    })

    if (result.success) {
      await loadUsers()
      alert('User banned successfully')
    } else {
      alert(`Failed to ban user: ${result.error}`)
    }
  } catch (err) {
    console.error('Error banning user:', err)
    alert('Failed to ban user')
  } finally {
    actionLoading.value = false
  }
}

const unbanUser = async (u: AdminUser): Promise<void> => {
  if (!confirm('Are you sure you want to unban this user?')) return

  try {
    actionLoading.value = true
    const result = await AdminService.unbanUser(u.userId)

    if (result.success) {
      await loadUsers()
      alert('User unbanned successfully')
    } else {
      alert(`Failed to unban user: ${result.error}`)
    }
  } catch (err) {
    console.error('Error unbanning user:', err)
    alert('Failed to unban user')
  } finally {
    actionLoading.value = false
  }
}

const handleUserUpdate = async (updatedUser: any): Promise<void> => {
  try {
    const result = await AdminService.updateUser({
      userId: updatedUser.userId,
      role: updatedUser.role,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phoneNumber: updatedUser.phoneNumber,
      gender: updatedUser.gender,
    })
    
    if (result.success) {
      await loadUsers()
      alert('User updated successfully')
    } else {
      alert(`Failed to update user: ${result.error}`)
    }
  } catch (err) {
    console.error('Error updating user:', err)
    alert('Failed to update user')
  }
}

const handleBanUser = async (userId: string): Promise<void> => {
  const user = registeredUsers.value.find((u) => u.userId === userId)
  if (user) {
    await banUser(user)
  }
}

const handleUnbanUser = async (userId: string): Promise<void> => {
  const user = registeredUsers.value.find((u) => u.userId === userId)
  if (user) {
    await unbanUser(user)
  }
}

onMounted(async () => {
  await loadUsers()
})
</script>