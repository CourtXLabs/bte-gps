import * as d3 from "d3"

/////////////////////////////

import { PERMANENT_MARKER_CLASS } from "@/constants"

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
