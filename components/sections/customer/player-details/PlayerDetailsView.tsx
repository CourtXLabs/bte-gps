import { moveIdKeys } from "@/constants/misc"
import { createClient } from "@/lib/supabase/server"
import { ComboToPointData, DribbleChartApiData, ReportApiData, SequenceCombosData, SimlePlayerData } from "@/types"
import { getTotalPointsFromMoves } from "@/utils/get-sequence-data"
import { ArrowLeftIcon } from "lucide-react"
import { cookies } from "next/headers"
import Link from "next/link"
import PlayerDashboardToolbar from "./PlayerDashboardToolbar"
import ReportsList from "./ReportsList"
import ComboTimesUsedChart from "./charts/ComboTimesUsedChart"
import DribblePieChart from "./charts/DribblePieChart"
import DribblePieChartLegend from "./charts/DribblePieChartLegend"
import PointsComboBarChart from "./charts/PointsComboBarChart"

function groupByReportId(data: Record<string, any>[]) {
  const grouped = data.reduce((acc: any, item: any) => {
    const reportId = item.report?.id
    if (!reportId) return acc

    if (!acc[reportId]) {
      acc[reportId] = {
        report: item.report,
        moves: [],
      }
    }

    acc[reportId].moves = acc[reportId].moves.concat(item.move)

    return acc
  }, {})

  return grouped
}

const groupMoves = (data: DribbleChartApiData[]) => {
  const moveCounts = data.reduce(
    (acc: Record<string, Record<string, number>>, report) => {
      if (!report.report) return acc
      const moves = report.move

      const isMadeShot = moves[moves.length - 1].code === 7
      const objectToChange = acc[isMadeShot ? "madeShots" : "missedShots"]

      // Skip last move, which is the shot
      moves.slice(0, -1).forEach((move: any) => {
        const code = move.code as moveIdKeys
        if (!code) return

        if (!objectToChange[code]) {
          objectToChange[code] = 1
        } else {
          objectToChange[code] += 1
        }
      })

      return acc
    },
    { madeShots: {}, missedShots: {} },
  )

  const isEmpty = Object.keys(moveCounts.madeShots).length === 0 && Object.keys(moveCounts.missedShots).length === 0

  return !isEmpty ? moveCounts : null
}

const groupSequences = (data: DribbleChartApiData[]) => {
  const sequenceCounts = [] as SequenceCombosData[]

  for (const { report, move } of data) {
    if (!report) continue

    const movesCount = Math.min(move.length - 1, 3)

    const dribbles = move
      .slice(0, movesCount)
      .map((m) => m.code)
      .join("")
    if (dribbles.length === 0) continue

    const comboIndex = sequenceCounts.findIndex((combo) => combo.sequence === dribbles)
    if (comboIndex === -1) {
      sequenceCounts.push({ sequence: dribbles, count: 1 })
    } else {
      sequenceCounts[comboIndex].count += 1
    }
  }
  return sequenceCounts.sort((a, b) => a.sequence.localeCompare(b.sequence))
}

const getAllPlayers = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase.from("player").select("*")

    return { data: data as SimlePlayerData[], error }
  } catch (error: any) {
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
}

const getReports = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase
      .from("report")
      .select(
        "id, name, player_id(name, jersey, team_id(name)), game_id(date, home_team_id(name), away_team_id(name)), sequence(*, move(code, x, y))",
      )
      .eq("player_id", id)
      .range(0, 0)

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

const getDribblesCounts = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase
      .from("sequence")
      .select("move (code), report:report_id (player_id)")
      .eq("report.player_id", id)

    if (!data) {
      return { error: "No data found" }
    }

    const moveCounts = groupMoves(data)
    const sequenceCounts = groupSequences(data)

    return { moveCounts, sequenceCounts, error }
  } catch (error: any) {
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
}

interface Props {
  id: string
}

export default async function PlayerDetailsView({ id }: Props) {
  const [playersResponse, reportsResponse, comboPointsResponse, dribbleCounts] = await Promise.all([
    getAllPlayers(),
    getReports(id),
    getComboPointsRatio(id),
    getDribblesCounts(id),
  ])

  const allDribbleCounts = { ...dribbleCounts.moveCounts?.madeShots, ...dribbleCounts.moveCounts?.missedShots }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10">
      <Link href="/" className="mb-2 flex items-center gap-1">
        <ArrowLeftIcon /> Players List
      </Link>
      {playersResponse?.data && <PlayerDashboardToolbar players={playersResponse?.data} />}
      <div>
        {!!dribbleCounts.moveCounts && (
          <div className="flex flex-col items-center py-10">
            <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
              <div>
                <h2 className="pb-6 text-center text-2xl font-bold">Made Shots Count</h2>
                <DribblePieChart data={dribbleCounts.moveCounts.madeShots} />
              </div>
              <div>
                <h2 className="pb-6 text-center text-2xl font-bold">Missed Shots Count</h2>
                <DribblePieChart data={dribbleCounts.moveCounts.missedShots} />
              </div>
            </div>
            <DribblePieChartLegend data={allDribbleCounts} />
          </div>
        )}
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
          {!!comboPointsResponse.data?.length && <PointsComboBarChart data={comboPointsResponse.data} />}
          {!!dribbleCounts.sequenceCounts?.length && <ComboTimesUsedChart data={dribbleCounts.sequenceCounts} />}
        </div>
      </div>
      {reportsResponse.data?.length ? (
        <ReportsList data={reportsResponse.data} />
      ) : (
        <div>
          <p>No reports found for this player</p>
        </div>
      )}
    </div>
  )
}
