import PremiumHeroSection from "@/components/sections/premium/PremiumHeroSection"
import PricingSection from "@/components/sections/premium/PricingSection"
import { getIsPremium, getUserEmail } from "@/lib/auth"

const getCurrentPlan = async () => {
  const isPremium = await getIsPremium()
  return isPremium ? 2 : 1
}

export default async function PremiumPage() {
  const currentPlanId = await getCurrentPlan()
  const email = await getUserEmail()

  return (
    <main className="mx-auto max-w-screen-2xl px-6 pb-20 2xl:px-0">
      <PremiumHeroSection />
      <PricingSection email={email!} currentPlanId={currentPlanId} />
    </main>
  )
}
