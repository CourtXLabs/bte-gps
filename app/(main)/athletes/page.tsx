import AthletesDataEquitySection from "@/components/sections/landing-page/athletes/AthletesDataEquitySection"
import AthletesDataIntoMoneySection from "@/components/sections/landing-page/athletes/AthletesDataIntoMoneySection"
import AthletesHeroSection from "@/components/sections/landing-page/athletes/AthletesHeroSection"
import AthletesHowItWorksSection from "@/components/sections/landing-page/athletes/AthletesHowItWorksSection"

export default function AthletesPage() {
  return (
    <main>
      <AthletesHeroSection />
      <AthletesDataIntoMoneySection />
      <AthletesHowItWorksSection />
      <AthletesDataEquitySection />
    </main>
  )
}

// mx-auto max-w-screen-xl px-6 2xl:px-0 py-12 lg:py-20
