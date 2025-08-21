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
}

export const auth = new AuthService()
