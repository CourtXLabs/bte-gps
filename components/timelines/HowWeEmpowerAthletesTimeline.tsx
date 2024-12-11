import { TimelineItem as TimelineItemType } from "@/types"
import HorizontalTimeline from "./HorizontalTimeline"
import VerticalTimeline from "./VerticalTimeline"

interface Props {
  timelineItems: TimelineItemType[]
}

export default function HowWeEmpowerAthletesTimeline({ timelineItems }: Props) {
  return (
    <>
      <HorizontalTimeline timelineItems={timelineItems} className="hidden md:block" variant="center" />
      <VerticalTimeline timelineItems={timelineItems} className="pl-0 md:hidden" />
    </>
  )
}
