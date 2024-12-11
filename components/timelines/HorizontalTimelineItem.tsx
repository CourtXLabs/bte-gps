import { cn } from "@/lib/utils"

interface Props {
  title: string
  description?: string
  type: "primary" | "secondary"
  variant?: "left" | "center"
  hideLast?: boolean
}

const parentVariantClassnames = {
  left: "items-start",
  center: "items-center",
}

const connectingLineVariantClassnames = {
  left: "left-0",
  center: "left-1/2",
}

const titleVariantClassnames = {
  left: "text-left",
  center: "text-center max-w-[10rem]",
}

const HorizontalTimelineItem = ({ title, description, type, variant = "left", hideLast }: Props) => (
  <div className={cn("group relative flex w-1/4 flex-col items-start", parentVariantClassnames[variant])}>
    {/* Connector Line */}
    <div
      className={cn(
        "absolute top-1.5 h-[1px] w-[calc(100%+3.5rem)] bg-[#1e293b]",
        connectingLineVariantClassnames[variant],
        { "group-last:hidden": hideLast },
      )}
    />

    {/* Circle Indicator */}
    <div
      className={cn("z-10 h-3 w-3 rounded-full bg-[#1e293b]", {
        "bg-primary": type === "primary",
      })}
    ></div>

    {/* Content */}
    <div className="space-y-4 pt-11">
      <h3 className={cn("text-2xl font-semibold", titleVariantClassnames[variant])}>{title}</h3>
      <p className="text-[#94a3b8]">{description}</p>
    </div>
  </div>
)

export default HorizontalTimelineItem
