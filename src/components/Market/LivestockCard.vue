<!-- LivestockCard.vue -->
<template>
  <div
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
          :class="`px-2 py-1 text-xs font-bold rounded-full shadow backdrop-blur-md border ${getStatusClass(animal.status)}`">
          {{ animal.status }}
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
        <!-- Left Side - Title -->
        <div class="flex-1 pr-3">
          <h3 class="font-bold text-sm text-emerald-700 mb-1 leading-tight line-clamp-2">
            {{ generateEngagingTitle(animal) }}
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

      <!-- Compact Stats Section -->
      <div class="mb-4">
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

      <!-- Action Button - Different for auction vs normal -->
      <button v-if="animal.isAuction" @click.stop="$emit('openModal', animal)"
        class="w-full px-3 py-2 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md border border-amber-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        Place Bid
      </button>
      <button v-else @click.stop="$emit('openContactModal', animal)"
        class="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md border border-blue-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Contact Farmer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

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
}>();

// Default props values
const isSidebarExpanded = props.isSidebarExpanded ?? false;
const weightUnit = props.weightUnit ?? 'kg';


// Methods
const getStatusClass = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-green-100/90 text-green-800 border-green-300';
    case 'Low Stock':
      return 'bg-yellow-100/90 text-yellow-800 border-yellow-300';
    case 'Out of Stock':
      return 'bg-red-100/90 text-red-800 border-red-300';
    default:
      return 'bg-gray-100/90 text-gray-800 border-gray-300';
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

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  } else {
    return `${minutes}m left`;
  }
};

const generateEngagingTitle = (animal: Animal): string => {
  const { type, breed, status, gender, age, isAuction } = animal;

  if (isAuction) {
    const auctionTitles = [
      `AUCTION: Premium ${breed} ${type} - Live Bidding!`,
      `LIVE AUCTION: Quality ${breed} ${type} - Bid Now!`,
      `${breed} ${type} Auction - ${gender} ${age}`,
      `AUCTION ALERT: Exceptional ${breed} ${type}`,
      `BIDDING NOW: Farm-Fresh ${breed} ${type}`,
      `LIVE: Premium ${type} Stock - ${breed} Excellence`,
      `AUCTION: ${breed} ${type} - Raised with Care`,
      `BIDDING: Quality ${gender} ${breed} ${type}`,
      `LIVE AUCTION: Top-Grade ${breed} ${type}`,
      `AUCTION NOW: Healthy ${breed} ${type} Stock`
    ];
    return auctionTitles[animal.id % auctionTitles.length];
  }

  const titles = [
    `Premium ${breed} ${type} Ready for New Home!`,
    `Healthy ${breed} ${type} - ${status} Now!`,
    `Quality ${breed} ${type} - ${gender} ${age}`,
    `Farm-Fresh ${breed} ${type} - Direct from Farmer`,
    `Exceptional ${breed} ${type} - Limited Availability`,
    `Premium ${type} Stock - ${breed} Breed Excellence`,
    `${breed} ${type} - Raised with Care & Expertise`,
    `Healthy ${gender} ${breed} ${type} - Ready Now!`,
    `Top-Quality ${breed} ${type} - ${status}`,
    `Farm-Raised ${breed} ${type} - Healthy & Strong`
  ];

  // Use animal ID to get a consistent title for each animal
  return titles[animal.id % titles.length];
};
</script>