"use client"

import useBteStore from "@/stores/bteDataStore"
import { Coordinates, Option, sequenceFormSchema } from "@/types"
import { generateRandomString } from "@/utils"
import * as d3 from "d3"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"
import CourtDropdown from "./CourtDropdown"
import SequenceOptionsDialog from "./dialogs/SequenceOptionsDialog"

const TEMPORARY_SELECTION_MARKER_CLASS = "marker-group"
const PERMANENT_MARKER_CLASS = "permanent-marker"
const COURT_WIDTH = 850
// const COURT_HEIGHT = 458

const CourtCanvas = () => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [markerCoordinates, setMarkerCoordinates] = useState({ x: 0, y: 0 })
  const [isSequenceOptionsDialogOpen, setIsSequenceOptionsDialogOpen] = useState(false)
  const {
    activeSequenceMoves,
    activePeriod,
    addMoveToActiveSequence,
    undoLastMove,
    addNewSequence,
    resetActiveSequence,
  } = useBteStore()

  const dropdownCoordinates = { x: COURT_WIDTH / 2, y: markerCoordinates.y + 20 }

  const removeMarker = (selector: string) => {
    d3.select(svgRef.current).selectAll(selector)?.remove()
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
    removeMarker(`.${TEMPORARY_SELECTION_MARKER_CLASS}`)
  }

  const drawPermanentMarker = ({ x, y, uid, color }: { x: number; y: number; color?: string; uid: string }) => {
    const svg = d3.select(svgRef.current)
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

  const drawLineBetweenMarkers = (fromCoords: Coordinates, toCoords: Coordinates, uid: string) => {
    const svg = d3.select(svgRef.current)
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

  const onSubmitMove = (option: Option) => {
    const uid = generateRandomString()
    addMoveToActiveSequence({ ...markerCoordinates, uid, moveId: option.id, color: option.color })

    const lastMove = activeSequenceMoves[activeSequenceMoves.length - 1]
    if (lastMove) {
      drawLineBetweenMarkers(lastMove, markerCoordinates, uid)
      drawPermanentMarker(lastMove) // needs to be redrawn so that the marker stays on top of the line
    }
    drawPermanentMarker({ ...markerCoordinates, color: option.color, uid })

    if (option.isFinalMove) {
      toggleSequenceOptionsDialog()
    }
  }

  const onSubmitSequence = (values: z.infer<typeof sequenceFormSchema>) => {
    setIsSequenceOptionsDialogOpen(false)
    addNewSequence({ ...values, moves: activeSequenceMoves, period: activePeriod })
    resetActiveSequence()
    removeMarker(`.${PERMANENT_MARKER_CLASS}`)
  }

  const toggleSequenceOptionsDialog = () => {
    if (isSequenceOptionsDialogOpen) {
      const lastMoveUid = activeSequenceMoves[activeSequenceMoves.length - 1]?.uid
      removeMarker(`#marker-${lastMoveUid}`)
      removeMarker(`#line-${lastMoveUid}`)
      undoLastMove()
    }
    setIsSequenceOptionsDialogOpen(!isSequenceOptionsDialogOpen)
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
      removeMarker(`.${TEMPORARY_SELECTION_MARKER_CLASS}`)

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

  return (
    <div className="relative w-max">
      <svg ref={svgRef} className="h-[458px] w-[850px]"></svg>
      {dropdownOpen && (
        <CourtDropdown onClose={closeDropdown} coordinates={dropdownCoordinates} onSubmit={onSubmitMove} />
      )}
      <SequenceOptionsDialog
        open={isSequenceOptionsDialogOpen}
        onOpenChange={toggleSequenceOptionsDialog}
        onSubmit={onSubmitSequence}
      />
    </div>
  )
}

export default CourtCanvas
