<template>
  <!-- Background Gradient with Floating Elements -->
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-4 relative overflow-hidden">
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
      <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-300 rounded-full opacity-40 animate-pulse"></div>
      <div class="absolute bottom-24 left-24 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
      <div class="absolute top-1/2 right-8 w-10 h-10 bg-green-400 rounded-full opacity-35 animate-bounce" style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/3 right-1/3 w-8 h-8 bg-emerald-400 rounded-full opacity-20 animate-pulse" style="animation-delay: 0.5s"></div>
      <div class="absolute top-1/4 left-1/3 w-14 h-14 bg-teal-400 rounded-full opacity-25 animate-bounce" style="animation-delay: 1.5s"></div>
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

    <!-- Main Content Container - Now with fixed height -->
    <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden max-w-7xl mx-auto border border-white/30 relative z-10 flex flex-col" style="height: 90vh;">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white opacity-15 rounded-full -translate-y-10 translate-x-10 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-15 rounded-full translate-y-6 -translate-x-6 animate-pulse"></div>
        
        <div class="relative z-10">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <button @click="goBack" class="mr-4 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div class="w-12 h-12 bg-white bg-opacity-80 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  <path d="M10 9a1 1 0 100-2 1 1 0 000 2zm0 2a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">Notifications</h1>
                <p class="text-green-100 text-sm opacity-90">Stay updated with your latest activities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="bg-white border-b border-gray-200">
        <div class="flex space-x-4 px-6 overflow-x-auto">
          <button 
            v-for="filter in filters" 
            :key="filter.key"
            @click="activeFilter = filter.key"
            :class="[
              'py-4 px-3 border-b-2 font-medium text-sm transition-colors duration-300 whitespace-nowrap',
              activeFilter === filter.key 
                ? 'border-green-500 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ filter.label }}
            <span v-if="filter.count > 0" class="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              {{ filter.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Content Area - Now flex-col with fixed height container -->
      <div class="flex-1 flex flex-col overflow-hidden p-6">
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mb-4">
          <button @click="markAllAsRead" 
            class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 px-4 text-sm rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Mark All Read
          </button>
          
          <button @click="clearAll"
            class="px-4 py-2 text-sm border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        </div>

        <!-- Stats Cards - Made more compact -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-gray-600 font-medium">Unread Notifications</p>
                <p class="text-lg font-bold text-gray-800">{{ unreadCount }}</p>
              </div>
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-gray-600 font-medium">Total Notifications</p>
                <p class="text-lg font-bold text-gray-800">{{ filteredNotifications.length }}</p>
              </div>
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications List Container - Compact Design -->
        <div class="flex-1 flex flex-col overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
          <!-- Empty State -->
          <div v-if="filteredNotifications.length === 0" 
            class="flex-1 p-6 text-center flex items-center justify-center">
            <div>
              <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 class="text-md font-semibold text-gray-800 mb-1">No notifications found</h3>
              <p class="text-gray-600 text-xs">{{ getEmptyStateMessage() }}</p>
            </div>
          </div>

          <!-- Compact Notifications List - Scrollable Area -->
          <div v-else class="flex-1 overflow-y-auto divide-y divide-gray-200/60">
            <div v-for="notification in filteredNotifications" :key="notification.id"
              :class="[
                'transition-colors duration-150 hover:bg-gray-50/50 cursor-pointer',
                notification.read ? 'bg-white' : 'bg-green-50/30'
              ]"
              @click="markAsRead(notification.id)">
              
              <div class="p-3">
                <div class="flex items-start gap-3">
                  <!-- Notification Icon - Made smaller -->
                  <div class="flex-shrink-0 mt-0.5">
                    <div :class="[
                      'w-8 h-8 rounded-md flex items-center justify-center',
                      getNotificationStyle(notification.type).bg
                    ]">
                      <component :is="getNotificationIcon(notification.type)" 
                        class="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <!-- Notification Content - Compact layout -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2 mb-1">
                      <h3 :class="[
                        'text-sm font-semibold line-clamp-1',
                        notification.read ? 'text-gray-700' : 'text-gray-900'
                      ]">
                        {{ notification.title }}
                      </h3>
                      
                      <div class="flex items-center gap-1 flex-shrink-0">
                        <span class="text-xs text-gray-500">
                          {{ formatTimeAgo(notification.createdAt) }}
                        </span>
                        
                        <div v-if="!notification.read" 
                          class="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <p :class="[
                      'text-xs mb-2 leading-snug line-clamp-2',
                      notification.read ? 'text-gray-500' : 'text-gray-600'
                    ]">
                      {{ notification.message }}
                    </p>

                    <!-- Notification Metadata - Compact -->
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-1">
                        <span :class="[
                          'px-1.5 py-0.5 rounded text-[10px] font-medium',
                          getNotificationStyle(notification.type).badge
                        ]">
                          {{ getTypeLabel(notification.type) }}
                        </span>
                        
                        <span v-if="notification.priority === 'high'" 
                          class="px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-medium">
                          High
                        </span>
                      </div>

                      <!-- Quick Actions - Always visible but subtle -->
                      <div class="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                        <button @click.stop="toggleRead(notification.id)"
                          class="p-1 hover:bg-gray-100 rounded transition-colors duration-150"
                          :title="notification.read ? 'Mark as Unread' : 'Mark as Read'">
                          <svg v-if="notification.read" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        
                        <button @click.stop="deleteNotification(notification.id)"
                          class="p-1 hover:bg-red-50 text-red-500 rounded transition-colors duration-150"
                          title="Delete Notification">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button - Made more compact -->
        <div v-if="hasMore" class="text-center mt-3 pt-3 border-t border-gray-200">
          <button @click="loadMore" :disabled="loading"
            class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1 mx-auto group shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
            <svg v-if="loading" class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!loading">Load More</span>
            <span v-else>Loading...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { h } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Types
interface Notification {
  id: number
  type: 'order' | 'payment' | 'system' | 'message' | 'reminder'
  title: string
  message: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

// Reactive data
const notifications = ref<Notification[]>([])
const activeFilter = ref<string>('all')
const loading = ref(false)
const hasMore = ref(true)

// Sample data
const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order #1234 has been confirmed by the seller and is being prepared for shipment.',
    read: false,
    priority: 'medium',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Due Reminder',
    message: 'Your payment for order #1233 is due tomorrow. Please complete the payment to avoid any delays.',
    read: false,
    priority: 'high',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 3,
    type: 'message',
    title: 'New Message from John Doe',
    message: 'You have received a new message regarding your livestock listing. Click to view the conversation.',
    read: true,
    priority: 'medium',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    id: 4,
    type: 'system',
    title: 'Profile Updated Successfully',
    message: 'Your profile information has been updated successfully. All changes are now live on your account.',
    read: true,
    priority: 'low',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 5,
    type: 'reminder',
    title: 'Livestock Health Checkup Due',
    message: "It's time for your livestock health checkup. Schedule an appointment with your veterinarian.",
    read: false,
    priority: 'medium',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: 6,
    type: 'order',
    title: 'Order Shipped',
    message: 'Great news! Your order #1232 has been shipped. Track your package using the provided tracking number.',
    read: true,
    priority: 'medium',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 7,
    type: ['order', 'payment', 'message', 'system', 'reminder'][Math.floor(Math.random() * 5)] as Notification['type'],
    title: `Notification ${i + 7}`,
    message: `This is a sample notification message #${i + 7} to demonstrate scrolling functionality.`,
    read: Math.random() > 0.5,
    priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Notification['priority'],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
  }))
]

// Computed properties
const filteredNotifications = computed(() => {
  if (activeFilter.value === 'all') return notifications.value
  if (activeFilter.value === 'unread') return notifications.value.filter(n => !n.read)
  return notifications.value.filter(n => n.type === activeFilter.value)
})

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const filters = computed(() => [
  { key: 'all', label: 'All', count: notifications.value.length },
  { key: 'unread', label: 'Unread', count: unreadCount.value },
  { key: 'order', label: 'Orders', count: notifications.value.filter(n => n.type === 'order').length },
  { key: 'payment', label: 'Payments', count: notifications.value.filter(n => n.type === 'payment').length },
  { key: 'message', label: 'Messages', count: notifications.value.filter(n => n.type === 'message').length },
  { key: 'system', label: 'System', count: notifications.value.filter(n => n.type === 'system').length },
  { key: 'reminder', label: 'Reminders', count: notifications.value.filter(n => n.type === 'reminder').length }
])

// Methods
const goBack = () => router.go(-1)

const getNotificationIcon = (type: string) => {
  const icons = {
    order: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 13l4 4L19 7' })]),

    payment: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })]),

    message: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' })]),

    system: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2',
        d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
      }),
      h('path', {
        'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2',
        d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      })
    ]),

    reminder: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })])
  }

  return icons[type as keyof typeof icons] || icons.system
}

const getNotificationStyle = (type: string) => {
  const styles = {
    order: {
      bg: 'bg-gradient-to-r from-green-400 to-emerald-500',
      text: 'text-green-600',
      badge: 'bg-green-100 text-green-600'
    },
    payment: {
      bg: 'bg-gradient-to-r from-blue-400 to-indigo-500',
      text: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-600'
    },
    message: {
      bg: 'bg-gradient-to-r from-purple-400 to-pink-500',
      text: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-600'
    },
    system: {
      bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
      text: 'text-gray-600',
      badge: 'bg-gray-100 text-gray-600'
    },
    reminder: {
      bg: 'bg-gradient-to-r from-orange-400 to-red-500',
      text: 'text-orange-600',
      badge: 'bg-orange-100 text-orange-600'
    }
  }
  return styles[type as keyof typeof styles] || styles.system
}

const getTypeLabel = (type: string) => {
  const labels = {
    order: 'Order',
    payment: 'Payment',
    message: 'Message',
    system: 'System',
    reminder: 'Reminder'
  }
  return labels[type as keyof typeof labels] || 'Unknown'
}

const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diff = (now.getTime() - date.getTime()) / 1000
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

const getEmptyStateMessage = () => {
  switch (activeFilter.value) {
    case 'unread': return 'All caught up! You have no unread notifications.'
    case 'order': return 'No order notifications at the moment.'
    case 'payment': return 'No payment notifications at the moment.'
    case 'message': return 'No message notifications at the moment.'
    case 'system': return 'No system notifications at the moment.'
    case 'reminder': return 'No reminder notifications at the moment.'
    default: return 'You have no notifications at the moment.'
  }
}

const markAsRead = (id: number) => {
  const n = notifications.value.find(n => n.id === id)
  if (n && !n.read) n.read = true
}

const toggleRead = (id: number) => {
  const n = notifications.value.find(n => n.id === id)
  if (n) n.read = !n.read
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const deleteNotification = (id: number) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index !== -1) notifications.value.splice(index, 1)
}

const clearAll = () => {
  if (confirm('Are you sure you want to clear all notifications?')) {
    notifications.value = []
  }
}

const loadMore = () => {
  loading.value = true
  setTimeout(() => {
    hasMore.value = false
    loading.value = false
  }, 1000)
}

// Lifecycle
onMounted(() => {
  notifications.value = sampleNotifications
})
</script>
