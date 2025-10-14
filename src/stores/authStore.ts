// stores/authStore.ts

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import type { Session, User } from '@supabase/supabase-js';
import type { UserData } from '@/services/user';
import { supabase } from '@/supabase';
import { auth } from '../services/auth-service';

// Extended UserData interface for farm information
interface ExtendedUserData extends UserData {
  firstname?: string; // 
  lastname?: string;  // 
  username?: string;
  email?: string;
  role?: string;
  gender?: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  profile_completed?: boolean;
  created_at?: string;
  updated_at?: string;
  
  // Farm information fields
  farmName?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  livestockTypes?: string[];
  description?: string;
  farmAddress?: {
    street?: string;
    barangay?: string;
    city?: string;
    province?: string;
    region?: string;
    zipCode?: string;
  };
  isVerified?: boolean;
  verificationStatus?: 'verified' | 'pending' | 'rejected' | 'unverified';
  verificationSubmittedAt?: string;
  verificationRejectionReason?: string;
}

export const useAuthStore = defineStore('auth', () => {
  // --- Reactive State ---
  const session: Ref<Session | null> = ref(null);
  const user: Ref<User | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  // Farm information state
  const farmInfo: Ref<{
    farmName?: string;
    farmSize?: string;
    farmSizeUnit?: string;
    livestockTypes?: string[];
    description?: string;
    farmAddress?: any;
  }> = ref({});

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
      loadFarmInfo();

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
      farmInfo.value = {};
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
      if (user.value) {
        loadFarmInfo();
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to get session';
    } finally {
      loading.value = false;
    }
  };

  // Farm information actions
  const loadFarmInfo = async (): Promise<void> => {
    if (!user.value) return;

    try {
      const userId = user.value.id;
      
      const { data, error } = await supabase
        .from('farm_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        farmInfo.value = {
          farmName: data.farm_name,
          farmSize: data.farm_size,
          farmSizeUnit: data.farm_size_unit,
          livestockTypes: data.livestock_types,
          description: data.description,
          farmAddress: data.farm_address
        };
      }
    } catch (err) {
      console.error('Error loading farm info:', err);
    }
  };

  const updateFarmInfo = async (newFarmInfo: Partial<typeof farmInfo.value>): Promise<boolean> => {
    if (!user.value) return false;

    try {
      const userId = user.value.id;
      
      const { error } = await supabase
        .from('farm_profiles')
        .upsert({
          user_id: userId,
          farm_name: newFarmInfo.farmName,
          farm_size: newFarmInfo.farmSize,
          farm_size_unit: newFarmInfo.farmSizeUnit,
          livestock_types: newFarmInfo.livestockTypes,
          description: newFarmInfo.description,
          farm_address: newFarmInfo.farmAddress,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        farmInfo.value = { ...farmInfo.value, ...newFarmInfo };
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating farm info:', err);
      return false;
    }
  };

  const updateUserProfile = async (profileData: Partial<ExtendedUserData>): Promise<boolean> => {
    if (!user.value) return false;

    try {
      const { error } = await supabase.auth.updateUser({
        data: profileData
      });

      if (!error) {
        if (user.value) {
          user.value = { ...user.value, user_metadata: { ...user.value.user_metadata, ...profileData } };
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating user profile:', err);
      return false;
    }
  };

  supabase.auth.onAuthStateChange(async (_event: string, _session: Session | null) => {
    session.value = _session;
    user.value = _session ? _session.user : null;
    if (_session) {
      loadFarmInfo();
    } else {
      farmInfo.value = {};
    }
  });

  // --- Computed Values ---
  const userMetadata = computed<ExtendedUserData>(() => user.value?.user_metadata || {});
  const userId = computed<string | null>(() => user.value?.id ?? null);
  const isAuthenticated = computed<boolean>(() => !!user.value);

  // ✅ Use firstname and lastname from Supabase
  const userFullName = computed<string>(() => {
    if (!userMetadata.value) return "User Name";
    const firstname = userMetadata.value.firstname || "";
    const lastname = userMetadata.value.lastname || "";
    return `${firstname} ${lastname}`.trim() || userMetadata.value.username || "User Name";
  });

  const userInitials = computed<string>(() => {
    if (!userMetadata.value) return "UN";
    const firstname = userMetadata.value.firstname || "";
    const lastname = userMetadata.value.lastname || "";
    const fullNameInitials = `${firstname?.charAt(0) || ""}${lastname?.charAt(0) || ""}`.toUpperCase();

    if (fullNameInitials) return fullNameInitials;

    const username = userMetadata.value.username || "";
    return username.length >= 2 ? username.substring(0, 2).toUpperCase() : "UN";
  });

  const userEmail = computed<string>(() => user.value?.email || "");
  const userName = computed<string>(() => userMetadata.value?.username || "");
  const userRole = computed<string>(() => userMetadata.value?.role?.toLowerCase() || "user");
  const userGender = computed<string>(() => userMetadata.value?.gender || "");
  const userAvatar = computed<string | null>(() => userMetadata.value?.avatar_url || null);

  const userDisplayName = computed<string>(() => {
    if (!userMetadata.value) return "User";

    const firstname = userMetadata.value.firstname || "";
    const lastname = userMetadata.value.lastname || "";
    const fullName = `${firstname} ${lastname}`.trim();

    if (fullName) return fullName;
    if (userMetadata.value.username) return userMetadata.value.username;
    if (user.value?.email) return user.value.email.split('@')[0];

    return "User";
  });

  // Farm computed
  const userFarmName = computed<string>(() => farmInfo.value.farmName || userMetadata.value.farmName || "");
  const userFarmSize = computed<string>(() => farmInfo.value.farmSize || userMetadata.value.farmSize || "");
  const userFarmSizeUnit = computed<string>(() => farmInfo.value.farmSizeUnit || userMetadata.value.farmSizeUnit || "");
  const userLivestockTypes = computed<string[]>(() => farmInfo.value.livestockTypes || userMetadata.value.livestockTypes || []);
  const userFarmDescription = computed<string>(() => farmInfo.value.description || userMetadata.value.description || "");
  const userFarmAddress = computed<any>(() => farmInfo.value.farmAddress || userMetadata.value.farmAddress || {});

  const isFarmer = computed<boolean>(() => userRole.value === 'farmer');
  const isVerified = computed<boolean>(() => userMetadata.value.isVerified || userMetadata.value.verificationStatus === 'verified' || false);

  const verificationStatus = computed<'verified' | 'pending' | 'rejected' | 'unverified'>(() => {
    return userMetadata.value.verificationStatus || (isVerified.value ? 'verified' : 'unverified');
  });

  return {
    // State
    session,
    user,
    loading,
    error,
    farmInfo,

    // Actions
    login,
    register,
    logout,
    getSession,
    loadFarmInfo,
    updateFarmInfo,
    updateUserProfile,

    // Computed - User
    userMetadata,
    userId,
    isAuthenticated,
    userFullName,
    userInitials,
    userEmail,
    userName,
    userRole,
    userGender,
    userAvatar,
    userDisplayName,

    // Computed - Farm
    userFarmName,
    userFarmSize,
    userFarmSizeUnit,
    userLivestockTypes,
    userFarmDescription,
    userFarmAddress,
    isFarmer,
    isVerified,
    verificationStatus,
  };
});
