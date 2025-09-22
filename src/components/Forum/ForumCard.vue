<!-- ForumCard.vue -->
<template>
  <div class="group">
    <!-- Compact Card Container -->
    <div
      class="bg-gradient-to-br from-white/95 to-green-50/30 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/60 relative">
      <!-- Subtle gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-transparent via-green-50/10 to-emerald-50/20 pointer-events-none">
      </div>

      <!-- Card Content -->
      <div class="relative p-4">
        <!-- User Info, Date, Views, and Kebab Menu - At the very top -->
        <div
          class="flex items-center justify-between flex-wrap gap-3 mb-4 pb-3 border-b border-gray-200/50">
          <div class="flex items-center text-sm">
            <div class="relative mr-2">
              <div
                class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <!-- Online indicator - show based on user activity -->
              <div
                v-if="isUserActive"
                class="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm">
              </div>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">{{ displayUserName }}</p>
              <p class="text-gray-600 text-xs">{{ question.userRole || 'User' }}</p>
            </div>
          </div>

          <!-- Date, View Count, and Kebab Menu -->
          <div class="flex items-center gap-3 text-xs text-gray-600">
            <div
              class="flex items-center bg-gradient-to-r from-gray-50 to-white px-2 py-1 rounded-md border border-gray-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="font-semibold">{{ formatDate(question.createdAt) }}</span>
            </div>
            <div
              class="flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 px-2 py-1 rounded-md border border-blue-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-blue-500" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span class="font-semibold text-blue-700">{{ viewsText }}</span>
            </div>

            <!-- Kebab Menu - Only show for question owner -->
            <div v-if="canEditOrDelete" class="relative">
              <button @click.stop="toggleActionsMenu"
                class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 shadow-sm cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div v-if="showActionsMenu" @click.stop
                class="absolute right-0 top-10 w-36 bg-white rounded-lg shadow-xl border border-gray-200 z-[1000] overflow-hidden">
                <button @click="openEditModal"
                  class="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Question
                </button>
                <hr class="border-gray-100">
                <button @click="openDeleteModal"
                  class="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Question
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Question Header with original 3-column layout -->
        <div class="flex justify-between items-start gap-4 mb-3">
          <!-- Left - Compact Voting Section (Top Left) -->
          <div class="flex flex-col items-center gap-1">
            <!-- Upvote Button - Always show, enable for authenticated users -->
            <button 
              @click="handleUpvote"
              :disabled="!currentUser || isVoting"
              class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 shadow-sm"
              :class="{
                'bg-gradient-to-br from-green-100 to-green-200 text-green-700': question.userVote === 'up',
                'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-green-50 hover:to-green-100': question.userVote !== 'up' && currentUser,
                'bg-gray-100 text-gray-400 cursor-not-allowed': !currentUser,
                'opacity-50 cursor-wait': isVoting
              }"
              :title="!currentUser ? 'Login to vote' : (question.userVote === 'up' ? 'Remove upvote' : 'Upvote')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>

            <!-- Vote Score Display -->
            <div class="text-sm font-bold px-2 py-0.5 rounded-md shadow-inner" :class="voteScoreClass">
              {{ voteScore }}
            </div>

            <!-- Downvote Button - Always show, enable for authenticated users -->
            <button 
              @click="handleDownvote"
              :disabled="!currentUser || isVoting"
              class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 shadow-sm"
              :class="{
                'bg-gradient-to-br from-red-100 to-red-200 text-red-700': question.userVote === 'down',
                'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-red-50 hover:to-red-100': question.userVote !== 'down' && currentUser,
                'bg-gray-100 text-gray-400 cursor-not-allowed': !currentUser,
                'opacity-50 cursor-wait': isVoting
              }"
              :title="!currentUser ? 'Login to vote' : (question.userVote === 'down' ? 'Remove downvote' : 'Downvote')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Login prompt for non-authenticated users -->
            <div v-if="!currentUser" class="text-xs text-gray-500 text-center px-2 mt-1">
              <p>Login to vote</p>
            </div>
          </div>

          <!-- Middle - Compact Question Content -->
          <div class="flex-1">
            <!-- Dynamic Tags Section -->
            <div class="flex items-center gap-1.5 mb-2 flex-wrap">
              <!-- Urgency Tag -->
              <span v-if="question.urgency"
                class="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm"
                :class="urgencyTagClass">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 mr-1" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ question.urgency }}
              </span>

              <!-- Category Tag -->
              <span v-if="question.category"
                class="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 mr-1" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 7h.01M7 3h5c1.1045695 0 2 .8954305 2 2v1M7 7l-4 4M7 7l4 4m-4-4v8a2 2 0 002 2h8.394a2 2 0 001.561-.75l2.788-3.5a1 1 0 000-1.5l-2.788-3.5A2 2 0 0016.394 7H11" />
                </svg>
                {{ question.category }}
              </span>

              <!-- Bookmark Tag -->
              <span v-if="question.isBookmarked"
                class="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 mr-1" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Saved
              </span>

              <!-- Visibility Tag -->
              <span v-if="question.visibility === 'farmers'"
                class="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 mr-1" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Farmers Only
              </span>

              <!-- Own Post Indicator -->
              <span v-if="isOwnPost"
                class="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 mr-1" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Your Post
              </span>
            </div>

            <!-- Question Title -->
            <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight cursor-pointer"
              @click="$emit('openComments', question)">
              {{ question.title }}
            </h3>

            <!-- Description -->
            <p v-if="question.description"
              class="text-sm text-gray-700 mb-3 leading-relaxed bg-gradient-to-br from-gray-50/50 to-white/50 p-3 rounded-lg border border-gray-100 shadow-inner">
              {{ truncatedDescription }}
            </p>
          </div>

          <!-- Right - Action Buttons -->
          <div class="flex flex-col items-center gap-2">
            <!-- Answer Button -->
            <button @click="$emit('openComments', question)"
              class="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 px-3 py-2 rounded-lg transition-all duration-300 shadow-md cursor-pointer hover:from-green-100 hover:to-emerald-200">
              <div class="flex flex-col items-center text-green-700">
                <div class="flex items-center mb-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span class="font-bold text-base">{{ answersCount }}</span>
                </div>
                <span class="text-[10px] font-semibold">{{ answersText }}</span>
              </div>
            </button>

            <!-- Bookmark Button -->
            <button v-if="currentUser" @click="$emit('toggleBookmark', question)"
              class="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md cursor-pointer"
              :class="bookmarkButtonClass" 
              :aria-label="bookmarkAriaLabel">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                :fill="question.isBookmarked ? 'currentColor' : 'none'" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Answer Preview Section -->
        <div class="mt-3">
          <!-- Has Answers Preview -->
          <div v-if="hasAnswers"
            class="bg-gradient-to-br from-gray-50/80 to-blue-50/40 p-3 rounded-lg border border-gray-200/50 backdrop-blur-sm shadow-inner">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center text-sm text-gray-700">
                <div class="relative mr-2">
                  <div
                    class="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <span class="font-bold text-gray-900 text-sm">{{ firstAnswerUserName }}</span>
                  <p class="text-gray-600 text-xs">{{ firstAnswerRole }}</p>
                </div>
              </div>
              <button @click="$emit('openComments', question)"
                class="text-xs text-green-600 font-bold bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-1 rounded-md border border-green-200 transition-all duration-200 shadow-sm cursor-pointer hover:from-green-200 hover:to-emerald-200">
                {{ viewAllText }}
              </button>
            </div>
            <p class="text-gray-800 text-sm leading-relaxed">{{ truncatedFirstAnswer }}</p>
          </div>

          <!-- No Answers - Call to Action -->
          <div v-else
            class="bg-gradient-to-br from-green-50/60 to-emerald-50/40 p-3 rounded-lg border border-green-200/50 backdrop-blur-sm shadow-inner">
            <div class="flex items-center justify-between">
              <div class="flex items-center text-green-800 text-sm">
                <div
                  class="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-2 shadow-sm animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <span class="font-bold text-sm">No answers yet</span>
                  <p class="text-xs text-green-700 opacity-90">Be the first to help!</p>
                </div>
              </div>
              <button @click="$emit('openComments', question)"
                class="text-xs text-green-600 font-bold bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1.5 rounded-md border border-green-200 transition-all duration-200 shadow-sm cursor-pointer hover:from-green-200 hover:to-emerald-200">
                Answer →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative transform transition-all duration-300 overflow-hidden max-h-[95vh]"
      >
        <!-- Gradient Header -->
        <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-3 sm:p-4 relative overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div class="absolute top-4 right-4 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
            <div class="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
          </div>
          
          <div class="relative flex items-center justify-between">
            <div class="flex items-center gap-2 sm:gap-3">
              <!-- Icon -->
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              
              <!-- Title -->
              <div>
                <h2 class="text-lg sm:text-xl font-bold text-white">Edit Question</h2>
                <p class="text-blue-100 text-xs font-medium">Update your question details</p>
              </div>
            </div>

            <!-- Close Button -->
            <button @click="closeEditModal" class="text-white/70 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form Content -->
        <div class="p-4 overflow-y-auto" style="max-height: calc(95vh - 80px);">
          <form @submit.prevent="submitEdit" class="space-y-3">
            <!-- Question Title -->
            <div class="space-y-1">
              <label class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Question Title
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input 
                  v-model="editForm.title" 
                  type="text"
                  class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white placeholder-gray-400"
                  placeholder="Summarize your question in a few words..."
                  maxlength="150"
                  required 
                />
                <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                  {{ editForm.title.length }}/150
                </div>
              </div>
            </div>

            <!-- Question Description -->
            <div class="space-y-1">
              <label class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Detailed Description
              </label>
              <div class="relative">
                <textarea 
                  v-model="editForm.description" 
                  rows="4" 
                  maxlength="1000"
                  class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none bg-gradient-to-br from-gray-50 to-white placeholder-gray-400"
                  placeholder="Provide more details about your situation, location, current setup, symptoms, etc."
                />
                <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                  {{ editForm.description ? editForm.description.length : 0 }}/1000
                </div>
              </div>
            </div>

            <!-- Two Column Layout for Selects -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- Category -->
              <div class="space-y-1">
                <label class="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Category
                  <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="editForm.category" 
                    class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white appearance-none cursor-pointer"
                    required
                  >
                    <option disabled value="">Select category</option>
                    <option value="Poultry">Poultry</option>
                    <option value="Swine">Swine</option>
                    <option value="Cattle">Cattle</option>
                    <option value="Goat">Goat</option>
                    <option value="Sheep">Sheep</option>
                    <option value="Feed">Feed & Nutrition</option>
                    <option value="Health">Health & Diseases</option>
                    <option value="Equipment">Equipment & Housing</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Urgency -->
              <div class="space-y-1">
                <label class="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Urgency Level
                  <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="editForm.urgency" 
                    class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white appearance-none cursor-pointer"
                    required
                  >
                    <option disabled value="">Select urgency</option>
                    <option value="Low">Low Priority</option>
                    <option value="Normal">Normal Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Critical">Critical</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visibility -->
            <div class="space-y-1">
              <label class="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Who can see this question?
                <span class="text-red-500">*</span>
              </label>
              
              <!-- Radio Button Style Selection -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label class="relative flex items-center p-2 border-2 rounded-xl cursor-pointer transition-all duration-300" 
                       :class="editForm.visibility === 'all' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-green-300'">
                  <input 
                    type="radio" 
                    v-model="editForm.visibility" 
                    value="all" 
                    class="sr-only"
                    required
                  />
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                         :class="editForm.visibility === 'all' ? 'border-green-500 bg-green-500' : 'border-gray-300'">
                      <div v-if="editForm.visibility === 'all'" class="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div class="font-semibold text-sm text-gray-900">Visible to All</div>
                      <div class="text-xs text-gray-600">Everyone can see and answer</div>
                    </div>
                  </div>
                </label>
                
                <label class="relative flex items-center p-2 border-2 rounded-xl cursor-pointer transition-all duration-300" 
                       :class="editForm.visibility === 'farmers' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-green-300'">
                  <input 
                    type="radio" 
                    v-model="editForm.visibility" 
                    value="farmers" 
                    class="sr-only"
                  />
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                         :class="editForm.visibility === 'farmers' ? 'border-green-500 bg-green-500' : 'border-gray-300'">
                      <div v-if="editForm.visibility === 'farmers'" class="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div class="font-semibold text-sm text-gray-900">Farmers Only</div>
                      <div class="text-xs text-gray-600">Only farmers can answer</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Help Text -->
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-2">
              <div class="flex items-start gap-2">
                <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-xs text-blue-900 mb-1">Tips for better answers:</h4>
                  <ul class="text-xs text-blue-800 space-y-0.5">
                    <li>• Be specific about your location and climate</li>
                    <li>• Include details about your current setup</li>
                    <li>• Mention any symptoms or problems clearly</li>
                    <li>• Add photos if possible (coming soon)</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                @click="closeEditModal"
                class="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-1 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>

              <button
                type="submit"
                :disabled="!isEditFormValid || isSubmitting"
                class="flex-1 px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-1 shadow-lg text-sm"
                :class="[
                  isEditFormValid && !isSubmitting
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {{ isSubmitting ? 'Updating...' : 'Update Question' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" @click="closeDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div class="p-6">
          <!-- Modal Header -->
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Delete Question</h3>
              <p class="text-sm text-gray-600">This action cannot be undone</p>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="mb-6">
            <p class="text-gray-700 mb-4">
              Are you sure you want to delete this question? This will permanently remove the question and all its answers from the forum.
            </p>
            <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p class="font-semibold text-gray-900 text-sm">{{ question.title }}</p>
              <p class="text-gray-600 text-xs mt-1">Created {{ formatDate(question.createdAt) }}</p>
            </div>
          </div>

          <!-- Modal Actions -->
          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="closeDeleteModal"
              class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              :disabled="isDeleting"
              class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
            >
              <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isDeleting ? 'Deleting...' : 'Delete Question' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Define props interface
interface ForumQuestion {
  id: number
  title: string
  description?: string
  category?: string
  urgency?: string
  visibility?: string
  userRole?: string
  userEmail?: string
  userFirstName?: string
  userLastName?: string
  userFullName?: string
  userLastSeen?: string
  createdAt: string
  upvotes?: number
  downvotes?: number
  userVote?: 'up' | 'down' | null
  userVotes?: Record<string, 'up' | 'down'>
  views?: number
  isBookmarked?: boolean
  answers: Array<{
    id: number | string
    content?: string
    text?: string
    userRole?: string
    userFirstName?: string
    userLastName?: string
    userFullName?: string
  }>
}

interface User {
  id?: number
  email: string
  role: 'Farmer' | 'Buyer'
}

// Props
const props = defineProps<{
  question: ForumQuestion
  currentUser?: User | null
}>()

// Emits - Updated with new vote handlers
const emit = defineEmits([
  'upvote',
  'downvote', 
  'toggleBookmark',
  'openComments',
  'editQuestion',
  'deleteQuestion',
  'showToast'
])

// Reactive state
const showActionsMenu = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const isVoting = ref(false) // NEW: Track voting state

const editForm = ref({
  title: '',
  description: '',
  category: '',
  urgency: '',
  visibility: 'all'
})

// Computed properties
const isUserActive = computed(() => {
  if (!props.question.userLastSeen) return false
  const lastSeen = new Date(props.question.userLastSeen)
  const now = new Date()
  const diffInMinutes = (now.getTime() - lastSeen.getTime()) / (1000 * 60)
  return diffInMinutes < 15 // Consider active if seen within 15 minutes
})

const displayUserName = computed(() => {
  // Use userFullName if available, otherwise construct from first/last name
  if (props.question.userFullName && props.question.userFullName.trim()) {
    return props.question.userFullName
  }
  
  const firstName = props.question.userFirstName || ''
  const lastName = props.question.userLastName || ''
  const fullName = `${firstName} ${lastName}`.trim()
  
  return fullName || 'Unknown User'
})

const voteScoreClass = computed(() => {
  const score = (props.question.upvotes || 0) - (props.question.downvotes || 0)
  if (score > 0) {
    return 'bg-gradient-to-br from-green-100 to-green-200 text-green-800'
  } else if (score < 0) {
    return 'bg-gradient-to-br from-red-100 to-red-200 text-red-800'
  }
  return 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
})

const voteScore = computed(() => {
  return (props.question.upvotes || 0) - (props.question.downvotes || 0)
})

const urgencyTagClass = computed(() => {
  const urgencyClasses = {
    'Low': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
    'Normal': 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
    'High': 'bg-gradient-to-r from-orange-400 to-orange-500 text-white',
    'Critical': 'bg-gradient-to-r from-red-500 to-red-600 text-white'
  }
  return urgencyClasses[props.question.urgency as keyof typeof urgencyClasses] || urgencyClasses['Normal']
})

const bookmarkButtonClass = computed(() => {
  return props.question.isBookmarked 
    ? 'bg-gradient-to-br from-amber-100 to-yellow-200 text-amber-700' 
    : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-amber-50 hover:to-yellow-100'
})

const bookmarkAriaLabel = computed(() => {
  return props.question.isBookmarked ? 'Remove bookmark' : 'Add bookmark'
})

const truncatedDescription = computed(() => {
  if (!props.question.description) return ''
  return props.question.description.length > 200 
    ? props.question.description.substring(0, 197) + '...' 
    : props.question.description
})

const answersCount = computed(() => {
  return props.question.answers ? props.question.answers.length : 0
})

const answersText = computed(() => {
  return answersCount.value === 1 ? 'Answer' : 'Answers'
})

const hasAnswers = computed(() => {
  return answersCount.value > 0
})

const firstAnswerRole = computed(() => {
  return hasAnswers.value ? (props.question.answers[0].userRole || 'User') : ''
})

const firstAnswerUserName = computed(() => {
  if (!hasAnswers.value) return ''
  
  const firstAnswer = props.question.answers[0]
  
  // Use userFullName if available, otherwise construct from first/last name
  if (firstAnswer.userFullName && firstAnswer.userFullName.trim()) {
    return firstAnswer.userFullName
  }
  
  const firstName = firstAnswer.userFirstName || ''
  const lastName = firstAnswer.userLastName || ''
  const fullName = `${firstName} ${lastName}`.trim()
  
  return fullName || 'Unknown User'
})

const truncatedFirstAnswer = computed(() => {
  if (!hasAnswers.value) return ''
  const firstAnswer = props.question.answers[0].content || props.question.answers[0].text || ''
  return firstAnswer.length > 120 
    ? firstAnswer.substring(0, 117) + '...' 
    : firstAnswer
})

const viewAllText = computed(() => {
  return `View all ${answersCount.value}`
})

const viewsText = computed(() => {
  const views = props.question.views || 0
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k views`
  }
  return `${views} ${views === 1 ? 'view' : 'views'}`
})

// Check if current user owns this post (for edit/delete permissions)
const isOwnPost = computed(() => {
  return props.currentUser && props.currentUser.email === props.question.userEmail
})

// Only show edit/delete options for post owner
const canEditOrDelete = computed(() => {
  return isOwnPost.value
})

const isEditFormValid = computed(() => {
  return (
    editForm.value.title.trim() &&
    editForm.value.category &&
    editForm.value.urgency &&
    editForm.value.visibility &&
    editForm.value.title.length <= 150 &&
    (editForm.value.description ? editForm.value.description.length : 0) <= 1000
  )
})

// NEW: Vote handling methods
const handleUpvote = async () => {
  if (!props.currentUser || isVoting.value) return
  
  isVoting.value = true
  try {
    emit('upvote', props.question)
  } catch (error) {
    console.error('Error handling upvote:', error)
    emit('showToast', { type: 'error', message: 'Failed to vote. Please try again.' })
  } finally {
    isVoting.value = false
  }
}

const handleDownvote = async () => {
  if (!props.currentUser || isVoting.value) return
  
  isVoting.value = true
  try {
    emit('downvote', props.question)
  } catch (error) {
    console.error('Error handling downvote:', error)
    emit('showToast', { type: 'error', message: 'Failed to vote. Please try again.' })
  } finally {
    isVoting.value = false
  }
}

// Existing methods
const toggleActionsMenu = () => {
  showActionsMenu.value = !showActionsMenu.value
}

const closeActionsMenu = () => {
  showActionsMenu.value = false
}

const openEditModal = () => {
  editForm.value = {
    title: props.question.title || '',
    description: props.question.description || '',
    category: props.question.category || '',
    urgency: props.question.urgency || '',
    visibility: props.question.visibility || 'all'
  }
  showEditModal.value = true
  closeActionsMenu()
}

const closeEditModal = () => {
  showEditModal.value = false
  isSubmitting.value = false
}

const submitEdit = async () => {
  if (isSubmitting.value || !isEditFormValid.value) return
  
  isSubmitting.value = true
  try {
    emit('editQuestion', {
      questionId: props.question.id,
      updates: { ...editForm.value }
    })
    closeEditModal()
  } catch (error) {
    console.error('Error updating question:', error)
    emit('showToast', { type: 'error', message: 'Failed to update question. Please try again.' })
  } finally {
    isSubmitting.value = false
  }
}

const openDeleteModal = () => {
  showDeleteModal.value = true
  closeActionsMenu()
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  isDeleting.value = false
}

const confirmDelete = async () => {
  if (isDeleting.value) return
  
  isDeleting.value = true
  try {
    emit('deleteQuestion', props.question.id)
    closeDeleteModal()
  } catch (error) {
    console.error('Error deleting question:', error)
    emit('showToast', { type: 'error', message: 'Failed to delete question. Please try again.' })
  } finally {
    isDeleting.value = false
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid date'
  
  const now = new Date()
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000
  const diffInMinutes = diffInSeconds / 60
  const diffInHours = diffInMinutes / 60
  const diffInDays = diffInHours / 24

  if (diffInMinutes < 1) {
    return 'Just now'
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}m ago`
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays)}d ago`
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', closeActionsMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeActionsMenu)
})
</script>