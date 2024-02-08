import { cn } from "@/lib/utils"

enum Periods {
  HALF = "HALF",
  QUARTER = "QUARTER",
}

const periodType = Periods.HALF

const periods = [
  {
    count: 1,
    sequences: [
      {
        count: 1,
      },
      {
        count: 2,
      },
      {
        count: 3,
      },
      {
        count: 4,
      },
    ],
  },
  {
    count: 2,
    sequences: [
      {
        count: 5,
      },
      {
        count: 6,
        isActive: true,
      },
    ],
  },
]

export default function SequencesListSection() {
  return (
    <div className="space-y-3 pt-2">
      <p className="font-bold underline">First Half</p>
      <p>Sequence 1</p>
      <p>Sequence 2</p>
      <p>Sequence 3</p>
      <p>Sequence 4</p>
      <p className="font-bold underline">Second Half</p>
      <p>Sequence 5</p>
      <p className={cn({ "text-primary": true })}>Sequence 6</p>
    </div>
  )
}
