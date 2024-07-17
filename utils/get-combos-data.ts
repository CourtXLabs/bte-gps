import { Sequence, SequenceApiData } from "@/types"

export const getCombosData = (sequences: Sequence[], playerId: number, addedSequences: SequenceApiData[]) => {
  const combosData = [] as { sequence_id: number; player_id: number }[]
  for (let i = 0; i < sequences.length; i++) {
    const sequenceId = addedSequences?.[i].id

    if (!sequenceId) continue

    const combos = sequences[i]?.combos

    combos?.forEach(() => {
      combosData.push({
        player_id: playerId,
        sequence_id: sequenceId,
      })
    })
  }

  return combosData
}

export const getComboIdsMap = (
  sequences: Sequence[],
  addedSequences: SequenceApiData[],
  addedCombos: { id: number; sequence_id: number }[],
) => {
  // Map sequence IDs to combo IDs
  let comboCounter = 0
  const comboIdMap = new Map<string, number>()
  for (let i = 0; i < addedSequences.length; i++) {
    const sequenceId = addedSequences[i].id
    const sequenceCombos = sequences[i].combos
    for (let j = 0; j < sequenceCombos.length; j++) {
      const comboId = addedCombos[comboCounter].id
      comboIdMap.set(`${sequenceId}_${j}`, comboId)
      comboCounter++
    }
  }

  return comboIdMap
}
