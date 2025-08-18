<!-- Messages.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-4 relative overflow-hidden">
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
      <!-- Sidebar with filters - Wider and collapsible -->
      <div :class="filtersCollapsed ? 'w-20' : 'w-64'"
        class="border-r border-gray-200/50 bg-white/95 backdrop-blur-sm flex flex-col transition-all duration-300 overflow-visible">
        <!-- Filters Section -->
        <div class="p-4 border-b border-gray-200/50 bg-gradient-to-b from-green-600/5 to-emerald-600/5">
          <!-- Toggle Button -->
          <div class="flex items-center justify-center mb-4">
            <button @click="toggleFiltersCollapsed"
              class="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
              <svg v-if="filtersCollapsed" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Vertical Filter Buttons -->
          <div class="space-y-4">
            <div v-for="filter in filters" :key="filter.key" class="relative group">
              <button @click="toggleFilter(filter.key)"
                class="flex items-center justify-center w-full p-3 text-xs font-semibold rounded-xl transition-all duration-300 border-2 hover:scale-105 transform"
                :class="[
                  activeFilters.includes(filter.key)
                    ? 'bg-gradient-to-b from-green-500 to-emerald-600 text-white border-transparent shadow-lg shadow-green-500/25'
                    : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                  filtersCollapsed ? 'flex-col' : 'px-4'
                ]">
                <!-- Filter Icon -->
                <div class="p-1.5 rounded-lg transition-all duration-300" :class="activeFilters.includes(filter.key)
                  ? 'bg-white/20'
                  : 'bg-gray-100 group-hover:bg-gray-200'">
                  <svg class="w-4 h-4 transition-colors duration-300" :fill="filter.icon.fill"
                    :stroke="filter.icon.stroke" viewBox="0 0 24 24">
                    <path v-bind="filter.icon.pathProps" :d="filter.icon.path"></path>
                  </svg>
                </div>

                <!-- Label - Hidden when collapsed -->
                <span v-if="!filtersCollapsed" class="ml-2 text-center">
                  {{ filter.label }}
                </span>

                <!-- Active indicator -->
                <div v-if="activeFilters.includes(filter.key)"
                  class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-sm animate-pulse">
                </div>

                <!-- Count badge -->
                <div v-if="getFilterCount(filter.key) > 0"
                  class="absolute -top-1 -left-1 bg-gray-800 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center"
                  :class="activeFilters.includes(filter.key) ? 'bg-white text-green-600' : 'bg-gray-800 text-white'">
                  {{ getFilterCount(filter.key) }}
                </div>
              </button>

              <!-- Tooltip for collapsed state -->
              <div v-if="filtersCollapsed" class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                {{ filter.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Reset Button - Always visible -->
        <div v-if="activeFilters.length > 0" class="mt-auto p-3 border-t border-green-200 bg-green-50">
          <div class="relative group">
            <button @click="activeFilters = []"
              class="w-full flex items-center justify-center gap-2 p-2 text-xs font-semibold text-green-700 rounded-lg bg-green-100 hover:bg-green-200 transition-colors duration-200"
              :class="filtersCollapsed ? 'flex-col' : ''">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span v-if="!filtersCollapsed">Reset Filters</span>
            </button>
            
            <!-- Tooltip for reset button -->
            <div v-if="filtersCollapsed" class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              Reset Filters
            </div>
          </div>

          <div class="mt-2 text-center">
            <span class="text-xs text-green-600 font-semibold">
              {{ filteredConversations.length }} {{ filteredConversations.length === 1 ? 'conversation' :
                'conversations' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Conversations List -->
      <div class="w-80 border-r border-gray-200/50 bg-white/95 backdrop-blur-sm flex flex-col">
        <!-- Sidebar Header -->
        <div class="p-5 border-b border-gray-200/50 bg-gradient-to-r from-green-50 to-emerald-50">
          <!-- Top Row -->
          <div class="flex items-center justify-between mb-5">
            <!-- Back Button -->
            <button @click="goBack"
              class="group p-2.5 text-gray-600 hover:text-white bg-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 border border-gray-200 hover:border-transparent">
              <svg class="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-300" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>

            <!-- Center Section: Icon + Title -->
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
                  {{ filteredConversations.length }} conversations
                </p>
              </div>
            </div>

            <!-- Spacer for symmetry -->
            <div class="w-10"></div>
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

            <!-- Clear Search Button -->
            <button v-if="searchTerm" @click="searchTerm = ''"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Conversations List -->
        <div class="flex-1 overflow-y-auto">
          <div v-for="conversation in filteredConversations" :key="conversation.id"
            @click="selectConversation(conversation)"
            class="p-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 cursor-pointer transition-all duration-300 group"
            :class="{
              'bg-gradient-to-r from-green-100 to-emerald-100 border-green-200': selectedConversation?.id === conversation.id,
              'bg-white': selectedConversation?.id !== conversation.id
            }">
            <div class="flex items-center">
              <div class="relative">
                <router-link :to="`/userProfile/${getOtherUser(conversation).id}`" @click.stop class="block">
                  <img :src="getOtherUser(conversation).avatar || 'https://via.placeholder.com/40'" alt="Profile"
                    class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                </router-link>
                <!-- Online Status -->
                <div v-if="conversation.isOnline"
                  class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                <div v-else class="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-300 border-2 border-white rounded-full">
                </div>

                <!-- Unread Badge -->
                <span v-if="conversation.unreadCount > 0"
                  class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                  {{ conversation.unreadCount }}
                </span>
              </div>

              <div class="ml-4 flex-1 min-w-0">
                <div class="flex justify-between items-start mb-1">
                  <router-link :to="`/userProfile/${getOtherUser(conversation).id}`" @click.stop
                    class="font-semibold text-gray-800 truncate group-hover:text-green-700 transition-colors duration-200">
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
                      :class="getOtherUser(conversation).role === 'farmer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
                      {{ getOtherUser(conversation).role === 'farmer' ? 'Farmer' : 'Buyer' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredConversations.length === 0" class="p-8 text-center">
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

      <!-- Main Chat Area -->
      <div class="flex-1 flex flex-col bg-gradient-to-br from-gray-50/50 to-white/50">
        <!-- Chat Header -->
        <div v-if="selectedConversation" class="p-6 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <router-link :to="`/userProfile/${getOtherUser(selectedConversation).id}`" class="flex items-center group">
              <div class="relative">
                <img :src="getOtherUser(selectedConversation).avatar || 'https://via.placeholder.com/40'" alt="Profile"
                  class="w-12 h-12 rounded-full object-cover border-2 border-green-200 shadow-sm" />
                <div v-if="selectedConversation.isOnline"
                  class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-800 text-lg group-hover:text-green-700 transition-colors duration-200">
                  {{ getOtherUser(selectedConversation).name }}
                </h3>
                <p class="text-sm text-gray-600 flex items-center">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mr-2"
                    :class="getOtherUser(selectedConversation).role === 'farmer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
                    {{ getOtherUser(selectedConversation).role === 'farmer' ? 'Farmer' : 'Buyer' }}
                  </span>
                  {{ selectedConversation.isOnline ? 'Online now' : 'Last seen recently' }}
                </p>
              </div>
            </router-link>

            <div class="flex items-center space-x-3">
              <button v-if="selectedConversation.listing" @click="viewListing(selectedConversation.listing)"
                class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-sm flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                View Listing
              </button>
              <button
                class="p-2 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Listing Details Card -->
        <div v-if="selectedConversation?.listing"
          class="mx-6 mt-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 shadow-sm">
          <div class="flex items-center">
            <img :src="selectedConversation.listing.images[0] || 'https://via.placeholder.com/80'" alt="Listing"
              class="w-16 h-16 rounded-lg object-cover border border-gray-200" />
            <div class="ml-4 flex-1">
              <h4 class="font-semibold text-gray-800 mb-1">
                {{ selectedConversation.listing.name }}
              </h4>
              <p class="text-sm text-gray-600 mb-2 line-clamp-2">
                {{ selectedConversation.listing.description }}
              </p>
              <div class="flex items-center justify-between">
                <p class="text-lg font-bold text-green-600">
                  ${{ selectedConversation.listing.price.toFixed(2) }}
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
            <!-- Loading State -->
            <div v-if="loadingMessages" class="flex justify-center py-8">
              <div class="flex items-center space-x-2">
                <div class="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
                <span class="text-gray-600">Loading messages...</span>
              </div>
            </div>

            <!-- Message Bubbles -->
            <div v-for="message in messages" :key="message.id" class="flex" :class="{
              'justify-end': message.senderId === currentUser.id,
              'justify-start': message.senderId !== currentUser.id,
            }">
              <div class="flex items-end space-x-2 max-w-xs lg:max-w-md" :class="{
                'flex-row-reverse space-x-reverse': message.senderId === currentUser.id,
              }">
                <!-- Avatar for other users -->
                <router-link v-if="message.senderId !== currentUser.id"
                  :to="`/userProfile/${getOtherUser(selectedConversation).id}`" class="block">
                  <img :src="getOtherUser(selectedConversation).avatar"
                    class="w-8 h-8 rounded-full object-cover border border-gray-200" alt="Avatar" />
                </router-link>

                <!-- Message Bubble -->
                <div class="rounded-2xl px-4 py-3 shadow-sm relative group" :class="{
                  'bg-gradient-to-r from-green-500 to-emerald-600 text-white': message.senderId === currentUser.id,
                  'bg-white border border-gray-200 text-gray-800': message.senderId !== currentUser.id,
                }">
                  <p class="text-sm leading-relaxed">{{ message.content }}</p>
                  <p class="text-xs mt-2 opacity-70" :class="{
                    'text-green-100': message.senderId === currentUser.id,
                    'text-gray-500': message.senderId !== currentUser.id,
                  }">
                    {{ formatTime(message.createdAt) }}
                  </p>

                  <!-- Message Status -->
                  <div v-if="message.senderId === currentUser.id"
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
          </div>
        </div>

        <!-- Message Input -->
        <div v-if="selectedConversation" class="p-6 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
          <div class="flex items-end space-x-3">
            <button
              class="p-3 text-gray-500 hover:text-green-600 rounded-xl hover:bg-green-50 transition-all duration-200">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
                </path>
              </svg>
            </button>

            <div class="flex-1 relative">
              <textarea v-model="newMessage" @keydown.enter.exact.prevent="sendMessage"
                @keydown.enter.shift="newMessage += '\n'"
                placeholder="Type your message... (Shift+Enter for new line)" rows="1"
                class="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white/90 hover:border-gray-300 resize-none"
                style="min-height: 48px; max-height: 120px;"></textarea>
            </div>

            <button @click="sendMessage" :disabled="!newMessage.trim()"
              class="p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
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
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';

interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'farmer' | 'buyer';
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
}

interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
}

interface Conversation {
  id: string;
  users: User[];
  lastMessage?: Message;
  unreadCount: number;
  isOnline: boolean;
  listing?: Listing;
}

interface Filter {
  key: string;
  label: string;
  icon: {
    fill?: string;
    stroke?: string;
    path: string;
    pathProps?: Record<string, any>;
  };
}

const router = useRouter();

const currentUser = ref<User>({
  id: 'user1',
  name: 'Juan Dela Cruz',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  role: 'buyer'
});

const conversations = ref<Conversation[]>([
  {
    id: 'conv1',
    users: [
      currentUser.value,
      {
        id: 'user2',
        name: 'Maria Santos',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'farmer'
      }
    ],
    lastMessage: {
      id: 'msg1',
      content: 'Kumusta po! Interested po kayo sa aking mga baboy?',
      senderId: 'user2',
      createdAt: new Date(Date.now() - 1000 * 60 * 5)
    },
    unreadCount: 2,
    isOnline: true,
    listing: {
      id: 'list1',
      name: 'Native Pigs (Baboy)',
      description: 'Healthy native pigs ready for sale, 6 months old',
      price: 8000,
      quantity: 10,
      images: ['https://images.unsplash.com/photo-1589927986089-35812388d1f4']
    }
  },
  {
    id: 'conv2',
    users: [
      currentUser.value,
      {
        id: 'user3',
        name: 'Pedro Reyes',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        role: 'farmer'
      }
    ],
    lastMessage: {
      id: 'msg2',
      content: 'Kailan po pwede makita ang mga manok?',
      senderId: currentUser.value.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    unreadCount: 0,
    isOnline: false,
    listing: {
      id: 'list2',
      name: 'Free-range Chickens (Manok)',
      description: 'Organic free-range chickens, 1.5kg average weight',
      price: 250,
      quantity: 50,
      images: ['https://images.unsplash.com/photo-1594282418429-8095c5a2001a']
    }
  },
  {
    id: 'conv3',
    users: [
      currentUser.value,
      {
        id: 'user4',
        name: 'Lorna Diaz',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        role: 'buyer'
      }
    ],
    lastMessage: {
      id: 'msg3',
      content: 'Salamat sa mga itik! Maganda ang kalidad!',
      senderId: 'user4',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    unreadCount: 1,
    isOnline: true,
    listing: {
      id: 'list3',
      name: 'Ducks (Itik)',
      description: 'Healthy ducks for egg production or meat',
      price: 300,
      quantity: 30,
      images: ['https://images.unsplash.com/photo-1559561723-608b3695d65f']
    }
  },
  {
    id: 'conv4',
    users: [
      currentUser.value,
      {
        id: 'user5',
        name: 'Carlos Mendoza',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        role: 'farmer'
      }
    ],
    lastMessage: {
      id: 'msg4',
      content: 'Available pa po ang mga kambing?',
      senderId: currentUser.value.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
    },
    unreadCount: 0,
    isOnline: false,
    listing: {
      id: 'list4',
      name: 'Goats (Kambing)',
      description: 'Native goats for breeding or meat, 1 year old',
      price: 12000,
      quantity: 5,
      images: ['https://images.unsplash.com/photo-1551369879-7c0b9055b69e']
    }
  }
]);

const messages = ref<Message[]>([]);
const selectedConversation = ref<Conversation | null>(null);
const newMessage = ref('');
const searchTerm = ref('');
const activeFilters = ref<string[]>([]);
const loadingMessages = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);
const isNearTop = ref(false);
// Set filtersCollapsed to true by default
const filtersCollapsed = ref(true);

const filters = ref<Filter[]>([
  {
    key: 'unread',
    label: 'Unread',
    icon: {
      stroke: 'currentColor',
      path: 'M20 12H4',
      pathProps: { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }
    }
  },
  {
    key: 'farmers',
    label: 'Farmers',
    icon: {
      stroke: 'currentColor',
      path: 'M5 13l4 4L19 7',
      pathProps: { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }
    }
  },
  {
    key: 'buyers',
    label: 'Buyers',
    icon: {
      stroke: 'currentColor',
      path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      pathProps: { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }
    }
  },
  {
    key: 'active',
    label: 'Active',
    icon: {
      fill: 'none',
      stroke: 'currentColor',
      path: 'M13 10V3L4 14h7v7l9-11h-7z',
      pathProps: { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }
    }
  }
]);

const toggleFiltersCollapsed = () => {
  filtersCollapsed.value = !filtersCollapsed.value;
};

const getOtherUser = (conversation: Conversation): User => {
  return conversation.users.find(user => user.id !== currentUser.value.id) as User;
};

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
          case 'farmers': return otherUser.role === 'farmer';
          case 'buyers': return otherUser.role === 'buyer';
          case 'active': return conv.isOnline;
          default: return true;
        }
      });

    return matchesSearch && matchesFilters;
  });
});

const getFilterCount = (filterKey: string): number => {
  return conversations.value.filter(conv => {
    const otherUser = getOtherUser(conv);
    switch (filterKey) {
      case 'unread': return conv.unreadCount > 0;
      case 'farmers': return otherUser.role === 'farmer';
      case 'buyers': return otherUser.role === 'buyer';
      case 'active': return conv.isOnline;
      default: return false;
    }
  }).length;
};

const toggleFilter = (filterKey: string) => {
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

  if (diffMins < 1) return 'Ngayon lang';
  if (diffMins < 60) return `${diffMins} minuto ang nakalipas`;
  if (diffHours < 24) return `${diffHours} oras ang nakalipas`;
  if (diffDays === 1) return 'Kahapon';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const selectConversation = (conversation: Conversation) => {
  selectedConversation.value = conversation;
  conversation.unreadCount = 0;

  loadingMessages.value = true;
  setTimeout(() => {
    const otherUser = getOtherUser(conversation);
    messages.value = [
      {
        id: 'msg1',
        content: 'Kumusta po! Interested po kayo sa aking mga baboy? Available po sila ngayon.',
        senderId: otherUser.id,
        createdAt: new Date(Date.now() - 1000 * 60 * 15)
      },
      {
        id: 'msg2',
        content: 'Opo, ilan po ang available at magkano ang presyo?',
        senderId: currentUser.value.id,
        createdAt: new Date(Date.now() - 1000 * 60 * 12)
      },
      {
        id: 'msg3',
        content: 'Mayroon po akong 10 native pigs, ₱8,000 bawat isa. Pwede nyo po silang makita sa aking farm sa Bulacan.',
        senderId: otherUser.id,
        createdAt: new Date(Date.now() - 1000 * 60 * 5)
      }
    ];
    loadingMessages.value = false;
    nextTick(scrollToBottom);
  }, 500);
};

const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedConversation.value) return;

  const message: Message = {
    id: `msg${Date.now()}`,
    content: newMessage.value.trim(),
    senderId: currentUser.value.id,
    createdAt: new Date()
  };

  messages.value.push(message);

  const conv = conversations.value.find(c => c.id === selectedConversation.value?.id);
  if (conv) conv.lastMessage = message;

  newMessage.value = '';
  nextTick(scrollToBottom);
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const viewListing = (listing: Listing) => {
  alert(`Tingnan ang listing: ${listing.name}\nPresyo: ₱${listing.price.toLocaleString('en-PH')}\nDami: ${listing.quantity}`);
};

const goBack = () => {
  router.back();
};

const handleScroll = () => {
  if (!messagesContainer.value) return;

  const { scrollTop } = messagesContainer.value;
  isNearTop.value = scrollTop < 100;

  if (isNearTop.value && !loadingMessages.value) {
    loadMoreMessages();
  }
};

const loadMoreMessages = () => {
  if (!selectedConversation.value || loadingMessages.value) return;

  loadingMessages.value = true;
  setTimeout(() => {
    const olderMessages: Message[] = [
      {
        id: `old${Date.now()}-1`,
        content: 'Mayroon din po akong mga native chickens kung interested kayo',
        senderId: getOtherUser(selectedConversation.value!).id,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      {
        id: `old${Date.now()}-2`,
        content: 'Magkano po ang mga manok?',
        senderId: currentUser.value.id,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23)
      }
    ];

    messages.value = [...olderMessages, ...messages.value];
    loadingMessages.value = false;
  }, 800);
};

watch(messages, () => {
  if (!isNearTop.value) {
    nextTick(scrollToBottom);
  }
}, { deep: true });

onMounted(() => {
  if (conversations.value.length > 0) {
    selectConversation(conversations.value[0]);
  }
});
</script>