"use server"

import { createClient } from "@/lib/supabase/actionts"
import { Sequence, gameFormSchema } from "@/types"
import dateToUTCString from "@/utils/convert-date-to-utc-string"
import { getComboIdsMap, getCombosData } from "@/utils/get-combos-data"
import { getSequenceData, getTotalPoints } from "@/utils/get-sequence-data"
import { uploadGame, uploadReport } from "@/utils/upload-db-data"
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
    const date = values.date ? dateToUTCString(values.date) : null
    let { playerName, homeTeam, gameType, jersey, awayTeam, playerId, homeTeamId, awayTeamId, points } = values
    const reportName = `${playerName} - ${date?.split("T")[0] || "Unknown Date"}`
    const totalPoints = Number(points) || getTotalPoints(sequences)

    if (!homeTeamId) {
      const homeTeamData = [
        {
          name: homeTeam,
        },
      ]
      const addedTeam = await supabase.from("team").insert(homeTeamData).select("id")
      homeTeamId = addedTeam.data?.[0].id as number
    }

    if (!awayTeamId) {
      const awayTeamData = [
        {
          name: awayTeam,
        },
      ]
      const addedOppoentTeam = await supabase.from("team").insert(awayTeamData).select("id")
      awayTeamId = addedOppoentTeam.data?.[0].id as number
    }

    if (!playerId) {
      const playerData = [
        {
          name: playerName,
          jersey,
          team_id: homeTeamId,
        },
      ]
      const addedPlayer = await supabase.from("player").insert(playerData).select("id")
      playerId = addedPlayer.data?.[0].id as number
    }

    const addedGameId = await uploadGame(supabase, {
      type: gameType,
      date,
      home_team_id: homeTeamId,
      away_team_id: awayTeamId,
    })

    const addedReportId = await uploadReport(supabase, {
      game_id: addedGameId,
      name: reportName,
      points: totalPoints,
      player_id: playerId,
    })

    const sequencesData = getSequenceData(sequences, playerId, addedReportId!)
    const addedSequences = await supabase.from("sequence").insert(sequencesData).select("id")

    const combosData = getCombosData(sequences, playerId, addedSequences.data as any)
    const adddedCombos = await supabase.from("combo").insert(combosData).select("id, sequence_id")
    const comboIdMap = getComboIdsMap(sequences, addedSequences.data as any, adddedCombos.data as any)

    const movesData = [] as any
    for (let i = 0; i < sequences.length; i++) {
      const moves = sequences[i]?.moves
      const sequenceId = addedSequences.data?.[i].id

      moves?.forEach((move) => {
        let comboId = null
        // Find the combo ID for this move
        sequences[i]?.combos.forEach((combo, comboIndex) => {
          if (combo.find((comboMove) => comboMove.uid === move.uid)) {
            comboId = comboIdMap.get(`${sequenceId}_${comboIndex}`)
          }
        })
        movesData.push({
          sequence_id: sequenceId,
          player_id: playerId,
          combo_id: comboId,
          code: move.moveId,
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
        report_id: addedReportId,
      }
    })
    await supabase.from("gps").insert(imageData)

    const dataToDownload = {
      sequences: sequencesData.map((sequence, index) => ({
        ...sequence,
        moves: sequences[index].moves,
      })),
      name: reportName,
      playerInfo: {
        name: playerName,
        points: totalPoints,
        game: `${homeTeam} @ ${awayTeam}`,
        date: date?.split("T")[0],
      },
      imageInfo: imageData || [],
      error: null,
    }

    return dataToDownload
  } catch (error) {
    return { error: "Could not save data. Please contact the app developer" }
  }
}
