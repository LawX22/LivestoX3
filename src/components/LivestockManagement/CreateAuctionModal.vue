<!-- CreateAuctionModal.vue -->
<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white p-4 border-b border-orange-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Create New Auction</h2>
              <p class="text-orange-100 text-xs">List your livestock for auction bidding</p>
            </div>
          </div>
          <button @click="closeModal"
            class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Content - Two Section Layout -->
      <div class="overflow-y-auto max-h-[calc(95vh-80px)]">
        <form @submit.prevent="handleSubmit" class="flex">
          
          <!-- Left Section - Images -->
          <div class="w-2/5 bg-gradient-to-br from-amber-50 to-orange-50 p-4 border-r border-gray-200">
            <div class="sticky top-0 space-y-4">
              <div class="text-center">
                <h3 class="text-base font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Auction Images
                </h3>
                <p class="text-xs text-gray-600 mb-3">Upload up to 5 high-quality images</p>
              </div>

              <!-- Main Image Preview -->
              <div class="relative">
                <div class="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  <div v-if="form.images.length === 0" class="text-center p-6">
                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-3" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="text-gray-500 font-medium mb-3 text-sm">No images uploaded</p>
                    <label class="cursor-pointer">
                      <input type="file" multiple accept="image/*" @change="handleImageUpload" class="sr-only" />
                      <span
                        class="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors shadow-lg text-sm">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Choose Files
                      </span>
                    </label>
                    <p class="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                  <img v-else :src="form.images[selectedImageIndex]" alt="Main preview" class="w-full h-full object-cover rounded-lg" />
                </div>

                <!-- Navigation arrows for main preview -->
                <div v-if="form.images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
                  <button @click="previousImage" type="button"
                    class="ml-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div v-if="form.images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
                  <button @click="nextImage" type="button"
                    class="mr-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <!-- Add more images button when images exist -->
                <div v-if="form.images.length > 0 && form.images.length < 5" class="absolute bottom-2 right-2">
                  <label class="cursor-pointer">
                    <input type="file" multiple accept="image/*" @change="handleImageUpload" class="sr-only" />
                    <span
                      class="inline-flex items-center px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors shadow-lg text-xs">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add More
                    </span>
                  </label>
                </div>
              </div>

              <!-- Thumbnail Gallery -->
              <div v-if="form.images.length > 0" class="grid grid-cols-5 gap-2">
                <div v-for="(image, index) in form.images" :key="index"
                  class="relative group cursor-pointer" @click="selectedImageIndex = index">
                  <img :src="image" :alt="`Thumbnail ${index + 1}`"
                    :class="`w-full h-14 object-cover rounded-lg border-2 transition-all ${selectedImageIndex === index ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-200 hover:border-gray-400'}`" />
                  <button @click.stop="removeImage(index)" type="button"
                    class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg">
                    ×
                  </button>
                </div>
              </div>

              <!-- Image Counter -->
              <div v-if="form.images.length > 0" class="text-center">
                <p class="text-xs text-amber-600 font-medium">{{ form.images.length }}/5 images uploaded</p>
              </div>
            </div>
          </div>

          <!-- Right Section - Information -->
          <div class="w-3/5 p-4 bg-gray-50 flex flex-col" style="max-height: calc(95vh - 80px);">
            <div class="overflow-y-auto space-y-4">
              <!-- Title Section -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Auction Title
                </h3>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-2">Title *</label>
                  <input v-model="form.title" type="text" maxlength="100"
                    :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.title ? 'border-red-300' : 'border-gray-300'}`"
                    placeholder="e.g., Premium Angus Cattle Auction - Breeding Quality Stock" required />
                  <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ form.title.length }}/100 characters</p>
                </div>
              </div>

              <!-- Description -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Auction Description
                </h3>

                <textarea v-model="form.description" rows="3" maxlength="1000"
                  :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none transition-colors ${errors.description ? 'border-red-300' : 'border-gray-300'}`"
                  placeholder="Provide detailed information about your livestock including feeding, housing, health records, breeding history, auction terms, etc."
                  required></textarea>
                <p v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ form.description.length }}/1000 characters</p>
              </div>

              <!-- Basic Information -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h3>

                <div class="grid grid-cols-2 gap-3">
                  <!-- Animal Type -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Animal Type *</label>
                    <select v-model="form.type" @change="updateAvailableBreeds"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.type ? 'border-red-300' : 'border-gray-300'}`"
                      required>
                      <option value="">Select type</option>
                      <option value="Cattle">Cattle</option>
                      <option value="Goat">Goat</option>
                      <option value="Pig">Pig</option>
                      <option value="Chicken">Chicken</option>
                      <option value="Duck">Duck</option>
                      <option value="Carabao">Carabao</option>
                      <option value="Sheep">Sheep</option>
                      <option value="Horse">Horse</option>
                      <option value="Other">Other</option>
                    </select>
                    <p v-if="errors.type" class="text-red-500 text-xs mt-1">{{ errors.type }}</p>
                  </div>

                  <!-- Breed -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Breed *</label>
                    <select v-model="form.breed" :disabled="!form.type"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.breed ? 'border-red-300' : 'border-gray-300'} ${!form.type ? 'bg-gray-100 cursor-not-allowed' : ''}`"
                      required>
                      <option value="">{{ form.type ? 'Select breed' : 'Select type first' }}</option>
                      <option v-for="breed in availableBreeds" :key="breed" :value="breed">{{ breed }}</option>
                    </select>
                    <p v-if="errors.breed" class="text-red-500 text-xs mt-1">{{ errors.breed }}</p>
                  </div>

                  <!-- Gender -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Gender *</label>
                    <select v-model="form.gender"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.gender ? 'border-red-300' : 'border-gray-300'}`"
                      required>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                    <p v-if="errors.gender" class="text-red-500 text-xs mt-1">{{ errors.gender }}</p>
                  </div>

                  <!-- Age -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Age *</label>
                    <select v-model="form.age"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.age ? 'border-red-300' : 'border-gray-300'}`"
                      required>
                      <option value="">Select age</option>
                      <option value="0-3 months">0-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="2-4 years">2-4 years</option>
                      <option value="4-6 years">4-6 years</option>
                      <option value="6+ years">6+ years</option>
                      <option value="Mixed ages">Mixed ages</option>
                    </select>
                    <p v-if="errors.age" class="text-red-500 text-xs mt-1">{{ errors.age }}</p>
                  </div>
                </div>
              </div>

              <!-- Physical Details -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Physical Details & Location
                </h3>

                <!-- Grid Layout -->
                <div class="grid grid-cols-2 gap-3">
                  <!-- Weight -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Weight *</label>
                    <div class="flex gap-2">
                      <input v-model.number="form.weight" type="number" min="0" step="0.1"
                        :class="`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.weight ? 'border-red-300' : 'border-gray-300'}`"
                        placeholder="Weight" required />
                      <select v-model="weightUnit"
                        class="w-16 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white">
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                        <option value="tons">tons</option>
                      </select>
                    </div>
                    <p v-if="errors.weight" class="text-red-500 text-xs mt-1">{{ errors.weight }}</p>
                  </div>

                  <!-- Quantity -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Quantity *</label>
                    <input v-model.number="form.quantity" type="number" min="1"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.quantity ? 'border-red-300' : 'border-gray-300'}`"
                      placeholder="Quantity" required />
                    <p v-if="errors.quantity" class="text-red-500 text-xs mt-1">{{ errors.quantity }}</p>
                  </div>

                  <!-- Location -->
                  <div class="col-span-2">
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Location *</label>
                    <select v-model="form.location"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.location ? 'border-red-300' : 'border-gray-300'}`"
                      required>
                      <option value="">Select location</option>
                      <optgroup v-if="userAddresses.length > 0" label="Your Addresses">
                        <option v-for="address in userAddresses" :key="address.id" :value="address.location">
                          {{ address.label }} - {{ address.location }}
                        </option>
                      </optgroup>
                    </select>
                    <p v-if="errors.location" class="text-red-500 text-xs mt-1">{{ errors.location }}</p>
                  </div>
                </div>
              </div>

              <!-- Auction Settings -->
              <div class="bg-white rounded-lg p-4 border border-amber-200 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Auction Settings
                </h3>

                <div class="grid grid-cols-2 gap-3">
                  <!-- Starting Bid -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Starting Bid (₱) *</label>
                    <input v-model.number="form.startingBid" type="number" min="0" step="0.01"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.startingBid ? 'border-red-300' : 'border-gray-300'}`"
                      placeholder="Starting bid amount" required />
                    <p v-if="errors.startingBid" class="text-red-500 text-xs mt-1">{{ errors.startingBid }}</p>
                  </div>

                  <!-- Reserve Price (Optional) -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Reserve Price (₱)</label>
                    <input v-model.number="form.reservePrice" type="number" min="0" step="0.01"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.reservePrice ? 'border-red-300' : 'border-gray-300'}`"
                      placeholder="Minimum selling price (optional)" />
                    <p v-if="errors.reservePrice" class="text-red-500 text-xs mt-1">{{ errors.reservePrice }}</p>
                    <p class="text-xs text-gray-500 mt-1">Hidden from bidders until met</p>
                  </div>

                  <!-- Auction Duration -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Duration *</label>
                    <select v-model="form.duration"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.duration ? 'border-red-300' : 'border-gray-300'}`"
                      required>
                      <option value="">Select duration</option>
                      <option value="1">1 Day</option>
                      <option value="3">3 Days</option>
                      <option value="5">5 Days</option>
                      <option value="7">1 Week</option>
                      <option value="10">10 Days</option>
                      <option value="14">2 Weeks</option>
                    </select>
                    <p v-if="errors.duration" class="text-red-500 text-xs mt-1">{{ errors.duration }}</p>
                  </div>

                  <!-- Minimum Bid Increment -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Min Bid Increment (₱) *</label>
                    <input v-model.number="form.bidIncrement" type="number" min="1" step="1"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.bidIncrement ? 'border-red-300' : 'border-gray-300'}`"
                      placeholder="e.g., 500" required />
                    <p v-if="errors.bidIncrement" class="text-red-500 text-xs mt-1">{{ errors.bidIncrement }}</p>
                    <p class="text-xs text-gray-500 mt-1">Minimum increase per bid</p>
                  </div>
                </div>

                <!-- Auction Summary -->
                <div class="mt-3 p-3 bg-amber-100 border border-amber-300 rounded-lg">
                  <h4 class="text-xs font-bold text-amber-800 mb-2">Auction Summary</h4>
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <p class="text-amber-700">
                      <span class="font-medium">Starting Bid:</span> ₱{{ (form.startingBid || 0).toLocaleString() }}
                    </p>
                    <p class="text-amber-700">
                      <span class="font-medium">Reserve Price:</span> {{ form.reservePrice ? `₱${form.reservePrice.toLocaleString()}` : 'None' }}
                    </p>
                    <p class="text-amber-700">
                      <span class="font-medium">Duration:</span> {{ form.duration ? `${form.duration} day${parseInt(form.duration) > 1 ? 's' : ''}` : 'Not set' }}
                    </p>
                    <p class="text-amber-700">
                      <span class="font-medium">Bid Increment:</span> ₱{{ (form.bidIncrement || 0).toLocaleString() }}
                    </p>
                  </div>
                  <p v-if="form.duration" class="text-xs text-amber-600 mt-2">
                    <span class="font-medium">End Date:</span> {{ getAuctionEndDate() }}
                  </p>
                </div>
              </div>

              <!-- Health Status -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Health Status
                </h3>

                <div class="grid grid-cols-2 gap-2">
                  <label v-for="option in healthOptions" :key="option"
                    class="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                    <input type="checkbox" :value="option" v-model="form.healthStatus"
                      class="w-3 h-3 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                    <span class="text-xs font-medium text-gray-700">{{ option }}</span>
                  </label>
                </div>
              </div>

              <!-- Auction Terms & Conditions -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Auction Terms & Conditions
                </h3>

                <div class="space-y-3">
                  <!-- Payment Terms -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Payment Terms *</label>
                    <select v-model="form.paymentTerms"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${errors.paymentTerms ? 'border-red-300' : 'border-gray-300'}`"
                      required>
                      <option value="">Select payment terms</option>
                      <option value="immediate">Payment within 24 hours</option>
                      <option value="3days">Payment within 3 days</option>
                      <option value="7days">Payment within 7 days</option>
                      <option value="deposit">50% deposit, balance on delivery</option>
                      <option value="custom">Custom terms (specify in description)</option>
                    </select>
                    <p v-if="errors.paymentTerms" class="text-red-500 text-xs mt-1">{{ errors.paymentTerms }}</p>
                  </div>

                  <!-- Delivery Options -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-2">Delivery Options *</label>
                    <div class="space-y-2">
                      <label v-for="option in deliveryOptions" :key="option.value"
                        class="flex items-start gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                        <input type="checkbox" :value="option.value" v-model="form.deliveryOptions"
                          class="w-3 h-3 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1" />
                        <div>
                          <span class="text-xs font-medium text-gray-700 block">{{ option.label }}</span>
                          <p class="text-xs text-gray-500 mt-0.5">{{ option.description }}</p>
                        </div>
                      </label>
                    </div>
                    <p v-if="errors.deliveryOptions" class="text-red-500 text-xs mt-1">{{ errors.deliveryOptions }}</p>
                  </div>

                  <!-- Additional Terms -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Additional Terms</label>
                    <textarea v-model="form.additionalTerms" rows="2" maxlength="500"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-colors"
                      placeholder="Any additional terms, conditions, or requirements for this auction..."></textarea>
                    <p class="text-xs text-gray-500 mt-1">{{ (form.additionalTerms || '').length }}/500 characters</p>
                  </div>
                </div>
              </div>

              <!-- Auction Preview -->
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <h3 class="text-sm font-bold text-green-800 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Auction Preview
                </h3>
                <div class="space-y-2 text-xs">
                  <div class="flex justify-between">
                    <span class="text-green-700 font-medium">Title:</span>
                    <span class="text-green-800">{{ form.title || 'Not set' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-green-700 font-medium">Type:</span>
                    <span class="text-green-800">{{ form.type || 'Not set' }} {{ form.breed ? `- ${form.breed}` : '' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-green-700 font-medium">Quantity:</span>
                    <span class="text-green-800">{{ form.quantity || 0 }} {{ form.quantity === 1 ? 'animal' : 'animals' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-green-700 font-medium">Starting Bid:</span>
                    <span class="text-green-800 font-bold">₱{{ (form.startingBid || 0).toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-green-700 font-medium">Total Starting Value:</span>
                    <span class="text-green-800 font-bold">₱{{ ((form.startingBid || 0) * (form.quantity || 0)).toLocaleString() }}</span>
                  </div>
                  <div v-if="form.duration" class="flex justify-between">
                    <span class="text-green-700 font-medium">Auction Ends:</span>
                    <span class="text-green-800">{{ getAuctionEndDate() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons - Sticky at the bottom -->
            <div class="sticky bottom-0 pt-4 bg-gray-50 mt-auto">
              <div class="flex gap-3 justify-center">
                <button type="submit" :disabled="isSubmitting"
                  class="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2">
                  <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l-3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ isSubmitting ? 'Creating Auction...' : 'Create Auction' }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// Interfaces matching your animal.ts types
interface FormErrors {
  [key: string]: string
}

interface UserAddress {
  id: number
  label: string
  location: string
  address: string
  isDefault: boolean
}

interface DeliveryOption {
  value: string
  label: string
  description: string
}

interface CreateAuctionForm {
  title: string
  type: string
  breed: string
  weight: number
  quantity: number
  age: string
  gender: string
  healthStatus: string[]
  startingBid: number
  reservePrice?: number
  bidIncrement: number
  duration: string
  deliveryOptions: string[]
  images: string[]
  description: string
  location: string
  paymentTerms: string
  additionalTerms?: string
}

// Props and Emits
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  created: [auction: CreateAuctionForm]
  draft: [auction: CreateAuctionForm]
}>()

// Reactive data
const isSubmitting = ref(false)
const selectedImageIndex = ref(0)
const availableBreeds = ref<string[]>([])
const weightUnit = ref('kg')

const form = reactive<CreateAuctionForm>({
  title: '',
  type: '',
  breed: '',
  weight: 0,
  quantity: 1,
  age: '',
  gender: '',
  healthStatus: [],
  startingBid: 0,
  reservePrice: undefined,
  bidIncrement: 500,
  duration: '',
  deliveryOptions: [],
  images: [],
  description: '',
  location: '',
  paymentTerms: '',
  additionalTerms: ''
})

const errors = ref<FormErrors>({})

// User addresses based on unified farmer data
const userAddresses = ref<UserAddress[]>([
  {
    id: 1,
    label: 'Santos Ranch - Main Farm',
    location: 'Pampanga',
    address: '123 Poultry Lane, Barangay Fowl, Pampanga',
    isDefault: true
  },
  {
    id: 2,
    label: 'Santos Ranch - Secondary Location',
    location: 'Bulacan',
    address: '456 Santos Extension, Barangay Ranch, Bulacan',
    isDefault: false
  }
])

// Options
const healthOptions: readonly string[] = [
  'Healthy & Vaccinated',
  'Vet Certified',
  'Dewormed',
  'Disease Free',
  'Quarantined',
  'Breeding Ready',
  'Pregnant',
  'Recently Treated',
  'Special Care Needed'
] as const

const deliveryOptions: readonly DeliveryOption[] = [
  {
    value: 'pickup',
    label: 'Winner Pickup',
    description: 'Auction winner arranges pickup from farm location'
  },
  {
    value: 'delivery',
    label: 'Farm Delivery',
    description: 'We deliver to winner location (additional fees may apply)'
  },
  {
    value: 'meetup',
    label: 'Meetup Point',
    description: 'Meet at agreed location between farm and winner'
  }
] as const

// Breed mapping based on animal type
const breedsByAnimalType: Record<string, readonly string[]> = {
  'Cattle': [
    'Angus', 'Holstein', 'Brahman', 'Charolais', 'Simmental', 'Hereford',
    'Limousin', 'Wagyu', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,

  'Goat': [
    'Boer', 'Nubian', 'Saanen', 'Alpine', 'LaMancha', 'Toggenburg',
    'Nigerian Dwarf', 'Kiko', 'Spanish', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,

  'Pig': [
    'Yorkshire', 'Landrace', 'Duroc', 'Hampshire', 'Berkshire', 'Chester White',
    'Poland China', 'Pietrain', 'Large White', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,

  'Chicken': [
    'Rhode Island Red', 'Leghorn', 'Plymouth Rock', 'Brahma', 'Orpington', 'Wyandotte',
    'Sussex', 'Marans', 'Australorp', 'Native/Local Breed', 'Broiler', 'Layer',
    'Dual Purpose', 'Other'
  ] as const,

  'Duck': [
    'Pekin', 'Mallard', 'Rouen', 'Khaki Campbell', 'Runner', 'Muscovy',
    'Call Duck', 'Cayuga', 'Swedish Blue', 'Native/Local Breed', 'Other'
  ] as const,

  'Carabao': [
    'Murrah', 'Nili-Ravi', 'Surti', 'Jaffarabadi',
    'Native Carabao', 'Crossbred', 'Other'
  ] as const,

  'Sheep': [
    'Dorper', 'Merino', 'Suffolk', 'Hampshire', 'Romney', 'Border Leicester',
    'Corriedale', 'Rambouillet', 'Katahdin', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,

  'Horse': [
    'Arabian', 'Thoroughbred', 'Quarter Horse', 'Paint', 'Appaloosa', 'Mustang',
    'Clydesdale', 'Percheron', 'Friesian', 'Native/Local Breed', 'Other'
  ] as const,

  'Other': [
    'Mixed Breed', 'Crossbred', 'Unspecified', 'Other'
  ] as const
}

// Methods
const updateAvailableBreeds = (): void => {
  if (form.type && breedsByAnimalType[form.type]) {
    availableBreeds.value = [...breedsByAnimalType[form.type]]
  } else {
    availableBreeds.value = []
  }
  // Reset breed selection when animal type changes
  form.breed = ''
}

const getAuctionEndDate = (): string => {
  if (!form.duration) return 'Not set'
  
  const now = new Date()
  const endDate = new Date(now.getTime() + (parseInt(form.duration) * 24 * 60 * 60 * 1000))
  
  return endDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const validateForm = (): boolean => {
  errors.value = {}
  let isValid = true

  // Basic validation
  if (!form.title || form.title.length < 5) {
    errors.value.title = 'Title must be at least 5 characters'
    isValid = false
  }

  if (form.title.length > 100) {
    errors.value.title = 'Title must be less than 100 characters'
    isValid = false
  }

  if (!form.type) {
    errors.value.type = 'Animal type is required'
    isValid = false
  }

  if (!form.breed) {
    errors.value.breed = 'Breed is required'
    isValid = false
  }

  if (!form.gender) {
    errors.value.gender = 'Gender is required'
    isValid = false
  }

  if (!form.age) {
    errors.value.age = 'Age is required'
    isValid = false
  }

  if (!form.weight || form.weight <= 0) {
    errors.value.weight = 'Valid weight is required'
    isValid = false
  }

  if (!form.quantity || form.quantity <= 0) {
    errors.value.quantity = 'Valid quantity is required'
    isValid = false
  }

  if (!form.location) {
    errors.value.location = 'Location is required'
    isValid = false
  }

  if (!form.description || form.description.length < 10) {
    errors.value.description = 'Description must be at least 10 characters'
    isValid = false
  }

  if (form.description.length > 1000) {
    errors.value.description = 'Description must be less than 1000 characters'
    isValid = false
  }

  // Auction-specific validation
  if (!form.startingBid || form.startingBid <= 0) {
    errors.value.startingBid = 'Valid starting bid is required'
    isValid = false
  }

  if (form.reservePrice && form.reservePrice <= 0) {
    errors.value.reservePrice = 'Reserve price must be greater than 0 if specified'
    isValid = false
  }

  if (form.reservePrice && form.startingBid && form.reservePrice < form.startingBid) {
    errors.value.reservePrice = 'Reserve price must be greater than or equal to starting bid'
    isValid = false
  }

  if (!form.duration) {
    errors.value.duration = 'Auction duration is required'
    isValid = false
  }

  if (!form.bidIncrement || form.bidIncrement <= 0) {
    errors.value.bidIncrement = 'Valid bid increment is required'
    isValid = false
  }

  if (!form.paymentTerms) {
    errors.value.paymentTerms = 'Payment terms are required'
    isValid = false
  }

  if (form.deliveryOptions.length === 0) {
    errors.value.deliveryOptions = 'At least one delivery option is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async (): Promise<void> => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Emit the created event with form data
    emit('created', { ...form })

    // Reset form
    resetForm()

    // Close modal
    closeModal()
  } catch (error) {
    console.error('Error creating auction:', error)
  } finally {
    isSubmitting.value = false
  }
}

const closeModal = (): void => {
  resetForm()
  emit('close')
}

const resetForm = (): void => {
  Object.assign(form, {
    title: '',
    type: '',
    breed: '',
    weight: 0,
    quantity: 1,
    age: '',
    gender: '',
    healthStatus: [],
    startingBid: 0,
    reservePrice: undefined,
    bidIncrement: 500,
    duration: '',
    deliveryOptions: [],
    images: [],
    description: '',
    location: '',
    paymentTerms: '',
    additionalTerms: ''
  })
  
  weightUnit.value = 'kg'
  errors.value = {}
  selectedImageIndex.value = 0
  availableBreeds.value = []
}

const handleImageUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files) return

  Array.from(files).forEach(file => {
    if (form.images.length >= 5) {
      alert('Maximum 5 images allowed')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        form.images.push(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  })

  // Clear the input value to allow re-uploading the same file
  target.value = ''
}

const removeImage = (index: number): void => {
  form.images.splice(index, 1)
  if (selectedImageIndex.value >= form.images.length) {
    selectedImageIndex.value = Math.max(0, form.images.length - 1)
  }
}

const previousImage = (): void => {
  selectedImageIndex.value = selectedImageIndex.value > 0
    ? selectedImageIndex.value - 1
    : form.images.length - 1
}

const nextImage = (): void => {
  selectedImageIndex.value = selectedImageIndex.value < form.images.length - 1
    ? selectedImageIndex.value + 1
    : 0
}

// Initialize user's default location when component mounts
onMounted(() => {
  const defaultAddress = userAddresses.value.find(addr => addr.isDefault)
  if (defaultAddress) {
    form.location = defaultAddress.location
  }
})
</script>