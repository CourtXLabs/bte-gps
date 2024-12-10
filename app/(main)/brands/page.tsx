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
        subtitle="“People now recognise that having a good performance conversation means that something happens as a result.”"
        text="“With Landingfolio, the design team can now build design which identifies employees' career aspirations and goals and from which we approach managers and check to see what is happening.”"
        image="/landing-page/brands-rashad-west.png"
        personName="Rashad West"
        personDescription="CEO BTE Analytics"
      />
    </main>
  )
}
