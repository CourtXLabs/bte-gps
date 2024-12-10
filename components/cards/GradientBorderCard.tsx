import { cn } from "@/lib/utils"

export default function GradientBorderCard({
  children,
  wrapperClassname,
  className,
}: {
  children: React.ReactNode
  wrapperClassname?: string
  className?: string
}) {
  return (
    <div
      className={cn("relative flex-1 rounded-lg bg-gradient-to-br from-white/0 to-white/25 p-[1px]", wrapperClassname)}
    >
      <div className={cn("flex h-full flex-col rounded-lg bg-black px-4 py-7", className)}>{children}</div>
    </div>
  )
}

{
  /* <div class="relative mx-auto max-w-md rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg">
    
</div> */
}
