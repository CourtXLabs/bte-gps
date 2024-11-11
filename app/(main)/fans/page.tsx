import FansHeroSection from "@/components/sections/landing-page/fans/FansHeroSection"
import FansHowItWorksSection from "@/components/sections/landing-page/fans/FansHowItWorksSection"
import FansKeyFeaturesSection from "@/components/sections/landing-page/fans/FansKeyFeaturesSection"
import FansValuePropositionSection from "@/components/sections/landing-page/fans/FansValuePropositionSection"

export default function FansPage() {
  return (
    <main className="mx-auto max-w-screen-xl px-6 py-12 lg:py-20 2xl:px-0">
      <FansHeroSection />
      <FansValuePropositionSection />
      <FansHowItWorksSection />
      <FansKeyFeaturesSection />
    </main>
  )
}
