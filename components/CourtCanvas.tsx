"use client"

import { COURT_WIDTH } from "@/constants"
import useBteStore from "@/stores/bteDataStore"
import { Coordinates, Option, sequenceFormSchema } from "@/types"
import { convertPixelsToCoordinates } from "@/utils/get-moves-data"
import { generateRandomString } from "@/utils/misc"
import { useState } from "react"
import { z } from "zod"
import CourtDropdown from "./CourtDropdown"
import CourtImage from "./CourtImage"
import SequenceOptionsDialog from "./dialogs/SequenceOptionsDialog"

const CourtCanvas = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [tempMarkerCoordinates, setTempMarkerCoordinates] = useState<Coordinates | null>(null)
  const [isSequenceOptionsDialogOpen, setIsSequenceOptionsDialogOpen] = useState(false)
  const dropdownCoordinates: Coordinates | null = tempMarkerCoordinates
    ? { x: COURT_WIDTH / 2, y: tempMarkerCoordinates.y + 20 }
    : null

  const {
    activeSequenceMoves,
    activePeriod,
    activeSequenceIndex,
    addMoveToActiveSequence,
    undoLastMove,
    addNewSequence,
    resetActiveSequence,
    updateActiveSequenceIndex,
  } = useBteStore()

  const closeDropdown = () => {
    setDropdownOpen(false)
    setTempMarkerCoordinates(null)
  }

  const onSubmitMove = (option: Option) => {
    const { x, y } = convertPixelsToCoordinates({ ...tempMarkerCoordinates! })
    const uid = generateRandomString()
    addMoveToActiveSequence({ x, y, uid, moveId: option.id, color: option.color })

    if (option.isFinalMove) {
      toggleSequenceOptionsDialog()
    }
  }

  const onSubmitSequence = (values: z.infer<typeof sequenceFormSchema>) => {
    setIsSequenceOptionsDialogOpen(false)
    addNewSequence({ ...values, moves: activeSequenceMoves, period: activePeriod })
    updateActiveSequenceIndex(activeSequenceIndex + 1)
    resetActiveSequence()
  }

  const toggleSequenceOptionsDialog = () => {
    if (isSequenceOptionsDialogOpen) {
      undoLastMove()
    }
    setIsSequenceOptionsDialogOpen(!isSequenceOptionsDialogOpen)
  }

  const onClickCanvas = ({ x, y }: Coordinates) => {
    setDropdownOpen(true)
    setTempMarkerCoordinates({ x, y })
  }

  return (
    <div className="relative w-max">
      <CourtImage
        onClick={onClickCanvas}
        tempMarkerCoordinates={tempMarkerCoordinates}
        setTempMarkerCoordinates={setTempMarkerCoordinates}
      />
      {dropdownOpen && (
        <CourtDropdown onClose={closeDropdown} coordinates={dropdownCoordinates!} onSubmit={onSubmitMove} />
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
