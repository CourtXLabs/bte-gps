import TimelineItem from "./TimelineItem"

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
] as { title: string; description: string; type: "primary" | "secondary" }[]

export default function HowBteWorksTimeline() {
  return (
    <div className="w-full pt-20">
      <div className="flex max-w-full items-start justify-center space-x-14">
        {timelineItems.map((item) => (
          <TimelineItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  )
}
