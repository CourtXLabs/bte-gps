import Image from "next/image"

export default function AthletesDataIntoMoneySection() {
  return (
    <div className="mx-auto mt-12 grid h-[760px] max-w-screen-xl grid-cols-3 grid-rows-3 gap-2 px-6 2xl:px-0">
      <div className="relative col-span-1 row-span-3">
        <Image className="absolute object-fill" fill src="/landing-page/james-left.png" alt="James Left" />
        <div className="relative z-10 flex h-full flex-col justify-between p-8">
          <p className="text-2xl font-bold lg:text-3xl">DATA=MONEY</p>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
            Transforming Performance Data into Revenue
          </h2>
        </div>
      </div>

      <div className="relative col-span-1 row-span-2">
        <Image className="absolute object-fill" fill src="/landing-page/james-middle-top.png" alt="James Middle Top" />
      </div>

      <div className="relative col-span-1 row-span-1">
        <Image className="absolute object-fill" fill src="/landing-page/james-top-right.png" alt="James Top Right" />
        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-8">
          <h3 className="text-3xl font-semibold tracking-tight">BTE Integration</h3>
          <p className="text-[15px]">
            We enhance access for brands and fans, offering a rich data experience that’s interactive and profitable for
            all.
          </p>
        </div>
      </div>

      <div className="relative col-span-1 row-span-1">
        <Image
          className="absolute object-fill"
          fill
          src="/landing-page/james-right-middle.png"
          alt="James Right Middle"
        />
        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-8">
          <h3 className="text-3xl font-semibold tracking-tight">Market Reach</h3>
          <p className="text-[15px]">
            The sports analytics market is projected to reach $8.4 billion by 2026, with NIL rights, sports media, and
            fantasy sports all seeing explosive growth.
          </p>
        </div>
      </div>

      <div className="relative col-span-1 row-span-1">
        <Image
          className="absolute object-fill"
          fill
          src="/landing-page/james-middle-bottom.png"
          alt="James Middle Bottom"
        />
      </div>

      <div className="relative col-span-1 row-span-1">
        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-8">
          <h3 className="text-3xl font-semibold tracking-tight">Revenue Streams for Athletes</h3>
          <p className="text-[15px]">
            Athletes can tap into multiple income sources including brand partnerships, fan subscriptions, royalties,
            and per-click earnings.
          </p>
        </div>
        <Image
          className="absolute object-fill"
          fill
          src="/landing-page/james-right-bottom.png"
          alt="James Right Bottom"
        />
      </div>
    </div>
  )
}
