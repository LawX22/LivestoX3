<!-- NavBar.vue -->
<template>
  <!-- Background Pattern Overlay for the navbar area -->
  <div class="fixed top-0 left-0 right-0 z-40 h-20 opacity-5 pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="navbar-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#059669" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#navbar-grid)" />
    </svg>
  </div>

  <!-- Floating Background Elements -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-30">
    <div class="absolute top-4 left-20 w-3 h-3 bg-green-300 rounded-full opacity-20 animate-bounce"></div>
    <div class="absolute top-8 right-32 w-2 h-2 bg-emerald-300 rounded-full opacity-30 animate-pulse"></div>
    <div class="absolute top-12 left-1/3 w-4 h-4 bg-teal-300 rounded-full opacity-15 animate-ping"></div>
    <div class="absolute top-6 right-20 w-2 h-2 bg-green-400 rounded-full opacity-25 animate-bounce"></div>
  </div>

  <nav
    class="w-full flex items-center justify-between px-6 py-3 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
    <!-- Left: Logo and Brand Name -->
    <div class="flex items-center gap-3 group">
      <div class="relative">
        <div
          class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ring-2 ring-green-100">
          <img src="/src/assets/Logo.png" alt="Logo" class="w-10 h-10 filter brightness-0 invert" />
        </div>
        <div class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse opacity-60"></div>
      </div>
      <div>
        <span class="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          LivestoX
        </span>
        <div class="w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-0.5"></div>
      </div>
    </div>

    <!-- CENTER NAVIGATION -->
    <ul class="hidden md:flex gap-6 text-sm font-medium items-center">
      <!-- Show Home and About Us only for guests -->
      <template v-if="!isLoggedIn">
        <li>
          <router-link to="/"
            class="relative text-gray-600 hover:text-green-600 transition-colors duration-200 flex flex-col items-center group"
            active-class="text-green-600 [&_.underline]:scale-x-100">
            <div class="flex items-center gap-1.5 px-1 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2.3">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </div>
            <span
              class="underline absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/aboutUs"
            class="relative text-gray-600 hover:text-green-600 transition-colors duration-200 flex flex-col items-center group"
            active-class="text-green-600 [&_.underline]:scale-x-100">
            <div class="flex items-center gap-1.5 px-1 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2.3">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>About Us</span>
            </div>
            <span
              class="underline absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </router-link>
        </li>
      </template>

      <!-- Common links for all users -->
      <li>
        <router-link to="/marketplace"
          class="relative text-gray-600 hover:text-green-600 transition-colors duration-200 flex flex-col items-center group"
          active-class="text-green-600 [&_.underline]:scale-x-100">
          <div class="flex items-center gap-1.5 px-1 py-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2.3">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Market</span>
          </div>
          <span
            class="underline absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </router-link>
      </li>
      <li>
        <router-link to="/forum"
          class="relative text-gray-600 hover:text-green-600 transition-colors duration-200 flex flex-col items-center group"
          active-class="text-green-600 [&_.underline]:scale-x-100">
          <div class="flex items-center gap-1.5 px-1 py-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2.3">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Forum</span>
          </div>
          <span
            class="underline absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </router-link>
      </li>

      <!-- Role-based links - Show when logged in (uses cached or live data) -->
      <template v-if="isLoggedIn && currentUser">
        <!-- Show Transactions only for farmers -->
        <li v-if="currentUser.role === 'farmer'">
          <router-link to="/transactions"
            class="relative text-gray-600 hover:text-green-600 transition-colors duration-200 flex flex-col items-center group"
            active-class="text-green-600 [&_.underline]:scale-x-100">
            <div class="flex items-center gap-1.5 px-1 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2.3">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Transactions</span>
            </div>
            <span
              class="underline absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </router-link>
        </li>

        <!-- Show My Purchases only for buyers -->
        <li v-if="currentUser.role === 'buyer'">
          <router-link to="/transactions"
            class="relative text-gray-600 hover:text-green-600 transition-colors duration-200 flex flex-col items-center group"
            active-class="text-green-600 [&_.underline]:scale-x-100">
            <div class="flex items-center gap-1.5 px-1 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2.3">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>My Purchases</span>
            </div>
            <span
              class="underline absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </router-link>
        </li>

        <!-- Dashboard - always shown for authenticated users -->
        <li>
          <router-link to="/dashboard"
            class="relative text-gray-600 hover:text-green-600 transition-colors duration-200 flex flex-col items-center group"
            active-class="text-green-600 [&_.underline]:scale-x-100">
            <div class="flex items-center gap-1.5 px-1 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2.3">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard</span>
            </div>
            <span
              class="underline absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </router-link>
        </li>
      </template>
    </ul>

    <!-- Right: Auth or User Info -->
    <div class="flex items-center gap-3 relative" ref="dropdownRef">
      <!-- Cart, Notification and Message Icons (only shown when logged in) -->
      <template v-if="isLoggedIn && currentUser">
        <!-- Cart Button with Enhanced Indicator -->
        <div class="relative">
          <router-link to="/carts"
            class="relative p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group border border-transparent hover:border-green-200 flex items-center justify-center cursor-pointer">
            <div class="w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5m0 0l-.5-3H2m8 14a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              
              <!-- Enhanced Cart Indicator - NOW DYNAMIC -->
              <span v-if="cartCount > 0"
                class="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-br from-red-500 via-pink-500 to-rose-600 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                <span class="relative z-10">{{ cartCount > 99 ? '99+' : cartCount }}</span>
                <!-- Pulsing glow effect -->
                <span class="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
              </span>
            </div>
          </router-link>
        </div>
        
        <!-- Notification Dropdown with Enhanced Indicator -->
        <div class="relative" ref="notificationRef">
          <button @click="toggleNotificationDropdown"
            class="relative p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group border border-transparent hover:border-green-200 cursor-pointer">
            <div class="w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              
              <!-- Enhanced Notification Indicator with Dot Style -->
              <span v-if="unreadNotifications > 0"
                class="absolute -top-0.5 -right-0.5 flex items-center justify-center">
                <!-- Main badge -->
                <span class="relative min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-10">
                  <span class="relative z-10">{{ unreadNotifications > 99 ? '99+' : unreadNotifications }}</span>
                </span>
                <!-- Ripple effect -->
                <span class="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-60"></span>
                <span class="absolute inset-0 rounded-full bg-orange-300 animate-pulse opacity-40"></span>
              </span>
            </div>
          </button>

          <!-- Notification Dropdown Content -->
          <div v-show="showNotificationDropdown"
            class="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden transform transition-all duration-300 ease-out">
            <div class="bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-4">
              <h3 class="text-base font-bold text-white flex items-center">
                <div class="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
                Notifications
                <span v-if="unreadNotifications > 0" class="ml-auto bg-white/20 text-xs px-2 py-1 rounded-full">
                  {{ unreadNotifications }} new
                </span>
              </h3>
            </div>

            <div class="max-h-80 overflow-y-auto">
              <!-- Empty State -->
              <div class="px-6 py-8 text-center">
                <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <p class="text-sm text-gray-500">No notifications yet</p>
              </div>
            </div>

            <div class="bg-gray-50">
              <router-link to="/notifications"
                class="block px-6 py-3 text-sm text-center font-medium text-orange-600 hover:text-orange-700 transition-all duration-300 border-t border-gray-200"
                @click="closeNotificationDropdown">
                See all notifications →
              </router-link>
            </div>
          </div>
        </div>

        <!-- Messages Dropdown with Enhanced Indicator -->
        <div class="relative" ref="messageRef">
          <button @click="toggleMessageDropdown"
            class="relative p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group border border-transparent hover:border-green-200 cursor-pointer">
            <div class="w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              
              <!-- Enhanced Message Indicator with Different Style -->
              <span v-if="unreadMessages > 0"
                class="absolute -top-0.5 -right-0.5 flex items-center justify-center">
                <!-- Main badge -->
                <span class="relative min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-10">
                  <span class="relative z-10">{{ unreadMessages > 99 ? '99+' : unreadMessages }}</span>
                  <!-- Sparkle effect -->
                  <span class="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-50"></span>
                </span>
                <!-- Wave effect -->
                <span class="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60"></span>
                <span class="absolute inset-0 rounded-full bg-cyan-300 animate-pulse opacity-40"></span>
              </span>
            </div>
          </button>

          <!-- Messages Dropdown Content -->
          <div v-show="showMessageDropdown"
            class="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden transform transition-all duration-300 ease-out">
            <div class="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
              <h3 class="text-base font-bold text-white flex items-center">
                <div class="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
                Messages
                <span v-if="unreadMessages > 0" class="ml-auto bg-white/20 text-xs px-2 py-1 rounded-full">
                  {{ unreadMessages }} new
                </span>
              </h3>
            </div>

            <div class="max-h-96 overflow-y-auto">
              <!-- Loading State -->
              <div v-if="loadingMessages" class="space-y-2 p-3">
                <div v-for="i in 3" :key="i" class="p-3 animate-pulse">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div class="flex-1 space-y-2">
                      <div class="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div class="h-2 bg-gray-100 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Conversations List -->
              <div v-else-if="recentConversations.length > 0" class="divide-y divide-gray-100">
                <router-link 
                  v-for="conversation in recentConversations" 
                  :key="conversation.id"
                  :to="`/messages?conversation=${conversation.id}`"
                  @click="closeMessageDropdown"
                  class="flex items-center p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200 cursor-pointer group"
                  :class="{ 'bg-blue-50/50': conversation.unreadCount > 0 }">
                  <div class="relative flex-shrink-0">
                    <img 
                      :src="getOtherUserAvatar(conversation)" 
                      :alt="getOtherUserName(conversation)"
                      class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                    />
                    <div v-if="conversation.isOnline"
                      class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
                    
                    <!-- Unread badge on avatar -->
                    <span v-if="conversation.unreadCount > 0"
                      class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                      {{ conversation.unreadCount > 9 ? '9+' : conversation.unreadCount }}
                    </span>
                  </div>

                  <div class="ml-3 flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1">
                      <p class="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-700 transition-colors"
                        :class="{ 'text-blue-700': conversation.unreadCount > 0 }">
                        {{ getOtherUserName(conversation) }}
                      </p>
                      <span class="text-xs text-gray-400 ml-2 flex-shrink-0">
                        {{ formatMessageTime(conversation.lastMessage?.createdAt) }}
                      </span>
                    </div>

                    <p class="text-xs text-gray-600 truncate mb-1"
                      :class="{ 'font-semibold text-gray-800': conversation.unreadCount > 0 }">
                      {{ conversation.lastMessage?.content || 'No messages yet' }}
                    </p>

                    <!-- Listing reference if exists -->
                    <p v-if="conversation.listing" class="text-xs text-blue-600 truncate font-medium">
                      RE: {{ conversation.listing.name }}
                    </p>
                  </div>

                  <!-- Unread indicator arrow -->
                  <div v-if="conversation.unreadCount > 0" class="ml-2 flex-shrink-0">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </router-link>
              </div>

              <!-- Empty State -->
              <div v-else class="px-6 py-8 text-center">
                <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p class="text-sm text-gray-500 mb-1">No messages yet</p>
                <p class="text-xs text-gray-400">Start a conversation by contacting a farmer</p>
              </div>
            </div>

            <div class="bg-gray-50 border-t border-gray-200">
              <router-link to="/messages"
                class="block px-6 py-3 text-sm text-center font-medium text-blue-600 hover:text-blue-700 transition-all duration-300"
                @click="closeMessageDropdown">
                See all messages →
              </router-link>
            </div>
          </div>
        </div>

        <!-- Profile Dropdown -->
        <div>
          <div
            class="flex items-center cursor-pointer gap-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 px-4 py-2 rounded-xl transition-all duration-300 group border border-transparent hover:border-green-200"
            @click="toggleDropdown">
            <!-- Profile Image with enhanced styling -->
            <div class="relative">
              <!-- Profile Picture or Initials -->
              <div v-if="currentUser.profilePicture"
                class="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-green-200 shadow-lg group-hover:scale-110 transition-all duration-300">
                <img 
                  :src="currentUser.profilePicture" 
                  :alt="currentUser.displayName"
                  class="w-full h-full object-cover"
                  loading="eager"
                  @error="handleImageError"
                />
              </div>
              <div v-else
                class="w-10 h-10 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center ring-2 ring-green-200 shadow-lg group-hover:scale-110 transition-all duration-300">
                <span class="text-sm font-bold text-white">
                  {{ currentUser.initials || 'U' }}
                </span>
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white animate-pulse">
              </div>
            </div>

            <!-- User Info (hidden on mobile) -->
            <div class="hidden md:block">
              <p class="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-200">
                {{ currentUser.displayName || 'User' }}
              </p>
              <p
                class="text-xs font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent capitalize">
                {{ currentUser.role || 'user' }}
              </p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:rotate-180 transition-all duration-300"
              fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Enhanced Dropdown -->
          <div v-show="showDropdown"
            class="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden transform transition-all duration-300 ease-out">
            <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-6 relative overflow-hidden">
              <div
                class="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-10 translate-x-10">
              </div>
              <div class="relative z-10">
                <!-- Combined Profile Link with User Info -->
                <router-link to="/userProfile"
                  class="flex items-start text-white hover:text-green-100 transition-colors duration-200 group"
                  @click="closeDropdown">
                  <div class="mr-4">
                    <!-- Profile Picture or Initials in Dropdown -->
                    <div v-if="currentUser.profilePicture"
                      class="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-white ring-opacity-30 group-hover:scale-110 transition-transform duration-200">
                      <img 
                        :src="currentUser.profilePicture" 
                        :alt="currentUser.displayName"
                        class="w-full h-full object-cover"
                        loading="eager"
                        @error="handleImageError"
                      />
                    </div>
                    <div v-else
                      class="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center ring-2 ring-white ring-opacity-30 group-hover:scale-110 transition-transform duration-200">
                      <span class="text-base font-bold text-white">
                        {{ currentUser.initials || 'U' }}
                      </span>
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-white text-base mb-1">
                      {{ currentUser.displayName || 'User' }}
                    </p>
                    <p class="text-xs text-green-100 truncate mb-2">{{ currentUser.email || '' }}</p>
                    <p
                      class="text-xs text-white font-medium flex items-center group-hover:translate-x-1 transition-transform duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile →
                    </p>
                  </div>
                </router-link>
              </div>
            </div>

            <div class="p-2">
              <router-link to="/dashboard"
                class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-all duration-300 rounded-xl group"
                @click="closeDropdown">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <span class="font-medium">Dashboard</span>
              </router-link>

              <!-- Show Transactions only for farmers in dropdown -->
              <router-link v-if="currentUser.role === 'farmer'" to="/transactions"
                class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-all duration-300 rounded-xl group"
                @click="closeDropdown">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="font-medium">Transactions</span>
              </router-link>

              <!-- Show My Purchases only for buyers in dropdown -->
              <router-link v-if="currentUser.role === 'buyer'" to="/transactions"
                class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-all duration-300 rounded-xl group"
                @click="closeDropdown">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span class="font-medium">My Purchases</span>
              </router-link>

              <router-link to="/settings"
                class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-all duration-300 rounded-xl group"
                @click="closeDropdown">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span class="font-medium">Settings</span>
              </router-link>
            </div>

            <div class="border-t border-gray-200 p-2">
              <button @click="showLogoutModal = true"
                class="flex cursor-pointer items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 text-left rounded-xl group">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span class="font-medium">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- Not logged in -->
      <template v-else-if="!isLoggedIn">
        <div class="flex items-center gap-3">
          <router-link to="/login"
            class="border-2 border-green-500 px-5 py-2 rounded-xl text-sm font-medium hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700 transition-all duration-300 flex items-center gap-2 group hover:border-green-600 hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In
          </router-link>
          <router-link to="/signup"
            class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
            Sign Up
          </router-link>
        </div>
      </template>
    </div>
  </nav>

  <!-- Logout Confirmation Modal -->
  <div v-if="showLogoutModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <!-- Dimmer glass backdrop that blocks clicks -->
    <div class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300" @click="showLogoutModal = false"></div>
    
    <!-- Simple Modal -->
    <div class="relative bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-sm" @click.stop>
      <!-- Modal Content -->
      <div class="p-6 text-center">
        <div class="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
        
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Sign out?
        </h3>
        <p class="text-sm text-gray-600 mb-6">
          Are you sure you want to sign out?
        </p>
        
        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button @click="showLogoutModal = false"
            class="flex-1 cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            Cancel
          </button>
          
          <button @click="handleLogout"
            class="flex-1 cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import { NavBarService } from '@/services/navbarService';
import { MessagesService } from '@/services/messagesService';
import { cartCheckoutService } from '@/services/cartCheckoutService';
import type { NavBarUser } from '@/services/navbarService';
import type { Conversation } from '@/types/messages';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// 🆕 Track visibility
let lastVisibilityTime = Date.now();
const VISIBILITY_REFRESH_THRESHOLD = 30 * 1000; // 30 seconds

// 🚀 INSTANT LOAD: Get cached data synchronously FIRST
const cachedNavbarUser = NavBarService.getCachedNavBarData();

// State - initialized with cached data for instant display
const navbarUser = ref<NavBarUser | null>(cachedNavbarUser);

// 🎯 FIXED: Dynamic Cart Count from Database
const cartCount = ref(0);

// 🆕 Messages State
const conversations = ref<Conversation[]>([]);
const loadingMessages = ref(false);
const unreadNotifications = ref(12); // Keep this as demo for now

// UI state
const showDropdown = ref(false);
const showNotificationDropdown = ref(false);
const showMessageDropdown = ref(false);
const showLogoutModal = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const notificationRef = ref<HTMLElement | null>(null);
const messageRef = ref<HTMLElement | null>(null);

// 🚀 COMPUTED: Use cached data OR live data for instant availability
const isLoggedIn = computed(() => {
  // Check live auth state
  if (authStore.isAuthenticated) return true;
  // Fallback: check if we have cached user data
  if (cachedNavbarUser) return true;
  return false;
});

const currentUser = computed(() => {
  // Prefer live data, fallback to cache
  return navbarUser.value || cachedNavbarUser;
});

// 🆕 Computed for unread message count
const unreadMessages = computed(() => {
  return conversations.value.reduce((total, conv) => total + conv.unreadCount, 0);
});

// 🆕 Computed for recent conversations (top 5)
const recentConversations = computed(() => {
  return conversations.value
    .sort((a, b) => {
      // Sort by: 1) unread first, 2) most recent
      if (a.unreadCount !== b.unreadCount) {
        return b.unreadCount - a.unreadCount;
      }
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    })
    .slice(0, 5);
});

// Handle image errors
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
  if (navbarUser.value) {
    navbarUser.value.profilePicture = null;
  }
};

// 🆕 Helper functions for conversations
const getOtherUser = (conversation: Conversation) => {
  return conversation.users.find(user => user.id !== currentUser.value?.id) || conversation.users[0];
};

const getOtherUserName = (conversation: Conversation): string => {
  const user = getOtherUser(conversation);
  return user.name || 'Unknown User';
};

const getOtherUserAvatar = (conversation: Conversation): string => {
  const user = getOtherUser(conversation);
  return user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;
};

const formatMessageTime = (date?: Date): string => {
  if (!date) return '';
  
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// 🎯 Load actual cart count from database
const loadCartCount = async () => {
  if (!authStore.isAuthenticated) {
    cartCount.value = 0;
    return;
  }

  try {
    const result = await cartCheckoutService.getCartCount();
    
    if (result.success && result.data !== undefined) {
      cartCount.value = result.data;
      console.log('🛒 Cart count loaded:', cartCount.value);
    } else {
      console.warn('⚠️ Failed to load cart count:', result.error);
      cartCount.value = 0;
    }
  } catch (error) {
    console.error('❌ Error loading cart count:', error);
    cartCount.value = 0;
  }
};

// 🆕 Load conversations
const loadConversations = async () => {
  if (!currentUser.value?.id) return;

  loadingMessages.value = true;
  
  try {
    const result = await MessagesService.getConversations(currentUser.value.id);
    
    if (result.success && result.data) {
      conversations.value = result.data;
      console.log('✅ Loaded', conversations.value.length, 'conversations');
      console.log('📊 Total unread messages:', unreadMessages.value);
    } else {
      console.error('❌ Failed to load conversations:', result.error);
    }
  } catch (error) {
    console.error('❌ Error loading conversations:', error);
  } finally {
    loadingMessages.value = false;
  }
};

// 🆕 Subscribe to conversation updates
const subscribeToConversationUpdates = () => {
  if (!currentUser.value?.id) return;

  console.log('🔴 Subscribing to conversation updates in NavBar');

  MessagesService.subscribeToConversations(
    currentUser.value.id,
    async (conversationId: string, message: any) => {
      console.log('📨 New message in navbar subscription:', conversationId);
      
      // Find and update the conversation
      const conv = conversations.value.find(c => c.id === conversationId);
      if (conv) {
        conv.lastMessage = message;
        conv.updatedAt = message.createdAt;
        
        // Increment unread count if not from current user
        if (message.senderId !== currentUser.value?.id) {
          conv.unreadCount++;
          console.log('📊 Incremented unread count for', conversationId, 'to', conv.unreadCount);
        }
        
        // Re-sort conversations
        conversations.value.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
      } else {
        // New conversation - reload all
        await loadConversations();
      }
    },
    async (conversationId: string) => {
      console.log('🔄 Conversation updated in navbar:', conversationId);
      // Reload specific conversation or all conversations
      await loadConversations();
    }
  );
};

// 🆕 Handle visibility change
const handleVisibilityChange = async () => {
  if (document.hidden) {
    lastVisibilityTime = Date.now();
    console.log('👋 NavBar: Tab hidden');
  } else {
    const timeAway = Date.now() - lastVisibilityTime;
    console.log('👀 NavBar: Tab visible. Time away:', Math.round(timeAway / 1000), 'seconds');

    if (timeAway > VISIBILITY_REFRESH_THRESHOLD && authStore.isAuthenticated && authStore.userId) {
      console.log('🔄 NavBar: Refreshing after being away...');
      
      // Refresh auth session
      const sessionValid = await authStore.refreshSession();
      
      if (sessionValid && authStore.userId) {
        // Reload navbar data, conversations, and cart count
        await loadNavbarData(authStore.userId);
        await loadConversations();
        await loadCartCount();
      } else {
        // Session expired
        console.warn('⚠️ NavBar: Session expired');
        navbarUser.value = null;
        conversations.value = [];
        cartCount.value = 0;
        NavBarService.clearNavBarCache();
      }
    }
  }
};

// 🚀 OPTIMIZED: Initialize in parallel
onMounted(async () => {
  console.log('🚀 NavBar mounting with cached data:', cachedNavbarUser?.displayName || 'none');
  
  // 🆕 Add visibility listener
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Start both in parallel - don't wait for initialize()
  const initPromise = authStore.initialize();
  
  // If we have cached user, start refreshing immediately (don't wait)
  if (cachedNavbarUser?.id) {
    loadNavbarData(cachedNavbarUser.id);
    loadConversations(); // Load conversations in background
    loadCartCount(); // 🎯 Load cart count in background
  }
  
  // Wait for auth to finish
  await initPromise;
  
  // If auth succeeded but we don't have cached data, load it now
  if (authStore.isAuthenticated && authStore.userId && !cachedNavbarUser) {
    await loadNavbarData(authStore.userId);
    await loadConversations();
    await loadCartCount(); // 🎯 Load cart count
    subscribeToConversationUpdates();
  } else if (!authStore.isAuthenticated && cachedNavbarUser) {
    // Session expired - clear cache
    console.log('⚠️ Session expired, clearing cache');
    NavBarService.clearNavBarCache();
    navbarUser.value = null;
    conversations.value = [];
    cartCount.value = 0;
  } else if (authStore.isAuthenticated && authStore.userId) {
    // Subscribe to real-time updates
    subscribeToConversationUpdates();
    await loadCartCount(); // 🎯 Load cart count
  }
  
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  
  // Cleanup message subscriptions
  MessagesService.cleanup();
});

// Watch auth changes
watch(() => authStore.isAuthenticated, async (newValue) => {
  if (newValue && authStore.userId) {
    await loadNavbarData(authStore.userId);
    await loadConversations();
    await loadCartCount(); // 🎯 Load cart count when logging in
    subscribeToConversationUpdates();
  } else {
    navbarUser.value = null;
    conversations.value = [];
    cartCount.value = 0;
    NavBarService.clearNavBarCache();
  }
});

// Watch route changes
watch(() => route.path, async (newPath) => {
  showDropdown.value = false;
  showNotificationDropdown.value = false;
  showMessageDropdown.value = false;
  showLogoutModal.value = false;
  
  // 🎯 Refresh cart count when navigating away from cart page
  if (authStore.isAuthenticated && !newPath.includes('/cart')) {
    await loadCartCount();
  }
});

// 🚀 OPTIMIZED: Load navbar data (async refresh in background)
const loadNavbarData = async (userId: string) => {
  try {
    console.log('📊 Refreshing navbar data in background...');
    const data = await NavBarService.getAllNavBarData(userId);
    
    // Update with fresh data
    navbarUser.value = data.user;
    
    console.log('✅ Navbar data refreshed:', data.user?.displayName);
  } catch (error: any) {
    console.error('❌ Error refreshing navbar data:', error);
    
    // Keep using cached data on network errors
    // Only logout if it's an auth error
    if (error?.code === 'AUTH_ERROR') {
      console.warn('⚠️ Auth error - logging out');
      await handleAutoLogout('Authentication session expired');
    }
  }
};

const handleAutoLogout = async (reason: string) => {
  try {
    console.log('🔒 Auto-logging out:', reason);
    
    await authStore.logout();
    
    navbarUser.value = null;
    conversations.value = [];
    cartCount.value = 0;
    NavBarService.clearNavBarCache();
    await MessagesService.cleanup();
    
    showLogoutModal.value = false;
    showDropdown.value = false;
    showNotificationDropdown.value = false;
    showMessageDropdown.value = false;
    
    router.push({
      path: "/",
      query: { message: reason }
    });
  } catch (error) {
    console.error("❌ Auto-logout failed:", error);
    router.push("/");
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    showLogoutModal.value = false;
    showDropdown.value = false;
    showNotificationDropdown.value = false;
    showMessageDropdown.value = false;
  }
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    showNotificationDropdown.value = false;
    showMessageDropdown.value = false;
  }
};

const toggleNotificationDropdown = () => {
  showNotificationDropdown.value = !showNotificationDropdown.value;
  if (showNotificationDropdown.value) {
    showDropdown.value = false;
    showMessageDropdown.value = false;
  }
};

const toggleMessageDropdown = async () => {
  showMessageDropdown.value = !showMessageDropdown.value;
  if (showMessageDropdown.value) {
    showDropdown.value = false;
    showNotificationDropdown.value = false;
    
    // Load conversations when opening dropdown
    if (conversations.value.length === 0 && currentUser.value?.id) {
      await loadConversations();
    }
  }
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const closeNotificationDropdown = () => {
  showNotificationDropdown.value = false;
};

const closeMessageDropdown = () => {
  showMessageDropdown.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    showDropdown.value = false;
  }

  if (notificationRef.value && !notificationRef.value.contains(target)) {
    showNotificationDropdown.value = false;
  }

  if (messageRef.value && !messageRef.value.contains(target)) {
    showMessageDropdown.value = false;
  }
};

const handleLogout = async () => {
  try {
    console.log('🔒 Logging out...');
    
    await authStore.logout();
    
    navbarUser.value = null;
    conversations.value = [];
    cartCount.value = 0;
    NavBarService.clearNavBarCache();
    await MessagesService.cleanup();
    
    showLogoutModal.value = false;
    showDropdown.value = false;
    
    console.log('✅ Logout successful');
    router.push("/");
  } catch (error) {
    console.error("❌ Logout failed:", error);
  }
};
</script>