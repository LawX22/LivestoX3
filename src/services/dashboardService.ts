// services/DashboardService.ts
import { supabase } from '@/supabase'
import type { User, Stats, TableItem, Message } from './dashboard'

interface LivestockListingDB {
  id: string
  user_id: string
  title: string
  type: string
  breed: string
  price: number
  quantity: number
  status: string
  created_at: string
  images: string[]
}

interface TransactionDB {
  id: string
  buyer_id: string
  seller_id: string
  listing_id: string
  quantity: number
  total_amount: number
  status: string
  created_at: string
  // Joined fields
  listing_title?: string
  listing_type?: string
  listing_images?: string[]
  seller_name?: string
  buyer_name?: string
}

interface MessageDB {
  id: string
  sender_id: string
  receiver_id: string
  message: string
  is_read: boolean
  created_at: string
  // Joined fields
  sender_name?: string
  sender_avatar?: string
}

export class DashboardService {
  /**
   * ========================================
   * USER DATA
   * ========================================
   */

  /**
   * Fetch current user with profile data
   */
  static async getCurrentUser(): Promise<{ success: boolean; data?: User; error?: string }> {
    try {
      // Get authenticated user
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError) {
        return { success: false, error: 'Not authenticated' }
      }
      
      if (!authUser) {
        return { success: false, error: 'No user found' }
      }

      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        return { success: false, error: 'Failed to load user profile' }
      }

      // Normalize role
      const normalizedRole = (profile.role || 'farmer').toLowerCase()

      const user: User = {
        id: profile.id,
        email: authUser.email || '',
        role: normalizedRole as 'farmer' | 'buyer' | 'both',
        firstname: profile.firstname || profile.first_name || '',
        lastname: profile.lastname || profile.last_name || '',
        username: profile.username || '',
        created_at: profile.created_at || authUser.created_at
      }

      return { success: true, data: user }
    } catch (error: any) {
      console.error('Error in getCurrentUser:', error)
      return { success: false, error: error.message || 'Failed to fetch user data' }
    }
  }

  /**
   * ========================================
   * FARMER DASHBOARD STATS
   * ========================================
   */

  /**
   * Get comprehensive stats for farmer dashboard
   */
  static async getFarmerStats(userId: string, timeRange: string = 'monthly'): Promise<{ success: boolean; data?: Stats; error?: string }> {
    try {
      console.log('📊 Fetching farmer stats for user:', userId, 'Time range:', timeRange)

      // Calculate date range
      const dateFrom = this.getDateFromTimeRange(timeRange)

      // Fetch all user's livestock listings
      const { data: listings, error: listingsError } = await supabase
        .from('livestock_listings')
        .select('*')
        .eq('user_id', userId)

      if (listingsError) {
        console.error('Error fetching listings:', listingsError)
        return { success: false, error: listingsError.message }
      }

      // Fetch transactions where user is seller
      const { data: transactions, error: transError } = await supabase
        .from('transactions')
        .select('*')
        .eq('seller_id', userId)
        .gte('created_at', dateFrom.toISOString())

      // Note: If transactions table doesn't exist yet, this will return an error
      // We'll handle it gracefully
      const salesData = transError ? [] : (transactions || [])

      // Fetch messages for user
      const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .eq('receiver_id', userId)

      const messagesData = msgError ? [] : (messages || [])

      // Calculate statistics
      const totalListings = listings?.length || 0
      const activeListings = listings?.filter(l => l.status === 'Available').length || 0
      const lowStockListings = listings?.filter(l => l.status === 'Low Stock').length || 0
      const outOfStockListings = listings?.filter(l => l.status === 'Out of Stock').length || 0

      // Revenue calculations
      const totalRevenue = salesData.reduce((sum, t) => sum + (t.total_amount || 0), 0)
      const totalOrders = salesData.length
      const pendingOrders = salesData.filter(t => t.status === 'pending').length || 0

      // Messages stats
      const totalMessages = messagesData.length
      const unreadMessages = messagesData.filter(m => !m.is_read).length

      // Calculate average price
      const totalPrice = listings?.reduce((sum, l) => sum + (l.price || 0), 0) || 0
      const averagePrice = totalListings > 0 ? Math.round(totalPrice / totalListings) : 0

      // Calculate total units (quantity)
      const totalUnits = listings?.reduce((sum, l) => sum + (l.quantity || 0), 0) || 0

      // Calculate growth metrics (comparing with previous period)
      const previousDateFrom = new Date(dateFrom)
      if (timeRange === 'monthly') {
        previousDateFrom.setMonth(previousDateFrom.getMonth() - 1)
      } else if (timeRange === 'quarterly') {
        previousDateFrom.setMonth(previousDateFrom.getMonth() - 3)
      }

      // Fetch previous period data for growth calculation
      const { data: previousListings } = await supabase
        .from('livestock_listings')
        .select('id')
        .eq('user_id', userId)
        .gte('created_at', previousDateFrom.toISOString())
        .lt('created_at', dateFrom.toISOString())

      const { data: previousTransactions } = await supabase
        .from('transactions')
        .select('total_amount')
        .eq('seller_id', userId)
        .gte('created_at', previousDateFrom.toISOString())
        .lt('created_at', dateFrom.toISOString())

      const previousRevenue = previousTransactions?.reduce((sum, t) => sum + (t.total_amount || 0), 0) || 0
      const previousListingsCount = previousListings?.length || 0

      // Calculate growth percentages
      const listingsGrowth = this.calculateGrowth(totalListings, previousListingsCount)
      const revenueGrowth = this.calculateGrowth(totalRevenue, previousRevenue)

      // Mock data for metrics that need more complex tracking
      const totalViews = Math.floor(totalListings * 14.25) // Simulated view count
      const conversionRate = totalOrders > 0 && totalViews > 0 
        ? parseFloat(((totalOrders / totalViews) * 100).toFixed(1))
        : 0

      const stats: Stats = {
        totalListings,
        activeListings,
        totalRevenue,
        totalOrders,
        pendingOrders,
        totalMessages,
        unreadMessages,
        rating: 4.5, // This would come from a reviews table
        totalReviews: 28, // This would come from a reviews table
        listingsGrowth,
        revenueGrowth,
        totalViews,
        averagePrice,
        priceGrowth: 8, // Would need historical price tracking
        totalUnits,
        unitsGrowth: 12, // Would need historical quantity tracking
        conversionRate,
        conversionGrowth: 3, // Would need historical conversion tracking
        statusBreakdown: {
          available: activeListings,
          lowStock: lowStockListings,
          outOfStock: outOfStockListings
        }
      }

      console.log('✅ Farmer stats calculated:', stats)
      return { success: true, data: stats }
    } catch (error: any) {
      console.error('Error in getFarmerStats:', error)
      return { success: false, error: error.message || 'Failed to fetch farmer stats' }
    }
  }

  /**
   * ========================================
   * BUYER DASHBOARD STATS
   * ========================================
   */

  /**
   * Get comprehensive stats for buyer dashboard
   */
  static async getBuyerStats(userId: string, timeRange: string = 'monthly'): Promise<{ success: boolean; data?: Stats; error?: string }> {
    try {
      console.log('📊 Fetching buyer stats for user:', userId, 'Time range:', timeRange)

      const dateFrom = this.getDateFromTimeRange(timeRange)

      // Fetch transactions where user is buyer
      const { data: transactions, error: transError } = await supabase
        .from('transactions')
        .select('*')
        .eq('buyer_id', userId)
        .gte('created_at', dateFrom.toISOString())

      const purchaseData = transError ? [] : (transactions || [])

      // Fetch messages for user
      const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .eq('receiver_id', userId)

      const messagesData = msgError ? [] : (messages || [])

      // Calculate statistics
      const totalOrders = purchaseData.length
      const pendingOrders = purchaseData.filter(t => t.status === 'pending' || t.status === 'processing').length
      const completedOrders = purchaseData.filter(t => t.status === 'completed').length
      const processingOrders = purchaseData.filter(t => t.status === 'processing').length
      const shippedOrders = purchaseData.filter(t => t.status === 'shipped').length

      // Spending calculations
      const totalSpent = purchaseData.reduce((sum, t) => sum + (t.total_amount || 0), 0)
      const averagePrice = totalOrders > 0 ? Math.round(totalSpent / totalOrders) : 0

      // Messages stats
      const totalMessages = messagesData.length
      const unreadMessages = messagesData.filter(m => !m.is_read).length

      // Calculate growth metrics
      const previousDateFrom = new Date(dateFrom)
      if (timeRange === 'monthly') {
        previousDateFrom.setMonth(previousDateFrom.getMonth() - 1)
      } else if (timeRange === 'quarterly') {
        previousDateFrom.setMonth(previousDateFrom.getMonth() - 3)
      }

      const { data: previousTransactions } = await supabase
        .from('transactions')
        .select('total_amount')
        .eq('buyer_id', userId)
        .gte('created_at', previousDateFrom.toISOString())
        .lt('created_at', dateFrom.toISOString())

      const previousSpent = previousTransactions?.reduce((sum, t) => sum + (t.total_amount || 0), 0) || 0
      const previousOrdersCount = previousTransactions?.length || 0

      const ordersGrowth = this.calculateGrowth(totalOrders, previousOrdersCount)
      
      // Calculate savings percentage (comparing to average market price)
      // This is simulated - would need actual market data
      const savingsPercentage = 12

      // Calculate orders per month
      const monthsDiff = Math.max(1, this.getMonthsDifference(dateFrom, new Date()))
      const ordersPerMonth = Math.round(totalOrders / monthsDiff)

      // Determine preferred category
      const categoryCount: Record<string, number> = {}
      purchaseData.forEach(t => {
        const type = t.listing_type || 'Unknown'
        categoryCount[type] = (categoryCount[type] || 0) + 1
      })

      const preferredCategory = Object.entries(categoryCount)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || 'Cattle'
      
      const categoryPercentage = totalOrders > 0
        ? Math.round((categoryCount[preferredCategory] / totalOrders) * 100)
        : 0

      const stats: Stats = {
        totalOrders,
        pendingOrders,
        totalSpent,
        totalMessages,
        unreadMessages,
        rating: 4.8, // Would come from reviews table
        totalReviews: 15, // Would come from reviews table
        ordersGrowth,
        savingsPercentage,
        averagePrice,
        priceGrowth: -5, // Negative means savings increased
        ordersPerMonth,
        orderFrequencyGrowth: 15,
        preferredCategory,
        categoryPercentage,
        statusBreakdown: {
          completed: completedOrders,
          processing: processingOrders,
          shipped: shippedOrders
        }
      }

      console.log('✅ Buyer stats calculated:', stats)
      return { success: true, data: stats }
    } catch (error: any) {
      console.error('Error in getBuyerStats:', error)
      return { success: false, error: error.message || 'Failed to fetch buyer stats' }
    }
  }

  /**
   * ========================================
   * TABLE DATA
   * ========================================
   */

  /**
   * Get recent livestock listings for farmer
   */
  static async getFarmerTableData(userId: string, limit: number = 10): Promise<{ success: boolean; data?: TableItem[]; error?: string }> {
    try {
      console.log('📋 Fetching farmer table data for user:', userId)

      const { data: listings, error } = await supabase
        .from('livestock_listings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching listings:', error)
        return { success: false, error: error.message }
      }

      const tableData: TableItem[] = (listings || []).map(listing => ({
        id: listing.id,
        name: listing.title,
        type: listing.type,
        price: `₱${this.formatNumber(listing.price)}`,
        status: listing.status,
        statusClass: this.getStatusClass(listing.status),
        stock: listing.quantity,
        date: this.formatDate(listing.created_at),
        image: listing.images?.[0] || 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=100'
      }))

      console.log(`✅ Fetched ${tableData.length} table items`)
      return { success: true, data: tableData }
    } catch (error: any) {
      console.error('Error in getFarmerTableData:', error)
      return { success: false, error: error.message || 'Failed to fetch table data' }
    }
  }

  /**
   * Get recent purchases for buyer
   */
  static async getBuyerTableData(userId: string, limit: number = 10): Promise<{ success: boolean; data?: TableItem[]; error?: string }> {
    try {
      console.log('📋 Fetching buyer table data for user:', userId)

      // Fetch transactions with joined listing and seller data
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select(`
          *,
          livestock_listings:listing_id (
            title,
            type,
            images,
            user_id
          ),
          profiles:seller_id (
            firstname,
            lastname,
            username
          )
        `)
        .eq('buyer_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching transactions:', error)
        
        // If transactions table doesn't exist, return empty array with helpful message
        if (error.code === '42P01') {
          console.warn('⚠️ Transactions table does not exist yet. Returning empty data.')
          return { success: true, data: [] }
        }
        
        return { success: false, error: error.message }
      }

      const tableData: TableItem[] = (transactions || []).map(transaction => {
        const listing = transaction.livestock_listings as any
        const seller = transaction.profiles as any
        
        const sellerName = seller?.firstname && seller?.lastname
          ? `${seller.firstname} ${seller.lastname}`
          : seller?.username || 'Unknown Seller'

        return {
          id: transaction.id,
          livestock: listing?.title || 'Unknown Livestock',
          type: listing?.type || 'Unknown',
          seller: sellerName,
          amount: `₱${this.formatNumber(transaction.total_amount)}`,
          date: this.formatDate(transaction.created_at),
          status: this.capitalizeFirst(transaction.status),
          statusClass: this.getStatusClass(transaction.status),
          image: listing?.images?.[0] || 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=100'
        }
      })

      console.log(`✅ Fetched ${tableData.length} transaction items`)
      return { success: true, data: tableData }
    } catch (error: any) {
      console.error('Error in getBuyerTableData:', error)
      return { success: false, error: error.message || 'Failed to fetch table data' }
    }
  }

  /**
   * ========================================
   * MESSAGES
   * ========================================
   */

  /**
   * Get recent messages for user
   */
  static async getRecentMessages(userId: string, limit: number = 10): Promise<{ success: boolean; data?: Message[]; error?: string }> {
    try {
      console.log('💬 Fetching messages for user:', userId)

      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id (
            firstname,
            lastname,
            username,
            profile_picture
          )
        `)
        .eq('receiver_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching messages:', error)
        
        // If messages table doesn't exist, return empty array
        if (error.code === '42P01') {
          console.warn('⚠️ Messages table does not exist yet. Returning empty data.')
          return { success: true, data: [] }
        }
        
        return { success: false, error: error.message }
      }

      const messageData: Message[] = (messages || []).map(msg => {
        const sender = msg.sender as any
        
        const senderName = sender?.firstname && sender?.lastname
          ? `${sender.firstname} ${sender.lastname}`
          : sender?.username || 'Unknown User'

        return {
          id: msg.id,
          name: senderName,
          message: msg.message,
          time: this.getTimeAgo(msg.created_at),
          avatar: sender?.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender_id}`,
          unread: !msg.is_read
        }
      })

      console.log(`✅ Fetched ${messageData.length} messages`)
      return { success: true, data: messageData }
    } catch (error: any) {
      console.error('Error in getRecentMessages:', error)
      return { success: false, error: error.message || 'Failed to fetch messages' }
    }
  }

  /**
   * ========================================
   * UTILITY FUNCTIONS
   * ========================================
   */

  /**
   * Get date from time range
   */
  private static getDateFromTimeRange(timeRange: string): Date {
    const now = new Date()
    const date = new Date()

    switch (timeRange) {
      case 'weekly':
        date.setDate(now.getDate() - 7)
        break
      case 'monthly':
        date.setMonth(now.getMonth() - 1)
        break
      case 'quarterly':
        date.setMonth(now.getMonth() - 3)
        break
      case 'yearly':
        date.setFullYear(now.getFullYear() - 1)
        break
      default:
        date.setMonth(now.getMonth() - 1)
    }

    return date
  }

  /**
   * Calculate growth percentage
   */
  private static calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  /**
   * Get months difference between two dates
   */
  private static getMonthsDifference(date1: Date, date2: Date): number {
    return Math.max(1, 
      (date2.getFullYear() - date1.getFullYear()) * 12 + 
      (date2.getMonth() - date1.getMonth())
    )
  }

  /**
   * Format number with commas
   */
  private static formatNumber(num: number): string {
    return num.toLocaleString('en-PH')
  }

  /**
   * Format date to readable string
   */
  private static formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  /**
   * Get time ago string
   */
  private static getTimeAgo(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
    return this.formatDate(dateString)
  }

  /**
   * Get status class for badges
   */
  private static getStatusClass(status: string): string {
    const statusLower = status.toLowerCase()
    
    if (statusLower === 'available' || statusLower === 'completed') {
      return 'bg-green-100 text-green-800'
    }
    if (statusLower === 'low stock' || statusLower === 'processing') {
      return 'bg-yellow-100 text-yellow-800'
    }
    if (statusLower === 'out of stock' || statusLower === 'cancelled') {
      return 'bg-red-100 text-red-800'
    }
    if (statusLower === 'pending' || statusLower === 'shipped') {
      return 'bg-blue-100 text-blue-800'
    }
    
    return 'bg-gray-100 text-gray-800'
  }

  /**
   * Capitalize first letter
   */
  private static capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * ========================================
   * MAIN DASHBOARD DATA LOADER
   * ========================================
   */

  /**
   * Load all dashboard data for a user
   */
  static async loadDashboardData(userId: string, role: string, timeRange: string = 'monthly'): Promise<{
    success: boolean
    stats?: Stats
    tableData?: TableItem[]
    messages?: Message[]
    error?: string
  }> {
    try {
      console.log('🚀 Loading dashboard data for user:', userId, 'Role:', role)

      // Determine which stats to fetch based on role
      const statsPromise = role === 'buyer' 
        ? this.getBuyerStats(userId, timeRange)
        : this.getFarmerStats(userId, timeRange)

      // Determine which table data to fetch
      const tableDataPromise = role === 'buyer'
        ? this.getBuyerTableData(userId, 10)
        : this.getFarmerTableData(userId, 10)

      // Fetch messages
      const messagesPromise = this.getRecentMessages(userId, 10)

      // Execute all promises in parallel
      const [statsResult, tableResult, messagesResult] = await Promise.all([
        statsPromise,
        tableDataPromise,
        messagesPromise
      ])

      // Check for errors
      if (!statsResult.success) {
        return { success: false, error: statsResult.error }
      }

      // Table and messages errors are non-critical
      const tableData = tableResult.success ? tableResult.data : []
      const messages = messagesResult.success ? messagesResult.data : []

      console.log('✅ Dashboard data loaded successfully')

      return {
        success: true,
        stats: statsResult.data,
        tableData,
        messages
      }
    } catch (error: any) {
      console.error('Error in loadDashboardData:', error)
      return {
        success: false,
        error: error.message || 'Failed to load dashboard data'
      }
    }
  }
}