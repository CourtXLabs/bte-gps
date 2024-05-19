import dynamic from "next/dynamic"

import CourtCanvas from "./CourtCanvas"
import GameSidebar from "./GameSidebar"
import CourtOptionsSection from "./sections/CourtOptionsSection"
const MovesList = dynamic(() => import("./sections/MovesList"), { ssr: false })

export default function GameView() {
  return (
    <div className="mx-auto flex w-max max-w-7xl flex-col gap-12 px-4 py-20 lg:px-0 xl:flex-row xl:gap-32">
      <GameSidebar />
      <div className="w-max space-y-9">
        <CourtCanvas />
        <CourtOptionsSection />
        <MovesList />
      </div>
    </div>
  )
}
