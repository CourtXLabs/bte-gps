"use client"

import useBteStore from "@/stores/bteDataStore"
import { Coordinates, Option } from "@/types"
import * as d3 from "d3"
import { useEffect, useRef, useState } from "react"
import CourtDropdown from "./CourtDropdown"

const CourtCanvas = () => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [markerCoordinates, setMarkerCoordinates] = useState({ x: 0, y: 0 })
  const { activeSequence, addMoveToActiveSequence } = useBteStore()

  const removeMarker = () => {
    d3.select(svgRef.current).selectAll(".marker-group")?.remove()
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
    removeMarker()
  }

  const drawPermanentMarker = ({ x, y, color }: { x: number; y: number; color?: string }) => {
    const svg = d3.select(svgRef.current)
    svg
      .append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 6)
      .attr("fill", color || "red")
  }

  const drawLineBetweenMarkers = (fromCoords: Coordinates, toCoords: Coordinates) => {
    const svg = d3.select(svgRef.current)
    if (fromCoords && toCoords) {
      svg
        .append("line")
        .attr("x1", fromCoords.x)
        .attr("y1", fromCoords.y)
        .attr("x2", toCoords.x)
        .attr("y2", toCoords.y)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
    }
  }

  const onSubmit = (option: Option) => {
    addMoveToActiveSequence({ ...markerCoordinates, id: option.id, color: option.color })

    const lastMove = activeSequence[activeSequence.length - 1]
    if (lastMove) {
      drawLineBetweenMarkers(lastMove, markerCoordinates)
      drawPermanentMarker(lastMove) // needs to be redrawn so that the marker stays on top of the line
    }

    drawPermanentMarker({ ...markerCoordinates, color: option.color })
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.attr("width", 850).attr("height", 458)

    svg
      .append("image")
      .attr("href", "court.webp")
      .attr("width", 850)
      .attr("height", 458)
      .attr("class", "background-image")

    const drawMarker = (x: number, y: number) => {
      removeMarker()

      const lineLength = 10

      const markerGroup = svg.append("g").attr("class", "marker-group")

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

    const handleSvgClick = (event: MouseEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setDropdownOpen(true)
      setMarkerCoordinates({ x, y })
      drawMarker(x, y)
    }

    svg.on("click", handleSvgClick)

    return () => {
      svg.on("click", null)
    }
  }, [])

  const dropdownCoordinates = { x: markerCoordinates.x, y: (markerCoordinates.y || 0) + 20 }

  return (
    <div className="relative w-max">
      <svg ref={svgRef}></svg>
      {dropdownOpen && <CourtDropdown onClose={closeDropdown} coordinates={dropdownCoordinates} onSubmit={onSubmit} />}
    </div>
  )
}

export default CourtCanvas
