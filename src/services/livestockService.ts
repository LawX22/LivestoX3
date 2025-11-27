// LivestockService.ts - FIXED VERSION WITH PROPER PICKUP PARSING
import { supabase } from '@/supabase'
import type { Animal, Farmer, CreateListingForm, QuantityUpdateData, ParsedDeliveryOptions, ParsedPickupSchedule, ParsedDeliveryInfo } from '../types/managementTypes'

// Database types
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
  delivery_options: string[]  // Now contains encoded data
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

export class LivestockService {
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
  private static getLowStockThreshold(originalQuantity: number): number {
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
  private static calculateStatus(quantity: number, originalQuantity: number): string {
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
   * ✅ FIXED PUBLIC METHOD - Parse delivery options from encoded string array
   * Format: "pickup:Mon|Tue|Wed:09:00:17:00" or "delivery:500"
   * 
   * CRITICAL FIX: Uses regex to properly handle time format (HH:MM) which contains colons
   */
  static parseDeliveryInfo(deliveryOptions: string[] | null | undefined): ParsedDeliveryOptions {
    console.log('🔍 PUBLIC parseDeliveryInfo called with:', deliveryOptions)
    
    const parsed: ParsedDeliveryOptions = {
      hasPickup: false,
      hasDelivery: false
    }

    if (!deliveryOptions || !Array.isArray(deliveryOptions) || deliveryOptions.length === 0) {
      console.warn('⚠️ No valid delivery options provided:', deliveryOptions)
      return parsed
    }

    for (const option of deliveryOptions) {
      // Skip empty or invalid options
      if (!option || typeof option !== 'string') {
        console.warn('⚠️ Skipping invalid option:', option)
        continue
      }

      console.log('  📦 Processing option:', option)
      
      if (option.startsWith('pickup:')) {
        try {
          // ✅ CRITICAL FIX: Use regex to properly parse time format
          // Pattern: pickup:Days:HH:MM:HH:MM
          // Example: "pickup:Mon|Tue|Wed:09:00:17:00"
          const match = option.match(/^pickup:([^:]+):(\d{2}:\d{2}):(\d{2}:\d{2})$/)
          console.log('    🔸 Pickup regex match:', match)
          
          if (match) {
            const [, daysStr, startTime, endTime] = match
            const days = daysStr.split('|').filter(day => day.trim().length > 0)
            
            if (days.length > 0) {
              parsed.hasPickup = true
              parsed.pickup = {
                availableDays: days,
                startTime,
                endTime
              }
              console.log('    ✅ Parsed pickup:', parsed.pickup)
            } else {
              console.error('    ❌ No valid days found in pickup option')
            }
          } else {
            console.error('    ❌ Invalid pickup format - could not match pattern:', option)
          }
        } catch (error) {
          console.error('    ❌ Error parsing pickup option:', error)
        }
      } else if (option.startsWith('delivery:')) {
        try {
          // Parse delivery: "delivery:500"
          const feeStr = option.substring(9).trim() // Remove "delivery:" prefix
          const fee = parseFloat(feeStr)
          console.log('    🔸 Delivery fee string:', feeStr, '-> parsed:', fee)
          
          if (!isNaN(fee) && fee >= 0) {
            parsed.hasDelivery = true
            parsed.delivery = {
              fee
            }
            console.log('    ✅ Parsed delivery:', parsed.delivery)
          } else {
            console.error('    ❌ Invalid delivery fee:', feeStr)
          }
        } catch (error) {
          console.error('    ❌ Error parsing delivery option:', error)
        }
      } else {
        console.warn('    ⚠️ Unknown delivery option format:', option)
      }
    }

    console.log('✅ PUBLIC parseDeliveryInfo result:', parsed)
    return parsed
  }

  /**
   * Upload images to Supabase Storage
   * @param files - Array of File objects to upload
   * @param userId - User ID for organizing files
   * @returns Array of public URLs
   */
  static async uploadImages(files: File[], userId: string): Promise<{ success: boolean; urls?: string[]; error?: string }> {
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
      
      return { success: true, urls: uploadedUrls }
    } catch (error: any) {
      console.error('Error in uploadImages:', error)
      return { success: false, error: error.message || 'Failed to upload images' }
    }
  }

  /**
   * Delete images from Supabase Storage
   * @param imageUrls - Array of image URLs to delete
   */
  static async deleteImages(imageUrls: string[]): Promise<{ success: boolean; error?: string }> {
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

  /**
   * Convert database record to Animal type
   * ✅ UPDATED: Parses delivery info from delivery_options array
   */
  private static dbToAnimal(db: LivestockDB): Animal {
    // Build farmer info
    const farmer: Farmer = {
      id: 0,
      name: db.first_name && db.last_name 
        ? `${db.first_name} ${db.last_name}`.trim()
        : db.username || 'Unknown Farmer',
      farmName: db.farm_name || undefined,
      contact: db.phone_number || '',
      email: '',
      address: [db.street, db.barangay, db.city, db.province, db.region]
        .filter(Boolean)
        .join(', ') || db.location,
      avatar: db.profile_picture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + db.user_id
    }

    // Parse delivery options using the PUBLIC method
    console.log('🔄 Converting DB record to Animal, delivery_options:', db.delivery_options)
    console.log('🔄 Type of delivery_options:', typeof db.delivery_options, 'Is Array:', Array.isArray(db.delivery_options))
    
    const parsedDelivery = this.parseDeliveryInfo(db.delivery_options)
    
    console.log('📦 Parsed delivery options for Animal:', {
      raw: db.delivery_options,
      parsed: parsedDelivery
    })

    const animal: Animal = {
      id: parseInt(db.id.replace(/-/g, '').substring(0, 8), 16),
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
      healthStatus: db.health_status,
      price: db.price,
      priceUnit: db.price_unit || 'per head',
      deliveryOptions: db.delivery_options, // Keep original encoded format
      paymentMethods: db.payment_methods,
      images: db.images.length > 0 ? db.images : [
        'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ],
      description: db.description,
      datePosted: db.created_at,
      farmer,
      location: db.location,
      isAuction: db.is_auction,
      startingBid: db.starting_bid || undefined,
      currentBid: db.current_bid || undefined,
      bidCount: db.bid_count,
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

  /**
   * Calculate auction duration in human-readable format
   */
  private static calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime).getTime()
    const end = new Date(endTime).getTime()
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    
    if (days === 1) return '1 day'
    if (days <= 3) return `${days} days`
    if (days <= 7) return '3-7d'
    if (days <= 14) return '7-14d'
    return '14d+'
  }

  /**
   * Get all livestock listings
   */
  static async getAllListings(): Promise<{ success: boolean; data?: Animal[]; error?: string }> {
    try {
      console.log('📋 Fetching all livestock listings...')

      const { data, error } = await supabase
        .from('livestock_with_farmer')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching listings:', error)
        return { success: false, error: error.message }
      }

      const animals = (data || []).map(item => this.dbToAnimal(item as LivestockDB))
      console.log(`✅ Fetched ${animals.length} listings`)

      return { success: true, data: animals }
    } catch (error: any) {
      console.error('Error in getAllListings:', error)
      return { success: false, error: error.message || 'Failed to fetch listings' }
    }
  }

  /**
   * Get livestock listings for current user (farmer only)
   */
  static async getMyListings(): Promise<{ success: boolean; data?: Animal[]; error?: string }> {
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
   * Get single listing by ID
   */
  static async getListing(id: string): Promise<{ success: boolean; data?: Animal; error?: string }> {
    try {
      console.log('🔍 Fetching listing:', id)
      
      const { data, error } = await supabase
        .from('livestock_with_farmer')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching listing:', error)
        return { success: false, error: error.message }
      }

      console.log('📦 Raw listing data from DB:', data)
      console.log('📦 Delivery options from DB:', data.delivery_options)
      console.log('📦 Type of delivery_options:', typeof data.delivery_options, 'Is Array:', Array.isArray(data.delivery_options))
      
      const animal = this.dbToAnimal(data as LivestockDB)
      
      console.log('✅ Converted to Animal object:', animal)
      console.log('✅ Animal delivery options:', animal.deliveryOptions)
      
      return { success: true, data: animal }
    } catch (error: any) {
      console.error('Error in getListing:', error)
      return { success: false, error: error.message || 'Failed to fetch listing' }
    }
  }

  /**
   * Create new livestock listing
   */
  static async createListing(listingData: CreateListingForm): Promise<{ success: boolean; data?: Animal; error?: string }> {
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

      if (profile?.role !== 'Farmer') {
        return { success: false, error: 'Only farmers can create listings' }
      }

      console.log('📝 Creating new listing...')
      console.log('📦 Delivery options to save:', listingData.deliveryOptions)

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
        delivery_options: listingData.deliveryOptions, // Already encoded
        payment_methods: listingData.paymentMethods,
        images: listingData.images,
        is_auction: false
      }

      console.log('📤 Inserting data:', insertData)
      console.log('📦 Delivery options being saved:', insertData.delivery_options)

      const { data, error } = await supabase
        .from('livestock_listings')
        .insert(insertData)
        .select()
        .single()

      if (error) {
        console.error('Error creating listing:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Listing created successfully:', data)

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
  static async updateListing(
    id: string, 
    updates: Partial<CreateListingForm>,
    oldImages?: string[]
  ): Promise<{ success: boolean; data?: Animal; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('💾 Updating listing:', id)
      console.log('📦 Delivery options in update:', updates.deliveryOptions)

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

      console.log('📤 Update data being sent:', updateData)

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
  static async updateQuantity(data: QuantityUpdateData): Promise<{ success: boolean; error?: string }> {
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
  static async deleteListing(id: string): Promise<{ success: boolean; error?: string }> {
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
        const storageImages = listing.images.filter(img => img.includes('livestock-images'))
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
  static isAuctionAvailable(): boolean {
    return false
  }

  /**
   * Get auction unavailable message
   */
  static getAuctionUnavailableMessage(): string {
    return 'Auction features are coming soon! We\'re working hard to bring you a complete auction experience. For now, please use the "Buy Now" listings to sell your livestock.'
  }
}