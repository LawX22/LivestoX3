<!-- CommentsModal.vue -->
<template>
    <div v-if="visible" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden rounded-2xl shadow-2xl border border-gray-200">

            <!-- Compact Header - Fixed Height -->
            <div class="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-white">Question Details</h2>
                        <p class="text-green-100 text-xs">Community Discussion</p>
                    </div>
                </div>
                <button @click="$emit('close')"
                    class="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/20 hover:scale-105">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Two-Column Layout - Fixed Height with Flex -->
            <div class="flex-1 overflow-hidden flex min-h-0">
                <!-- Left Column - Question (38%) - Scrollable -->
                <div class="w-[38%] border-r border-gray-200 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50 overflow-y-auto flex-shrink-0">
                    <div class="p-6 space-y-4">
                        <!-- Author Info -->
                        <div class="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-white/80">
                            <div class="flex-shrink-0">
                                <div v-if="questionAuthorProfilePicture" class="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-emerald-400/50 shadow">
                                    <img :src="questionAuthorProfilePicture" :alt="question.userFullName"
                                        class="w-full h-full object-cover" @error="handleQuestionAuthorImageError" />
                                </div>
                                <div v-else
                                    class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center ring-2 ring-emerald-400/50 shadow">
                                    <span class="text-white text-base font-bold">{{ questionAuthorInitials }}</span>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="font-bold text-gray-900 text-sm truncate mb-1">{{ question.userFullName || question.userRole }}</h3>
                                <div class="flex items-center gap-2 text-gray-600 text-xs mb-2">
                                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                                    </svg>
                                    <span>{{ formatDate(question.createdAt) }}</span>
                                    <span>•</span>
                                    <span>{{ question.views || 0 }} views</span>
                                </div>
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <span v-if="question.urgency === 'High' || question.urgency === 'Critical'"
                                        class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm">
                                        {{ question.urgency === 'Critical' ? '🚨 CRITICAL' : '⚠️ URGENT' }}
                                    </span>
                                    <span v-if="question.category"
                                        class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500 text-white shadow-sm">
                                        {{ question.category }}
                                    </span>
                                    <span v-if="question.visibility === 'farmers'"
                                        class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-500 text-white shadow-sm">
                                        🔒 Farmers Only
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Question Title -->
                        <div class="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-white/80">
                            <h1 class="text-xl font-bold text-gray-900 leading-tight">
                                {{ question.title }}
                            </h1>
                        </div>

                        <!-- Question Description -->
                        <div v-if="question.description" class="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-white/80">
                            <div class="flex items-center gap-2 mb-2 text-gray-600">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <span class="text-xs font-semibold uppercase tracking-wide">Description</span>
                            </div>
                            <p class="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                                {{ question.description }}
                            </p>
                        </div>

                        <!-- Engagement Stats -->
                        <div class="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-white/80">
                            <div class="flex items-center justify-between gap-3">
                                <!-- Like Button -->
                                <div class="flex-1">
                                    <button v-if="isAuthenticated" @click="upvoteQuestion" :disabled="isVoting || isOwnQuestion"
                                        class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow text-sm font-bold"
                                        :class="question.userVote === 'up' 
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        <span>Like</span>
                                        <span v-if="voteScore > 0" class="px-1.5 py-0.5 rounded text-xs font-bold"
                                            :class="question.userVote === 'up' ? 'bg-white/30' : 'bg-emerald-100 text-emerald-700'">
                                            {{ voteScore }}
                                        </span>
                                    </button>
                                    <button v-else disabled
                                        class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 text-sm font-bold">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        <span>Like</span>
                                    </button>
                                </div>

                                <!-- Answers Count -->
                                <div class="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <div>
                                        <p class="text-lg font-bold text-gray-900 leading-none">{{ question.answers.length }}</p>
                                        <p class="text-[10px] font-semibold text-gray-600 uppercase">{{ question.answers.length === 1 ? 'Answer' : 'Answers' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Answers (62%) - Fixed Height Layout -->
                <div class="flex-1 flex flex-col bg-gray-50 min-w-0">
                    <!-- Answers Header - Fixed Height -->
                    <div class="bg-white px-6 py-3 border-b border-gray-200 flex-shrink-0">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-gray-900">Community Answers</h3>
                                <p class="text-xs text-gray-600">{{ question.answers.length }} {{ question.answers.length === 1 ? 'response' : 'responses' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Answers List - Flexible Scrollable Area -->
                    <div class="flex-1 overflow-y-auto px-6 py-4 min-h-0">
                        <!-- Loading State -->
                        <div v-if="isLoadingAnswers" class="flex flex-col items-center justify-center h-full">
                            <div class="relative">
                                <div class="animate-spin rounded-full h-12 w-12 border-3 border-gray-200"></div>
                                <div class="animate-spin rounded-full h-12 w-12 border-3 border-emerald-600 border-t-transparent absolute top-0"></div>
                            </div>
                            <span class="mt-3 text-gray-600 font-medium text-sm">Loading answers...</span>
                        </div>

                        <!-- Answers -->
                        <div v-else-if="question.answers.length > 0" class="space-y-3">
                            <div v-for="(answer, index) in question.answers" :key="answer.id" 
                                class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <div class="flex gap-3">
                                    <!-- Avatar -->
                                    <div class="flex-shrink-0">
                                        <div v-if="getAnswerProfilePicture(answer.id)" class="w-10 h-10 rounded-lg overflow-hidden ring-2 ring-blue-100">
                                            <img :src="getAnswerProfilePicture(answer.id)" :alt="answer.userFullName"
                                                class="w-full h-full object-cover" @error="() => handleAnswerImageError(answer.id)" />
                                        </div>
                                        <div v-else
                                            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center ring-2 ring-blue-100">
                                            <span class="text-white text-sm font-bold">{{ getAnswerInitials(answer) }}</span>
                                        </div>
                                    </div>

                                    <!-- Content -->
                                    <div class="flex-1 min-w-0">
                                        <!-- Header -->
                                        <div class="flex items-center justify-between mb-2">
                                            <div class="flex items-center gap-2 flex-wrap">
                                                <span class="font-bold text-gray-900 text-sm">{{ answer.userFullName || answer.userRole }}</span>
                                                <span v-if="isExpertRole(answer.userRole)"
                                                    class="px-2 py-0.5 text-[10px] text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-md font-bold">
                                                    ✓ EXPERT
                                                </span>
                                                <span class="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-700 rounded-md">
                                                    #{{ index + 1 }}
                                                </span>
                                            </div>
                                            <span class="text-gray-500 text-xs font-medium whitespace-nowrap">{{ formatDate(answer.createdAt) }}</span>
                                        </div>

                                        <!-- Answer Text -->
                                        <div class="mb-2">
                                            <p class="text-gray-800 text-sm leading-relaxed whitespace-pre-line break-words">{{ answer.text }}</p>
                                        </div>

                                        <!-- Actions -->
                                        <div class="flex items-center gap-3 pt-2 border-t border-gray-100">
                                            <button class="flex items-center gap-1.5 text-gray-600 hover:text-emerald-600 transition-colors font-medium text-xs group">
                                                <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                </svg>
                                                <span>Helpful</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- No Answers State - Centered in Available Space -->
                        <div v-else class="flex flex-col items-center justify-center h-full">
                            <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4">
                                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-bold text-gray-800 mb-2">No answers yet</h3>
                            <p class="text-gray-600 text-sm text-center max-w-md mb-4">Be the first to share your knowledge.</p>
                            <div class="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                                <p class="text-emerald-800 font-semibold text-xs">💡 Your expertise can help!</p>
                            </div>
                        </div>
                    </div>

                    <!-- Compact Answer Input - Fixed Height -->
                    <div class="bg-white border-t border-gray-200 px-6 py-3 flex-shrink-0">
                        <div v-if="isAuthenticated && canAnswer">
                            <div class="flex gap-3 items-start">
                                <!-- Small Avatar -->
                                <div class="flex-shrink-0">
                                    <div v-if="questionAuthorProfilePicture" class="w-9 h-9 rounded-lg overflow-hidden ring-2 ring-emerald-100">
                                        <img :src="questionAuthorProfilePicture" :alt="question.userFullName"
                                            class="w-full h-full object-cover" />
                                    </div>
                                    <div v-else
                                        class="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center ring-2 ring-emerald-100">
                                        <span class="text-white text-xs font-bold">{{ questionAuthorInitials }}</span>
                                    </div>
                                </div>

                                <!-- Compact Input -->
                                <div class="flex-1 flex gap-2">
                                    <textarea v-model="tempAnswer"
                                        placeholder="Write your answer..."
                                        class="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 resize-none outline-none transition-all"
                                        rows="2"
                                        :disabled="isSubmittingAnswer"
                                        @input="autoResize"
                                        style="max-height: 100px; overflow-y: auto;" />
                                    
                                    <!-- Compact Send Button -->
                                    <button @click="submitAnswer"
                                        class="px-4 py-2 rounded-lg font-bold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow self-end"
                                        :class="tempAnswer.trim() && tempAnswer.length <= 1000
                                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white' 
                                            : 'bg-gray-200 text-gray-400'"
                                        :disabled="!tempAnswer.trim() || tempAnswer.length > 1000 || isSubmittingAnswer">
                                        <span v-if="isSubmittingAnswer" class="flex items-center gap-1.5">
                                            <svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Posting...
                                        </span>
                                        <span v-else class="flex items-center gap-1.5">
                                            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                            Post
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <p class="text-[11px] text-gray-500 mt-1.5 ml-12"
                                :class="tempAnswer.length > 1000 ? 'text-red-600 font-semibold' : ''">
                                {{ tempAnswer.length }}/1000 characters
                            </p>
                        </div>

                        <!-- Restricted Message -->
                        <div v-else-if="isAuthenticated && !canAnswer"
                            class="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-300 rounded-lg p-3">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg class="w-4 h-4 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-yellow-900 font-bold text-xs mb-1">🔒 Restricted Question</p>
                                    <p class="text-yellow-800 text-xs">Only farmers can answer this question.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Sign In Prompt -->
                        <div v-else class="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-lg p-3">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-emerald-900 font-bold text-xs mb-0.5">Join the conversation</p>
                                        <p class="text-emerald-700 text-xs">Sign in to share your answer</p>
                                    </div>
                                </div>
                                <button @click="navigateToLogin"
                                    class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-sm hover:shadow">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { forumService, type ForumQuestion, type ForumAnswer } from '@/services/forumService';
import { ProfileService } from '@/services/profileService';

const props = defineProps<{
    visible: boolean;
    question: ForumQuestion;
}>();

const emit = defineEmits<{
    close: [];
    showToast: [message: string];
    answerSubmitted: [];
}>();

// Router and Auth
const router = useRouter();
const authStore = useAuthStore();

// State
const tempAnswer = ref('');
const isSubmittingAnswer = ref(false);
const isVoting = ref(false);
const isLoadingAnswers = ref(false);

// Profile pictures state
const questionAuthorProfilePicture = ref<string | null>(null);
const answerProfilePictures = ref<Map<number, string>>(new Map());
const questionAuthorImageError = ref(false);
const answerImageErrors = ref<Set<number>>(new Set());

// Auto-resize textarea
const autoResize = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
};

// Fetch question author profile picture
const fetchQuestionAuthorProfile = async () => {
    if (!props.question.userId) return;
    
    try {
        const profile = await ProfileService.getProfile(props.question.userId);
        if (profile && profile.profilePicture) {
            questionAuthorProfilePicture.value = profile.profilePicture;
        }
    } catch (error) {
        console.error('Error fetching question author profile:', error);
    }
};

// Fetch answer author profile pictures
const fetchAnswerProfilePictures = async () => {
    if (!props.question.answers || props.question.answers.length === 0) return;
    
    const fetchPromises = props.question.answers.map(async (answer) => {
        if (!answer.userId) return;
        
        try {
            const profile = await ProfileService.getProfile(answer.userId);
            if (profile && profile.profilePicture) {
                answerProfilePictures.value.set(answer.id, profile.profilePicture);
            }
        } catch (error) {
            console.error(`Error fetching profile for answer ${answer.id}:`, error);
        }
    });
    
    await Promise.all(fetchPromises);
};

// Get answer profile picture by answer ID
const getAnswerProfilePicture = (answerId: number): string | undefined => {
    if (answerImageErrors.value.has(answerId)) {
        return undefined;
    }
    return answerProfilePictures.value.get(answerId) ?? undefined;
};

// Get initials for answer author
const getAnswerInitials = (answer: ForumAnswer): string => {
    const name = answer.userFullName || answer.userRole || 'User';
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

// Handle image errors
const handleQuestionAuthorImageError = () => {
    questionAuthorImageError.value = true;
    questionAuthorProfilePicture.value = null;
};

const handleAnswerImageError = (answerId: number) => {
    answerImageErrors.value.add(answerId);
    answerProfilePictures.value.delete(answerId);
};

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated);

const isOwnQuestion = computed(() => {
    if (!authStore.userId) return false;
    return props.question.userId === authStore.userId;
});

const canAnswer = computed(() => {
    if (!authStore.userId) return false;
    
    const userRole = authStore.userRole?.toLowerCase() || '';
    if (userRole === 'buyer' && props.question.visibility === 'farmers') {
        return false;
    }
    
    return true;
});

const voteScore = computed(() => {
    return (props.question.upvotes || 0) - (props.question.downvotes || 0);
});

const questionAuthorInitials = computed(() => {
    const name = props.question.userFullName || props.question.userRole || 'User';
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
});

// Methods
const isExpertRole = (role: string) => {
    const expertRoles = ['veterinarian', 'poultry specialist', 'agribusiness consultant', 'agricultural engineer'];
    return expertRoles.includes(role.toLowerCase());
};

const navigateToLogin = () => {
    router.push('/signIn');
};

const upvoteQuestion = async () => {
    if (!authStore.userId || isOwnQuestion.value || isVoting.value) {
        if (isOwnQuestion.value) {
            emit('showToast', 'You cannot vote on your own question');
        }
        return;
    }

    try {
        isVoting.value = true;
        const result = await forumService.voteQuestion(
            props.question.id, 
            authStore.userId, 
            'up'
        );
        
        props.question.upvotes = result.upvotes;
        props.question.downvotes = result.downvotes;
        props.question.userVote = result.userVote;
        
        emit('showToast', result.userVote === 'up' ? 'Upvoted!' : 'Vote removed');
        emit('answerSubmitted');
    } catch (error) {
        console.error('Failed to vote:', error);
        emit('showToast', 'Failed to vote. Please try again.');
    } finally {
        isVoting.value = false;
    }
};

const downvoteQuestion = async () => {
    if (!authStore.userId || isOwnQuestion.value || isVoting.value) {
        if (isOwnQuestion.value) {
            emit('showToast', 'You cannot vote on your own question');
        }
        return;
    }

    try {
        isVoting.value = true;
        const result = await forumService.voteQuestion(
            props.question.id, 
            authStore.userId, 
            'down'
        );
        
        props.question.upvotes = result.upvotes;
        props.question.downvotes = result.downvotes;
        props.question.userVote = result.userVote;
        
        emit('showToast', result.userVote === 'down' ? 'Downvoted!' : 'Vote removed');
        emit('answerSubmitted');
    } catch (error) {
        console.error('Failed to vote:', error);
        emit('showToast', 'Failed to vote. Please try again.');
    } finally {
        isVoting.value = false;
    }
};

const submitAnswer = async () => {
    if (!authStore.userId || !tempAnswer.value.trim() || isSubmittingAnswer.value) {
        return;
    }
    
    if (tempAnswer.value.length > 1000) {
        emit('showToast', 'Answer must be 1000 characters or less.');
        return;
    }

    try {
        isSubmittingAnswer.value = true;
        
        const newAnswer = await forumService.addAnswer(
            {
                questionId: props.question.id,
                text: tempAnswer.value.trim()
            },
            authStore.userId,
            authStore.userRole
        );

        props.question.answers.push(newAnswer);

        try {
            const profile = await ProfileService.getProfile(authStore.userId);
            if (profile && profile.profilePicture) {
                answerProfilePictures.value.set(newAnswer.id, profile.profilePicture);
            }
        } catch (error) {
            console.error('Error fetching profile for new answer:', error);
        }

        tempAnswer.value = '';
        
        emit('showToast', 'Your answer has been posted successfully!');
        emit('answerSubmitted');
    } catch (error) {
        console.error('Failed to submit answer:', error);
        emit('showToast', 'Failed to post answer. Please try again.');
    } finally {
        isSubmittingAnswer.value = false;
    }
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
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }
};

// Watch for modal visibility changes
watch(() => props.visible, (newValue) => {
    if (newValue) {
        questionAuthorImageError.value = false;
        answerImageErrors.value.clear();
        
        fetchQuestionAuthorProfile();
        fetchAnswerProfilePictures();
    }
});

// Watch for changes in answers
watch(() => props.question.answers, () => {
    if (props.visible) {
        fetchAnswerProfilePictures();
    }
}, { deep: true });

// Lifecycle hooks
onMounted(() => {
    if (props.visible) {
        fetchQuestionAuthorProfile();
        fetchAnswerProfilePictures();
    }
});
</script>