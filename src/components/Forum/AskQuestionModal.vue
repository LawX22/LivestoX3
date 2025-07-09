<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow w-full max-w-lg relative">
        <form @submit.prevent="handleSubmit" class="space-y-4 mt-4">
          <h2 class="text-lg font-semibold text-gray-700">Ask a Question</h2>

          <!-- Question -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Your Question</label>
            <textarea v-model="question.text" rows="3" class="input-style w-full" required />
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <select v-model="question.category" class="input-style w-full" required>
              <option disabled value="">Select category</option>
              <option value="Feeding">Feeding</option>
              <option value="Health">Health</option>
              <option value="Breeding">Breeding</option>
              <option value="Housing">Housing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <!-- Urgency -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Urgency</label>
            <select v-model="question.urgency" class="input-style w-full" required>
              <option disabled value="">Select urgency</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <!-- Visibility -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Visibility</label>
            <select v-model="question.visibility" class="input-style w-full" required>
              <option disabled value="">Select visibility</option>
              <option value="all">Visible to All</option>
              <option value="farmers">Visible to Farmers Only</option>
            </select>
          </div>

          <!-- Buttons -->
          <div class="flex justify-between items-center mt-6">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="!isFormValid"
              :class="[
                'px-4 py-2 rounded transition',
                isFormValid
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Post Question
            </button>
          </div>
        </form>
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

<style scoped>
.input-style {
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.375rem;
  width: 100%;
}
</style>
