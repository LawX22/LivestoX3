<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Sticky Header Section -->
    <div class="sticky top-0 z-50 bg-white shadow-sm">
      <!-- Header Content -->
      <div class="p-4 md:p-6 border-b border-gray-200 bg-white">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div class="flex items-center gap-4">
            <button 
              @click="$router.go(-1)"
              class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-green-800">My Livestock Listings</h1>
              <p class="text-gray-500 mt-1">Manage your animal listings and auctions</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="toggleView"
              class="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 border border-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="viewMode === 'table'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              {{ viewMode === 'table' ? 'Card View' : 'Table View' }}
            </button>
            <div class="relative">
              <button
                @click="showDropdown = !showDropdown"
                class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Add New
              </button>
              <!-- Dropdown menu -->
              <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div class="py-1">
                  <button
                    @click="openAddModal"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Add Listing
                  </button>
                  <button
                    @click="openAuctionModal"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Create Auction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <button
            @click="activeTab = 'listings'"
            :class="activeTab === 'listings' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm"
          >
            Listings
          </button>
          <button
            @click="activeTab = 'auctions'"
            :class="activeTab === 'auctions' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm"
          >
            Auctions
          </button>
        </nav>
      </div>

      <!-- Status Overview Section -->
      <div class="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <!-- Total Listings -->
          <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total {{ activeTab === 'listings' ? 'Listings' : 'Auctions' }}</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ activeTab === 'listings' ? farmerAnimals.length : farmerAuctions.length }}
                </p>
              </div>
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Active -->
          <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">
                  {{ activeTab === 'listings' ? 'Available' : 'Active' }}
                </p>
                <p class="text-2xl font-bold text-green-600">
                  {{ activeTab === 'listings' ? 
                    farmerAnimals.filter(a => a.status === 'Available').length : 
                    farmerAuctions.filter(a => a.status === 'Active').length 
                  }}
                </p>
              </div>
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Ending Soon -->
          <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">
                  {{ activeTab === 'listings' ? 'Low Stock' : 'Ending Soon' }}
                </p>
                <p class="text-2xl font-bold text-yellow-600">
                  {{ activeTab === 'listings' ? 
                    farmerAnimals.filter(a => a.status === 'Low Stock').length : 
                    farmerAuctions.filter(a => isEndingSoon(a.endDate)).length 
                  }}
                </p>
              </div>
              <div class="p-2 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Completed/Cancelled -->
          <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">
                  {{ activeTab === 'listings' ? 'Out of Stock' : 'Completed' }}
                </p>
                <p class="text-2xl font-bold text-red-600">
                  {{ activeTab === 'listings' ? 
                    farmerAnimals.filter(a => a.status === 'Out of Stock').length : 
                    farmerAuctions.filter(a => a.status === 'Completed').length 
                  }}
                </p>
              </div>
              <div class="p-2 bg-red-100 rounded-lg">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Compact Filters Section -->
      <div class="p-3 border-b border-gray-200 bg-white">
        <div class="flex flex-col gap-3">
          <!-- Search Bar -->
          <div class="w-full">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                v-model="filters.search"
                type="text"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                :placeholder="activeTab === 'listings' ? 'Search listings...' : 'Search auctions...'"
              />
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <!-- Type Filter -->
            <div class="min-w-[120px]" v-if="activeTab === 'listings'">
              <select 
                v-model="filters.type"
                class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
              >
                <option value="">All Types</option>
                <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            
            <!-- Status Filter -->
            <div class="min-w-[120px]">
              <select 
                v-model="filters.status"
                class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
              >
                <option value="">All Statuses</option>
                <option v-if="activeTab === 'listings'" value="Available">Available</option>
                <option v-if="activeTab === 'listings'" value="Low Stock">Low Stock</option>
                <option v-if="activeTab === 'listings'" value="Out of Stock">Out of Stock</option>
                <option v-if="activeTab === 'auctions'" value="Active">Active</option>
                <option v-if="activeTab === 'auctions'" value="Upcoming">Upcoming</option>
                <option v-if="activeTab === 'auctions'" value="Completed">Completed</option>
                <option v-if="activeTab === 'auctions'" value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <!-- Breed Filter (Listings only) -->
            <div class="min-w-[120px]" v-if="activeTab === 'listings'">
              <select 
                v-model="filters.breed"
                class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
              >
                <option value="">All Breeds</option>
                <option v-for="breed in uniqueBreeds" :key="breed" :value="breed">{{ breed }}</option>
              </select>
            </div>
            
            <!-- Date Range Filter -->
            <div class="min-w-[120px]">
              <select 
                v-model="filters.dateRange"
                class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <!-- Custom Date Range (inline when selected) -->
            <div v-if="filters.dateRange === 'custom'" class="flex items-center gap-2">
              <input
                v-model="filters.startDate"
                type="date"
                class="pl-3 pr-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
              />
              <span class="text-gray-500 text-sm">to</span>
              <input
                v-model="filters.endDate"
                type="date"
                class="pl-3 pr-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
              />
            </div>

            <!-- Reset Button -->
            <button 
              @click="resetFilters"
              class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area (Scrollable) -->
    <div class="flex-1 overflow-auto pt-4">
      <!-- Listings Tab Content -->
      <div v-if="activeTab === 'listings'">
        <!-- Table View -->
        <div v-if="viewMode === 'table'" class="min-h-full">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Animal
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Details
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Date Posted
                  </th>
                  <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr 
                  v-for="animal in filteredAnimals"
                  :key="animal.id"
                  class="hover:bg-green-50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-12 w-12 mr-4">
                        <img 
                          :src="animal.images[0]" 
                          alt="Animal" 
                          class="h-12 w-12 rounded-lg object-cover border-2 border-gray-200 hover:border-green-500 transition-all cursor-pointer shadow-sm" 
                          @click="openModal(animal)"
                        />
                      </div>
                      <div>
                        <div class="text-sm font-semibold text-gray-900">{{ animal.type }}</div>
                        <div class="text-sm text-green-600 font-medium">{{ animal.breed }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      <div class="font-medium">{{ animal.weight }} kg • Qty: {{ animal.quantity }}</div>
                      <div class="text-gray-500">Age: {{ animal.age }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-lg font-bold text-gray-900">₱{{ animal.price.toLocaleString() }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(animal.status)}`">
                      {{ animal.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ new Date(animal.datePosted).toLocaleDateString() }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end items-center gap-2">
                      <button 
                        @click="openModal(animal)"
                        class="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-lg transition-all focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        @click="editAnimal(animal)"
                        class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Card View -->
        <div v-else class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-full">
          <div 
            v-for="animal in filteredAnimals"
            :key="animal.id"
            class="rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all bg-white flex flex-col h-full group"
          >
            <!-- Image with status badge -->
            <div class="relative h-48">
              <img 
                :src="animal.images[0]" 
                alt="Animal" 
                class="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                @click="openModal(animal)"
              />
              <div class="absolute top-3 right-3">
                <span :class="`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${getStatusClass(animal.status)}`">
                  {{ animal.status }}
                </span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <!-- Main card content -->
            <div class="p-5 flex-1 flex flex-col">
              <!-- Header with type/breed and price -->
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors">{{ animal.type }}</h3>
                  <p class="text-sm text-green-600 font-semibold">{{ animal.breed }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</p>
                  <p class="font-bold text-lg text-gray-900">₱{{ animal.price.toLocaleString() }}</p>
                </div>
              </div>
              
              <!-- Quick stats -->
              <div class="grid grid-cols-3 gap-2 mb-4">
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Weight</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ animal.weight }} kg</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quantity</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ animal.quantity }}</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Age</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ animal.age }}</p>
                </div>
              </div>
              
              <!-- Description -->
              <div class="mb-4 flex-1">
                <p class="text-sm text-gray-600 line-clamp-3 leading-relaxed">{{ animal.description }}</p>
              </div>
              
              <!-- Delivery options -->
              <div class="mb-4">
                <p class="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Delivery Options</p>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="option in animal.deliveryOptions" 
                    :key="option"
                    class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md capitalize font-medium border border-green-200"
                  >
                    {{ option }}
                  </span>
                </div>
              </div>
              
              <!-- Date posted -->
              <div class="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Posted: {{ formatDate(animal.datePosted) }}
              </div>
              
              <!-- Action buttons -->
              <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                <button 
                  @click.stop="openModal(animal)"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
                <button 
                  @click.stop="editAnimal(animal)"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Auctions Tab Content -->
      <div v-else class="p-6">
        <!-- Auction Table View -->
        <div v-if="viewMode === 'table'" class="min-h-full">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Auction Item
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Details
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Current Bid
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Time Left
                  </th>
                  <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr 
                  v-for="auction in filteredAuctions"
                  :key="auction.id"
                  class="hover:bg-green-50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-12 w-12 mr-4">
                        <img 
                          :src="auction.animal.images[0]" 
                          alt="Animal" 
                          class="h-12 w-12 rounded-lg object-cover border-2 border-gray-200 hover:border-green-500 transition-all cursor-pointer shadow-sm" 
                          @click="openAuctionDetails(auction)"
                        />
                      </div>
                      <div>
                        <div class="text-sm font-semibold text-gray-900">{{ auction.animal.type }}</div>
                        <div class="text-sm text-green-600 font-medium">{{ auction.animal.breed }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      <div class="font-medium">{{ auction.animal.weight }} kg • Qty: {{ auction.animal.quantity }}</div>
                      <div class="text-gray-500">Starting Price: ₱{{ auction.startingPrice.toLocaleString() }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-lg font-bold text-gray-900" v-if="auction.currentBid">
                      ₱{{ auction.currentBid.amount.toLocaleString() }}
                      <span class="text-xs font-normal text-gray-500 block">by {{ auction.currentBid.bidderName }}</span>
                    </div>
                    <div class="text-sm text-gray-500 italic" v-else>
                      No bids yet
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAuctionStatusClass(auction.status)}`">
                      {{ auction.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 font-medium" v-if="auction.status === 'Active'">
                      {{ formatTimeLeft(auction.endDate) }}
                    </div>
                    <div class="text-sm text-gray-500" v-else-if="auction.status === 'Upcoming'">
                      Starts {{ formatDate(auction.startDate) }}
                    </div>
                    <div class="text-sm text-gray-500" v-else>
                      Ended {{ formatDate(auction.endDate) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end items-center gap-2">
                      <button 
                        @click="openAuctionDetails(auction)"
                        class="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-lg transition-all focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        @click="editAuction(auction)"
                        class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all focus:outline-none"
                        v-if="auction.status === 'Upcoming' || auction.status === 'Active'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        @click="cancelAuction(auction.id)"
                        class="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all focus:outline-none"
                        v-if="auction.status === 'Upcoming' || auction.status === 'Active'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Auction Card View -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-full">
          <div 
            v-for="auction in filteredAuctions"
            :key="auction.id"
            class="rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all bg-white flex flex-col h-full group"
          >
            <!-- Image with status badge -->
            <div class="relative h-48">
              <img 
                :src="auction.animal.images[0]" 
                alt="Animal" 
                class="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                @click="openAuctionDetails(auction)"
              />
              <div class="absolute top-3 right-3">
                <span :class="`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${getAuctionStatusClass(auction.status)}`">
                  {{ auction.status }}
                </span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <!-- Time left ribbon -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium">
                    {{ auction.status === 'Active' ? 'Ends in' : auction.status === 'Upcoming' ? 'Starts' : 'Ended' }}
                  </span>
                  <span class="text-sm font-bold">
                    {{ auction.status === 'Active' ? 
                      formatTimeLeft(auction.endDate) : 
                      formatDate(auction.status === 'Upcoming' ? auction.startDate : auction.endDate) 
                    }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Main card content -->
            <div class="p-5 flex-1 flex flex-col">
              <!-- Header with type/breed and price -->
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors">{{ auction.animal.type }}</h3>
                  <p class="text-sm text-green-600 font-semibold">{{ auction.animal.breed }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Starting Price</p>
                  <p class="font-bold text-lg text-gray-900">₱{{ auction.startingPrice.toLocaleString() }}</p>
                </div>
              </div>
              
              <!-- Quick stats -->
              <div class="grid grid-cols-3 gap-2 mb-4">
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Weight</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ auction.animal.weight }} kg</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quantity</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ auction.animal.quantity }}</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Age</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ auction.animal.age }}</p>
                </div>
              </div>
              
              <!-- Current bid -->
              <div class="mb-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p class="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide">Current Bid</p>
                <div class="flex justify-between items-center">
                  <div v-if="auction.currentBid" class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg class="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-gray-900">₱{{ auction.currentBid.amount.toLocaleString() }}</p>
                      <p class="text-xs text-gray-500">{{ auction.currentBid.bidderName }}</p>
                    </div>
                  </div>
                  <div v-else class="text-sm text-gray-500 italic">
                    No bids yet
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ auction.bidCount }} {{ auction.bidCount === 1 ? 'bid' : 'bids' }}
                  </div>
                </div>
              </div>
              
              <!-- Description -->
              <div class="mb-4">
                <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">{{ auction.description || 'No description provided' }}</p>
              </div>
              
              <!-- Action buttons -->
              <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                <button 
                  @click.stop="openAuctionDetails(auction)"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </button>
                <div class="flex gap-2">
                  <button 
                    @click.stop="editAuction(auction)"
                    class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-1 shadow-sm hover:shadow-md"
                    v-if="auction.status === 'Upcoming' || auction.status === 'Active'"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    @click.stop="cancelAuction(auction.id)"
                    class="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-1 shadow-sm hover:shadow-md"
                    v-if="auction.status === 'Upcoming' || auction.status === 'Active'"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animal Details Modal -->
    <AnimalDetailsModal
      v-if="isModalOpen"
      :animal="selectedAnimal"
      @close="closeModal"
      @edit="editAnimalFromModal"
      @delete="deleteAnimal"
    />

    <!-- Auction Details Modal -->
    <AuctionDetailsModal
      v-if="isAuctionModalOpen"
      :auction="selectedAuction"
      @close="closeAuctionModal"
      @edit="editAuctionFromModal"
    />

    <!-- Add/Edit Animal Modal -->
    <LivestockFormModal
      :isOpen="isFormModalOpen"
      :isEditMode="isEditMode"
      :currentAnimal="currentAnimalForEdit"
      @close="closeFormModal"
      @submit="handleFormSubmit"
    />

    <!-- Add/Edit Auction Modal -->
    <AuctionFormModal
      :isOpen="isAuctionFormModalOpen"
      :isEditMode="isAuctionEditMode"
      :currentAuction="currentAuctionForEdit"
      :farmerAnimals="farmerAnimals"
      @close="closeAuctionFormModal"
      @submit="handleAuctionFormSubmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LivestockFormModal from '../../components/Market/LivestockFormModal.vue';
import AnimalDetailsModal from '../../components/Market/AnimalDetailsModal.vue';
// import AuctionFormModal from '../../components/Market/AuctionFormModal.vue';
// import AuctionDetailsModal from '../../components/Market/AuctionDetailsModal.vue';

interface Farmer {
  id: number;
  name: string;
  farmName: string;
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
  status: string;
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
}

interface Bid {
  id: number;
  amount: number;
  bidderName: string;
  bidderId: number;
  date: string;
}

interface Auction {
  id: number;
  animal: Animal;
  startingPrice: number;
  currentBid: Bid | null;
  bidCount: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Upcoming' | 'Completed' | 'Cancelled';
  description: string;
  createdBy: Farmer;
}

interface Filters {
  search: string;
  type: string;
  breed: string;
  status: string;
  dateRange: string;
  startDate: string;
  endDate: string;
}

export default defineComponent({
  name: 'LivestockInventory',
  components: {
    LivestockFormModal,

  },
  data() {
    // Current farmer data - in a real app, this would come from auth/user store
    const currentFarmer: Farmer = {
      id: 1,
      name: 'Juan Dela Cruz',
      farmName: 'Dela Cruz Farm',
      contact: '+63 912 345 6789',
      address: '123 Farm Road, Barangay Agriculture, Nueva Ecija',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    };

    // Sample animals data
    const animals: Animal[] = [
      {
        id: 1,
        type: 'Cattle',
        breed: 'Angus',
        weight: 450,
        quantity: 5,
        age: '24 months',
        status: 'Available',
        price: 45000,
        deliveryOptions: ['pickup', 'delivery'],
        images: [
          'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1545468866-336d9336a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        ],
        description: 'Healthy Angus cattle, vaccinated and dewormed. Raised in open pasture with organic feed. Excellent breeding stock with documented lineage.',
        datePosted: new Date().toISOString(),
        farmer: currentFarmer
      },
      {
        id: 2,
        type: 'Pig',
        breed: 'Duroc',
        weight: 120,
        quantity: 10,
        age: '8 months',
        status: 'Available',
        price: 12000,
        deliveryOptions: ['pickup'],
        images: [
          'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        ],
        description: 'Premium Duroc pigs, excellent for breeding or meat production. Raised in hygienic conditions with proper nutrition.',
        datePosted: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        farmer: currentFarmer
      },
      {
        id: 3,
        type: 'Goat',
        breed: 'Boer',
        weight: 45,
        quantity: 2,
        age: '12 months',
        status: 'Low Stock',
        price: 8000,
        deliveryOptions: ['pickup', 'delivery'],
        images: [
          'https://images.unsplash.com/photo-1551649001-7a2485554199?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        ],
        description: 'Purebred Boer goats, excellent for meat production. Healthy and well-cared for animals.',
        datePosted: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        farmer: currentFarmer
      },
      {
        id: 4,
        type: 'Chicken',
        breed: 'Native',
        weight: 1.5,
        quantity: 0,
        age: '6 months',
        status: 'Out of Stock',
        price: 250,
        deliveryOptions: ['pickup', 'delivery'],
        images: [
          'https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        ],
        description: 'Free-range native chickens, raised organically without antibiotics or hormones.',
        datePosted: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
        farmer: currentFarmer
      }
    ];

    // Sample auctions data
    const auctions: Auction[] = [
      {
        id: 1,
        animal: animals[0], // Angus cattle
        startingPrice: 40000,
        currentBid: {
          id: 1,
          amount: 42500,
          bidderName: 'Maria Santos',
          bidderId: 2,
          date: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        },
        bidCount: 3,
        startDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        endDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        status: 'Active',
        description: 'Premium Angus cattle auction. Bidding ends in 24 hours.',
        createdBy: currentFarmer
      },
      {
        id: 2,
        animal: animals[1], // Duroc pigs
        startingPrice: 10000,
        currentBid: null,
        bidCount: 0,
        startDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        endDate: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
        status: 'Upcoming',
        description: 'Duroc piglets auction. Starts soon!',
        createdBy: currentFarmer
      },
      {
        id: 3,
        animal: animals[2], // Boer goats
        startingPrice: 7000,
        currentBid: {
          id: 2,
          amount: 7500,
          bidderName: 'Carlos Reyes',
          bidderId: 3,
          date: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
        },
        bidCount: 2,
        startDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        endDate: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        status: 'Completed',
        description: 'Boer goat auction - now closed',
        createdBy: currentFarmer
      }
    ];

    return {
      viewMode: 'table' as 'table' | 'card',
      activeTab: 'listings' as 'listings' | 'auctions',
      showDropdown: false,
      isModalOpen: false,
      isFormModalOpen: false,
      isAuctionModalOpen: false,
      isAuctionFormModalOpen: false,
      isEditMode: false,
      isAuctionEditMode: false,
      selectedAnimal: {} as Animal,
      selectedAuction: {} as Auction,
      currentAnimalForEdit: null as Animal | null,
      currentAuctionForEdit: null as Auction | null,
      currentFarmer,
      animals,
      auctions,
      filters: {
        search: '',
        type: '',
        breed: '',
        status: '',
        dateRange: '',
        startDate: '',
        endDate: ''
      } as Filters
    }
  },
  computed: {
    // Only show animals belonging to the current farmer
    farmerAnimals(): Animal[] {
      return this.animals.filter(animal => animal.farmer.id === this.currentFarmer.id);
    },
    // Only show auctions created by the current farmer
    farmerAuctions(): Auction[] {
      return this.auctions.filter(auction => auction.createdBy.id === this.currentFarmer.id);
    },
    // Get unique types for filter dropdown
    uniqueTypes(): string[] {
      const types = new Set(this.farmerAnimals.map(animal => animal.type));
      return Array.from(types).sort();
    },
    // Get unique breeds for filter dropdown
    uniqueBreeds(): string[] {
      const breeds = new Set(this.farmerAnimals.map(animal => animal.breed));
      return Array.from(breeds).sort();
    },
    // Filter animals based on current filters
    filteredAnimals(): Animal[] {
      return this.farmerAnimals.filter(animal => {
        // Search filter
        const matchesSearch = !this.filters.search || 
          animal.type.toLowerCase().includes(this.filters.search.toLowerCase()) || 
          animal.breed.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          animal.description.toLowerCase().includes(this.filters.search.toLowerCase());
        
        // Type filter
        const matchesType = !this.filters.type || animal.type === this.filters.type;
        
        // Breed filter
        const matchesBreed = !this.filters.breed || animal.breed === this.filters.breed;
        
        // Status filter
        const matchesStatus = !this.filters.status || animal.status === this.filters.status;
        
        // Date range filter
        let matchesDate = true;
        if (this.filters.dateRange) {
          const now = new Date();
          const animalDate = new Date(animal.datePosted);
          
          if (this.filters.dateRange === 'today') {
            matchesDate = animalDate.toDateString() === now.toDateString();
          } else if (this.filters.dateRange === 'week') {
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            matchesDate = animalDate >= startOfWeek;
          } else if (this.filters.dateRange === 'month') {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            matchesDate = animalDate >= startOfMonth;
          } else if (this.filters.dateRange === 'year') {
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            matchesDate = animalDate >= startOfYear;
          } else if (this.filters.dateRange === 'custom' && this.filters.startDate && this.filters.endDate) {
            const startDate = new Date(this.filters.startDate);
            const endDate = new Date(this.filters.endDate);
            matchesDate = animalDate >= startDate && animalDate <= endDate;
          }
        }
        
        return matchesSearch && matchesType && matchesBreed && matchesStatus && matchesDate;
      });
    },
    // Filter auctions based on current filters
    filteredAuctions(): Auction[] {
      return this.farmerAuctions.filter(auction => {
        // Search filter
        const matchesSearch = !this.filters.search || 
          auction.animal.type.toLowerCase().includes(this.filters.search.toLowerCase()) || 
          auction.animal.breed.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          auction.description.toLowerCase().includes(this.filters.search.toLowerCase());
        
        // Status filter
        const matchesStatus = !this.filters.status || auction.status === this.filters.status;
        
        // Date range filter (based on end date for auctions)
        let matchesDate = true;
        if (this.filters.dateRange) {
          const now = new Date();
          const auctionDate = new Date(auction.endDate);
          
          if (this.filters.dateRange === 'today') {
            matchesDate = auctionDate.toDateString() === now.toDateString();
          } else if (this.filters.dateRange === 'week') {
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            matchesDate = auctionDate >= startOfWeek;
          } else if (this.filters.dateRange === 'month') {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            matchesDate = auctionDate >= startOfMonth;
          } else if (this.filters.dateRange === 'year') {
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            matchesDate = auctionDate >= startOfYear;
          } else if (this.filters.dateRange === 'custom' && this.filters.startDate && this.filters.endDate) {
            const startDate = new Date(this.filters.startDate);
            const endDate = new Date(this.filters.endDate);
            matchesDate = auctionDate >= startDate && auctionDate <= endDate;
          }
        }
        
        return matchesSearch && matchesStatus && matchesDate;
      });
    }
  },
  methods: {
    toggleView(): void {
      this.viewMode = this.viewMode === 'table' ? 'card' : 'table';
    },
    openModal(animal: Animal): void {
      this.selectedAnimal = animal;
      this.isModalOpen = true;
    },
    closeModal(): void {
      this.isModalOpen = false;
    },
    editAnimalFromModal(): void {
      this.currentAnimalForEdit = this.selectedAnimal;
      this.isEditMode = true;
      this.isModalOpen = false;
      this.isFormModalOpen = true;
    },
    openAddModal(): void {
      this.currentAnimalForEdit = null;
      this.isEditMode = false;
      this.isFormModalOpen = true;
      this.showDropdown = false;
    },
    closeFormModal(): void {
      this.isFormModalOpen = false;
    },
    editAnimal(animal: Animal): void {
      this.currentAnimalForEdit = animal;
      this.isEditMode = true;
      this.isFormModalOpen = true;
      this.showDropdown = false;
    },
    handleFormSubmit(animalData: Animal): void {
      if (this.isEditMode && this.currentAnimalForEdit) {
        // Update existing animal
        const index = this.animals.findIndex(a => a.id === this.currentAnimalForEdit?.id);
        if (index !== -1) {
          this.animals[index] = { ...animalData, id: this.currentAnimalForEdit.id };
        }
      } else {
        // Add new animal
        const newId = Math.max(...this.animals.map(a => a.id)) + 1;
        this.animals.push({
          ...animalData,
          id: newId,
          farmer: this.currentFarmer,
          datePosted: new Date().toISOString()
        });
      }
      this.closeFormModal();
    },
    deleteAnimal(animalId: number): void {
      this.animals = this.animals.filter(animal => animal.id !== animalId);
      this.closeModal();
    },
    // Auction methods
    openAuctionModal(): void {
      this.currentAuctionForEdit = null;
      this.isAuctionEditMode = false;
      this.isAuctionFormModalOpen = true;
      this.showDropdown = false;
    },
    closeAuctionFormModal(): void {
      this.isAuctionFormModalOpen = false;
    },
    openAuctionDetails(auction: Auction): void {
      this.selectedAuction = auction;
      this.isAuctionModalOpen = true;
    },
    closeAuctionModal(): void {
      this.isAuctionModalOpen = false;
    },
    editAuctionFromModal(): void {
      this.currentAuctionForEdit = this.selectedAuction;
      this.isAuctionEditMode = true;
      this.isAuctionModalOpen = false;
      this.isAuctionFormModalOpen = true;
    },
    editAuction(auction: Auction): void {
      this.currentAuctionForEdit = auction;
      this.isAuctionEditMode = true;
      this.isAuctionFormModalOpen = true;
    },
    handleAuctionFormSubmit(auctionData: any): void {
      if (this.isAuctionEditMode && this.currentAuctionForEdit) {
        // Update existing auction
        const index = this.auctions.findIndex(a => a.id === this.currentAuctionForEdit?.id);
        if (index !== -1) {
          // Find the animal object from animals array
          const animal = this.animals.find(a => a.id === auctionData.animalId);
          if (animal) {
            this.auctions[index] = { 
              ...this.auctions[index],
              ...auctionData,
              animal,
              currentBid: this.auctions[index].currentBid // Preserve current bid
            };
          }
        }
      } else {
        // Add new auction
        const newId = Math.max(...this.auctions.map(a => a.id)) + 1;
        const animal = this.animals.find(a => a.id === auctionData.animalId);
        
        if (animal) {
          this.auctions.push({
            id: newId,
            animal,
            startingPrice: auctionData.startingPrice,
            currentBid: null,
            bidCount: 0,
            startDate: auctionData.startDate,
            endDate: auctionData.endDate,
            status: new Date(auctionData.startDate) > new Date() ? 'Upcoming' : 'Active',
            description: auctionData.description,
            createdBy: this.currentFarmer
          });
        }
      }
      this.closeAuctionFormModal();
    },
    cancelAuction(auctionId: number): void {
      const index = this.auctions.findIndex(a => a.id === auctionId);
      if (index !== -1) {
        this.auctions[index].status = 'Cancelled';
      }
    },
    // Helper methods
    resetFilters(): void {
      this.filters = {
        search: '',
        type: '',
        breed: '',
        status: '',
        dateRange: '',
        startDate: '',
        endDate: ''
      };
    },
    getStatusClass(status: string): string {
      switch (status) {
        case 'Available':
          return 'bg-green-100 text-green-800';
        case 'Low Stock':
          return 'bg-yellow-100 text-yellow-800';
        case 'Out of Stock':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    getAuctionStatusClass(status: string): string {
      switch (status) {
        case 'Active':
          return 'bg-blue-100 text-blue-800';
        case 'Upcoming':
          return 'bg-purple-100 text-purple-800';
        case 'Completed':
          return 'bg-green-100 text-green-800';
        case 'Cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    formatDate(dateString: string): string {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatTimeLeft(endDateString: string): string {
      const endDate = new Date(endDateString);
      const now = new Date();
      const diffMs = endDate.getTime() - now.getTime();
      
      if (diffMs <= 0) return 'Ended';
      
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      if (diffDays > 0) {
        return `${diffDays}d ${diffHrs}h`;
      } else if (diffHrs > 0) {
        return `${diffHrs}h ${diffMins}m`;
      } else {
        return `${diffMins}m`;
      }
    },
    isEndingSoon(endDateString: string): boolean {
      const endDate = new Date(endDateString);
      const now = new Date();
      const diffHours = (endDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      return diffHours > 0 && diffHours <= 24; // Ending in next 24 hours
    }
  }
});
</script>