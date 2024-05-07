import { INITIAL_GAME_TYPE, gameTypesPeriods } from "@/constants/misc"
import { DeleteMoveInput, EditMoveInput, Game, GameSaveData, GameTypes, MoveSequence, Sequence } from "@/types"
import { create } from "zustand"

interface BteDataStore {
  activePeriod: number
  activeSequenceMoves: MoveSequence[]
  sequences: Sequence[]
  activeSequenceIndex: number
  game: Game
  isLoading: boolean
  isSaved: boolean
  dataToSave: GameSaveData
  toggleLoading: () => void
  toggleIsSaved: () => void
  addMoveToActiveSequence: (newSequence: MoveSequence) => void
  undoLastMove: () => void
  resetActiveSequence: () => void
  updateActiveSequenceIndex: (index: number) => void
  addNewSequence: (newSequence: Sequence) => void
  incrementPeriod: () => void
  decrementPeriod: () => void
  editMove: (data: EditMoveInput) => void
  deleteMove: (data: DeleteMoveInput) => void
  resetSequences: () => void
  changeGameType: (gameType: GameTypes) => void
  setDatatoSave: (data: GameSaveData) => void
  resetGame: () => void
}

const useBteStore = create<BteDataStore>()((set) => ({
  activePeriod: 1,
  activeSequenceMoves: [] as MoveSequence[],
  sequences: [] as Sequence[],
  activeSequenceIndex: 0,
  game: {
    gameType: INITIAL_GAME_TYPE,
  } as Game,
  isSaved: false,
  isLoading: false,
  dataToSave: {} as GameSaveData,
  toggleLoading: () => set((state: BteDataStore) => ({ isLoading: !state.isLoading })),
  toggleIsSaved: () => set((state: BteDataStore) => ({ isSaved: !state.isSaved })),
  addMoveToActiveSequence: (newSequence: MoveSequence) =>
    set((state: BteDataStore) => ({ activeSequenceMoves: [...state.activeSequenceMoves, newSequence] })),
  undoLastMove: () =>
    set((state: BteDataStore) => ({
      activeSequenceMoves: state.activeSequenceMoves.slice(0, state.activeSequenceMoves.length - 1),
    })),
  resetActiveSequence: () => set({ activeSequenceMoves: [] }),
  updateActiveSequenceIndex: (index: number) => set({ activeSequenceIndex: index }),
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
  editMove: ({ moveIndex, sequenceIndex, newMove }: EditMoveInput) =>
    set((state: BteDataStore) => {
      const isActiveSequence = sequenceIndex === state.sequences.length
      if (isActiveSequence) {
        const newActiveSequenceMoves = state.activeSequenceMoves.map((move, index) => {
          if (index !== moveIndex) {
            return move
          }
          return { ...move, ...newMove }
        })

        return { activeSequenceMoves: newActiveSequenceMoves }
      }
      const newSequences = state.sequences.map((sequence, iterationSequenceIndex) => {
        if (iterationSequenceIndex !== sequenceIndex) {
          return sequence
        }
        return {
          ...sequence,
          moves: sequence.moves.map((move, interationMoveIndex) => {
            if (interationMoveIndex !== moveIndex) {
              return move
            }
            return { ...move, ...newMove }
          }),
        }
      })

      return { sequences: newSequences }
    }),
  deleteMove: ({ moveIndex, sequenceIndex }: DeleteMoveInput) =>
    set((state: BteDataStore) => {
      const isActiveSequence = sequenceIndex === state.sequences.length
      if (isActiveSequence) {
        return { activeSequenceMoves: state.activeSequenceMoves.filter((_, index) => index !== moveIndex) }
      }

      const newSequences = state.sequences.map((sequence, iterationSequenceIndex) => {
        if (iterationSequenceIndex !== sequenceIndex) {
          return sequence
        }
        return {
          ...sequence,
          moves: sequence.moves.filter((_, interationMoveIndex) => interationMoveIndex !== moveIndex),
        }
      })

      return { sequences: newSequences }
    }),
  resetSequences: () => set({ sequences: [] }),
  changeGameType: (gameType: GameTypes) =>
    set((state: BteDataStore) => {
      const newMaxPeriod = gameTypesPeriods[gameType]
      const activePeriod = state.activePeriod > newMaxPeriod ? newMaxPeriod : state.activePeriod

      return { game: { ...state.game, gameType }, activePeriod }
    }),
  setDatatoSave: (data: GameSaveData) => set({ dataToSave: data }),
  resetGame: () =>
    set({
      activePeriod: 1,
      activeSequenceIndex: 0,
      activeSequenceMoves: [] as MoveSequence[],
      sequences: [] as Sequence[],
      game: {
        gameType: INITIAL_GAME_TYPE,
      } as Game,
      isSaved: false,
      isLoading: false,
      dataToSave: {} as GameSaveData,
    }),
}))

export default useBteStore
