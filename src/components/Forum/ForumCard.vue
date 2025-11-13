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
        <!-- User Info, Date, Views - At the very top -->
        <div class="flex items-center justify-between flex-wrap gap-3 mb-4 pb-3 border-b border-gray-200/50">
          <div class="flex items-center text-sm">
            <div class="relative mr-2">
              <!-- User Avatar with actual profile picture -->
              <div
                v-if="userProfilePicture"
                class="w-8 h-8 rounded-full flex items-center justify-center shadow-md overflow-hidden ring-2 ring-green-400">
                <img 
                  :src="userProfilePicture" 
                  :alt="question.userFullName"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <div
                v-else
                class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                <span class="text-white text-xs font-bold">{{ userInitials }}</span>
              </div>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">{{ question.userFullName }}</p>
              <p class="text-gray-600 text-xs">{{ question.userRole || 'User' }}</p>
            </div>
          </div>

          <!-- Date, View Count, and Actions -->
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

            <!-- Edit/Delete Actions (only for question owner) -->
            <div v-if="isQuestionOwner" class="flex items-center gap-1">
              <button
                @click.stop="openEditModal"
                class="p-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-md border border-blue-200 hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 shadow-sm"
                title="Edit question">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click.stop="openDeleteModal"
                class="p-1.5 bg-gradient-to-r from-red-50 to-pink-50 rounded-md border border-red-200 hover:from-red-100 hover:to-pink-100 transition-all duration-200 shadow-sm"
                title="Delete question">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Question Header with 3-column layout -->
        <div class="flex justify-between items-start gap-4 mb-3">
          <!-- Left - Voting Section -->
          <div class="flex flex-col items-center gap-1">
            <button 
              @click="handleUpvote"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 shadow-sm cursor-pointer',
                question.userVote === 'up' 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' 
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-green-50 hover:to-green-100'
              ]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>

            <div class="text-sm font-bold px-2 py-0.5 rounded-md shadow-inner bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700">
              {{ voteScore }}
            </div>

            <button 
              @click="handleDownvote"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 shadow-sm cursor-pointer',
                question.userVote === 'down' 
                  ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white' 
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-red-50 hover:to-red-100'
              ]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- Middle - Question Content -->
          <div class="flex-1">
            <!-- Tags -->
            <div class="flex items-center gap-1.5 mb-2 flex-wrap">
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

              <span v-if="question.category"
                class="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm">
                {{ question.category }}
              </span>

              <span v-if="question.visibility === 'farmers'"
                class="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-sm">
                Farmers Only
              </span>
            </div>

            <!-- Question Title -->
            <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight cursor-pointer hover:text-green-600 transition-colors"
              @click="$emit('openComments', question)">
              {{ question.title }}
            </h3>

            <!-- Description -->
            <p v-if="question.description"
              class="text-sm text-gray-700 mb-3 leading-relaxed bg-gradient-to-br from-gray-50/50 to-white/50 p-3 rounded-lg border border-gray-100 shadow-inner">
              {{ truncatedDescription }}
            </p>
          </div>

          <!-- Right - Answer Button -->
          <div class="flex flex-col items-center gap-2">
            <button @click="$emit('openComments', question)"
              class="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 px-3 py-2 rounded-lg transition-all duration-300 shadow-md cursor-pointer hover:from-green-100 hover:to-emerald-200 hover:shadow-lg">
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
                  <!-- First Answer User Avatar -->
                  <div
                    v-if="firstAnswerProfilePicture"
                    class="w-6 h-6 rounded-full flex items-center justify-center shadow-sm overflow-hidden ring-2 ring-blue-400">
                    <img 
                      :src="firstAnswerProfilePicture" 
                      :alt="firstAnswerUserName"
                      class="w-full h-full object-cover"
                      @error="handleAnswerImageError"
                    />
                  </div>
                  <div
                    v-else
                    class="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                    <span class="text-white text-[10px] font-bold">{{ firstAnswerInitials }}</span>
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

          <!-- No Answers -->
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

    <!-- Edit Question Modal -->
    <Teleport to="body">
      <div
        v-if="showEditModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="closeEditModal"
      >
        <div 
          class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative transform transition-all duration-300 overflow-hidden max-h-[95vh]"
        >
          <!-- Gradient Header -->
          <div class="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-3 sm:p-4 relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div class="absolute top-4 right-4 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
              <div class="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
            </div>
            
            <div class="relative flex items-center justify-between">
              <div class="flex items-center gap-2 sm:gap-3">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                
                <div>
                  <h2 class="text-lg sm:text-xl font-bold text-white">Edit Question</h2>
                  <p class="text-blue-100 text-xs font-medium">Update your question details</p>
                </div>
              </div>
              
              <button
                @click="closeEditModal"
                class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors duration-200"
                :disabled="isUpdating"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isUpdating" class="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div class="text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p class="text-sm text-gray-600">Updating your question...</p>
            </div>
          </div>

          <!-- Form Content -->
          <div class="p-4 overflow-y-auto" style="max-height: calc(95vh - 80px);">
            <form @submit.prevent="handleEditSubmit" class="space-y-3">
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
                    required 
                    maxlength="150"
                    :disabled="isUpdating"
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
                    class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none bg-gradient-to-br from-gray-50 to-white placeholder-gray-400"
                    placeholder="Provide more details about your situation..."
                    maxlength="1000"
                    :disabled="isUpdating"
                  />
                  <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                    {{ editForm.description ? editForm.description.length : 0 }}/1000
                  </div>
                </div>
              </div>

              <!-- Two Column Layout -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <!-- Category -->
                <div class="space-y-1">
                  <label class="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Category
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <select 
                      v-model="editForm.category" 
                      class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white appearance-none cursor-pointer"
                      required
                      :disabled="isUpdating"
                    >
                      <option disabled value="">Select category</option>
                      <option value="Poultry">🐔 Poultry</option>
                      <option value="Swine">🐷 Swine</option>
                      <option value="Cattle">🐄 Cattle</option>
                      <option value="Goat">🐐 Goat</option>
                      <option value="Sheep">🐑 Sheep</option>
                      <option value="Feed">🌾 Feed & Nutrition</option>
                      <option value="Health">🏥 Health & Diseases</option>
                      <option value="Equipment">🛠️ Equipment & Housing</option>
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
                      :disabled="isUpdating"
                    >
                      <option disabled value="">Select urgency</option>
                      <option value="Low">🟢 Low Priority</option>
                      <option value="Normal">🟡 Normal Priority</option>
                      <option value="High">🟠 High Priority</option>
                      <option value="Critical">🔴 Critical</option>
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
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Who can see this question?
                  <span class="text-red-500">*</span>
                </label>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <label class="relative flex items-center p-2 border-2 rounded-xl cursor-pointer transition-all duration-300" 
                         :class="editForm.visibility === 'all' ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'"
                         @click="!isUpdating && (editForm.visibility = 'all')">
                    <input 
                      type="radio" 
                      v-model="editForm.visibility" 
                      value="all" 
                      class="sr-only"
                      required
                      :disabled="isUpdating"
                    />
                    <div class="flex items-center gap-2">
                      <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                           :class="editForm.visibility === 'all' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'">
                        <div v-if="editForm.visibility === 'all'" class="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <div class="font-semibold text-sm text-gray-900 flex items-center gap-1">
                          🌍 Visible to All
                        </div>
                        <div class="text-xs text-gray-600">Everyone can see and answer</div>
                      </div>
                    </div>
                  </label>
                  
                  <label class="relative flex items-center p-2 border-2 rounded-xl cursor-pointer transition-all duration-300" 
                         :class="editForm.visibility === 'farmers' ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'"
                         @click="!isUpdating && (editForm.visibility = 'farmers')">
                    <input 
                      type="radio" 
                      v-model="editForm.visibility" 
                      value="farmers" 
                      class="sr-only"
                      :disabled="isUpdating"
                    />
                    <div class="flex items-center gap-2">
                      <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                           :class="editForm.visibility === 'farmers' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'">
                        <div v-if="editForm.visibility === 'farmers'" class="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <div class="font-semibold text-sm text-gray-900 flex items-center gap-1">
                          🔒 Farmers Only
                        </div>
                        <div class="text-xs text-gray-600">Only farmers can answer</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  @click="closeEditModal"
                  class="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-1 text-sm"
                  :disabled="isUpdating"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>

                <button
                  type="submit"
                  :disabled="!isEditFormValid || isUpdating"
                  class="flex-1 px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-1 shadow-lg text-sm"
                  :class="[
                    isEditFormValid && !isUpdating
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  <div v-if="isUpdating" class="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ isUpdating ? 'Updating...' : 'Update Question' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Question Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="closeDeleteModal"
      >
        <div 
          class="bg-white rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 overflow-hidden"
        >
          <!-- Gradient Header -->
          <div class="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 p-3 sm:p-4 relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div class="absolute top-4 right-4 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
              <div class="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
            </div>
            
            <div class="relative flex items-center justify-between">
              <div class="flex items-center gap-2 sm:gap-3">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                
                <div>
                  <h2 class="text-lg sm:text-xl font-bold text-white">Delete Question</h2>
                  <p class="text-red-100 text-xs font-medium">This action cannot be undone</p>
                </div>
              </div>
              
              <button
                @click="closeDeleteModal"
                class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors duration-200"
                :disabled="isDeleting"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isDeleting" class="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div class="text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
              <p class="text-sm text-gray-600">Deleting your question...</p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Warning Icon -->
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <!-- Warning Text -->
            <h3 class="text-lg font-bold text-gray-900 mb-2 text-center">Are you absolutely sure?</h3>
            <p class="text-gray-600 mb-4 text-center text-sm">
              This will permanently delete your question and all its answers. This action cannot be undone.
            </p>

            <!-- Question Preview -->
            <div class="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-3 mb-4">
              <p class="text-sm font-semibold text-gray-900 mb-1">Question to be deleted:</p>
              <p class="text-sm text-gray-700 italic">"{{ question.title }}"</p>
              <div class="mt-2 flex items-center gap-2 text-xs text-gray-600">
                <span class="bg-white px-2 py-1 rounded-md border border-red-200">
                  {{ answersCount }} {{ answersText }}
                </span>
                <span class="bg-white px-2 py-1 rounded-md border border-red-200">
                  {{ question.views || 0 }} views
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                @click="closeDeleteModal"
                class="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-1 text-sm"
                :disabled="isDeleting"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>

              <button
                type="button"
                @click="handleDelete"
                :disabled="isDeleting"
                class="flex-1 px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-1 shadow-lg text-sm"
                :class="[
                  !isDeleting
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                <div v-if="isDeleting" class="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {{ isDeleting ? 'Deleting...' : 'Yes, Delete Question' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { forumService } from '@/services/forumService';
import { ProfileService } from '@/services/profileService';
import type { ForumQuestion } from '@/services/forumService';

const props = defineProps<{
  question: ForumQuestion;
}>();

const emit = defineEmits<{
  openComments: [question: ForumQuestion];
  showToast: [message: string];
  questionUpdated: [question: ForumQuestion];
  questionDeleted: [questionId: number];
}>();

const authStore = useAuthStore();

// Modal states
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const isUpdating = ref(false);
const isDeleting = ref(false);

// Profile pictures
const userProfilePicture = ref<string | null>(null);
const firstAnswerProfilePicture = ref<string | null>(null);
const imageLoadError = ref(false);
const answerImageLoadError = ref(false);

// Edit form
const editForm = ref({
  title: '',
  description: '',
  category: '',
  urgency: '',
  visibility: 'all' as 'all' | 'farmers'
});

// Fetch user profile picture
const fetchUserProfilePicture = async () => {
  if (!props.question.userId) return;
  
  try {
    const profile = await ProfileService.getProfile(props.question.userId);
    if (profile && profile.profilePicture) {
      userProfilePicture.value = profile.profilePicture;
    }
  } catch (error) {
    console.error('Error fetching user profile picture:', error);
  }
};

// Fetch first answer user profile picture
const fetchFirstAnswerProfilePicture = async () => {
  if (!hasAnswers.value || !props.question.answers[0].userId) return;
  
  try {
    const profile = await ProfileService.getProfile(props.question.answers[0].userId);
    if (profile && profile.profilePicture) {
      firstAnswerProfilePicture.value = profile.profilePicture;
    }
  } catch (error) {
    console.error('Error fetching answer user profile picture:', error);
  }
};

// Handle image load error
const handleImageError = () => {
  imageLoadError.value = true;
  userProfilePicture.value = null;
};

const handleAnswerImageError = () => {
  answerImageLoadError.value = true;
  firstAnswerProfilePicture.value = null;
};

// Computed properties
const isQuestionOwner = computed(() => {
  return authStore.userId === props.question.userId;
});

const userInitials = computed(() => {
  const name = props.question.userFullName || 'User';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
});

const firstAnswerInitials = computed(() => {
  if (!hasAnswers.value) return '';
  const name = firstAnswerUserName.value;
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
});

const voteScore = computed(() => {
  return (props.question.upvotes || 0) - (props.question.downvotes || 0);
});

const urgencyTagClass = computed(() => {
  const urgencyClasses = {
    'Low': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
    'Normal': 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
    'High': 'bg-gradient-to-r from-orange-400 to-orange-500 text-white',
    'Critical': 'bg-gradient-to-r from-red-500 to-red-600 text-white'
  };
  return urgencyClasses[props.question.urgency as keyof typeof urgencyClasses] || urgencyClasses['Normal'];
});

const truncatedDescription = computed(() => {
  if (!props.question.description) return '';
  return props.question.description.length > 200 
    ? props.question.description.substring(0, 197) + '...' 
    : props.question.description;
});

const answersCount = computed(() => {
  return props.question.answers ? props.question.answers.length : 0;
});

const answersText = computed(() => {
  return answersCount.value === 1 ? 'Answer' : 'Answers';
});

const hasAnswers = computed(() => {
  return answersCount.value > 0;
});

const firstAnswerRole = computed(() => {
  return hasAnswers.value ? (props.question.answers[0].userRole || 'User') : '';
});

const firstAnswerUserName = computed(() => {
  if (!hasAnswers.value) return '';
  return props.question.answers[0].userFullName || 'Unknown User';
});

const truncatedFirstAnswer = computed(() => {
  if (!hasAnswers.value) return '';
  const firstAnswer = props.question.answers[0].text || '';
  return firstAnswer.length > 120 
    ? firstAnswer.substring(0, 117) + '...' 
    : firstAnswer;
});

const viewAllText = computed(() => {
  return `View all ${answersCount.value}`;
});

const viewsText = computed(() => {
  const views = props.question.views || 0;
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k views`;
  }
  return `${views} ${views === 1 ? 'view' : 'views'}`;
});

const isEditFormValid = computed(() => {
  return (
    editForm.value.title.trim().length > 0 &&
    editForm.value.category &&
    editForm.value.urgency &&
    editForm.value.visibility &&
    editForm.value.title.length <= 150 &&
    (editForm.value.description ? editForm.value.description.length : 0) <= 1000
  );
});

// Methods
const handleUpvote = async () => {
  if (!authStore.userId) {
    emit('showToast', 'Please sign in to vote');
    return;
  }

  try {
    const result = await forumService.voteQuestion(
      props.question.id,
      authStore.userId,
      'up'
    );
    
    props.question.upvotes = result.upvotes;
    props.question.downvotes = result.downvotes;
    props.question.userVote = result.userVote;
    
    emit('showToast', result.userVote === 'up' ? 'Upvoted!' : 'Vote removed');
  } catch (error) {
    console.error('Error voting:', error);
    emit('showToast', 'Failed to register vote');
  }
};

const handleDownvote = async () => {
  if (!authStore.userId) {
    emit('showToast', 'Please sign in to vote');
    return;
  }

  try {
    const result = await forumService.voteQuestion(
      props.question.id,
      authStore.userId,
      'down'
    );
    
    props.question.upvotes = result.upvotes;
    props.question.downvotes = result.downvotes;
    props.question.userVote = result.userVote;
    
    emit('showToast', result.userVote === 'down' ? 'Downvoted!' : 'Vote removed');
  } catch (error) {
    console.error('Error voting:', error);
    emit('showToast', 'Failed to register vote');
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  const now = new Date();
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}m ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays)}d ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
};

// Edit Modal Methods
const openEditModal = () => {
  editForm.value = {
    title: props.question.title,
    description: props.question.description || '',
    category: props.question.category || '',
    urgency: props.question.urgency || '',
    visibility: props.question.visibility || 'all'
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  if (!isUpdating.value) {
    showEditModal.value = false;
  }
};

const handleEditSubmit = async () => {
  if (!isEditFormValid.value || isUpdating.value) {
    return;
  }

  try {
    isUpdating.value = true;

    const updatedQuestion = await forumService.updateQuestion(
      props.question.id,
      {
        title: editForm.value.title.trim(),
        description: editForm.value.description.trim(),
        category: editForm.value.category,
        urgency: editForm.value.urgency,
        visibility: editForm.value.visibility
      }
    );

    // Update local question data
    Object.assign(props.question, updatedQuestion);

    emit('questionUpdated', props.question);
    emit('showToast', 'Question updated successfully!');
    showEditModal.value = false;
  } catch (error) {
    console.error('Error updating question:', error);
    emit('showToast', 'Failed to update question');
  } finally {
    isUpdating.value = false;
  }
};

// Delete Modal Methods
const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  if (!isDeleting.value) {
    showDeleteModal.value = false;
  }
};

const handleDelete = async () => {
  if (isDeleting.value) {
    return;
  }

  try {
    isDeleting.value = true;

    await forumService.deleteQuestion(props.question.id);

    emit('questionDeleted', props.question.id);
    emit('showToast', 'Question deleted successfully');
    showDeleteModal.value = false;
  } catch (error) {
    console.error('Error deleting question:', error);
    emit('showToast', 'Failed to delete question');
  } finally {
    isDeleting.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  // Fetch profile pictures when component mounts
  fetchUserProfilePicture();
  if (hasAnswers.value) {
    fetchFirstAnswerProfilePicture();
  }
});
</script>