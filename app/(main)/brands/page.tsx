import TestimonialSection from "@/components/sections/TestimonialSection"
import BrandsGrowthSection from "@/components/sections/landing-page/brands/BrandsGrowthSection"
import BrandsHeroSection from "@/components/sections/landing-page/brands/BrandsHeroSection"
import BrandsHowItWorksSection from "@/components/sections/landing-page/brands/BrandsHowItWorksSection"
import BrandsKeyFeatures from "@/components/sections/landing-page/brands/BrandsKeyFeatures"
import BrandsPartnershipSection from "@/components/sections/landing-page/brands/BrandsPartnershipSection"

export default function BrandsPage() {
  return (
    <main>
      <BrandsHeroSection />
      <BrandsGrowthSection />
      <BrandsKeyFeatures />
      <BrandsHowItWorksSection />
      <BrandsPartnershipSection />
      <TestimonialSection
        title={
          <>
            Message from the <span className="text-primary">founder</span>{" "}
          </>
        }
        subtitle="“I believe athletes should have the same opportunities as actors and musicians. If we are all entertainers, we all deserve the ability to earn whether we're actively performing or not. Our mission is rooted in true player data equity.”"
        image="/landing-page/brands-rashad-west.png"
        personName="Rashad West"
        personDescription="CEO BTE Analytics"
      />
    </main>
  )
}
