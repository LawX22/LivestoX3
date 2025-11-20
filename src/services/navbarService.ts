// services/navbarService.ts
import { supabase } from '@/supabase'

// Types
export interface NavBarUser {
  id: string
  email: string
  displayName: string
  initials: string
  role: string
  profilePicture: string | null
  firstName: string
  lastName: string
  username: string
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
   * Get user data for navbar display
   * @throws {NavBarServiceError} When user is not found or auth fails
   */
  static async getNavBarUserData(userId: string): Promise<NavBarUser | null> {
    try {
      // First, verify auth session is still valid
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !authUser) {
        throw new NavBarServiceError(
          'Authentication session invalid or expired',
          'AUTH_ERROR'
        )
      }

      // Get profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, username, first_name, last_name, profile_picture, role')
        .eq('id', userId)
        .single()

      if (profileError) {
        // Check if user was not found (deleted or never existed)
        if (profileError.code === 'PGRST116') {
          throw new NavBarServiceError(
            'User profile not found - account may have been deleted',
            'USER_NOT_FOUND'
          )
        }
        
        console.error('Error fetching profile for navbar:', profileError)
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

      const email = authUser.email || ''

      // Extract names
      const firstName = profile.first_name || ''
      const lastName = profile.last_name || ''
      const username = profile.username || ''

      // Create display name
      const displayName = firstName && lastName 
        ? `${firstName} ${lastName}` 
        : username || email.split('@')[0] || 'User'

      // Create initials
      const initials = firstName && lastName
        ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
        : displayName.substring(0, 2).toUpperCase()

      return {
        id: profile.id,
        email,
        displayName,
        initials,
        role: profile.role || 'buyer',
        profilePicture: profile.profile_picture || null,
        firstName,
        lastName,
        username
      }
    } catch (error) {
      // Re-throw NavBarServiceError
      if (error instanceof NavBarServiceError) {
        throw error
      }
      
      // Wrap other errors
      console.error('Unexpected error in getNavBarUserData:', error)
      throw new NavBarServiceError(
        'Unexpected error loading user data',
        'NETWORK_ERROR'
      )
    }
  }

  /**
   * Get all navbar data in one call (optimized)
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
      // Re-throw to let caller handle it
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
}