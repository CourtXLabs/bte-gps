import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"
import { ComponentProps, forwardRef } from "react"
import { buttonVariants } from "../ui/button"

type Props = LinkProps &
  Omit<ComponentProps<"a">, keyof LinkProps> & {
    className?: string
    children: React.ReactNode
  }

const LandingPageWhiteButton = forwardRef<HTMLAnchorElement, Props>(({ className, children, ...props }, ref) => {
  return (
    <Link
      {...props}
      ref={ref}
      className={cn(buttonVariants({ size: "xl" }), "min-w-44 bg-white font-bold hover:bg-[#dadada]", className)}
    >
      {children}
    </Link>
  )
})

LandingPageWhiteButton.displayName = "LandingPageWhiteButton"

export default LandingPageWhiteButton
