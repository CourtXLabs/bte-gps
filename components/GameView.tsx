import GameSidebar from "./GameSidebar"
import CourtSection from "./sections/CourtSection"

export default function GameView() {
  return (
    <div className="mx-auto flex w-max max-w-7xl flex-col gap-12 px-4 py-20 lg:px-0 xl:flex-row xl:gap-32">
      <GameSidebar />
      <CourtSection />
    </div>
  )
}
