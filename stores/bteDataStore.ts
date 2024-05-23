import { INITIAL_GAME_TYPE, gameTypesPeriods } from "@/constants/misc"
import { Game, GameSaveData, GameTypes, MoveSequence, Sequence } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BteDataStore {
  moves: MoveSequence[]
  activePeriod: number
  activeSequenceMoveUids: string[]
  activeSequenceCombos: string[][]
  sequences: Sequence[]
  activeSequenceIndex: number
  isActiveCombo: boolean
  game: Game
  isLoading: boolean
  isSaved: boolean
  dataToSave: GameSaveData
  getSequences: () => Sequence[]
  getActiveSequnceMoves: () => MoveSequence[]
  getActiveSequenceCombos: () => MoveSequence[][]
  toggleLoading: () => void
  toggleIsSaved: () => void
  addMoveToActiveCombo: (newMove: MoveSequence) => void
  addComboToActiveSequence: (newCombo: string[]) => void
  addMoveToActiveSequence: (newSequence: MoveSequence) => void
  undoLastMove: () => void
  toggleIsActiveCombo: () => void
  resetActiveSequence: () => void
  updateActiveSequenceIndex: (index: number) => void
  addNewSequence: (newSequence: Sequence) => void
  deleteSequence: (sequenceIndex: number) => void
  incrementPeriod: () => void
  decrementPeriod: () => void
  editMove: (newMove: MoveSequence) => void
  deleteMove: (moveUid: string) => void
  resetSequences: () => void
  changeGameType: (gameType: GameTypes) => void
  setDatatoSave: (data: GameSaveData) => void
  resetGame: () => void
}

const useBteStore = create<BteDataStore>()(
  persist(
    (set, get) => ({
      moves: [] as MoveSequence[],
      activePeriod: 1,
      activeSequenceMoveUids: [] as string[],
      activeSequenceCombos: [] as string[][],
      sequences: [] as Sequence[],
      activeSequenceIndex: 0,
      isActiveCombo: false,
      game: {
        gameType: INITIAL_GAME_TYPE,
      } as Game,
      isSaved: false,
      isLoading: false,
      dataToSave: {} as GameSaveData,
      getSequences: () => {
        const state = get()
        return state.sequences.map((sequence) => ({
          ...sequence,
          moves:
            sequence.moveUids?.flatMap((uid) => {
              const move = state.moves.find((move) => move.uid === uid)
              if (!move) {
                return []
              }
              return {
                ...move,
              }
            }) || [],
        }))
      },
      getActiveSequnceMoves: () => {
        const state = get()
        return state.activeSequenceMoveUids.flatMap((uid) => {
          const move = state.moves.find((m) => m.uid === uid)
          if (!move) {
            return []
          }
          return {
            ...move,
          }
        })
      },
      getActiveSequenceCombos: () => {
        const state = get()
        return state.activeSequenceCombos.map((combo) =>
          combo.flatMap((uid) => {
            const move = state.moves.find((m) => m.uid === uid)
            if (!move) {
              return []
            }
            return {
              ...move,
            }
          }),
        )
      },
      toggleLoading: () => set((state: BteDataStore) => ({ isLoading: !state.isLoading })),
      toggleIsSaved: () => set((state: BteDataStore) => ({ isSaved: !state.isSaved })),
      addMoveToActiveCombo: (newMove: MoveSequence) =>
        set((state: BteDataStore) => {
          const activeSequenceCombos = [...state.activeSequenceCombos]
          const currentCombo = activeSequenceCombos[activeSequenceCombos.length - 1]
          const newCombo = [...currentCombo, newMove.uid]
          activeSequenceCombos[activeSequenceCombos.length - 1] = newCombo

          return { activeSequenceCombos }
        }),
      addComboToActiveSequence: (newCombo: string[]) =>
        set((state: BteDataStore) => ({
          activeSequenceCombos: [...state.activeSequenceCombos, newCombo],
        })),
      addMoveToActiveSequence: (newSequence: MoveSequence) =>
        set((state: BteDataStore) => ({
          activeSequenceMoveUids: [...state.activeSequenceMoveUids, newSequence.uid],
          moves: [...state.moves, newSequence],
        })),
      undoLastMove: () =>
        set((state: BteDataStore) => ({
          activeSequenceMoveUids: state.activeSequenceMoveUids.slice(0, state.activeSequenceMoveUids.length - 1),
          moves: state.moves.slice(0, state.moves.length - 1),
        })),
      resetActiveSequence: () => set({ activeSequenceMoveUids: [], activeSequenceCombos: [], isActiveCombo: false }),
      updateActiveSequenceIndex: (index: number) => set({ activeSequenceIndex: index }),
      addNewSequence: (newSequence: Sequence) =>
        set((state: BteDataStore) => ({ sequences: [...state.sequences, newSequence] })),
      deleteSequence: (sequenceIndex: number) =>
        set((state: BteDataStore) => ({
          sequences: state.sequences.filter((_, index) => index !== sequenceIndex),
        })),
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
      editMove: (newMove: MoveSequence) =>
        set((state: BteDataStore) => {
          const moveIndex = state.moves.findIndex((move) => move.uid === newMove.uid)
          const newMoves = [...state.moves]
          newMoves[moveIndex] = newMove

          return {
            moves: newMoves,
          }
        }),
      deleteMove: (moveUid: string) =>
        set((state: BteDataStore) => ({
          moves: state.moves.filter((move) => move.uid !== moveUid),
        })),
      resetSequences: () => set({ sequences: [] }),
      toggleIsActiveCombo: () => set((state: BteDataStore) => ({ isActiveCombo: !state.isActiveCombo })),
      changeGameType: (gameType: GameTypes) =>
        set((state: BteDataStore) => {
          const newMaxPeriod = gameTypesPeriods[gameType]
          const activePeriod = state.activePeriod > newMaxPeriod ? newMaxPeriod : state.activePeriod

          return { game: { ...state.game, gameType }, activePeriod }
        }),
      setDatatoSave: (data: GameSaveData) => set({ dataToSave: data }),
      resetGame: () =>
        set({
          moves: [] as MoveSequence[],
          activePeriod: 1,
          activeSequenceIndex: 0,
          activeSequenceMoveUids: [] as string[],
          sequences: [] as Sequence[],
          activeSequenceCombos: [] as string[][],
          isActiveCombo: false,
          game: {
            gameType: INITIAL_GAME_TYPE,
          } as Game,
          isSaved: false,
          isLoading: false,
          dataToSave: {} as GameSaveData,
        }),
    }),
    {
      name: "bte-store",
    },
  ),
)

export default useBteStore
