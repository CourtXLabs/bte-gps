import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function AthletesHeroSection() {
  return (
    <div className="flex items-start justify-between gap-14">
      <div className="w-1/2 space-y-8">
        <h1 className="text-5xl font-semibold">
          Empowering Athletes to <span className="italic text-primary">Monetize</span> Their Performance Data
        </h1>
        <p>
          Revolutionizing how athletes interact with brands, fans, and their data, turning stats into valuable
          opportunities and revenue.
        </p>
        <div>
          <p className="font-bold">Join the wait list to:</p>
          <ul className="space-y-2 pl-0 pt-4">
            <li>
              <span className="mr-2 inline-block w-5 text-center text-sm">💸</span> Early Access: Unlock exclusive tools
              and analytics first.
            </li>
            <li>
              <span className="mr-2 inline-block w-5 text-center text-sm">🎁</span> Monetize Performance: Start earning
              from your data right away.
            </li>
            <li>
              <span className="mr-2 inline-block w-5 text-center text-sm">⌛️</span> Brand Connections: Engage with
              sponsors and fans early on.
            </li>
          </ul>
        </div>
        <div className="pt-2.5">
          <Link href="#" className={cn(buttonVariants({ size: "xl" }), "bg-white hover:bg-[#dadada]")}>
            Join BTE Analytics for Free
          </Link>
          <Link
            href="#"
            className={cn(buttonVariants({ size: "xl", variant: "outline" }), "ml-3 hover:bg-transparent ")}
          >
            Learn More
          </Link>
        </div>
      </div>
      <Image src="/auth-image.png" alt="Athletes" width={400} height={400} />
    </div>
  )
}
