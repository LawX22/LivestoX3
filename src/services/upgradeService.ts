// services/upgradeService.ts
import { supabase } from '@/supabase'

const STORAGE_BUCKET = 'upgrade-documents'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', ...ALLOWED_IMAGE_TYPES]

export interface UpgradeRequestData {
  farmName: string
  farmSize: number
  farmSizeUnit: string
  livestockTypes: string[]
  description: string
  region: string
  province: string
  city: string
  barangay: string
  street: string
}

export interface UpgradeRequest extends UpgradeRequestData {
  id: string
  userId: string
  businessPermitUrl: string
  farmPhotoUrls: string[]
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
}

export class UpgradeService {
  /**
   * Validate file
   */
  private static validateFile(
    file: File,
    allowedTypes: string[],
    maxSize: number = MAX_FILE_SIZE
  ): { valid: boolean; error?: string } {
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size must be less than ${maxSize / (1024 * 1024)}MB`
      }
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`
      }
    }

    return { valid: true }
  }

  /**
   * Convert base64 to File object
   */
  private static base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream'
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  /**
   * Upload a single document to Supabase Storage
   */
  private static async uploadDocument(
    userId: string,
    file: File,
    folder: string
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      console.log('📤 Uploading document:', file.name, 'Size:', Math.round(file.size / 1024), 'KB')

      // Validate file
      const validation = this.validateFile(
        file,
        folder === 'business-permits' ? ALLOWED_DOCUMENT_TYPES : ALLOWED_IMAGE_TYPES
      )
      if (!validation.valid) {
        return { success: false, error: validation.error }
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 8)
      const fileName = `${userId}/${folder}/${timestamp}-${randomString}.${fileExt}`

      console.log('📁 Upload path:', fileName)

      // Upload file
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('❌ Upload error:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ File uploaded:', data.path)

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName)

      const publicUrl = urlData?.publicUrl

      if (!publicUrl) {
        return { success: false, error: 'Failed to get public URL' }
      }

      console.log('🔗 Public URL:', publicUrl)
      return { success: true, url: publicUrl }
    } catch (err) {
      console.error('💥 Upload error:', err)
      return { success: false, error: String(err) }
    }
  }

  /**
   * Upload business permit
   */
  static async uploadBusinessPermit(
    userId: string,
    fileOrBase64: File | string
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      let file: File

      if (typeof fileOrBase64 === 'string') {
        // Convert base64 to File
        file = this.base64ToFile(fileOrBase64, 'business-permit.pdf')
      } else {
        file = fileOrBase64
      }

      return await this.uploadDocument(userId, file, 'business-permits')
    } catch (err) {
      return { success: false, error: String(err) }
    }
  }

  /**
   * Upload farm photos
   */
  static async uploadFarmPhotos(
    userId: string,
    filesOrBase64: (File | string)[]
  ): Promise<{ success: boolean; urls?: string[]; error?: string }> {
    try {
      console.log('📸 Uploading', filesOrBase64.length, 'farm photos...')

      const uploadPromises = filesOrBase64.map(async (fileOrBase64, index) => {
        let file: File

        if (typeof fileOrBase64 === 'string') {
          file = this.base64ToFile(fileOrBase64, `farm-photo-${index + 1}.jpg`)
        } else {
          file = fileOrBase64
        }

        return await this.uploadDocument(userId, file, 'farm-photos')
      })

      const results = await Promise.all(uploadPromises)

      // Check for any failures
      const failed = results.find(r => !r.success)
      if (failed) {
        return { success: false, error: failed.error }
      }

      const urls = results.map(r => r.url!).filter(Boolean)
      console.log('✅ All photos uploaded:', urls.length)

      return { success: true, urls }
    } catch (err) {
      return { success: false, error: String(err) }
    }
  }

  /**
   * Create upgrade request
   */
  static async createUpgradeRequest(
    userId: string,
    requestData: UpgradeRequestData,
    businessPermitBase64: string,
    farmPhotosBase64: string[]
  ): Promise<{ success: boolean; data?: UpgradeRequest; error?: string }> {
    try {
      console.log('🚀 Creating upgrade request...')

      // Check for existing pending request
      const existingRequest = await this.getUserPendingRequest(userId)
      if (existingRequest) {
        return {
          success: false,
          error: 'You already have a pending upgrade request'
        }
      }

      // Upload business permit
      console.log('📄 Uploading business permit...')
      const permitResult = await this.uploadBusinessPermit(userId, businessPermitBase64)
      if (!permitResult.success) {
        return { success: false, error: `Business permit upload failed: ${permitResult.error}` }
      }

      // Upload farm photos
      console.log('📸 Uploading farm photos...')
      const photosResult = await this.uploadFarmPhotos(userId, farmPhotosBase64)
      if (!photosResult.success) {
        return { success: false, error: `Farm photos upload failed: ${photosResult.error}` }
      }

      // Insert upgrade request into database
      console.log('💾 Saving upgrade request to database...')
      const { data, error } = await supabase
        .from('upgrade_requests')
        .insert({
          user_id: userId,
          farm_name: requestData.farmName,
          farm_size: requestData.farmSize,
          farm_size_unit: requestData.farmSizeUnit,
          livestock_types: requestData.livestockTypes,
          description: requestData.description,
          region: requestData.region,
          province: requestData.province,
          city: requestData.city,
          barangay: requestData.barangay,
          street: requestData.street,
          business_permit_url: permitResult.url!,
          farm_photo_urls: photosResult.urls!,
          status: 'pending'
        })
        .select()
        .single()

      if (error) {
        console.error('❌ Database error:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Upgrade request created successfully!')

      const upgradeRequest: UpgradeRequest = {
        id: data.id,
        userId: data.user_id,
        farmName: data.farm_name,
        farmSize: data.farm_size,
        farmSizeUnit: data.farm_size_unit,
        livestockTypes: data.livestock_types,
        description: data.description,
        region: data.region,
        province: data.province,
        city: data.city,
        barangay: data.barangay,
        street: data.street,
        businessPermitUrl: data.business_permit_url,
        farmPhotoUrls: data.farm_photo_urls,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }

      return { success: true, data: upgradeRequest }
    } catch (err) {
      console.error('💥 Unexpected error:', err)
      return { success: false, error: String(err) }
    }
  }

  /**
   * Get user's pending upgrade request
   */
  static async getUserPendingRequest(userId: string): Promise<UpgradeRequest | null> {
    try {
      const { data, error } = await supabase
        .from('upgrade_requests')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'pending')
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned - this is expected
          return null
        }
        console.error('Error fetching pending request:', error)
        return null
      }

      if (!data) return null

      return {
        id: data.id,
        userId: data.user_id,
        farmName: data.farm_name,
        farmSize: data.farm_size,
        farmSizeUnit: data.farm_size_unit,
        livestockTypes: data.livestock_types,
        description: data.description,
        region: data.region,
        province: data.province,
        city: data.city,
        barangay: data.barangay,
        street: data.street,
        businessPermitUrl: data.business_permit_url,
        farmPhotoUrls: data.farm_photo_urls,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        reviewedAt: data.reviewed_at,
        reviewedBy: data.reviewed_by,
        rejectionReason: data.rejection_reason
      }
    } catch (err) {
      console.error('Error in getUserPendingRequest:', err)
      return null
    }
  }

  /**
   * Get all user's upgrade requests
   */
  static async getUserUpgradeRequests(userId: string): Promise<UpgradeRequest[]> {
    try {
      const { data, error } = await supabase
        .from('upgrade_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching upgrade requests:', error)
        return []
      }

      return (data || []).map(item => ({
        id: item.id,
        userId: item.user_id,
        farmName: item.farm_name,
        farmSize: item.farm_size,
        farmSizeUnit: item.farm_size_unit,
        livestockTypes: item.livestock_types,
        description: item.description,
        region: item.region,
        province: item.province,
        city: item.city,
        barangay: item.barangay,
        street: item.street,
        businessPermitUrl: item.business_permit_url,
        farmPhotoUrls: item.farm_photo_urls,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        reviewedAt: item.reviewed_at,
        reviewedBy: item.reviewed_by,
        rejectionReason: item.rejection_reason
      }))
    } catch (err) {
      console.error('Error in getUserUpgradeRequests:', err)
      return []
    }
  }
}