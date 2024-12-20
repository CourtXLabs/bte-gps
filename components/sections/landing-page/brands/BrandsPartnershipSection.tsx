import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
import Image from "next/image"

export default function BrandsPartnershipSection() {
  return (
    <div className="px-6 2xl:px-0">
      <div className="relative mx-auto mb-10 mt-10 flex w-full max-w-[86.25rem] rounded-3xl bg-primary px-6 text-primary-foreground lg:mb-24 lg:mt-24 xl:mt-36 2xl:px-0">
        <div className="p-8 lg:w-[calc(100%-550px)] lg:p-12 lg:pr-0 xl:w-[calc(100%-800px)]">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Innovative Partnerships. Authentic Engagement. Real Growth.</h2>
              <p className="text-lg">
                BTE Analytics bridges the gap between brands and athletes by transforming data into actionable insights.
                Build authentic relationships, gain brand loyalty, and experience an unparalleled level of engagement
                through targeted partnerships.
              </p>
              <LandingPageWhiteButton href="/contact-us">Contact Us Now</LandingPageWhiteButton>
            </div>
          </div>
        </div>

        <Image
          src="/landing-page/brands-player.png"
          alt="Brands Player"
          width={827}
          height={555}
          className="absolute bottom-0 right-0 z-10 hidden w-[600px] object-cover lg:block xl:w-[827px]"
        />
        <div className="absolute bottom-0 right-0 hidden h-full w-[420px] rounded-r-xl bg-[#D2A32E] lg:block xl:w-[580px]"></div>
      </div>
    </div>
  )
}
