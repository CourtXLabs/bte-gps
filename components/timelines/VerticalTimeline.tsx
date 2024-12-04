import { cn } from "@/lib/utils"
import { TimelineItem as TimelineItemType } from "@/types"
import VerticalTimelineItem from "./VerticalTimelineItem"

export default function VerticalTimeline({
  timelineItems,
  className,
}: {
  className?: string
  timelineItems: TimelineItemType[]
}) {
  return (
    <div className={cn("w-full max-w-2xl pl-4 pt-6", className)}>
      <div className="relative">
        {timelineItems.map((item) => (
          <VerticalTimelineItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  )
}
