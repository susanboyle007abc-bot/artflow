import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl) {
  console.warn('Warning: VITE_SUPABASE_URL is not set. Please set VITE_SUPABASE_URL environment variable.')
}

if (!supabaseAnonKey) {
  console.warn('Warning: VITE_SUPABASE_ANON_KEY is not set. Please set VITE_SUPABASE_ANON_KEY environment variable.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

