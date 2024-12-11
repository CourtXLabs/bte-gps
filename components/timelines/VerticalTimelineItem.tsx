import { cn } from "@/lib/utils"

const VerticalTimelineItem = ({
  title,
  description,
  type,
}: {
  title: string
  description?: string
  type: "primary" | "secondary"
}) => (
  <div
    className="
      relative flex gap-6 pb-16 before:absolute
      before:left-[5px] before:top-3 before:h-full before:w-[2px] before:bg-[#1e293b] last:pb-0
      last:before:hidden
    "
  >
    {/* Circle Indicator */}
    <div
      className={cn("relative z-10 mt-2.5 h-3 w-3 shrink-0 rounded-full", {
        "bg-primary": type === "primary",
        "bg-[#1e293b]": type !== "primary",
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
