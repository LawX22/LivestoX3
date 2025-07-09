<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow w-full max-w-lg relative">
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
        >
          ✕
        </button>

        <form @submit.prevent="handleSubmit" class="space-y-4 mt-4">
          <h2 class="text-lg font-semibold text-gray-700">Post New Livestock</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Animal Name</label>
              <input v-model="animal.name" type="text" class="input-style" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Breed</label>
              <input v-model="animal.breed" type="text" class="input-style" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Age</label>
              <input v-model.number="animal.age" type="number" min="0" class="input-style" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Price (₱)</label>
              <input v-model.number="animal.price" type="number" min="0" class="input-style" required />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
            <input
              v-model="animal.image"
              type="text"
              placeholder="/src/assets/Bull.jpg"
              class="input-style w-full"
              required
            />
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Animal, defaultAnimal } from '../../services/animalData'

const props = defineProps<{
  visible: boolean
}>()

const emits = defineEmits(['close', 'submit'])

const animal = ref<Animal>({ ...defaultAnimal })

watch(
  () => props.visible,
  (val) => {
    if (val) animal.value = { ...defaultAnimal }
  }
)

function closeModal() {
  emits('close')
}

function handleSubmit() {
  emits('submit', {
    ...animal.value,
    id: Date.now(),
    ownerEmail: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).email : '',
  })
  closeModal()
}
</script>
