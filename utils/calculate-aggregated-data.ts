import { ReportApiData } from "@/types"
import {
  getEfficiencyScore,
  getFrequency,
  getIndividualDribblePercent,
  getInitialDirectionPercent,
  getLaneDribblePercent,
  getPlayCodePercent,
  getShootingOffDribblesPercent,
  getShootingStationaryPercent,
} from "./calculate-boxscore-data"
import { getTotalPointsFromMoves } from "./get-sequence-data"

export const getAggregatedIndividualDribblePercent = (data: ReportApiData[], dribbleCode: string) => {
  let total = 0
  for (const report of data) {
    total += getIndividualDribblePercent(report, dribbleCode)
  }
  return total / data.length
}

export const getAggregatedLaneDribblePercent = (data: ReportApiData[], lane: string) => {
  let total = 0
  for (const report of data) {
    total += getLaneDribblePercent(report, lane)
  }
  return total / data.length
}

export const getAggregatedPlayCodePercent = (data: ReportApiData[], playCode: string) => {
  let total = 0
  for (const report of data) {
    total += getPlayCodePercent(report, playCode)
  }
  return total / data.length
}

export const getAggregatedShootingOffDribblePercent = (data: ReportApiData[], shootingOffDribble: string) => {
  let total = 0
  for (const report of data) {
    total += getShootingOffDribblesPercent(report, shootingOffDribble)
  }
  return total / data.length
}

export const getAggregatedShootingOffStationaryPercent = (data: ReportApiData[], shootingOffStationary: string) => {
  let total = 0
  for (const report of data) {
    total += getShootingStationaryPercent(report, shootingOffStationary)
  }
  return total / data.length
}

export const getAggregatedFrequencyPercent = (data: ReportApiData[], frequency: string) => {
  let total = 0
  for (const report of data) {
    total += getFrequency(report, frequency)
  }
  return total / data.length
}

export const getAggregatedComboToPointRatio = (data: ReportApiData[]) => {
  let totalCombos = 0
  let totalPoints = 0

  for (const report of data) {
    if (!report.sequence.length) return "-"
    let gameCombos = 0
    let gamePoints = 0
    const pointsFromDb = report.points
    if (typeof pointsFromDb === "number") {
      gamePoints = pointsFromDb
    }

    for (const sequence of report.sequence) {
      if (typeof pointsFromDb !== "number") {
        const points = getTotalPointsFromMoves(sequence.move)
        gamePoints += points
      }

      gameCombos += sequence.combo?.length || 0
    }

    totalCombos += gameCombos
    totalPoints += gamePoints
  }

  return `${totalCombos} | ${totalPoints}`
}

export const getAggregatedIntialDirectionPercent = (data: ReportApiData[], initialDirection: string) => {
  let total = 0
  for (const report of data) {
    total += getInitialDirectionPercent(report, initialDirection)
  }
  return total / data.length
}

export const getAggregatedCounterDirectionPercent = (data: ReportApiData[], counterDirection: string) => {
  let total = 0
  for (const report of data) {
    total += getInitialDirectionPercent(report, counterDirection)
  }
  return total / data.length
}

export const getAggregatedLastHandPercent = (data: ReportApiData[], lastHand: string) => {
  let total = 0
  for (const report of data) {
    total += getInitialDirectionPercent(report, lastHand)
  }
  return total / data.length
}

export const getAggregatedEfficiencyScore = (data: ReportApiData[]) => {
  let total = 0
  for (const report of data) {
    total += getEfficiencyScore(report)
  }
  return total / data.length
}
