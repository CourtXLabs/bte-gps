import { DEFAULT_PAGE_SIZE } from "@/constants/misc"
import { getIsAdmin } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { PlayerApiData } from "@/types"
import { cookies } from "next/headers"
import NotFound404Error from "../../error/NotFound404Error"
import PlayersTable from "./PlayersTable"
import PlayersTableToolbar from "./PlayersTableToolbar"

interface Props {
  page?: string
  pageSize?: string
  team?: string
  player?: string
}

const getData = async ({ page, pageSize, team, player }: Props) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  if (!page) page = "1"
  if (!pageSize) pageSize = DEFAULT_PAGE_SIZE.toString()

  const from = (parseInt(page) - 1) * parseInt(pageSize)
  const to = from + parseInt(pageSize) - 1

  let query = supabase.from("player").select("id, name, jersey, team_id (name)", { count: "exact" })

  if (typeof team === "string" && team.trim() !== "") {
    query = query.eq("team_id", team)
  }

  if (typeof player === "string" && player.trim() !== "") {
    query = query.eq("id", player)
  }

  try {
    const players = await query.range(from, to)
    return {
      data: players.data as PlayerApiData[],
      count: players.count,
    }
  } catch (error: any) {
    console.log(error)
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
}

export default async function CustomerHomeView(props: Props) {
  const players = await getData(props)
  if (players.error || !players.data) return <NotFound404Error />

  const isAdmin = await getIsAdmin()

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-20">
      <PlayersTable data={players.data} count={players.count || 0} isAdmin={isAdmin}>
        <PlayersTableToolbar isAdmin={isAdmin} />
      </PlayersTable>
    </div>
  )
}
