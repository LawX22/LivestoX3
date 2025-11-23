<!-- AuctionDetailsModal.vue -->
<template>
    <div v-if="animal && isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
        <div
            class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300">

            <!-- Header -->
            <div
                class="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white p-4 border-b border-amber-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-lg font-bold text-white">Livestock Details</h2>
                            <p class="text-amber-100 text-xs">View listing details and information</p>
                        </div>
                    </div>
                    <button @click="$emit('close')"
                        class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Main Content - Two Section Layout -->
            <div class="overflow-y-auto max-h-[calc(95vh-80px)]">
                <div class="flex">

                    <!-- Left Section - Images Only -->
                    <div class="w-2/5 bg-gradient-to-br from-amber-50 to-orange-50 border-r border-gray-200 flex flex-col">
                        <!-- Images Section -->
                        <div class="flex-1 p-4 overflow-y-auto">
                            <div class="space-y-4">
                                <div class="text-center">
                                    <h3 class="text-base font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                                        <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Livestock Images
                                    </h3>
                                </div>

                                <!-- Main Image Preview -->
                                <div class="relative">
                                    <div class="w-full h-64 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
                                        <img :src="animal.images[selectedImageIndex]" :alt="animal.title"
                                            class="w-full h-full object-cover rounded-lg" />
                                    </div>

                                    <!-- Navigation arrows for main preview -->
                                    <div v-if="animal.images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
                                        <button @click="previousImage" type="button"
                                            class="ml-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div v-if="animal.images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
                                        <button @click="nextImage" type="button"
                                            class="mr-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Thumbnail Gallery -->
                                <div v-if="animal.images.length > 0" class="grid grid-cols-5 gap-2">
                                    <div v-for="(image, index) in animal.images" :key="index"
                                        class="relative group cursor-pointer" @click="selectedImageIndex = index">
                                        <img :src="image" :alt="`Thumbnail ${index + 1}`"
                                            :class="`w-full h-14 object-cover rounded-lg border-2 transition-all ${selectedImageIndex === index ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-200 hover:border-gray-400'}`" />
                                    </div>
                                </div>

                                <!-- Image Counter -->
                                <div class="text-center">
                                    <p class="text-xs text-amber-600 font-medium">{{ selectedImageIndex + 1 }}/{{ animal.images.length }} images</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Section - Information with Tabs -->
                    <div class="w-3/5 bg-gray-50 flex flex-col" style="max-height: calc(95vh - 80px);">
                        
                        <!-- Tab Navigation -->
                        <div class="flex border-b border-gray-200 bg-white">
                            <button 
                                @click="activeTab = 'details'"
                                :class="[
                                    'flex-1 px-4 py-3 text-sm font-medium text-center border-b-2 transition-colors',
                                    activeTab === 'details' 
                                        ? 'text-amber-600 border-amber-600' 
                                        : 'text-gray-500 border-transparent hover:text-gray-700'
                                ]">
                                <div class="flex items-center justify-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Details
                                </div>
                            </button>
                            <button 
                                v-if="animal.isAuction"
                                @click="activeTab = 'bids'"
                                :class="[
                                    'flex-1 px-4 py-3 text-sm font-medium text-center border-b-2 transition-colors',
                                    activeTab === 'bids' 
                                        ? 'text-amber-600 border-amber-600' 
                                        : 'text-gray-500 border-transparent hover:text-gray-700'
                                ]">
                                <div class="flex items-center justify-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Bids ({{ animal.bidCount || 0 }})
                                </div>
                            </button>
                        </div>

                        <!-- Tab Content -->
                        <div class="flex-1 p-4 overflow-y-auto">

                            <!-- Details Tab -->
                            <div v-show="activeTab === 'details'" class="space-y-4">
                                <!-- Title Section with ID -->
                                <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                    <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Listing Information
                                    </h3>
                                    <h2 class="text-xl font-bold text-gray-900 mb-2">{{ animal.title }}</h2>
                                    <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                        <span class="font-semibold">ID:</span>
                                        <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ animal.id }}</span>
                                    </div>
                                    <div class="flex items-center gap-2 mb-2">
                                        <span
                                            :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(computedStatus)}`">
                                            {{ computedStatus }}
                                        </span>
                                    </div>
                                    <p class="text-gray-600 text-sm">{{ animal.description }}</p>
                                </div>

                                <!-- Auction Timer (if auction) -->
                                <div v-if="animal.isAuction"
                                    class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 shadow-sm">
                                    <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        Auction Timer
                                    </h3>
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-sm text-amber-800">Time remaining</p>
                                            <p class="text-xl font-bold text-amber-900">{{ getTimeRemaining(animal.endTime) }}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Current Auction Status (if auction) -->
                                <div v-if="animal.isAuction" class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                    <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Current Auction Status
                                    </h3>

                                    <div class="space-y-4">
                                        <!-- Current Bid Info -->
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Starting Bid</label>
                                                <div class="text-lg font-bold text-gray-600">₱{{ (animal.startingBid || 0).toLocaleString() }}</div>
                                            </div>
                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Current Highest Bid</label>
                                                <div class="text-lg font-bold text-amber-600">₱{{ (animal.currentBid || animal.startingBid || 0).toLocaleString() }}</div>
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Total Bids</label>
                                                <div class="text-sm font-medium text-gray-900">{{ animal.bidCount || 0 }} bid(s)</div>
                                            </div>
                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Next Min Bid</label>
                                                <div class="text-sm font-medium text-amber-600">₱{{ minBidAmount.toLocaleString() }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Regular Price (if not auction) -->
                                <div v-if="!animal.isAuction" class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                    <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                        Listing Price
                                    </h3>
                                    <div class="text-2xl font-bold text-green-600">₱{{ animal.price.toLocaleString() }}</div>
                                    <p class="text-sm text-gray-500 mt-1">Fixed price per {{ animal.quantity > 1 ? 'head' : 'unit' }}</p>
                                </div>

                                <!-- Basic Information -->
                                <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                    <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Basic Information
                                    </h3>

                                    <div class="space-y-4">
                                        <!-- Animal Details Grid -->
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Animal Type</label>
                                                <div class="text-sm font-medium text-gray-900">{{ animal.type }}</div>
                                            </div>

                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Breed</label>
                                                <div class="text-sm font-medium text-gray-900">{{ animal.breed }}</div>
                                            </div>

                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Gender</label>
                                                <div class="text-sm font-medium text-gray-900">{{ animal.gender }}</div>
                                            </div>

                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Age</label>
                                                <div class="text-sm font-medium text-gray-900">{{ animal.age }}</div>
                                            </div>

                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Weight</label>
                                                <div class="text-sm font-medium text-gray-900">{{ animal.weight }} kg</div>
                                            </div>

                                            <div>
                                                <label class="block text-xs font-semibold text-gray-700 mb-1">Quantity Available</label>
                                                <div class="text-sm font-medium text-gray-900">{{ animal.quantity }}</div>
                                            </div>
                                        </div>

                                        <!-- Health Status -->
                                        <div v-if="animal.healthStatus && animal.healthStatus.length > 0" class="border-t border-gray-200 pt-4">
                                            <label class="block text-xs font-semibold text-gray-700 mb-2">Health Status</label>
                                            <div class="flex flex-wrap gap-2">
                                                <span v-for="(status, index) in animal.healthStatus" :key="index"
                                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    {{ status }}
                                                </span>
                                            </div>
                                        </div>

                                        <!-- Delivery Options -->
                                        <div class="border-t border-gray-200 pt-4">
                                            <label class="block text-xs font-semibold text-gray-700 mb-2">Delivery Options</label>
                                            <div class="flex flex-wrap gap-2">
                                                <span v-for="(option, index) in animal.deliveryOptions" :key="index"
                                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    {{ formatDeliveryOption(option) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Farmer Information -->
                                <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                    <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Farmer Information
                                    </h3>

                                    <div class="flex items-center gap-3">
                                        <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-12 h-12 rounded-full object-cover border-2 border-amber-200">
                                        <div>
                                            <h4 class="text-sm font-bold text-gray-900">{{ animal.farmer.name }}</h4>
                                            <p v-if="animal.farmer.farmName" class="text-xs text-gray-600">{{ animal.farmer.farmName }}</p>
                                            <p class="text-xs text-gray-500">{{ animal.farmer.contact }}</p>
                                            <p v-if="animal.farmer.email" class="text-xs text-gray-500">{{ animal.farmer.email }}</p>
                                        </div>
                                    </div>
                                    <div class="mt-3 text-sm text-gray-700">
                                        <p>{{ animal.farmer.address }}</p>
                                    </div>
                                </div>

                                <!-- Listing Stats -->
                                <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                    <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Listing Statistics
                                    </h3>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-xs font-semibold text-gray-700 mb-1">Date Posted</label>
                                            <div class="text-sm font-medium text-gray-900">{{ formatDate(animal.datePosted) }}</div>
                                        </div>
                                        <div v-if="animal.isAuction">
                                            <label class="block text-xs font-semibold text-gray-700 mb-1">Auction Started</label>
                                            <div class="text-sm font-medium text-gray-900">{{ formatDate(animal.auctionStartTime || animal.datePosted) }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Bids Tab (for auctions) -->
                            <div v-show="activeTab === 'bids' && animal.isAuction" class="space-y-4">
                                <div class="text-center">
                                    <h3 class="text-base font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Auction Bidding History
                                    </h3>
                                </div>

                                <!-- Auction Summary Cards -->
                                <div class="grid grid-cols-3 gap-3 mb-4">
                                    <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm text-center">
                                        <p class="text-xs text-gray-500 mb-1">Current Highest</p>
                                        <p class="text-lg font-bold text-amber-600">₱{{ (animal.currentBid || animal.startingBid || 0).toLocaleString() }}</p>
                                    </div>
                                    <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm text-center">
                                        <p class="text-xs text-gray-500 mb-1">Total Bids</p>
                                        <p class="text-lg font-bold text-gray-900">{{ animal.bidCount || 0 }}</p>
                                    </div>
                                    <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm text-center">
                                        <p class="text-xs text-gray-500 mb-1">Active Bidders</p>
                                        <p class="text-lg font-bold text-blue-600">{{ activeBidders.length }}</p>
                                    </div>
                                </div>

                                <!-- Bidding Table -->
                                <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                    <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                        <h4 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                            <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                    d="M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h3M7 3v18M17.05 3.05L15 1l2.05-2.05L19.1 1l-2.05 2.05zM17.05 21.95L15 23l2.05 2.05L19.1 23l-2.05-2.05z" />
                                            </svg>
                                            Bidding Activity
                                        </h4>
                                    </div>
                                    
                                    <!-- Table -->
                                    <div v-if="bidHistory.length > 0" class="overflow-x-auto">
                                        <table class="w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Rank
                                                    </th>
                                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Bidder
                                                    </th>
                                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Bid Amount
                                                    </th>
                                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Bid Time
                                                    </th>
                                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Bid Type
                                                    </th>
                                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="(bid, index) in bidHistory" :key="bid.id" 
                                                    :class="index === 0 ? 'bg-amber-50 border-l-4 border-amber-400' : 'hover:bg-gray-50'">
                                                    <td class="px-4 py-3 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <span v-if="index === 0" 
                                                                class="inline-flex items-center justify-center w-6 h-6 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                                                                1
                                                            </span>
                                                            <span v-else-if="index === 1" 
                                                                class="inline-flex items-center justify-center w-6 h-6 bg-gray-300 text-gray-700 text-xs font-bold rounded-full">
                                                                2
                                                            </span>
                                                            <span v-else-if="index === 2" 
                                                                class="inline-flex items-center justify-center w-6 h-6 bg-orange-400 text-orange-900 text-xs font-bold rounded-full">
                                                                3
                                                            </span>
                                                            <span v-else 
                                                                class="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                                {{ index + 1 }}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td class="px-4 py-3 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <div class="flex-shrink-0 h-8 w-8">
                                                                <div class="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                                                                    <span class="text-xs font-medium text-white">
                                                                        {{ bid.bidderName.charAt(0).toUpperCase() }}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="ml-3">
                                                                <div class="text-sm font-medium text-gray-900">{{ bid.bidderName }}</div>
                                                                <div class="text-xs text-gray-500">ID: {{ bid.bidderId || `B${String(bid.id).padStart(3, '0')}` }}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-4 py-3 whitespace-nowrap">
                                                        <div class="flex flex-col">
                                                            <span class="text-sm font-bold" :class="index === 0 ? 'text-amber-600' : 'text-gray-900'">
                                                                ₱{{ bid.amount.toLocaleString() }}
                                                            </span>
                                                            <span v-if="index > 0" class="text-xs text-gray-500">
                                                                +₱{{ (bid.amount - bidHistory[index + 1]?.amount || bid.amount - (animal.startingBid || 0)).toLocaleString() }}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td class="px-4 py-3 whitespace-nowrap">
                                                        <div class="flex flex-col">
                                                            <span class="text-sm text-gray-900">{{ formatTime(bid.timestamp) }}</span>
                                                            <span class="text-xs text-gray-500">{{ formatDateShort(bid.timestamp) }}</span>
                                                        </div>
                                                    </td>
                                                    <td class="px-4 py-3 whitespace-nowrap">
                                                        <span :class="`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBidTypeClass(bid.bidType || 'manual')}`">
                                                            {{ formatBidType(bid.bidType || 'manual') }}
                                                        </span>
                                                    </td>
                                                    <td class="px-4 py-3 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <span v-if="index === 0" class="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                                                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                                </svg>
                                                                Leading
                                                            </span>
                                                            <span v-else class="inline-flex items-center gap-1 text-xs font-medium text-gray-500">
                                                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
                                                                </svg>
                                                                Outbid
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- Empty state -->
                                    <div v-else class="text-center py-12">
                                        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <p class="text-lg font-medium text-gray-500 mb-2">No bids yet</p>
                                        <p class="text-sm text-gray-400">Be the first to place a bid on this auction!</p>
                                    </div>
                                </div>

                                <!-- Auction Statistics -->
                                <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                                    <h4 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Auction Statistics
                                    </h4>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-xs font-semibold text-gray-700 mb-1">Average Bid</label>
                                            <div class="text-sm font-medium text-gray-900">₱{{ averageBid.toLocaleString() }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-xs font-semibold text-gray-700 mb-1">Highest Increment</label>
                                            <div class="text-sm font-medium text-gray-900">₱{{ highestIncrement.toLocaleString() }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-xs font-semibold text-gray-700 mb-1">Bid Frequency</label>
                                            <div class="text-sm font-medium text-gray-900">{{ bidFrequency }} bids/hour</div>
                                        </div>
                                        <div>
                                            <label class="block text-xs font-semibold text-gray-700 mb-1">Competition Level</label>
                                            <div class="text-sm font-medium" :class="getCompetitionColor(competitionLevel)">
                                                {{ competitionLevel }}
                                            </div>
                                        </div>
                                    </div>
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
import { ref, computed, watch, onUnmounted } from 'vue';
import type { Animal, Bid } from '../../services/animal';

type BidType = 'manual' | 'auto' | 'proxy' | 'snipe';

interface ExtendedBid extends Bid {
    bidderName: string;
    bidderId?: string;
    bidType?: BidType;
    increment?: number;
}

const props = defineProps<{
    animal: Animal | null;
    isOpen: boolean;
}>();

// const emit = defineEmits<{
//     close: [];
// }>();

const selectedImageIndex = ref(0);
const bidHistory = ref<ExtendedBid[]>([]);
const activeTab = ref<'details' | 'bids'>('details');
let timerInterval: number | null = null;

// Computed properties
const computedStatus = computed((): string => {
    if (!props.animal) return '';

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

const minBidAmount = computed((): number => {
    if (!props.animal) return 0;
    const current = props.animal.currentBid || props.animal.startingBid || 0;
    return current + (current * 0.05); // 5% increment
});

const activeBidders = computed((): string[] => {
    const uniqueBidders = [...new Set(bidHistory.value.map(bid => bid.bidderName))];
    return uniqueBidders;
});

const averageBid = computed((): number => {
    if (bidHistory.value.length === 0) return 0;
    const total = bidHistory.value.reduce((sum, bid) => sum + bid.amount, 0);
    return Math.round(total / bidHistory.value.length);
});

const highestIncrement = computed((): number => {
    if (bidHistory.value.length < 2) return 0;
    let highest = 0;
    for (let i = 0; i < bidHistory.value.length - 1; i++) {
        const increment = bidHistory.value[i].amount - bidHistory.value[i + 1].amount;
        if (increment > highest) highest = increment;
    }
    return highest;
});

const bidFrequency = computed((): number => {
    if (bidHistory.value.length === 0) return 0;
    const firstBid = bidHistory.value[bidHistory.value.length - 1];
    const lastBid = bidHistory.value[0];
    const timeDiff = (new Date(lastBid.timestamp).getTime() - new Date(firstBid.timestamp).getTime()) / (1000 * 60 * 60); // hours
    return timeDiff > 0 ? Math.round(bidHistory.value.length / timeDiff) : 0;
});

const competitionLevel = computed((): string => {
    const bidCount = bidHistory.value.length;
    const uniqueBidders = activeBidders.value.length;
    
    if (bidCount === 0) return 'No Activity';
    if (bidCount <= 3 && uniqueBidders <= 2) return 'Low';
    if (bidCount <= 10 && uniqueBidders <= 5) return 'Moderate';
    if (bidCount <= 20 && uniqueBidders <= 8) return 'High';
    return 'Very High';
});

// Methods
const getStatusClass = (status: string): string => {
    switch (status) {
        case 'Available':
        case 'In Stock':
            return 'bg-green-100 text-green-800';
        case 'Low Stock':
            return 'bg-yellow-100 text-yellow-800';
        case 'Out of Stock':
            return 'bg-red-100 text-red-800';
        case 'Live Auction':
            return 'bg-amber-100 text-amber-800';
        case 'Auction Ended':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-blue-100 text-blue-800';
    }
};

const getBidTypeClass = (bidType: string): string => {
    switch (bidType) {
        case 'manual':
            return 'bg-blue-100 text-blue-800';
        case 'auto':
            return 'bg-green-100 text-green-800';
        case 'proxy':
            return 'bg-purple-100 text-purple-800';
        case 'snipe':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getCompetitionColor = (level: string): string => {
    switch (level) {
        case 'No Activity':
            return 'text-gray-500';
        case 'Low':
            return 'text-green-600';
        case 'Moderate':
            return 'text-yellow-600';
        case 'High':
            return 'text-orange-600';
        case 'Very High':
            return 'text-red-600';
        default:
            return 'text-gray-900';
    }
};

const formatBidType = (bidType: string): string => {
    const types: Record<string, string> = {
        'manual': 'Manual',
        'auto': 'Auto Bid',
        'proxy': 'Proxy Bid',
        'snipe': 'Snipe Bid'
    };
    return types[bidType] || 'Manual';
};

const formatDeliveryOption = (option: string): string => {
    const optionsMap: Record<string, string> = {
        'pickup': 'Buyer Pickup',
        'delivery': 'Farm Delivery',
        'meetup': 'Meetup Point'
    };
    return optionsMap[option] || option;
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
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m left`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s left`;
    } else {
        return `${minutes}m ${seconds}s left`;
    }
};

const formatTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};

const formatDateShort = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
};

const nextImage = (): void => {
    if (!props.animal) return;
    selectedImageIndex.value = selectedImageIndex.value < props.animal.images.length - 1
        ? selectedImageIndex.value + 1
        : 0;
};

const previousImage = (): void => {
    if (!props.animal) return;
    selectedImageIndex.value = selectedImageIndex.value > 0
        ? selectedImageIndex.value - 1
        : props.animal.images.length - 1;
};

// Generate more detailed mock bid data
const generateMockBids = (animal: Animal): ExtendedBid[] => {
    if (!animal.isAuction) return [];
    
    const bidTypes: BidType[] = ['manual', 'auto', 'proxy', 'snipe'];
    const bidderNames = ['CattleKing', 'LivestockLover', 'FarmPro23', 'RanchMaster', 'AgroExpert', 'BarnBoss', 'PastureKing'];
    
    const bids: ExtendedBid[] = [];
    const startingAmount = animal.startingBid || 10000;
    let currentAmount = startingAmount;
    
    // Generate 5-15 random bids
    const bidCount = Math.floor(Math.random() * 11) + 5;
    
    for (let i = 0; i < bidCount; i++) {
        const increment = Math.floor(Math.random() * (currentAmount * 0.15)) + (currentAmount * 0.05);
        currentAmount += increment;
        
        const bid: ExtendedBid = {
            id: i + 1,
            amount: currentAmount,
            timestamp: new Date(Date.now() - (bidCount - i) * Math.random() * 60 * 60 * 1000).toISOString(), // Random times in past hours
            user: {
                id: i + 1,
                name: bidderNames[Math.floor(Math.random() * bidderNames.length)],
                email: `user${i + 1}@example.com`,
avatar: `https://placehold.co/40x40.png?text=${
  bidderNames[Math.floor(Math.random() * bidderNames.length)].charAt(0)
}`            },
            bidderName: bidderNames[Math.floor(Math.random() * bidderNames.length)],
            bidderId: `B${String(i + 1).padStart(3, '0')}`,
            bidType: bidTypes[Math.floor(Math.random() * bidTypes.length)],
            increment: i > 0 ? increment : undefined
        };
        
        bids.push(bid);
    }
    
    // Sort by amount descending (highest first)
    return bids.sort((a, b) => b.amount - a.amount);
};

// Initialize with mock bid history when animal changes (for auctions)
watch(() => props.animal, (newAnimal) => {
    if (newAnimal) {
        // Reset image index when animal changes
        selectedImageIndex.value = 0;

        // Reset active tab to details when animal changes
        activeTab.value = 'details';

        // Generate mock bids for demonstration if it's an auction
        if (newAnimal.isAuction) {
            bidHistory.value = generateMockBids(newAnimal);
        } else {
            bidHistory.value = [];
        }
    }
}, { immediate: true });

// Watch for modal open/close to manage timer
watch(() => props.isOpen, (isOpen) => {
    if (isOpen && props.animal?.isAuction) {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        timerInterval = window.setInterval(() => {
            // Force update for timer - this triggers reactivity
        }, 1000);
    } else if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

// Clear timer when component unmounts
onUnmounted(() => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});
</script>