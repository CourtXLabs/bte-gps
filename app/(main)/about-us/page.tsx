import AboutUsCoreValuesSection from "@/components/sections/about-us/AboutUsCoreValuesSection"
import AboutUsEmpowerTimelineSection from "@/components/sections/about-us/AboutUsEmpowerTimelineSection"
import AboutUsEmpoweringSection from "@/components/sections/about-us/AboutUsEmpoweringSection"
import AboutUsHeroSection from "@/components/sections/about-us/AboutUsHeroSection"
import AboutUsStory from "@/components/sections/about-us/AboutUsStory"

export default async function AboutUsPage() {
  return (
    <main>
      <AboutUsHeroSection />
      <AboutUsEmpoweringSection />
      <AboutUsStory />
      <AboutUsEmpowerTimelineSection />
      <AboutUsCoreValuesSection />
    </main>
  )
}
