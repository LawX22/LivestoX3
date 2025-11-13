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
          <div v-if="!isAuthenticated" class="flex items-center gap-3 max-w-full">
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
              <button @click="navigateToLogin"
                class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 cursor-pointer">
                Sign In
              </button>
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

          <!-- Authenticated User Actions -->
          <div v-else class="flex items-center gap-3 max-w-full">
            <div
              class="bg-green-100/80 text-green-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-green-200 shadow-md">
              <div class="flex items-center min-w-0">
                <svg class="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
               <span class="text-sm font-semibold truncate ml-2">
                Welcome, {{ currentUserProfile?.firstName }} {{ currentUserProfile?.lastName || authStore.userDisplayName }}!
              </span>
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
            <button @click="showUserGuide = true"
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

        <!-- Loading State with Skeleton -->
        <div v-if="isLoadingProfile || isLoadingQuestions" class="flex-1 overflow-y-auto">
          <div class="p-3">
            <div class="space-y-4">
              <!-- Skeleton Cards -->
              <div
                v-for="n in 6"
                :key="`skeleton-${n}`"
                class="bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 p-5 shadow-lg animate-pulse"
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
              />
            </div>

            <!-- Enhanced Empty State -->
            <div v-else class="flex flex-col items-center justify-center py-16">
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
                <button v-if="isAuthenticated" @click="showModal = true"
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
      @submit="handlePostQuestion" 
      @close="showModal = false"
      @showToast="showToastNotification"
    />

    <!-- Comments Modal -->
    <CommentsModal 
      v-if="showCommentsModal" 
      :visible="showCommentsModal" 
      :question="selectedQuestion!"
      @close="showCommentsModal = false" 
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
import { ref, computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import AskQuestionModal from '../../components/Forum/AskQuestionModal.vue';
import CommentsModal from '../../components/Forum/CommentsModal.vue';
import ForumCard from '../../components/Forum/ForumCard.vue';
import FilterSidebar from '../../components/Forum/FilterSidebar.vue'; 
import GuideModal from '../../components/Forum/GuideModal.vue';
import Toast from '../../components/Profile/Toast.vue';
import { useAuthStore } from '@/stores/authStore';
import { ProfileService } from '@/services/profileService';
import { forumService } from '@/services/forumService';
import type { User } from '@/services/user';
import type { ForumQuestion } from '@/services/forumService';

// Router
const router = useRouter();

// Auth Store
const authStore = useAuthStore();

// State
const showModal = ref(false);
const showGuestGuide = ref(false);
const showUserGuide = ref(false);
const showCommentsModal = ref(false);
const selectedQuestion = ref<ForumQuestion | null>(null);
const isSidebarExpanded = ref(true);
const sortBy = ref('newest');
const currentUserProfile = ref<User | null>(null);
const isLoadingProfile = ref(false);
const isLoadingQuestions = ref(false);

// Toast state using reactive object
const toast = reactive({
  visible: false,
  type: 'success' as 'success' | 'error',
  title: 'Success!',
  message: '',
  duration: 4000
});

const categories = ['Poultry', 'Swine', 'Cattle', 'Goat', 'Sheep', 'Feed', 'Health', 'Equipment'];
const urgencyLevels = ['Low', 'Normal', 'High', 'Critical'];

const filters = ref({
  search: '',
  categories: [] as string[],
  urgency: ''
});

// Forum questions data - loaded from Supabase
const forumQuestions = ref<ForumQuestion[]>([]);

// Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated);

const forumStats = computed(() => ({
  totalQuestions: forumQuestions.value.length,
  totalAnswers: forumQuestions.value.reduce((sum, q) => sum + q.answers.length, 0),
  activeUsers: 15 // This could be calculated from unique user IDs
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

// Methods
const loadUserProfile = async () => {
  if (!authStore.userId) {
    console.log('No user ID found, skipping profile load');
    return;
  }

  try {
    isLoadingProfile.value = true;
    console.log('Loading profile for user:', authStore.userId);
    
    const profile = await ProfileService.getProfile(authStore.userId);
    
    if (profile) {
      currentUserProfile.value = profile;
      console.log('Profile loaded successfully:', profile);
    } else {
      console.warn('No profile found for user');
    }
  } catch (error) {
    console.error('Error loading user profile:', error);
    showToastNotification('Failed to load your profile. Some features may be limited.', 'error');
  } finally {
    isLoadingProfile.value = false;
  }
};

const loadForumQuestions = async () => {
  try {
    isLoadingQuestions.value = true;
    console.log('Loading forum questions from Supabase...');
    
    // Add a minimum loading time for better UX
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));
    
    // Pass userId if authenticated to get user's vote status
    const questions = await forumService.getQuestions(authStore.userId || undefined);
    
    // Wait for minimum loading time to complete
    await minLoadingTime;
    
    forumQuestions.value = questions;
    console.log('Forum questions loaded successfully:', questions.length);
  } catch (error) {
    console.error('Error loading forum questions:', error);
    showToastNotification('Failed to load forum questions. Please try again.', 'error');
  } finally {
    isLoadingQuestions.value = false;
  }
};

const navigateToLogin = () => {
  router.push('/signIn');
};

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

const showToastNotification = (message: string, type: 'success' | 'error' = 'success') => {
  toast.type = type;
  toast.title = type === 'success' ? 'Success!' : 'Error';
  toast.message = message;
  toast.visible = true;
};

const openCommentsModal = async (question: ForumQuestion) => {
  try {
    // Increment view count when opening question
    await forumService.incrementViews(question.id);
    
    // Reload the specific question to get updated data
    const updatedQuestion = await forumService.getQuestionById(question.id, authStore.userId || undefined);
    
    if (updatedQuestion) {
      selectedQuestion.value = updatedQuestion;
      showCommentsModal.value = true;
      
      // Update the question in the list
      const index = forumQuestions.value.findIndex(q => q.id === question.id);
      if (index !== -1) {
        forumQuestions.value[index] = updatedQuestion;
      }
    }
  } catch (error) {
    console.error('Error opening question:', error);
    showToastNotification('Failed to load question details', 'error');
  }
};

const handlePostQuestion = async (questionData: ForumQuestion) => {
  try {
    // Add to local state immediately for instant UI feedback
    forumQuestions.value.unshift(questionData);
    showModal.value = false;
    showToastNotification('Your question has been posted successfully!');
    
    // Reload questions to ensure consistency
    await loadForumQuestions();
  } catch (error) {
    console.error('Error after posting question:', error);
    // Question was already posted successfully, just reload
    await loadForumQuestions();
  }
};

const handleAnswerSubmitted = async () => {
  // Reload the current question to get the new answer
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
      console.error('Error reloading question:', error);
    }
  }
};

// Lifecycle hooks
onMounted(async () => {
  console.log('Forum component mounted');
  
  // Initialize auth store
  await authStore.initialize();
  
  // Load user profile if authenticated
  if (authStore.isAuthenticated) {
    await loadUserProfile();
  }
  
  // Load forum questions
  await loadForumQuestions();
});
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>