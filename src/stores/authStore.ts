// stores/authStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { Session, User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '@/supabase'
import { auth } from '../services/auth-service'

// 🔥 Storage keys for caching
const AUTH_CACHE_KEY = 'livestox_auth_cache'

interface AuthCache {
  userId: string | null
  email: string | null
  isAuthenticated: boolean
  timestamp: number
}

export const useAuthStore = defineStore('auth', () => {

  // STATE
  const session: Ref<Session | null> = ref(null)
  const user: Ref<SupabaseUser | null> = ref(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  // 🔥 NEW: Cached auth state (loaded synchronously from localStorage)
  const cachedAuth = ref<AuthCache | null>(null)

  // 🔥 Track if auth listener has been set up
  let authListenerSetup = false

  // 🔥 Debounce timer for cache writes
  let cacheWriteTimer: ReturnType<typeof setTimeout> | null = null

  // 🔥 Load cached auth immediately (synchronous)
  const loadCachedAuth = (): AuthCache | null => {
    try {
      const cached = localStorage.getItem(AUTH_CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached) as AuthCache
        // Cache is valid for 24 hours
        const isValid = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000
        if (isValid && parsed.isAuthenticated) {
          console.log('🔄 Loaded cached auth state:', parsed)
          return parsed
        }
      }
    } catch (e) {
      console.warn('Failed to load cached auth:', e)
    }
    return null
  }

  // 🔥 Save auth state to cache (DEBOUNCED to prevent excessive writes)
  const saveAuthCache = (userId: string | null, email: string | null, isAuth: boolean) => {
    // Clear any pending cache write
    if (cacheWriteTimer) {
      clearTimeout(cacheWriteTimer)
    }

    // Debounce cache writes by 300ms
    cacheWriteTimer = setTimeout(() => {
      try {
        const cache: AuthCache = {
          userId,
          email,
          isAuthenticated: isAuth,
          timestamp: Date.now()
        }
        localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify(cache))
        cachedAuth.value = cache
        console.log('💾 Saved auth cache:', cache)
      } catch (e) {
        console.warn('Failed to save auth cache:', e)
      }
    }, 300)
  }

  // 🔥 Clear auth cache
  const clearAuthCache = () => {
    // Clear any pending cache write
    if (cacheWriteTimer) {
      clearTimeout(cacheWriteTimer)
      cacheWriteTimer = null
    }

    try {
      localStorage.removeItem(AUTH_CACHE_KEY)
      cachedAuth.value = null
      console.log('🗑️ Cleared auth cache')
    } catch (e) {
      console.warn('Failed to clear auth cache:', e)
    }
  }

  // 🔥 Initialize cached auth immediately (runs synchronously when store is created)
  cachedAuth.value = loadCachedAuth()

  // 🔥 Setup auth state change listener (ONLY ONCE, inside initialize)
  const setupAuthListener = () => {
    if (authListenerSetup) return // Prevent duplicate listeners

    supabase.auth.onAuthStateChange(async (event, _session) => {
      console.log('🔐 Auth state change:', event)

      // Prevent unnecessary updates during initialization
      if (!initialized.value && event === 'INITIAL_SESSION') {
        return // Skip initial session event - we handle this in initialize()
      }

      // Prevent unnecessary updates if session hasn't actually changed
      if (_session?.user?.id === user.value?.id && _session?.access_token === session.value?.access_token) {
        return
      }
      
      session.value = _session
      user.value = _session ? _session.user : null

      // 🔥 Update cache on auth state change
      if (_session?.user) {
        saveAuthCache(_session.user.id, _session.user.email || null, true)
      } else {
        clearAuthCache()
      }
    })

    authListenerSetup = true
    console.log('✅ Auth listener setup complete')
  }

  // AUTH ACTIONS
  const initialize = async (): Promise<void> => {
    if (initialized.value) return
    
    try {
      loading.value = true
      
      // 🔥 Setup listener BEFORE getting session
      setupAuthListener()

      const { data } = await supabase.auth.getSession()
      session.value = data?.session ?? null
      user.value = data?.session?.user || null
      initialized.value = true

      // 🔥 Update cache after successful initialization
      if (data?.session?.user) {
        saveAuthCache(
          data.session.user.id,
          data.session.user.email || null,
          true
        )
      } else {
        // No valid session - clear cache
        clearAuthCache()
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to initialize auth'
      console.error('Auth initialization error:', err)
      // Clear cache on error
      clearAuthCache()
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

      // 🔥 Save to cache on successful login
      if (data?.user) {
        saveAuthCache(data.user.id, data.user.email || null, true)
      }

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

      // 🔥 Save to cache on successful registration
      if (data?.user) {
        saveAuthCache(data.user.id, data.user.email || null, true)
      }

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
      
      // 🔥 Clear cache on logout
      clearAuthCache()
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

      // 🔥 Update cache
      if (data.session?.user) {
        saveAuthCache(data.session.user.id, data.session.user.email || null, true)
      } else {
        clearAuthCache()
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to get session'
    } finally {
      loading.value = false
    }
  }

  // 🔥 COMPUTED PROPERTIES - Use cached values as fallback for instant availability
  const userId = computed(() => {
    return user.value?.id ?? cachedAuth.value?.userId ?? null
  })
  
  const isAuthenticated = computed(() => {
    // If we have actual user data, use that
    if (user.value) return true
    // If not initialized yet but have valid cache, use cache
    if (!initialized.value && cachedAuth.value?.isAuthenticated) return true
    // Otherwise, not authenticated
    return false
  })
  
  const userEmail = computed(() => {
    return user.value?.email || cachedAuth.value?.email || ''
  })

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
    cachedAuth,

    // Actions
    initialize,
    login,
    register,
logout,
    getSession,
    clearAuthCache,

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