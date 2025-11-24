// services/profileService.ts
import { supabase } from '@/supabase'
import type { User, ProfileDB, Address, FarmInfoDB } from '../types/user'
import { dbProfileToUser } from '../types/user'

// Configuration
const STORAGE_BUCKET = 'avatars'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export class ProfileService {
  /**
   * Validate image file
   */
  private static validateImageFile(file: File, maxSize: number = MAX_FILE_SIZE): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > maxSize) {
      return { valid: false, error: `File size must be less than ${maxSize / (1024 * 1024)}MB` }
    }

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return { valid: false, error: 'Only JPEG, PNG, WebP, and GIF images are allowed' }
    }

    return { valid: true }
  }

  /**
   * Get user profile by user ID
   */
  static async getProfile(userId: string): Promise<User | null> {
    try {
      console.log('📊 Fetching profile for user:', userId)

      // Fetch profile data
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      // Get email from auth
      const { data: { user: authUser } } = await supabase.auth.getUser()
      const email = authUser?.email || ''

      // Get addresses from separate table
      const addresses = await this.getAddresses(userId)

      // Convert profile to User and add addresses
      const user = dbProfileToUser(profile as ProfileDB, email)
      user.addresses = addresses

      // 🚜 Fetch farm info if user is a Farmer
      if (profile.role === 'Farmer') {
        console.log('🚜 Fetching farm info for farmer...')
        const farmInfo = await this.getFarmInfo(userId)
        
        if (farmInfo) {
          user.farmName = farmInfo.farm_name
          user.farmSize = farmInfo.farm_size
          user.farmSizeUnit = farmInfo.farm_size_unit
          user.livestockTypes = farmInfo.livestock_types
          user.description = farmInfo.description
          user.farmAddress = {
            street: farmInfo.street,
            barangay: farmInfo.barangay,
            city: farmInfo.city,
            province: farmInfo.province,
            region: farmInfo.region
          }
          console.log('✅ Farm info loaded:', farmInfo)
        } else {
          console.warn('⚠️  No farm info found for farmer')
        }
      }

      return user
    } catch (error) {
      console.error('Error in getProfile:', error)
      return null
    }
  }

  /**
   * Get farm info from farm_info table
   */
  static async getFarmInfo(userId: string): Promise<FarmInfoDB | null> {
    try {
      const { data, error } = await supabase
        .from('farm_info')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned - this is expected for users without farm info
          return null
        }
        console.error('Error fetching farm info:', error)
        return null
      }

      return data as FarmInfoDB
    } catch (error) {
      console.error('Error in getFarmInfo:', error)
      return null
    }
  }

  /**
   * Update user profile (only basic fields that exist in schema)
   */
  static async updateProfile(userId: string, updates: Partial<User>): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('💾 Updating profile for user:', userId)

      // Only update fields that definitely exist in the profiles table
      const allowedUpdates: any = {}
      
      if (updates.username !== undefined) allowedUpdates.username = updates.username
      if (updates.firstName !== undefined) allowedUpdates.first_name = updates.firstName
      if (updates.lastName !== undefined) allowedUpdates.last_name = updates.lastName
      if (updates.phoneNumber !== undefined) allowedUpdates.phone_number = updates.phoneNumber
      if (updates.gender !== undefined) allowedUpdates.gender = updates.gender
      if (updates.profilePicture !== undefined) allowedUpdates.profile_picture = updates.profilePicture
      if (updates.bannerImage !== undefined) allowedUpdates.banner_image = updates.bannerImage
      
      // Only proceed if there are fields to update
      if (Object.keys(allowedUpdates).length > 0) {
        const { error } = await supabase
          .from('profiles')
          .update(allowedUpdates)
          .eq('id', userId)

        if (error) {
          console.error('Error updating profile:', error)
          return { success: false, error: error.message }
        }
        console.log('✅ Profile updated successfully')
      }

      // 🚜 Update farm info if provided and user is a Farmer
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (currentProfile?.role === 'Farmer' && (
        updates.farmName !== undefined ||
        updates.farmSize !== undefined ||
        updates.farmSizeUnit !== undefined ||
        updates.livestockTypes !== undefined ||
        updates.description !== undefined ||
        updates.farmAddress !== undefined
      )) {
        console.log('🚜 Updating farm info...')
        const farmUpdateResult = await this.updateFarmInfo(userId, updates)
        
        if (!farmUpdateResult.success) {
          console.error('Error updating farm info:', farmUpdateResult.error)
          return { success: false, error: farmUpdateResult.error }
        }
        console.log('✅ Farm info updated successfully')
      }

      return { success: true }
    } catch (error) {
      console.error('Error in updateProfile:', error)
      return { success: false, error: String(error) }
    }
  }

  /**
   * Update farm information in farm_info table
   */
  static async updateFarmInfo(userId: string, farmData: Partial<User>): Promise<{ success: boolean; error?: string }> {
    try {
      const farmUpdates: any = {
        updated_at: new Date().toISOString()
      }

      // Map farm data fields
      if (farmData.farmName !== undefined) farmUpdates.farm_name = farmData.farmName
      if (farmData.farmSize !== undefined) farmUpdates.farm_size = farmData.farmSize
      if (farmData.farmSizeUnit !== undefined) farmUpdates.farm_size_unit = farmData.farmSizeUnit
      
      // Handle livestock types - ensure it's an array
      if (farmData.livestockTypes !== undefined) {
        if (Array.isArray(farmData.livestockTypes)) {
          farmUpdates.livestock_types = farmData.livestockTypes
        } else if (typeof farmData.livestockTypes === 'string') {
          // Split comma-separated string into array
          farmUpdates.livestock_types = farmData.livestockTypes
            .split(',')
            .map(type => type.trim())
            .filter(type => type.length > 0)
        }
      }
      
      if (farmData.description !== undefined) farmUpdates.description = farmData.description

      // Include farm address fields
      if (farmData.farmAddress) {
        if (farmData.farmAddress.street !== undefined) farmUpdates.street = farmData.farmAddress.street
        if (farmData.farmAddress.barangay !== undefined) farmUpdates.barangay = farmData.farmAddress.barangay
        if (farmData.farmAddress.city !== undefined) farmUpdates.city = farmData.farmAddress.city
        if (farmData.farmAddress.province !== undefined) farmUpdates.province = farmData.farmAddress.province
        if (farmData.farmAddress.region !== undefined) farmUpdates.region = farmData.farmAddress.region
      }

      // Check if farm info exists
      const { data: existingFarmInfo } = await supabase
        .from('farm_info')
        .select('id')
        .eq('user_id', userId)
        .single()

      if (existingFarmInfo) {
        // Update existing farm info
        const { error: farmError } = await supabase
          .from('farm_info')
          .update(farmUpdates)
          .eq('user_id', userId)

        if (farmError) {
          console.error('Error updating farm info:', farmError)
          return { success: false, error: farmError.message }
        }
      } else {
        // Insert new farm info
        const { error: farmError } = await supabase
          .from('farm_info')
          .insert({ ...farmUpdates, user_id: userId })

        if (farmError) {
          console.error('Error inserting farm info:', farmError)
          return { success: false, error: farmError.message }
        }
      }

      return { success: true }
    } catch (error: any) {
      console.error('Error in updateFarmInfo:', error)
      return { success: false, error: error.message || 'Failed to update farm info' }
    }
  }

  /**
   * Create initial profile (called after signup)
   */
  static async createProfile(userId: string, userData: Partial<User>): Promise<{ success: boolean; error?: string }> {
    try {
      const profileData: any = {
        id: userId,
        created_at: new Date().toISOString()
      }
      
      if (userData.username) profileData.username = userData.username
      if (userData.firstName) profileData.first_name = userData.firstName
      if (userData.lastName) profileData.last_name = userData.lastName
      if (userData.phoneNumber) profileData.phone_number = userData.phoneNumber
      if (userData.gender) profileData.gender = userData.gender
      if (userData.role) profileData.role = userData.role
      
      const { error } = await supabase
        .from('profiles')
        .insert(profileData)

      if (error) {
        console.error('Error creating profile:', error)
        return { success: false, error: error.message }
      }

      // If addresses were provided, create them
      if (userData.addresses && userData.addresses.length > 0) {
        await this.createAddresses(userId, userData.addresses)
      }

      return { success: true }
    } catch (error) {
      console.error('Error in createProfile:', error)
      return { success: false, error: String(error) }
    }
  }

  /**
   * Delete old image from storage
   */
  private static async deleteOldImage(imageUrl: string | null | undefined, bucket: string = STORAGE_BUCKET): Promise<void> {
    if (!imageUrl) return

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split(`/${bucket}/`)
      if (urlParts.length < 2) return

      const filePath = urlParts[1]
      
      // Delete the old file
      await supabase.storage
        .from(bucket)
        .remove([filePath])
    } catch (error) {
      console.error('Error deleting old image:', error)
      // Don't throw error, as this is not critical
    }
  }

  /**
   * Upload profile picture
   */
  static async uploadProfilePicture(userId: string, file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      console.log('📸 Starting profile picture upload...')
      console.log('File:', file.name, 'Size:', Math.round(file.size / 1024), 'KB')
      
      // Validate file
      const validation = this.validateImageFile(file)
      if (!validation.valid) {
        console.error('❌ Validation failed:', validation.error)
        return { success: false, error: validation.error }
      }
      console.log('✅ File validation passed')

      // Get current profile to delete old picture
      const profile = await this.getProfile(userId)
      
      // Generate unique file name
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${userId}-profile-${Date.now()}.${fileExt}`
      const filePath = `profile-pictures/${fileName}`
      
      console.log('📤 Uploading to bucket:', STORAGE_BUCKET, 'path:', filePath)

      // Upload new file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { 
          upsert: true,
          contentType: file.type
        })

      if (uploadError) {
        console.error('❌ Upload failed:', uploadError)
        
        // Provide helpful error message based on error type
        if (uploadError.message.includes('not found') || uploadError.message.includes('does not exist')) {
          return { 
            success: false, 
            error: `Storage bucket '${STORAGE_BUCKET}' not found. Please create it in Supabase Dashboard:\n1. Go to Storage\n2. Click 'New bucket'\n3. Name: ${STORAGE_BUCKET}\n4. Set as PUBLIC ✅\n5. Click Create` 
          }
        }
        
        if (uploadError.message.includes('policy')) {
          return { 
            success: false, 
            error: 'Storage permission denied. Please add storage policies in Supabase Dashboard > Storage > avatars > Policies' 
          }
        }
        
        return { success: false, error: `Upload failed: ${uploadError.message}` }
      }
      
      console.log('✅ File uploaded successfully:', uploadData)

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath)

      const publicUrl = urlData?.publicUrl

      if (!publicUrl) {
        console.error('❌ Failed to get public URL')
        return { success: false, error: 'Failed to get public URL for uploaded image' }
      }
      console.log('✅ Public URL generated:', publicUrl)

      // Update profile with new picture URL
      console.log('💾 Updating profile in database...')
      const updateResult = await this.updateProfile(userId, { profilePicture: publicUrl })
      
      if (!updateResult.success) {
        console.error('❌ Profile update failed:', updateResult.error)
        return { success: false, error: updateResult.error }
      }
      console.log('✅ Profile updated in database')

      // Delete old profile picture if it exists
      if (profile?.profilePicture) {
        console.log('🗑️  Deleting old profile picture...')
        await this.deleteOldImage(profile.profilePicture)
      }

      console.log('✨ Profile picture upload complete!')
      return { success: true, url: publicUrl }
    } catch (error) {
      console.error('💥 Unexpected error in uploadProfilePicture:', error)
      return { success: false, error: 'An unexpected error occurred while uploading your profile picture' }
    }
  }

  /**
   * Upload banner image
   */
  static async uploadBannerImage(userId: string, file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      console.log('🖼️  Starting banner upload...')
      console.log('File:', file.name, 'Size:', Math.round(file.size / 1024), 'KB')
      
      // Validate file
      const validation = this.validateImageFile(file)
      if (!validation.valid) {
        console.error('❌ Validation failed:', validation.error)
        return { success: false, error: validation.error }
      }
      console.log('✅ File validation passed')

      // Get current profile to delete old banner
      const profile = await this.getProfile(userId)

      // Generate unique file name
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${userId}-banner-${Date.now()}.${fileExt}`
      const filePath = `banners/${fileName}`
      
      console.log('📤 Uploading to bucket:', STORAGE_BUCKET, 'path:', filePath)

      // Upload new file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { 
          upsert: true,
          contentType: file.type
        })

      if (uploadError) {
        console.error('❌ Upload failed:', uploadError)
        
        // Provide helpful error message based on error type
        if (uploadError.message.includes('not found') || uploadError.message.includes('does not exist')) {
          return { 
            success: false, 
            error: `Storage bucket '${STORAGE_BUCKET}' not found. Please create it in Supabase Dashboard:\n1. Go to Storage\n2. Click 'New bucket'\n3. Name: ${STORAGE_BUCKET}\n4. Set as PUBLIC ✅\n5. Click Create` 
          }
        }
        
        if (uploadError.message.includes('policy')) {
          return { 
            success: false, 
            error: 'Storage permission denied. Please add storage policies in Supabase Dashboard > Storage > avatars > Policies' 
          }
        }
        
        return { success: false, error: `Upload failed: ${uploadError.message}` }
      }
      
      console.log('✅ File uploaded successfully:', uploadData)

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath)

      const publicUrl = urlData?.publicUrl

      if (!publicUrl) {
        console.error('❌ Failed to get public URL')
        return { success: false, error: 'Failed to get public URL for uploaded image' }
      }
      console.log('✅ Public URL generated:', publicUrl)

      // Update profile with new banner URL
      console.log('💾 Updating profile in database...')
      const updateResult = await this.updateProfile(userId, { bannerImage: publicUrl })
      
      if (!updateResult.success) {
        console.error('❌ Profile update failed:', updateResult.error)
        return { success: false, error: updateResult.error }
      }
      console.log('✅ Profile updated in database')

      // Delete old banner if it exists
      if (profile?.bannerImage) {
        console.log('🗑️  Deleting old banner...')
        await this.deleteOldImage(profile.bannerImage)
      }

      console.log('✨ Banner upload complete!')
      return { success: true, url: publicUrl }
    } catch (error) {
      console.error('💥 Unexpected error in uploadBannerImage:', error)
      return { success: false, error: 'An unexpected error occurred while uploading your banner image' }
    }
  }

  /**
   * Get user addresses from addresses table
   */
  static async getAddresses(userId: string): Promise<Address[]> {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching addresses:', error)
        return []
      }

      // Convert database format to Address format
      return (data || []).map(addr => ({
        id: addr.id,
        fullName: addr.full_name,
        label: addr.label,
        phoneNumber: addr.phone_number,
        street: addr.street,
        barangay: addr.barangay,
        city: addr.city,
        province: addr.province,
        region: addr.region,
        zipCode: addr.zip_code,
        description: addr.description,
        isDefault: addr.is_default || false
      }))
    } catch (error) {
      console.error('Error fetching addresses:', error)
      return []
    }
  }

  /**
   * Create addresses in addresses table
   */
  static async createAddresses(userId: string, addresses: Address[]): Promise<{ success: boolean; error?: string }> {
    try {
      const addressesData = addresses.map(addr => ({
        user_id: userId,
        full_name: addr.fullName,
        label: addr.label,
        phone_number: addr.phoneNumber,
        street: addr.street,
        barangay: addr.barangay,
        city: addr.city,
        province: addr.province,
        region: addr.region,
        zip_code: addr.zipCode,
        description: addr.description,
        is_default: addr.isDefault || false,
        created_at: new Date().toISOString()
      }))

      const { error } = await supabase
        .from('addresses')
        .insert(addressesData)

      if (error) {
        console.error('Error creating addresses:', error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }

  /**
   * Update user addresses in addresses table
   */
  static async updateAddresses(userId: string, addresses: Address[]): Promise<{ success: boolean; error?: string }> {
    try {
      // Delete all existing addresses for this user
      const { error: deleteError } = await supabase
        .from('addresses')
        .delete()
        .eq('user_id', userId)

      if (deleteError) {
        console.error('Error deleting existing addresses:', deleteError)
        return { success: false, error: deleteError.message }
      }

      // If no addresses to add, return success
      if (!addresses || addresses.length === 0) {
        return { success: true }
      }

      // Insert new addresses
      const addressesData = addresses.map(addr => ({
        user_id: userId,
        full_name: addr.fullName,
        label: addr.label,
        phone_number: addr.phoneNumber,
        street: addr.street,
        barangay: addr.barangay,
        city: addr.city,
        province: addr.province,
        region: addr.region,
        zip_code: addr.zipCode,
        description: addr.description,
        is_default: addr.isDefault || false,
        created_at: new Date().toISOString()
      }))

      const { error: insertError } = await supabase
        .from('addresses')
        .insert(addressesData)

      if (insertError) {
        console.error('Error inserting addresses:', insertError)
        return { success: false, error: insertError.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }

  /**
   * Add a single address
   */
  static async addAddress(userId: string, address: Address): Promise<{ success: boolean; data?: Address; error?: string }> {
    try {
      // If this address should be default, unset other defaults
      if (address.isDefault) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', userId)
      }

      const { data, error } = await supabase
        .from('addresses')
        .insert({
          user_id: userId,
          full_name: address.fullName,
          label: address.label,
          phone_number: address.phoneNumber,
          street: address.street,
          barangay: address.barangay,
          city: address.city,
          province: address.province,
          region: address.region,
          zip_code: address.zipCode,
          description: address.description,
          is_default: address.isDefault || false,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      const newAddress: Address = {
        id: data.id,
        fullName: data.full_name,
        label: data.label,
        phoneNumber: data.phone_number,
        street: data.street,
        barangay: data.barangay,
        city: data.city,
        province: data.province,
        region: data.region,
        zipCode: data.zip_code,
        description: data.description,
        isDefault: data.is_default
      }

      return { success: true, data: newAddress }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }

  /**
   * Update a single address
   */
  static async updateAddress(addressId: string, userId: string, address: Address): Promise<{ success: boolean; error?: string }> {
    try {
      // If this address should be default, unset other defaults
      if (address.isDefault) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', userId)
      }

      const { error } = await supabase
        .from('addresses')
        .update({
          full_name: address.fullName,
          label: address.label,
          phone_number: address.phoneNumber,
          street: address.street,
          barangay: address.barangay,
          city: address.city,
          province: address.province,
          region: address.region,
          zip_code: address.zipCode,
          description: address.description,
          is_default: address.isDefault || false
        })
        .eq('id', addressId)
        .eq('user_id', userId) // Ensure user owns this address

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }

  /**
   * Delete a single address
   */
  static async deleteAddress(addressId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId)
        .eq('user_id', userId) // Ensure user owns this address

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }
}