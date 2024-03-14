import { MoveSequence, Sequence } from "@/types"
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
  const sumOfFirstThreeDribbles = moves.slice(0, moves.length - 1).reduce((currentScore, move, index) => {
    if (index > 2 || index) return currentScore
    return currentScore + move.moveId
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

export const getSequenceData = (sequences: Sequence[], addedReportId: number) => {
  return sequences.map((sequence) => {
    const { moves, ...rest } = sequence
    const fullCombo = moves
      .slice(0, moves.length - 1) // because the last move is the shot, which is not part of the dribble combo
      .map((move) => move.moveId)
      .join("")
    const bteCombo = moves
      .slice(0, Math.min(3, moves.length - 1))
      .map((move) => move.moveId)
      .join("")

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
