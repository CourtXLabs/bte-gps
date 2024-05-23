"use client"

import { OVERTIME, gameTypePeriodName, halvesPeriodNumberToWord, quartersPeriodNumberToWord } from "@/constants/periods"
import useBteStore from "@/stores/bteDataStore"
import { PeriodName } from "@/types"
import { TrashIcon } from "lucide-react"
import { useMemo } from "react"
import { Button } from "../ui/button"

export default function SequencesListSection() {
  const {
    getSequences,
    deleteSequence,
    game: { gameType },
    updateActiveSequenceIndex,
    activeSequenceIndex,
  } = useBteStore()
  const sequences = getSequences()

  const sequencesContent = useMemo(() => {
    const onClickSequence = (index: number) => () => {
      updateActiveSequenceIndex(index)
    }

    const onDelete = (index: number) => () => {
      deleteSequence(index)
    }

    const periodName = gameTypePeriodName[gameType]
    const elements = []
    let previousPeriod = 0

    for (let sequenceIndex = 0; sequenceIndex < sequences.length; sequenceIndex++) {
      const period = sequences[sequenceIndex].period as 1 | 2 | 3 | 4 | 5
      const periodNumberToWord =
        periodName === PeriodName.QUARTER ? quartersPeriodNumberToWord : halvesPeriodNumberToWord
      if (period !== previousPeriod) {
        const periodWord = periodNumberToWord[period]
        elements.push(
          <p key={`${period}-${sequenceIndex}`} className="pt-3 font-bold underline">
            {periodWord} {periodWord !== OVERTIME && periodName}
          </p>,
        )
        previousPeriod = period
      }
      elements.push(
        <div className="flex items-center gap-2">
          <Button
            variant="link"
            key={sequenceIndex}
            className={`block w-24 ${activeSequenceIndex === sequenceIndex ? "text-primary" : "text-foreground"}`}
            onClick={onClickSequence(sequenceIndex)}
          >
            Sequence {sequenceIndex + 1}
          </Button>
          <Button title="delete" className="p-2" variant="ghost" onClick={onDelete(sequenceIndex)}>
            <TrashIcon size={20} className="stroke-destructive" />
          </Button>
        </div>,
      )
    }
    elements.push(
      <Button
        variant="link"
        key={sequences.length}
        className={`block ${activeSequenceIndex === sequences.length ? "text-primary" : "text-foreground"}`}
        onClick={onClickSequence(sequences.length)}
      >
        Sequence {sequences.length + 1}
      </Button>,
    )
    return elements
  }, [sequences, gameType, updateActiveSequenceIndex, activeSequenceIndex, deleteSequence])

  return <div className="pt-2">{sequencesContent}</div>
}
