import { cn } from "@/lib/utils"
import { TimelineItem as TimelineItemType } from "@/types"
import HorizontalTimeline from "./HorizontalTimeline"
import VerticalTimeline from "./VerticalTimeline"

interface Props {
  timelineItems: TimelineItemType[]
  vertical?: boolean
}

export default function HowBteWorksTimeline({ timelineItems, vertical }: Props) {
  return (
    <>
      {!vertical && <HorizontalTimeline timelineItems={timelineItems} className="hidden lg:block" />}
      <VerticalTimeline timelineItems={timelineItems} className={cn({ "lg:hidden": !vertical }, "pl-0")} />
    </>
  )
}
