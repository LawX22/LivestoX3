// services/notificationsService.ts - WITH TRANSACTION NOTIFICATIONS
import { supabase } from '@/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'
import { MessagesService } from './messagesService'
import { forumService } from './forumService'

// ===== TYPES =====
export interface Notification {
  id: string
  type: 'order' | 'payment' | 'system' | 'message' | 'reminder' | 'listing' | 'forum' | 'transaction'
  title: string
  message: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  referenceId?: string
  referenceType?: string
  createdAt: Date
  metadata?: {
    orderNumber?: string
    orderStatus?: string
    amount?: number
    buyerName?: string
    farmerName?: string
    animalTitle?: string
  }
}

interface NotificationState {
  readIds: string[]
  lastChecked: {
    messages: string
    forum: string
    listings: string
    transactions: string
  }
}

export class NotificationsService {
  private static readonly STORAGE_KEY = 'app_notifications_state'
  private static activeSubscriptions: Map<string, RealtimeChannel> = new Map()

  /**
   * Get notification state from localStorage
   */
  private static getState(): NotificationState {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading notification state:', error)
    }

    return {
      readIds: [],
      lastChecked: {
        messages: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        forum: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        listings: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        transactions: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    }
  }

  /**
   * Save notification state to localStorage
   */
  private static saveState(state: NotificationState): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Error saving notification state:', error)
    }
  }

  /**
   * Generate notification ID from source data
   */
  private static generateId(type: string, sourceId: string): string {
    return `${type}-${sourceId}`
  }

  /**
   * Check if notification is read
   */
  private static isRead(notificationId: string): boolean {
    const state = this.getState()
    return state.readIds.includes(notificationId)
  }

  /**
   * Get notifications from messages
   */
  private static async getMessageNotifications(userId: string): Promise<Notification[]> {
    try {
      const result = await MessagesService.getConversations(userId)
      
      if (!result.success || !result.data) {
        return []
      }

      const notifications: Notification[] = []
      const state = this.getState()

      for (const conversation of result.data) {
        if (conversation.unreadCount > 0 && conversation.lastMessage) {
          const lastMsg = conversation.lastMessage
          
          if (lastMsg.senderId === userId) continue

          const notifId = this.generateId('message', lastMsg.id)
          
          if (lastMsg.createdAt < new Date(state.lastChecked.messages)) {
            continue
          }

          const otherUser = conversation.users.find(u => u.id !== userId)
          const userName = otherUser?.name || 'Someone'

          notifications.push({
            id: notifId,
            type: 'message',
            title: `New message from ${userName}`,
            message: lastMsg.content.substring(0, 100) + (lastMsg.content.length > 100 ? '...' : ''),
            read: this.isRead(notifId),
            priority: 'medium',
            referenceId: conversation.id,
            referenceType: 'conversation',
            createdAt: lastMsg.createdAt
          })
        }
      }

      return notifications
    } catch (error) {
      console.error('Error getting message notifications:', error)
      return []
    }
  }

  /**
   * Get notifications from forum (answers to your questions)
   */
  private static async getForumNotifications(userId: string): Promise<Notification[]> {
    try {
      const questions = await forumService.getQuestions(userId)
      const notifications: Notification[] = []
      const state = this.getState()

      for (const question of questions) {
        if (question.userId !== userId) continue

        for (const answer of question.answers) {
          if (answer.userId === userId) continue

          const notifId = this.generateId('forum', answer.id.toString())
          const answerDate = new Date(answer.createdAt)

          if (answerDate < new Date(state.lastChecked.forum)) {
            continue
          }

          notifications.push({
            id: notifId,
            type: 'forum',
            title: 'New answer to your question',
            message: `${answer.userFullName} answered: "${answer.text.substring(0, 100)}${answer.text.length > 100 ? '...' : ''}"`,
            read: this.isRead(notifId),
            priority: 'medium',
            referenceId: question.id.toString(),
            referenceType: 'forum_question',
            createdAt: answerDate
          })
        }
      }

      return notifications
    } catch (error) {
      console.error('Error getting forum notifications:', error)
      return []
    }
  }

  /**
   * Get notifications for listing updates (for farmers)
   */
  private static async getListingNotifications(userId: string): Promise<Notification[]> {
    try {
      const { data, error } = await supabase
        .from('livestock_listings')
        .select('id, title, quantity, status, updated_at')
        .eq('user_id', userId)
        .in('status', ['Low Stock', 'Out of Stock'])

      if (error || !data) {
        return []
      }

      const notifications: Notification[] = []
      const state = this.getState()

      for (const listing of data) {
        const notifId = this.generateId('listing', listing.id)
        const updatedAt = new Date(listing.updated_at)

        if (updatedAt < new Date(state.lastChecked.listings)) {
          continue
        }

        const priority = listing.status === 'Out of Stock' ? 'high' : 'medium'
        const title = listing.status === 'Out of Stock' 
          ? 'Livestock Out of Stock' 
          : 'Low Stock Alert'
        
        notifications.push({
          id: notifId,
          type: 'listing',
          title,
          message: `${listing.title} - Current quantity: ${listing.quantity}`,
          read: this.isRead(notifId),
          priority,
          referenceId: listing.id,
          referenceType: 'livestock_listing',
          createdAt: updatedAt
        })
      }

      return notifications
    } catch (error) {
      console.error('Error getting listing notifications:', error)
      return []
    }
  }

  /**
   * ✅ NEW: Get transaction notifications (for both farmers and buyers)
   */
  private static async getTransactionNotifications(userId: string): Promise<Notification[]> {
    try {
      const notifications: Notification[] = []
      const state = this.getState()

      // Get orders where user is the buyer
      const { data: buyerOrders, error: buyerError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            livestock_listings (
              id,
              title,
              user_id,
              profiles:user_id (
                first_name,
                last_name,
                username
              )
            )
          )
        `)
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      if (!buyerError && buyerOrders) {
        for (const order of buyerOrders) {
          const updatedAt = new Date(order.updated_at)
          
          if (updatedAt < new Date(state.lastChecked.transactions)) {
            continue
          }

          // Get first item details
          const firstItem = order.order_items?.[0]
          const listing = firstItem?.livestock_listings
          const farmerProfile = listing?.profiles
          
          const farmerName = farmerProfile?.first_name && farmerProfile?.last_name
            ? `${farmerProfile.first_name} ${farmerProfile.last_name}`
            : farmerProfile?.username || 'Farmer'

          const notifId = this.generateId('transaction-buyer', order.order_number)

          // Create notification based on order status
          let title = ''
          let message = ''
          let priority: 'low' | 'medium' | 'high' = 'medium'

          switch (order.status) {
            case 'confirmed':
              title = '✅ Order Confirmed'
              message = `${farmerName} confirmed your order #${order.order_number}`
              priority = 'high'
              break
            case 'processing':
              title = '📦 Order Processing'
              message = `Your order #${order.order_number} is being prepared`
              break
            case 'packed':
              title = '📦 Order Packed'
              message = `Your order #${order.order_number} is packed and ready`
              break
            case 'shipped':
              title = '🚚 Order Shipped'
              message = `Your order #${order.order_number} has been shipped`
              priority = 'high'
              break
            case 'ready_for_pickup':
              title = '✅ Ready for Pickup'
              message = `Your order #${order.order_number} is ready for pickup at ${farmerName}'s farm`
              priority = 'high'
              break
            case 'delivered':
            case 'completed':
              title = '✅ Order Delivered'
              message = `Your order #${order.order_number} has been delivered`
              priority = 'high'
              break
            case 'cancelled':
              title = '❌ Order Cancelled'
              message = `Order #${order.order_number} has been cancelled`
              priority = 'high'
              break
            default:
              continue // Skip pending status
          }

          if (title) {
            notifications.push({
              id: notifId,
              type: 'transaction',
              title,
              message,
              read: this.isRead(notifId),
              priority,
              referenceId: order.order_number,
              referenceType: 'order',
              createdAt: updatedAt,
              metadata: {
                orderNumber: order.order_number,
                orderStatus: order.status,
                amount: order.total_amount,
                farmerName,
                animalTitle: listing?.title
              }
            })
          }
        }
      }

      // Get orders where user is the farmer (seller)
      const { data: farmerOrders, error: farmerError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items!inner (
            *,
            livestock_listings!inner (
              id,
              title,
              user_id
            )
          ),
          profiles:user_id (
            first_name,
            last_name,
            username
          )
        `)
        .eq('order_items.livestock_listings.user_id', userId)
        .order('updated_at', { ascending: false })

      if (!farmerError && farmerOrders) {
        for (const order of farmerOrders) {
          const updatedAt = new Date(order.updated_at)
          
          if (updatedAt < new Date(state.lastChecked.transactions)) {
            continue
          }

          const buyerProfile = order.profiles
          const buyerName = buyerProfile?.first_name && buyerProfile?.last_name
            ? `${buyerProfile.first_name} ${buyerProfile.last_name}`
            : buyerProfile?.username || 'Buyer'

          const firstItem = order.order_items?.[0]
          const listing = firstItem?.livestock_listings

          const notifId = this.generateId('transaction-farmer', order.order_number)

          // Create notification for farmers
          let title = ''
          let message = ''
          let priority: 'low' | 'medium' | 'high' = 'medium'

          switch (order.status) {
            case 'pending':
              title = '🔔 New Order Received'
              message = `${buyerName} placed an order #${order.order_number} - ₱${order.total_amount.toLocaleString()}`
              priority = 'high'
              break
            case 'cancelled':
              title = '❌ Order Cancelled'
              message = `${buyerName} cancelled order #${order.order_number}`
              priority = 'high'
              break
            case 'completed':
              title = '✅ Order Completed'
              message = `Order #${order.order_number} has been completed - ₱${order.total_amount.toLocaleString()}`
              priority = 'medium'
              break
            default:
              continue // Skip other statuses for farmers
          }

          if (title) {
            notifications.push({
              id: notifId,
              type: 'transaction',
              title,
              message,
              read: this.isRead(notifId),
              priority,
              referenceId: order.order_number,
              referenceType: 'order',
              createdAt: updatedAt,
              metadata: {
                orderNumber: order.order_number,
                orderStatus: order.status,
                amount: order.total_amount,
                buyerName,
                animalTitle: listing?.title
              }
            })
          }
        }
      }

      return notifications
    } catch (error) {
      console.error('Error getting transaction notifications:', error)
      return []
    }
  }

  /**
   * Get all notifications for current user
   */
  static async getNotifications(): Promise<{ success: boolean; data?: Notification[]; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📋 Generating notifications from existing data...')

      // Fetch from all sources in parallel
      const [messageNotifs, forumNotifs, listingNotifs, transactionNotifs] = await Promise.all([
        this.getMessageNotifications(user.id),
        this.getForumNotifications(user.id),
        this.getListingNotifications(user.id),
        this.getTransactionNotifications(user.id)
      ])

      // Combine and sort by date (newest first)
      const allNotifications = [
        ...messageNotifs,
        ...forumNotifs,
        ...listingNotifs,
        ...transactionNotifs
      ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

      console.log(`✅ Generated ${allNotifications.length} notifications`)

      return { success: true, data: allNotifications }
    } catch (error: any) {
      console.error('❌ Error in getNotifications:', error)
      return { success: false, error: error.message || 'Failed to get notifications' }
    }
  }

  /**
   * Get unread notification count
   */
  static async getUnreadCount(): Promise<{ success: boolean; count?: number; error?: string }> {
    try {
      const result = await this.getNotifications()
      
      if (!result.success || !result.data) {
        return { success: false, error: result.error }
      }

      const unreadCount = result.data.filter(n => !n.read).length

      return { success: true, count: unreadCount }
    } catch (error: any) {
      console.error('❌ Error in getUnreadCount:', error)
      return { success: false, error: error.message || 'Failed to get unread count' }
    }
  }

  /**
   * Mark notification as read
   */
  static markAsRead(notificationId: string): { success: boolean; error?: string } {
    try {
      const state = this.getState()
      
      if (!state.readIds.includes(notificationId)) {
        state.readIds.push(notificationId)
        this.saveState(state)
      }

      return { success: true }
    } catch (error: any) {
      console.error('❌ Error in markAsRead:', error)
      return { success: false, error: error.message || 'Failed to mark as read' }
    }
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await this.getNotifications()
      
      if (!result.success || !result.data) {
        return { success: false, error: result.error }
      }

      const state = this.getState()
      
      result.data.forEach(notification => {
        if (!state.readIds.includes(notification.id)) {
          state.readIds.push(notification.id)
        }
      })

      this.saveState(state)

      return { success: true }
    } catch (error: any) {
      console.error('❌ Error in markAllAsRead:', error)
      return { success: false, error: error.message || 'Failed to mark all as read' }
    }
  }

  /**
   * Toggle read status
   */
  static toggleRead(notificationId: string): { success: boolean; error?: string } {
    try {
      const state = this.getState()
      const index = state.readIds.indexOf(notificationId)

      if (index > -1) {
        state.readIds.splice(index, 1)
      } else {
        state.readIds.push(notificationId)
      }

      this.saveState(state)

      return { success: true }
    } catch (error: any) {
      console.error('❌ Error in toggleRead:', error)
      return { success: false, error: error.message || 'Failed to toggle read status' }
    }
  }

  /**
   * Clear all notifications (just marks all as read and updates last checked)
   */
  static async clearAll(): Promise<{ success: boolean; error?: string }> {
    try {
      const now = new Date().toISOString()
      const state: NotificationState = {
        readIds: [],
        lastChecked: {
          messages: now,
          forum: now,
          listings: now,
          transactions: now
        }
      }

      this.saveState(state)

      return { success: true }
    } catch (error: any) {
      console.error('❌ Error in clearAll:', error)
      return { success: false, error: error.message || 'Failed to clear notifications' }
    }
  }

  /**
   * Update last checked timestamp
   */
  static updateLastChecked(): void {
    const state = this.getState()
    const now = new Date().toISOString()
    
    state.lastChecked = {
      messages: now,
      forum: now,
      listings: now,
      transactions: now
    }

    this.saveState(state)
  }

  /**
   * Subscribe to real-time updates for new notifications
   */
  static subscribeToUpdates(
    userId: string,
    onNewNotification: (notification: Notification) => void
  ): { unsubscribe: () => void } {
    console.log('🔴 Subscribing to notification updates')

    // Subscribe to messages
    const messagesChannel = MessagesService.subscribeToConversations(
      userId,
      async (conversationId, message) => {
        if (message.senderId === userId) return

        const result = await MessagesService.getConversation(conversationId, userId)
        if (result.success && result.data) {
          const otherUser = result.data.users.find(u => u.id !== userId)
          const notifId = this.generateId('message', message.id)

          onNewNotification({
            id: notifId,
            type: 'message',
            title: `New message from ${otherUser?.name || 'Someone'}`,
            message: message.content.substring(0, 100),
            read: false,
            priority: 'medium',
            referenceId: conversationId,
            referenceType: 'conversation',
            createdAt: message.createdAt
          })
        }
      },
      () => {}
    )

    // Subscribe to forum answers
    const forumChannel = supabase
      .channel('forum-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'forum_answers'
        },
        async (payload) => {
          const answer = payload.new as any

          const { data: question } = await supabase
            .from('forum_questions')
            .select('id, title, user_id')
            .eq('id', answer.question_id)
            .single()

          if (question && question.user_id === userId && answer.user_id !== userId) {
            const notifId = this.generateId('forum', answer.id.toString())

            onNewNotification({
              id: notifId,
              type: 'forum',
              title: 'New answer to your question',
              message: `Someone answered: "${answer.text.substring(0, 100)}"`,
              read: false,
              priority: 'medium',
              referenceId: question.id.toString(),
              referenceType: 'forum_question',
              createdAt: new Date(answer.created_at)
            })
          }
        }
      )
      .subscribe()

    // Subscribe to livestock listing changes
    const listingsChannel = supabase
      .channel('listings-notifications')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'livestock_listings',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          const listing = payload.new as any

          if (listing.status === 'Low Stock' || listing.status === 'Out of Stock') {
            const notifId = this.generateId('listing', listing.id)

            onNewNotification({
              id: notifId,
              type: 'listing',
              title: listing.status === 'Out of Stock' ? 'Livestock Out of Stock' : 'Low Stock Alert',
              message: `${listing.title} - Current quantity: ${listing.quantity}`,
              read: false,
              priority: listing.status === 'Out of Stock' ? 'high' : 'medium',
              referenceId: listing.id,
              referenceType: 'livestock_listing',
              createdAt: new Date(listing.updated_at)
            })
          }
        }
      )
      .subscribe()

    // ✅ NEW: Subscribe to order/transaction updates
    const ordersChannel = supabase
      .channel('orders-notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        async (payload) => {
          const order = payload.new as any
          const isUpdate = payload.eventType === 'UPDATE'
          const isInsert = payload.eventType === 'INSERT'

          if (!isUpdate && !isInsert) return

          // Fetch order details with relations
          const { data: fullOrder } = await supabase
            .from('orders')
            .select(`
              *,
              order_items (
                *,
                livestock_listings (
                  id,
                  title,
                  user_id,
                  profiles:user_id (
                    first_name,
                    last_name,
                    username
                  )
                )
              ),
              profiles:user_id (
                first_name,
                last_name,
                username
              )
            `)
            .eq('order_number', order.order_number)
            .single()

          if (!fullOrder) return

          const firstItem = fullOrder.order_items?.[0]
          const listing = firstItem?.livestock_listings
          const farmerId = listing?.user_id

          // Notification for BUYER (order status updates)
          if (fullOrder.user_id === userId && isUpdate) {
            const farmerProfile = listing?.profiles
            const farmerName = farmerProfile?.first_name && farmerProfile?.last_name
              ? `${farmerProfile.first_name} ${farmerProfile.last_name}`
              : farmerProfile?.username || 'Farmer'

            let title = ''
            let message = ''
            let priority: 'low' | 'medium' | 'high' = 'medium'

            switch (order.status) {
              case 'confirmed':
                title = '✅ Order Confirmed'
                message = `${farmerName} confirmed your order #${order.order_number}`
                priority = 'high'
                break
              case 'processing':
                title = '📦 Order Processing'
                message = `Your order #${order.order_number} is being prepared`
                break
              case 'shipped':
                title = '🚚 Order Shipped'
                message = `Your order #${order.order_number} has been shipped`
                priority = 'high'
                break
              case 'ready_for_pickup':
                title = '✅ Ready for Pickup'
                message = `Your order #${order.order_number} is ready for pickup`
                priority = 'high'
                break
              case 'delivered':
              case 'completed':
                title = '✅ Order Delivered'
                message = `Your order #${order.order_number} has been delivered`
                priority = 'high'
                break
              case 'cancelled':
                title = '❌ Order Cancelled'
                message = `Order #${order.order_number} has been cancelled`
                priority = 'high'
                break
            }

            if (title) {
              const notifId = this.generateId('transaction-buyer', `${order.order_number}-${order.status}`)
              
              onNewNotification({
                id: notifId,
                type: 'transaction',
                title,
                message,
                read: false,
                priority,
                referenceId: order.order_number,
                referenceType: 'order',
                createdAt: new Date(order.updated_at),
                metadata: {
                  orderNumber: order.order_number,
                  orderStatus: order.status,
                  amount: order.total_amount,
                  farmerName,
                  animalTitle: listing?.title
                }
              })
            }
          }

          // Notification for FARMER (new orders and cancellations)
          if (farmerId === userId) {
            const buyerProfile = fullOrder.profiles
            const buyerName = buyerProfile?.first_name && buyerProfile?.last_name
              ? `${buyerProfile.first_name} ${buyerProfile.last_name}`
              : buyerProfile?.username || 'Buyer'

            let title = ''
            let message = ''
            let priority: 'low' | 'medium' | 'high' = 'medium'

            if (isInsert && order.status === 'pending') {
              title = '🔔 New Order Received'
              message = `${buyerName} placed an order #${order.order_number} - ₱${order.total_amount.toLocaleString()}`
              priority = 'high'
            } else if (isUpdate && order.status === 'cancelled') {
              title = '❌ Order Cancelled'
              message = `${buyerName} cancelled order #${order.order_number}`
              priority = 'high'
            } else if (isUpdate && order.status === 'completed') {
              title = '✅ Order Completed'
              message = `Order #${order.order_number} has been completed - ₱${order.total_amount.toLocaleString()}`
              priority = 'medium'
            }

            if (title) {
              const notifId = this.generateId('transaction-farmer', `${order.order_number}-${order.status}`)
              
              onNewNotification({
                id: notifId,
                type: 'transaction',
                title,
                message,
                read: false,
                priority,
                referenceId: order.order_number,
                referenceType: 'order',
                createdAt: new Date(order.updated_at),
                metadata: {
                  orderNumber: order.order_number,
                  orderStatus: order.status,
                  amount: order.total_amount,
                  buyerName,
                  animalTitle: listing?.title
                }
              })
            }
          }
        }
      )
      .subscribe()

    this.activeSubscriptions.set('messages', messagesChannel)
    this.activeSubscriptions.set('forum', forumChannel)
    this.activeSubscriptions.set('listings', listingsChannel)
    this.activeSubscriptions.set('orders', ordersChannel)

    return {
      unsubscribe: () => {
        console.log('🔵 Unsubscribing from notification updates')
        supabase.removeChannel(messagesChannel)
        supabase.removeChannel(forumChannel)
        supabase.removeChannel(listingsChannel)
        supabase.removeChannel(ordersChannel)
        this.activeSubscriptions.clear()
      }
    }
  }

  /**
   * Cleanup all subscriptions
   */
  static cleanup(): void {
    console.log('🔵 Cleaning up notification subscriptions')
    this.activeSubscriptions.forEach((channel) => {
      supabase.removeChannel(channel)
    })
    this.activeSubscriptions.clear()
  }

  /**
   * Create manual notification (for system notifications)
   */
  static createManualNotification(
    title: string,
    message: string,
    options: {
      type?: Notification['type']
      priority?: Notification['priority']
      referenceId?: string
      referenceType?: string
      metadata?: Notification['metadata']
    } = {}
  ): Notification {
    const notifId = this.generateId('system', Date.now().toString())

    return {
      id: notifId,
      type: options.type || 'system',
      title,
      message,
      read: false,
      priority: options.priority || 'medium',
      referenceId: options.referenceId,
      referenceType: options.referenceType,
      createdAt: new Date(),
      metadata: options.metadata
    }
  }
}