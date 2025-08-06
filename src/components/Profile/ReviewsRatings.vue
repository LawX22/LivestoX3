<!-- ReviewsRatings.vue -->
<template>
  <div class="p-8 space-y-6 relative">
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div class="absolute top-8 right-12 w-8 h-8 bg-yellow-300 rounded-full animate-pulse"></div>
      <div class="absolute bottom-12 left-8 w-6 h-6 bg-amber-300 rounded-full animate-bounce"></div>
    </div>

    <!-- Header Section -->
    <section class="relative z-10">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h3>
          <p class="text-gray-600">Customer feedback and ratings about your {{ userRole === 'Farmer' ? 'farm and livestock' : 'profile' }}</p>
        </div>
        <div class="flex items-center">
          <div class="flex items-center mr-2">
            <svg class="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span class="text-xl font-bold text-gray-900 ml-1">4.8</span>
          </div>
          <span class="text-gray-600">(247 reviews)</span>
        </div>
      </div>

      <!-- Rating Summary -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Rating Breakdown -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Rating Breakdown</h4>
            <div class="space-y-3">
              <div v-for="i in 5" :key="i" class="flex items-center">
                <div class="flex items-center w-16">
                  <span class="text-sm font-medium text-gray-900 mr-2">{{ 6 - i }}</span>
                  <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mx-2">
                  <div 
                    class="h-full bg-yellow-400" 
                    :style="{ width: `${(ratingDistribution[5 - i] / totalReviews) * 100}%` }"
                  ></div>
                </div>
                <span class="text-sm text-gray-600 w-10 text-right">{{ ratingDistribution[5 - i] }}</span>
              </div>
            </div>
          </div>

          <!-- Rating Factors -->
          <div v-if="userRole === 'Farmer'">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Rating Factors</h4>
            <div class="space-y-4">
              <div v-for="factor in ratingFactors" :key="factor.name" class="flex items-center">
                <div class="w-32">
                  <span class="text-sm font-medium text-gray-900">{{ factor.name }}</span>
                </div>
                <div class="flex-1 flex items-center">
                  <div class="flex items-center mr-2">
                    <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-900 ml-1">{{ factor.rating.toFixed(1) }}</span>
                  </div>
                  <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-yellow-400" 
                      :style="{ width: `${(factor.rating / 5) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="space-y-6">
        <div v-for="review in reviews" :key="review.id" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                <img 
                  :src="review.reviewer.avatar || 'https://via.placeholder.com/48?text=User'" 
                  class="w-full h-full object-cover"
                  alt="Reviewer avatar"
                >
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ review.reviewer.name }}</h4>
                <div class="flex items-center">
                  <div class="flex items-center">
                    <svg 
                      v-for="i in 5" 
                      :key="i" 
                      class="w-4 h-4" 
                      :class="i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span class="text-xs text-gray-500 ml-2">{{ formatDate(review.date) }}</span>
                </div>
              </div>
            </div>
            <div v-if="review.livestock" class="text-sm text-gray-600">
              For: <span class="font-medium text-gray-900">{{ review.livestock }}</span>
            </div>
          </div>
          <p class="text-gray-700 mb-4">{{ review.comment }}</p>
          <div v-if="review.images.length > 0" class="flex space-x-2 mb-4">
            <div 
              v-for="(image, index) in review.images" 
              :key="index" 
              class="w-16 h-16 rounded-md overflow-hidden cursor-pointer"
              @click="openImageModal(image)"
            >
              <img 
                :src="image" 
                class="w-full h-full object-cover"
                alt="Review image"
              >
            </div>
          </div>
          <div v-if="review.response" class="bg-gray-50 rounded-lg p-4 mt-4 border-l-4 border-green-500">
            <div class="flex items-start">
              <div class="flex-shrink-0 mr-3">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 mb-1">Your Response</p>
                <p class="text-sm text-gray-600">{{ review.response }}</p>
              </div>
            </div>
          </div>
          <button 
            v-else-if="userRole === 'Farmer'" 
            class="text-sm text-green-600 hover:text-green-700 font-medium mt-2"
            @click="openResponseModal(review)"
          >
            Respond to this review
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8">
        <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button 
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
            :class="page === currentPage ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-gray-50'"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button 
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>

      <!-- Empty State -->
      <div v-if="reviews.length === 0" class="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-8 text-center">
        <svg class="w-16 h-16 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h4 class="text-xl font-bold text-gray-800 mt-4">No Reviews Yet</h4>
        <p class="text-gray-600 mt-2 max-w-md mx-auto">
          {{ userRole === 'Farmer' 
            ? 'You haven\'t received any reviews yet. When customers purchase your livestock, they can leave reviews here.' 
            : 'You haven\'t received any reviews yet.' }}
        </p>
      </div>
    </section>

    <!-- Response Modal -->
    <div v-if="showResponseModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Respond to Review</h3>
          <textarea 
            v-model="responseText"
            class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="4"
            placeholder="Write your response here..."
          ></textarea>
          <div class="flex justify-end space-x-3 mt-4">
            <button 
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              @click="showResponseModal = false"
            >
              Cancel
            </button>
            <button 
              class="px-4 py-2 bg-green-600 rounded-lg text-white font-medium hover:bg-green-700"
              @click="submitResponse"
            >
              Submit Response
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div class="relative w-full max-w-4xl">
        <button 
          class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30"
          @click="showImageModal = false"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img 
          :src="selectedImage" 
          class="w-full h-auto max-h-screen object-contain"
          alt="Review image"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Review {
  id: string
  rating: number
  comment: string
  date: string
  images: string[]
  response?: string
  reviewer: {
    name: string
    avatar: string
  }
  livestock?: string
}

defineProps<{
  userId: string
  userRole: string
}>()

const reviews = ref<Review[]>([])
const currentPage = ref(1)
const reviewsPerPage = 5
const showResponseModal = ref(false)
const responseText = ref('')
const selectedReview = ref<Review | null>(null)
const showImageModal = ref(false)
const selectedImage = ref('')

const ratingDistribution = [180, 45, 12, 6, 4]
const ratingFactors = [
  { name: 'Livestock Quality', rating: 4.8 },
  { name: 'Communication', rating: 4.9 },
  { name: 'Delivery', rating: 4.5 },
  { name: 'Value for Money', rating: 4.7 }
]

const totalReviews = computed(() => ratingDistribution.reduce((a, b) => a + b, 0))
const totalPages = computed(() => Math.ceil(reviews.value.length / reviewsPerPage))
// const paginatedReviews = computed(() => {
//   const start = (currentPage.value - 1) * reviewsPerPage
//   const end = start + reviewsPerPage
//   return reviews.value.slice(start, end)
// })

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const loadReviews = () => {
  reviews.value = [
    {
      id: '1',
      rating: 5,
      comment:
        'The goats arrived in perfect health and were exactly as described. The seller was very helpful throughout the process. Highly recommend!',
      date: '2023-06-15T10:30:00Z',
      images: [
        'https://source.unsplash.com/random/300x200?goat,1',
        'https://source.unsplash.com/random/300x200?goat,2'
      ],
      livestock: 'Premium Dairy Goats',
      reviewer: {
        name: 'Juan Dela Cruz',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      response:
        "Thank you for your kind words, Juan! We take pride in raising healthy livestock and are glad you're satisfied."
    },
    {
      id: '2',
      rating: 4,
      comment:
        'Good quality chickens, though delivery took a bit longer than expected. Overall happy with the purchase.',
      date: '2023-05-22T14:15:00Z',
      images: [],
      livestock: 'Free Range Chickens',
      reviewer: {
        name: 'Maria Santos',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    }
  ]
}

const openResponseModal = (review: Review) => {
  selectedReview.value = review
  responseText.value = ''
  showResponseModal.value = true
}

const submitResponse = () => {
  if (selectedReview.value && responseText.value.trim()) {
    const index = reviews.value.findIndex((r) => r.id === selectedReview.value?.id)
    if (index !== -1) {
      reviews.value[index].response = responseText.value
    }
    showResponseModal.value = false
  }
}

const openImageModal = (image: string) => {
  selectedImage.value = image
  showImageModal.value = true
}

onMounted(() => {
  loadReviews()
})
</script>
