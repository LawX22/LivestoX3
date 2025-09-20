import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase values
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseAnonKey = 'your-anon-key-here'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)