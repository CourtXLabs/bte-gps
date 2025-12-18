import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  // Use service role key for server-side queries (bypasses RLS)
  // Falls back to anon key if service role key not available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = 
    process.env.SUPABASE_SERVICE_ROLE_KEY || 
    process.env.SUPABASE_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Validate required environment variables
  if (!supabaseUrl) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
    throw new Error('Supabase URL is not configured')
  }
  
  if (!supabaseKey) {
    console.error('Missing Supabase key (SUPABASE_SERVICE_ROLE_KEY, SUPABASE_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
    throw new Error('Supabase key is not configured')
  }
  
  try {
    return createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    throw new Error('Failed to initialize Supabase client')
  }
}
