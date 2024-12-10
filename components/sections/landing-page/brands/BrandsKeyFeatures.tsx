import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
import GradientBorderCard from "@/components/cards/GradientBorderCard"
import Image from "next/image"

export default function BrandsKeyFeatures() {
  return (
    <div className="relative px-6 2xl:px-0">
      <Image
        src="/landing-page/brands-key-features-bg.png"
        alt="Key Features Background"
        fill
        className="absolute object-cover"
      />
      <div className="mx-auto max-w-[82.5rem] space-y-8 py-20 lg:space-y-12 lg:py-24">
        <div className="relative mx-auto max-w-[36rem] space-y-8 text-center">
          <h2 className="text-4xl lg:text-5xl">Key Features</h2>
          <p className="text-lg opacity-70">
            We provide a platform where data drives opportunities for athletes and brands to connect and grow.
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <GradientBorderCard className="relative space-y-4 bg-opacity-30">
            <Image
              alt="Performance metrics"
              height={80}
              width={80}
              src="/landing-page/brands-performance-metrics.png"
              className="mx-auto pb-2"
            />
            <h3 className="text-center text-2xl lg:text-[1.75rem]">Advanced performance metrics</h3>
            <p className="text-center opacity-70">
              Be directly connected to an athlete&apos;s advanced performance metrics and dynamic highlights, presented
              in an innovative way that resonates with the new social media generation.
            </p>
          </GradientBorderCard>
          <GradientBorderCard className="relative space-y-4 bg-opacity-30">
            <Image
              alt="Performance metrics"
              height={80}
              width={80}
              src="/landing-page/brands-roi-sponsorships.png"
              className="mx-auto pb-2"
            />
            <h3 className="text-center text-2xl lg:text-[1.75rem]">ROI-Focused Sponsorships</h3>
            <p className="text-center opacity-70">
              Track sponsorship effectiveness with insights on fan engagement and campaign reach.
            </p>
          </GradientBorderCard>

          <GradientBorderCard className="relative space-y-4 bg-opacity-30">
            <Image
              alt="Performance metrics"
              height={80}
              width={80}
              src="/landing-page/brands-targeted-engagement.png"
              className="mx-auto pb-2"
            />
            <h3 className="text-center text-2xl lg:text-[1.75rem]">Targeted Engagement</h3>
            <p className="text-center opacity-70">
              Engage with fans of your partnered athletes, reaching audiences who are passionate and engaged.
            </p>
          </GradientBorderCard>
          <GradientBorderCard className="relative space-y-4 bg-opacity-30">
            <Image
              alt="Performance metrics"
              height={80}
              width={80}
              src="/landing-page/brands-flexible-models.png"
              className="mx-auto pb-2"
            />
            <h3 className="text-center text-2xl lg:text-[1.75rem]">Flexible Partnership Models</h3>
            <p className="text-center opacity-70">
              Choose from one-time engagements, seasonal partnerships, or long-term sponsorships to suit your brand
              strategy.
            </p>
          </GradientBorderCard>
        </div>
        <div className="relative mx-auto w-max">
          <LandingPageWhiteButton href="contact-us" className="w-44">
            Contact Us
          </LandingPageWhiteButton>
        </div>
      </div>
    </div>
  )
}
