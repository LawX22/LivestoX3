<!-- Forum.vue - FIXED ROLE-BASED HEADER DISPLAY -->
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
          <!-- Loading State -->
          <div v-if="isLoadingUser" class="bg-gray-100/80 px-4 py-2 rounded-lg flex items-center gap-3 border border-gray-200 shadow-md cursor-default animate-pulse">
            <div class="w-4 h-4 bg-gray-300 rounded-full shrink-0"></div>
            <div class="h-4 bg-gray-300 rounded w-32"></div>
            <div class="h-6 bg-gray-300 rounded w-20"></div>
          </div>

          <!-- Guest Mode -->
          <div v-else-if="!isAuthenticated" class="flex items-center gap-3 max-w-full">
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

          <!-- Authenticated Users -->
          <div v-else class="flex items-center gap-3 max-w-full">
            <!-- Farmer View -->
            <div v-if="isFarmerView" class="bg-blue-100/80 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-blue-200 shadow-md cursor-default">
              <svg class="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span class="text-sm font-semibold truncate ml-2">Welcome Farmer - Share your expertise</span>
              <button @click="showModal = true"
                class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
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
              <span class="text-sm font-semibold truncate ml-2">Welcome Buyer - Connect with farmers & experts</span>
              <button @click="showModal = true"
                class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 hover:from-red-600 hover:to-red-700 transition-all duration-200">
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
import { ref, computed, onMounted, onBeforeUnmount, reactive, watch } from 'vue';
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
import { marketplaceService } from '@/services/marketplaceService';
import type { ForumQuestion } from '@/services/forumService';
import type { UserDetails } from '@/services/marketplaceService';
import type { RealtimeChannel } from '@supabase/supabase-js';

// ===== TYPES =====
type UserRole = 'buyer' | 'farmer';

// ===== CONSTANTS =====
const MIN_LOADING_TIME = 800; // Minimum loading time for better UX

// ===== ROUTER & STORES =====
const router = useRouter();
const authStore = useAuthStore();

// ===== AUTHENTICATION STATE =====
const isAuthenticated = ref<boolean>(false);
const currentUserId = ref<string | null>(null);
const userRole = ref<UserRole>('buyer');
const userName = ref<string>('Guest User');
const userEmail = ref<string>('');
const currentUserDetails = ref<UserDetails | null>(null);
const isLoadingUser = ref<boolean>(true);

// ===== STATE =====
const showModal = ref(false);
const showGuestGuide = ref(false);
const showUserGuide = ref(false);
const showCommentsModal = ref(false);
const selectedQuestion = ref<ForumQuestion | null>(null);
const isSidebarExpanded = ref(true);
const sortBy = ref('newest');
const isLoadingQuestions = ref(false);

// ===== REALTIME SUBSCRIPTIONS =====
let questionsChannel: RealtimeChannel | null = null;
let answersChannel: RealtimeChannel | null = null;

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
const isFarmerView = computed<boolean>(() => {
  if (userRole.value === null) {
    return false;
  }
  
  return userRole.value === 'farmer';
});

const headerSubtitle = computed<string>(() => {
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

// ===== FETCH CURRENT USER =====
const fetchCurrentUser = async (forceRefresh = false): Promise<void> => {
  try {
    console.log('🔍 ===== FETCHING CURRENT USER (FORUM) =====');
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('❌ Error fetching user:', error);
      isAuthenticated.value = false;
      userRole.value = 'buyer';
      isLoadingUser.value = false;
      return;
    }

    if (user) {
      console.log('✅ User authenticated:', user.id);
      isAuthenticated.value = true;
      currentUserId.value = user.id;

      const userDetails = await marketplaceService.getUserDetails(user.id);
      
      if (userDetails) {
        console.log('✅ User details fetched:', userDetails);
        
        currentUserDetails.value = userDetails;
        userName.value = userDetails.fullName;
        userEmail.value = userDetails.email;
        userRole.value = userDetails.role as UserRole;
        
        console.log('   🎯 Final userRole set to:', `"${userRole.value}"`);
        console.log('   🎯 isFarmerView will be:', userRole.value === 'farmer');
      } else {
        console.log('⚠️ No user details found, using defaults');
        userName.value = user.email?.split('@')[0] || 'User';
        userEmail.value = user.email || '';
        userRole.value = 'buyer';
      }
    } else {
      console.log('❌ No authenticated user');
      isAuthenticated.value = false;
      userRole.value = 'buyer';
    }
  } catch (error) {
    console.error('💥 Exception fetching current user:', error);
    isAuthenticated.value = false;
    userRole.value = 'buyer';
  } finally {
    isLoadingUser.value = false;
  }
};

// ===== SETUP REALTIME SUBSCRIPTIONS =====
const setupForumSubscriptions = (): void => {
  try {
    console.log('🔔 Setting up realtime subscriptions for forum');
    
    // Clean up existing subscriptions
    if (questionsChannel) {
      supabase.removeChannel(questionsChannel);
      questionsChannel = null;
    }
    
    if (answersChannel) {
      supabase.removeChannel(answersChannel);
      answersChannel = null;
    }

    // Subscribe to forum_questions changes
    questionsChannel = supabase
      .channel('forum_questions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'forum_questions'
        },
        async (payload) => {
          console.log('🔔 Forum question change detected:', payload.eventType);
          await loadForumQuestions(true);
        }
      )
      .subscribe((status) => {
        console.log('🔔 Questions subscription status:', status);
      });

    // Subscribe to forum_answers changes
    answersChannel = supabase
      .channel('forum_answers_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'forum_answers'
        },
        async (payload) => {
          console.log('🔔 Forum answer change detected:', payload.eventType);
          await loadForumQuestions(true);
        }
      )
      .subscribe((status) => {
        console.log('🔔 Answers subscription status:', status);
      });
    
    console.log('✅ Forum realtime subscriptions setup complete');
  } catch (error) {
    console.error('💥 Error setting up forum subscriptions:', error);
  }
};

// ===== CLEANUP REALTIME SUBSCRIPTIONS =====
const cleanupForumSubscriptions = (): void => {
  if (questionsChannel) {
    console.log('🧹 Cleaning up questions subscription');
    supabase.removeChannel(questionsChannel);
    questionsChannel = null;
  }
  
  if (answersChannel) {
    console.log('🧹 Cleaning up answers subscription');
    supabase.removeChannel(answersChannel);
    answersChannel = null;
  }
};

// ===== METHODS =====
const loadForumQuestions = async (forceRefresh = false) => {
  try {
    isLoadingQuestions.value = true;
    console.log('🔄 Loading forum questions from Supabase...');
    
    // Add minimum loading time for better UX
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME));
    
    // Pass userId if authenticated to get user's vote status
    const questionsPromise = forumService.getQuestions(authStore.userId || undefined);
    
    // Wait for both promises
    const [questions] = await Promise.all([questionsPromise, minLoadingTime]);
    
    forumQuestions.value = questions;
    console.log(`✅ Loaded ${questions.length} questions successfully`);
  } catch (error) {
    console.error('❌ Error loading forum questions:', error);
    showToastNotification('Failed to load forum questions. Please try again.', 'error');
  } finally {
    isLoadingQuestions.value = false;
  }
};

const navigateToLogin = () => {
  router.push('/login');
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
    
    // Realtime will auto-refresh, but force refresh for immediate feedback
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
    
    // Realtime will auto-refresh
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
    
    // Realtime will auto-refresh
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
  
  // Load user and forum questions in parallel
  await Promise.all([
    fetchCurrentUser(),
    loadForumQuestions()
  ]);
  
  // Setup realtime subscriptions
  setupForumSubscriptions();
  
  // Set up auth listener
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔄 ===== AUTH STATE CHANGE (FORUM) =====', event);
    
    if (event === 'SIGNED_IN' && session) {
      isLoadingUser.value = true;
      await fetchCurrentUser(true);
      await loadForumQuestions(true);
    } else if (event === 'SIGNED_OUT') {
      isAuthenticated.value = false;
      currentUserId.value = null;
      currentUserDetails.value = null;
      userRole.value = 'buyer';
      userName.value = 'Guest User';
      isLoadingUser.value = false;
    } else if (event === 'USER_UPDATED') {
      console.log('🔄 User updated, refreshing user data...');
      await fetchCurrentUser(true);
    }
  });
  
  console.log('✅ Forum component ready');
});

// Cleanup on unmount
onBeforeUnmount(() => {
  cleanupForumSubscriptions();
  console.log('🧹 Cleaned up Forum subscriptions');
});

// Watchers
watch(userRole, (newRole, oldRole) => {
  console.log(`🔄 userRole changed from "${oldRole}" to "${newRole}"`);
  console.log(`   isFarmerView is now: ${isFarmerView.value}`);
});
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>