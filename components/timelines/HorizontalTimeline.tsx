import { cn } from "@/lib/utils"
import { TimelineItem as TimelineItemType } from "@/types"
import HorizontalTimelineItem from "./HorizontalTimelineItem"

export default function HorizontalTimeline({
  timelineItems,
  className,
  variant,
}: {
  className?: string
  timelineItems: TimelineItemType[]
  variant?: "left" | "center"
}) {
  return (
    <div className={cn(className, "w-full pt-20")}>
      <div className="flex max-w-full items-start justify-center space-x-14">
        {timelineItems.map((item) => (
          <HorizontalTimelineItem key={item.title} {...item} variant={variant} hideLast={variant === "center"} />
        ))}
      </div>
    </div>
  )
}
