import { idToUid, moveIdToValue } from "@/constants/misc"
import { MoveApiData, MoveSequence, Sequence } from "@/types"
import { getIsDribble } from "./get-is-dribble"
import { getLanes } from "./get-moves-data"
import {
  getIsInLeft3PointArea,
  getIsInRight3PointArea,
  getIsLeftInShortrangeArea,
  getIsRightInShortrangeArea,
} from "./get-moves-positions"

const getBteValue = (move: MoveSequence, hasDribbles: boolean): number => {
  const direction = move.x > 0 ? "right" : "left"

  const isIn3PointArea = direction === "right" ? getIsInRight3PointArea(move) : getIsInLeft3PointArea(move)
  if (!isIn3PointArea) return hasDribbles ? 20 : 3 // 3 point shot

  const isInShortrangeArea = direction === "right" ? getIsRightInShortrangeArea(move) : getIsLeftInShortrangeArea(move)
  if (!isInShortrangeArea) return hasDribbles ? 5 : 1 // midrange 2 point shot

  return hasDribbles ? 10 : 2 // layup (near the basket)
}

const getBteScore = (bteValue: number, moves: MoveSequence[]) => {
  const lastMove = moves[moves.length - 1]
  const isMadeShot = lastMove.moveId === 7
  if (!isMadeShot) return 0 // Missed shot -> view CourtDropdown.tsx options

  let dribblesCounted = 0
  const sumOfFirstThreeDribbles = moves.reduce((currentScore, move) => {
    if (dribblesCounted > 2) return currentScore
    if (!getIsDribble(move.moveId)) return currentScore
    dribblesCounted++
    return currentScore + moveIdToValue[move.moveId]
  }, 0)
  return sumOfFirstThreeDribbles * bteValue
}

export const getTotalPoints = (sequences: Sequence[]) => {
  return sequences.reduce((totalPoints, sequence) => {
    const lastMove = sequence.moves[sequence.moves.length - 1]
    const isMadeShot = lastMove.moveId === 7
    if (!isMadeShot) return totalPoints
    const direction = lastMove.x > 0 ? "right" : "left"
    const isIn3PointArea = direction === "right" ? getIsInRight3PointArea(lastMove) : getIsInLeft3PointArea(lastMove)

    return isIn3PointArea ? totalPoints + 3 : totalPoints + 2
  }, 0)
}

export const getTotalPointsFromMoves = (moves: MoveApiData[]) => {
  return moves.reduce((totalPoints, move) => {
    const isMadeShot = move.code === 7
    if (!isMadeShot) return totalPoints

    const direction = move.x > 0 ? "right" : "left"
    const isIn3PointArea = direction === "right" ? getIsInRight3PointArea(move) : getIsInLeft3PointArea(move)
    return isIn3PointArea ? totalPoints + 3 : totalPoints + 2
  }, 0)
}

const getBteCombo = (moves: MoveSequence[]) => {
  const bteComboArray = []

  for (const move of moves) {
    if (bteComboArray.length === 3) break
    if (!getIsDribble(move.moveId)) continue
    bteComboArray.push(idToUid[move.moveId])
  }

  return bteComboArray.join("")
}

export const getSequenceData = (sequences: Sequence[], addedReportId: number) => {
  return sequences.map((sequence) => {
    const { moves, ...rest } = sequence
    const fullCombo = moves.flatMap((move) => (getIsDribble(move.moveId) ? idToUid[move.moveId] : [])).join("")
    const bteCombo = getBteCombo(moves)

    const { leftLaneMoves, middleLaneMoves, rightLaneMoves } = getLanes(sequence)
    const lastMove = moves[moves.length - 1]
    const bteValue = getBteValue(lastMove, moves.length > 1)
    const bteScore = getBteScore(bteValue, moves)

    return {
      report_id: addedReportId,
      full_combo: fullCombo,
      bte_combo: bteCombo,
      lanes_left: leftLaneMoves.join(""),
      lanes_middle: middleLaneMoves.join(""),
      lanes_right: rightLaneMoves.join(""),
      bte_value: bteValue,
      bte_score: bteScore,
      ...rest,
    }
  })
}
