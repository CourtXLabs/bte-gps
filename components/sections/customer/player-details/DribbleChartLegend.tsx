import { dribbleOptions } from "@/constants/sequence-options"
import { cn } from "@/lib/utils"

interface Props {
  className?: string
}

export default function DribbleChartLegend({ className }: Props) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4 pb-6 xl:flex-nowrap xl:gap-8", className)}>
      {dribbleOptions.map((option) => (
        <div key={option.id} className="flex items-center gap-2">
          <span style={{ backgroundColor: option.color }} className="block h-4 w-4 min-w-4 rounded-full" />
          <span className="text-sm">{option.name}</span>
        </div>
      ))}
    </div>
  )
}
