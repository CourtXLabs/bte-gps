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
  game: Game
  isLoading: boolean
  isSaved: boolean
  dataToSave: GameSaveData
  getSequences: () => Sequence[]
  getActiveSequnceMoves: () => MoveSequence[]
  getActiveSequenceCombos: () => MoveSequence[][]
  toggleLoading: () => void
  toggleIsSaved: () => void
  addMoveToActiveSequence: (newSequence: MoveSequence) => void
  undoLastMove: () => void
  resetActiveSequence: () => void
  updateActiveSequenceIndex: (index: number) => void
  addNewSequence: (newSequence: Sequence) => void
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
              const move = state.moves.find((m) => m.uid === uid)
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
      resetActiveSequence: () => set({ activeSequenceMoveUids: [] }),
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
      editMove: (newMove: MoveSequence) =>
        set((state: BteDataStore) => {
          const moveIndex = state.moves.findIndex((move) => move.uid === newMove.uid)
          const newMoves = [...state.moves]
          newMoves[moveIndex] = newMove

          return {
            moves: newMoves,
            activeSequenceMoveUids: newMoves.map((move) => move.uid),
            activeSequenceCombos: state.activeSequenceCombos.map((combo) =>
              combo.map((uid) => newMoves.find((move) => move.uid === uid)?.uid || ""),
            ),
            sequences: state.sequences.map((sequence) => ({
              ...sequence,
              moveUids: sequence.moveUids?.map((uid) => (uid === newMove.uid ? newMove.uid : uid)),
            })),
          }
        }),
      deleteMove: (moveUid: string) =>
        set((state: BteDataStore) => ({
          moves: state.moves.filter((move) => move.uid !== moveUid),
          activeSequenceMoveUids: state.activeSequenceMoveUids.filter((uid) => uid !== moveUid),
          activeSequenceCombos: state.activeSequenceCombos.map((combo) => combo.filter((uid) => uid !== moveUid)),
          sequences: state.sequences.map((sequence) => ({
            ...sequence,
            moveUids: sequence.moveUids?.filter((uid) => uid !== moveUid),
          })),
        })),
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
          moves: [] as MoveSequence[],
          activePeriod: 1,
          activeSequenceIndex: 0,
          activeSequenceMoveUids: [] as string[],
          sequences: [] as Sequence[],
          activeSequenceCombos: [] as string[][],
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
