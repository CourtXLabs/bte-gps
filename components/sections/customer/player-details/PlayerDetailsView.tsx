import { createClient } from "@/lib/supabase/server"
import { ComboToPointData, ReportApiData } from "@/types"
import { getTotalPointsFromMoves } from "@/utils/get-sequence-data"
import { cookies } from "next/headers"
import ReportsList from "./ReportsList"
import DribblePieChart from "./charts/DribblePieChart"
import PointsComboBarChart from "./charts/PointsComboBarChart"

function groupByReportId(data: Record<string, any>[]) {
  const grouped = data.reduce((acc: any, item: any) => {
    // Handle cases where report might be null
    const reportId = item.report?.id
    if (!reportId) return acc

    // Initialize the group if it does not already exist
    if (!acc[reportId]) {
      acc[reportId] = {
        report: item.report,
        moves: [],
      }
    }

    // Append all moves to the group
    acc[reportId].moves = acc[reportId].moves.concat(item.move)

    return acc
  }, {})

  return grouped
}

const getReports = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase
      .from("report")
      .select("id, name, player_id(name, jersey, team_id(name)), game_id(date, home_team_id(name), away_team_id(name))")
      .eq("player_id", id)

    return { data: data as unknown as ReportApiData[], error }
  } catch (error: any) {
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
}

const getComboPointsRatio = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    // TODO: For improved performance, consider using a rpc function
    const { data, error } = await supabase
      .from("sequence")
      .select(
        `
          move (code, x, y),
          report:report_id (id, player_id, game_id (date))
        `,
      )
      .eq("report.player_id", id)

    if (!data) {
      return { error: "No data found" }
    }
    const groupedData: Record<string, { report: any; moves: any }> = groupByReportId(data)

    const chartData = [] as ComboToPointData[]
    for (const { report, moves } of Object.values(groupedData)) {
      const date = report.game_id.date.split("T")[0]
      const comboCount = moves.length - 1 // Assuming all moves are dribbles except the last one, which is the shot
      const points = getTotalPointsFromMoves(moves)
      chartData.push({ date, comboCount, points })
    }

    return { data: chartData, error }
  } catch (error: any) {
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
}

interface Props {
  id: string
}

export default async function PlayerDetailsView({ id }: Props) {
  const [reportsResponse, comboPointsResponse] = await Promise.all([getReports(id), getComboPointsRatio(id)])

  await getComboPointsRatio(id)

  if (!reportsResponse.data || !reportsResponse.data.length) {
    return <div>No player data yet</div>
  }
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-20 lg:px-0">
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
        {comboPointsResponse.data && <PointsComboBarChart data={comboPointsResponse.data} />}
        <DribblePieChart />
      </div>
      <ReportsList data={reportsResponse.data} />
    </div>
  )
}
