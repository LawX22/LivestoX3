// services/notificationsService.ts 
import { supabase } from '@/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'
import { MessagesService } from './messagesService'
import { forumService } from './forumService'

// ===== TYPES =====
export interface Notification {
  id: string
  type: 'order' | 'payment' | 'system' | 'message' | 'reminder' | 'listing' | 'forum'
  title: string
  message: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  referenceId?: string
  referenceType?: string
  createdAt: Date
}

interface NotificationState {
  readIds: string[]
  lastChecked: {
    messages: string
    forum: string
    listings: string
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
        messages: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Start 24h ago
        forum: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        listings: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
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
        // Only create notifications for unread messages from others
        if (conversation.unreadCount > 0 && conversation.lastMessage) {
          const lastMsg = conversation.lastMessage
          
          // Don't notify about own messages
          if (lastMsg.senderId === userId) continue

          const notifId = this.generateId('message', lastMsg.id)
          
          // Skip if created before last check (only show new messages)
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
        // Only notify about answers to YOUR questions
        if (question.userId !== userId) continue

        for (const answer of question.answers) {
          // Don't notify about your own answers
          if (answer.userId === userId) continue

          const notifId = this.generateId('forum', answer.id.toString())
          const answerDate = new Date(answer.createdAt)

          // Skip if created before last check
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
      // Check if user has any low stock listings
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

        // Skip if updated before last check
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
      const [messageNotifs, forumNotifs, listingNotifs] = await Promise.all([
        this.getMessageNotifications(user.id),
        this.getForumNotifications(user.id),
        this.getListingNotifications(user.id)
      ])

      // Combine and sort by date (newest first)
      const allNotifications = [
        ...messageNotifs,
        ...forumNotifs,
        ...listingNotifs
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
          listings: now
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
      listings: now
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
        if (message.senderId === userId) return // Skip own messages

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
      () => {} // onConversationUpdate - not needed
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

          // Check if this is an answer to user's question
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

    // Subscribe to livestock listing changes (for farmers)
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

    this.activeSubscriptions.set('messages', messagesChannel)
    this.activeSubscriptions.set('forum', forumChannel)
    this.activeSubscriptions.set('listings', listingsChannel)

    return {
      unsubscribe: () => {
        console.log('🔵 Unsubscribing from notification updates')
        supabase.removeChannel(messagesChannel)
        supabase.removeChannel(forumChannel)
        supabase.removeChannel(listingsChannel)
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
      createdAt: new Date()
    }
  }
}