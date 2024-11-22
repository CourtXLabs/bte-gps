import PremiumHeroSection from "@/components/sections/premium/PremiumHeroSection"
import PricingSection from "@/components/sections/premium/PricingSection"
import { getIsPremium } from "@/lib/auth"

export default async function PremiumPage() {
  const isPremium = await getIsPremium()

  if (isPremium) {
    return <div>Thank you for being a premium user!</div>
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-6 pb-20 2xl:px-0">
      <PremiumHeroSection />
      <PricingSection />
    </main>
  )
}
