// This component should only handle drawing the moves on the court image and the temporary marker.

"use client"

import { PERMANENT_MARKER_CLASS, TEMPORARY_SELECTION_MARKER_CLASS } from "@/constants"
import useBteStore from "@/stores/bteDataStore"
import { Coordinates } from "@/types"
import {
  drawLineBetweenMarkers,
  drawPermanentMarker,
  drawTempMarker,
  removeMarker,
  setUpCanvas,
} from "@/utils/draw-move-marker"
import { convertCoordinatesToPixels } from "@/utils/get-moves-data"
import { MouseEventHandler, useEffect, useRef } from "react"

interface Props {
  onClick: (coordinates: Coordinates) => void
  tempMarkerCoordinates: Coordinates | null
  setTempMarkerCoordinates: (coordinates: Coordinates) => void
}

const CourtImage = ({ onClick, tempMarkerCoordinates, setTempMarkerCoordinates }: Props) => {
  const { activeSequenceIndex, sequences, activeSequenceMoves } = useBteStore()
  const svgRef = useRef<SVGSVGElement | null>(null)

  const handleClick: MouseEventHandler<SVGSVGElement> = (event) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    onClick({ x, y })
    setTempMarkerCoordinates({ x, y })
  }

  useEffect(() => {
    setUpCanvas(svgRef.current!)
  }, [])

  useEffect(() => {
    // We redraw each time, it shouldn't take more than maximum a few milliseconds
    removeMarker({ selector: `.${PERMANENT_MARKER_CLASS}`, svgElement: svgRef.current! })
    const movesToShow =
      activeSequenceIndex === sequences.length ? activeSequenceMoves : sequences[activeSequenceIndex]?.moves
    movesToShow?.forEach((move, index) => {
      const { color, uid } = move
      const { x, y } = convertCoordinatesToPixels(move)
      if (index > 0) {
        const previousMove = movesToShow[index - 1]
        const { x: previousMoveX, y: previousMoveY } = convertCoordinatesToPixels(previousMove)
        drawLineBetweenMarkers({
          fromCoords: { x: previousMoveX, y: previousMoveY },
          toCoords: { x, y },
          uid,
          svgElement: svgRef.current,
        })
        drawPermanentMarker({
          x: previousMoveX,
          y: previousMoveY,
          color: previousMove.color,
          uid: previousMove.uid,
          svgElement: svgRef.current,
        }) // needs to be redrawn so that the marker stays on top of the line
      }
      drawPermanentMarker({ x, y, color, uid, svgElement: svgRef.current })
    })
  }, [activeSequenceMoves, activeSequenceIndex, sequences])

  useEffect(() => {
    if (!tempMarkerCoordinates) {
      removeMarker({ svgElement: svgRef.current!, selector: `.${TEMPORARY_SELECTION_MARKER_CLASS}` })
    } else {
      drawTempMarker({ x: tempMarkerCoordinates.x, y: tempMarkerCoordinates.y, svgElement: svgRef.current! })
    }
  }, [tempMarkerCoordinates, drawTempMarker, removeMarker])

  return (
    <svg
      ref={svgRef}
      id="court-svg"
      className="h-[458px] w-[850px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onClick={handleClick}
    ></svg>
  )
}

export default CourtImage
