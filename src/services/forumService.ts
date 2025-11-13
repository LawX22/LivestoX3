// services/forumService.ts
import { supabase } from '../supabase'

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

class ForumService {
  // Helper method to get user details from profiles table
  private async getUserDetails(userId: string): Promise<{ fullName: string, role: string } | null> {
    try {
      console.log('Fetching user details for user_id:', userId)
      
      // Get from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name, username, role')
        .eq('id', userId)
        .single()
      
      if (!profileError && profileData) {
        console.log('Found user in profiles table:', profileData)
        
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
        
        console.log('Processed user details:', { fullName, role })
        
        return {
          fullName: fullName,
          role: role
        }
      }
      
      // Fallback to auth user
      console.log('User not found in profiles, checking auth metadata')
      
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser && authUser.id === userId) {
        console.log('Found user in auth:', authUser.email)
        
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
        
        console.log('Processed auth user details:', { fullName, role })
        
        return {
          fullName: fullName,
          role: role
        }
      }
      
      console.log('No user data found for user_id:', userId)
      return null
    } catch (error) {
      console.error('Exception while fetching user details:', error)
      return null
    }
  }

  // Helper method to get vote counts for a question
  private async getVoteCounts(questionId: number): Promise<{ upvotes: number; downvotes: number }> {
    try {
      const { data: votes, error } = await supabase
        .from('forum_votes')
        .select('vote_type')
        .eq('question_id', questionId)

      if (error) {
        console.error('Error fetching vote counts:', error)
        return { upvotes: 0, downvotes: 0 }
      }

      const upvotes = votes?.filter(vote => vote.vote_type === 'up').length || 0
      const downvotes = votes?.filter(vote => vote.vote_type === 'down').length || 0

      return { upvotes, downvotes }
    } catch (error) {
      console.error('Exception while getting vote counts:', error)
      return { upvotes: 0, downvotes: 0 }
    }
  }

  // Helper method to sync vote counts in questions table
  private async syncQuestionVoteCounts(questionId: number): Promise<void> {
    try {
      const voteCounts = await this.getVoteCounts(questionId)
      
      const { error } = await supabase
        .from('forum_questions')
        .update({
          upvotes: voteCounts.upvotes,
          downvotes: voteCounts.downvotes
        })
        .eq('id', questionId)

      if (error) {
        console.error('Error syncing vote counts:', error)
      }
    } catch (error) {
      console.error('Exception while syncing vote counts:', error)
    }
  }

  // Helper method to enrich questions and answers with user names
  private async enrichWithUserNames(questions: any[]): Promise<ForumQuestion[]> {
    try {
      console.log('Starting to enrich questions with user names, count:', questions.length)
      
      // Get all unique user IDs from questions and answers
      const userIds = new Set<string>()
      
      questions.forEach(question => {
        if (question.user_id) {
          userIds.add(question.user_id)
        }
        question.forum_answers?.forEach((answer: any) => {
          if (answer.user_id) {
            userIds.add(answer.user_id)
          }
        })
      })

      console.log('Unique user IDs found:', Array.from(userIds))

      if (userIds.size === 0) {
        console.log('No user IDs found, returning questions without enrichment')
        return questions.map(question => this.mapQuestionWithFallbackNames(question))
      }

      // Fetch all user details in one query from profiles
      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, username, role')
        .in('id', Array.from(userIds))

      if (error) {
        console.error('Error fetching profiles data:', error)
      }

      console.log('Fetched profiles data from database:', profilesData)

      // Create a comprehensive lookup map
      const userLookup: { [userId: string]: { fullName: string, role: string } } = {}
      
      // Process users from profiles table
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
        
        userLookup[profile.id] = {
          fullName: fullName,
          role: role
        }
        
        console.log(`User lookup entry for ${profile.id}:`, userLookup[profile.id])
      })

      // For any missing users, try to get from auth or add fallback
      for (const userId of Array.from(userIds)) {
        if (!userLookup[userId]) {
          const userDetails = await this.getUserDetails(userId)
          
          if (userDetails) {
            userLookup[userId] = userDetails
          } else {
            userLookup[userId] = {
              fullName: 'Unknown User',
              role: 'user'
            }
          }
          
          console.log(`Fallback entry created for ${userId}:`, userLookup[userId])
        }
      }

      console.log('Complete user lookup map:', userLookup)

      // Get real-time vote counts for all questions
      const questionIds = questions.map(q => q.id)
      const { data: allVotes } = await supabase
        .from('forum_votes')
        .select('question_id, user_id, vote_type')
        .in('question_id', questionIds)

      // Build vote counts and user votes for each question
      const questionVoteCounts: { [questionId: number]: { upvotes: number, downvotes: number } } = {}
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

      // Enrich questions and answers with proper names
      return questions.map(question => {
        const questionUser = userLookup[question.user_id]
        
        console.log(`Question ${question.id} user: ${question.user_id}`)
        console.log(`Question user details:`, questionUser)
        
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
            
            console.log(`Answer ${answer.id} user: ${answer.user_id}`)
            console.log(`Answer user details:`, answerUser)
            
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
    } catch (error) {
      console.error('Error enriching with user names:', error)
      return questions.map(question => this.mapQuestionWithFallbackNames(question))
    }
  }

  // Helper method to map questions with fallback names when database lookup fails
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

  // Get all questions with answers and votes (with user names)
  async getQuestions(userId?: string): Promise<ForumQuestion[]> {
    try {
      console.log('Fetching questions for user:', userId)
      
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
        console.error('Error fetching questions:', questionsError)
        console.error('Error details:', JSON.stringify(questionsError, null, 2))
        throw questionsError
      }

      console.log('Raw questions data:', questionsData)

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

      const questionsWithVotes = questionsData?.map(question => ({
        ...question,
        userVote: userVotes[question.id] || null
      })) || []

      console.log('Questions with votes before enrichment:', questionsWithVotes.length)

      const enrichedQuestions = await this.enrichWithUserNames(questionsWithVotes)

      console.log('Final enriched questions:', enrichedQuestions.length)
      return enrichedQuestions
    } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
    }
  }

  // Create a new question (with proper user names)
  async createQuestion(question: NewQuestion, userId: string, userRole: string): Promise<ForumQuestion> {
    try {
      console.log('Creating question for user:', userId, 'role:', userRole)
      
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
        console.error('Error creating question:', error)
        throw error
      }

      console.log('Question created:', data)

      const userDetails = await this.getUserDetails(userId)

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
      console.error('Error creating question:', error)
      throw error
    }
  }

  // Update an existing question
  async updateQuestion(questionId: number, updates: UpdateQuestion): Promise<ForumQuestion> {
    try {
      console.log('Updating question:', questionId, 'with updates:', updates)
      
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
        console.error('Error updating question:', error)
        throw error
      }

      console.log('Question updated:', data)

      // Enrich with user names
      const enriched = await this.enrichWithUserNames([data])
      return enriched[0]
    } catch (error) {
      console.error('Error updating question:', error)
      throw error
    }
  }

  // Delete a question (cascades to answers and votes)
  async deleteQuestion(questionId: number): Promise<void> {
    try {
      console.log('Deleting question:', questionId)
      
      // First delete all answers
      const { error: answersError } = await supabase
        .from('forum_answers')
        .delete()
        .eq('question_id', questionId)

      if (answersError) {
        console.error('Error deleting answers:', answersError)
        throw answersError
      }

      // Then delete all votes
      const { error: votesError } = await supabase
        .from('forum_votes')
        .delete()
        .eq('question_id', questionId)

      if (votesError) {
        console.error('Error deleting votes:', votesError)
        throw votesError
      }

      // Finally delete the question
      const { error: questionError } = await supabase
        .from('forum_questions')
        .delete()
        .eq('id', questionId)

      if (questionError) {
        console.error('Error deleting question:', questionError)
        throw questionError
      }

      console.log('Question deleted successfully')
    } catch (error) {
      console.error('Error deleting question:', error)
      throw error
    }
  }

  // Add an answer to a question (with proper user names)
  async addAnswer(answer: NewAnswer, userId: string, userRole: string): Promise<ForumAnswer> {
    try {
      console.log('Adding answer for user:', userId, 'role:', userRole)
      
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
        console.error('Error adding answer:', error)
        throw error
      }

      console.log('Answer created:', data)

      const userDetails = await this.getUserDetails(userId)

      return {
        id: data.id,
        text: data.text,
        userId: data.user_id,
        userRole: userDetails?.role || userRole,
        userFullName: userDetails?.fullName || 'Unknown User',
        createdAt: data.created_at
      }
    } catch (error) {
      console.error('Error adding answer:', error)
      throw error
    }
  }

  // Vote on a question
  async voteQuestion(questionId: number, userId: string, voteType: 'up' | 'down'): Promise<{ upvotes: number; downvotes: number; userVote: 'up' | 'down' | null }> {
    try {
      console.log(`User ${userId} voting ${voteType} on question ${questionId}`)

      const { data: existingVote, error: voteCheckError } = await supabase
        .from('forum_votes')
        .select('vote_type')
        .eq('question_id', questionId)
        .eq('user_id', userId)
        .single()

      if (voteCheckError && voteCheckError.code !== 'PGRST116') {
        console.error('Error checking existing vote:', voteCheckError)
        throw voteCheckError
      }

      let newUserVote: 'up' | 'down' | null = null

      if (existingVote) {
        console.log('Existing vote found:', existingVote.vote_type)
        
        if (existingVote.vote_type === voteType) {
          console.log('Removing existing vote')
          
          const { error: deleteError } = await supabase
            .from('forum_votes')
            .delete()
            .eq('question_id', questionId)
            .eq('user_id', userId)

          if (deleteError) {
            console.error('Error deleting vote:', deleteError)
            throw deleteError
          }

          newUserVote = null
        } else {
          console.log(`Changing vote from ${existingVote.vote_type} to ${voteType}`)
          
          const { error: updateError } = await supabase
            .from('forum_votes')
            .update({ vote_type: voteType })
            .eq('question_id', questionId)
            .eq('user_id', userId)

          if (updateError) {
            console.error('Error updating vote:', updateError)
            throw updateError
          }

          newUserVote = voteType
        }
      } else {
        console.log('Adding new vote')
        
        const { error: insertError } = await supabase
          .from('forum_votes')
          .insert({
            question_id: questionId,
            user_id: userId,
            vote_type: voteType
          })

        if (insertError) {
          console.error('Error inserting vote:', insertError)
          throw insertError
        }

        newUserVote = voteType
      }

      const voteCounts = await this.getVoteCounts(questionId)
      console.log('Updated vote counts:', voteCounts)

      await this.syncQuestionVoteCounts(questionId)

      return {
        upvotes: voteCounts.upvotes,
        downvotes: voteCounts.downvotes,
        userVote: newUserVote
      }
    } catch (error) {
      console.error('Error voting on question:', error)
      throw error
    }
  }

  // Increment view count
  async incrementViews(questionId: number): Promise<number> {
    try {
      const { data: currentData } = await supabase
        .from('forum_questions')
        .select('views')
        .eq('id', questionId)
        .single()

      const currentViews = currentData?.views || 0
      const newViews = currentViews + 1

      const { error } = await supabase
        .from('forum_questions')
        .update({ views: newViews })
        .eq('id', questionId)
      
      if (error) {
        console.error('Error incrementing views:', error)
        return currentViews
      }
      
      return newViews
    } catch (error) {
      console.error('Error incrementing views:', error)
      return 0
    }
  }

  // Get a single question by ID
  async getQuestionById(questionId: number, userId?: string): Promise<ForumQuestion | null> {
    try {
      console.log('Fetching question by ID:', questionId, 'for user:', userId)
      
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

      console.log('Question data found:', questionData)

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
      
      const result = enrichedQuestions[0] || null
      console.log('Final enriched question:', result)
      
      return result
    } catch (error) {
      console.error('Error fetching question by ID:', error)
      throw error
    }
  }
}

export const forumService = new ForumService()