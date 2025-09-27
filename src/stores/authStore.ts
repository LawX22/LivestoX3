// stores/authStore.ts

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import type { Session, User } from '@supabase/supabase-js';
import type { UserData } from '@/services/user';
import { supabase } from '@/supabase';
import { auth } from '../services/auth-service';

// Extended UserData interface for navbar requirements
interface ExtendedUserData extends UserData {
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  role?: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  profile_completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Interface for notification data
interface NotificationData {
  id: string | number;
  type: 'order' | 'payment' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon?: string;
  color?: string;
  action_url?: string;
}

// Interface for message data
interface MessageData {
  id: string | number;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  content: string;
  timestamp: string;
  read: boolean;
  conversation_id?: string;
}

// Interface for cart data
interface CartItem {
  id: string | number;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  seller_id: string;
  seller_name: string;
  image_url?: string;
  total: number;
}

export const useAuthStore = defineStore('auth', () => {
  // --- Reactive State ---
  const session: Ref<Session | null> = ref(null);
  const user: Ref<User | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);
  
  // Navbar specific data
  const notifications: Ref<NotificationData[]> = ref([]);
  const messages: Ref<MessageData[]> = ref([]);
  const cartItems: Ref<CartItem[]> = ref([]);
  const unreadNotifications: Ref<number> = ref(0);
  const unreadMessages: Ref<number> = ref(0);
  const cartCount: Ref<number> = ref(0);

  // --- Auth Actions ---
  const login = async (email: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: authError } = await auth.signIn(email, password);
      
      if (authError) {
        error.value = authError.message;
        return { data: null, error: authError };
      }
      
      session.value = data.session;
      user.value = data.user;
      
      // Initialize user-specific data after login
      await initializeUserData();
      
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message || 'Login failed';
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string, additionalInfo: Partial<ExtendedUserData> = {}) => {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: authError } = await auth.signUp(email, password, additionalInfo);
      
      if (authError) {
        error.value = authError.message;
        return { data: null, error: authError };
      }
      
      session.value = data.session;
      user.value = data.user;
      
      // Initialize user-specific data after registration
      await initializeUserData();
      
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message || 'Registration failed';
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      loading.value = true;
      await supabase.auth.signOut();
      
      // Clear all user data
      session.value = null;
      user.value = null;
      notifications.value = [];
      messages.value = [];
      cartItems.value = [];
      unreadNotifications.value = 0;
      unreadMessages.value = 0;
      cartCount.value = 0;
      error.value = null;
    } catch (err: any) {
      error.value = err.message || 'Logout failed';
    } finally {
      loading.value = false;
    }
  };

  const getSession = async (): Promise<void> => {
    try {
      loading.value = true;
      const { data } = await supabase.auth.getSession();
      
      session.value = data.session;
      user.value = data.session?.user || null;
      
      // Initialize user data if session exists
      if (data.session?.user) {
        await initializeUserData();
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to get session';
    } finally {
      loading.value = false;
    }
  };

  // Initialize user-specific data (notifications, messages, cart)
  const initializeUserData = async (): Promise<void> => {
    if (!user.value) return;
    
    try {
      await Promise.all([
        fetchNotifications(),
        fetchMessages(),
        fetchCartItems()
      ]);
    } catch (err: any) {
      console.error('Failed to initialize user data:', err);
    }
  };

  // --- Navbar Data Actions ---
  const fetchNotifications = async (): Promise<void> => {
    if (!user.value) return;
    
    try {
      
      // Temporary empty state until API is implemented
      notifications.value = [];
      unreadNotifications.value = 0;
    } catch (err: any) {
      console.error('Failed to fetch notifications:', err);
      notifications.value = [];
      unreadNotifications.value = 0;
    }
  };

  const fetchMessages = async (): Promise<void> => {
    if (!user.value) return;
    
    try {
      
      // Temporary empty state until API is implemented
      messages.value = [];
      unreadMessages.value = 0;
    } catch (err: any) {
      console.error('Failed to fetch messages:', err);
      messages.value = [];
      unreadMessages.value = 0;
    }
  };

  const fetchCartItems = async (): Promise<void> => {
    if (!user.value) return;
    
    try {
      
      // Temporary empty state until API is implemented
      cartItems.value = [];
      cartCount.value = 0;
    } catch (err: any) {
      console.error('Failed to fetch cart items:', err);
      cartItems.value = [];
      cartCount.value = 0;
    }
  };

  const markNotificationAsRead = async (notificationId: string | number): Promise<void> => {
    try {
      const notification = notifications.value.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        notification.read = true;
        unreadNotifications.value = Math.max(0, unreadNotifications.value - 1);
        
      }
    } catch (err: any) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markMessageAsRead = async (messageId: string | number): Promise<void> => {
    try {
      const message = messages.value.find(m => m.id === messageId);
      if (message && !message.read) {
        message.read = true;
        unreadMessages.value = Math.max(0, unreadMessages.value - 1);
        
      }
    } catch (err: any) {
      console.error('Failed to mark message as read:', err);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'id' | 'total'>): Promise<void> => {
    try {
      
      // For now, just update local state
      const existingItem = cartItems.value.find(
        c => c.product_id === item.product_id && c.seller_id === item.seller_id
      );
      
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.total = existingItem.quantity * existingItem.price;
        
        // TODO: Update quantity in database
        // await updateCartItemQuantity(existingItem.id, existingItem.quantity);
      } else {
        const newItem: CartItem = {
          ...item,
          id: Date.now(), // Temporary ID - replace with actual ID from database
          total: item.quantity * item.price
        };
        cartItems.value.push(newItem);
      }
      
      cartCount.value = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
    } catch (err: any) {
      console.error('Failed to add to cart:', err);
    }
  };

  const removeFromCart = async (itemId: string | number): Promise<void> => {
    try {
      
      const index = cartItems.value.findIndex(item => item.id === itemId);
      if (index > -1) {
        cartItems.value.splice(index, 1);
        cartCount.value = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
      }
    } catch (err: any) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const updateCartItemQuantity = async (itemId: string | number, quantity: number): Promise<void> => {
    try {
      const item = cartItems.value.find(item => item.id === itemId);
      if (item) {
        item.quantity = quantity;
        item.total = item.quantity * item.price;
        cartCount.value = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
      }
    } catch (err: any) {
      console.error('Failed to update cart item:', err);
    }
  };

  const clearCart = async (): Promise<void> => {
    try {
      
      cartItems.value = [];
      cartCount.value = 0;
    } catch (err: any) {
      console.error('Failed to clear cart:', err);
    }
  };

  // Keep session updated automatically
  supabase.auth.onAuthStateChange(async (event: string, _session: Session | null) => {
    session.value = _session;
    user.value = _session ? _session.user : null;
    
    if (event === 'SIGNED_IN' && _session?.user) {
      await initializeUserData();
    } else if (event === 'SIGNED_OUT') {
      // Clear all data on sign out
      notifications.value = [];
      messages.value = [];
      cartItems.value = [];
      unreadNotifications.value = 0;
      unreadMessages.value = 0;
      cartCount.value = 0;
    }
  });

  // --- Computed Values ---
  const userMetadata = computed<ExtendedUserData>(() => user.value?.user_metadata || {});
  const userId = computed<string | null>(() => user.value?.id ?? null);
  const isAuthenticated = computed<boolean>(() => !!user.value);
  
  // Navbar specific computed values
  const userFullName = computed<string>(() => {
    if (!userMetadata.value) return "User Name";
    const firstName = userMetadata.value.firstName || userMetadata.value.first_name || "";
    const lastName = userMetadata.value.lastName || userMetadata.value.last_name || "";
    return `${firstName} ${lastName}`.trim() || userMetadata.value.username || "User Name";
  });

  const userInitials = computed<string>(() => {
    if (!userMetadata.value) return "UN";
    const firstName = userMetadata.value.firstName || userMetadata.value.first_name || "";
    const lastName = userMetadata.value.lastName || userMetadata.value.last_name || "";
    const fullNameInitials = `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
    
    if (fullNameInitials) return fullNameInitials;
    
    // Fallback to username initials if no first/last name
    const username = userMetadata.value.username || "";
    return username.length >= 2 ? username.substring(0, 2).toUpperCase() : "UN";
  });

  const userEmail = computed<string>(() => {
    return user.value?.email || "";
  });

  const userName = computed<string>(() => {
    return userMetadata.value?.username || "";
  });

  const userRole = computed<string>(() => {
    return userMetadata.value?.role?.toLowerCase() || "user";
  });

  const userAvatar = computed<string | null>(() => {
    return userMetadata.value?.avatar_url || null;
  });

  const cartTotal = computed<number>(() => {
    return cartItems.value.reduce((sum, item) => sum + item.total, 0);
  });

  const recentNotifications = computed<NotificationData[]>(() => {
    return notifications.value.slice(0, 5); // Show only recent 5
  });

  const recentMessages = computed<MessageData[]>(() => {
    return messages.value.slice(0, 5); // Show only recent 5
  });

  // Enhanced display name that prioritizes full name, then username, then email
  const userDisplayName = computed<string>(() => {
    if (!userMetadata.value) return "User";
    
    const firstName = userMetadata.value.firstName || userMetadata.value.first_name || "";
    const lastName = userMetadata.value.lastName || userMetadata.value.last_name || "";
    const fullName = `${firstName} ${lastName}`.trim();
    
    if (fullName) return fullName;
    if (userMetadata.value.username) return userMetadata.value.username;
    if (user.value?.email) return user.value.email.split('@')[0];
    
    return "User";
  });

  return {
    // State
    session,
    user,
    loading,
    error,
    notifications,
    messages,
    cartItems,
    unreadNotifications,
    unreadMessages,
    cartCount,
    
    // Actions
    login,
    register,
    logout,
    getSession,
    initializeUserData,
    fetchNotifications,
    fetchMessages,
    fetchCartItems,
    markNotificationAsRead,
    markMessageAsRead,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    
    // Computed
    userMetadata,
    userId,
    isAuthenticated,
    userFullName,
    userInitials,
    userEmail,
    userName,
    userRole,
    userAvatar,
    cartTotal,
    recentNotifications,
    recentMessages,
    userDisplayName,
  };
});