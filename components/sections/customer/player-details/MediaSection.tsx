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

/**
 * Local fallback dribble-graph images for players whose image is not yet uploaded
 * to Supabase storage ("Player Premium Images/{id}/dribble-graph.png").
 * Key = player numeric or UUID id as it appears in the URL /players/[id].
 */
const LOCAL_DRIBBLE_GRAPH_FALLBACKS: Record<string, string> = {
  "55": "/mikel-55-dribble-graph.png", // Mikel Brown Jr.
}

/**
 * Local fallback YouTube playlist IDs for players whose playlist is not yet
 * stored in Supabase ("player.free_playlist_id" / "player_premium_info.premium_playlist_id").
 * Set value to a YouTube playlist ID (the part after "list=") or leave entry absent.
 */
const LOCAL_PLAYLIST_FALLBACKS: Record<string, string> = {
  // "55": "PLxxxxxxxxxxxx",  // add Mikel's YouTube playlist ID here when available
}

const getImage = async (supabase: SupabaseClient, id: string, isPremium: boolean) => {
  if (!isPremium) {
    return LOCAL_DRIBBLE_GRAPH_FALLBACKS[id] ?? "/example-dribble-graph.png"
  }
  const { data: dribbleGraphData } = await supabase.storage
    .from("Player Premium Images")
    .download(`${id}/dribble-graph.png`)
    .catch((error) => ({ error, data: null }))
  if (!dribbleGraphData) {
    return LOCAL_DRIBBLE_GRAPH_FALLBACKS[id] ?? null
  }
  return await convertBlobImageToBase64(dribbleGraphData)
}

const getPlaylistId = async (supabase: SupabaseClient, id: string, isPremium: boolean): Promise<string | undefined> => {
  if (isPremium) {
    const { data } = await supabase.from("player_premium_info").select("premium_playlist_id").eq("id", id).single()
    if (data?.premium_playlist_id) return data.premium_playlist_id
  } else {
    const { data } = await supabase.from("player").select("free_playlist_id").eq("id", id).single()
    if (data?.free_playlist_id) return data.free_playlist_id
  }
  return LOCAL_PLAYLIST_FALLBACKS[id]
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
