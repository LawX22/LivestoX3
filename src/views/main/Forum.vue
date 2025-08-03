<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
    <!-- Sticky NavBar -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <NavBar />
    </div>

    <!-- Main content container with padding for navbar -->
    <div class="pt-16 relative">
      <!-- Floating Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-12 h-12 bg-green-300 rounded-full opacity-20 animate-bounce"></div>
        <div class="absolute top-32 right-16 w-8 h-8 bg-emerald-300 rounded-full opacity-30 animate-pulse"></div>
        <div class="absolute bottom-24 left-24 w-16 h-16 bg-teal-300 rounded-full opacity-15 animate-ping"></div>
        <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400 rounded-full opacity-25 animate-bounce"
          style="animation-delay: 1s"></div>
      </div>

      <!-- Compact Header Section -->
      <div class="sticky top-16 z-40 bg-green-500/95 backdrop-blur-xl border-b-2 border-green-600">
        <!-- Header Content -->
        <div class="px-6 py-6">
          <div class="flex justify-between items-center">
            <!-- Left side - Logo and title inline -->
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a3 3 0 01-3-3v-1m8-6V9a3 3 0 00-3-3H4a3 3 0 00-3 3v6a3 3 0 003 3h2l4 4V18h5a3 3 0 003-3v-6a3 3 0 00-3-3z" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-white">Livestock Forum</h1>
                <p class="text-base text-green-100 font-medium">Connect with farmers & experts</p>
              </div>
            </div>

            <!-- Center decorative elements -->
            <div class="hidden md:flex items-center gap-4">
              <div class="w-4 h-4 bg-white/60 rounded-full"></div>
              <div class="w-3 h-3 bg-white/40 rounded-full"></div>
              <div class="w-5 h-5 bg-white/50 rounded-full"></div>
            </div>

            <!-- Right side - Ask Question Button -->
            <div v-if="currentUser && currentUser.role === 'Farmer'">
              <button @click="showModal = true"
                class="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 flex items-center gap-3 border border-green-600"
                aria-label="Ask a question">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
                Ask Question
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto p-4 pt-6 relative z-10">
        <!-- Guest Notice -->
        <div v-if="!currentUser"
          class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-amber-200/50 mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-amber-400 to-orange-400 p-0.5">
            <div class="bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <div class="flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-start">
                  <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">Welcome, Guest!</h3>
                    <p class="text-sm text-gray-600">Sign in to ask questions and join discussions.</p>
                  </div>
                </div>
                <router-link to="/signin"
                  class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  Sign In
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Role Notice for Buyers -->
        <div v-if="currentUser && currentUser.role === 'Buyer'"
          class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-blue-200/50 mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-400 to-cyan-400 p-0.5">
            <div class="bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <div class="flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-start">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">Welcome, Buyer!</h3>
                    <p class="text-sm text-gray-600">As a buyer, you can view and answer public questions.</p>
                  </div>
                </div>
                <button @click="showBuyerGuide = true"
                  class="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd" />
                  </svg>
                  Buyer Guide
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid Layout with Sidebar on Right -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Questions List - Takes 3/4 of space -->
          <div class="lg:col-span-3 order-2 lg:order-1">
            <!-- Empty State -->
            <div v-if="filteredQuestions.length === 0"
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/40 p-8">
              <div class="text-center">
                <div
                  class="mx-auto w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">No questions found</h3>
                <p class="text-gray-600 mb-4 text-sm">Try adjusting your filters or ask the first question!</p>
                <button v-if="currentUser && currentUser.role === 'Farmer'" @click="showModal = true"
                  class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
                  aria-label="Ask a question">
                  Ask a Question
                </button>
              </div>
            </div>

            <!-- Compact Questions List -->
            <div v-else class="space-y-4">
              <div v-for="question in filteredQuestions" :key="question.id"
                class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/40 transition-all duration-300 hover:shadow-2xl group">
                <!-- Compact Question Header -->
                <div class="p-5">
                  <div class="flex justify-between items-start gap-4 mb-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-3">
                        <span v-if="question.urgency === 'High' || question.urgency === 'Highest'"
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          {{ question.urgency === 'Highest' ? 'Critical' : 'Urgent' }}
                        </span>
                        <span v-if="question.category"
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200">
                          {{ question.category }}
                        </span>
                        <span v-if="question.isBookmarked"
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          Saved
                        </span>
                        <span v-if="question.visibility === 'farmers'"
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 border border-purple-200">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Farmers Only
                        </span>
                      </div>

                      <h3 class="text-lg font-bold text-gray-900 mb-3 leading-tight">{{ question.text }}</h3>

                      <div class="flex items-center text-xs text-gray-600 space-x-4">
                        <div class="flex items-center">
                          <div
                            class="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <p class="font-semibold text-gray-900">{{ question.userRole }}</p>
                            <p class="text-gray-600">{{ question.userEmail }}</p>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {{ formatDate(question.createdAt) }}
                        </div>
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {{ question.views }} views
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-2">
                      <div
                        class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-3 py-1.5 rounded-lg">
                        <div class="flex items-center text-green-700">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          <span class="font-bold text-sm">{{ question.answers.length }}</span>
                        </div>
                      </div>
                      <button v-if="currentUser" @click="toggleBookmark(question)"
                        class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300" :class="{
                          'bg-amber-100 text-amber-600 hover:bg-amber-200': question.isBookmarked,
                          'bg-gray-100 text-gray-500 hover:bg-gray-200': !question.isBookmarked
                        }" :aria-label="question.isBookmarked ? 'Remove bookmark' : 'Bookmark question'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Compact Answers Section -->
                  <div class="space-y-3">
                    <div v-for="(answer, i) in question.answers" :key="i"
                      class="bg-gradient-to-r from-gray-50 to-gray-100/50 p-4 rounded-xl border border-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                      <p class="text-gray-800 font-medium leading-relaxed mb-3 text-sm whitespace-pre-line">{{
                        answer.text }}</p>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center text-xs text-gray-600">
                          <div
                            class="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 text-white" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <span class="font-semibold">{{ answer.userRole }}</span>
                          <span class="mx-2">•</span>
                          <span>{{ answer.userEmail }}</span>
                        </div>
                        <div v-if="answer.userRole !== 'Farmer'"
                          class="text-xs text-gray-500 bg-white/50 px-2 py-0.5 rounded">
                          Expert
                        </div>
                      </div>
                    </div>

                    <!-- Compact Answer Form -->
                    <div v-if="currentUser && canAnswer(question)"
                      class="mt-4 p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl border border-green-200/50 backdrop-blur-sm">
                      <div class="flex items-center mb-3">
                        <div
                          class="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <label for="answer" class="text-sm font-semibold text-gray-900">Your Answer</label>
                      </div>
                      <textarea v-model="question.tempAnswer" id="answer" placeholder="Share your answer..."
                        class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm resize-none transition-all duration-300 text-sm"
                        rows="3" />
                      <div class="mt-3 flex justify-end gap-2">
                        <button @click="question.tempAnswer = ''"
                          class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm">
                          Cancel
                        </button>
                        <button @click="submitAnswer(question)"
                          class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                          :disabled="!question.tempAnswer?.trim()">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Compact Sidebar - Takes 1/4 of space -->
          <div class="lg:col-span-1 space-y-4 order-1 lg:order-2">
            <!-- Search Box -->
            <div class="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
              <div class="p-4">
                <div class="relative">
                  <input type="text" v-model="searchQuery" placeholder="Search questions..."
                    class="w-full pl-8 pr-3 py-2 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-medium text-sm"
                    aria-label="Search questions">
                  <div class="absolute left-2.5 top-2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Compact Categories Filter -->
            <div class="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-3 text-white">
                <h3 class="font-bold text-sm">Categories</h3>
              </div>
              <div class="p-3">
                <div class="space-y-2">
                  <div v-for="cat in categories" :key="cat" class="flex items-center">
                    <input type="checkbox" :id="`cat-${cat}`" :value="cat" v-model="selectedCategories"
                      class="w-3 h-3 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 transition-all">
                    <label :for="`cat-${cat}`" class="ml-2 text-gray-700 cursor-pointer font-medium text-sm">
                      {{ cat }}
                    </label>
                  </div>
                </div>
                <button @click="selectedCategories = []"
                  class="mt-2 text-xs text-green-600 hover:text-green-800 font-medium transition-colors">
                  Clear all
                </button>
              </div>
            </div>

            <!-- Compact Urgency Filter -->
            <div class="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
              <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-3 text-white">
                <h3 class="font-bold text-sm">Urgency Level</h3>
              </div>
              <div class="p-3">
                <select v-model="selectedUrgency"
                  class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-medium text-sm"
                  aria-label="Filter by urgency level">
                  <option value="all">All Levels</option>
                  <option value="Low">🟢 Low</option>
                  <option value="Normal">🟡 Normal</option>
                  <option value="High">🔴 High</option>
                  <option value="Highest">🚨 Critical</option>
                </select>
              </div>
            </div>

            <!-- Compact Forum Stats -->
            <div class="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
              <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 text-white">
                <h3 class="font-bold text-sm">Forum Stats</h3>
              </div>
              <div class="p-3 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 font-medium text-xs">Questions</span>
                  <span class="text-lg font-bold text-blue-600">{{ forumQuestions.length }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 font-medium text-xs">Answers</span>
                  <span class="text-lg font-bold text-green-600">{{ totalAnswers }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 font-medium text-xs">Today</span>
                  <span class="text-lg font-bold text-purple-600">{{ activeToday }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 font-medium text-xs">Users</span>
                  <span class="text-lg font-bold text-amber-600">{{ activeUsers }}</span>
                </div>
              </div>
            </div>

            <!-- Compact Quick Links -->
            <div class="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
              <div class="bg-gradient-to-r from-indigo-600 to-violet-600 p-3 text-white">
                <h3 class="font-bold text-sm">Quick Links</h3>
              </div>
              <div class="p-3 space-y-2">
                <router-link to="/forum-guidelines"
                  class="flex items-center text-gray-700 hover:text-indigo-600 transition-colors font-medium text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-indigo-500" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Guidelines
                </router-link>
                <router-link to="/forum-faq"
                  class="flex items-center text-gray-700 hover:text-indigo-600 transition-colors font-medium text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-indigo-500" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  FAQ
                </router-link>
                <router-link to="/forum-help"
                  class="flex items-center text-gray-700 hover:text-indigo-600 transition-colors font-medium text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-indigo-500" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Help
                </router-link>
                <router-link v-if="currentUser?.role === 'Farmer'" to="/premium"
                  class="flex items-center text-gray-700 hover:text-indigo-600 transition-colors font-medium text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-indigo-500" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Premium
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Modal -->
    <AskQuestionModal :visible="showModal" @submit="handlePostQuestion" @close="showModal = false"
      :categories="categories" />

    <!-- Buyer Guide Modal -->
    <div v-if="showBuyerGuide" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white rounded-t-xl sticky top-0 z-10">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">Buyer Guide</h3>
            <button @click="showBuyerGuide = false" class="text-white hover:text-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
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
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Farmers-Only Questions</h4>
                <p class="text-sm text-gray-600">Questions marked as "Farmers Only" are visible to you but cannot be
                  answered by buyers.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clip-rule="evenodd" />
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
              class="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
              Got it!
            </button>
          </div>
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

const categories = ['Poultry', 'Swine', 'Cattle', 'Goat', 'Sheep', 'Feed', 'Health', 'Equipment']

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
  }
]

onMounted(() => {
  const saved = localStorage.getItem(LOCAL_KEY)
  forumQuestions.value = saved ? JSON.parse(saved) : [...defaultQuestions]
})

watch(forumQuestions, (val) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(val))
}, { deep: true })

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

  return questions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

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
}

const toggleBookmark = (q: ForumQuestion) => {
  q.isBookmarked = !q.isBookmarked
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>