import { TimelineItem as TimelineItemType } from "@/types"
import HorizontalTimeline from "./HorizontalTimeline"
import VerticalTimeline from "./VerticalTimeline"

interface Props {
  timelineItems: TimelineItemType[]
}

export default function HowBteWorksTimeline({ timelineItems }: Props) {
  return (
    <>
      <HorizontalTimeline timelineItems={timelineItems} className="hidden lg:block" />
      <VerticalTimeline timelineItems={timelineItems} className="lg:hidden" />
    </>
  )
}
