import { cn } from "@/lib/utils"

export default function GradientBorderCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="flex-1 rounded-lg bg-athlete-card-border p-[1px]">
      <div
        className={cn(
          "flex h-full flex-col rounded-lg bg-black bg-gradient-to-b from-white/0 to-white/10 p-7",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
