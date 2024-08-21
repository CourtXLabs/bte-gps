import dynamic from "next/dynamic"

import { dribbleOptions } from "@/constants/sequence-options"
import Image from "next/image"
import CourtCanvas from "./CourtCanvas"
import GameSidebar from "./GameSidebar"
import CourtOptionsSection from "./sections/CourtOptionsSection"
const MovesList = dynamic(() => import("./sections/MovesList"), { ssr: false })

export default function GameView() {
  return (
    <div className="mx-auto w-max max-w-7xl pb-10 lg:px-0">
      <div className="flex items-center justify-center py-10">
        {dribbleOptions.map((option) => (
          <Image key={option.id} src={option.image!} alt={option.name} width={125} height={125} />
        ))}
      </div>
      <div className="flex flex-col gap-12 xl:flex-row xl:gap-32">
        <GameSidebar />
        <div className="w-max space-y-9">
          <CourtCanvas />
          <CourtOptionsSection />
          <MovesList />
        </div>
      </div>
    </div>
  )
}
