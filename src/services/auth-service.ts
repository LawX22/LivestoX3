// auth-service.ts
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
    try {
      console.log('📝 Signup data being sent:', additionalInfo)

      // Sign up the user with metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            // Use consistent camelCase keys
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

      console.log('✅ User created with metadata:', data.user.user_metadata)

      // Wait for trigger to execute
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Check if profile was created
      const { data: profileData, error: profileCheckError } = await supabase
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
          email,
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
    } catch (err) {
      console.error('❌ Unexpected error during signup:', err)
      return { data: null, error: err }
    }
  }

  async resendEmailOtp(email: string) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    })
    return error
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