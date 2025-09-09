<!-- Marketplace.vue -->
<template>
  <div class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
    </div>

    <!-- NavBar -->
    <div class="sticky top-0 z-50">
      <NavBar />
    </div>

    <!-- DYNAMIC COMBINED HEADER -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div
        class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm"
      >
        <!-- Left side - Logo and Title -->
        <div class="flex items-center min-w-0">
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg"
          >
            <svg
              class="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                opacity="0.3"
              />
              <path
                d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
              />
              <path
                d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                fill="#fff"
              />
              <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
              <path
                d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"
                fill="#4ade80"
              />
              <path
                d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z"
                fill="#fff"
              />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-bold text-white truncate">
              Livestock Marketplace
            </h1>
            <p class="text-green-100 text-sm opacity-90 truncate">
              {{
                isFarmerView
                  ? "Discover quality livestock from verified farmers"
                  : "Browse premium livestock from verified farmers"
              }}
            </p>
          </div>
        </div>

        <!-- Right side - Dynamic Content Area -->
        <div class="flex-1 flex justify-end min-w-0">
          <!-- Farmer View -->
          <div
            v-if="isFarmerView"
            class="bg-blue-100/80 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-blue-200 shadow-md"
          >
            <svg
              class="w-4 h-4 text-blue-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
              />
            </svg>
            <span class="text-sm font-semibold truncate ml-2"
              >Welcome Farmer - Manage your livestock</span
            >
            <router-link
              to="/LivestockManagement"
              class="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0"
            >
              Post Livestock
            </router-link>
          </div>

          <!-- Guest Mode -->
          <div
            v-else-if="!currentUser?.email"
            class="bg-yellow-100/80 text-yellow-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-yellow-200 shadow-md max-w-full"
          >
            <svg
              class="w-4 h-4 text-yellow-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-semibold truncate ml-2"
              >Guest mode - Sign In for full access</span
            >
            <router-link
              to="/signin"
              class="whitespace-nowrap bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0"
            >
              Sign In
            </router-link>
          </div>

          <!-- Buyer View -->
          <div
            v-else-if="currentUser?.role !== 'Farmer'"
            class="flex items-center gap-3 max-w-full"
          >
            <!-- Account Not Verified -->
            <div
              v-if="!currentUser?.isVerified"
              class="bg-red-100/80 text-red-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-red-200 shadow-md"
            >
              <svg
                class="w-4 h-4 text-red-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                />
              </svg>
              <span class="text-sm font-semibold truncate ml-2"
                >Buyer account - Verify to upgrade</span
              >
              <button
                @click="goToUserProfile"
                class="whitespace-nowrap bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0"
              >
                Verify Account
              </button>
            </div>

            <!-- Pending Upgrade -->
            <div
              v-else-if="hasPendingUpgrade"
              class="bg-red-100/80 text-red-800 px-4 py-2 rounded-lg flex items-center gap-2 border border-red-200 shadow-md"
            >
              <svg
                class="w-4 h-4 text-red-500 animate-pulse shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 018 8zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm font-semibold">Upgrade pending</span>
            </div>

            <!-- Can Upgrade -->
            <div
              v-else
              class="bg-red-100/80 text-red-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-red-200 shadow-md"
            >
              <svg
                class="w-4 h-4 text-red-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                />
              </svg>
              <span class="text-sm font-semibold truncate ml-2"
                >Ready to become a Farmer?</span
              >
              <button
                @click="goToUpgradeForm"
                class="whitespace-nowrap bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0"
              >
                Upgrade Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content with Sidebar -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Enhanced Filters Sidebar Component -->
      <FilterSidebar 
        :isExpanded="isSidebarExpanded"
        :filters="filters"
        :activeTab="activeTab"
        :uniqueTypes="uniqueTypes"
        :uniqueBreeds="uniqueBreeds"
        :uniqueLocations="uniqueLocations"
        @toggleSidebar="toggleSidebar"
        @filtersChanged="handleFiltersChanged"
        @resetFilters="resetFilters"
      />

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- STICKY Results Summary with Tabs and Sort -->
        <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-3">
          <!-- Use grid to keep layout stable -->
          <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-3">
            
            <!-- Left side - Results Counter -->
            <div class="flex items-center gap-2 justify-start">
              <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <h3 class="text-sm font-bold text-gray-800">
                {{ currentFilteredAnimals.length }} {{ currentFilteredAnimals.length === 1 ? 'Listing' : 'Listings' }} Found
              </h3>
            </div>

            <!-- Center - Tabs -->
            <div class="flex justify-center gap-2">
              <!-- Buy Now Tab -->
              <button 
                @click="activeTab = 'normal'"
                :class="`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center gap-2 border ${
                  activeTab === 'normal' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md border-green-500' 
                    : 'text-gray-600 hover:text-gray-800 border-gray-200'
                }`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span class="hidden sm:inline">Buy Now</span>
                <span :class="`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === 'normal' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                }`">{{ normalListings.length }}</span>
              </button>

              <!-- Auction Tab -->
              <button 
                @click="activeTab = 'auction'"
                :class="`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center gap-2 border ${
                  activeTab === 'auction' 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md border-amber-500' 
                    : 'text-gray-600 hover:text-gray-800 border-gray-200'
                }`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="hidden sm:inline">Auctions</span>
                <span :class="`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === 'auction' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
                }`">{{ auctionListings.length }}</span>
              </button>
            </div>

            <!-- Right side - Status + Sort -->
            <div class="flex items-center justify-end gap-4">
              <!-- Auction Status (space always reserved, inline with sort) -->
              <div class="flex items-center gap-2 min-w-[160px]">
                <div v-if="activeTab === 'auction'" class="text-xs text-gray-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1">
                  <div class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span class="hidden sm:inline">Live bidding available</span>
                  <span class="sm:hidden">Live</span>
                </div>
              </div>

              <!-- Sort -->
              <div class="flex items-center gap-2">
                <label class="text-xs font-semibold text-gray-700 hidden sm:inline">Sort By:</label>
                <select v-model="sortBy" class="px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
                  <option value="datePosted">Newest</option>
                  <option value="datePosted-asc">Oldest</option>
                  <option value="price">Price (Low)</option>
                  <option value="price-desc">Price (High)</option>
                  <option v-if="activeTab === 'auction'" value="endTime">Ending Soon</option>
                  <option v-if="activeTab === 'auction'" value="bids">Most Bids</option>
                  <option v-if="activeTab === 'auction'" value="bidActivity">Most Active</option>
                  <option value="type">Type (A-Z)</option>
                  <option value="type-desc">Type (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <!-- SCROLLABLE Cards Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-4">
            <!-- Card View using LivestockCard Component -->
            <div 
              v-if="currentFilteredAnimals.length > 0" 
              :class="`grid gap-4 ${isFarmerView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4'}`"
            >
              <LivestockCard
                v-for="animal in currentFilteredAnimals"
                :key="animal.id"
                :animal="animal"
                :isSidebarExpanded="isSidebarExpanded"
                :weightUnit="weightUnit"
                @openModal="openModal"
                @openContactModal="openContactModal"
              />
            </div>

            <!-- Enhanced Empty State -->
            <div v-if="currentFilteredAnimals.length === 0" class="flex flex-col items-center justify-center py-12">
              <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/60 max-w-md text-center shadow-xl">
                <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <svg v-if="activeTab === 'auction'" class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 01118 0z" />
                  </svg>
                  <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">
                  {{ activeTab === 'auction' ? 'No auctions found' : 'No listings found' }}
                </h3>
                <p class="text-xs text-gray-500 mb-4 leading-relaxed">
                  {{ activeTab === 'auction' 
                    ? 'We couldn\'t find any live auctions matching your current search criteria. Try adjusting your filters or check back later for new auctions.'
                    : 'We couldn\'t find any livestock matching your current search criteria. Try adjusting your filters or browse all available listings.'
                  }}
                </p>
                <button @click="resetFilters" class="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animal Details Modal -->
    <AnimalDetailsModal 
      v-if="isModalOpen && selectedAnimal && !selectedAnimal.isAuction" 
      :animal="selectedAnimal"
      @close="closeModal"
      @contact="contactFarmerFromModal"
    />

    <!-- Auction Details Modal -->
    <AuctionDetailsModal
      v-if="isAuctionModalOpen && selectedAnimal && selectedAnimal.isAuction"
      :animal="selectedAnimal"
      :isOpen="isAuctionModalOpen"
      :currentUser="currentUser"
      @close="closeAuctionModal"
      @placeBid="handlePlaceBid"
      @redirectToLogin="redirectToLogin"
    />

    <!-- Contact Farmer Modal -->
    <ContactFarmerModal 
      v-if="isContactModalOpen && selectedAnimalForContact" 
      :animal="selectedAnimalForContact"
      :currentUser="currentUser"
      @close="closeContactModal"
      @send="sendMessage"
    />

    <!-- Enhanced Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">Success!</h4>
            <div class="text-xs text-gray-700 font-medium">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded-md">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import FilterSidebar from '../../components/Market/FilterSidebar.vue';
import AnimalDetailsModal from '../../components/Market/AnimalDetailsModal.vue';
import ContactFarmerModal from '../../components/Market/ContactFarmerModal.vue';
import AuctionDetailsModal from '../../components/Market/AuctionDetailsModal.vue';
import LivestockCard from '../../components/Market/LivestockCard.vue';
import { getCurrentUser} from '../../services/user';

interface ServiceUser {
  email?: string;
  name?: string;
  displayName?: string;
  role?: string;
  isVerified?: boolean;
  [key: string]: any;
}

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

interface Filters {
  search: string;
  types: string[];
  breeds: string[];
  locations: string[];
  priceRanges: string[];
  genders: string[];
  // New auction-specific filters
  auctionStatuses: string[];
  endTimeRanges: string[];
  bidCountMin: number | null;
  bidCountMax: number | null;
  startingBidRanges: string[];
  auctionDurations: string[];
  bidActivities: string[];
}

// Props to determine view mode
const props = defineProps<{
  viewMode?: 'buyer' | 'farmer';
}>();

const router = useRouter();
// Ensure currentUser has a 'name' property for ContactFarmerModal compatibility
const rawUser = getCurrentUser() as ServiceUser | null;
const currentUser = rawUser
  ? {
      ...rawUser,
      name: rawUser.name || rawUser.displayName || rawUser.email || 'User',
      email: rawUser.email || ''
    }
  : null;
const hasPendingUpgrade = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

const isModalOpen = ref(false);
const isAuctionModalOpen = ref(false);
const selectedAnimal = ref<Animal | null>(null);

const isContactModalOpen = ref(false);
const selectedAnimalForContact = ref<Animal | null>(null);

// Tab state
const activeTab = ref<'normal' | 'auction'>('normal');

// View mode - defaults to buyer if user is not a farmer
const isFarmerView = computed(() => {
  if (props.viewMode) return props.viewMode === 'farmer';
  return currentUser?.role === 'Farmer';
});

// Sidebar state
const isSidebarExpanded = ref(true);

// Sorting
const sortBy = ref('datePosted');

// Weight unit toggle
const weightUnit = ref('kg');

// Filters
const filters = ref<Filters>({
  search: '',
  types: [],
  breeds: [],
  locations: [],
  priceRanges: [],
  genders: [],
  // New auction filters
  auctionStatuses: [],
  endTimeRanges: [],
  bidCountMin: null,
  bidCountMax: null,
  startingBidRanges: [],
  auctionDurations: [],
  bidActivities: []
});

// Sample animal data with more auction items
const animals = ref<Animal[]>([
  {
    id: 1,
    type: 'Cattle',
    breed: 'Angus',
    weight: 450,
    quantity: 5,
    age: '18-24 months',
    gender: 'Male',
    status: 'Available',
    price: 45000,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Healthy Angus cattle, vaccinated and dewormed. Raised in open pasture with organic feed.',
    datePosted: new Date().toISOString(),
    farmer: {
      id: 2,
      name: 'Maria Santos',
      farmName: 'Santos Ranch',
      contact: '+63 921 777 8888',
      address: '123 Poultry Lane, Barangay Fowl, Pampanga',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    location: 'Pampanga',
    isAuction: false
  },
  // Auction items with enhanced data
  {
    id: 6,
    type: 'Pig',
    breed: 'Landrace',
    weight: 95,
    quantity: 3,
    age: '5-7 months',
    gender: 'Mixed',
    status: 'Available',
    price: 0,
    deliveryOptions: ['pickup'],
    images: [
      'https://media.istockphoto.com/id/140462837/photo/cute-pig-leaning-on-railing-of-his-cot.jpg?s=612x612&w=0&k=20&c=wX4-WVElHzIvfJoppwRZOgHKu3geSc3zReM_17lcwVc='
    ],
    description: 'High-quality Landrace pigs, excellent for commercial production. Well-fed and healthy.',
    datePosted: new Date(Date.now() - 43200000).toISOString(),
    farmer: {
      id: 7,
      name: 'Elena Morales',
      farmName: 'Morales Hog Farm',
      contact: '+63 926 333 4444',
      address: '777 Swine Valley, Barangay Pork, Tarlac',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    location: 'Tarlac',
    isAuction: true,
    startingBid: 24000,
    currentBid: 28500,
    bidCount: 5,
    endTime: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
    duration: '3-7d',
    auctionStartTime: new Date(Date.now() - 345600000).toISOString() // Started 4 days ago
  },
  {
    id: 7,
    type: 'Cattle',
    breed: 'Holstein',
    weight: 520,
    quantity: 2,
    age: '2-3 years',
    gender: 'Female',
    status: 'Available',
    price: 0,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Premium Holstein dairy cows, excellent milk production. Vaccinated and health certified.',
    datePosted: new Date(Date.now() - 86400000).toISOString(),
    farmer: {
      id: 8,
      name: 'Roberto Cruz',
      farmName: 'Cruz Dairy Farm',
      contact: '+63 917 555 6666',
      address: '456 Milk Road, Barangay Dairy, Bataan',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    location: 'Bataan',
    isAuction: true,
    startingBid: 55000,
    currentBid: 72000,
    bidCount: 12,
    endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    duration: '3-7d',
    auctionStartTime: new Date(Date.now() - 518400000).toISOString() // Started 6 days ago
  },
  {
    id: 8,
    type: 'Goat',
    breed: 'Boer',
    weight: 35,
    quantity: 8,
    age: '8-12 months',
    gender: 'Mixed',
    status: 'Available',
    price: 0,
    deliveryOptions: ['pickup'],
    images: [
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Young Boer goats, perfect for meat production. Healthy and well-socialized.',
    datePosted: new Date(Date.now() - 172800000).toISOString(),
    farmer: {
      id: 9,
      name: 'Carmen Dela Cruz',
      farmName: 'Dela Cruz Goat Farm',
      contact: '+63 922 777 9999',
      address: '789 Goat Hill, Barangay Capra, Laguna',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg'
    },
    location: 'Laguna',
    isAuction: true,
    startingBid: 8000,
    currentBid: 8000,
    bidCount: 0,
    endTime: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
    duration: '1-3d',
    auctionStartTime: new Date(Date.now() - 7200000).toISOString() // Started 2 hours ago
  },
  {
    id: 9,
    type: 'Chicken',
    breed: 'Rhode Island Red',
    weight: 2.5,
    quantity: 50,
    age: '6 months',
    gender: 'Female',
    status: 'Available',
    price: 0,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Productive laying hens, excellent egg layers. Healthy and disease-free.',
    datePosted: new Date(Date.now() - 259200000).toISOString(),
    farmer: {
      id: 10,
      name: 'Jose Ramirez',
      farmName: 'Ramirez Poultry',
      contact: '+63 918 888 0000',
      address: '321 Feather Street, Barangay Poultry, Nueva Ecija',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
    },
    location: 'Nueva Ecija',
    isAuction: true,
    startingBid: 15000,
    currentBid: 22500,
    bidCount: 18,
    endTime: new Date(Date.now() + 21600000).toISOString(), // 6 hours from now
    duration: '7-14d',
    auctionStartTime: new Date(Date.now() - 777600000).toISOString() // Started 9 days ago
  }
]);

// Computed properties
const normalListings = computed(() => animals.value.filter(animal => !animal.isAuction));
const auctionListings = computed(() => animals.value.filter(animal => animal.isAuction));

const uniqueTypes = computed(() => {
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const types = new Set(currentAnimals.map(animal => animal.type));
  return Array.from(types).sort();
});

const uniqueBreeds = computed(() => {
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const breeds = new Set(currentAnimals.map(animal => animal.breed));
  return Array.from(breeds).sort();
});

const uniqueLocations = computed(() => {
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const locations = new Set(currentAnimals.map(animal => animal.location));
  return Array.from(locations).sort();
});

// Helper function to get auction status
const getAuctionStatus = (animal: Animal): string => {
  if (!animal.isAuction || !animal.endTime) return 'Unknown';
  
  const now = new Date().getTime();
  const endTime = new Date(animal.endTime).getTime();
  const timeLeft = endTime - now;
  
  if (timeLeft <= 0) return 'Ended';
  if (timeLeft <= 3600000) return 'Ending Soon'; // 1 hour
  if (animal.bidCount && animal.bidCount >= 10) return 'Hot Auction';
  if (animal.datePosted && new Date(animal.datePosted).getTime() > now - 86400000) return 'New Listing'; // 24 hours
  return 'Live';
};

// Helper function to get auction duration category
const getAuctionDurationCategory = (animal: Animal): string => {
  if (!animal.isAuction || !animal.auctionStartTime || !animal.endTime) return 'unknown';
  
  const startTime = new Date(animal.auctionStartTime).getTime();
  const endTime = new Date(animal.endTime).getTime();
  const duration = endTime - startTime;
  
  const days = duration / (1000 * 60 * 60 * 24);
  
  if (days <= 3) return '1-3d';
  if (days <= 7) return '3-7d';
  if (days <= 14) return '7-14d';
  return '14d+';
};

// Helper function to get bid activity category
const getBidActivityCategory = (animal: Animal): string => {
  const bidCount = animal.bidCount || 0;
  
  if (bidCount === 0) return 'No Bids Yet';
  if (bidCount <= 5) return 'Low Activity (1-5 bids)';
  if (bidCount <= 10) return 'Moderate Activity (5-10 bids)';
  return 'High Activity (10+ bids)';
};

const currentFilteredAnimals = computed(() => {
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  
  let filtered = currentAnimals.filter(animal => {
    // Search filter
    const searchLower = filters.value.search.toLowerCase();
    const matchesSearch = !filters.value.search ||
      animal.type.toLowerCase().includes(searchLower) ||
      animal.breed.toLowerCase().includes(searchLower) ||
      animal.description.toLowerCase().includes(searchLower) ||
      (animal.farmer.farmName && animal.farmer.farmName.toLowerCase().includes(searchLower)) ||
      animal.farmer.name.toLowerCase().includes(searchLower);

    // Type filter (multi-select)
    const matchesType = filters.value.types.length === 0 || 
      filters.value.types.includes(animal.type);

    // Breed filter (multi-select)
    const matchesBreed = filters.value.breeds.length === 0 || 
      filters.value.breeds.includes(animal.breed);

    // Location filter (multi-select)
    const matchesLocation = filters.value.locations.length === 0 || 
      filters.value.locations.includes(animal.location);

    // Gender filter (multi-select)
    const matchesGender = filters.value.genders.length === 0 || 
      filters.value.genders.includes(animal.gender);

    // Price range filter (multi-select) - adjusted for auctions
    let matchesPrice = true;
    if (filters.value.priceRanges.length > 0) {
      matchesPrice = filters.value.priceRanges.some(range => {
        const [min, max] = range.split('-');
        const animalPrice = animal.isAuction ? (animal.currentBid || animal.startingBid || 0) : animal.price;
        if (max) {
          return animalPrice >= parseInt(min) && animalPrice <= parseInt(max);
        } else {
          return animalPrice >= parseInt(min.replace('+', ''));
        }
      });
    }

    // NEW: Auction-specific filters (only apply when viewing auctions)
    if (activeTab.value === 'auction' && animal.isAuction) {
      // Auction Status filter
      if (filters.value.auctionStatuses.length > 0) {
        const animalStatus = getAuctionStatus(animal);
        if (!filters.value.auctionStatuses.includes(animalStatus)) {
          return false;
        }
      }

      // End Time Range filter
      if (filters.value.endTimeRanges.length > 0) {
        const now = new Date().getTime();
        const endTime = animal.endTime ? new Date(animal.endTime).getTime() : 0;
        const timeLeft = endTime - now;
        const hoursLeft = timeLeft / (1000 * 60 * 60);
        
        const matchesEndTime = filters.value.endTimeRanges.some(range => {
          switch (range) {
            case '0-1h': return hoursLeft <= 1;
            case '0-3h': return hoursLeft <= 3;
            case '0-6h': return hoursLeft <= 6;
            case '0-12h': return hoursLeft <= 12;
            case '0-24h': return hoursLeft <= 24;
            case '24h+': return hoursLeft > 24;
            default: return false;
          }
        });
        
        if (!matchesEndTime) return false;
      }

      // Bid Count Range filter
      const bidCount = animal.bidCount || 0;
      if (filters.value.bidCountMin !== null && bidCount < filters.value.bidCountMin) {
        return false;
      }
      if (filters.value.bidCountMax !== null && bidCount > filters.value.bidCountMax) {
        return false;
      }

      // Starting Bid Range filter
      if (filters.value.startingBidRanges.length > 0) {
        const startingBid = animal.startingBid || 0;
        const matchesStartingBid = filters.value.startingBidRanges.some(range => {
          const [min, max] = range.split('-');
          if (max) {
            return startingBid >= parseInt(min) && startingBid <= parseInt(max);
          } else {
            return startingBid >= parseInt(min.replace('+', ''));
          }
        });
        
        if (!matchesStartingBid) return false;
      }

      // Auction Duration filter
      if (filters.value.auctionDurations.length > 0) {
        const durationCategory = getAuctionDurationCategory(animal);
        if (!filters.value.auctionDurations.includes(durationCategory)) {
          return false;
        }
      }

      // Bid Activity filter
      if (filters.value.bidActivities.length > 0) {
        const activityCategory = getBidActivityCategory(animal);
        if (!filters.value.bidActivities.includes(activityCategory)) {
          return false;
        }
      }
    }

    return matchesSearch && matchesType && matchesBreed && matchesLocation && matchesPrice && matchesGender;
  });

  // Sorting - enhanced for auctions
  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'datePosted':
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      case 'datePosted-asc':
        return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
      case 'price':
        const aPrice = a.isAuction ? (a.currentBid || a.startingBid || 0) : a.price;
        const bPrice = b.isAuction? (b.currentBid || b.startingBid || 0) : b.price;
        return aPrice - bPrice;
      case 'price-desc':
        const aPriceDesc = a.isAuction ? (a.currentBid || a.startingBid || 0) : a.price;
        const bPriceDesc = b.isAuction ? (b.currentBid || b.startingBid || 0) : b.price;
        return bPriceDesc - aPriceDesc;
      case 'endTime':
        if (a.endTime && b.endTime) {
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
        return 0;
      case 'bids':
        return (b.bidCount || 0) - (a.bidCount || 0);
      case 'bidActivity':
        // Sort by bid activity (bids per hour)
        const aActivity = a.bidCount || 0;
        const bActivity = b.bidCount || 0;
        return bActivity - aActivity;
      case 'type':
        return a.type.localeCompare(b.type);
      case 'type-desc':
        return b.type.localeCompare(a.type);
      case 'breed':
        return a.breed.localeCompare(b.breed);
      case 'breed-desc':
        return b.breed.localeCompare(a.breed);
      case 'quantity':
        return a.quantity - b.quantity;
      case 'quantity-desc':
        return b.quantity - a.quantity;
      default:
        return 0;
    }
  });
});

// Methods
const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const handleFiltersChanged = (newFilters: Filters) => {
  filters.value = { ...newFilters };
};

const showToastNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 4000);
};

const openModal = (animal: Animal) => {
  selectedAnimal.value = animal;
  if (animal.isAuction) {
    isAuctionModalOpen.value = true;
  } else {
    isModalOpen.value = true;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedAnimal.value = null;
};

const closeAuctionModal = () => {
  isAuctionModalOpen.value = false;
  selectedAnimal.value = null;
};

const openContactModal = (animal: Animal) => {
  if (!isFarmerView.value && !currentUser?.email) {
    router.push('/signin');
    return;
  }
  selectedAnimalForContact.value = animal;
  isContactModalOpen.value = true;
};

const closeContactModal = () => {
  isContactModalOpen.value = false;
  selectedAnimalForContact.value = null;
};

const sendMessage = (messageData: { message: string; contactMethod: string }) => {
  // Here you would typically send the message to a backend service
  // For now, we'll just show a success notification
  showToastNotification(`Message sent to ${selectedAnimalForContact.value?.farmer.farmName || selectedAnimalForContact.value?.farmer.name} via ${messageData.contactMethod}`);
  closeContactModal();
};

const contactFarmerFromModal = (contactInfo: string) => {
  showToastNotification(`Contact information has been copied to clipboard: ${contactInfo}`);
  navigator.clipboard.writeText(contactInfo);
  closeModal();
};

const resetFilters = () => {
  filters.value = {
    search: '',
    types: [],
    breeds: [],
    locations: [],
    priceRanges: [],
    genders: [],
    // Reset auction filters
    auctionStatuses: [],
    endTimeRanges: [],
    bidCountMin: null,
    bidCountMax: null,
    startingBidRanges: [],
    auctionDurations: [],
    bidActivities: []
  };
  sortBy.value = 'datePosted';
  showToastNotification('All filters have been reset');
};

const goToUpgradeForm = () => {
  router.push('/upgradeForm');
};

const goToUserProfile = () => {
  router.push('/userProfile');
};

const redirectToLogin = () => {
  router.push('/signin');
};

const handlePlaceBid = (bidData: { animalId: number; amount: number }) => {
  // Find the animal in the list
  const animalIndex = animals.value.findIndex(a => a.id === bidData.animalId);
  if (animalIndex !== -1) {
    // Update the animal's bid information
    animals.value[animalIndex].currentBid = bidData.amount;
    animals.value[animalIndex].bidCount = (animals.value[animalIndex].bidCount || 0) + 1;
    
    showToastNotification(`Bid of ₱${bidData.amount.toLocaleString()} placed successfully!`);
  }
};

// Lifecycle hooks
onMounted(() => {
  const requests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]');
  hasPendingUpgrade.value = currentUser?.email
    ? requests.some((r: any) => r.email === currentUser.email)
    : false;
});
</script>