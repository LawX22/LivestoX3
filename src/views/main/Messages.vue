<!-- Messages.vue - WITH SKELETON LOADING & FIXED LAYOUT -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-4 relative">
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
      <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-300 rounded-full opacity-40 animate-pulse"></div>
      <div class="absolute bottom-24 left-24 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
      <div class="absolute top-1/2 right-8 w-10 h-10 bg-green-400 rounded-full opacity-35 animate-bounce"
        style="animation-delay: 1s"></div>
    </div>

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#059669" stroke-width="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Main Container -->
    <div
      class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden max-w-7xl mx-auto border border-white/30 h-[calc(100vh-2rem)] flex">
      
      <!-- Sidebar with filters -->
      <div class="w-20 border-r border-gray-200/50 bg-white/95 backdrop-blur-sm flex flex-col transition-all duration-300 relative z-50">
        <!-- Back Button at Top -->
        <div class="p-4 border-b border-gray-200/50 bg-gradient-to-b from-green-600/5 to-emerald-600/5">
          <div class="relative group">
            <button @click="goBack"
              class="w-full p-3 text-gray-600 hover:text-white bg-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 border border-gray-200 hover:border-transparent cursor-pointer flex items-center justify-center">
              <svg class="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-300" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            
            <div class="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100000]">
              <div class="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px]">
                <div class="w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
              Go Back
            </div>
          </div>
        </div>

        <!-- Filters Section -->
        <div class="p-4 border-b border-gray-200/50 bg-gradient-to-b from-green-600/5 to-emerald-600/5">
          <div class="space-y-4">
            <div v-for="filter in filters" :key="filter.key" class="relative group">
              <button @click="toggleFilter(filter.key)"
                class="flex items-center justify-center w-full p-3 text-xs font-semibold rounded-xl transition-all duration-300 border-2 hover:scale-105 transform flex-col cursor-pointer relative z-50"
                :class="[
                  activeFilters.includes(filter.key)
                    ? 'bg-gradient-to-b from-green-500 to-emerald-600 text-white border-transparent shadow-lg shadow-green-500/25'
                    : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                ]">
                <div class="p-1.5 rounded-lg transition-all duration-300" :class="activeFilters.includes(filter.key)
                  ? 'bg-white/20'
                  : 'bg-gray-100 group-hover:bg-gray-200'">
                  <svg class="w-4 h-4 transition-colors duration-300" :fill="filter.icon.fill"
                    :stroke="filter.icon.stroke" viewBox="0 0 24 24">
                    <path v-bind="filter.icon.pathProps" :d="filter.icon.path"></path>
                  </svg>
                </div>

                <div v-if="activeFilters.includes(filter.key)"
                  class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-sm animate-pulse">
                </div>

                <div v-if="getFilterCount(filter.key) > 0"
                  class="absolute -top-1 -left-1 bg-gray-800 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center"
                  :class="activeFilters.includes(filter.key) ? 'bg-white text-green-600' : 'bg-gray-800 text-white'">
                  {{ getFilterCount(filter.key) }}
                </div>
              </button>

              <div class="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100000] w-48">
                <div class="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px]">
                  <div class="w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
                <div class="font-bold mb-1">{{ filter.label }}</div>
                <div class="text-gray-300 text-[10px] leading-relaxed">{{ filter.description }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reset Button -->
        <div v-if="activeFilters.length > 0" class="mt-auto p-3 border-t border-green-200 bg-green-50">
          <div class="relative group">
            <button @click="activeFilters = []"
              class="w-full flex items-center justify-center gap-2 p-2 text-xs font-semibold text-green-700 rounded-lg bg-green-100 hover:bg-green-200 transition-colors duration-200 flex-col cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            
            <div class="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100000]">
              <div class="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px]">
                <div class="w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
              Reset All Filters
            </div>
          </div>

          <div class="mt-2 text-center">
            <span class="text-xs text-green-600 font-semibold">
              {{ filteredConversations.length }}
            </span>
          </div>
        </div>
      </div>

      <!-- Conversations List -->
      <div class="w-80 border-r border-gray-200/50 bg-white/95 backdrop-blur-sm flex flex-col relative z-10">
        <!-- Sidebar Header -->
        <div class="p-5 border-b border-gray-200/50 bg-gradient-to-r from-green-50 to-emerald-50">
          <div class="flex items-center mb-5">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-700">
                  Conversations
                </h2>
                <p class="text-xs text-gray-500">
                  {{ loadingConversations ? '...' : filteredConversations.length }} conversations
                </p>
              </div>
            </div>
          </div>
          
          <!-- Search Input -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input v-model="searchTerm" type="text" placeholder="Search conversations..."
              class="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white hover:border-gray-400 placeholder-gray-500" />

            <button v-if="searchTerm" @click="searchTerm = ''"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Conversations List -->
        <div class="flex-1 overflow-y-auto">
          <!-- Skeleton Loading State -->
          <div v-if="loadingConversations" class="space-y-1">
            <div v-for="i in 8" :key="i" class="p-4 border-b border-gray-100 animate-pulse">
              <div class="flex items-center">
                <div class="relative">
                  <div class="w-12 h-12 rounded-full bg-gray-300"></div>
                </div>
                <div class="ml-4 flex-1 space-y-2">
                  <div class="flex justify-between items-start">
                    <div class="h-4 bg-gray-300 rounded w-32"></div>
                    <div class="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                  <div class="h-3 bg-gray-200 rounded w-full"></div>
                  <div class="flex items-center justify-between">
                    <div class="h-3 bg-gray-200 rounded w-24"></div>
                    <div class="h-5 bg-gray-200 rounded-full w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Conversations -->
          <div v-else>
            <div v-for="conversation in filteredConversations" :key="conversation.id"
              @click="selectConversation(conversation)"
              class="p-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 cursor-pointer transition-all duration-300 group"
              :class="{
                'bg-gradient-to-r from-green-100 to-emerald-100 border-green-200': selectedConversation?.id === conversation.id,
                'bg-white': selectedConversation?.id !== conversation.id
              }">
              <div class="flex items-center">
                <div class="relative flex-shrink-0">
                  <router-link :to="`/userProfile/${getOtherUser(conversation).id}`" @click.stop class="block cursor-pointer">
                    <img :src="getOtherUser(conversation).avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + getOtherUser(conversation).id" 
                      alt="Profile" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  </router-link>
                  
                  <div v-if="conversation.isOnline"
                    class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  <div v-else class="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-300 border-2 border-white rounded-full">
                  </div>

                  <span v-if="conversation.unreadCount > 0"
                    class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                    {{ conversation.unreadCount }}
                  </span>
                </div>

                <div class="ml-4 flex-1 min-w-0">
                  <div class="flex justify-between items-start mb-1">
                    <router-link :to="`/userProfile/${getOtherUser(conversation).id}`" @click.stop
                      class="font-semibold text-gray-800 truncate group-hover:text-green-700 transition-colors duration-200 cursor-pointer">
                      {{ getOtherUser(conversation).name }}
                    </router-link>
                    <span class="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {{ formatDate(conversation.lastMessage?.createdAt) }}
                    </span>
                  </div>

                  <p class="text-sm text-gray-600 truncate mb-1 group-hover:text-gray-700">
                    {{ conversation.lastMessage?.content || 'No messages yet' }}
                  </p>

                  <div class="flex items-center justify-between">
                    <p v-if="conversation.listing" class="text-xs font-medium text-green-600 truncate">
                      RE: {{ conversation.listing.name }}
                    </p>
                    <div class="flex items-center space-x-1">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                        :class="getOtherUser(conversation).role === 'Farmer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
                        {{ getOtherUser(conversation).role }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredConversations.length === 0 && !loadingConversations" class="p-8 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                </path>
              </svg>
              <p class="text-gray-500 text-sm">No conversations found</p>
              <p class="text-gray-400 text-xs mt-1">Try adjusting your filters or search terms</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Chat Area -->
      <div class="flex-1 flex flex-col bg-gradient-to-br from-gray-50/50 to-white/50">
        <!-- Chat Header -->
        <div v-if="selectedConversation" class="p-6 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm flex-shrink-0">
          <div class="flex items-center justify-between">
            <router-link :to="`/userProfile/${getOtherUser(selectedConversation).id}`" class="flex items-center group cursor-pointer">
              <div class="relative flex-shrink-0">
                <img :src="getOtherUser(selectedConversation).avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + getOtherUser(selectedConversation).id" 
                  alt="Profile" class="w-12 h-12 rounded-full object-cover border-2 border-green-200 shadow-sm" />
                <div v-if="selectedConversation.isOnline"
                  class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-800 text-lg group-hover:text-green-700 transition-colors duration-200">
                  {{ getOtherUser(selectedConversation).name }}
                </h3>
                <p class="text-sm text-gray-600 flex items-center">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mr-2"
                    :class="getOtherUser(selectedConversation).role === 'Farmer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
                    {{ getOtherUser(selectedConversation).role }}
                  </span>
                  {{ selectedConversation.isOnline ? 'Online now' : 'Last seen recently' }}
                </p>
              </div>
            </router-link>

            <div class="flex items-center space-x-3">
              <button v-if="selectedConversation.listing" @click="viewListing(selectedConversation.listing)"
                class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-sm flex items-center cursor-pointer">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                View Listing
              </button>
            </div>
          </div>
        </div>

        <!-- Listing Details Card -->
        <div v-if="selectedConversation?.listing"
          class="mx-6 mt-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 shadow-sm flex-shrink-0">
          <div class="flex items-center">
            <img :src="selectedConversation.listing.images[0] || 'https://placehold.co/80'" alt="Listing"
              class="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
            <div class="ml-4 flex-1 min-w-0">
              <h4 class="font-semibold text-gray-800 mb-1">
                {{ selectedConversation.listing.name }}
              </h4>
              <p class="text-sm text-gray-600 mb-2 line-clamp-2">
                {{ selectedConversation.listing.description }}
              </p>
              <div class="flex items-center justify-between">
                <p class="text-lg font-bold text-green-600">
                  ₱{{ selectedConversation.listing.price.toLocaleString() }}
                </p>
                <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {{ selectedConversation.listing.quantity }} available
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Messages Area -->
        <div ref="messagesContainer" class="flex-1 p-6 overflow-y-auto" @scroll="handleScroll">
          <!-- Empty State -->
          <div v-if="!selectedConversation" class="h-full flex items-center justify-center">
            <div class="text-center">
              <div
                class="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                  </path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">
                Welcome to Messages
              </h3>
              <p class="text-gray-600 max-w-sm">
                Select a conversation from the sidebar to start chatting with farmers and buyers
              </p>
            </div>
          </div>

          <!-- Messages -->
          <div v-else class="space-y-4">
            <!-- Skeleton Loading State -->
            <div v-if="loadingMessages" class="space-y-4">
              <div v-for="i in 6" :key="i" class="flex animate-pulse" :class="i % 2 === 0 ? 'justify-end' : 'justify-start'">
                <div class="flex items-end space-x-2 max-w-xs lg:max-w-md" :class="i % 2 === 0 ? 'flex-row-reverse space-x-reverse' : ''">
                  <div class="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div class="rounded-2xl px-4 py-3 shadow-sm" :class="i % 2 === 0 ? 'bg-green-200' : 'bg-gray-200'">
                    <div class="h-4 bg-gray-300 rounded w-48 mb-2"></div>
                    <div class="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Load More Button -->
            <div v-if="hasMoreMessages && !loadingMessages" class="flex justify-center py-4">
              <button @click="loadMoreMessages"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer">
                Load older messages
              </button>
            </div>

            <!-- Message Bubbles -->
            <div v-for="message in messages" :key="message.id" class="flex" :class="{
              'justify-end': message.senderId === currentUser?.id,
              'justify-start': message.senderId !== currentUser?.id,
            }">
              <div class="flex items-end space-x-2 max-w-[85%] lg:max-w-[75%]" :class="{
                'flex-row-reverse space-x-reverse': message.senderId === currentUser?.id,
              }">
                <!-- Avatar for other users -->
                <router-link v-if="message.senderId !== currentUser?.id"
                  :to="`/userProfile/${getOtherUser(selectedConversation).id}`" 
                  class="block cursor-pointer flex-shrink-0">
                  <img :src="getOtherUser(selectedConversation).avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + getOtherUser(selectedConversation).id"
                    class="w-8 h-8 rounded-full object-cover border border-gray-200" alt="Avatar" />
                </router-link>

                <!-- Message Bubble -->
                <div class="rounded-2xl px-4 py-3 shadow-sm relative group break-words" :class="{
                  'bg-gradient-to-r from-green-500 to-emerald-600 text-white': message.senderId === currentUser?.id,
                  'bg-white border border-gray-200 text-gray-800': message.senderId !== currentUser?.id,
                }">
                  <p class="text-sm leading-relaxed whitespace-pre-wrap break-words">{{ message.content }}</p>
                  <p class="text-xs mt-2 opacity-70" :class="{
                    'text-green-100': message.senderId === currentUser?.id,
                    'text-gray-500': message.senderId !== currentUser?.id,
                  }">
                    {{ formatTime(message.createdAt) }}
                  </p>

                  <!-- Message Status -->
                  <div v-if="message.senderId === currentUser?.id"
                    class="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isTyping" class="flex justify-start">
              <div class="flex items-end space-x-2 max-w-xs">
                <img :src="getOtherUser(selectedConversation).avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + getOtherUser(selectedConversation).id"
                  class="w-8 h-8 rounded-full object-cover border border-gray-200" alt="Avatar" />
                <div class="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div v-if="selectedConversation" class="p-6 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm flex-shrink-0">
          <div class="flex items-end space-x-3">
            <div class="flex-1 relative">
              <textarea v-model="newMessage" 
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.enter.shift="newMessage += '\n'"
                @input="handleTyping"
                placeholder="Type your message... (Shift+Enter for new line)" 
                rows="1"
                class="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white/90 hover:border-gray-300 resize-none"
                style="min-height: 48px; max-height: 120px;"></textarea>
            </div>

            <button @click="sendMessage" 
              :disabled="!newMessage.trim() || sendingMessage"
              class="p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer">
              <svg v-if="!sendingMessage" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              <div v-else class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            </button>
          </div>

          <div class="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>{{ getOtherUser(selectedConversation).name }} is {{ selectedConversation.isOnline ? 'online' :
              'offline' }}</span>
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { MessagesService } from '../../services/messagesService';
import { supabase } from '@/supabase';
import type { User, Message, Listing, Conversation, Filter, FilterKey } from '../../types/messages';

const router = useRouter();

// State
const currentUser = ref<User | null>(null);
const conversations = ref<Conversation[]>([]);
const messages = ref<Message[]>([]);
const selectedConversation = ref<Conversation | null>(null);
const newMessage = ref('');
const searchTerm = ref('');
const activeFilters = ref<FilterKey[]>([]);
const loadingConversations = ref(true);
const loadingMessages = ref(false);
const sendingMessage = ref(false);
const hasMoreMessages = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);
const isNearTop = ref(false);
const isTyping = ref(false);
let typingTimeout: ReturnType<typeof setTimeout> | null = null;

// Filters
const filters = ref<Filter[]>([
  {
    key: 'unread',
    label: 'Unread',
    description: 'Show only conversations with unread messages',
    icon: {
      stroke: 'currentColor',
      path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      pathProps: { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }
    }
  },
  {
    key: 'farmers',
    label: 'Farmers',
    description: 'Show conversations with farmers only',
    icon: {
      stroke: 'currentColor',
      path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      pathProps: { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }
    }
  },
  {
    key: 'buyers',
    label: 'Buyers',
    description: 'Show conversations with buyers only',
    icon: {
      stroke: 'currentColor',
      path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      pathProps: { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }
    }
  }
]);

// Computed
const filteredConversations = computed(() => {
  return conversations.value.filter(conv => {
    const otherUser = getOtherUser(conv);
    const matchesSearch = searchTerm.value
      ? (
        otherUser.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        conv.lastMessage?.content.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        conv.listing?.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      ) : true;

    const matchesFilters = activeFilters.value.length === 0 ||
      activeFilters.value.some(filter => {
        switch (filter) {
          case 'unread': return conv.unreadCount > 0;
          case 'farmers': return otherUser.role === 'Farmer';
          case 'buyers': return otherUser.role === 'Buyer';
          default: return true;
        }
      });

    return matchesSearch && matchesFilters;
  });
});

// Methods
const getOtherUser = (conversation: Conversation): User => {
  return conversation.users.find(user => user.id !== currentUser.value?.id) || conversation.users[0];
};

const getFilterCount = (filterKey: FilterKey): number => {
  return conversations.value.filter(conv => {
    const otherUser = getOtherUser(conv);
    switch (filterKey) {
      case 'unread': return conv.unreadCount > 0;
      case 'farmers': return otherUser.role === 'Farmer';
      case 'buyers': return otherUser.role === 'Buyer';
      default: return false;
    }
  }).length;
};

const toggleFilter = (filterKey: FilterKey) => {
  if (activeFilters.value.includes(filterKey)) {
    activeFilters.value = activeFilters.value.filter(f => f !== filterKey);
  } else {
    activeFilters.value.push(filterKey);
  }
};

const formatDate = (date?: Date): string => {
  if (!date) return '';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const selectConversation = async (conversation: Conversation) => {
  // Unsubscribe from previous conversation
  if (selectedConversation.value) {
    await MessagesService.unsubscribeFromMessages(selectedConversation.value.id);
  }

  selectedConversation.value = conversation;
  messages.value = [];
  hasMoreMessages.value = false;

  // Load messages
  await loadMessages();

  // Mark as read
  if (currentUser.value) {
    await MessagesService.markAsRead(conversation.id, currentUser.value.id);
    conversation.unreadCount = 0;
  }

  // Subscribe to new messages
  MessagesService.subscribeToMessages(conversation.id, (message: Message) => {
    console.log('📨 New message received in conversation:', message);
    
    // Only add if not already in list
    if (!messages.value.find(m => m.id === message.id)) {
      messages.value.push(message);
      nextTick(scrollToBottom);
      
      // Mark as read if conversation is selected
      if (currentUser.value && selectedConversation.value?.id === message.conversationId) {
        MessagesService.markAsRead(conversation.id, currentUser.value.id);
      }
    }

    // Update conversation last message
    const conv = conversations.value.find(c => c.id === message.conversationId);
    if (conv) {
      conv.lastMessage = message;
      conv.updatedAt = message.createdAt;
      
      // Increment unread if not the current conversation or if sender is not current user
      if (message.senderId !== currentUser.value?.id && selectedConversation.value?.id !== conversation.id) {
        conv.unreadCount++;
      }
      
      // Re-sort conversations
      conversations.value.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }
  });
};

const loadMessages = async () => {
  if (!selectedConversation.value) return;

  loadingMessages.value = true;
  const result = await MessagesService.getMessages({
    conversationId: selectedConversation.value.id,
    limit: 50
  });

  if (result.success && result.data) {
    messages.value = result.data.messages;
    hasMoreMessages.value = result.data.hasMore;
  } else {
    console.error('Failed to load messages:', result.error);
  }

  loadingMessages.value = false;
  nextTick(scrollToBottom);
};

const loadMoreMessages = async () => {
  if (!selectedConversation.value || !hasMoreMessages.value || loadingMessages.value) return;

  loadingMessages.value = true;
  const oldestMessage = messages.value[0];
  
  const result = await MessagesService.getMessages({
    conversationId: selectedConversation.value.id,
    limit: 50,
    before: oldestMessage?.createdAt
  });

  if (result.success && result.data) {
    // Prepend older messages
    messages.value = [...result.data.messages, ...messages.value];
    hasMoreMessages.value = result.data.hasMore;
  }

  loadingMessages.value = false;
};

const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedConversation.value || !currentUser.value) return;

  const messageContent = newMessage.value.trim();
  newMessage.value = '';
  sendingMessage.value = true;

  const result = await MessagesService.sendMessage({
    conversationId: selectedConversation.value.id,
    content: messageContent
  });

  sendingMessage.value = false;

  if (result.success && result.data) {
    // Message will be added via realtime subscription
    // But add it immediately for better UX
    if (!messages.value.find(m => m.id === result.data!.id)) {
      messages.value.push(result.data);
      nextTick(scrollToBottom);
    }

    // Update conversation
    const conv = conversations.value.find(c => c.id === selectedConversation.value?.id);
    if (conv) {
      conv.lastMessage = result.data;
      conv.updatedAt = result.data.createdAt;
      // Re-sort conversations
      conversations.value.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }
  } else {
    console.error('Failed to send message:', result.error);
    alert('Failed to send message. Please try again.');
    newMessage.value = messageContent; // Restore message
  }
};

const handleTyping = () => {
  // Implement typing indicator logic here if needed
  // This could emit events to show "User is typing..." to other participants
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const handleScroll = () => {
  if (!messagesContainer.value) return;

  const { scrollTop } = messagesContainer.value;
  isNearTop.value = scrollTop < 100;
};

const viewListing = (listing: Listing) => {
  router.push(`/listings/${listing.id}`);
};

const goBack = () => {
  router.back();
};

const loadConversations = async () => {
  if (!currentUser.value) return;

  loadingConversations.value = true;
  const result = await MessagesService.getConversations(currentUser.value.id);
  
  if (result.success && result.data) {
    conversations.value = result.data;
  } else {
    console.error('Failed to load conversations:', result.error);
  }
  
  loadingConversations.value = false;

  // Auto-select first conversation if exists
  if (conversations.value.length > 0 && !selectedConversation.value) {
    await selectConversation(conversations.value[0]);
  }
};

// Lifecycle
onMounted(async () => {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    router.push('/login');
    return;
  }

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile) {
    currentUser.value = {
      id: profile.id,
      name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username || 'User',
      firstName: profile.first_name,
      lastName: profile.last_name,
      username: profile.username,
      email: user.email,
      avatar: profile.profile_picture,
      role: profile.role,
      isOnline: true
    };

    // Load conversations
    await loadConversations();

    // Subscribe to conversation updates
    MessagesService.subscribeToConversations(
      user.id,
      (conversationId: string, message: Message) => {
        console.log('📬 New message in conversation:', conversationId);
        // Update is handled by individual conversation subscription
      },
      async (conversationId: string) => {
        console.log('🔄 Conversation updated:', conversationId);
        // Reload this specific conversation
        const conv = conversations.value.find(c => c.id === conversationId);
        if (conv && currentUser.value) {
          const result = await MessagesService.getConversation(conversationId, currentUser.value.id);
          if (result.success && result.data) {
            Object.assign(conv, result.data);
          }
        }
      }
    );
  }
});

onUnmounted(async () => {
  // Cleanup all subscriptions
  await MessagesService.cleanup();
});

// Watch for scroll to load more messages
watch(isNearTop, (isNear) => {
  if (isNear && hasMoreMessages.value && !loadingMessages.value) {
    loadMoreMessages();
  }
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #059669;
}

/* Animation for typing indicator */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Ensure text wrapping in message bubbles */
.break-words {
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* Handle long URLs and text in messages */
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
</style>