<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-green-600 mb-6">Livestock Forum</h1>

      <!-- Guest Notice -->
      <div v-if="!currentUser" class="bg-yellow-100 text-yellow-800 px-4 py-3 rounded mb-4 flex justify-between">
        <span>You are viewing as a guest. Sign in to ask or answer questions.</span>
        <router-link to="/signin" class="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 text-sm">
          Sign In
        </router-link>
      </div>

      <!-- Ask Button -->
      <div v-if="currentUser && currentUser.role !== 'Admin'" class="mb-6">
        <button @click="showModal = true" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-sm">
          + Ask a Question
        </button>
      </div>

      <!-- Questions List -->
      <div class="space-y-6">
        <div
          v-for="question in visibleQuestions"
          :key="question.id"
          class="bg-white p-5 rounded-lg shadow-md space-y-2"
        >
          <!-- Question Header -->
          <div class="flex justify-between items-start flex-wrap gap-y-2">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">{{ question.text }}</h3>
              <p class="text-xs text-gray-500">
                Posted on: {{ formatDate(question.createdAt) }}
              </p>
              <p class="text-sm text-gray-600">
                Asked by: <span class="font-medium">{{ question.userEmail }}</span> ({{ question.userRole }})
              </p>
            </div>
            <div class="space-x-2 text-xs">
              <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded" v-if="question.category">
                Category: {{ question.category }}
              </span>
              <span class="bg-red-100 text-red-600 px-2 py-1 rounded" v-if="question.urgency">
                Urgency: {{ question.urgency }}
              </span>
            </div>
          </div>

          <!-- Answer Count -->
          <p class="text-xs text-gray-400">Answers: {{ question.answers.length }}</p>

          <!-- Answers -->
          <div class="mt-3 space-y-2">
            <div
              v-for="(answer, i) in question.answers"
              :key="i"
              class="bg-gray-50 p-3 rounded border"
            >
              <p class="text-sm text-gray-800">{{ answer.text }}</p>
              <p class="text-xs text-gray-500">— {{ answer.userEmail }} ({{ answer.userRole }})</p>
            </div>
          </div>

          <!-- Answer Form -->
          <div v-if="currentUser && canAnswer(question)" class="mt-4">
            <textarea
              v-model="question.tempAnswer"
              placeholder="Write your answer..."
              class="input-style w-full h-20 mb-2"
            />
            <button
              @click="submitAnswer(question)"
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <AskQuestionModal :visible="showModal" @submit="handlePostQuestion" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import NavBar from '../../components/NavBar.vue'
import AskQuestionModal from '../../components/Forum/AskQuestionModal.vue'
import { getCurrentUser } from '../../services/users'
import {
  ForumQuestion,
  ForumAnswer,
  forumQuestions as defaultQuestions
} from '../../services/forumData'

const LOCAL_KEY = 'livestox_forum_data'
const currentUser = getCurrentUser()
const forumQuestions = ref<ForumQuestion[]>([])
const showModal = ref(false)

// Load data
onMounted(() => {
  const saved = localStorage.getItem(LOCAL_KEY)
  forumQuestions.value = saved ? JSON.parse(saved) : [...defaultQuestions]
})

// Auto-save
watch(forumQuestions, (val) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(val))
}, { deep: true })

// Filter questions
const visibleQuestions = computed(() => {
  if (!currentUser) return forumQuestions.value.filter(q => q.visibility === 'all')
  if (currentUser.role === 'Admin') return forumQuestions.value
  if (currentUser.role === 'Buyer') return forumQuestions.value.filter(q => q.visibility === 'all')
  return forumQuestions.value
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
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}
</script>

<style scoped>
.input-style {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 6px;
  width: 100%;
}
</style>
