<!-- AnimalDetailsModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click="closeModal">
    <div 
      class="bg-white rounded-2xl shadow-2xl max-w-5xl w-full h-[85vh] overflow-hidden transform transition-all duration-300 flex border-4 border-gray-200"
      @click.stop
    >
      <!-- Left Side - Image Gallery -->
      <div class="w-1/2 relative bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
        <img 
          :src="animal.images[currentImageIndex]" 
          :alt="`${animal.type} - ${animal.breed}`"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
        
        <!-- Image Navigation (only if multiple images) -->
        <template v-if="animal.images.length > 1">
          <button 
            @click="previousImage"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            @click="nextImage"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <!-- Image Counter -->
          <div class="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {{ currentImageIndex + 1 }} / {{ animal.images.length }}
          </div>

          <!-- Fixed Thumbnail Gallery at Bottom -->
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
            <div class="flex justify-center">
              <div class="flex gap-2 bg-black/20 backdrop-blur-sm rounded-xl p-2">
                <button
                  v-for="(image, index) in animal.images.slice(0, 6)"
                  :key="index"
                  @click="currentImageIndex = index"
                  :class="`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                    index === currentImageIndex 
                      ? 'border-white shadow-lg scale-105' 
                      : 'border-white/40 hover:border-white/70'
                  }`"
                >
                  <img 
                    :src="image" 
                    :alt="`Thumbnail ${index + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
                
                <!-- Show remaining count if more than 6 images -->
                <div v-if="animal.images.length > 6" class="flex items-center justify-center w-14 h-10 bg-black/40 backdrop-blur-sm rounded-lg border-2 border-white/40">
                  <span class="text-white text-xs font-medium">+{{ animal.images.length - 6 }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Status Badge -->
        <div class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-green-400">
          {{ animal.status }}
        </div>

        <!-- Close Button - Moved to left -->
        <button 
          @click="closeModal"
          class="absolute top-4 left-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Right Side - Information (Scrollable) -->
      <div class="w-1/2 flex flex-col border-l border-gray-200">
        <!-- Fixed Header with Title and Price -->
        <div class="border-b border-gray-200 p-6 bg-white">
          <div class="flex justify-between items-start">
            <div class="flex-1 min-w-0 mr-4">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ animal.breed }} {{ animal.type }}</h2>
              <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ animal.location }}</span>
              </div>
              <div class="text-sm text-gray-400">Posted {{ formatDate(animal.datePosted) }}</div>
            </div>
            <div class="text-right flex-shrink-0">
              <div class="text-4xl font-bold text-green-600 mb-1">₱{{ animal.price.toLocaleString() }}</div>
              <div class="text-sm text-gray-500">per head</div>
              <div v-if="animal.quantity > 1" class="text-sm text-green-600 font-semibold mt-1">{{ animal.quantity }} available</div>
            </div>
          </div>
        </div>

        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-6">
            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
                <div class="text-blue-600 text-sm font-semibold mb-1">Weight</div>
                <div class="text-xl font-bold text-gray-900">{{ animal.weight }} kg</div>
              </div>
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200">
                <div class="text-purple-600 text-sm font-semibold mb-1">Age</div>
                <div class="text-xl font-bold text-gray-900">{{ animal.age }}</div>
              </div>
              <div class="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border-2 border-amber-200">
                <div class="text-amber-600 text-sm font-semibold mb-1">Gender</div>
                <div class="text-xl font-bold text-gray-900">{{ animal.gender }}</div>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
                <div class="text-green-600 text-sm font-semibold mb-1">Quantity</div>
                <div class="text-xl font-bold text-gray-900">{{ animal.quantity }}</div>
              </div>
            </div>

            <!-- Description Section -->
            <div class="mb-6">
              <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Description
              </h3>
              <div class="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <p class="text-gray-700 leading-relaxed">{{ animal.description }}</p>
              </div>
            </div>

            <!-- Delivery Options Section -->
            <div class="mb-6">
              <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Delivery Options
              </h3>
              <div class="flex flex-wrap gap-3">
                <div 
                  v-for="option in animal.deliveryOptions" 
                  :key="option"
                  class="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium capitalize flex items-center gap-2 border-2 border-green-200"
                >
                  <svg v-if="option === 'pickup'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <svg v-if="option === 'delivery'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                  {{ option }}
                </div>
              </div>
            </div>

            <!-- Farmer Information Section -->
            <div class="mb-6">
              <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Farmer Information
              </h3>
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200">
                <div class="flex items-start gap-4">
                  <img 
                    :src="animal.farmer.avatar" 
                    :alt="animal.farmer.name"
                    class="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-gray-900 text-xl mb-1">{{ animal.farmer.name }}</h4>
                    <p v-if="animal.farmer.farmName" class="text-green-600 font-semibold mb-3">{{ animal.farmer.farmName }}</p>
                    <div class="space-y-2">
                      <div class="flex items-center gap-3 text-gray-600">
                        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span class="break-all">{{ animal.farmer.contact }}</span>
                      </div>
                      <div class="flex items-start gap-3 text-gray-600">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="break-words">{{ animal.farmer.address }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fixed Action Footer -->
        <div class="border-t-2 border-gray-200 p-4 bg-gray-50">
          <div class="flex gap-3">
            <button 
              @click="editAnimal"
              class="flex-1 px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-2 border-blue-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button 
              @click="deleteAnimal"
              class="flex-1 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-2 border-red-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-4 border-gray-200">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-200">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Listing</h3>
          <p class="text-gray-600 mb-6">Are you sure you want to delete this livestock listing? This action cannot be undone.</p>
          <div class="flex gap-3 justify-center">
            <button 
              @click="showDeleteConfirmation = false"
              class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors duration-200 border-2 border-gray-200"
            >
              Cancel
            </button>
            <button 
              @click="confirmDelete"
              class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 border-2 border-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  contact: string;
  address: string;
  avatar: string;
}

interface Animal {
  id: number;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  status: string;
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
  location: string;
  isAuction?: boolean;
}

const props = defineProps<{
  animal: Animal;
  currentUserId?: number;
}>();

const emit = defineEmits<{
  close: [];
  contact: [string];
  edit: [number];
  delete: [number];
}>();

const currentImageIndex = ref(0);
const showDeleteConfirmation = ref(false);

const isOwner = computed(() => {
  return props.currentUserId && props.currentUserId === props.animal.farmer.id;
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays} days ago`;
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  return `${Math.ceil(diffDays / 30)} months ago`;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.animal.images.length;
};

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? props.animal.images.length - 1 
    : currentImageIndex.value - 1;
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://via.placeholder.com/400x600/e5e7eb/9ca3af?text=Image+Not+Available';
};

const closeModal = () => {
  emit('close');
};

const contactFarmer = () => {
  emit('contact', props.animal.farmer.contact);
};

const copyContact = () => {
  const contactInfo = `${props.animal.farmer.name}\n${props.animal.farmer.contact}\n${props.animal.farmer.address}`;
  navigator.clipboard.writeText(contactInfo);
  emit('contact', contactInfo);
};

const editAnimal = () => {
  emit('edit', props.animal.id);
  closeModal();
};

const deleteAnimal = () => {
  showDeleteConfirmation.value = true;
};

const confirmDelete = () => {
  emit('delete', props.animal.id);
  showDeleteConfirmation.value = false;
  closeModal();
};

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (showDeleteConfirmation.value) return;
  
  if (event.key === 'Escape') {
    closeModal();
  } else if (event.key === 'ArrowLeft' && props.animal.images.length > 1) {
    previousImage();
  } else if (event.key === 'ArrowRight' && props.animal.images.length > 1) {
    nextImage();
  }
};

// Add keyboard event listener
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>