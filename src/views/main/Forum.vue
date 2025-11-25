<!-- Forum.vue - OPTIMIZED WITH TAB VISIBILITY DETECTION -->
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

    <!-- DYNAMIC HEADER - MATCHING MARKETPLACE STYLE -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div
        class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
        <!-- Left side - Logo and Title -->
        <div class="flex items-center min-w-0">
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg cursor-pointer" @click="scrollToTop">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a3 3 0 01-3-3v-1m8-6V9a3 3 0 00-3-3H4a3 3 0 00-3 3v6a3 3 0 003 3h2l4 4V18h5a3 3 0 003-3v-6a3 3 0 00-3-3z" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-bold text-white truncate cursor-default">Livestock Forum</h1>
            <p class="text-green-100 text-sm opacity-90 truncate cursor-default">{{ headerSubtitle }}</p>
          </div>
        </div>

        <!-- Right side - Dynamic Content Area -->
        <div class="flex-1 flex justify-end min-w-0">
          <!-- Guest Mode -->
          <div v-if="!isAuthenticated" class="flex items-center gap-3 max-w-full">
            <div
              class="bg-yellow-100/80 text-yellow-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-yellow-200 shadow-md cursor-default">
              <svg class="w-4 h-4 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd" />
              </svg>
              <span class="text-sm font-semibold truncate ml-2">Guest mode - Sign In for full access</span>
              <button @click="navigateToLogin"
                class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
                Sign In
              </button>
            </div>

            <!-- Separate Guide Button -->
            <button @click="showGuestGuide = true"
              class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd" />
              </svg>
              Guide
            </button>
          </div>

          <!-- Authenticated User Actions -->
          <div v-else class="flex items-center gap-3 max-w-full">
            <!-- Farmer View -->
            <div v-if="isFarmerView" class="bg-blue-100/80 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-blue-200 shadow-md cursor-default">
              <svg class="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span class="text-sm font-semibold truncate ml-2">Welcome Farmer - Share your expertise</span>
              <button @click="showModal = true"
                class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
                Ask Question
              </button>
            </div>

            <!-- Buyer View -->
            <div v-else class="bg-red-100/80 text-red-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-red-200 shadow-md cursor-default">
              <svg class="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span class="text-sm font-semibold truncate ml-2">Welcome - Connect with farmers & experts</span>
              <button @click="showModal = true"
                class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
                Ask Question
              </button>
            </div>

            <!-- Guide Button for Authenticated Users -->
            <button @click="showUserGuide = true"
              class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
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
                class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center cursor-default">
                <svg class="w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-800 cursor-default">
                  {{ isLoadingQuestions ? 'Loading...' : `${filteredQuestions.length} ${filteredQuestions.length === 1 ? 'Question' : 'Questions'} Found` }}
                </h3>
              </div>
            </div>

            <!-- Sort By Filter -->
            <div class="flex items-center gap-2">
              <label class="text-xs font-semibold text-gray-700 cursor-default">Sort By:</label>
              <select v-model="sortBy"
                class="cursor-pointer px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most-answers">Most Answers</option>
                <option value="urgent">Urgency</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Loading State with Skeleton -->
        <div v-if="isLoadingQuestions" class="flex-1 overflow-y-auto">
          <div class="p-3">
            <div class="space-y-4">
              <!-- Skeleton Cards -->
              <div
                v-for="n in 6"
                :key="`skeleton-${n}`"
                class="bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 p-5 shadow-lg animate-pulse cursor-default"
              >
                <!-- Header Section -->
                <div class="flex items-start justify-between mb-4">
                  <!-- User Info -->
                  <div class="flex items-center gap-3 flex-1">
                    <!-- Avatar -->
                    <div class="w-10 h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-full relative overflow-hidden shrink-0">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    
                    <div class="flex-1 space-y-2">
                      <!-- Name -->
                      <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-32 relative overflow-hidden">
                        <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      </div>
                      <!-- Date -->
                      <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-24 relative overflow-hidden">
                        <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Category Badge -->
                  <div class="h-6 w-20 bg-gradient-to-r from-green-200 to-green-300 rounded-full relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>

                <!-- Title -->
                <div class="space-y-2 mb-3">
                  <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-full relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-3/4 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>

                <!-- Description -->
                <div class="space-y-2 mb-4">
                  <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-full relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-5/6 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-2/3 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>

                <!-- Footer Stats -->
                <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div class="flex items-center gap-4">
                    <!-- Stats -->
                    <div class="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>

                  <!-- Urgency Badge -->
                  <div class="h-6 w-16 bg-gradient-to-r from-red-200 to-red-300 rounded-full relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SCROLLABLE Questions Area -->
        <div v-else class="flex-1 overflow-y-auto">
          <div class="p-3">
            <!-- Actual Forum Cards -->
            <div v-if="filteredQuestions.length > 0" class="space-y-4">
              <ForumCard 
                v-for="question in sortedQuestions" 
                :key="`question-${question.id}`" 
                :question="question"
                @openComments="openCommentsModal"
                @showToast="showToastNotification"
                @questionUpdated="handleQuestionUpdated"
                @questionDeleted="handleQuestionDeleted"
              />
            </div>

            <!-- Enhanced Empty State -->
            <div v-else class="flex flex-col items-center justify-center py-16">
              <div
                class="bg-gradient-to-br from-white/95 to-gray-50/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/80 max-w-md text-center shadow-2xl cursor-default">
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
                <button v-if="isAuthenticated" @click="showModal = true"
                  class="cursor-pointer px-6 py-3 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ask a Question
                </button>
                <button v-else @click="resetFilters"
                  class="cursor-pointer px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
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
      @submit="handlePostQuestion" 
      @close="showModal = false"
      @showToast="showToastNotification"
    />

    <!-- Comments Modal -->
    <CommentsModal 
      v-if="showCommentsModal" 
      :visible="showCommentsModal" 
      :question="selectedQuestion!"
      @close="handleCloseCommentsModal" 
      @showToast="showToastNotification"
      @answerSubmitted="handleAnswerSubmitted"
    />

    <!-- Guide Modals -->
    <GuideModal 
      :visible="showGuestGuide"
      type="guest"
      @close="showGuestGuide = false"
    />
    
    <GuideModal 
      :visible="showUserGuide"
      type="user"
      @close="showUserGuide = false"
    />

    <!-- Toast Component -->
    <Toast 
      :visible="toast.visible"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      :duration="toast.duration"
      @close="toast.visible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../supabase';
import NavBar from '../../components/NavBar.vue';
import AskQuestionModal from '../../components/Forum/AskQuestionModal.vue';
import CommentsModal from '../../components/Forum/CommentsModal.vue';
import ForumCard from '../../components/Forum/ForumCard.vue';
import FilterSidebar from '../../components/Forum/FilterSidebar.vue'; 
import GuideModal from '../../components/Forum/GuideModal.vue';
import Toast from '../../components/Profile/Toast.vue';
import { useAuthStore } from '@/stores/authStore';
import { forumService } from '@/services/forumService';
import type { ForumQuestion } from '@/services/forumService';

// ===== CONSTANTS =====
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const MIN_LOADING_TIME = 800; // Minimum loading time for better UX
const VISIBILITY_REFRESH_THRESHOLD = 30 * 1000; // Refresh if away for 30+ seconds

// ===== ROUTER & STORES =====
const router = useRouter();
const authStore = useAuthStore();

// ===== STATE =====
const showModal = ref(false);
const showGuestGuide = ref(false);
const showUserGuide = ref(false);
const showCommentsModal = ref(false);
const selectedQuestion = ref<ForumQuestion | null>(null);
const isSidebarExpanded = ref(true);
const sortBy = ref('newest');
const isLoadingQuestions = ref(false);
const isRefreshing = ref(false);

// 🆕 Track visibility
let lastVisibilityTime = Date.now();
let lastFetchTime = 0;

// Toast state
const toast = reactive({
  visible: false,
  type: 'success' as 'success' | 'error',
  title: 'Success!',
  message: '',
  duration: 4000
});

// Filter constants
const categories = ['Poultry', 'Swine', 'Cattle', 'Goat', 'Sheep', 'Feed', 'Health', 'Equipment'];
const urgencyLevels = ['Low', 'Normal', 'High', 'Critical'];

// Filter state
const filters = ref({
  search: '',
  categories: [] as string[],
  urgency: ''
});

// Forum questions data
const forumQuestions = ref<ForumQuestion[]>([]);

// ===== COMPUTED PROPERTIES =====
const isAuthenticated = computed(() => authStore.isAuthenticated);

const isFarmerView = computed(() => {
  const role = authStore.userRole?.toLowerCase() || '';
  return role === 'farmer';
});

const headerSubtitle = computed(() => {
  if (!isAuthenticated.value) {
    return "Connect with farmers & experts";
  } else if (isFarmerView.value) {
    return "Share your expertise with the community";
  } else {
    return "Get answers from experienced farmers";
  }
});

const forumStats = computed(() => ({
  totalQuestions: forumQuestions.value.length,
  totalAnswers: forumQuestions.value.reduce((sum, q) => sum + q.answers.length, 0),
  activeUsers: new Set(forumQuestions.value.map(q => q.userId)).size
}));

const filteredQuestions = computed(() => {
  return forumQuestions.value.filter(question => {
    // Search filter
    const searchLower = filters.value.search.toLowerCase();
    const matchesSearch = !filters.value.search ||
      question.title.toLowerCase().includes(searchLower) ||
      (question.description && question.description.toLowerCase().includes(searchLower));

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

// ===== UTILITY FUNCTIONS =====
const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn.apply(null, args), delay);
  };
};

// 🆕 Check Supabase connection health
const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('profiles').select('id').limit(1);
    return !error;
  } catch (error) {
    console.error('❌ Supabase connection check failed:', error);
    return false;
  }
};

// ===== METHODS =====
const loadForumQuestions = async (forceRefresh = false) => {
  // Prevent multiple simultaneous refreshes
  if (isRefreshing.value && !forceRefresh) {
    console.log('🔄 Refresh already in progress, skipping...');
    return;
  }

  try {
    isRefreshing.value = true;

    // Check cache first
    if (!forceRefresh && Date.now() - lastFetchTime < CACHE_TIMEOUT) {
      const cachedQuestions = localStorage.getItem('forum_questions');
      if (cachedQuestions) {
        const parsed = JSON.parse(cachedQuestions);
        forumQuestions.value = parsed.data;
        console.log('✅ Using cached forum questions');
        isLoadingQuestions.value = false;
        return;
      }
    }

    isLoadingQuestions.value = true;
    console.log('🔄 Loading forum questions from database...');
    
    // Add minimum loading time for better UX
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME));
    
    // Pass userId if authenticated to get user's vote status
    const questionsPromise = forumService.getQuestions(authStore.userId || undefined);
    
    // Wait for both promises
    const [questions] = await Promise.all([questionsPromise, minLoadingTime]);
    
    forumQuestions.value = questions;
    
    // Cache the results
    localStorage.setItem('forum_questions', JSON.stringify({
      data: questions,
      timestamp: Date.now()
    }));
    lastFetchTime = Date.now();
    
    console.log(`✅ Loaded ${questions.length} questions successfully`);
  } catch (error) {
    console.error('❌ Error loading forum questions:', error);
    showToastNotification('Failed to load forum questions. Please try again.', 'error');
  } finally {
    isLoadingQuestions.value = false;
    isRefreshing.value = false;
  }
};

// 🆕 PAGE VISIBILITY API - SMART REFRESH
const handleVisibilityChange = async () => {
  if (document.hidden) {
    // Tab became hidden - record the time
    lastVisibilityTime = Date.now();
    console.log('👋 Forum: Tab hidden at:', new Date(lastVisibilityTime).toLocaleTimeString());
  } else {
    // Tab became visible - check if we need to refresh
    const timeAway = Date.now() - lastVisibilityTime;
    console.log('👀 Forum: Tab visible again. Time away:', Math.round(timeAway / 1000), 'seconds');

    // Only refresh if we were away for more than threshold
    if (timeAway > VISIBILITY_REFRESH_THRESHOLD) {
      console.log('🔄 Forum: Tab was away for a while, refreshing data...');

      // Check Supabase connection health first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.warn('⚠️ Supabase connection issue, attempting reconnect...');
      }

      // Refresh auth session first
      if (isAuthenticated.value) {
        const sessionValid = await authStore.refreshSession();
        if (!sessionValid) {
          console.warn('⚠️ Auth session expired');
          return;
        }
      }

      // Refresh forum questions
      localStorage.removeItem('forum_questions'); // Clear cache
      await loadForumQuestions(true);

      showToastNotification('Forum data refreshed successfully');
    } else {
      console.log('✅ Quick return, using cached data');
    }
  }
};

const navigateToLogin = () => {
  router.push('/signIn');
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleSidebarToggle = (expanded: boolean) => {
  isSidebarExpanded.value = expanded;
};

const handleFiltersUpdate = debounce((updatedFilters: typeof filters.value) => {
  filters.value = { ...updatedFilters };
}, 300);

const resetFilters = () => {
  filters.value = {
    search: '',
    categories: [],
    urgency: ''
  };
  showToastNotification('All filters have been reset');
};

const showToastNotification = (message: string, type: 'success' | 'error' = 'success') => {
  toast.type = type;
  toast.title = type === 'success' ? 'Success!' : 'Error';
  toast.message = message;
  toast.visible = true;
};

const openCommentsModal = (question: ForumQuestion) => {
  console.log('📖 Opening comments modal for question:', question.id);
  
  // Open modal immediately with current question data
  selectedQuestion.value = question;
  showCommentsModal.value = true;
  
  // Load fresh data in the background (async, non-blocking)
  loadQuestionDataInBackground(question.id);
};

const loadQuestionDataInBackground = async (questionId: number) => {
  try {
    // Increment view count
    await forumService.incrementViews(questionId);
    
    // Reload the specific question to get updated data
    const updatedQuestion = await forumService.getQuestionById(questionId, authStore.userId || undefined);
    
    if (updatedQuestion) {
      // Update selected question with fresh data
      selectedQuestion.value = updatedQuestion;
      
      // Update the question in the list
      const index = forumQuestions.value.findIndex(q => q.id === questionId);
      if (index !== -1) {
        forumQuestions.value[index] = updatedQuestion;
      }
    }
  } catch (error) {
    console.error('❌ Error loading question data:', error);
    // Don't show error toast since modal is already open with cached data
  }
};

const handleCloseCommentsModal = () => {
  showCommentsModal.value = false;
  selectedQuestion.value = null;
};

const handlePostQuestion = async (questionData: ForumQuestion) => {
  try {
    console.log('✅ Question posted successfully, reloading questions...');
    showModal.value = false;
    showToastNotification('Your question has been posted successfully!');
    
    // Clear cache and reload questions from database
    localStorage.removeItem('forum_questions');
    await loadForumQuestions(true);
    
    // Scroll to top to show the new question
    scrollToTop();
  } catch (error) {
    console.error('❌ Error after posting question:', error);
    showToastNotification('Question posted but failed to refresh. Please reload the page.', 'error');
  }
};

const handleQuestionUpdated = async (updatedQuestion: ForumQuestion) => {
  try {
    console.log('✅ Question updated, reloading questions...');
    showToastNotification('Question updated successfully!');
    
    // Clear cache and reload questions from database
    localStorage.removeItem('forum_questions');
    await loadForumQuestions(true);
  } catch (error) {
    console.error('❌ Error after updating question:', error);
    showToastNotification('Question updated but failed to refresh. Please reload the page.', 'error');
  }
};

const handleQuestionDeleted = async (questionId: number) => {
  try {
    console.log('✅ Question deleted, reloading questions...');
    
    // Remove from local state immediately for instant feedback
    const index = forumQuestions.value.findIndex(q => q.id === questionId);
    if (index !== -1) {
      forumQuestions.value.splice(index, 1);
    }
    
    showToastNotification('Question deleted successfully!');
    
    // Clear cache and reload questions from database
    localStorage.removeItem('forum_questions');
    await loadForumQuestions(true);
  } catch (error) {
    console.error('❌ Error after deleting question:', error);
    showToastNotification('Question deleted but failed to refresh. Please reload the page.', 'error');
  }
};

const handleAnswerSubmitted = async () => {
  if (selectedQuestion.value) {
    try {
      const updatedQuestion = await forumService.getQuestionById(
        selectedQuestion.value.id, 
        authStore.userId || undefined
      );
      
      if (updatedQuestion) {
        selectedQuestion.value = updatedQuestion;
        
        // Update in the list
        const index = forumQuestions.value.findIndex(q => q.id === updatedQuestion.id);
        if (index !== -1) {
          forumQuestions.value[index] = updatedQuestion;
        }
        
        // Clear cache to ensure fresh data on next load
        localStorage.removeItem('forum_questions');
      }
    } catch (error) {
      console.error('❌ Error reloading question:', error);
    }
  }
};

// ===== LIFECYCLE =====
onMounted(async () => {
  console.log('🚀 ===== FORUM COMPONENT MOUNTED =====');
  
  // Ensure auth is initialized
  if (!authStore.initialized) {
    console.log('🔐 Initializing auth store...');
    await authStore.initialize();
  }
  
  // 🆕 Add Page Visibility API listener
  document.addEventListener('visibilitychange', handleVisibilityChange);
  console.log('✅ Page visibility listener added');
  
  // Load forum questions
  await loadForumQuestions();
  
  console.log('✅ Forum component ready');
});

// 🆕 Cleanup on unmount
onBeforeUnmount(() => {
  // Remove visibility listener
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  console.log('🧹 Cleaned up Forum listeners');
});
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>