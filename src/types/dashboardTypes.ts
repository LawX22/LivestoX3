// types/dashboardTypes.ts

export interface User {
  id: string
  email: string
  role: 'farmer' | 'buyer' | 'both'
  username: string
  firstname?: string
  lastname?: string
  phone_number?: string
  address?: string
  profile_picture?: string
  farm_name?: string
}

export interface Stats {
  // Common Stats
  totalRevenue?: number
  revenueGrowth?: number
  totalMessages?: number
  unreadMessages?: number
  rating?: number
  totalReviews?: number
  
  // Farmer-specific Stats
  totalListings?: number
  listingsGrowth?: number
  activeListings?: number
  totalViews?: number
  averagePrice?: number
  priceGrowth?: number
  totalUnits?: number
  unitsGrowth?: number
  conversionRate?: number
  conversionGrowth?: number
  
  // Buyer-specific Stats
  totalOrders?: number
  ordersGrowth?: number
  pendingOrders?: number
  totalSpent?: number
  savingsPercentage?: number
  ordersPerMonth?: number
  orderFrequencyGrowth?: number
  preferredCategory?: string
  categoryPercentage?: number
  
  // Status Breakdowns
  statusBreakdown?: {
    available?: number
    lowStock?: number
    outOfStock?: number
    completed?: number
    processing?: number
    shipped?: number
  }
  
  // Category Breakdowns
  categoryBreakdown?: {
    cattle?: number
    swine?: number
    poultry?: number
    goats?: number
    others?: number
  }
  
  // Livestock Distribution
  livestockDistribution?: {
    cattle?: number
    swine?: number
    poultry?: number
    goats?: number
  }
}

export interface TableItem {
  id: string
  name?: string
  livestock?: string
  type: string
  price: string
  status: string
  statusClass: string
  stock?: string
  date: string
  image: string
  seller?: string
  amount?: string
}

export interface Message {
  id: string
  name: string
  avatar: string
  message: string
  time: string
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
  (e: 'time-range-change', range: string): void
  (e: 'open-sales-report'): void
}