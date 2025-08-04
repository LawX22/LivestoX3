<!-- adminSideBar.vue -->
<template>
  <aside 
    :class="[
      'min-h-screen bg-gradient-to-b from-white via-gray-50 to-white border-r border-gray-200 shadow-xl relative transition-all duration-300 ease-in-out flex flex-col',
      isMinimized ? 'w-20' : 'w-72'
    ]"
  >
    <!-- Header Section -->
    <div class="p-6 border-b border-gray-200 flex-shrink-0">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center min-w-0">
          <div class="w-10 h-10 bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-emerald-400/20">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          
          <div 
            v-if="!isMinimized"
            class="ml-4 min-w-0"
          >
            <h2 class="text-xl font-bold text-gray-900 truncate">Admin Panel</h2>
            <p class="text-sm text-emerald-600 truncate">Management Hub</p>
          </div>
        </div>
        
        <!-- Toggle Button -->
        <button
          @click="toggleMinimize"
          class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 flex-shrink-0 group"
        >
          <svg 
            :class="['w-5 h-5 transition-transform duration-300 group-hover:scale-110', isMinimized ? 'rotate-180' : '']" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation Container with fixed logout button -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Scrollable Navigation -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <div 
          v-for="item in navItems" 
          :key="item.path"
          class="relative group"
        >
          <router-link
            :to="item.path"
            :class="[
              'flex items-center rounded-xl transition-all duration-200 relative group/link backdrop-blur-sm',
              isMinimized ? 'p-3 justify-center' : 'px-4 py-3',
              $route.path === item.path 
                ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 shadow-md border border-emerald-200' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200'
            ]"
          >
            <!-- Icon with background -->
            <div :class="[
              'flex-shrink-0 rounded-lg flex items-center justify-center transition-all duration-200',
              isMinimized ? 'w-8 h-8' : 'w-9 h-9',
              $route.path === item.path 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'bg-gray-100 text-gray-500 group-hover/link:bg-gray-200 group-hover/link:text-gray-700'
            ]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon"></path>
              </svg>
            </div>
            
            <!-- Text (only when expanded) -->
            <div v-if="!isMinimized" class="ml-3 flex-1 min-w-0">
              <span class="text-sm font-semibold truncate block">
                {{ item.label }}
              </span>
              <span class="text-xs opacity-70 truncate block">
                {{ item.description }}
              </span>
            </div>
            
            <!-- Badge for notifications -->
            <div 
              v-if="!isMinimized && item.badge"
              class="ml-auto"
            >
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                {{ item.badge }}
              </span>
            </div>
            
            <!-- Active indicator for minimized state -->
            <div 
              v-if="isMinimized && $route.path === item.path"
              class="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 to-green-500 rounded-l shadow-lg"
            ></div>
            
            <!-- Hover effect overlay -->
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-50/50 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"></div>
          </router-link>

          <!-- Tooltip for minimized state -->
          <div 
            v-if="isMinimized"
            class="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-xl border border-gray-600"
          >
            <div class="font-medium">{{ item.label }}</div>
            <div class="text-xs text-gray-300">{{ item.description }}</div>
            <!-- Tooltip arrow -->
            <div class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
          </div>
        </div>
      </nav>

      <!-- Fixed Logout Button at Bottom -->
      <div class="p-4 border-t border-gray-200 flex-shrink-0 mt-auto">
        <button
          @click="logout"
          :class="[
            'group flex items-center w-full rounded-xl border transition-all duration-200 relative overflow-hidden',
            isMinimized ? 'p-3 justify-center' : 'px-4 py-3',
            'border-red-200 bg-gradient-to-r from-red-50 to-red-50 text-red-600 hover:from-red-100 hover:to-red-100 hover:border-red-300'
          ]"
        >
          <div :class="[
            'flex-shrink-0 rounded-lg flex items-center justify-center transition-all duration-200 bg-red-100',
            isMinimized ? 'w-8 h-8' : 'w-9 h-9'
          ]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          
          <span 
            v-if="!isMinimized"
            class="ml-3 text-sm font-semibold"
          >
            Sign Out
          </span>
          
          <!-- Tooltip for logout when minimized -->
          <div 
            v-if="isMinimized"
            class="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-xl border border-gray-600"
          >
            <div class="font-medium">Sign Out</div>
            <div class="text-xs text-gray-300">Exit admin panel</div>
            <!-- Tooltip arrow -->
            <div class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
          </div>
          
          <!-- Hover effect overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMinimized = ref(false)

const navItems = [
  {
    path: '/adminDashboard',
    label: 'Dashboard',
    description: 'Overview & Analytics',
    icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z'
  },
  {
    path: '/userManagement',
    label: 'Users',
    description: 'Manage accounts',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
  },
  {
    path: '/upgradeRequests',
    label: 'Upgrades',
    description: 'Pending requests',
    badge: '3',
    icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
  },
  {
    path: '/admin/livestock',
    label: 'Livestock',
    description: 'Animal listings',
    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
  },
  {
    path: '/admin/reports',
    label: 'Reports',
    description: 'Analytics & insights',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  },
  {
    path: '/admin/settings',
    label: 'Settings',
    description: 'System config',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  }
]

function toggleMinimize() {
  isMinimized.value = !isMinimized.value
}

function logout() {
  localStorage.removeItem('user')
  router.push('/')
}
</script>