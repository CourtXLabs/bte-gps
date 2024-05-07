import { GameSaveData, MoveSequence, Sequence } from "@/types"

type CsvSaveData = Omit<GameSaveData, "name" | "imageInfo">

const getCsvData = ({ sequences, playerInfo }: CsvSaveData) => {
  if (sequences.length === 0) {
    return ""
  }

  // This assumes all objects have the same structure
  const columns = [
    "possessions",
    "play_code",
    "initial_direction",
    "counter_direction",
    "moves",
    "last_dribble_type",
    "lanes_left",
    "lanes_middle",
    "lanes_right",
    "pick_and_roll",
    "defender_pick_and_roll",
    "ball_handler_pick_and_roll",
    "type_of_shot",
    "full_combo",
    "bte_combo",
    "bte_value",
    "bte_score",
    "period",
  ]
  const columnHeaders = [
    "Player Name",
    "Points",
    "Game",
    "Date",
    "Possessions",
    "Play Code",
    "Initial Direction",
    "Counter Direction",
    "Moves",
    "Last Dribble Type",
    "Lanes Left",
    "Lanes Middle",
    "Lanes Right",
    "Pick & Roll",
    "Defender Pick & Roll",
    "Ball Handler Pick & Roll",
    "Type of Shot",
    "Full Combo",
    "BTE Combo",
    "BTE Value",
    "BTE Score",
    "Period",
  ]

  const rows = sequences.map((sequence, index) => {
    // For the first row, include playerInfo values, for others include empty strings
    const prefix =
      index === 0 ? [playerInfo.name, playerInfo.points, playerInfo.game, playerInfo.date] : ["", "", "", ""]

    const sequenceValues = columns.map((header) => {
      const value = sequence[header as keyof Sequence]
      if (header === "possessions") {
        return `P${index + 1}`
      }
      if (header === "moves") {
        return (value as MoveSequence[])
          .map((move: MoveSequence) => `${move.x.toFixed(2)} ${move.y.toFixed(2)}`)
          .join(" | ")
      }
      return value || ""
    })

    return [...prefix, ...sequenceValues].join(",")
  })

  return [columnHeaders.join(","), ...rows].join("\n")
}

export const downloadCsv = (dataToSave: GameSaveData) => {
  const { sequences, name, playerInfo } = dataToSave
  const csvData = getCsvData({ sequences, playerInfo })
  const blob = new Blob([csvData], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${name}.csv`
  a.click()
}
