import * as d3 from "d3"
import { COURT_HEIGHT, COURT_HEIGHT_FEET, COURT_WIDTH, COURT_WIDTH_FEET, PERMANENT_MARKER_CLASS } from "./constants"
import { Coordinates, GameSaveData, MoveSequence, PlayerInfo, Sequence } from "./types"

export const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(2)
}

/////////////////////////////

export const drawPermanentMarker = ({
  svgElement,
  x,
  y,
  uid,
  color,
}: {
  svgElement: SVGSVGElement | null
  x: number
  y: number
  color?: string
  uid: string
}) => {
  const svg = d3.select(svgElement)
  return svg
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 6)
    .attr("fill", color || "transparent")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("id", `marker-${uid}`)
    .attr("class", PERMANENT_MARKER_CLASS)
}

export const drawLineBetweenMarkers = ({
  svgElement,
  fromCoords,
  toCoords,
  uid,
}: {
  svgElement: SVGSVGElement | null
  fromCoords: { x: number; y: number }
  toCoords: { x: number; y: number }
  uid: string
}) => {
  const svg = d3.select(svgElement)
  if (fromCoords && toCoords) {
    svg
      .append("line")
      .attr("id", `line-${uid}`)
      .attr("x1", fromCoords.x)
      .attr("y1", fromCoords.y)
      .attr("x2", toCoords.x)
      .attr("y2", toCoords.y)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("class", PERMANENT_MARKER_CLASS)
  }
}

/////////////////////////////

function base64ToBlob(base64: string, contentType: string) {
  const byteCharacters = atob(base64.split(",")[1])
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  return new Blob(byteArrays, { type: contentType })
}

const getMovesByPeriods = (sequences: Sequence[]) => {
  // Group by period
  const movesByPeriods = sequences.reduce(
    (acc, sequence) => {
      if (!acc[sequence.period]) {
        acc[sequence.period] = []
      }
      acc[sequence.period].push(sequence.moves)
      return acc
    },
    {} as Record<number, MoveSequence[][]>,
  )
  return movesByPeriods
}

const drawPeriodMovesToCanvas = (tempSvgElement: SVGSVGElement, periodMoves: MoveSequence[][]) => {
  const svg = d3.select(tempSvgElement)
  svg
    .append("image")
    .attr("href", "court.webp")
    .attr("width", 850)
    .attr("height", 458)
    .attr("class", "background-image")
  periodMoves.forEach((moveSequence) => {
    moveSequence.forEach((move, index) => {
      const { x, y, uid, color } = move
      if (index > 0) {
        const fromCoords = moveSequence[index - 1]
        const toCoords = moveSequence[index]
        drawLineBetweenMarkers({
          svgElement: tempSvgElement,
          fromCoords,
          toCoords,
          uid: generateRandomString(),
        })
        drawPermanentMarker({ svgElement: tempSvgElement, ...fromCoords })
      }
      drawPermanentMarker({ svgElement: tempSvgElement, x, y, uid, color })
    })
  })
}

const convertSvgToImage = async (svgElement: SVGSVGElement): Promise<string> => {
  const getSvgString = async (svgElement: SVGSVGElement) => {
    await convertImagesToDataUrls(svgElement) // Ensure images are converted before serializing
    const svgString = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    })
    const DOMURL = window.URL || window.webkitURL || window
    const url = DOMURL.createObjectURL(svgBlob)
    return url
  }

  async function fetchImageAsDataUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      var img = new Image()
      img.crossOrigin = "anonymous" // Handle CORS
      img.onload = function () {
        let canvas = document.createElement("canvas")
        canvas.width = img.naturalWidth // Correctly refer to img
        canvas.height = img.naturalHeight
        let ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0) // Use img here
        resolve(canvas.toDataURL("image/webp"))
      }
      img.onerror = function () {
        reject(new Error(`Failed to load image at ${url}`))
      }
      img.src = url
    })
  }

  async function convertImagesToDataUrls(svgElement: SVGSVGElement) {
    const images = svgElement.querySelectorAll("image")
    for (let img of Array.from(images)) {
      const href = img.getAttribute("xlink:href") || img.getAttribute("href")
      if (!href) continue
      const dataUrl = await fetchImageAsDataUrl(href)
      if (typeof dataUrl !== "string") continue
      img.setAttribute("href", dataUrl)
      img.setAttribute("xlink:href", dataUrl) // Also update xlink:href for compatibility
    }
  }

  const img = new Image()
  img.src = await getSvgString(svgElement) // Make sure to await the conversion

  return new Promise<string>((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = svgElement.width.baseVal.value
      canvas.height = svgElement.height.baseVal.value
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(img, 0, 0)
      return resolve(canvas.toDataURL("image/webp", 1))
    }
    img.onerror = (error) => {
      reject(new Error("Failed to load the SVG image."))
    }
  })
}

export const constructSequencesSvg = async (sequences: Sequence[]) => {
  const movesByPeriods = getMovesByPeriods(sequences)
  const tempSvgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  tempSvgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
  tempSvgElement.setAttribute("width", "850")
  tempSvgElement.setAttribute("height", "458")
  tempSvgElement.style.display = "none"
  document.body.appendChild(tempSvgElement)

  const imageData = [] as Blob[]

  for (const periodMoves of Object.values(movesByPeriods)) {
    drawPeriodMovesToCanvas(tempSvgElement, periodMoves)
    const imageBase64 = await convertSvgToImage(tempSvgElement)
    const imageBlob = base64ToBlob(imageBase64, "image/webp")
    imageData.push(imageBlob)
    tempSvgElement.innerHTML = ""
    const temp = (tempSvgElement as unknown as HTMLElement).offsetHeight // force reflow
  }

  return imageData
}

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
  return { x: courtX, y: courtY }
}

export const convertAllMoves = (sequences: Sequence[]) => {
  return sequences.map((sequence) => {
    const moves = sequence.moves.map((move) => {
      const { x, y } = convertPixelsToCoordinates({ x: move.x, y: move.y })
      return { ...move, x, y }
    })
    return { ...sequence, moves }
  })
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

interface Rectangle {
  topLeft: Coordinates
  bottomRight: Coordinates
}

interface Circle {
  center: Coordinates
  radius: number
}

interface Line {
  start: Coordinates
  end: Coordinates
}

interface CircleSegment {
  circle: Circle
  top: Coordinates
  bottom: Coordinates
}

const getIsInRectangle = ({ point, rectangle }: { point: Coordinates; rectangle: Rectangle }): boolean => {
  // Assuming lines are parallel to the axes
  const { topLeft, bottomRight } = rectangle
  return point.x >= topLeft.x && point.x <= bottomRight.x && point.y >= bottomRight.y && point.y <= topLeft.y
}

const getIsInCircle = ({ point, circle }: { point: Coordinates; circle: Circle }): boolean => {
  const { center, radius } = circle
  const dx = point.x - center.x
  const dy = point.y - center.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance <= radius
}

const getIsOnOppositeSideOfLine = ({
  pointA,
  pointB,
  line,
}: {
  pointA: Coordinates
  pointB: Coordinates
  line: Line
}): boolean => {
  const { start, end } = line
  const x1 = start.x
  const y1 = start.y
  const x2 = end.x
  const y2 = end.y

  // Compute expressions for each point relative to the line
  const expressionA = (y1 - y2) * (pointA.x - x1) + (x2 - x1) * (pointA.y - y1)
  const expressionB = (y1 - y2) * (pointB.x - x1) + (x2 - x1) * (pointB.y - y1)

  const isOnOppositeSides = expressionA * expressionB < 0

  return isOnOppositeSides
}

const getIsInCircleSegment = ({
  point,
  circleSegment,
}: {
  point: Coordinates
  circleSegment: CircleSegment
}): boolean => {
  const { circle, top, bottom } = circleSegment
  const isInCircle = getIsInCircle({ point, circle })
  const isOppositeOfSegmentLine = getIsOnOppositeSideOfLine({
    pointA: point,
    pointB: circle.center,
    line: { start: top, end: bottom },
  })
  return isInCircle && isOppositeOfSegmentLine
}

const getIsInRight3PointArea = (point: Coordinates): boolean => {
  const bottomRightCorner = { x: 47, y: -22 } // 47, -25 + 3
  const topLeftCorner = { x: 33, y: 22 } // 47 - 14, 25 - 3
  const bottomLeftCorner = { x: 33, y: -22 } // 47 - 14, -25 + 3
  const circleCenter = { x: 41.75, y: 0 } // 47 - 5.25, 0
  const radius = 23.75

  const rectangle: Rectangle = { topLeft: topLeftCorner, bottomRight: bottomRightCorner }
  const circleSegment: CircleSegment = {
    circle: { center: circleCenter, radius },
    top: topLeftCorner,
    bottom: bottomLeftCorner,
  }

  return getIsInRectangle({ point, rectangle }) || getIsInCircleSegment({ point, circleSegment })
}

const getIsInLeft3PointArea = (point: Coordinates): boolean => {
  const bottomRightCorner = { x: -33, y: -22 } // -47 + 14, -25 + 3
  const topLeftCorner = { x: -47, y: 22 } // -47, 25 - 3
  const topRightCorner = { x: -33, y: 22 } // -47 + 14, 25 - 3
  const circleCenter = { x: -41.75, y: 0 } // -47 + 5.25, 0
  const radius = 23.75

  const rectangle: Rectangle = { topLeft: topLeftCorner, bottomRight: bottomRightCorner }
  const circleSegment: CircleSegment = {
    circle: { center: circleCenter, radius },
    top: topRightCorner,
    bottom: bottomRightCorner,
  }

  return getIsInRectangle({ point, rectangle }) || getIsInCircleSegment({ point, circleSegment })
}

const getIsRightInShortrangeArea = (point: Coordinates): boolean => {
  const bottomRightCorner = { x: 47, y: -8 } // 47, -16 / 2
  const topLeftCorner = { x: 28, y: 8 } // 47 - 19, 16 / 2
  const circleCenter = { x: 28, y: 0 } // 47 - 19, 0
  const radius = 6

  const rectangle: Rectangle = { topLeft: topLeftCorner, bottomRight: bottomRightCorner }
  const circle: Circle = { center: circleCenter, radius }

  return getIsInRectangle({ point, rectangle }) && !getIsInCircle({ point, circle })
}

const getIsLeftInShortrangeArea = (point: Coordinates): boolean => {
  const bottomRightCorner = { x: -28, y: -8 } // -47 + 19, -16 / 2
  const topLeftCorner = { x: -47, y: 8 } // -47, 16 / 2
  const circleCenter = { x: -28, y: 0 } // -47 + 19, 0
  const radius = 6

  const rectangle: Rectangle = { topLeft: topLeftCorner, bottomRight: bottomRightCorner }
  const circle: Circle = { center: circleCenter, radius }

  return getIsInRectangle({ point, rectangle }) && !getIsInCircle({ point, circle })
}

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

/////////////////////////////////
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

const getCsvData = (sequences: any[], playerInfo: PlayerInfo) => {
  if (sequences.length === 0) {
    return ""
  }

  // This assumes all objects have the same structure
  const columns = [
    "possessions",
    "play_code",
    "initial_direction",
    "counter_direction",
    "moves",
    "last_dribble_type",
    "lanes_left",
    "lanes_middle",
    "lanes_right",
    "pick_and_roll",
    "defender_pick_and_roll",
    "ball_handler_pick_and_roll",
    "type_of_shot",
    "full_combo",
    "bte_combo",
    "bte_value",
    "bte_score",
  ]

  const columnHeaders = [
    "Player Name",
    "Points",
    "Game",
    "Date",
    "Possessions",
    "Play Code",
    "Initial Direction",
    "Counter Direction",
    "Moves",
    "Last Dribble Type",
    "Lanes Left",
    "Lanes Middle",
    "Lanes Right",
    "Pick & Roll",
    "Defender Pick & Roll",
    "Ball Handler Pick & Roll",
    "Type of Shot",
    "Full Combo",
    "BTE Combo",
    "BTE Value",
    "BTE Score",
  ]

  const rows = sequences.map((sequence, index) => {
    // For the first row, include playerInfo values, for others include empty strings
    const prefix =
      index === 0 ? [playerInfo.name, playerInfo.points, playerInfo.game, playerInfo.date] : ["", "", "", ""]

    const sequenceValues = columns.map((header) => {
      const value = sequence[header]
      if (header === "possessions") {
        return `P${index + 1}`
      }
      if (header === "moves") {
        return value.map((move: MoveSequence) => `${move.x.toFixed(2)} ${move.y.toFixed(2)}`).join(" | ")
      }
      return value || ""
    })

    return [...prefix, ...sequenceValues].join(",")
  })

  return [columnHeaders.join(","), ...rows].join("\n")
}

export const downloadCsv = (dataToSave: GameSaveData) => {
  const { sequences, name, playerInfo } = dataToSave
  const csvData = getCsvData(sequences, playerInfo)
  const blob = new Blob([csvData], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${name}.csv`
  a.click()
}
