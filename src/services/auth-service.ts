// auth-service.ts
import { supabase } from '@/supabase'

export interface User {
  id: string
  email: string
  role: 'farmer' | 'buyer' | 'both'
  firstName?: string
  lastName?: string
  fullName?: string
  username?: string
  createdAt?: string
}

// Interface for the modal component (matches what AskQuestionModal expects)
export interface ModalUser {
  email: string;
  role: 'Farmer' | 'Buyer' | 'Veterinarian' | 'Poultry Specialist' | 'Agribusiness Consultant';
}

class AuthService {
  async signIn(email: string, password: string) {
    const lowerCaseEmail = email.toLowerCase()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: lowerCaseEmail,
      password,
    })
    return { data, error }
  }

  async signUp(email: string, password: string, additionalInfo = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: additionalInfo,
      },
    })
    return { data, error }
  }

  async resendEmailOtp(email: string) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    })
    if (error) {
      return error
    }
  }

  async verifyEmailOtp(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    })
    return { data, error }
  }

  async checkUsernameAvailable(username: string) {
    const { data, error } = await supabase.rpc('is_username_exist', { username }).single()

    if (error) {
      return error
    }
    return !data
  }

  async checkEmailAvailable(email: string) {
    const { data, error } = await supabase.rpc('is_email_exist', { email }).single()

    if (error) {
      return error
    }
    return !data
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('Session error:', sessionError)
        throw sessionError
      }
      
      if (!session) {
        console.log('No session found')
        return null
      }

      // First, try to get user profile from the users table
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      // If profile doesn't exist, create a basic one from auth data
      if (profileError) {
        console.log('Profile not found, creating from auth data:', profileError)
        
        // Use email prefix as username if not available
        const emailPrefix = session.user.email?.split('@')[0] || 'user'
        
        // Create user profile
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert([
            {
              id: session.user.id,
              email: session.user.email,
              role: 'farmer', // default role
              username: emailPrefix,
              first_name: '',
              last_name: '',
              created_at: new Date().toISOString()
            }
          ])
          .select()
          .single()

        if (createError) {
          console.error('Error creating user profile:', createError)
          // Even if profile creation fails, return basic user data from session
          return {
            id: session.user.id,
            email: session.user.email!,
            role: 'farmer',
            username: emailPrefix,
            createdAt: new Date().toISOString()
          }
        }

        return {
          id: session.user.id,
          email: session.user.email!,
          role: newProfile.role || 'farmer',
          firstName: newProfile.first_name,
          lastName: newProfile.last_name,
          fullName: `${newProfile.first_name || ''} ${newProfile.last_name || ''}`.trim() || 'Unknown User',
          username: newProfile.username,
          createdAt: newProfile.created_at
        }
      }

      // Return existing profile with proper field mapping
      return {
        id: session.user.id,
        email: session.user.email!,
        role: profile.role || 'farmer',
        firstName: profile.first_name,
        lastName: profile.last_name,
        fullName: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Unknown User',
        username: profile.username,
        createdAt: profile.created_at
      }
    } catch (err) {
      console.error('Error getting current user:', err)
      // Instead of throwing, return null to handle gracefully
      return null
    }
  }

  // New method to get user in the format expected by AskQuestionModal
  async getUser(): Promise<ModalUser | null> {
    try {
      const user = await this.getCurrentUser();
      
      if (!user) {
        return null;
      }

      // Map the database roles to the modal's expected roles
      const roleMap: Record<string, ModalUser['role']> = {
        'farmer': 'Farmer',
        'buyer': 'Buyer',
        'both': 'Farmer', // Default to Farmer if 'both'
        'veterinarian': 'Veterinarian',
        'poultry specialist': 'Poultry Specialist',
        'agribusiness consultant': 'Agribusiness Consultant'
      };

      // Convert role to match modal expectations
      const modalRole = roleMap[user.role.toLowerCase()] || 'Farmer';

      return {
        email: user.email,
        role: modalRole
      };
    } catch (error) {
      console.error('Error getting user for modal:', error);
      return null;
    }
  }

  async createUserProfile(userId: string, profileData: {
    email: string;
    role: 'farmer' | 'buyer' | 'both';
    firstName?: string;
    lastName?: string;
    username: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            email: profileData.email,
            role: profileData.role,
            first_name: profileData.firstName || '',
            last_name: profileData.lastName || '',
            username: profileData.username,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Error creating user profile:', error)
        throw error
      }

      return data
    } catch (err) {
      console.error('Error in createUserProfile:', err)
      throw err
    }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  }
}

export const auth = new AuthService()