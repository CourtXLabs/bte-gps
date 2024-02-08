import CourtCanvas from "../CourtCanvas"
import { Button } from "../ui/button"

export default function CourtSection() {
  return (
    <div className="w-max space-y-9">
      <CourtCanvas />
      <div className="flex justify-between">
        <Button>Save Game</Button>
        <Button>Next Period</Button>
      </div>
    </div>
  )
}
