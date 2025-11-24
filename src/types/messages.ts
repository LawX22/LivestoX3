// message.ts
export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'farmer' | 'buyer';
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
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
}

export interface Filter {
  key: string;
  label: string;
  icon: {
    fill?: string;
    stroke?: string;
    path: string;
    pathProps?: Record<string, any>;
  };
}

// Optional: You can also export a type for filter keys for better type safety
export type FilterKey = 'unread' | 'farmers' | 'buyers' | 'active';

// Optional: Helper type for component props if needed elsewhere
export interface MessagesComponentProps {
  initialConversations?: Conversation[];
  currentUser?: User;
}