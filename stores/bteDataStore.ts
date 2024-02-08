import { create } from "zustand"

interface MovesSequence {
  id: number
  x: number
  y: number
  color?: string
}

interface BteDataStore {
  activeSequence: MovesSequence[]
  addMoveToActiveSequence: (newSequence: MovesSequence) => void
}

const useBteStore = create<BteDataStore>()((set) => ({
  activeSequence: [] as MovesSequence[],
  addMoveToActiveSequence: (newSequence: MovesSequence) =>
    set((state: BteDataStore) => ({ activeSequence: [...state.activeSequence, newSequence] })),
}))

export default useBteStore
