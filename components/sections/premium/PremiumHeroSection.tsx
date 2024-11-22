import FancyArrowIcon from "@/components/icons/FancyArrowIcon"
import FancyUnderlineIcon from "@/components/icons/FancyUnderlineIcon"
import { Switch } from "@/components/ui/switch"

export default function PremiumHeroSection() {
  return (
    <div className="mx-auto max-w-[42rem] space-y-6 px-6 pb-20 pt-14 text-center lg:px-0">
      <h1 className="text-4xl font-bold lg:text-5xl">
        Choose Your <span className="text-primary">Game</span>-Changer
      </h1>
      <p className="text-lg opacity-70">
        Whether you're a casual fan, a dedicated enthusiast, or a professional looking to unlock the full potential of
        athlete data, our plans are tailored to elevate your experience and connection to the game.
      </p>
      <div className="mx-auto flex items-start justify-center gap-6">
        <span>Pay Monthly</span>
        <Switch />
        <span className="relative flex flex-col items-center gap-0.5">
          Pay Yearly
          <FancyUnderlineIcon height={13} width={68} />
          <div className="absolute left-20 flex w-max items-end text-primary">
            <FancyArrowIcon height={89} width={107} />
            <span className="pb-[0.875rem]">Save 25%</span>
          </div>
        </span>
      </div>
    </div>
  )
}
