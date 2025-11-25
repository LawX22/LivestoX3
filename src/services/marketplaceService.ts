// services/marketplaceService.ts - FIXED VERSION WITH CENTRALIZED TYPES
import { supabase } from '../supabase'

// ===== IMPORT CENTRALIZED TYPES =====
import type { 
  Animal, 
  Farmer, 
  UserDetails,
  CreateListingForm,
  QuantityUpdateData,
  ApiResponse
} from '@/types/animalTypes'

// ===== SERVICE-SPECIFIC TYPES (Database Layer) =====
// These types match the database schema and are only used internally
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
  // ===== SMART THRESHOLD SYSTEM =====

  /**
   * ✅ SMART THRESHOLD FUNCTION - Dynamic based on original quantity
   * Calculates the low stock threshold based on the original quantity
   * 
   * Thresholds:
   * - 1-5 items: Low stock at 2 or less
   * - 6-10 items: Low stock at 3 or less
   * - 11-20 items: Low stock at 5 or less
   * - 21-50 items: Low stock at 10 or less (20%)
   * - 51-100 items: Low stock at 20% of original
   * - 100+ items: Low stock at 15% of original
   */
  private getLowStockThreshold(originalQuantity: number): number {
    if (originalQuantity <= 5) {
      return 2
    } else if (originalQuantity <= 10) {
      return 3
    } else if (originalQuantity <= 20) {
      return 5
    } else if (originalQuantity <= 50) {
      return 10
    } else if (originalQuantity <= 100) {
      return Math.ceil(originalQuantity * 0.20)
    } else {
      return Math.ceil(originalQuantity * 0.15)
    }
  }

  /**
   * Calculate status based on quantity with dynamic thresholds
   */
  private calculateStatus(quantity: number, originalQuantity: number): string {
    if (quantity === 0) {
      return 'Out of Stock'
    }
    
    const threshold = this.getLowStockThreshold(originalQuantity)
    
    if (quantity <= threshold) {
      return 'Low Stock'
    }
    
    return 'Available'
  }

  /**
   * Calculate auction duration in human-readable format
   */
  private calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime).getTime()
    const end = new Date(endTime).getTime()
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    
    if (days === 1) return '1 day'
    if (days <= 3) return `${days} days`
    if (days <= 7) return '3-7d'
    if (days <= 14) return '7-14d'
    return '14d+'
  }

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
  async upgradeToFarmer(userId: string): Promise<ApiResponse<void>> {
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

  // ===== IMAGE MANAGEMENT =====

  /**
   * Upload images to Supabase Storage
   * @param files - Array of File objects to upload
   * @param userId - User ID for organizing files
   * @returns Array of public URLs
   */
  async uploadImages(files: File[], userId: string): Promise<ApiResponse<string[]>> {
    try {
      const uploadedUrls: string[] = []
      
      for (const file of files) {
        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
        console.log(`📤 Uploading image: ${fileName}`)
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('livestock-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          })
        
        if (error) {
          console.error('Error uploading image:', error)
          return { success: false, error: `Failed to upload ${file.name}: ${error.message}` }
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('livestock-images')
          .getPublicUrl(fileName)
        
        uploadedUrls.push(publicUrl)
        console.log(`✅ Image uploaded: ${publicUrl}`)
      }
      
      return { success: true, data: uploadedUrls }
    } catch (error: any) {
      console.error('Error in uploadImages:', error)
      return { success: false, error: error.message || 'Failed to upload images' }
    }
  }

  /**
   * Delete images from Supabase Storage
   * @param imageUrls - Array of image URLs to delete
   */
  async deleteImages(imageUrls: string[]): Promise<ApiResponse<void>> {
    try {
      // Extract file paths from URLs
      const filePaths = imageUrls
        .map(url => {
          const matches = url.match(/livestock-images\/(.+)/)
          return matches ? matches[1] : null
        })
        .filter(Boolean) as string[]
      
      if (filePaths.length === 0) {
        return { success: true }
      }
      
      console.log(`🗑️ Deleting ${filePaths.length} images from storage`)
      
      const { error } = await supabase.storage
        .from('livestock-images')
        .remove(filePaths)
      
      if (error) {
        console.error('Error deleting images:', error)
        return { success: false, error: error.message }
      }
      
      console.log('✅ Images deleted successfully')
      return { success: true }
    } catch (error: any) {
      console.error('Error in deleteImages:', error)
      return { success: false, error: error.message || 'Failed to delete images' }
    }
  }

  // ===== LIVESTOCK DATA CONVERSION =====

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

    const farmer: Farmer = {
      id: db.user_id,
      name: farmerName,
      farmName: db.farm_name || `${farmerName}'s Farm`,
      contact: db.phone_number || '+63 XXX XXX XXXX',
      email: '',
      address: farmerAddress,
      avatar: db.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(farmerName)}&background=random`
    }

    const animal: Animal = {
      id: db.id,
      uuid: db.id,
      title: db.title,
      type: db.type,
      breed: db.breed,
      weight: db.weight,
      weightUnit: db.weight_unit || 'kg',
      quantity: db.quantity,
      originalQuantity: db.original_quantity,
      age: db.age,
      gender: db.gender,
      status: db.status,
      healthStatus: db.health_status || [],
      price: db.price,
      priceUnit: db.price_unit || 'per head',
      deliveryOptions: db.delivery_options || [],
      paymentMethods: db.payment_methods || [],
      images: db.images.length > 0 ? db.images : [
        'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ],
      description: db.description,
      datePosted: db.created_at,
      farmer: farmer,
      location: db.location,
      isAuction: db.is_auction,
      startingBid: db.starting_bid || undefined,
      currentBid: db.current_bid || undefined,
      bidCount: db.bid_count || 0,
      endTime: db.end_time || undefined,
      duration: db.auction_start_time && db.end_time 
        ? this.calculateDuration(db.auction_start_time, db.end_time)
        : undefined,
      auctionStartTime: db.auction_start_time || undefined,
      reservePrice: db.reserve_price || undefined,
      bidIncrement: db.bid_increment || undefined,
      paymentTerms: db.payment_terms || undefined,
      additionalTerms: db.additional_terms || undefined
    }

    return animal
  }

  // ===== LIVESTOCK LISTINGS MANAGEMENT =====

  /**
   * Get all active livestock listings (Available + Low Stock only)
   */
  async getAllListings(): Promise<ApiResponse<Animal[]>> {
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
  async getListingsByType(type: string): Promise<ApiResponse<Animal[]>> {
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
  async getListing(id: string): Promise<ApiResponse<Animal>> {
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
   * Get livestock listings for current user (farmer only)
   */
  async getMyListings(): Promise<ApiResponse<Animal[]>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📋 Fetching listings for user:', user.id)

      const { data, error } = await supabase
        .from('livestock_with_farmer')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching user listings:', error)
        return { success: false, error: error.message }
      }

      const animals = (data || []).map(item => this.dbToAnimal(item as LivestockDB))
      console.log(`✅ Fetched ${animals.length} listings for user`)

      return { success: true, data: animals }
    } catch (error: any) {
      console.error('Error in getMyListings:', error)
      return { success: false, error: error.message || 'Failed to fetch your listings' }
    }
  }

  /**
   * Get auction listings only
   */
  async getAuctionListings(): Promise<ApiResponse<Animal[]>> {
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
  async getBuyNowListings(): Promise<ApiResponse<Animal[]>> {
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
  async searchListings(query: string): Promise<ApiResponse<Animal[]>> {
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

  /**
   * Create new livestock listing
   */
  async createListing(listingData: CreateListingForm): Promise<ApiResponse<Animal>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      // Check if user is a farmer
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const normalizedRole = this.normalizeRole(profile?.role)

      if (normalizedRole !== 'farmer') {
        return { success: false, error: 'Only farmers can create listings' }
      }

      console.log('📝 Creating new listing...')

      const insertData = {
        user_id: user.id,
        title: listingData.title,
        description: listingData.description,
        type: listingData.type,
        breed: listingData.breed,
        weight: listingData.weight,
        weight_unit: listingData.weightUnit || 'kg',
        quantity: listingData.quantity,
        original_quantity: listingData.quantity,
        age: listingData.age,
        gender: listingData.gender,
        status: listingData.status,
        health_status: listingData.healthStatus,
        price: listingData.price,
        price_unit: listingData.priceUnit || 'per head',
        location: listingData.location,
        delivery_options: listingData.deliveryOptions,
        payment_methods: listingData.paymentMethods || [],
        images: listingData.images,
        is_auction: false
      }

      const { data, error } = await supabase
        .from('livestock_listings')
        .insert(insertData)
        .select()
        .single()

      if (error) {
        console.error('Error creating listing:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Listing created successfully')

      const result = await this.getListing(data.id)
      return result
    } catch (error: any) {
      console.error('Error in createListing:', error)
      return { success: false, error: error.message || 'Failed to create listing' }
    }
  }

  /**
   * Update existing listing
   */
  async updateListing(
    id: string, 
    updates: Partial<CreateListingForm>,
    oldImages?: string[]
  ): Promise<ApiResponse<Animal>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('💾 Updating listing:', id)

      const updateData: any = {}
      
      if (updates.title !== undefined) updateData.title = updates.title
      if (updates.description !== undefined) updateData.description = updates.description
      if (updates.type !== undefined) updateData.type = updates.type
      if (updates.breed !== undefined) updateData.breed = updates.breed
      if (updates.weight !== undefined) updateData.weight = updates.weight
      if (updates.weightUnit !== undefined) updateData.weight_unit = updates.weightUnit
      if (updates.quantity !== undefined) updateData.quantity = updates.quantity
      if (updates.age !== undefined) updateData.age = updates.age
      if (updates.gender !== undefined) updateData.gender = updates.gender
      if (updates.status !== undefined) updateData.status = updates.status
      if (updates.healthStatus !== undefined) updateData.health_status = updates.healthStatus
      if (updates.price !== undefined) updateData.price = updates.price
      if (updates.priceUnit !== undefined) updateData.price_unit = updates.priceUnit
      if (updates.location !== undefined) updateData.location = updates.location
      if (updates.deliveryOptions !== undefined) updateData.delivery_options = updates.deliveryOptions
      if (updates.paymentMethods !== undefined) updateData.payment_methods = updates.paymentMethods
      if (updates.images !== undefined) updateData.images = updates.images

      // Delete old images that were removed
      if (updates.images && oldImages) {
        const imagesToDelete = oldImages.filter(oldImg => 
          !updates.images!.includes(oldImg) && 
          oldImg.includes('livestock-images')
        )
        
        if (imagesToDelete.length > 0) {
          console.log('🧹 Cleaning up removed images:', imagesToDelete.length)
          await this.deleteImages(imagesToDelete)
        }
      }

      const { data, error } = await supabase
        .from('livestock_listings')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating listing:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Listing updated successfully')

      const result = await this.getListing(data.id)
      return result
    } catch (error: any) {
      console.error('Error in updateListing:', error)
      return { success: false, error: error.message || 'Failed to update listing' }
    }
  }

  /**
   * Update quantity and auto-update status with dynamic thresholds
   * ✅ ENHANCED: Uses smart threshold calculation
   */
  async updateQuantity(data: QuantityUpdateData): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📦 Updating quantity for listing:', data.animalId, 'New quantity:', data.newQuantity)

      // Fetch the listing using UUID
      const { data: listing, error: fetchError } = await supabase
        .from('livestock_listings')
        .select('original_quantity, quantity')
        .eq('id', data.animalId)
        .eq('user_id', user.id)
        .single()

      if (fetchError) {
        console.error('Error fetching listing:', fetchError)
        return { success: false, error: 'Listing not found or access denied' }
      }

      const originalQty = listing.original_quantity
      
      // ✅ Calculate status using smart threshold
      const newStatus = this.calculateStatus(data.newQuantity, originalQty)
      const threshold = this.getLowStockThreshold(originalQty)

      console.log('📊 Quantity update with smart thresholds:', {
        old: listing.quantity,
        new: data.newQuantity,
        original: originalQty,
        threshold,
        newStatus,
        operation: data.operation
      })

      // Update using UUID
      const { error: updateError } = await supabase
        .from('livestock_listings')
        .update({
          quantity: data.newQuantity,
          status: newStatus
        })
        .eq('id', data.animalId)
        .eq('user_id', user.id)

      if (updateError) {
        console.error('Error updating quantity:', updateError)
        return { success: false, error: updateError.message }
      }

      console.log('✅ Quantity updated successfully:', data.newQuantity, 'Status:', newStatus)
      return { success: true }
    } catch (error: any) {
      console.error('Error in updateQuantity:', error)
      return { success: false, error: error.message || 'Failed to update quantity' }
    }
  }

  /**
   * Delete listing (also deletes associated images from storage)
   */
  async deleteListing(id: string): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('🗑️ Deleting listing:', id)

      // First, get the listing to retrieve image URLs
      const { data: listing, error: fetchError } = await supabase
        .from('livestock_listings')
        .select('images')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

      if (fetchError) {
        return { success: false, error: 'Listing not found' }
      }

      // Delete images from storage (only from our storage bucket)
      if (listing.images && listing.images.length > 0) {
        const storageImages = listing.images.filter((img: string) => img.includes('livestock-images'))
        if (storageImages.length > 0) {
          console.log('🗑️ Deleting images from storage:', storageImages.length)
          await this.deleteImages(storageImages)
        }
      }

      // Delete the listing from database
      const { error } = await supabase
        .from('livestock_listings')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error deleting listing:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Listing deleted successfully')
      return { success: true }
    } catch (error: any) {
      console.error('Error in deleteListing:', error)
      return { success: false, error: error.message || 'Failed to delete listing' }
    }
  }

  /**
   * Check if auctions are available
   */
  isAuctionAvailable(): boolean {
    return false
  }

  /**
   * Get auction unavailable message
   */
  getAuctionUnavailableMessage(): string {
    return 'Auction features are coming soon! We\'re working hard to bring you a complete auction experience. For now, please use the "Buy Now" listings to sell your livestock.'
  }
}

// ===== EXPORT SINGLETON INSTANCE =====
export const marketplaceService = new MarketplaceService()

// ===== RE-EXPORT TYPES FOR CONVENIENCE =====
export type { 
  Animal, 
  Farmer, 
  UserDetails,
  CreateListingForm,
  QuantityUpdateData,
  ApiResponse
} from '@/types/animalTypes'