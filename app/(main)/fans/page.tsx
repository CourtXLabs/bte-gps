import FansFounderMessageSection from "@/components/sections/landing-page/fans/FansFounderMessageSection"
import FansHeroSection from "@/components/sections/landing-page/fans/FansHeroSection"
import FansHowItWorksSection from "@/components/sections/landing-page/fans/FansHowItWorksSection"
import FansKeyFeaturesSection from "@/components/sections/landing-page/fans/FansKeyFeaturesSection"
import FansValuePropositionSection from "@/components/sections/landing-page/fans/FansValuePropositionSection"

export default function FansPage() {
  return (
    <main>
      <FansHeroSection />
      <FansValuePropositionSection />
      <FansHowItWorksSection />
      <FansKeyFeaturesSection />
      <FansFounderMessageSection />
    </main>
  )
}
