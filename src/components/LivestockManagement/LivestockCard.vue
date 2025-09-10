<!-- livestockCard.vue -->
<template>
  <!-- Card View (Default) -->
  <div v-if="displayMode === 'card'"
    class="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-white/60 hover:border-green-300/60 transition-all duration-300 bg-white/95 backdrop-blur-sm flex flex-col h-full group">

    <!-- Premium Image Section -->
    <div class="relative h-48 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10 z-10"></div>
      <img :src="animal.images[0]" :alt="animal.type"
        class="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110"
        @click="$emit('openModal', animal)" loading="lazy" />

      <!-- Status Badge -->
      <div class="absolute top-3 right-3 z-20">
        <span
          :class="`px-2 py-1 text-xs font-bold rounded-full shadow backdrop-blur-md border ${getStatusClass(computedStatus)}`">
          {{ computedStatus }}
        </span>
      </div>

      <!-- Auction-specific Badge -->
      <div v-if="animal.isAuction" class="absolute top-3 left-3 z-20">
        <div
          class="px-3 py-1 rounded-full shadow-lg backdrop-blur-md border border-amber-300/40 bg-amber-500/90 text-white flex items-center gap-1.5">
          <svg class="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd" />
          </svg>
          <span class="text-xs font-bold">AUCTION</span>
        </div>
      </div>

      <!-- Animal Type Badge (for non-auction items) -->
      <div v-else class="absolute top-3 left-3 z-20">
        <div
          :class="`px-3 py-1 rounded-full shadow-lg backdrop-blur-md border border-white/40 flex items-center gap-1.5 ${getTypeBadgeClassForImage(animal.type)}`">
          <span class="w-3 h-3 flex items-center justify-center">
            <svg v-if="animal.type === 'Cattle'" class="w-3 h-3 text-current" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                opacity="0.3" />
            </svg>
            <svg v-else class="w-3 h-3 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 01112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <span class="text-xs font-bold text-white">{{ animal.type }}</span>
        </div>
      </div>

      <!-- Price/Bid Badge on Image - Bottom Right -->
      <div class="absolute bottom-3 right-3 z-20">
        <div v-if="animal.isAuction"
          class="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md border border-white/20 flex flex-col items-center">
          <span class="text-xs font-medium">Current Bid</span>
          <span class="text-sm font-black">₱ {{ (animal.currentBid || animal.startingBid || 0).toLocaleString()
            }}</span>
        </div>
        <div v-else
          class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-1">
          <span class="text-sm font-black">₱ {{ animal.price.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Auction Timer - Bottom Left -->
      <div v-if="animal.isAuction" class="absolute bottom-3 left-3 z-20">
        <div class="bg-black/70 backdrop-blur-md rounded-lg p-2 border border-white/20 flex items-center gap-2">
          <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd" />
          </svg>
          <div class="text-white">
            <div class="text-xs font-medium">{{ getTimeRemaining(animal.endTime) }}</div>
            <div class="text-[10px] opacity-75">{{ animal.bidCount || 0 }} bids</div>
          </div>
        </div>
      </div>

      <!-- Farmer Info Overlay (for non-auction items) -->
      <div v-if="!animal.isAuction"
        class="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div class="bg-black/70 backdrop-blur-md rounded-lg p-2 border border-white/20 flex items-center">
          <div class="w-6 h-6 rounded-full border border-white/60 shadow-sm overflow-hidden mr-2">
            <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-full h-full object-cover" />
          </div>
          <div>
            <p class="text-xs font-medium text-white truncate max-w-[120px]">{{ animal.farmer.farmName ||
              animal.farmer.name }}</p>
          </div>
        </div>
      </div>

      <!-- Quick View Overlay -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-sm z-15">
        <button @click="$emit('openModal', animal)"
          class="bg-white/95 backdrop-blur-md text-gray-800 px-3 py-2 rounded font-semibold shadow hover:shadow-md transition-all duration-200 flex items-center gap-2 text-sm border border-white/40 hover:bg-white">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Quick View
        </button>
      </div>
    </div>

    <!-- Redesigned Card Content -->
    <div class="p-4 flex-1 flex flex-col">
      <!-- Header with Title and Date/Location -->
      <div class="flex justify-between items-start mb-3">
        <!-- Left Side - Simple Title -->
        <div class="flex-1 pr-3">
          <h3 class="font-bold text-sm text-emerald-700 mb-1 leading-tight line-clamp-2">
            {{ animal.title }}
          </h3>
        </div>

        <!-- Right Side - Date and Location -->
        <div class="flex flex-col items-end text-right min-w-0">
          <!-- Date -->
          <div class="text-xs text-gray-500 flex items-center gap-1 mb-1">
            <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ formatDate(animal.datePosted) }}</span>
          </div>

          <!-- Location -->
          <div class="text-xs text-gray-500 flex items-center gap-1">
            <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="truncate max-w-[100px]">{{ animal.location }}</span>
          </div>
        </div>
      </div>

      <!-- Description Section -->
      <div class="mb-3">
        <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {{ animal.description }}
        </p>
      </div>

      <!-- Compact Stats Section -->
      <div class="mt-auto">
        <div :class="`grid gap-1.5 ${isSidebarExpanded ? 'grid-cols-2' : 'grid-cols-2'}`">
          <!-- Quantity -->
          <div
            :class="`bg-blue-50 rounded-md border border-blue-200/60 flex items-center justify-center gap-1 relative group/quantity ${isSidebarExpanded ? 'p-1.5' : 'p-2'}`">
            <svg :class="`text-blue-600 ${isSidebarExpanded ? 'w-3 h-3' : 'w-4 h-4'}`" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p :class="`font-bold text-blue-800 ${isSidebarExpanded ? 'text-xs' : 'text-sm'}`">{{ animal.quantity }}</p>
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/quantity:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
              Quantity
              <div class="absolute top-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45"></div>
            </div>
          </div>

          <!-- Weight -->
          <div
            :class="`bg-purple-50 rounded-md border border-purple-200/60 flex items-center justify-center gap-1 relative group/weight ${isSidebarExpanded ? 'p-1.5' : 'p-2'}`">
            <svg :class="`text-purple-600 ${isSidebarExpanded ? 'w-3 h-3' : 'w-4 h-4'}`" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
            </svg>
            <p :class="`font-bold text-purple-800 ${isSidebarExpanded ? 'text-xs' : 'text-sm'}`">{{ animal.weight }}</p>
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/weight:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
              Weight ({{ weightUnit }})
              <div class="absolute top-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45"></div>
            </div>
          </div>

          <!-- Gender -->
          <div
            :class="`bg-pink-50 rounded-md border border-pink-200/60 flex items-center justify-center gap-1 relative group/gender ${isSidebarExpanded ? 'p-1.5' : 'p-2'}`">
            <svg :class="`text-pink-600 ${isSidebarExpanded ? 'w-3 h-3' : 'w-4 h-4'}`" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 01112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p :class="`font-bold text-pink-800 ${isSidebarExpanded ? 'text-xs' : 'text-sm'}`">{{ animal.gender }}</p>
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/gender:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
              Gender
              <div class="absolute top-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45"></div>
            </div>
          </div>

          <!-- Age -->
          <div
            :class="`bg-teal-50 rounded-md border border-teal-200/60 flex items-center justify-center gap-1 relative group/age ${isSidebarExpanded ? 'p-1.5' : 'p-2'}`">
            <svg :class="`text-teal-600 ${isSidebarExpanded ? 'w-3 h-3' : 'w-4 h-4'}`" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p :class="`font-bold text-teal-800 ${isSidebarExpanded ? 'text-xs' : 'text-sm'}`">{{ animal.age }}</p>
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/age:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
              Age Range
              <div class="absolute top-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Table View - Complete table structure -->
  <template v-else-if="displayMode === 'table'">
    <!-- Render thead only for the first item -->
    <thead v-if="showTableHeader" class="bg-gradient-to-r from-green-50 to-emerald-50">
      <tr>
        <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Image</th>
        <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
        <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Title & Info</th>
        <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Specifications</th>
        <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price/Bid</th>
        <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Posted</th>
        <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
        <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>

    <!-- Table row content -->
    <tr class="hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-200">
      <!-- Image -->
      <td class="px-4 py-3 whitespace-nowrap">
        <div class="relative w-14 h-14 rounded-lg overflow-hidden cursor-pointer group" @click="$emit('openModal', animal)">
          <img :src="animal.images[0]" :alt="animal.type" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <!-- Status badge on image -->
          <div class="absolute -top-1 -right-1">
            <span v-if="animal.isAuction" class="px-1.5 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full shadow-md">
              AUCTION
            </span>
            <span v-else :class="`px-1.5 py-0.5 text-xs font-bold rounded-full shadow-md ${getStatusClass(computedStatus)}`">
              {{ computedStatus === 'Available' ? '✓' : computedStatus.charAt(0) }}
            </span>
          </div>
        </div>
      </td>

      
      <!-- ID -->
      <td class="px-4 py-3">
        <div class="text-sm text-gray-600 font-mono">{{ animal.id.substring(0, 8) }}...</div>
      </td>
      
      <!-- Title & Basic Info -->
      <td class="px-4 py-3">
        <div class="flex flex-col">
          <div class="text-sm font-semibold text-gray-900 mb-1">{{ animal.title }}</div>
          <div class="text-xs text-gray-600 mb-1">{{ animal.breed }} {{ animal.type }}</div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">{{ animal.gender }}</span>
            <span class="text-xs text-gray-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">{{ animal.age }}</span>
          </div>
        </div>
      </td>

      <!-- Specifications -->
      <td class="px-4 py-3">
        <div class="flex flex-col text-sm text-gray-600 space-y-1">
          <div class="flex items-center gap-2">
            <svg class="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
            </svg>
            <span>{{ animal.weight }}{{ weightUnit }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>Qty: {{ animal.quantity }}</span>
          </div>
        </div>
      </td>

      <!-- Price/Bid -->
      <td class="px-4 py-3">
        <div v-if="animal.isAuction" class="flex flex-col">
          <div class="text-sm font-bold text-amber-700">₱{{ (animal.currentBid || animal.startingBid || 0).toLocaleString() }}</div>
          <div class="text-xs text-amber-600">Current Bid</div>
          <div class="text-xs text-gray-500 mt-1">
            {{ animal.bidCount || 0 }} bid{{ animal.bidCount !== 1 ? 's' : '' }}
          </div>
          <div v-if="animal.endTime" class="text-xs text-red-600 font-medium mt-1">
            {{ getTimeRemaining(animal.endTime) }}
          </div>
        </div>
        <div v-else>
          <div class="text-sm font-bold text-green-700">₱{{ animal.price.toLocaleString() }}</div>
          <div class="text-xs text-green-600">Buy Now</div>
        </div>
      </td>

      <!-- Posted Date -->
      <td class="px-4 py-3 whitespace-nowrap">
        <div class="text-sm text-gray-600">{{ formatDate(animal.datePosted) }}</div>
      </td>

      <!-- Status -->
      <td class="px-4 py-3">
        <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(computedStatus)}`">
          {{ computedStatus }}
        </span>
      </td>

      <!-- Actions -->
      <td class="px-4 py-3 whitespace-nowrap text-right">
        <button @click="$emit('openModal', animal)"
          class="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors flex items-center gap-1 shadow hover:shadow-md">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Details
        </button>
      </td>
    </tr>
  </template>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  contact: string;
  address: string;
  avatar: string;
}

interface Animal {
  id: string;
  title: string;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  status?: string;
  healthStatus?: string[];
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
  location: string;
  isAuction?: boolean;
  startingBid?: number;
  currentBid?: number;
  bidCount?: number;
  endTime?: string;
  duration?: string;
  auctionStartTime?: string;
}

// Props
const props = defineProps<{
  animal: Animal;
  isSidebarExpanded?: boolean;
  weightUnit?: string;
  displayMode?: 'card' | 'table';
  showTableHeader?: boolean;
}>();

// Emits
defineEmits(['openModal']);

// Default props values
const isSidebarExpanded = props.isSidebarExpanded ?? false;
const weightUnit = props.weightUnit ?? 'kg';
const displayMode = props.displayMode ?? 'table'; // Changed default to 'table'
const showTableHeader = props.showTableHeader ?? false;

// Computed property to auto-generate status
const computedStatus = computed(() => {
  if (props.animal.status) {
    return props.animal.status;
  }

  const { quantity, isAuction, endTime } = props.animal;

  if (isAuction) {
    if (endTime) {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      if (end <= now) {
        return 'Auction Ended';
      }
    }
    return 'Live Auction';
  }

  if (quantity === 0) {
    return 'Out of Stock';
  } else if (quantity <= 3) {
    return 'Low Stock';
  } else {
    return 'Available';
  }
});

// Methods
const getStatusClass = (status: string) => {
  switch (status) {
    case 'Available':
    case 'In Stock':
      return 'bg-green-100/90 text-green-800 border-green-300';
    case 'Low Stock':
      return 'bg-yellow-100/90 text-yellow-800 border-yellow-300';
    case 'Out of Stock':
      return 'bg-red-100/90 text-red-800 border-red-300';
    case 'Live Auction':
      return 'bg-amber-100/90 text-amber-800 border-amber-300';
    case 'Auction Ended':
      return 'bg-gray-100/90 text-gray-800 border-gray-300';
    default:
      return 'bg-blue-100/90 text-blue-800 border-blue-300';
  }
};

const getTypeBadgeClassForImage = (type: string) => {
  switch (type) {
    case 'Cattle':
      return 'bg-green-500/90 text-white';
    case 'Pig':
      return 'bg-pink-500/90 text-white';
    case 'Goat':
      return 'bg-amber-500/90 text-white';
    case 'Chicken':
      return 'bg-red-500/90 text-white';
    case 'Buffalo':
      return 'bg-blue-500/90 text-white';
    case 'Duck':
      return 'bg-indigo-500/90 text-white';
    case 'Sheep':
      return 'bg-gray-500/90 text-white';
    default:
      return 'bg-gray-500/90 text-white';
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getTimeRemaining = (endTime?: string): string => {
  if (!endTime) return 'No end time';

  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  const timeLeft = end - now;

  if (timeLeft <= 0) return 'Ended';

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h left`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  } else {
    return `${minutes}m left`;
  }
};

// Enhanced inventory management functions
const getInventoryStatus = (quantity: number): string => {
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= 3) return 'Low Stock';
  if (quantity <= 10) return 'Available';
  return 'In Stock';
};

const getInventoryAlert = (quantity: number): { show: boolean; message: string; type: string } => {
  if (quantity === 0) {
    return { show: true, message: 'Out of stock', type: 'error' };
  } else if (quantity <= 3) {
    return { show: true, message: `Only ${quantity} left in stock`, type: 'warning' };
  }
  return { show: false, message: '', type: '' };
};

// Helper function to create new listing with auto-generated status
const createListingWithStatus = (animalData: Partial<Animal>): Animal => {
  const baseAnimal = {
    ...animalData,
    datePosted: new Date().toISOString(),
  } as Animal;

  return baseAnimal;
};

// Export helper function for use in parent components
defineExpose({
  createListingWithStatus,
  getInventoryStatus,
  getInventoryAlert,
  computedStatus
});
</script>