<!-- forumManagement.vue -->
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
                <p class="text-green-100 text-sm opacity-90 truncate">Moderate posts, manage categories, and oversee community discussions</p>
              </div>
            </div>

            <!-- Right side - Stats -->
            <div class="flex items-center space-x-4">
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Total Posts: {{ filteredPosts.length }}</span>
              </div>
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Pending: {{ pendingCount }}</span>
              </div>
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Flagged: {{ flaggedCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="mb-6">
          <nav class="flex space-x-8">
            <button
              @click="activeTab = 'posts'"
              :class="[
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'posts'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Forum Posts
            </button>
            <button
              @click="activeTab = 'categories'"
              :class="[
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'categories'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Categories
            </button>
            <button
              @click="activeTab = 'reports'"
              :class="[
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'reports'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Reports & Moderation
            </button>
          </nav>
        </div>

        <!-- Posts Tab -->
        <div v-if="activeTab === 'posts'">
          <!-- Filters Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
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

              <!-- Status Filter -->
              <div>
                <select
                  v-model="statusFilter"
                  class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="pending">Pending Review</option>
                  <option value="flagged">Flagged</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>

              <!-- Category Filter -->
              <div>
                <select
                  v-model="categoryFilter"
                  class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
                >
                  <option value="all">All Categories</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
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
                  <option value="expert">Experts</option>
                  <option value="admin">Admins</option>
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
                  <option value="most_replies">Most Replies</option>
                  <option value="most_views">Most Views</option>
                  <option value="most_reports">Most Reports</option>
                  <option value="last_activity">Last Activity</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Posts</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ totalPostsCount }}</h3>
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
                  <p class="text-sm font-medium text-gray-500">Published</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ publishedCount }}</h3>
                </div>
                <div class="p-2 bg-green-100 rounded-lg text-green-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Flagged</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ flaggedCount }}</h3>
                </div>
                <div class="p-2 bg-red-100 rounded-lg text-red-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Hidden</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ hiddenCount }}</h3>
                </div>
                <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L18 18" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Categories</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ categories.length }}</h3>
                </div>
                <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Posts Table -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden transition-all hover:shadow-2xl">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200/50">
                <thead class="bg-white/80 sticky top-0 z-10">
                  <tr>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post Details
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Engagement
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-start">
                        <div class="flex-shrink-0 relative">
                          <!-- Post indicators -->
                          <div class="flex space-x-1">
                            <span v-if="post.isPinned"
                              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                <path fill-rule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                              </svg>
                              Pinned
                            </span>
                            <span v-if="post.isLocked"
                              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                              </svg>
                              Locked
                            </span>
                          </div>
                          <span v-if="post.reportCount > 0"
                            class="absolute -top-1 -right-1 h-4 w-4 rounded-full ring-1 ring-white bg-red-500 text-white text-xs flex items-center justify-center"
                            :title="`${post.reportCount} reports`">
                            {{ post.reportCount }}
                          </span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ post.title }}</div>
                          <div class="text-sm text-gray-500 truncate max-w-xs">{{ post.content.substring(0, 100) }}...</div>
                          <div class="flex flex-wrap gap-1 mt-1">
                            <span
                              v-for="tag in post.tags.slice(0, 3)"
                              :key="tag"
                              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800"
                            >
                              #{{ tag }}
                            </span>
                            <span v-if="post.tags.length > 3" class="text-xs text-gray-400">+{{ post.tags.length - 3 }} more</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ post.authorName }}</div>
                      <div class="text-sm text-gray-500">{{ post.authorEmail }}</div>
                      <span :class="roleBadgeClass(post.authorRole)">{{ getRoleLabel(post.authorRole) }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ getCategoryName(post.category) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="space-y-1">
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {{ post.replyCount }}
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {{ post.viewCount }}
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {{ post.likeCount }}
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="statusBadgeClass(post.status)">{{ getStatusLabel(post.status) }}</span>
                      <div v-if="post.flagReason" class="text-xs text-red-600 mt-1">
                        {{ post.flagReason }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{{ formatDate(post.createdAt) }}</div>
                      <div v-if="post.lastReplyAt" class="text-xs text-gray-400">
                        Last reply: {{ formatDate(post.lastReplyAt) }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex justify-end space-x-2">
                        <button
                          @click="viewPost(post)"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                        >
                          View
                        </button>
                        <button
                          v-if="post.status === 'pending'"
                          @click="approvePost(post)"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                        >
                          Approve
                        </button>
                        <button
                          v-if="post.status === 'flagged'"
                          @click="reviewPost(post)"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                        >
                          Review
                        </button>
                        <button
                          v-if="!post.isPinned && post.status === 'published'"
                          @click="pinPost(post)"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all"
                        >
                          Pin
                        </button>
                        <button
                          v-if="!post.isLocked && post.status === 'published'"
                          @click="lockPost(post)"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                        >
                          Lock
                        </button>
                        <button
                          v-if="post.status === 'published'"
                          @click="flagPost(post)"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                        >
                          Flag
                        </button>
                        <button
                          @click="hidePost(post)"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                        >
                          Hide
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="paginatedPosts.length === 0">
                    <td colspan="7" class="px-6 py-4 text-center text-gray-500">
                      <div class="flex flex-col items-center justify-center py-8">
                        <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-700">No posts found</h3>
                        <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination for Posts -->
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
        </div>

        <!-- Categories Tab -->
        <div v-if="activeTab === 'categories'">
          <!-- Categories Header -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 mb-6">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-lg font-medium text-gray-900">Forum Categories</h2>
                <p class="text-sm text-gray-500">Manage forum categories and their settings</p>
              </div>
              <button
                @click="createCategory"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Category
              </button>
            </div>
          </div>

          <!-- Categories Table -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200/50">
                <thead class="bg-white/80 sticky top-0 z-10">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posts
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white/80 divide-y divide-gray-200/50">
                  <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50/80 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                        <div class="text-sm text-gray-500">{{ category.description }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ category.postCount }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ category.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ category.order }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex justify-end space-x-2">
                        <button
                          @click="editCategory(category)"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          @click="toggleCategory(category)"
                          :class="category.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
                          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                        >
                          {{ category.isActive ? 'Deactivate' : 'Activate' }}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Reports Tab -->
        <div v-if="activeTab === 'reports'">
          <!-- Reports Header -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 mb-6">
            <div>
              <h2 class="text-lg font-medium text-gray-900">Reports & Moderation</h2>
              <p class="text-sm text-gray-500">Review reported content and moderate the forum</p>
            </div>
          </div>

          <!-- Reported Posts -->
          <div class="space-y-4">
            <div v-for="post in reportedPosts" :key="post.id" 
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-2">
                    <h3 class="text-lg font-medium text-gray-900">{{ post.title }}</h3>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {{ post.reportCount }} reports
                    </span>
                  </div>
                  <p class="mt-1 text-sm text-gray-600">{{ post.content.substring(0, 200) }}...</p>
                  <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {{ post.authorName }}</span>
                    <span>•</span>
                    <span>{{ getCategoryName(post.category) }}</span>
                    <span>•</span>
                    <span>{{ formatDate(post.createdAt) }}</span>
                  </div>
                </div>
                <div class="flex space-x-2 ml-4">
                  <button
                    @click="viewPost(post)"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                  >
                    Review
                  </button>
                  <button
                    @click="flagPost(post)"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Post Detail Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Post Details</h3>
            <button
              @click="showModal = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="selectedPost" class="space-y-4">
            <div>
              <h4 class="text-xl font-semibold text-gray-900">{{ selectedPost.title }}</h4>
              <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>By {{ selectedPost.authorName }}</span>
                <span>•</span>
                <span>{{ getCategoryName(selectedPost.category) }}</span>
                <span>•</span>
                <span>{{ formatDate(selectedPost.createdAt) }}</span>
              </div>
            </div>
            
            <div class="prose max-w-none">
              <p class="text-gray-700">{{ selectedPost.content }}</p>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in selectedPost.tags" :key="tag"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                #{{ tag }}
              </span>
            </div>
            
            <div class="grid grid-cols-4 gap-4 py-4 border-t border-gray-200">
              <div class="text-center">
                <div class="text-2xl font-semibold text-gray-900">{{ selectedPost.replyCount }}</div>
                <div class="text-sm text-gray-500">Replies</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-semibold text-gray-900">{{ selectedPost.viewCount }}</div>
                <div class="text-sm text-gray-500">Views</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-semibold text-gray-900">{{ selectedPost.likeCount }}</div>
                <div class="text-sm text-gray-500">Likes</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-semibold text-gray-900">{{ selectedPost.reportCount }}</div>
                <div class="text-sm text-gray-500">Reports</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSideBar.vue'

// Define interfaces
interface ForumPost {
  id: string
  title: string
  content: string
  category: string
  authorId: string
  authorName: string
  authorEmail: string
  authorRole: 'farmer' | 'buyer' | 'expert' | 'admin'
  status: 'published' | 'pending' | 'flagged' | 'hidden' | 'deleted'
  isPinned: boolean
  isLocked: boolean
  replyCount: number
  viewCount: number
  likeCount: number
  reportCount: number
  createdAt: Date
  updatedAt: Date
  lastReplyAt?: Date
  flagReason?: string
  flaggedBy?: string
  tags: string[]
}

interface ForumCategory {
  id: string
  name: string
  description: string
  postCount: number
  isActive: boolean
  order: number
  moderators: string[]
}

// Reactive variables
const posts = ref<ForumPost[]>([])
const categories = ref<ForumCategory[]>([])
const activeTab = ref<'posts' | 'categories' | 'reports'>('posts')
const searchQuery = ref('')
const statusFilter = ref<'all' | 'published' | 'pending' | 'flagged' | 'hidden'>('all')
const categoryFilter = ref<'all' | string>('all')
const roleFilter = ref<'all' | 'farmer' | 'buyer' | 'expert' | 'admin'>('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedPost = ref<ForumPost | null>(null)
const showModal = ref(false)

// Computed properties
const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  let filtered = posts.value.filter((post) => {
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.authorName.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))

    const matchesStatus = statusFilter.value === 'all' || post.status === statusFilter.value
    const matchesCategory = categoryFilter.value === 'all' || post.category === categoryFilter.value
    const matchesRole = roleFilter.value === 'all' || post.authorRole === roleFilter.value

    return matchesSearch && matchesStatus && matchesCategory && matchesRole
  })

  // Apply sorting
  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return a.createdAt.getTime() - b.createdAt.getTime()
      case 'most_replies':
        return b.replyCount - a.replyCount
      case 'most_views':
        return b.viewCount - a.viewCount
      case 'most_reports':
        return b.reportCount - a.reportCount
      case 'last_activity':
        const aActivity = a.lastReplyAt || a.createdAt
        const bActivity = b.lastReplyAt || b.createdAt
        return bActivity.getTime() - aActivity.getTime()
      default: // newest first
        return b.createdAt.getTime() - a.createdAt.getTime()
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

const reportedPosts = computed(() => 
  posts.value.filter(post => post.reportCount > 0).sort((a, b) => b.reportCount - a.reportCount)
)

// Stats computed properties
const totalPostsCount = computed(() => posts.value.length)
const publishedCount = computed(() => posts.value.filter(p => p.status === 'published').length)
const pendingCount = computed(() => posts.value.filter(p => p.status === 'pending').length)
const flaggedCount = computed(() => posts.value.filter(p => p.status === 'flagged').length)
const hiddenCount = computed(() => posts.value.filter(p => p.status === 'hidden').length)

// Methods
const loadData = (): void => {
  // Sample categories
  const sampleCategories: ForumCategory[] = [
    {
      id: 'general',
      name: 'General Discussion',
      description: 'General farming and livestock discussions',
      postCount: 45,
      isActive: true,
      order: 1,
      moderators: ['admin1', 'expert1']
    },
    {
      id: 'cattle',
      name: 'Cattle Breeding',
      description: 'Discussions about cattle breeding and management',
      postCount: 32,
      isActive: true,
      order: 2,
      moderators: ['expert2']
    },
    {
      id: 'market',
      name: 'Market Updates',
      description: 'Market prices and trading discussions',
      postCount: 28,
      isActive: true,
      order: 3,
      moderators: ['admin1']
    },
    {
      id: 'health',
      name: 'Animal Health',
      description: 'Animal health and veterinary advice',
      postCount: 67,
      isActive: true,
      order: 4,
      moderators: ['expert1', 'expert3']
    }
  ]

  // Sample posts
  const samplePosts: ForumPost[] = [
    {
      id: '1',
      title: 'Best practices for cattle breeding in tropical climate',
      content: 'I\'ve been raising cattle for 5 years now and wanted to share some insights about breeding in our tropical climate. Heat stress is a major concern that affects fertility rates. Here are some strategies I\'ve found effective...',
      category: 'cattle',
      authorId: 'user1',
      authorName: 'Juan Dela Cruz',
      authorEmail: 'juan@email.com',
      authorRole: 'farmer',
      status: 'published',
      isPinned: true,
      isLocked: false,
      replyCount: 23,
      viewCount: 156,
      likeCount: 34,
      reportCount: 0,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      lastReplyAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['cattle', 'breeding', 'tropical', 'tips']
    },
    {
      id: '2',
      title: 'Market prices for goats this month - discussion',
      content: 'Has anyone noticed the recent price fluctuations in the goat market? I\'m seeing some interesting trends in my area. Would love to hear what others are experiencing in different regions.',
      category: 'market',
      authorId: 'user2',
      authorName: 'Maria Santos',
      authorEmail: 'maria@email.com',
      authorRole: 'buyer',
      status: 'flagged',
      isPinned: false,
      isLocked: false,
      replyCount: 8,
      viewCount: 92,
      likeCount: 12,
      reportCount: 2,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      lastReplyAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      flagReason: 'Potentially misleading market information',
      flaggedBy: 'admin1',
      tags: ['market', 'goats', 'prices', 'discussion']
    },
    {
      id: '3',
      title: 'Question about vaccination schedules for young calves',
      content: 'I\'m a new farmer and would appreciate guidance on proper vaccination schedules for calves under 6 months. What vaccines are essential and when should they be administered?',
      category: 'health',
      authorId: 'user3',
      authorName: 'Pedro Rodriguez',
      authorEmail: 'pedro@email.com',
      authorRole: 'farmer',
      status: 'pending',
      isPinned: false,
      isLocked: false,
      replyCount: 0,
      viewCount: 15,
      likeCount: 2,
      reportCount: 0,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      updatedAt: new Date(),
      tags: ['health', 'vaccination', 'calves', 'question']
    }
  ]

  categories.value = sampleCategories
  posts.value = samplePosts
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusBadgeClass = (status: string): string => {
  const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
  switch (status) {
    case 'published':
      return `${base} bg-green-100 text-green-800`
    case 'pending':
      return `${base} bg-yellow-100 text-yellow-800`
    case 'flagged':
      return `${base} bg-red-100 text-red-800`
    case 'hidden':
      return `${base} bg-purple-100 text-purple-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const roleBadgeClass = (role: string): string => {
  const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
  switch (role) {
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

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'published':
      return 'Published'
    case 'pending':
      return 'Pending Review'
    case 'flagged':
      return 'Flagged'
    case 'hidden':
      return 'Hidden'
    default:
      return status
  }
}

const getRoleLabel = (role: string): string => {
  switch (role) {
    case 'farmer':
      return 'Farmer'
    case 'buyer':
      return 'Buyer'
    case 'expert':
      return 'Expert'
    case 'admin':
      return 'Admin'
    default:
      return role
  }
}

const getCategoryName = (categoryId: string): string => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : categoryId
}

const viewPost = (post: ForumPost): void => {
  selectedPost.value = post
  showModal.value = true
}

const approvePost = (post: ForumPost): void => {
  if (confirm(`Approve post "${post.title}" and make it visible to all users?`)) {
    updatePost({
      ...post,
      status: 'published',
      updatedAt: new Date()
    })
  }
}

const reviewPost = (post: ForumPost): void => {
  const action = confirm(`Review "${post.title}". Click OK to approve or Cancel to keep flagged.`)
  if (action) {
    updatePost({
      ...post,
      status: 'published',
      flagReason: undefined,
      flaggedBy: undefined,
      updatedAt: new Date()
    })
  }
}

const flagPost = (post: ForumPost): void => {
  const reason = prompt('Reason for flagging this post:', 'Inappropriate content or violates community guidelines')
  if (reason !== null && reason.trim()) {
    updatePost({
      ...post,
      status: 'flagged',
      flagReason: reason.trim(),
      flaggedBy: 'admin',
      updatedAt: new Date()
    })
  }
}

const hidePost = (post: ForumPost): void => {
  if (confirm(`Hide post "${post.title}" from public view?`)) {
    updatePost({
      ...post,
      status: 'hidden',
      updatedAt: new Date()
    })
  }
}

const pinPost = (post: ForumPost): void => {
  if (confirm(`Pin post "${post.title}" to the top of the forum?`)) {
    updatePost({
      ...post,
      isPinned: true,
      updatedAt: new Date()
    })
  }
}

const lockPost = (post: ForumPost): void => {
  if (confirm(`Lock post "${post.title}" to prevent further replies?`)) {
    updatePost({
      ...post,
      isLocked: true,
      updatedAt: new Date()
    })
  }
}

const updatePost = (updatedPost: ForumPost): void => {
  try {
    const index = posts.value.findIndex(p => p.id === updatedPost.id)
    if (index !== -1) {
      posts.value[index] = updatedPost
    }

    if (selectedPost.value?.id === updatedPost.id) {
      selectedPost.value = updatedPost
    }

    // Show success message
    const actionMessages = {
      published: 'has been published and is now visible to all users',
      flagged: 'has been flagged for review',
      pending: 'is now pending review',
      hidden: 'has been hidden from public view'
    }
    
    let message = `"${updatedPost.title}" has been updated.`
    if (updatedPost.isPinned) message = `"${updatedPost.title}" has been pinned to the top.`
    if (updatedPost.isLocked) message = `"${updatedPost.title}" has been locked.`
    if (actionMessages[updatedPost.status as keyof typeof actionMessages]) {
      message = `"${updatedPost.title}" ${actionMessages[updatedPost.status as keyof typeof actionMessages]}.`
    }
    
    alert(message)
    
  } catch (error) {
    console.error('Error updating post:', error)
    alert('Error updating post. Please try again.')
  }
}

const createCategory = (): void => {
  const name = prompt('Category Name:')
  const description = prompt('Category Description:')
  
  if (name && description) {
    const newCategory: ForumCategory = {
      id: `cat_${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      postCount: 0,
      isActive: true,
      order: categories.value.length + 1,
      moderators: []
    }
    
    categories.value.push(newCategory)
    alert(`Category "${newCategory.name}" has been created successfully.`)
  }
}

const editCategory = (category: ForumCategory): void => {
  const newName = prompt('Category Name:', category.name)
  const newDescription = prompt('Category Description:', category.description)
  
  if (newName && newDescription) {
    const index = categories.value.findIndex(c => c.id === category.id)
    if (index !== -1) {
      categories.value[index] = {
        ...category,
        name: newName.trim(),
        description: newDescription.trim()
      }
      alert(`Category "${newName}" has been updated successfully.`)
    }
  }
}

const toggleCategory = (category: ForumCategory): void => {
  const action = category.isActive ? 'deactivate' : 'activate'
  if (confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} category "${category.name}"?`)) {
    const index = categories.value.findIndex(c => c.id === category.id)
    if (index !== -1) {
      categories.value[index] = {
        ...category,
        isActive: !category.isActive
      }
      alert(`Category "${category.name}" has been ${action}d successfully.`)
    }
  }
}

onMounted(() => {
  loadData()
})
</script>