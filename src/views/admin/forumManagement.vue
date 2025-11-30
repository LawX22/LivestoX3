<!-- forumManagement.vue - WITH REAL DATA FROM DATABASE -->
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div class="min-w-0">
                <h1 class="text-2xl font-bold text-white truncate">Forum Management</h1>
                <p class="text-green-100 text-sm opacity-90 truncate">Moderate posts and oversee community discussions</p>
              </div>
            </div>

            <!-- Right side - Stats -->
            <div class="flex items-center space-x-4">
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Total: {{ filteredPosts.length }}</span>
              </div>
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Questions: {{ totalCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="text-center">
            <svg class="animate-spin h-12 w-12 text-emerald-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-gray-600 font-medium">Loading forum posts...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="text-red-800 font-semibold">Error Loading Posts</h3>
              <p class="text-red-600 text-sm">{{ error }}</p>
            </div>
          </div>
        </div>

        <template v-else>
          <!-- Filters Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <!-- Search -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search posts..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80"
                />
              </div>

              <!-- Category Filter -->
              <div>
                <select
                  v-model="categoryFilter"
                  class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
                >
                  <option value="all">All Categories</option>
                  <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <!-- Author Role Filter -->
              <div>
                <select
                  v-model="roleFilter"
                  class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
                >
                  <option value="all">All Roles</option>
                  <option value="farmer">Farmers</option>
                  <option value="buyer">Buyers</option>
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
                  <option value="most_answers">Most Answers</option>
                  <option value="most_views">Most Views</option>
                  <option value="most_votes">Most Votes</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Posts</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ totalCount }}</h3>
                </div>
                <div class="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Answers</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ totalAnswers }}</h3>
                </div>
                <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Views</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ totalViews }}</h3>
                </div>
                <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Votes</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ totalVotes }}</h3>
                </div>
                <div class="p-2 bg-green-100 rounded-lg text-green-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Categories</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ uniqueCategories.length }}</h3>
                </div>
                <div class="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Forum Posts Table - COMPACT VERSION -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden transition-all hover:shadow-2xl">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200/50">
                <thead class="bg-white/80 sticky top-0 z-10">
                  <tr>
                    <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stats
                    </th>
                    <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white/80 divide-y divide-gray-200/50">
                  <tr
                    v-for="post in paginatedPosts"
                    :key="post.id"
                    class="hover:bg-gray-50/80 transition-colors duration-150"
                  >
                    <!-- Question Column -->
                    <td class="px-3 py-3">
                      <div class="max-w-md">
                        <div class="text-xs font-medium text-gray-900 truncate" :title="post.title">
                          {{ post.title }}
                        </div>
                        <div class="text-xs text-gray-500 truncate" :title="post.description">
                          {{ post.description?.substring(0, 80) }}{{ post.description && post.description.length > 80 ? '...' : '' }}
                        </div>
                        <div class="text-xs text-gray-400 mt-1">
                          {{ formatDate(post.createdAt) }}
                        </div>
                      </div>
                    </td>
                    
                    <!-- Author Column -->
                    <td class="px-3 py-3">
                      <div class="text-xs font-medium text-gray-900 truncate max-w-[120px]" :title="post.userFullName">
                        {{ post.userFullName }}
                      </div>
                      <span :class="roleBadgeClass(post.userRole)" class="text-xs">
                        {{ getRoleLabel(post.userRole) }}
                      </span>
                    </td>
                    
                    <!-- Category Column -->
                    <td class="px-3 py-3">
                      <span class="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        {{ post.category || 'General' }}
                      </span>
                      <div v-if="post.urgency" class="mt-1">
                        <span :class="urgencyBadgeClass(post.urgency)" class="text-xs">
                          {{ post.urgency }}
                        </span>
                      </div>
                    </td>
                    
                    <!-- Stats Column -->
                    <td class="px-3 py-3">
                      <div class="space-y-1 text-xs">
                        <div class="flex items-center gap-1">
                          <svg class="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{{ post.answers?.length || 0 }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{{ post.views || 0 }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <svg class="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span>{{ (post.upvotes || 0) - (post.downvotes || 0) }}</span>
                        </div>
                      </div>
                    </td>
                    
                    <!-- Actions Column -->
                    <td class="px-3 py-3 text-center">
                      <button
                        @click="viewPost(post)"
                        class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                      >
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                    </td>
                  </tr>
                  <tr v-if="paginatedPosts.length === 0">
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                      <div class="flex flex-col items-center justify-center py-8">
                        <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-700">No forum posts found</h3>
                        <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="bg-white/80 px-4 py-3 flex items-center justify-between border-t border-gray-200/50 sm:px-6">
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
                    <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredPosts.length) }}</span>
                    of <span class="font-medium">{{ filteredPosts.length }}</span> posts
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
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
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
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
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
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

    <!-- Forum Post Detail Modal -->
    <ForumPostDetailModal
      :visible="showModal"
      :post="selectedPost"
      @close="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSideBar.vue'
import ForumPostDetailModal from '../../components/Admin/ForumPostDetailModal.vue'
import { forumService, type ForumQuestion } from '../../services/forumService'

// Reactive variables
const posts = ref<ForumQuestion[]>([])
const searchQuery = ref('')
const categoryFilter = ref('all')
const roleFilter = ref<'all' | 'farmer' | 'buyer' | 'expert' | 'admin'>('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedPost = ref<ForumQuestion | null>(null)
const showModal = ref(false)
const loading = ref(true)
const error = ref('')

// Computed properties
const uniqueCategories = computed(() => {
  const categories = new Set(posts.value.map(p => p.category).filter(Boolean))
  return Array.from(categories).sort()
})

const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  let filtered = posts.value.filter((post) => {
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      (post.description || '').toLowerCase().includes(query) ||
      (post.userFullName || '').toLowerCase().includes(query)

    const matchesCategory = categoryFilter.value === 'all' || post.category === categoryFilter.value
    const matchesRole = roleFilter.value === 'all' || post.userRole === roleFilter.value

    return matchesSearch && matchesCategory && matchesRole
  })

  // Apply sorting
  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'most_answers':
        return (b.answers?.length || 0) - (a.answers?.length || 0)
      case 'most_views':
        return (b.views || 0) - (a.views || 0)
      case 'most_votes':
        const aVotes = (a.upvotes || 0) - (a.downvotes || 0)
        const bVotes = (b.upvotes || 0) - (b.downvotes || 0)
        return bVotes - aVotes
      default: // newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredPosts.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / itemsPerPage.value))

const visiblePages = computed(() => {
  const max = 5
  let start = Math.max(1, currentPage.value - Math.floor(max / 2))
  const end = Math.min(totalPages.value, start + max - 1)
  if (end - start + 1 < max) start = Math.max(1, end - max + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Stats computed properties
const totalCount = computed(() => posts.value.length)
const totalAnswers = computed(() => posts.value.reduce((sum, p) => sum + (p.answers?.length || 0), 0))
const totalViews = computed(() => posts.value.reduce((sum, p) => sum + (p.views || 0), 0))
const totalVotes = computed(() => posts.value.reduce((sum, p) => sum + (p.upvotes || 0) + (p.downvotes || 0), 0))

// Methods
const loadPosts = async (): Promise<void> => {
  try {
    loading.value = true
    error.value = ''
    
    console.log('🔄 Loading forum posts from database...')
    const questions = await forumService.getQuestions()
    
    posts.value = questions
    console.log('✅ Loaded', questions.length, 'forum posts')
    console.log('📦 Sample post:', questions[0])
  } catch (err: any) {
    error.value = err.message || 'Failed to load forum posts'
    console.error('❌ Error loading posts:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (date: string): string => {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return ''
  }
}

const roleBadgeClass = (role: string): string => {
  const base = 'px-2 inline-flex leading-5 font-semibold rounded-full'
  switch (role?.toLowerCase()) {
    case 'farmer':
      return `${base} bg-green-100 text-green-800`
    case 'buyer':
      return `${base} bg-blue-100 text-blue-800`
    case 'expert':
      return `${base} bg-purple-100 text-purple-800`
    case 'admin':
      return `${base} bg-red-100 text-red-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const urgencyBadgeClass = (urgency: string): string => {
  const base = 'px-2 py-1 inline-flex leading-5 font-semibold rounded-full'
  switch (urgency?.toLowerCase()) {
    case 'urgent':
      return `${base} bg-red-100 text-red-800`
    case 'high':
      return `${base} bg-orange-100 text-orange-800`
    case 'normal':
      return `${base} bg-blue-100 text-blue-800`
    case 'low':
      return `${base} bg-gray-100 text-gray-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const getRoleLabel = (role: string): string => {
  switch (role?.toLowerCase()) {
    case 'farmer':
      return 'Farmer'
    case 'buyer':
      return 'Buyer'
    case 'expert':
      return 'Expert'
    case 'admin':
      return 'Admin'
    default:
      return 'User'
  }
}

const viewPost = (post: ForumQuestion): void => {
  selectedPost.value = post
  showModal.value = true
}

onMounted(() => {
  loadPosts()
})
</script>