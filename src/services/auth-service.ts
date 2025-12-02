// auth-service.ts
import { supabase } from '@/supabase'

interface SignUpData {
  username?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  gender?: string
  role?: string
  profilePicture?: string
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

  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  }

  async signUp(email: string, password: string, additionalInfo: SignUpData = {}) {
    try {
      // Normalize email to lowercase
      const lowerCaseEmail = email.toLowerCase()
      
      console.log('📝 Signup data being sent:', additionalInfo)

      // First, check if there's an existing unverified account with this email
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id, is_verified, created_at')
        .eq('email', lowerCaseEmail)
        .maybeSingle()

      if (existingUser) {
        if (existingUser.is_verified) {
          // Account exists and is verified
          return {
            data: null,
            error: {
              message: 'This email is already registered and verified. Please sign in.',
              status: 400
            }
          }
        } else {
          // Check if the unverified account is older than 10 minutes
          const createdAt = new Date(existingUser.created_at).getTime()
          const now = Date.now()
          const tenMinutes = 10 * 60 * 1000

          if (now - createdAt > tenMinutes) {
            // Old unverified account - delete it
            console.log('🗑️ Deleting expired unverified account...')
            await this.deleteUnverifiedUser(existingUser.id)
          } else {
            // Recent unverified account - user needs to wait or verify
            return {
              data: null,
              error: {
                message: 'A verification email was recently sent to this address. Please check your email or wait before requesting a new code.',
                status: 400
              }
            }
          }
        }
      }

      // Sign up the user with metadata - this creates an UNVERIFIED account
      // The account will remain unverified until OTP is confirmed
      const { data, error } = await supabase.auth.signUp({
        email: lowerCaseEmail,
        password,
        options: {
          data: {
            username: additionalInfo.username || null,
            firstName: additionalInfo.firstName || null,
            lastName: additionalInfo.lastName || null,
            phoneNumber: additionalInfo.phoneNumber || null,
            gender: additionalInfo.gender || null,
            role: additionalInfo.role || 'Buyer',
            profilePicture: additionalInfo.profilePicture || null,
          },
        },
      })

      if (error || !data?.user) {
        console.error('❌ Signup error:', error)
        return { data, error }
      }

      console.log('✅ Unverified user created with ID:', data.user.id)
      console.log('📧 OTP sent to:', lowerCaseEmail)
      console.log('⚠️ User metadata:', data.user.user_metadata)

      // Wait for trigger to execute
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Check if profile was created
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle()

      console.log('📊 Profile check result:', profileData)

      // If profile doesn't exist, create it manually
      if (!profileData) {
        console.warn('⚠️ Profile not created by trigger, creating manually...')
        
        const profileInsert = {
          id: data.user.id,
          email: lowerCaseEmail,
          username: additionalInfo.username || null,
          first_name: additionalInfo.firstName || null,
          last_name: additionalInfo.lastName || null,
          phone_number: additionalInfo.phoneNumber || null,
          gender: additionalInfo.gender || null,
          role: additionalInfo.role || 'Buyer',
          is_verified: false,
          profile_picture: additionalInfo.profilePicture || null,
          created_at: new Date().toISOString(),
          last_active: new Date().toISOString(),
        }

        console.log('📝 Inserting profile:', profileInsert)

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([profileInsert])

        if (profileError) {
          console.error('❌ Failed to create profile:', profileError)
          return { data, error: profileError }
        }

        console.log('✅ Profile created manually')
      } else {
        console.log('✅ Profile exists:', profileData)
      }

      return { data, error }
    } catch (err: any) {
      console.error('❌ Unexpected error during signup:', err)
      return { data: null, error: err }
    }
  }

  async resendEmailOtp(email: string) {
    try {
      const lowerCaseEmail = email.toLowerCase()
      
      console.log('🔄 Resending OTP to:', lowerCaseEmail)
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: lowerCaseEmail,
      })
      
      if (error) {
        console.error('❌ Resend OTP error:', error)
        return error
      }
      
      console.log('✅ OTP resent successfully')
      return null
    } catch (err: any) {
      console.error('❌ Unexpected error resending OTP:', err)
      return err
    }
  }

  async verifyEmailOtp(email: string, token: string) {
    try {
      const lowerCaseEmail = email.toLowerCase()
      const trimmedToken = token.trim()
      
      console.log('🔐 Verifying OTP for:', lowerCaseEmail)
      console.log('🔑 Token length:', trimmedToken.length)
      
      // Validate token format (should be 6 digits)
      if (!/^\d{6}$/.test(trimmedToken)) {
        const validationError: any = {
          message: 'Invalid OTP format. Please enter a 6-digit code.',
          status: 400,
        }
        console.error('❌ Invalid OTP format:', trimmedToken)
        return { data: null, error: validationError }
      }

      const { data, error } = await supabase.auth.verifyOtp({
        email: lowerCaseEmail,
        token: trimmedToken,
        type: 'signup',
      })

      if (error) {
        console.error('❌ OTP verification error:', error)
        
        // Provide more helpful error messages
        let userFriendlyError: any = error
        if (error.message?.includes('Token has expired')) {
          userFriendlyError = {
            ...error,
            message: 'The verification code has expired. Please request a new one.',
          }
        } else if (error.message?.includes('Invalid token')) {
          userFriendlyError = {
            ...error,
            message: 'Invalid verification code. Please check and try again.',
          }
        } else if (error.status === 403) {
          userFriendlyError = {
            ...error,
            message: 'Verification failed. The code may have expired or already been used. Please request a new code.',
          }
        }
        
        return { data: null, error: userFriendlyError }
      }

      console.log('✅ OTP verified successfully:', data)
      
      // After successful verification, ensure session is established
      if (data?.session) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        })
        
        if (sessionError) {
          console.error('❌ Error setting session:', sessionError)
        } else {
          console.log('✅ Session established successfully')
        }
      }

      // Update profile to mark as verified
      if (data?.user?.id) {
        console.log('📝 Updating profile to mark as verified...')
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ is_verified: true })
          .eq('id', data.user.id)
        
        if (updateError) {
          console.error('❌ Error updating profile verification status:', updateError)
        } else {
          console.log('✅ Profile marked as verified')
        }
      }

      return { data, error: null }
    } catch (err: any) {
      console.error('❌ Unexpected error during OTP verification:', err)
      return { 
        data: null, 
        error: {
          message: 'An unexpected error occurred. Please try again.',
          status: 500,
        }
      }
    }
  }

  /**
   * Delete an unverified user account
   */
  async deleteUnverifiedUser(userId: string) {
    try {
      console.log('🗑️ Attempting to delete unverified user:', userId)
      
      // First, delete the profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)
        .eq('is_verified', false) // Only delete if not verified
      
      if (profileError) {
        console.error('❌ Error deleting profile:', profileError)
        return { error: profileError }
      }
      
      console.log('✅ Profile deleted successfully')
      
      // Note: The auth user in Supabase Auth cannot be deleted from client-side code
      // It requires service role access. The auth user will be automatically cleaned up
      // by Supabase after being unconfirmed for a certain period (usually 24 hours)
      
      // For immediate cleanup, you would need to create a Supabase Edge Function:
      /*
        import { createClient } from '@supabase/supabase-js'
        
        const supabaseAdmin = createClient(
          Deno.env.get('SUPABASE_URL'),
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
        )
        
        await supabaseAdmin.auth.admin.deleteUser(userId)
      */
      
      return { error: null }
    } catch (err: any) {
      console.error('❌ Unexpected error deleting unverified user:', err)
      return { error: err }
    }
  }

  async checkUsernameAvailable(username: string) {
    try {
      const { data, error } = await supabase.rpc('is_username_exist', { username })
      
      if (error) {
        console.error('❌ Username check error:', error)
        return { available: false, error }
      }
      
      return { available: !data, error: null }
    } catch (err: any) {
      console.error('❌ Unexpected error checking username:', err)
      return { available: false, error: err }
    }
  }

  async checkEmailAvailable(email: string) {
    try {
      const lowerCaseEmail = email.toLowerCase()
      
      console.log('🔍 Checking email availability:', lowerCaseEmail)
      
      const { data, error } = await supabase.rpc('is_email_exist', { email: lowerCaseEmail })
      
      if (error) {
        console.error('❌ Email check error:', error)
        return { available: false, error }
      }
      
      console.log('📊 Email exists:', data)
      return { available: !data, error: null }
    } catch (err: any) {
      console.error('❌ Unexpected error checking email:', err)
      return { available: false, error: err }
    }
  }

  async signOut() {
    try {
      console.log('👋 Signing out...')
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('❌ Sign out error:', error)
        return { error }
      }
      
      console.log('✅ Signed out successfully')
      return { error: null }
    } catch (err: any) {
      console.error('❌ Unexpected error during sign out:', err)
      return { error: err }
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        console.error('❌ Get user error:', error)
        return { user: null, error }
      }
      
      return { user, error: null }
    } catch (err: any) {
      console.error('❌ Unexpected error getting user:', err)
      return { user: null, error: err }
    }
  }

  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('❌ Get session error:', error)
        return { session: null, error }
      }
      
      return { session, error: null }
    } catch (err: any) {
      console.error('❌ Unexpected error getting session:', err)
      return { session: null, error: err }
    }
  }
}

export const auth = new AuthService()