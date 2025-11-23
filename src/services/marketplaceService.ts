// services/marketplaceService.ts
import { supabase } from '../supabase'
import type { Animal } from './animalTypes'

// ===== TYPES =====
export interface UserDetails {
  id: string
  fullName: string
  email: string
  role: string  // Will always be lowercase: 'buyer' or 'farmer'
  phone?: string
  address?: string
  avatar?: string
  firstName?: string
  lastName?: string
  username?: string
}

interface LivestockDB {
  id: string
  user_id: string
  title: string
  description: string
  type: string
  breed: string
  weight: number
  weight_unit: string
  quantity: number
  original_quantity: number
  age: string
  gender: string
  status: string
  health_status: string[]
  price: number
  price_unit: string
  location: string
  delivery_options: string[]
  payment_methods: string[]
  images: string[]
  is_auction: boolean
  starting_bid: number | null
  current_bid: number | null
  bid_count: number
  end_time: string | null
  auction_start_time: string | null
  reserve_price: number | null
  bid_increment: number | null
  payment_terms: string | null
  additional_terms: string | null
  created_at: string
  updated_at: string
  // Joined fields from view
  first_name?: string
  last_name?: string
  username?: string
  phone_number?: string
  profile_picture?: string
  farm_name?: string
  street?: string
  barangay?: string
  city?: string
  province?: string
  region?: string
}

// ===== UNIFIED MARKETPLACE SERVICE =====
class MarketplaceService {
  // ===== ROLE MANAGEMENT =====

  /**
   * Helper function to normalize role
   */
  private normalizeRole(role: string | null | undefined): 'buyer' | 'farmer' {
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
   * Get user details from profiles table
   */
  async getUserDetails(userId: string): Promise<UserDetails | null> {
    try {
      console.log('🔍 ===== FETCHING USER DETAILS =====')
      console.log('   User ID:', userId)

      // STEP 1: Try to get from profiles table (PRIMARY SOURCE)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.log('⚠️ Error fetching from profiles:', profileError.message)
      }

      if (!profileError && profileData) {
        console.log('✅ Found user in profiles table')

        const firstName = (profileData.first_name || '').trim()
        const lastName = (profileData.last_name || '').trim()
        const username = (profileData.username || '').trim()
        const email = profileData.email || ''
        const phone = profileData.phone || ''
        const address = profileData.address || ''
        const avatar = profileData.avatar_url || ''

        // CRITICAL: Get role from profiles table and normalize it
        const rawRole = profileData.role
        const normalizedRole = this.normalizeRole(rawRole)

        console.log('   🎭 Role from database:', `"${rawRole}"`)
        console.log('   🎯 Normalized role:', `"${normalizedRole}"`)

        // Build full name
        let fullName = ''
        if (firstName && lastName) {
          fullName = `${firstName} ${lastName}`
        } else if (firstName) {
          fullName = firstName
        } else if (lastName) {
          fullName = lastName
        } else if (username) {
          fullName = username
        } else if (email) {
          fullName = email.split('@')[0]
        } else {
          fullName = 'Unknown User'
        }

        console.log('   👤 Full name:', fullName)
        console.log('   📧 Email:', email)
        console.log('   🎯 Final normalized role:', normalizedRole)
        console.log('===================================\n')

        return {
          id: userId,
          fullName,
          email,
          role: normalizedRole,
          phone,
          address,
          avatar,
          firstName,
          lastName,
          username
        }
      }

      // STEP 2: Fallback to auth user metadata (SECONDARY SOURCE)
      console.log('⚠️ User not found in profiles, checking auth metadata')

      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

      if (authError) {
        console.log('❌ Error fetching auth user:', authError.message)
        return null
      }

      if (authUser && authUser.id === userId) {
        console.log('✅ Found user in auth')

        const email = authUser.email || ''
        const emailPrefix = email.split('@')[0] || 'Unknown User'

        const metadata = authUser.user_metadata || {}
        const firstName = (metadata.firstname || metadata.firstName || metadata.first_name || '').trim()
        const lastName = (metadata.lastname || metadata.lastName || metadata.last_name || '').trim()
        const username = (metadata.username || '').trim()
        const phone = metadata.phone || ''
        const address = metadata.address || ''
        const avatar = metadata.avatar_url || ''

        // CRITICAL: Normalize role from auth metadata
        const rawRole = metadata.role
        const normalizedRole = this.normalizeRole(rawRole)

        console.log('   🎭 Role from auth metadata:', `"${rawRole}"`)
        console.log('   🎯 Normalized role:', `"${normalizedRole}"`)

        // Build full name
        let fullName = ''
        if (firstName && lastName) {
          fullName = `${firstName} ${lastName}`
        } else if (firstName) {
          fullName = firstName
        } else if (lastName) {
          fullName = lastName
        } else if (username) {
          fullName = username
        } else {
          fullName = emailPrefix
        }

        console.log('   👤 Full name:', fullName)
        console.log('   📧 Email:', email)
        console.log('   🎯 Final normalized role:', normalizedRole)
        console.log('===================================\n')

        return {
          id: userId,
          fullName,
          email,
          role: normalizedRole,
          phone,
          address,
          avatar,
          firstName,
          lastName,
          username
        }
      }

      console.log('❌ No user data found for user_id:', userId)
      console.log('===================================\n')
      return null
    } catch (error) {
      console.error('💥 Exception while fetching user details:', error)
      return null
    }
  }

  /**
   * Get multiple users at once
   */
  async getMultipleUsers(userIds: string[]): Promise<{ [userId: string]: UserDetails }> {
    try {
      console.log('📞 Fetching multiple users, count:', userIds.length)

      if (userIds.length === 0) {
        return {}
      }

      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('*')
        .in('id', userIds)

      if (error) {
        console.error('❌ Error fetching profiles data:', error)
      }

      console.log('✅ Fetched profiles data from database, count:', profilesData?.length || 0)

      const userLookup: { [userId: string]: UserDetails } = {}

      profilesData?.forEach(profile => {
        const firstName = (profile.first_name || '').trim()
        const lastName = (profile.last_name || '').trim()
        const username = (profile.username || '').trim()
        const email = profile.email || ''
        const phone = profile.phone || ''
        const address = profile.address || ''
        const avatar = profile.avatar_url || ''

        const rawRole = profile.role
        const normalizedRole = this.normalizeRole(rawRole)

        let fullName = ''
        if (firstName && lastName) {
          fullName = `${firstName} ${lastName}`
        } else if (firstName) {
          fullName = firstName
        } else if (lastName) {
          fullName = lastName
        } else if (username) {
          fullName = username
        } else if (email) {
          fullName = email.split('@')[0]
        } else {
          fullName = 'Unknown User'
        }

        userLookup[profile.id] = {
          id: profile.id,
          fullName,
          email,
          role: normalizedRole,
          phone,
          address,
          avatar,
          firstName,
          lastName,
          username
        }
      })

      for (const userId of userIds) {
        if (!userLookup[userId]) {
          const userDetails = await this.getUserDetails(userId)

          if (userDetails) {
            userLookup[userId] = userDetails
          } else {
            userLookup[userId] = {
              id: userId,
              fullName: 'Unknown User',
              email: 'N/A',
              role: 'buyer'
            }
          }
        }
      }

      console.log('✅ Complete user lookup map created, count:', Object.keys(userLookup).length)
      return userLookup
    } catch (error) {
      console.error('💥 Error fetching multiple users:', error)
      return {}
    }
  }

  /**
   * Update user role in BOTH profiles table AND auth metadata
   */
  async updateUserRole(userId: string, newRole: 'buyer' | 'farmer'): Promise<boolean> {
    try {
      console.log(`🔄 ===== UPDATING USER ROLE =====`)
      console.log(`   User ID: ${userId}`)
      console.log(`   New Role: "${newRole}"`)

      // STEP 1: Update profiles table
      console.log('   📝 Updating profiles table...')
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role: newRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (profileError) {
        console.error('   ❌ Error updating profiles table:', profileError)
        return false
      }
      console.log('   ✅ Profiles table updated')

      // STEP 2: Update auth metadata
      console.log('   📝 Updating auth metadata...')
      const { error: authError } = await supabase.auth.updateUser({
        data: { role: newRole }
      })

      if (authError) {
        console.error('   ❌ Error updating auth metadata:', authError)
        console.log('   ⚠️ Auth metadata update failed, but profiles is updated (OK)')
      } else {
        console.log('   ✅ Auth metadata updated')
      }

      console.log('✅ Role update complete!')
      console.log('===================================\n')
      return true
    } catch (error) {
      console.error('💥 Exception updating role:', error)
      return false
    }
  }

  /**
   * Upgrade user from buyer to farmer
   */
  async upgradeToFarmer(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log(`🚜 ===== UPGRADING USER TO FARMER =====`)
      console.log(`   User ID: ${userId}`)

      const currentDetails = await this.getUserDetails(userId)

      if (!currentDetails) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      if (currentDetails.role === 'farmer') {
        return {
          success: true,
          message: 'User is already a farmer'
        }
      }

      const success = await this.updateUserRole(userId, 'farmer')

      if (success) {
        console.log('✅ Successfully upgraded to farmer!')
        return {
          success: true,
          message: 'Successfully upgraded to farmer'
        }
      } else {
        console.log('❌ Failed to upgrade to farmer')
        return {
          success: false,
          message: 'Failed to update role'
        }
      }
    } catch (error) {
      console.error('💥 Exception during upgrade:', error)
      return {
        success: false,
        message: 'An error occurred during upgrade'
      }
    }
  }

  /**
   * Check if auth metadata is in sync with profiles table
   */
  async checkRoleSync(userId: string): Promise<{ inSync: boolean; profileRole: string; authRole: string }> {
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
      console.error('Error checking role sync:', error)
      return {
        inSync: false,
        profileRole: 'buyer',
        authRole: 'buyer'
      }
    }
  }

  /**
   * Force sync auth metadata with profiles table
   */
  async syncAuthWithProfiles(userId: string): Promise<boolean> {
    try {
      console.log('🔄 Syncing auth with profiles...')

      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (!profileData) {
        console.error('No profile found')
        return false
      }

      const correctRole = this.normalizeRole(profileData.role)

      const { error } = await supabase.auth.updateUser({
        data: { role: correctRole }
      })

      if (error) {
        console.error('Error syncing:', error)
        return false
      }

      console.log('✅ Auth synced with profiles:', correctRole)
      return true
    } catch (error) {
      console.error('Exception syncing:', error)
      return false
    }
  }

  // ===== LIVESTOCK LISTINGS MANAGEMENT =====

  /**
   * Convert database record to Animal type
   */
  private dbToAnimal(db: LivestockDB): Animal {
    const farmerName = db.first_name && db.last_name
      ? `${db.first_name} ${db.last_name}`.trim()
      : db.username || 'Unknown Farmer'

    const farmerAddress = [db.street, db.barangay, db.city, db.province, db.region]
      .filter(Boolean)
      .join(', ') || db.location

    const animal: Animal = {
      id: db.id,
      title: db.title,
      type: db.type,
      breed: db.breed,
      weight: db.weight,
      quantity: db.quantity,
      originalQuantity: db.original_quantity,
      age: db.age,
      gender: db.gender,
      status: db.status,
      healthStatus: db.health_status || [],
      price: db.price,
      deliveryOptions: db.delivery_options || [],
      images: db.images.length > 0 ? db.images : [
        'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ],
      description: db.description,
      datePosted: db.created_at,
      farmer: {
        id: db.user_id,
        name: farmerName,
        farmName: db.farm_name || `${farmerName}'s Farm`,
        contact: db.phone_number || '+63 XXX XXX XXXX',
        email: '',
        address: farmerAddress,
        avatar: db.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(farmerName)}&background=random`
      },
      location: db.location,
      isAuction: db.is_auction,
      startingBid: db.starting_bid || undefined,
      currentBid: db.current_bid || undefined,
      bidCount: db.bid_count || 0,
      endTime: db.end_time || undefined,
      auctionStartTime: db.auction_start_time || undefined
    }

    return animal
  }

  /**
   * Get all active livestock listings (Available + Low Stock only)
   */
  async getAllListings(): Promise<{ success: boolean; data?: Animal[]; error?: string }> {
    try {
      console.log('📋 Fetching all marketplace listings...')

      const { data, error } = await supabase
        .from('livestock_with_farmer')
        .select('*')
        .in('status', ['Available', 'Low Stock'])
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Error fetching listings:', error)
        return { success: false, error: error.message }
      }

      const animals = (data || []).map(item => this.dbToAnimal(item as LivestockDB))
      console.log(`✅ Fetched ${animals.length} listings`)

      return { success: true, data: animals }
    } catch (error: any) {
      console.error('💥 Error in getAllListings:', error)
      return { success: false, error: error.message || 'Failed to fetch listings' }
    }
  }

  /**
   * Get listings filtered by type
   */
  async getListingsByType(type: string): Promise<{ success: boolean; data?: Animal[]; error?: string }> {
    try {
      console.log('📋 Fetching listings by type:', type)

      const { data, error } = await supabase
        .from('livestock_with_farmer')
        .select('*')
        .eq('type', type)
        .in('status', ['Available', 'Low Stock'])
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Error fetching listings by type:', error)
        return { success: false, error: error.message }
      }

      const animals = (data || []).map(item => this.dbToAnimal(item as LivestockDB))
      console.log(`✅ Fetched ${animals.length} ${type} listings`)

      return { success: true, data: animals }
    } catch (error: any) {
      console.error('💥 Error in getListingsByType:', error)
      return { success: false, error: error.message || 'Failed to fetch listings' }
    }
  }

  /**
   * Get single listing by ID
   */
  async getListing(id: string): Promise<{ success: boolean; data?: Animal; error?: string }> {
    try {
      console.log('📋 Fetching listing:', id)

      const { data, error } = await supabase
        .from('livestock_with_farmer')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('❌ Error fetching listing:', error)
        return { success: false, error: error.message }
      }

      const animal = this.dbToAnimal(data as LivestockDB)
      return { success: true, data: animal }
    } catch (error: any) {
      console.error('💥 Error in getListing:', error)
      return { success: false, error: error.message || 'Failed to fetch listing' }
    }
  }

  /**
   * Get auction listings only
   */
  async getAuctionListings(): Promise<{ success: boolean; data?: Animal[]; error?: string }> {
    try {
      console.log('📋 Fetching auction listings...')

      const { data, error } = await supabase
        .from('livestock_with_farmer')
        .select('*')
        .eq('is_auction', true)
        .in('status', ['Available', 'Low Stock'])
        .order('end_time', { ascending: true })

      if (error) {
        console.error('❌ Error fetching auction listings:', error)
        return { success: false, error: error.message }
      }

      const animals = (data || []).map(item => this.dbToAnimal(item as LivestockDB))
      console.log(`✅ Fetched ${animals.length} auction listings`)

      return { success: true, data: animals }
    } catch (error: any) {
      console.error('💥 Error in getAuctionListings:', error)
      return { success: false, error: error.message || 'Failed to fetch auction listings' }
    }
  }

  /**
   * Get buy now listings only (non-auction)
   */
  async getBuyNowListings(): Promise<{ success: boolean; data?: Animal[]; error?: string }> {
    try {
      console.log('📋 Fetching buy now listings...')

      const { data, error } = await supabase
        .from('livestock_with_farmer')
        .select('*')
        .eq('is_auction', false)
        .in('status', ['Available', 'Low Stock'])
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Error fetching buy now listings:', error)
        return { success: false, error: error.message }
      }

      const animals = (data || []).map(item => this.dbToAnimal(item as LivestockDB))
      console.log(`✅ Fetched ${animals.length} buy now listings`)

      return { success: true, data: animals }
    } catch (error: any) {
      console.error('💥 Error in getBuyNowListings:', error)
      return { success: false, error: error.message || 'Failed to fetch buy now listings' }
    }
  }

  /**
   * Search listings
   */
  async searchListings(query: string): Promise<{ success: boolean; data?: Animal[]; error?: string }> {
    try {
      console.log('🔍 Searching listings:', query)

      const { data, error } = await supabase
        .from('livestock_with_farmer')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,type.ilike.%${query}%,breed.ilike.%${query}%`)
        .in('status', ['Available', 'Low Stock'])
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Error searching listings:', error)
        return { success: false, error: error.message }
      }

      const animals = (data || []).map(item => this.dbToAnimal(item as LivestockDB))
      console.log(`✅ Found ${animals.length} listings matching "${query}"`)

      return { success: true, data: animals }
    } catch (error: any) {
      console.error('💥 Error in searchListings:', error)
      return { success: false, error: error.message || 'Failed to search listings' }
    }
  }
}

export const marketplaceService = new MarketplaceService()
