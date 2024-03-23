import { createClient } from "@/lib/supabase/server"
import { ReportApiData } from "@/types"
import { cookies } from "next/headers"
import NotFound404Error from "../../error/NotFound404Error"
import ReportsList from "./ReportsList"

const getData = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase
      .from("report")
      .select("id, name, player_id(name, jersey, team_id(name)), game_id(date, home_team_id(name), away_team_id(name))")
      .eq("player_id", id) // Filters rows where player_id matches the given value

    return { data: data as unknown as ReportApiData[], error }
  } catch (error: any) {
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
}

interface Props {
  id: string
}

export default async function PlayerDetailsView({ id }: Props) {
  const { data, error } = await getData(id)
  if (error) {
    return <NotFound404Error />
  }
  if (!data || !data.length) {
    return <div>No player data yet</div>
  }
  return (
    <div className="mx-auto w-max max-w-7xl px-4 py-20 lg:px-0">
      <ReportsList data={data} />
    </div>
  )
}
