// services/forumService.ts
import { supabase } from '../supabase'

// ===== TYPES =====
export interface ForumAnswer {
  id: number
  text: string
  userId: string
  userRole: string
  userFullName?: string
  createdAt: string
}

export interface ForumQuestion {
  id: number
  title: string
  description?: string
  userId: string
  userRole: string
  userFullName?: string
  createdAt: string
  answers: ForumAnswer[]
  category?: string
  urgency?: string
  views?: number
  visibility?: 'all' | 'farmers'
  upvotes?: number
  downvotes?: number
  userVote?: 'up' | 'down' | null
  userVotes?: { [userId: string]: 'up' | 'down' }
}

export interface NewQuestion {
  title: string
  description?: string
  category?: string
  urgency?: string
  visibility?: 'all' | 'farmers'
}

export interface UpdateQuestion {
  title: string
  description?: string
  category?: string
  urgency?: string
  visibility?: 'all' | 'farmers'
}

export interface NewAnswer {
  questionId: number
  text: string
}

// ===== CACHE MANAGEMENT =====
const USER_CACHE_KEY = 'forum_user_cache'
const USER_CACHE_TIMEOUT = 10 * 60 * 1000 // 10 minutes

interface UserCache {
  [userId: string]: {
    fullName: string
    role: string
    timestamp: number
  }
}

class ForumService {
  private userCache: UserCache = {}

  constructor() {
    // Load cache from localStorage on initialization
    this.loadUserCache()
  }

  // ===== CACHE METHODS =====
  private loadUserCache(): void {
    try {
      const cached = localStorage.getItem(USER_CACHE_KEY)
      if (cached) {
        this.userCache = JSON.parse(cached)
        // Clean expired entries
        const now = Date.now()
        Object.keys(this.userCache).forEach(userId => {
          if (now - this.userCache[userId].timestamp > USER_CACHE_TIMEOUT) {
            delete this.userCache[userId]
          }
        })
        this.saveUserCache()
      }
    } catch (error) {
      console.warn('Failed to load user cache:', error)
      this.userCache = {}
    }
  }

  private saveUserCache(): void {
    try {
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify(this.userCache))
    } catch (error) {
      console.warn('Failed to save user cache:', error)
    }
  }

  private getCachedUser(userId: string): { fullName: string; role: string } | null {
    const cached = this.userCache[userId]
    if (cached && Date.now() - cached.timestamp < USER_CACHE_TIMEOUT) {
      return { fullName: cached.fullName, role: cached.role }
    }
    return null
  }

  private setCachedUser(userId: string, fullName: string, role: string): void {
    this.userCache[userId] = {
      fullName,
      role,
      timestamp: Date.now()
    }
    this.saveUserCache()
  }

  // ===== USER DETAILS =====
  private async getUserDetails(userId: string): Promise<{ fullName: string; role: string } | null> {
    try {
      // Check cache first
      const cached = this.getCachedUser(userId)
      if (cached) {
        console.log('✅ Using cached user details for:', userId)
        return cached
      }

      console.log('🔍 Fetching user details for:', userId)
      
      // Get from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name, username, role')
        .eq('id', userId)
        .single()
      
      if (!profileError && profileData) {
        const firstName = (profileData.first_name || '').trim()
        const lastName = (profileData.last_name || '').trim()
        const username = (profileData.username || '').trim()
        const role = (profileData.role || 'user').toLowerCase()
        
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
          fullName = 'Unknown User'
        }
        
        // Cache the result
        this.setCachedUser(userId, fullName, role)
        
        return { fullName, role }
      }
      
      // Fallback to auth user
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser && authUser.id === userId) {
        const email = authUser.email || ''
        const emailPrefix = email.split('@')[0] || 'Unknown User'
        
        const metadata = authUser.user_metadata || {}
        const firstName = (metadata.firstname || metadata.firstName || '').trim()
        const lastName = (metadata.lastname || metadata.lastName || '').trim()
        const role = (metadata.role || 'user').toLowerCase()
        
        let fullName = ''
        
        if (firstName && lastName) {
          fullName = `${firstName} ${lastName}`
        } else if (firstName) {
          fullName = firstName
        } else if (lastName) {
          fullName = lastName
        } else {
          fullName = emailPrefix
        }
        
        // Cache the result
        this.setCachedUser(userId, fullName, role)
        
        return { fullName, role }
      }
      
      return null
    } catch (error) {
      console.error('❌ Error fetching user details:', error)
      return null
    }
  }

  // ===== VOTE OPERATIONS =====
  private async getVoteCounts(questionId: number): Promise<{ upvotes: number; downvotes: number }> {
    try {
      const { data: votes, error } = await supabase
        .from('forum_votes')
        .select('vote_type')
        .eq('question_id', questionId)

      if (error) {
        console.error('❌ Error fetching vote counts:', error)
        return { upvotes: 0, downvotes: 0 }
      }

      const upvotes = votes?.filter(vote => vote.vote_type === 'up').length || 0
      const downvotes = votes?.filter(vote => vote.vote_type === 'down').length || 0

      return { upvotes, downvotes }
    } catch (error) {
      console.error('❌ Error getting vote counts:', error)
      return { upvotes: 0, downvotes: 0 }
    }
  }

  private async syncQuestionVoteCounts(questionId: number): Promise<void> {
    try {
      const voteCounts = await this.getVoteCounts(questionId)
      
      await supabase
        .from('forum_questions')
        .update({
          upvotes: voteCounts.upvotes,
          downvotes: voteCounts.downvotes
        })
        .eq('id', questionId)
    } catch (error) {
      console.error('❌ Error syncing vote counts:', error)
    }
  }

  // ===== DATA ENRICHMENT =====
  private async enrichWithUserNames(questions: any[]): Promise<ForumQuestion[]> {
    try {
      console.log(`🔄 Enriching ${questions.length} questions with user names...`)
      
      // Get all unique user IDs
      const userIds = new Set<string>()
      
      questions.forEach(question => {
        if (question.user_id) userIds.add(question.user_id)
        question.forum_answers?.forEach((answer: any) => {
          if (answer.user_id) userIds.add(answer.user_id)
        })
      })

      if (userIds.size === 0) {
        return questions.map(q => this.mapQuestionWithFallbackNames(q))
      }

      console.log(`🔍 Looking up ${userIds.size} unique users...`)

      // Batch fetch all profiles
      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, username, role')
        .in('id', Array.from(userIds))

      if (error) {
        console.error('❌ Error fetching profiles:', error)
      }

      // Build lookup map
      const userLookup: { [userId: string]: { fullName: string; role: string } } = {}
      
      profilesData?.forEach(profile => {
        const firstName = (profile.first_name || '').trim()
        const lastName = (profile.last_name || '').trim()
        const username = (profile.username || '').trim()
        const role = (profile.role || 'user').toLowerCase()
        
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
          fullName = 'Unknown User'
        }
        
        userLookup[profile.id] = { fullName, role }
        
        // Update cache
        this.setCachedUser(profile.id, fullName, role)
      })

      // Fill in missing users with fallbacks
      for (const userId of Array.from(userIds)) {
        if (!userLookup[userId]) {
          const userDetails = await this.getUserDetails(userId)
          userLookup[userId] = userDetails || { fullName: 'Unknown User', role: 'user' }
        }
      }

      // Get vote data for all questions
      const questionIds = questions.map(q => q.id)
      const { data: allVotes } = await supabase
        .from('forum_votes')
        .select('question_id, user_id, vote_type')
        .in('question_id', questionIds)

      // Build vote counts and user votes
      const questionVoteCounts: { [questionId: number]: { upvotes: number; downvotes: number } } = {}
      const questionUserVotes: { [questionId: number]: { [userId: string]: 'up' | 'down' } } = {}

      questionIds.forEach(qId => {
        questionVoteCounts[qId] = { upvotes: 0, downvotes: 0 }
        questionUserVotes[qId] = {}
      })

      if (allVotes) {
        allVotes.forEach(vote => {
          if (vote.user_id) {
            if (vote.vote_type === 'up') {
              questionVoteCounts[vote.question_id].upvotes++
            } else if (vote.vote_type === 'down') {
              questionVoteCounts[vote.question_id].downvotes++
            }
            
            questionUserVotes[vote.question_id][vote.user_id] = vote.vote_type
          }
        })
      }

      // Map enriched questions
      const enrichedQuestions = questions.map(question => {
        const questionUser = userLookup[question.user_id]
        const voteCounts = questionVoteCounts[question.id] || { upvotes: 0, downvotes: 0 }
        
        return {
          id: question.id,
          title: question.title,
          description: question.description,
          userId: question.user_id,
          userRole: questionUser?.role || 'user',
          userFullName: questionUser?.fullName || 'Unknown User',
          createdAt: question.created_at,
          category: question.category,
          urgency: question.urgency,
          visibility: question.visibility || 'all',
          views: question.views || 0,
          upvotes: voteCounts.upvotes,
          downvotes: voteCounts.downvotes,
          userVote: question.userVote || null,
          userVotes: questionUserVotes[question.id] || {},
          answers: question.forum_answers?.map((answer: any) => {
            const answerUser = userLookup[answer.user_id]
            
            return {
              id: answer.id,
              text: answer.text,
              userId: answer.user_id,
              userRole: answerUser?.role || 'user',
              userFullName: answerUser?.fullName || 'Unknown User',
              createdAt: answer.created_at
            }
          }) || []
        }
      })

      console.log(`✅ Successfully enriched ${enrichedQuestions.length} questions`)
      return enrichedQuestions
    } catch (error) {
      console.error('❌ Error enriching with user names:', error)
      return questions.map(q => this.mapQuestionWithFallbackNames(q))
    }
  }

  private mapQuestionWithFallbackNames(question: any): ForumQuestion {
    return {
      id: question.id,
      title: question.title,
      description: question.description,
      userId: question.user_id,
      userRole: 'user',
      userFullName: 'Unknown User',
      createdAt: question.created_at,
      category: question.category,
      urgency: question.urgency,
      visibility: question.visibility || 'all',
      views: question.views || 0,
      upvotes: question.upvotes || 0,
      downvotes: question.downvotes || 0,
      userVote: question.userVote || null,
      userVotes: question.userVotes || {},
      answers: question.forum_answers?.map((answer: any) => ({
        id: answer.id,
        text: answer.text,
        userId: answer.user_id,
        userRole: 'user',
        userFullName: 'Unknown User',
        createdAt: answer.created_at
      })) || []
    }
  }

  // ===== PUBLIC API METHODS =====

  /**
   * Get all questions with answers and votes
   */
  async getQuestions(userId?: string): Promise<ForumQuestion[]> {
    try {
      console.log('📊 Fetching all questions...')
      
      const { data: questionsData, error: questionsError } = await supabase
        .from('forum_questions')
        .select(`
          *,
          forum_answers (
            id,
            text,
            user_id,
            user_role,
            created_at
          )
        `)
        .order('created_at', { ascending: false })

      if (questionsError) {
        console.error('❌ Error fetching questions:', questionsError)
        throw questionsError
      }

      // Get user votes if userId provided
      let userVotes: { [questionId: number]: 'up' | 'down' } = {}

      if (userId) {
        const { data: votesData } = await supabase
          .from('forum_votes')
          .select('question_id, vote_type')
          .eq('user_id', userId)

        if (votesData) {
          userVotes = votesData.reduce((acc, vote) => {
            acc[vote.question_id] = vote.vote_type
            return acc
          }, {} as { [questionId: number]: 'up' | 'down' })
        }
      }

      // Add user votes to questions
      const questionsWithVotes = questionsData?.map(question => ({
        ...question,
        userVote: userVotes[question.id] || null
      })) || []

      // Enrich with user names
      const enrichedQuestions = await this.enrichWithUserNames(questionsWithVotes)

      console.log(`✅ Fetched ${enrichedQuestions.length} questions`)
      return enrichedQuestions
    } catch (error) {
      console.error('❌ Error in getQuestions:', error)
      throw error
    }
  }

  /**
   * Get a single question by ID
   */
  async getQuestionById(questionId: number, userId?: string): Promise<ForumQuestion | null> {
    try {
      console.log('📖 Fetching question:', questionId)
      
      const { data: questionData, error: questionError } = await supabase
        .from('forum_questions')
        .select(`
          *,
          forum_answers (
            id,
            text,
            user_id,
            user_role,
            created_at
          )
        `)
        .eq('id', questionId)
        .single()

      if (questionError) {
        if (questionError.code === 'PGRST116') {
          return null
        }
        throw questionError
      }
      
      if (!questionData) return null

      // Get user vote if userId provided
      let userVote: 'up' | 'down' | null = null

      if (userId) {
        const { data: voteData } = await supabase
          .from('forum_votes')
          .select('vote_type')
          .eq('question_id', questionId)
          .eq('user_id', userId)
          .single()

        userVote = voteData?.vote_type || null
      }

      const questionWithVotes = {
        ...questionData,
        userVote
      }

      const enrichedQuestions = await this.enrichWithUserNames([questionWithVotes])
      
      console.log('✅ Question fetched successfully')
      return enrichedQuestions[0] || null
    } catch (error) {
      console.error('❌ Error fetching question:', error)
      throw error
    }
  }

  /**
   * Create a new question
   */
  async createQuestion(question: NewQuestion, userId: string, userRole: string): Promise<ForumQuestion> {
    try {
      console.log('➕ Creating question...')
      
      const { data, error } = await supabase
        .from('forum_questions')
        .insert({
          title: question.title,
          description: question.description,
          user_id: userId,
          user_role: userRole,
          category: question.category,
          urgency: question.urgency,
          visibility: question.visibility || 'all',
          views: 0,
          upvotes: 0,
          downvotes: 0
        })
        .select()
        .single()

      if (error) {
        console.error('❌ Error creating question:', error)
        throw error
      }

      const userDetails = await this.getUserDetails(userId)

      console.log('✅ Question created successfully')
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        userId: data.user_id,
        userRole: userDetails?.role || userRole,
        userFullName: userDetails?.fullName || 'Unknown User',
        createdAt: data.created_at,
        category: data.category,
        urgency: data.urgency,
        visibility: data.visibility,
        views: data.views || 0,
        upvotes: data.upvotes || 0,
        downvotes: data.downvotes || 0,
        answers: [],
        userVote: null,
        userVotes: {}
      }
    } catch (error) {
      console.error('❌ Error in createQuestion:', error)
      throw error
    }
  }

  /**
   * Update an existing question
   */
  async updateQuestion(questionId: number, updates: UpdateQuestion): Promise<ForumQuestion> {
    try {
      console.log('✏️ Updating question:', questionId)
      
      const { data, error } = await supabase
        .from('forum_questions')
        .update({
          title: updates.title,
          description: updates.description,
          category: updates.category,
          urgency: updates.urgency,
          visibility: updates.visibility
        })
        .eq('id', questionId)
        .select(`
          *,
          forum_answers (
            id,
            text,
            user_id,
            user_role,
            created_at
          )
        `)
        .single()

      if (error) {
        console.error('❌ Error updating question:', error)
        throw error
      }

      const enriched = await this.enrichWithUserNames([data])
      console.log('✅ Question updated successfully')
      return enriched[0]
    } catch (error) {
      console.error('❌ Error in updateQuestion:', error)
      throw error
    }
  }

  /**
   * Delete a question
   */
  async deleteQuestion(questionId: number): Promise<void> {
    try {
      console.log('🗑️ Deleting question:', questionId)
      
      // Delete answers
      await supabase
        .from('forum_answers')
        .delete()
        .eq('question_id', questionId)

      // Delete votes
      await supabase
        .from('forum_votes')
        .delete()
        .eq('question_id', questionId)

      // Delete question
      const { error } = await supabase
        .from('forum_questions')
        .delete()
        .eq('id', questionId)

      if (error) throw error

      console.log('✅ Question deleted successfully')
    } catch (error) {
      console.error('❌ Error deleting question:', error)
      throw error
    }
  }

  /**
   * Add an answer to a question
   */
  async addAnswer(answer: NewAnswer, userId: string, userRole: string): Promise<ForumAnswer> {
    try {
      console.log('💬 Adding answer...')
      
      const { data, error } = await supabase
        .from('forum_answers')
        .insert({
          question_id: answer.questionId,
          text: answer.text,
          user_id: userId,
          user_role: userRole
        })
        .select()
        .single()

      if (error) {
        console.error('❌ Error adding answer:', error)
        throw error
      }

      const userDetails = await this.getUserDetails(userId)

      console.log('✅ Answer added successfully')
      return {
        id: data.id,
        text: data.text,
        userId: data.user_id,
        userRole: userDetails?.role || userRole,
        userFullName: userDetails?.fullName || 'Unknown User',
        createdAt: data.created_at
      }
    } catch (error) {
      console.error('❌ Error in addAnswer:', error)
      throw error
    }
  }

  /**
   * Vote on a question
   */
  async voteQuestion(questionId: number, userId: string, voteType: 'up' | 'down'): Promise<{ upvotes: number; downvotes: number; userVote: 'up' | 'down' | null }> {
    try {
      console.log(`👍 User ${userId} voting ${voteType} on question ${questionId}`)

      const { data: existingVote, error: voteCheckError } = await supabase
        .from('forum_votes')
        .select('vote_type')
        .eq('question_id', questionId)
        .eq('user_id', userId)
        .single()

      if (voteCheckError && voteCheckError.code !== 'PGRST116') {
        throw voteCheckError
      }

      let newUserVote: 'up' | 'down' | null = null

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote
          await supabase
            .from('forum_votes')
            .delete()
            .eq('question_id', questionId)
            .eq('user_id', userId)

          newUserVote = null
        } else {
          // Change vote
          await supabase
            .from('forum_votes')
            .update({ vote_type: voteType })
            .eq('question_id', questionId)
            .eq('user_id', userId)

          newUserVote = voteType
        }
      } else {
        // Add new vote
        await supabase
          .from('forum_votes')
          .insert({
            question_id: questionId,
            user_id: userId,
            vote_type: voteType
          })

        newUserVote = voteType
      }

      const voteCounts = await this.getVoteCounts(questionId)
      await this.syncQuestionVoteCounts(questionId)

      console.log('✅ Vote processed successfully')
      return {
        upvotes: voteCounts.upvotes,
        downvotes: voteCounts.downvotes,
        userVote: newUserVote
      }
    } catch (error) {
      console.error('❌ Error voting on question:', error)
      throw error
    }
  }

  /**
   * Increment view count
   */
  async incrementViews(questionId: number): Promise<number> {
    try {
      const { data: currentData } = await supabase
        .from('forum_questions')
        .select('views')
        .eq('id', questionId)
        .single()

      const currentViews = currentData?.views || 0
      const newViews = currentViews + 1

      await supabase
        .from('forum_questions')
        .update({ views: newViews })
        .eq('id', questionId)
      
      return newViews
    } catch (error) {
      console.error('❌ Error incrementing views:', error)
      return 0
    }
  }
}

// Export singleton instance
export const forumService = new ForumService()