<template>
  <div
    :class="`${isExpanded ? 'w-full md:w-52 lg:w-56' : 'w-14'} bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-lg relative transition-all duration-300 ease-in-out`">
    <div class="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-emerald-50/20"></div>

    <!-- Toggle Button -->
    <div @click="toggleSidebar"
      class="absolute inset-0 flex items-center justify-center cursor-pointer group z-20 bg-green-50/30 transition-colors duration-200"
      v-if="!isExpanded">
      <div
        class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
        </svg>
      </div>
    </div>

    <div class="relative h-full flex flex-col">
      <!-- Expanded View -->
      <div v-if="isExpanded" class="h-full flex flex-col">
        <!-- Header with integrated close button -->
        <div class="flex justify-between items-center p-3 border-b border-green-100/50">
          <h2
            class="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-1">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
            </svg>
            Filters
          </h2>
          <div class="flex gap-1">
            <button @click="handleResetFilters"
              class="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1 hover:bg-gray-200">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <button @click="toggleSidebar"
              class="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1 hover:bg-gray-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Sticky Search & Active Filters -->
        <div class="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-green-100/50 p-3 shadow-sm">
          <!-- Search -->
          <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100 mb-2">
            <div class="relative">
              <input v-model="localFilters.search" type="text" @input="handleFilterChange"
                class="block w-full pl-8 pr-2 py-1.5 border border-green-200 rounded-md text-xs bg-green-50/30 focus:ring-2 focus:ring-green-500/50 cursor-text"
                placeholder="Search..." />
              <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <svg class="h-3 w-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Active Filters -->
          <div v-if="hasActiveFilters"
            class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-md p-2 border border-green-200">
            <div class="flex flex-wrap gap-1">
              <span v-if="localFilters.search"
                class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">
                "{{ localFilters.search }}"
              </span>
              <span v-for="category in localFilters.categories" :key="category"
                class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ category
                }}</span>
              <span v-if="localFilters.urgency"
                class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{
                  localFilters.urgency }}</span>
            </div>
          </div>
        </div>

        <!-- Scrollable Filters Area -->
        <div class="flex-1 overflow-y-auto p-3">
          <!-- Compact Filter Group -->
          <div class="space-y-3">
            <!-- Category Checkboxes -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
              <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-7 7a2 2 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Categories
              </h3>
              <div class="space-y-1">
                <label v-for="category in categories" :key="category"
                  class="flex items-center gap-1.5 text-xs text-gray-700 p-1 rounded cursor-pointer hover:bg-green-50/50">
                  <input type="checkbox" :value="category" v-model="localFilters.categories" @change="handleFilterChange"
                    class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer">
                  <span class="truncate">{{ category }}</span>
                </label>
              </div>
            </div>

            <!-- Urgency Filter -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
              <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Urgency
              </h3>
              <div class="space-y-1">
                <label v-for="urgency in urgencyLevels" :key="urgency"
                  class="flex items-center gap-1.5 text-xs text-gray-700 p-1 rounded cursor-pointer hover:bg-green-50/50">
                  <input type="radio" :value="urgency" v-model="localFilters.urgency" @change="handleFilterChange"
                    class="h-3 w-3 text-green-600 rounded-full border-gray-300 focus:ring-green-500 cursor-pointer">
                  <span class="truncate">{{ urgency }}</span>
                </label>
              </div>
            </div>

            <!-- Forum Stats -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
              <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Forum Stats
              </h3>
              <div class="space-y-1">
                <div class="flex justify-between items-center">
                  <span class="text-xs text-gray-600">Questions:</span>
                  <span class="text-xs font-bold text-green-600">{{ forumStats.totalQuestions }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-xs text-gray-600">Answers:</span>
                  <span class="text-xs font-bold text-green-600">{{ forumStats.totalAnswers }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-xs text-gray-600">Active Users:</span>
                  <span class="text-xs font-bold text-green-600">{{ forumStats.activeUsers }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// Props
interface Props {
  isExpanded?: boolean;
  filters: {
    search: string;
    categories: string[];
    urgency: string;
  };
  categories: string[];
  urgencyLevels: string[];
  forumStats: {
    totalQuestions: number;
    totalAnswers: number;
    activeUsers: number;
  };
}

const props = withDefaults(defineProps<Props>(), {
  isExpanded: true,
  filters: () => ({
    search: '',
    categories: [],
    urgency: ''
  }),
  categories: () => [],
  urgencyLevels: () => [],
  forumStats: () => ({
    totalQuestions: 0,
    totalAnswers: 0,
    activeUsers: 0
  })
});

// Emits
interface Emits {
  (e: 'update:isExpanded', value: boolean): void;
  (e: 'update:filters', filters: Props['filters']): void;
  (e: 'resetFilters'): void;
}

const emit = defineEmits<Emits>();

// Local state
const localFilters = ref({ ...props.filters });
const isExpanded = ref(props.isExpanded);

// Computed properties
const hasActiveFilters = computed(() => {
  return localFilters.value.search !== '' ||
    localFilters.value.categories.length > 0 ||
    localFilters.value.urgency !== '';
});

// Methods
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
  emit('update:isExpanded', isExpanded.value);
};

const handleFilterChange = () => {
  emit('update:filters', { ...localFilters.value });
};

const handleResetFilters = () => {
  localFilters.value = {
    search: '',
    categories: [],
    urgency: ''
  };
  emit('resetFilters');
  emit('update:filters', { ...localFilters.value });
};

// Watchers
watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters };
}, { deep: true });

watch(() => props.isExpanded, (newValue) => {
  isExpanded.value = newValue;
});
</script>