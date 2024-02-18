import useBteStore from "@/stores/bteDataStore"
import { Button } from "../ui/button"

const CourtOptionsSection = () => {
  const { sequences } = useBteStore()
  console.log(sequences)
  return (
    <div className="flex justify-between">
      <Button type="submit">Save Game</Button>
      <Button type="button">Next Period</Button>
    </div>
  )
}

export default CourtOptionsSection
