import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function BrandsGrowthSection() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-14 px-6 pb-10 lg:flex-row lg:pb-24 2xl:px-0">
      <div className="order-2 w-full space-y-8 lg:order-none lg:w-1/2">
        <h2 className="text-4xl font-semibold lg:text-5xl">
          Your Gateway to <span className="text-primary">Data-Driven</span> Brand Growth
        </h2>

        <p>
          With BTE Analytics, brands can seamlessly engage with athletes by leveraging real-time performance metrics,
          fan engagement insights, and exclusive access to potential sponsorship opportunities.
        </p>

        <div className="flex flex-col gap-3 pt-2.5 sm:flex-row">
          <Link href="#" className={cn(buttonVariants({ size: "xl" }), "bg-white hover:bg-[#dadada]")}>
            Apply as a Brand
          </Link>
        </div>
      </div>
      <div className="relative h-[400px] w-full lg:w-[400px]">
        <Image src="/landing-page/brands-growth-image.png" alt="Athletes" fill className="absolute object-contain" />
      </div>
    </div>
  )
}
