"use client"

import { INITIAL_GAME_TYPE } from "@/constants"
import useBteStore from "@/stores/bteDataStore"
import { gameFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import GameMenu from "./GameMenu"
import CourtSection from "./sections/CourtSection"
import { Form } from "./ui/form"

export default function GameForm() {
  const { game, sequences, activePeriod } = useBteStore()
  const form = useForm<z.infer<typeof gameFormSchema>>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      gameType: INITIAL_GAME_TYPE,
      playerName: "",
      teamName: "",
      opponentName: "",
    },
  })

  async function onSubmit(values: z.infer<typeof gameFormSchema>) {
    const date = values.date.toISOString()
    const gameData = { ...values, date, sequences }
    console.log({ gameData })
  }

  console.log({ game, sequences, activePeriod })

  return (
    <div className="mx-auto flex w-max max-w-7xl flex-col gap-12 px-4 py-20 xl:flex-row xl:gap-32">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="game-form">
          <GameMenu />
        </form>
      </Form>
      <CourtSection />
    </div>
  )
}
