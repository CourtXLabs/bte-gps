import HowWeEmpowerAthletesTimeline from "@/components/timelines/HowWeEmpowerAthletesTimeline"
import { TimelineItem as TimelineItemType } from "@/types"

const timelineItems = [
  {
    title: "Own Your Data",
    type: "secondary",
  },
  {
    title: "Monetize Your Stats",
    type: "primary",
  },
  {
    title: "Elevate Your Game",
    type: "secondary",
  },
] as TimelineItemType[]

export default function AboutUsEmpowerTimelineSection() {
  return (
    <div className="mx-auto max-w-[75rem] px-6 py-20 lg:py-24 2xl:px-0">
      <h2 className="mb-6 text-center text-4xl font-bold lg:mb-0 lg:text-5xl">How We Empower Athletes</h2>
      <HowWeEmpowerAthletesTimeline timelineItems={timelineItems} />
      <p className="mt-10 text-center text-2xl lg:mt-12 lg:text-3xl">
        We provide athletes with the tools to gamify their stats,{" "}
        <span className="font-semibold text-primary">unlock new revenue</span> streams, and engage with fans in
        unprecedented ways. Our platform offers <span className="font-semibold text-primary">advanced analytics</span>,
        detailed performance insights, and the ability to connect with fans and brands. We're here to help athletes{" "}
        <span className="font-semibold text-primary">reach their full potential</span> both on the field and
        financially.
      </p>
    </div>
  )
}
