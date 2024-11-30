import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function AthletesHeroSection() {
  return (
    <div className="bg-black">
      <div className="mx-auto flex max-w-screen-xl flex-col items-start justify-between gap-14  px-6 pb-20 pt-12 lg:flex-row lg:pt-20 2xl:px-0">
        <div className="order-2 w-full space-y-8 lg:order-none lg:w-1/2">
          <h1 className="text-4xl font-semibold lg:text-5xl">
            Empowering Athletes to <span className="italic text-primary">Turn Game Data</span> into Real Rewards
          </h1>
          <p>
            At BTE Analytics, we believe athletes should reap the rewards of their hard work. Discover how you can
            transform your game data into a source of income and opportunities.
          </p>
          <div>
            <p className="font-bold">Join the wait list to:</p>
            <ul className="space-y-2 pl-0 pt-4">
              <li>
                <span className="mr-2 inline-block w-5 text-center text-sm">💸</span> Early Access: Unlock exclusive
                tools and analytics first.
              </li>
              <li>
                <span className="mr-2 inline-block w-5 text-center text-sm">🎁</span> Monetize Performance: Start
                earning from your data right away.
              </li>
              <li>
                <span className="mr-2 inline-block w-5 text-center text-sm">⌛️</span> Brand Connections: Engage with
                sponsors and fans early on.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 pt-2.5 sm:flex-row">
            <Link href="#" className={cn(buttonVariants({ size: "xl" }), "bg-white hover:bg-[#dadada]")}>
              Apply to be an athlete
            </Link>
            <Link href="#" className={cn(buttonVariants({ size: "xl", variant: "outline" }), "hover:bg-transparent ")}>
              Learn More about Data Monetization
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] w-full lg:w-[400px]">
          <Image src="/auth-image.png" alt="Athletes" fill className="absolute object-contain" />
        </div>
      </div>
    </div>
  )
}
