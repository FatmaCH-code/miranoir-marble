import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// A real anon key is a long JWT. Anything else means "not set up yet",
// and the site quietly runs in demo mode instead of failing.
export const isSupabaseConfigured = Boolean(url && anonKey && anonKey.split('.').length === 3 && anonKey.length > 100)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
