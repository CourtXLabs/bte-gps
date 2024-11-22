"use client"

import FancyArrowIcon from "@/components/icons/FancyArrowIcon"
import FancyUnderlineIcon from "@/components/icons/FancyUnderlineIcon"
import { Switch } from "@/components/ui/switch"
import usePricingPageStore from "@/stores/pricingPageStore"

export default function PremiumHeroSection() {
  const { isYearly, toggleIsYearly } = usePricingPageStore()

  return (
    <div className="mx-auto max-w-[42rem] space-y-6 px-6 pb-20 pt-14 text-center lg:px-0">
      <h1 className="text-4xl font-bold lg:text-5xl">
        Choose Your <span className="text-primary">Game</span>-Changer
      </h1>
      <p className="text-lg opacity-70">
        Whether you&apos;re a casual fan, a dedicated enthusiast, or a professional looking to unlock the full potential
        of athlete data, our plans are tailored to elevate your experience and connection to the game.
      </p>
      <div className="mx-auto flex items-start justify-center gap-4 md:gap-6">
        <span>Pay Monthly</span>
        <Switch checked={isYearly} onCheckedChange={toggleIsYearly} />
        <span className="relative flex flex-col items-center gap-0.5">
          Pay Yearly
          <span className="text-primary md:hidden">Save 25%</span>
          <FancyUnderlineIcon height={13} width={68} className="hidden md:block" />
          <div className="absolute left-20 hidden w-max items-end text-primary md:flex">
            <FancyArrowIcon height={89} width={107} />
            <span className="pb-[0.875rem]">Save 25%</span>
          </div>
        </span>
      </div>
    </div>
  )
}
