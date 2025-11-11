<!-- Toast.vue -->
<template>
  <Transition name="toast">
    <div v-if="visible" 
      class="fixed top-20 right-6 z-[9999] max-w-md animate-slide-in-right">
      <div :class="[
        'rounded-2xl shadow-2xl overflow-hidden',
        type === 'success' ? 'bg-white border-l-4 border-green-500' : 'bg-white border-l-4 border-red-500'
      ]">
        <div class="p-4">
          <div class="flex items-start">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <div :class="[
                'w-12 h-12 rounded-full flex items-center justify-center',
                type === 'success' ? 'bg-green-100' : 'bg-red-100'
              ]">
                <!-- Success Icon -->
                <svg v-if="type === 'success'" class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                
                <!-- Error Icon -->
                <svg v-else class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <!-- Content -->
            <div class="ml-4 flex-1">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ title }}
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                {{ message }}
              </p>
            </div>

            <!-- Close Button -->
            <button @click="close" 
              class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="h-1 bg-gray-100">
          <div :class="[
            'h-full transition-all duration-300 ease-linear',
            type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-rose-500'
          ]"
            :style="{ width: progress + '%' }">
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

interface Props {
  visible: boolean
  type?: 'success' | 'error'
  title?: string
  message?: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  title: 'Success!',
  message: 'Operation completed successfully.',
  duration: 4000
})

const emit = defineEmits<{
  close: []
}>()

const progress = ref(100)
let progressInterval: ReturnType<typeof setInterval> | null = null
let closeTimeout: ReturnType<typeof setTimeout> | null = null

const close = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  emit('close')
}

watch(() => props.visible, (newVal) => {
  if (newVal) {
    progress.value = 100
    
    // Start progress bar animation
    const steps = 50
    const stepDuration = props.duration / steps
    let currentStep = 0

    progressInterval = setInterval(() => {
      currentStep++
      progress.value = 100 - (currentStep / steps) * 100
      
      if (currentStep >= steps) {
        if (progressInterval) {
          clearInterval(progressInterval)
          progressInterval = null
        }
      }
    }, stepDuration)

    // Auto close after duration
    closeTimeout = setTimeout(() => {
      close()
    }, props.duration)
  } else {
    progress.value = 100
    if (progressInterval) {
      clearInterval(progressInterval)
      progressInterval = null
    }
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      closeTimeout = null
    }
  }
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
  if (closeTimeout) {
    clearTimeout(closeTimeout)
  }
})
</script>

<style scoped>
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out-right {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-active {
  animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-leave-active {
  animation: slide-out-right 0.3s cubic-bezier(0.4, 0, 1, 1);
}
</style>