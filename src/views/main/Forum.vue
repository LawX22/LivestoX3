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
          <div v-if="!authStore.isAuthenticated" class="flex items-center gap-3 max-w-full">
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
          <div v-else-if="authStore.userRole === 'buyer'" class="flex items-center gap-3 max-w-full">
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
          <div v-else-if="authStore.userRole === 'farmer'" class="flex items-center gap-3 max-w-full">
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

    <!-- Main Content with Sidebar -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Enhanced Filters Sidebar Component -->
      <FilterSidebar
        :is-expanded="isSidebarExpanded"
        :filters="filters"
        :categories="categories"
        :urgency-levels="urgencyLevels"
        :forum-stats="forumStats"
        @update:is-expanded="handleSidebarToggle"
        @update:filters="handleFiltersUpdate"
        @reset-filters="resetFilters"
      />

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
                  {{ isLoadingQuestions ? 'Loading...' : `${filteredQuestions.length} ${filteredQuestions.length === 1 ? 'Question' : 'Questions'} Found` }}
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
            <!-- Loading Skeleton Cards -->
            <div v-if="isLoadingQuestions" class="space-y-4">
              <div
                v-for="n in 5"
                :key="`skeleton-${n}`"
                class="bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 p-4 shadow-lg animate-pulse"
              >
                <!-- Header Section Skeleton -->
                <div class="flex items-start gap-3 mb-4">
                  <!-- Avatar Skeleton -->
                  <div class="w-10 h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-full relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  
                  <!-- User Info Skeleton -->
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-1/3 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-1/4 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>
                  
                  <!-- Urgency Badge Skeleton -->
                  <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>

                <!-- Content Section Skeleton -->
                <div class="space-y-3">
                  <!-- Title Skeleton -->
                  <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-3/4 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  
                  <!-- Description Skeleton -->
                  <div class="space-y-2">
                    <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-full relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-5/6 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-4/6 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>

                  <!-- Tags/Category Skeleton -->
                  <div class="flex flex-wrap gap-2 pt-2">
                    <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>

                  <!-- Stats and Actions Skeleton -->
                  <div class="flex items-center justify-between pt-4">
                    <!-- Stats Skeleton -->
                    <div class="flex items-center gap-4">
                      <div class="flex items-center gap-1">
                        <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-8 relative overflow-hidden">
                          <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        </div>
                      </div>
                      <div class="flex items-center gap-1">
                        <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-8 relative overflow-hidden">
                          <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        </div>
                      </div>
                      <div class="flex items-center gap-1">
                        <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-8 relative overflow-hidden">
                          <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons Skeleton -->
                    <div class="flex items-center gap-2">
                      <div class="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-20 relative overflow-hidden">
                        <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      </div>
                      <div class="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-8 relative overflow-hidden">
                        <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actual Forum Cards -->
            <div v-else-if="filteredQuestions.length > 0" class="space-y-4">
              <ForumCard 
                v-for="question in sortedQuestions" 
                :key="`question-${question.id}`" 
                :question="question"
                :currentUser="currentUserForForum"
                @upvote="upvoteQuestion"
                @downvote="downvoteQuestion" 
                @openComments="openCommentsModal"
                @editQuestion="handleEditQuestion"
                @deleteQuestion="handleDeleteQuestion"
                @showToast="showToastNotification"
              />
            </div>

            <!-- Enhanced Empty State -->
            <div v-else-if="!isLoadingQuestions && filteredQuestions.length === 0" class="flex flex-col items-center justify-center py-16">
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
                <button v-if="authStore.isAuthenticated" @click="showModal = true"
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
    <AskQuestionModal 
      v-if="showModal" 
      :visible="showModal" 
      :currentUser="currentUserForForum"
      @submit="handlePostQuestion" 
      @close="showModal = false"
      @showToast="showToastNotification"
    />

    <!-- Comments Modal -->
    <CommentsModal 
      v-if="showCommentsModal" 
      :visible="showCommentsModal" 
      :question="selectedQuestion!"
      :currentUser="currentUserForForum" 
      @close="showCommentsModal = false" 
      @updateQuestion="handleUpdateQuestion"
      @signin="handleSignin" 
      @showToast="showToastNotification" 
    />

    <!-- Guide Modals -->
    <GuideModal 
      :visible="showBuyerGuide"
      type="buyer"
      @close="showBuyerGuide = false"
    />
    
    <GuideModal 
      :visible="showFarmerGuide"
      type="farmer"
      @close="showFarmerGuide = false"
    />
    
    <GuideModal 
      :visible="showGuestGuide"
      type="guest"
      @close="showGuestGuide = false"
    />

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
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import NavBar from '../../components/NavBar.vue';
import AskQuestionModal from '../../components/Forum/AskQuestionModal.vue';
import CommentsModal from '../../components/Forum/CommentsModal.vue';
import ForumCard from '../../components/Forum/ForumCard.vue';
import FilterSidebar from '../../components/Forum/FilterSidebar.vue'; 
import GuideModal from '../../components/Forum/GuideModal.vue';
import { forumService } from '../../services/forumService';
import type { ForumQuestion, ForumAnswer, NewQuestion } from '../../services/forumService';

// Extended interfaces to include userEmail for compatibility
interface ExtendedForumAnswer extends ForumAnswer {
  userEmail?: string;
}

interface ExtendedForumQuestion extends ForumQuestion {
  userEmail?: string;
  answers: ExtendedForumAnswer[];
}

// Router and store setup
const router = useRouter();
const authStore = useAuthStore();

// State
const showModal = ref(false);
const showBuyerGuide = ref(false);
const showFarmerGuide = ref(false);
const showGuestGuide = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const showCommentsModal = ref(false);
const selectedQuestion = ref<ExtendedForumQuestion | null>(null);
const isSidebarExpanded = ref(true);
const sortBy = ref('newest');

// Loading state for skeleton
const isLoadingQuestions = ref(true);

const categories = ['Poultry', 'Swine', 'Cattle', 'Goat', 'Sheep', 'Feed', 'Health', 'Equipment'];
const urgencyLevels = ['Low', 'Normal', 'High', 'Critical'];

const filters = ref({
  search: '',
  categories: [] as string[],
  urgency: ''
});

// Forum questions from Supabase
const forumQuestions = ref<ExtendedForumQuestion[]>([]);

// Prevent duplicate submissions with more robust tracking
const isSubmittingQuestion = ref(false);
const lastSubmittedQuestionId = ref<number | null>(null);

// Computed property for forum stats
const forumStats = computed(() => ({
  totalQuestions: forumQuestions.value.length,
  totalAnswers: totalAnswers.value,
  activeUsers: activeUsers.value
}));

// Computed property to convert authStore user to legacy format for compatibility
const currentUserForForum = computed(() => {
  if (!authStore.isAuthenticated || !authStore.user) return null;
  
  return {
    id: authStore.user.id,
    email: authStore.user.email || '',
    role: authStore.userRole,
    firstName: authStore.userMetadata?.firstname || '', 
    lastName: authStore.userMetadata?.lastname || '',  
    fullName: authStore.userDisplayName
  };
});

// Convert userId-based questions to userEmail-based for compatibility
function convertToExtendedQuestions(questions: ForumQuestion[]): ExtendedForumQuestion[] {
  return questions.map(q => {
    // Create a mapping from userId to userEmail using the user data we have
    const questionUserEmail = q.userId; // We'll use userId as email identifier
    
    return {
      ...q,
      userEmail: questionUserEmail,
      answers: q.answers.map(a => ({
        ...a,
        userEmail: a.userId, // Use userId as email identifier for answers too
        id: a.id
      }))
    } as ExtendedForumQuestion;
  });
}

// Computed properties
const filteredQuestions = computed(() => {
  return forumQuestions.value.filter(question => {
    // Visibility filter based on user role
    if (question.visibility === 'farmers' && (!authStore.isAuthenticated || authStore.userRole !== 'farmer')) {
      return false;
    }

    // Search filter
    const searchLower = filters.value.search.toLowerCase();
    const matchesSearch = !filters.value.search ||
      question.title.toLowerCase().includes(searchLower) ||
      (question.description && question.description.toLowerCase().includes(searchLower)) ||
      question.answers.some(answer => answer.text?.toLowerCase().includes(searchLower));

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

// Active users: count unique user IDs from questions and answers
const activeUsers = computed(() => {
  const userSet = new Set<string>();
  forumQuestions.value.forEach(q => {
    if (q.userId) userSet.add(q.userId);
    q.answers.forEach(a => {
      if (a.userId) userSet.add(a.userId);
    });
  });
  return userSet.size;
});

const loadQuestions = async () => {
  try {
    isLoadingQuestions.value = true;
    
    // Add minimum loading time for better UX (1 second)
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));
    
    // Use userId instead of email for the new service
    const userId = authStore.user?.id;
    const questions = await forumService.getQuestions(userId);
    
    // Wait for minimum loading time
    await minLoadingTime;
    
    // Convert to extended format with userEmail for compatibility
    forumQuestions.value = convertToExtendedQuestions(questions);
  } catch (error) {
    console.error('Failed to load questions:', error);
    showToastNotification('Failed to load questions. Please try again.');
  } finally {
    isLoadingQuestions.value = false;
  }
};

// FilterSidebar event handlers
const handleSidebarToggle = (expanded: boolean) => {
  isSidebarExpanded.value = expanded;
};

const handleFiltersUpdate = (updatedFilters: typeof filters.value) => {
  filters.value = { ...updatedFilters };
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

const openCommentsModal = async (question: ExtendedForumQuestion) => {
  selectedQuestion.value = question;
  showCommentsModal.value = true;
  
  // Increment view count in database
  try {
    const newViews = await forumService.incrementViews(question.id);
    // Update local state
    const index = forumQuestions.value.findIndex(q => q.id === question.id);
    if (index !== -1) {
      forumQuestions.value[index].views = newViews;
    }
  } catch (error) {
    console.error('Failed to increment views:', error);
  }
};

const handleUpdateQuestion = (updatedQuestion: ForumQuestion) => {
  const extendedQuestion = convertToExtendedQuestions([updatedQuestion])[0];
  const index = forumQuestions.value.findIndex(q => q.id === extendedQuestion.id);
  if (index !== -1) {
    forumQuestions.value[index] = extendedQuestion;
    selectedQuestion.value = extendedQuestion;
  }
};

const handleSignin = () => {
  router.push('/signin');
};

// FIXED: Completely rewritten to prevent duplicates
const handlePostQuestion = async (questionData: NewQuestion) => {
  // Prevent multiple simultaneous submissions
  if (!authStore.isAuthenticated || isSubmittingQuestion.value) {
    console.log('Blocked: Not authenticated or already submitting');
    return;
  }

  try {
    isSubmittingQuestion.value = true;
    console.log('Starting question submission...');

    // The question creation is handled entirely by the AskQuestionModal
    // We just need to add it to our local state and refresh from server
    console.log('Question submitted successfully, refreshing questions...');

    // Wait a moment for the database to be updated
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Reload all questions from the server to ensure consistency
    await loadQuestions();

    showModal.value = false;
    showToastNotification('Your question has been posted successfully!');
    
  } catch (error) {
    console.error('Failed to handle posted question:', error);
    showToastNotification('Failed to post question. Please try again.');
  } finally {
    isSubmittingQuestion.value = false;
  }
};

const upvoteQuestion = async (question: ExtendedForumQuestion) => {
  if (!authStore.isAuthenticated || !authStore.user?.id) return;
  
  // Don't allow voting on own questions
  if (question.userId === authStore.user.id) return;

  try {
    const result = await forumService.voteQuestion(question.id, authStore.user.id, 'up');
    
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
        forumQuestions.value[index].userVotes![authStore.user.id] = result.userVote;
      } else {
        delete forumQuestions.value[index].userVotes![authStore.user.id];
      }
    }
  } catch (error) {
    console.error('Failed to vote:', error);
    showToastNotification('Failed to vote. Please try again.');
  }
};

const downvoteQuestion = async (question: ExtendedForumQuestion) => {
  if (!authStore.isAuthenticated || !authStore.user?.id) return;
  
  // Don't allow voting on own questions
  if (question.userId === authStore.user.id) return;

  try {
    const result = await forumService.voteQuestion(question.id, authStore.user.id, 'down');
    
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
        forumQuestions.value[index].userVotes![authStore.user.id] = result.userVote;
      } else {
        delete forumQuestions.value[index].userVotes![authStore.user.id];
      }
    }
  } catch (error) {
    console.error('Failed to vote:', error);
    showToastNotification('Failed to vote. Please try again.');
  }
};

// Handler methods for edit and delete with proper database operations
const handleEditQuestion = async (eventData: { questionId: number; updates: Partial<ForumQuestion> }) => {
  if (!authStore.isAuthenticated || !authStore.user?.id) return;
  
  try {
    const { questionId, updates } = eventData;
    
    // First, check if user owns this question
    const question = forumQuestions.value.find(q => q.id === questionId);
    if (!question || question.userId !== authStore.user.id) {
      showToastNotification('You can only edit your own questions.');
      return;
    }

    // Update question in database using the service method
    const updatedQuestion = await forumService.updateQuestion(questionId, {
      title: updates.title,
      description: updates.description,
      category: updates.category,
      urgency: updates.urgency,
      visibility: updates.visibility
    });
    
    // Update local state
    const index = forumQuestions.value.findIndex(q => q.id === questionId);
    if (index !== -1) {
      // Merge the updates with the existing question while preserving all other properties
      forumQuestions.value[index] = {
        ...forumQuestions.value[index],
        ...updatedQuestion,
        // Preserve arrays and complex objects
        answers: forumQuestions.value[index].answers,
        userVotes: forumQuestions.value[index].userVotes
      };
      
      // Update selected question if it's the one being edited
      if (selectedQuestion.value && selectedQuestion.value.id === questionId) {
        selectedQuestion.value = { ...forumQuestions.value[index] };
      }
    }
    
    showToastNotification('Question updated successfully!');
  } catch (error) {
    console.error('Failed to edit question:', error);
    showToastNotification('Failed to update question. Please try again.');
  }
};

const handleDeleteQuestion = async (questionId: number) => {
  if (!authStore.isAuthenticated || !authStore.user?.id) return;
  
  try {
    // First, check if user owns this question
    const question = forumQuestions.value.find(q => q.id === questionId);
    if (!question || question.userId !== authStore.user.id) {
      showToastNotification('You can only delete your own questions.');
      return;
    }

    // Delete question from database using the service method
    await forumService.deleteQuestion(questionId);
    
    // Remove from local state
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
    console.error('Failed to delete question:', error);
    showToastNotification('Failed to delete question. Please try again.');
  }
};

// Watch for modal close to reset submission state
watch(showModal, (newVal) => {
  if (!newVal) {
    // Reset submission state with a small delay
    nextTick(() => {
      isSubmittingQuestion.value = false;
      lastSubmittedQuestionId.value = null;
    });
  }
});

// Lifecycle hooks
onMounted(async () => {
  // Get current session first if not already loaded
  if (!authStore.session) {
    await authStore.getSession();
  }
  
  // Load questions
  await loadQuestions();
});
</script>