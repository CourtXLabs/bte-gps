import * as d3 from "d3"

import { COURT_HEIGHT, COURT_WIDTH } from "@/constants/court"
import { MoveSequence, Sequence } from "@/types"
import { drawLineBetweenMarkers, drawPermanentMarker } from "./draw-move-marker"
import { convertCoordinatesToPixels } from "./get-moves-data"
import { generateRandomString } from "./misc"

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
      acc[sequence.period].push(sequence.moves!)
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
    .attr("width", COURT_WIDTH)
    .attr("height", COURT_HEIGHT)
    .attr("class", "background-image")
  periodMoves.forEach((moveSequence) => {
    moveSequence.forEach((move, index) => {
      const { x, y, uid, color, shape } = move
      const { x: currentMovePixelsX, y: currentMovePixelsY } = convertCoordinatesToPixels({ x, y })
      if (index > 0) {
        const fromCoords = moveSequence[index - 1]
        const { x: fromCoordsPixelsX, y: fromCoordsPixelsY } = convertCoordinatesToPixels(fromCoords)
        drawLineBetweenMarkers({
          svgElement: tempSvgElement,
          fromCoords: { x: fromCoordsPixelsX, y: fromCoordsPixelsY },
          toCoords: { x: currentMovePixelsX, y: currentMovePixelsY },
          uid: generateRandomString(),
        })
        drawPermanentMarker({ svgElement: tempSvgElement, ...fromCoords, x: fromCoordsPixelsX, y: fromCoordsPixelsY })
      }
      drawPermanentMarker({
        svgElement: tempSvgElement,
        uid,
        color,
        shape,
        x: currentMovePixelsX,
        y: currentMovePixelsY,
      })
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
  tempSvgElement.setAttribute("width", `${COURT_WIDTH}`)
  tempSvgElement.setAttribute("height", `${COURT_HEIGHT}`)
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
