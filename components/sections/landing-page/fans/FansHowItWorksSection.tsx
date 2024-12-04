import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
import HowBteWorksTimeline from "@/components/timelines/HowBteWorksTimeline"
import { TimelineItem as TimelineItemType } from "@/types"
import Image from "next/image"

const timelineItems = [
  {
    title: "Subscribe to Your Favorite Athletes",
    description: "Choose from Rookie to Hall of Famer plans based on the level of access you want.",
    type: "secondary",
  },
  {
    title: "Explore Gamified Data & Highlights",
    description: "Dive into in-depth analytics and celebrate every moment of their journey.",
    type: "primary",
  },
  {
    title: "Engage & Support",
    description: "Participate in challenges, fan polls, and exclusive content.",
    type: "secondary",
  },
] as TimelineItemType[]

export default function FansHowItWorksSection() {
  return (
    <div className="mt-10 bg-black py-20 lg:mt-24 ">
      <div className="mx-auto max-w-screen-xl px-6">
        <h2 className="text-4xl font-bold tracking-tighter lg:text-center lg:text-5xl">How it Works for Fans</h2>
        <h3 className="max-w-[33.375rem] pt-8 text-lg opacity-70 lg:mx-auto lg:text-center">
          Connecting with athletes has never been easier.
        </h3>
        <div className="mt-10 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:gap-16">
          <div className="order-2">
            <HowBteWorksTimeline timelineItems={timelineItems} vertical />
            <LandingPageWhiteButton className="ml-9 mt-9" href="#">
              Start Exploring Now
            </LandingPageWhiteButton>
          </div>
          <Image
            className="order-1 h-80 w-full object-contain lg:order-3 lg:h-auto lg:w-auto lg:object-cover"
            src="/landing-page/fans-how-it-works.png"
            alt="How it works for fans"
            width={718}
            height={590}
            sizes="(min-width: 1280px) 718px, 570px"
          />
        </div>
      </div>
    </div>
  )
}
