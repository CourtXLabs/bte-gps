import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
import { brandApplicationForm } from "@/constants/contact-us"

export default function BrandsHeroSection() {
  return (
    <div className="bg-black bg-cover px-6 pb-20 pt-12 lg:bg-[url(/landing-page/hero-bg.png)] lg:pb-28 lg:pt-28 2xl:px-0">
      <div className="mx-auto flex max-w-screen-xl flex-col items-start  justify-between gap-14 lg:flex-row">
        <div className="order-2 w-full flex-1 space-y-8 lg:order-none lg:w-1/2 lg:max-w-xl">
          <h1 className="text-4xl font-semibold lg:text-5xl">
            Unlock Powerful <span className="text-primary">Partnerships</span> through Athlete{" "}
            <span className="text-primary">Performance Data</span>
          </h1>
          <p>
            The first-of-its-kind platform for monetizing performance data, connecting brands with empowered athletes
            who turn their achievements into tangible value.
          </p>
          <div className="flex flex-col gap-3 pt-2.5 sm:flex-row">
            <LandingPageWhiteButton href={brandApplicationForm} target="_blank">
              Apply as a Brand
            </LandingPageWhiteButton>
          </div>
        </div>
      </div>
    </div>
  )
}
