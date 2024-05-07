import { PERMANENT_MARKER_CLASS, TEMPORARY_SELECTION_MARKER_CLASS } from "@/constants/court"
import * as d3 from "d3"

const drawCircle = ({
  svg,
  x,
  y,
  uid,
  radius = 6,
  fill = "transparent",
  stroke = "black",
  strokeWidth = 2,
}: {
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>
  x: number
  y: number
  uid: string
  radius?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
}) => {
  return svg
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("fill", fill)
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("id", `marker-${uid}`)
    .attr("class", PERMANENT_MARKER_CLASS)
}

const drawSquare = ({
  svg,
  x,
  y,
  uid,
  size = 12,
  fill = "transparent",
  stroke = "black",
  strokeWidth = 2,
}: {
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>
  x: number
  y: number
  uid: string
  size?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
}) => {
  return svg
    .append("rect")
    .attr("x", x - size / 2) // Adjust x to center the square based on its size
    .attr("y", y - size / 2) // Adjust y to center the square based on its size
    .attr("width", size)
    .attr("height", size)
    .attr("fill", fill)
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("id", `marker-${uid}`)
    .attr("class", PERMANENT_MARKER_CLASS)
}

export const setUpCanvas = (svgElement: SVGSVGElement) => {
  const svg = d3.select(svgElement)
  svg.attr("width", 850).attr("height", 458)

  svg
    .append("image")
    .attr("href", "court.webp")
    .attr("width", 850)
    .attr("height", 458)
    .attr("class", "background-image")
}

export const drawPermanentMarker = ({
  svgElement,
  x,
  y,
  uid,
  color,
  shape = "circle",
}: {
  svgElement: SVGSVGElement | null
  x: number
  y: number
  color?: string
  uid: string
  shape?: "circle" | "square"
}) => {
  const svg = d3.select(svgElement)
  if (shape === "circle") {
    drawCircle({ svg, x, y, uid, fill: color || "transparent" })
  }
  if (shape === "square") {
    drawSquare({ svg, x, y, uid, fill: color || "transparent" })
  }
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

export const drawTempMarker = ({ x, y, svgElement }: { x: number; y: number; svgElement: SVGSVGElement }) => {
  removeMarker({ svgElement, selector: `.${TEMPORARY_SELECTION_MARKER_CLASS}` })

  const svg = d3.select(svgElement)
  const lineLength = 10
  const markerGroup = svg.append("g").attr("class", TEMPORARY_SELECTION_MARKER_CLASS)

  markerGroup
    .append("line")
    .attr("x1", x - lineLength)
    .attr("y1", y - lineLength)
    .attr("x2", x + lineLength)
    .attr("y2", y + lineLength)
    .attr("stroke", "black")
    .attr("stroke-width", 2)

  markerGroup
    .append("line")
    .attr("x1", x + lineLength)
    .attr("y1", y - lineLength)
    .attr("x2", x - lineLength)
    .attr("y2", y + lineLength)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
}

export const removeMarker = ({ svgElement, selector }: { svgElement: SVGSVGElement; selector: string }) => {
  d3.select(svgElement).selectAll(selector)?.remove()
}

/////////////////////////////
