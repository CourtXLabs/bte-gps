import { ReportApiData } from "@/types"
import { getIsDribble } from "./get-is-dribble"
import { getLanes } from "./get-moves-data"
import { getBteScore, getBteValue, getTotalPointsFromMoves } from "./get-sequence-data"

// Helpers ///////////////////////////////
const getDribblesData = (data: ReportApiData) => {
  //   Percent of dribble type
  let totalDribbles = 0
  let dribbleTypes: Record<string, number> = {}

  for (const sequence of data.sequence) {
    for (const move of sequence.move) {
      if (getIsDribble(move.code)) {
        totalDribbles++
        if (!dribbleTypes[move.code]) {
          dribbleTypes[move.code] = 1
        } else {
          dribbleTypes[move.code]++
        }
      }
    }
  }

  return { totalDribbles, dribbleTypes }
}
/////////////////////////////////////////

export const getIndividualDribblePercent = (data: ReportApiData, dribbleCode: string) => {
  const { totalDribbles, dribbleTypes } = getDribblesData(data)
  if (!totalDribbles) return 0
  return ((dribbleTypes[dribbleCode] || 0) / totalDribbles) * 100
}

export const getLaneDribblePercent = (data: ReportApiData, lane: string) => {
  let totalMoves = 0
  let laneMoves = 0
  for (const sequence of data.sequence) {
    // @ts-ignore
    const { leftLaneMoves, middleLaneMoves, rightLaneMoves } = getLanes({ ...sequence, moves: sequence.move })
    totalMoves += leftLaneMoves.length + middleLaneMoves.length + rightLaneMoves.length
    if (lane === "left") {
      laneMoves += leftLaneMoves.length
    } else if (lane === "middle") {
      laneMoves += middleLaneMoves.length
    } else {
      laneMoves += rightLaneMoves.length
    }
  }
  return totalMoves ? (laneMoves / totalMoves) * 100 : 0
}

export const getPlayCodePercent = (data: ReportApiData, playCode: string) => {
  if (!data.sequence.length) return 0
  let playCodePossessions = 0
  for (const sequence of data.sequence) {
    if (sequence.play_code === playCode) {
      playCodePossessions++
    }
  }
  return (playCodePossessions / data.sequence.length) * 100
}

export const getShootingOffDribblesPercent = (data: ReportApiData, shootingOffDribble: string) => {
  if (!data.sequence.length) return 0
  let shootingOffDribblePossessions = 0
  for (const sequence of data.sequence) {
    if (sequence.type_of_shot === shootingOffDribble) {
      shootingOffDribblePossessions++
    }
  }
  return (shootingOffDribblePossessions / data.sequence.length) * 100
}

export const getShootingStationaryPercent = (data: ReportApiData, shootingStationary: string) => {
  if (!data.sequence.length) return 0
  let shootingStationaryPossessions = 0
  for (const sequence of data.sequence) {
    if (sequence.type_of_shot === shootingStationary) {
      shootingStationaryPossessions++
    }
  }
  return (shootingStationaryPossessions / data.sequence.length) * 100
}

export const getFrequency = (data: ReportApiData, frequency: string) => {
  if (!data.sequence.length) return 0
  let frequencyPossessions = 0
  const frequencyCount = Number(frequency)
  for (const sequence of data.sequence) {
    const dribbleCount = sequence.move.filter((move) => getIsDribble(move.code)).length
    if (dribbleCount === frequencyCount) {
      frequencyPossessions++
    }
  }
  return (frequencyPossessions / data.sequence.length) * 100
}

export const getComboToPointRatio = (data: ReportApiData) => {
  if (!data.sequence.length) return "-"
  let totalCombos = 0
  let totalPoints = 0
  for (const sequence of data.sequence) {
    const points = getTotalPointsFromMoves(sequence.move)
    totalPoints += points

    for (const move of sequence.move) {
      if (getIsDribble(move.code)) {
        totalCombos++
      }
    }
  }
  return `${totalCombos} | ${totalPoints}`
}

export const getInitialDirectionPercent = (data: ReportApiData, initialDirection: string) => {
  if (!data.sequence.length) return 0
  let initialDirectionPossessions = 0
  for (const sequence of data.sequence) {
    if (sequence.initial_direction === initialDirection) {
      initialDirectionPossessions++
    }
  }
  return (initialDirectionPossessions / data.sequence.length) * 100
}

export const getCounterDirectionPercent = (data: ReportApiData, counterDirection: string) => {
  if (!data.sequence.length) return 0
  let counterDirectionPossessions = 0
  for (const sequence of data.sequence) {
    if (sequence.counter_direction === counterDirection) {
      counterDirectionPossessions++
    }
  }
  return (counterDirectionPossessions / data.sequence.length) * 100
}

export const getLastHandPercent = (data: ReportApiData, lastHand: string) => {
  if (!data.sequence.length) return 0
  let lastHandPossessions = 0
  for (const sequence of data.sequence) {
    if (sequence.last_dribble_type === lastHand) {
      lastHandPossessions++
    }
  }
  return (lastHandPossessions / data.sequence.length) * 100
}

export const getEfficiencyScore = (data: ReportApiData) => {
  if (!data.sequence.length) return 0
  let attemptedShots = data.sequence.length
  let totalBteScore = 0

  for (const sequence of data.sequence) {
    const lastMove = sequence.move[sequence.move.length - 1]
    const bteValue = getBteValue(
      { ...lastMove, moveId: lastMove.code as unknown as any, uid: "" },
      sequence.move.length > 1,
    )
    const bteScore = getBteScore(
      bteValue,
      sequence.move.map((move) => ({ ...move, moveId: move.code as unknown as any, uid: "" })),
    )
    totalBteScore += bteScore
  }

  return totalBteScore / attemptedShots
}
