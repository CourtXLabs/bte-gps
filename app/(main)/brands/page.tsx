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
    </main>
  )
}
