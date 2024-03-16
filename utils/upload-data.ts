import { GameInput, PlayerData, ReportInput, Sequence, TeamData, gameFormSchema } from "@/types"
import { SupabaseClient } from "@supabase/supabase-js"
import { z } from "zod"
import { constructSequencesSvg } from "./get-svg-court"

export const uploadTeams = async (supabase: SupabaseClient, data: TeamData[]) => {
  await supabase.from("team").insert(data)
}

export const uploadPlayers = async (supabase: SupabaseClient, data: PlayerData[]) => {
  await supabase.from("player").insert(data)
}

interface UploadImagesProps {
  supabase: SupabaseClient
  values: z.infer<typeof gameFormSchema>
  sequences: Sequence[]
}
export const uploadImages = async ({ supabase, values, sequences }: UploadImagesProps) => {
  const sequencesImages = await constructSequencesSvg(sequences)
  const uploadPromises = sequencesImages.map((image, imageIndex) => {
    const imageName = `${values.playerName}: ${values.teamName} vs ${values.opponentName}. ${values.date} - ${imageIndex}`
    // Return a promise to upload each image. This promise resolves to imageName for success tracking.
    return supabase.storage
      .from("BTE GPS")
      .upload(imageName, image, {
        contentType: "image/webp",
      })
      .then(() => imageName)
  })

  const imageNames = await Promise.all(uploadPromises)
  return imageNames
}

export const uploadGame = async (supabase: SupabaseClient, gameInput: GameInput) => {
  const gameData = [gameInput]

  const addedGame = await supabase.from("game").insert(gameData).select("id")
  const addedGameId: number = addedGame.data?.[0].id
  return addedGameId
}

export const uploadReport = async (supabase: SupabaseClient, reportData: ReportInput) => {
  const addedReport = await supabase.from("report").insert(reportData).select("id")
  const addedReportId: number = addedReport.data?.[0].id
  return addedReportId
}
