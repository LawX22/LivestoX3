<!-- GuideModal.vue -->
<template>
  <div v-if="visible"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div
      class="bg-white/95 backdrop-blur-xl rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40">
      <div 
        class="p-4 text-white rounded-t-2xl sticky top-0 z-10"
        :class="headerClass">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">{{ title }}</h3>
          <button @click="$emit('close')" class="text-white/80 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div 
            v-for="(item, index) in guideItems" 
            :key="index"
            class="flex items-start">
            <div 
              class="flex-shrink-0 rounded-full p-2 mr-3"
              :class="iconBgClass">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5" 
                :class="iconClass"
                viewBox="0 0 20 20"
                fill="currentColor"
                v-html="item.icon">
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">{{ item.title }}</h4>
              <p class="text-sm text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <button 
            @click="$emit('close')"
            class="w-full text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg cursor-pointer"
            :class="buttonClass">
            Got it!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface GuideItem {
  title: string;
  description: string;
  icon: string;
}

interface Props {
  visible: boolean;
  type: 'guest' | 'buyer' | 'farmer';
}

const props = defineProps<Props>();

defineEmits<{
  close: [];
}>();

// Configuration for different guide types
const guideConfig = {
  guest: {
    title: 'Guest Guide',
    headerClass: 'bg-gradient-to-r from-amber-600 to-yellow-600',
    iconBgClass: 'bg-amber-100',
    iconClass: 'text-amber-600',
    buttonClass: 'bg-gradient-to-r from-amber-600 to-yellow-600',
    items: [
      {
        title: 'Browse Questions',
        description: 'As a guest, you can browse all public questions and answers to learn from the community.',
        icon: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />'
      },
      {
        title: 'Read-Only Access',
        description: 'You can view questions and answers but cannot post or interact until you sign in.',
        icon: '<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />'
      },
      {
        title: 'Sign Up',
        description: 'Create an account to ask questions, answer posts, and engage with the community.',
        icon: '<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />'
      },
      {
        title: 'Benefits of Joining',
        description: 'Get personalized advice, connect with experts, and access exclusive content by creating an account.',
        icon: '<path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />'
      }
    ]
  },
  buyer: {
    title: 'Buyer Guide',
    headerClass: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    iconBgClass: 'bg-blue-100',
    iconClass: 'text-blue-600',
    buttonClass: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    items: [
      {
        title: 'Public Questions',
        description: 'As a buyer, you can view and answer all public questions marked as visible to "All" users.',
        icon: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />'
      },
      {
        title: 'Ask Questions',
        description: 'Buyers can now ask questions to farmers and other community members.',
        icon: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />'
      },
      {
        title: 'Building Relationships',
        description: 'Use the forum to connect with farmers, understand their challenges, and build trust for future business.',
        icon: '<path d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.230.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" />'
      }
    ]
  },
  farmer: {
    title: 'Farmer Guide',
    headerClass: 'bg-gradient-to-r from-green-600 to-emerald-600',
    iconBgClass: 'bg-green-100',
    iconClass: 'text-green-600',
    buttonClass: 'bg-gradient-to-r from-green-600 to-emerald-600',
    items: [
      {
        title: 'Ask Questions',
        description: 'As a farmer, you can ask questions to the community and get answers from other farmers and buyers.',
        icon: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />'
      },
      {
        title: 'Answer Questions',
        description: 'Share your knowledge and experience by answering questions from other community members.',
        icon: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />'
      },
      {
        title: 'Build Reputation',
        description: 'Gain recognition in the community by providing helpful answers and engaging with other members.',
        icon: '<path d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.230.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" />'
      },
      {
        title: 'Private Questions',
        description: 'You can mark questions as "Farmers Only" to get advice specifically from other farmers.',
        icon: '<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />'
      }
    ]
  }
};

// Computed properties for current guide configuration
const config = computed(() => guideConfig[props.type]);
const title = computed(() => config.value.title);
const headerClass = computed(() => config.value.headerClass);
const iconBgClass = computed(() => config.value.iconBgClass);
const iconClass = computed(() => config.value.iconClass);
const buttonClass = computed(() => config.value.buttonClass);
const guideItems = computed(() => config.value.items);
</script>