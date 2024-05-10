import { MoveIds, idToUid, moveUids } from "@/constants/misc"
import { createClient } from "@/lib/supabase/server"
import {
  ComboToPointData,
  DribbleChartApiData,
  MoveApiData,
  ReportApiData,
  SequenceCombosData,
  SimlePlayerData,
} from "@/types"
import { getIsDribble } from "@/utils/get-is-dribble"
import { getFirstThreeDribbles } from "@/utils/get-moves-data"
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

      moves.forEach((move: { code: MoveIds }) => {
        const code = idToUid[move.code] as moveUids
        if (!code) return
        if (!getIsDribble(code)) return

        objectToChange[code] += 1
      })

      return acc
    },
    {
      madeShots: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, "5.5": 0, 6: 0 },
      missedShots: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, "5.5": 0, 6: 0 },
    },
  )

  const isEmpty = Object.keys(moveCounts.madeShots).length === 0 && Object.keys(moveCounts.missedShots).length === 0

  return !isEmpty ? moveCounts : null
}

const groupSequences = (data: DribbleChartApiData[]) => {
  const sequenceCounts = [] as SequenceCombosData[]

  for (const { report, move } of data) {
    if (!report) continue

    const dribbles = getFirstThreeDribbles(move as MoveApiData[]).join("")
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
      .order("id", { ascending: false })

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
      const comboCount = moves.filter((move: MoveApiData) => getIsDribble(move.code)).length // Assuming all moves are dribbles except the last one, which is the shot TODO: fix this
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
    <div className="mx-auto flex w-full flex-col gap-6 px-4 py-10">
      <Link href="/" className="mx-auto mb-2 flex w-full max-w-7xl items-center gap-1">
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
