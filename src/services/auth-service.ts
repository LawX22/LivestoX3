// auth-services.ts
import { supabase } from '@/supabase'

class AuthService {
  async signIn(email: string, password: string) {
    const lowerCaseEmail = email.toLowerCase()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: lowerCaseEmail,
      password,
    })
    return { data, error }
  }

  async signUp(email: string, password: string, additionalInfo: any = {}) {
    // Step 1: Sign up the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: additionalInfo,
      },
    })

    if (error || !data?.user) return { data, error }

    const userId = data.user.id

    // Step 2: Handle both camelCase and lowercase metadata
    const profileData = {
      id: userId,
      email,
      username: additionalInfo.username,
      // ✅ Support both camelCase and lowercase (from Supabase)
      first_name: additionalInfo.firstName || additionalInfo.firstname || null,
      last_name: additionalInfo.lastName || additionalInfo.lastname || null,
      phone_number: additionalInfo.phoneNumber || additionalInfo.phone || null,
      gender: additionalInfo.gender || null,
      role: additionalInfo.role || 'Buyer',
      is_verified: additionalInfo.isVerified || additionalInfo.email_verified || false,
      profile_picture: additionalInfo.profilePicture || null,
      created_at: new Date().toISOString(),
      last_active: new Date().toISOString(),
    }

    // Step 3: Insert into profiles table
    const { error: profileError } = await supabase.from('profiles').insert([profileData])

    if (profileError) {
      console.error('❌ Error saving to profiles:', profileError)
    } else {
      console.log('✅ Profile created for:', email)
    }

    return { data, error: error || profileError }
  }

  async resendEmailOtp(email: string) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    })
    if (error) return error
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
    if (error) return error
    return !data
  }

  async checkEmailAvailable(email: string) {
    const { data, error } = await supabase.rpc('is_email_exist', { email }).single()
    if (error) return error
    return !data
  }
}

export const auth = new AuthService()
