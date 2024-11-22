import { create } from "zustand"

interface PricingStore {
  isYearly: boolean
  toggleIsYearly: () => void
}

const pricingPageStore = create<PricingStore>()((set) => ({
  isYearly: false,
  toggleIsYearly: () => set((state) => ({ isYearly: !state.isYearly })),
}))

export default pricingPageStore
