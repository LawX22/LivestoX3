<!-- AskQuestionModal.vue -->
<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <!-- Modal Container with Enhanced Design -->
      <div 
        class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative transform transition-all duration-300 overflow-hidden"
        :class="[
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          'max-h-[80vh] sm:max-h-[85vh] md:max-h-[90vh]'
        ]"
      >
        <!-- Gradient Header -->
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-4 sm:p-6 relative overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div class="absolute top-4 right-4 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
            <div class="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
          </div>
          
          <div class="relative flex items-center justify-between">
            <div class="flex items-center gap-2 sm:gap-4">
              <!-- Icon -->
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              
              <!-- Title -->
              <div>
                <h2 class="text-xl sm:text-2xl font-bold text-white">Ask a Question</h2>
                <p class="text-green-100 text-xs sm:text-sm font-medium">Share your question with the community</p>
              </div>
            </div>
            
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 group"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form Content -->
        <div class="p-4 sm:p-6 overflow-y-auto" style="max-height: calc(80vh - 104px);">
          <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
            <!-- Question Input -->
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Your Question
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <textarea 
                  v-model="question.text" 
                  rows="3" 
                  class="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none bg-gradient-to-br from-gray-50 to-white placeholder-gray-400"
                  placeholder="Describe your question in detail..."
                  required 
                />
                <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                  {{ question.text.length }}/500
                </div>
              </div>
            </div>

            <!-- Two Column Layout for Selects -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <!-- Category -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Category
                  <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="question.category" 
                    class="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white appearance-none cursor-pointer"
                    required
                  >
                    <option disabled value="">Select category</option>
                    <option value="Feeding">🌾 Feeding</option>
                    <option value="Health">🏥 Health</option>
                    <option value="Breeding">🐣 Breeding</option>
                    <option value="Housing">🏠 Housing</option>
                    <option value="Other">❓ Other</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Urgency -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Urgency Level
                  <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="question.urgency" 
                    class="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white appearance-none cursor-pointer"
                    required
                  >
                    <option disabled value="">Select urgency</option>
                    <option value="Low">🟢 Low Priority</option>
                    <option value="Medium">🟡 Medium Priority</option>
                    <option value="High">🔴 High Priority</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visibility -->
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Who can see this question?
                <span class="text-red-500">*</span>
              </label>
              
              <!-- Radio Button Style Selection -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <label class="relative flex items-center p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-300" 
                       :class="question.visibility === 'all' ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'">
                  <input 
                    type="radio" 
                    v-model="question.visibility" 
                    value="all" 
                    class="sr-only"
                    required
                  />
                  <div class="flex items-center gap-2 sm:gap-3">
                    <div class="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all"
                         :class="question.visibility === 'all' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'">
                      <div v-if="question.visibility === 'all'" class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div class="font-semibold text-sm sm:text-base text-gray-900 flex items-center gap-1 sm:gap-2">
                        🌍 Visible to All
                      </div>
                      <div class="text-xs sm:text-sm text-gray-600">Everyone can see and answer</div>
                    </div>
                  </div>
                </label>
                
                <label class="relative flex items-center p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-300" 
                       :class="question.visibility === 'farmers' ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'">
                  <input 
                    type="radio" 
                    v-model="question.visibility" 
                    value="farmers" 
                    class="sr-only"
                  />
                  <div class="flex items-center gap-2 sm:gap-3">
                    <div class="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all"
                         :class="question.visibility === 'farmers' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'">
                      <div v-if="question.visibility === 'farmers'" class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div class="font-semibold text-sm sm:text-base text-gray-900 flex items-center gap-1 sm:gap-2">
                        🔒 Farmers Only
                      </div>
                      <div class="text-xs sm:text-sm text-gray-600">Only farmers can answer</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Help Text -->
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-3 sm:p-4">
              <div class="flex items-start gap-2 sm:gap-3">
                <div class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-sm sm:text-base text-blue-900 mb-1">Tips for better answers:</h4>
                  <ul class="text-xs sm:text-sm text-blue-800 space-y-1">
                    <li>• Be specific about your location and climate</li>
                    <li>• Include details about your current setup</li>
                    <li>• Mention any symptoms or problems clearly</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>

              <button
                type="submit"
                :disabled="!isFormValid"
                class="flex-1 px-4 py-2 sm:px-8 sm:py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-lg text-sm sm:text-base"
                :class="[
                  isFormValid
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Post Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ForumQuestion } from '../../services/forumData'

const props = defineProps<{ visible: boolean }>()
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'submit', question: ForumQuestion): void
}>()

const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

const question = ref<ForumQuestion>({
  id: 0,
  text: '',
  userEmail: currentUser.email || '',
  userRole: currentUser.role || 'Buyer',
  visibility: 'all',
  category: '',
  urgency: '',
  createdAt: '',
  answers: []
})

watch(
  () => props.visible,
  (val) => {
    if (val) {
      question.value = {
        id: Date.now(),
        text: '',
        userEmail: currentUser.email || '',
        userRole: currentUser.role || 'Buyer',
        visibility: 'all',
        category: '',
        urgency: '',
        createdAt: new Date().toISOString(),
        answers: []
      }
    }
  }
)

const isFormValid = computed(() => {
  return (
    question.value.text.trim() &&
    question.value.category &&
    question.value.urgency &&
    question.value.visibility
  )
})

function closeModal() {
  emits('close')
}

function handleSubmit() {
  if (!isFormValid.value) return
  emits('submit', { ...question.value })
  closeModal()
}
</script>