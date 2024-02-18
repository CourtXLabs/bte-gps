import useBteStore from "@/stores/bteDataStore"
import { GameTypes, Sequence } from "@/types"
import { useFormContext } from "react-hook-form"

const OVERTIME = "Overtime"

enum PeriodName {
  HALF = "Half",
  QUARTER = "Quarter",
}

const gameTypePeriodName = {
  [GameTypes.HIGH_SCHOOL]: PeriodName.QUARTER,
  [GameTypes.PROFESSIONAL]: PeriodName.QUARTER,
  [GameTypes.COLLEGE]: PeriodName.HALF,
}

interface PeriodToWord {
  [key: number]: string
}

const quartersPeriodNumberToWord = {
  1: "First",
  2: "Second",
  3: "Third",
  4: "Fourth",
  5: OVERTIME,
} as PeriodToWord

const halvesPeriodNumberToWord = {
  1: "First",
  2: "Second",
  3: OVERTIME,
} as PeriodToWord

const getSequencesContent = (sequnces: Sequence[], gameType: GameTypes) => {
  const periodName = gameTypePeriodName[gameType]
  const elements = []
  let previousPeriod = 0

  for (let sequnceIndex = 0; sequnceIndex < sequnces.length; sequnceIndex++) {
    const period = sequnces[sequnceIndex].period as 1 | 2 | 3 | 4 | 5
    const periodNumberToWord = periodName === PeriodName.QUARTER ? quartersPeriodNumberToWord : halvesPeriodNumberToWord
    if (period !== previousPeriod) {
      const periodWord = periodNumberToWord[period]
      elements.push(
        <p key={`${period}-${sequnceIndex}`} className="font-bold underline">
          {periodWord} {periodWord !== OVERTIME && periodName}
        </p>,
      )
      previousPeriod = period
    }
    elements.push(<p key={sequnceIndex}>Sequence {sequnceIndex + 1}</p>)
  }
  return elements
}

export default function SequencesListSection() {
  const { sequences, activePeriod } = useBteStore()
  const form = useFormContext()
  const gameType = form.watch("gameType") as GameTypes

  return (
    <div className="space-y-3 pt-2">
      <p className="font-semibold text-primary">Current Period: {activePeriod}</p>
      {getSequencesContent(sequences, gameType)}
    </div>
  )
}
