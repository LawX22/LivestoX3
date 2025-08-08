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
    <div class="absolute top-6 right-20 w-2 h-2 bg-green-400 rounded-full opacity-25 animate-bounce"
      style="animation-delay: 1s"></div>
  </div>

  <nav
    class="w-full flex items-center justify-between px-6 py-3 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
    <!-- Left: Logo and Brand Name -->
    <div class="flex items-center gap-3 group">
      <div class="relative">
        <div
          class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ring-2 ring-green-100">
          <img src="/src/assets/vue.svg" alt="Logo" class="w-6 h-6 filter brightness-0 invert" />
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

    <ul class="hidden md:flex gap-6 text-sm font-medium items-center">
      <!-- Show Home and About Us only for guests -->
      <template v-if="!user">
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
        <router-link to="/market"
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

      <!-- Additional links for logged-in users -->
      <template v-if="user">
        <li>
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
      <!-- Notification and Message Icons (only shown when logged in) -->
      <template v-if="user">
        <!-- Notification Dropdown -->
        <div class="relative" ref="notificationRef">
          <button @click="toggleNotificationDropdown"
            class="relative p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group border border-transparent hover:border-green-200">
            <div class="w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span v-if="unreadNotifications > 0"
                class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 ring-2 ring-white flex items-center justify-center text-xs font-bold text-white animate-pulse">
                {{ unreadNotifications }}
              </span>
            </div>
          </button>

          <!-- Notification Dropdown Content -->
          <div v-show="showNotificationDropdown"
            class="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden transform transition-all duration-300 ease-out">
            <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h3 class="text-base font-bold text-white flex items-center">
                <div class="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
                Notifications
                <span v-if="unreadNotifications > 0" class="ml-auto bg-white/20 text-xs px-2 py-1 rounded-full">
                  {{ unreadNotifications }} new
                </span>
              </h3>
            </div>

            <div class="max-h-80 overflow-y-auto">
              <!-- Notification Item 1 -->
              <a href="#"
                class="flex px-6 py-4 text-sm hover:bg-gray-50 transition-all duration-300 border-b border-gray-100 group"
                @click.prevent="markAsRead('notification', 1)">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <p class="text-sm font-semibold text-gray-900 mb-1">
                    Order #1234 has been confirmed
                  </p>
                  <p class="text-xs text-gray-600 mb-2">
                    Your recent order has been confirmed by the seller.
                  </p>
                  <p class="text-xs text-green-600 font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2 hours ago
                  </p>
                </div>
              </a>

              <!-- Notification Item 2 -->
              <a href="#"
                class="flex px-6 py-4 text-sm hover:bg-gray-50 transition-all duration-300 border-b border-gray-100 group"
                @click.prevent="markAsRead('notification', 2)">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <p class="text-sm font-semibold text-gray-900 mb-1">
                    Reminder: Payment due
                  </p>
                  <p class="text-xs text-gray-600 mb-2">
                    Your payment for order #1234 is due tomorrow.
                  </p>
                  <p class="text-xs text-blue-600 font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    1 day ago
                  </p>
                </div>
              </a>

              <!-- Notification Item 3 -->
              <a href="#"
                class="flex px-6 py-4 text-sm hover:bg-gray-50 transition-all duration-300 border-b border-gray-100 group"
                @click.prevent="markAsRead('notification', 3)">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <p class="text-sm font-semibold text-gray-900 mb-1">
                    New marketplace feature
                  </p>
                  <p class="text-xs text-gray-600 mb-2">
                    Check out our new livestock tracking feature!
                  </p>
                  <p class="text-xs text-yellow-600 font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    3 days ago
                  </p>
                </div>
              </a>
            </div>

            <div class="bg-gray-50">
              <router-link to="/notifications"
                class="block px-6 py-3 text-sm text-center font-medium text-green-600 hover:text-green-700 transition-all duration-300 border-t border-gray-200"
                @click="closeNotificationDropdown">
                See all notifications →
              </router-link>
            </div>
          </div>
        </div>

        <!-- Messages Dropdown -->
        <div class="relative" ref="messageRef">
          <button @click="toggleMessageDropdown"
            class="relative p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group border border-transparent hover:border-green-200">
            <div class="w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span v-if="unreadMessages > 0"
                class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 ring-2 ring-white flex items-center justify-center text-xs font-bold text-white animate-pulse">
                {{ unreadMessages }}
              </span>
            </div>
          </button>

          <!-- Messages Dropdown Content -->
          <div v-show="showMessageDropdown"
            class="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden transform transition-all duration-300 ease-out">
            <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h3 class="text-base font-bold text-white flex items-center">
                <div class="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
                Messages
                <span v-if="unreadMessages > 0" class="ml-auto bg-white/20 text-xs px-2 py-1 rounded-full">
                  {{ unreadMessages }} new
                </span>
              </h3>
            </div>

            <div class="max-h-80 overflow-y-auto">
              <!-- Message Item 1 -->
              <a href="#"
                class="flex px-6 py-4 text-sm hover:bg-gray-50 transition-all duration-300 border-b border-gray-100 group"
                @click.prevent="markAsRead('message', 1)">
                <div class="flex-shrink-0 mr-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span class="text-sm font-bold text-white">JD</span>
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex justify-between items-start mb-1">
                    <p class="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                    <span class="text-xs text-green-600 font-medium whitespace-nowrap ml-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      30 min ago
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 truncate">
                    Hi there! I'm interested in your livestock. Can we discuss the price?
                  </p>
                </div>
              </a>

              <!-- Message Item 2 -->
              <a href="#"
                class="flex px-6 py-4 text-sm hover:bg-gray-50 transition-all duration-300 border-b border-gray-100 group"
                @click.prevent="markAsRead('message', 2)">
                <div class="flex-shrink-0 mr-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span class="text-sm font-bold text-white">AS</span>
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex justify-between items-start mb-1">
                    <p class="text-sm font-semibold text-gray-900 truncate">Agri Suppliers</p>
                    <span class="text-xs text-blue-600 font-medium whitespace-nowrap ml-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      2 hours ago
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 truncate">
                    Your order #1234 has been shipped. Tracking number: XYZ123
                  </p>
                </div>
              </a>

              <!-- Message Item 3 -->
              <a href="#"
                class="flex px-6 py-4 text-sm hover:bg-gray-50 transition-all duration-300 border-b border-gray-100 group"
                @click.prevent="markAsRead('message', 3)">
                <div class="flex-shrink-0 mr-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span class="text-sm font-bold text-white">LS</span>
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex justify-between items-start mb-1">
                    <p class="text-sm font-semibold text-gray-900 truncate">Livestock Support</p>
                    <span class="text-xs text-purple-600 font-medium whitespace-nowrap ml-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      1 day ago
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 truncate">
                    Your support ticket #4567 has been resolved. Please let us know if you need anything else.
                  </p>
                </div>
              </a>
            </div>

            <div class="bg-gray-50">
              <router-link to="/messages"
                class="block px-6 py-3 text-sm text-center font-medium text-green-600 hover:text-green-700 transition-all duration-300 border-t border-gray-200"
                @click="closeMessageDropdown">
                See all messages →
              </router-link>
            </div>
          </div>
        </div>
      </template>

      <!-- Logged in -->
      <template v-if="user">
        <div>
          <div
            class="flex items-center cursor-pointer gap-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 px-4 py-2 rounded-xl transition-all duration-300 group border border-transparent hover:border-green-200"
            @click="toggleDropdown">
            <!-- Profile Image with enhanced styling -->
            <div class="relative">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center ring-2 ring-green-200 shadow-lg group-hover:scale-110 transition-all duration-300">
                <span class="text-sm font-bold text-white">
                  {{ getInitials(user.firstName, user.lastName) }}
                </span>
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white animate-pulse">
              </div>
            </div>

            <!-- User Info (hidden on mobile) -->
            <div class="hidden md:block">
              <p class="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-200">
                {{ user.firstName }} {{ user.lastName }}
              </p>
              <p
                class="text-xs font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent capitalize">
                {{ user.role.toLowerCase() }}
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
                    <div
                      class="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center ring-2 ring-white ring-opacity-30 group-hover:scale-110 transition-transform duration-200">
                      <span class="text-base font-bold text-white">
                        {{ getInitials(user.firstName, user.lastName) }}
                      </span>
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-white text-base mb-1">
                      {{ user.firstName }} {{ user.lastName }}
                    </p>
                    <p class="text-xs text-green-100 truncate mb-2">{{ user.email }}</p>
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

              <!-- Show Transactions only for farmers -->
              <router-link v-if="user.role === 'FARMER'" to="/transactions"
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
              <button @click="logout"
                class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 text-left rounded-xl group">
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
      <template v-else>
        <div class="flex items-center gap-3">
          <router-link to="/signIn"
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
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref<{
  firstName: string;
  lastName: string;
  email: string;
  role: string;
} | null>(null);

const showDropdown = ref(false);
const showNotificationDropdown = ref(false);
const showMessageDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const notificationRef = ref<HTMLElement | null>(null);
const messageRef = ref<HTMLElement | null>(null);
const unreadNotifications = ref(3); // Example count
const unreadMessages = ref(1); // Example count

onMounted(() => {
  // Check if user is logged in
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    user.value = {
      firstName: parsedUser.firstName || "User",
      lastName: parsedUser.lastName || "Name",
      email: parsedUser.email || "",
      role: parsedUser.role || "User",
    };
  }

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  // Close other dropdowns when opening this one
  if (showDropdown.value) {
    showNotificationDropdown.value = false;
    showMessageDropdown.value = false;
  }
}

const toggleNotificationDropdown = () => {
  showNotificationDropdown.value = !showNotificationDropdown.value;
  // Close other dropdowns when opening this one
  if (showNotificationDropdown.value) {
    showDropdown.value = false;
    showMessageDropdown.value = false;
  }
}

const toggleMessageDropdown = () => {
  showMessageDropdown.value = !showMessageDropdown.value;
  // Close other dropdowns when opening this one
  if (showMessageDropdown.value) {
    showDropdown.value = false;
    showNotificationDropdown.value = false;
  }
}

const closeDropdown = () => {
  showDropdown.value = false;
}

const closeNotificationDropdown = () => {
  showNotificationDropdown.value = false;
}

const closeMessageDropdown = () => {
  showMessageDropdown.value = false;
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  // Close dropdown if clicked outside
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    showDropdown.value = false;
  }

  // Close notification dropdown if clicked outside
  if (notificationRef.value && !notificationRef.value.contains(target)) {
    showNotificationDropdown.value = false;
  }

  // Close message dropdown if clicked outside
  if (messageRef.value && !messageRef.value.contains(target)) {
    showMessageDropdown.value = false;
  }
}

const markAsRead = (type: "notification" | "message", id: number) => {
  if (type === "notification") {
    // In a real app, you would mark the notification as read via API
    console.log(`Marking notification ${id} as read`);
    unreadNotifications.value = Math.max(0, unreadNotifications.value - 1);
    closeNotificationDropdown();
  } else {
    // In a real app, you would mark the message as read via API
    console.log(`Marking message ${id} as read`);
    unreadMessages.value = Math.max(0, unreadMessages.value - 1);
    closeMessageDropdown();
  }
}

const logout = () => {
  localStorage.removeItem("user");
  user.value = null;
  showDropdown.value = false;
  router.push("/");
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
}
</script>