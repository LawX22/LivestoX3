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
   * Approve upgrade request and update user role to Farmer
   */
  static async approveRequest(params: {
    requestId: string
    adminId: string
  }): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('✅ Approving upgrade request:', params.requestId)

      // 1. Get the upgrade request to find user_id
      const { data: request, error: fetchError } = await supabase
        .from('upgrade_requests')
        .select('user_id, status')
        .eq('id', params.requestId)
        .single()

      if (fetchError || !request) {
        return { success: false, error: 'Upgrade request not found' }
      }

      if (request.status !== 'pending') {
        return { success: false, error: 'Request has already been reviewed' }
      }

      const userId = request.user_id

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

      // 3. Update user role in profiles table
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

      console.log('✅ Request approved and role updated to Farmer!')
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

    // Get user's email from auth
    const email = item.user_id ? '' : '' // We'll need to fetch this separately if needed

    return {
      id: item.id,
      userId: item.user_id,
      email: email,
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