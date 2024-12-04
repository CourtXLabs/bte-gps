import LandingPageWhiteButton from "@/components/buttons/LandingPageWhiteButton"
import Image from "next/image"

export default function FansHeroSection() {
  return (
    <div className="bg-black px-6 pb-20 pt-12 lg:pt-20 2xl:px-0">
      <div className="mx-auto flex max-w-screen-xl flex-col items-start  justify-between gap-14 lg:flex-row">
        <div className="order-2 w-full space-y-7 lg:order-none lg:w-1/2">
          <h1 className="text-4xl font-medium lg:text-5xl">
            Support, Engage, and <span className="font-bold text-primary">Dive Deeper</span> with Your Favorite Athletes
          </h1>
          <p>
            Experience sports like never before. Dive into gamified stats, uncover hidden insights, and directly empower
            the athletes who inspire you.
          </p>
          <LandingPageWhiteButton href="#">Join the Fan Community</LandingPageWhiteButton>
        </div>
        <div className="relative h-[400px] w-full lg:w-[400px]">
          <Image src="/auth-image.png" alt="Athletes" fill className="absolute object-contain" />
        </div>
      </div>
    </div>
  )
}
