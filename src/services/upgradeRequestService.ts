// services/upgradeRequestService.ts
import { supabase } from '@/supabase'

export interface FarmAddress {
  street?: string
  barangay?: string
  city?: string
  province?: string
  region?: string
}

export interface FarmDetails {
  farmName?: string
  farmSize?: number
  farmSizeUnit?: string
  livestockTypes?: string[]
  description?: string
}

export interface Documents {
  businessPermitUrl?: string
  farmPhotoUrls?: string[]
}

export interface UpgradeRequest {
  id: string
  userId: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  phoneNumber?: string
  profilePicture?: string
  farmDetails?: FarmDetails
  farmAddress?: FarmAddress
  documents?: Documents
  status: 'pending' | 'approved' | 'rejected'
  createdAt?: string
  updatedAt?: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
}

export interface UpgradeRequestStats {
  total: number
  pending: number
  approved: number
  rejected: number
  approvedToday: number
}

export class UpgradeRequestService {
  /**
   * Validate UUID format
   */
  private static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
  }

  /**
   * Get all upgrade requests with user profile data
   */
  static async getAllRequests(): Promise<UpgradeRequest[]> {
    try {
      console.log('📊 Fetching all upgrade requests...')

      const { data, error } = await supabase
        .from('upgrade_requests')
        .select(`
          *,
          profiles:user_id (
            username,
            first_name,
            last_name,
            profile_picture,
            phone_number
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Error fetching requests:', error)
        throw error
      }

      console.log('✅ Fetched', data?.length || 0, 'requests')

      return (data || []).map(item => this.mapRequestData(item))
    } catch (error) {
      console.error('Error in getAllRequests:', error)
      throw error
    }
  }

  /**
   * Get pending upgrade requests only
   */
  static async getPendingRequests(): Promise<UpgradeRequest[]> {
    try {
      const { data, error } = await supabase
        .from('upgrade_requests')
        .select(`
          *,
          profiles:user_id (
            username,
            first_name,
            last_name,
            profile_picture,
            phone_number
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (error) throw error

      return (data || []).map(item => this.mapRequestData(item))
    } catch (error) {
      console.error('Error in getPendingRequests:', error)
      throw error
    }
  }

  /**
   * Get request statistics
   */
  static async getRequestStats(): Promise<UpgradeRequestStats> {
    try {
      const { data, error } = await supabase
        .from('upgrade_requests')
        .select('status, created_at')

      if (error) throw error

      const now = new Date()
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      const stats: UpgradeRequestStats = {
        total: data?.length || 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        approvedToday: 0
      }

      data?.forEach(item => {
        if (item.status === 'pending') stats.pending++
        else if (item.status === 'approved') {
          stats.approved++
          const createdAt = new Date(item.created_at)
          if (createdAt >= todayStart) stats.approvedToday++
        }
        else if (item.status === 'rejected') stats.rejected++
      })

      return stats
    } catch (error) {
      console.error('Error in getRequestStats:', error)
      return {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        approvedToday: 0
      }
    }
  }

  /**
   * 🔥 APPROVE UPGRADE REQUEST - Updates role and stores farm info
   */
  static async approveRequest(params: {
    requestId: string
    adminId: string
  }): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('✅ Approving upgrade request:', params.requestId)
      console.log('👤 Admin ID:', params.adminId)

      // 🔒 VALIDATE INPUT PARAMETERS
      if (!params.requestId || !this.isValidUUID(params.requestId)) {
        return { success: false, error: 'Invalid request ID format' }
      }

      if (!params.adminId || !this.isValidUUID(params.adminId)) {
        console.error('❌ Invalid admin ID:', params.adminId)
        return { success: false, error: 'Invalid admin ID. Please log in again.' }
      }

      // 1. Get the upgrade request with all farm details
      const { data: request, error: fetchError } = await supabase
        .from('upgrade_requests')
        .select('*')
        .eq('id', params.requestId)
        .single()

      if (fetchError) {
        console.error('❌ Error fetching request:', fetchError)
        return { success: false, error: 'Upgrade request not found' }
      }

      if (!request) {
        return { success: false, error: 'Upgrade request not found' }
      }

      if (request.status !== 'pending') {
        return { success: false, error: 'Request has already been reviewed' }
      }

      const userId = request.user_id

      // Validate user ID
      if (!userId || !this.isValidUUID(userId)) {
        return { success: false, error: 'Invalid user ID in request' }
      }

      // 2. Update upgrade request status
      const { error: updateRequestError } = await supabase
        .from('upgrade_requests')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: params.adminId
        })
        .eq('id', params.requestId)

      if (updateRequestError) {
        console.error('❌ Error updating request:', updateRequestError)
        return { success: false, error: updateRequestError.message }
      }

      // 3. 🎯 UPDATE USER ROLE IN PROFILES TABLE
      console.log('🎯 Updating user role to Farmer...')
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role: 'Farmer',
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (profileError) {
        console.error('❌ Error updating profile role:', profileError)
        return { success: false, error: profileError.message }
      }

      console.log('✅ User role updated successfully!')

      // 4. 🚜 INSERT/UPDATE FARM INFO TO farm_info TABLE
      console.log('🚜 Storing farm information...')
      
      const farmInfoData = {
        user_id: userId,
        farm_name: request.farm_name,
        farm_size: request.farm_size,
        farm_size_unit: request.farm_size_unit || 'hectares',
        livestock_types: request.livestock_types || [],
        description: request.description,
        street: request.street,
        barangay: request.barangay,
        city: request.city,
        province: request.province,
        region: request.region,
        updated_at: new Date().toISOString()
      }

      // Check if farm info already exists
      const { data: existingFarmInfo } = await supabase
        .from('farm_info')
        .select('id')
        .eq('user_id', userId)
        .single()

      if (existingFarmInfo) {
        // Update existing farm info
        const { error: updateFarmError } = await supabase
          .from('farm_info')
          .update(farmInfoData)
          .eq('user_id', userId)

        if (updateFarmError) {
          console.error('❌ Error updating farm info:', updateFarmError)
          return { success: false, error: updateFarmError.message }
        }
        console.log('✅ Farm info updated successfully!')
      } else {
        // Insert new farm info
        const { error: insertFarmError } = await supabase
          .from('farm_info')
          .insert(farmInfoData)

        if (insertFarmError) {
          console.error('❌ Error inserting farm info:', insertFarmError)
          return { success: false, error: insertFarmError.message }
        }
        console.log('✅ Farm info created successfully!')
      }

      console.log('🎉 Request approved, role updated, and farm info stored!')
      return { success: true }
    } catch (error: any) {
      console.error('💥 Error in approveRequest:', error)
      return { success: false, error: error.message || 'Approval failed' }
    }
  }

  /**
   * Reject upgrade request
   */
  static async rejectRequest(params: {
    requestId: string
    adminId: string
    rejectionReason?: string
  }): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('❌ Rejecting upgrade request:', params.requestId)

      // 🔒 VALIDATE INPUT PARAMETERS
      if (!params.requestId || !this.isValidUUID(params.requestId)) {
        return { success: false, error: 'Invalid request ID format' }
      }

      if (!params.adminId || !this.isValidUUID(params.adminId)) {
        console.error('❌ Invalid admin ID:', params.adminId)
        return { success: false, error: 'Invalid admin ID. Please log in again.' }
      }

      // Get the upgrade request to check status
      const { data: request, error: fetchError } = await supabase
        .from('upgrade_requests')
        .select('status')
        .eq('id', params.requestId)
        .single()

      if (fetchError || !request) {
        return { success: false, error: 'Upgrade request not found' }
      }

      if (request.status !== 'pending') {
        return { success: false, error: 'Request has already been reviewed' }
      }

      // Update the upgrade request status
      const { error: updateError } = await supabase
        .from('upgrade_requests')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: params.adminId,
          rejection_reason: params.rejectionReason || null
        })
        .eq('id', params.requestId)

      if (updateError) {
        console.error('❌ Error updating request:', updateError)
        return { success: false, error: updateError.message }
      }

      console.log('❌ Request rejected successfully')
      return { success: true }
    } catch (error: any) {
      console.error('💥 Error in rejectRequest:', error)
      return { success: false, error: error.message || 'Rejection failed' }
    }
  }

  /**
   * Map database data to UpgradeRequest interface
   */
  private static mapRequestData(item: any): UpgradeRequest {
    const profile = item.profiles

    return {
      id: item.id,
      userId: item.user_id,
      email: item.email || '',
      firstName: profile?.first_name || '',
      lastName: profile?.last_name || '',
      fullName: profile?.first_name && profile?.last_name
        ? `${profile.first_name} ${profile.last_name}`
        : profile?.username || 'No name provided',
      phoneNumber: profile?.phone_number || '',
      profilePicture: profile?.profile_picture || '',
      farmDetails: {
        farmName: item.farm_name,
        farmSize: item.farm_size,
        farmSizeUnit: item.farm_size_unit,
        livestockTypes: item.livestock_types || [],
        description: item.description
      },
      farmAddress: {
        street: item.street,
        barangay: item.barangay,
        city: item.city,
        province: item.province,
        region: item.region
      },
      documents: {
        businessPermitUrl: item.business_permit_url,
        farmPhotoUrls: item.farm_photo_urls || []
      },
      status: item.status,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      reviewedAt: item.reviewed_at,
      reviewedBy: item.reviewed_by,
      rejectionReason: item.rejection_reason
    }
  }
}