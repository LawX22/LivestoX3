<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-green-600 mb-6">Livestock Forum</h1>

      <!-- Notice for Guests -->
      <div v-if="!currentUser"
        class="bg-yellow-100 text-yellow-800 px-4 py-3 rounded mb-4 flex items-center justify-between">
        <span>You are viewing as a guest. Sign in to ask or answer questions.</span>
        <router-link to="/signin"
          class="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition text-sm">
          Sign In
        </router-link>
      </div>


      <!-- Ask Question Form -->
      <form v-if="currentUser" @submit.prevent="postQuestion" class="bg-white p-4 rounded shadow space-y-4 mb-8">
        <h2 class="text-lg font-semibold text-gray-700">Ask a Question</h2>
        <textarea v-model="newQuestion.text" placeholder="Type your question here..." class="input-style w-full h-24"
          required></textarea>

        <div>
          <label class="block text-sm font-medium text-gray-700">Who can answer?</label>
          <select v-model="newQuestion.visibility" class="input-style">
            <option value="all">All Users</option>
            <option value="farmers">Only Farmers</option>
          </select>
        </div>

        <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Post Question
        </button>
      </form>

      <!-- Questions List -->
      <div class="space-y-6">
        <div v-for="question in forumQuestions" :key="question.id" class="bg-white p-4 rounded shadow">
          <h3 class="text-lg font-medium text-gray-800">{{ question.text }}</h3>
          <p class="text-sm text-gray-500 mt-1">
            Asked by: {{ question.userEmail }} ({{ question.userRole }})
          </p>
          <p class="text-xs text-gray-400">Answers: {{ question.answers.length }}</p>

          <!-- Answers -->
          <div class="mt-4 space-y-2">
            <div v-for="(answer, index) in question.answers" :key="index" class="bg-gray-50 p-2 rounded">
              <p class="text-sm">{{ answer.text }}</p>
              <p class="text-xs text-gray-500">— {{ answer.userEmail }} ({{ answer.userRole }})</p>
            </div>
          </div>

          <!-- Answer Form -->
          <div v-if="currentUser && canAnswer(question)" class="mt-4">
            <textarea v-model="question.tempAnswer" placeholder="Write your answer..."
              class="input-style w-full h-20 mb-2"></textarea>
            <button @click="submitAnswer(question)"
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import NavBar from '../../components/NavBar.vue'
import { getCurrentUser } from '../../services/users'
import { forumQuestions as defaultForumData, ForumQuestion } from '../../services/forumData'

const LOCAL_KEY = 'livestox_forum_data'
const currentUser = getCurrentUser()

const forumQuestions = ref<ForumQuestion[]>([])
const newQuestion = ref({
  text: '',
  visibility: 'all'
})

// Load saved or default data
onMounted(() => {
  const saved = localStorage.getItem(LOCAL_KEY)
  forumQuestions.value = saved ? JSON.parse(saved) : [...defaultForumData]
})

// Save to localStorage
watch(
  forumQuestions,
  (newVal) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(newVal))
  },
  { deep: true }
)

// Post a new question
function postQuestion() {
  if (!currentUser) return

  forumQuestions.value.unshift({
    id: Date.now(),
    text: newQuestion.value.text,
    userEmail: currentUser.email,
    userRole: currentUser.role,
    visibility: newQuestion.value.visibility as 'all' | 'farmers',
    answers: [],
    tempAnswer: ''
  })

  newQuestion.value.text = ''
  newQuestion.value.visibility = 'all'
}

// Check if current user can answer
function canAnswer(question: ForumQuestion): boolean {
  if (!currentUser) return false
  return question.visibility === 'all' || (question.visibility === 'farmers' && currentUser.role === 'Farmer')
}

// Submit an answer
function submitAnswer(question: ForumQuestion) {
  if (!currentUser || !question.tempAnswer?.trim()) return

  question.answers.push({
    text: question.tempAnswer,
    userEmail: currentUser.email,
    userRole: currentUser.role
  })

  question.tempAnswer = ''
}
</script>
