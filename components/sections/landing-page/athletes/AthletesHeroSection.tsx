import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
import { athleteApplicationForm } from "@/constants/contact-us"

export default function AthletesHeroSection() {
  return (
    <div className="bg-black bg-cover lg:bg-[url(/landing-page/hero-bg.png)]">
      <div className="mx-auto flex max-w-screen-xl flex-col items-start justify-between gap-14  px-6 pb-20 pt-12 lg:flex-row lg:pb-28 lg:pt-28 2xl:px-0">
        <div className="order-2 w-full flex-1 space-y-7 lg:order-none lg:w-1/2 lg:max-w-xl">
          <h1 className="text-4xl font-medium lg:text-5xl">
            Empowering Athletes to <span className="font-bold text-primary">Turn Game Data</span> into Real Rewards
          </h1>
          <p>
            At BTE Analytics, we believe athletes should reap the rewards of their hard work. Discover how you can
            transform your game data into a source of income and opportunities.
          </p>
          <div></div>
          <div className="flex flex-col gap-3 pt-2.5 sm:flex-row">
            <LandingPageWhiteButton href={athleteApplicationForm} target="_blank">
              Apply to be an athlete
            </LandingPageWhiteButton>
          </div>
        </div>
      </div>
    </div>
  )
}
