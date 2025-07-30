<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <div class="container mx-auto px-4 py-8">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-green-700">Livestock Forum</h1>
          <p class="text-gray-600">Connect with farmers, buyers, and experts</p>
        </div>
        
        <!-- Ask Question Button -->
        <div v-if="currentUser && currentUser.role !== 'Admin'" class="flex-shrink-0">
          <button 
            @click="showModal = true" 
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Ask a Question
          </button>
        </div>
      </div>

      <!-- Guest Notice -->
      <div v-if="!currentUser" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-start">
            <svg class="h-5 w-5 text-yellow-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <p class="text-yellow-700">You are viewing as a guest. Sign in to ask or answer questions.</p>
          </div>
          <router-link 
            to="/signin" 
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Sign In
          </router-link>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar (Categories/Filters) -->
        <div class="lg:col-span-1 space-y-4">
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <h3 class="font-semibold text-lg mb-4 text-gray-800">Categories</h3>
            <ul class="space-y-2">
              <li v-for="cat in categories" :key="cat" class="flex items-center">
                <input 
                  type="checkbox" 
                  :id="cat" 
                  :value="cat" 
                  v-model="selectedCategories" 
                  class="mr-2 rounded text-green-600 focus:ring-green-500"
                >
                <label :for="cat" class="text-gray-700 cursor-pointer">{{ cat }}</label>
              </li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm">
            <h3 class="font-semibold text-lg mb-4 text-gray-800">Urgency</h3>
            <select 
              v-model="selectedUrgency" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Urgency Levels</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <!-- Questions List -->
        <div class="lg:col-span-3">
          <div v-if="filteredQuestions.length === 0" class="bg-white p-8 rounded-xl shadow-sm text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">No questions found</h3>
            <p class="mt-1 text-gray-500">Try adjusting your filters or be the first to ask a question!</p>
            <button 
              v-if="currentUser && currentUser.role !== 'Admin'" 
              @click="showModal = true" 
              class="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Ask a Question
            </button>
          </div>

          <div v-else class="space-y-6">
            <div
              v-for="question in filteredQuestions"
              :key="question.id"
              class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <!-- Question Header -->
              <div class="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span 
                      v-if="question.urgency === 'High'" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      Urgent
                    </span>
                    <span 
                      v-if="question.category" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ question.category }}
                    </span>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-1">{{ question.text }}</h3>
                  <div class="flex items-center text-sm text-gray-500 space-x-4">
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {{ question.userRole }}: {{ question.userEmail }}
                    </span>
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ formatDate(question.createdAt) }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {{ question.answers.length }} answers
                  </span>
                </div>
              </div>

              <!-- Answers Section -->
              <div class="mt-6 space-y-4">
                <div 
                  v-for="(answer, i) in question.answers"
                  :key="i"
                  class="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <p class="text-gray-700">{{ answer.text }}</p>
                  <div class="mt-2 flex items-center text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ answer.userRole }}: {{ answer.userEmail }}
                  </div>
                </div>

                <!-- Answer Form -->
                <div v-if="currentUser && canAnswer(question)" class="mt-6">
                  <label for="answer" class="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
                  <textarea
                    v-model="question.tempAnswer"
                    id="answer"
                    placeholder="Write your detailed answer here..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows="4"
                  />
                  <div class="mt-3 flex justify-end">
                    <button
                      @click="submitAnswer(question)"
                      class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                      :disabled="!question.tempAnswer?.trim()"
                      :class="{'opacity-50 cursor-not-allowed': !question.tempAnswer?.trim()}"
                    >
                      Post Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <AskQuestionModal 
      :visible="showModal" 
      @submit="handlePostQuestion" 
      @close="showModal = false" 
      :categories="categories"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import NavBar from '../../components/NavBar.vue'
import AskQuestionModal from '../../components/Forum/AskQuestionModal.vue'
import { getCurrentUser } from '../../services/user'

interface ForumAnswer {
  text: string
  userEmail: string
  userRole: string
}

interface ForumQuestion {
  id: number
  text: string
  userEmail: string
  userRole: string
  createdAt: string
  answers: ForumAnswer[]
  visibility: 'all' | 'farmers'
  category?: string
  urgency?: string
  tempAnswer?: string
}

const LOCAL_KEY = 'livestox_forum_data'
const currentUser = getCurrentUser()
const forumQuestions = ref<ForumQuestion[]>([])
const showModal = ref(false)
const selectedCategories = ref<string[]>([])
const selectedUrgency = ref('all')

const categories = ['Poultry', 'Swine', 'Cattle', 'Goat', 'Sheep', 'Feed', 'Health', 'Equipment']

// Default questions data
const defaultQuestions: ForumQuestion[] = [
  {
    id: 1,
    text: 'What are the best practices for raising healthy chickens?',
    userEmail: 'farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: '2024-01-15T10:30:00.000Z',
    answers: [
      {
        text: 'Make sure to provide clean water, quality feed, and proper ventilation in the coop. Regular cleaning and vaccination are also essential for maintaining healthy chickens.',
        userEmail: 'expert@gmail.com',
        userRole: 'Expert'
      },
      {
        text: 'I recommend using organic feed if possible, it makes a noticeable difference in egg quality.',
        userEmail: 'buyer@gmail.com',
        userRole: 'Buyer'
      }
    ],
    visibility: 'all',
    category: 'Poultry',
    urgency: 'Normal'
  },
  {
    id: 2,
    text: 'How to prevent common diseases in pigs?',
    userEmail: 'farmer@gmail.com',
    userRole: 'Farmer',
    createdAt: '2024-01-20T14:45:00.000Z',
    answers: [
      {
        text: 'Biosecurity measures are crucial. Limit visitors to your farm, disinfect boots and equipment, and quarantine new animals before introducing them to your herd.',
        userEmail: 'vet@gmail.com',
        userRole: 'Veterinarian'
      }
    ],
    visibility: 'farmers',
    category: 'Swine',
    urgency: 'High'
  },
  {
    id: 3,
    text: 'Where can I find quality cattle feed in Luzon?',
    userEmail: 'buyer@gmail.com',
    userRole: 'Buyer',
    createdAt: '2024-02-01T09:15:00.000Z',
    answers: [],
    visibility: 'all',
    category: 'Cattle',
    urgency: 'Normal'
  },
  {
    id: 4,
    text: 'Best breed of goats for milk production in tropical climate?',
    userEmail: 'farmer2@gmail.com',
    userRole: 'Farmer',
    createdAt: '2024-02-10T11:20:00.000Z',
    answers: [
      {
        text: 'Saanen goats are excellent milk producers but may need shade in tropical areas. Anglo-Nubians are also good and adapt better to heat.',
        userEmail: 'expert@gmail.com',
        userRole: 'Expert'
      }
    ],
    visibility: 'all',
    category: 'Goat',
    urgency: 'Low'
  }
]

// Load data
onMounted(() => {
  const saved = localStorage.getItem(LOCAL_KEY)
  forumQuestions.value = saved ? JSON.parse(saved) : [...defaultQuestions]
})

// Auto-save
watch(forumQuestions, (val) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(val))
}, { deep: true })

// Filter questions based on visibility and filters
const filteredQuestions = computed(() => {
  let questions = forumQuestions.value
  
  // Filter by visibility
  if (!currentUser) {
    questions = questions.filter(q => q.visibility === 'all')
  } else if (currentUser.role === 'Buyer') {
    questions = questions.filter(q => q.visibility === 'all')
  }
  
  // Filter by category
  if (selectedCategories.value.length > 0) {
    questions = questions.filter(q => q.category && selectedCategories.value.includes(q.category))
  }
  
  // Filter by urgency
  if (selectedUrgency.value !== 'all') {
    questions = questions.filter(q => q.urgency === selectedUrgency.value)
  }
  
  return questions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

// Handle New Question
function handlePostQuestion(question: ForumQuestion) {
  if (!currentUser) return

  forumQuestions.value.unshift({
    ...question,
    id: Date.now(),
    userEmail: currentUser.email,
    userRole: currentUser.role,
    createdAt: new Date().toISOString(),
    answers: [],
    tempAnswer: ''
  })

  showModal.value = false
}

// Answer Permission
function canAnswer(q: ForumQuestion) {
  if (!currentUser) return false
  if (currentUser.role === 'Admin') return true
  return q.visibility === 'all' || (q.visibility === 'farmers' && currentUser.role === 'Farmer')
}

// Submit Answer
function submitAnswer(q: ForumQuestion) {
  if (!currentUser || !q.tempAnswer?.trim()) return

  const answer: ForumAnswer = {
    text: q.tempAnswer.trim(),
    userEmail: currentUser.email,
    userRole: currentUser.role
  }

  q.answers.push(answer)
  q.tempAnswer = ''
}

// Format date
function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>