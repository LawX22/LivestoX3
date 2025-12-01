// services/messagesService.ts - WITH EDIT, DELETE MESSAGE & DELETE CONVERSATION
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
 * FEATURES: Edit messages, Delete messages, Delete conversations
 */
export class MessagesService {
  private static activeSubscriptions: Map<string, RealtimeChannel> = new Map()

  /**
   * Calculate unread count manually (fallback if RPC fails)
   */
  private static async calculateUnreadCount(
    conversationId: string, 
    userId: string
  ): Promise<number> {
    try {
      const { data: participant } = await supabase
        .from('conversation_participants')
        .select('last_read_at')
        .eq('conversation_id', conversationId)
        .eq('user_id', userId)
        .single()

      const lastReadAt = participant?.last_read_at

      let query = supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', userId)
        .eq('is_deleted', false)

      if (lastReadAt) {
        query = query.gt('created_at', lastReadAt)
      }

      const { count } = await query

      return count || 0
    } catch (error) {
      console.error('❌ Error calculating unread count:', error)
      return 0
    }
  }

  /**
   * Start a conversation about a listing
   */
  static async startConversationAboutListing(
    recipientId: string,
    listingId: string,
    initialMessage: string
  ): Promise<{ success: boolean; conversationId?: string; error?: string }> {
    try {
      console.log('📤 Starting conversation about listing...')

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        console.error('❌ Not authenticated:', userError)
        return { success: false, error: 'You must be logged in to send messages' }
      }

      if (user.id === recipientId) {
        return { success: false, error: 'You cannot message yourself' }
      }

      const convResult = await this.getOrCreateConversation(user.id, recipientId, listingId)
      
      if (!convResult.success || !convResult.data) {
        console.error('❌ Failed to get/create conversation:', convResult.error)
        return { success: false, error: convResult.error || 'Failed to create conversation' }
      }

      const conversationId = convResult.data

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
   * Get all conversations for a user
   */
  static async getConversations(userId: string): Promise<{ success: boolean; data?: Conversation[]; error?: string }> {
    try {
      console.log('📬 Fetching conversations for user:', userId)

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

      const { data: lastMessages, error: lastMessagesError } = await supabase
        .from('messages')
        .select('*')
        .in('conversation_id', conversationIds)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })

      if (lastMessagesError) {
        console.error('⚠️ Error fetching last messages:', lastMessagesError)
      }

      // Get unread counts with fallback
      const unreadCountsPromises = conversationIds.map(async (convId) => {
        try {
          const { data, error } = await supabase.rpc('get_unread_count', {
            conv_id: convId,
            user_uuid: userId
          })
          
          if (error) {
            console.warn('⚠️ RPC failed, using fallback for:', convId)
            const count = await this.calculateUnreadCount(convId, userId)
            return { conversationId: convId, count }
          }
          
          return { conversationId: convId, count: data || 0 }
        } catch (error) {
          console.error('❌ Error getting unread count:', error)
          const count = await this.calculateUnreadCount(convId, userId)
          return { conversationId: convId, count }
        }
      })

      const unreadCountsResults = await Promise.all(unreadCountsPromises)
      const unreadCounts = new Map(
        unreadCountsResults.map(r => [r.conversationId, r.count])
      )

      const participantsByConv = new Map<string, any[]>()
      allParticipants?.forEach(p => {
        if (!participantsByConv.has(p.conversation_id)) {
          participantsByConv.set(p.conversation_id, [])
        }
        participantsByConv.get(p.conversation_id)!.push(p)
      })

      const lastMessageByConv = new Map<string, any>()
      lastMessages?.forEach(msg => {
        if (!lastMessageByConv.has(msg.conversation_id)) {
          lastMessageByConv.set(msg.conversation_id, msg)
        }
      })

      const result: Conversation[] = conversations.map(conv => {
        const participants = participantsByConv.get(conv.id) || []
        const lastMsg = lastMessageByConv.get(conv.id)
        const unreadCount = unreadCounts.get(conv.id) || 0

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
            createdAt: new Date(lastMsg.created_at),
            isEdited: lastMsg.is_edited || false,
            editedAt: lastMsg.edited_at ? new Date(lastMsg.edited_at) : undefined
          } : undefined,
          unreadCount: unreadCount,
          isOnline: false,
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

      const totalUnread = result.reduce((sum, conv) => sum + conv.unreadCount, 0)
      console.log(`✅ Fetched ${result.length} conversations with ${totalUnread} total unread`)
      
      return { success: true, data: result }
    } catch (error: any) {
      console.error('❌ Error in getConversations:', error)
      return { success: false, error: error.message || 'Failed to fetch conversations' }
    }
  }

  static async getConversation(conversationId: string, userId: string): Promise<{ success: boolean; data?: Conversation; error?: string }> {
    try {
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

  static async getMessages(params: GetMessagesParams): Promise<{ success: boolean; data?: GetMessagesResult; error?: string }> {
    try {
      const limit = params.limit || 50
      let query = supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', params.conversationId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true })

      if (params.before) {
        query = query.lt('created_at', params.before.toISOString())
      }

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
          createdAt: new Date(msg.created_at),
          isEdited: msg.is_edited || false,
          editedAt: msg.edited_at ? new Date(msg.edited_at) : undefined
        }))
      
      return { 
        success: true, 
        data: { messages, hasMore } 
      }
    } catch (error: any) {
      console.error('❌ Error in getMessages:', error)
      return { success: false, error: error.message || 'Failed to fetch messages' }
    }
  }

  static async sendMessage(params: SendMessageParams): Promise<{ success: boolean; data?: Message; error?: string }> {
    try {
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
          is_deleted: false,
          is_edited: false
        })
        .select()
        .single()

      if (error) {
        console.error('❌ Error sending message:', error)
        return { success: false, error: error.message }
      }

      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', params.conversationId)

      const message: Message = {
        id: data.id,
        content: data.content,
        senderId: data.sender_id,
        conversationId: data.conversation_id,
        createdAt: new Date(data.created_at),
        isEdited: false
      }

      return { success: true, data: message }
    } catch (error: any) {
      console.error('❌ Error in sendMessage:', error)
      return { success: false, error: error.message || 'Failed to send message' }
    }
  }

  /**
   * Edit a message
   */
  static async editMessage(messageId: string, userId: string, newContent: string): Promise<{ success: boolean; data?: Message; error?: string }> {
    try {
      console.log('✏️ Editing message:', messageId)

      const { data, error } = await supabase
        .from('messages')
        .update({ 
          content: newContent,
          is_edited: true,
          edited_at: new Date().toISOString()
        })
        .eq('id', messageId)
        .eq('sender_id', userId)
        .eq('is_deleted', false)
        .select()
        .single()

      if (error) {
        console.error('❌ Error editing message:', error)
        return { success: false, error: error.message }
      }

      if (!data) {
        return { success: false, error: 'Message not found or you do not have permission to edit it' }
      }

      const message: Message = {
        id: data.id,
        content: data.content,
        senderId: data.sender_id,
        conversationId: data.conversation_id,
        createdAt: new Date(data.created_at),
        isEdited: true,
        editedAt: new Date(data.edited_at)
      }

      console.log('✅ Message edited successfully')
      return { success: true, data: message }
    } catch (error: any) {
      console.error('❌ Error in editMessage:', error)
      return { success: false, error: error.message || 'Failed to edit message' }
    }
  }

  /**
   * Delete a single message
   */
  static async deleteMessage(messageId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🗑️ Deleting message:', messageId)

      const { error } = await supabase
        .from('messages')
        .update({ is_deleted: true })
        .eq('id', messageId)
        .eq('sender_id', userId)

      if (error) {
        console.error('❌ Error deleting message:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Message deleted successfully')
      return { success: true }
    } catch (error: any) {
      console.error('❌ Error in deleteMessage:', error)
      return { success: false, error: error.message || 'Failed to delete message' }
    }
  }

  /**
   * Delete entire conversation (all messages)
   */
  static async deleteConversation(conversationId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🗑️ Deleting conversation:', conversationId)

      // Verify user is a participant
      const { data: participant, error: participantError } = await supabase
        .from('conversation_participants')
        .select('id')
        .eq('conversation_id', conversationId)
        .eq('user_id', userId)
        .single()

      if (participantError || !participant) {
        return { success: false, error: 'You are not a participant in this conversation' }
      }

      // Soft delete all messages in the conversation
      const { error: messagesError } = await supabase
        .from('messages')
        .update({ is_deleted: true })
        .eq('conversation_id', conversationId)

      if (messagesError) {
        console.error('❌ Error deleting messages:', messagesError)
        return { success: false, error: messagesError.message }
      }

      // Optionally: Remove the participant from the conversation
      // This will make the conversation disappear from the user's list
      const { error: removeError } = await supabase
        .from('conversation_participants')
        .delete()
        .eq('conversation_id', conversationId)
        .eq('user_id', userId)

      if (removeError) {
        console.error('❌ Error removing participant:', removeError)
        return { success: false, error: removeError.message }
      }

      console.log('✅ Conversation deleted successfully')
      return { success: true }
    } catch (error: any) {
      console.error('❌ Error in deleteConversation:', error)
      return { success: false, error: error.message || 'Failed to delete conversation' }
    }
  }

  static async markAsRead(conversationId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('✓ Marking messages as read:', conversationId)

      const { error } = await supabase
        .from('conversation_participants')
        .update({ last_read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .eq('user_id', userId)

      if (error) {
        console.error('❌ Error marking as read:', error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      console.error('❌ Error in markAsRead:', error)
      return { success: false, error: error.message || 'Failed to mark as read' }
    }
  }

  static async createConversation(params: CreateConversationParams): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      if (!params.participantIds.includes(user.id)) {
        params.participantIds.push(user.id)
      }

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

      return { success: true, data: conversationId }
    } catch (error: any) {
      console.error('❌ Error in createConversation:', error)
      return { success: false, error: error.message || 'Failed to create conversation' }
    }
  }

  static async getOrCreateConversation(
    currentUserId: string,
    otherUserId: string,
    listingId?: string
  ): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
      return await this.createConversation({
        participantIds: [currentUserId, otherUserId],
        listingId
      })
    } catch (error: any) {
      console.error('❌ Error in getOrCreateConversation:', error)
      return { success: false, error: error.message || 'Failed to get or create conversation' }
    }
  }

  static subscribeToMessages(
    conversationId: string,
    onNewMessage: (message: Message) => void,
    onMessageUpdate: (message: Message) => void,
    onMessageDelete: (messageId: string) => void
  ): RealtimeChannel {
    console.log('🔴 Subscribing to messages:', conversationId)

    const channelName = `messages:${conversationId}`
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
          const msg = payload.new as MessageDB
          if (!msg.is_deleted) {
            onNewMessage({
              id: msg.id,
              content: msg.content,
              senderId: msg.sender_id,
              conversationId: msg.conversation_id,
              createdAt: new Date(msg.created_at),
              isEdited: msg.is_edited || false,
              editedAt: msg.edited_at ? new Date(msg.edited_at) : undefined
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
          const msg = payload.new as MessageDB
          if (msg.is_deleted) {
            onMessageDelete(msg.id)
          } else {
            onMessageUpdate({
              id: msg.id,
              content: msg.content,
              senderId: msg.sender_id,
              conversationId: msg.conversation_id,
              createdAt: new Date(msg.created_at),
              isEdited: msg.is_edited || false,
              editedAt: msg.edited_at ? new Date(msg.edited_at) : undefined
            })
          }
        }
      )
      .subscribe()

    this.activeSubscriptions.set(channelName, channel)
    return channel
  }

  static async unsubscribeFromMessages(conversationId: string): Promise<void> {
    const channelName = `messages:${conversationId}`
    this.unsubscribe(channelName)
  }

  static subscribeToConversations(
    userId: string,
    onNewMessage: (conversationId: string, message: Message) => void,
    onConversationUpdate: (conversationId: string) => void
  ): RealtimeChannel {
    console.log('🔴 Subscribing to conversation updates:', userId)

    const channelName = `conversations:${userId}`
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
          const msg = payload.new as MessageDB
          
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
              createdAt: new Date(msg.created_at),
              isEdited: msg.is_edited || false,
              editedAt: msg.edited_at ? new Date(msg.edited_at) : undefined
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
          const conv = payload.new as any
          
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

  static unsubscribe(channelName: string): void {
    const channel = this.activeSubscriptions.get(channelName)
    if (channel) {
      console.log('🔵 Unsubscribing from:', channelName)
      supabase.removeChannel(channel)
      this.activeSubscriptions.delete(channelName)
    }
  }

  static async cleanup(): Promise<void> {
    console.log('🔵 Cleaning up all subscriptions')
    this.activeSubscriptions.forEach((channel, name) => {
      supabase.removeChannel(channel)
    })
    this.activeSubscriptions.clear()
  }
}