import HowBteWorksTimeline from "@/components/timelines/HowBteWorksTimeline"

export default function FansHowItWorksSection() {
  return (
    <div className="mt-10 bg-black py-20 lg:mt-24 ">
      <div className="mx-auto max-w-screen-xl px-6">
        <h2 className="text-4xl font-bold tracking-tighter lg:text-center lg:text-5xl">How BTE Analytics Works</h2>
        <h3 className="max-w-[33.375rem] pb-6 pt-8 text-lg opacity-70 lg:mx-auto lg:text-center">
          Our platform simplifies the process for both athletes and brands, connecting performance data with
          opportunities.
        </h3>
        <HowBteWorksTimeline />
      </div>
    </div>
  )
}
