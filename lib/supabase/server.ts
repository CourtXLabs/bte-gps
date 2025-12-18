import { createServerClient } from "@supabase/ssr"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  
  // Use service role key for server-side queries (bypasses RLS)
  // If service role key is available, use standard client (not SSR client)
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY
  
  if (serviceRoleKey) {
    // Use standard Supabase client for service role key (bypasses RLS)
    return createSupabaseClient(supabaseUrl, serviceRoleKey)
  }
  
  // Fall back to SSR client with anon key (for client-side auth)
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  return createServerClient(supabaseUrl, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}
