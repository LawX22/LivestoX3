<!-- Forum.vue -->
<template>
  <div class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
    </div>

    <!-- NavBar -->
    <div class="sticky top-0 z-50">
      <NavBar />
    </div>

    <!-- DYNAMIC HEADER -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
        <!-- Left side - Logo and Title -->
        <div class="flex items-center min-w-0">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a3 3 0 01-3-3v-1m8-6V9a3 3 0 00-3-3H4a3 3 0 00-3 3v6a3 3 0 003 3h2l4 4V18h5a3 3 0 003-3v-6a3 3 0 00-3-3z" />
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
          <div v-if="!currentUser?.email" class="bg-amber-100/80 text-amber-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-amber-200 shadow-md max-w-full">
            <div class="flex items-center min-w-0">
              <svg class="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm font-semibold truncate ml-2">Guest mode - Sign In for full access</span>
            </div>
            <router-link to="/signin" class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
              Sign In
            </router-link>
          </div>

          <!-- Buyer Notice -->
          <div v-else-if="currentUser?.role === 'Buyer'" class="bg-blue-100/80 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-blue-200 shadow-md max-w-full">
            <div class="flex items-center min-w-0">
              <svg class="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span class="text-sm font-semibold truncate ml-2">Buyer account - View & answer public questions</span>
            </div>
            <button @click="showBuyerGuide = true" class="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
              </svg>
              Guide
            </button>
          </div>

          <!-- Farmer Actions -->
          <div v-else-if="currentUser?.role === 'Farmer'" class="flex items-center gap-3 max-w-full">
            <div class="bg-green-100/80 text-green-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-green-200 shadow-md">
              <div class="flex items-center min-w-0">
                <svg class="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span class="text-sm font-semibold truncate ml-2">Ready to ask questions?</span>
              </div>
              <button @click="showModal = true" class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Ask Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content with Sidebar -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Enhanced Filters Sidebar with Collapse/Expand -->
      <div :class="`${isSidebarExpanded ? 'w-full md:w-52 lg:w-56' : 'w-14'} bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-lg relative transition-all duration-300 ease-in-out`">
        <div class="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-emerald-50/20"></div>

        <!-- Toggle Button -->
        <div 
          @click="toggleSidebar"
          class="absolute inset-0 flex items-center justify-center cursor-pointer group z-20"
          v-if="!isSidebarExpanded"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
            </svg>
          </div>
        </div>

        <div class="relative h-full flex flex-col">
          <!-- Expanded View -->
          <div v-if="isSidebarExpanded" class="h-full flex flex-col">
            <!-- Header with integrated close button -->
            <div class="flex justify-between items-center p-3 border-b border-green-100/50">
              <h2 class="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-1">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
                </svg>
                Filters
              </h2>
              <div class="flex gap-1">
                <button @click="resetFilters" class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
                <button @click="toggleSidebar" class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition flex items-center gap-1">
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
                  <input v-model="filters.search" type="text" class="block w-full pl-8 pr-2 py-1.5 border border-green-200 rounded-md text-xs bg-green-50/30 focus:ring-2 focus:ring-green-500/50" placeholder="Search..." />
                  <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg class="h-3 w-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Active Filters -->
              <div v-if="hasActiveFilters" class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-md p-2 border border-green-200">
                <div class="flex flex-wrap gap-1">
                  <span v-if="filters.search" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">
                    "{{ filters.search }}"
                  </span>
                  <span v-for="category in filters.categories" :key="category" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ category }}</span>
                  <span v-if="filters.urgency" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ filters.urgency }}</span>
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-7 7a2 2 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Categories
                  </h3>
                  <div class="space-y-1">
                    <label v-for="category in categories" :key="category" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                      <input 
                        type="checkbox" 
                        :value="category" 
                        v-model="filters.categories" 
                        class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
                      >
                      <span class="truncate">{{ category }}</span>
                    </label>
                  </div>
                </div>

                <!-- Urgency Filter -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Urgency
                  </h3>
                  <div class="space-y-1">
                    <label v-for="urgency in urgencyLevels" :key="urgency" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                      <input 
                        type="radio" 
                        :value="urgency" 
                        v-model="filters.urgency" 
                        class="h-3 w-3 text-green-600 rounded-full border-gray-300 focus:ring-green-500"
                      >
                      <span class="truncate">{{ urgency }}</span>
                    </label>
                  </div>
                </div>

                <!-- Forum Stats -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
              <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
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
              <select v-model="sortBy" class="px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most-answers">Most Answers</option>
                <option value="urgent">Urgency</option>
              </select>
            </div>
          </div>
        </div>

        <!-- SCROLLABLE Questions Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-3">
            <!-- Card View -->
            <div v-if="filteredQuestions.length > 0" class="space-y-4">
              <div v-for="question in sortedQuestions" :key="question.id" class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/40 transition-all duration-300 hover:shadow-2xl group">
                <!-- Question Header -->
                <div class="p-5">
                  <div class="flex justify-between items-start gap-4 mb-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-3 flex-wrap">
                        <span v-if="question.urgency === 'High' || question.urgency === 'Critical'" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          {{ question.urgency === 'Critical' ? 'Critical' : 'Urgent' }}
                        </span>
                        <span v-if="question.category" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200">
                          {{ question.category }}
                        </span>
                        <span v-if="question.isBookmarked" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          Saved
                        </span>
                        <span v-if="question.visibility === 'farmers'" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 border border-purple-200">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Farmers Only
                        </span>
                      </div>

                      <h3 class="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-green-700 transition-colors">{{ question.text }}</h3>

                      <div class="flex items-center text-xs text-gray-600 space-x-4 flex-wrap gap-2">
                        <div class="flex items-center">
                          <div class="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <p class="font-semibold text-gray-900">{{ question.userRole }}</p>
                            <p class="text-gray-600">{{ question.userEmail }}</p>
                          </div>
                        </div>
                        <div class="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span class="font-medium">{{ formatDate(question.createdAt) }}</span>
                        </div>
                        <div class="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span class="font-medium">{{ question.views || 0 }} views</span>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-2">
                      <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-3 py-2 rounded-lg">
                        <div class="flex items-center text-green-700">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          <span class="font-bold text-sm">{{ question.answers.length }}</span>
                        </div>
                      </div>
                      <button v-if="currentUser" @click="toggleBookmark(question)" class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300" :class="{
                        'bg-amber-100 text-amber-600 hover:bg-amber-200': question.isBookmarked,
                        'bg-gray-100 text-gray-500 hover:bg-gray-200': !question.isBookmarked
                      }" :aria-label="question.isBookmarked ? 'Remove bookmark' : 'Bookmark question'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :fill="question.isBookmarked ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Answers Section -->
                  <div class="space-y-3">
                    <div v-for="(answer, i) in question.answers.slice(0, 1)" :key="i" class="bg-gradient-to-r from-gray-50/80 to-gray-100/50 p-4 rounded-xl border border-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                      <p class="text-gray-800 font-medium leading-relaxed mb-3 text-sm whitespace-pre-line">{{ answer.text }}</p>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center text-xs text-gray-600">
                          <div class="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <span class="font-semibold">{{ answer.userRole }}</span>
                          <span class="mx-2">•</span>
                          <span>{{ answer.userEmail }}</span>
                        </div>
                        <div v-if="answer.userRole === 'Veterinarian' || answer.userRole === 'Poultry Specialist' || answer.userRole === 'Agribusiness Consultant'" class="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200 font-medium">
                          Expert
                        </div>
                      </div>
                    </div>

                    <!-- Answer Form -->
                    <div v-if="currentUser && canAnswer(question)" class="mt-4 p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl border border-green-200/50 backdrop-blur-sm">
                      <div class="flex items-center mb-3">
                        <div class="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <label class="text-sm font-semibold text-gray-900">Your Answer</label>
                      </div>
                      <textarea v-model="question.tempAnswer" placeholder="Share your answer..." class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm resize-none transition-all duration-300 text-sm" rows="3" />
                      <div class="mt-3 flex justify-end gap-2">
                        <button @click="question.tempAnswer = ''" class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm">
                          Cancel
                        </button>
                        <button @click="submitAnswer(question)" class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm" :disabled="!question.tempAnswer?.trim()">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Post Answer
                        </button>
                      </div>
                    </div>

                    <!-- Can't answer notice -->
                    <div v-else-if="currentUser && !canAnswer(question)" class="mt-4 p-3 bg-yellow-50/80 rounded-lg border border-yellow-200">
                      <div class="flex items-center text-yellow-800 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span class="font-medium">This question is restricted to farmers only.</span>
                      </div>
                    </div>

                    <!-- Not signed in notice -->
                    <div v-else-if="!currentUser" class="mt-4 p-3 bg-blue-50/80 rounded-lg border border-blue-200">
                      <div class="flex items-center justify-between text-blue-800 text-sm">
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span class="font-medium">Sign in to answer questions</span>
                        </div>
                        <router-link to="/signin" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors duration-200">
                          Sign In
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Empty State -->
            <div v-if="filteredQuestions.length === 0" class="flex flex-col items-center justify-center py-12">
              <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/60 max-w-md text-center shadow-xl">
                <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">No questions found</h3>
                <p class="text-xs text-gray-500 mb-4 leading-relaxed">We couldn't find any questions matching your current search criteria. Try adjusting your filters or ask a new question.</p>
                <button v-if="currentUser?.role === 'Farmer'" @click="showModal = true" class="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ask a Question
                </button>
                <button v-else @click="resetFilters" class="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
    <AskQuestionModal 
      v-if="showModal" 
      :visible="showModal" 
      @submit="handlePostQuestion" 
      @close="showModal = false" 
      :categories="categories"
    />

    <!-- Buyer Guide Modal -->
    <div v-if="showBuyerGuide" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white/95 backdrop-blur-xl rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40">
        <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white rounded-t-2xl sticky top-0 z-10">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">Buyer Guide</h3>
            <button @click="showBuyerGuide = false" class="text-white hover:text-blue-100 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Public Questions</h4>
                <p class="text-sm text-gray-600">As a buyer, you can view and answer all public questions marked as visible to "All" users.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Farmers-Only Questions</h4>
                <p class="text-sm text-gray-600">Questions marked as "Farmers Only" are visible to you but cannot be answered by buyers.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Building Relationships</h4>
                <p class="text-sm text-gray-600">Use the forum to connect with farmers, understand their challenges, and build trust for future business.</p>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <button @click="showBuyerGuide = false" class="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg">
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">Success!</h4>
            <div class="text-xs text-gray-700 font-medium">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded-md">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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
import { getCurrentUser } from '../../services/user';

interface ForumAnswer {
  text: string;
  userEmail: string;
  userRole: string;
}

interface ForumQuestion {
  id: number;
  text: string;
  description?: string;
  userEmail: string;
  userRole: string;
  createdAt: string;
  answers: ForumAnswer[];
  category?: string;
  urgency?: string;
  isBookmarked?: boolean;
  views?: number;
  tempAnswer?: string;
  visibility?: 'all' | 'farmers';
}

const router = useRouter();
const currentUser = getCurrentUser();
const showModal = ref(false);
const showBuyerGuide = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

const isSidebarExpanded = ref(true);
const sortBy = ref('newest');

const categories = ['Poultry', 'Swine', 'Cattle', 'Goat', 'Sheep', 'Feed', 'Health', 'Equipment'];
const urgencyLevels = ['Low', 'Normal', 'High', 'Critical'];

const filters = ref({
  search: '',
  categories: [] as string[],
  urgency: ''
});

const forumQuestions = ref<ForumQuestion[]>([
  {
    id: 1,
    text: 'What are the best practices for raising healthy chickens in tropical climate?',
    description: 'Looking for advice on feed, housing, and disease prevention for my new poultry farm in Batangas.',
    userEmail: 'farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: new Date().toISOString(),
    answers: [
      {
        text: 'For tropical climates, focus on ventilation, high-quality feed with proper nutrients, and strict biosecurity measures. Vaccinate against common diseases and control parasites regularly.',
        userEmail: 'poultry_expert@gmail.com',
        userRole: 'Poultry Specialist'
      }
    ],
    category: 'Poultry',
    urgency: 'Normal',
    views: 42
  },
  {
    id: 2,
    text: 'URGENT: My pigs are showing signs of fever and red skin. What could this be?',
    userEmail: 'pig_farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    answers: [],
    category: 'Swine',
    urgency: 'Critical',
    views: 18
  },
  {
    id: 3,
    text: 'Recommendations for cattle feed suppliers in Central Luzon?',
    description: 'Looking for organic and non-GMO options near Pampanga area.',
    userEmail: 'cattle_farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    answers: [
      {
        text: 'I recommend Green Pastures Organics in Tarlac. They offer certified organic feed at reasonable prices with delivery options.',
        userEmail: 'livestock_buyer@gmail.com',
        userRole: 'Buyer'
      }
    ],
    category: 'Cattle',
    urgency: 'Low',
    views: 31
  },
  {
    id: 4,
    text: 'Has anyone tried rotational grazing for goats?',
    description: 'I have 2 hectares and thinking of dividing it into sections. What are the benefits?',
    userEmail: 'goat_farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    answers: [
      {
        text: 'Rotational grazing is excellent for goats! Benefits include better pasture utilization, reduced parasite load, improved soil health, and higher carrying capacity.',
        userEmail: 'sustainable_farmer@gmail.com',
        userRole: 'Farmer'
      }
    ],
    category: 'Goat',
    urgency: 'Normal',
    views: 27
  }
]);

// Computed properties
const hasActiveFilters = computed(() => {
  return filters.value.search !== '' || 
    filters.value.categories.length > 0 || 
    filters.value.urgency !== '';
});

const filteredQuestions = computed(() => {
  return forumQuestions.value.filter(question => {
    // Search filter
    const searchLower = filters.value.search.toLowerCase();
    const matchesSearch = !filters.value.search ||
      question.text.toLowerCase().includes(searchLower) ||
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
      default:
        return 0;
    }
  });
});

const totalAnswers = computed(() => {
  return forumQuestions.value.reduce((total, question) => total + question.answers.length, 0);
});

const activeUsers = computed(() => {
  const emails = new Set(forumQuestions.value.map(q => q.userEmail));
  return emails.size;
});

// Methods
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

const handlePostQuestion = (question: ForumQuestion) => {
  if (!currentUser || currentUser.role !== 'Farmer') return;

  const newQuestion: ForumQuestion = {
    ...question,
    id: Date.now(),
    userEmail: currentUser.email,
    userRole: currentUser.role,
    createdAt: new Date().toISOString(),
    answers: [],
    views: 0,
    isBookmarked: false,
    visibility: question.visibility || 'all'
  };

  forumQuestions.value.unshift(newQuestion);
  showModal.value = false;
  showToastNotification('Your question has been posted successfully!');
};

const canAnswer = (q: ForumQuestion) => {
  if (!currentUser) return false;
  if (currentUser.role === 'Buyer' && q.visibility === 'farmers') return false;
  return true;
};

const submitAnswer = (q: ForumQuestion) => {
  if (!currentUser || !q.tempAnswer?.trim()) return;

  const answer: ForumAnswer = {
    text: q.tempAnswer.trim(),
    userEmail: currentUser.email,
    userRole: currentUser.role
  };

  q.answers.push(answer);
  q.tempAnswer = '';
  showToastNotification('Your answer has been posted!');
};

const toggleBookmark = (q: ForumQuestion) => {
  q.isBookmarked = !q.isBookmarked;
  const action = q.isBookmarked ? 'bookmarked' : 'removed from bookmarks';
  showToastNotification(`Question ${action}`);
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return date.toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
};

// Lifecycle hooks
onMounted(() => {
  // Initialize bookmarks
  forumQuestions.value.forEach(q => {
    q.isBookmarked = false;
    q.views = q.views || 0;
  });
});
</script>