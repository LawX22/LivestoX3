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
    session.value = _session
    user.value = _session ? _session.user : null
  })


  // COMPUTED PROPERTIES
  // ✅ FIXED: Support both camelCase and lowercase property names for compatibility

  const userMetadata = computed(() => user.value?.user_metadata || {})
  const userId = computed(() => user.value?.id ?? null)
  const isAuthenticated = computed(() => !!user.value)

  const userFullName = computed(() => {
    // Support both camelCase (firstName) and lowercase (firstname)
    const firstname = userMetadata.value.firstName || userMetadata.value.firstname || ''
    const lastname = userMetadata.value.lastName || userMetadata.value.lastname || ''
    return `${firstname} ${lastname}`.trim() || userMetadata.value.username || 'User Name'
  })

  const userInitials = computed(() => {
    // Support both camelCase (firstName) and lowercase (firstname)
    const firstname = userMetadata.value.firstName || userMetadata.value.firstname || ''
    const lastname = userMetadata.value.lastName || userMetadata.value.lastname || ''
    const initials = `${firstname.charAt(0) || ''}${lastname.charAt(0) || ''}`.toUpperCase()
    return initials || (userMetadata.value.username?.substring(0, 2).toUpperCase() || 'UN')
  })

  const userEmail = computed(() => user.value?.email || '')
  const userName = computed(() => userMetadata.value?.username || '')
  const userRole = computed(() => userMetadata.value?.role?.toLowerCase() || 'user')
  const userGender = computed(() => userMetadata.value?.gender || '')
  const isVerified = computed(() =>
    userMetadata.value.isVerified ||
    userMetadata.value.verificationStatus === 'verified' ||
    false
  )

  const userDisplayName = computed(() => {
    if (!userMetadata.value) return 'User'
    // Support both camelCase (firstName) and lowercase (firstname)
    const firstname = userMetadata.value.firstName || userMetadata.value.firstname || ''
    const lastname = userMetadata.value.lastName || userMetadata.value.lastname || ''
    const fullName = `${firstname} ${lastname}`.trim()
    if (fullName) return fullName
    if (userMetadata.value.username) return userMetadata.value.username
    if (user.value?.email) return user.value.email.split('@')[0]
    return 'User'
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

    // Computed
    userMetadata,
    userId,
    isAuthenticated,
    userFullName,
    userInitials,
    userEmail,
    userName,
    userRole,
    userGender,
    isVerified,
    userDisplayName,
  }
})