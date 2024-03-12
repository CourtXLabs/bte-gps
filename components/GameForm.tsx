"use client"

import { INITIAL_GAME_TYPE } from "@/constants"
import { createClient } from "@/lib/supabase/client"
import useBteStore from "@/stores/bteDataStore"
import { gameFormSchema } from "@/types"
import { constructSequencesSvg, convertAllMoves, getSequenceData } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import GameMenu from "./GameMenu"
import CourtSection from "./sections/CourtSection"
import { Form } from "./ui/form"
import { useToast } from "./ui/use-toast"

export default function GameForm() {
  const { toast } = useToast()
  const supabase = createClient()
  const { sequences, toggleLoading, toggleIsSaved, setDatatoSave } = useBteStore()
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
      toggleLoading()
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

      const sequencesWithConvertedCoordinates = convertAllMoves(sequences)
      const sequencesData = getSequenceData(sequencesWithConvertedCoordinates, addedReport.data?.[0].id!)
      const addedSequences = await supabase.from("sequence").insert(sequencesData).select("id")

      const movesData = [] as any
      for (let i = 0; i < sequencesWithConvertedCoordinates.length; i++) {
        const moves = sequencesWithConvertedCoordinates[i]?.moves
        moves.forEach((move) => {
          movesData.push({
            sequence_id: addedSequences.data?.[i].id,
            x: move.x,
            y: move.y,
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
      toast({ title: "Game data saved successfully!" })
      toggleIsSaved()
      setDatatoSave({
        sequences: sequencesData.map((sequence, index) => ({
          ...sequence,
          moves: sequencesWithConvertedCoordinates[index].moves,
        })),
        name: `${playerName} - ${values.date.toISOString().split("T")[0]}`,
      })
    } catch (error) {
      toast({ variant: "destructive", title: "An error occured" })
      console.log({ error })
    }
    toggleLoading()
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
