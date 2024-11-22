import GradientBorderCard from "@/components/cards/GradientBorderCard"

export default function BrandsKeyFeatures() {
  return (
    <div className="bg-black px-6 2xl:px-0">
      <div className="mx-auto max-w-screen-xl space-y-8 lg:space-y-12">
        <div className="mx-auto max-w-[36rem] space-y-8 text-center">
          <h2 className="text-4xl lg:text-5xl">Key Features</h2>
          <p className="text-lg opacity-70">
            We provide a platform where data drives opportunities for athletes and brands to connect and grow.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <GradientBorderCard wrapperClassname="col-span-12 lg:col-span-5" className="space-y-6">
            <h3 className="text-3xl">Advanced performance metrics</h3>
            <p className="opacity-70">
              Be directly connected to an athlete&apos;s advanced performance metrics and dynamic highlights, presented
              in an innovative way that resonates with the new social media generation.
            </p>
          </GradientBorderCard>
          <GradientBorderCard wrapperClassname="col-span-12 lg:col-span-7" className="space-y-6">
            <h3 className="text-3xl">Targeted Engagement</h3>
            <p className="opacity-70">
              Engage with fans of your partnered athletes, reaching audiences who are passionate and engaged
            </p>
          </GradientBorderCard>

          <GradientBorderCard wrapperClassname="col-span-12 lg:col-span-7" className="space-y-6">
            <h3 className="text-3xl">ROI-Focused Sponsorships</h3>
            <p className="opacity-70">
              Track sponsorship effectiveness with insights on fan engagement and campaign reach.
            </p>
          </GradientBorderCard>
          <GradientBorderCard wrapperClassname="col-span-12 lg:col-span-5" className="space-y-6">
            <h3 className="text-3xl">Flexible Partnership Models</h3>
            <p className="opacity-70">
              Choose from one-time engagements, seasonal partnerships, or long-term sponsorships to suit your brand
              strategy.
            </p>
          </GradientBorderCard>
        </div>
      </div>
    </div>
  )
}
