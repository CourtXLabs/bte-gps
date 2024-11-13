import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function FansHeroSection() {
  return (
    <div className="bg-black px-6 pb-20 pt-12 lg:pt-20 2xl:px-0">
      <div className="mx-auto flex max-w-screen-xl flex-col items-start  justify-between gap-14 lg:flex-row">
        <div className="order-2 w-full space-y-8 lg:order-none lg:w-1/2">
          <h1 className="text-4xl font-semibold lg:text-5xl">
            Empowering Athletes to <span className="italic text-primary">Monetize</span> Their Performance Data
          </h1>
          <p>
            Revolutionizing how athletes interact with brands, fans, and their data, turning stats into valuable
            opportunities and revenue.
          </p>
          <div className="flex flex-col gap-3 pt-2.5 sm:flex-row">
            <Link href="#" className={cn(buttonVariants({ size: "xl" }), "bg-white hover:bg-[#dadada]")}>
              Join BTE Analytics for Free
            </Link>
            <Link href="#" className={cn(buttonVariants({ size: "xl", variant: "outline" }), "hover:bg-transparent ")}>
              Learn More
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
