import HowBteWorksTimeline from "@/components/timelines/HowBteWorksTimeline"
import { TimelineItem as TimelineItemType } from "@/types"

const timelineItems = [
  {
    title: "Create Your Brand Profile",
    description: "Join BTE Analytics to access a network of athletes ready for partnerships.",
    type: "secondary",
  },
  {
    title: "Connect with Top Athletes",
    description: "Find the perfect athletes whose audience aligns with your brand values.",
    type: "primary",
  },
  {
    title: "Leverage Data-Driven Campaigns",
    description:
      "Use nuanced, proprietary, and exclusive data to craft sponsorships that resonate with fans and maximize brand exposure.",
    type: "secondary",
  },
  {
    title: "Analyze and Optimize",
    description:
      "Join us in empowering athletes to bring advanced sports statistics to life for communities, fostering engagement and education.",
    type: "secondary",
  },
] as TimelineItemType[]

export default function BrandsHowItWorksSection() {
  return (
    <div className="bg-black py-20 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-6">
        <h2 className="text-4xl font-bold tracking-tighter lg:text-center lg:text-5xl">How It Works</h2>
        <h3 className="max-w-[33.375rem] pb-6 pt-8 text-lg opacity-70 lg:mx-auto lg:text-center">
          Our platform simplifies the process for both athletes and brands, connecting performance data with
          opportunities.
        </h3>
        <HowBteWorksTimeline timelineItems={timelineItems} />
      </div>
    </div>
  )
}
