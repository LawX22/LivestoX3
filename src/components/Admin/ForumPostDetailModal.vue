<!-- ForumPostDetailModal.vue - FIXED VERSION WITH ALL SECTIONS DISPLAYING -->
<template>
  <div v-if="visible" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
    @click.self="close">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] relative flex flex-col overflow-hidden">
      <!-- Close Button -->
      <button @click="close"
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-6 h-full min-h-0 p-8">
        <!-- LEFT: Question Content (60%) -->
        <div class="w-full lg:w-3/5 flex flex-col min-h-0">
          <h2 class="text-2xl font-bold text-emerald-600 mb-4">
            Forum Question Details
          </h2>

          <!-- Question Header -->
          <div class="mb-4 p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-100">
            <h1 class="text-xl font-bold text-gray-900 mb-3">{{ post?.title || 'No Title' }}</h1>
            
            <div class="flex flex-wrap items-center gap-3 text-sm">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="font-medium text-gray-900">{{ post?.userFullName || 'Unknown User' }}</span>
              </div>
              <span class="text-gray-400">•</span>
              <span :class="roleBadgeClass(post?.userRole)">{{ getRoleLabel(post?.userRole) }}</span>
              <span class="text-gray-400">•</span>
              <span class="text-gray-600">{{ formatDate(post?.createdAt) }}</span>
            </div>

            <!-- Category & Urgency -->
            <div class="flex flex-wrap items-center gap-2 mt-3">
              <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                {{ post?.category || 'General' }}
              </span>
              <span v-if="post?.urgency" :class="urgencyBadgeClass(post.urgency)">
                {{ post.urgency }}
              </span>
              <span v-if="post?.visibility" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                Visibility: {{ post.visibility }}
              </span>
            </div>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            <!-- Question Description -->
            <div v-if="post?.description">
              <h3 class="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Question Description
              </h3>
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p class="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{{ post.description }}</p>
              </div>
            </div>

            <!-- Engagement Stats -->
            <div>
              <h3 class="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Engagement Statistics
              </h3>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div class="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span class="text-xs text-blue-700 font-medium">Answers</span>
                  </div>
                  <p class="text-2xl font-bold text-blue-900">{{ post?.answers?.length || 0 }}</p>
                </div>

                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div class="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span class="text-xs text-gray-700 font-medium">Views</span>
                  </div>
                  <p class="text-2xl font-bold text-gray-900">{{ post?.views || 0 }}</p>
                </div>

                <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div class="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span class="text-xs text-green-700 font-medium">Upvotes</span>
                  </div>
                  <p class="text-2xl font-bold text-green-900">{{ post?.upvotes || 0 }}</p>
                </div>

                <div class="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div class="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                    <span class="text-xs text-red-700 font-medium">Downvotes</span>
                  </div>
                  <p class="text-2xl font-bold text-red-900">{{ post?.downvotes || 0 }}</p>
                </div>
              </div>
            </div>

            <!-- Answers Section -->
            <div v-if="post?.answers && post.answers.length > 0">
              <h3 class="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Answers ({{ post.answers.length }})
              </h3>

              <div class="space-y-3">
                <div v-for="answer in post.answers" :key="answer.id" 
                  class="bg-white border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                  <div class="flex items-start justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-gray-900 text-sm">{{ answer.userFullName || 'Unknown User' }}</span>
                      <span :class="roleBadgeClass(answer.userRole)" class="text-xs">
                        {{ getRoleLabel(answer.userRole) }}
                      </span>
                    </div>
                    <span class="text-xs text-gray-500">{{ formatDate(answer.createdAt) }}</span>
                  </div>
                  <p class="text-sm text-gray-700 leading-relaxed">{{ answer.text }}</p>
                </div>
              </div>
            </div>
            <div v-else class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <svg class="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p class="text-sm text-gray-500">No answers yet</p>
            </div>
          </div>
        </div>

        <!-- RIGHT: Author & Metadata (40%) -->
        <div class="w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6 pt-4 lg:pt-0 space-y-4 overflow-y-auto custom-scrollbar">
          <h2 class="text-2xl font-bold text-blue-600 mb-4">
            Author & Details
          </h2>

          <!-- Author Information Card -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100">
            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Author Information
            </h3>

            <div class="space-y-3">
              <div class="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-100">
                <span class="text-xs text-gray-600">Name</span>
                <span class="text-sm font-medium text-gray-900">{{ post?.userFullName || 'Unknown User' }}</span>
              </div>
              <div class="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-100">
                <span class="text-xs text-gray-600">Role</span>
                <span :class="roleBadgeClass(post?.userRole)" class="text-xs">
                  {{ getRoleLabel(post?.userRole) }}
                </span>
              </div>
              <div class="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-100">
                <span class="text-xs text-gray-600">User ID</span>
                <span class="text-xs text-gray-900 font-mono truncate max-w-[150px]" :title="post?.userId">
                  {{ post?.userId || 'N/A' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Question Metadata -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Question Metadata
            </h3>

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Question ID:</span>
                <span class="text-gray-900 font-medium">{{ post?.id || 'N/A' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Created:</span>
                <span class="text-gray-900 font-medium">{{ formatDate(post?.createdAt) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Category:</span>
                <span class="text-gray-900 font-medium">{{ post?.category || 'General' }}</span>
              </div>
              <div v-if="post?.urgency" class="flex justify-between">
                <span class="text-gray-600">Urgency:</span>
                <span :class="urgencyBadgeClass(post.urgency)" class="text-xs">
                  {{ post.urgency }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Visibility:</span>
                <span class="text-gray-900 font-medium">{{ post?.visibility || 'all' }}</span>
              </div>
            </div>
          </div>

          <!-- Vote Distribution -->
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-lg p-4">
            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Vote Distribution
            </h3>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Upvotes</span>
                  <span class="font-medium text-green-600">{{ post?.upvotes || 0 }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-300" 
                    :style="{ width: calculatePercentage(post?.upvotes || 0, getTotalVotes()) + '%' }">
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-1">{{ calculatePercentage(post?.upvotes || 0, getTotalVotes()) }}%</p>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Downvotes</span>
                  <span class="font-medium text-red-600">{{ post?.downvotes || 0 }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="bg-gradient-to-r from-red-500 to-rose-500 h-2.5 rounded-full transition-all duration-300" 
                    :style="{ width: calculatePercentage(post?.downvotes || 0, getTotalVotes()) + '%' }">
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-1">{{ calculatePercentage(post?.downvotes || 0, getTotalVotes()) }}%</p>
              </div>
              <div class="pt-2 border-t border-emerald-200">
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-gray-700 text-sm">Net Score</span>
                  <span class="font-bold text-xl" :class="getNetScoreClass()">
                    {{ getNetScore() >= 0 ? '+' : '' }}{{ getNetScore() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-8 pb-8 pt-4 border-t border-gray-200 flex justify-end">
        <button @click="close" 
          class="px-6 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-all">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import type { ForumQuestion } from '../../services/forumService'

const props = defineProps<{
  visible: boolean
  post: ForumQuestion | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Helper methods for vote calculations
const getTotalVotes = (): number => {
  return (props.post?.upvotes || 0) + (props.post?.downvotes || 0)
}

const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

const getNetScore = (): number => {
  return (props.post?.upvotes || 0) - (props.post?.downvotes || 0)
}

const getNetScoreClass = (): string => {
  const score = getNetScore()
  if (score > 0) return 'text-green-600'
  if (score < 0) return 'text-red-600'
  return 'text-gray-600'
}

// Prevent body scroll when modal is open
watch(() => props.visible, (visible) => {
  if (visible) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const formatDate = (date?: string): string => {
  if (!date) return 'N/A'
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'N/A'
  }
}

const roleBadgeClass = (role?: string): string => {
  const base = 'px-2.5 py-1 inline-flex leading-5 font-semibold rounded-full'
  switch (role?.toLowerCase()) {
    case 'farmer':
      return `${base} bg-green-100 text-green-800`
    case 'buyer':
      return `${base} bg-blue-100 text-blue-800`
    case 'expert':
      return `${base} bg-purple-100 text-purple-800`
    case 'admin':
      return `${base} bg-red-100 text-red-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const urgencyBadgeClass = (urgency?: string): string => {
  const base = 'px-2.5 py-1 inline-flex leading-5 font-semibold rounded-full'
  switch (urgency?.toLowerCase()) {
    case 'urgent':
      return `${base} bg-red-100 text-red-800`
    case 'high':
      return `${base} bg-orange-100 text-orange-800`
    case 'normal':
      return `${base} bg-blue-100 text-blue-800`
    case 'low':
      return `${base} bg-gray-100 text-gray-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const getRoleLabel = (role?: string): string => {
  switch (role?.toLowerCase()) {
    case 'farmer': return 'Farmer'
    case 'buyer': return 'Buyer'
    case 'expert': return 'Expert'
    case 'admin': return 'Admin'
    default: return 'User'
  }
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>