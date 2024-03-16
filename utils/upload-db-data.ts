import { GameInput, PlayerData, ReportInput, TeamData } from "@/types"
import { SupabaseClient } from "@supabase/supabase-js"

export const uploadTeams = async (supabase: SupabaseClient, data: TeamData[]) => {
  await supabase.from("team").insert(data)
}

export const uploadPlayers = async (supabase: SupabaseClient, data: PlayerData[]) => {
  await supabase.from("player").insert(data)
}

export const uploadGame = async (supabase: SupabaseClient, gameInput: GameInput) => {
  const addedGame = await supabase.from("game").insert(gameInput).select("id")
  const addedGameId: number = addedGame.data?.[0].id
  return addedGameId
}

export const uploadReport = async (supabase: SupabaseClient, reportData: ReportInput) => {
  const addedReport = await supabase.from("report").insert(reportData).select("id")
  const addedReportId: number = addedReport.data?.[0].id
  return addedReportId
}
