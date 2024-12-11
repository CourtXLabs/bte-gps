import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function BrandsPartnershipSection() {
  return (
    <div className="px-6 2xl:px-0">
      <div className="relative mx-auto mb-10 mt-10 flex w-full max-w-screen-xl rounded-3xl bg-primary px-6 text-primary-foreground lg:mb-24 lg:mt-24 2xl:px-0">
        <div className="p-8 lg:p-16 lg:pr-0">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Innovative Partnerships. Authentic Engagement. Real Growth.</h2>
              <p className="text-lg">
                BTE Analytics bridges the gap between brands and athletes by transforming data into actionable insights.
                Build authentic relationships, gain brand loyalty, and experience an unparalleled level of engagement
                through targeted partnerships.
              </p>
              <Link href="#" className={cn(buttonVariants({ size: "xl" }), "bg-white hover:bg-[#dadada]")}>
                Contact Us Now
              </Link>
            </div>
          </div>
        </div>

        <Image
          src="/landing-page/brands-player.png"
          alt="Brands Player"
          height={600}
          width={600}
          className="mr-24 hidden object-cover lg:block"
        />
      </div>
    </div>
  )
}
