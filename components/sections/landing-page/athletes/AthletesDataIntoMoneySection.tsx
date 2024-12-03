import Image from "next/image"

export default function AthletesDataIntoMoneySection() {
  return (
    <>
      <div className="mx-auto flex flex-col px-6 py-20 xl:hidden">
        <p className="text-2xl">DATA=MONEY</p>
        <p className="mt-3 text-4xl font-bold">Transforming Performance Data into Revenue</p>
        <Image
          height={453}
          width={758}
          className="mt-4 self-center object-cover"
          src="/landing-page/athlete-player-mobile.png"
          alt="Basketball Player"
        />

        <div className="mt-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold">BTE Integration</h3>
            <p className="text-[15px]">
              Our platform seamlessly integrates athlete performance data with fan engagement tools and brand
              sponsorships. Through BTE Integration, we empower athletes to monetize their stats, connect with their
              audience, and create meaningful partnerships, all within one streamlined ecosystem.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold">Market Reach</h3>
            <p className="text-[15px]">
              With a focus on hyper-local and national engagement, our platform connects athletes with fans and brands
              across the country. By leveraging data-driven insights and gamified content, we help athletes expand their
              audience and maximize their NIL opportunities.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold">Revenue Streams for Athletes</h3>
            <p className="text-[15px]">
              Our platform empowers athletes to generate income through fan subscriptions for exclusive enhanced sports
              visualizations and augmented video content, direct compensation from local and national brand
              partnerships, and performance-based royalties from platform-driven revenue.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto box-content hidden h-[760px] max-w-[84.5rem] grid-cols-10 grid-rows-3 gap-2 px-6 py-24 xl:grid 2xl:px-0">
        <div className="relative col-span-4 row-span-3">
          <Image className="absolute object-fill" fill src="/landing-page/athlete-player-left.png" alt="Player Left" />{" "}
          rounded-xl
          <div className="relative z-10 flex h-full flex-col justify-between p-8">
            <p className="text-2xl font-bold lg:text-3xl">DATA=MONEY</p>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
              Transforming Performance Data into Revenue
            </h2>
          </div>
        </div>

        <div className="relative col-span-3 row-span-2">
          <Image
            className="absolute rounded-xl object-fill"
            fill
            src="/landing-page/athlete-player-middle-top.png"
            alt="Player Middle Top"
          />
        </div>

        <div className="relative col-span-3 row-span-1">
          <Image
            className="absolute rounded-xl object-fill"
            fill
            src="/landing-page/athlete-player-top-right.png"
            alt="Player Top Right"
          />
          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-6">
            <h3 className="text-3xl font-semibold tracking-tight">BTE Integration</h3>
            <p className="text-[15px]">
              Our platform seamlessly integrates athlete performance data with fan engagement tools and brand
              sponsorships. Through BTE Integration, we empower athletes to monetize their stats, connect with their
              audience, and create meaningful partnerships, all within one streamlined ecosystem.
            </p>
          </div>
        </div>

        <div className="relative col-span-3 row-span-1">
          <Image
            className="absolute rounded-xl object-fill"
            fill
            src="/landing-page/athlete-player-middle-right.png"
            alt="Player Right Middle"
          />
          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-6">
            <h3 className="text-3xl font-semibold tracking-tight">Market Reach</h3>
            <p className="text-[15px]">
              With a focus on hyper-local and national engagement, our platform connects athletes with fans and brands
              across the country. By leveraging data-driven insights and gamified content, we help athletes expand their
              audience and maximize their NIL opportunities.
            </p>
          </div>
        </div>

        <div className="relative col-span-3 row-span-1">
          <Image
            className="absolute rounded-xl object-fill"
            fill
            src="/landing-page/athlete-player-middle-bottom.png"
            alt="Player Middle Bottom"
          />
        </div>

        <div className="relative col-span-3 row-span-1">
          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-6">
            <h3 className="text-3xl font-semibold tracking-tight">Revenue Streams for Athletes</h3>
            <p className="text-[15px]">
              Our platform empowers athletes to generate income through fan subscriptions for exclusive enhanced sports
              visualizations and augmented video content, direct compensation from local and national brand
              partnerships, and performance-based royalties from platform-driven revenue.
            </p>
          </div>
          <Image
            className="absolute rounded-xl object-fill"
            fill
            src="/landing-page/athlete-player-bottom-right.png"
            alt="Player Right Bottom"
          />
        </div>
      </div>
    </>
  )
}
