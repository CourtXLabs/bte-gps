import { MoveIds, idToUid, moveUids } from "@/constants/misc"
import { DEFAULT_GAMES_COUNT, DEFAULT_SEASON } from "@/global-constants"
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
  gameLimitOptions,
} from "@/types"
import { getIsDribble } from "@/utils/get-is-dribble"
import { getTotalPointsFromMoves } from "@/utils/get-sequence-data"
import { ArrowLeftIcon } from "lucide-react"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import BteCardsSection from "./BteCardsSection"
import MediaSection from "./MediaSection"
import PlayerDashboardToolbar from "./PlayerDashboardToolbar"
import PlayerGamesFilter from "./PlayerGamesFilter"
import ReportsList from "./ReportsList"
import SequencesGraphs from "./charts/SequencesGraphs"
import InsightsButton from "./insights/InsightsButton"

const gamesCountOptionsLimit = {
  all: 99999999999999,
  "5": 5,
  "10": 10,
  away: 99999999999999,
  home: 99999999999999,
} as Record<gameLimitOptions, number>

function groupByReportId(data: Record<string, any>[]) {
  const grouped = data.reduce((acc: any, report: any) => {
    const reportId = report.id
    if (!reportId) return acc

    acc[reportId] = {
      report: {
        id: report.id,
        player_id: report.player_id,
        points: report.points,
        game: report.game_id,
      },
      moves: [],
      combos: [],
    }

    if (report.sequence && Array.isArray(report.sequence)) {
      report.sequence.forEach((seq: any) => {
        if (seq.move) acc[reportId].moves.push(seq.move)
        if (seq.combo) acc[reportId].combos.push(seq.combo)
      })
    }

    return acc
  }, {})

  return grouped
}

const groupMoves = (data: DribbleChartApiData[]) => {
  const moveCounts = data.reduce(
    (acc: Record<string, Record<string, number>>, report) => {
      report.sequence.forEach((seq) => {
        const moves = seq.move
        if (!moves.length) return

        const isMadeShot = moves[moves.length - 1].code === 8
        const objectToChange = acc[isMadeShot ? "madeShots" : "missedShots"]

        moves.forEach((move: { code: MoveIds }) => {
          const code = idToUid[move.code] as moveUids
          if (!code) return
          if (!getIsDribble(code)) return

          objectToChange[code] = (objectToChange[code] || 0) + 1
        })
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

  for (const report of data) {
    report.sequence.forEach((seq) => {
      seq.combo.forEach((comboMoves) => {
        const comboCode = comboMoves.move.flatMap((move) => (getIsDribble(move.code) ? move.code : [])).join("")
        if (!comboCode) return
        const comboIndex = comboCounts.findIndex((comboCount) => comboCount.sequence === comboCode)

        if (comboIndex === -1) {
          comboCounts.push({ sequence: comboCode, count: 1 })
        } else {
          comboCounts[comboIndex].count += 1
        }
      })
    })
  }

  return comboCounts
}

const groupSequenceData = (data: DribbleChartApiData[]) => {
  const initialDirectionCounts = { madeShots: {}, missedShots: {} } as Record<string, Record<string, number>>
  const counterDirectionCounts = { madeShots: {}, missedShots: {} } as Record<string, Record<string, number>>
  const lastDribbleTypeCounts = { madeShots: {}, missedShots: {} } as Record<string, Record<string, number>>

  for (const report of data) {
    report.sequence.forEach((seq) => {
      const { initial_direction, counter_direction, last_dribble_type, move } = seq
      if (!move.length) return
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
    })
  }
  return { initialDirectionCounts, counterDirectionCounts, lastDribbleTypeCounts }
}

const getPlayerInfo = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase.from("player").select("*").eq("id", id).single()
    return { data: data as SimlePlayerData, error }
  } catch (error: any) {
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
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

const getReports = async (id: string, games: gameLimitOptions, season: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    let minDate: string | null = null
    let maxDate: string | null = null

    if (season) {
      const [startYear] = season.split("-").map(Number)
      if (!isNaN(startYear)) {
        minDate = `${startYear}-08-29`
        maxDate = `${startYear + 1}-08-28`
      }
    }

    const { data, error } = await supabase
      .rpc("get_player_reports", {
        player_id_param: id,
        ...(["away", "home"].includes(games) ? { games_limiter: games } : {}),
        ...(minDate && maxDate ? { min_date: minDate, max_date: maxDate } : {}),
      })
      .limit(gamesCountOptionsLimit[games])

    const sortedData = data?.sort(
      // @ts-ignore
      (a, b) => new Date(b.game_id.date).getTime() - new Date(a.game_id.date).getTime(),
    ) as unknown as ReportApiData[]

    return {
      data: sortedData,
      error,
    }
  } catch (error: any) {
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
}

const getComboPointsRatio = async (id: string, games: gameLimitOptions, season: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    let minDate: string | null = null
    let maxDate: string | null = null

    if (season) {
      const [startYear] = season.split("-").map(Number)
      if (!isNaN(startYear)) {
        minDate = `${startYear}-08-29`
        maxDate = `${startYear + 1}-08-28`
      }
    }

    const { data, error } = await supabase
      .rpc("get_player_reports", {
        player_id_param: id,
        ...(["away", "home"].includes(games) ? { games_limiter: games } : {}),
        ...(minDate ? { min_date: minDate } : {}),
        ...(maxDate ? { max_date: maxDate } : {}),
      })
      .limit(gamesCountOptionsLimit[games])

    if (!data) {
      return { error: "No data found" }
    }

    const groupedData: Record<string, { report: any; moves: any; combos: any }> = groupByReportId(data)

    const chartData = [] as ComboToPointData[]
    for (const { report, combos, moves } of Object.values(groupedData)) {
      const date = report.game.date.split("T")[0]
      const comboCount = moves.filter((move: MoveApiData) => getIsDribble(move.code)).length // TODO: This should be removed?
      const points = report.points !== null ? report.points : getTotalPointsFromMoves(moves)
      chartData.push({ date, comboCount: combos ? combos.length : comboCount, points })
    }

    return { data: chartData.sort((a, b) => a.date.localeCompare(b.date)), error }
  } catch (error: any) {
    return { error: typeof error === "string" ? error : error.message || "An error occurred" }
  }
}

const getDribblesCounts = async (id: string, games: gameLimitOptions, season: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    let minDate: string | null = null
    let maxDate: string | null = null

    if (season) {
      const [startYear] = season.split("-").map(Number)
      if (!isNaN(startYear)) {
        minDate = `${startYear}-08-29`
        maxDate = `${startYear + 1}-08-28`
      }
    }

    const { data, error } = await supabase
      .rpc("get_player_report_dribbles", {
        p_player_id: id,
        ...(["away", "home"].includes(games) ? { team_type: games } : {}),
        ...(minDate ? { min_date: minDate } : {}),
        ...(maxDate ? { max_date: maxDate } : {}),
      })
      .limit(gamesCountOptionsLimit[games])

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

const getSeasons = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.rpc("get_player_seasons", { player_id_input: id })

  if (!data || error) {
    return { error: "No data found" }
  }

  return data
}

interface Props {
  id: string
  searchParams: { games: gameLimitOptions; season: string }
}

export default async function PlayerDetailsView({ id, searchParams }: Props) {
  let { games: gamesParam, season: seasonParam } = searchParams
  const games = gamesParam || DEFAULT_GAMES_COUNT
  const season = seasonParam || DEFAULT_SEASON

  const [playerInfoResponse, playersResponse, reportsResponse, comboPointsResponse, dribbleCounts, seasons] =
    await Promise.all([
      getPlayerInfo(id),
      getAllPlayers(),
      getReports(id, games, season),
      getComboPointsRatio(id, games, season),
      getDribblesCounts(id, games, season),
      getSeasons(id),
    ])

  const isAdmin = await getIsAdmin()

  return (
    <div className="mx-auto flex w-full flex-col gap-10 px-4 py-12">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col flex-wrap items-center justify-center gap-6 xl:flex-row xl:items-start">
        <div className="w-full space-y-8 lg:w-max">
          <Link
            href="/players"
            className="mb-2 flex w-max max-w-screen-2xl items-center gap-3 text-lg hover:text-accent-foreground"
          >
            <ArrowLeftIcon /> Players List
          </Link>
          <h1 className="text-3xl font-bold">
            Here are the stats for <span className="text-primary">{playerInfoResponse?.data?.name}</span>
          </h1>
          <BteCardsSection />
        </div>
        <Image
          className="xl:-mt-10"
          priority
          src="/example-player-image.png"
          alt="Lebron James Photo"
          width={436}
          height={360}
        />
      </div>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-start gap-10">
        <MediaSection />
        <div className="-mb-3 mt-5 flex w-full flex-col items-end gap-4 md:w-auto md:flex-row md:self-center">
          {playersResponse?.data && <PlayerDashboardToolbar players={playersResponse?.data} isAdmin={isAdmin} />}
          <PlayerGamesFilter seasons={seasons} />
        </div>
        <SequencesGraphs
          dribbleCounts={dribbleCounts as SeuqenceGraphData}
          comboPointsResponse={comboPointsResponse?.data || []}
        >
          <InsightsButton id={id} canEdit={isAdmin} />
        </SequencesGraphs>
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
