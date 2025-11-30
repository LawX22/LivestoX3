// services/activityService.ts - COMPLETE ACTIVITY TRACKING
import { supabase } from '@/supabase'

export interface Activity {
  user: string
  userEmail: string
  action: string
  details: string
  time: Date
  status: string
  userId?: string
  metadata?: any
}

export class ActivityService {
  /**
   * Get all system activities from multiple sources
   */
  static async getAllActivities(timeRange: string = '7d'): Promise<Activity[]> {
    try {
      console.log('📋 Fetching all system activities...')

      const activities: Activity[] = []
      const cutoffDate = this.getTimeRangeCutoff(timeRange)

      // Fetch all activity types in parallel
      const [
        registrations,
        upgrades,
        verifications,
        listings,
        forumQuestions,
        forumAnswers,
        profileUpdates
      ] = await Promise.all([
        this.getRegistrationActivities(cutoffDate),
        this.getUpgradeActivities(cutoffDate),
        this.getVerificationActivities(cutoffDate),
        this.getListingActivities(cutoffDate),
        this.getForumQuestionActivities(cutoffDate),
        this.getForumAnswerActivities(cutoffDate),
        this.getProfileUpdateActivities(cutoffDate)
      ])

      // Combine all activities
      activities.push(...registrations)
      activities.push(...upgrades)
      activities.push(...verifications)
      activities.push(...listings)
      activities.push(...forumQuestions)
      activities.push(...forumAnswers)
      activities.push(...profileUpdates)

      // Sort by time (most recent first)
      activities.sort((a, b) => b.time.getTime() - a.time.getTime())

      console.log(`✅ Fetched ${activities.length} total activities`)
      return activities
    } catch (error) {
      console.error('❌ Error fetching activities:', error)
      return []
    }
  }

  /**
   * Get time range cutoff date
   */
  private static getTimeRangeCutoff(timeRange: string): Date {
    const now = new Date()
    
    switch (timeRange) {
      case '24h':
        now.setHours(now.getHours() - 24)
        break
      case '7d':
        now.setDate(now.getDate() - 7)
        break
      case '30d':
        now.setDate(now.getDate() - 30)
        break
      case 'all':
        now.setFullYear(2000) // Far back date
        break
      default:
        now.setDate(now.getDate() - 7)
    }
    
    return now
  }

  /**
   * Get registration activities
   */
  private static async getRegistrationActivities(cutoffDate: Date): Promise<Activity[]> {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, created_at, username')
        .gte('created_at', cutoffDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Error fetching registrations:', error)
        return []
      }

      return (profiles || []).map(profile => ({
        user: this.getFullName(profile),
        userEmail: profile.email || 'No email',
        action: 'New Registration',
        details: 'Created new account on the platform',
        time: new Date(profile.created_at),
        status: 'Completed',
        userId: profile.id
      }))
    } catch (error) {
      console.error('Error in getRegistrationActivities:', error)
      return []
    }
  }

  /**
   * Get upgrade request activities
   */
  private static async getUpgradeActivities(cutoffDate: Date): Promise<Activity[]> {
    try {
      const { data: requests, error } = await supabase
        .from('upgrade_requests')
        .select('id, email, user_id, status, created_at, updated_at')
        .gte('created_at', cutoffDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Error fetching upgrade requests:', error)
        return []
      }

      // Get user details
      const userIds = requests?.map(r => r.user_id) || []
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, username')
        .in('id', userIds)

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])

      return (requests || []).map(request => {
        const profile = profileMap.get(request.user_id)
        return {
          user: profile ? this.getFullName(profile) : 'Unknown User',
          userEmail: profile?.email || request.email || 'No email',
          action: 'Account Upgrade',
          details: `Requested farmer account upgrade - ${this.getStatusText(request.status)}`,
          time: new Date(request.updated_at || request.created_at),
          status: this.mapUpgradeStatus(request.status),
          userId: request.user_id
        }
      })
    } catch (error) {
      console.error('Error in getUpgradeActivities:', error)
      return []
    }
  }

  /**
   * Get verification activities
   */
  private static async getVerificationActivities(cutoffDate: Date): Promise<Activity[]> {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, verified_at, is_verified, username')
        .eq('is_verified', true)
        .not('verified_at', 'is', null)
        .gte('verified_at', cutoffDate.toISOString())
        .order('verified_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Error fetching verifications:', error)
        return []
      }

      return (profiles || []).map(profile => ({
        user: this.getFullName(profile),
        userEmail: profile.email || 'No email',
        action: 'Account Verified',
        details: 'Account verification approved by administrator',
        time: new Date(profile.verified_at!),
        status: 'Completed',
        userId: profile.id
      }))
    } catch (error) {
      console.error('Error in getVerificationActivities:', error)
      return []
    }
  }

  /**
   * Get livestock listing activities
   */
  private static async getListingActivities(cutoffDate: Date): Promise<Activity[]> {
    try {
      const { data: listings, error } = await supabase
        .from('livestock_listings')
        .select('id, user_id, title, type, status, created_at')
        .gte('created_at', cutoffDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Error fetching listings:', error)
        return []
      }

      // Get user details
      const userIds = listings?.map(l => l.user_id) || []
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, username')
        .in('id', userIds)

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])

      return (listings || []).map(listing => {
        const profile = profileMap.get(listing.user_id)
        return {
          user: profile ? this.getFullName(profile) : 'Unknown User',
          userEmail: profile?.email || 'No email',
          action: 'Listing Created',
          details: `Created ${listing.type} listing: ${listing.title}`,
          time: new Date(listing.created_at),
          status: 'Completed',
          userId: listing.user_id
        }
      })
    } catch (error) {
      console.error('Error in getListingActivities:', error)
      return []
    }
  }

  /**
   * Get forum question activities
   */
  private static async getForumQuestionActivities(cutoffDate: Date): Promise<Activity[]> {
    try {
      const { data: questions, error } = await supabase
        .from('forum_questions')
        .select('id, user_id, title, created_at')
        .gte('created_at', cutoffDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Error fetching forum questions:', error)
        return []
      }

      // Get user details
      const userIds = questions?.map(q => q.user_id) || []
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, username')
        .in('id', userIds)

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])

      return (questions || []).map(question => {
        const profile = profileMap.get(question.user_id)
        return {
          user: profile ? this.getFullName(profile) : 'Unknown User',
          userEmail: profile?.email || 'No email',
          action: 'Forum Question',
          details: `Posted question: ${question.title}`,
          time: new Date(question.created_at),
          status: 'Completed',
          userId: question.user_id
        }
      })
    } catch (error) {
      console.error('Error in getForumQuestionActivities:', error)
      return []
    }
  }

  /**
   * Get forum answer activities
   */
  private static async getForumAnswerActivities(cutoffDate: Date): Promise<Activity[]> {
    try {
      const { data: answers, error } = await supabase
        .from('forum_answers')
        .select('id, user_id, question_id, text, created_at')
        .gte('created_at', cutoffDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Error fetching forum answers:', error)
        return []
      }

      // Get user details
      const userIds = answers?.map(a => a.user_id) || []
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, username')
        .in('id', userIds)

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])

      // Get question titles
      const questionIds = answers?.map(a => a.question_id) || []
      const { data: questions } = await supabase
        .from('forum_questions')
        .select('id, title')
        .in('id', questionIds)

      const questionMap = new Map(questions?.map(q => [q.id, q.title]) || [])

      return (answers || []).map(answer => {
        const profile = profileMap.get(answer.user_id)
        const questionTitle = questionMap.get(answer.question_id) || 'a question'
        return {
          user: profile ? this.getFullName(profile) : 'Unknown User',
          userEmail: profile?.email || 'No email',
          action: 'Forum Answer',
          details: `Answered: ${questionTitle}`,
          time: new Date(answer.created_at),
          status: 'Completed',
          userId: answer.user_id
        }
      })
    } catch (error) {
      console.error('Error in getForumAnswerActivities:', error)
      return []
    }
  }

  /**
   * Get profile update activities
   */
  private static async getProfileUpdateActivities(cutoffDate: Date): Promise<Activity[]> {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, updated_at, created_at, username')
        .gte('updated_at', cutoffDate.toISOString())
        .order('updated_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Error fetching profile updates:', error)
        return []
      }

      // Filter out profiles where updated_at is same as created_at (new registrations)
      const updates = (profiles || []).filter(profile => {
        const created = new Date(profile.created_at).getTime()
        const updated = new Date(profile.updated_at).getTime()
        return updated - created > 60000 // More than 1 minute difference
      })

      return updates.map(profile => ({
        user: this.getFullName(profile),
        userEmail: profile.email || 'No email',
        action: 'Profile Update',
        details: 'Updated profile information',
        time: new Date(profile.updated_at),
        status: 'Completed',
        userId: profile.id
      }))
    } catch (error) {
      console.error('Error in getProfileUpdateActivities:', error)
      return []
    }
  }

  /**
   * Helper: Get full name from profile
   */
  private static getFullName(profile: any): string {
    if (profile.first_name && profile.last_name) {
      return `${profile.first_name} ${profile.last_name}`
    }
    if (profile.first_name) return profile.first_name
    if (profile.last_name) return profile.last_name
    if (profile.username) return profile.username
    return 'Unknown User'
  }

  /**
   * Helper: Map upgrade status to activity status
   */
  private static mapUpgradeStatus(status: string): string {
    switch (status) {
      case 'approved':
        return 'Completed'
      case 'pending':
        return 'Pending'
      case 'rejected':
        return 'Failed'
      default:
        return 'Pending'
    }
  }

  /**
   * Helper: Get status text
   */
  private static getStatusText(status: string): string {
    switch (status) {
      case 'approved':
        return 'Approved'
      case 'pending':
        return 'Pending Review'
      case 'rejected':
        return 'Rejected'
      default:
        return 'Unknown'
    }
  }

  /**
   * Export activities to CSV
   */
  static exportToCSV(activities: Activity[]): string {
    let csv = 'User,Email,Action,Details,Date,Time,Status\n'
    
    activities.forEach(activity => {
      const date = new Date(activity.time)
      const dateStr = date.toLocaleDateString()
      const timeStr = date.toLocaleTimeString()
      
      // Escape commas and quotes in CSV
      const user = `"${activity.user.replace(/"/g, '""')}"`
      const email = `"${activity.userEmail.replace(/"/g, '""')}"`
      const action = `"${activity.action.replace(/"/g, '""')}"`
      const details = `"${activity.details.replace(/"/g, '""')}"`
      
      csv += `${user},${email},${action},${details},${dateStr},${timeStr},${activity.status}\n`
    })
    
    return csv
  }

  /**
   * Get activity statistics
   */
  static async getActivityStats(timeRange: string = '7d'): Promise<{
    total: number
    byAction: { [key: string]: number }
    byStatus: { [key: string]: number }
    byDay: { date: string; count: number }[]
  }> {
    try {
      const activities = await this.getAllActivities(timeRange)
      
      const byAction: { [key: string]: number } = {}
      const byStatus: { [key: string]: number } = {}
      const byDay: { [key: string]: number } = {}
      
      activities.forEach(activity => {
        // Count by action
        byAction[activity.action] = (byAction[activity.action] || 0) + 1
        
        // Count by status
        byStatus[activity.status] = (byStatus[activity.status] || 0) + 1
        
        // Count by day
        const date = new Date(activity.time).toISOString().split('T')[0]
        byDay[date] = (byDay[date] || 0) + 1
      })
      
      // Convert byDay to array
      const byDayArray = Object.entries(byDay)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date))
      
      return {
        total: activities.length,
        byAction,
        byStatus,
        byDay: byDayArray
      }
    } catch (error) {
      console.error('Error getting activity stats:', error)
      return {
        total: 0,
        byAction: {},
        byStatus: {},
        byDay: []
      }
    }
  }
}