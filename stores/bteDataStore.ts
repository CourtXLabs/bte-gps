import { GameTypes } from "@/types"
import { create } from "zustand"

interface MoveSequence {
  uid: string
  moveId: number
  x: number
  y: number
  color?: string
}

interface Sequence {
  moves: MoveSequence[]
  playCode: string | null
  initialDirection: string | null
  counterDirection: string | null
  lastDribbleType: string | null
  typeOfShot: string | null
  pickAndRoll: string | null
  defenderPickAndRoll?: string | null
  ballHandlerPickAndRoll?: string
  period: number
}

interface Game {
  gameType: GameTypes
  playerName: string
  teamName: string
  opponentName: string
  jersey: number
  date: string
  sequences: Sequence[]
}

interface BteDataStore {
  activePeriod: number
  activeSequenceMoves: MoveSequence[]
  sequences: Sequence[]
  addMoveToActiveSequence: (newSequence: MoveSequence) => void
  undoLastMove: () => void
  resetActiveSequence: () => void
  addNewSequence: (newSequence: Sequence) => void
}

const useBteStore = create<BteDataStore>()((set) => ({
  activePeriod: 1,
  activeSequenceMoves: [] as MoveSequence[],
  sequences: [] as Sequence[],
  game: {} as Game,
  addMoveToActiveSequence: (newSequence: MoveSequence) =>
    set((state: BteDataStore) => ({ activeSequenceMoves: [...state.activeSequenceMoves, newSequence] })),
  undoLastMove: () =>
    set((state: BteDataStore) => ({
      activeSequenceMoves: state.activeSequenceMoves.slice(0, state.activeSequenceMoves.length - 1),
    })),
  resetActiveSequence: () => set({ activeSequenceMoves: [] }),
  addNewSequence: (newSequence: Sequence) =>
    set((state: BteDataStore) => ({ sequences: [...state.sequences, newSequence] })),
}))

export default useBteStore
