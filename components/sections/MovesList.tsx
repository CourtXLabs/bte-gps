"use client"
import useBteStore from "@/stores/bteDataStore"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table"
import MoveRow from "./MoveRow"

const MovesList = () => {
  const { activeSequenceIndex, getSequences, getActiveSequnceMoves } = useBteStore()
  const activeSequenceMoves = getActiveSequnceMoves()
  const sequences = getSequences()

  const viewedSequenceMoves =
    activeSequenceIndex === sequences.length ? activeSequenceMoves : sequences?.[activeSequenceIndex]?.moves

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
