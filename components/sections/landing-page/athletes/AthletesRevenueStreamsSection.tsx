import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"

export default function AthletesRevenueStreamsSection() {
  return (
    <div className="mx-auto mt-20 flex max-w-screen-xl flex-col gap-10 px-6 lg:mt-24 lg:flex-row lg:gap-7">
      <div className="flex-1">
        <h2 className="text-4xl font-bold lg:text-5xl">Key Revenue Streams</h2>
        <ul className="mt-12 space-y-9 pl-0">
          <li>
            <div className="flex items-center gap-5">
              <div className="h-6 w-6 min-w-6 rounded-full bg-primary"></div>
              <h3 className="text-lg font-medium">Fan Engagement Income</h3>
            </div>
            <p className="pl-11 pt-2 opacity-80">
              Monetize your interactions with fans by giving them exclusive access to gamified stats, informative
              highlights from film, and insights. Every engagement—likes, shares, and even direct fan subscriptions—can
              translate into income.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-5">
              <div className="h-6 w-6 min-w-6 rounded-full bg-primary"></div>
              <h3 className="text-lg font-medium">Brand Sponsorships & Partnerships</h3>
            </div>
            <p className="pl-11 pt-2 opacity-80">
              Attract brands that align with your personal values and athletic journey. BTE Analytics helps you showcase
              your performance in a way that draws sponsors, turning your data into a powerful tool for securing
              sponsorship deals and endorsements.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-5">
              <div className="h-6 w-6 min-w-6 rounded-full bg-primary"></div>
              <h3 className="text-lg font-medium">Data-Driven Rewards</h3>
            </div>
            <p className="pl-11 pt-2 opacity-80">
              Our platform rewards you for the data you generate. With each game highlight, milestone, and unique stat,
              you can access bonuses and special incentives that reflect your hard work.
            </p>
          </li>
        </ul>
        <LandingPageWhiteButton href="#" className="mt-9">
          Apply to be an athlete
        </LandingPageWhiteButton>
      </div>
      <div className="relative h-[555px] w-[635px]">
        {/* <Image
          fill
          src="/landing-page/athletes-revenue-stream-girl.png"
          className="absolute rounded-2xl object-cover"
          alt="Basketball girl"
        /> */}
      </div>
    </div>
  )
}
