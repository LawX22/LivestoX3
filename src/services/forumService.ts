// services/forumService.ts
import { supabase } from '../supabase'

export interface ForumAnswer {
  id: number
  text: string
  userEmail: string
  userRole: string
  createdAt: string
}

export interface ForumQuestion {
  id: number
  title: string
  description?: string
  userEmail: string
  userRole: string
  createdAt: string
  answers: ForumAnswer[]
  category?: string
  urgency?: string
  isBookmarked?: boolean
  views?: number
  visibility?: 'all' | 'farmers'
  upvotes?: number
  downvotes?: number
  userVote?: 'up' | 'down' | null
  userVotes?: { [userEmail: string]: 'up' | 'down' }
}

export interface NewQuestion {
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

class ForumService {
  // Get all questions with answers, votes, and bookmark status
  async getQuestions(userEmail?: string): Promise<ForumQuestion[]> {
    try {
      // Get questions with answers
      const { data: questionsData, error: questionsError } = await supabase
        .from('forum_questions')
        .select(`
          *,
          forum_answers (
            id,
            text,
            user_email,
            user_role,
            created_at
          )
        `)
        .order('created_at', { ascending: false })

      if (questionsError) throw questionsError

      // Get all votes to build userVotes object for each question
      const { data: allVotes } = await supabase
        .from('forum_votes')
        .select('question_id, user_email, vote_type')

      // Get user-specific data if logged in
      let userVotes: { [questionId: number]: 'up' | 'down' } = {}
      let bookmarks: Set<number> = new Set()

      if (userEmail) {
        // Get user votes
        const { data: votesData } = await supabase
          .from('forum_votes')
          .select('question_id, vote_type')
          .eq('user_email', userEmail)

        if (votesData) {
          userVotes = votesData.reduce((acc, vote) => {
            acc[vote.question_id] = vote.vote_type
            return acc
          }, {} as { [questionId: number]: 'up' | 'down' })
        }

        // Get user bookmarks
        const { data: bookmarksData } = await supabase
          .from('forum_bookmarks')
          .select('question_id')
          .eq('user_email', userEmail)

        if (bookmarksData) {
          bookmarks = new Set(bookmarksData.map(b => b.question_id))
        }
      }

      // Build userVotes object for each question
      const questionUserVotes: { [questionId: number]: { [userEmail: string]: 'up' | 'down' } } = {}
      if (allVotes) {
        allVotes.forEach(vote => {
          if (!questionUserVotes[vote.question_id]) {
            questionUserVotes[vote.question_id] = {}
          }
          questionUserVotes[vote.question_id][vote.user_email] = vote.vote_type
        })
      }

      // Transform data to match frontend interface
      const questions: ForumQuestion[] = questionsData?.map(question => ({
        id: question.id,
        title: question.title,
        description: question.description,
        userEmail: question.user_email,
        userRole: question.user_role,
        createdAt: question.created_at,
        category: question.category,
        urgency: question.urgency,
        visibility: question.visibility || 'all',
        views: question.views || 0,
        upvotes: question.upvotes || 0,
        downvotes: question.downvotes || 0,
        isBookmarked: bookmarks.has(question.id),
        userVote: userVotes[question.id] || null,
        userVotes: questionUserVotes[question.id] || {},
        answers: question.forum_answers?.map((answer: any) => ({
          id: answer.id,
          text: answer.text,
          userEmail: answer.user_email,
          userRole: answer.user_role,
          createdAt: answer.created_at
        })) || []
      })) || []

      return questions
    } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
    }
  }

  // Create a new question
  async createQuestion(question: NewQuestion, userEmail: string, userRole: string): Promise<ForumQuestion> {
    try {
      const { data, error } = await supabase
        .from('forum_questions')
        .insert({
          title: question.title,
          description: question.description,
          user_email: userEmail,
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

      if (error) throw error

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        userEmail: data.user_email,
        userRole: data.user_role,
        createdAt: data.created_at,
        category: data.category,
        urgency: data.urgency,
        visibility: data.visibility,
        views: data.views || 0,
        upvotes: data.upvotes || 0,
        downvotes: data.downvotes || 0,
        answers: [],
        isBookmarked: false,
        userVote: null,
        userVotes: {}
      }
    } catch (error) {
      console.error('Error creating question:', error)
      throw error
    }
  }

  // Add an answer to a question
  async addAnswer(answer: NewAnswer, userEmail: string, userRole: string): Promise<ForumAnswer> {
    try {
      const { data, error } = await supabase
        .from('forum_answers')
        .insert({
          question_id: answer.questionId,
          text: answer.text,
          user_email: userEmail,
          user_role: userRole
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        text: data.text,
        userEmail: data.user_email,
        userRole: data.user_role,
        createdAt: data.created_at
      }
    } catch (error) {
      console.error('Error adding answer:', error)
      throw error
    }
  }

  // Update a question
  async updateQuestion(questionId: number, updateData: Partial<NewQuestion>): Promise<Partial<ForumQuestion>> {
    try {
      const { data, error } = await supabase
        .from('forum_questions')
        .update({
          title: updateData.title,
          description: updateData.description,
          category: updateData.category,
          urgency: updateData.urgency,
          visibility: updateData.visibility
        })
        .eq('id', questionId)
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        urgency: data.urgency,
        visibility: data.visibility
      }
    } catch (error) {
      console.error('Error updating question:', error)
      throw error
    }
  }

  // Delete a question (this will cascade delete answers, votes, and bookmarks due to foreign key constraints)
  async deleteQuestion(questionId: number): Promise<void> {
    try {
      // First delete related data (if not using CASCADE DELETE in your database)
      // Delete bookmarks
      await supabase
        .from('forum_bookmarks')
        .delete()
        .eq('question_id', questionId)

      // Delete votes
      await supabase
        .from('forum_votes')
        .delete()
        .eq('question_id', questionId)

      // Delete answers
      await supabase
        .from('forum_answers')
        .delete()
        .eq('question_id', questionId)

      // Finally delete the question
      const { error } = await supabase
        .from('forum_questions')
        .delete()
        .eq('id', questionId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting question:', error)
      throw error
    }
  }

  // Get a single question by ID (useful for refreshing data after edit)
  async getQuestionById(questionId: number, userEmail?: string): Promise<ForumQuestion | null> {
    try {
      // Get question with answers
      const { data: questionData, error: questionError } = await supabase
        .from('forum_questions')
        .select(`
          *,
          forum_answers (
            id,
            text,
            user_email,
            user_role,
            created_at
          )
        `)
        .eq('id', questionId)
        .single()

      if (questionError) throw questionError
      if (!questionData) return null

      // Get user-specific data if logged in
      let userVote: 'up' | 'down' | null = null
      let isBookmarked = false

      if (userEmail) {
        // Get user vote
        const { data: voteData } = await supabase
          .from('forum_votes')
          .select('vote_type')
          .eq('question_id', questionId)
          .eq('user_email', userEmail)
          .single()

        userVote = voteData?.vote_type || null

        // Get bookmark status
        const { data: bookmarkData } = await supabase
          .from('forum_bookmarks')
          .select('id')
          .eq('question_id', questionId)
          .eq('user_email', userEmail)
          .single()

        isBookmarked = !!bookmarkData
      }

      // Get all votes for this question to build userVotes object
      const { data: allVotes } = await supabase
        .from('forum_votes')
        .select('user_email, vote_type')
        .eq('question_id', questionId)

      const userVotes: { [userEmail: string]: 'up' | 'down' } = {}
      if (allVotes) {
        allVotes.forEach(vote => {
          userVotes[vote.user_email] = vote.vote_type
        })
      }

      // Transform data
      const question: ForumQuestion = {
        id: questionData.id,
        title: questionData.title,
        description: questionData.description,
        userEmail: questionData.user_email,
        userRole: questionData.user_role,
        createdAt: questionData.created_at,
        category: questionData.category,
        urgency: questionData.urgency,
        visibility: questionData.visibility || 'all',
        views: questionData.views || 0,
        upvotes: questionData.upvotes || 0,
        downvotes: questionData.downvotes || 0,
        isBookmarked,
        userVote,
        userVotes,
        answers: questionData.forum_answers?.map((answer: any) => ({
          id: answer.id,
          text: answer.text,
          userEmail: answer.user_email,
          userRole: answer.user_role,
          createdAt: answer.created_at
        })) || []
      }

      return question
    } catch (error) {
      console.error('Error fetching question by ID:', error)
      throw error
    }
  }

  // Vote on a question
  async voteQuestion(questionId: number, userEmail: string, voteType: 'up' | 'down'): Promise<{ upvotes: number; downvotes: number; userVote: 'up' | 'down' | null }> {
    try {
      // Check if user already voted
      const { data: existingVote } = await supabase
        .from('forum_votes')
        .select('vote_type')
        .eq('question_id', questionId)
        .eq('user_email', userEmail)
        .single()

      let newUserVote: 'up' | 'down' | null = null

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote if clicking same vote type
          await supabase
            .from('forum_votes')
            .delete()
            .eq('question_id', questionId)
            .eq('user_email', userEmail)

          // Update question vote counts
          const field = voteType === 'up' ? 'upvotes' : 'downvotes'
          await supabase.rpc('decrement_vote', { 
            question_id: questionId, 
            vote_field: field 
          })

          newUserVote = null
        } else {
          // Change vote type
          await supabase
            .from('forum_votes')
            .update({ vote_type: voteType })
            .eq('question_id', questionId)
            .eq('user_email', userEmail)

          // Update question vote counts (move from one to another)
          if (voteType === 'up') {
            await supabase.rpc('increment_upvote_decrement_downvote', { question_id: questionId })
          } else {
            await supabase.rpc('increment_downvote_decrement_upvote', { question_id: questionId })
          }

          newUserVote = voteType
        }
      } else {
        // Add new vote
        await supabase
          .from('forum_votes')
          .insert({
            question_id: questionId,
            user_email: userEmail,
            vote_type: voteType
          })

        // Update question vote counts
        const field = voteType === 'up' ? 'upvotes' : 'downvotes'
        await supabase.rpc('increment_vote', { 
          question_id: questionId, 
          vote_field: field 
        })

        newUserVote = voteType
      }

      // Get updated vote counts
      const { data: questionData } = await supabase
        .from('forum_questions')
        .select('upvotes, downvotes')
        .eq('id', questionId)
        .single()

      return {
        upvotes: questionData?.upvotes || 0,
        downvotes: questionData?.downvotes || 0,
        userVote: newUserVote
      }
    } catch (error) {
      console.error('Error voting on question:', error)
      throw error
    }
  }

  // Toggle bookmark
  async toggleBookmark(questionId: number, userEmail: string): Promise<boolean> {
    try {
      // Check if already bookmarked
      const { data: existingBookmark } = await supabase
        .from('forum_bookmarks')
        .select('id')
        .eq('question_id', questionId)
        .eq('user_email', userEmail)
        .single()

      if (existingBookmark) {
        // Remove bookmark
        await supabase
          .from('forum_bookmarks')
          .delete()
          .eq('question_id', questionId)
          .eq('user_email', userEmail)
        return false
      } else {
        // Add bookmark
        await supabase
          .from('forum_bookmarks')
          .insert({
            question_id: questionId,
            user_email: userEmail
          })
        return true
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      throw error
    }
  }

  // Increment view count
  async incrementViews(questionId: number): Promise<void> {
    try {
      await supabase.rpc('increment_views', { question_id: questionId })
    } catch (error) {
      console.error('Error incrementing views:', error)
      // Don't throw error for view counting failures
    }
  }

  // Get forum statistics
  async getForumStats(): Promise<{ totalQuestions: number; totalAnswers: number; activeUsers: number }> {
    try {
      // Get question count
      const { count: questionCount } = await supabase
        .from('forum_questions')
        .select('*', { count: 'exact', head: true })

      // Get answer count
      const { count: answerCount } = await supabase
        .from('forum_answers')
        .select('*', { count: 'exact', head: true })

      // Get unique user count (from questions and answers)
      const { data: questionUsers } = await supabase
        .from('forum_questions')
        .select('user_email')

      const { data: answerUsers } = await supabase
        .from('forum_answers')
        .select('user_email')

      const uniqueUsers = new Set([
        ...(questionUsers?.map(u => u.user_email) || []),
        ...(answerUsers?.map(u => u.user_email) || [])
      ])

      return {
        totalQuestions: questionCount || 0,
        totalAnswers: answerCount || 0,
        activeUsers: uniqueUsers.size
      }
    } catch (error) {
      console.error('Error fetching forum stats:', error)
      return { totalQuestions: 0, totalAnswers: 0, activeUsers: 0 }
    }
  }

  // Get user's bookmarked questions
  async getBookmarkedQuestions(userEmail: string): Promise<ForumQuestion[]> {
    try {
      const { data, error } = await supabase
        .from('forum_bookmarks')
        .select(`
          forum_questions (
            *,
            forum_answers (
              id,
              text,
              user_email,
              user_role,
              created_at
            )
          )
        `)
        .eq('user_email', userEmail)

      if (error) throw error

      return data?.map((bookmark: any) => {
        const question = bookmark.forum_questions
        return {
          id: question.id,
          title: question.title,
          description: question.description,
          userEmail: question.user_email,
          userRole: question.user_role,
          createdAt: question.created_at,
          category: question.category,
          urgency: question.urgency,
          visibility: question.visibility,
          views: question.views,
          upvotes: question.upvotes,
          downvotes: question.downvotes,
          isBookmarked: true,
          userVote: null, // Would need separate query to get this
          userVotes: {},
          answers: question.forum_answers?.map((answer: any) => ({
            id: answer.id,
            text: answer.text,
            userEmail: answer.user_email,
            userRole: answer.user_role,
            createdAt: answer.created_at
          })) || []
        }
      }) || []
    } catch (error) {
      console.error('Error fetching bookmarked questions:', error)
      throw error
    }
  }
}


export const forumService = new ForumService()