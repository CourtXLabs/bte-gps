import { Checkbox } from "@/components/ui/checkbox"
import { IGraphFilters } from "@/types"

interface Props {
  filters: IGraphFilters
  onChangeFilter: (key: keyof IGraphFilters) => void
}

const filterKeyToNameMap = {
  dribbles: "Dribbles",
  initialDirection: "Initial Direction",
  counterDirection: "Counter Direction",
  lastHand: "Last Hand",
}

export default function GraphFilters({ filters, onChangeFilter }: Props) {
  const handleFilterChange = (key: keyof IGraphFilters) => () => {
    onChangeFilter(key)
  }

  return (
    <div className="flex items-center gap-6">
      {Object.entries(filters).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2">
          <Checkbox id={key} checked={value} onCheckedChange={handleFilterChange(key as keyof IGraphFilters)} />
          <label htmlFor={key}>{filterKeyToNameMap[key as keyof IGraphFilters]}</label>
        </div>
      ))}
    </div>
  )
}
