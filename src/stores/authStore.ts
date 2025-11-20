// stores/authStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { Session, User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '@/supabase'
import { auth } from '../services/auth-service'

export const useAuthStore = defineStore('auth', () => {

  // STATE
  const session: Ref<Session | null> = ref(null)
  const user: Ref<SupabaseUser | null> = ref(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  // AUTH ACTIONS
  const initialize = async (): Promise<void> => {
    if (initialized.value) return
    
    try {
      loading.value = true
      const { data } = await supabase.auth.getSession()
      session.value = data?.session ?? null
      user.value = data?.session?.user || null
      initialized.value = true
    } catch (err: any) {
      error.value = err.message || 'Failed to initialize auth'
      console.error('Auth initialization error:', err)
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: authError } = await auth.signIn(email, password)
      if (authError) {
        const message = (authError as any)?.message ?? String(authError) ?? 'Authentication error'
        error.value = message
        return { data: null, error: authError }
      }

      session.value = data?.session ?? null
      user.value = data?.user ?? null
      return { data, error: null }
    } catch (err: any) {
      error.value = err.message || 'Login failed'
      return { data: null, error: err }
    } finally {
      loading.value = false
    }
  }

  const register = async (
    email: string,
    password: string,
    additionalInfo: Record<string, any> = {}
  ) => {
    try {
      loading.value = true
      error.value = null
      const { data, error: authError } = await auth.signUp(email, password, additionalInfo)
      if (authError) {
        const message = (authError as any)?.message ?? String(authError) ?? 'Registration error'
        error.value = message
        return { data: null, error: authError }
      }

      session.value = data?.session ?? null
      user.value = data?.user ?? null
      return { data, error: null }
    } catch (err: any) {
      error.value = err.message || 'Registration failed'
      return { data: null, error: err }
    } finally {
      loading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      loading.value = true
      await supabase.auth.signOut()
      session.value = null
      user.value = null
      error.value = null
      initialized.value = false
    } catch (err: any) {
      error.value = err.message || 'Logout failed'
    } finally {
      loading.value = false
    }
  }

  const getSession = async (): Promise<void> => {
    try {
      loading.value = true
      const { data } = await supabase.auth.getSession()
      session.value = data.session
      user.value = data.session?.user || null
    } catch (err: any) {
      error.value = err.message || 'Failed to get session'
    } finally {
      loading.value = false
    }
  }

  // Listen to auth state changes
  supabase.auth.onAuthStateChange(async (_event, _session) => {
    // Prevent unnecessary updates
    if (_session?.user?.id === user.value?.id) return
    
    session.value = _session
    user.value = _session ? _session.user : null
  })

  // COMPUTED PROPERTIES (Core Auth)
  const userId = computed(() => user.value?.id ?? null)
  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email || '')

  // COMPUTED PROPERTIES (User Metadata)
  const userMetadata = computed(() => user.value?.user_metadata || {})
  
  const userRole = computed(() => {
    return userMetadata.value?.role || 'buyer'
  })

  const userName = computed(() => {
    return userMetadata.value?.full_name || 
           userMetadata.value?.name || 
           userMetadata.value?.username || 
           ''
  })

  const userFullName = computed(() => {
    return userMetadata.value?.full_name || 
           userMetadata.value?.name || 
           `${userMetadata.value?.first_name || ''} ${userMetadata.value?.last_name || ''}`.trim() ||
           ''
  })

  const userDisplayName = computed(() => {
    return userMetadata.value?.display_name || 
           userMetadata.value?.full_name || 
           userMetadata.value?.name ||
           userMetadata.value?.username ||
           userEmail.value.split('@')[0] || 
           'User'
  })

  // RETURN STORE
  return {
    // State
    session,
    user,
    loading,
    error,
    initialized,

    // Actions
    initialize,
    login,
    register,
    logout,
    getSession,

    // Computed (Auth)
    userId,
    isAuthenticated,
    userEmail,

    // Computed (User Metadata)
    userMetadata,
    userRole,
    userName,
    userFullName,
    userDisplayName,
  }
})