import { idToUid, moveUids } from "@/constants/misc"
import { MoveApiData, Sequence } from "@/types"
import { COURT_HEIGHT, COURT_HEIGHT_FEET, COURT_WIDTH, COURT_WIDTH_FEET } from "../constants/court"
import { getIsDribble } from "./get-is-dribble"

//////////////////////////////////
interface ConvertCoordiantesInput {
  x: number
  y: number
  pixelWidth?: number
  pixelHeight?: number
  courtWidth?: number
  courtHeight?: number
}
export const convertPixelsToCoordinates = ({
  x,
  y,
  pixelWidth = COURT_WIDTH,
  pixelHeight = COURT_HEIGHT,
  courtWidth = COURT_WIDTH_FEET,
  courtHeight = COURT_HEIGHT_FEET,
}: ConvertCoordiantesInput) => {
  // Center of the court is 0, 0
  const xRatio = pixelWidth / courtWidth
  const yRatio = pixelHeight / courtHeight
  const xInFeet = x / xRatio
  const yInFeet = y / yRatio
  const courtX = xInFeet - courtWidth / 2
  const courtY = -(yInFeet - courtHeight / 2) // Invert the y-axis
  return { x: Number(courtX.toFixed(2)), y: Number(courtY.toFixed(2)) }
}

export const convertCoordinatesToPixels = ({
  x,
  y,
  pixelWidth = COURT_WIDTH,
  pixelHeight = COURT_HEIGHT,
  courtWidth = COURT_WIDTH_FEET,
  courtHeight = COURT_HEIGHT_FEET,
}: ConvertCoordiantesInput) => {
  const xRatio = pixelWidth / courtWidth
  const yRatio = pixelHeight / courtHeight
  const xInPixels = (x + courtWidth / 2) * xRatio
  const yInPixels = -(y - courtHeight / 2) * yRatio // Invert the y-axis
  return { x: xInPixels, y: yInPixels }
}

export const getLanes = (sequence: Sequence) => {
  if (!sequence.moves?.length) return { leftLaneMoves: [], middleLaneMoves: [], rightLaneMoves: [] }
  const lastMove = sequence.moves[sequence.moves.length - 1]
  const attackingHalf = lastMove.x > 0 ? "right" : "left"
  const halfCourtLength = COURT_HEIGHT_FEET / 2

  const getIsLeftLane = (y: number) => (attackingHalf === "left" ? y < -halfCourtLength / 3 : y > halfCourtLength / 3)
  const getIsMiddleLane = (y: number) => y >= -halfCourtLength / 3 && y <= halfCourtLength / 3
  const getIsRightLane = (y: number) => (attackingHalf === "left" ? y > halfCourtLength / 3 : y < -halfCourtLength / 3)

  const leftLaneMoves: moveUids[] = []
  const middleLaneMoves: moveUids[] = []
  const rightLaneMoves: moveUids[] = []

  const moves = sequence.moves
  moves.forEach(({ y, moveId }) => {
    if (!getIsDribble(moveId)) return
    if (getIsLeftLane(y)) {
      leftLaneMoves.push(idToUid[moveId])
    } else if (getIsMiddleLane(y)) {
      middleLaneMoves.push(idToUid[moveId])
    } else if (getIsRightLane(y)) {
      rightLaneMoves.push(idToUid[moveId])
    }
  })
  return { leftLaneMoves, middleLaneMoves, rightLaneMoves }
}

export const getFirstThreeDribbles = (moves: MoveApiData[]) => {
  const dribbles = []

  for (const move of moves) {
    if (getIsDribble(move.code)) {
      dribbles.push(move.code)
    }
    if (dribbles.length === 3) {
      break
    }
  }

  return dribbles
}
//////////////////////////////////
