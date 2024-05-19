"use client"

import { COURT_WIDTH } from "@/constants/court"
import useBteStore from "@/stores/bteDataStore"
import { Coordinates, Option, sequenceFormSchema } from "@/types"
import { formatPeriod } from "@/utils/format-period"
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
    ? { x: COURT_WIDTH / 2, y: tempMarkerCoordinates.y + 60 }
    : null

  const {
    getActiveSequnceMoves,
    getActiveSequenceCombos,
    activePeriod,
    activeSequenceIndex,
    addMoveToActiveSequence,
    undoLastMove,
    addNewSequence,
    resetActiveSequence,
    updateActiveSequenceIndex,
    game: { gameType },
  } = useBteStore()

  const activeSequenceMoves = getActiveSequnceMoves()
  const activeSequenceCombos = getActiveSequenceCombos()

  const closeDropdown = () => {
    setDropdownOpen(false)
    setTempMarkerCoordinates(null)
  }

  const onSubmitMove = (option: Option) => {
    if (option.isStartCombo) {
      return
    }

    if (option.isLastCombo) {
      return
    }

    const { x, y } = convertPixelsToCoordinates({ ...tempMarkerCoordinates! })
    const uid = generateRandomString()
    addMoveToActiveSequence({ x, y, uid, moveId: option.id, color: option.color, shape: option.shape })

    if (option.isFinalMove) {
      toggleSequenceOptionsDialog()
    }
  }

  const onSubmitSequence = (values: z.infer<typeof sequenceFormSchema>) => {
    setIsSequenceOptionsDialogOpen(false)
    addNewSequence({
      ...values,
      moveUids: activeSequenceMoves.map((move) => move.uid),
      period: activePeriod,
      combos: activeSequenceCombos,
    })
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
      <div className="flex justify-between">
        <p className="mb-2 text-lg font-semibold text-primary">
          Current Period: {formatPeriod(activePeriod, gameType)}
        </p>
        {activeSequenceCombos.length > 0 && <p>Attacking combo #{activeSequenceCombos.length}</p>}
      </div>

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
