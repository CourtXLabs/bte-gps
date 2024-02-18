import { INITIAL_GAME_TYPE, gameTypesPeriods } from "@/constants"
import { Game, GameTypes, MoveSequence, Sequence } from "@/types"
import { create } from "zustand"

interface BteDataStore {
  activePeriod: number
  activeSequenceMoves: MoveSequence[]
  sequences: Sequence[]
  game: Game
  addMoveToActiveSequence: (newSequence: MoveSequence) => void
  undoLastMove: () => void
  resetActiveSequence: () => void
  addNewSequence: (newSequence: Sequence) => void
  incrementPeriod: () => void
  decrementPeriod: () => void
  resetSequences: () => void
  changeGameType: (gameType: GameTypes) => void
}

const useBteStore = create<BteDataStore>()((set) => ({
  activePeriod: 1,
  activeSequenceMoves: [] as MoveSequence[],
  sequences: [] as Sequence[],
  game: {
    gameType: INITIAL_GAME_TYPE,
  } as Game,
  addMoveToActiveSequence: (newSequence: MoveSequence) =>
    set((state: BteDataStore) => ({ activeSequenceMoves: [...state.activeSequenceMoves, newSequence] })),
  undoLastMove: () =>
    set((state: BteDataStore) => ({
      activeSequenceMoves: state.activeSequenceMoves.slice(0, state.activeSequenceMoves.length - 1),
    })),
  resetActiveSequence: () => set({ activeSequenceMoves: [] }),
  addNewSequence: (newSequence: Sequence) =>
    set((state: BteDataStore) => ({ sequences: [...state.sequences, newSequence] })),
  decrementPeriod: () =>
    set((state: BteDataStore) => {
      const currentActivePeriod = state.activePeriod
      const newPeriod = currentActivePeriod - 1

      if (newPeriod < 1) {
        return {}
      }

      return { activePeriod: newPeriod }
    }),
  incrementPeriod: () =>
    set((state: BteDataStore) => {
      const currentActivePeriod = state.activePeriod
      const gameType = state.game.gameType
      const maxPeriod = gameTypesPeriods[gameType]
      const newPeriod = currentActivePeriod + 1

      if (newPeriod > maxPeriod) {
        return {}
      }

      return { activePeriod: newPeriod }
    }),
  resetSequences: () => set({ sequences: [] }),
  changeGameType: (gameType: GameTypes) =>
    set((state: BteDataStore) => {
      const newMaxPeriod = gameTypesPeriods[gameType]
      const activePeriod = state.activePeriod > newMaxPeriod ? newMaxPeriod : state.activePeriod

      return { game: { ...state.game, gameType }, activePeriod }
    }),
}))

export default useBteStore
