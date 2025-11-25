<!-- Marketplace.vue - COMPLETE FIXED VERSION WITH PROPER MESSAGING -->
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
      <NavBar 
        :isAuthenticated="isAuthenticated"
        :userRole="userRole"
        :userName="userName"
        @logout="handleLogout"
        @toggleAuth="toggleAuth"
      />
    </div>

    <!-- Dynamic Combined Header -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
        <!-- Left side - Logo and Title -->
        <div class="flex items-center min-w-0">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg cursor-pointer" @click="scrollToTop">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#fff" />
              <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
              <path d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" fill="#4ade80" />
              <path d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="#fff" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-bold text-white truncate cursor-default">Livestock Marketplace</h1>
            <p class="text-green-100 text-sm opacity-90 truncate cursor-default">
              {{ isFarmerView ? "Manage your livestock listings and auctions" : "Discover quality livestock from verified farmers" }}
            </p>
          </div>
        </div>

        <!-- Right side - Dynamic Content Area (only render after user data loads) -->
        <div v-if="!isLoadingUser" class="flex-1 flex justify-end min-w-0">
          <!-- Farmer View -->
          <div v-if="isFarmerView" class="bg-blue-100/80 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-blue-200 shadow-md cursor-default">
            <svg class="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            <span class="text-sm font-semibold truncate ml-2">Welcome Farmer - Manage your livestock</span>
            <button @click="navigateToLivestockManagement" class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
              Post Livestock
            </button>
          </div>

          <!-- Guest Mode -->
          <div v-else-if="!isAuthenticated" class="bg-yellow-100/80 text-yellow-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-yellow-200 shadow-md max-w-full cursor-default">
            <svg class="w-4 h-4 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm font-semibold truncate ml-2">Guest mode - Sign In for full access</span>
            <button @click="toggleAuth" class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
              Sign In
            </button>
          </div>

          <!-- Buyer View -->
          <div v-else class="flex items-center gap-3 max-w-full">
            <div v-if="!profileCompleted" class="bg-red-100/80 text-red-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-red-200 shadow-md cursor-default">
              <svg class="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span class="text-sm font-semibold truncate ml-2">Buyer account - Verify to upgrade</span>
              <button @click="showToastNotification('This would navigate to user profile')" class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
                Verify Account
              </button>
            </div>
            <div v-else-if="hasPendingUpgrade" class="bg-red-100/80 text-red-800 px-4 py-2 rounded-lg flex items-center gap-2 border border-red-200 shadow-md cursor-default">
              <svg class="w-4 h-4 text-red-500 animate-pulse shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm font-semibold">Upgrade pending</span>
            </div>
            <div v-else class="bg-red-100/80 text-red-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-red-200 shadow-md cursor-default">
              <svg class="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span class="text-sm font-semibold truncate ml-2">Ready to become a Farmer?</span>
              <button @click="showToastNotification('This would navigate to upgrade form')" class="cursor-pointer whitespace-nowrap bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
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
        <!-- Sticky Results Summary with Tabs and Sort -->
        <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-3">
          <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-3">
            <!-- Left side - Results Counter -->
            <div class="flex items-center gap-2 justify-start">
              <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center cursor-default">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <h3 class="text-sm font-bold text-gray-800 cursor-default">
                {{ isLoadingData ? 'Loading...' : `${currentFilteredAnimals.length} ${currentFilteredAnimals.length === 1 ? 'Listing' : 'Listings'} Found` }}
              </h3>
            </div>

            <!-- Center - Tabs -->
            <div class="flex justify-center gap-2">
              <button 
                @click="activeTab = 'normal'"
                :class="`cursor-pointer px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center gap-2 border ${
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
                }`">{{ isLoadingData ? '...' : normalListings.length }}</span>
              </button>

              <button 
                @click="activeTab = 'auction'"
                :class="`cursor-pointer px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center gap-2 border ${
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
                }`">{{ isLoadingData ? '...' : auctionListings.length }}</span>
              </button>
            </div>

            <!-- Right side - Status + Sort -->
            <div class="flex items-center justify-end gap-4">
              <div class="flex items-center gap-2 min-w-[160px]">
                <div v-if="activeTab === 'auction'" class="text-xs text-gray-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1 cursor-default">
                  <div class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span class="hidden sm:inline">Live bidding available</span>
                  <span class="sm:hidden">Live</span>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <label class="text-xs font-semibold text-gray-700 hidden sm:inline cursor-default">Sort By:</label>
                <select v-model="sortBy" class="cursor-pointer px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
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
        
        <!-- Scrollable Cards Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-4">
            <!-- Loading Skeleton Cards -->
            <div 
              v-if="isLoadingData" 
              :class="`grid gap-4 ${isFarmerView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4'}`"
            >
              <div
                v-for="n in 8"
                :key="`skeleton-${n}`"
                class="bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 p-4 shadow-lg animate-pulse cursor-default"
              >
                <div class="w-full h-48 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4 relative overflow-hidden">
                  <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
                <div class="space-y-3">
                  <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-3/4 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-1/2 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 pt-2">
                    <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>
                  <div class="h-6 bg-gradient-to-r from-green-200 to-green-300 rounded-md w-2/3 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actual Card View using LivestockCard Component -->
            <div 
              v-else-if="currentFilteredAnimals.length > 0" 
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
            <div v-else-if="!isLoadingData && currentFilteredAnimals.length === 0" class="flex flex-col items-center justify-center py-12">
              <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/60 max-w-md text-center shadow-xl cursor-default">
                <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <svg v-if="activeTab === 'auction'" class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                <button @click="resetFilters" class="cursor-pointer px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
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
      :currentUser="currentUserForModal"
      @close="closeModal"
      @contact="contactFarmerFromModal"
    />

    <!-- Auction Details Modal -->
    <AuctionDetailsModal
      v-if="isAuctionModalOpen && selectedAnimal && selectedAnimal.isAuction"
      :animal="selectedAnimal"
      :isOpen="isAuctionModalOpen"
      :currentUser="currentUserForModal"
      @close="closeAuctionModal"
      @placeBid="handlePlaceBid"
      @redirectToLogin="redirectToLogin"
    />

    <!-- Contact Farmer Modal - PROPERLY FIXED -->
    <ContactFarmerModal 
      v-if="isContactModalOpen && selectedAnimalForContact && currentUserForModal" 
      :animal="selectedAnimalForContact"
      :currentUser="currentUserForModal"
      @close="closeContactModal"
      @messageSent="handleMessageSent"
    />

    <!-- Enhanced Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg cursor-default">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5 cursor-default">Success!</h4>
            <div class="text-xs text-gray-700 font-medium cursor-default">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="cursor-pointer ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded-md">
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
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '../../supabase';
import { marketplaceService } from '@/services/marketplaceService';
import type { UserDetails } from '@/services/marketplaceService';

// Import components
import NavBar from '../../components/NavBar.vue';
import FilterSidebar from '../../components/Market/FilterSidebar.vue';
import AnimalDetailsModal from '../../components/Market/AnimalDetailsModal.vue';
import ContactFarmerModal from '../../components/Market/ContactFarmerModal.vue';
import AuctionDetailsModal from '../../components/Market/AuctionDetailsModal.vue';
import LivestockCard from '../../components/Market/LivestockCard.vue';

// Import types
import type { 
  Animal, 
  Filters, 
  BidData, 
  CurrentUser,
  TabType,
  UserRole,
  SortOption,
  WeightUnit
} from '@/types/animalTypes';

// ===== ROUTER & ROUTE =====
const router = useRouter();
const route = useRoute();

// ===== PROPS =====
const props = defineProps<{
  viewMode?: 'buyer' | 'farmer';
}>();

// ===== PERFORMANCE OPTIMIZATIONS =====
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const VISIBILITY_REFRESH_THRESHOLD = 30 * 1000; // Refresh if away for 30+ seconds
let lastFetchTime = 0;
let lastVisibilityTime = Date.now();
const isRefreshing = ref(false);

// ===== AUTHENTICATION STATE =====
const isAuthenticated = ref<boolean>(false);
const currentUserId = ref<string | null>(null);
const userRole = ref<UserRole>('buyer');
const userName = ref<string>('Guest User');
const userEmail = ref<string>('');
const profileCompleted = ref<boolean>(false);
const hasPendingUpgrade = ref<boolean>(false);
const currentUserDetails = ref<UserDetails | null>(null);

// ===== LOADING STATES =====
const isLoadingUser = ref<boolean>(true);
const isLoadingData = ref<boolean>(true);

// ===== COMPUTED =====
const isFarmerView = computed<boolean>(() => {
  if (props.viewMode) {
    return props.viewMode === 'farmer';
  }
  
  if (userRole.value === null) {
    return false;
  }
  
  return userRole.value === 'farmer';
});

// Proper currentUser for modal
const currentUserForModal = computed<CurrentUser | null>(() => {
  if (!isAuthenticated.value || !currentUserDetails.value) {
    return null;
  }

  return {
    name: currentUserDetails.value.fullName,
    email: currentUserDetails.value.email,
    role: currentUserDetails.value.role as 'buyer' | 'farmer',
    id: currentUserDetails.value.id,
    phone: currentUserDetails.value.phone,
    address: currentUserDetails.value.address,
    avatar: currentUserDetails.value.avatar
  };
});

// ===== STATE =====
const showToast = ref<boolean>(false);
const toastMessage = ref<string>('');

const isModalOpen = ref<boolean>(false);
const isAuctionModalOpen = ref<boolean>(false);
const selectedAnimal = ref<Animal | null>(null);

const isContactModalOpen = ref<boolean>(false);
const selectedAnimalForContact = ref<Animal | null>(null);

const activeTab = ref<TabType>('normal');
const isSidebarExpanded = ref<boolean>(true);
const sortBy = ref<SortOption>('datePosted');
const weightUnit = ref<WeightUnit>('kg');

const filters = ref<Filters>({
  search: '',
  types: [],
  breeds: [],
  locations: [],
  priceRanges: [],
  genders: [],
  healthStatuses: [],
  auctionStatuses: [],
  endTimeRanges: [],
  bidCountMin: null,
  bidCountMax: null,
  startingBidRanges: [],
  auctionDurations: [],
  bidActivities: []
});

// ===== DATA =====
const animals = ref<Animal[]>([]);

// Auto-refresh interval
let refreshInterval: ReturnType<typeof setInterval> | null = null;

// ===== PERFORMANCE HELPERS =====
const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), delay);
  };
};

// ===== COMPUTED PROPERTIES =====
const normalListings = computed<Animal[]>(() => 
  animals.value.filter(animal => !animal.isAuction)
);

const auctionListings = computed<Animal[]>(() => 
  animals.value.filter(animal => animal.isAuction)
);

const uniqueTypes = computed<string[]>(() => {
  if (isLoadingData.value) return [];
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const types = new Set(currentAnimals.map(animal => animal.type));
  return Array.from(types).sort();
});

const uniqueBreeds = computed<string[]>(() => {
  if (isLoadingData.value) return [];
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const breeds = new Set(currentAnimals.map(animal => animal.breed));
  return Array.from(breeds).sort();
});

const uniqueLocations = computed<string[]>(() => {
  if (isLoadingData.value) return [];
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const locations = new Set(currentAnimals.map(animal => animal.location));
  return Array.from(locations).sort();
});

// ===== OPTIMIZED HELPER FUNCTIONS =====
const getAuctionStatus = (animal: Animal): string => {
  if (!animal.isAuction || !animal.endTime) return 'Unknown';
  
  const now = Date.now();
  const endTime = new Date(animal.endTime).getTime();
  const timeLeft = endTime - now;
  
  if (timeLeft <= 0) return 'Ended';
  if (timeLeft <= 3600000) return 'Ending Soon';
  if (animal.bidCount && animal.bidCount >= 10) return 'Hot Auction';
  if (animal.datePosted && new Date(animal.datePosted).getTime() > now - 86400000) return 'New Listing';
  return 'Live';
};

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

const getBidActivityCategory = (animal: Animal): string => {
  const bidCount = animal.bidCount || 0;
  
  if (bidCount === 0) return 'No Bids Yet';
  if (bidCount <= 5) return 'Low Activity (1-5 bids)';
  if (bidCount <= 10) return 'Moderate Activity (5-10 bids)';
  return 'High Activity (10+ bids)';
};

const currentFilteredAnimals = computed<Animal[]>(() => {
  if (isLoadingData.value) return [];
  
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  
  const filtered = currentAnimals.filter(animal => {
    const searchLower = filters.value.search.toLowerCase();
    const matchesSearch = !filters.value.search ||
      animal.title.toLowerCase().includes(searchLower) ||
      animal.type.toLowerCase().includes(searchLower) ||
      animal.breed.toLowerCase().includes(searchLower) ||
      animal.description.toLowerCase().includes(searchLower) ||
      (animal.farmer.farmName && animal.farmer.farmName.toLowerCase().includes(searchLower)) ||
      animal.farmer.name.toLowerCase().includes(searchLower);

    const matchesType = filters.value.types.length === 0 || 
      filters.value.types.includes(animal.type);

    const matchesBreed = filters.value.breeds.length === 0 || 
      filters.value.breeds.includes(animal.breed);

    const matchesLocation = filters.value.locations.length === 0 || 
      filters.value.locations.includes(animal.location);

    const matchesGender = filters.value.genders.length === 0 || 
      filters.value.genders.includes(animal.gender);

    const healthStatuses = Array.isArray(filters.value.healthStatuses) ? filters.value.healthStatuses : [];
    const matchesHealthStatus = healthStatuses.length === 0 || 
      healthStatuses.some(status => (Array.isArray(animal.healthStatus) ? animal.healthStatus : []).includes(status));

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

    if (activeTab.value === 'auction' && animal.isAuction) {
      if (filters.value.auctionStatuses.length > 0) {
        const animalStatus = getAuctionStatus(animal);
        if (!filters.value.auctionStatuses.includes(animalStatus)) {
          return false;
        }
      }

      if (filters.value.endTimeRanges.length > 0) {
        const now = Date.now();
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

      const bidCount = animal.bidCount || 0;
      if (filters.value.bidCountMin !== null && bidCount < filters.value.bidCountMin) {
        return false;
      }
      if (filters.value.bidCountMax !== null && bidCount > filters.value.bidCountMax) {
        return false;
      }

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

      if (filters.value.auctionDurations.length > 0) {
        const durationCategory = getAuctionDurationCategory(animal);
        if (!filters.value.auctionDurations.includes(durationCategory)) {
          return false;
        }
      }

      if (filters.value.bidActivities.length > 0) {
        const activityCategory = getBidActivityCategory(animal);
        if (!filters.value.bidActivities.includes(activityCategory)) {
          return false;
        }
      }
    }

    return matchesSearch && matchesType && matchesBreed && matchesLocation && 
           matchesPrice && matchesGender && matchesHealthStatus;
  });

  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'datePosted':
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      case 'datePosted-asc':
        return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
      case 'price':
        const aPrice = a.isAuction ? (a.currentBid || a.startingBid || 0) : a.price;
        const bPrice = b.isAuction ? (b.currentBid || b.startingBid || 0) : b.price;
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
        const aActivity = a.bidCount || 0;
        const bActivity = b.bidCount || 0;
        return bActivity - aActivity;
      case 'type':
        return a.type.localeCompare(b.type);
      case 'type-desc':
        return b.type.localeCompare(a.type);
      default:
        return 0;
    }
  });
});

// ===== SUPABASE CONNECTION HEALTH CHECK =====
const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('profiles').select('id').limit(1);
    return !error;
  } catch (error) {
    console.error('❌ Supabase connection check failed:', error);
    return false;
  }
};

// ===== OPTIMIZED FETCH FUNCTIONS =====
const fetchCurrentUser = async (skipCache = false): Promise<void> => {
  try {
    console.log('🔍 ===== FETCHING CURRENT USER =====');
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('❌ Error fetching user:', error);
      isAuthenticated.value = false;
      userRole.value = 'buyer';
      isLoadingUser.value = false;
      return;
    }

    if (user) {
      console.log('✅ User authenticated:', user.id);
      isAuthenticated.value = true;
      currentUserId.value = user.id;

      // Use cached data if available and recent (unless skipCache is true)
      if (!skipCache) {
        const cachedUserData = localStorage.getItem(`user_${user.id}`);
        if (cachedUserData) {
          const parsed = JSON.parse(cachedUserData);
          if (Date.now() - parsed.timestamp < CACHE_TIMEOUT) {
            console.log('✅ Using cached user data');
            currentUserDetails.value = parsed.data;
            userName.value = parsed.data.fullName;
            userEmail.value = parsed.data.email;
            userRole.value = parsed.data.role as UserRole;
            profileCompleted.value = !!(parsed.data.firstName && parsed.data.lastName);
            isLoadingUser.value = false;
            return;
          }
        }
      }

      const userDetails = await marketplaceService.getUserDetails(user.id);
      
      if (userDetails) {
        console.log('✅ User details fetched:', userDetails);
        
        currentUserDetails.value = userDetails;
        userName.value = userDetails.fullName;
        userEmail.value = userDetails.email;
        userRole.value = userDetails.role as UserRole;
        profileCompleted.value = !!(userDetails.firstName && userDetails.lastName);
        
        // Cache user data
        localStorage.setItem(`user_${user.id}`, JSON.stringify({
          data: userDetails,
          timestamp: Date.now()
        }));
        
        console.log('   🎯 Final userRole set to:', `"${userRole.value}"`);
        console.log('   🎯 isFarmerView will be:', userRole.value === 'farmer');
      } else {
        console.log('⚠️ No user details found, using defaults');
        userName.value = user.email?.split('@')[0] || 'User';
        userEmail.value = user.email || '';
        userRole.value = 'buyer';
        profileCompleted.value = false;
      }
    } else {
      console.log('❌ No authenticated user');
      isAuthenticated.value = false;
      userRole.value = 'buyer';
    }
  } catch (error) {
    console.error('💥 Exception fetching current user:', error);
    isAuthenticated.value = false;
    userRole.value = 'buyer';
  } finally {
    isLoadingUser.value = false;
  }
};

// ===== OPTIMIZED FETCH LIVESTOCK LISTINGS WITH AUTO-RELOAD =====
const fetchListings = async (forceRefresh = false): Promise<void> => {
  // Prevent multiple simultaneous refreshes
  if (isRefreshing.value && !forceRefresh) {
    console.log('🔄 Refresh already in progress, skipping...');
    return;
  }

  try {
    isRefreshing.value = true;

    // Check cache first (unless force refresh)
    const cachedListings = localStorage.getItem('marketplace_listings');
    if (cachedListings && !forceRefresh && Date.now() - lastFetchTime < CACHE_TIMEOUT) {
      const parsed = JSON.parse(cachedListings);
      animals.value = parsed.data;
      console.log('✅ Using cached listings');
      isLoadingData.value = false;
      return;
    }

    console.log('📦 Fetching livestock listings from database...');
    isLoadingData.value = true;
    
    const result = await marketplaceService.getAllListings();
    
    if (result.success && result.data) {
      animals.value = result.data;
      
      // Cache the results
      localStorage.setItem('marketplace_listings', JSON.stringify({
        data: result.data,
        timestamp: Date.now()
      }));
      lastFetchTime = Date.now();
      
      console.log(`✅ Successfully loaded ${result.data.length} listings`);
    } else {
      console.error('❌ Failed to fetch listings:', result.error);
      showToastNotification('Failed to load listings. Please try again.');
      animals.value = [];
    }
  } catch (error) {
    console.error('💥 Error fetching listings:', error);
    showToastNotification('An error occurred while loading listings.');
    animals.value = [];
  } finally {
    isLoadingData.value = false;
    isRefreshing.value = false;
  }
};

// ===== PAGE VISIBILITY API - SMART REFRESH =====
const handleVisibilityChange = async (): Promise<void> => {
  if (document.hidden) {
    // Tab became hidden - record the time
    lastVisibilityTime = Date.now();
    console.log('👋 Tab hidden at:', new Date(lastVisibilityTime).toLocaleTimeString());
  } else {
    // Tab became visible - check if we need to refresh
    const timeAway = Date.now() - lastVisibilityTime;
    console.log('👀 Tab visible again. Time away:', Math.round(timeAway / 1000), 'seconds');

    // Only refresh if we were away for more than threshold
    if (timeAway > VISIBILITY_REFRESH_THRESHOLD) {
      console.log('🔄 Tab was away for a while, refreshing data...');

      // Check Supabase connection health first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.warn('⚠️ Supabase connection issue, attempting reconnect...');
      }

      // Refresh auth session first
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('✅ Auth session still valid');
        // Refresh user data if needed
        if (isAuthenticated.value) {
          await fetchCurrentUser(true);
        }
      } else {
        console.warn('⚠️ Auth session expired');
        isAuthenticated.value = false;
        currentUserId.value = null;
        userRole.value = 'buyer';
      }

      // Check for updates flag
      await checkForRefresh();

      // Refresh listings
      localStorage.removeItem('marketplace_listings'); // Clear cache
      await fetchListings(true);

      showToastNotification('Data refreshed successfully');
    } else {
      console.log('✅ Quick return, using cached data');
    }
  }
};

// ===== AUTO-RELOAD WHEN RETURNING FROM LIVESTOCK MANAGEMENT =====
const checkForRefresh = async (): Promise<void> => {
  const shouldRefresh = localStorage.getItem('marketplace_needs_refresh');
  if (shouldRefresh === 'true') {
    console.log('🔄 Detected changes from LivestockManagement, refreshing...');
    localStorage.removeItem('marketplace_needs_refresh');
    localStorage.removeItem('marketplace_listings'); // Clear cache
    await fetchListings(true);
    showToastNotification('Marketplace refreshed with latest listings');
  }
};

// ===== NAVIGATION =====
const navigateToLivestockManagement = (): void => {
  router.push('/LivestockManagement');
};

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===== OPTIMIZED METHODS =====
const toggleSidebar = (): void => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const handleFiltersChanged = debounce((newFilters: Filters) => {
  filters.value = { ...newFilters };
}, 300);

const showToastNotification = (message: string): void => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 4000);
};

const openModal = (animal: Animal): void => {
  console.log('📂 Opening modal for animal:', animal.id);
  console.log('👤 Current user for modal:', currentUserForModal.value);
  selectedAnimal.value = animal;
  if (animal.isAuction) {
    isAuctionModalOpen.value = true;
  } else {
    isModalOpen.value = true;
  }
};

const closeModal = (): void => {
  isModalOpen.value = false;
  selectedAnimal.value = null;
};

const closeAuctionModal = (): void => {
  isAuctionModalOpen.value = false;
  selectedAnimal.value = null;
};

const openContactModal = (animal: Animal): void => {
  console.log('🔍 Opening contact modal...');
  console.log('   isAuthenticated:', isAuthenticated.value);
  console.log('   isFarmerView:', isFarmerView.value);
  console.log('   currentUserForModal:', currentUserForModal.value);
  
  // Check if user is authenticated
  if (!isAuthenticated.value) {
    showToastNotification('Please sign in to contact farmers');
    return;
  }
  
  // Check if user has complete profile (currentUserForModal exists)
  if (!currentUserForModal.value) {
    showToastNotification('Please complete your profile to contact farmers');
    return;
  }
  
  // Farmers cannot contact themselves
  if (isFarmerView.value && animal.farmer.id === currentUserId.value) {
    showToastNotification('You cannot contact yourself');
    return;
  }
  
  console.log('✅ Opening contact modal for animal:', animal.id);
  selectedAnimalForContact.value = animal;
  isContactModalOpen.value = true;
};

const closeContactModal = (): void => {
  isContactModalOpen.value = false;
  selectedAnimalForContact.value = null;
};

// FIXED: Handle message sent from ContactFarmerModal
const handleMessageSent = (conversationId: string): void => {
  console.log('✅ Message sent successfully, conversation ID:', conversationId);
  showToastNotification('Message sent successfully! Opening conversation...');
  closeContactModal();
  
  // The ContactFarmerModal already handles navigation to the messages page
  // So we don't need to do anything else here
};

const contactFarmerFromModal = (contactInfo: string): void => {
  showToastNotification(`Contact information copied: ${contactInfo}`);
  navigator.clipboard.writeText(contactInfo).catch(err => {
    console.error('Failed to copy to clipboard:', err);
  });
};

const resetFilters = (): void => {
  filters.value = {
    search: '',
    types: [],
    breeds: [],
    locations: [],
    priceRanges: [],
    genders: [],
    healthStatuses: [],
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

const redirectToLogin = (): void => {
  showToastNotification('Please sign in to place bids');
};

const handlePlaceBid = async (bidData: BidData): Promise<void> => {
  try {
    const animalIndex = animals.value.findIndex(a => a.id === bidData.animalId);
    if (animalIndex !== -1) {
      // Update local state immediately for instant feedback
      animals.value[animalIndex].currentBid = bidData.amount;
      animals.value[animalIndex].bidCount = (animals.value[animalIndex].bidCount || 0) + 1;
      
      showToastNotification(`Bid of ₱${bidData.amount.toLocaleString()} placed successfully!`);
      
      // Clear cache and reload to ensure consistency
      localStorage.removeItem('marketplace_listings');
      await fetchListings(true);
    }
  } catch (error) {
    console.error('❌ Error after placing bid:', error);
    showToastNotification('Bid placed but failed to refresh. Please reload the page.');
  }
};

// ===== AUTH FUNCTIONS =====
const toggleAuth = async (): Promise<void> => {
  if (isAuthenticated.value) {
    await supabase.auth.signOut();
    isAuthenticated.value = false;
    currentUserId.value = null;
    currentUserDetails.value = null;
    userRole.value = 'buyer';
    userName.value = 'Guest User';
    profileCompleted.value = false;
    
    // Clear cache on logout
    localStorage.removeItem('marketplace_listings');
    localStorage.removeItem('marketplace_needs_refresh');
    
    showToastNotification('Signed out successfully!');
  } else {
    showToastNotification('Please use the login page to sign in');
  }
};

const handleLogout = async (): Promise<void> => {
  await supabase.auth.signOut();
  isAuthenticated.value = false;
  currentUserId.value = null;
  currentUserDetails.value = null;
  userRole.value = 'buyer';
  userName.value = 'Guest User';
  profileCompleted.value = false;
  
  // Clear cache on logout
  localStorage.removeItem('marketplace_listings');
  localStorage.removeItem('marketplace_needs_refresh');
  
  showToastNotification('Logged out successfully!');
};

// ===== OPTIMIZED LIFECYCLE =====
onMounted(async () => {
  console.log('🚀 ===== MARKETPLACE MOUNTED =====');
  
  // Load user and listings in parallel
  await Promise.all([
    fetchCurrentUser(),
    fetchListings()
  ]);

  // Check if we need to refresh due to changes from LivestockManagement
  await checkForRefresh();

  // Add Page Visibility API listener
  document.addEventListener('visibilitychange', handleVisibilityChange);
  console.log('✅ Page visibility listener added');

  // Set up auth listener
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔄 ===== AUTH STATE CHANGE =====', event);
    
    if (event === 'SIGNED_IN' && session) {
      isLoadingUser.value = true;
      await fetchCurrentUser();
      // Refresh listings when user signs in
      await fetchListings(true);
    } else if (event === 'SIGNED_OUT') {
      isAuthenticated.value = false;
      currentUserId.value = null;
      currentUserDetails.value = null;
      userRole.value = 'buyer';
      userName.value = 'Guest User';
      profileCompleted.value = false;
      isLoadingUser.value = false;
      
      // Clear cache on sign out
      localStorage.removeItem('marketplace_listings');
      localStorage.removeItem('marketplace_needs_refresh');
    }
  });

  // Set up periodic auto-refresh for auction countdown (every 30 seconds)
  refreshInterval = setInterval(async () => {
    // Only refresh if tab is visible
    if (!document.hidden && activeTab.value === 'auction' && auctionListings.value.length > 0) {
      // Check if cache is stale
      if (Date.now() - lastFetchTime > CACHE_TIMEOUT) {
        console.log('🔄 Auto-refreshing stale auction data...');
        await fetchListings(true);
      }
    }
  }, 30000); // 30 seconds

  // Watch for route changes (returning from LivestockManagement)
  watch(() => route.path, async (newPath, oldPath) => {
    if (newPath === '/marketplace' && oldPath === '/LivestockManagement') {
      await checkForRefresh();
    }
  });
});

// Cleanup on unmount
onBeforeUnmount(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  
  // Remove visibility listener
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  console.log('🧹 Cleaned up listeners');
});

// Optimized watchers
watch(userRole, (newRole, oldRole) => {
  console.log(`🔄 userRole changed from "${oldRole}" to "${newRole}"`);
  console.log(`   isFarmerView is now: ${isFarmerView.value}`);
});

// Watch for tab changes
watch(activeTab, (newTab) => {
  console.log(`🔄 Tab changed to: ${newTab}`);
});
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>