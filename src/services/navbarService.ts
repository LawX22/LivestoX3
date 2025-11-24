// services/navbarService.ts - OPTIMIZED FOR SPEED
import { supabase } from '@/supabase'

// 🚀 Storage key for caching navbar user data
const NAVBAR_CACHE_KEY = 'livestox_navbar_cache'

// Types
export interface NavBarUser {
  id: string
  email: string
  displayName: string
  initials: string
  role: 'buyer' | 'farmer'
  profilePicture: string | null
  firstName: string
  lastName: string
  username: string
}

interface NavBarCache {
  user: NavBarUser
  timestamp: number
}

export class NavBarServiceError extends Error {
  constructor(
    message: string,
    public code: 'USER_NOT_FOUND' | 'AUTH_ERROR' | 'NETWORK_ERROR'
  ) {
    super(message)
    this.name = 'NavBarServiceError'
  }
}

export class NavBarService {
  /**
   * 🚀 Normalize role to lowercase
   */
  private static normalizeRole(role: string | null | undefined): 'buyer' | 'farmer' {
    if (!role) {
      return 'buyer'
    }

    const trimmed = role.trim()
    const lower = trimmed.toLowerCase()

    if (lower === 'farmer') {
      return 'farmer'
    } else {
      return 'buyer'
    }
  }

  /**
   * 🚀 Get cached navbar data (synchronous)
   */
  static getCachedNavBarData(): NavBarUser | null {
    try {
      const cached = localStorage.getItem(NAVBAR_CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached) as NavBarCache
        // Cache valid for 7 days (longer cache for better performance)
        const isValid = Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000
        if (isValid && parsed.user) {
          console.log('🔄 Loaded cached navbar data:', parsed.user.displayName)
          return parsed.user
        }
      }
    } catch (e) {
      console.warn('Failed to load cached navbar data:', e)
    }
    return null
  }

  /**
   * 🚀 Save navbar data to cache
   */
  static saveNavBarCache(user: NavBarUser): void {
    try {
      const cache: NavBarCache = {
        user,
        timestamp: Date.now()
      }
      localStorage.setItem(NAVBAR_CACHE_KEY, JSON.stringify(cache))
      console.log('💾 Saved navbar cache:', user.displayName)
    } catch (e) {
      console.warn('Failed to save navbar cache:', e)
    }
  }

  /**
   * 🚀 Clear navbar cache
   */
  static clearNavBarCache(): void {
    try {
      localStorage.removeItem(NAVBAR_CACHE_KEY)
      console.log('🗑️ Cleared navbar cache')
    } catch (e) {
      console.warn('Failed to clear navbar cache:', e)
    }
  }

  /**
   * 🚀 OPTIMIZED: Get user data for navbar display
   * Removed unnecessary auth check for faster execution
   * @throws {NavBarServiceError} When user is not found
   */
  static async getNavBarUserData(userId: string): Promise<NavBarUser | null> {
    try {
      console.log('🔍 ===== FETCHING NAVBAR USER DATA =====')
      console.log('   User ID:', userId)

      // 🚀 OPTIMIZATION: Removed auth.getUser() call - trust the auth store
      // This saves ~100-200ms per request

      // Get profile from profiles table with optimized query
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, username, first_name, last_name, profile_picture, role, email')
        .eq('id', userId)
        .single()

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          throw new NavBarServiceError(
            'User profile not found - account may have been deleted',
            'USER_NOT_FOUND'
          )
        }
        
        console.error('❌ Error fetching profile for navbar:', profileError)
        throw new NavBarServiceError(
          'Failed to fetch user profile',
          'NETWORK_ERROR'
        )
      }

      if (!profile) {
        throw new NavBarServiceError(
          'User profile not found',
          'USER_NOT_FOUND'
        )
      }

      const email = profile.email || ''
      const firstName = (profile.first_name || '').trim()
      const lastName = (profile.last_name || '').trim()
      const username = (profile.username || '').trim()

      const rawRole = profile.role
      const normalizedRole = this.normalizeRole(rawRole)

      console.log('   🎭 Role from database:', `"${rawRole}"`)
      console.log('   🎯 Normalized role:', `"${normalizedRole}"`)

      const displayName = firstName && lastName 
        ? `${firstName} ${lastName}` 
        : username || email.split('@')[0] || 'User'

      const initials = firstName && lastName
        ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
        : displayName.substring(0, 2).toUpperCase()

      console.log('   👤 Display name:', displayName)
      console.log('   📧 Email:', email)
      console.log('   🎯 Final role:', normalizedRole)
      console.log('===================================\n')

      const navBarUser: NavBarUser = {
        id: profile.id,
        email,
        displayName,
        initials,
        role: normalizedRole,
        profilePicture: profile.profile_picture || null,
        firstName,
        lastName,
        username
      }

      // 🚀 Save to cache after successful fetch
      this.saveNavBarCache(navBarUser)

      return navBarUser
    } catch (error) {
      if (error instanceof NavBarServiceError) {
        throw error
      }
      
      console.error('💥 Unexpected error in getNavBarUserData:', error)
      throw new NavBarServiceError(
        'Unexpected error loading user data',
        'NETWORK_ERROR'
      )
    }
  }

  /**
   * 🚀 OPTIMIZED: Get all navbar data in one call
   * @throws {NavBarServiceError} When user data cannot be loaded
   */
  static async getAllNavBarData(userId: string): Promise<{
    user: NavBarUser | null
  }> {
    try {
      const user = await this.getNavBarUserData(userId)

      return {
        user
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Refresh navbar user data (call after profile updates)
   * @throws {NavBarServiceError} When user data cannot be refreshed
   */
  static async refreshNavBarData(userId: string): Promise<NavBarUser | null> {
    return await this.getNavBarUserData(userId)
  }

  /**
   * Check role consistency between auth metadata and profiles table
   */
  static async checkRoleSync(userId: string): Promise<{ 
    inSync: boolean
    profileRole: 'buyer' | 'farmer'
    authRole: 'buyer' | 'farmer' 
  }> {
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      const { data: { user } } = await supabase.auth.getUser()
      
      const profileRole = this.normalizeRole(profileData?.role)
      const authRole = this.normalizeRole(user?.user_metadata?.role)

      const inSync = profileRole === authRole

      console.log('🔍 Role sync check:', {
        inSync,
        profileRole,
        authRole
      })

      return {
        inSync,
        profileRole,
        authRole
      }
    } catch (error) {
      console.error('❌ Error checking role sync:', error)
      return {
        inSync: false,
        profileRole: 'buyer',
        authRole: 'buyer'
      }
    }
  }

  /**
   * Force sync auth metadata with profiles
   */
  static async syncAuthWithProfiles(userId: string): Promise<boolean> {
    try {
      console.log('🔄 Syncing auth with profiles...')
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (!profileData) {
        console.error('❌ No profile found')
        return false
      }

      const correctRole = this.normalizeRole(profileData.role)

      const { error } = await supabase.auth.updateUser({
        data: { role: correctRole }
      })

      if (error) {
        console.error('❌ Error syncing:', error)
        return false
      }

      console.log('✅ Auth synced with profiles:', correctRole)
      return true
    } catch (error) {
      console.error('💥 Exception syncing:', error)
      return false
    }
  }
}