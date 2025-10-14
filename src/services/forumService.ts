// services/forumService.ts
import { supabase } from '../supabase'

export interface ForumAnswer {
  id: number
  text: string
  userId: string
  userRole: string
  userFirstName?: string
  userLastName?: string
  userFullName?: string
  createdAt: string
}

export interface ForumQuestion {
  id: number
  title: string
  description?: string
  userId: string
  userRole: string
  userFirstName?: string
  userLastName?: string
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

export interface NewAnswer {
  questionId: number
  text: string
}

class ForumService {
  // Helper method to get user details from auth.users by UUID
  private async getUserDetails(userId: string): Promise<{ firstName: string, lastName: string, fullName: string } | null> {
    try {
      console.log('Fetching user details for user_id:', userId)
      
      // First try to get from public.users table (your app's users table)
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('firstname, lastname, username, email')
        .eq('id', userId)
        .single()
      
      if (!userError && userData) {
        console.log('Found user in public.users table:', userData)
        
        const firstName = (userData.firstname || '').trim()
        const lastName = (userData.lastname || '').trim()
        const username = (userData.username || '').trim()
        const emailPrefix = userData.email?.split('@')[0] || ''
        
        let fullName = ''
        
        if (firstName && lastName) {
          fullName = `${firstName} ${lastName}`
        } else if (firstName) {
          fullName = firstName
        } else if (lastName) {
          fullName = lastName
        } else if (username) {
          fullName = username
        } else if (emailPrefix) {
          fullName = emailPrefix
        } else {
          fullName = 'Unknown User'
        }
        
        console.log('Processed user details:', { firstName, lastName, fullName })
        
        return {
          firstName: firstName || '',
          lastName: lastName || '',
          fullName: fullName
        }
      }
      
      // If not found in public.users, try to get email from auth.users
      console.log('User not found in public.users, checking auth metadata')
      
      const { data: authData, error: authError } = await supabase.auth.admin.getUserById(userId)
      
      if (!authError && authData?.user) {
        console.log('Found user in auth.users:', authData.user.email)
        
        const email = authData.user.email || ''
        const emailPrefix = email.split('@')[0] || 'Unknown User'
        
        // Try to get metadata
        const metadata = authData.user.user_metadata || {}
        const firstName = (metadata.firstname || metadata.firstName || '').trim()
        const lastName = (metadata.lastname || metadata.lastName || '').trim()
        
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
        
        console.log('Processed auth user details:', { firstName, lastName, fullName })
        
        return {
          firstName: firstName || '',
          lastName: lastName || '',
          fullName: fullName
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

      // Fetch all user details in one query from public.users
      const { data: usersData, error } = await supabase
        .from('users')
        .select('id, email, firstname, lastname, username')
        .in('id', Array.from(userIds))

      if (error) {
        console.error('Error fetching users data:', error)
      }

      console.log('Fetched users data from database:', usersData)

      // Create a comprehensive lookup map
      const userLookup: { [userId: string]: { firstName: string, lastName: string, fullName: string } } = {}
      
      // Process users from public.users table
      usersData?.forEach(user => {
        const firstName = (user.firstname || '').trim()
        const lastName = (user.lastname || '').trim()
        const username = (user.username || '').trim()
        const emailPrefix = user.email?.split('@')[0] || ''
        
        let fullName = ''
        
        if (firstName && lastName) {
          fullName = `${firstName} ${lastName}`
        } else if (firstName) {
          fullName = firstName
        } else if (lastName) {
          fullName = lastName
        } else if (username) {
          fullName = username
        } else if (emailPrefix) {
          fullName = emailPrefix
        } else {
          fullName = 'Unknown User'
        }
        
        userLookup[user.id] = {
          firstName: firstName || '',
          lastName: lastName || '',
          fullName: fullName
        }
        
        console.log(`User lookup entry for ${user.id}:`, userLookup[user.id])
      })

      // For any missing users, try to get from auth.users or add fallback
      for (const userId of Array.from(userIds)) {
        if (!userLookup[userId]) {
          const userDetails = await this.getUserDetails(userId)
          
          if (userDetails) {
            userLookup[userId] = userDetails
          } else {
            userLookup[userId] = {
              firstName: '',
              lastName: '',
              fullName: 'Unknown User'
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
          userRole: question.user_role,
          userFirstName: questionUser?.firstName || '',
          userLastName: questionUser?.lastName || '',
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
              userRole: answer.user_role,
              userFirstName: answerUser?.firstName || '',
              userLastName: answerUser?.lastName || '',
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
      userRole: question.user_role,
      userFirstName: '',
      userLastName: '',
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
        userRole: answer.user_role,
        userFirstName: '',
        userLastName: '',
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
      console.log('Creating question for user:', userId)
      
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

      if (error) throw error

      console.log('Question created:', data)

      const userDetails = await this.getUserDetails(userId)

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        userId: data.user_id,
        userRole: data.user_role,
        userFirstName: userDetails?.firstName || '',
        userLastName: userDetails?.lastName || '',
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

  // Add an answer to a question (with proper user names)
  async addAnswer(answer: NewAnswer, userId: string, userRole: string): Promise<ForumAnswer> {
    try {
      console.log('Adding answer for user:', userId)
      
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

      if (error) throw error

      console.log('Answer created:', data)

      const userDetails = await this.getUserDetails(userId)

      return {
        id: data.id,
        text: data.text,
        userId: data.user_id,
        userRole: data.user_role,
        userFirstName: userDetails?.firstName || '',
        userLastName: userDetails?.lastName || '',
        userFullName: userDetails?.fullName || 'Unknown User',
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
      console.log('Updating question:', questionId, updateData)

      const { data: existingQuestion, error: checkError } = await supabase
        .from('forum_questions')
        .select('*')
        .eq('id', questionId)
        .single()

      if (checkError) {
        console.error('Error checking question existence:', checkError)
        throw new Error(`Question not found or access denied: ${checkError.message}`)
      }

      if (!existingQuestion) {
        throw new Error('Question not found')
      }

      console.log('Existing question found:', existingQuestion)

      const updatePayload: any = {}
      
      if (updateData.title !== undefined) updatePayload.title = updateData.title
      if (updateData.description !== undefined) updatePayload.description = updateData.description
      if (updateData.category !== undefined) updatePayload.category = updateData.category
      if (updateData.urgency !== undefined) updatePayload.urgency = updateData.urgency
      if (updateData.visibility !== undefined) updatePayload.visibility = updateData.visibility

      if (Object.keys(updatePayload).length === 0) {
        console.log('No changes detected, returning existing data')
        const userDetails = await this.getUserDetails(existingQuestion.user_id)
        
        return {
          id: existingQuestion.id,
          title: existingQuestion.title,
          description: existingQuestion.description,
          category: existingQuestion.category,
          urgency: existingQuestion.urgency,
          visibility: existingQuestion.visibility,
          userFirstName: userDetails?.firstName || '',
          userLastName: userDetails?.lastName || '',
          userFullName: userDetails?.fullName || 'Unknown User'
        }
      }

      console.log('Update payload:', updatePayload)

      const { error: updateError } = await supabase
        .from('forum_questions')
        .update(updatePayload)
        .eq('id', questionId)

      if (updateError) {
        console.error('Supabase update error:', updateError)
        throw new Error(`Update failed: ${updateError.message}`)
      }

      const { data: updatedData, error: selectError } = await supabase
        .from('forum_questions')
        .select('id, title, description, category, urgency, visibility, user_id')
        .eq('id', questionId)
        .single()

      if (selectError || !updatedData) {
        console.error('Error fetching updated data:', selectError)
        const userDetails = await this.getUserDetails(existingQuestion.user_id)
        
        return {
          id: questionId,
          title: updatePayload.title || existingQuestion.title,
          description: updatePayload.description !== undefined ? updatePayload.description : existingQuestion.description,
          category: updatePayload.category || existingQuestion.category,
          urgency: updatePayload.urgency || existingQuestion.urgency,
          visibility: updatePayload.visibility || existingQuestion.visibility,
          userFirstName: userDetails?.firstName || '',
          userLastName: userDetails?.lastName || '',
          userFullName: userDetails?.fullName || 'Unknown User'
        }
      }

      console.log('Question updated successfully:', updatedData)

      const userDetails = await this.getUserDetails(updatedData.user_id)

      return {
        id: updatedData.id,
        title: updatedData.title,
        description: updatedData.description,
        category: updatedData.category,
        urgency: updatedData.urgency,
        visibility: updatedData.visibility,
        userFirstName: userDetails?.firstName || '',
        userLastName: userDetails?.lastName || '',
        userFullName: userDetails?.fullName || 'Unknown User'
      }
    } catch (error) {
      console.error('Error updating question:', error)
      throw error
    }
  }

  // Delete a question
  async deleteQuestion(questionId: number): Promise<void> {
    try {
      console.log('Deleting question:', questionId)

      const { data: existingQuestion, error: checkError } = await supabase
        .from('forum_questions')
        .select('id')
        .eq('id', questionId)
        .single()

      if (checkError || !existingQuestion) {
        throw new Error('Question not found')
      }

      const { error: votesError } = await supabase
        .from('forum_votes')
        .delete()
        .eq('question_id', questionId)

      if (votesError) {
        console.warn('Error deleting votes:', votesError)
      }

      const { error: answersError } = await supabase
        .from('forum_answers')
        .delete()
        .eq('question_id', questionId)

      if (answersError) {
        console.warn('Error deleting answers:', answersError)
      }

      const { error: questionError } = await supabase
        .from('forum_questions')
        .delete()
        .eq('id', questionId)

      if (questionError) {
        console.error('Error deleting question:', questionError)
        throw questionError
      }

      console.log('Question deleted successfully:', questionId)
    } catch (error) {
      console.error('Error deleting question:', error)
      throw error
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

  // Check if user owns a question
  async checkQuestionOwnership(questionId: number, userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('forum_questions')
        .select('user_id')
        .eq('id', questionId)
        .single()

      if (error || !data) return false
      
      return data.user_id === userId
    } catch (error) {
      console.error('Error checking question ownership:', error)
      return false
    }
  }
}

export const forumService = new ForumService()