<!-- ContactFarmerModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" @click="$emit('close')">
    <div class="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300" @click.stop>
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-t-xl">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold">Contact Farmer</h3>
              <p class="text-green-100 text-xs opacity-90">Send message</p>
            </div>
          </div>
          <button @click="$emit('close')" class="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4">
        <!-- Animal Info -->
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-4 border border-green-200">
          <div class="flex items-center gap-3">
            <img :src="animal.images[0]" :alt="animal.type" class="w-12 h-12 rounded-lg object-cover shadow-md" />
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-gray-800 text-sm truncate">{{ animal.type }} - {{ animal.breed }}</h4>
              <p class="text-green-600 font-semibold text-sm">₱{{ animal.price.toLocaleString() }}</p>
              <p class="text-gray-600 text-xs truncate">{{ animal.location }}</p>
            </div>
          </div>
        </div>

        <!-- Farmer Info -->
        <div class="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
          <div class="flex items-center gap-2">
            <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-10 h-10 rounded-full object-cover shadow-md" />
            <div class="flex-1 min-w-0">
              <h5 class="font-bold text-gray-800 text-sm truncate">{{ animal.farmer.farmName || animal.farmer.name }}</h5>
              <p class="text-gray-600 text-xs truncate">{{ animal.farmer.name }}</p>
              <div class="flex items-center gap-1 text-xs text-blue-600 mt-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="font-medium">{{ animal.farmer.contact }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Type Selection -->
        <div class="mb-4">
          <label class="block text-xs font-semibold text-gray-700 mb-2">Message type:</label>
          <div class="grid grid-cols-2 gap-2 mb-3">
            <button 
              @click="messageType = 'template'"
              :class="[
                'p-2 rounded-lg border-2 transition-all font-semibold text-xs',
                messageType === 'template' 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center justify-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Template
              </div>
            </button>
            <button 
              @click="messageType = 'custom'"
              :class="[
                'p-2 rounded-lg border-2 transition-all font-semibold text-xs',
                messageType === 'custom' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center justify-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Custom
              </div>
            </button>
          </div>
        </div>

        <!-- Template Messages -->
        <div v-if="messageType === 'template'" class="mb-4">
          <label class="block text-xs font-semibold text-gray-700 mb-2">Choose template:</label>
          <select 
            v-model="selectedTemplate"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/50 focus:border-green-500 text-xs bg-white"
          >
            <option :value="null" disabled>Select a message template...</option>
            <option 
              v-for="template in messageTemplates" 
              :key="template.id"
              :value="template"
            >
              {{ template.title }} - {{ template.preview.substring(0, 40) }}...
            </option>
          </select>
          
          <!-- Template Preview -->
          <div v-if="selectedTemplate" class="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <label class="block text-xs font-semibold text-gray-700 mb-1">Preview:</label>
            <div class="text-xs text-gray-800 whitespace-pre-line max-h-20 overflow-y-auto">{{ generateTemplateMessage(selectedTemplate) }}</div>
          </div>
        </div>

        <!-- Custom Message -->
        <div v-if="messageType === 'custom'" class="mb-4">
          <label class="block text-xs font-semibold text-gray-700 mb-2">Your message:</label>
          <textarea 
            v-model="customMessage" 
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none text-xs"
            rows="4"
            placeholder="Write your message here..."
            maxlength="300"
          ></textarea>
          <div class="flex justify-between items-center mt-1">
            <div class="text-xs text-gray-500">{{ customMessage.length }}/300</div>
            <button 
              @click="addAnimalDetails"
              class="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              + Add details
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button 
            @click="$emit('close')" 
            class="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors text-sm"
          >
            Cancel
          </button>
          <button 
            @click="sendMessage" 
            :disabled="!canSendMessage"
            :class="[
              'flex-1 px-3 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 text-sm',
              canSendMessage
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Message
          </button>
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
}

interface User {
  email: string;
  name: string;
  role?: string;
}

interface MessageTemplate {
  id: string;
  title: string;
  preview: string;
  template: string;
}

const props = defineProps<{
  animal: Animal;
  currentUser: User | null;
}>();

const emit = defineEmits<{
  close: [];
  send: [messageData: { message: string; contactMethod: string }];
}>();

// Reactive data
const messageType = ref<'template' | 'custom'>('template');
const selectedTemplate = ref<MessageTemplate | null>(null);
const customMessage = ref<string>('');

// Message templates
const messageTemplates = ref<MessageTemplate[]>([
  {
    id: 'inquiry',
    title: 'General Inquiry',
    preview: 'Hi! I\'m interested in your livestock listing...',
    template: 'Hi! I\'m interested in your {animalType} ({animalBreed}) listing for ₱{price}. Is it still available? I would like to know more details.\n\nThank you!\n{buyerName}'
  },
  {
    id: 'price',
    title: 'Price Discussion',
    preview: 'Hello! I saw your listing and would like to discuss...',
    template: 'Hello! I saw your {animalType} ({animalBreed}) listing for ₱{price}. I\'m very interested. Can we discuss the price?\n\nBest regards,\n{buyerName}'
  },
  {
    id: 'bulk',
    title: 'Bulk Purchase',
    preview: 'Good day! I\'m interested in purchasing multiple...',
    template: 'Good day! I\'m interested in purchasing multiple {animalType}s. I saw your {animalBreed} at ₱{price} each. Do you have more available?\n\nThanks!\n{buyerName}'
  },
  {
    id: 'viewing',
    title: 'Schedule Viewing',
    preview: 'Hello! I would like to schedule a viewing...',
    template: 'Hello! I would like to schedule a viewing for your {animalType} ({animalBreed}) listed at ₱{price}. When would be a good time?\n\nBest regards,\n{buyerName}'
  }
]);

// Computed properties
const canSendMessage = computed(() => {
  if (messageType.value === 'template') {
    return selectedTemplate.value !== null;
  } else {
    return customMessage.value.trim().length > 0;
  }
});

const finalMessage = computed(() => {
  if (messageType.value === 'template' && selectedTemplate.value) {
    return generateTemplateMessage(selectedTemplate.value);
  } else {
    return customMessage.value;
  }
});

// Methods
const generateTemplateMessage = (template: MessageTemplate): string => {
  return template.template
    .replace('{animalType}', props.animal.type)
    .replace('{animalBreed}', props.animal.breed)
    .replace('{price}', props.animal.price.toLocaleString())
    .replace('{buyerName}', props.currentUser?.name || 'Interested Buyer');
};

const addAnimalDetails = () => {
  const animalInfo = `\n\nDetails:\n- Type: ${props.animal.type}\n- Breed: ${props.animal.breed}\n- Price: ₱${props.animal.price.toLocaleString()}\n- Location: ${props.animal.location}`;
  if (customMessage.value.length + animalInfo.length <= 300) {
    customMessage.value += animalInfo;
  }
};

const sendMessage = () => {
  if (!canSendMessage.value) return;
  
  const messageData = {
    message: finalMessage.value,
    contactMethod: 'SMS'
  };
  
  emit('send', messageData);
};

// Initialize with first template selected
selectedTemplate.value = messageTemplates.value[0];
</script>