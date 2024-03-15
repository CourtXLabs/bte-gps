"use server"

import { createClient } from "@/lib/supabase/actionts"
import { Sequence, gameFormSchema } from "@/types"
import { convertAllMoves } from "@/utils/get-moves-data"
import { getSequenceData, getTotalPoints } from "@/utils/get-sequence-data"
import { cookies } from "next/headers"
import { z } from "zod"

type Inputs = z.infer<typeof gameFormSchema>

interface Props {
  values: Inputs
  sequences: Sequence[]
  imageNames: string[]
}

export async function saveGame({ values, sequences, imageNames }: Props) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const date = values.date.toISOString()
    const { playerName, teamName, gameType, jersey, opponentName } = values

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

    // const imageSignedUrls = await supabase.storage.from("BTE GPS").createSignedUrls(imageNames, 3153600000)
    // const imageData = imageSignedUrls.data?.map((url, index) => {
    //   return {
    //     period: index + 1, // ASSUMING EXACTLY ONE GPS IMAGE PER PERIOD
    //     url: url.signedUrl,
    //     report_id: addedReport.data?.[0].id,
    //   }
    // })
    // await supabase.from("gps").insert(imageData)

    return {
      sequences: sequencesData.map((sequence, index) => ({
        ...sequence,
        moves: sequencesWithConvertedCoordinates[index].moves,
      })),
      name: `${playerName} - ${values.date.toISOString().split("T")[0]}`,
      playerInfo: {
        name: playerName,
        points: getTotalPoints(sequencesWithConvertedCoordinates),
        game: `${teamName} @ ${opponentName}`,
        date: values.date.toISOString().split("T")[0],
      },
    }
  } catch (error) {
    return { error }
  }
}
