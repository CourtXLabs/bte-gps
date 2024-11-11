import { TimelineItem as TimelineItemType } from "@/types"
import HorizontalTimeline from "./HorizontalTimeline"
import VerticalTimeline from "./VerticalTimeline"

const timelineItems = [
  {
    title: "Collect & Analyze",
    description: "We gather in-depth performance data from athletes.",
    type: "secondary",
  },
  {
    title: "Monetize",
    description: "Athletes can monetize their performance data through brand deals and fan subscriptions.",
    type: "primary",
  },
  {
    title: "Engage ",
    description: "Brands access performance data to create targeted sponsorships.",
    type: "secondary",
  },
  {
    title: "Grow",
    description: "Both athletes and brands grow their exposure and revenue.",
    type: "secondary",
  },
] as TimelineItemType[]

export default function HowBteWorksTimeline() {
  return (
    <>
      <HorizontalTimeline timelineItems={timelineItems} className="hidden lg:block" />
      <VerticalTimeline timelineItems={timelineItems} className="lg:hidden" />
    </>
  )
}
