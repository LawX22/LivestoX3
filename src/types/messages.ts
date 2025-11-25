// src/types/messages.ts

// ============================================
// FRONTEND TYPES
// ============================================

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'Farmer' | 'Buyer';
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
}

export interface Conversation {
  id: string;
  users: User[];
  lastMessage?: Message;
  unreadCount: number;
  isOnline: boolean;
  listing?: Listing;
  createdAt: Date;
  updatedAt: Date;
}

export interface Filter {
  key: FilterKey;
  label: string;
  description: string;
  icon: {
    fill?: string;
    stroke?: string;
    path: string;
    pathProps?: Record<string, any>;
  };
}

export type FilterKey = 'unread' | 'farmers' | 'buyers';

export interface MessagesComponentProps {
  initialConversations?: Conversation[];
  currentUser?: User;
}

// ============================================
// DATABASE TYPES
// ============================================

export interface ConversationDB {
  id: string;
  listing_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConversationParticipantDB {
  id: string;
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_at: string;
}

export interface MessageDB {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

// ============================================
// EXTENDED TYPES WITH JOINS
// ============================================

export interface ConversationWithDetails extends ConversationDB {
  participants?: ConversationParticipantDB[];
  messages?: MessageDB[];
  listing?: any;
}

export interface MessageWithSender extends MessageDB {
  sender?: {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    profile_picture: string;
    role: string;
  };
}

// ============================================
// REQUEST/RESPONSE TYPES
// ============================================

export interface CreateConversationParams {
  participantIds: string[];
  listingId?: string;
  initialMessage?: string;
}

export interface SendMessageParams {
  conversationId: string;
  content: string;
}

export interface GetMessagesParams {
  conversationId: string;
  limit?: number;
  before?: Date;
}

export interface GetMessagesResult {
  messages: Message[];
  hasMore: boolean;
}

// ============================================
// UTILITY TYPES
// ============================================

export interface ConversationPreview {
  id: string;
  otherUser: User;
  lastMessage?: Message;
  unreadCount: number;
  listing?: Listing;
  updatedAt: Date;
}

export interface PaginatedMessages {
  messages: Message[];
  hasMore: boolean;
  nextCursor?: Date;
}

export interface PaginatedConversations {
  conversations: Conversation[];
  hasMore: boolean;
  total: number;
}

// ============================================
// REALTIME TYPES
// ============================================

export interface RealtimeMessagePayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: MessageDB;
  old: MessageDB;
}

export interface RealtimeConversationPayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: ConversationDB;
  old: ConversationDB;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert database message to frontend message
 */
export function dbMessageToMessage(dbMessage: MessageDB): Message {
  return {
    id: dbMessage.id,
    content: dbMessage.content,
    senderId: dbMessage.sender_id,
    conversationId: dbMessage.conversation_id,
    createdAt: new Date(dbMessage.created_at),
    updatedAt: dbMessage.updated_at ? new Date(dbMessage.updated_at) : undefined
  };
}

/**
 * Convert database conversation to frontend conversation
 */
export function dbConversationToConversation(
  dbConversation: ConversationDB,
  users: User[],
  lastMessage?: Message,
  unreadCount: number = 0,
  listing?: Listing
): Conversation {
  return {
    id: dbConversation.id,
    users,
    lastMessage,
    unreadCount,
    isOnline: users.some(u => u.isOnline),
    listing,
    createdAt: new Date(dbConversation.created_at),
    updatedAt: new Date(dbConversation.updated_at)
  };
}

/**
 * Get the other user in a conversation (not the current user)
 */
export function getOtherUser(conversation: Conversation, currentUserId: string): User | null {
  return conversation.users.find(user => user.id !== currentUserId) || null;
}

/**
 * Format timestamp for display
 */
export function formatMessageTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Format full timestamp
 */
export function formatFullTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}