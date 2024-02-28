"use client"

import { INITIAL_GAME_TYPE } from "@/constants"
import { createClient } from "@/lib/supabase/client"
import useBteStore from "@/stores/bteDataStore"
import { gameFormSchema } from "@/types"
import { constructSequencesSvg } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import GameMenu from "./GameMenu"
import CourtSection from "./sections/CourtSection"
import { Form } from "./ui/form"

export default function GameForm() {
  const supabase = createClient()
  const { sequences } = useBteStore()
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
    try {
      const date = values.date.toISOString()
      const { playerName, teamName, gameType, jersey, opponentName } = values
      const sequencesImages = await constructSequencesSvg(sequences)
      const imageNames = []
      for (let imageIndex = 0; imageIndex < sequencesImages.length; imageIndex++) {
        const imageName = `${playerName}: ${teamName} vs ${opponentName}. ${date} - ${imageIndex}`
        await supabase.storage.from("BTE GPS").upload(imageName, sequencesImages[imageIndex], {
          contentType: "image/webp",
        })
        imageNames.push(imageName)
      }

      const teamData = [
        {
          name: teamName,
        },
      ]
      const oppoentTeamData = [
        {
          name: opponentName,
        },
      ]

      const addedTeam = await supabase.from("team").insert(teamData).select("id")
      const addedOppoentTeam = await supabase.from("team").insert(oppoentTeamData).select("id")

      const gameData = [
        {
          type: gameType,
          date,
          home_team_id: addedTeam.data?.[0].id,
          away_team_id: addedOppoentTeam.data?.[0].id,
        },
      ]
      const addedGame = await supabase.from("game").insert(gameData).select("id")

      const playerData = [
        {
          name: playerName,
          jersey: jersey,
          team_id: addedTeam.data?.[0].id,
        },
      ]
      const addedPlayer = await supabase.from("player").insert(playerData).select("id")

      const reportData = [
        {
          game_id: addedGame.data?.[0].id,
          player_id: addedPlayer.data?.[0].id,
        },
      ]
      const addedReport = await supabase.from("report").insert(reportData).select("id")

      const sequencesData = sequences.map((sequence) => {
        const { moves, ...rest } = sequence
        return {
          report_id: addedReport.data?.[0].id,
          full_combo: moves
            .slice(0, moves.length - 1)
            .map((move) => move.moveId)
            .join(""), // because the last move is the shot, which is not part of the dribble combo
          bte_combo: moves
            .slice(0, Math.min(3, moves.length - 1))
            .map((move) => move.moveId)
            .join(""),
          ...rest,
        }
      })
      const addedSequences = await supabase.from("sequence").insert(sequencesData).select("id")

      const movesData = [] as any
      for (let i = 0; i < sequences.length; i++) {
        const moves = sequences[i]?.moves
        moves.forEach((move) => {
          const { x, y } = move
          movesData.push({
            sequence_id: addedSequences.data?.[i].id,
            x,
            y,
          })
        })
      }
      await supabase.from("move").insert(movesData)

      const imageSignedUrls = await supabase.storage.from("BTE GPS").createSignedUrls(imageNames, 3153600000)
      const imageData = imageSignedUrls.data?.map((url, index) => {
        return {
          period: index + 1, // ASSUMING EXACTLY ONE GPS IMAGE PER PERIOD
          url: url.signedUrl,
          report_id: addedReport.data?.[0].id,
        }
      })
      await supabase.from("gps").insert(imageData)
    } catch (error) {
      console.log({ error })
    }
  }

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
