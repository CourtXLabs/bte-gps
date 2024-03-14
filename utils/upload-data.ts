import { SupabaseClient } from "@supabase/supabase-js"

interface TeamData {
  name: string
}
export const uploadTeams = async (supabase: SupabaseClient, data: TeamData[]) => {
  await supabase.from("team").insert(data)
}

interface PlayerData {
  name: string
  jersey: string
  team_id: string
}
export const uploadPlayers = async (supabase: SupabaseClient, data: PlayerData[]) => {
  await supabase.from("player").insert(data)
}
