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
        subtitle="“People now recognise that having a good performance conversation means that something happens as a result.”"
        text="“With Landingfolio, the design team can now build design which identifies employees' career aspirations and goals and from which we approach managers and check to see what is happening.”"
        image="/landing-page/fans-testimonial-photo.png"
        personName="Albert Flores"
        personDescription="Product Manager at Jomanar"
      />
    </main>
  )
}
