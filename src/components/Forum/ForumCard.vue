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
        <!-- User Info, Date, and Views - At the very top -->
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
              <p class="font-bold text-gray-900 text-sm">{{ question.userRole }}</p>
              <p class="text-gray-600 text-xs">{{ displayUserEmail }}</p>
            </div>
          </div>

          <!-- Date and View Count -->
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

            <!-- Action Menu for Post Owner -->
            <div v-if="isPostOwner" class="relative">
              <button @click.stop="toggleActionsMenu"
                class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 shadow-sm cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div v-if="showActionsMenu" @click.stop
                class="absolute right-0 top-10 w-32 bg-white rounded-lg shadow-xl border border-gray-200 z-[1000]">
                <button @click="openEditModal"
                  class="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button @click="openDeleteModal"
                  class="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Question Header with original 3-column layout -->
        <div class="flex justify-between items-start gap-4 mb-3">
          <!-- Left - Compact Voting Section (Top Left) -->
          <div class="flex flex-col items-center gap-1">
            <button v-if="currentUser && canVote" @click="$emit('upvote', question)"
              class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 shadow-sm cursor-pointer"
              :class="{
                'bg-gradient-to-br from-green-100 to-green-200 text-green-700': question.userVote === 'up',
                'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600': question.userVote !== 'up'
              }" :disabled="!canVote">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>

            <div class="text-sm font-bold px-2 py-0.5 rounded-md shadow-inner" :class="voteScoreClass">
              {{ voteScore }}
            </div>

            <button v-if="currentUser && canVote" @click="$emit('downvote', question)"
              class="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 shadow-sm cursor-pointer"
              :class="{
                'bg-gradient-to-br from-red-100 to-red-200 text-red-700': question.userVote === 'down',
                'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600': question.userVote !== 'down'
              }" :disabled="!canVote">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
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
              class="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 px-3 py-2 rounded-lg transition-all duration-300 shadow-md cursor-pointer">
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
                <span class="font-bold text-gray-900 text-sm">{{ firstAnswerRole }}</span>
              </div>
              <button @click="$emit('openComments', question)"
                class="text-xs text-green-600 font-bold bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-1 rounded-md border border-green-200 transition-all duration-200 shadow-sm cursor-pointer">
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
                class="text-xs text-green-600 font-bold bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1.5 rounded-md border border-green-200 transition-all duration-200 shadow-sm cursor-pointer">
                Answer →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" @click="closeEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Question
            </h2>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Edit Form -->
          <form @submit.prevent="submitEdit" class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                v-model="editForm.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter question title"
              >
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                v-model="editForm.description"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Provide more details about your question"
              ></textarea>
            </div>

            <!-- Category and Urgency Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Category -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  v-model="editForm.category"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select category</option>
                  <option value="Poultry">Poultry</option>
                  <option value="Swine">Swine</option>
                  <option value="Cattle">Cattle</option>
                  <option value="Goat">Goat</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Feed">Feed</option>
                  <option value="Health">Health</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

              <!-- Urgency -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Urgency</label>
                <select
                  v-model="editForm.urgency"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select urgency</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <!-- Visibility -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Visibility</label>
              <select
                v-model="editForm.visibility"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">Everyone</option>
                <option value="farmers">Farmers Only</option>
              </select>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="closeEditModal"
                class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
              >
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
            <p class="text-gray-700 mb-3">
              Are you sure you want to delete this question? This will also remove all associated answers and cannot be reversed.
            </p>
            <div class="bg-gray-50 p-3 rounded-lg border-l-4 border-red-400">
              <p class="font-semibold text-gray-900 text-sm">{{ question.title }}</p>
            </div>
          </div>

          <!-- Modal Actions -->
          <div class="flex justify-end gap-3">
            <button
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
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue';
import { forumService } from '../../services/forumService';

interface ForumAnswer {
  id: number;
  text: string;
  userEmail: string;
  userRole: string;
  createdAt: string;
}

interface ForumQuestion {
  id: number;
  title: string;
  description?: string;
  userEmail: string;
  userRole: string;
  createdAt: string;
  answers: ForumAnswer[];
  category?: string;
  urgency?: string;
  isBookmarked?: boolean;
  views?: number;
  tempAnswer?: string;
  visibility?: 'all' | 'farmers';
  upvotes?: number;
  downvotes?: number;
  userVote?: 'up' | 'down' | null;
  userVotes?: { [userEmail: string]: 'up' | 'down' };
}

interface User {
  email: string;
  role: string;
}

interface Props {
  question: ForumQuestion;
  currentUser: User | null;
  descriptionTruncateLength?: number;
  answerTruncateLength?: number;
  showUserEmail?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  descriptionTruncateLength: 120,
  answerTruncateLength: 100,
  showUserEmail: true
});

const emit = defineEmits<{
  upvote: [question: ForumQuestion];
  downvote: [question: ForumQuestion];
  toggleBookmark: [question: ForumQuestion];
  openComments: [question: ForumQuestion];
  editQuestion: [question: ForumQuestion, editedData: Partial<ForumQuestion>];
  deleteQuestion: [questionId: number];
  showToast: [message: string];
}>();

// State for modals and forms
const showActionsMenu = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const isSubmitting = ref(false);
const isDeleting = ref(false);

// Edit form reactive data
const editForm = reactive({
  title: '',
  description: '',
  category: '',
  urgency: '',
  visibility: 'all' as 'all' | 'farmers'
});

// Click outside handler for dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (showActionsMenu.value) {
    showActionsMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Computed properties for user permissions
const isPostOwner = computed(() => {
  return props.currentUser && props.question.userEmail === props.currentUser.email;
});

// Computed properties for dynamic data
const voteScore = computed(() => {
  return (props.question.upvotes || 0) - (props.question.downvotes || 0);
});

const canVote = computed(() => {
  return props.currentUser && props.question.userEmail !== props.currentUser.email;
});

const isUserActive = computed(() => {
  const createdAt = new Date(props.question.createdAt);
  const now = new Date();
  const hoursDiff = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
  return hoursDiff < 24;
});

const displayUserEmail = computed(() => {
  if (!props.showUserEmail) return '';
  
  const email = props.question.userEmail;
  return email.length > 20 ? email.substring(0, 17) + '...' : email;
});

const viewsText = computed(() => {
  const views = props.question.views || 0;
  if (views === 0) return 'No views';
  if (views === 1) return '1 view';
  return `${views} views`;
});

const answersCount = computed(() => {
  return props.question.answers.length;
});

const answersText = computed(() => {
  return answersCount.value === 1 ? 'Answer' : 'Answers';
});

const hasAnswers = computed(() => {
  return answersCount.value > 0;
});

const firstAnswerRole = computed(() => {
  return hasAnswers.value ? props.question.answers[0].userRole : '';
});

const viewAllText = computed(() => {
  return `View all ${answersCount.value} →`;
});

const voteScoreClass = computed(() => {
  const score = voteScore.value;
  if (score > 0) {
    return 'text-green-700 bg-gradient-to-br from-green-100 to-green-200';
  } else if (score < 0) {
    return 'text-red-700 bg-gradient-to-br from-red-100 to-red-200';
  } else {
    return 'text-gray-700 bg-gradient-to-br from-gray-100 to-gray-200';
  }
});

const bookmarkButtonClass = computed(() => {
  if (props.question.isBookmarked) {
    return 'bg-gradient-to-br from-amber-100 to-yellow-200 text-amber-700 border-2 border-amber-300';
  } else {
    return 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 border-2 border-gray-300';
  }
});

const bookmarkAriaLabel = computed(() => {
  return props.question.isBookmarked ? 'Remove bookmark' : 'Bookmark question';
});

const urgencyTagClass = computed(() => {
  const urgency = props.question.urgency;
  if (urgency === 'Critical') {
    return 'bg-gradient-to-r from-red-500 to-rose-600 text-white animate-pulse';
  } else if (urgency === 'High') {
    return 'bg-gradient-to-r from-orange-400 to-red-500 text-white';
  } else if (urgency === 'Normal') {
    return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
  } else if (urgency === 'Low') {
    return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
  }
  return '';
});

const truncatedDescription = computed(() => {
  const description = props.question.description;
  if (!description) return '';
  
  return description.length > props.descriptionTruncateLength
    ? description.substring(0, props.descriptionTruncateLength) + '...'
    : description;
});

const truncatedFirstAnswer = computed(() => {
  if (!hasAnswers.value) return '';
  
  const firstAnswer = props.question.answers[0].text;
  return firstAnswer.length > props.answerTruncateLength
    ? firstAnswer.substring(0, props.answerTruncateLength) + '...'
    : firstAnswer;
});

// Modal control functions
const toggleActionsMenu = () => {
  showActionsMenu.value = !showActionsMenu.value;
};

const openEditModal = () => {
  editForm.title = props.question.title;
  editForm.description = props.question.description || '';
  editForm.category = props.question.category || '';
  editForm.urgency = props.question.urgency || '';
  editForm.visibility = props.question.visibility || 'all';
  
  showEditModal.value = true;
  showActionsMenu.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  isSubmitting.value = false;
  // Reset form
  editForm.title = '';
  editForm.description = '';
  editForm.category = '';
  editForm.urgency = '';
  editForm.visibility = 'all';
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
  showActionsMenu.value = false;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  isDeleting.value = false;
};

// Form submission functions with Supabase integration
const submitEdit = async () => {
  if (isSubmitting.value) return;
  
  isSubmitting.value = true;
  
  try {
    const editedData = {
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      category: editForm.category || undefined,
      urgency: editForm.urgency || undefined,
      visibility: editForm.visibility
    };
    
    // Update question in Supabase
    const updatedQuestion = await forumService.updateQuestion(props.question.id, editedData);
    
    // Emit the updated question to parent component
    emit('editQuestion', props.question, updatedQuestion);
    emit('showToast', 'Question updated successfully!');
    
    closeEditModal();
  } catch (error) {
    console.error('Error updating question:', error);
    emit('showToast', 'Failed to update question. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = async () => {
  if (isDeleting.value) return;
  
  isDeleting.value = true;
  
  try {
    // Delete question from Supabase
    await forumService.deleteQuestion(props.question.id);
    
    // Emit delete event to parent component
    emit('deleteQuestion', props.question.id);
    emit('showToast', 'Question deleted successfully!');
    
    closeDeleteModal();
  } catch (error) {
    console.error('Error deleting question:', error);
    emit('showToast', 'Failed to delete question. Please try again.');
  } finally {
    isDeleting.value = false;
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMs < 60000) {
    return 'Just now';
  } else if (diffInMs < 3600000) {
    const minutes = Math.floor(diffInMs / 60000);
    return `${minutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  } else {
    return date.toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
};
</script>