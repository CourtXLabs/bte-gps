import { SupabaseClient } from "@supabase/supabase-js"

export const getAllGames = async (supabase: SupabaseClient) => {
  await supabase.from("game").select('*')
}

