import { Sequence, gameFormSchema } from "@/types"
import { SupabaseClient } from "@supabase/supabase-js"
import { z } from "zod"
import { constructSequencesSvg } from "./get-svg-court"

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
