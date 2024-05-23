"use client"

import useBteStore from "@/stores/bteDataStore"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table"
import MoveRow from "./MoveRow"

const MovesList = () => {
  const { activeSequenceIndex, getSequences, getActiveSequnceMoves, getActiveSequenceCombos } = useBteStore()
  const activeSequenceMoves = getActiveSequnceMoves()
  const activeSequenceCombos = getActiveSequenceCombos()
  const sequences = getSequences()

  const getViewedSequenceMoves = () => {
    const viewedSequenceMoves =
      activeSequenceIndex === sequences.length ? activeSequenceMoves : sequences?.[activeSequenceIndex]?.moves

    const viewedCombos =
      activeSequenceIndex === sequences.length ? activeSequenceCombos : sequences?.[activeSequenceIndex]?.combos || []

    return viewedSequenceMoves?.map((move) => {
      let comboIndex = null
      viewedCombos.forEach((combo, index) => {
        if (combo.some((comboMove) => comboMove.uid === move.uid)) {
          comboIndex = index + 1
        }
      })
      return {
        ...move,
        combo: comboIndex,
      }
    })
  }

  const viewedSequenceMoves = getViewedSequenceMoves()

  return (
    <div>
      <h3 className="mb-2 text-base font-medium">Sequence {activeSequenceIndex + 1} moves</h3>
      {!!viewedSequenceMoves?.length && (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Move</TableHead>
              <TableHead>X coordinate</TableHead>
              <TableHead>Y coordiante</TableHead>
              <TableHead>Move Type</TableHead>
              <TableHead>Combo</TableHead>
              <TableHead className="w-[20px]"></TableHead>
              <TableHead className="w-[20px]"></TableHead>
              <TableHead className="w-[20px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {viewedSequenceMoves.map((move, index) => (
              <MoveRow move={move} key={move.uid} moveIndex={index} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default MovesList
