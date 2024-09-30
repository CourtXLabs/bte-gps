import { Button } from "@/components/ui/button"
import { IGraphFilters } from "@/types"

interface Props {
  filters: IGraphFilters
  onChangeFilter: (key: keyof IGraphFilters) => void
  children?: React.ReactNode
}

const filterKeyToNameMap = {
  dribbles: "Dribbles",
  dribbleTypes: "Dribble Types",
  initialDirection: "Initial Direction",
  counterDirection: "Counter Direction",
  lastHand: "Last Hand",
}

export default function GraphFilters({ filters, onChangeFilter, children }: Props) {
  const handleFilterChange = (key: keyof IGraphFilters) => () => {
    onChangeFilter(key)
  }

  return (
    <div className="mx-auto flex w-full flex-col flex-wrap items-center justify-center gap-3 md:flex-row">
      {Object.entries(filters).map(([key, value]) => {
        const isActive = filters[key as keyof IGraphFilters]

        return (
          <div key={key} className="flex w-full items-center gap-2 md:w-max">
            <Button
              variant={isActive ? "active" : "secondary"}
              size="lg"
              className="w-full max-w-none px-4"
              onClick={handleFilterChange(key as keyof IGraphFilters)}
            >
              {filterKeyToNameMap[key as keyof IGraphFilters]}
            </Button>
          </div>
        )
      })}
      {children}
    </div>
  )
}
