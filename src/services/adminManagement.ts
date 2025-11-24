// services/admindashboardTypes.ts
import { supabase } from '@/supabase'

export interface AdminUser {
  userId: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  profilePicture?: string
  role: string
  phoneNumber?: string
  createdAt: string
  bannedUntil?: string | null
  isBanned?: boolean
  username?: string
  lastActive?: string
  isOnline?: boolean
  gender?: string
  bannerImage?: string
}

export interface UserStats {
  total: number
  banned: number
  byRole: {
    admin: number
    farmer: number
    buyer: number
    user: number
  }
}

export interface BanUserParams {
  userId: string
  bannedUntil?: string | null
  banReason?: string
}

export interface UpdateUserParams {
  userId: string
  role?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  gender?: string
}

export class AdminService {
  /**
   * Get all users (admin only)
   * Fetches users from profiles table
   */
  static async getAllUsers(): Promise<AdminUser[]> {
    try {
      console.log('📋 Fetching all users from database...')
      
      // Fetch all profiles with proper error handling
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (profileError) {
        console.error('❌ Error fetching profiles:', profileError)
        throw new Error(`Failed to fetch profiles: ${profileError.message}`)
      }

      if (!profiles) {
        console.log('⚠️ No profiles found')
        return []
      }

      console.log(`✅ Found ${profiles.length} profiles`)

      // Transform profiles to AdminUser format
      const users: AdminUser[] = profiles.map(profile => {
        // Check ban status
        const isBanned = profile.is_banned === true
        let bannedUntil = profile.banned_until || null

        // Auto-unban if ban expired
        if (isBanned && bannedUntil) {
          const banExpiry = new Date(bannedUntil)
          if (banExpiry < new Date()) {
            // Ban has expired - we'll handle this async
            this.unbanUser(profile.id).catch(err => 
              console.error('Auto-unban failed:', err)
            )
            bannedUntil = null
          }
        }

        // Calculate last active (use created_at as fallback)
        const lastActive = profile.updated_at || profile.created_at

        // Simulate online status based on last activity
        const lastActiveDate = new Date(lastActive)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
        const isOnline = lastActiveDate > fiveMinutesAgo

        return {
          userId: profile.id,
          email: profile.email || 'No email',
          firstName: profile.first_name || undefined,
          lastName: profile.last_name || undefined,
          fullName: profile.first_name && profile.last_name 
            ? `${profile.first_name} ${profile.last_name}` 
            : undefined,
          username: profile.username || undefined,
          profilePicture: profile.profile_picture || undefined,
          bannerImage: profile.banner_image || undefined,
          role: profile.role || 'User',
          phoneNumber: profile.phone_number || undefined,
          gender: profile.gender || undefined,
          createdAt: profile.created_at || new Date().toISOString(),
          lastActive,
          isOnline,
          isBanned,
          bannedUntil,
        }
      })

      console.log(`✨ Processed ${users.length} users`)
      return users

    } catch (error) {
      console.error('💥 Error in getAllUsers:', error)
      throw error
    }
  }

  /**
   * Get user statistics
   */
  static async getUserStats(): Promise<UserStats> {
    try {
      const users = await this.getAllUsers()

      const stats: UserStats = {
        total: users.length,
        banned: users.filter(u => u.isBanned).length,
        byRole: {
          admin: users.filter(u => this.normalizeRole(u.role) === 'admin').length,
          farmer: users.filter(u => this.normalizeRole(u.role) === 'farmer').length,
          buyer: users.filter(u => this.normalizeRole(u.role) === 'buyer').length,
          user: users.filter(u => !u.role || this.normalizeRole(u.role) === 'user').length,
        }
      }

      return stats
    } catch (error) {
      console.error('❌ Error getting user stats:', error)
      throw error
    }
  }

  /**
   * Get single user by ID
   */
  static async getUserById(userId: string): Promise<AdminUser | null> {
    try {
      console.log('🔍 Fetching user:', userId)

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.error('❌ Error fetching user profile:', profileError)
        return null
      }

      if (!profile) {
        console.log('⚠️ User not found')
        return null
      }

      return {
        userId: profile.id,
        email: profile.email || 'No email',
        firstName: profile.first_name || undefined,
        lastName: profile.last_name || undefined,
        fullName: profile.first_name && profile.last_name 
          ? `${profile.first_name} ${profile.last_name}` 
          : undefined,
        username: profile.username || undefined,
        profilePicture: profile.profile_picture || undefined,
        bannerImage: profile.banner_image || undefined,
        role: profile.role || 'User',
        phoneNumber: profile.phone_number || undefined,
        gender: profile.gender || undefined,
        createdAt: profile.created_at || new Date().toISOString(),
        lastActive: profile.updated_at || profile.created_at,
        isOnline: false,
        isBanned: profile.is_banned === true,
        bannedUntil: profile.banned_until || null,
      }
    } catch (error) {
      console.error('💥 Error in getUserById:', error)
      return null
    }
  }

  /**
   * Ban a user
   */
  static async banUser(params: BanUserParams): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🚫 Banning user:', params.userId)

      const updateData: any = {
        is_banned: true,
        banned_until: params.bannedUntil,
        ban_reason: params.banReason || 'Banned by admin',
        banned_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', params.userId)

      if (error) {
        console.error('❌ Error banning user:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ User banned successfully')
      return { success: true }
    } catch (error) {
      console.error('💥 Error in banUser:', error)
      return { success: false, error: String(error) }
    }
  }

  /**
   * Unban a user
   */
  static async unbanUser(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('✅ Unbanning user:', userId)

      const { error } = await supabase
        .from('profiles')
        .update({
          is_banned: false,
          banned_until: null,
          ban_reason: null,
          unbanned_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) {
        console.error('❌ Error unbanning user:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ User unbanned successfully')
      return { success: true }
    } catch (error) {
      console.error('💥 Error in unbanUser:', error)
      return { success: false, error: String(error) }
    }
  }

  /**
   * Update user information (admin operation)
   */
  static async updateUser(params: UpdateUserParams): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('📝 Updating user:', params.userId)

      const updateData: any = {}

      if (params.role !== undefined) updateData.role = params.role
      if (params.firstName !== undefined) updateData.first_name = params.firstName
      if (params.lastName !== undefined) updateData.last_name = params.lastName
      if (params.phoneNumber !== undefined) updateData.phone_number = params.phoneNumber
      if (params.gender !== undefined) updateData.gender = params.gender

      // Only proceed if there are fields to update
      if (Object.keys(updateData).length === 0) {
        console.log('⚠️ No fields to update')
        return { success: true }
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', params.userId)

      if (error) {
        console.error('❌ Error updating user:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ User updated successfully')
      return { success: true }
    } catch (error) {
      console.error('💥 Error in updateUser:', error)
      return { success: false, error: String(error) }
    }
  }

  /**
   * Delete a user (soft delete - ban permanently)
   */
  static async deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🗑️  Deleting user:', userId)

      // Soft delete by banning permanently
      const result = await this.banUser({
        userId,
        bannedUntil: null, // null means permanent
        banReason: 'Account deleted by admin'
      })

      if (!result.success) {
        return result
      }

      console.log('✅ User deleted successfully')
      return { success: true }
    } catch (error) {
      console.error('💥 Error in deleteUser:', error)
      return { success: false, error: String(error) }
    }
  }

  /**
   * Search users by query
   */
  static async searchUsers(query: string): Promise<AdminUser[]> {
    try {
      console.log('🔍 Searching users:', query)

      const allUsers = await this.getAllUsers()
      const lowerQuery = query.toLowerCase()

      const results = allUsers.filter(user => 
        user.email.toLowerCase().includes(lowerQuery) ||
        user.username?.toLowerCase().includes(lowerQuery) ||
        user.firstName?.toLowerCase().includes(lowerQuery) ||
        user.lastName?.toLowerCase().includes(lowerQuery) ||
        user.fullName?.toLowerCase().includes(lowerQuery)
      )

      console.log(`✅ Found ${results.length} matching users`)
      return results
    } catch (error) {
      console.error('💥 Error searching users:', error)
      return []
    }
  }

  /**
   * Check if current user is admin
   */
  static async isAdmin(): Promise<boolean> {
    try {
      console.log('🔐 Starting admin check...')
      
      // Get current user with error handling
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError) {
        console.error('❌ Auth error:', authError)
        return false
      }

      if (!user) {
        console.log('⚠️ No authenticated user found')
        return false
      }

      console.log('👤 User found:', user.id)

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, email, first_name, last_name')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('❌ Profile fetch error:', profileError)
        return false
      }

      if (!profile) {
        console.log('⚠️ No profile found for user')
        return false
      }

      console.log('🎯 User role from database:', profile.role)
      console.log('👤 User details:', {
        email: profile.email,
        name: `${profile.first_name} ${profile.last_name}`,
        role: profile.role
      })
      
      const normalizedRole = this.normalizeRole(profile.role)
      console.log('🔄 Normalized role:', normalizedRole)
      
      const isAdmin = normalizedRole === 'admin'
      console.log('✅ Is admin:', isAdmin)
      
      return isAdmin

    } catch (error) {
      console.error('💥 Unexpected error in isAdmin:', error)
      return false
    }
  }

  /**
   * Normalize role for consistent comparison
   */
  private static normalizeRole(role: string | null | undefined): string {
    if (!role) return 'user'
    
    // Trim whitespace and convert to lowercase
    const normalized = role.toString().trim().toLowerCase()
    
    // Handle common role variations
    if (normalized === 'administrator' || normalized === 'admin') {
      return 'admin'
    }
    if (normalized === 'farmer' || normalized === 'farmers') {
      return 'farmer'
    }
    if (normalized === 'buyer' || normalized === 'buyers') {
      return 'buyer'
    }
    
    return normalized
  }

  /**
   * Get users with pagination
   */
  static async getUsersPaginated(
    page: number = 1,
    pageSize: number = 10,
    filters?: {
      status?: 'all' | 'banned' | 'active'
      role?: 'all' | 'Admin' | 'Farmer' | 'Buyer' | 'User'
      sortBy?: 'newest' | 'oldest' | 'name'
    }
  ): Promise<{ users: AdminUser[]; total: number; page: number; pageSize: number }> {
    try {
      console.log('📄 Fetching paginated users:', { page, pageSize, filters })

      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' })

      // Apply filters
      if (filters?.status && filters.status !== 'all') {
        switch (filters.status) {
          case 'banned':
            query = query.eq('is_banned', true)
            break
          case 'active':
            query = query.eq('is_banned', false)
            break
        }
      }

      if (filters?.role && filters.role !== 'all') {
        query = query.eq('role', filters.role)
      }

      // Apply sorting
      if (filters?.sortBy === 'oldest') {
        query = query.order('created_at', { ascending: true })
      } else if (filters?.sortBy === 'name') {
        query = query.order('first_name', { ascending: true })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      // Apply pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1
      query = query.range(from, to)

      const { data: profiles, error, count } = await query

      if (error) {
        console.error('❌ Error fetching paginated users:', error)
        throw error
      }

      const users: AdminUser[] = (profiles || []).map(profile => ({
        userId: profile.id,
        email: profile.email || 'No email',
        firstName: profile.first_name || undefined,
        lastName: profile.last_name || undefined,
        fullName: profile.first_name && profile.last_name 
          ? `${profile.first_name} ${profile.last_name}` 
          : undefined,
        username: profile.username || undefined,
        profilePicture: profile.profile_picture || undefined,
        bannerImage: profile.banner_image || undefined,
        role: profile.role || 'User',
        phoneNumber: profile.phone_number || undefined,
        gender: profile.gender || undefined,
        createdAt: profile.created_at || new Date().toISOString(),
        lastActive: profile.updated_at || profile.created_at,
        isOnline: false,
        isBanned: profile.is_banned === true,
        bannedUntil: profile.banned_until || null,
      }))

      console.log(`✅ Fetched ${users.length} users (page ${page} of ${Math.ceil((count || 0) / pageSize)})`)

      return {
        users,
        total: count || 0,
        page,
        pageSize
      }
    } catch (error) {
      console.error('💥 Error in getUsersPaginated:', error)
      throw error
    }
  }

  /**
   * Bulk ban users
   */
  static async bulkBanUsers(
    userIds: string[],
    bannedUntil?: string | null,
    banReason?: string
  ): Promise<{ success: boolean; successCount: number; errors: string[] }> {
    try {
      console.log('🚫 Bulk banning users:', userIds.length)

      let successCount = 0
      const errors: string[] = []

      for (const userId of userIds) {
        const result = await this.banUser({ userId, bannedUntil, banReason })
        if (result.success) {
          successCount++
        } else {
          errors.push(`${userId}: ${result.error}`)
        }
      }

      console.log(`✅ Bulk ban complete: ${successCount}/${userIds.length} successful`)

      return {
        success: successCount === userIds.length,
        successCount,
        errors
      }
    } catch (error) {
      console.error('💥 Error in bulkBanUsers:', error)
      return {
        success: false,
        successCount: 0,
        errors: [String(error)]
      }
    }
  }

  /**
   * Get email for user (helper method)
   */
  static async getUserEmail(userId: string): Promise<string | null> {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single()

      if (profile?.email) {
        return profile.email
      }

      return null
    } catch (error) {
      console.error('Error getting user email:', error)
      return null
    }
  }

  /**
   * Debug method to check current user's role
   */
  static async debugUserRole(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.log('❌ No user logged in')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      console.log('🐛 DEBUG USER ROLE:')
      console.log('User ID:', user.id)
      console.log('Profile data:', profile)
      console.log('Raw role:', profile?.role)
      console.log('Normalized role:', this.normalizeRole(profile?.role))
      console.log('Is admin:', await this.isAdmin())
    } catch (error) {
      console.error('Debug error:', error)
    }
  }
}