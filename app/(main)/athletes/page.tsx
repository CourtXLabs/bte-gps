import AthletesDataEquitySection from "@/components/sections/landing-page/athletes/AthletesDataEquitySection"
import AthletesHeroSection from "@/components/sections/landing-page/athletes/AthletesHeroSection"
import AthletesHowItWorksSection from "@/components/sections/landing-page/athletes/AthletesHowItWorksSection"

export default function AthletesPage() {
  return (
    <main className="mx-auto max-w-screen-xl px-6 py-20 2xl:px-0">
      <AthletesHeroSection />
      <AthletesHowItWorksSection />
      <AthletesDataEquitySection />
    </main>
  )
}
