import { cn } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "../ui/button"

interface Props {
  className?: string
  href: string
  children: React.ReactNode
}

export default function LandingPageWhiteButton({ className, href, children }: Props) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ size: "xl" }), "bg-white font-bold hover:bg-[#dadada]", className)}
    >
      {children}
    </Link>
  )
}
