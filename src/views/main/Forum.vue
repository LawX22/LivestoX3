<!-- Enhanced Forum.vue -->
<template>
  <div class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Enhanced Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
      <div class="absolute top-32 right-16 w-8 h-8 bg-emerald-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 2s"></div>
      <div class="absolute bottom-32 left-20 w-10 h-10 bg-green-200/30 rounded-full blur-sm animate-pulse" style="animation-delay: 1.5s"></div>
    </div>

    <!-- NavBar - Sticky -->
    <div class="sticky top-0 z-50">
      <NavBar />
    </div>

    <!-- Enhanced Header Section -->
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
      <!-- Enhanced Filters Sidebar -->
      <div class="w-full md:w-56 lg:w-64 xl:w-72 bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-lg relative">
        <div class="absolute inset-0 bg-gradient-to-b from-green-50/20 to-emerald-50/20"></div>

        <div class="relative p-4 h-full overflow-y-auto">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Filters & Stats
              </h2>
              <button @click="resetFilters" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors duration-200 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>

            <!-- Search Bar -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Search Questions</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input v-model="searchQuery" type="text" class="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg leading-4 bg-gray-50/70 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 text-xs" placeholder="Search questions, answers..." />
              </div>
            </div>

            <!-- Categories Filter -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Categories</label>
              <div class="space-y-2 max-h-32 overflow-y-auto">
                <div v-for="cat in categories" :key="cat" class="flex items-center">
                  <input type="checkbox" :id="`cat-${cat}`" :value="cat" v-model="selectedCategories" class="w-3 h-3 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 transition-all">
                  <label :for="`cat-${cat}`" class="ml-2 text-gray-700 cursor-pointer font-medium text-xs">{{ cat }}</label>
                </div>
              </div>
              <button @click="selectedCategories = []" class="mt-2 text-xs text-green-600 hover:text-green-800 font-medium transition-colors">Clear all</button>
            </div>

            <!-- Urgency Filter -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Urgency Level</label>
              <select v-model="selectedUrgency" class="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg bg-gray-50/70">
                <option value="all">All Levels</option>
                <option value="Low">🟢 Low</option>
                <option value="Normal">🟡 Normal</option>
                <option value="High">🔴 High</option>
                <option value="Highest">🚨 Critical</option>
              </select>
            </div>

            <!-- Active Filters Summary -->
            <div v-if="hasActiveFilters" class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
              <h3 class="text-xs font-semibold text-gray-700 mb-2">Active Filters</h3>
              <div class="flex flex-wrap gap-1">
                <span v-if="searchQuery" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  "{{ searchQuery }}"
                </span>
                <span v-for="category in selectedCategories" :key="category" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  {{ category }}
                </span>
                <span v-if="selectedUrgency !== 'all'" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  {{ selectedUrgency }}
                </span>
              </div>
            </div>

            <!-- Forum Stats -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <h3 class="text-xs font-semibold text-gray-700 mb-3">Forum Stats</h3>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 font-medium text-xs flex items-center gap-1">
                    <svg class="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    Questions
                  </span>
                  <span class="text-sm font-bold text-blue-600">{{ forumQuestions.length }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 font-medium text-xs flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 8l3.707-3.707a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Answers
                  </span>
                  <span class="text-sm font-bold text-green-600">{{ totalAnswers }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 font-medium text-xs flex items-center gap-1">
                    <svg class="w-3 h-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    Today
                  </span>
                  <span class="text-sm font-bold text-purple-600">{{ activeToday }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 font-medium text-xs flex items-center gap-1">
                    <svg class="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    Users
                  </span>
                  <span class="text-sm font-bold text-amber-600">{{ activeUsers }}</span>
                </div>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <h3 class="text-xs font-semibold text-gray-700 mb-2">Quick Links</h3>
              <div class="space-y-1">
                <router-link to="/forum-guidelines" class="flex items-center text-gray-700 hover:text-indigo-600 transition-colors font-medium text-xs py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Guidelines
                </router-link>
                <router-link to="/forum-faq" class="flex items-center text-gray-700 hover:text-indigo-600 transition-colors font-medium text-xs py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  FAQ
                </router-link>
                <router-link to="/forum-help" class="flex items-center text-gray-700 hover:text-indigo-600 transition-colors font-medium text-xs py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Help
                </router-link>
                <router-link v-if="currentUser?.role === 'Farmer'" to="/premium" class="flex items-center text-gray-700 hover:text-indigo-600 transition-colors font-medium text-xs py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Premium
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Sticky Results Summary -->
        <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-3">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a3 3 0 01-3-3v-1m8-6V9a3 3 0 00-3-3H4a3 3 0 00-3 3v6a3 3 0 003 3h2l4 4V18h5a3 3 0 003-3v-6a3 3 0 00-3-3z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-gray-800">
                  {{ filteredQuestions.length }} {{ filteredQuestions.length === 1 ? 'Question' : 'Questions' }} Found
                </h3>
                <p class="text-xs text-gray-600">
                  {{ totalAnswers }} total answers from the community
                </p>
              </div>
            </div>

            <!-- Sort By Filter -->
            <div class="flex items-center gap-2">
              <label class="text-sm font-semibold text-gray-700">Sort By:</label>
              <select v-model="sortBy" class="px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg bg-white shadow-sm">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-answers">Most Answers</option>
                <option value="urgent">Most Urgent</option>
                <option value="category">By Category</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Scrollable Questions Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-4">
            <!-- Empty State -->
            <div v-if="sortedQuestions.length === 0" class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/40 p-8">
              <div class="text-center">
                <div class="mx-auto w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">No questions found</h3>
                <p class="text-gray-600 mb-4 text-sm">Try adjusting your filters or ask the first question!</p>
                <button v-if="currentUser && currentUser.role === 'Farmer'" @click="showModal = true" class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm">
                  Ask a Question
                </button>
                <button v-else @click="resetFilters" class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm">
                  Reset Filters
                </button>
              </div>
            </div>

            <!-- Questions List -->
            <div v-else class="space-y-4">
              <div v-for="question in sortedQuestions" :key="question.id" class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/40 transition-all duration-300 hover:shadow-2xl group">
                <!-- Question Header -->
                <div class="p-5">
                  <div class="flex justify-between items-start gap-4 mb-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-3 flex-wrap">
                        <span v-if="question.urgency === 'High' || question.urgency === 'Highest'" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          {{ question.urgency === 'Highest' ? 'Critical' : 'Urgent' }}
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
                    <div v-for="(answer, i) in question.answers" :key="i" class="bg-gradient-to-r from-gray-50/80 to-gray-100/50 p-4 rounded-xl border border-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
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
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Modal -->
    <AskQuestionModal v-if="showModal" :visible="showModal" @submit="handlePostQuestion" @close="showModal = false" :categories="categories" />

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
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
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

    <!-- Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-green-200 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-sm font-semibold text-gray-900 mb-1">Success!</h4>
            <div class="text-sm text-gray-700">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import NavBar from '../../components/NavBar.vue'
import AskQuestionModal from '../../components/Forum/AskQuestionModal.vue'
import { getCurrentUser } from '../../services/user'

interface ForumAnswer {
  text: string
  userEmail: string
  userRole: string
}

interface ForumQuestion {
  id: number
  text: string
  userEmail: string
  userRole: string
  createdAt: string
  answers: ForumAnswer[]
  visibility: 'all' | 'farmers'
  category?: string
  urgency?: string
  tempAnswer?: string
  isBookmarked?: boolean
  views?: number
}

const LOCAL_KEY = 'livestox_forum_data'
const currentUser = getCurrentUser()
const forumQuestions = ref<ForumQuestion[]>([])
const showModal = ref(false)
const showBuyerGuide = ref(false)
const selectedCategories = ref<string[]>([])
const selectedUrgency = ref('all')
const searchQuery = ref('')
const sortBy = ref('newest')
const showToast = ref(false)
const toastMessage = ref('')

const categories = ['Poultry', 'Swine', 'Cattle', 'Goat', 'Sheep', 'Feed', 'Health', 'Equipment']

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategories.value.length > 0 || selectedUrgency.value !== 'all'
})

const totalAnswers = computed(() => {
  return forumQuestions.value.reduce((total, question) => total + question.answers.length, 0)
})

const activeToday = computed(() => {
  const today = new Date().toDateString()
  return forumQuestions.value.filter(q => new Date(q.createdAt).toDateString() === today).length
})

const activeUsers = computed(() => {
  const uniqueUsers = new Set(forumQuestions.value.map(q => q.userEmail))
  return uniqueUsers.size
})

const filteredQuestions = computed(() => {
  let questions = forumQuestions.value

  // Filter by visibility
  if (!currentUser) {
    questions = questions.filter(q => q.visibility === 'all')
  } else if (currentUser.role === 'Buyer') {
    questions = questions.filter(q => q.visibility === 'all')
  }

  // Filter by category
  if (selectedCategories.value.length > 0) {
    questions = questions.filter(q => q.category && selectedCategories.value.includes(q.category))
  }

  // Filter by urgency
  if (selectedUrgency.value !== 'all') {
    questions = questions.filter(q => q.urgency === selectedUrgency.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    questions = questions.filter(q =>
      q.text.toLowerCase().includes(query) ||
      q.answers.some(a => a.text.toLowerCase().includes(query))
    )
  }

  return questions
})

const sortedQuestions = computed(() => {
  const questions = [...filteredQuestions.value]
  
  switch (sortBy.value) {
    case 'newest':
      return questions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'oldest':
      return questions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    case 'most-answers':
      return questions.sort((a, b) => b.answers.length - a.answers.length)
    case 'urgent':
      const urgencyOrder = { 'Highest': 4, 'High': 3, 'Normal': 2, 'Low': 1 }
      return questions.sort((a, b) => (urgencyOrder[b.urgency as keyof typeof urgencyOrder] || 0) - (urgencyOrder[a.urgency as keyof typeof urgencyOrder] || 0))
    case 'category':
      return questions.sort((a, b) => (a.category || '').localeCompare(b.category || ''))
    default:
      return questions
  }
})

const defaultQuestions: ForumQuestion[] = [
  {
    id: 1,
    text: 'What are the best practices for raising healthy chickens in tropical climate? Looking for advice on feed, housing, and disease prevention.',
    userEmail: 'farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: '2024-01-15T10:30:00.000Z',
    answers: [
      {
        text: 'For tropical climates, focus on these key areas:\n\n1. Housing: Ensure proper ventilation with open-sided houses, elevated floors, and shade. Use materials that don\'t retain heat.\n\n2. Feed: Provide high-quality feed with proper nutrients. In hot weather, chickens eat less, so increase nutrient density. Add electrolytes to water during heat waves.\n\n3. Health: Implement strict biosecurity measures. Vaccinate against common diseases like Newcastle and Gumboro. Control parasites with regular deworming.\n\n4. Management: Provide cool, clean water at all times. Adjust feeding times to cooler parts of the day. Monitor for heat stress symptoms.',
        userEmail: 'poultry_expert@gmail.com',
        userRole: 'Poultry Specialist'
      },
      {
        text: 'I\'ve been raising chickens in Mindanao for 8 years. Here are my practical tips:\n- Use native breeds as they\'re more heat-tolerant\n- Plant trees around the coop for natural shade\n- Mix crushed garlic in their water weekly for natural parasite control\n- Use rice hulls as bedding - they\'re cheap and effective\n- Provide at least 1 square foot per bird to prevent crowding',
        userEmail: 'experienced_farmer@gmail.com',
        userRole: 'Farmer'
      },
      {
        text: 'Don\'t forget about marketing considerations. If you\'re raising for meat, the fast-growing breeds may not handle heat as well. For eggs, consider breeds like Rhode Island Reds that do well in heat while maintaining good production.',
        userEmail: 'agri_business@gmail.com',
        userRole: 'Agribusiness Consultant'
      }
    ],
    visibility: 'all',
    category: 'Poultry',
    urgency: 'Normal',
    isBookmarked: false,
    views: 124
  },
  {
    id: 2,
    text: 'URGENT: My pigs are showing signs of fever, red skin, and difficulty breathing. What could this be and how should I treat it? Located in Nueva Ecija.',
    userEmail: 'pig_farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: '2024-02-10T11:20:00.000Z',
    answers: [
      {
        text: 'These symptoms could indicate several serious conditions:\n\n1. African Swine Fever (ASF) - Highly fatal, no treatment\n2. Classical Swine Fever - Reportable disease\n3. PRRS (Porcine Reproductive and Respiratory Syndrome)\n\nImmediate actions:\n- Isolate sick animals immediately\n- Stop all movement of pigs on/off your farm\n- Contact your local veterinarian or the Bureau of Animal Industry hotline at 0920-949-1533\n- Disinfect all equipment and footwear\n\nDO NOT attempt to treat without proper diagnosis as you may spread disease. These symptoms require professional evaluation.',
        userEmail: 'swine_vet@gmail.com',
        userRole: 'Veterinarian'
      }
    ],
    visibility: 'farmers',
    category: 'Swine',
    urgency: 'Highest',
    isBookmarked: true,
    views: 87
  },
  {
    id: 3,
    text: 'Looking for recommendations for cattle feed suppliers in Central Luzon. Preferably organic and non-GMO options.',
    userEmail: 'cattle_farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: '2024-03-05T14:15:00.000Z',
    answers: [
      {
        text: 'I recommend these suppliers based on my 5 years of experience:\n\n1. Green Pastures Organics - Based in Tarlac, offers certified organic feed\n2. Central Luzon Feeds - Affordable non-GMO options with delivery\n3. FarmFresh Feeds - Specializes in customized feed blends\n\nAlways ask for lab analysis reports and visit the facility if possible.',
        userEmail: 'livestock_buyer@gmail.com',
        userRole: 'Buyer'
      }
    ],
    visibility: 'all',
    category: 'Cattle',
    urgency: 'Low',
    isBookmarked: false,
    views: 56
  },
  {
    id: 4,
    text: 'Has anyone tried rotational grazing for goats? I have 2 hectares and thinking of dividing it into sections. What are the benefits and challenges?',
    userEmail: 'goat_farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: '2024-03-08T09:45:00.000Z',
    answers: [
      {
        text: 'Rotational grazing is excellent for goats! Benefits:\n\n• Better pasture utilization and regrowth\n• Reduced parasite load (breaks lifecycle)\n• Improved soil health\n• Higher carrying capacity\n\nChallenges:\n• Initial setup cost for fencing\n• Daily management required\n• Water system for each paddock\n\nStart with 4-6 paddocks, rotate every 3-5 days. I\'ve increased my carrying capacity by 40% using this system.',
        userEmail: 'sustainable_farmer@gmail.com',
        userRole: 'Farmer'
      }
    ],
    visibility: 'all',
    category: 'Goat',
    urgency: 'Normal',
    isBookmarked: false,
    views: 42
  },
  {
    id: 5,
    text: 'What vaccines are essential for newborn calves in the Philippines? My veterinarian is not available and I need to create a vaccination schedule.',
    userEmail: 'new_cattle_farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: '2024-03-10T16:20:00.000Z',
    answers: [],
    visibility: 'farmers',
    category: 'Cattle',
    urgency: 'High',
    isBookmarked: false,
    views: 23
  }
]

onMounted(() => {
  const saved = localStorage.getItem(LOCAL_KEY)
  forumQuestions.value = saved ? JSON.parse(saved) : [...defaultQuestions]
})

watch(forumQuestions, (val) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(val))
}, { deep: true })

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedUrgency.value = 'all'
  sortBy.value = 'newest'
  showToastNotification('All filters have been reset')
}

const showToastNotification = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => showToast.value = false, 4000)
}

const handlePostQuestion = (question: ForumQuestion) => {
  if (!currentUser || currentUser.role !== 'Farmer') return

  const newQuestion: ForumQuestion = {
    ...question,
    id: Date.now(),
    userEmail: currentUser.email,
    userRole: currentUser.role,
    createdAt: new Date().toISOString(),
    answers: [],
    views: 0,
    isBookmarked: false
  }

  forumQuestions.value.unshift(newQuestion)
  showModal.value = false
  showToastNotification('Your question has been posted successfully!')
}

const canAnswer = (q: ForumQuestion) => {
  if (!currentUser) return false
  if (currentUser.role === 'Buyer' && q.visibility === 'farmers') return false
  return true
}

const submitAnswer = (q: ForumQuestion) => {
  if (!currentUser || !q.tempAnswer?.trim()) return

  const answer: ForumAnswer = {
    text: q.tempAnswer.trim(),
    userEmail: currentUser.email,
    userRole: currentUser.role
  }

  q.answers.push(answer)
  q.tempAnswer = ''
  showToastNotification('Your answer has been posted!')
}

const toggleBookmark = (q: ForumQuestion) => {
  q.isBookmarked = !q.isBookmarked
  const action = q.isBookmarked ? 'bookmarked' : 'removed from bookmarks'
  showToastNotification(`Question ${action}`)
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`
  } else {
    return date.toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}
</script>