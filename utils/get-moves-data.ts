import { Sequence } from "@/types"
import { COURT_HEIGHT, COURT_HEIGHT_FEET, COURT_WIDTH, COURT_WIDTH_FEET } from "../constants/court"

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
  const lastMove = sequence.moves[sequence.moves.length - 1]
  const attackingHalf = lastMove.x > 0 ? "right" : "left"
  const halfCourtLength = COURT_HEIGHT_FEET / 2

  const getIsLeftLane = (y: number) => (attackingHalf === "left" ? y < -halfCourtLength / 3 : y > halfCourtLength / 3)
  const getIsMiddleLane = (y: number) => y >= -halfCourtLength / 3 && y <= halfCourtLength / 3
  const getIsRightLane = (y: number) => (attackingHalf === "left" ? y > halfCourtLength / 3 : y < -halfCourtLength / 3)

  const leftLaneMoves: number[] = []
  const middleLaneMoves: number[] = []
  const rightLaneMoves: number[] = []

  const moves = sequence.moves
  moves.slice(0, moves.length - 1).forEach(({ y, moveId }) => {
    if (getIsLeftLane(y)) {
      leftLaneMoves.push(moveId)
    } else if (getIsMiddleLane(y)) {
      middleLaneMoves.push(moveId)
    } else if (getIsRightLane(y)) {
      rightLaneMoves.push(moveId)
    }
  })
  return { leftLaneMoves, middleLaneMoves, rightLaneMoves }
}
//////////////////////////////////
