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
          'max-h-[95vh]'
        ]"
      >
        <!-- Gradient Header -->
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-3 sm:p-4 relative overflow-hidden">
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
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              
              <!-- Title -->
              <div>
                <h2 class="text-lg sm:text-xl font-bold text-white">Ask a Question</h2>
                <p class="text-green-100 text-xs font-medium">Share your question with the community</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Content -->
        <div class="p-4 overflow-y-auto" style="max-height: calc(95vh - 80px);">
          <form @submit.prevent="handleSubmit" class="space-y-3">
            <!-- Question Title -->
            <div class="space-y-1">
              <label class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Question Title
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input 
                  v-model="question.title" 
                  type="text"
                  class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white placeholder-gray-400"
                  placeholder="Summarize your question in a few words..."
                  required 
                />
                <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                  {{ question.title.length }}/150
                </div>
              </div>
            </div>

            <!-- Question Description -->
            <div class="space-y-1">
              <label class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Detailed Description
              </label>
              <div class="relative">
                <textarea 
                  v-model="question.description" 
                  rows="4" 
                  class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none bg-gradient-to-br from-gray-50 to-white placeholder-gray-400"
                  placeholder="Provide more details about your situation, location, current setup, symptoms, etc. The more information you provide, the better answers you'll receive."
                />
                <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                  {{ question.description ? question.description.length : 0 }}/1000
                </div>
              </div>
            </div>

            <!-- Two Column Layout for Selects -->
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
                    v-model="question.category" 
                    class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white appearance-none cursor-pointer"
                    required
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
                    v-model="question.urgency" 
                    class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white appearance-none cursor-pointer"
                    required
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
              
              <!-- Radio Button Style Selection -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label class="relative flex items-center p-2 border-2 rounded-xl cursor-pointer transition-all duration-300" 
                       :class="question.visibility === 'all' ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'">
                  <input 
                    type="radio" 
                    v-model="question.visibility" 
                    value="all" 
                    class="sr-only"
                    required
                  />
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                         :class="question.visibility === 'all' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'">
                      <div v-if="question.visibility === 'all'" class="w-1.5 h-1.5 bg-white rounded-full"></div>
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
                       :class="question.visibility === 'farmers' ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'">
                  <input 
                    type="radio" 
                    v-model="question.visibility" 
                    value="farmers" 
                    class="sr-only"
                  />
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                         :class="question.visibility === 'farmers' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'">
                      <div v-if="question.visibility === 'farmers'" class="w-1.5 h-1.5 bg-white rounded-full"></div>
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
                @click="closeModal"
                class="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-1 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>

              <button
                type="submit"
                :disabled="!isFormValid"
                class="flex-1 px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-1 shadow-lg text-sm"
                :class="[
                  isFormValid
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

// Type definitions
interface User {
  email: string;
  role: 'Farmer' | 'Buyer' | 'Veterinarian' | 'Poultry Specialist' | 'Agribusiness Consultant';
}

interface ForumAnswer {
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

// Props and emits
const props = defineProps<{
  visible: boolean;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', question: ForumQuestion): void;
}>();

// Get current user
const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error('Error parsing user from localStorage:', e);
    return null;
  }
};

const currentUser = getCurrentUser();

// Reactive data
const question = ref<ForumQuestion>({
  id: 0,
  title: '',
  description: '',
  userEmail: currentUser?.email || '',
  userRole: currentUser?.role || 'Buyer',
  visibility: 'all',
  category: '',
  urgency: '',
  createdAt: '',
  answers: []
});

// Watch for visibility changes to reset form
watch(
  () => props.visible,
  (val) => {
    if (val) {
      question.value = {
        id: Date.now(),
        title: '',
        description: '',
        userEmail: currentUser?.email || '',
        userRole: currentUser?.role || 'Buyer',
        visibility: 'all',
        category: '',
        urgency: '',
        createdAt: new Date().toISOString(),
        answers: []
      };
    }
  }
);

// Computed properties
const isFormValid = computed(() => {
  return (
    question.value.title.trim() &&
    question.value.category &&
    question.value.urgency &&
    question.value.visibility &&
    question.value.title.length <= 150 &&
    (question.value.description ? question.value.description.length : 0) <= 1000
  );
});

// Methods
const closeModal = (): void => {
  emits('close');
};

const handleSubmit = (): void => {
  if (!isFormValid.value) return;
  emits('submit', { ...question.value });
  closeModal();
};
</script>