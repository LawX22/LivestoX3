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

export const useAuthStore = defineStore('auth', () => {
  // --- Reactive State ---
  const session: Ref<Session | null> = ref(null);
  const user: Ref<User | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

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

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message || 'Login failed';
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  };

  const register = async (
    email: string,
    password: string,
    additionalInfo: Partial<ExtendedUserData> = {}
  ) => {
    try {
      loading.value = true;
      error.value = null;

      const { data, error: authError } = await auth.signUp(
        email,
        password,
        additionalInfo
      );

      if (authError) {
        error.value = authError.message;
        return { data: null, error: authError };
      }

      session.value = data.session;
      user.value = data.user;

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
    } catch (err: any) {
      error.value = err.message || 'Failed to get session';
    } finally {
      loading.value = false;
    }
  };

  // Keep session updated automatically
  supabase.auth.onAuthStateChange(async (_event: string, _session: Session | null) => {
    session.value = _session;
    user.value = _session ? _session.user : null;
  });

  // --- Computed Values ---
  const userMetadata = computed<ExtendedUserData>(() => user.value?.user_metadata || {});
  const userId = computed<string | null>(() => user.value?.id ?? null);
  const isAuthenticated = computed<boolean>(() => !!user.value);

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

    // Actions
    login,
    register,
    logout,
    getSession,

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
    userDisplayName,
  };
});
