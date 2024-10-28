import { getIsPremium } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import convertBlobImageToBase64 from "@/utils/convert-blob-image-to-base64"
import { SupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import DribbleChartLegend from "./DribbleChartLegend"
import DribbleChartSection from "./DribbleChartSection"
import VideosSection from "./VideosSection"

interface Props {
  id: string
}

const getImage = async (supabase: SupabaseClient, id: string, isPremium: boolean) => {
  if (!isPremium) {
    return "/example-dribble-graph.png"
  }
  const { data: dribbleGraphData } = await supabase.storage
    .from("Player Premium Images")
    .download(`${id}/dribble-graph.png`)
    .catch((error) => ({ error, data: null }))
  if (!dribbleGraphData) {
    return null
  }
  return await convertBlobImageToBase64(dribbleGraphData)
}

const getPlaylistId = async (supabase: SupabaseClient, id: string, isPremium: boolean): Promise<string | undefined> => {
  if (isPremium) {
    const { data } = await supabase.from("player_premium_info").select("premium_playlist_id").eq("id", id).single()
    return data?.premium_playlist_id
  }
  const { data } = await supabase.from("player").select("free_playlist_id").eq("id", id).single()
  return data?.free_playlist_id
}

const getData = async (id: string, isPremium: boolean) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  return await Promise.all([getImage(supabase, id, isPremium), getPlaylistId(supabase, id, isPremium)])
}

export default async function MediaSection({ id }: Props) {
  const isPremium = await getIsPremium()
  const [dribbleGraphImg, playlistId] = await getData(id, isPremium)

  return (
    <div className="w-full">
      <DribbleChartLegend className="lg:w-1/2" />

      <div className="flex w-full flex-col gap-10 lg:flex-row">
        {dribbleGraphImg && <DribbleChartSection src={dribbleGraphImg} isPremium={isPremium} />}
        {playlistId && <VideosSection playlistId={playlistId} />}
      </div>
    </div>
  )
}
