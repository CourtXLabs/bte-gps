import { cn } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { Card, CardContent } from "../ui/card"

interface Props {
  className?: string
}

export default function GoPremiumCard({ className }: Props) {
  return (
    <Card
      className={cn(
        "absolute left-1/2 top-1/2 z-10 w-[calc(100%-32px)] max-w-[25rem] -translate-x-1/2 -translate-y-1/2  pt-6",
        className,
      )}
    >
      <CardContent className="space-y-4">
        <p className="text-center text-xl font-medium">Go premium</p>
        <p className="pb-2 text-center text-sm">
          Join BTE Analytics premium and unlock this feature along with many others.
        </p>
        <Link href="/premium" className={cn(buttonVariants(), "w-full text-base font-medium")}>
          Purchase now
        </Link>
      </CardContent>
    </Card>
  )
}
