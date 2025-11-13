<!-- CommentsModal.vue -->
<template>
    <div v-if="visible" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div
            class="bg-white w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl shadow-2xl">

            <!-- Header with Close Button -->
            <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-4 flex items-center justify-between">
                <h2 class="text-xl font-bold text-white">Question Details</h2>
                <button @click="$emit('close')"
                    class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm border border-white/20">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Main Question Card - PRIMARY FOCUS -->
            <div class="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-b-4 border-green-600 px-6 py-5">
                <!-- Author Info with Profile Picture -->
                <div class="flex items-center gap-3 mb-4">
                    <div class="flex-shrink-0">
                        <div v-if="questionAuthorProfilePicture" class="w-12 h-12 rounded-full overflow-hidden ring-2 ring-green-500 shadow-md">
                            <img :src="questionAuthorProfilePicture" :alt="question.userFullName"
                                class="w-full h-full object-cover" @error="handleQuestionAuthorImageError" />
                        </div>
                        <div v-else
                            class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center ring-2 ring-green-500 shadow-md">
                            <span class="text-white text-base font-bold">{{ questionAuthorInitials }}</span>
                        </div>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 flex-wrap mb-1">
                            <h3 class="font-bold text-gray-900 text-base">{{ question.userFullName || question.userRole }}</h3>
                            <span v-if="question.urgency === 'High' || question.urgency === 'Critical'"
                                class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500 text-white shadow-sm animate-pulse">
                                {{ question.urgency === 'Critical' ? 'CRITICAL' : 'URGENT' }}
                            </span>
                            <span v-if="question.category"
                                class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-500 text-white shadow-sm">
                                {{ question.category }}
                            </span>
                            <span v-if="question.visibility === 'farmers'"
                                class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500 text-white shadow-sm">
                                🔒 Farmers Only
                            </span>
                        </div>
                        <div class="flex items-center gap-2 text-gray-600 text-sm">
                            <span>{{ formatDate(question.createdAt) }}</span>
                            <span>•</span>
                            <span>{{ question.views || 0 }} views</span>
                        </div>
                    </div>
                </div>

                <!-- Title - MAIN FOCUS -->
                <h1 class="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                    {{ question.title }}
                </h1>

                <!-- Description - MAIN FOCUS -->
                <p v-if="question.description" class="text-base text-gray-800 leading-relaxed mb-4 whitespace-pre-line">
                    {{ question.description }}
                </p>

                <!-- Engagement Bar -->
                <div class="flex items-center justify-between pt-4 border-t-2 border-green-200">
                    <div class="flex items-center gap-4">
                        <!-- Like Button -->
                        <div class="flex items-center gap-2">
                            <div class="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-green-200">
                                <button v-if="isAuthenticated" @click="upvoteQuestion" :disabled="isVoting || isOwnQuestion"
                                    class="flex items-center gap-1.5 transition-all disabled:opacity-50"
                                    :class="question.userVote === 'up' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                    <span class="font-semibold text-sm">Like</span>
                                </button>
                                <button v-else disabled
                                    class="flex items-center gap-1.5 text-gray-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                    <span class="font-semibold text-sm">Like</span>
                                </button>
                                <span v-if="voteScore > 0" class="text-sm font-bold text-gray-700 ml-1">{{ voteScore }}</span>
                            </div>
                        </div>

                        <!-- Answers Count -->
                        <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-green-200">
                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span class="font-semibold text-sm text-gray-700">{{ question.answers.length }} {{ question.answers.length === 1 ? 'Answer' : 'Answers' }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Answers Section Header -->
            <div class="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h3 class="text-base font-bold text-gray-900">All Answers ({{ question.answers.length }})</h3>
            </div>

            <!-- Answers List - Scrollable -->
            <div class="flex-1 overflow-y-auto bg-white">
                <!-- Loading State -->
                <div v-if="isLoadingAnswers" class="flex items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
                    <span class="ml-3 text-gray-600 font-medium">Loading answers...</span>
                </div>

                <!-- Answers -->
                <div v-else-if="question.answers.length > 0" class="px-5 py-3">
                    <div v-for="answer in question.answers" :key="answer.id" class="py-3 border-b border-gray-100 last:border-b-0">
                        <div class="flex gap-3">
                            <!-- Avatar -->
                            <div class="flex-shrink-0 pt-1">
                                <div v-if="getAnswerProfilePicture(answer.id)" class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200">
                                    <img :src="getAnswerProfilePicture(answer.id)" :alt="answer.userFullName"
                                        class="w-full h-full object-cover" @error="() => handleAnswerImageError(answer.id)" />
                                </div>
                                <div v-else
                                    class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-gray-200">
                                    <span class="text-white text-sm font-bold">{{ getAnswerInitials(answer) }}</span>
                                </div>
                            </div>

                            <!-- Answer Content -->
                            <div class="flex-1 min-w-0">
                                <div class="bg-gray-100 rounded-2xl px-4 py-3 inline-block max-w-full">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="font-bold text-gray-900 text-sm">{{ answer.userFullName || answer.userRole }}</span>
                                        <span v-if="isExpertRole(answer.userRole)"
                                            class="text-[10px] text-white bg-green-600 px-2 py-0.5 rounded-full font-bold">
                                            EXPERT
                                        </span>
                                    </div>
                                    <p class="text-gray-900 text-[15px] leading-relaxed whitespace-pre-line break-words">{{ answer.text }}</p>
                                </div>

                                <!-- Meta Actions -->
                                <div class="flex items-center gap-4 mt-1.5 px-3">
                                    <button class="text-gray-600 hover:text-green-600 hover:underline text-sm font-semibold transition-colors">
                                        Helpful
                                    </button>
                                    <span class="text-gray-500 text-sm">{{ formatDate(answer.createdAt) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- No Answers State -->
                <div v-else class="flex flex-col items-center justify-center py-16 px-4">
                    <div class="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-md">
                        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">No answers yet</h3>
                    <p class="text-gray-600 text-sm text-center max-w-md">Be the first to share your knowledge and help the community.</p>
                </div>
            </div>

            <!-- Answer Input Section -->
            <div class="bg-white border-t-2 border-gray-200 px-5 py-4">
                <div v-if="isAuthenticated && canAnswer">
                    <div class="flex gap-3">
                        <!-- User Avatar -->
                        <div class="flex-shrink-0 pt-1">
                            <div v-if="questionAuthorProfilePicture" class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-green-500">
                                <img :src="questionAuthorProfilePicture" :alt="question.userFullName"
                                    class="w-full h-full object-cover" />
                            </div>
                            <div v-else
                                class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center ring-2 ring-green-500">
                                <span class="text-white text-sm font-bold">{{ questionAuthorInitials }}</span>
                            </div>
                        </div>

                        <!-- Input Container -->
                        <div class="flex-1 flex items-end gap-2">
                            <div class="flex-1 relative">
                                <textarea v-model="tempAnswer"
                                    placeholder="Write your answer..."
                                    class="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-3xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none text-[15px] outline-none transition-all"
                                    rows="1"
                                    :disabled="isSubmittingAnswer"
                                    @input="autoResize"
                                    style="max-height: 120px; overflow-y: auto;" />
                            </div>

                            <!-- Send Button -->
                            <button @click="submitAnswer"
                                class="p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                :class="tempAnswer.trim() ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400'"
                                :disabled="!tempAnswer.trim() || tempAnswer.length > 1000 || isSubmittingAnswer">
                                <svg v-if="isSubmittingAnswer" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2 ml-14">{{ tempAnswer.length }}/1000 characters</p>
                </div>

                <!-- Restricted Message -->
                <div v-else-if="isAuthenticated && !canAnswer"
                    class="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-xl p-4">
                    <div class="flex items-start gap-3">
                        <svg class="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        <div>
                            <p class="text-yellow-900 font-bold text-sm mb-1">Restricted Question</p>
                            <p class="text-yellow-800 text-sm">This question is only open to farmers for answers.</p>
                        </div>
                    </div>
                </div>

                <!-- Sign In Prompt -->
                <div v-else class="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                            <div>
                                <p class="text-green-900 font-bold text-sm">Join the conversation</p>
                                <p class="text-green-700 text-sm">Sign in to share your answer</p>
                            </div>
                        </div>
                        <button @click="navigateToLogin"
                            class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg">
                            Sign In
                        </button>
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