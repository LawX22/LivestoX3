<!-- Forum.vue -->
<template>
  <div
    class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse"
        style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse"
        style="animation-delay: 0.5s"></div>
    </div>

    <!-- NavBar -->
    <div class="sticky top-0 z-50">
      <NavBar />
    </div>

    <!-- DYNAMIC HEADER -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div
        class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
        <!-- Left side - Logo and Title -->
        <div class="flex items-center min-w-0">
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a3 3 0 01-3-3v-1m8-6V9a3 3 0 00-3-3H4a3 3 0 00-3 3v6a3 3 0 003 3h2l4 4V18h5a3 3 0 003-3v-6a3 3 0 00-3-3z" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-bold text-white truncate">Livestock Forum</h1>
            <p class="text-green-100 text-sm opacity-90 truncate">Connect with farmers & experts</p>
          </div>
        </div>

        <!-- Right side - Dynamic Content Area -->
        <div class="flex-1 flex justify-end min-w-0">
          <!-- Guest Mode Notice -->
          <div v-if="!currentUser?.email" class="flex items-center gap-3 max-w-full">
            <div
              class="bg-amber-100/80 text-amber-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-amber-200 shadow-md">
              <div class="flex items-center min-w-0">
                <svg class="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-semibold truncate ml-2">Guest mode - Sign In for full access</span>
              </div>
              <router-link to="/signin"
                class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 cursor-pointer">
                Sign In
              </router-link>
            </div>

            <!-- Separate Guide Button -->
            <button @click="showGuestGuide = true"
              class="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd" />
              </svg>
              Guide
            </button>
          </div>

          <!-- Buyer Actions -->
          <div v-else-if="currentUser?.role === 'Buyer'" class="flex items-center gap-3 max-w-full">
            <div
              class="bg-green-100/80 text-green-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-green-200 shadow-md">
              <div class="flex items-center min-w-0">
                <svg class="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span class="text-sm font-semibold truncate ml-2">Ready to ask questions?</span>
              </div>
              <button @click="showModal = true"
                class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
                Ask Question
              </button>
            </div>
            <button @click="showBuyerGuide = true"
              class="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd" />
              </svg>
              Guide
            </button>
          </div>

          <!-- Farmer Actions -->
          <div v-else-if="currentUser?.role === 'Farmer'" class="flex items-center gap-3 max-w-full">
            <div
              class="bg-green-100/80 text-green-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-green-200 shadow-md">
              <div class="flex items-center min-w-0">
                <svg class="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span class="text-sm font-semibold truncate ml-2">Ready to ask questions?</span>
              </div>
              <button @click="showModal = true"
                class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
                Ask Question
              </button>
            </div>
            <button @click="showFarmerGuide = true"
              class="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd" />
              </svg>
              Guide
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading forum questions...</p>
      </div>
    </div>

    <!-- Main Content with Sidebar -->
    <div v-else class="flex flex-1 overflow-hidden">
      <!-- Enhanced Filters Sidebar with Collapse/Expand -->
      <div
        :class="`${isSidebarExpanded ? 'w-full md:w-52 lg:w-56' : 'w-14'} bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-lg relative transition-all duration-300 ease-in-out`">
        <div class="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-emerald-50/20"></div>

        <!-- Toggle Button -->
        <div @click="toggleSidebar"
          class="absolute inset-0 flex items-center justify-center cursor-pointer group z-20 bg-green-50/30 transition-colors duration-200"
          v-if="!isSidebarExpanded">
          <div
            class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
            </svg>
          </div>
        </div>

        <div class="relative h-full flex flex-col">
          <!-- Expanded View -->
          <div v-if="isSidebarExpanded" class="h-full flex flex-col">
            <!-- Header with integrated close button -->
            <div class="flex justify-between items-center p-3 border-b border-green-100/50">
              <h2
                class="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-1">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
                </svg>
                Filters
              </h2>
              <div class="flex gap-1">
                <button @click="resetFilters"
                  class="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
                <button @click="toggleSidebar"
                  class="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Sticky Search & Active Filters -->
            <div class="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-green-100/50 p-3 shadow-sm">
              <!-- Search -->
              <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100 mb-2">
                <div class="relative">
                  <input v-model="filters.search" type="text"
                    class="block w-full pl-8 pr-2 py-1.5 border border-green-200 rounded-md text-xs bg-green-50/30 focus:ring-2 focus:ring-green-500/50 cursor-text"
                    placeholder="Search..." />
                  <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg class="h-3 w-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Active Filters -->
              <div v-if="hasActiveFilters"
                class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-md p-2 border border-green-200">
                <div class="flex flex-wrap gap-1">
                  <span v-if="filters.search"
                    class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">
                    "{{ filters.search }}"
                  </span>
                  <span v-for="category in filters.categories" :key="category"
                    class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ category
                    }}</span>
                  <span v-if="filters.urgency"
                    class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{
                    filters.urgency }}</span>
                </div>
              </div>
            </div>

            <!-- Scrollable Filters Area -->
            <div class="flex-1 overflow-y-auto p-3">
              <!-- Compact Filter Group -->
              <div class="space-y-3">
                <!-- Category Checkboxes -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-7 7a2 2 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Categories
                  </h3>
                  <div class="space-y-1">
                    <label v-for="category in categories" :key="category"
                      class="flex items-center gap-1.5 text-xs text-gray-700 p-1 rounded cursor-pointer">
                      <input type="checkbox" :value="category" v-model="filters.categories"
                        class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer">
                      <span class="truncate">{{ category }}</span>
                    </label>
                  </div>
                </div>

                <!-- Urgency Filter -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Urgency
                  </h3>
                  <div class="space-y-1">
                    <label v-for="urgency in urgencyLevels" :key="urgency"
                      class="flex items-center gap-1.5 text-xs text-gray-700 p-1 rounded cursor-pointer">
                      <input type="radio" :value="urgency" v-model="filters.urgency"
                        class="h-3 w-3 text-green-600 rounded-full border-gray-300 focus:ring-green-500 cursor-pointer">
                      <span class="truncate">{{ urgency }}</span>
                    </label>
                  </div>
                </div>

                <!-- Forum Stats -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Forum Stats
                  </h3>
                  <div class="space-y-1">
                    <div class="flex justify-between items-center">
                      <span class="text-xs text-gray-600">Questions:</span>
                      <span class="text-xs font-bold text-green-600">{{ forumQuestions.length }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs text-gray-600">Answers:</span>
                      <span class="text-xs font-bold text-green-600">{{ totalAnswers }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xs text-gray-600">Active Users:</span>
                      <span class="text-xs font-bold text-green-600">{{ activeUsers }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- STICKY Results Summary with Sort -->
        <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-2">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div class="flex items-center gap-2">
              <div
                class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-800">
                  {{ filteredQuestions.length }} {{ filteredQuestions.length === 1 ? 'Question' : 'Questions' }} Found
                </h3>
              </div>
            </div>

            <!-- Sort By Filter -->
            <div class="flex items-center gap-2">
              <label class="text-xs font-semibold text-gray-700">Sort By:</label>
              <select v-model="sortBy"
                class="px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm cursor-pointer">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most-answers">Most Answers</option>
                <option value="urgent">Urgency</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        <!-- SCROLLABLE Questions Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-3">
            <!-- Compact Card View -->
            <div v-if="filteredQuestions.length > 0" class="space-y-4">
              <ForumCard 
                v-for="question in sortedQuestions" 
                :key="question.id" 
                :question="question"
                :currentUser="currentUser"
                @upvote="upvoteQuestion"
                @downvote="downvoteQuestion" 
                @toggleBookmark="toggleBookmark"
                @openComments="openCommentsModal"
                @editQuestion="handleEditQuestion"
                @deleteQuestion="handleDeleteQuestion"
                @showToast="showToastNotification"
              />
            </div>

            <!-- Enhanced Empty State -->
            <div v-if="filteredQuestions.length === 0" class="flex flex-col items-center justify-center py-16">
              <div
                class="bg-gradient-to-br from-white/95 to-gray-50/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/80 max-w-md text-center shadow-2xl">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <svg class="w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">No questions found</h3>
                <p class="text-sm text-gray-600 mb-6 leading-relaxed">We couldn't find any questions matching your
                  current search criteria. Try adjusting your filters or ask a new question.</p>
                <button v-if="currentUser" @click="showModal = true"
                  class="px-6 py-3 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-xl flex items-center gap-2 mx-auto transform cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ask a Question
                </button>
                <button v-else @click="resetFilters"
                  class="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-xl flex items-center gap-2 mx-auto transform cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ask Question Modal -->
    <AskQuestionModal v-if="showModal" :visible="showModal" @submit="handlePostQuestion" @close="showModal = false"
      :categories="categories" />

    <!-- Comments Modal -->
    <CommentsModal v-if="showCommentsModal" :visible="showCommentsModal" :question="selectedQuestion!"
      :currentUser="currentUser" @close="showCommentsModal = false" @updateQuestion="handleUpdateQuestion"
      @signin="handleSignin" @showToast="showToastNotification" />

    <!-- Buyer Guide Modal -->
    <div v-if="showBuyerGuide"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        class="bg-white/95 backdrop-blur-xl rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40">
        <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white rounded-t-2xl sticky top-0 z-10">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">Buyer Guide</h3>
            <button @click="showBuyerGuide = false" class="text-white/80 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Public Questions</h4>
                <p class="text-sm text-gray-600">As a buyer, you can view and answer all public questions marked as
                  visible to "All" users.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Ask Questions</h4>
                <p class="text-sm text-gray-600">Buyers can now ask questions to farmers and other community members.
                </p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.230.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Building Relationships</h4>
                <p class="text-sm text-gray-600">Use the forum to connect with farmers, understand their challenges, and
                  build trust for future business.</p>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <button @click="showBuyerGuide = false"
              class="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg cursor-pointer">
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Farmer Guide Modal -->
    <div v-if="showFarmerGuide"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        class="bg-white/95 backdrop-blur-xl rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40">
        <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white rounded-t-2xl sticky top-0 z-10">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">Farmer Guide</h3>
            <button @click="showFarmerGuide = false" class="text-white/80 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Ask Questions</h4>
                <p class="text-sm text-gray-600">As a farmer, you can ask questions to the community and get answers
                  from other farmers and buyers.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Answer Questions</h4>
                <p class="text-sm text-gray-600">Share your knowledge and experience by answering questions from other
                  community members.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.230.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Build Reputation</h4>
                <p class="text-sm text-gray-600">Gain recognition in the community by providing helpful answers and
                  engaging with other members.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Private Questions</h4>
                <p class="text-sm text-gray-600">You can mark questions as "Farmers Only" to get advice specifically
                  from other farmers.</p>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <button @click="showFarmerGuide = false"
              class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg cursor-pointer">
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Guest Guide Modal -->
    <div v-if="showGuestGuide"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        class="bg-white/95 backdrop-blur-xl rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40">
        <div class="bg-gradient-to-r from-amber-600 to-yellow-600 p-4 text-white rounded-t-2xl sticky top-0 z-10">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">Guest Guide</h3>
            <button @click="showGuestGuide = false" class="text-white/80 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-amber-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Browse Questions</h4>
                <p class="text-sm text-gray-600">As a guest, you can browse all public questions and answers to learn
                  from the community.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-amber-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Read-Only Access</h4>
                <p class="text-sm text-gray-600">You can view questions and answers but cannot post or interact until
                  you sign in.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-amber-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Sign Up</h4>
                <p class="text-sm text-gray-600">Create an account to ask questions, answer posts, and engage with the
                  community.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-amber-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Benefits of Joining</h4>
                <p class="text-sm text-gray-600">Get personalized advice, connect with experts, and access exclusive
                  content by creating an account.</p>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <button @click="showGuestGuide = false"
              class="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg cursor-pointer">
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div
        class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">Success!</h4>
            <div class="text-xs text-gray-700 font-medium">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false"
            class="ml-3 flex-shrink-0 text-gray-400 transition-colors duration-200 p-0.5 rounded-md cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import AskQuestionModal from '../../components/Forum/AskQuestionModal.vue';
import CommentsModal from '../../components/Forum/CommentsModal.vue';
import ForumCard from '../../components/Forum/ForumCard.vue';
import { getCurrentUser } from '../../services/user';
import { forumService, type ForumQuestion, type ForumAnswer, type NewQuestion } from '../../services/forumService';

// Define interfaces to ensure type safety
interface User {
  email: string;
  role: 'Farmer' | 'Buyer';
}

// Router setup
const router = useRouter();

// Get current user
const currentUser = getCurrentUser() as User | null;

// State
const isLoading = ref(true);
const showModal = ref(false);
const showBuyerGuide = ref(false);
const showFarmerGuide = ref(false);
const showGuestGuide = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const showCommentsModal = ref(false);
const selectedQuestion = ref<ForumQuestion | null>(null);
const isSidebarExpanded = ref(true);
const sortBy = ref('newest');

const categories = ['Poultry', 'Swine', 'Cattle', 'Goat', 'Sheep', 'Feed', 'Health', 'Equipment'];
const urgencyLevels = ['Low', 'Normal', 'High', 'Critical'];

const filters = ref({
  search: '',
  categories: [] as string[],
  urgency: ''
});

// Forum questions from Supabase
const forumQuestions = ref<ForumQuestion[]>([]);

// Ensure all answers have the required 'id' property from ForumAnswer interface
function normalizeAnswers(questions: ForumQuestion[]): ForumQuestion[] {
  return questions.map(q => ({
    ...q,
    answers: q.answers.map((a, idx) => ({
      ...a,
      id: (a as any).id ?? idx // fallback if missing
    })) as ForumAnswer[]
  }));
}

// Computed properties
const hasActiveFilters = computed(() => {
  return filters.value.search !== '' ||
    filters.value.categories.length > 0 ||
    filters.value.urgency !== '';
});

const filteredQuestions = computed(() => {
  return forumQuestions.value.filter(question => {
    // Visibility filter based on user role
    if (question.visibility === 'farmers' && (!currentUser || currentUser.role !== 'Farmer')) {
      return false;
    }

    // Search filter
    const searchLower = filters.value.search.toLowerCase();
    const matchesSearch = !filters.value.search ||
      question.title.toLowerCase().includes(searchLower) ||
      (question.description && question.description.toLowerCase().includes(searchLower)) ||
      question.answers.some(answer => answer.text.toLowerCase().includes(searchLower));

    // Category filter
    const matchesCategory = filters.value.categories.length === 0 ||
      (question.category && filters.value.categories.includes(question.category));

    // Urgency filter
    const matchesUrgency = !filters.value.urgency ||
      question.urgency === filters.value.urgency;

    return matchesSearch && matchesCategory && matchesUrgency;
  });
});

const sortedQuestions = computed(() => {
  return [...filteredQuestions.value].sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'most-answers':
        return b.answers.length - a.answers.length;
      case 'urgent':
        const urgencyOrder = { 'Critical': 4, 'High': 3, 'Normal': 2, 'Low': 1 };
        return (urgencyOrder[b.urgency as keyof typeof urgencyOrder] || 0) -
          (urgencyOrder[a.urgency as keyof typeof urgencyOrder] || 0);
      case 'popular':
        const aScore = (a.upvotes || 0) - (a.downvotes || 0);
        const bScore = (b.upvotes || 0) - (b.downvotes || 0);
        return bScore - aScore;
      default:
        return 0;
    }
  });
});

const totalAnswers = computed(() => {
  return forumQuestions.value.reduce((total, question) => total + question.answers.length, 0);
});

// Active users: count unique userEmail from questions and answers
const activeUsers = computed(() => {
  const userSet = new Set<string>();
  forumQuestions.value.forEach(q => {
    if (q.userEmail) userSet.add(q.userEmail);
    q.answers.forEach(a => {
      if ((a as any).userEmail) userSet.add((a as any).userEmail);
    });
  });
  return userSet.size;
});

const loadQuestions = async () => {
  try {
    isLoading.value = true;
    const questions = await forumService.getQuestions(currentUser?.email);
    forumQuestions.value = normalizeAnswers(questions);
  } catch (error) {
    console.error('Failed to load questions:', error);
    showToastNotification('Failed to load questions. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const resetFilters = () => {
  filters.value = {
    search: '',
    categories: [],
    urgency: ''
  };
  showToastNotification('All filters have been reset');
};

const showToastNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 4000);
};

const openCommentsModal = async (question: ForumQuestion) => {
  selectedQuestion.value = question;
  showCommentsModal.value = true;
  
  // Increment view count in database
  try {
    await forumService.incrementViews(question.id);
    // Update local state
    const index = forumQuestions.value.findIndex(q => q.id === question.id);
    if (index !== -1) {
      forumQuestions.value[index].views = (forumQuestions.value[index].views || 0) + 1;
    }
  } catch (error) {
    console.error('Failed to increment views:', error);
  }
};

const handleUpdateQuestion = (updatedQuestion: ForumQuestion) => {
  const index = forumQuestions.value.findIndex(q => q.id === updatedQuestion.id);
  if (index !== -1) {
    forumQuestions.value[index] = updatedQuestion;
    selectedQuestion.value = updatedQuestion;
  }
};

const handleSignin = () => {
  router.push('/signin');
};

const handlePostQuestion = async (questionData: any) => {
  if (!currentUser) return;

  try {
    const newQuestion = await forumService.createQuestion(
      {
        title: questionData.title,
        description: questionData.description,
        category: questionData.category,
        urgency: questionData.urgency,
        visibility: questionData.visibility
      },
      currentUser.email,
      currentUser.role
    );

    forumQuestions.value.unshift(newQuestion);
    showModal.value = false;
    showToastNotification('Your question has been posted successfully!');
  } catch (error) {
    console.error('Failed to post question:', error);
    showToastNotification('Failed to post question. Please try again.');
  }
};

const upvoteQuestion = async (question: ForumQuestion) => {
  if (!currentUser || question.userEmail === currentUser.email) return;

  try {
    const result = await forumService.voteQuestion(question.id, currentUser.email, 'up');
    
    // Update local state
    const index = forumQuestions.value.findIndex(q => q.id === question.id);
    if (index !== -1) {
      forumQuestions.value[index].upvotes = result.upvotes;
      forumQuestions.value[index].downvotes = result.downvotes;
      forumQuestions.value[index].userVote = result.userVote;
      
      // Update userVotes object
      if (!forumQuestions.value[index].userVotes) {
        forumQuestions.value[index].userVotes = {};
      }
      if (result.userVote) {
        forumQuestions.value[index].userVotes![currentUser.email] = result.userVote;
      } else {
        delete forumQuestions.value[index].userVotes![currentUser.email];
      }
    }
  } catch (error) {
    console.error('Failed to vote:', error);
    showToastNotification('Failed to vote. Please try again.');
  }
};

const downvoteQuestion = async (question: ForumQuestion) => {
  if (!currentUser || question.userEmail === currentUser.email) return;

  try {
    const result = await forumService.voteQuestion(question.id, currentUser.email, 'down');
    
    // Update local state
    const index = forumQuestions.value.findIndex(q => q.id === question.id);
    if (index !== -1) {
      forumQuestions.value[index].upvotes = result.upvotes;
      forumQuestions.value[index].downvotes = result.downvotes;
      forumQuestions.value[index].userVote = result.userVote;
      
      // Update userVotes object
      if (!forumQuestions.value[index].userVotes) {
        forumQuestions.value[index].userVotes = {};
      }
      if (result.userVote) {
        forumQuestions.value[index].userVotes![currentUser.email] = result.userVote;
      } else {
        delete forumQuestions.value[index].userVotes![currentUser.email];
      }
    }
  } catch (error) {
    console.error('Failed to vote:', error);
    showToastNotification('Failed to vote. Please try again.');
  }
};

const toggleBookmark = async (question: ForumQuestion) => {
  if (!currentUser) return;

  try {
    const isBookmarked = await forumService.toggleBookmark(question.id, currentUser.email);
    
    // Update local state
    const index = forumQuestions.value.findIndex(q => q.id === question.id);
    if (index !== -1) {
      forumQuestions.value[index].isBookmarked = isBookmarked;
    }
    
    const action = isBookmarked ? 'bookmarked' : 'removed from bookmarks';
    showToastNotification(`Question ${action}`);
  } catch (error) {
    console.error('Failed to toggle bookmark:', error);
    showToastNotification('Failed to bookmark question. Please try again.');
  }
};

// NEW HANDLER METHODS FOR EDIT AND DELETE
const handleEditQuestion = async (question: ForumQuestion, editedData: Partial<ForumQuestion>) => {
  try {
    // Find the question in our local array and update it
    const index = forumQuestions.value.findIndex(q => q.id === question.id);
    if (index !== -1) {
      // Update the local question with the edited data and normalize answers
      const updatedQuestion = {
        ...forumQuestions.value[index],
        ...editedData
      };
      updatedQuestion.answers = updatedQuestion.answers.map((a, idx) => ({
        ...a,
        id: (a as any).id ?? idx
      }));
      forumQuestions.value[index] = updatedQuestion;
      
      // If this is the selected question in comments modal, update it too
      if (selectedQuestion.value && selectedQuestion.value.id === question.id) {
        selectedQuestion.value = {
          ...selectedQuestion.value,
          ...editedData,
          answers: updatedQuestion.answers
        };
      }
    }
    
    showToastNotification('Question updated successfully!');
  } catch (error) {
    console.error('Failed to handle question edit:', error);
    showToastNotification('Failed to update question. Please try again.');
  }
};

const handleDeleteQuestion = async (questionId: number) => {
  try {
    // Remove the question from our local array
    const index = forumQuestions.value.findIndex(q => q.id === questionId);
    if (index !== -1) {
      forumQuestions.value.splice(index, 1);
    }
    
    // Close comments modal if it was showing the deleted question
    if (selectedQuestion.value && selectedQuestion.value.id === questionId) {
      showCommentsModal.value = false;
      selectedQuestion.value = null;
    }
    
    showToastNotification('Question deleted successfully!');
  } catch (error) {
    console.error('Failed to handle question deletion:', error);
    showToastNotification('Failed to delete question. Please try again.');
  }
};

// Lifecycle hooks
onMounted(() => {
  loadQuestions();
});
</script>