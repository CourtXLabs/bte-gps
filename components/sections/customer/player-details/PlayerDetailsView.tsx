import { MoveIds, idToUid, moveUids } from "@/constants/misc"
import { getIsAdmin } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import {
  ComboToPointData,
  DribbleChartApiData,
  MoveApiData,
  ReportApiData,
  SequenceCombosData,
  SeuqenceGraphData,
  SimlePlayerData,
} from "@/types"
import { getIsDribble } from "@/utils/get-is-dribble"
import { getTotalPointsFromMoves } from "@/utils/get-sequence-data"
import { ArrowLeftIcon } from "lucide-react"
import { cookies } from "next/headers"
import Link from "next/link"
import PlayerDashboardToolbar from "./PlayerDashboardToolbar"
import ReportsList from "./ReportsList"
import ComboTimesUsedChart from "./charts/ComboTimesUsedChart"
import PointsComboBarChart from "./charts/PointsComboBarChart"
import SequencesGraphs from "./charts/SequencesGraphs"
import InsightsButton from "./insights/InsightsButton"

function groupByReportId(data: Record<string, any>[]) {
  const grouped = data.reduce((acc: any, item: any) => {
    const reportId = item.report?.id
    if (!reportId) return acc

    if (!acc[reportId]) {
      acc[reportId] = {
        report: item.report,
        moves: [],
        combos: [],
      }
    }

    acc[reportId].moves = acc[reportId].moves.concat(item.move)
    acc[reportId].combos = acc[reportId].combos.concat(item.combo)

    return acc
  }, {})

  return grouped
}

const groupMoves = (data: DribbleChartApiData[]) => {
  const moveCounts = data.reduce(
    (acc: Record<string, Record<string, number>>, report) => {
      if (!report.report) return acc
      const moves = report.move
      if (!moves.length) return acc

      const isMadeShot = moves[moves.length - 1].code === 8
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
      madeShots: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
      missedShots: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
    },
  )

  const isEmpty = Object.keys(moveCounts.madeShots).length === 0 && Object.keys(moveCounts.missedShots).length === 0

  return !isEmpty ? moveCounts : null
}

const groupCombos = (data: DribbleChartApiData[]) => {
  const comboCounts = [] as SequenceCombosData[]

  for (const { report, combo } of data) {
    if (!report) continue

    combo.forEach((comboMoves) => {
      const comboCode = comboMoves.move.flatMap((move) => (getIsDribble(move.code) ? move.code : [])).join("")
      if (!comboCode) return
      const comboIndex = comboCounts.findIndex((comboCount) => comboCount.sequence === comboCode)

      if (comboIndex === -1) {
        comboCounts.push({ sequence: comboCode, count: 1 })
      } else {
        comboCounts[comboIndex].count += 1
      }
    })
  }

  return comboCounts
}

const groupSequenceData = (data: DribbleChartApiData[]) => {
  const initialDirectionCounts = { madeShots: {}, missedShots: {} } as Record<string, Record<string, number>>
  const counterDirectionCounts = { madeShots: {}, missedShots: {} } as Record<string, Record<string, number>>
  const lastDribbleTypeCounts = { madeShots: {}, missedShots: {} } as Record<string, Record<string, number>>

  for (const { initial_direction, counter_direction, last_dribble_type, move } of data) {
    if (!move.length) continue
    const isMadeShot = move[move.length - 1].code === 8
    const key = isMadeShot ? "madeShots" : "missedShots"
    if (initial_direction && initial_direction !== "0") {
      initialDirectionCounts[key][initial_direction] = (initialDirectionCounts[key][initial_direction] || 0) + 1
    }
    if (counter_direction && counter_direction !== "0") {
      counterDirectionCounts[key][counter_direction] = (counterDirectionCounts[key][counter_direction] || 0) + 1
    }
    if (last_dribble_type && last_dribble_type !== "0") {
      lastDribbleTypeCounts[key][last_dribble_type] = (lastDribbleTypeCounts[key][last_dribble_type] || 0) + 1
    }
  }
  return { initialDirectionCounts, counterDirectionCounts, lastDribbleTypeCounts }
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
        "id, name, points, player_id(name, jersey, team_id(name)), game_id(date, home_team_id(name), away_team_id(name)), sequence(*, combo(id), move(code, x, y))",
      )
      .eq("player_id", id)

    return {
      // @ts-ignore
      data: data?.sort((a, b) => new Date(b.game_id.date) - new Date(a.game_id.date)) as unknown as ReportApiData[],
      error,
    }
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
          combo (id, move (code, x, y)),
          report: report_id (id, player_id, points, game_id (date))
        `,
      )
      .not("report", "is", null)
      .eq("report.player_id", id)

    if (!data) {
      return { error: "No data found" }
    }
    const groupedData: Record<string, { report: any; moves: any; combos: any }> = groupByReportId(data)

    const chartData = [] as ComboToPointData[]
    for (const { report, combos, moves } of Object.values(groupedData)) {
      const date = report.game_id.date.split("T")[0]
      const comboCount = moves.filter((move: MoveApiData) => getIsDribble(move.code)).length // TODO: This should be removed?
      const points = report.points !== null ? report.points : getTotalPointsFromMoves(moves)
      chartData.push({ date, comboCount: combos.length || comboCount, points })
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
      .select(
        "initial_direction, counter_direction, last_dribble_type, move (code), combo (move (code)), report:report_id (player_id)",
      )
      .not("report", "is", null)
      .eq("report.player_id", id)

    if (!data) {
      return { error: "No data found" }
    }

    const moveCounts = groupMoves(data)
    const comboCounts = groupCombos(data)
      .filter((combo) => combo.count > 1)
      .sort((a, b) => b.count - a.count)
    const seuqenceInfoCounts = groupSequenceData(data)

    return { moveCounts, comboCounts, seuqenceInfoCounts, error }
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

  const isAdmin = await getIsAdmin()

  return (
    <div className="mx-auto flex w-full flex-col gap-6 px-4 py-10">
      <Link href="/" className="mx-auto mb-2 flex w-full max-w-7xl items-center gap-1">
        <ArrowLeftIcon /> Players List
      </Link>
      {playersResponse?.data && <PlayerDashboardToolbar players={playersResponse?.data} />}
      <InsightsButton id={id} canEdit={isAdmin} />
      <div>
        <SequencesGraphs dribbleCounts={dribbleCounts as SeuqenceGraphData} />
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
          {!!comboPointsResponse.data?.length && <PointsComboBarChart data={comboPointsResponse.data} />}
          {!!dribbleCounts.comboCounts?.length && <ComboTimesUsedChart data={dribbleCounts.comboCounts} />}
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
