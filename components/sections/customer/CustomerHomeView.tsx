import { createClient } from "@/lib/supabase/server"
import { PlayerApiData } from "@/types"
import { cookies } from "next/headers"
import NotFound404Error from "../error/NotFound404Error"
import PlayersList from "./PlayersList"

const getData = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const players = await supabase.from("player").select("id, name, jersey, team_id (name)")
    return { players: players.data as PlayerApiData[] }
  } catch (error: any) {
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
}

export default async function CustomerHomeView() {
  const data = await getData()
  if (data.error || !data.players) return <NotFound404Error />

  return (
    <div className="mx-auto w-max max-w-7xl px-4 py-20 lg:px-0">
      <PlayersList data={data.players} />
    </div>
  )
}
