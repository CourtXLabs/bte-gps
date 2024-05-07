import { ReportApiData } from "@/types"
import { getIsShot } from "./get-is-shot"

export const getDribblesData = (data: ReportApiData) => {
  //   Percent of dribble type
  let totalDribbles = 0
  let dribbleTypes: Record<string, number> = {}

  for (const sequence of data.sequence) {
    for (const move of sequence.move) {
      if (!getIsShot(move.code)) {
        totalDribbles++
        if (!dribbleTypes[move.code]) {
          dribbleTypes[move.code] = 1
        } else {
          dribbleTypes[move.code]++
        }
      }
    }
  }

  return { totalDribbles, dribbleTypes }
}

export const getSequenceBoxscoreData = (data: ReportApiData) => {
  console.log(data)

  let totalSequence = 0

  // const sequenceData = {
  //     individualDribble: dribbleOptions[0].keyShortcut,
  //     lane: laneOptions[0].value,
  //     playCode: "",
  //     shootingOffDribbles: "",
  //     shootingStationary: "",
  //     frequency: "",
  //     initialDirection: "",
  //     counterDirection: "",
  //     lastHand: "",
  //   }

  for (const sequence of data.sequence) {
    totalSequence++
  }
}
