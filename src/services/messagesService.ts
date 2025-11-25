// services/messagesService.ts - FIXED VERSION (No Infinite Recursion)
import { supabase } from '@/supabase'
import type { 
  Conversation, 
  Message, 
  User,
  MessageDB,
  CreateConversationParams,
  SendMessageParams,
  GetMessagesParams,
  GetMessagesResult
} from '../types/messages'
import { RealtimeChannel } from '@supabase/supabase-js'

/**
 * MessagesService - Handles all messaging functionality
 * FIXED: Removed infinite recursion issues with RLS policies
 */
export class MessagesService {
  private static activeSubscriptions: Map<string, RealtimeChannel> = new Map()

  /**
   * Start a conversation about a listing (simplified interface for ContactFarmerModal)
   * @param recipientId - The farmer's user ID
   * @param listingId - The livestock listing ID
   * @param initialMessage - The first message to send
   * @returns Promise with success status and conversation ID
   */
  static async startConversationAboutListing(
    recipientId: string,
    listingId: string,
    initialMessage: string
  ): Promise<{ success: boolean; conversationId?: string; error?: string }> {
    try {
      console.log('📤 Starting conversation about listing...')
      console.log('   Recipient ID:', recipientId)
      console.log('   Listing ID:', listingId)

      // Get current authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        console.error('❌ Not authenticated:', userError)
        return { success: false, error: 'You must be logged in to send messages' }
      }

      // Don't allow messaging yourself
      if (user.id === recipientId) {
        return { success: false, error: 'You cannot message yourself' }
      }

      console.log('✅ Current user:', user.id)

      // Get or create conversation
      const convResult = await this.getOrCreateConversation(user.id, recipientId, listingId)
      
      if (!convResult.success || !convResult.data) {
        console.error('❌ Failed to get/create conversation:', convResult.error)
        return { success: false, error: convResult.error || 'Failed to create conversation' }
      }

      const conversationId = convResult.data
      console.log('✅ Conversation ready:', conversationId)

      // Send the initial message
      const messageResult = await this.sendMessage({
        conversationId,
        content: initialMessage
      })

      if (!messageResult.success) {
        console.error('❌ Failed to send message:', messageResult.error)
        return { success: false, error: messageResult.error || 'Failed to send message' }
      }

      console.log('✅ Message sent successfully')
      return { success: true, conversationId }
    } catch (error: any) {
      console.error('❌ Error in startConversationAboutListing:', error)
      return { success: false, error: error.message || 'An unexpected error occurred' }
    }
  }

  /**
   * Get all conversations for a user with unread counts and last messages
   */
  static async getConversations(userId: string): Promise<{ success: boolean; data?: Conversation[]; error?: string }> {
    try {
      console.log('📬 Fetching conversations for user:', userId)

      // Get all conversations the user is part of
      const { data: participantData, error: participantError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', userId)

      if (participantError) {
        console.error('❌ Error fetching participant data:', participantError)
        return { success: false, error: participantError.message }
      }

      const conversationIds = participantData.map(p => p.conversation_id)

      if (conversationIds.length === 0) {
        console.log('📭 No conversations found')
        return { success: true, data: [] }
      }

      // Get conversation details with listing info
      const { data: conversations, error: conversationsError } = await supabase
        .from('conversations')
        .select(`
          id,
          listing_id,
          created_at,
          updated_at,
          livestock_listings (
            id,
            title,
            description,
            price,
            quantity,
            images
          )
        `)
        .in('id', conversationIds)
        .order('updated_at', { ascending: false })

      if (conversationsError) {
        console.error('❌ Error fetching conversations:', conversationsError)
        return { success: false, error: conversationsError.message }
      }

      // Get all participants for these conversations
      const { data: allParticipants, error: allParticipantsError } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          user_id,
          last_read_at,
          profiles (
            id,
            username,
            first_name,
            last_name,
            profile_picture,
            role
          )
        `)
        .in('conversation_id', conversationIds)

      if (allParticipantsError) {
        console.error('❌ Error fetching participants:', allParticipantsError)
        return { success: false, error: allParticipantsError.message }
      }

      // Get last message for each conversation
      const { data: lastMessages, error: lastMessagesError } = await supabase
        .from('messages')
        .select('*')
        .in('conversation_id', conversationIds)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })

      if (lastMessagesError) {
        console.error('⚠️ Error fetching last messages:', lastMessagesError)
      }

      // Get unread counts for each conversation
      const unreadCountsPromises = conversationIds.map(async (convId) => {
        const { data, error } = await supabase.rpc('get_unread_count', {
          conv_id: convId,
          user_uuid: userId
        })
        return { conversationId: convId, count: error ? 0 : (data || 0) }
      })

      const unreadCountsResults = await Promise.all(unreadCountsPromises)
      const unreadCounts = new Map(
        unreadCountsResults.map(r => [r.conversationId, r.count])
      )

      // Group participants by conversation
      const participantsByConv = new Map<string, any[]>()
      allParticipants?.forEach(p => {
        if (!participantsByConv.has(p.conversation_id)) {
          participantsByConv.set(p.conversation_id, [])
        }
        participantsByConv.get(p.conversation_id)!.push(p)
      })

      // Group last messages by conversation
      const lastMessageByConv = new Map<string, any>()
      lastMessages?.forEach(msg => {
        if (!lastMessageByConv.has(msg.conversation_id)) {
          lastMessageByConv.set(msg.conversation_id, msg)
        }
      })

      // Transform to Conversation objects
      const result: Conversation[] = conversations.map(conv => {
        const participants = participantsByConv.get(conv.id) || []
        const lastMsg = lastMessageByConv.get(conv.id)

        // Map participants to User objects
        const users: User[] = participants.map(p => ({
          id: p.profiles.id,
          name: `${p.profiles.first_name || ''} ${p.profiles.last_name || ''}`.trim() || p.profiles.username || 'User',
          avatar: p.profiles.profile_picture,
          role: (p.profiles.role || 'Buyer') as 'Farmer' | 'Buyer'
        }))

        const conversation: Conversation = {
          id: conv.id,
          users: users,
          lastMessage: lastMsg ? {
            id: lastMsg.id,
            content: lastMsg.content,
            senderId: lastMsg.sender_id,
            conversationId: lastMsg.conversation_id,
            createdAt: new Date(lastMsg.created_at)
          } : undefined,
          unreadCount: unreadCounts.get(conv.id) || 0,
          isOnline: false, // Can implement online status separately
          listing: conv.livestock_listings && conv.livestock_listings.length > 0 ? {
            id: conv.livestock_listings[0].id,
            name: conv.livestock_listings[0].title,
            description: conv.livestock_listings[0].description,
            price: conv.livestock_listings[0].price,
            quantity: conv.livestock_listings[0].quantity,
            images: conv.livestock_listings[0].images || []
          } : undefined,
          createdAt: new Date(conv.created_at),
          updatedAt: new Date(conv.updated_at)
        }

        return conversation
      })

      console.log(`✅ Fetched ${result.length} conversations`)
      return { success: true, data: result }
    } catch (error: any) {
      console.error('❌ Error in getConversations:', error)
      return { success: false, error: error.message || 'Failed to fetch conversations' }
    }
  }

  /**
   * Get a single conversation by ID
   */
  static async getConversation(conversationId: string, userId: string): Promise<{ success: boolean; data?: Conversation; error?: string }> {
    try {
      console.log('📬 Fetching conversation:', conversationId)
      
      const result = await this.getConversations(userId)
      
      if (!result.success) {
        return { success: false, error: result.error }
      }

      const conversation = result.data?.find(c => c.id === conversationId)
      
      if (!conversation) {
        return { success: false, error: 'Conversation not found' }
      }

      return { success: true, data: conversation }
    } catch (error: any) {
      console.error('❌ Error in getConversation:', error)
      return { success: false, error: error.message || 'Failed to fetch conversation' }
    }
  }

  /**
   * Get messages for a specific conversation with pagination
   */
  static async getMessages(params: GetMessagesParams): Promise<{ success: boolean; data?: GetMessagesResult; error?: string }> {
    try {
      console.log('💬 Fetching messages for conversation:', params.conversationId)

      const limit = params.limit || 50
      let query = supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', params.conversationId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true })

      // If before date is provided, get messages before that date
      if (params.before) {
        query = query.lt('created_at', params.before.toISOString())
      }

      // Get one extra to check if there are more
      const { data, error } = await query.limit(limit + 1)

      if (error) {
        console.error('❌ Error fetching messages:', error)
        return { success: false, error: error.message }
      }

      const hasMore = (data || []).length > limit
      const messages: Message[] = (data || [])
        .slice(0, limit)
        .map(msg => ({
          id: msg.id,
          content: msg.content,
          senderId: msg.sender_id,
          conversationId: msg.conversation_id,
          createdAt: new Date(msg.created_at)
        }))

      console.log(`✅ Fetched ${messages.length} messages, hasMore: ${hasMore}`)
      
      return { 
        success: true, 
        data: { messages, hasMore } 
      }
    } catch (error: any) {
      console.error('❌ Error in getMessages:', error)
      return { success: false, error: error.message || 'Failed to fetch messages' }
    }
  }

  /**
   * Send a message in a conversation
   * Auto-fetches sender ID from authenticated user
   */
  static async sendMessage(params: SendMessageParams): Promise<{ success: boolean; data?: Message; error?: string }> {
    try {
      console.log('📤 Sending message...')

      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: params.conversationId,
          sender_id: user.id,
          content: params.content,
          created_at: new Date().toISOString(),
          is_deleted: false
        })
        .select()
        .single()

      if (error) {
        console.error('❌ Error sending message:', error)
        return { success: false, error: error.message }
      }

      // Update conversation updated_at timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', params.conversationId)

      const message: Message = {
        id: data.id,
        content: data.content,
        senderId: data.sender_id,
        conversationId: data.conversation_id,
        createdAt: new Date(data.created_at)
      }

      console.log('✅ Message sent successfully')
      return { success: true, data: message }
    } catch (error: any) {
      console.error('❌ Error in sendMessage:', error)
      return { success: false, error: error.message || 'Failed to send message' }
    }
  }

  /**
   * Mark messages as read in a conversation
   */
  static async markAsRead(conversationId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('✓ Marking messages as read...')

      const { error } = await supabase
        .from('conversation_participants')
        .update({ last_read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .eq('user_id', userId)

      if (error) {
        console.error('❌ Error marking as read:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Messages marked as read')
      return { success: true }
    } catch (error: any) {
      console.error('❌ Error in markAsRead:', error)
      return { success: false, error: error.message || 'Failed to mark as read' }
    }
  }

  /**
   * Create a new conversation - USES RPC FUNCTION to avoid RLS recursion
   */
  static async createConversation(params: CreateConversationParams): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
      console.log('🆕 Creating new conversation using RPC...')

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      // Ensure current user is in the participants list
      if (!params.participantIds.includes(user.id)) {
        params.participantIds.push(user.id)
      }

      console.log('   Participants:', params.participantIds)
      console.log('   Listing ID:', params.listingId)

      // Use RPC function to create conversation (bypasses RLS)
      const { data: conversationId, error: rpcError } = await supabase.rpc(
        'create_conversation_with_participants',
        {
          p_listing_id: params.listingId,
          p_participant_ids: params.participantIds
        }
      )

      if (rpcError) {
        console.error('❌ RPC error:', rpcError)
        return { success: false, error: rpcError.message }
      }

      if (!conversationId) {
        return { success: false, error: 'Failed to create conversation' }
      }

      console.log('✅ Conversation created/found:', conversationId)
      return { success: true, data: conversationId }
    } catch (error: any) {
      console.error('❌ Error in createConversation:', error)
      return { success: false, error: error.message || 'Failed to create conversation' }
    }
  }

  /**
   * Get or create conversation with a user about a listing
   */
  static async getOrCreateConversation(
    currentUserId: string,
    otherUserId: string,
    listingId?: string
  ): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
      console.log('🔍 Getting or creating conversation...')
      console.log('   Current user:', currentUserId)
      console.log('   Other user:', otherUserId)
      console.log('   Listing:', listingId)
      
      // Create conversation (it will check for existing one internally)
      return await this.createConversation({
        participantIds: [currentUserId, otherUserId],
        listingId
      })
    } catch (error: any) {
      console.error('❌ Error in getOrCreateConversation:', error)
      return { success: false, error: error.message || 'Failed to get or create conversation' }
    }
  }

  /**
   * Delete a message (soft delete)
   */
  static async deleteMessage(messageId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🗑️ Deleting message:', messageId)

      const { error } = await supabase
        .from('messages')
        .update({ is_deleted: true })
        .eq('id', messageId)
        .eq('sender_id', userId) // Only allow deleting own messages

      if (error) {
        console.error('❌ Error deleting message:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Message deleted')
      return { success: true }
    } catch (error: any) {
      console.error('❌ Error in deleteMessage:', error)
      return { success: false, error: error.message || 'Failed to delete message' }
    }
  }

  /**
   * Subscribe to real-time messages in a conversation
   */
  static subscribeToMessages(
    conversationId: string,
    onNewMessage: (message: Message) => void
  ): RealtimeChannel {
    console.log('🔴 Subscribing to messages in conversation:', conversationId)

    const channelName = `messages:${conversationId}`

    // Unsubscribe from existing channel if exists
    this.unsubscribe(channelName)

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          console.log('📩 New message received:', payload)
          const msg = payload.new as MessageDB
          if (!msg.is_deleted) {
            onNewMessage({
              id: msg.id,
              content: msg.content,
              senderId: msg.sender_id,
              conversationId: msg.conversation_id,
              createdAt: new Date(msg.created_at)
            })
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          console.log('✏️ Message updated:', payload)
          const msg = payload.new as MessageDB
          if (!msg.is_deleted) {
            onNewMessage({
              id: msg.id,
              content: msg.content,
              senderId: msg.sender_id,
              conversationId: msg.conversation_id,
              createdAt: new Date(msg.created_at)
            })
          }
        }
      )
      .subscribe()

    this.activeSubscriptions.set(channelName, channel)
    return channel
  }

  /**
   * Unsubscribe from messages in a conversation
   */
  static async unsubscribeFromMessages(conversationId: string): Promise<void> {
    const channelName = `messages:${conversationId}`
    this.unsubscribe(channelName)
  }

  /**
   * Subscribe to real-time conversation updates
   */
  static subscribeToConversations(
    userId: string,
    onNewMessage: (conversationId: string, message: Message) => void,
    onConversationUpdate: (conversationId: string) => void
  ): RealtimeChannel {
    console.log('🔴 Subscribing to conversation updates for user:', userId)

    const channelName = `conversations:${userId}`

    // Unsubscribe from existing channel if exists
    this.unsubscribe(channelName)

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        async (payload) => {
          console.log('📩 New message in conversation')
          const msg = payload.new as MessageDB
          
          // Check if user is part of this conversation
          const { data } = await supabase
            .from('conversation_participants')
            .select('conversation_id')
            .eq('conversation_id', msg.conversation_id)
            .eq('user_id', userId)
            .single()

          if (data) {
            onNewMessage(msg.conversation_id, {
              id: msg.id,
              content: msg.content,
              senderId: msg.sender_id,
              conversationId: msg.conversation_id,
              createdAt: new Date(msg.created_at)
            })
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations'
        },
        async (payload) => {
          console.log('📩 Conversation updated')
          const conv = payload.new as any
          
          // Check if user is part of this conversation
          const { data } = await supabase
            .from('conversation_participants')
            .select('conversation_id')
            .eq('conversation_id', conv.id)
            .eq('user_id', userId)
            .single()

          if (data) {
            onConversationUpdate(conv.id)
          }
        }
      )
      .subscribe()

    this.activeSubscriptions.set(channelName, channel)
    return channel
  }

  /**
   * Unsubscribe from a specific channel
   */
  static unsubscribe(channelName: string): void {
    const channel = this.activeSubscriptions.get(channelName)
    if (channel) {
      console.log('🔵 Unsubscribing from:', channelName)
      supabase.removeChannel(channel)
      this.activeSubscriptions.delete(channelName)
    }
  }

  /**
   * Cleanup all active subscriptions
   */
  static async cleanup(): Promise<void> {
    console.log('🔵 Cleaning up all subscriptions')
    this.activeSubscriptions.forEach((channel, name) => {
      console.log('🔵 Unsubscribing from:', name)
      supabase.removeChannel(channel)
    })
    this.activeSubscriptions.clear()
  }
}