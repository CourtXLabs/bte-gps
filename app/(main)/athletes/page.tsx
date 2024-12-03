import AthletesDataEquitySection from "@/components/sections/landing-page/athletes/AthletesDataEquitySection"
import AthletesDataIntoMoneySection from "@/components/sections/landing-page/athletes/AthletesDataIntoMoneySection"
import AthletesHeroSection from "@/components/sections/landing-page/athletes/AthletesHeroSection"
import AthletesHowItWorksSection from "@/components/sections/landing-page/athletes/AthletesHowItWorksSection"
import AthletesRevenueStreamsSection from "@/components/sections/landing-page/athletes/AthletesRevenueStreamsSection"

export default function AthletesPage() {
  return (
    <main>
      <AthletesHeroSection />
      <AthletesDataIntoMoneySection />
      <AthletesHowItWorksSection />
      <AthletesRevenueStreamsSection />
      <AthletesDataEquitySection />
    </main>
  )
}
