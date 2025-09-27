// services/forumService.ts
import { supabase } from '../supabase'

export interface ForumAnswer {
  id: number
  text: string
  userEmail: string
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
  userEmail: string
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
  // Helper method to get user details by email
  private async getUserDetails(userEmail: string): Promise<{ firstName?: string, lastName?: string } | null> {
    try {
      console.log('Fetching user details for email:', userEmail)
      
      const { data, error } = await supabase
        .from('users')
        .select('first_name, last_name')
        .eq('email', userEmail)
        .single()
      
      if (error) {
        console.error('Error fetching user details:', error)
        return null
      }
      
      if (!data) {
        console.log('No user data found for email:', userEmail)
        return null
      }

      console.log('Raw user data:', data)
      
      const firstName = data.first_name || ''
      const lastName = data.last_name || ''
      
      console.log('Processed user details:', { firstName, lastName })
      
      return {
        firstName,
        lastName
      }
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
      
      // Get all unique user emails from questions and answers
      const userEmails = new Set<string>()
      
      questions.forEach(question => {
        if (question.user_email) {
          userEmails.add(question.user_email)
        }
        question.forum_answers?.forEach((answer: any) => {
          if (answer.user_email) {
            userEmails.add(answer.user_email)
          }
        })
      })

      console.log('Unique user emails found:', Array.from(userEmails))

      if (userEmails.size === 0) {
        console.log('No user emails found, returning questions without enrichment')
        return questions.map(question => ({
          ...question,
          userFirstName: '',
          userLastName: '',
          userFullName: 'Unknown User',
          answers: question.forum_answers?.map((answer: any) => ({
            ...answer,
            userFirstName: '',
            userLastName: '',
            userFullName: 'Unknown User'
          })) || []
        }))
      }

      // Fetch all user details in one query using correct field names
      const { data: usersData, error } = await supabase
        .from('users')
        .select('email, first_name, last_name')
        .in('email', Array.from(userEmails))

      if (error) {
        console.error('Error fetching users data:', error)
      }

      console.log('Fetched users data:', usersData)

      // Create a lookup map
      const userLookup: { [email: string]: { firstName: string, lastName: string } } = {}
      usersData?.forEach(user => {
        const firstName = user.first_name || ''
        const lastName = user.last_name || ''
        
        userLookup[user.email] = {
          firstName,
          lastName
        }
        
        console.log(`User lookup entry for ${user.email}:`, { firstName, lastName })
      })

      console.log('Complete user lookup map:', userLookup)

      // Get real-time vote counts for all questions
      const questionIds = questions.map(q => q.id)
      const { data: allVotes } = await supabase
        .from('forum_votes')
        .select('question_id, user_email, vote_type')
        .in('question_id', questionIds)

      // Build vote counts and user votes for each question
      const questionVoteCounts: { [questionId: number]: { upvotes: number, downvotes: number } } = {}
      const questionUserVotes: { [questionId: number]: { [userEmail: string]: 'up' | 'down' } } = {}

      questionIds.forEach(qId => {
        questionVoteCounts[qId] = { upvotes: 0, downvotes: 0 }
        questionUserVotes[qId] = {}
      })

      if (allVotes) {
        allVotes.forEach(vote => {
          // Count votes
          if (vote.vote_type === 'up') {
            questionVoteCounts[vote.question_id].upvotes++
          } else if (vote.vote_type === 'down') {
            questionVoteCounts[vote.question_id].downvotes++
          }
          
          // Track user votes
          questionUserVotes[vote.question_id][vote.user_email] = vote.vote_type
        })
      }

      // Enrich questions and answers
      return questions.map(question => {
        const questionUser = userLookup[question.user_email] || { firstName: '', lastName: '' }
        const questionFullName = `${questionUser.firstName} ${questionUser.lastName}`.trim() || 'Unknown User'
        
        console.log(`Question ${question.id} user: ${question.user_email} -> ${questionFullName}`)
        
        // Use real-time vote counts instead of stored values
        const voteCounts = questionVoteCounts[question.id] || { upvotes: 0, downvotes: 0 }
        
        return {
          id: question.id,
          title: question.title,
          description: question.description,
          userEmail: question.user_email,
          userRole: question.user_role,
          userFirstName: questionUser.firstName,
          userLastName: questionUser.lastName,
          userFullName: questionFullName,
          createdAt: question.created_at,
          category: question.category,
          urgency: question.urgency,
          visibility: question.visibility || 'all',
          views: question.views || 0,
          upvotes: voteCounts.upvotes, // Use real-time count
          downvotes: voteCounts.downvotes, // Use real-time count
          userVote: question.userVote || null,
          userVotes: questionUserVotes[question.id] || {},
          answers: question.forum_answers?.map((answer: any) => {
            const answerUser = userLookup[answer.user_email] || { firstName: '', lastName: '' }
            const answerFullName = `${answerUser.firstName} ${answerUser.lastName}`.trim() || 'Unknown User'
            
            console.log(`Answer ${answer.id} user: ${answer.user_email} -> ${answerFullName}`)
            
            return {
              id: answer.id,
              text: answer.text,
              userEmail: answer.user_email,
              userRole: answer.user_role,
              userFirstName: answerUser.firstName,
              userLastName: answerUser.lastName,
              userFullName: answerFullName,
              createdAt: answer.created_at
            }
          }) || []
        }
      })
    } catch (error) {
      console.error('Error enriching with user names:', error)
      // Return questions with empty user names instead of failing completely
      return questions.map(question => ({
        id: question.id,
        title: question.title,
        description: question.description,
        userEmail: question.user_email,
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
          userEmail: answer.user_email,
          userRole: answer.user_role,
          userFirstName: '',
          userLastName: '',
          userFullName: 'Unknown User',
          createdAt: answer.created_at
        })) || []
      }))
    }
  }

  // Get all questions with answers and votes (with user names)
  async getQuestions(userEmail?: string): Promise<ForumQuestion[]> {
    try {
      console.log('Fetching questions for user:', userEmail)
      
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

      if (questionsError) {
        console.error('Error fetching questions:', questionsError)
        throw questionsError
      }

      console.log('Raw questions data:', questionsData)

      // Get user-specific votes if logged in
      let userVotes: { [questionId: number]: 'up' | 'down' } = {}

      if (userEmail) {
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
      }

      // Add user vote information to question data
      const questionsWithVotes = questionsData?.map(question => ({
        ...question,
        userVote: userVotes[question.id] || null
      })) || []

      console.log('Questions with votes before enrichment:', questionsWithVotes.length)

      // Enrich with user names and real-time vote counts
      const enrichedQuestions = await this.enrichWithUserNames(questionsWithVotes)

      console.log('Final enriched questions:', enrichedQuestions.length)
      return enrichedQuestions
    } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
    }
  }

  // Create a new question (with user names)
  async createQuestion(question: NewQuestion, userEmail: string, userRole: string): Promise<ForumQuestion> {
    try {
      console.log('Creating question for user:', userEmail)
      
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

      console.log('Question created:', data)

      // Get user details for the created question
      const userDetails = await this.getUserDetails(userEmail)
      const fullName = userDetails ? `${userDetails.firstName} ${userDetails.lastName}`.trim() : 'Unknown User'

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        userEmail: data.user_email,
        userRole: data.user_role,
        userFirstName: userDetails?.firstName || '',
        userLastName: userDetails?.lastName || '',
        userFullName: fullName,
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

  // Add an answer to a question (with user names)
  async addAnswer(answer: NewAnswer, userEmail: string, userRole: string): Promise<ForumAnswer> {
    try {
      console.log('Adding answer for user:', userEmail)
      
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

      console.log('Answer created:', data)

      // Get user details for the answer
      const userDetails = await this.getUserDetails(userEmail)
      const fullName = userDetails ? `${userDetails.firstName} ${userDetails.lastName}`.trim() : 'Unknown User'

      return {
        id: data.id,
        text: data.text,
        userEmail: data.user_email,
        userRole: data.user_role,
        userFirstName: userDetails?.firstName || '',
        userLastName: userDetails?.lastName || '',
        userFullName: fullName,
        createdAt: data.created_at
      }
    } catch (error) {
      console.error('Error adding answer:', error)
      throw error
    }
  }

  // Update a question with improved error handling
  async updateQuestion(questionId: number, updateData: Partial<NewQuestion>): Promise<Partial<ForumQuestion>> {
    try {
      console.log('Updating question:', questionId, updateData)

      // First, check if the question exists and get its current data
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

      // Prepare update data
      const updatePayload: any = {}
      
      if (updateData.title !== undefined) updatePayload.title = updateData.title
      if (updateData.description !== undefined) updatePayload.description = updateData.description
      if (updateData.category !== undefined) updatePayload.category = updateData.category
      if (updateData.urgency !== undefined) updatePayload.urgency = updateData.urgency
      if (updateData.visibility !== undefined) updatePayload.visibility = updateData.visibility

      // If no changes, return existing data with user info
      if (Object.keys(updatePayload).length === 0) {
        console.log('No changes detected, returning existing data')
        const userDetails = await this.getUserDetails(existingQuestion.user_email)
        const fullName = userDetails ? `${userDetails.firstName} ${userDetails.lastName}`.trim() : 'Unknown User'
        
        return {
          id: existingQuestion.id,
          title: existingQuestion.title,
          description: existingQuestion.description,
          category: existingQuestion.category,
          urgency: existingQuestion.urgency,
          visibility: existingQuestion.visibility,
          userFirstName: userDetails?.firstName || '',
          userLastName: userDetails?.lastName || '',
          userFullName: fullName
        }
      }

      console.log('Update payload:', updatePayload)

      // Update the question in database
      const { error: updateError } = await supabase
        .from('forum_questions')
        .update(updatePayload)
        .eq('id', questionId)

      if (updateError) {
        console.error('Supabase update error:', updateError)
        throw new Error(`Update failed: ${updateError.message}`)
      }

      // Get the updated question data
      const { data: updatedData, error: selectError } = await supabase
        .from('forum_questions')
        .select('id, title, description, category, urgency, visibility, user_email')
        .eq('id', questionId)
        .single()

      if (selectError || !updatedData) {
        console.error('Error fetching updated data:', selectError)
        // Fallback: return the expected updated data based on our payload
        const userDetails = await this.getUserDetails(existingQuestion.user_email)
        const fullName = userDetails ? `${userDetails.firstName} ${userDetails.lastName}`.trim() : 'Unknown User'
        
        return {
          id: questionId,
          title: updatePayload.title || existingQuestion.title,
          description: updatePayload.description !== undefined ? updatePayload.description : existingQuestion.description,
          category: updatePayload.category || existingQuestion.category,
          urgency: updatePayload.urgency || existingQuestion.urgency,
          visibility: updatePayload.visibility || existingQuestion.visibility,
          userFirstName: userDetails?.firstName || '',
          userLastName: userDetails?.lastName || '',
          userFullName: fullName
        }
      }

      console.log('Question updated successfully:', updatedData)

      // Get user details for the updated question
      const userDetails = await this.getUserDetails(updatedData.user_email)
      const fullName = userDetails ? `${userDetails.firstName} ${userDetails.lastName}`.trim() : 'Unknown User'

      return {
        id: updatedData.id,
        title: updatedData.title,
        description: updatedData.description,
        category: updatedData.category,
        urgency: updatedData.urgency,
        visibility: updatedData.visibility,
        userFirstName: userDetails?.firstName || '',
        userLastName: userDetails?.lastName || '',
        userFullName: fullName
      }
    } catch (error) {
      console.error('Error updating question:', error)
      throw error
    }
  }

  // Delete a question with proper cascading and error handling
  async deleteQuestion(questionId: number): Promise<void> {
    try {
      console.log('Deleting question:', questionId)

      // First, check if the question exists
      const { data: existingQuestion, error: checkError } = await supabase
        .from('forum_questions')
        .select('id')
        .eq('id', questionId)
        .single()

      if (checkError || !existingQuestion) {
        throw new Error('Question not found')
      }

      // Start a transaction-like approach by deleting related data first
      // Delete votes
      const { error: votesError } = await supabase
        .from('forum_votes')
        .delete()
        .eq('question_id', questionId)

      if (votesError) {
        console.warn('Error deleting votes:', votesError)
      }

      // Delete answers
      const { error: answersError } = await supabase
        .from('forum_answers')
        .delete()
        .eq('question_id', questionId)

      if (answersError) {
        console.warn('Error deleting answers:', answersError)
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

      console.log('Question deleted successfully:', questionId)
    } catch (error) {
      console.error('Error deleting question:', error)
      throw error
    }
  }

  // Get a single question by ID with real-time vote counts
  async getQuestionById(questionId: number, userEmail?: string): Promise<ForumQuestion | null> {
    try {
      console.log('Fetching question by ID:', questionId, 'for user:', userEmail)
      
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

      if (questionError) {
        if (questionError.code === 'PGRST116') {
          return null // Question not found
        }
        throw questionError
      }
      
      if (!questionData) return null

      console.log('Question data found:', questionData)

      // Get user-specific vote if logged in
      let userVote: 'up' | 'down' | null = null

      if (userEmail) {
        const { data: voteData } = await supabase
          .from('forum_votes')
          .select('vote_type')
          .eq('question_id', questionId)
          .eq('user_email', userEmail)
          .single()

        userVote = voteData?.vote_type || null
      }

      // Add vote information to question data
      const questionWithVotes = {
        ...questionData,
        userVote
      }

      // Enrich with user names and get real-time vote counts
      const enrichedQuestions = await this.enrichWithUserNames([questionWithVotes])
      
      const result = enrichedQuestions[0] || null
      console.log('Final enriched question:', result)
      
      return result
    } catch (error) {
      console.error('Error fetching question by ID:', error)
      throw error
    }
  }

  // Vote on a question with improved error handling and transaction safety
  async voteQuestion(questionId: number, userEmail: string, voteType: 'up' | 'down'): Promise<{ upvotes: number; downvotes: number; userVote: 'up' | 'down' | null }> {
    try {
      console.log(`User ${userEmail} voting ${voteType} on question ${questionId}`)

      // Check if user already voted
      const { data: existingVote, error: voteCheckError } = await supabase
        .from('forum_votes')
        .select('vote_type')
        .eq('question_id', questionId)
        .eq('user_email', userEmail)
        .single()

      if (voteCheckError && voteCheckError.code !== 'PGRST116') {
        // PGRST116 means no rows found, which is expected for new votes
        console.error('Error checking existing vote:', voteCheckError)
        throw voteCheckError
      }

      let newUserVote: 'up' | 'down' | null = null

      if (existingVote) {
        console.log('Existing vote found:', existingVote.vote_type)
        
        if (existingVote.vote_type === voteType) {
          // Remove vote if clicking same vote type
          console.log('Removing existing vote')
          
          const { error: deleteError } = await supabase
            .from('forum_votes')
            .delete()
            .eq('question_id', questionId)
            .eq('user_email', userEmail)

          if (deleteError) {
            console.error('Error deleting vote:', deleteError)
            throw deleteError
          }

          newUserVote = null
        } else {
          // Change vote type
          console.log(`Changing vote from ${existingVote.vote_type} to ${voteType}`)
          
          const { error: updateError } = await supabase
            .from('forum_votes')
            .update({ vote_type: voteType })
            .eq('question_id', questionId)
            .eq('user_email', userEmail)

          if (updateError) {
            console.error('Error updating vote:', updateError)
            throw updateError
          }

          newUserVote = voteType
        }
      } else {
        // Add new vote
        console.log('Adding new vote')
        
        const { error: insertError } = await supabase
          .from('forum_votes')
          .insert({
            question_id: questionId,
            user_email: userEmail,
            vote_type: voteType
          })

        if (insertError) {
          console.error('Error inserting vote:', insertError)
          throw insertError
        }

        newUserVote = voteType
      }

      // Get real-time vote counts after the vote operation
      const voteCounts = await this.getVoteCounts(questionId)
      console.log('Updated vote counts:', voteCounts)

      // Sync the vote counts in the questions table
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
      // Simple increment for now - you can add more sophisticated view tracking later
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

  // Check if user owns a question - useful for frontend authorization checks
  async checkQuestionOwnership(questionId: number, userEmail: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('forum_questions')
        .select('user_email')
        .eq('id', questionId)
        .single()

      if (error || !data) return false
      
      return data.user_email === userEmail
    } catch (error) {
      console.error('Error checking question ownership:', error)
      return false
    }
  }
}

export const forumService = new ForumService()