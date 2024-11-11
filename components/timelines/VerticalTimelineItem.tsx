import { cn } from "@/lib/utils"

const VerticalTimelineItem = ({
  title,
  description,
  type,
}: {
  title: string
  description: string
  type: "primary" | "secondary"
}) => (
  <div className="relative flex gap-6 pb-16 last:pb-0">
    {/* Left side vertical line */}
    <div className="absolute left-[5px] top-3 h-full w-[2px] bg-[#1e293b]" />

    {/* Circle indicator */}
    <div
      className={cn("relative z-10 mt-2.5 h-3 w-3 shrink-0 rounded-full bg-[#1e293b]", {
        "bg-primary": type === "primary",
      })}
    />

    {/* Content */}
    <div className="space-y-2">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-[#94a3b8]">{description}</p>
    </div>
  </div>
)

export default VerticalTimelineItem
