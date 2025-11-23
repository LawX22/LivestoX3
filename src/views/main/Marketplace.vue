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
      <NavBar 
        :isAuthenticated="isAuthenticated"
        :userRole="userRole"
        :userName="userName"
        @logout="handleLogout"
        @toggleAuth="toggleAuth"
      />
    </div>

    <!-- 🔥 LOADING SKELETON FOR HEADER - Prevents Flicker -->
    <div v-if="isLoadingUser" class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm animate-pulse">
        <!-- Left side skeleton -->
        <div class="flex items-center min-w-0">
          <div class="w-12 h-12 bg-white/20 rounded-xl mr-3"></div>
          <div class="min-w-0">
            <div class="h-5 bg-white/20 rounded w-48 mb-2"></div>
            <div class="h-4 bg-white/10 rounded w-64"></div>
          </div>
        </div>
        <!-- Right side skeleton -->
        <div class="flex items-center gap-3">
          <div class="h-8 bg-white/20 rounded-lg w-32"></div>
          <div class="h-8 bg-white/20 rounded-lg w-24"></div>
        </div>
      </div>
    </div>

    <!-- DYNAMIC COMBINED HEADER - Only show when user data is loaded -->
    <div v-else class="sticky top-0 z-40 px-4 md:px-6 pt-3">
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
                  ? "Manage your livestock listings and auctions"
                  : "Discover quality livestock from verified farmers"
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
            <button
              @click="showToastNotification('This would navigate to livestock management')"
              class="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0"
            >
              Post Livestock
            </button>
          </div>

          <!-- Guest Mode -->
          <div
            v-else-if="!isAuthenticated"
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
            <button
              @click="toggleAuth"
              class="whitespace-nowrap bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0"
            >
              Sign In
            </button>
          </div>

          <!-- Buyer View -->
          <div
            v-else
            class="flex items-center gap-3 max-w-full"
          >
            <!-- Account Not Verified -->
            <div
              v-if="!profileCompleted"
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
                @click="showToastNotification('This would navigate to user profile')"
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
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
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
                @click="showToastNotification('This would navigate to upgrade form')"
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
                {{ isLoadingData ? 'Loading...' : `${currentFilteredAnimals.length} ${currentFilteredAnimals.length === 1 ? 'Listing' : 'Listings'} Found` }}
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
                }`">{{ isLoadingData ? '...' : normalListings.length }}</span>
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
                }`">{{ isLoadingData ? '...' : auctionListings.length }}</span>
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
            <!-- Loading Skeleton Cards -->
            <div 
              v-if="isLoadingData" 
              :class="`grid gap-4 ${isFarmerView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4'}`"
            >
              <div
                v-for="n in 8"
                :key="`skeleton-${n}`"
                class="bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 p-4 shadow-lg animate-pulse"
              >
                <!-- Image Skeleton -->
                <div class="w-full h-48 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4 relative overflow-hidden">
                  <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>

                <!-- Content Skeleton -->
                <div class="space-y-3">
                  <!-- Title -->
                  <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-3/4 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  
                  <!-- Subtitle -->
                  <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-1/2 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>

                  <!-- Details Grid -->
                  <div class="grid grid-cols-2 gap-2 pt-2">
                    <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>

                  <!-- Price -->
                  <div class="h-6 bg-gradient-to-r from-green-200 to-green-300 rounded-md w-2/3 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>

                  <!-- Buttons -->
                  <div class="flex gap-2 pt-2">
                    <div class="flex-1 h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="flex-1 h-8 bg-gradient-to-r from-green-200 to-green-300 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
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
              <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/60 max-w-md text-center shadow-xl">
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
      :currentUser="currentUserForModal"
      @close="closeAuctionModal"
      @placeBid="handlePlaceBid"
      @redirectToLogin="redirectToLogin"
    />

    <!-- Contact Farmer Modal -->
    <ContactFarmerModal 
      v-if="isContactModalOpen && selectedAnimalForContact" 
      :animal="selectedAnimalForContact"
      :currentUser="currentUserForModal"
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

    <!-- Debug Info (Toggle to false in production) -->
    <div v-if="false" class="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 max-w-xs">
      <div class="font-bold mb-2 text-green-400">🐛 Debug Info:</div>
      <div>✓ isLoadingUser: <span class="text-yellow-300">{{ isLoadingUser }}</span></div>
      <div>✓ isAuthenticated: <span class="text-yellow-300">{{ isAuthenticated }}</span></div>
      <div>✓ userRole: <span class="text-yellow-300">"{{ userRole }}"</span></div>
      <div>✓ isFarmerView: <span class="text-yellow-300">{{ isFarmerView }}</span></div>
      <div>✓ profileCompleted: <span class="text-yellow-300">{{ profileCompleted }}</span></div>
      <div>✓ userName: <span class="text-yellow-300">"{{ userName }}"</span></div>
      <div>✓ userId: <span class="text-yellow-300">{{ currentUserId }}</span></div>
      <button 
        @click="fetchCurrentUser" 
        class="mt-2 px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
      >
        Refresh User Data
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { supabase } from '../../supabase';
import { marketplaceService, type UserDetails } from '@/services/marketplaceService';
import NavBar from '../../components/NavBar.vue';
import FilterSidebar from '../../components/Market/FilterSidebar.vue';
import AnimalDetailsModal from '../../components/Market/AnimalDetailsModal.vue';
import ContactFarmerModal from '../../components/Market/ContactFarmerModal.vue';
import AuctionDetailsModal from '../../components/Market/AuctionDetailsModal.vue';
import LivestockCard from '../../components/Market/LivestockCard.vue';

// Import types
import type { Animal, Filters, BidData, MessageData, CurrentUser } from '@/services/marketplace.ts';

// Props
const props = defineProps<{
  viewMode?: 'buyer' | 'farmer';
}>();

// ===== AUTHENTICATION STATE =====
const isAuthenticated = ref(false);
const currentUserId = ref<string | null>(null);

// 🔥 FIX: Don't initialize userRole with a default value
const userRole = ref<'buyer' | 'farmer' | null>(null);

const userName = ref('Guest User');
const userEmail = ref('');
const profileCompleted = ref(false);
const hasPendingUpgrade = ref(false);
const currentUserDetails = ref<UserDetails | null>(null);

// ===== LOADING STATES =====
const isLoadingUser = ref(true);  // Loading user data
const isLoadingData = ref(true);  // Loading animal data

// ===== COMPUTED: IS FARMER VIEW =====
const isFarmerView = computed(() => {
  if (props.viewMode) {
    return props.viewMode === 'farmer';
  }
  
  // 🔥 FIX: Only calculate if userRole is loaded
  if (userRole.value === null) {
    return false; // Default to buyer view while loading
  }
  
  return userRole.value === 'farmer';
});

// Watch for role changes (for debugging)
watch(userRole, (newRole, oldRole) => {
  console.log(`🔄 userRole changed from "${oldRole}" to "${newRole}"`);
  console.log(`   isFarmerView is now: ${isFarmerView.value}`);
});

// Computed user for modals
const currentUserForModal = computed<CurrentUser | null>(() => {
  if (!isAuthenticated.value || !currentUserDetails.value) return null;

  return {
    name: currentUserDetails.value.fullName,
    email: currentUserDetails.value.email,
    role: currentUserDetails.value.role
  };
});

const showToast = ref(false);
const toastMessage = ref('');

const isModalOpen = ref(false);
const isAuctionModalOpen = ref(false);
const selectedAnimal = ref<Animal | null>(null);

const isContactModalOpen = ref(false);
const selectedAnimalForContact = ref<Animal | null>(null);

// Tab state
const activeTab = ref<'normal' | 'auction'>('normal');

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
  healthStatuses: [],
  auctionStatuses: [],
  endTimeRanges: [],
  bidCountMin: null,
  bidCountMax: null,
  startingBidRanges: [],
  auctionDurations: [],
  bidActivities: []
});

// Mock Animal Data
const animals = ref<Animal[]>([
  {
    id: '1',
    title: 'Premium Holstein Dairy Cow',
    type: 'Cattle',
    breed: 'Holstein',
    weight: 550,
    quantity: 3,
    originalQuantity: 5,
    age: '3 years',
    gender: 'Female',
    status: 'Available',
    healthStatus: ['Vaccinated', 'Dewormed'],
    price: 85000,
    deliveryOptions: ['Farm Pickup', 'Local Delivery'],
    images: [
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800'
    ],
    description: 'High-quality Holstein dairy cow with excellent milk production. Well-maintained and healthy.',
    datePosted: '2024-11-15T10:00:00Z',
    farmer: {
      id: 'f1',
      name: 'Loading...',
      farmName: 'Loading...',
      contact: '',
      email: '',
      address: '',
      avatar: ''
    },
    location: 'Cebu City',
    isAuction: false
  },
  {
    id: '2',
    title: 'Auction: Young Brahman Bull',
    type: 'Cattle',
    breed: 'Brahman',
    weight: 450,
    quantity: 1,
    originalQuantity: 1,
    age: '2 years',
    gender: 'Male',
    status: 'Auction',
    healthStatus: ['Vaccinated', 'Certified Healthy'],
    price: 0,
    deliveryOptions: ['Farm Pickup'],
    images: [
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800'
    ],
    description: 'Strong young Brahman bull, perfect for breeding. Excellent genetics and temperament.',
    datePosted: '2024-11-18T08:00:00Z',
    farmer: {
      id: 'f2',
      name: 'Loading...',
      farmName: 'Loading...',
      contact: '',
      email: '',
      address: '',
      avatar: ''
    },
    location: 'Tagbilaran',
    isAuction: true,
    startingBid: 65000,
    currentBid: 72000,
    bidCount: 8,
    endTime: '2024-11-22T18:00:00Z',
    auctionStartTime: '2024-11-18T08:00:00Z'
  }
]);

// Computed properties
const normalListings = computed(() => animals.value.filter(animal => !animal.isAuction));
const auctionListings = computed(() => animals.value.filter(animal => animal.isAuction));

const uniqueTypes = computed(() => {
  if (isLoadingData.value) return [];
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const types = new Set(currentAnimals.map(animal => animal.type));
  return Array.from(types).sort();
});

const uniqueBreeds = computed(() => {
  if (isLoadingData.value) return [];
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const breeds = new Set(currentAnimals.map(animal => animal.breed));
  return Array.from(breeds).sort();
});

const uniqueLocations = computed(() => {
  if (isLoadingData.value) return [];
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const locations = new Set(currentAnimals.map(animal => animal.location));
  return Array.from(locations).sort();
});

// Helper functions
const getAuctionStatus = (animal: Animal): string => {
  if (!animal.isAuction || !animal.endTime) return 'Unknown';
  
  const now = new Date().getTime();
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

const currentFilteredAnimals = computed(() => {
  if (isLoadingData.value) return [];
  
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  
  const filtered = currentAnimals.filter(animal => {
    // Search filter
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

// ===== 🔥 FIXED FETCH CURRENT USER - NO FLICKER =====
const fetchCurrentUser = async () => {
  try {
    console.log('🔍 ===== FETCHING CURRENT USER =====');
    // DON'T set isLoadingUser here - it's already true from initialization
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('❌ Error fetching user:', error);
      isAuthenticated.value = false;
      userRole.value = 'buyer'; // Now safe to set
      isLoadingUser.value = false;
      return;
    }

    if (user) {
      console.log('✅ User authenticated:', user.id);
      isAuthenticated.value = true;
      currentUserId.value = user.id;

      // CRITICAL: Fetch from profiles table (source of truth)
      const userDetails = await marketplaceService.getUserDetails(user.id);
      
      if (userDetails) {
        console.log('✅ User details fetched from service:');
        console.log('   🎭 Role (NORMALIZED):', `"${userDetails.role}"`);
        
        currentUserDetails.value = userDetails;
        userName.value = userDetails.fullName;
        userEmail.value = userDetails.email;
        
        // 🔥 SET ROLE ONLY AFTER FETCHING
        userRole.value = userDetails.role as 'buyer' | 'farmer';
        
        console.log('   🎯 Final userRole set to:', `"${userRole.value}"`);
        console.log('   🎯 isFarmerView will be:', userRole.value === 'farmer');

        profileCompleted.value = !!(userDetails.firstName && userDetails.lastName);
        console.log('   ✅ Profile completed:', profileCompleted.value);
        
        // Check if auth and profiles are in sync
        const syncCheck = await marketplaceService.checkRoleSync(user.id);
        if (!syncCheck.inSync) {
          console.warn('⚠️ Auth and profiles are out of sync!');
          console.log('   📝 Profiles role:', syncCheck.profileRole);
          console.log('   🔐 Auth role:', syncCheck.authRole);
          console.log('   🔄 Syncing auth with profiles...');
          
          // Auto-sync auth with profiles
          await marketplaceService.syncAuthWithProfiles(user.id);
        }
        
      } else {
        console.log('⚠️ No user details found, using defaults');
        userName.value = user.email?.split('@')[0] || 'User';
        userEmail.value = user.email || '';
        userRole.value = 'buyer'; // Now safe to set
        profileCompleted.value = false;
      }
      
      console.log('🏁 ===== USER FETCH COMPLETE =====');
      console.log('📊 Final state:');
      console.log('   ✓ userRole:', `"${userRole.value}"`);
      console.log('   ✓ isFarmerView:', isFarmerView.value);
      console.log('=====================================\n');
    } else {
      console.log('❌ No authenticated user');
      isAuthenticated.value = false;
      userRole.value = 'buyer'; // Now safe to set
    }
  } catch (error) {
    console.error('💥 Exception fetching current user:', error);
    isAuthenticated.value = false;
    userRole.value = 'buyer'; // Now safe to set
  } finally {
    // Always stop loading - this allows the UI to render
    isLoadingUser.value = false;
  }
};

// Fetch farmer details for all animals
const fetchFarmerDetails = async () => {
  try {
    console.log('🚜 Fetching farmer details for all animals...');
    
    const farmerIds = [...new Set(animals.value.map(animal => animal.farmer.id))];
    console.log('📝 Unique farmer IDs:', farmerIds);

    const farmersData = await marketplaceService.getMultipleUsers(farmerIds);
    console.log('✅ Fetched farmers data:', farmersData);

    animals.value.forEach(animal => {
      const farmerDetails = farmersData[animal.farmer.id];
      
      if (farmerDetails) {
        animal.farmer = {
          id: farmerDetails.id,
          name: farmerDetails.fullName,
          farmName: `${farmerDetails.fullName}'s Farm`,
          contact: farmerDetails.phone || '+63 XXX XXX XXXX',
          email: farmerDetails.email,
          address: farmerDetails.address || 'Not specified',
          avatar: farmerDetails.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(farmerDetails.fullName)}&background=random`
        };
      } else {
        animal.farmer = {
          id: animal.farmer.id,
          name: 'Unknown Farmer',
          farmName: 'Unknown Farm',
          contact: '+63 XXX XXX XXXX',
          email: 'N/A',
          address: 'Not specified',
          avatar: 'https://ui-avatars.com/api/?name=Unknown&background=random'
        };
      }
    });

    console.log('✅ Farmer details updated for all animals');
  } catch (error) {
    console.error('❌ Error fetching farmer details:', error);
  }
};

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
  if (!isFarmerView.value && !isAuthenticated.value) {
    showToastNotification('Please sign in to contact farmers');
    return;
  }
  selectedAnimalForContact.value = animal;
  isContactModalOpen.value = true;
};

const closeContactModal = () => {
  isContactModalOpen.value = false;
  selectedAnimalForContact.value = null;
};

const sendMessage = (messageData: MessageData) => {
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

const redirectToLogin = () => {
  showToastNotification('Please sign in to place bids');
};

const handlePlaceBid = (bidData: BidData) => {
  const animalIndex = animals.value.findIndex(a => a.id === bidData.animalId);
  if (animalIndex !== -1) {
    animals.value[animalIndex].currentBid = bidData.amount;
    animals.value[animalIndex].bidCount = (animals.value[animalIndex].bidCount || 0) + 1;
    
    showToastNotification(`Bid of ₱${bidData.amount.toLocaleString()} placed successfully!`);
  }
};

// Auth functions
const toggleAuth = async () => {
  if (isAuthenticated.value) {
    await supabase.auth.signOut();
    isAuthenticated.value = false;
    currentUserId.value = null;
    currentUserDetails.value = null;
    userRole.value = 'buyer';
    userName.value = 'Guest User';
    profileCompleted.value = false;
    showToastNotification('Signed out successfully!');
  } else {
    showToastNotification('Please use the login page to sign in');
  }
};

const handleLogout = async () => {
  await supabase.auth.signOut();
  isAuthenticated.value = false;
  currentUserId.value = null;
  currentUserDetails.value = null;
  userRole.value = 'buyer';
  userName.value = 'Guest User';
  profileCompleted.value = false;
  showToastNotification('Logged out successfully!');
};

// Lifecycle hooks
onMounted(async () => {
  console.log('🚀 ===== COMPONENT MOUNTED =====');
  
  // CRITICAL: Fetch user FIRST, wait for it to complete
  await fetchCurrentUser();
  
  // Then fetch other data
  await fetchFarmerDetails();
  
  // Complete data loading
  setTimeout(() => {
    isLoadingData.value = false;
    console.log('✅ All data loading completed');
  }, 500);

  // Listen for auth state changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔄 ===== AUTH STATE CHANGE =====', event);
    
    if (event === 'SIGNED_IN' && session) {
      // Reset loading state
      isLoadingUser.value = true;
      await fetchCurrentUser();
    } else if (event === 'SIGNED_OUT') {
      isAuthenticated.value = false;
      currentUserId.value = null;
      currentUserDetails.value = null;
      userRole.value = 'buyer';
      userName.value = 'Guest User';
      profileCompleted.value = false;
      isLoadingUser.value = false;
    }
  });
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>