import { cn } from "@/lib/utils"

interface Props {
  title: string
  description: string
  type: "primary" | "secondary"
}

const TimelineItem = ({ title, description, type }: Props) => (
  <div className="relative flex w-1/4 flex-col items-start">
    {/* Connector Line */}
    <div className="absolute top-1.5 h-[1px] w-[calc(100%+3.5rem)] bg-[#1e293b]" />

    {/* Circle Indicator */}
    <div
      className={cn("z-10 h-3 w-3 rounded-full bg-[#1e293b]", {
        "bg-primary": type === "primary",
      })}
    ></div>

    {/* Content */}
    <div className="space-y-4 pt-11">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-[#94a3b8]">{description}</p>
    </div>
  </div>
)

export default TimelineItem
