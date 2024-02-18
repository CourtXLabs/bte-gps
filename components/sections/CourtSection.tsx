import CourtCanvas from "../CourtCanvas"
import CourtOptionsSection from "./CourtOptionsSection"

export default function CourtSection() {
  return (
    <div className="w-max space-y-9">
      <CourtCanvas />
      <CourtOptionsSection />
    </div>
  )
}
