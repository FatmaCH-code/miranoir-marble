import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// A real key is a publishable key or a long JWT. Anything else means "not set up yet",
// and the site quietly runs in demo mode instead of failing.
// (new-style keys start with "sb_publishable_", older ones are JWTs)
export const isSupabaseConfigured = Boolean(
  url && anonKey && (anonKey.startsWith('sb_publishable_') || (anonKey.split('.').length === 3 && anonKey.length > 100)),
)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
