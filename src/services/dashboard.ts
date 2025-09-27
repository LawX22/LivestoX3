// services/dashboard.ts
export interface User {
  id: string
  email: string
  role: 'farmer' | 'buyer' | 'both'
  first_name?: string
  last_name?: string
  username?: string
  created_at?: string
}

export interface Stats {
  totalListings?: number
  activeListings?: number
  totalRevenue?: number
  totalOrders?: number
  pendingOrders?: number
  totalSpent?: number
  totalMessages?: number
  unreadMessages?: number
  rating?: number
  totalReviews?: number
  listingsGrowth?: number
  revenueGrowth?: number
  totalViews?: number
  averagePrice?: number
  priceGrowth?: number
  totalUnits?: number
  unitsGrowth?: number
  conversionRate?: number
  conversionGrowth?: number
  ordersGrowth?: number
  savingsPercentage?: number
  ordersPerMonth?: number
  orderFrequencyGrowth?: number
  preferredCategory?: string
  categoryPercentage?: number
  statusBreakdown?: {
    available?: number
    lowStock?: number
    outOfStock?: number
    completed?: number
    processing?: number
    shipped?: number
  }
}

export interface TableItem {
  id: string
  name?: string
  livestock?: string
  type: string
  price?: string
  amount?: string
  seller?: string
  status: string
  statusClass: string
  stock?: number
  date: string
  image: string
}

export interface Message {
  id: string
  name: string
  message: string
  time: string
  avatar: string
  unread: boolean
}

export interface DashboardProps {
  user: User | null
  stats: Stats
  tableData: TableItem[]
  messages: Message[]
  lastUpdated: string
  refreshing: boolean
  timeRange: string
}

export interface DashboardEmits {
  (e: 'refresh'): void
  (e: 'toggle-role'): void
  (e: 'time-range-change', range: string): void
}