import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  // Use service role key for server-side queries (bypasses RLS)
  // Falls back to anon key if service role key not available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = 
    process.env.SUPABASE_SERVICE_ROLE_KEY || 
    process.env.SUPABASE_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}
