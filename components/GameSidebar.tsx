import { createClient } from "@/lib/supabase/server"
import { PlayerData, TeamData } from "@/types"
import { cookies } from "next/headers"
import GameForm from "./GameForm"
import SequencesListSection from "./sections/SequencesListSection"

const getData = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const teams = await supabase.from("team").select("id, name")
  const players = await supabase.from("player").select("id, name, team_id, jersey")

  return { teams: teams.data as TeamData[], players: players.data as PlayerData[] }
}

export default async function GameSidebar() {
  const { teams, players } = await getData()

  return (
    <div className="h-max space-y-4 overflow-y-auto bg-background-dark p-6 lg:max-h-[780px] xl:w-72	">
      <GameForm players={players} teams={teams} />
      <SequencesListSection />
    </div>
  )
}
