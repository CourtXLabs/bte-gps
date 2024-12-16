import TestimonialSection from "@/components/sections/TestimonialSection"
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
      <TestimonialSection
        subtitle="I would go as far as to say this analytics program is ground breaking. For players to learn and implement this system, increasing their IQ is simply amazing. The sky's the limit and I look forward to seeing how this program changes the game I love forever."
        image="/landing-page/fans-testimonial-photo.png"
        personName="Devin Green"
        personDescription="Former NBA player and NBA Scout"
      />
    </main>
  )
}
