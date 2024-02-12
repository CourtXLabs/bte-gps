"use client"

import { GameTypes, gameFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import GameMenu from "./GameMenu"
import CourtSection from "./sections/CourtSection"
import { Form } from "./ui/form"

export default function GameForm() {
  const form = useForm<z.infer<typeof gameFormSchema>>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      gameType: GameTypes.COLLEGE,
      playerName: "",
      teamName: "",
      opponentName: "",
    },
  })

  return (
    <Form {...form}>
      <div className="mx-auto flex w-max max-w-7xl flex-col gap-12 px-4 py-20 xl:flex-row xl:gap-32">
        <GameMenu />
        <CourtSection />
      </div>
    </Form>
  )
}
