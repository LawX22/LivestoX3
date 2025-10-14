<!-- CommentsModal.vue -->
<template>
    <div v-if="visible" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div
            class="bg-gradient-to-br from-emerald-50/95 via-teal-50/95 to-green-100/95 backdrop-blur-xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden rounded-3xl shadow-2xl border border-white/50 animate-in slide-in-from-bottom-4 duration-300">

            <!-- Enhanced Ultra Compact Header -->
            <div
                class="sticky top-0 z-40 bg-gradient-to-br from-green-600/96 via-emerald-600/96 to-teal-600/96 backdrop-blur-xl text-white border-b border-emerald-300/20 shadow-xl">
                <div class="p-4">
                    <div class="flex justify-between items-start gap-4">
                        <!-- Left Content Area -->
                        <div class="flex-1 min-w-0 space-y-2">
                            <!-- Title Row with Priority Badges -->
                            <div class="flex items-center gap-2.5 mb-1">
                                <h2 class="text-xl font-bold leading-tight text-white/95 truncate pr-2">{{
                                    question.title }}</h2>

                                <!-- Priority Badge -->
                                <span v-if="question.urgency === 'High' || question.urgency === 'Critical'"
                                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500/90 to-pink-500/90 text-white border border-red-300/30 backdrop-blur-sm shadow-lg shrink-0 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1.5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    {{ question.urgency === 'Critical' ? 'CRITICAL' : 'URGENT' }}
                                </span>
                            </div>

                            <!-- Secondary Badges Row -->
                            <div class="flex items-center gap-2 flex-wrap">
                                <span v-if="question.category"
                                    class="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold bg-white/15 text-white/90 border border-white/20 backdrop-blur-sm shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    {{ question.category }}
                                </span>

                                <span v-if="question.visibility === 'farmers'"
                                    class="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold bg-purple-500/20 text-purple-100 border border-purple-300/30 backdrop-blur-sm shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Farmers Only
                                </span>
                            </div>

                            <!-- Description -->
                            <p v-if="question.description"
                                class="text-white/80 text-sm leading-relaxed line-clamp-2 font-medium">
                                {{ question.description }}
                            </p>

                            <!-- Enhanced Metadata Row -->
                            <div class="flex items-center gap-4 flex-wrap pt-1">
                                <!-- Author Info -->
                                <div
                                    class="flex items-center bg-white/10 px-2.5 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 shadow-sm">
                                    <div
                                        class="w-5 h-5 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mr-2 backdrop-blur-sm shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span class="font-semibold text-white/95 text-sm">{{ question.userFullName || question.userRole }}</span>
                                </div>

                                <!-- Date -->
                                <div
                                    class="flex items-center bg-white/10 px-2.5 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1.5 text-white/80"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span class="font-medium text-white/90 text-sm">{{ formatDate(question.createdAt)
                                        }}</span>
                                </div>

                                <!-- Views -->
                                <div
                                    class="flex items-center bg-white/10 px-2.5 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1.5 text-white/80"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span class="font-medium text-white/90 text-sm">{{ question.views || 0 }}</span>
                                </div>

                                <!-- Answers Count -->
                                <div
                                    class="flex items-center bg-white/10 px-2.5 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1.5 text-white/80"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <span class="font-bold text-white/95 text-sm">{{ question.answers.length }} {{
                                        question.answers.length === 1 ? 'Answer' : 'Answers' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Right Action Area -->
                        <div class="flex items-center gap-2 shrink-0">
                            <!-- Enhanced Voting Component -->
                            <div
                                class="flex flex-col items-center gap-1 bg-white/10 rounded-xl p-2 backdrop-blur-sm border border-white/15 shadow-lg">
                                <button v-if="currentUser" @click="upvoteQuestion" :disabled="isVoting || isOwnQuestion"
                                    class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    :class="{
                                        'bg-white/30 text-white shadow-md': question.userVote === 'up',
                                        'text-white/70 hover:bg-white/20 hover:text-white': question.userVote !== 'up'
                                    }">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                                    </svg>
                                </button>

                                <div
                                    class="text-sm font-bold text-white px-2 py-1 rounded-md bg-white/15 min-w-[32px] text-center shadow-sm border border-white/20">
                                    {{ (question.upvotes || 0) - (question.downvotes || 0) }}
                                </div>

                                <button v-if="currentUser" @click="downvoteQuestion" :disabled="isVoting || isOwnQuestion"
                                    class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    :class="{
                                        'bg-white/30 text-white shadow-md': question.userVote === 'down',
                                        'text-white/70 hover:bg-white/20 hover:text-white': question.userVote !== 'down'
                                    }">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            <!-- Enhanced Close Button -->
                            <button @click="$emit('close')"
                                class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm border border-white/15 shadow-lg group">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 transition-transform group-hover:rotate-90" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content - Fixed height container -->
            <div class="flex-1 flex flex-col overflow-hidden min-h-0">
                <!-- Comments List - Fixed scrollable area -->
                <div class="flex-1 overflow-y-auto px-4 py-4 min-h-0">
                    <!-- Loading State for Comments -->
                    <div v-if="isLoadingAnswers" class="flex items-center justify-center py-8">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        <span class="ml-3 text-gray-600">Loading answers...</span>
                    </div>

                    <!-- Comments with content -->
                    <div v-else-if="question.answers.length > 0" class="space-y-4 max-w-5xl mx-auto">
                        <div v-for="(answer, i) in question.answers" :key="answer.id"
                            class="bg-white/98 backdrop-blur-xl rounded-xl shadow-md overflow-hidden border border-white/60 transition-all duration-200 hover:shadow-lg group">
                            <div class="p-4">
                                <!-- Compact Answer Header -->
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center">
                                        <div
                                            class="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center mr-3 shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div class="flex items-center gap-2 mb-0.5">
                                                <p class="font-bold text-gray-900 text-sm">{{ answer.userFullName || answer.userRole }}</p>
                                                <div v-if="answer.userRole === 'Veterinarian' || answer.userRole === 'Poultry Specialist' || answer.userRole === 'Agribusiness Consultant'"
                                                    class="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-200 font-medium">
                                                    Expert
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-2 text-xs text-gray-500">
                                                <span>{{ answer.userRole }}</span>
                                                <span>•</span>
                                                <span>{{ formatDate(answer.createdAt) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Answer Content -->
                                <div class="mb-3">
                                    <p class="text-gray-800 leading-relaxed whitespace-pre-line text-sm">{{ answer.text
                                        }}</p>
                                </div>

                                <!-- Compact Answer Actions -->
                                <div class="flex items-center gap-3">
                                    <button
                                        class="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors duration-200 text-xs font-medium px-2 py-1 rounded hover:bg-green-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        Helpful
                                    </button>
                                    <button
                                        class="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors duration-200 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- No answers state - Centered in fixed space -->
                    <div v-else class="h-full flex flex-col items-center justify-center text-center">
                        <div
                            class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4 shadow-md">
                            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-2">No answers yet</h3>
                        <p class="text-gray-500 text-sm leading-relaxed mb-4 max-w-md">Be the first to help this farmer
                            by sharing your knowledge.</p>
                        <div v-if="currentUser && canAnswer"
                            class="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200 max-w-md">
                            <p class="text-green-800 font-medium text-xs">Share your expertise and help fellow farmers
                                succeed!</p>
                        </div>
                    </div>
                </div>

                <!-- Ultra Compact Answer Form - Fixed at bottom -->
                <div
                    class="bg-white/98 backdrop-blur-xl border-t border-white/60 p-3 shadow-lg flex-shrink-0 min-h-[120px]">
                    <div class="max-w-5xl mx-auto">
                        <!-- Signed in users - Minimal form -->
                        <div v-if="currentUser && canAnswer" class="space-y-2">
                            <div class="flex items-center gap-2 mb-2">
                                <div
                                    class="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-md flex items-center justify-center shadow-md shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 class="font-bold text-gray-900 text-sm">Post Your Answer</h3>
                            </div>

                            <textarea v-model="tempAnswer"
                                placeholder="Share your expertise, experience, or helpful advice..."
                                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/95 backdrop-blur-sm resize-none transition-all duration-200 text-sm shadow-sm focus:shadow-md"
                                rows="2" 
                                :disabled="isSubmittingAnswer" />

                            <div class="flex justify-between items-center">
                                <p class="text-xs text-gray-500">{{ tempAnswer.length }}/1000</p>
                                <div class="flex gap-2">
                                    <button @click="tempAnswer = ''" :disabled="isSubmittingAnswer"
                                        class="px-3 py-1.5 rounded-md font-medium transition-all duration-200 border border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm text-xs disabled:opacity-50 disabled:cursor-not-allowed">
                                        Clear
                                    </button>
                                    <button @click="submitAnswer"
                                        class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-1.5 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 text-xs"
                                        :disabled="!tempAnswer.trim() || tempAnswer.length > 1000 || isSubmittingAnswer">
                                        <svg v-if="isSubmittingAnswer" class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        {{ isSubmittingAnswer ? 'Posting...' : 'Post Answer' }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Compact notices -->
                        <div v-else-if="currentUser && !canAnswer"
                            class="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-200 backdrop-blur-sm">
                            <div class="flex items-center text-yellow-800">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 shrink-0" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <div>
                                    <p class="font-semibold text-sm">Restricted Question</p>
                                    <p class="text-xs">This question is only open to farmers for answers.</p>
                                </div>
                            </div>
                        </div>

                        <div v-else
                            class="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200 backdrop-blur-sm">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center text-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p class="font-semibold text-sm">Join the Conversation</p>
                                        <p class="text-xs">Sign in to share your knowledge</p>
                                    </div>
                                </div>
                                <button @click="$emit('signin')"
                                    class="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-1.5 rounded-md font-medium transition-all duration-200 shadow-md text-xs">
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
import { ref, computed } from 'vue';
import { forumService, type ForumQuestion } from '../../services/forumService';

interface User {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
}

interface Props {
    visible: boolean;
    question: ForumQuestion;
    currentUser: User | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    close: [];
    updateQuestion: [question: ForumQuestion];
    signin: [];
    showToast: [message: string];
}>();

// State
const tempAnswer = ref('');
const isSubmittingAnswer = ref(false);
const isVoting = ref(false);
const isLoadingAnswers = ref(false);

// Computed
const isOwnQuestion = computed(() => {
    if (!props.currentUser) return false;
    return props.question.userId === props.currentUser.id;
});

const canAnswer = computed(() => {
    if (!props.currentUser) return false;
    if (props.currentUser.role === 'buyer' && props.question.visibility === 'farmers') return false;
    return true;
});

// Methods
const upvoteQuestion = async () => {
    if (!props.currentUser || isOwnQuestion.value || isVoting.value) return;

    try {
        isVoting.value = true;
        const result = await forumService.voteQuestion(props.question.id, props.currentUser.id, 'up');
        
        // Update local question state
        const updatedQuestion = { ...props.question };
        updatedQuestion.upvotes = result.upvotes;
        updatedQuestion.downvotes = result.downvotes;
        updatedQuestion.userVote = result.userVote;
        
        // Update userVotes object
        if (!updatedQuestion.userVotes) updatedQuestion.userVotes = {};
        if (result.userVote) {
            updatedQuestion.userVotes[props.currentUser.id] = result.userVote;
        } else {
            delete updatedQuestion.userVotes[props.currentUser.id];
        }
        
        emit('updateQuestion', updatedQuestion);
    } catch (error) {
        console.error('Failed to vote:', error);
        emit('showToast', 'Failed to vote. Please try again.');
    } finally {
        isVoting.value = false;
    }
};

const downvoteQuestion = async () => {
    if (!props.currentUser || isOwnQuestion.value || isVoting.value) return;

    try {
        isVoting.value = true;
        const result = await forumService.voteQuestion(props.question.id, props.currentUser.id, 'down');
        
        // Update local question state
        const updatedQuestion = { ...props.question };
        updatedQuestion.upvotes = result.upvotes;
        updatedQuestion.downvotes = result.downvotes;
        updatedQuestion.userVote = result.userVote;
        
        // Update userVotes object
        if (!updatedQuestion.userVotes) updatedQuestion.userVotes = {};
        if (result.userVote) {
            updatedQuestion.userVotes[props.currentUser.id] = result.userVote;
        } else {
            delete updatedQuestion.userVotes[props.currentUser.id];
        }
        
        emit('updateQuestion', updatedQuestion);
    } catch (error) {
        console.error('Failed to vote:', error);
        emit('showToast', 'Failed to vote. Please try again.');
    } finally {
        isVoting.value = false;
    }
};

const submitAnswer = async () => {
    if (!props.currentUser || !tempAnswer.value.trim() || isSubmittingAnswer.value) return;
    if (tempAnswer.value.length > 1000) {
        emit('showToast', 'Answer must be 1000 characters or less.');
        return;
    }

    try {
        isSubmittingAnswer.value = true;
        
        // Add answer to database
        const newAnswer = await forumService.addAnswer(
            {
                questionId: props.question.id,
                text: tempAnswer.value.trim()
            },
            props.currentUser.id,
            props.currentUser.role
        );

        // Update local question state
        const updatedQuestion = { ...props.question };
        updatedQuestion.answers = [...updatedQuestion.answers, newAnswer];

        // Clear the form
        tempAnswer.value = '';
        
        emit('updateQuestion', updatedQuestion);
        emit('showToast', 'Your answer has been posted successfully!');
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
        return date.toLocaleDateString('en-PH', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }
};
</script>